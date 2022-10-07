import { ErrorMessage } from "../styles/PostForm";

function Input({ error, className, ...props }) {
  return (
    <div>
      <input
        {...props}
        className={error && 'invalid'}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default Input;
