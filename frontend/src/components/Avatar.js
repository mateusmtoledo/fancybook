import styled from "styled-components";

const StyledAvatar = styled.img`
  border-radius: 100%;
  cursor: pointer;
`;

function Avatar({ user, size, className }) {
  return (
    <StyledAvatar
      src={user.avatar}
      alt={`${user.firstName}'s avatar`}
      width={size || '32px'}
      height={size || '32px'}
      className={className || ''}
      onError={(event) => {
        if(event.target.src !== 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png') {
          event.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
        }
      }}
    />
  );
}

export default Avatar;
