import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetReceivedUnauthorized } from '../state/reducers/user'
import { useRefreshMutation } from '../state/asynchronous'

export const useAuth = () => {
  const { account, receivedUnauthorized } = useSelector((state) => state.user)
  const [refresh] = useRefreshMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthorized = !isEmpty(account)

  useEffect(() => {
    if (isAuthorized) return
    refresh()
  }, [isAuthorized])

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
