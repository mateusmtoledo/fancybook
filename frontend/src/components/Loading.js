import styled from "styled-components";

const StyledLoading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 16px;
  div {
    position: absolute;
    top: 0px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

const Wrapper = styled.div`
  width: ${props => props.window ? '100vw' : '100%'};
  height: ${props => props.window ? '100vh' : props.positionStatic ? 'max-content' : '100%'};
  position: ${props => props.window ? 'fixed' : props.positionStatic ? 'static' : 'absolute'};
  border-radius: inherit;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.transparent ? '#00000000' : 'var(--color-brown-dark)'};
  opacity: 90%;
  z-index: 1;
`;

function Loading({ window, transparent, positionStatic }) {
  return (
    <Wrapper window={window} transparent={transparent} positionStatic={positionStatic}>
      <StyledLoading>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledLoading>
    </Wrapper>
  );
}

export default Loading;
