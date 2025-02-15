import UserListItem from "../components/UserListItem";
import { useGetAllUsersQuery } from "../../state/asynchronous/users";
import { useNavigate } from "react-router";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";

function Home() {
  const { isLoading } = useGetAllUsersQuery();
  const users = useSelector((state) => state.users.collection);
  const navigate = useNavigate();

  const redirect = useCallback(() => navigate("/register"), []);

  if (isLoading) return "Loading...";

  return (
    <div className="home-page">
      <div className="header">
        <h1>User Management</h1>
        <button className="button black medium" onClick={redirect}>
          Add User
        </button>
      </div>
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
    </div>
  );
}

export default React.memo(Home);
