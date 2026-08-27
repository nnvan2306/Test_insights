const groupByTag = (bookmarks) => {
  const obj = {};
  bookmarks.forEach((b) => {
    const tag = b?.tag || 'untagged';
    if (!obj[tag]) {
        obj[tag] = [];
    }
    obj[tag].push(b);
  });

  return obj;
}