import { formatMarkup } from '@/formatMarkup.js';

const unformattedMarkup = `
<div id="header">
  <h1>Hello World!</h1>
  <ul id="main-list" class="list"><li><a class="link" href="#">My HTML</a></li></ul>
</div>
`.trim();

const formattedMarkup = `
<div id="header">
  <h1>
    Hello World!
  </h1>
  <ul
    id="main-list"
    class="list"
  >
    <li>
      <a
        class="link"
        href="#"
      >My HTML</a>
    </li>
  </ul>
</div>
`.trim();

describe('Format markup', () => {
  const info = console.info;

  beforeEach(() => {
    globalThis.vueSnapshots = {
      verbose: true
    };
    console.info = vi.fn();
  });

  afterEach(() => {
    console.info = info;
  });

  test('Does no formatting', () => {
    globalThis.vueSnapshots.formatter = 'none';

    expect(formatMarkup(unformattedMarkup))
      .toEqual(unformattedMarkup);

    expect(console.info)
      .not.toHaveBeenCalled();
  });

  test('Formats HTML to be diffable', () => {
    globalThis.vueSnapshots.formatter = 'diffable';

    expect(formatMarkup(unformattedMarkup))
      .toEqual(formattedMarkup);

    expect(console.info)
      .not.toHaveBeenCalled();
  });

  test('Applies custom formatting', () => {
    globalThis.vueSnapshots.formatter = function () {
      return 'test';
    };

    expect(formatMarkup(unformattedMarkup))
      .toEqual('test');

    expect(console.info)
      .not.toHaveBeenCalled();
  });

  test('Logs warning if custom function does not return a string', () => {
    globalThis.vueSnapshots.formatter = function () {
      return 5;
    };

    expect(formatMarkup(unformattedMarkup))
      .toEqual(unformattedMarkup);

    expect(console.info)
      .toHaveBeenCalledWith('Vue 3 Snapshot Serializer: Your custom markup formatter must return a string.');
  });
});