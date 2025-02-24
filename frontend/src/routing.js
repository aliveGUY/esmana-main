import React from "react";

import Home from "./presentation/pages/Home";
import Master from "./presentation/pages/Master";
import RegisterStudent from "./presentation/pages/RegisterStudent";
import Login from "./presentation/pages/Login";
import ProtectedRoutes from "./presentation/components/ProtectedRoutes";
import Cabinet from "./presentation/pages/Cabinet";
import CabinetRoutes from "./presentation/components/CabinetRoutes";
import RegisterMember from "./presentation/pages/RegisterMember";
import { element } from "prop-types";
import Courses from "./presentation/pages/Courses";
import CreateCourse from "./presentation/pages/CreateCourse";
import Memberships from "./presentation/pages/Memberships";

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
            path: "courses",
            children: [
              {
                index: true,
                element: <Courses />,
              },
              {
                path: "new",
                element: <CreateCourse />,
              },
            ],
          },
          {
            path: "memberships",
            element: <Memberships />,
          },
        ],
      },
    ],
  },
];

export default routing;
