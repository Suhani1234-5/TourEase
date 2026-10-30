// @reproflow-generated v1 sha256=db74501f03f84cacc38b393ca5c9f408462c33dc8fd9d8c4699c8dbd869e35c5 failure=UE9TVCA0MDUgL2FwaS9sb2NrZXIvdXBsb2Fk
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

  await page.getByRole("link", { name: "About" }).click();
  await page.getByText("Trip Planner").click();
  await page.getByText("Travel Locker").click();
  await page.getByRole("button", { name: "Upload your first document" }).click();
  await page.getByText("Drag & drop your file here, or browse").click();
  await page.locator("div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > input:nth-child(1)").click();
  await page.getByRole("button", { name: "Upload Document" }).click();
  await page.getByText("ReproFlow PRD.pdf345.8 KB • Click to changeDocument NameCategoryPassportTicketInsuranceVisaBookingMedicalOtherTags (comm").evaluate((form) => (form as HTMLFormElement).requestSubmit());
  await page.locator("#root > div:nth-child(6) > div:nth-child(1) > div:nth-child(2)").click();

  // The recorded failure was a failed HTTP response.
  await expect.poll(() => reproflowHttpFailures, { timeout: 5000 }).not.toContain("POST 405 /api/locker/upload");
});
