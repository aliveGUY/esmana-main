import DashboardLayout from './presentation/common/DashboardLayout'
import FormStateWrapper from './presentation/common/FormStateWrapper'
import NotFoundPage from './presentation/pages/404'
import CheckoutCourses from './presentation/pages/CheckoutCourses'
import CheckoutMembership from './presentation/pages/CheckoutMembership'
import Course from './presentation/pages/Course'
import CourseMarketing from './presentation/pages/CourseMarketing'
import Courses from './presentation/pages/Courses'
import CreateCourse from './presentation/pages/CreateCourse'
import CreateLecture from './presentation/pages/CreateLecture'
import CreateProfile from './presentation/pages/CreateProfile'
import EditCourse from './presentation/pages/EditCourse'
import EditLecture from './presentation/pages/EditLecture'
import EditLectureDraft from './presentation/pages/EditLectureDraft'
import EditUser from './presentation/pages/EditUser'
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
        path: 'users/:userId',
        title: '',
        element: <EditUser />,
      },
      {
        path: 'users/new',
        title: '',
        element: <CreateProfile />,
      },
      {
        element: <FormStateWrapper />,
        path: 'course/new',
        children: [
          {
            index: true,
            title: '',
            element: <CreateCourse />,
          },
          {
            path: 'lecture/new',
            title: '',
            element: <CreateLecture />,
          },
          {
            path: 'lecture/:id',
            title: '',
            element: <EditLectureDraft />,
          },
        ],
      },
      {
        element: <FormStateWrapper />,
        path: 'course/edit/:courseId',
        children: [
          {
            index: true,
            title: '',
            element: <EditCourse />,
          },
          {
            path: 'lecture/new',
            title: '',
            element: <CreateLecture isEdit />,
          },
          {
            path: 'lecture/:lectureId',
            title: '',
            element: <EditLecture />,
          },
        ],
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
