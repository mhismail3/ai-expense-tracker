import '@testing-library/jest-dom';

// jsdom lacks scrollIntoView
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  value: () => {},
  writable: true,
});

// ensure fetch APIs are present in the test environment
if (typeof fetch === 'undefined') {
  const { fetch, Request, Response, Headers } = require('node-fetch');
  global.fetch = fetch as any;
  global.Request = Request as any;
  global.Response = Response as any;
  global.Headers = Headers as any;
}
