import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import User from "../models/userModel.mjs";
import { connectDB, disconnect, findUser, saveUser } from "./db.mjs";

const royKeane = {
  firstName: "Roy",
  lastName: "Keane",
  address: "M16 Manchester United",
  state: "Greater Manchester",
  city: "Manchester",
  postcode: "MW18 5EF",
  email: "roykeane@manutd.com",
  password: "captain16",
};
vi.mock("./db.mjs");

beforeAll(async () => {
  return await connectDB();
});
describe("'User' Test Suite", () => {
  //TEST #1: saveUser()
  test("should save user in db", async () => {
    const newUser = new User(royKeane);
    const user = await saveUser(newUser);
    expect(user.firstName).toEqual("Roy");
    expect(user.lastName).toEqual("Keane");
    expect(user.address).toEqual("M16 Manchester United");
    expect(user.state).toEqual("Greater Manchester");
    expect(user.city).toEqual("Manchester");
    expect(user.email).toEqual("roykeane@manutd.com");
    expect(user.password).toEqual("captain16");
  });

  //TEST #2: findUser()
  test("should find a user in db by any property", async () => {
    const user = await findUser({ firstName: "Roy" });

    expect(user.firstName).toBe("Roy");
    expect(user.lastName).toBe("Keane");
    expect(user.address).toBe("M16 Manchester United");
    expect(user.state).toBe("Greater Manchester");
    expect(user.city).toBe("Manchester");
    expect(user.email).toBe("roykeane@manutd.com");
    expect(user.password).toBe("captain16");
  });
});

afterAll(async () => {
  return await disconnect();
});
// describe("", ()=>{
//   test("", ()=>{
//     expect().toEqual();
//   })
// });
