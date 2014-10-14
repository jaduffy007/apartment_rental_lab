var iterators = {
    max: function (numList) {
      var max = -Infinity;
      for (var i = 0; i < numList.length; i++) {
        if (numList[i] > max) {
          max = numList[i];
        }
      }
      return max;
    },

    min: function (numList){
      var min =  Infinity;
      for (var i = 0; i < numList.length; i++) {
        if (numList[i] < min) {
          min = numList[i];
        }
      }
      return min;
    },

    map: function (myArray, callback){
      var newArray = [];
      for (var i = 0; i < myArray.length; i++) {
        newArray.push(callback(myArray[i]));
      }
      return newArray;
    },

    each: function (myArray,callback){
      // iterate over array, [i]*2
      for (var i = 0; i < myArray.length; i++) {
        callback(myArray[i]);
    }
  }
};
    // filter: function (myArray, callback) {
    //   // iterate over array, [i]%2
    // };




module.exports = iterators;