import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state of the skill slice.
 * @type {{ skillTag: string | null }}
 */
const initialState = {
  skillTag: null, // By default, no skill is selected
};

/**
 * Redux slice for skill management.
 *
 * Features:
 * - Select a skill
 * - Reset the selected skill
 * - Toggle a skill on/off
 */
const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    /**
     * Select a skill.
     * @param {object} state - Redux state.
     * @param {object} action - Redux action { payload: string }.
     */
    selectSkill: (state, action) => {
      state.skillTag = action.payload;
    },

    /**
     * Reset the selected skill.
     * @param {object} state - Redux state.
     */
    resetSkill: (state) => {
      state.skillTag = null;
    },

    /**
     * Toggle a skill on/off.
     * @param {object} state - Redux state.
     * @param {object} action - Redux action { payload: string }.
     */
    toggleSkill: (state, action) => {
      state.skillTag = state.skillTag === action.payload ? null : action.payload;
    },
  },
});

/**
 * Actions generated from the slice reducers.
 */
export const { selectSkill, resetSkill, toggleSkill } = skillSlice.actions;

/**
 * Reducer to be registered in the Redux store.
 */
export default skillSlice.reducer;
