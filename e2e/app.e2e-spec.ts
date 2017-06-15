import { SmaPage } from './app.po';

describe('sma App', () => {
  let page: SmaPage;

  beforeEach(() => {
    page = new SmaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
