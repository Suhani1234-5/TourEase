// @reproflow-generated v1 sha256=af6c3f2b5ac2ed99e097e79656e03f9085dab1eaa32908ec0e51abe15787edaf failure=aHR0cHM6Ly90b3VyLWVhc2Utam9oNS52ZXJjZWwuYXBwL2ZlYXR1cmVz
import { expect, test } from '@playwright/test';

test("ReproFlow: recorded bug on https://tour-ease-joh5.vercel.app/", async ({ page }) => {
  const reproflowConsoleErrors: string[] = [];
  const reproflowHttpFailures: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') reproflowConsoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => {
    reproflowConsoleErrors.push(error.message);
  });
  page.on('requestfailed', (request) => {
    reproflowHttpFailures.push(`${request.method()} 0 ${request.url()}`);
  });
  page.on('response', (response) => {
    if (response.status() >= 400) reproflowHttpFailures.push(`${response.request().method()} ${response.status()} ${response.url()}`);
  });

  await page.goto("https://tour-ease-joh5.vercel.app/");

  await page.getByText("Assistant Awaits").click();
  await page.getByText("Trip Planner").click();
  await page.locator("div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(2)").click();
  await page.getByRole("link", { name: "Smart Planner" }).click();
  await page.getByText("Trip Planner").click();
  await page.getByRole("link", { name: "Features" }).click();

  // The recorded failure was the URL the app ended up on.
  await expect(page).not.toHaveURL("https://tour-ease-joh5.vercel.app/features");
});
