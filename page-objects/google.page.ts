import { Page } from '@playwright/test';

export class GooglePage {
    constructor(private page: Page) {}

    public cookieButton =  this.page.locator('#L2AGLb');
    public searchInput = this.page.locator('.gLFyf');
    public wikipediaLink = this.page.getByRole('link', { name: 'Automation Wikipedia https://' })


    async navigate() {
        await this.page.goto('https://google.com');
    }

    async acceptCookies() {
        await this.cookieButton.click();
    }

    async fillSearchInput(text: string) {
        await this.searchInput.fill(text);
    }

    async search() {
        await this.page.keyboard.press('Escape');
        await this.page.keyboard.press('Enter');
    }

    async clickWikipediaLink() {
        await this.wikipediaLink.click();
    }





}