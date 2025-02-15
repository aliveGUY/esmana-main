import React from "react";

const UserListItem = ({ user }) => {
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
          <button className="button outlined small red">Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(UserListItem);
