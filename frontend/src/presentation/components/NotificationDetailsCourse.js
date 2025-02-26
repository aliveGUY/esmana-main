import { format } from "date-fns";
import { isEmpty } from "lodash";
import React from "react";

const NotificationDetailsCourse = ({ course }) => {
  if (isEmpty(course)) return;
  const formattedDate = format(course.beginningDate, "yyyy/MM/dd HH:mm");


  return (
    <div>
      <h4>Course Details:</h4>
      <p>Title: {course.title}</p>
      <p>Active: {course.active ? "yes" : "no"}</p>
      <p>Begging Date: {formattedDate}</p>
    </div>
  );
};

export default NotificationDetailsCourse;
