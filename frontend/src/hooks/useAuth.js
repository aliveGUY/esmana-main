import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

export const useAuth = () => {
  const user = useSelector((state) => state.auth.user)

  const { isSucceeded, isError, isUninitialized, isLoading } = useSelector((state) => state.asyncStatus.getSession)

  return {
    isUnauthorized: isError && !isSucceeded && !isLoading && !isUninitialized && isEmpty(user),
    isAuthorized: isSucceeded && !isEmpty(user),
    isUninitialized,
    isLoading,
    user,
  }
}
