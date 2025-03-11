import React, { createContext, useContext, useState } from 'react';

import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

// Default values
const DEFAULT_VALUES = {
  multithreaded: false,
  chunkRadius: 3,
  playerSpeed: 0.2,
  playerRadius: 200,
};

// Context creation
interface SettingsContextType {
  multithreaded: boolean;
  chunkRadius: number;
  playerSpeed: number;
  playerRadius: number;
  setMultithreaded: (value: boolean) => void;
  setChunkRadius: (value: number) => void;
  setPlayerSpeed: (value: number) => void;
  setPlayerRadius: (value: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [multithreaded, setMultithreaded] = useState(DEFAULT_VALUES.multithreaded);
  const [chunkRadius, setChunkRadius] = useState(DEFAULT_VALUES.chunkRadius);
  const [playerSpeed, setPlayerSpeed] = useState(DEFAULT_VALUES.playerSpeed);
  const [playerRadius, setPlayerRadius] = useState(DEFAULT_VALUES.playerRadius);

  return (
    <SettingsContext.Provider
      value={{
        multithreaded,
        chunkRadius,
        playerSpeed,
        playerRadius,
        setMultithreaded,
        setChunkRadius,
        setPlayerSpeed,
        setPlayerRadius,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};

// UI Controls Component
export const SettingsControls: React.FC = () => {
  const {
    multithreaded,
    chunkRadius,
    playerSpeed,
    playerRadius,
    setMultithreaded,
    setChunkRadius,
    setPlayerSpeed,
    setPlayerRadius,
  } = useSettings();

  return (
    <div className="p-4 space-y-4 bg-gray-800 text-white rounded-lg fixed bottom-3 left-3">
      <label className="flex items-center space-x-2">
        <span>Multithreaded</span>
        <Switch checked={multithreaded} onCheckedChange={setMultithreaded} />
      </label>
      <div>
        <span>Chunk Radius: {chunkRadius}</span>
        <Slider value={[chunkRadius]} min={1} max={10} step={1} onValueChange={(v) => setChunkRadius(v[0])} />
      </div>
      <div>
        <span>Player Speed: {playerSpeed.toFixed(2)}</span>
        <Slider value={[playerSpeed]} min={0.1} max={1.0} step={0.01} onValueChange={(v) => setPlayerSpeed(v[0])} />
      </div>
      <div>
        <span>Player Radius: {playerRadius}</span>
        <Slider value={[playerRadius]} min={50} max={500} step={10} onValueChange={(v) => setPlayerRadius(v[0])} />
      </div>
    </div>
  );
};
