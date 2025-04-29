declare module "flubber" {
  export function interpolate(
    fromShape: string | number[][],
    toShape: string | number[][],
    options?: {
      maxSegmentLength?: number;
      string?: boolean;
      single?: boolean;
    }
  ): (t: number) => string | number[][];

  export function separate(
    fromShape: string | number[][],
    toShapes: (string | number[][])[]
  ): ((t: number) => string | number[][])[];

  export function combine(
    fromShapes: (string | number[][])[],
    toShape: string | number[][]
  ): ((t: number) => string | number[][])[];

  export function toPathString(polygon: number[][]): string;
  export function toPoints(path: string): number[][];
  export function splitPathString(path: string): string[];
}
