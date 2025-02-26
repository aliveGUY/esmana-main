import { isEmpty } from "lodash";
import React from "react";

const NotificationDetailsMembership = ({ membership }) => {
  if (isEmpty(membership)) return;
  return <div>membership details</div>;
};

export default NotificationDetailsMembership;
