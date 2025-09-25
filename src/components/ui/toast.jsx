// ================== IMPORTS ==================
import React, { Component } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

// ================== PROVIDER ==================
/**
 * ToastProvider
 * --------------
 * Context provider for Radix Toast notifications.
 * Should wrap your application where toast functionality is needed.
 */
export const ToastProvider = ToastPrimitives.Provider;

// ================== VIEWPORT ==================
/**
 * ToastViewportBase (Class Component)
 * -----------------------------------
 * Provides a container viewport for rendering toast notifications.
 */
class ToastViewportBase extends Component {
  /**
   * Render method for the Toast viewport.
   * @returns {JSX.Element}
   */
  render() {
    const { className, forwardedRef, ...props } = this.props;

    return (
      <ToastPrimitives.Viewport
        ref={forwardedRef}
        className={cn(
          "fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 " +
            "sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
          className
        )}
        {...props}
      />
    );
  }
}
ToastViewportBase.propTypes = {
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
/** Exported forwardRef wrapper */
export const ToastViewport = React.forwardRef((props, ref) => (
  <ToastViewportBase {...props} forwardedRef={ref} />
));

// ================== VARIANTS ==================
/**
 * toastVariants
 * ----------------
 * Class variance helper for managing toast styling based on variant.
 */
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between " +
    "space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all " +
    "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] " +
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none " +
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out " +
    "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full " +
    "data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ================== TOAST ROOT ==================
/**
 * ToastBase (Class Component)
 * ----------------------------
 * Root toast element that wraps content inside a toast.
 */
class ToastBase extends Component {
  /**
   * Render method for Root Toast.
   * @returns {JSX.Element}
   */
  render() {
    const { className, variant, forwardedRef, ...props } = this.props;

    return (
      <ToastPrimitives.Root
        ref={forwardedRef}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      />
    );
  }
}
ToastBase.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "destructive"]),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
/** Exported forwardRef wrapper */
export const Toast = React.forwardRef((props, ref) => (
  <ToastBase {...props} forwardedRef={ref} />
));

// ================== ACTION ==================
/**
 * ToastActionBase (Class Component)
 * ---------------------------------
 * Represents an action button inside a toast (e.g., Undo).
 */
class ToastActionBase extends Component {
  /**
   * Render method for Toast Action.
   * @returns {JSX.Element}
   */
  render() {
    const { className, forwardedRef, ...props } = this.props;

    return (
      <ToastPrimitives.Action
        ref={forwardedRef}
        className={cn(
          "inline-flex h-8 shrink-0 items-center justify-center rounded-md border " +
            "bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors " +
            "hover:bg-secondary focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 " +
            "disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 " +
            "hover:group-[.destructive]:border-destructive/30 hover:group-[.destructive]:bg-destructive " +
            "hover:group-[.destructive]:text-destructive-foreground " +
            "focus:group-[.destructive]:ring-destructive",
          className
        )}
        {...props}
      />
    );
  }
}
ToastActionBase.propTypes = {
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
/** Exported forwardRef wrapper */
export const ToastAction = React.forwardRef((props, ref) => (
  <ToastActionBase {...props} forwardedRef={ref} />
));

// ================== CLOSE ==================
/**
 * ToastCloseBase (Class Component)
 * --------------------------------
 * Close button for dismissing the toast.
 */
class ToastCloseBase extends Component {
  /**
   * Render method for Close button.
   * @returns {JSX.Element}
   */
  render() {
    const { className, forwardedRef, ...props } = this.props;

    return (
      <ToastPrimitives.Close
        ref={forwardedRef}
        className={cn(
          "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity " +
            "hover:text-foreground focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100 " +
            "group-[.destructive]:text-red-300 hover:group-[.destructive]:text-red-50 " +
            "focus:group-[.destructive]:ring-red-400 focus:group-[.destructive]:ring-offset-red-600",
          className
        )}
        {...props}
      >
        <X className="h-4 w-4" />
      </ToastPrimitives.Close>
    );
  }
}
ToastCloseBase.propTypes = {
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
/** Exported forwardRef wrapper */
export const ToastClose = React.forwardRef((props, ref) => (
  <ToastCloseBase {...props} forwardedRef={ref} />
));

// ================== TITLE ==================
/**
 * ToastTitleBase (Class Component)
 * --------------------------------
 * Title/header text inside a toast notification.
 */
class ToastTitleBase extends Component {
  /**
   * Render method for Toast Title.
   * @returns {JSX.Element}
   */
  render() {
    const { className, forwardedRef, ...props } = this.props;

    return (
      <ToastPrimitives.Title
        ref={forwardedRef}
        className={cn("text-sm font-semibold", className)}
        {...props}
      />
    );
  }
}
ToastTitleBase.propTypes = {
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
/** Exported forwardRef wrapper */
export const ToastTitle = React.forwardRef((props, ref) => (
  <ToastTitleBase {...props} forwardedRef={ref} />
));

// ================== DESCRIPTION ==================
/**
 * ToastDescriptionBase (Class Component)
 * --------------------------------------
 * Additional descriptive text inside a toast.
 */
class ToastDescriptionBase extends Component {
  /**
   * Render method for Toast Description.
   * @returns {JSX.Element}
   */
  render() {
    const { className, forwardedRef, ...props } = this.props;

    return (
      <ToastPrimitives.Description
        ref={forwardedRef}
        className={cn("text-sm opacity-90", className)}
        {...props}
      />
    );
  }
}
ToastDescriptionBase.propTypes = {
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
/** Exported forwardRef wrapper */
export const ToastDescription = React.forwardRef((props, ref) => (
  <ToastDescriptionBase {...props} forwardedRef={ref} />
));

// ================== EXPORTS ==================
/**
 * Exported components:
 * - ToastProvider
 * - ToastViewport
 * - Toast
 * - ToastAction
 * - ToastClose
 * - ToastTitle
 * - ToastDescription
 */

