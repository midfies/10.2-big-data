(function(module) {
  function Zip (opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  };

  var neighborhoodTotals = {};
  Zip.topFive = [];

  getData = function() {
    $.getJSON('/data/manhattan.json', function(data) {
      Zip.allZips = data.features.map(returnPropsObj);
      Zip.allZips.forEach(theCount);
      populateTotals(neighborhoodTotals);
    });
  };

  // Initial population of properties from server data
  function returnPropsObj(obj) {
    return {
      zipCode: obj.properties.zip,
      address: !!obj.properties.address ? obj.properties.address : undefined,
      neighborhood: !!obj.properties.neighborhood ? obj.properties.neighborhood.split(', ').splice(0, 1).join() : undefined,
      coordinates: {
        lat: obj.geometry.coordinates[1],
        lng: obj.geometry.coordinates[0]
      }
    }
  }

  // Create a running tab of neighborhood counts
  function theCount(zipObj) {
    if (!neighborhoodTotals[zipObj.neighborhood]) {
      neighborhoodTotals[zipObj.neighborhood] = 1;
    } else neighborhoodTotals[zipObj.neighborhood] ++;
  }

  // Order the results above based on neighborhood frequency
  function populateTotals(obj) {
    for (neighborhood in obj) {
      Zip.topFive.push([neighborhood, obj[neighborhood]]);
      Zip.topFive.sort(highest).splice(5);
    }
    Zip.topFive = Zip.topFive.reduce(statsFriendly, {});
  }

  // Transform 'topFive' array of arrays into a readable object
  function statsFriendly(statsObj, curArray) {
    statsObj[curArray[0]] = curArray[1];
    return statsObj;
  }

  function highest(currentneighborhood, nextNeighborhood) {
    return nextNeighborhood[1] - currentneighborhood[1];
  }

  getData();
  module.Zip = Zip;
})(window);
