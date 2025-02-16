import React, { useCallback } from "react";
import { useDeleteUserMutation } from "../../state/asynchronous/users";

const UserListItem = ({ user }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = useCallback(
    () => deleteUser(user.id),
    [user, deleteUser]
  );

  return (
    <tr>
      <td>
        <div className="user-list-item">{user.username}</div>
      </td>
      <td>
        <div className="user-list-item">N/A</div>
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
