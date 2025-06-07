import { test, expect } from "@playwright/test"

test("ввод и очистка сообщения", async ({ page }) => {
  await page.goto("http://localhost:5173/play")

  // Если data-test на обёртке, ищем input внутри
  const input = page.locator("[data-test='input-component']")
  const button = page.locator("[data-test='button-component']")
  const paragraph = page.locator("[data-test='paragraph']")

  await expect(paragraph).not.toBeVisible()
  await expect(input).toBeVisible()
  await expect(button).toBeDisabled()

  await input.fill("Привет, Playwright!")
  await expect(paragraph).toHaveText("Текст: Привет, Playwright!")
  await expect(button).toBeEnabled()

  await button.click()
  await expect(input).toHaveValue("")
  await expect(paragraph).not.toBeVisible()
  await expect(button).toBeDisabled()
})
