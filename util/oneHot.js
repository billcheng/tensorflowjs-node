function oneHot(array, columnNames, zeroEncoder) {
  const map = new Map(
    columnNames.map((columnName) => {
      const set = new Set(array.map((row) => row[columnName]));
      const uniqueValues = Array.from(set);
      return [columnName, uniqueValues];
    })
  );

  const result = array.map((row) =>
    columnNames.reduce((r, columnName) => {
      const { [columnName]: old, ...rest } = r;
      const uniqueValues = map.get(columnName);
      return uniqueValues.reduce(
        (r, uniqueValue) => ({
          ...r,
          [`${columnName}_${uniqueValue}`]:
            uniqueValue == old ? 1 : zeroEncoder ?? 0
        }),
        rest
      );
    }, row)
  );

  return result;
}

module.exports = { oneHot };
