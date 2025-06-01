import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

export const useAuth = () => {
  const user = useSelector((state) => state.user)

  return {
    isAuthorized: !isEmpty(user),
    user,
  }
}
