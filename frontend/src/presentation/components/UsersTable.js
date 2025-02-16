import React from "react";
import { useSelector } from "react-redux";
import UserListItem from "./UserListItem";
import EmptyBoxIcon from "../../static/images/empty-box.svg";

const UsersTable = () => {
  const users = useSelector((state) => state.users.collection);

  if (users?.length === 0) {
    return (
      <center>
        <img
          src={EmptyBoxIcon}
          alt="Empty Box"
          style={{ width: 150, height: 150 }}
        />
      </center>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <td>
            <p className="column-title">Name</p>
          </td>
          <td>
            <p className="column-title">Role</p>
          </td>
          <td>
            <p className="column-title action-cell">Actions</p>
          </td>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => (
          <UserListItem key={index} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(UsersTable);
