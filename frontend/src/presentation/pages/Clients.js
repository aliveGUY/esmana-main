import { useGetAllUsersQuery } from "../../state/asynchronous/users";
import React from "react";
import UsersTable from "../components/UsersTable";

function Clients() {
  const { isLoading } = useGetAllUsersQuery();

  return (
    <div className="card">
      <div className="header">
        <h1>User Management</h1>
      </div>
      {isLoading ? "Loading..." : <UsersTable />}
    </div>
  );
}

export default React.memo(Clients);
