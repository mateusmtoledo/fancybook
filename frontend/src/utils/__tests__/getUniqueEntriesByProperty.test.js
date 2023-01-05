import getUniqueEntriesByProperty from "../getUniqueEntriesByProperty";

const elements = [
  {
    _id: "someid",
    text: "sometext",
    author: {
      _id: "sameauthor",
    },
  },
  {
    _id: "anotherid",
    text: "sometext",
    author: {
      _id: "sameauthor",
    },
  },
  {
    _id: "someid",
    text: "anothertext",
    author: {
      _id: "anotherauthor",
    },
  },
];

describe("getUniqueEntriesById", () => {
  it("uses _id as default property", () => {
    const uniqueEntries = getUniqueEntriesByProperty(elements);
    expect(uniqueEntries.length).toBe(2);
    expect(uniqueEntries[0]).toMatchObject(elements[0]);
    expect(uniqueEntries[1]).toMatchObject(elements[1]);
  });

  it("works with nested object", () => {
    const uniqueEntries = getUniqueEntriesByProperty(elements, "author._id");
    expect(uniqueEntries.length).toBe(2);
    expect(uniqueEntries[0]).toMatchObject(elements[0]);
    expect(uniqueEntries[1]).toMatchObject(elements[2]);
  });
});
