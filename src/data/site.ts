import content from './content.json';
import { url } from '../lib/url';

/**
 * Datos globales del negocio, derivados de content.json (sección "global").
 * NO edites los textos aquí: edítalos en src/data/content.json.
 * Este módulo solo reconstruye el objeto `site` y calcula los `href` del menú
 * (con url(), para respetar el `base` de GitHub Pages).
 */
const g = content.global;

export const site = {
  brand: g.brand,
  name: g.name,
  role: g.role,
  colegiada: g.colegiada,
  phone: g.phone,
  whatsapp: g.whatsapp,
  email: g.email,
  /** Reserva: enlace único, texto del botón y modalidades (presencial / online) en texto. */
  booking: g.booking,
  nav: g.nav.map((n) => ({ href: url(n.path), label: n.label, key: n.key })),
};

export type NavItem = (typeof site.nav)[number];
