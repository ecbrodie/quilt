import {
  matcherHint,
  printReceived,
  printExpected,
  RECEIVED_COLOR as receivedColor,
} from 'jest-matcher-utils';

import type {Node, HtmlNodeExtensions} from '../types';

import {assertIsNode, printReceivedWithHighlight} from './utilities';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R, T = {}> {
      toContainReactHtml(text: string): void;
    }
  }
}

expect.extend({
  toContainReactHtml,
});

export function toContainReactHtml<Props>(
  this: jest.MatcherUtils,
  node: Node<Props, HtmlNodeExtensions>,
  text: string,
) {
  assertIsNode(node, {
    expectation: 'toContainReactHtml',
    isNot: this.isNot,
  });

  const nodeHtml = node.html;
  const matchIndex = nodeHtml.indexOf(text);
  const pass = matchIndex >= 0;

  const message = pass
    ? () =>
        `${matcherHint('.not.toContainReactHtml', node.toString())}\n\n` +
        `Expected the React element:\n  ${receivedColor(node.toString())}\n` +
        `Not to contain HTML:\n  ${printExpected(text)}\n` +
        `But it did:\n  ${printReceivedWithHighlight(
          nodeHtml,
          matchIndex,
          text.length,
        )}\n`
    : () =>
        `${matcherHint('.not.toContainReactHtml', node.toString())}\n\n` +
        `Expected the React element:\n  ${receivedColor(node.toString())}\n` +
        `With HTML content:\n  ${printReceived(nodeHtml)}\n` +
        `To contain HTML:\n  ${printExpected(text)}\n`;

  return {pass, message};
}