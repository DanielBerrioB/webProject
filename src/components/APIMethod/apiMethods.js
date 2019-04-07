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

export default { getUsers, postUser, getProducts };
