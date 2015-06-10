'use strict';
/* jshint undef: false */
(function() {
  describe('iptCharCounter', function() {

    var config = {
      defaultMaxLength: 10,
      warningLimit: 50,
      warningClass: 'warning'
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

    describe('getRemainingChars', function() {

      beforeEach(function() {
        object = $('textarea').iptCharCounter(config);
      });

      it('expected to return correct number of remaining chars', function() {
        var testText = 'test';
        object.data(pluginName).text = testText;
        var remaining = object.data(pluginName).maxChars - testText.length;
        return expect(object.data(pluginName).getRemainingChars()).to.equal(remaining);
      });

    });

    describe('handleChange', function() {

      beforeEach(function() {
        object = $('textarea').iptCharCounter(config);
      });

      it('expected to add warning class', function() {
        object.data(pluginName).$element.text('Hallo Welt!');
        setTimeout(function() {
          return expect(object.data(pluginName).$counter.hasClass(config.warningClass)).to.be.ok;
        }, 200);
      });

    });

    describe('destroy', function() {

      beforeEach(function() {
        object = $('textarea').iptCharCounter(config);
      });

      it('expected to remove data', function() {
        object.data(pluginName).destroy();
        return expect(object.data(pluginName)).to.not.be.ok;
      });

    });

  });
})();
