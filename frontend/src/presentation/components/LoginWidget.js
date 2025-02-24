import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import Password from "../common/Inputs/Password";
import OutlineTextfield from "../common/Inputs/OutlineTextfield";
import { useLoginMutation } from "../../state/asynchronous/users";

const LoginWidget = forwardRef((_, ref) => {
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  const [isOpen, setOpen] = useState(false);
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      phoneOrEmail: "",
      password: "",
    },
  });

  const close = useCallback(() => {
    document.body.style.overflow = "";
    setOpen(false);
  }, []);

  const open = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const onSubmit = useCallback(login, [login]);

  useImperativeHandle(ref, () => ({
    open,
  }));

  useEffect(() => {
    if (isSuccess) close();
  }, [isSuccess]);

  return (
    <div className={`login-widget ${isOpen && "open"}`}>
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
              <button className="button black medium outlined" onClick={close}>
                Close
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
    </div>
  );
});

export default React.memo(LoginWidget);
