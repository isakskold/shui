import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const GenericButton = ({ label, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {label}
    </StyledButton>
  );
};

export default GenericButton;
