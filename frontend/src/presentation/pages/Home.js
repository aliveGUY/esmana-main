import { useGetAllUsersQuery } from "../../state/asynchronous/users";
import { useNavigate } from "react-router";
import React, { useCallback } from "react";
import UsersTable from "../components/UsersTable";

function Home() {
  const { isLoading } = useGetAllUsersQuery();
  const navigate = useNavigate();

  const redirectStudent = useCallback(
    () => navigate("/student-registration"),
    [navigate]
  );

  const redirectMember = useCallback(
    () => navigate("/member-registration?sync=no"),
    [navigate]
  );

  const redirectCourse = useCallback(
    () => navigate("/courses/new"),
    [navigate]
  );

  return (
    <div className="card">
      <div className="header">
        <h1>User Management</h1>

        <div>
          <button className="button black medium" onClick={redirectMember}>
            Register new Member
          </button>
          <button className="button black medium" onClick={redirectStudent}>
            Register new Student
          </button>
          <button className="button black medium" onClick={redirectCourse}>
            Create new Course
          </button>
        </div>
      </div>
      {isLoading ? "Loading..." : <UsersTable />}
    </div>
  );
}

export default React.memo(Home);
