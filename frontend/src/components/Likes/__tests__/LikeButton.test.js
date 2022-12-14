import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ToastContext } from "src/contexts/ToastContext";
import { UserContext } from "src/contexts/UserContext";
import LikeButton from "../LikeButton";
import api from "../../../adapters/api";

jest.mock("../../../adapters/api", () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
});

beforeEach(() => {
  api.post.mockResolvedValue({
    data: { like: {} },
  });
  api.delete.mockResolvedValue({
    data: { like: {} },
  });
});

const props = {
  postId: "somepostid",
  setUserHasLiked: jest.fn(),
  setLikes: jest.fn(),
  setLikeCount: jest.fn(),
};

const user = {
  _id: "johnsid",
  bio: "I am john doe.",
  email: "johndoe@fancybook.com",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  avatar: "https://someurl/john.png",
};

describe("LikeButton", () => {
  describe("when user has not liked post", () => {
    it("renders like button", () => {
      render(
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <LikeButton {...props} userHasLiked={false} />
          </ToastContext.Provider>
        </UserContext.Provider>
      );
      const likeButton = screen.getByText(/^like$/i);
      expect(likeButton).toBeInTheDocument();
    });

    it("calls api.post with correct argument when clicked", async () => {
      render(
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <LikeButton {...props} userHasLiked={false} />
          </ToastContext.Provider>
        </UserContext.Provider>
      );
      const likeButton = screen.getByText(/^like$/i);
      userEvent.click(likeButton);
      expect(api.post).toBeCalledWith("/posts/somepostid/likes");
      await waitFor(() =>
        expect(
          screen.queryByTestId("like-button-skeleton")
        ).not.toBeInTheDocument()
      );
    });
  });

  describe("when user has liked post", () => {
    it("renders unlike button", () => {
      render(
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <LikeButton {...props} userHasLiked={true} />
          </ToastContext.Provider>
        </UserContext.Provider>
      );
      const likeButton = screen.getByText(/^like$/i);
      expect(likeButton).toBeInTheDocument();
    });

    it("calls api.delete with correct arguments", async () => {
      render(
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <LikeButton {...props} userHasLiked={true} />
          </ToastContext.Provider>
        </UserContext.Provider>
      );
      const likeButton = screen.getByText(/^like$/i);
      userEvent.click(likeButton);
      expect(api.delete).toBeCalledWith("/posts/somepostid/likes");
      await waitFor(() =>
        expect(
          screen.queryByTestId("like-button-skeleton")
        ).not.toBeInTheDocument()
      );
    });
  });
});
