
import { product, productStore } from '../models/product';

const store = new productStore()

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
    expect(result).toEqual([])
  });
})