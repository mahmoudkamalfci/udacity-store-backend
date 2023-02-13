import { user, userStore } from '../models/user';
import bcrypt from 'bcrypt'

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    ENV
} = process.env 
const store = new userStore()

describe("User Model", () => {
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

  it('create method should add an user ' + ENV, async () => {
    
    const newuser = {
        firstname: "mahmoud",
        lastname: 'mahmoud',
        password: "mahmoud"
      }
    const result = await store.create(newuser);
    const validPassword = bcrypt.compareSync(
        newuser.password + BCRYPT_PASSWORD,
        result.password
        );

        expect(validPassword).toBe(true)
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("1");
    jasmine.objectContaining({
        firstname: "mahmoud",
        lastname: 'mahmoud',
    })
  })
})