/**
 * Created by Comzyh on 2014/12/8.
 */
+function ($) {
    'use strict';

    // POPOVER PUBLIC CLASS DEFINITION
    // ===============================

    var Popover_ng = function (element, options) {
        this.init('popover_ng', element, options)
    }

    if (!$.fn.tooltip) throw new Error('Popover_ng requires tooltip.js')

    Popover_ng.VERSION = '0.0.1'

    Popover_ng.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover"><div class="arrow"></div><div class="popover-content"></div>',      //
        arrow: false
    })


    // NOTE: POPOVER EXTENDS tooltip.js
    // ================================

    Popover_ng.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

    Popover_ng.prototype.constructor = Popover_ng

    Popover_ng.prototype.getDefaults = function () {
        return Popover_ng.DEFAULTS
    }

    Popover_ng.prototype.setContent = function () {
        var $tip = this.tip()
        var $compile = this.options.$compile
        var $scope = this.options.$scope;
        var content = this.getContent()
        var show_arrow = this.show_arrow
        if (!show_arrow)
            $tip.find('.arrow').hide()
        var template, linkFn, element
        var template = typeof  content == 'string' ? angular.element(content) : content
        if ($compile && $scope) {
            linkFn = $compile(template);
            element = linkFn($scope);
        }
        else
            element = template;
        $tip.find('.popover-content').empty();
        $tip.find('.popover-content').append(element);
        $scope.$apply();
        $tip.removeClass('fade top bottom left right in')
        window.xxx=$scope
        window.yyy=element
    }

    Popover_ng.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }

    Popover_ng.prototype.getContent = function () {
        var $e = this.$element
        var o = this.options

        return $e.attr('data-content')
            || (typeof o.content == 'function' ?
                o.content.call($e[0]) :
                o.content)
    }

    Popover_ng.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
    }

    Popover_ng.prototype.tip = function () {
        if (!this.$tip) this.$tip = $(this.options.template)
        return this.$tip
    }


    // POPOVER PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.popover_ng')
            var options = typeof option == 'object' && option
            var selector = options && options.selector

            if (!data && option == 'destroy') return
            if (selector) {
                if (!data) $this.data('bs.popover_ng', (data = {}))
                if (!data[selector]) data[selector] = new Popover_ng(this, options)
            } else {
                if (!data) $this.data('bs.popover_ng', (data = new Popover_ng(this, options)))
            }
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.popover_ng

    $.fn.popover_ng = Plugin
    $.fn.popover_ng.Constructor = Popover_ng


    // POPOVER NO CONFLICT
    // ===================

    $.fn.popover_ng.noConflict = function () {
        $.fn.popover_ng = old
        return this
    }

}(jQuery);
