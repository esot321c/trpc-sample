export const timeFromNow = (time: Date) => {
  const now = Date.now()
  const diff = (now - time.getTime()) / 1000;

  let seconds: string | number = Math.floor(diff % 60),
    minutes: string | number = Math.floor((diff / 60) % 60),
    hours: string | number = Math.floor((diff / (60 * 60)) % 24),
    days: string | number = Math.floor((diff / (60 * 60)) / 24);

  if (days < 1 && hours > 0) return hours + " hours ago"
  if (days < 1 && hours < 1 && minutes < 1) return "just now"
  if (days < 1 && hours < 1 && minutes > 1) return minutes + " minutes ago"
  if (days > 0 && days < 2) return days + " day ago"
  if (days > 0) return days + " days ago"
}

export const formatDateForInput = (dateInput: Date | string) => {
  const pad = (number: number) => {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  // Check if dateInput is a string, and if so, create a new Date object.
  const dateObject = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  // Check if dateObject is a valid date.
  if (isNaN(dateObject.getTime())) {
    throw new Error('Invalid date');
  }

  // getMonth() returns 0-11, not 1-12, so we add 1 to the result.
  return dateObject.getFullYear() +
    '-' + pad(dateObject.getMonth() + 1) +
    '-' + pad(dateObject.getDate()) +
    'T' + pad(dateObject.getHours()) +
    ':' + pad(dateObject.getMinutes());
}