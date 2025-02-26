import React from "react";

import Clients from "./presentation/pages/Clients";
import Master from "./presentation/pages/Master";
import RegisterStudent from "./presentation/pages/RegisterStudent";
import Login from "./presentation/pages/Login";
import ProtectedRoutes from "./presentation/components/ProtectedRoutes";
import Cabinet from "./presentation/pages/Cabinet";
import CabinetRoutes from "./presentation/components/CabinetRoutes";
import RegisterMember from "./presentation/pages/RegisterMember";
import Courses from "./presentation/pages/Courses";
import CreateCourse from "./presentation/pages/CreateCourse";
import Memberships from "./presentation/pages/Memberships";
import Home from "./presentation/pages/Home";
import NotificationDetails from "./presentation/pages/NotificationDetails";

const routing = [
  {
    path: "/",
    element: <Master />,
    children: [
      {
        path: "student-registration",
        title: "Esmana - Apply to school",
        description: "Metadata for esmana registration",
        element: <RegisterStudent />,
      },
      {
        path: "member-registration",
        title: "Esmana - Join ESMANA",
        description: "Metadata for esmana registration",
        element: <RegisterMember />,
      },
      {
        path: "login",
        title: "Esmana - Login",
        description: "Metadata for esmana login",
        element: <Login />,
      },
      {
        path: "courses",
        title: "Esmana - Courses",
        description: "Metadata for esmana login",
        element: <Courses />,
      },
      {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
          {
            index: true,
            title: "Esmana",
            description: "Metadata for esmana main page",
            element: <Home />,
          },
          {
            path: "clients",
            title: "Esmana - Clients",
            description: "Metadata for esmana main page",
            element: <Clients />,
          },
          {
            path: "cabinet",
            title: "Esmana - Cabinet",
            element: <CabinetRoutes />,
            children: [
              {
                path: ":id",
                element: <Cabinet />,
              },
            ],
          },
          {
            path: "courses/new",
            element: <CreateCourse />,
          },
          {
            path: "memberships",
            element: <Memberships />,
          },
          {
            path: "notification-details",
            element: <NotificationDetails />,
          },
        ],
      },
    ],
  },
];

export default routing;
