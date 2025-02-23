import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state) => state.auth.user)

  return {
    isUnauthorized: isEmpty(user),
    user,
  };
};
