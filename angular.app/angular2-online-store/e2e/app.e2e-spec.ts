import { Angular2OnlineStorePage } from './app.po';

describe('angular2-online-store App', function() {
  let page: Angular2OnlineStorePage;

  beforeEach(() => {
    page = new Angular2OnlineStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
