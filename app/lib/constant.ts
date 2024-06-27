import type { FormItem } from "@/app/interfaces/formItem"
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

export const CHECKLIST: FormItem[] = [
  {
    name: "name",
    value: "氏名",
    type: "text",
    icon: UserIcon,
    placeholder: "オープン太郎",
  },
  {
    name: "company",
    value: "所属会社",
    type: "select",
  },
  {
    name: "employeeId",
    value: "社員番号",
    type: "number",
    icon: IdentificationIcon,
    placeholder: "123456",
  },
  {
    name: "telephone",
    value: "電話番号",
    type: "tel",
    icon: PhoneIcon,
    placeholder: "09012345678",
  },
  {
    name: "email",
    value: "Eメール",
    type: "email",
    icon: EnvelopeIcon,
    placeholder: "example@mail.com",
  },
  {
    name: "agreement",
    value: "個人情報提供への同意",
    type: "checkbox",
  },
  {
    name: "image",
    value: "障がい者手帳の画像・写真",
    type: "file",
  },
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
