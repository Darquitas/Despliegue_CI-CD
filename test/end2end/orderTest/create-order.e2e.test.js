const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Order Creation E2E', () => {
  it('debe crear una orden', async () => {
    const res = await chai.request('http://localhost:3002')
      .post('/api/orders')
      .send({ userId: 3, products: [{ productId: 3, quantity: 2 }], total: 100, status: 'pendiente' });
    expect(res).to.have.status(201);
    expect(res.body).to.include({ userId: 3, total: 100, status: 'pendiente' });
  });
});
