import { it, describe, expect } from 'bun:test';
import sum from './index';

describe('sum function', () => {
  it('should return the sum of two positive numbers (including decimals)', () => {
    expect(sum(2, 3)).toEqual(5);
    expect(sum(10, 5)).toEqual(15);

    expect(sum(2.5, 3.7)).toEqual(6.2);
    expect(sum(2.5, 1)).toEqual(3.5);
  });

  it('should return 0 if either argument is not a number', () => {
    expect(sum('a', 5)).toEqual(0);
    expect(sum(2, 'b')).toEqual(0);
    expect(sum('a', 'b')).toEqual(0);

    expect(sum(1, false)).toEqual(0);
    expect(sum(true, 1)).toEqual(0);
    expect(sum(true, false)).toEqual(0);

    expect(sum(null, 5)).toEqual(0);
    expect(sum(4, null)).toEqual(0);
    expect(sum(null, null)).toEqual(0);

    expect(sum(undefined, 5)).toEqual(0);
    expect(sum(6, undefined)).toEqual(0);
    expect(sum(undefined, undefined)).toEqual(0);
  });

  it('should return 0 if either argument is a string number', () => {
    expect(sum(2, '1')).toEqual(0);
    expect(sum('2', 1)).toEqual(0);
    expect(sum('2', '1')).toEqual(0);
  });

  it('should return 0 if either argument is negative', () => {
    expect(sum(-2, 3)).toEqual(0);
    expect(sum(2, -3)).toEqual(0);
    expect(sum(-5, -7)).toEqual(0);
  });

  it('should return 0 if both arguments are 0', () => {
    expect(sum(0, 0)).toEqual(0);
  });
});
