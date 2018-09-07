
const DEFAULT_NAME  = 'NULL';

// @testable
const CACHE_TIME = 10000;

// @testable
const cache = {};

// @testable
const getKey = (firstName = DEFAULT_NAME, lastName = DEFAULT_NAME) => `${firstName}_${lastName}`;

// @testable
const isExpired = (expireTime) => expireTime < Date.now();

export const putUser = (user) => {
  const key = getKey(user.firstName, user.lastName);
  const expireTime = Date.now() + CACHE_TIME;
  cache[key] = {
    expireTime,
    data: user,
  };
}

export const getUser = (firstName, lastName) => {
  const key = getKey(firstName, lastName);
  const cachedData = cache[key];
  if (!cachedData) {
    return null;
  }

  if (isExpired(cachedData.expireTime)) {
    delete cache[key];
    return null;
  }

  return cachedData.data;
}