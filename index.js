import { isHtmlString, isVueWrapper } from './src/helpers.js';
import { loadOptions } from './src/loadOptions.js';
import { vNodeManipulation } from './src/vNodeManipulation.js';
import { stringManipulation } from './src/stringManipulation.js';
import { formatMarkup } from './src/formatMarkup.js';

/**
 * Test function for Vitest's serializer API.
 * Determines whether to pass the markup through the print function.
 *
 * @param  {string|object} received  The markup or Vue wrapper to be formatted
 * @return {boolean}                 true = Tells Vitest to run the print function
 */
const test = function (received) {
  return isHtmlString(received) || isVueWrapper(received);
};

/**
 * Print function for Vitest's serializer API.
 * Formats markup according to options.
 *
 * @param  {string|object} received  The markup or Vue wrapper to be formatted
 * @return {string}                  The formatted markup
 */
const print = function (received) {
  loadOptions();
  let html = received || '';
  html = vNodeManipulation(html);
  html = stringManipulation(html);

  return formatMarkup(html);
};

export const vueMarkupFormatter = function (html) {
  loadOptions();
  if (!isHtmlString(html)) {
    return html;
  }
  html = stringManipulation(html);
  return formatMarkup(html);
};

export default {
  test,
  print
};