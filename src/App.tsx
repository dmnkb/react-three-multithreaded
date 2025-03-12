import { Canvas, ThreeElements } from '@react-three/fiber';
import { SettingsProvider, SettingsControls } from './SettingsContext';
import { Scene } from './scene';

// React 19 compatibility
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

const App = () => (
  <SettingsProvider>
    <div className="w-screen h-screen ">
      <Canvas
        gl={{ antialias: false, preserveDrawingBuffer: true }}
        shadows
        camera={{ position: [500, 500, 500], fov: 35, near: 0.1, far: 10000 }}
      >
        <Scene />
      </Canvas>
      <SettingsControls />
    </div>
  </SettingsProvider>
);

export default App;
