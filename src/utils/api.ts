const storageKey = "calendar-tasks";

const collectionName = "calendar-tasks";
const collectionTestName = "calendar-tasks-test";

const firebaseConfig = {
  apiKey: "AIzaSyBCwWOSumanDKGvZCJTjYuBNClE1Ypz3Z0",
  authDomain: "mytaskcalendar-961ee.firebaseapp.com",
  projectId: "mytaskcalendar-961ee",
  storageBucket: "mytaskcalendar-961ee.appspot.com",
  messagingSenderId: "144127656421",
  appId: "1:144127656421:web:10100fd106f50697786f0c",
};

const serializeQuery = (queryParams: Record<string, any>) => {
  const query = Object.entries(queryParams).reduce(
    (acc, [key, value], index, array) => {
      if (value === "") {
        return acc;
      }
      const postfix = index === array.length - 1 ? "" : "&";
      return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(
        value
      )}${postfix}`;
    },
    "?"
  );

  if (query.length === 1) {
    return "";
  }
  if (query[query.length - 1] === "&") {
    return query.slice(0, -1);
  }
  return query;
};

const deserializeQuery = (
  query: string,
  noQuestionMark = false
): Record<string, string> => {
  const decodedQuery = decodeURIComponent(query);
  const pairs = (noQuestionMark ? query : decodedQuery.substring(1)).split("&");
  const array = pairs.map((elem) => elem.split("="));
  return Object.fromEntries(array);
};

export {
  storageKey,
  collectionName,
  firebaseConfig,
  collectionTestName,
  serializeQuery,
  deserializeQuery,
};
