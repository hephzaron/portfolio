import { createSlice } from "@reduxjs/toolkit";

/**
 * Class to manage skill state and related Redux reducers.
 */
class SkillSlice {
  /**
   * @constructor
   * Initializes default state for the skill slice.
   */
  constructor() {
    /**
     * Initial state for the slice
     * @type {{ skillTag: string | null }}
     */
    this.initialState = {
      skillTag: null, // No skill selected by default
    };
  }

  /**
   * Select a skill (set skillTag to payload)
   * @param {object} state - Redux state
   * @param {object} action - Redux action { payload: string }
   */
  selectSkill(state, action) {
    state.skillTag = action.payload;
  }

  /**
   * Reset selected skill (set skillTag to null)
   * @param {object} state - Redux state
   */
  resetSkill(state) {
    state.skillTag = null;
  }

  /**
   * Toggle a skill (select if not selected, deselect if already selected)
   * @param {object} state - Redux state
   * @param {object} action - Redux action { payload: string }
   */
  toggleSkill(state, action) {
    if (state.skillTag === action.payload) {
      state.skillTag = null;
    } else {
      state.skillTag = action.payload;
    }
  }

  /**
   * Create the Redux slice definition
   * @returns {object} Slice with reducers and actions
   */
  create() {
    return createSlice({
      name: "skill",
      initialState: this.initialState,
      reducers: {
        selectSkill: this.selectSkill,
        resetSkill: this.resetSkill,
        toggleSkill: this.toggleSkill,
      },
    });
  }
}

// ================== EXPORTS ==================

// Create an instance of the class
const skillSliceInstance = new SkillSlice();

// Build slice from class methods
const skillSlice = skillSliceInstance.create();

// Export actions
export const { selectSkill, resetSkill, toggleSkill } = skillSlice.actions;

// Export reducer
export default skillSlice.reducer;
