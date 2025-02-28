import React, { useCallback, useEffect, useState } from "react";
import Password from "../common/Inputs/Password";
import { FormProvider, useForm } from "react-hook-form";
import MembershipSection from "../components/MembershipSection";
import CoursesSection from "../components/CoursesSection";
import { useAuth } from "../../hooks/useAuth";
import { useChangePasswordMutation } from "../../state/asynchronous/users";
import { isEqual } from "lodash";

const Cabinet = () => {
  const methods = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
  });

  const { isUnauthorized, user } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [changePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();

  const togglePassword = useCallback(() => {
    setShowChangePassword((prev) => !prev);
  }, []);

  const closePasswordForm = useCallback(() => setShowChangePassword(false), []);

  const handleChangePassword = useCallback(
    (data) => {
      if (!isEqual(data.newPassword, data.repeatPassword)) return;
      changePassword(data);
    },
    [changePassword]
  );

  useEffect(() => {
    if (isSuccess) {
      closePasswordForm();
      methods.reset();
    }
  }, [isSuccess, methods, closePasswordForm]);

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
                <button className="button black medium">
                  {isLoading ? "Loading..." : "Change password"}
                </button>
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
