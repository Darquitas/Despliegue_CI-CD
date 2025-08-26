const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Product Creation E2E', () => {
  it('debe crear un producto', async () => {
    const res = await chai.request('http://localhost:3001')
      .post('/api/products')
      .send({ name: 'e2eproduct', category: 'test', price: 10, stock: 5, description: 'desc' });
    expect(res).to.have.status(201);
    expect(res.body.success).to.be.true;
    expect(res.body.data).to.include({ name: 'e2eproduct' });
  });
});
