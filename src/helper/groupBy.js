export default {
  convertByProperty(originalObject, groupByProperty, secondProperty) {
    var finalArray = [];
    var uniqueVals = [];
    originalObject.map((i) => {
      var existingVals = uniqueVals.filter((j) => {
        return i[groupByProperty] == j;
      });
      if (existingVals.length == 0) {
        uniqueVals.push(i[groupByProperty]);
      }
    });
    uniqueVals.map((k) => {
      var dataObj = [];
      var expectedObj = {};
      var items = originalObject.filter((l) => {
        return l[groupByProperty] == k;
      });
      items.map((m) => {
        var obj = {};
        if (secondProperty) {
          obj[secondProperty] = m[secondProperty];
          obj["data"] = m.data;
          dataObj.push(obj);
        } else {
          dataObj.push(m);
        }
      });
      expectedObj[groupByProperty] = k;
      expectedObj["data"] = dataObj;
      finalArray.push(expectedObj);
    });
    return finalArray;
  },
};
