import { it, describe, expect, beforeEach } from 'bun:test';
import Item from './Item';
import Inventory from './Inventory';

describe('Inventory', () => {
  let myInventory;

  beforeEach(() => {
    myInventory = new Inventory();
  });

  it('should add an item to inventory', () => {
    const item1 = new Item(1, 'Product A', 10, 100);
    myInventory.addItem(item1);
    expect(myInventory.items.length).toBe(1);
  });

  it('should remove an item from inventory', () => {
    const item1 = new Item(1, 'Product A', 10, 100);
    myInventory.addItem(item1);
    myInventory.removeItem(1);
    expect(myInventory.items.length).toBe(0);
  });

  it('should list item details correctly', () => {
    const item1 = new Item(1, 'Product A', 10, 100);
    const item2 = new Item(2, 'Product B', 5, 50);
    myInventory.addItem(item1);
    myInventory.addItem(item2);
    const details = myInventory.listItems();
    expect(details).toContain('ID: 1');
    expect(details).toContain('ID: 2');
  });
});
