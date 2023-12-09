import { useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';

import { createMesh } from './helpers';
import { useRemoteNoise } from './useRemoteNoise';

type Chunk = {
  mesh: Mesh;
  coords: Vector3;
};

export const useChunks = () => {
  const { scene } = useThree();

  const chunksRef = useRef<Chunk[]>([]);

  const [chunksPending, setChunksPending] = useState(0);

  const { createRemoteNoise } = useRemoteNoise();

  const chunkExists = (coords: Vector3): boolean => {
    return Boolean(
      chunksRef.current.find(
        ({ coords: oldCoords }) => oldCoords.x === coords.x && oldCoords.y === coords.y && oldCoords.z === coords.z,
      ),
    );
  };

  const addChunk = (coords: Vector3) => {
    if (chunkExists(coords)) {
      return;
    }

    setChunksPending((pending) => pending + 1);

    createRemoteNoise((data) => {
      setChunksPending((pending) => pending - 1);

      const mesh = createMesh({
        offset: coords,
        data,
      });

      chunksRef.current.push({ coords, mesh });
      scene.add(mesh);
    }, coords);
  };

  const removeChunk = (coords: Vector3) => {
    const index = chunksRef.current.findIndex(
      ({ coords: oldCoords }) => oldCoords.x === coords.x && oldCoords.y === coords.y && oldCoords.z === coords.z,
    );

    if (index === -1) {
      return;
    }

    const chunk = chunksRef.current[index];

    chunksRef.current.splice(index, 1);
    scene.remove(chunk.mesh);
  };

  return { addChunk, removeChunk, chunks: chunksRef.current, chunksPending: chunksPending };
};
