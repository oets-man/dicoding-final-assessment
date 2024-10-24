function fibonacci(n) {
  if (n === 0) {
    return [0];
  } else if (n === 1) {
    return [0, 1];
  } else {
    const prev = fibonacci(n - 1);
    return [...prev, prev[prev.length - 1] + prev[prev.length - 2]];
  }
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
