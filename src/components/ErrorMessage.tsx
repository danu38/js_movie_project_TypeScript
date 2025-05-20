import React from 'react';
import styled from 'styled-components';

const ErrorMessageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  background-color: black;
  color: white;
`;

const ErrorMessageContainer = styled.div`
  background-color: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;

const Button = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: none;
  background: white;
  cursor: pointer;
  width: fit-content;

  &:focus-visible {
    outline: 2px solid #007bff;
  }

  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    color: white;
  }
`;

const ErrorMessage = () => {
  return (
    <ErrorMessageWrapper>
      <ErrorMessageContainer role='alert' aria-live="assertive">
        <p>Hoppsan! Något gick fel när filmerna skulle hämtas.</p>
        <Button onClick={() => window.location.reload()}>Försök igen</Button>
      </ErrorMessageContainer>
    </ErrorMessageWrapper>
  );
};

export default ErrorMessage;
