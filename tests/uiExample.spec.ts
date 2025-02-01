import { test, expect } from '@playwright/test'
import { GooglePage } from '../page-objects/google.page';
import { WikipediaPage } from '../page-objects/wikipedia.page';


test('first automation year verification', async () => {
  const { chromium } = require('playwright');
  const firstAutomationText = 'first completely automated industrial process'
  const firstAutomationDate = '1785'
  const googleSearchInput = 'automation'

  //Fix for captcha issue on Google
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  const googlePage = new GooglePage(page);
  await googlePage.navigate();
  await googlePage.acceptCookies();
  await googlePage.fillSearchInput(googleSearchInput);
  await googlePage.search();
  await googlePage.clickWikipediaLink();
  const wikipediaPage = new WikipediaPage(page);
  const textFound = await wikipediaPage.searchTextOnWikipedia(firstAutomationText);
  const dateReturned = await wikipediaPage.returnFirstAutomationDate(textFound);
  await wikipediaPage.createScreenshot();
  expect(dateReturned).toBe(firstAutomationDate);

  await browser.close()
});









