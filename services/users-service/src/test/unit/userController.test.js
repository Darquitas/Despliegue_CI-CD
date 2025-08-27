const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const User = require('../../models/User');
const userController = require('../../controllers/userController');

function mockRes() {
  return {
    status: sinon.stub().returnsThis(),
    json: sinon.stub().returnsThis()
  };
}

describe('userController', () => {
  afterEach(() => sinon.restore());

  describe('getUsers', () => {
    it('debe devolver todos los usuarios', async () => {
      const fakeUsers = [{ username: 'test', email: 'test@test.com', password: '123' }];
      sinon.stub(User, 'findAll').resolves(fakeUsers);
      const req = {};
      const res = mockRes();
      await userController.getUsers(req, res);
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(fakeUsers);
    });
    it('debe devolver error 500 si falla la consulta', async () => {
      sinon.stub(User, 'findAll').rejects(new Error('DB error'));
      const consoleErrorStub = sinon.stub(console, 'error');
      const req = {};
      const res = mockRes();
      await userController.getUsers(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('error');
      expect(consoleErrorStub.called).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe('getUserById', () => {
    it('debe devolver un usuario por id', async () => {
      const fakeUser = { id: 1, username: 'test', email: 'test@test.com', password: '123' };
      sinon.stub(User, 'findByPk').resolves(fakeUser);
      const req = { params: { id: 1 } };
      const res = mockRes();
      await userController.getUserById(req, res);
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(fakeUser);
    });
    it('debe devolver 404 si no existe el usuario', async () => {
      sinon.stub(User, 'findByPk').resolves(null);
      const req = { params: { id: 2 } };
      const res = mockRes();
      await userController.getUserById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
    it('debe devolver error 500 si falla la consulta', async () => {
      sinon.stub(User, 'findByPk').rejects(new Error('DB error'));
      const consoleErrorStub = sinon.stub(console, 'error');
      const req = { params: { id: 1 } };
      const res = mockRes();
      await userController.getUserById(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('error');
      expect(consoleErrorStub.called).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe('createUser', () => {
    it('debe crear un usuario', async () => {
      const fakeUser = { username: 'nuevo', email: 'nuevo@test.com', password: 'abc' };
      sinon.stub(User, 'create').resolves(fakeUser);
      const req = { body: fakeUser };
      const res = mockRes();
      await userController.createUser(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(fakeUser);
    });
    it('debe devolver error 500 si falla la creación', async () => {
      sinon.stub(User, 'create').rejects(new Error('DB error'));
      const consoleErrorStub = sinon.stub(console, 'error');
      const req = { body: { username: 'nuevo', email: 'nuevo@test.com', password: 'abc' } };
      const res = mockRes();
      await userController.createUser(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('error');
      expect(consoleErrorStub.called).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe('updateUser', () => {
    it('debe actualizar un usuario existente', async () => {
      const fakeUser = { update: sinon.stub().resolves(), username: 'edit', email: 'edit@test.com', password: 'xyz' };
      sinon.stub(User, 'findByPk').resolves(fakeUser);
      const req = { params: { id: 1 }, body: { username: 'edit', email: 'edit@test.com', password: 'xyz' } };
      const res = mockRes();
      await userController.updateUser(req, res);
      expect(fakeUser.update.calledOnce).to.be.true;
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(fakeUser);
    });
    it('debe devolver 404 si el usuario no existe', async () => {
      sinon.stub(User, 'findByPk').resolves(null);
      const req = { params: { id: 2 }, body: {} };
      const res = mockRes();
      await userController.updateUser(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
    it('debe devolver error 500 si falla la actualización', async () => {
      sinon.stub(User, 'findByPk').rejects(new Error('DB error'));
      const consoleErrorStub = sinon.stub(console, 'error');
      const req = { params: { id: 1 }, body: {} };
      const res = mockRes();
      await userController.updateUser(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('error');
      expect(consoleErrorStub.called).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe('deleteUser', () => {
    it('debe eliminar un usuario existente', async () => {
      const fakeUser = { destroy: sinon.stub().resolves() };
      sinon.stub(User, 'findByPk').resolves(fakeUser);
      const req = { params: { id: 1 } };
      const res = mockRes();
      await userController.deleteUser(req, res);
      expect(fakeUser.destroy.calledOnce).to.be.true;
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal({ message: 'Usuario eliminado correctamente' });
    });
    it('debe devolver 404 si el usuario no existe', async () => {
      sinon.stub(User, 'findByPk').resolves(null);
      const req = { params: { id: 2 } };
      const res = mockRes();
      await userController.deleteUser(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
    it('debe devolver error 500 si falla la eliminación', async () => {
      sinon.stub(User, 'findByPk').rejects(new Error('DB error'));
      const consoleErrorStub = sinon.stub(console, 'error');
      const req = { params: { id: 1 } };
      const res = mockRes();
      await userController.deleteUser(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('error');
      expect(consoleErrorStub.called).to.be.true;
      consoleErrorStub.restore();
    });
  });
});
