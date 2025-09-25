import { createSlice } from "@reduxjs/toolkit";

export const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skillTag: null, // no skill selected by default
  },
  reducers: {
    selectSkill: (state, action) => {
      state.skillTag = action.payload;
    },
    resetSkill: (state) => {
      state.skillTag = null;
    },
    toggleSkill: (state, action) => {
      // if the selected skill is already active, deselect it
      if (state.skillTag === action.payload) {
        state.skillTag = null;
      } else {
        state.skillTag = action.payload;
      }
    },
  },
});

// Action creators
export const { selectSkill, resetSkill, toggleSkill } = skillSlice.actions;

export default skillSlice.reducer;
