class User {
  constructor(id, name, email, age, createdAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = createdAt || new Date().toISOString();
  }

  // Validar datos del usuario
  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!this.email || !this.email.includes('@')) {
      errors.push('El email debe ser válido');
    }
    
    if (!this.age || this.age < 0 || this.age > 120) {
      errors.push('La edad debe estar entre 0 y 120 años');
    }
    
    return errors;
  }

  // Convertir a objeto plano
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;
