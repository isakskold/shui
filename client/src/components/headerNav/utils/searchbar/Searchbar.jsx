import React from "react";
import styled from "styled-components";

const Form = styled.form`
  height: 100%;
  width: 100%;
  max-width: 325px;
  background-color: white;
  border-radius: var(--border-radius-secondary);
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
`;

const Searchbar = () => {
  return (
    <Form>
      <Input></Input>
    </Form>
  );
};

export default Searchbar;
