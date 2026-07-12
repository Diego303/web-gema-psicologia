import type { ImageMetadata } from 'astro';

/**
 * Devuelve un conjunto de anchos para <Image widths={...}> SIN superar el ancho
 * original de la imagen (astro:assets no reescala hacia arriba, así evitamos
 * warnings en el build). Las fotos de este sitio son pequeñas, así que en la
 * mayoría de casos basta con 1–2 variantes.
 */
export const responsiveWidths = (image: ImageMetadata): number[] => {
  const candidates = [480, 800, 1200].filter((w) => w < image.width);
  return [...candidates, image.width];
};
