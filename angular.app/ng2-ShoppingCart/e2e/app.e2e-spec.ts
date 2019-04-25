import { ProjectPage } from './app.po';

describe('project App', () => {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
