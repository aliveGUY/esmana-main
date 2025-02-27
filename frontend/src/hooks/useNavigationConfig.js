export const useNavigationConfig = () => {
  return [
    {
      title: "Home page",
      path: "/",
    },
    {
      title: "Membership",
      path: "/membership",
    },
    {
      title: "Courses",
      children: [
        {
          title: "All Courses",
          path: "/courses",
        },
        {
          title: "Your Courses",
          path: "/user-courses",
        },
        {
          title: "Create new course",
          path: "/courses/new",
        },
      ],
    },
    {
      title: "Clients",
      children: [
        {
          title: "All clients",
          path: "/clients",
        },
        {
          title: "Register new Member",
          path: "/member-registration",
        },
        {
          title: "Register new Student",
          path: "/student-registration",
        },
      ],
    },
  ];
};
