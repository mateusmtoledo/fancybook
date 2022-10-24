import styled from "styled-components";

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
    box-shadow: var(--shadow-card);
    border-radius: 8px;
  }
`

function NextPageButton({ hasNextPage, loadNextPostPage, postsLoading }) {
  if (!hasNextPage || postsLoading) return null;
  return (
    <NextPageDiv>
      {
        !postsLoading && <button onClick={loadNextPostPage}>Load more</button>
      }
    </NextPageDiv>
  );
}

export default NextPageButton;
