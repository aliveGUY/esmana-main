import { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../state/asynchronous/users";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, isSuccess }] = useRegisterUserMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback((data) => register(data), [register]);

  const redirect = useCallback(() => navigate("/"), [navigate]);

  const handleLabel = useCallback((e) => {
    const value = e.target.value;
    if (value.length === 0) {
      e.target.classList.remove("has-value");
    } else {
      e.target.classList.add("has-value");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) redirect();
  }, [isSuccess, redirect]);

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`input-wrapper ${errors.username?.message && "error"}`}>
          <Controller
            name="username"
            control={control}
            rules={{ required: "* Username is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="username"
                className="input"
                onChange={(e) => {
                  handleLabel(e);
                  field.onChange(e);
                }}
              />
            )}
          />
          <label htmlFor="username" className="label">
            User name
          </label>
          <p>{errors.username?.message}</p>
        </div>

        <div className={`input-wrapper ${errors.password?.message && "error"}`}>
          <Controller
            name="password"
            control={control}
            rules={{ required: "* Password is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="password"
                className="input"
                onChange={(e) => {
                  handleLabel(e);
                  field.onChange(e);
                }}
              />
            )}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <p>{errors.password?.message}</p>
        </div>

        <div className="actions">
          <button
            type="button"
            className="button black medium outlined"
            onClick={redirect}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button black medium"
            disabled={Object.keys(errors).length > 0 || isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
