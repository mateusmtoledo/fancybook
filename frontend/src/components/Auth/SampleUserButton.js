import { useContext } from 'react';
import api from 'src/adapters/api';
import { GlobalLoadingContext } from 'src/contexts/GlobalLoadingContext';
import { ToastContext } from 'src/contexts/ToastContext';
import { UserContext } from 'src/contexts/UserContext';
import styled from 'styled-components';

const SampleUserButtonStyled = styled.button`
  background-color: #00000077;
  border: 2px solid var(--color-orange);
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  padding: 8px 32px;
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

function SampleUserButton() {
  const { getUser } = useContext(UserContext);
  const { setGlobalLoading } = useContext(GlobalLoadingContext);
  const { sendNotification } = useContext(ToastContext);

  return (
    <SampleUserButtonStyled
      onClick={async () => {
        setGlobalLoading(true);
        try {
          await api.post('/login/sample');
          await getUser();
        } catch (err) {
          sendNotification({
            type: 'error',
            text: 'Server error',
          });
        }
        setGlobalLoading(false);
      }}
    >
      I don't want to sign up!
    </SampleUserButtonStyled>
  );
}

export default SampleUserButton;
