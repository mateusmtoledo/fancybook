function getPropertyByString(object, string) {
  const propertiesArray = string.split(".");
  let value = object;
  propertiesArray.forEach((property) => {
    value = value[property];
  });
  return value;
}

export default function getUniqueEntriesByProperty(arr, property = "_id") {
  const uniqueProps = [
    ...new Set(arr.map((element) => getPropertyByString(element, property))),
  ];
  return uniqueProps.map((prop) =>
    arr.find((element) => getPropertyByString(element, property) === prop)
  );
}
