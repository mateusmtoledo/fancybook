import { useState } from "react";
import styled from "styled-components";

const AvatarStyled = styled.img`
  border-radius: ${(props) => props.borderRadius || "100%"};
  object-fit: cover;
  cursor: ${(props) => (props.clickable ? "pointer" : null)};
`;

function Avatar({ user, size, className, src, alt, onError }) {

  const [imageLoading, setImageLoading] = useState(false);

  return (
    <div>
      {imageLoading ?? <div>Teste</div>}
      <AvatarStyled
        src={src || user.avatar}
        alt={alt || `${user.firstName}'s avatar`}
        width={size || "32px"}
        height={size || "32px"}
        className={className || ""}
        onLoadStart={() => setImageLoading(true)}
        onLoad={() => setImageLoading(false)}
        onError={
          onError ||
          ((event) => {
            if (
              event.target.src !==
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            ) {
              event.target.src =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
            }
          })
        }
      />
    </div>
  );
}

export default Avatar;
