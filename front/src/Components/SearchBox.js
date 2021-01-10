import React from "react";
import styled from "styled-components";

const SearchBox = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 50px;
  border-radius: 40px;
  border: none;
  outline: none;
  text-align: center;
  background-color: #ebebeb;
  opacity: 0.5;
  font-size: 20px;
`;

export default () => {
  return (
    <SearchBox>
      <SearchInput placeholder={"Search"} />
    </SearchBox>
  );
};
