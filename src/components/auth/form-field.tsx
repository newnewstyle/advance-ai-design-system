"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { cn } from "@/lib/utils"

type FormFieldProps = React.ComponentProps<typeof Input> & {
  label: string
  error?: string
  hint?: string
  /** Rendered inside the input's right edge (e.g. a toggle button). */
  endAdornment?: React.ReactNode
}

/** Label + input + hint/error, wired up with ids and aria for a11y. */
function FormField({
  label,
  error,
  hint,
  endAdornment,
  id,
  name,
  className,
  ...props
}: FormFieldProps) {
  const autoId = React.useId()
  const inputId = id ?? `${name ?? "field"}-${autoId}`
  const messageId = `${inputId}-message`

  return (
    <div data-slot="form-field" className="flex flex-col gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="relative">
        <Input
          id={inputId}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={cn(endAdornment && "pr-9", className)}
          {...props}
        />
        {endAdornment ? (
          <div className="absolute inset-y-0 right-0.5 flex items-center">
            {endAdornment}
          </div>
        ) : null}
      </div>
      {error ? (
        <p id={messageId} className="text-sm text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

/** FormField with a show/hide password toggle. */
function PasswordField(props: Omit<FormFieldProps, "type" | "endAdornment">) {
  const [visible, setVisible] = React.useState(false)

  return (
    <FormField
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
          aria-pressed={visible}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      }
    />
  )
}

export { FormField, PasswordField }
