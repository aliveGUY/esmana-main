import React, { useState } from "react";
import { useNavigationConfig } from "../../hooks/useNavigationConfig";
import { map } from "lodash";

import Collapse from "@mui/material/Collapse";
import { Box, Button, Stack } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NestedNavElement = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <Button
        fullWidth
        variant="outlined"
        onClick={toggle}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {title}
      </Button>
      <Collapse in={open}>
        <Stack pl={3}>{children}</Stack>
      </Collapse>
    </div>
  );
};

const SideNav = () => {
  const config = useNavigationConfig();

  const construct = (elements) => {
    return map(elements, (element) => {
      if (element.children) {
        return (
          <NestedNavElement
            title={element.title}
            children={construct(element.children)}
          />
        );
      }

      return (
        <Button fullWidth variant="outlined" href={element.path}>
          {element.title}
        </Button>
      );
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
      }}
    >
      <Stack>{construct(config)}</Stack>
    </Box>
  );
};

export default React.memo(SideNav);
