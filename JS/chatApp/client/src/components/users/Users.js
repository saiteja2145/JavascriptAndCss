import React from "react";
import "./Users.css";
const Users = ({ users }) => {
  console.log(users);
  return (
    <ul className="clients">
      {users.map(user => (
        <li key={user.id} className="client">
          {user.name}
        </li>
      ))}
    </ul>
  );
};
export default Users;
