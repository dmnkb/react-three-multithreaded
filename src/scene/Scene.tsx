import { OrbitControls, Environment, Stats } from '@react-three/drei';
import { Player } from './Player';
import { useTerrain } from './terrain';
import { EffectComposer, N8AO } from '@react-three/postprocessing';

export const Scene = () => {
  const { update } = useTerrain();

  return (
    <>
      <OrbitControls minDistance={200} zoomSpeed={0.1} />
      <Player onMove={update} />
      <Stats />
      <EffectComposer>
        <N8AO color="red" aoRadius={2} intensity={1} aoSamples={4} />
      </EffectComposer>
      <Environment preset="dawn" background blur={1} />
    </>
  );
};
