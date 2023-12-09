import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, N8AO } from '@react-three/postprocessing';

import { Scene } from './scene';

const App = () => {
  return (
    <div className="w-screen h-screen ">
      <Canvas
        camera={{
          position: [0, 10, 20],
          fov: 35,
        }}
      >
        <Scene />
        <EffectComposer>
          <N8AO color="red" aoRadius={2} intensity={1} aoSamples={3} />
        </EffectComposer>
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" />
      </Canvas>
    </div>
  );
};

export default App;
