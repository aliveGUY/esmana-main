import React from 'react'

import DashboardLayout from './presentation/common/DashboardLayout'
import NotFoundPage from './presentation/pages/404'
import CheckoutCourses from './presentation/pages/CheckoutCourses'
import CheckoutMembership from './presentation/pages/CheckoutMembership'
import Course from './presentation/pages/Course'
import CourseMarketing from './presentation/pages/CourseMarketing'
import Courses from './presentation/pages/Courses'
import ForgotPassword from './presentation/pages/ForgotPassword'
import Login from './presentation/pages/Login'
import Profile from './presentation/pages/Profile'
import ResetPassword from './presentation/pages/ResetPassword'
import Users from './presentation/pages/Users'

const routing = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/forgot',
    element: <ForgotPassword />,
  },
  {
    path: '/reset',
    element: <ResetPassword />,
  },
  {
    path: '/course-checkout',
    element: <CheckoutCourses />,
  },
  {
    path: '/membership-checkout',
    element: <CheckoutMembership />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'profile',
        index: true,
        title: 'Esmana - Apply to school',
        element: <Profile />,
      },
      {
        path: 'users',
        title: 'Esmana - Apply to school',
        element: <Users />,
      },
      {
        path: 'courses',
        title: 'Esmana - Apply to school',
        element: <Courses />,
      },
      {
        path: 'course-details/:id',
        title: '',
        element: <CourseMarketing />,
      },
      {
        path: 'course/:courseId/:lectureId',
        title: '',
        element: <Course />,
      },
      {
        path: '*',
        title: 'Esmana - Apply to school',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '*',
    title: 'Esmana - Apply to school',
    element: <NotFoundPage />,
  },
]

export default routing
