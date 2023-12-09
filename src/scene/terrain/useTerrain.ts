import { useEffect } from 'react';
import { Vector3 } from 'three';

import { useChunks } from './useChunks';

const CHUNK_RADIUS = 3;
const CHUNK_OFFSET = 32;

const getCoordsInRadius = (center: Vector3, radius: number): Vector3[] => {
  const coordinates: Vector3[] = [];

  const chunkCenterX = Math.round(center.x / CHUNK_OFFSET) * CHUNK_OFFSET;
  const chunkCenterZ = Math.round(center.z / CHUNK_OFFSET) * CHUNK_OFFSET;

  for (let x = chunkCenterX - radius; x <= chunkCenterX + radius; x += CHUNK_OFFSET) {
    for (let z = chunkCenterZ - radius; z <= chunkCenterZ + radius; z += CHUNK_OFFSET) {
      const distanceSquared = (x - chunkCenterX) ** 2 + (z - chunkCenterZ) ** 2;
      const radiusSquared = radius ** 2;

      if (distanceSquared <= radiusSquared) {
        coordinates.push(new Vector3(x, 0, z));
      }
    }
  }

  return coordinates;
};

export const useTerrain = () => {
  const { addChunk, removeChunk, chunks, chunksPending } = useChunks();

  useEffect(() => {
    console.log('chunks pending', chunksPending);
  }, [chunksPending]);

  const update = (position: Vector3) => {
    if (chunksPending) {
      return;
    }

    const newCoords = getCoordsInRadius(position, CHUNK_RADIUS * CHUNK_OFFSET);
    const oldCoords = chunks?.map(({ coords }) => coords);

    // Remove old
    oldCoords?.forEach((coords) => {
      if (!newCoords?.find(({ x, y, z }) => x === coords.x && y === coords.y && z === coords.z)) {
        removeChunk(coords);
      }
    });

    // Add new
    newCoords.forEach(addChunk);
  };

  return {
    update,
  };
};
