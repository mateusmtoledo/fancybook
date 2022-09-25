export function getDateString(date) {
  const dateDifference = new Date() - new Date(date);
  const yearsPassed = dateDifference / 31536000000;
  if (yearsPassed >= 1)
    return `${Math.floor(yearsPassed)} years ago`;
  const monthsPassed = dateDifference / 2592000000;
  if (monthsPassed >= 1)
    return `${Math.floor(monthsPassed)} months ago`;
  const daysPassed = dateDifference / 86400000;
  if (daysPassed >= 1)
    return `${Math.floor(daysPassed)} days ago`;
  const hoursPassed = dateDifference / 3600000;
  if (hoursPassed >= 1)
    return `${Math.floor(hoursPassed)} hours ago`;
  const minutesPassed = dateDifference / 60000;
  if (minutesPassed >= 1)
    return `${Math.floor(minutesPassed)} minutes ago`;
  const secondsPassed = dateDifference / 1000;
  return `${Math.floor(secondsPassed)} seconds ago`;
}
