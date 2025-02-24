import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import OutlineTextfield from "../common/Inputs/OutlineTextfield";
import { useLoginMutation } from "../../state/asynchronous/users";
import Password from "../common/Inputs/Password";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      phoneOrEmail: "",
      password: "",
    },
  });

  const onSubmit = useCallback(login, [login]);

  const redirectStudent = useCallback(
    () => navigate("/student-registration"),
    [navigate]
  );
  const redirectMember = useCallback(
    () => navigate("/member-registration?sync=yes"),
    [navigate]
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="card">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          <OutlineTextfield
            required
            inputId="phoneOrEmail"
            label="Phone or email"
          />
          <Password required inputId="password" label="Password" />

          {isError && <p className="error">Incorrect username or password</p>}

          <div className="actions">
            <button
              type="button"
              className="button black medium outlined"
              onClick={redirectMember}
            >
              Join organization
            </button>
            <button
              type="button"
              className="button black medium outlined"
              onClick={redirectStudent}
            >
              Apply to school
            </button>
            <button
              type="submit"
              className="button black medium"
              disabled={
                Object.keys(methods.formState.errors).length > 0 || isLoading
              }
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default React.memo(Login);
