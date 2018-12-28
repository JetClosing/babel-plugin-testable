import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';
import plugin from '..';

const originalEnv = { ...process.env };
const originalItFunc = global.it;
const originalLog = console.log;
beforeEach(() => {
  process.env = originalEnv;
  global.it = originalItFunc;
  console.log = originalLog;
});

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

const fixturesDir = path.join(__dirname, '../__fixtures__');
fs.readdirSync(fixturesDir).forEach((caseName) => {
  test(`${caseName.split('-').join(' ')}`, () => {
    const fixtureDir = path.join(fixturesDir, caseName);
    const codePath = path.join(fixtureDir, 'code.js');

    const hasBabelRc = fs.existsSync(path.join(fixtureDir, '.babelrc'));
    const actual = transformFileSync(codePath, { plugins: [plugin], babelrc: hasBabelRc }).code;

    const expected = fs.readFileSync(path.join(fixtureDir, 'output.js')).toString();

    assert.equal(trim(actual), trim(expected));
  });
});

test('plugin disabled', () => {
  process.env.NODE_ENV = 'development';
  process.env.BABEL_ENV = null;
  global.it = null;
  const codePath = path.join(__dirname, '../__fixtures__/const-strings/code.js');
  const babelOptions = {
    plugins: [
      plugin,
    ],
  };

  const actual = transformFileSync(codePath, babelOptions).code;

  expect(actual).toMatchSnapshot();
});


test('debug enabled', () => {
  console.log = jest.fn();
  const codePath = path.join(__dirname, '../__fixtures__/const-strings/code.js');
  const babelOptions = {
    plugins: [
      [
        plugin,
        {
          debug: true,
        },
      ],
    ],
  };

  transformFileSync(codePath, babelOptions);

  expect(console.log).toHaveBeenCalled();
});

test('babel env test', () => {
  process.env.NODE_ENV = 'development';
  process.env.BABEL_ENV = 'test';
  const codePath = path.join(__dirname, '../__fixtures__/const-strings/code.js');
  const babelOptions = {
    plugins: [
      plugin,
    ],
  };

  const actual = transformFileSync(codePath, babelOptions).code;

  expect(actual).toMatchSnapshot();
});
