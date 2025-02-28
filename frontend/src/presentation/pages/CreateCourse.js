import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import OutlineTextfield from "../common/Inputs/OutlineTextfield";
import DatePicker from "../common/Inputs/DatePicker";
import {
  useCreateCourseMutation,
  useSearchForUserMutation,
} from "../../state/asynchronous/users";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import MultiValueAutoSelect from "../common/Inputs/MultiValueAutoSelect";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [createCourse, { isLoading, isSuccess }] = useCreateCourseMutation();
  const [searchForUser, { data }] = useSearchForUserMutation();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      students: [],
      beginningDate: "",
      availabilityTime: "",
      certificate: "",
    },
  });

  const parseValue = (option) => option.email;

  const onSubmit = useCallback(
    (data) => {
      createCourse(data);
    },
    [createCourse]
  );

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      if (!isEmpty(value)) searchForUser(value);
    },
    [searchForUser]
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/courses");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="card">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          <OutlineTextfield required inputId="title" label="Title" />
          <MultiValueAutoSelect
            required
            inputId="students"
            label="Students"
            onChange={handleSearch}
            options={data}
            parseValue={parseValue}
          />
          <DatePicker required inputId="beginningDate" label="Beginning Date" />
          <DatePicker
            required
            inputId="availabilityTime"
            label="Availability Time"
          />
          <OutlineTextfield
            required
            inputId="certificate"
            label="Certificate"
          />

          <div className="actions">
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

export default React.memo(CreateCourse);
