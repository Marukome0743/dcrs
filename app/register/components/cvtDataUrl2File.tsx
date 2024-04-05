// confirmDialog.tsxの中でしか使用予定無いが、
// 一旦、別tsxファイルとして、
// DataURLからblob形式のファイルを生成して返す関数。
// 有識者によれば、
// confirmDialog FormType valuesのimage内には入っている、とのことだが、
// 現状、本ファイル作成者が取り出す方法不明であったため、
// 誰かが方法を発見し、confirmDialogを修正した場合、不要になる予定。
// 令和6年4月4日作成者記す。
export async function CvtDataUrl2File(
  dataUrl: string,
  filename: string,
): Promise<File> {
  const blob = await (await fetch(dataUrl)).blob()
  return new File([blob], filename)
}

export default CvtDataUrl2File
