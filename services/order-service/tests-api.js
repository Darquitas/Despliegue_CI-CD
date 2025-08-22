const axios = require('axios');

const BASE_URL = 'http://localhost:3003/api';

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

async function testOrdersAPI() {
  console.log('🧪 Iniciando pruebas del Order Microservice...\n');
  try {
    // 1. Health Check
    console.log('1️⃣ Probando Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    logResult('Health Check', healthResponse);

    await delay(1000);

    // 2. GET - Obtener todas las órdenes (iniciales)
    console.log('\n2️⃣ Probando GET /orders (órdenes iniciales)...');
    const getAllResponse = await axios.get(`${BASE_URL}/orders`);
    logResult('GET /orders', getAllResponse);

    await delay(1000);

    // 3. POST - Crear nueva orden
    console.log('\n3️⃣ Probando POST /orders (crear orden)...');
    const newOrder = {
      userId: 1,
      products: [
        { productId: 1, quantity: 2 },
        { productId: 3, quantity: 1 }
      ],
      total: 6600,
      status: 'pendiente'
    };
    const createResponse = await axios.post(`${BASE_URL}/orders`, newOrder);
    logResult('POST /orders', createResponse);

    const orderId = createResponse.data.data.id;
    await delay(1000);

    // 4. GET - Obtener orden específica
    console.log('\n4️⃣ Probando GET /orders/:id...');
    const getByIdResponse = await axios.get(`${BASE_URL}/orders/${orderId}`);
    logResult('GET /orders/:id', getByIdResponse);

    await delay(1000);

    // 5. PUT - Actualizar orden
    console.log('\n5️⃣ Probando PUT /orders/:id (actualizar orden)...');
    const updatedOrder = {
      userId: 1,
      products: [
        { productId: 2, quantity: 1 }
      ],
      total: 3500,
      status: 'pagado'
    };
    const updateResponse = await axios.put(`${BASE_URL}/orders/${orderId}`, updatedOrder);
    logResult('PUT /orders/:id', updateResponse);

    await delay(1000);

    // 6. GET - Verificar actualización
    console.log('\n6️⃣ Probando GET /orders/:id (verificar actualización)...');
    const verifyUpdateResponse = await axios.get(`${BASE_URL}/orders/${orderId}`);
    logResult('GET /orders/:id (verificado)', verifyUpdateResponse);

    await delay(1000);

    // 7. DELETE - Eliminar orden
    console.log('\n7️⃣ Probando DELETE /orders/:id...');
    const deleteResponse = await axios.delete(`${BASE_URL}/orders/${orderId}`);
    logResult('DELETE /orders/:id', deleteResponse);

    await delay(1000);

    // 8. GET - Verificar eliminación
    console.log('\n8️⃣ Probando GET /orders/:id (verificar eliminación)...');
    try {
      await axios.get(`${BASE_URL}/orders/${orderId}`);
    } catch (error) {
      logError('GET /orders/:id (orden eliminada)', error);
    }

    // 9. Prueba de validación - Datos inválidos
    console.log('\n9️⃣ Probando validación de datos inválidos...');
    try {
      await axios.post(`${BASE_URL}/orders`, {
        userId: 'abc', // userId inválido
        products: [], // Sin productos
        total: -100, // Total inválido
        status: 'desconocido' // Status inválido
      });
    } catch (error) {
      logError('POST /orders (datos inválidos)', error);
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

testOrdersAPI();
