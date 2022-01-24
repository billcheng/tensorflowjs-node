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

function normalize(array, arg1, arg2) {
  if (Array.isArray(array[0])) {
    if (arg1 && (arg2 || arg2===0)) {
      return normalizeArray(array, arg1, arg2);
    } else {
      const flatten = array.flat();
      const min = Math.min(...flatten);
      if (arg1) {
        return normalizeArray(array, arg1, min);
      } else {
        const max = Math.max(...flatten);
        const range = max - min;
        return normalizeArray(array, range, min);
      }
    }
  }

  return normalizeObject(array, arg1, arg2);
}

function normalizeObject(array, columnNames, normalizedMap) {
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

function normalizeArray(arrays, range, min) {
  return arrays.map((array) => array.map(element => (element - min) / range));
}

module.exports = { getNormalizedMap, normalize };
