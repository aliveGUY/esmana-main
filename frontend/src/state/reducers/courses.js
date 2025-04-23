import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); // zero-based
const day = today.getDate();

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    highlightedCourse: null,
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
            startTime: new Date(year, month, day + 1, 16, 0),
            endTime: new Date(year, month, day + 1, 18, 0),
          },
          {
            title: "Медицина сну: історія та розвиток",
            description:
              "Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ",
            price: 2000,
            startTime: new Date(year, month, day, 17, 0),
            endTime: new Date(year, month, day, 21, 0),
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
            startTime: new Date(year, month, day + 1, 13, 0),
            endTime: new Date(year, month, day + 1, 15, 0),
          },
          {
            title: "Медицина сну: історія та розвиток",
            description:
              "Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ",
            price: 2000,
            startTime: new Date(year, month, day, 13, 0),
            endTime: new Date(year, month, day, 17, 0),
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
            startTime: new Date(year, month, day + 1, 17, 0),
            endTime: new Date(year, month, day + 1, 20, 0),
          },
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
  },
  reducers: {
    highlightCourse: (state, action) => {
      state.highlightedCourse = action.payload;
    },
    removeHighlightedCourse: (state) => {
      state.highlightedCourse = null;
    },
  },
});

export const { highlightCourse, removeHighlightedCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
