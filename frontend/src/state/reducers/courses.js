import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); // zero-based
const day = today.getDate();

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    ownedCourses: [
      {
        title: 'Міжнародна фахова школа "Медицина сну"',
        description:
          "Ключові аспекти фізіології, діагностики та лікування розладів сну. Актуальні наукові знання та практичні навички для ефективної роботи з пацієнтами різного віку",
        lectures: [
          {
            title: "Медицина сну: історія та розвиток",
            description:
              "Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ",
            price: 2000,
            startTime: new Date(year, month, day, 16, 0),
            endTime: new Date(year, month, day, 20, 0),
          },
        ],
      },
    ],
    availableCourses: [
      {
        title: 'Міжнародна фахова школа "Медицина сну"',
        description:
          "Ключові аспекти фізіології, діагностики та лікування розладів сну. Актуальні наукові знання та практичні навички для ефективної роботи з пацієнтами різного віку",
        lectures: [
          {
            title: "Медицина сну: історія та розвиток",
            description:
              "Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ",
            price: 2000,
            startTime: new Date("2020-05-12T16:50:21"),
            endTime: new Date("2020-05-12T20:50:21"),
          },
        ],
      },
      {
        title: 'Міжнародна фахова школа "Медицина сну"',
        description:
          "Ключові аспекти фізіології, діагностики та лікування розладів сну. Актуальні наукові знання та практичні навички для ефективної роботи з пацієнтами різного віку",
        lectures: [
          {
            title: "Медицина сну: історія та розвиток",
            description:
              "Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ",
            price: 2000,
            startTime: new Date("2020-05-12T16:50:21"),
            endTime: new Date("2020-05-12T20:50:21"),
          },
        ],
      },
    ],
  },
  // reducers: {},
});

export const {} = coursesSlice.actions;
export default coursesSlice.reducer;
