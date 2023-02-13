import { user, userStore } from '../models/user';

import { order, orderStore } from '../models/order';

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

  it('delete method should remove the order', async () => {
    
    const result = await store.delete("1")
    // @ts-ignore
    expect(result).toEqual([])
  });
})