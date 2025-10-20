import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/styles.css'

const DatePickerField = ({ id, placeholder = 'DOB', label }) => {
  const [value, setValue] = useState(null)

  // compute maxDate = today - 8 years
  const today = new Date()
  const maxDate = new Date(today.getFullYear() - 8, today.getMonth(), today.getDate())

  return (
    <div className="field">
      {label && <label className="label" htmlFor={id}>{label}</label>}
      <DatePicker
        /* use a different id for the visible input to avoid duplicate ids in the DOM */
        id={id ? `${id}_visible` : undefined}
        selected={value}
        onChange={(date) => setValue(date)}
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        maxDate={maxDate}
        className="input"
      />
      {/* Hidden input so a plain <form> submit can read a consistent ISO string */}
      <input
        type="hidden"
        id={id}
        name={id}
        value={value ? value.toISOString() : ''}
        readOnly
      />
    </div>
  )
}

export default DatePickerField
