class Order {
  constructor(id, userId, products, total, status, createdAt) {
    this.id = id;
    this.userId = userId;
    this.products = products; // [{ productId, quantity }]
    this.total = total;
    this.status = status || 'pendiente';
    this.createdAt = createdAt || new Date().toISOString();
  }

  validate() {
    const errors = [];
    if (!this.userId || typeof this.userId !== 'number') {
      errors.push('userId es requerido y debe ser numérico');
    }
    if (!Array.isArray(this.products) || this.products.length === 0) {
      errors.push('Debe haber al menos un producto en la orden');
    }
    this.products.forEach((p, idx) => {
      if (!p.productId || typeof p.productId !== 'number') {
        errors.push(`productId en productos[${idx}] es requerido y debe ser numérico`);
      }
      if (!p.quantity || typeof p.quantity !== 'number' || p.quantity < 1) {
        errors.push(`quantity en productos[${idx}] debe ser un número mayor a 0`);
      }
    });
    if (typeof this.total !== 'number' || this.total < 0) {
      errors.push('El total debe ser un número positivo');
    }
    if (!['pendiente', 'pagado', 'enviado', 'cancelado'].includes(this.status)) {
      errors.push('El status debe ser pendiente, pagado, enviado o cancelado');
    }
    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      products: this.products,
      total: this.total,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}

module.exports = Order;
