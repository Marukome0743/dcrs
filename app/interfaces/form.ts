import type React from "react"
import type { Path } from "react-hook-form"

export type Form = {
  agreement: boolean
  company: string
  email: string
  employeeId: string
  image: FileList
  name: string
  telephone: string
}

export type FormItem = {
  name: Path<Form>
  label: string
  type: string
  icon: React.ElementType
  placeholder?: string
}
