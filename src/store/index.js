import { configureStore } from "@reduxjs/toolkit";
import skillReducer from "./skillSlice";

/**
 * Redux Store
 * --------------------------------------------------
 * Centralized state management for the app.
 *
 * - Registers all feature slice reducers
 * - Configures middleware and dev tools by default
 */
const store = configureStore({
  reducer: {
    // Add slices as app grows
    skill: skillReducer, // Skill slice reducer
  },
});

export default store;
