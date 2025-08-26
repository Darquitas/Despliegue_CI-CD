
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));


const SERVER_URL = 'http://localhost:3000/api/users'; // Cambia el puerto si tu server usa otro

describe('User API Integration', () => {
  let createdUserId;

  it('debe crear un usuario', async () => {
    const res = await chai.request('http://localhost:3000')
      .post('/api/users')
      .send({ username: 'testuser', email: 'testuser@test.com', password: '12345' });
    expect(res).to.have.status(201);
    expect(res.body).to.include({ username: 'testuser', email: 'testuser@test.com' });
    createdUserId = res.body.id;
  });

  it('debe obtener todos los usuarios', async () => {
    const res = await chai.request('http://localhost:3000')
      .get('/api/users');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('debe obtener un usuario por id', async () => {
    const res = await chai.request('http://localhost:3000')
      .get(`/api/users/${createdUserId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.include({ username: 'testuser', email: 'testuser@test.com' });
  });

  it('debe actualizar un usuario', async () => {
    const res = await chai.request('http://localhost:3000')
      .put(`/api/users/${createdUserId}`)
      .send({ username: 'updateduser', email: 'updated@test.com', password: '54321' });
    expect(res).to.have.status(200);
    expect(res.body).to.include({ username: 'updateduser', email: 'updated@test.com' });
  });

  it('debe eliminar un usuario', async () => {
    const res = await chai.request('http://localhost:3000')
      .delete(`/api/users/${createdUserId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
  });
});
