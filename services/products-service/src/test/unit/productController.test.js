const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Product = require('../../models/product');
const productController = require('../../controllers/productController');

function mockRes() {
  return {
    status: sinon.stub().returnsThis(),
    json: sinon.stub().returnsThis()
  };
}

describe('productController', () => {
  afterEach(() => sinon.restore());

  describe('createProduct', () => {
    it('debe crear un producto nuevo', async () => {
      sinon.stub(Product, 'findOne').resolves(null);
      const fakeProduct = { name: 'prod', category: 'cat', price: 10, stock: 5, description: 'desc' };
      sinon.stub(Product, 'create').resolves(fakeProduct);
      const req = { body: fakeProduct };
      const res = mockRes();
      await productController.createProduct(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.called).to.be.true;
      expect(res.json.firstCall.args[0].success).to.be.true;
    });
    it('debe rechazar producto duplicado', async () => {
      sinon.stub(Product, 'findOne').resolves({ name: 'prod' });
      const req = { body: { name: 'prod' } };
      const res = mockRes();
      await productController.createProduct(req, res);
      expect(res.status.calledWith(409)).to.be.true;
      expect(res.json.firstCall.args[0].success).to.be.false;
    });
  });

  describe('getAllProducts', () => {
    it('debe devolver todos los productos', async () => {
      const fakeProducts = [{ name: 'prod1' }, { name: 'prod2' }];
      sinon.stub(Product, 'findAll').resolves(fakeProducts);
      const req = {};
      const res = mockRes();
      await productController.getAllProducts(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.firstCall.args[0].data).to.deep.equal(fakeProducts);
    });
  });

  describe('getProductById', () => {
    it('debe devolver un producto por id', async () => {
      const fakeProduct = { name: 'prod' };
      sinon.stub(Product, 'findByPk').resolves(fakeProduct);
      const req = { params: { id: 1 } };
      const res = mockRes();
      await productController.getProductById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.firstCall.args[0].data).to.deep.equal(fakeProduct);
    });
    it('debe devolver 404 si no existe el producto', async () => {
      sinon.stub(Product, 'findByPk').resolves(null);
      const req = { params: { id: 2 } };
      const res = mockRes();
      await productController.getProductById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });

  describe('updateProduct', () => {
    it('debe actualizar un producto existente', async () => {
      const fakeProduct = { update: sinon.stub().resolves(), name: 'prod' };
      sinon.stub(Product, 'findByPk').resolves(fakeProduct);
      const req = { params: { id: 1 }, body: { name: 'prod' } };
      const res = mockRes();
      await productController.updateProduct(req, res);
      expect(fakeProduct.update.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.firstCall.args[0].data).to.deep.equal(fakeProduct);
    });
    it('debe devolver 404 si el producto no existe', async () => {
      sinon.stub(Product, 'findByPk').resolves(null);
      const req = { params: { id: 2 }, body: {} };
      const res = mockRes();
      await productController.updateProduct(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });

  describe('deleteProduct', () => {
    it('debe eliminar un producto existente', async () => {
      const fakeProduct = { destroy: sinon.stub().resolves() };
      sinon.stub(Product, 'findByPk').resolves(fakeProduct);
      const req = { params: { id: 1 } };
      const res = mockRes();
      await productController.deleteProduct(req, res);
      expect(fakeProduct.destroy.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0].success).to.be.true;
    });
    it('debe devolver 404 si el producto no existe', async () => {
      sinon.stub(Product, 'findByPk').resolves(null);
      const req = { params: { id: 2 } };
      const res = mockRes();
      await productController.deleteProduct(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
  });
});
