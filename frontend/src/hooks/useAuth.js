import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetReceivedUnauthorized } from '../state/reducers/user'

export const useAuth = () => {
  const { account, receivedUnauthorized } = useSelector((state) => state.user)
  const isAuthorized = !isEmpty(account)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthorized || !receivedUnauthorized) return
    navigate('/')
    dispatch(resetReceivedUnauthorized())
  }, [isAuthorized, receivedUnauthorized])

  return {
    isAuthorized: !isEmpty(account),
    user: account,
  }
}
