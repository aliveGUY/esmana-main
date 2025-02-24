import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import OutlineTextfield from "../common/Inputs/OutlineTextfield";
import DatePicker from "../common/Inputs/DatePicker";
import { useCreateCourseMutation } from "../../state/asynchronous/users";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [createCourse, { isLoading, isSuccess }] = useCreateCourseMutation();

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

  const onSubmit = useCallback(
    (data) => {
      createCourse(data);
    },
    [createCourse]
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/courses");
    }
  }, [isSuccess]);

  return (
    <div className="card">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
          <OutlineTextfield required inputId="title" label="Title" />
          <OutlineTextfield inputId="students" label="Students" />
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
