
import { product, productStore } from '../models/product';
import supertest from 'supertest';
import app from '../server';
const store = new productStore()

let token: string;

describe("product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add an product', async () => {
   
    const result = await store.create({
        name: "mahmoud",
        price: 100,
        category: "men"
    });
    jasmine.objectContaining({
        name: "mahmoud",
        price: 100,
        category: "men"
    });
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    jasmine.objectContaining({
        name: "mahmoud",
        price: 100,
        category: "men"
    });
  })

  it('delete method should remove the product', async () => {
    
    const result = await store.delete("1")
    // @ts-ignore
    expect(result).toEqual(1)
  });
})

describe("make sure all product endpoints working correct", () => {
  // test /api endpoint response status
  const request = supertest(app);
  it('make sure user is authenticate to get user token (note this)', async () => {
    const response = await request.get('/users/authenticate').send({
      firstname:"mahmoud",
      lastname:"mahmoud",
      password:"mahmoud"
    });
    expect(response.status).toBe(200);
    token = response.body;

  });

  it('create product endpoint', async () => {
    const response = await request.post('/products/').set('Authorization', 'Bearer ' + token).send({
      "name": "product 1",
      "price": 33,
      "quantity": 5,
      "category": "Men"
    });
    expect(response.status).toBe(200);
  });
  it('return all products from api', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it('return product by id from api', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });
 
})