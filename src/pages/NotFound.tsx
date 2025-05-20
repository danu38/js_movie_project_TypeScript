import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import videoFile from "../assets/watermarked_preview.mp4";

const Main = styled.main`
  width: 100vw;
  background-color: grey;
  padding: 2rem;
`;
const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;

  @media (min-width: 768px) {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 1024px) {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 1366px) {
    width: 100%;
    height: 100%;
  }
`;

const HomeButton = styled(Link)`
  color: white;
  border: solid 2px white;
  border-radius: 5px;
  font-weight: bold;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  @media (min-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 1rem 2rem;
    font-size: 1.5rem;
  }
  @media (min-width: 1366px) {
    padding: 1rem 2rem;
    font-size: 1.5rem;
  }
`;

const NotFound = () => {
  return (
    <Main>
      <BackgroundVideo autoPlay muted loop>
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      <Section>
        <p>
          The requested URL was not found on our server. Go to the{" "}
          <HomeButton
             to="/">Home Page
          </HomeButton>
        </p>
      </Section>
    </Main>
  );
};

export default NotFound;
