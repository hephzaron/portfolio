import { configureStore } from "@reduxjs/toolkit";
import skillReducer from "./skillSlice";

/**
 * @class ReduxStore
 * @classdesc Responsible for configuring and creating the Redux store.
 * Encapsulates store setup logic for better structure and extensibility.
 */
class ReduxStore {
  /**
   * @constructor
   * Defines the mapping of reducers used by the Redux store.
   */
  constructor() {
    /**
     * Reducer map for the application.
     * Add more slices here as the app grows.
     * @type {object}
     */
    this.reducerMap = {
      skill: skillReducer, // Skill slice reducer
    };
  }

  /**
   * Creates and configures the Redux store.
   *
   * @returns {import('@reduxjs/toolkit').EnhancedStore}
   * Returns an enhanced Redux store instance ready for use with <Provider>.
   */
  createStore() {
    return configureStore({
      reducer: this.reducerMap
    });
  }
}

// ==================================================
// Export a configured store instance for the Provider
// ==================================================
const storeInstance = new ReduxStore();
const store = storeInstance.createStore();

export default store;
