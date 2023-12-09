import {
  Vector3,
  RepeatWrapping,
  Mesh,
  BufferGeometry,
  TextureLoader,
  NearestFilter,
  NearestMipmapLinearFilter,
  MeshBasicMaterial,
  FrontSide,
  BufferAttribute,
  SRGBColorSpace,
} from 'three';

import { BlockType, Side, faces, faceDirs } from './faces';
import { vector3ToArrayIndex, arrayIndexToVector3, isInBounds } from './math';

const TEX_WIDTH = 256;
const TEX_HEIGHT = 64;
const TILE_SIZE = 16;
const CHUNK_SCALE = 32;

const getMeshBufferAttributes: (data: Int8Array) => {
  positions: number[];
  normals: number[];
  indices: number[];
  uvs: number[];
} = (data) => {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];

  data.forEach((type: BlockType, index: number) => {
    if (type !== 0) {
      const uvTextureOffset = type - 1;

      const thisCoords = arrayIndexToVector3(index, CHUNK_SCALE);

      faces.forEach((side: Side) => {
        const thisSide = faceDirs[side];

        const neighborCoords = new Vector3(
          thisCoords.x + thisSide.vec[0],
          thisCoords.y + thisSide.vec[1],
          thisCoords.z + thisSide.vec[2],
        );

        const neighbor = data[vector3ToArrayIndex(neighborCoords.x, neighborCoords.y, neighborCoords.z, CHUNK_SCALE)];

        if (!isInBounds(neighborCoords, CHUNK_SCALE) || neighbor === 0) {
          const ndx = positions.length / 3;

          indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);

          // FIXME: Coords are off
          for (const { pos, uv } of thisSide.corners) {
            positions.push(pos[0] + thisCoords.x, pos[1] + thisCoords.y, pos[2] + thisCoords.z);
            normals.push(...[thisSide.vec[0], thisSide.vec[1], thisSide.vec[2]]);
            uvs.push(
              ((uvTextureOffset + uv[0]) * TILE_SIZE) / TEX_WIDTH,
              1 - ((thisSide.uvRow + 1 - uv[1]) * TILE_SIZE) / TEX_HEIGHT,
            );
          }
        }
      });
    }
  });

  return { positions, normals, indices, uvs };
};

export const createMesh = ({ offset, data }: { offset: Vector3; data: Int8Array }): Mesh => {
  const { indices, normals, positions, uvs } = getMeshBufferAttributes(data);

  const geometry = new BufferGeometry();
  const texture = new TextureLoader().load('./textures/texture_02.png');

  texture.wrapS = texture.wrapT = RepeatWrapping;

  texture.colorSpace = SRGBColorSpace;
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestMipmapLinearFilter;

  const material = new MeshBasicMaterial({
    map: texture,
    side: FrontSide,
    alphaTest: 0,
    transparent: true,
  });

  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
  geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
  geometry.setIndex(indices);

  const mesh = new Mesh(geometry, material);

  mesh.position.x = offset.x;
  mesh.position.y = offset.y;
  mesh.position.z = offset.z;

  return mesh as Mesh;
};
