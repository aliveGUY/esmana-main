import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'

import { useRefreshMutation } from '../state/asynchronous'
import { resetReceivedUnauthorized } from '../state/reducers/user'

export const useAuth = () => {
  const { account, receivedUnauthorized } = useSelector((state) => state.user)
  const [refresh] = useRefreshMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthorized = !isEmpty(account)
  const isAdmin = account?.roles.includes('admin')

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
    isAdmin,
    user: account,
  }
}
