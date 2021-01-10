import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const Container = styled.button`
  border: 0;
  width: 100%;
`;

const Button = ({ text }) => <Container>{text}</Container>;

Button.propTypes = {
  text: propTypes.string.isRequired,
};

export default Button;
