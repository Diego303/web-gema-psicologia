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
 * Bloques de la página de Servicios (¿Qué podemos trabajar juntos?).
 * Cada bloque tiene su foto real. Para cambiar una foto, sustituye el archivo
 * en src/assets/ (mismo nombre) o cambia el import de arriba.
 */
export const services: ServiceBlock[] = [
  {
    title: 'Síntomas emocionales',
    items: [
      'Activación intensa',
      'Evitación de situaciones, lugares, etc.',
      'Baja tolerancia a las emociones',
      'Pensamientos recurrentes',
      'Sensación de soledad y/o vacío',
      'Desconexión',
      'Apatía, fatiga',
      'Tristeza persistente',
      'Creencias negativas',
      'Ideas o conductas suicidas',
    ],
    image: sintomas,
    imageAlt: 'Persona abrazándose las rodillas, reflejando malestar emocional',
    side: 'right',
  },
  {
    title: 'Autoestima',
    items: [
      'Crítico interno',
      'Crisis de identidad',
      'Pérdida de dirección o propósito',
      'Cambios vitales importantes',
      'Búsqueda de significado',
      'Problemas para tomar decisiones',
    ],
    image: autoestima,
    imageAlt: 'Persona escribiendo en un cuaderno, en un momento de introspección',
    side: 'left',
  },
  {
    title: 'Trauma y estrés',
    items: [
      'Estrés crónico',
      'Hipervigilancia',
      'Problemas de confianza',
      'Dificultades para conectar',
      'Agotamiento emocional',
      'Miedo a la traición',
      'Miedo al abandono',
    ],
    image: trauma,
    imageAlt: 'Persona caminando por la calle con gesto de alerta y estrés',
    side: 'right',
  },
  {
    title: 'Duelo',
    items: [
      'Pérdida de un ser querido',
      'Pérdida de una mascota',
      'Pérdida de rango social',
      'Pérdida de un embarazo o bebé',
      'Ruptura de vínculos',
    ],
    image: duelo,
    imageAlt: 'Retrato enmarcado rodeado de velas, en recuerdo de un ser querido',
    side: 'left',
  },
  {
    title: 'Problemas alimentarios',
    items: [
      'Preocupación por la comida',
      'Preocupación por el peso',
      'Preocupación por la figura corporal',
      'Atracones',
      'Conductas compensatorias (ejercicio, vómitos, laxantes, etc.)',
    ],
    image: alimentarios,
    imageAlt: 'Persona frente a la mesa con comida, mostrando angustia',
    side: 'right',
  },
];
