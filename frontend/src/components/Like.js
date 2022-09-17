import Avatar from "../styles/Avatar";

function Like({ like }) {
  return (
    <div>
      <Avatar
        src={like.avatar}
        alt={`${like.firstName}'s avatar`}
      />
      <p>{like.fullName}</p>
    </div>
  );
}

export default Like;
