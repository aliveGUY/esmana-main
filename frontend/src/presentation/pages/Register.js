import React, { useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../state/asynchronous/users";
import Textfield from "../common/Inputs/Textfield";
import Password from "../common/Inputs/Password";
import DatePicker from "../common/Inputs/DatePicker";
import AutoSelect from "../common/Inputs/AutoSelect";
import Checkbox from "../common/Inputs/Checkbox";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, isSuccess }] = useRegisterUserMutation();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
      city: "",
      workplace: "",
      position: "",
      education: "",
      fieldOfWork: "",
      diplomaNumber: "",
      personalDataCollectionConsent: "",
    },
  });

  const onSubmit = useCallback(register, [register]);

  const redirect = useCallback(() => navigate("/"), [navigate]);

  useEffect(() => {
    if (isSuccess) redirect();
  }, [isSuccess, redirect]);

  return (
    <div className="register-page">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          <Textfield required inputId="email" label="Email" />
          <Textfield required inputId="phone" label="Phone number" />
          <Password required inputId="password" label="Password" />

          <hr />

          <Textfield required inputId="firstName" label="First name" />
          <Textfield inputId="middleName" label="Middle name" />
          <Textfield required inputId="lastName" label="Last name" />
          <DatePicker required inputId="birthDate" label="Birth date" />
          <Textfield required inputId="city" label="City" />
          <Textfield required inputId="workplace" label="Workplace" />
          <Textfield required inputId="position" label="Position" />
          <Checkbox
            required
            inputId="education"
            label="Education"
            options={[
              "Higher medical",
              "Higher non-medical",
              "Vocational/technical",
              "Student/Postgraduate/Intern",
            ]}
          />
          <AutoSelect
            required
            inputId="fieldOfWork"
            label="Field of work"
            options={[
              "Doctor",
              "Pharmacist",
              "Junior specialist with medical education",
              "Professional with higher non-medical education working in the healthcare system",
              "Healthcare professional in healthcare institutions",
              "Specialists in the field of corrective pedagogy",
            ]}
          />
          <Textfield required inputId="diplomaNumber" label="Diploma number" />
          <Textfield
            required
            inputId="personalDataCollectionConsent"
            label="concent"
          />

          <Checkbox  options={["Accept all Terms of Usage"]}/>

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
              disabled={
                Object.keys(methods.formState.errors).length > 0 || isLoading
              }
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default React.memo(Register);
