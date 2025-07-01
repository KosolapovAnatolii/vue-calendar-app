let eventGuid = 0

export function createEventId() {
  return String(eventGuid++)
}

export function getTimeFromFullDate(fullDate) {
  const dateObj = new Date(fullDate)
  const time = dateObj.toTimeString().split(' ')[0].slice(0, 5)

  return time;
}

export function getDateFromFullDate(fullDate) {
  const dateObj = new Date(fullDate)
  const date = dateObj.toISOString().split('T')[0]

  return date;
}

export function validateEventForm({title, date, time}) {
  if (!title || title.length > 30 || !date || !time) {
    return false;
  } else {
    return true;
  }
}
