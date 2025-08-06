// utils/formatDate.ts 

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  return date.toLocaleString('en-US', {
    month: 'short', // e.g., Aug
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
