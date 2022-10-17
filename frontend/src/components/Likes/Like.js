import React from "react";
import UserDisplayInfo from "../UserDisplayInfo";

const Like = React.forwardRef(function ({ author }, ref) {
  return (
    <li ref={ref}>
      <UserDisplayInfo user={author} />
    </li>
  );
});

export default Like;
