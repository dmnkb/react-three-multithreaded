import * as Comlink from 'comlink';
import { Vector3 } from 'three';

export const useRemoteNoise = () => {
  const createRemoteNoise = (onNoiseCreated: (data: Int8Array) => void, offset: Vector3, chunkScale = 32) => {
    const worker = new Worker(new URL('./noiseWorker.js', import.meta.url));

    // Make TypeScript believe this is callable.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const remoteFunction: any = Comlink.wrap<Worker>(worker);

    remoteFunction(Comlink.proxy(onNoiseCreated), offset, chunkScale);
  };

  return { createRemoteNoise };
};
