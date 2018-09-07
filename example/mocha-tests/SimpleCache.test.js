/**
 * Example test file for mocha tests
 */
import assert from 'assert';

import { CACHE_TIME, cache, getKey, isExpired, putUser, getUser } from '../src/SimpleCache';

const originalNow = Date.now;

beforeEach(() => {
  for (const key of Object.keys(cache)) {
    delete cache[key];
  }
});

describe('isExpired', () => {
  it('test expired', () => {
    const inputTime = 0;

    const result = isExpired(inputTime);

    assert.equal(result, true);
  });

  it('test not expired', () => {
    const inputTime = Date.now() + CACHE_TIME + 1000;

    const result = isExpired(inputTime);

    assert.equal(result, false);
  });
});

describe('getKey', () => {
  it('valid names', () => {
    const firstName = 'First';
    const lastName = 'Last';

    const result = getKey(firstName, lastName);

    assert.equal(result, 'First_Last');
  });

  it('undefined names', () => {
    const firstName = undefined;
    const lastName = undefined;

    const result = getKey(firstName, lastName);

    assert.equal(result, 'NULL_NULL');
  });
});

describe('putUser', () => {
  it('put data', () => {
    const user = {
      firstName: 'First',
      lastName: 'Last',
    };

    const result = putUser(user);

    assert.equal(Object.keys(cache).length, 1);
    const cachedData = cache[Object.keys(cache)[0]];
    assert.equal(cachedData.data, user);
  });
});

describe('getUser', () => {
  it('nothing cached', () => {
    const firstName = 'First';
    const lastName = 'Last';

    const result = getUser(firstName, lastName);

    assert.equal(result, null);
  });

  it('gets cached', () => {
    const firstName = 'First';
    const lastName = 'Last';
    putUser({ firstName, lastName });

    const result = getUser(firstName, lastName);

    assert.equal(result.firstName, firstName);
    assert.equal(result.lastName, lastName);
  });
});
