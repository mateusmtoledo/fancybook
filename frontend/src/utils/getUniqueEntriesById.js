function getUniqueEntriesById(arr) {
  const uniqueIds = [...new Set(arr.map((element) => element._id))];
  return uniqueIds.map((id) => arr.find((element) => element._id === id));
}

export default getUniqueEntriesById;
