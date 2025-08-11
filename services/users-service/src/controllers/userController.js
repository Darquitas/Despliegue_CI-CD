const User = require('../models/User');

// Base de datos simulada (en memoria para desarrollo)
let users = [
  new User(1, 'Juan Pérez', 'juan@email.com', 25),
  new User(2, 'María García', 'maria@email.com', 30),
  new User(3, 'Carlos López', 'carlos@email.com', 28)
];

let nextId = 4;

class UserController {
  // CREATE - Crear nuevo usuario
  static createUser(req, res) {
    try {
      const { name, email, age } = req.body;
      
      // Crear nuevo usuario
      const newUser = new User(nextId, name, email, age);
      
      // Validar datos
      const errors = newUser.validate();
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors: errors
        });
      }
      
      // Verificar si el email ya existe
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'El email ya está registrado'
        });
      }
      
      // Agregar usuario a la base de datos
      users.push(newUser);
      nextId++;
      
      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: newUser.toJSON()
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // READ - Obtener todos los usuarios
  static getAllUsers(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos exitosamente',
        data: users.map(user => user.toJSON()),
        total: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // READ - Obtener usuario por ID
  static getUserById(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const user = users.find(u => u.id === userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: user.toJSON()
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // UPDATE - Actualizar usuario
  static updateUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const { name, email, age } = req.body;
      
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }
      
      // Crear usuario actualizado
      const updatedUser = new User(userId, name, email, age, users[userIndex].createdAt);
      
      // Validar datos
      const errors = updatedUser.validate();
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors: errors
        });
      }
      
      // Verificar si el email ya existe (excluyendo el usuario actual)
      const existingUser = users.find(user => user.email === email && user.id !== userId);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'El email ya está registrado por otro usuario'
        });
      }
      
      // Actualizar usuario
      users[userIndex] = updatedUser;
      
      res.status(200).json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: updatedUser.toJSON()
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // DELETE - Eliminar usuario
  static deleteUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }
      
      // Eliminar usuario
      const deletedUser = users.splice(userIndex, 1)[0];
      
      res.status(200).json({
        success: true,
        message: 'Usuario eliminado exitosamente',
        data: deletedUser.toJSON()
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
}

module.exports = UserController;
