import { Page } from '@playwright/test';

export class WikipediaPage {

    constructor(private page: Page) {}

    async searchTextOnWikipedia(textToSearch:string) {
        return await this.page.getByText(textToSearch).textContent();
    }

    async returnFirstAutomationDate(textWithDate:string) {
        const regex : RegExp = /[0-9]{4}[,]/;
        const dateFound = regex.exec(textWithDate);
        return dateFound[0].replace(",", "");
    }

    async createScreenshot() {
        await this.page.screenshot({ path: 'wikipediaScreenshot.png' });
    }

}