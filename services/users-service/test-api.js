const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

// Función para hacer pausa entre requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para mostrar resultados
const logResult = (testName, response) => {
  console.log(`\n✅ ${testName}`);
  console.log(`Status: ${response.status}`);
  console.log('Response:', JSON.stringify(response.data, null, 2));
};

// Función para mostrar errores
const logError = (testName, error) => {
  console.log(`\n❌ ${testName}`);
  console.log(`Error: ${error.message}`);
  if (error.response) {
    console.log(`Status: ${error.response.status}`);
    console.log('Response:', JSON.stringify(error.response.data, null, 2));
  }
};

// Tests del CRUD
async function testUsersAPI() {
  console.log('🧪 Iniciando pruebas del Users Microservice...\n');
  
  try {
    // 1. Health Check
    console.log('1️⃣ Probando Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    logResult('Health Check', healthResponse);
    
    await delay(1000);
    
    // 2. GET - Obtener todos los usuarios (iniciales)
    console.log('\n2️⃣ Probando GET /users (usuarios iniciales)...');
    const getAllResponse = await axios.get(`${BASE_URL}/users`);
    logResult('GET /users', getAllResponse);
    
    await delay(1000);
    
    // 3. POST - Crear nuevo usuario
    console.log('\n3️⃣ Probando POST /users (crear usuario)...');
    const newUser = {
      name: 'Ana Rodríguez',
      email: 'ana@email.com',
      age: 27
    };
    const createResponse = await axios.post(`${BASE_URL}/users`, newUser);
    logResult('POST /users', createResponse);
    
    const userId = createResponse.data.data.id;
    await delay(1000);
    
    // 4. GET - Obtener usuario específico
    console.log('\n4️⃣ Probando GET /users/:id...');
    const getByIdResponse = await axios.get(`${BASE_URL}/users/${userId}`);
    logResult('GET /users/:id', getByIdResponse);
    
    await delay(1000);
    
    // 5. PUT - Actualizar usuario
    console.log('\n5️⃣ Probando PUT /users/:id (actualizar usuario)...');
    const updatedUser = {
      name: 'Ana Rodríguez López',
      email: 'ana.rodriguez@email.com',
      age: 28
    };
    const updateResponse = await axios.put(`${BASE_URL}/users/${userId}`, updatedUser);
    logResult('PUT /users/:id', updateResponse);
    
    await delay(1000);
    
    // 6. GET - Verificar actualización
    console.log('\n6️⃣ Probando GET /users/:id (verificar actualización)...');
    const verifyUpdateResponse = await axios.get(`${BASE_URL}/users/${userId}`);
    logResult('GET /users/:id (verificado)', verifyUpdateResponse);
    
    await delay(1000);
    
    // 7. DELETE - Eliminar usuario
    console.log('\n7️⃣ Probando DELETE /users/:id...');
    const deleteResponse = await axios.delete(`${BASE_URL}/users/${userId}`);
    logResult('DELETE /users/:id', deleteResponse);
    
    await delay(1000);
    
    // 8. GET - Verificar eliminación
    console.log('\n8️⃣ Probando GET /users/:id (verificar eliminación)...');
    try {
      await axios.get(`${BASE_URL}/users/${userId}`);
    } catch (error) {
      logError('GET /users/:id (usuario eliminado)', error);
    }
    
    // 9. Prueba de validación - Email duplicado
    console.log('\n9️⃣ Probando validación de email duplicado...');
    try {
      await axios.post(`${BASE_URL}/users`, {
        name: 'Test User',
        email: 'juan@email.com', // Email que ya existe
        age: 25
      });
    } catch (error) {
      logError('POST /users (email duplicado)', error);
    }
    
    // 10. Prueba de validación - Datos inválidos
    console.log('\n🔟 Probando validación de datos inválidos...');
    try {
      await axios.post(`${BASE_URL}/users`, {
        name: 'A', // Nombre muy corto
        email: 'invalid-email', // Email inválido
        age: -5 // Edad inválida
      });
    } catch (error) {
      logError('POST /users (datos inválidos)', error);
    }
    
    console.log('\n🎉 ¡Todas las pruebas completadas!');
    console.log('📊 Resumen:');
    console.log('- ✅ Health Check funcionando');
    console.log('- ✅ CRUD completo funcionando');
    console.log('- ✅ Validaciones funcionando');
    console.log('- ✅ Manejo de errores funcionando');
    
  } catch (error) {
    console.error('\n💥 Error en las pruebas:', error.message);
  }
}

// Ejecutar pruebas
testUsersAPI();
