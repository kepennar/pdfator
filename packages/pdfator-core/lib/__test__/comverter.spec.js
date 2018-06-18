describe('Fapi configurer', () => {
  let configurer;
  beforeEach(() => {
    configurer = new FapiUrlConfigurer();
  });

  it('should be configured by passing an object', () => {
    const FAPI_ID = 'test';
    configurer.configure({
      [FAPI_ID]: {
        url: '/test',
        withLoading: true,
        withPagination: false
      }
    });
    expect(configurer.getUrl(FAPI_ID)).toEqual('/test');
    expect(configurer.isWithLoading(FAPI_ID)).toEqual(true);
    expect(configurer.isPaginated(FAPI_ID)).toEqual(false);
  });
});
