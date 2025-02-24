import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import Password from "../common/Inputs/Password";
import { FormProvider, useForm } from "react-hook-form";
import MembershipSection from "../components/MembershipSection";
import CoursesSection from "../components/CoursesSection";

const Cabinet = () => {
  const { id } = useParams();
  const methods = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
  });

  const auth = useSelector((state) => state.auth);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowChangePassword((prev) => !prev);
  }, []);

  const handleChangePassword = useCallback((data) => {
    console.log({ data });
  });

  if (isEmpty(auth.user)) return;

  const name = [auth.user.firstName, auth.user.middleName, auth.user.lastName].join(" ");

  return (
    <div className="card cabinet-page">
      <div className="section">
        <div>Name: {name}</div>
        <div>Phone: {auth.user.phone}</div>
        <div>Email: {auth.user.email}</div>
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
