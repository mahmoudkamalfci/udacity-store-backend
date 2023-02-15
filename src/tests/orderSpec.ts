import { user, userStore } from '../models/user';

import { order, orderStore } from '../models/order';

import supertest from 'supertest';
import app from '../server';

let token: string;

const store = new orderStore()
const uStore = new userStore()

describe("Order Model", () => {
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

  it('create method should add an order', async () => {
    // first create new user 
    const newuser = {
      firstname: "mahmoud",
      lastname: 'mahmoud',
      password: "mahmoud"
    }
    const userResult = await uStore.create(newuser);
    const result = await store.create({
      user_id: 1,
      order_status: 'completed'
    });
    jasmine.objectContaining({
      user_id: 1,
      order_status: "completed"
    });
  });

  it('show method should return the correct order', async () => {
    const result = await store.show("1");
    jasmine.objectContaining({
      user_id: 1,
      order_status: "completed"
    });
  })
})

describe("make sure all order endpoints working correct", () => {
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

  it('create order endpoint', async () => {
    const response = await request.post('/orders/').set('Authorization', 'Bearer ' + token).send({
      "user_id": 1,
      "order_status": "active"
    });
    expect(response.status).toBe(200);
  });
  it('return all orders from api', async () => {
    const response = await request.get('/orders').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
  it('return order by id from api', async () => {
    const response = await request.get('/orders/1').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
 
})