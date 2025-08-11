const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// CRUD Routes para Users
// CREATE - Crear nuevo usuario
router.post('/users', UserController.createUser);

// READ - Obtener todos los usuarios
router.get('/users', UserController.getAllUsers);

// READ - Obtener usuario por ID
router.get('/users/:id', UserController.getUserById);

// UPDATE - Actualizar usuario
router.put('/users/:id', UserController.updateUser);

// DELETE - Eliminar usuario
router.delete('/users/:id', UserController.deleteUser);

// Ruta de salud del microservicio
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Users Service está funcionando correctamente',
    timestamp: new Date().toISOString(),
    service: 'users-service'
  });
});

module.exports = router;
