import { expect, type Page, test } from "@playwright/test"

async function gotoWithRetry(page: Page, url: string, options = {}) {
  const maxRetries = 3
  const defaultOptions = { timeout: 20000, waitUntil: "load" as const }
  const mergedOptions = { ...defaultOptions, ...options }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await page.goto(url, mergedOptions)
      return
    } catch (error) {
      if (attempt === maxRetries) {
        throw error
      }
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
}

test.describe("Authentication flow", () => {
  test("shows login button when not authenticated", async ({ page }) => {
    await gotoWithRetry(page, "/")
    const loginButton = page.getByRole("button", { name: "ログイン" })
    await expect(loginButton).toBeVisible()
  })

  test("hides logout button when not authenticated", async ({ page }) => {
    await gotoWithRetry(page, "/")
    const logoutButton = page.getByRole("button", { name: "ログアウト" })
    await expect(logoutButton).toBeHidden()
  })

  test("opens sign-in modal and submits email", async ({ page }) => {
    await gotoWithRetry(page, "/")

    // Click login button to open modal
    await page.getByRole("button", { name: "ログイン" }).click()

    // Verify modal is visible
    const dialog = page.locator("dialog.modal")
    await expect(dialog).toBeVisible()

    // Fill in email
    const emailInput = dialog.getByPlaceholder("example@bnt.benextgroup.jp")
    await emailInput.fill("test@example.com")

    // Submit button should be enabled
    const submitButton = dialog.getByRole("button", { name: "ログイン" })
    await expect(submitButton).toBeEnabled()
  })

  test("disables submit button with invalid email", async ({ page }) => {
    await gotoWithRetry(page, "/")

    await page.getByRole("button", { name: "ログイン" }).click()

    const dialog = page.locator("dialog.modal")
    const emailInput = dialog.getByPlaceholder("example@bnt.benextgroup.jp")
    await emailInput.fill("invalid-email")

    const submitButton = dialog.getByRole("button", { name: "ログイン" })
    await expect(submitButton).toBeDisabled()
  })

  test("closes sign-in modal with close button", async ({ page }) => {
    await gotoWithRetry(page, "/")

    await page.getByRole("button", { name: "ログイン" }).click()

    const dialog = page.locator("dialog.modal")
    await expect(dialog).toBeVisible()

    await dialog.getByRole("button", { name: "閉じる" }).click()
    await expect(dialog).not.toBeVisible()
  })

  test("shows success message after magic link submission", async ({
    page,
  }) => {
    await gotoWithRetry(page, "/")

    // Mock the magic link API to return success
    await page.route("**/api/auth/magic-link/email", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: true }),
      }),
    )

    await page.getByRole("button", { name: "ログイン" }).click()

    const dialog = page.locator("dialog.modal")
    const emailInput = dialog.getByPlaceholder("example@bnt.benextgroup.jp")
    await emailInput.fill("test@example.com")

    await dialog.getByRole("button", { name: "ログイン" }).click()

    // Verify success message is displayed
    await expect(dialog.getByText("メールを送信しました")).toBeVisible()
    await expect(dialog.getByText("test@example.com")).toBeVisible()
    await expect(
      dialog.getByText("メールを確認してリンクをクリックしてください。"),
    ).toBeVisible()
  })

  test("resets modal state when closed after success", async ({ page }) => {
    await gotoWithRetry(page, "/")

    await page.route("**/api/auth/magic-link/email", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: true }),
      }),
    )

    // Submit and get to success state
    await page.getByRole("button", { name: "ログイン" }).click()
    const dialog = page.locator("dialog.modal")
    await dialog
      .getByPlaceholder("example@bnt.benextgroup.jp")
      .fill("test@example.com")
    await dialog.getByRole("button", { name: "ログイン" }).click()
    await expect(dialog.getByText("メールを送信しました")).toBeVisible()

    // Close the modal
    await dialog.getByRole("button", { name: "閉じる" }).click()
    await expect(dialog).not.toBeVisible()

    // Reopen - should show the form again, not the success message
    await page.getByRole("button", { name: "ログイン" }).click()
    await expect(dialog).toBeVisible()
    await expect(
      dialog.getByPlaceholder("example@bnt.benextgroup.jp"),
    ).toBeVisible()
    await expect(dialog.getByText("メールを送信しました")).not.toBeVisible()
  })

  test("redirects unauthenticated users from /users to /", async ({ page }) => {
    await gotoWithRetry(page, "/users")

    // Should be redirected to the top page
    await page.waitForURL("/", { timeout: 10000 })
    expect(page.url()).toMatch(/\/$/)
  })

  test("hides registered data link when not authenticated", async ({
    page,
  }) => {
    await gotoWithRetry(page, "/")

    // The "登録データ一覧" link should be hidden for unauthenticated users
    const dataLink = page.getByRole("link", { name: /登録データ一覧/ })
    await expect(dataLink).toBeHidden()
  })
})
