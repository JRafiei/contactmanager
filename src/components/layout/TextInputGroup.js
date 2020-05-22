import React from 'react';
import PropTypes from 'prop-types';


const TextInputGroup = props => {
  const { label, name, value, type, placeholder, onChange, error } = props;
  let className = "form-control form-control-lg";
  if (error) {
    className += ' is-invalid';
  }

  return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input type={type} className={className} name={name} value={value}
               placeholder={placeholder} onChange={onChange} />
        <div className="invalid-feedback">{error}</div>
      </div>
  )
}

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

TextInputGroup.defaultProps = {
  type: 'text'
}

export default TextInputGroup;
