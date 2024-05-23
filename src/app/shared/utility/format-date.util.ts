export function formatDateUtil(value?: Date,
                               year: '2-digit' | 'numeric' | undefined = '2-digit',
                               month: '2-digit' | 'numeric' | undefined = 'numeric',
                               day: '2-digit' | 'numeric' | undefined = 'numeric',
                               hour: '2-digit' | 'numeric' | undefined = '2-digit',
                               minute: '2-digit' | 'numeric' | undefined = 'numeric',
                               second: '2-digit' | 'numeric' | undefined = 'numeric'): string {
  if (!value) return '';
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Tehran',
    calendar: 'persian',
    numberingSystem: 'latn',
    year,
    month,
    day,
    hour,
    minute,
    second,
    hour12: false
  };
  const formatter = new Intl.DateTimeFormat('fa-IR', options);
  return formatter.format(value);
}