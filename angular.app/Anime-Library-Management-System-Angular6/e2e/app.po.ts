import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path:string) {
    return browser.get('/' + path);
  }

  getParagraphText() {
    return element(by.css('app-header h1')).getText();
  }

  getAnimeListLink() {
    return element(by.css('[routerlink="/anime-list"]'));
  }

  getPopularAnimeLink() {
    return element(by.css('[routerlink="/popular-anime"]'));
  }

  getAnimeListHeaderText() {
    return element(by.css('app-anime-list h1')).getText();
  }

  getPopularAnimeHeaderText() {
    return element(by.css('app-popular-anime h1')).getText();
  }

}
