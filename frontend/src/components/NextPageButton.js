import styled from "styled-components";
import Loading from "./Loading";

const NextPageDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 48px;
  button {
    font-size: 1rem;
    padding: 8px 32px;
    font-family: 'Roboto', sans-serif;
    background-color: var(--color-brown-dark);
    color: var(--color-white);
    border: none;
    box-shadow: var(--shadow-card);
    border-radius: 8px;
    cursor: pointer;
  }
`

function NextPageButton({ hasNextPage, loadNextPostPage, postsLoading }) {
  if (!hasNextPage) return null;
  return (
    <NextPageDiv>
      {
        postsLoading
        ? <Loading transparent />
        : <button onClick={loadNextPostPage}>Load more</button>
      }
    </NextPageDiv>
  );
}

export default NextPageButton;
