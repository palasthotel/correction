const locale = (new Intl.DateTimeFormat()).resolvedOptions().locale
const dateFormatter = new Intl.DateTimeFormat(locale, {
    year:'numeric',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
});
export const dateFormat = (timestamp: number) => dateFormatter.format(timestamp);
