export const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp); // Convert timestamp to date
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-indexed
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  // Return formatted date string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}