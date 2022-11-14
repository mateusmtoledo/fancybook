const { getDateString } = require('../dateFormatter');

jest.useFakeTimers().setSystemTime(1668453480218);

describe('dateFormatter', () => {
  it('shows 0 seconds ago if passed date > system date', () => {
    expect(getDateString(1668455480218)).toBe('0 seconds ago');
  });

  it('works with seconds', () => {
    expect(getDateString(1668453479218)).toBe('1 second ago');
    expect(getDateString(1668453440218)).toBe('40 seconds ago');
  });

  it('works with minutes', () => {
    expect(getDateString(1668453420218)).toBe('1 minute ago');
    expect(getDateString(1668451860018)).toBe('27 minutes ago');
  });

  it('works with hours', () => {
    expect(getDateString(1668449880218)).toBe('1 hour ago');
    expect(getDateString(1668399480218)).toBe('15 hours ago');
  });

  it('works with days', () => {
    expect(getDateString(1668367080218)).toBe('1 day ago');
    expect(getDateString(1667675880218)).toBe('9 days ago');
  });

  it('works with months', () => {
    expect(getDateString(1665861480218)).toBe('1 month ago');
    expect(getDateString(1639941480218)).toBe('11 months ago');
  });

  it('works with years', () => {
    expect(getDateString(1637349480218)).toBe('1 year ago');
    expect(getDateString(704229480218)).toBe('31 years ago');
  });
});
