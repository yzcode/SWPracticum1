"use strict";
angular.module("ui.bootstrap.popbox", ["ui.bootstrap.position"]).provider("$popbox", [
    function () {
        var defaultOptions = {
                placement: "top",
                align: null,
                animation: true,
                popupDelay: 0,
                arrow: false,
                popboxClass: "popbox",
                transitionClass: "fade",
                triggerClass: "in",
                popboxOpenClass: "popbox-open",
                resolve: {},
                backdropFade: false,
                popboxFade: false,
                keyboard: true,
                backdropClick: true
            }, options = {}, i = 2,
            n = 58;
        this.options = function (userOptions) {
            options = userOptions
        }, this.$get = ["$http", "$document", "$compile", "$rootScope", "$controller", "$templateCache", "$q", "$injector", "$position", "$timeout",
            function ($http, $document, $compile, $rootScope, $controller, $templateCache, $q, $injector, $position, $timeout) {
                function h(e) {
                    var t = angular.element("<div>");
                    return t.addClass(e), t
                }

                function g(i) {
                    var n = this,
                        a = this.options = angular.extend({}, defaultOptions, options, i);
                    this._open = false, this._target = $(n.options.target.target), $(this._target).hasClass("js-popbox") || $(this._target).parents(".js-popbox").length > 0 && (this._target = $(this._target).parents(".js-popbox").eq(0)), this.modalEl = h(a.popboxClass), a.popboxFade && (this.modalEl.addClass(a.transitionClass), this.modalEl.removeClass(a.triggerClass)), this.handledEscapeKey = function (e) {
                        27 === e.which && (n.close(), e.preventDefault(), n.$scope.$apply())
                    }, this.handledSortable = function () {
                        n.close(), n.$scope.$apply()
                    }, this.handleBackDropClick = function (e) {
                        for (var t = e.target, i = true; t;) {
                            if ($(t).hasClass("popbox") || $(t).hasClass("popbox-step-li") || $(t).hasClass("openpop")) {
                                i = false;
                                break
                            }
                            t = t.parentNode
                        }
                        0 === $(e.target).parents("body").length && (i = false), i && m.hasClass("popbox-open") && (n.close(), e.preventDefault(), n.$scope.$apply())
                    }, this.handleLocationChange = function () {
                        n.close()
                    }
                }

                var m = $document.find("body");
                return g.prototype.isOpen = function () {
                    return this._open
                }, g.prototype.open = function (e, t) {
                    var a = this,
                        s = this.options,
                        c = a.options.popboxClass;
                    if (m.hasClass("popbox-open") && $("." + c).length > 0) {
                        if (this._target[0] === $("." + c).scope().popbox._target[0])
                            return $("." + c).scope().popbox.close(), void 0;
                        $("." + a.options.popboxClass).each(function () {
                            $(this).scope().popbox.close()
                        })
                    }
                    if (e && (s.templateUrl = e), t && (s.controller = t), !s.template && !s.templateUrl) throw new Error("Popbox.open expected template or templateUrl, neither found. Use options or open method to specify them.");
                    return this._loadResolves().then(function (e) {
                        var t = e.$scope = a.$scope = e.$scope ? e.$scope : $rootScope.$new();
                        if (a.modalEl.html(e.$template), a.options.controller) {
                            var s = $controller(a.options.controller, e);
                            a.modalEl.children().data("ngControllerController", s)
                        }
                        a._addElementsToDom(), $compile(a.modalEl)(t), $timeout(function () {
                            a.options.popboxFade && a.modalEl.addClass(a.options.triggerClass)
                        });
                        var c = $(document).width(),
                            u = $(document).height(),
                            d = $(document).outerWidth();
                        //kzi.util.docOuterHeight();
                        var _ = null,
                            g = function () {
                                var e, t = {};
                                e = $position.position(a._target), e.top = a.options.top || $(a._target).offset().top, e.left = a.options.left || $(a._target).offset().left, a.modalEl.css({
                                    display: "block"
                                });
                                var s = $(a.modalEl).outerWidth(true),
                                    o = $(a.modalEl).outerHeight(true);
                                a.options.top && (e.height = 0, e.width = 0);
                                var r = $(a._target).data("placement");
                                r || (r = a.options.placement);
                                var align = $(a._target).data("align");
                                align || (align = a.options.align);
                                var offset = $(a._target).data("offset");
                                offset = null == offset ? i : parseInt(offset, 10);
                                var h1 = {
                                    set_box_placement_auto_lf: function () {
                                        (null === r || "auto" === r) && (r = c / 2 > e.left ? "right" : "left")
                                    },
                                    set_box_align_auto_tb: function () {
                                        "auto" === align && (align = u / 2 > e.top ? "top" : "bottom")
                                    },
                                    set_top_position: function () {
                                        "top" === align ?
                                            t.top = e.top : "bottom" === align ?
                                            t.bottom = u - e.top - e.height : e.top > u / 2 ?
                                            /*                t.bottom = u - e.top - e.height / 2 - o / 2 :*/
                                            t.top = e.top + e.height / 2 - o / 2 :
                                            t.top = e.top + e.height / 2 - o / 2,
                                        void 0 !== t.top && null !== t.top && (t.top + o > u ? t.top = u - o - i : n > t.top && (t.top = n + i)),
                                        void 0 !== t.bottom && null !== t.bottom && (0 > t.bottom ? t.bottom = i : t.bottom + o + n > u && (t.bottom = u - o - n));
                                    },
                                    set_left_position: function () {
                                        "right" === align ? t.right = c - e.left - e.width : t.left = "left" === align ? e.left : e.left + e.width / 2 - s / 2, void 0 !== t.left && null !== t.left && (0 >= t.left ? t.left = i : t.left + s > c && (t.left = void 0, t.right = i)), void 0 !== t.right && null !== t.right && (0 > t.right ? t.right = i : t.right + s > c && (t.right = void 0, t.left = i))
                                    }
                                };
                                switch (h1.set_box_placement_auto_lf(), r) {
                                    case "right":
                                        h1.set_top_position(),
                                            t.left = e.left + e.width + i, t.left + s > d && (t.left = void 0, t.right = d - e.left + i);
                                        break;
                                    case "left":
                                        h1.set_top_position(), t.right = c - e.left + i, t.right + s > d && (t.right = e.left + s + i);
                                        break;
                                    case "top":
                                        h1.set_left_position(), t.bottom = u - e.top + i, t.bottom + o > u - n && (t.bottom = void 0, t.top = e.top + e.height + i);
                                        break;
                                    case "bottom":
                                        h1.set_left_position(), t.top = e.top + e.height + offset, t.top + o > u && (t.top = void 0, t.bottom = u - e.top + i, t.bottom + o > u - n && (t.top = u - n - o, t.bottom = void 0));
                                        break;
                                    default:
                                        t = {
                                            top: e.top + e.height + 2 + "px",
                                            left: e.left - e.width / 2 + "px"
                                        }, a.options.placement = "bottom"
                                }
                                _ = t, a.modalEl.css(t), m.addClass(a.options.popboxOpenClass)
                            };
                        $timeout(function () {
                            g()
                        }, 100);
                        var v = $(a._target).data("auto-adapt");
                        (v || "true" === v) && (a.$watcher = t.$watch(function () {
                            return $(a.modalEl).outerWidth(true) + "," + $(a.modalEl).outerHeight(true)
                        }, function () {
                            $timeout(function () {
                                g()
                            })
                        })), a._bindEvents()
                    }), this.deferred = $q.defer(), this.deferred.promise
                }, g.prototype.close = function (e, t) {
                    var i = this;
                    this._getFadingElements(),"function"==typeof $watcher && i.$watcher(), m.removeClass(i.options.popboxOpenClass), this._onCloseComplete(e, t)
                }, g.prototype._getFadingElements = function () {
                    var e = [];
                    return this.options.popboxFade && e.push(this.modalEl), e
                }, g.prototype._bindEvents = function () {
                    this.options.keyboard && m.bind("keydown.popbox", this.handledEscapeKey), this.options.backdropClick && (m.bind("mousedown.popbox", this.handleBackDropClick), m.bind("sortstart.popbox", this.handledSortable)), this.modalEl.bind("mousedown.popbox", function () {
                    }), this.$scope.$on("$locationChangeSuccess", this.handleLocationChange)
                }, g.prototype._unbindEvents = function () {
                    this.options.keyboard && m.unbind("keydown.popbox", this.handledEscapeKey), this.options.backdropClick && m.unbind("mousedown.popbox", this.handleBackDropClick), m.unbind("sortstart.popbox", this.handledSortable)
                }, g.prototype._onCloseComplete = function (e, t) {
                    this._removeElementsFromDom(), t || this._unbindEvents(), this.deferred.resolve(e)
                }, g.prototype._addElementsToDom = function () {
                    $(this._target).addClass("openpop"),
                        m.append(this.modalEl),
                        this._open = true
                }, g.prototype._removeElementsFromDom = function () {
                    this._target.removeClass("openpop"), this.modalEl.remove(), this._open = false
                }, g.prototype._loadResolves = function () {
                    var i, e = [],
                        t = [],
                        n = this;
                    return this.options.template ? i = $q.when(this.options.template) : this.options.templateUrl && (i = $http.get(this.options.templateUrl, {
                        cache: $templateCache
                    }).then(function (e) {
                        return e.data
                    })), angular.forEach(this.options.resolve || [], function (i, n) {
                        t.push(n), e.push(angular.isString(i) ? $injector.get(i) : $injector.invoke(i))
                    }), t.push("$template"), e.push(i), $q.all(e).then(function (e) {
                        var i = {};
                        return angular.forEach(e, function (e, n) {
                            i[t[n]] = e
                        }), i.popbox = n, i
                    })
                }, {
                    popbox: function (e) {
                        return new g(e)
                    }
                }
            }
        ]
    }
])
