import * as React from "react";

import Home from "./presentation/pages/Home";
import Master from "./presentation/pages/Master";
import Register from "./presentation/pages/Register";
import Login from "./presentation/pages/Login";
import ProtectedRoutes from "./presentation/components/ProtectedRoutes";

const routing = [
  {
    path: "/",
    element: <Master />,
    children: [
      {
        path: "register",
        title: "Esmana - Register",
        description: "Metadata for esmana registration",
        element: <Register />,
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
        ],
      },
    ],
  },
];

export default routing;
