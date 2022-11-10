import chroma, { Color } from 'chroma-js';

export const White = chroma('white');

export function* genUniqueColors(): Generator<Color, Color, Color> {
  const saturation = 0.7;
  const lightness = 0.6;
  yield chroma.hsl(0, saturation, lightness);

  const numPairs: [number, number][] = []; // 0.0 - 1.0
  numPairs.push([0.0, 1.0]);
  while (true) {
    const [l, r] = numPairs.shift() ?? [0.0, 1.0];
    const m = (l + r) / 2.0;
    numPairs.push([l, m]);
    numPairs.push([m, r]);
    yield chroma.hsl(360 * m, saturation, lightness);
  }
}

export const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '';
  const m = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${m}:${seconds.toString().padStart(2, '0')}`;
};
