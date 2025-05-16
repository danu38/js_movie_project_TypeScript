//CSS from https://css-loaders.com/spinner/
import styled, { keyframes } from 'styled-components';

const LoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  background-color: black;
  color: white;
`;

const KeyframeRotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const StyledLoader = styled.div`
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: white;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: ${KeyframeRotate} 1s linear infinite;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <StyledLoader></StyledLoader>
      <p>I'm just loading for a sec... bare with me!</p>
    </LoaderWrapper>
  );
};

export default Loader;
