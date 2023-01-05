import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import CommentList from "../CommentList";
import { UserContext } from "../../../contexts/UserContext";
import { ToastContext } from "src/contexts/ToastContext";
import userEvent from "@testing-library/user-event";
import React from "react";

const currentDate = Date.now();

const comments = [
  {
    _id: "johnscomment",
    text: "John's comment",
    author: {
      _id: "johndoe",
      firstName: "John",
      lastName: "Doe",
      fullName: "John Doe",
      avatar: "https://someurl/john.png",
    },
    date: currentDate - 1000,
  },
  {
    _id: "janescomment",
    text: "Jane's comment",
    author: {
      _id: "janedoe",
      firstName: "Jane",
      lastName: "Doe",
      fullName: "Jane Doe",
      avatar: "https://someurl/jane.png",
    },
    date: currentDate,
  },
];

const currentUser = {
  _id: "johndoe",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  avatar: "https://someurl/john.png",
};

describe("CommentList", () => {
  it("renders list of comments", () => {
    render(
      <MemoryRouter>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user: currentUser }}>
            <CommentList commentListVisible={true} comments={comments} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </MemoryRouter>
    );
    const johnsFullName = screen.getByText(/john doe/i);
    const janesFullName = screen.getByText(/jane doe/i);
    const johnsComment = screen.getByText(/john's comment/i);
    const janesComment = screen.getByText(/jane's comment/i);
    expect(johnsComment).toBeInTheDocument();
    expect(janesComment).toBeInTheDocument();
    expect(johnsFullName).toBeInTheDocument();
    expect(janesFullName).toBeInTheDocument();
  });

  it("renders a form for submiting a new comment", () => {
    render(
      <MemoryRouter>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user: currentUser }}>
            <CommentList commentListVisible={true} comments={comments} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </MemoryRouter>
    );
    const commentTextInput =
      screen.getByPlaceholderText(/comment on this post/i);
    expect(commentTextInput).toBeInTheDocument();
  });

  it('renders "Write a comment" button when comment list is not loading', () => {
    render(
      <MemoryRouter>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user: currentUser }}>
            <CommentList commentListVisible={true} comments={comments} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </MemoryRouter>
    );
    const writeACommentButton = screen.getByText("Write a comment");
    expect(writeACommentButton).toBeInTheDocument();
  });

  describe('"Write a comment" button', () => {
    describe("when clicked", () => {
      window.HTMLElement.prototype.scrollIntoView = jest.fn();
      it("sets focus on comment text input", async () => {
        const ref = React.createRef(null);
        render(
          <MemoryRouter>
            <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
              <UserContext.Provider value={{ user: currentUser }}>
                <CommentList
                  commentListVisible={true}
                  comments={comments}
                  ref={ref}
                />
              </UserContext.Provider>
            </ToastContext.Provider>
          </MemoryRouter>
        );
        const writeACommentButton = screen.getByText("Write a comment");
        userEvent.click(writeACommentButton);
        expect(
          screen.getByPlaceholderText(/comment on this post/i)
        ).toHaveFocus();
      });

      it("scrolls comment text input into view", () => {
        const ref = React.createRef(null);
        render(
          <MemoryRouter>
            <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
              <UserContext.Provider value={{ user: currentUser }}>
                <CommentList
                  commentListVisible={true}
                  comments={comments}
                  ref={ref}
                />
              </UserContext.Provider>
            </ToastContext.Provider>
          </MemoryRouter>
        );
        const writeACommentButton = screen.getByText("Write a comment");
        userEvent.click(writeACommentButton);
        expect(
          screen.getByPlaceholderText(/comment on this post/i).scrollIntoView
        ).toBeCalled();
      });
    });
  });
});
