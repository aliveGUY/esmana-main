import { isEmpty, map } from "lodash";
import React, { useCallback, useState } from "react";
import {
  useAddStudentsToCourseMutation,
  useRemoveStudentFromCourseMutation,
  useSearchForUserMutation,
} from "../../state/asynchronous/users";
import { FormProvider, useForm } from "react-hook-form";
import MultiValueAutoSelect from "../common/Inputs/MultiValueAutoSelect";

const CourseSectionStudents = (props) => {
  const { students, courseId } = props;
  const [formOpened, setFormOpened] = useState(false);

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      students: [],
      courseId,
    },
  });

  const [removeStudentFromCourse] = useRemoveStudentFromCourseMutation();
  const [addStudentsToCourse] = useAddStudentsToCourseMutation();
  const [searchForUser, { data }] = useSearchForUserMutation();

  const parseName = (student) =>
    [student.firstName, student.middleName, student.lastName].join(" ");

  const parseValue = (option) => option.email;

  const handleRemove = useCallback(
    (e) => {
      removeStudentFromCourse({
        studentId: Number(e.target.value),
        courseId,
      });
    },
    [removeStudentFromCourse, courseId]
  );

  const handleAdd = useCallback(
    (data) => {
      addStudentsToCourse(data);
      methods.setValue("students", []);
    },
    [addStudentsToCourse, methods]
  );

  const openForm = useCallback(() => setFormOpened(true), [setFormOpened]);
  const closeForm = useCallback(() => setFormOpened(false), [setFormOpened]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    if (!isEmpty(value)) searchForUser(value);
  }, [searchForUser]);

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
              <button
                className="button outlined small red"
                value={student.id}
                onClick={handleRemove}
              >
                Delete Student
              </button>
            </div>
          </div>
        ))}
        <span className="add-student-action">
          {formOpened ? (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleAdd)}>
                <MultiValueAutoSelect
                  required
                  inputId="students"
                  label="Students"
                  onChange={handleSearch}
                  options={data}
                  parseValue={parseValue}
                />
                <div className="actions">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="button black medium outlined"
                  >
                    Cancel
                  </button>
                  <button className="button black medium">Add</button>
                </div>
              </form>
            </FormProvider>
          ) : (
            <button className="button black medium outlined" onClick={openForm}>
              Add Students
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default React.memo(CourseSectionStudents);
