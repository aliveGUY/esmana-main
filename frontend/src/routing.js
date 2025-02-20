import * as React from "react";

import Home from "./presentation/pages/Home";
import Master from "./presentation/pages/Master";
import Register from "./presentation/pages/Register";

const routing = [
  {
    path: "/",
    element: <Master />,
    children: [
      {
        index: true,
        title: "Esmana",
        description: "Metadata for esmana main page",
        element: <Home />,
      },
      {
        path: "register",
        title: "Esmana - Register",
        description: "Metadata for esmana registration",
        element: <Register />,
      },
    ],
  },
];

export default routing;
