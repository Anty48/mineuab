/** Els noms de Minecraft: de 3 a 16 lletres, números o _. */
export const PLAYER_NAME_PATTERN = /^[A-Za-z0-9_]{3,16}$/;

/** El nom d'una adreça /jugador/<nom>, o null si no pot ser un nom de Minecraft (llavors la pàgina és un 404). */
export function playerNameFromPath(segment: string) {
  let name: string;
  try {
    name = decodeURIComponent(segment);
  } catch {
    return null;
  }
  return PLAYER_NAME_PATTERN.test(name) ? name : null;
}
