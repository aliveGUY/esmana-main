export const useNavigationConfig = () => {
  return [
    {
      title: "Home page",
      path: "/dashboard",
    },
    {
      title: "Membership",
      path: "/dashboard/membership",
    },
    {
      title: "Courses",
      children: [
        {
          title: "All Courses",
          path: "/dashboard/courses",
        },
        {
          title: "Your Courses",
          path: "/dashboard/user-courses",
        },
        {
          title: "Create new course",
          path: "/dashboard/courses/new",
        },
      ],
    },
    {
      title: "Clients",
      children: [
        {
          title: "All clients",
          path: "/dashboard/clients",
        },
        {
          title: "Register new Member",
          path: "/dashboard/member-registration",
        },
        {
          title: "Register new Student",
          path: "/dashboard/student-registration",
        },
      ],
    },
  ];
};
