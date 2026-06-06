import { forwardRef } from "react";
import type { ButtonProps } from "./Button.types";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-white text-black hover:bg-neutral-200 border-transparent",
  secondary:
    "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 border-neutral-700",
  ghost:
    "bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100 border-neutral-700",
  danger:
    "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/30",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-md",
  md: "px-4 py-2 text-sm gap-2 rounded-lg",
  lg: "px-5 py-2.5 text-sm gap-2.5 rounded-lg",
};

const Spinner = () => (
  <svg
    className="animate-spin shrink-0"
    style={{ width: "14px", height: "14px" }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      cx="12" cy="12" r="10"
      stroke="currentColor" strokeWidth="3"
      style={{ opacity: 0.25 }}
    />
    <path
      fill="currentColor"
      style={{ opacity: 0.8 }}
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-1 focus-visible:ring-offset-black disabled:opacity-40 disabled:pointer-events-none tracking-tight";

    const classes = [base, variantClasses[variant], sizeClasses[size], className]
      .join(" ")
      .trim();

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading && <Spinner />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;