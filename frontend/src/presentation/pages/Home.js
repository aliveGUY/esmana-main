import { useGetAllUsersQuery } from "../../state/asynchronous/users";
import { useNavigate } from "react-router";
import React, { useCallback } from "react";
import UsersTable from "../components/UsersTable";

function Home() {
  const { isLoading } = useGetAllUsersQuery();
  const navigate = useNavigate();

  const redirect = useCallback(() => navigate("/register"), [navigate]);

  return (
    <div className="home-page">
      <div className="header">
        <h1>User Management</h1>
        <button className="button black medium" onClick={redirect}>
          Add User
        </button>
      </div>
      {isLoading ? "Loading..." : <UsersTable />}
    </div>
  );
}

export default React.memo(Home);
