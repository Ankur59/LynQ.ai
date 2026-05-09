import { createSlice } from "@reduxjs/toolkit";

type Chat = {
  id: string;
  chats: {
    role: string;
    message: string;
    createdAt: string;
  }[];
};

type ChatState = {
  chats: Record<string, Chat>;
  selectedChatId: string | null;
  isLoading: boolean | null;
  error: string | null;
};

const initialState: ChatState = {
  chats: {
    chat1: {
      id: "189ha89hc8",
      chats: [
        {
          role: "user",
          message: "Hi",
          createdAt: "some date here",
        },
      ],
    },
  },

  selectedChatId: null,
  isLoading: null,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chats = { ...state.chats, ...action.payload };
    },
    removeChat: (state, action) => {
      state.chats = Object.fromEntries(
        Object.entries(state.chats).filter(
          ([key, value]) => value.id !== action.payload.id,
        ),
      );
    },
  },
});

export const { addChat, removeChat } = chatSlice.actions;
export default chatSlice.reducer;
