import { createSlice } from "@reduxjs/toolkit"; 

/**
 * Class representing the skill slice for Redux Toolkit.
 * Provides reducers and state for managing skill selection.
 */
class SkillSlice {
  /**
   * @constructor
   * Initializes the default state of the skill slice.
   */
  constructor() {
    /**
     * Initial state of the skill slice.
     * @type {{ skillTag: string | null }}
     */
    this.initialState = {
      skillTag: null, // By default, no skill is selected
    };
  }

  // ================== REDUCERS ==================

  /**
   * Select a skill.
   * @static
   * @param {object} state - Redux state.
   * @param {object} action - Redux action { payload: string }.
   * @remarks Replaces the current skill with the given payload.
   */
  static selectSkill(state, action) {
    state.skillTag = action.payload;
  }

  /**
   * Reset the selected skill.
   * @static
   * @param {object} state - Redux state.
   * @remarks Clears the skillTag back to null.
   */
  static resetSkill(state) {
    state.skillTag = null;
  }

  /**
   * Toggle a skill.
   * @static
   * @param {object} state - Redux state.
   * @param {object} action - Redux action { payload: string }.
   * @remarks If the skill is already selected, deselect it. Otherwise, select it.
   */
  static toggleSkill(state, action) {
    state.skillTag = state.skillTag === action.payload ? null : action.payload;
  }

  // ================== SLICE CREATOR ==================

  /**
   * Create the Redux slice definition.
   * @returns {object} Slice object containing reducer and actions.
   */
  create() {
    return createSlice({
      name: "skill",
      initialState: this.initialState,
      reducers: {
        selectSkill: SkillSlice.selectSkill,
        resetSkill: SkillSlice.resetSkill,
        toggleSkill: SkillSlice.toggleSkill,
      },
    });
  }
}

// ================== EXPORTS ==================

// Create an instance of the class
const skillSliceInstance = new SkillSlice();

// Build slice using the class definition
const skillSlice = skillSliceInstance.create();

/**
 * Actions generated from the slice reducers.
 */
export const { selectSkill, resetSkill, toggleSkill } = skillSlice.actions;

/**
 * Reducer to be registered in the Redux store.
 */
export default skillSlice.reducer;
