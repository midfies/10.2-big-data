(function(module) {
  function Zip (opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  };

  getData = function() {
    $.getJSON('/data/manhattan.json', function(data) {
      // TODO: start here!
    });
  };

  getData();
  module.Zip = Zip;
})(window);
