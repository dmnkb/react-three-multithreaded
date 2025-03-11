import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, N8AO } from '@react-three/postprocessing';

import { Scene } from './scene';
import { SettingsProvider, SettingsControls } from './SettingsContext';

const App = () => {
  return (
    <SettingsProvider>
      <div className="w-screen h-screen ">
        <Canvas
          gl={{ antialias: false, preserveDrawingBuffer: true }}
          shadows
          camera={{ position: [4, 0, 6], fov: 35 }}
        >
          <Scene />
          <EffectComposer>
            <N8AO color="red" aoRadius={2} intensity={1} aoSamples={4} />
          </EffectComposer>
          <Environment preset="dawn" background blur={1} />
        </Canvas>
        <SettingsControls />
      </div>
    </SettingsProvider>
  );
};

export default App;
