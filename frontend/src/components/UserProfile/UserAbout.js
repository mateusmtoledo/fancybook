import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from 'src/styles/Card';
import styled from 'styled-components';
import EXPAND_ICON from '../../img/expand-down.svg';
import COLLAPSE_ICON from '../../img/collapse-up.svg';

const NoBioMessage = styled.p`
  color: var(--color-gray-light);
`;

const UserAboutContainer = styled(Card)`
  word-break: break-all;
  overflow: hidden;
  max-height: ${(props) =>
    props.maxHeight ? props.maxHeight.toString() + 'px' : null};
  position: relative;

  h3,
  h4 {
    font-family: 'Outfit', sans-serif;
  }
  h3 {
    font-size: 1.4rem;
    border-bottom: 1px solid var(--color-gray-dark);
    padding-bottom: 8px;
    margin-bottom: 8px;
  }
  h4 {
    font-size: 1.2rem;
    margin-bottom: 4px;
  }
  p {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  width: 100%;
  position: relative;
  font-weight: 700;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  img {
    width: 20px;
    height: auto;
  }
`;

const CollapseButton = styled(Button)`
  top: 8px;
  ::before {
    position: absolute;
    width: calc(100% + 32px);
    height: calc(1.2em + 16px);
    right: -16px;
    bottom: -9px;
    content: '';
    transition: box-shadow 0.3s;
  }
  :hover {
    ::before {
      box-shadow: inset 0px -10px 10px -10px var(--color-orange);
    }
  }
`;

const ExpandButton = styled(Button)`
  padding: 8px;
  background-color: var(--color-brown-dark);
  position: absolute;
  left: 0;
  bottom: 0;
  transition: box-shadow 0.3s;
  :hover {
    box-shadow: inset 0px -10px 10px -10px var(--color-orange);
  }
`;

function UserAbout({ bio, userLoading }) {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);
  const resizeObserver = useRef(null);

  const maxHeight = 300;

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(([entry]) => {
      if (containerRef.current.scrollHeight > maxHeight) {
        setHasOverflow(true);
      } else {
        setHasOverflow(false);
      }
    });
    resizeObserver.current.observe(containerRef.current);
    return () => resizeObserver.current.disconnect();
  }, [expanded]);

  return (
    <UserAboutContainer ref={containerRef} maxHeight={!expanded && maxHeight}>
      <h3>About</h3>
      <div>
        <h4>Bio</h4>
        {userLoading ? (
          <p>
            <Skeleton count={3} />
          </p>
        ) : bio ? (
          <p>{bio}</p>
        ) : (
          <NoBioMessage>No information provided</NoBioMessage>
        )}
      </div>
      {hasOverflow &&
        (expanded ? (
          <CollapseButton
            type="button"
            onClick={() => {
              setExpanded(false);
            }}
          >
            <img alt="Collapse" src={COLLAPSE_ICON} />
            <p>Collapse</p>
          </CollapseButton>
        ) : (
          <ExpandButton
            type="button"
            onClick={() => {
              setExpanded(true);
            }}
          >
            <img alt="Expand" src={EXPAND_ICON} />
            <p>Expand</p>
          </ExpandButton>
        ))}
    </UserAboutContainer>
  );
}

export default UserAbout;
