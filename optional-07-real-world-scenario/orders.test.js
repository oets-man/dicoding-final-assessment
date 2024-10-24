import { it, describe, expect, beforeEach } from 'bun:test';
import {
  generateUniqueId,
  orders,
  addOrder,
  updateOrderStatus,
  calculateTotalRevenue,
  deleteOrder,
} from './orders.js';

function _addOrder() {
  addOrder('Bob', [
    { name: 'Mie Goreng', price: 15000 },
    { name: 'Kopi', price: 10000 },
  ]);
}

describe('Order Management', () => {
  beforeEach(() => {
    orders.length = 0;
  });

  describe('generateUniqueId', () => {
    it('menghasilkan id unik', () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('addOrder', () => {
    it('menambahkan order baru ke dalam array', () => {
      _addOrder();
      expect(orders.length).toBe(1);
    });

    it('menghitung total harga', () => {
      _addOrder();
      expect(orders[0].totalPrice).toBe(25000);
    });

    it('mengatur status order menjadi "Menunggu"', () => {
      _addOrder();
      expect(orders[0].status).toBe('Menunggu');
    });
  });

  describe('updateOrderStatus', () => {
    it('update order status to Selesai', () => {
      _addOrder();
      updateOrderStatus(orders[0].id, 'Selesai');
      expect(orders[0].status).toBe('Selesai');
    });
  });

  describe('calculateTotalRevenue', () => {
    it('menghitung total pendapatan dengan benar', () => {
      _addOrder();
      updateOrderStatus(orders[0].id, 'Selesai');
      expect(calculateTotalRevenue()).toBe(25000);
    });

    it('mengembalikan nilai 0 jika tidak ada order dengan status "Selesai"', () => {
      _addOrder();
      expect(calculateTotalRevenue()).toBe(0);
    });
  });

  describe('deleteOrder', () => {
    it('menghapus order dengan id yang benar', () => {
      _addOrder();
      deleteOrder(orders[0].id);
      expect(orders.length).toBe(0);
    });
  });

  describe('test validasi', () => {
    it('mengembalikan error jika nama pelanggan kosong', () => {
      expect(() =>
        addOrder('', [
          { name: 'Mie Goreng', price: 15000 },
          { name: 'Kopi', price: 10000 },
        ])
      ).toThrowError('Nama pelanggan tidak boleh kosong');
    });

    it('mengembalikan error jika items bukan array', () => {
      expect(() => addOrder('Bob', 'items')).toThrowError(
        'Items harus berupa array'
      );
    });

    it('mengembalikan error jika items kosong', () => {
      expect(() => addOrder('Bob', [])).toThrowError(
        'Items tidak boleh kosong'
      );
    });

    it('mengembalikan error jika setiap item tidak berupa object', () => {
      expect(() =>
        addOrder('Bob', [123, { name: 'Kopi', price: 10000 }])
      ).toThrowError('Setiap item harus berupa object');
    });

    it('mengembalikan error jika setiap item tidak memiliki properti "name" dan "price"', () => {
      expect(() =>
        addOrder('Bob', [
          { name: 'Mie Goreng' },
          { name: 'Kopi', price: 10000 },
        ])
      ).toThrowError('Setiap item harus memiliki properti "name" dan "price"');
    });

    it('mengembalikan error jika nama item kosong', () => {
      expect(() =>
        addOrder('Bob', [
          { name: '', price: 15000 },
          { name: 'Kopi', price: 10000 },
        ])
      ).toThrowError('Nama item tidak boleh kosong');
    });

    it('mengembalikan error jika harga item tidak berupa angka positif', () => {
      expect(() =>
        addOrder('Bob', [
          { name: 'Mie Goreng', price: -15000 },
          { name: 'Kopi', price: 10000 },
        ])
      ).toThrowError('Harga item harus berupa angka positif');
    });
  });
});
