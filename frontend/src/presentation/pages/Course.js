import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { find, isEmpty, map } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCreateCallMutation } from "../../state/asynchronous/users";

const Course = () => {
  const { id } = useParams();
  const [selectedLecture, setSelectedLecture] = useState(0);
  const courses = useSelector((state) => state.courses.studentActiveCourses);
  const course = find(courses, (course) => course.id === Number(id));

  const [createCall] = useCreateCallMutation();
  const handleCall = useCallback(createCall, [createCall]);

  const lecture = useMemo(
    () => course?.lectures[selectedLecture],
    [selectedLecture, course]
  );

  console.log({ lecture });

  const parseSpeakerNames = (speakers) => {
    const namesArray = map(speakers, (speaker) =>
      [speaker.firstName, speaker.middleName, speaker.lastName].join(" ")
    );
    return namesArray.join(", ");
  };

  const handleLectureSelection = useCallback(
    (e) => setSelectedLecture(Number(e.target.value)),
    []
  );

  if (isEmpty(course) || isEmpty(course.lectures)) return "Loading...";

  return (
    <Paper>
      <Stack direction="row" p={2} spacing={2}>
        <Stack>
          {map(course.lectures, (lecture, index) => (
            <Button
              value={index}
              variant={selectedLecture === index ? "contained" : "outlined"}
              onClick={handleLectureSelection}
            >
              {lecture.title}
            </Button>
          ))}
        </Stack>
        <Stack
          flex={1}
          sx={{
            iframe: {
              aspectRatio: "16/9",
            },
          }}
        >
          <iframe
            title="course video"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          />
          <Typography fontWeight={700} fontSize={22}>
            {lecture.title}
          </Typography>
          <Typography>
            Speakers: {parseSpeakerNames(lecture.speakers)}
          </Typography>
          <Box>
            <Button onClick={handleCall} variant="contained">
              Create Call
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default React.memo(Course);
