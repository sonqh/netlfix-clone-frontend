import { format } from 'date-fns'

/**
 * Formats a date string into a readable format.
 * @param date - The date string to format.
 * @returns The formatted date string.
 */
export const formatReleaseDate = (date: string): string => {
  return format(new Date(date), 'MMMM d, yyyy')
}

/**
 * Formats a date string into a readable format.
 * @param dateString - The date string to format.
 * @returns The formatted date string.
 */
export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'MMM dd, yyyy')
}
