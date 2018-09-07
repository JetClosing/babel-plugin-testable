/**
 * Example test file for jest tests
 */
import { CACHE_TIME, cache, getKey, isExpired, putUser, getUser } from '../src/SimpleCache';

const originalNow = Date.now;

beforeAll(() => {
  Date.now = jest.fn(() => 123456789);
});

afterAll(() => {
  Date.now = originalNow;
});

beforeEach(() => {
  for (const key of Object.keys(cache)) {
    delete cache[key];
  }
});

describe('isExpired', () => {
  it('test expired', () => {
    const inputTime = 0;

    const result = isExpired(inputTime);

    expect(result).toBe(true);
  });

  it('test not expired', () => {
    const inputTime = 987654321;

    const result = isExpired(inputTime);

    expect(result).toBe(false);
  });

  it('test same time', () => {
    const inputTime = Date.now();

    const result = isExpired(inputTime);

    expect(result).toBe(false);
  });
});

describe('getKey', () => {
  it('valid names', () => {
    const firstName = 'First';
    const lastName = 'Last';

    const result = getKey(firstName, lastName);

    expect(result).toEqual('First_Last');
  });

  it('undefined names', () => {
    const firstName = undefined;
    const lastName = undefined;

    const result = getKey(firstName, lastName);

    expect(result).toEqual('NULL_NULL');
  });
});

describe('putUser', () => {
  it('put data', () => {
    const user = {
      firstName: 'First',
      lastName: 'Last',
    };
    const expectedExpireTime = Date.now() + CACHE_TIME;

    const result = putUser(user);

    expect(Object.keys(cache)).toHaveLength(1);
    const cachedData = cache[Object.keys(cache)[0]];
    expect(cachedData).toBeDefined();
    expect(cachedData.expireTime).toBe(expectedExpireTime)
    expect(cachedData.data).toEqual(user);
  });
});

describe('getUser', () => {
  it('nothing cached', () => {
    const firstName = 'First';
    const lastName = 'Last';

    const result = getUser(firstName, lastName);

    expect(result).toBeNull();
  });

  it('gets cached', () => {
    const firstName = 'First';
    const lastName = 'Last';
    putUser({ firstName, lastName });

    const result = getUser(firstName, lastName);

    expect(result).toBeDefined();
    expect(result.firstName).toEqual(firstName);
    expect(result.lastName).toEqual(lastName);
  });
});
