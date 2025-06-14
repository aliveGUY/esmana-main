import React from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormHelperText,
  Typography,
} from '@mui/material'
import { useFormContext, useFieldArray } from 'react-hook-form'
import PropTypes from 'prop-types'

const CheckboxCollection = ({ name, label, options }) => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext()

  const { append, update, remove } = useFieldArray({
    control,
    name: 'collection',
  })

  const collection = getValues('collection') || []

  const findGroupIndex = () => collection.findIndex((item) => item.id === name)

  const addValue = (option) => {
    append({ id: name, answers: [option] })
  }

  const editValue = (option) => {
    const index = findGroupIndex()
    if (index === -1) return
    const currentAnswers = collection[index].answers || []
    const updatedAnswers = [...new Set([...currentAnswers, option])]
    update(index, { ...collection[index], answers: updatedAnswers })
  }

  const removeValue = (option) => {
    const index = findGroupIndex()
    if (index === -1) return
    const currentAnswers = collection[index].answers || []
    const updatedAnswers = currentAnswers.filter((ans) => ans !== option)

    if (updatedAnswers.length === 0) {
      remove(index)
    } else {
      update(index, { ...collection[index], answers: updatedAnswers })
    }
  }

  const handleChange = (event) => {
    const { name: option, checked } = event.target
    const index = findGroupIndex()

    if (checked) {
      if (index === -1) {
        addValue(option)
      } else {
        editValue(option)
      }
    } else {
      removeValue(option)
    }
  }

  const selectedOptions = collection.find((item) => item.id === name)?.answers || []

  return (
    <FormControl component="fieldset" variant="standard" error={Boolean(errors[name])}>
      <Typography mb={1} fontWeight="bold">
        {label}
      </Typography>
      <FormGroup
        sx={{
          gap: 1,
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            label={option}
            sx={{
              margin: 0,
              gap: 1,
            }}
            control={<Checkbox name={option} checked={selectedOptions.includes(option)} onChange={handleChange} />}
          />
        ))}
      </FormGroup>
      {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  )
}

CheckboxCollection.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default CheckboxCollection
