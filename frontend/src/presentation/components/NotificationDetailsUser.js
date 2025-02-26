import { isEmpty } from "lodash";
import React from "react";

const NotificationDetailsUser = ({ user }) => {
  const name = [user.firstName, user.middleName, user.lastName].join(" ");

  if (isEmpty(user)) return;

  return (
    <div>
      <h4>User Details:</h4>
      <p>User Name: {name}</p>
      <p>Phone: {user.phone}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default NotificationDetailsUser;
