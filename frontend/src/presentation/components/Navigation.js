import React from "react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { Button as MuiButton, Stack } from "@mui/material";

const Navigation = () => {
  const config = [
    {
      name: "Home",
      path: "/dashboard",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
    },
    {
      name: "Users",
      path: "/dashboard/users",
    },
    {
      name: "Courses",
      path: "/dashboard/courses",
    },
  ];

  return (
    <Stack>
      {map(config, (item, index) => (
        <MuiButton key={index} component={Link} to={item.path}>
          {item.name}
        </MuiButton>
      ))}
    </Stack>
  );
};

export default Navigation;
