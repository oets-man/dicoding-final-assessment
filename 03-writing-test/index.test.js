import { it, describe, expect } from 'bun:test';
import { sum } from './index';

describe('summary test', () => {
  it('should return a number if both parameters are numbers', () => {
    const numA = 2;
    const numB = 3;

    const result = () => sum(numA, numB);

    expect(result()).toBe(5);
  });

  it('should return a string if one of the parameters is a string', () => {
    const num = 2;
    const str = '3';

    const result = () => sum(num, str);

    expect(result()).toBe('23');
  });
});
