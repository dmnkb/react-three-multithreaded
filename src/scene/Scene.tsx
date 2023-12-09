import { OrbitControls, Stats } from '@react-three/drei';

import { Player } from './Player';
import { useTerrain } from './terrain';

export const Scene = () => {
  const { update } = useTerrain();

  return (
    <>
      <Stats />
      <OrbitControls minDistance={400} />
      <Player onMove={update} />
    </>
  );
};
