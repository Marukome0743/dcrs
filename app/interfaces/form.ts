import type { ElementType } from "react"
import type { Path } from "react-hook-form"

export type ProfileForm = {
  agreement: boolean
  company: string
  email: string
  employeeId: string
  image: FileList
  name: string
  telephone: string
}

export type ProfileFormItem = {
  name: Path<ProfileForm>
  label: string
  type: string
  icon: ElementType
  placeholder?: string
}
