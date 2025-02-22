import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Textfield from "../common/Inputs/Textfield";
import { useLoginMutation } from "../../state/asynchronous/users";
import Password from "../common/Inputs/Password";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback(login, [login]);

  const redirect = useCallback(() => navigate("/register"), [navigate]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="register-page">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          <Textfield inputId="phoneOrEmail" label="Phone or email" />
          <Password inputId="password" label="Password" required />

          {isError && <p className="error">Incorrect username or password</p>}

          <div className="actions">
            <button
              type="button"
              className="button black medium outlined"
              onClick={redirect}
            >
              Register
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
