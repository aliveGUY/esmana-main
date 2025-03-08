import React from "react";

import Clients from "./presentation/pages/Clients";
import RegisterStudent from "./presentation/pages/RegisterStudent";
import Login from "./presentation/pages/Login";
import Cabinet from "./presentation/pages/Cabinet";
import RegisterMember from "./presentation/pages/RegisterMember";
import Courses from "./presentation/pages/Courses";
import CreateCourse from "./presentation/pages/CreateCourse";
import Membership from "./presentation/pages/Membership";
import Home from "./presentation/pages/Home";
import Dashboard from "./presentation/components/layouts/Dashboard";
import Unauthorized from "./presentation/components/layouts/Unauthorized";
import { Navigate } from "react-router-dom";
import UserCourses from "./presentation/pages/UserCourses";
import Course from "./presentation/pages/Course";
import Checkout from "./presentation/pages/Checkout";
import Return from "./presentation/pages/Return";

const routing = [
  {
    path: "/",
    element: <Unauthorized />,
    children: [
      {
        path: "login",
        title: "Esmana - Apply to school",
        element: <Login />,
      },
      {
        path: "apply-school",
        title: "Esmana - Apply to school",
        element: <RegisterStudent />,
      },
      {
        path: "apply-organization",
        title: "Esmana - Apply to school",
        element: <RegisterMember sync />,
      },
      {
        path: "courses",
        title: "Esmana - Apply to school",
        element: <Courses />,
      },
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        title: "Esmana - Apply to school",
        element: <Home />,
      },
      {
        path: "checkout",
        title: "Esmana - Apply to school",
        element: <Checkout />,
      },
      {
        path: "return",
        title: "Esmana - Apply to school",
        element: <Return />,
      },
      {
        path: "membership",
        title: "Esmana - Apply to school",
        element: <Membership />,
      },
      {
        path: "courses",
        title: "Esmana - Apply to school",
        element: <Courses isDashboard />,
      },
      {
        path: "user-courses",
        title: "Esmana - Apply to school",
        element: <UserCourses />,
      },
      {
        path: "courses/new",
        title: "Esmana - Apply to school",
        element: <CreateCourse />,
      },
      {
        path: "course/:id",
        title: "Esmana - Apply to school",
        element: <Course />,
      },
      {
        path: "student-registration",
        title: "Esmana - Apply to school",
        element: <RegisterStudent />,
      },
      {
        path: "member-registration",
        title: "Esmana - Apply to school",
        element: <RegisterMember />,
      },
      {
        path: "clients",
        title: "Esmana - Apply to school",
        element: <Clients />,
      },
      {
        path: "cabinet/:id",
        title: "Esmana - Apply to school",
        element: <Cabinet />,
      },
    ],
  },
];

export default routing;
