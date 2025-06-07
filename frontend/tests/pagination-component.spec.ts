import { test, expect } from "@playwright/test"

test("Загрузка юзеров", async ({ page }) => {
  await page.goto("http://localhost:5173/play")

  const loadingBlock = page.locator("[data-test='block-loading']")
  const prevButton = page.locator("[data-test='button-prev']")
  const usersContainerList = page.locator("[data-test='list-container']")

  await expect(loadingBlock).toBeVisible();
  await expect(prevButton).toBeDisabled();
  await expect(usersContainerList).toBeVisible();
})
