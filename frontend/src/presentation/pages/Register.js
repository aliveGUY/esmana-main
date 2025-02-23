import React, { useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../state/asynchronous/users";
import OutlineTextfield from "../common/Inputs/OutlineTextfield";
import Password from "../common/Inputs/Password";
import DatePicker from "../common/Inputs/DatePicker";
import AutoSelect from "../common/Inputs/AutoSelect";
import Checkbox from "../common/Inputs/Checkbox";
import CheckboxGroup from "../common/Inputs/CheckboxGroup";

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
      education: [],
      fieldOfWork: "",
      diplomaNumber: "",
      personalDataCollectionConsent: true,
    },
  });

  const onSubmit = useCallback(register, [register]);

  const redirect = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (isSuccess) redirect();
  }, [isSuccess, redirect]);

  return (
    <div className="register-page">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          <OutlineTextfield required inputId="email" label="Email" />
          <OutlineTextfield required inputId="phone" label="Phone number" />
          <Password required inputId="password" label="Password" />

          <hr />

          <OutlineTextfield required inputId="firstName" label="First name" />
          <OutlineTextfield inputId="middleName" label="Middle name" />
          <OutlineTextfield required inputId="lastName" label="Last name" />
          <DatePicker required inputId="birthDate" label="Birth date" />

          <CheckboxGroup
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
          <OutlineTextfield
            required
            inputId="diplomaNumber"
            label="Diploma number"
          />

          <OutlineTextfield required inputId="city" label="City" />
          <OutlineTextfield required inputId="workplace" label="Workplace" />
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
          <OutlineTextfield required inputId="position" label="Position" />

          <Checkbox
            required
            inputId="personalDataCollectionConsent"
            label={`In accordance with the requirements of the Law of Ukraine "On Personal Data Protection," I give my 
              consent and allow the processing of my personal data (full name, mobile phone number, email, place of 
              work, position, etc.), including the collection, systematization, accumulation, storage, clarification, 
              use, anonymization, and destruction of personal data.`}
            value={true}
          />

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
