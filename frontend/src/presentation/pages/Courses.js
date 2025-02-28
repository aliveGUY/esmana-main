import React, { useEffect } from "react";
import {
  useGetAllActiveCoursesMutation,
  useGetAllCoursesMutation,
} from "../../state/asynchronous/users";
import { useAuth } from "../../hooks/useAuth";
import CoursesTable from "../components/CoursesTable";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const Courses = ({ isDashboard = false }) => {
  const [getAllCourses, { isLoading: isAllLoading }] =
    useGetAllCoursesMutation();
  const [getAllActiveCourses, { isLoading: isActiveLoading }] =
    useGetAllActiveCoursesMutation();

  const courses = useSelector((state) => state.courses.availableCourses);
  const navigate = useNavigate();
  const { isUnauthorized, isAuthorized } = useAuth();
  const isLoading = isAllLoading || isActiveLoading;

  useEffect(() => {
    if (!isDashboard && isEmpty(courses)) navigate("/apply-school");
  }, [courses, isDashboard, navigate]);

  useEffect(() => {
    if (isUnauthorized) {
      getAllActiveCourses();
    }

    if (isAuthorized) {
      getAllCourses();
    }
  }, [isUnauthorized, isAuthorized, getAllCourses, getAllActiveCourses]);

  return (
    <div className="card">{isLoading ? "Loading..." : <CoursesTable />}</div>
  );
};

export default React.memo(Courses);
