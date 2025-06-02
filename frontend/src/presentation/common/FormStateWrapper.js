import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { resetCourseForm } from '../../state/reducers/courseForm'

const FormStateWrapper = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetCourseForm())
    }
  }, [])

  return <Outlet />
}

export default FormStateWrapper
