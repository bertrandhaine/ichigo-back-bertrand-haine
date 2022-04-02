import { getFirstAndLastDayOfWeek, compareDateWithoutTime } from '../../src/utils/date';

describe('getFirstAndLastDayOfWeek test', () => {
  // For this test we can check the whole week easily with this website
  // https://www.calculator.net/day-of-the-week-calculator.html?today=03%2F19%2F2020&x=81&y=15
  it('should give the exact week first and last day based on date', () => {
    const date = new Date('2020-03-19T12:00:00.000Z');

    expect(getFirstAndLastDayOfWeek(date)).toEqual([
      new Date('2020-03-15T00:00:00.000Z'),
      new Date('2020-03-21T00:00:00.000Z'),
    ]);
  });

  it('should give the exact week first and last day based on date (when first day = date)', () => {
    const date = new Date('2018-08-17T12:22:10.000Z');

    expect(getFirstAndLastDayOfWeek(date)).toEqual([
      new Date('2018-08-12T00:00:00.000Z'),
      new Date('2018-08-18T00:00:00.000Z'),
    ]);
  });

  it('should give the exact week first and last day based on date (when last day = date)', () => {
    const date = new Date('2018-08-18T12:22:10.000Z');

    expect(getFirstAndLastDayOfWeek(date)).toEqual([
      new Date('2018-08-12T00:00:00.000Z'),
      new Date('2018-08-18T00:00:00.000Z'),
    ]);
  });
});

describe('compareDateWithoutTime test', () => {
  it('should be the same date', () => {
    const date = new Date('2020-03-19T12:00:00.000Z');
    const date2 = new Date('2020-03-19T14:03:00.000Z');

    expect(compareDateWithoutTime(date, date2)).toEqual(true);
  });

  it('should not be the same date', () => {
    const date = new Date('2020-03-19T12:00:00.000Z');
    const date2 = new Date('2020-03-20T14:03:00.000Z');

    expect(compareDateWithoutTime(date, date2)).toEqual(false);
  });
});
