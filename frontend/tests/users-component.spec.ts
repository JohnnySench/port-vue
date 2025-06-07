import { test, expect } from "@playwright/test"

test("Загрузка юзеров в таблицу", async ({ page }) => {
  await page.goto("http://localhost:5173/play")

  await expect(page.getByText("Загрузка...")).toBeHidden()

  const table = page.locator("[data-test='user-table']")
  await expect(table).toBeVisible()

  const rows = table.locator("tbody tr")
  await expect(rows).toHaveCount(10, { timeout: 10000 })
})
