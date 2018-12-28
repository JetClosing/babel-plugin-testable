import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';
import plugin from '..';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

const fixturesDir = path.join(__dirname, '../__fixtures__');
fs.readdirSync(fixturesDir).forEach((caseName) => {
  it(`${caseName.split('-').join(' ')}`, () => {
    const fixtureDir = path.join(fixturesDir, caseName);
    const codePath = path.join(fixtureDir, 'code.js');

    const hasBabelRc = fs.existsSync(path.join(fixtureDir, '.babelrc'));
    const actual = transformFileSync(codePath, { plugins: [plugin], babelrc: hasBabelRc }).code;

    const expected = fs.readFileSync(path.join(fixtureDir, 'output.js')).toString();

    assert.equal(trim(actual), trim(expected));
  });
});
