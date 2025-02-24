import React, { Fragment, useCallback, useRef } from "react";
import OutlineTextfield from "../common/Inputs/OutlineTextfield";
import AutoSelect from "../common/Inputs/AutoSelect";
import Checkbox from "../common/Inputs/Checkbox";
import DatePicker from "../common/Inputs/DatePicker";
import Password from "../common/Inputs/Password";
import { FormProvider, useForm } from "react-hook-form";
import CheckboxGroup from "../common/Inputs/CheckboxGroup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ShieldIcon from "../../static/images/shield-check.svg";
import {
  useCheckIfUserExistsMutation,
  useExtendStudentToMemberMutation,
  useRegisterMemberMutation,
} from "../../state/asynchronous/users";
import { isEmpty } from "lodash";
import LoginWidget from "../components/LoginWidget";

const RegisterMember = () => {
  const navigate = useNavigate();
  const { isUnauthorized, user } = useAuth();
  const loginWidgetRef = useRef(null);

  const [checkIfUserExists, { data: isUserExist }] =
    useCheckIfUserExistsMutation();
  const [registerMember] = useRegisterMemberMutation();
  const [extendStudentToMember] = useExtendStudentToMemberMutation();

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
      residenceAddress: "",
      country: "",
      region: "",
      taxpayerId: "",
      passportId: "",
      passportIssuedBy: "",
      educationInstitution: "",
      workExperience: "",
      relevantTopics: "",
      personalDataCollectionConsent: true,
    },
  });

  const handleCheck = useCallback(() => {
    const [email, phone] = methods.getValues(["email", "phone"]);

    if (isEmpty(email) && isEmpty(phone)) return;

    checkIfUserExists({ email, phone });
  }, []);

  const redirect = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const openLoginWidget = useCallback(() => loginWidgetRef.current?.open(), []);

  const onSubmit = useCallback(
    (data) => {
      if (isUnauthorized) {
        registerMember(data);
        return;
      }

      extendStudentToMember({
        userId: user.id,
        residenceAddress: data.residenceAddress,
        country: data.country,
        region: data.region,
        taxpayerId: data.taxpayerId,
        passportId: data.passportId,
        passportIssuedBy: data.passportIssuedBy,
        educationInstitution: data.educationInstitution,
        workExperience: data.workExperience,
        relevantTopics: data.relevantTopics,
      });
    },
    [isUnauthorized, user]
  );

  return (
    <div className="card">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          {isUnauthorized ? (
            <Fragment>
              <OutlineTextfield
                required
                inputId="email"
                label="Email"
                onBlur={handleCheck}
              />
              <OutlineTextfield
                required
                inputId="phone"
                label="Phone number"
                onBlur={handleCheck}
              />
              <Password required inputId="password" label="Password" />

              {isUserExist && (
                <div className="recognized-banner">
                  <div className="recognize-login-container">
                    <p>This user already exists, login to verify its you</p>
                    <button
                      type="button"
                      className="button black medium outlined"
                      onClick={openLoginWidget}
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}

              <hr />

              <OutlineTextfield
                required
                inputId="firstName"
                label="First name"
              />
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
              <OutlineTextfield
                required
                inputId="workplace"
                label="Workplace"
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
              <OutlineTextfield required inputId="position" label="Position" />
            </Fragment>
          ) : (
            <div className="recognized-banner">
              <img src={ShieldIcon} alt="shield icon" className="icon" />
              <div>
                <h3>Recognized as {user.name}</h3>
                <p className="description">
                  We've hidden certain fields related to the data you've already
                  provided, so you don't have to fill them again. All your data
                  is secured.
                </p>
              </div>
            </div>
          )}

          <OutlineTextfield
            required
            inputId="residenceAddress"
            label="Residence Address"
          />
          <OutlineTextfield required inputId="country" label="Country" />
          <OutlineTextfield required inputId="region" label="Region" />
          <OutlineTextfield required inputId="taxpayerId" label="Taxpayer id" />
          <OutlineTextfield required inputId="passportId" label="Passport id" />
          <OutlineTextfield
            required
            inputId="passportIssuedBy"
            label="Passport issues by"
          />
          <OutlineTextfield
            required
            inputId="educationInstitution"
            label="Education institution"
          />
          <OutlineTextfield
            required
            inputId="workExperience"
            label="Work experience"
          />
          <OutlineTextfield
            required
            inputId="relevantTopics"
            label="Relevant topics"
          />

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
              disabled={Object.keys(methods.formState.errors).length > 0}
            >
              {false ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </FormProvider>
      <LoginWidget ref={loginWidgetRef} />
    </div>
  );
};

export default React.memo(RegisterMember);
