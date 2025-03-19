import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  onChange,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  onChange?: (value: string) => void;
}) {
  const handleChange = (value: string) => {
    // Solo permitir dígitos y prevenir espacios
    const cleanValue = value.replace(/[^\d]/g, "");
    if (onChange) {
      onChange(cleanValue);
    }
  };

  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      onChange={handleChange}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  const isValidChar =
    char === undefined ||
    char === null ||
    (/^\d$/.test(char) && char.trim() !== "");
  const hasError = char !== undefined && char !== null && !isValidChar;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-error={hasError}
      className={cn(
        "h-10 w-12 sm:h-14 sm:w-14",
        "text-xl sm:text-2xl",
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50",
        "data-[active=true]:aria-invalid:ring-destructive/20",
        "dark:data-[active=true]:aria-invalid:ring-destructive/40",
        "aria-invalid:border-destructive",
        "data-[active=true]:aria-invalid:border-destructive",
        "data-[error=true]:border-red-500",
        "data-[error=true]:text-red-500",
        "dark:bg-input/30 border-input relative flex",
        "items-center justify-center border-y border-r",
        "shadow-xs transition-all outline-none",
        "first:rounded-l-md first:border-l",
        "last:rounded-r-md data-[active=true]:z-10",
        "data-[active=true]:ring-[3px]",
        className
      )}
      aria-invalid={!isValidChar}
      {...props}
    >
      {isValidChar ? char : ""}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-6 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
