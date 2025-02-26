import React, { useCallback, useEffect, useState } from "react";
import Password from "../common/Inputs/Password";
import { FormProvider, useForm } from "react-hook-form";
import MembershipSection from "../components/MembershipSection";
import CoursesSection from "../components/CoursesSection";
import { useAuth } from "../../hooks/useAuth";
import {
  useGetCoursesByStudentMutation,
  useGetPendingCoursesByStudentMutation,
} from "../../state/asynchronous/users";

const Cabinet = () => {
  const methods = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
  });

  const { isUnauthorized, isAuthorized, user } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [getCoursesByStudent] = useGetCoursesByStudentMutation();
  const [getPendingCoursesByStudent] = useGetPendingCoursesByStudentMutation();

  const togglePassword = useCallback(() => {
    setShowChangePassword((prev) => !prev);
  }, []);

  const handleChangePassword = useCallback((data) => {
    console.log({ data });
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      getCoursesByStudent(user.id);
      getPendingCoursesByStudent(user.id);
    }
  }, [isAuthorized, user]);

  if (isUnauthorized) return;

  const name = [user.firstName, user.middleName, user.lastName].join(" ");

  return (
    <div className="card cabinet-page">
      <div className="section">
        <div>Name: {name}</div>
        <div>Phone: {user.phone}</div>
        <div>Email: {user.email}</div>
      </div>

      <hr />

      <div className="section">
        {showChangePassword ? (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleChangePassword)}
              className="change-password-form"
            >
              <Password required inputId="oldPassword" label="Old password" />
              <Password required inputId="newPassword" label="New password" />
              <Password
                required
                inputId="repeatPassword"
                label="Repeat password"
              />

              <div className="actions">
                <button
                  className="button black medium outlined"
                  type="button"
                  onClick={togglePassword}
                >
                  Cancel
                </button>
                <button className="button black medium">Change password</button>
              </div>
            </form>
          </FormProvider>
        ) : (
          <button
            className="button black medium outlined"
            onClick={togglePassword}
          >
            Change password
          </button>
        )}
      </div>

      <hr />

      <div className="section">
        <MembershipSection />
        <CoursesSection />
      </div>
    </div>
  );
};

export default React.memo(Cabinet);
