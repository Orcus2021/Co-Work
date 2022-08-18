import React, { createContext, useState } from "react";

export const UserContext = createContext({
  user: {},
  addUser: () => {},
  removeUser: () => {},
});

const UserProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const addUserHandler = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const removeUserHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const initUser = {
    user: user,
    addUser: addUserHandler,
    removeUser: removeUserHandler,
  };

  return (
    <UserContext.Provider value={initUser}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
