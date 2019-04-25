import { AppPage } from './app.po';

describe('library App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo('home');
    expect(page.getParagraphText()).toEqual(`Abhishek's Anime Library`);
  });
  
  it('should display anime list link', () => {
    page.navigateTo('home');
    expect(page.getAnimeListLink().getText()).toEqual('Anime List');
  });

  it('should route to anime list page', () => {
    page.navigateTo('home');
    page.getAnimeListLink().click();
    expect(page.getAnimeListHeaderText()).toEqual('Anime-List');
  });

  it('should display popular anime link', () => {
    page.navigateTo('home');
    expect(page.getPopularAnimeLink().getText()).toEqual('Popular Anime');
  });

  it('should route to popular anime page', () => {
    page.navigateTo('home');
    page.getPopularAnimeLink().click();
    expect(page.getPopularAnimeHeaderText()).toEqual('Popular Anime Series');
  });

});
