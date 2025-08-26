const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('User Registration E2E', () => {
  it('debe registrar un usuario', async () => {
    const res = await chai.request('http://localhost:3000')
      .post('/api/users')
      .send({ username: 'e2euser', email: 'e2euser@test.com', password: '12345' });
    expect(res).to.have.status(201);
    expect(res.body).to.include({ username: 'e2euser', email: 'e2euser@test.com' });
  });
});
