const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function testUsersCRUD() {
  console.log('Pueba para el CRUD de Users Service...\n');
  
  try {
    // 1. Health Check
    console.log('\n 1️. Health Check:');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('Health Check OK:', health.data.message);
    
    // 2. GET - Obtener todos los usuarios
    console.log('\n 2. GET /users:');
    const allUsers = await axios.get(`${BASE_URL}/users`);
    console.log('Usuarios obtenidos:', allUsers.data.total, 'usuarios');
    
    // 3. POST - Crear nuevo usuario
    console.log('\n 3️. POST /users:');
    const newUser = {
      name: 'Ana Rodríguez',
      email: 'ana@email.com',
      age: 27
    };
    const created = await axios.post(`${BASE_URL}/users`, newUser);
    console.log('Usuario creado con ID:', created.data.data.id);
    
    const userId = created.data.data.id;
    
    // 4. GET - Obtener usuario específico
    console.log('\n 4. GET /users/:id:');
    const user = await axios.get(`${BASE_URL}/users/${userId}`);
    console.log('Usuario obtenido:', user.data.data.name);
    
    // 5. PUT - Actualizar usuario
    console.log('\n 5. PUT /users/:id:');
    const updatedUser = {
      name: 'Ana Rodríguez López',
      email: 'ana.rodriguez@email.com',
      age: 28
    };
    const updated = await axios.put(`${BASE_URL}/users/${userId}`, updatedUser);
    console.log('Usuario actualizado:', updated.data.data.name);
    
    // 6. DELETE - Eliminar usuario
    console.log('\n 6. DELETE /users/:id:');
    const deleted = await axios.delete(`${BASE_URL}/users/${userId}`);
    console.log('Usuario eliminado:', deleted.data.data.name);
    
    console.log('\n ¡CRUD completo funcionando correctamente!');
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testUsersCRUD();
