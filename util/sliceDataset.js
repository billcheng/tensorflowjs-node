function sliceDataset(array, arg1, arg2) {
  if (Array.isArray(arg1)) {
    return sliceTwoDatasets(array, arg1, arg2);
  }

  return sliceSingleDataset(array, arg1);
}

function sliceSingleDataset(dataset, trainRatio) {
  const trainLen = Math.floor(array.length * trainRatio);
  return [dataset.slice(0, size), dataset.slice(trainLen)];
}

function sliceTwoDatasets(features, labels, trainRatio) {
  const trainLen = Math.floor(features.length * trainRatio);
  return [
    features.slice(0, trainLen),
    labels.slice(0, trainLen),
    features.slice(trainLen),
    labels.slice(trainLen)
  ];
}

module.exports = { sliceDataset };
