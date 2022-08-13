import React, { createContext, useState } from "react";

export const UserContext = createContext({
  user: {},
  addUser: () => {},
  removeUser: () => {},
});

const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const addUserHandler = (user) => {
    setUser(user);
  };
  const removeUserHandler = () => {
    setUser({});
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
