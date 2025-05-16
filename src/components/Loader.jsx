//CSS from https://css-loaders.com/spinner/
import styled, { keyframes } from 'styled-components';

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
  return <StyledLoader></StyledLoader>;
};

export default Loader;
