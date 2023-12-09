declare class Perlin {
  constructor(seed: string);

  noise(x: number, y: number, z: number): number;
}

export = Perlin;
