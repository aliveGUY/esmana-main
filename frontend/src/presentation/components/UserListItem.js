import React, { useCallback } from "react";
import { useDeleteUserMutation } from "../../state/asynchronous/users";
import { useNavigate } from "react-router-dom";

const UserListItem = ({ user }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDelete = useCallback(
    () => deleteUser(user.id),
    [user, deleteUser]
  );

  const redirect = useCallback(() => navigate(`cabinet/${user.id}`), []);

  const name = [user.firstName, user.middleName, user.lastName].join(" ");

  return (
    <tr className="user-list-row" onClick={redirect}>
      <td>
        <div className="user-list-item">{name}</div>
      </td>
      <td>
        <div className="user-list-item">{user.email}</div>
      </td>
      <td>
        <div className="user-list-item">{user.phone}</div>
      </td>
      <td>
        <div className="user-list-item">{user.role}</div>
      </td>
      <td>
        <div className="user-list-item action-cell">
          <button
            className="button outlined small red"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(UserListItem);
