const { default: getUniqueEntriesById } = require('../getUniqueEntriesById');

const elements = [
  {
    _id: 'someid',
    text: 'sometext',
  },
  {
    _id: 'anotherid',
    text: 'sometext',
  },
  {
    _id: 'someid',
    text: 'anothertext',
  },
];

describe('getUniqueEntriesById', () => {
  it('returns array with unique ids only', () => {
    const uniqueEntries = getUniqueEntriesById(elements);
    expect(uniqueEntries.length).toBe(2);
    expect(uniqueEntries[0]._id).toBe('someid');
    expect(uniqueEntries[0].text).toBe('sometext');
    expect(uniqueEntries[1]._id).toBe('anotherid');
    expect(uniqueEntries[1].text).toBe('sometext');
  });
});
