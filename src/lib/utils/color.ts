export const hslToHex = (
  h: number,
  s: number,
  l: number,
  ll = (l /= 100),
  a = (s * Math.min(ll, 1 - ll)) / 100,
  f = (n: number, k = (n + h / 30) % 12) =>
    Math.round(255 * (ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
      .toString(16)
      .padStart(2, '0'),
) => `#${f(0)}${f(8)}${f(4)}`
