import React, { useCallback, useEffect } from "react";
import OutlineTextfield from "../common/Inputs/OutlineTextfield";
import { FormProvider, useForm } from "react-hook-form";
import DatePicker from "../common/Inputs/DatePicker";
import { useCreateLectureMutation } from "../../state/asynchronous/users";
import PropTypes from "prop-types";

const LectureFormWidget = (props) => {
  const { onCancel, courseId } = props;

  const [createLecture, { isSuccess }] = useCreateLectureMutation();
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      title: "",
      speakers: "",
      startTime: "",
      endTime: "",
      course: { id: courseId },
    },
  });

  const onSubmit = useCallback(createLecture, [createLecture]);

  useEffect(() => {
    if (isSuccess) onCancel();
  }, [isSuccess]);

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="lecture-creation-form"
        >
          <OutlineTextfield required inputId="title" label="Title" />
          <OutlineTextfield required inputId="speakers" label="Speakers" />
          <DatePicker required inputId="startTime" label="Start at" />
          <DatePicker required inputId="endTime" label="Ends at" />
          <div className="actions">
            <button
              type="button"
              onClick={onCancel}
              className="button black medium outlined"
            >
              Cancel
            </button>
            <button className="button black medium">Create</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

LectureFormWidget.propTypes = {
  courseId: PropTypes.number.isRequired,
};

export default React.memo(LectureFormWidget);
