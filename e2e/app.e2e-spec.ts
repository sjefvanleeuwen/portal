import { CoreUIPage } from './app.po';

describe('core-ui App', function() {
  let page: CoreUIPage;

  beforeEach(() => {
    page = new CoreUIPage();
  });

  it('should display footer containing Wigo4it', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Wigo4it');
  });
});
