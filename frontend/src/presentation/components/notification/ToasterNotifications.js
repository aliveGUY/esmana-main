import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { map } from "lodash";
import { Paper, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  NOTIFICATION_SEVERITY_ERROR,
  NOTIFICATION_SEVERITY_INFO,
  NOTIFICATION_SEVERITY_SUCCESS,
  NOTIFICATION_SEVERITY_WARNING,
} from "../../../constants/notifications";

const NotificationIcon = ({ severity }) => {
  if (severity === NOTIFICATION_SEVERITY_SUCCESS)
    return <CheckCircleIcon sx={{ color: "green" }} />;
  if (severity === NOTIFICATION_SEVERITY_WARNING)
    return <WarningIcon sx={{ color: "orange" }} />;
  if (severity === NOTIFICATION_SEVERITY_ERROR)
    return <ErrorIcon sx={{ color: "red" }} />;
  if (severity === NOTIFICATION_SEVERITY_INFO)
    return <InfoIcon sx={{ color: "blue" }} />;
  return <QuestionMarkIcon sx={{ color: "blue" }} />;
};

const ToasterNotifications = () => {
  const notifications = useSelector(
    (state) => state.notifications.toasterNotification
  );

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 10,
        "@keyframes slideInOut": {
          "0%": { transform: "translateX(100%)" },
          "10%": { transform: "translateX(0)" },
          "90%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      }}
    >
      <Stack pt={4} spacing={2}>
        {map(notifications, (notification, index) => (
          <Box
            key={index}
            pr={4}
            sx={{
              animation: "slideInOut 4s ease-in-out forwards",
            }}
          >
            <Paper elevation={3}>
              <Stack direction="row" p={2} alignItems="center" spacing={2}>
                <NotificationIcon severity={notification.severity} />
                <Stack>
                  <Typography fontWeight={600}>
                    {notification.message.title}
                  </Typography>
                  <Typography fontSize={14}>
                    {notification.message.description}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default React.memo(ToasterNotifications);
