import type { Profile } from '@/app/interfaces/profile'
import type React from 'react'
import type { Path } from 'react-hook-form'

export type Checklist = {
  name: Path<Profile> | 'agreement'
  value: string
  type: string
  icon?: React.ElementType
  placeholder?: string
}
