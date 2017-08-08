import { BaseMetalHotPage } from './app.po';

describe('base-metal-hot App', () => {
  let page: BaseMetalHotPage;

  beforeEach(() => {
    page = new BaseMetalHotPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
