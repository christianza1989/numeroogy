import React from 'react';
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-purple-200 mb-1.5 ml-1">{label}</label>}
        <input
          className={cn(
            "flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/10",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
