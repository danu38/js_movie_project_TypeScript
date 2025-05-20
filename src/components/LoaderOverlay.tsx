import styled from 'styled-components';
import Loader from './Loader';

const FadeWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export default function LoaderOverlay({ visible, message = 'Laddar…' }) {
  return (
    <FadeWrapper
      $visible={visible}
      role='status'
      aria-busy={visible}
      aria-label={message}
    >
      <Loader />
      <p>{message}</p>
    </FadeWrapper>
  );
}
