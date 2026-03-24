import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

export function getLanguageName(code: string): string {
  const languages: Record<string, string> = {
    'FR': 'Français',
    'EN': 'Anglais',
    'ES': 'Espagnol',
    'DE': 'Allemand',
    'IT': 'Italien',
    'PT': 'Portugais',
    'NL': 'Néerlandais',
    'PL': 'Polonais',
    'RU': 'Russe',
    'ZH': 'Chinois',
    'JA': 'Japonais',
    'AR': 'Arabe',
  };

  return languages[code.toUpperCase()] || code;
}
