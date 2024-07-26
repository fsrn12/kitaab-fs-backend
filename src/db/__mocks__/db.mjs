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

export const connectDB = async () => {
  console.log("MongoDB Mock Connected");
};

export const disconnect = async () => {
  console.log("MongoDB Mock Disconnected");
};

export const findUser = async (obj) => {
  return Promise.resolve(royKeane);
};

export const saveUser = async (newUser) => {
  return Promise.resolve(royKeane);
};
