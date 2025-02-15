import UserListItem from "../components/UserListItem";
import { useGetAllUsersQuery } from "../../state/asynchronous/users";
import { useNavigate } from "react-router";
import React, { useCallback } from "react";

function Home() {
  const { data, isLoading } = useGetAllUsersQuery();
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
          {data?.map((user, index) => (
            <UserListItem key={index} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(Home);
