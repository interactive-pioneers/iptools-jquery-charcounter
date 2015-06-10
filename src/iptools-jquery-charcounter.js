;(function($) {

  'use strict';

  var pluginName = 'ipCharCounter';
  var defaults = {
    maxLength: 1000,
    elementModifierClass: 'textarea--with-counter',
    wrapperClass: 'textarea-wrapper',
    counterClass: 'textarea-counter',
    warningLimit: 30,
    warningClass: 'textarea-counter--warning'
  };

  function IPCharCounter(element, options) {

    this.$element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.maxChars = parseInt(this.$element.data('max-length'), 10) || this.settings.maxLength;
    this.$wrapper = this.$element.wrap('<div class="' + this.settings.wrapperClass + '"></div>').parent();
    this.$counter = $('<div class="' + this.settings.counterClass + '">' + this.maxChars + '</div>').appendTo(this.$wrapper);
    this.$element.addClass(this.settings.elementModifierClass);

    this.addEventListeners();

  }

  IPCharCounter.prototype = {

    handleChange: function(event) {

      var self = event.data;

      var text = self.$element.val();
      var countChars = text.length;
      var remaining = self.maxChars - countChars;
      if (remaining < 0) {
        remaining = 0;
        text = text.substr(0, self.maxChars);
        self.$element.val(text);
      }
      if (remaining <= self.settings.warningLimit) {
        self.$counter.addClass(this.settings.warningClass);
      } else {
        self.$counter.removeClass(this.settings.warningClass);
      }
      self.$counter.text(remaining);

    },

    handleChangeWithDelay: function(event) {

      var self = event.data;
      setTimeout(function() {
        self.handleChange(event);
      }, 100);

    },

    addEventListeners: function() {

      this.$element.on('keyup' + '.' + this._name, null, this, this.handleChange);
      this.$element.on('paste' + '.' + this._name, null, this, this.handleChangeWithDelay);

    },

    destroy: function() {

      this.$element.off('keyup' + '.' + this._name + ' ' + 'paste' + '.' + this._name);
      this.$element.removeData();

    }

  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPCharCounter(this, options));
      }
    });
  };

})(jQuery);
