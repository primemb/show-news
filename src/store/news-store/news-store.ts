import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComments, INews } from "../../types/INews";

const initialState: INews[] = [];

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<INews[]>) => {
      const shouldAdd: INews[] = [];
      const newNews = action.payload;
      for (const n of newNews) {
        const find = state.find((i) => i.title === n.title);
        if (!find) shouldAdd.push(n);
      }
      state = [...shouldAdd, ...state];
      return state;
    },
    like: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const index = state.findIndex((i) => i.title === title);
      if (index !== -1) {
        state[index].isLike = !state[index].isLike;
      }
      return state;
    },
    addComment: (
      state,
      action: PayloadAction<{ id: string; comment: IComments }>
    ) => {
      const { id, comment } = action.payload;
      const index = state.findIndex((i) => i.id === id);
      if (index !== -1) {
        if (state[index].comments) state[index].comments?.push(comment);
        else state[index].comments = [comment];
        return state;
      }
    },
    deleteComment: (
      state,
      action: PayloadAction<{ id: string; comment: IComments }>
    ) => {
      const { id, comment } = action.payload;
      const index = state.findIndex((i) => i.id === id);
      if (index !== -1) {
        if (state[index].comments)
          state[index].comments = state[index].comments?.filter(
            (c) => c.id !== comment.id
          );
        return state;
      }
    },
  },
});

export const { update, like, addComment, deleteComment } = newsSlice.actions;

export default newsSlice.reducer;
