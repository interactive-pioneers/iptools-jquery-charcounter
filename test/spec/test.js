'use strict';
/* jshint undef: false */
(function() {
  describe('iptCharCounter', function() {

    var config = {
      defaultMaxLength: 999,
      warningLimit: 50
    };

    var pluginName = 'plugin_iptCharCounter';

    var object = null;

    describe('init', function() {

      beforeEach(function() {
        object = $('textarea').iptCharCounter(config);
      });

      it('expected to construct object', function() {
        return expect(object).to.be.an.object;
      });

      it('expected to set default max length to ' + config.defaultMaxLength, function() {
        return expect(object.data(pluginName).settings.defaultMaxLength).to.equal(config.defaultMaxLength);
      });

      it('expected to warning limit to ' + config.warningLimit, function() {
        return expect(object.data(pluginName).settings.warningLimit).to.equal(config.warningLimit);
      });

    });

  });
})();
