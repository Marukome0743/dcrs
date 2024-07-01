import type { FormItem } from "@/app/interfaces/form"
import type { SiteLink } from "@/app/interfaces/siteLink"
import type { Step } from "@/app/interfaces/step"
import {
  CheckCircleIcon,
  EnvelopeIcon,
  HandThumbUpIcon,
  IdentificationIcon,
  PencilSquareIcon,
  PhoneIcon,
  TableCellsIcon,
  UserIcon,
} from "@heroicons/react/24/solid"

export const NAME: FormItem = {
  name: "name",
  value: "氏名",
  type: "text",
  icon: UserIcon,
  placeholder: "オープン太郎",
}
export const COMPANY: FormItem = {
  name: "company",
  value: "所属会社",
  type: "select",
}
export const EMPLOYEE_ID: FormItem = {
  name: "employeeId",
  value: "社員番号",
  type: "number",
  icon: IdentificationIcon,
  placeholder: "123456",
}
export const TELEPHONE: FormItem = {
  name: "telephone",
  value: "電話番号",
  type: "tel",
  icon: PhoneIcon,
  placeholder: "09012345678",
}
export const EMAIL: FormItem = {
  name: "email",
  value: "Eメール",
  type: "email",
  icon: EnvelopeIcon,
  placeholder: "example@mail.com",
}
export const AGREEMENT: FormItem = {
  name: "agreement",
  value: "個人情報提供への同意",
  type: "checkbox",
}
export const IMAGE: FormItem = {
  name: "image",
  value: "障がい者手帳の画像・写真",
  type: "file",
}

export const CHECKLIST: FormItem[] = [
  NAME,
  COMPANY,
  EMPLOYEE_ID,
  TELEPHONE,
  EMAIL,
  AGREEMENT,
  IMAGE,
] as const

export const SITE_TITLE: string = "障がい者手帳登録システム"

export const STEPS: Step[] = [
  {
    name: "必要情報の入力",
    icon: PencilSquareIcon,
    color: "text-info",
  },
  {
    name: "入力確認",
    icon: CheckCircleIcon,
    color: "text-warning",
  },
  { name: "完了", icon: HandThumbUpIcon, color: "text-success" },
] as const

export const TEST_BUCKET: string = "dcrs-test"

export const USERS_LINK: SiteLink = {
  name: "登録データ一覧",
  href: "/users",
  icon: TableCellsIcon,
  color: "text-secondary",
} as const
