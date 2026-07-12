import content from './content.json';
import sintomas from '../assets/servicio-sintomas-emocionales.png';
import autoestima from '../assets/servicio-autoestima.png';
import trauma from '../assets/servicio-trauma-estres.png';
import duelo from '../assets/servicio-duelo.png';
import alimentarios from '../assets/servicio-problemas-alimentarios.png';
import type { ImageMetadata } from 'astro';

export interface ServiceBlock {
  /** Etiqueta pequeña opcional sobre el título. */
  eyebrow?: string;
  title: string;
  items: string[];
  /** Nota opcional (cursiva) bajo la lista. */
  note?: string;
  /** Imagen importada con astro:assets, o `null` para mostrar un ImagePlaceholder. */
  image: ImageMetadata | null;
  /** Texto alternativo de la imagen (si la hay). */
  imageAlt?: string;
  /** 'right' = foto a la derecha (por defecto) · 'left' = foto a la izquierda (clase .rev). */
  side: 'right' | 'left';
}

/**
 * Los TEXTOS de cada bloque están en content.json (servicios.blocks).
 * Aquí solo se asocia cada bloque con su imagen (las imágenes no pueden ir en
 * el JSON porque las procesa astro:assets). El vínculo es por `id`.
 * Para cambiar una foto: sustituye el archivo en src/assets/ (mismo nombre).
 */
const images: Record<string, ImageMetadata> = {
  sintomas,
  autoestima,
  trauma,
  duelo,
  alimentarios,
};

export const services: ServiceBlock[] = content.servicios.blocks.map((b) => ({
  title: b.title,
  items: b.items,
  imageAlt: b.imageAlt,
  image: images[b.id] ?? null,
  side: b.side as 'right' | 'left',
}));
