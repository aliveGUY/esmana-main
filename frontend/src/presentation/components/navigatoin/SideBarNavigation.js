import React, { useCallback, useState } from "react";
import { useNavigationConfig } from "../../../hooks/useNavigationConfig";
import { map } from "lodash";

import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const NestedNavElement = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

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

const SideBarNavigation = () => {
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
        <Button fullWidth variant="outlined" component={Link} to={element.path}>
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

export default React.memo(SideBarNavigation);
