// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// TODO: buatlah variabel yang menampung data orders
const orders = [];

function validateOrder(customerName, items) {
  if (typeof customerName !== 'string' || customerName.trim() === '') {
    throw new Error('Nama pelanggan tidak boleh kosong');
  }

  if (!Array.isArray(items)) {
    throw new Error('Items harus berupa array');
  }

  if (items.length === 0) {
    throw new Error('Items tidak boleh kosong');
  }

  for (const item of items) {
    if (typeof item !== 'object') {
      throw new Error('Setiap item harus berupa object');
    }

    if (!('name' in item) || !('price' in item)) {
      throw new Error('Setiap item harus memiliki properti "name" dan "price"');
    }

    if (typeof item.name !== 'string' || item.name.trim() === '') {
      throw new Error('Nama item tidak boleh kosong');
    }

    if (typeof item.price !== 'number' || item.price <= 0) {
      throw new Error('Harga item harus berupa angka positif');
    }
  }
}

// TODO: selesaikan fungsi addOrder
function addOrder(customerName, items) {
  validateOrder(customerName, items);

  const id = generateUniqueId();
  const totalPrice = items.reduce((acc, i) => (acc += i.price), 0);
  const status = 'Menunggu';

  const newOrder = { id, customerName, items, totalPrice, status };
  orders.push(newOrder);
}

// TODO: selesaikan fungsi updateOrderStatus
function updateOrderStatus(orderId, status) {
  const orderIndex = orders.find((order) => order.id == orderId);
  orderIndex.status = status;
}

// TODO: selesaikan fungsi calculateTotalRevenue dari order yang berstatus Selesai
function calculateTotalRevenue() {
  const done = orders.filter((order) => order.status == 'Selesai');
  const revenue = done.reduce((acc, i) => (acc += i.totalPrice), 0);
  return revenue;
}

// TODO: selesaikan fungsi deleteOrder
function deleteOrder(id) {
  const index = orders.findIndex((order) => order.id === id);
  if (index > -1) {
    orders.splice(index, 1);
  }
}

export {
  generateUniqueId,
  orders,
  addOrder,
  updateOrderStatus,
  calculateTotalRevenue,
  deleteOrder,
};
