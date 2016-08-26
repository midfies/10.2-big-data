(function(module) {
  var zip = {};

  getData = function() {
    $.getJSON('/data/manhattan.json', function(data) {
      // TODO: start here!
    });
  };

  getData();
  module.zip = zip;
})(window);
