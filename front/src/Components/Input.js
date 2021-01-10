import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.input`
  border: 0;
  border-radius: 10px;
  font-size: 15px;
  padding: 10px 10px;
  opacity: 0.8;
  text-align: center;
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default Input;
