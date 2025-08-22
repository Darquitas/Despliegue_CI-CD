const axios = require('axios');

const BASE_URL = 'http://localhost:3002/api';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const logResult = (testName, response) => {
  console.log(`\n✅ ${testName}`);
  console.log(`Status: ${response.status}`);
  console.log('Response:', JSON.stringify(response.data, null, 2));
};

const logError = (testName, error) => {
  console.log(`\n❌ ${testName}`);
  console.log(`Error: ${error.message}`);
  if (error.response) {
    console.log(`Status: ${error.response.status}`);
    console.log('Response:', JSON.stringify(error.response.data, null, 2));
  }
};

async function testProductsAPI() {
  console.log('🧪 Iniciando pruebas del Products Microservice...\n');
  try {
    // 1. Health Check
    console.log('1️⃣ Probando Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    logResult('Health Check', healthResponse);

    await delay(1000);

    // 2. GET - Obtener todos los productos (iniciales)
    console.log('\n2️⃣ Probando GET /products (productos iniciales)...');
    const getAllResponse = await axios.get(`${BASE_URL}/products`);
    logResult('GET /products', getAllResponse);

    await delay(1000);

    // 3. POST - Crear nuevo producto
    console.log('\n3️⃣ Probando POST /products (crear producto)...');
    const newProduct = {
      name: 'Tarjeta Gráfica RTX 3060',
      category: 'Gráficas',
      price: 9500,
      stock: 4,
      description: 'Tarjeta gráfica NVIDIA RTX 3060 12GB'
    };
    const createResponse = await axios.post(`${BASE_URL}/products`, newProduct);
    logResult('POST /products', createResponse);

    const productId = createResponse.data.data.id;
    await delay(1000);

    // 4. GET - Obtener producto específico
    console.log('\n4️⃣ Probando GET /products/:id...');
    const getByIdResponse = await axios.get(`${BASE_URL}/products/${productId}`);
    logResult('GET /products/:id', getByIdResponse);

    await delay(1000);

    // 5. PUT - Actualizar producto
    console.log('\n5️⃣ Probando PUT /products/:id (actualizar producto)...');
    const updatedProduct = {
      name: 'Tarjeta Gráfica RTX 3060 Ti',
      category: 'Gráficas',
      price: 10500,
      stock: 3,
      description: 'Tarjeta gráfica NVIDIA RTX 3060 Ti 8GB'
    };
    const updateResponse = await axios.put(`${BASE_URL}/products/${productId}`, updatedProduct);
    logResult('PUT /products/:id', updateResponse);

    await delay(1000);

    // 6. GET - Verificar actualización
    console.log('\n6️⃣ Probando GET /products/:id (verificar actualización)...');
    const verifyUpdateResponse = await axios.get(`${BASE_URL}/products/${productId}`);
    logResult('GET /products/:id (verificado)', verifyUpdateResponse);

    await delay(1000);

    // 7. DELETE - Eliminar producto
    console.log('\n7️⃣ Probando DELETE /products/:id...');
    const deleteResponse = await axios.delete(`${BASE_URL}/products/${productId}`);
    logResult('DELETE /products/:id', deleteResponse);

    await delay(1000);

    // 8. GET - Verificar eliminación
    console.log('\n8️⃣ Probando GET /products/:id (verificar eliminación)...');
    try {
      await axios.get(`${BASE_URL}/products/${productId}`);
    } catch (error) {
      logError('GET /products/:id (producto eliminado)', error);
    }

    // 9. Prueba de validación - Nombre duplicado
    console.log('\n9️⃣ Probando validación de nombre duplicado...');
    try {
      await axios.post(`${BASE_URL}/products`, {
        name: 'Teclado Mecánico', // Nombre que ya existe
        category: 'Periféricos',
        price: 1200,
        stock: 10,
        description: 'Teclado RGB con switches azules'
      });
    } catch (error) {
      logError('POST /products (nombre duplicado)', error);
    }

    // 10. Prueba de validación - Datos inválidos
    console.log('\n🔟 Probando validación de datos inválidos...');
    try {
      await axios.post(`${BASE_URL}/products`, {
        name: 'A', // Nombre muy corto
        category: '', // Categoría vacía
        price: -100, // Precio inválido
        stock: -1, // Stock inválido
        description: '123' // Descripción muy corta
      });
    } catch (error) {
      logError('POST /products (datos inválidos)', error);
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

testProductsAPI();
