import { Vector3 } from 'three';

import Perlin from './noise';

import { vector3ToArrayIndex, BlockTypes } from '../helpers';

export const useNoise = () => {
  const pn = new Perlin('Liv');

  const calculateTerrain = (offset: Vector3, chunkScale: number) => {
    const voxelData = new Int8Array(Math.pow(chunkScale, 3));
    let terrainLevel = chunkScale / 2;

    for (let x = offset.x; x < offset.x + chunkScale; x++) {
      for (let y = offset.y; y < offset.y + chunkScale; y++) {
        for (let z = offset.z; z < offset.z + chunkScale; z++) {
          terrainLevel = pn.noise(x / chunkScale, 0, z / chunkScale) * chunkScale;

          if (y < terrainLevel) {
            if (y < terrainLevel - 2) {
              voxelData[vector3ToArrayIndex(x - offset.x, y - offset.y, z - offset.z, chunkScale)] = BlockTypes.rock;
            } else {
              voxelData[vector3ToArrayIndex(x - offset.x, y - offset.y, z - offset.z, chunkScale)] = BlockTypes.dirt;
            }
          }
        }
      }
    }

    return voxelData;
  };

  return { calculateTerrain };
};
