import React, { useEffect } from "react";
import {
  useGetAllActiveCoursesMutation,
  useGetAllCoursesMutation,
} from "../../state/asynchronous/users";
import { useAuth } from "../../hooks/useAuth";
import CoursesTable from "../components/CoursesTable";

const Courses = () => {
  const [getAllCourses, { isLoading: isAllLoading }] =
    useGetAllCoursesMutation();
  const [getAllActiveCourses, { isLoading: isActiveLoading }] =
    useGetAllActiveCoursesMutation();

  const { isUnauthorized, isAuthorized } = useAuth();
  const isLoading = isAllLoading || isActiveLoading;

  useEffect(() => {
    if (isUnauthorized) {
      getAllActiveCourses();
    }

    if (isAuthorized) {
      getAllCourses();
    }
  }, [isUnauthorized, isAuthorized]);

  return (
    <div className="card">{isLoading ? "Loading..." : <CoursesTable />}</div>
  );
};

export default React.memo(Courses);
