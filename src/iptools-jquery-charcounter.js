;(function($) {

  'use strict';

  var pluginName = 'iptCharCounter';
  var defaults = {
    maxLength: 1000,
    addModifierClass: true,
    elementModifierClass: 'textarea--with-counter',
    addWrapper: true,
    wrapperClass: 'textarea-wrapper',
    counterClass: 'textarea-counter',
    warningLimit: 30,
    warningClass: 'textarea-counter--warning'
  };


  /**
   * IPTCharCounter
   * @constructor
   * @param {object} element - jQuery element
   * @param {object} options - plugin options
   */
  function IPTCharCounter(element, options) {

    this.$element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();

  }

  IPTCharCounter.prototype = {

    init: function() {

      this.maxChars = parseInt(this.$element.data('max-length'), 10) || this.settings.maxLength;
      this.$counter = $('<div class="' + this.settings.counterClass + '">' + this.maxChars + '</div>');
      if (this.settings.addWrapper) {
        this.$wrapper = this.$element.wrap('<div class="' + this.settings.wrapperClass + '"></div>').parent();
        this.$counter.appendTo(this.$wrapper);
      } else {
        this.$element.after(this.$counter);
      }

      this.$element.addClass(this.settings.elementModifierClass);

      this.addEventListeners();

    },

    /**
     * handles change event
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
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

    /**
     * handles change with short delay
     * @param {event} event - jQuery event
     * @returns {undefined}
     */
    handleChangeWithDelay: function(event) {

      var self = event.data;
      setTimeout(function() {
        self.handleChange(event);
      }, 100);

    },

    /**
     * add event listeners
     * @returns {undefined}
     */
    addEventListeners: function() {

      this.$element.on('keyup' + '.' + this._name + ' ' + 'paste' + '.' + this._name, null, this, this.handleChange);

    },

    /**
     * destroy method
     * @returns {undefined}
     */
    destroy: function() {

      this.$element.off('keyup' + '.' + this._name + ' ' + 'paste' + '.' + this._name);
      this.$element.removeData('plugin_' + pluginName);

    }

  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTCharCounter(this, options));
      }
    });
  };

})(jQuery);
