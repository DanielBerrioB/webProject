var url = "http://localhost:4000";

/**
 * This function returns all the elements
 */
const getProducts = async () => {
  let products = await fetch(`${url}/main/`);
  products = await products.json();
  return products;
};

/**
 * This DELETE method allows to delete a product from the API
 * @param {Given id to remove a product} id
 */
const deleteProduct = async id => {
  return await fetch(`${url}/main/${id}`, { method: "DELETE" });
};

/**
 * Add a product to the API
 */
const addProduct = async producto => {
  const jsonProduct = {
    method: "POST",
    body: JSON.stringify(producto),
    headers: { "Content-Type": "application/json" }
  };
  return await fetch(`${url}/main/`, jsonProduct);
};

const putProduct = async (producto, id) => {
  const jsonProduct = {
    method: "PUT",
    body: JSON.stringify(producto),
    headers: { "Content-Type": "application/json" }
  };
  return await fetch(`${url}/main/${id}`, jsonProduct);
};

/**
 * This function returns all the users
 */
const getUsers = async () => {
  let users = await fetch(`${url}/users/create/`);
  users = await users.json();
  return users;
};

/**
 * This function allows to add a new user to the API
 * @param {User to add} user
 */
const postUser = async user => {
  const jsonUser = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  };
  return fetch(`${url}/users/create/`, jsonUser);
};

export default {
  getUsers,
  postUser,
  getProducts,
  deleteProduct,
  addProduct,
  putProduct
};
