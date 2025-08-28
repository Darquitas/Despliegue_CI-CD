const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Order = require('../../models/order');
const orderController = require('../../controllers/orderController');

function mockRes() {
  return {
    status: sinon.stub().returnsThis(),
    json: sinon.stub().returnsThis()
  };
}

describe('orderController', () => {
  afterEach(() => sinon.restore());

  /*describe('createOrder', () => {
    it('debe crear una orden', async () => {
      const fakeOrder = { userId: 1, products: [], total: 100, status: 'pendiente' };
      sinon.stub(Order, 'create').resolves(fakeOrder);
      const req = { body: fakeOrder };
      const res = mockRes();
      await orderController.createOrder(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.called).to.be.true;
    });
  });*/

  describe('getAllOrders', () => {
    it('debe devolver todas las ordenes', async () => {
      const fakeOrders = [{}, {}];
      sinon.stub(Order, 'findAll').resolves(fakeOrders);
      const req = {};
      const res = mockRes();
      await orderController.getAllOrders(req, res);
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(fakeOrders);
    });
  });

  /*describe('getOrderById', () => {
    it('debe devolver una orden por id', async () => {
      const fakeOrder = { id: 1 };
      sinon.stub(Order, 'findByPk').resolves(fakeOrder);
      const req = { params: { id: 1 } };
      const res = mockRes();
      await orderController.getOrderById(req, res);
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(fakeOrder);
    });
    it('debe devolver 404 si no existe la orden', async () => {
      sinon.stub(Order, 'findByPk').resolves(null);
      const req = { params: { id: 2 } };
      const res = mockRes();
      await orderController.getOrderById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });*/

  describe('updateOrder', () => {
    it('debe actualizar una orden existente', async () => {
      const fakeOrder = { update: sinon.stub().resolves(), id: 1 };
      sinon.stub(Order, 'findByPk').resolves(fakeOrder);
      const req = { params: { id: 1 }, body: { status: 'completada' } };
      const res = mockRes();
      await orderController.updateOrder(req, res);
      expect(fakeOrder.update.calledOnce).to.be.true;
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(fakeOrder);
    });
    it('debe devolver 404 si la orden no existe', async () => {
      sinon.stub(Order, 'findByPk').resolves(null);
      const req = { params: { id: 2 }, body: {} };
      const res = mockRes();
      await orderController.updateOrder(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });

  describe('deleteOrder', () => {
    it('debe eliminar una orden existente', async () => {
      const fakeOrder = { destroy: sinon.stub().resolves() };
      sinon.stub(Order, 'findByPk').resolves(fakeOrder);
      const req = { params: { id: 1 } };
      const res = mockRes();
      await orderController.deleteOrder(req, res);
      expect(fakeOrder.destroy.calledOnce).to.be.true;
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal({ message: 'Orden eliminada correctamente' });
    });
    it('debe devolver 404 si la orden no existe', async () => {
      sinon.stub(Order, 'findByPk').resolves(null);
      const req = { params: { id: 2 } };
      const res = mockRes();
      await orderController.deleteOrder(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });
});
