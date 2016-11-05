'use strict';
(function(module) {
  var zip = {};
//zipcode, neighborhood, address, lat, long
  var getData = function() {
    $.getJSON('/data/manhattan.json', function(data) {
      // TODO: start here!
      var propertyData = data.features.map(function(data){
        return {
          zip : data.properties.zip,
          neighborhood : data.properties.neighborhood,
          address : data.properties.address,
          coordinates : {
            lat : data.geometry.coordinates[0],
            long : data.geometry.coordinates[1]
          }
        };
      });

      var name = [], count = [], topFive = [];
      propertyData.forEach(function(cur){
        if (name.indexOf(cur.neighborhood) === -1){
          name.push(cur.neighborhood);
          count.push(1);
        } else {
          count[name.indexOf(cur.neighborhood)] += 1;
        }
      });
      name.forEach(function(cur, idx){
        var x = {
          neighborhood : name[idx],
          total : count[idx]
        };
        topFive.push(x);
      },[]);
      topFive.sort(function(a,b){
        return parseFloat(b.total) - parseFloat(a.total);
      });
      topFive = topFive.slice(0,5);
      console.log(topFive);
    });
  };

  getData();
  module.zip = zip;
})(window);
