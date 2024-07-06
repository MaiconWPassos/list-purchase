import * as React from "react";

import { cn } from "src/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const InputAsChildren = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "child:flex child:h-9 child:w-full child:rounded-md child:border child:border-input child:bg-transparent child:px-3 child:py-1 child:text-sm child:shadow-sm child:transition-colors child:file:border-0 child:file:bg-transparent child:file:text-sm child:file:font-medium child:placeholder:text-muted-foreground child:focus-visible:outline-none child:focus-visible:ring-1 child:focus-visible:ring-ring child:disabled:cursor-not-allowed child:disabled:opacity-50",
      className
    )}
  >
    {children}
  </div>
);

export { Input, InputAsChildren };
