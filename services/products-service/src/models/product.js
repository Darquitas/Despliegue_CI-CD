class Product {
  constructor(id, name, category, price, stock, description, createdAt) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.stock = stock;
    this.description = description;
    this.createdAt = createdAt || new Date().toISOString();
  }

  // Validar datos del producto
  validate() {
    const errors = [];
    if (!this.name || this.name.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }
    if (!this.category || this.category.trim().length < 2) {
      errors.push('La categoría debe tener al menos 2 caracteres');
    }
    if (typeof this.price !== 'number' || this.price < 0) {
      errors.push('El precio debe ser un número positivo');
    }
    if (typeof this.stock !== 'number' || this.stock < 0) {
      errors.push('El stock debe ser un número positivo');
    }
    if (!this.description || this.description.trim().length < 5) {
      errors.push('La descripción debe tener al menos 5 caracteres');
    }
    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      price: this.price,
      stock: this.stock,
      description: this.description,
      createdAt: this.createdAt
    };
  }
}

module.exports = Product;
