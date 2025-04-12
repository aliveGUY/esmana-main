import React from "react";
import Home from "./presentation/pages/Home";
import Profile from "./presentation/pages/Profile";
import Users from "./presentation/pages/Users";
import Courses from "./presentation/pages/Courses";
import Login from "./presentation/pages/Login";
import ForgotPassword from "./presentation/pages/ForgotPassword";
import ResetPassword from "./presentation/pages/ResetPassword";
import CheckoutMembership from "./presentation/pages/CheckoutMembership";
import CheckoutCourses from "./presentation/pages/CheckoutCourses";
import NotFoundPage from "./presentation/pages/404";
import DashboardLayout from "./presentation/common/DashboardLayout";

const routing = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/course-checkout",
    element: <CheckoutCourses />,
  },
  {
    path: "/membership-checkout",
    element: <CheckoutMembership />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        title: "Esmana - Apply to school",
        element: <Home />,
      },
      {
        path: "profile",
        title: "Esmana - Apply to school",
        element: <Profile />,
      },
      {
        path: "users",
        title: "Esmana - Apply to school",
        element: <Users />,
      },
      {
        path: "courses",
        title: "Esmana - Apply to school",
        element: <Courses />,
      },
      {
        path: "*",
        title: "Esmana - Apply to school",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    title: "Esmana - Apply to school",
    element: <NotFoundPage />,
  },
];

export default routing;
