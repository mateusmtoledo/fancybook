import styled from "styled-components";

const StyledAvatar = styled.img`
  border-radius: 100%;
  cursor: pointer;
`;

function Avatar({ src, alt, width, height }) {
  return (
    <StyledAvatar
      src={src}
      alt={alt}
      onError={(event) => {
        if(event.target.src !== 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png') {
          event.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
        }
      }}
      width={width || '32px'}
      height={height || '32px'}
    />
  );
}

export default Avatar;
