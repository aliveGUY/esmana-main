import { map } from "lodash";
import React from "react";

const CourseSectionStudents = (props) => {
  const { students } = props;

  const parseName = (student) =>
    [student.firstName, student.middleName, student.lastName].join(" ");

  return (
    <div className="details-frame-section">
      <h4>Active students</h4>
      <div className="students-list">
        {map(students, (student, index) => (
          <div key={index} className="student-lit-item">
            <div>{parseName(student)}</div>
            <div>{student.email}</div>
            <div>{student.phone}</div>
            <div>
              <button className="button outlined small red">Delete Student</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CourseSectionStudents);
