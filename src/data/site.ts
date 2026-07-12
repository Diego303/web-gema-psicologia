import { url } from '../lib/url';

/**
 * Datos del negocio centralizados.
 * Edita SOLO este archivo para cambiar nombre, contacto y enlaces de reserva:
 * todas las páginas leen de aquí.
 *
 * Pendientes de rellenar con datos reales (ahora con valores de ejemplo):
 *   colegiada, phone, email, bookingPresencial, bookingOnline.
 */
export const site = {
  brand: 'Gema Mascaraque Psicología',
  name: 'Gema Mascaraque',
  role: 'Psicóloga General Sanitaria',
  colegiada: 'Col. nº 000', // ← nº de colegiada real
  phone: '+34 600 00 00 00', // ← teléfono para llamadas
  whatsapp: '+34 600 00 00 00', // ← número de WhatsApp
  email: 'hola@tudominio.com', // ← email real
  location: 'Alcalá de Henares (Madrid)',
  online: 'Desde cualquier parte',

  // ↓ Pega aquí tus enlaces de reserva (p. ej. Calendly). Por defecto "#".
  bookingPresencial: '#',
  bookingOnline: '#',

  // Navegación principal (también usada en el footer).
  // Los `href` se generan con url() para respetar el `base` de GitHub Pages.
  nav: [
    { href: url(''), label: 'Inicio', key: 'inicio' },
    { href: url('servicios/'), label: 'Servicios', key: 'servicios' },
    { href: url('sobre-mi/'), label: 'Sobre mí', key: 'sobre' },
    { href: url('contacto/'), label: 'Contacto', key: 'contacto' },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
