import { it, describe, expect } from 'bun:test';
import Item from './Item';

describe('Item', () => {
  it('should create an item with correct properties', () => {
    const myItem = new Item(1, 'Product A', 10, 100);

    expect(myItem.id).toBe(1);
    expect(myItem.name).toBe('Product A');
    expect(myItem.quantity).toBe(10);
    expect(myItem.price).toBe(100);
  });

  it('should update item details correctly', () => {
    const myItem = new Item(1, 'Product A', 10, 100);
    myItem.updateDetails('New Product A', 5, 50);

    expect(myItem.name).toBe('New Product A');
    expect(myItem.quantity).toBe(5);
    expect(myItem.price).toBe(50);
  });

  it('should display item details correctly', () => {
    const myItem = new Item(1, 'Product A', 10, 100);
    const details = myItem.displayDetails();

    expect(details).toContain('ID: 1');
    expect(details).toContain('Name: Product A');
    expect(details).toContain('Quantity: 10');
    expect(details).toContain('Price: 100');
  });

  it('should throw an error if some field is not a number', () => {
    expect(() => new Item('invalid', 'Invalid Item', 1, 0)).toThrowError(
      'Field ID, Quantity, and Price must be a number.'
    );
  });
});
