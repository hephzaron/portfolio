import * as React from "react";

/**
 * ToastManager (Class-based)
 * --------------------------------------------------
 * Centralized state manager for toast notifications.
 *
 * Features:
 * - Limits total visible toasts (TOAST_LIMIT)
 * - Handles add, update, dismiss, and remove actions
 * - Auto-removes dismissed toasts after a delay
 * - Provides React hook (`useToast`) to access and dispatch actions
 */
class ToastManager {
  /** Maximum number of visible toasts */
  static TOAST_LIMIT = 1;

  /** Delay before removing a dismissed toast (ms) */
  static TOAST_REMOVE_DELAY = 1000000;

  /** Internal counter for toast IDs */
  static count = 0;

  /** Active toast state in memory */
  static memoryState = { toasts: [] };

  /** Subscribers that listen to state changes */
  static listeners = [];

  /** Track removal timeouts per toast */
  static toastTimeouts = new Map();

  /**
   * Generates a unique toast ID
   * @returns {string} Toast ID
   */
  static genId() {
    this.count = (this.count + 1) % Number.MAX_SAFE_INTEGER;
    return this.count.toString();
  }

  /**
   * Dispatches an action to update state
   * @param {Object} action - Redux-like action object
   */
  static dispatch(action) {
    this.memoryState = this.reducer(this.memoryState, action);
    this.listeners.forEach((listener) => listener(this.memoryState));
  }

  /**
   * Adds toast to a removal queue
   * Ensures toast is eventually removed after delay
   * @param {string} toastId
   */
  static addToRemoveQueue(toastId) {
    if (this.toastTimeouts.has(toastId)) return;

    const timeout = setTimeout(() => {
      this.toastTimeouts.delete(toastId);
      this.dispatch({ type: "REMOVE_TOAST", toastId });
    }, this.TOAST_REMOVE_DELAY);

    this.toastTimeouts.set(toastId, timeout);
  }

  /**
   * Reducer function to handle toast state transitions
   */
  static reducer(state, action) {
    switch (action.type) {
      case "ADD_TOAST":
        return {
          ...state,
          toasts: [action.toast, ...state.toasts].slice(0, this.TOAST_LIMIT),
        };

      case "UPDATE_TOAST":
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === action.toast.id ? { ...t, ...action.toast } : t
          ),
        };

      case "DISMISS_TOAST": {
        const { toastId } = action;

        if (toastId) {
          this.addToRemoveQueue(toastId);
        } else {
          state.toasts.forEach((toast) => this.addToRemoveQueue(toast.id));
        }

        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === toastId || toastId === undefined
              ? { ...t, open: false }
              : t
          ),
        };
      }

      case "REMOVE_TOAST":
        if (action.toastId === undefined) {
          return { ...state, toasts: [] };
        }
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== action.toastId),
        };

      default:
        return state;
    }
  }

  /**
   * Public API: Create a toast
   * @param {Object} props - Toast props
   * @returns {Object} API with dismiss & update methods
   */
  static createToast(props) {
    const id = this.genId();

    const update = (newProps) =>
      this.dispatch({ type: "UPDATE_TOAST", toast: { ...newProps, id } });

    const dismiss = () =>
      this.dispatch({ type: "DISMISS_TOAST", toastId: id });

    this.dispatch({
      type: "ADD_TOAST",
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss();
        },
      },
    });

    return { id, dismiss, update };
  }

  /**
   * Public API: Dismiss toast(s)
   * @param {string} [toastId] - Optional toast ID to dismiss
   */
  static dismiss(toastId) {
    this.dispatch({ type: "DISMISS_TOAST", toastId });
  }
}

/**
 * Custom hook: useToast
 * --------------------------------------------------
 * Provides reactive access to ToastManager state and API.
 */
function useToast() {
  const [state, setState] = React.useState(ToastManager.memoryState);

  React.useEffect(() => {
    ToastManager.listeners.push(setState);
    return () => {
      const index = ToastManager.listeners.indexOf(setState);
      if (index > -1) {
        ToastManager.listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast: (props) => ToastManager.createToast(props),
    dismiss: (toastId) => ToastManager.dismiss(toastId),
  };
}

export { useToast, ToastManager as toast};
