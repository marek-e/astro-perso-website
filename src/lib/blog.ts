import type { Lang } from '@/i18n/config';

/**
 * Format a date according to the specified locale
 */
export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Estimate reading time in minutes based on content length
 */
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Extract the slug from a blog post ID (removes lang prefix and file extension)
 */
export function getSlug(id: string, lang: Lang): string {
  return id.replace(`${lang}/`, '').replace(/\.(md|mdx)$/, '');
}
