import { useFrame } from '@react-three/fiber';
import { FC, useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';

import { PLAYER_RADIUS, PLAYER_SPEED } from '../config';

const BOX_SIZE = 10;
const MOVEMENT_THRESHOLD = 10;

export const Player: FC<{ onMove?: (position: Vector3) => void }> = ({ onMove }) => {
  const ref = useRef<Mesh>(null);
  const [prevPosition, setPrevPosition] = useState<Vector3 | null>(null);

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.x = ref.current.rotation.y += 0.01;

    const timer = clock.getElapsedTime();

    const posX = PLAYER_RADIUS * Math.sin(timer * PLAYER_SPEED);
    const posZ = PLAYER_RADIUS * Math.cos(timer * PLAYER_SPEED);

    ref.current.position.x = posX;
    ref.current.position.z = posZ;

    const currentPosition = new Vector3(posX, 0, posZ);

    if (prevPosition) {
      const distance = currentPosition.distanceTo(prevPosition);

      // Limit update frequencey to travled distance
      if (distance >= MOVEMENT_THRESHOLD) {
        onMove?.(currentPosition);
        setPrevPosition(currentPosition);
      }
    } else {
      // Initial position setup
      setPrevPosition(currentPosition);
    }
  });

  return (
    <mesh position={new Vector3(0, 25, 0)} ref={ref}>
      <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} attach="geometry" />
      <meshStandardMaterial color="hotpink" attach="material" />
    </mesh>
  );
};
