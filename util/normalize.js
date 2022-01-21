function getNormalizedMap(array, columnNames) {
  const map = new Map(
    columnNames.map((fieldName) => {
      const max = Math.max(...array.map((row) => row[fieldName]));
      const min = Math.min(...array.map((row) => row[fieldName]));
      const range = max - min;
      return [fieldName, { min, max, range }];
    })
  );

  return map;
}

function normalize(array, columnNames, normalizedMap) {
  const map = normalizedMap ?? getNormalizeMap(array, columnNames);
  const result = array.map((row) =>
    columnNames.reduce((r, columnName) => {
      const { min, range } = map.get(columnName);
      const value = r[columnName];
      return { ...r, [columnName]: (value - min) / range };
    }, row)
  );

  return result;
}

module.exports = { getNormalizedMap, normalize };