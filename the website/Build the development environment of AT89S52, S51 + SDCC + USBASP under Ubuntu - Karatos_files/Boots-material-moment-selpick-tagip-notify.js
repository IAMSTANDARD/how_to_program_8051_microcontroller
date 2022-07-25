
var Arrive = function (a, b, c) { "use strict"; function l(a, b, c) { e.addMethod(b, c, a.unbindEvent), e.addMethod(b, c, a.unbindEventWithSelectorOrCallback), e.addMethod(b, c, a.unbindEventWithSelectorAndCallback) } function m(a) { a.arrive = j.bindEvent, l(j, a, "unbindArrive"), a.leave = k.bindEvent, l(k, a, "unbindLeave") } if (a.MutationObserver && "undefined" != typeof HTMLElement) { var d = 0, e = function () { var b = HTMLElement.prototype.matches || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector; return { matchesSelector: function (a, c) { return a instanceof HTMLElement && b.call(a, c) }, addMethod: function (a, b, c) { var d = a[b]; a[b] = function () { return c.length == arguments.length ? c.apply(this, arguments) : "function" == typeof d ? d.apply(this, arguments) : void 0 } }, callCallbacks: function (a) { for (var c, b = 0; c = a[b]; b++)c.callback.call(c.elem) }, checkChildNodesRecursively: function (a, b, c, d) { for (var g, f = 0; g = a[f]; f++)c(g, b, d) && d.push({ callback: b.callback, elem: g }), g.childNodes.length > 0 && e.checkChildNodesRecursively(g.childNodes, b, c, d) }, mergeArrays: function (a, b) { var d, c = {}; for (d in a) c[d] = a[d]; for (d in b) c[d] = b[d]; return c }, toElementsArray: function (b) { return "undefined" == typeof b || "number" == typeof b.length && b !== a || (b = [b]), b } } }(), f = function () { var a = function () { this._eventsBucket = [], this._beforeAdding = null, this._beforeRemoving = null }; return a.prototype.addEvent = function (a, b, c, d) { var e = { target: a, selector: b, options: c, callback: d, firedElems: [] }; return this._beforeAdding && this._beforeAdding(e), this._eventsBucket.push(e), e }, a.prototype.removeEvent = function (a) { for (var c, b = this._eventsBucket.length - 1; c = this._eventsBucket[b]; b--)a(c) && (this._beforeRemoving && this._beforeRemoving(c), this._eventsBucket.splice(b, 1)) }, a.prototype.beforeAdding = function (a) { this._beforeAdding = a }, a.prototype.beforeRemoving = function (a) { this._beforeRemoving = a }, a }(), g = function (b, d) { var g = new f, h = this, i = { fireOnAttributesModification: !1 }; return g.beforeAdding(function (c) { var i, e = c.target; c.selector, c.callback; (e === a.document || e === a) && (e = document.getElementsByTagName("html")[0]), i = new MutationObserver(function (a) { d.call(this, a, c) }); var j = b(c.options); i.observe(e, j), c.observer = i, c.me = h }), g.beforeRemoving(function (a) { a.observer.disconnect() }), this.bindEvent = function (a, b, c) { b = e.mergeArrays(i, b); for (var d = e.toElementsArray(this), f = 0; f < d.length; f++)g.addEvent(d[f], a, b, c) }, this.unbindEvent = function () { var a = e.toElementsArray(this); g.removeEvent(function (b) { for (var d = 0; d < a.length; d++)if (this === c || b.target === a[d]) return !0; return !1 }) }, this.unbindEventWithSelectorOrCallback = function (a) { var f, b = e.toElementsArray(this), d = a; f = "function" == typeof a ? function (a) { for (var e = 0; e < b.length; e++)if ((this === c || a.target === b[e]) && a.callback === d) return !0; return !1 } : function (d) { for (var e = 0; e < b.length; e++)if ((this === c || d.target === b[e]) && d.selector === a) return !0; return !1 }, g.removeEvent(f) }, this.unbindEventWithSelectorAndCallback = function (a, b) { var d = e.toElementsArray(this); g.removeEvent(function (e) { for (var f = 0; f < d.length; f++)if ((this === c || e.target === d[f]) && e.selector === a && e.callback === b) return !0; return !1 }) }, this }, h = function () { function h(a) { var b = { attributes: !1, childList: !0, subtree: !0 }; return a.fireOnAttributesModification && (b.attributes = !0), b } function i(a, b) { a.forEach(function (a) { var c = a.addedNodes, d = a.target, f = []; null !== c && c.length > 0 ? e.checkChildNodesRecursively(c, b, k, f) : "attributes" === a.type && k(d, b, f) && f.push({ callback: b.callback, elem: node }), e.callCallbacks(f) }) } function k(a, b, f) { if (e.matchesSelector(a, b.selector) && (a._id === c && (a._id = d++), -1 == b.firedElems.indexOf(a._id))) { if (b.options.onceOnly) { if (0 !== b.firedElems.length) return; b.me.unbindEventWithSelectorAndCallback.call(b.target, b.selector, b.callback) } b.firedElems.push(a._id), f.push({ callback: b.callback, elem: a }) } } var f = { fireOnAttributesModification: !1, onceOnly: !1, existing: !1 }; j = new g(h, i); var l = j.bindEvent; return j.bindEvent = function (a, b, c) { "undefined" == typeof c ? (c = b, b = f) : b = e.mergeArrays(f, b); var d = e.toElementsArray(this); if (b.existing) { for (var g = [], h = 0; h < d.length; h++)for (var i = d[h].querySelectorAll(a), j = 0; j < i.length; j++)g.push({ callback: c, elem: i[j] }); if (b.onceOnly && g.length) return c.call(g[0].elem); setTimeout(e.callCallbacks, 1, g) } l.call(this, a, b, c) }, j }, i = function () { function d(a) { var b = { childList: !0, subtree: !0 }; return b } function f(a, b) { a.forEach(function (a) { var c = a.removedNodes, f = (a.target, []); null !== c && c.length > 0 && e.checkChildNodesRecursively(c, b, h, f), e.callCallbacks(f) }) } function h(a, b) { return e.matchesSelector(a, b.selector) } var c = {}; k = new g(d, f); var i = k.bindEvent; return k.bindEvent = function (a, b, d) { "undefined" == typeof d ? (d = b, b = c) : b = e.mergeArrays(c, b), i.call(this, a, b, d) }, k }, j = new h, k = new i; b && m(b.fn), m(HTMLElement.prototype), m(NodeList.prototype), m(HTMLCollection.prototype), m(HTMLDocument.prototype), m(Window.prototype); var n = {}; return l(j, n, "unbindAllArrive"), l(k, n, "unbindAllLeave"), n } }(window, "undefined" == typeof jQuery ? null : jQuery, void 0);






//Bootstrap Material Design https://github.com/FezVrasta/bootstrap-material-design#arrivejs-support
!function (t) { function o(t) { return "undefined" == typeof t.which ? !0 : "number" == typeof t.which && t.which > 0 ? !t.ctrlKey && !t.metaKey && !t.altKey && 8 != t.which && 9 != t.which && 13 != t.which && 16 != t.which && 17 != t.which && 20 != t.which && 27 != t.which : !1 } function i(o) { var i = t(o); i.prop("disabled") || i.closest(".form-group").addClass("is-focused") } function n(o) { o.closest("label").hover(function () { var o = t(this).find("input"); o.prop("disabled") || i(o) }, function () { e(t(this).find("input")) }) } function e(o) { t(o).closest(".form-group").removeClass("is-focused") } t.expr[":"].notmdproc = function (o) { return t(o).data("mdproc") ? !1 : !0 }, t.material = { options: { validate: !0, input: !0, ripples: !0, checkbox: !0, togglebutton: !0, radio: !0, arrive: !0, autofill: !1, withRipples: [".btn:not(.btn-link)", ".card-image", ".navbar a:not(.withoutripple)", ".footer a:not(.withoutripple)", ".dropdown-menu a", ".nav-tabs a:not(.withoutripple)", ".withripple", ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"].join(","), inputElements: "input.form-control, textarea.form-control, select.form-control", checkboxElements: ".checkbox > label > input[type=checkbox]", togglebuttonElements: ".togglebutton > label > input[type=checkbox]", radioElements: ".radio > label > input[type=radio]" }, checkbox: function (o) { var i = t(o ? o : this.options.checkboxElements).filter(":notmdproc").data("mdproc", !0).after("<span class='checkbox-material'><span class='check'></span></span>"); n(i) }, togglebutton: function (o) { var i = t(o ? o : this.options.togglebuttonElements).filter(":notmdproc").data("mdproc", !0).after("<span class='toggle'></span>"); n(i) }, radio: function (o) { var i = t(o ? o : this.options.radioElements).filter(":notmdproc").data("mdproc", !0).after("<span class='circle'></span><span class='check'></span>"); n(i) }, input: function (o) { t(o ? o : this.options.inputElements).filter(":notmdproc").data("mdproc", !0).each(function () { var o = t(this), i = o.closest(".form-group"); 0 === i.length && (o.wrap("<div class='form-group'></div>"), i = o.closest(".form-group")), o.attr("data-hint") && (o.after("<p class='help-block'>" + o.attr("data-hint") + "</p>"), o.removeAttr("data-hint")); var n = { "input-lg": "form-group-lg", "input-sm": "form-group-sm" }; if (t.each(n, function (t, n) { o.hasClass(t) && (o.removeClass(t), i.addClass(n)) }), o.hasClass("floating-label")) { var e = o.attr("placeholder"); o.attr("placeholder", null).removeClass("floating-label"); var a = o.attr("id"), r = ""; a && (r = "for='" + a + "'"), i.addClass("label-floating"), o.after("<label " + r + "class='control-label'>" + e + "</label>") } (null === o.val() || "undefined" == o.val() || "" === o.val()) && i.addClass("is-empty"), i.append("<span class='material-input'></span>"), i.find("input[type=file]").length > 0 && i.addClass("is-fileinput") }) }, attachInputEventHandlers: function () { var n = this.options.validate; t(document).on("change", ".checkbox input[type=checkbox]", function () { t(this).blur() }).on("keydown paste", ".form-control", function (i) { o(i) && t(this).closest(".form-group").removeClass("is-empty") }).on("keyup change", ".form-control", function () { var o = t(this), i = o.closest(".form-group"), e = "undefined" == typeof o[0].checkValidity || o[0].checkValidity(); "" === o.val() ? i.addClass("is-empty") : i.removeClass("is-empty"), n && (e ? i.removeClass("has-error") : i.addClass("has-error")) }).on("focus", ".form-control, .form-group.is-fileinput", function () { i(this) }).on("blur", ".form-control, .form-group.is-fileinput", function () { e(this) }).on("change", ".form-group input", function () { var o = t(this); if ("file" != o.attr("type")) { var i = o.closest(".form-group"), n = o.val(); n ? i.removeClass("is-empty") : i.addClass("is-empty") } }).on("change", ".form-group.is-fileinput input[type='file']", function () { var o = t(this), i = o.closest(".form-group"), n = ""; t.each(this.files, function (t, o) { n += o.name + ", " }), n = n.substring(0, n.length - 2), n ? i.removeClass("is-empty") : i.addClass("is-empty"), i.find("input.form-control[readonly]").val(n) }) }, ripples: function (o) { t(o ? o : this.options.withRipples).ripples() }, autofill: function () { var o = setInterval(function () { t("input[type!=checkbox]").each(function () { var o = t(this); o.val() && o.val() !== o.attr("value") && o.trigger("change") }) }, 100); setTimeout(function () { clearInterval(o) }, 1e4) }, attachAutofillEventHandlers: function () { var o; t(document).on("focus", "input", function () { var i = t(this).parents("form").find("input").not("[type=file]"); o = setInterval(function () { i.each(function () { var o = t(this); o.val() !== o.attr("value") && o.trigger("change") }) }, 100) }).on("blur", ".form-group input", function () { clearInterval(o) }) }, init: function (o) { this.options = t.extend({}, this.options, o); var i = t(document); t.fn.ripples && this.options.ripples && this.ripples(), this.options.input && (this.input(), this.attachInputEventHandlers()), this.options.checkbox && this.checkbox(), this.options.togglebutton && this.togglebutton(), this.options.radio && this.radio(), this.options.autofill && (this.autofill(), this.attachAutofillEventHandlers()), document.arrive && this.options.arrive && (t.fn.ripples && this.options.ripples && i.arrive(this.options.withRipples, function () { t.material.ripples(t(this)) }), this.options.input && i.arrive(this.options.inputElements, function () { t.material.input(t(this)) }), this.options.checkbox && i.arrive(this.options.checkboxElements, function () { t.material.checkbox(t(this)) }), this.options.radio && i.arrive(this.options.radioElements, function () { t.material.radio(t(this)) }), this.options.togglebutton && i.arrive(this.options.togglebuttonElements, function () { t.material.togglebutton(t(this)) })) } } }(jQuery), function (t, o, i, n) { "use strict"; function e(o, i) { r = this, this.element = t(o), this.options = t.extend({}, s, i), this._defaults = s, this._name = a, this.init() } var a = "ripples", r = null, s = {}; e.prototype.init = function () { var i = this.element; i.on("mousedown touchstart", function (n) { if (!r.isTouch() || "mousedown" !== n.type) { i.find(".ripple-container").length || i.append('<div class="ripple-container"></div>'); var e = i.children(".ripple-container"), a = r.getRelY(e, n), s = r.getRelX(e, n); if (a || s) { var l = r.getRipplesColor(i), p = t("<div></div>"); p.addClass("ripple").css({ left: s, top: a, "background-color": l }), e.append(p), function () { return o.getComputedStyle(p[0]).opacity }(), r.rippleOn(i, p), setTimeout(function () { r.rippleEnd(p) }, 500), i.on("mouseup mouseleave touchend", function () { p.data("mousedown", "off"), "off" === p.data("animating") && r.rippleOut(p) }) } } }) }, e.prototype.getNewSize = function (t, o) { return Math.max(t.outerWidth(), t.outerHeight()) / o.outerWidth() * 2.5 }, e.prototype.getRelX = function (t, o) { var i = t.offset(); return r.isTouch() ? (o = o.originalEvent, 1 === o.touches.length ? o.touches[0].pageX - i.left : !1) : o.pageX - i.left }, e.prototype.getRelY = function (t, o) { var i = t.offset(); return r.isTouch() ? (o = o.originalEvent, 1 === o.touches.length ? o.touches[0].pageY - i.top : !1) : o.pageY - i.top }, e.prototype.getRipplesColor = function (t) { var i = t.data("ripple-color") ? t.data("ripple-color") : o.getComputedStyle(t[0]).color; return i }, e.prototype.hasTransitionSupport = function () { var t = i.body || i.documentElement, o = t.style, e = o.transition !== n || o.WebkitTransition !== n || o.MozTransition !== n || o.MsTransition !== n || o.OTransition !== n; return e }, e.prototype.isTouch = function () { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) }, e.prototype.rippleEnd = function (t) { t.data("animating", "off"), "off" === t.data("mousedown") && r.rippleOut(t) }, e.prototype.rippleOut = function (t) { t.off(), r.hasTransitionSupport() ? t.addClass("ripple-out") : t.animate({ opacity: 0 }, 100, function () { t.trigger("transitionend") }), t.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () { t.remove() }) }, e.prototype.rippleOn = function (t, o) { var i = r.getNewSize(t, o); r.hasTransitionSupport() ? o.css({ "-ms-transform": "scale(" + i + ")", "-moz-transform": "scale(" + i + ")", "-webkit-transform": "scale(" + i + ")", transform: "scale(" + i + ")" }).addClass("ripple-on").data("animating", "on").data("mousedown", "on") : o.animate({ width: 2 * Math.max(t.outerWidth(), t.outerHeight()), height: 2 * Math.max(t.outerWidth(), t.outerHeight()), "margin-left": -1 * Math.max(t.outerWidth(), t.outerHeight()), "margin-top": -1 * Math.max(t.outerWidth(), t.outerHeight()), opacity: .2 }, 500, function () { o.trigger("transitionend") }) }, t.fn.ripples = function (o) { return this.each(function () { t.data(this, "plugin_" + a) || t.data(this, "plugin_" + a, new e(this, o)) }) } }(jQuery, window, document);

//! moment.js
//! version : 2.14.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function (a, b) { "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b() }(this, function () {
    "use strict"; function a() { return md.apply(null, arguments) }
    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function b(a) { md = a } function c(a) { return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a) } function d(a) { return "[object Object]" === Object.prototype.toString.call(a) } function e(a) {
        var b; for (b in a)
            // even if its not own property I'd still call it non-empty
            return !1; return !0
    } function f(a) { return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a) } function g(a, b) { var c, d = []; for (c = 0; c < a.length; ++c)d.push(b(a[c], c)); return d } function h(a, b) { return Object.prototype.hasOwnProperty.call(a, b) } function i(a, b) { for (var c in b) h(b, c) && (a[c] = b[c]); return h(b, "toString") && (a.toString = b.toString), h(b, "valueOf") && (a.valueOf = b.valueOf), a } function j(a, b, c, d) { return qb(a, b, c, d, !0).utc() } function k() {
        // We need to deep clone this object.
        return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null }
    } function l(a) { return null == a._pf && (a._pf = k()), a._pf } function m(a) { if (null == a._isValid) { var b = l(a), c = nd.call(b.parsedDateParts, function (a) { return null != a }); a._isValid = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c), a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour) } return a._isValid } function n(a) { var b = j(NaN); return null != a ? i(l(b), a) : l(b).userInvalidated = !0, b } function o(a) { return void 0 === a } function p(a, b) { var c, d, e; if (o(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), o(b._i) || (a._i = b._i), o(b._f) || (a._f = b._f), o(b._l) || (a._l = b._l), o(b._strict) || (a._strict = b._strict), o(b._tzm) || (a._tzm = b._tzm), o(b._isUTC) || (a._isUTC = b._isUTC), o(b._offset) || (a._offset = b._offset), o(b._pf) || (a._pf = l(b)), o(b._locale) || (a._locale = b._locale), od.length > 0) for (c in od) d = od[c], e = b[d], o(e) || (a[d] = e); return a }
    // Moment prototype object
    function q(b) { p(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), pd === !1 && (pd = !0, a.updateOffset(this), pd = !1) } function r(a) { return a instanceof q || null != a && null != a._isAMomentObject } function s(a) { return 0 > a ? Math.ceil(a) || 0 : Math.floor(a) } function t(a) { var b = +a, c = 0; return 0 !== b && isFinite(b) && (c = s(b)), c }
    // compare two arrays, return the number of differences
    function u(a, b, c) { var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0; for (d = 0; e > d; d++)(c && a[d] !== b[d] || !c && t(a[d]) !== t(b[d])) && g++; return g + f } function v(b) { a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b) } function w(b, c) { var d = !0; return i(function () { return null != a.deprecationHandler && a.deprecationHandler(null, b), d && (v(b + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), d = !1), c.apply(this, arguments) }, c) } function x(b, c) { null != a.deprecationHandler && a.deprecationHandler(b, c), qd[b] || (v(c), qd[b] = !0) } function y(a) { return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a) } function z(a) {
        var b, c; for (c in a) b = a[c], y(b) ? this[c] = b : this["_" + c] = b; this._config = a,
            // Lenient ordinal parsing accepts just a number in addition to
            // number + (possibly) stuff coming from _ordinalParseLenient.
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    } function A(a, b) {
        var c, e = i({}, a); for (c in b) h(b, c) && (d(a[c]) && d(b[c]) ? (e[c] = {}, i(e[c], a[c]), i(e[c], b[c])) : null != b[c] ? e[c] = b[c] : delete e[c]); for (c in a) h(a, c) && !h(b, c) && d(a[c]) && (
            // make sure changes to properties don't modify parent config
            e[c] = i({}, e[c])); return e
    } function B(a) { null != a && this.set(a) } function C(a, b, c) { var d = this._calendar[a] || this._calendar.sameElse; return y(d) ? d.call(b, c) : d } function D(a) { var b = this._longDateFormat[a], c = this._longDateFormat[a.toUpperCase()]; return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) { return a.slice(1) }), this._longDateFormat[a]) } function E() { return this._invalidDate } function F(a) { return this._ordinal.replace("%d", a) } function G(a, b, c, d) { var e = this._relativeTime[c]; return y(e) ? e(a, b, c, d) : e.replace(/%d/i, a) } function H(a, b) { var c = this._relativeTime[a > 0 ? "future" : "past"]; return y(c) ? c(b) : c.replace(/%s/i, b) } function I(a, b) { var c = a.toLowerCase(); zd[c] = zd[c + "s"] = zd[b] = a } function J(a) { return "string" == typeof a ? zd[a] || zd[a.toLowerCase()] : void 0 } function K(a) { var b, c, d = {}; for (c in a) h(a, c) && (b = J(c), b && (d[b] = a[c])); return d } function L(a, b) { Ad[a] = b } function M(a) { var b = []; for (var c in a) b.push({ unit: c, priority: Ad[c] }); return b.sort(function (a, b) { return a.priority - b.priority }), b } function N(b, c) { return function (d) { return null != d ? (P(this, b, d), a.updateOffset(this, c), this) : O(this, b) } } function O(a, b) { return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN } function P(a, b, c) { a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c) }
    // MOMENTS
    function Q(a) { return a = J(a), y(this[a]) ? this[a]() : this } function R(a, b) { if ("object" == typeof a) { a = K(a); for (var c = M(a), d = 0; d < c.length; d++)this[c[d].unit](a[c[d].unit]) } else if (a = J(a), y(this[a])) return this[a](b); return this } function S(a, b, c) { var d = "" + Math.abs(a), e = b - d.length, f = a >= 0; return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d }
    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function T(a, b, c, d) { var e = d; "string" == typeof d && (e = function () { return this[d]() }), a && (Ed[a] = e), b && (Ed[b[0]] = function () { return S(e.apply(this, arguments), b[1], b[2]) }), c && (Ed[c] = function () { return this.localeData().ordinal(e.apply(this, arguments), a) }) } function U(a) { return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "") } function V(a) { var b, c, d = a.match(Bd); for (b = 0, c = d.length; c > b; b++)Ed[d[b]] ? d[b] = Ed[d[b]] : d[b] = U(d[b]); return function (b) { var e, f = ""; for (e = 0; c > e; e++)f += d[e] instanceof Function ? d[e].call(b, a) : d[e]; return f } }
    // format date using native date object
    function W(a, b) { return a.isValid() ? (b = X(b, a.localeData()), Dd[b] = Dd[b] || V(b), Dd[b](a)) : a.localeData().invalidDate() } function X(a, b) { function c(a) { return b.longDateFormat(a) || a } var d = 5; for (Cd.lastIndex = 0; d >= 0 && Cd.test(a);)a = a.replace(Cd, c), Cd.lastIndex = 0, d -= 1; return a } function Y(a, b, c) { Wd[a] = y(b) ? b : function (a, d) { return a && c ? c : b } } function Z(a, b) { return h(Wd, a) ? Wd[a](b._strict, b._locale) : new RegExp($(a)) }
    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function $(a) { return _(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) { return b || c || d || e })) } function _(a) { return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") } function aa(a, b) { var c, d = b; for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function (a, c) { c[b] = t(a) }), c = 0; c < a.length; c++)Xd[a[c]] = d } function ba(a, b) { aa(a, function (a, c, d, e) { d._w = d._w || {}, b(a, d._w, d, e) }) } function ca(a, b, c) { null != b && h(Xd, a) && Xd[a](b, c._a, c, a) } function da(a, b) { return new Date(Date.UTC(a, b + 1, 0)).getUTCDate() } function ea(a, b) { return c(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || fe).test(b) ? "format" : "standalone"][a.month()] } function fa(a, b) { return c(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[fe.test(b) ? "format" : "standalone"][a.month()] } function ga(a, b, c) {
        var d, e, f, g = a.toLocaleLowerCase(); if (!this._monthsParse) for (
            // this is not used
            this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; 12 > d; ++d)f = j([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase(); return c ? "MMM" === b ? (e = sd.call(this._shortMonthsParse, g), -1 !== e ? e : null) : (e = sd.call(this._longMonthsParse, g), -1 !== e ? e : null) : "MMM" === b ? (e = sd.call(this._shortMonthsParse, g), -1 !== e ? e : (e = sd.call(this._longMonthsParse, g), -1 !== e ? e : null)) : (e = sd.call(this._longMonthsParse, g), -1 !== e ? e : (e = sd.call(this._shortMonthsParse, g), -1 !== e ? e : null))
    } function ha(a, b, c) {
        var d, e, f; if (this._monthsParseExact) return ga.call(this, a, b, c);
        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
            // test the regex
            if (e = j([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d; if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d; if (!c && this._monthsParse[d].test(a)) return d
        }
    }
    // MOMENTS
    function ia(a, b) {
        var c; if (!a.isValid())
            // No op
            return a; if ("string" == typeof b) if (/^\d+$/.test(b)) b = t(b); else
                // TODO: Another silent failure?
                if (b = a.localeData().monthsParse(b), "number" != typeof b) return a; return c = Math.min(a.date(), da(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a
    } function ja(b) { return null != b ? (ia(this, b), a.updateOffset(this, !0), this) : O(this, "Month") } function ka() { return da(this.year(), this.month()) } function la(a) { return this._monthsParseExact ? (h(this, "_monthsRegex") || na.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = ie), this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex) } function ma(a) { return this._monthsParseExact ? (h(this, "_monthsRegex") || na.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : (h(this, "_monthsRegex") || (this._monthsRegex = je), this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex) } function na() {
        function a(a, b) { return b.length - a.length } var b, c, d = [], e = [], f = []; for (b = 0; 12 > b; b++)c = j([2e3, b]), d.push(this.monthsShort(c, "")), e.push(this.months(c, "")), f.push(this.months(c, "")), f.push(this.monthsShort(c, "")); for (
            // Sorting makes sure if one month (or abbr) is a prefix of another it
            // will match the longer piece.
            d.sort(a), e.sort(a), f.sort(a), b = 0; 12 > b; b++)d[b] = _(d[b]), e[b] = _(e[b]); for (b = 0; 24 > b; b++)f[b] = _(f[b]); this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i")
    }
    // HELPERS
    function oa(a) { return pa(a) ? 366 : 365 } function pa(a) { return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0 } function qa() { return pa(this.year()) } function ra(a, b, c, d, e, f, g) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var h = new Date(a, b, c, d, e, f, g);
        //the date constructor remaps years 0-99 to 1900-1999
        return 100 > a && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h
    } function sa(a) {
        var b = new Date(Date.UTC.apply(null, arguments));
        //the Date.UTC function remaps years 0-99 to 1900-1999
        return 100 > a && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b
    }
    // start-of-first-week - start-of-year
    function ta(a, b, c) {
        var// first-week day -- which january is always in the first week (4 for iso, 1 for other)
        d = 7 + b - c,
        // first-week day local weekday -- which local weekday is fwd
        e = (7 + sa(a, 0, d).getUTCDay() - b) % 7; return -e + d - 1
    }
    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function ua(a, b, c, d, e) { var f, g, h = (7 + c - d) % 7, i = ta(a, d, e), j = 1 + 7 * (b - 1) + h + i; return 0 >= j ? (f = a - 1, g = oa(f) + j) : j > oa(a) ? (f = a + 1, g = j - oa(a)) : (f = a, g = j), { year: f, dayOfYear: g } } function va(a, b, c) { var d, e, f = ta(a.year(), b, c), g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1; return 1 > g ? (e = a.year() - 1, d = g + wa(e, b, c)) : g > wa(a.year(), b, c) ? (d = g - wa(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), { week: d, year: e } } function wa(a, b, c) { var d = ta(a, b, c), e = ta(a + 1, b, c); return (oa(a) - d + e) / 7 }
    // HELPERS
    // LOCALES
    function xa(a) { return va(a, this._week.dow, this._week.doy).week } function ya() { return this._week.dow } function za() { return this._week.doy }
    // MOMENTS
    function Aa(a) { var b = this.localeData().week(this); return null == a ? b : this.add(7 * (a - b), "d") } function Ba(a) { var b = va(this, 1, 4).week; return null == a ? b : this.add(7 * (a - b), "d") }
    // HELPERS
    function Ca(a, b) { return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10) } function Da(a, b) { return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a } function Ea(a, b) { return c(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()] } function Fa(a) { return this._weekdaysShort[a.day()] } function Ga(a) { return this._weekdaysMin[a.day()] } function Ha(a, b, c) { var d, e, f, g = a.toLocaleLowerCase(); if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; 7 > d; ++d)f = j([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase(); return c ? "dddd" === b ? (e = sd.call(this._weekdaysParse, g), -1 !== e ? e : null) : "ddd" === b ? (e = sd.call(this._shortWeekdaysParse, g), -1 !== e ? e : null) : (e = sd.call(this._minWeekdaysParse, g), -1 !== e ? e : null) : "dddd" === b ? (e = sd.call(this._weekdaysParse, g), -1 !== e ? e : (e = sd.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = sd.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : "ddd" === b ? (e = sd.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = sd.call(this._weekdaysParse, g), -1 !== e ? e : (e = sd.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : (e = sd.call(this._minWeekdaysParse, g), -1 !== e ? e : (e = sd.call(this._weekdaysParse, g), -1 !== e ? e : (e = sd.call(this._shortWeekdaysParse, g), -1 !== e ? e : null))) } function Ia(a, b, c) {
        var d, e, f; if (this._weekdaysParseExact) return Ha.call(this, a, b, c); for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; 7 > d; d++) {
            // test the regex
            if (e = j([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d; if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d; if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d; if (!c && this._weekdaysParse[d].test(a)) return d
        }
    }
    // MOMENTS
    function Ja(a) { if (!this.isValid()) return null != a ? this : NaN; var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay(); return null != a ? (a = Ca(a, this.localeData()), this.add(a - b, "d")) : b } function Ka(a) { if (!this.isValid()) return null != a ? this : NaN; var b = (this.day() + 7 - this.localeData()._week.dow) % 7; return null == a ? b : this.add(a - b, "d") } function La(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        if (null != a) { var b = Da(a, this.localeData()); return this.day(this.day() % 7 ? b : b - 7) } return this.day() || 7
    } function Ma(a) { return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Pa.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = pe), this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex) } function Na(a) { return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Pa.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = qe), this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) } function Oa(a) { return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Pa.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = re), this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) } function Pa() {
        function a(a, b) { return b.length - a.length } var b, c, d, e, f, g = [], h = [], i = [], k = []; for (b = 0; 7 > b; b++)c = j([2e3, 1]).day(b), d = this.weekdaysMin(c, ""), e = this.weekdaysShort(c, ""), f = this.weekdays(c, ""), g.push(d), h.push(e), i.push(f), k.push(d), k.push(e), k.push(f); for (
            // Sorting makes sure if one weekday (or abbr) is a prefix of another it
            // will match the longer piece.
            g.sort(a), h.sort(a), i.sort(a), k.sort(a), b = 0; 7 > b; b++)h[b] = _(h[b]), i[b] = _(i[b]), k[b] = _(k[b]); this._weekdaysRegex = new RegExp("^(" + k.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")", "i")
    }
    // FORMATTING
    function Qa() { return this.hours() % 12 || 12 } function Ra() { return this.hours() || 24 } function Sa(a, b) { T(a, 0, 0, function () { return this.localeData().meridiem(this.hours(), this.minutes(), b) }) }
    // PARSING
    function Ta(a, b) { return b._meridiemParse }
    // LOCALES
    function Ua(a) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return "p" === (a + "").toLowerCase().charAt(0)
    } function Va(a, b, c) { return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM" } function Wa(a) { return a ? a.toLowerCase().replace("_", "-") : a }
    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function Xa(a) {
        for (var b, c, d, e, f = 0; f < a.length;) {
            for (e = Wa(a[f]).split("-"), b = e.length, c = Wa(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                if (d = Ya(e.slice(0, b).join("-"))) return d; if (c && c.length >= b && u(e, c, !0) >= b - 1)
                    //the next array item is better than a shallower substring of this one
                    break; b--
            } f++
        } return null
    } function Ya(a) {
        var b = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!we[a] && "undefined" != typeof module && module && module.exports) try {
        b = se._abbr, require("./locale/" + a),
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            Za(b)
        } catch (c) { } return we[a]
    }
    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function Za(a, b) {
        var c;
        // moment.duration._locale = moment._locale = data;
        return a && (c = o(b) ? ab(a) : $a(a, b), c && (se = c)), se._abbr
    } function $a(a, b) {
        if (null !== b) {
            var c = ve;
            // treat as if there is no base config
            // backwards compat for now: also set the locale
            return b.abbr = a, null != we[a] ? (x("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = we[a]._config) : null != b.parentLocale && (null != we[b.parentLocale] ? c = we[b.parentLocale]._config : x("parentLocaleUndefined", "specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/")), we[a] = new B(A(c, b)), Za(a), we[a]
        }
        // useful for testing
        return delete we[a], null
    } function _a(a, b) {
        if (null != b) {
            var c, d = ve;
            // MERGE
            null != we[a] && (d = we[a]._config), b = A(d, b), c = new B(b), c.parentLocale = we[a], we[a] = c,
                // backwards compat for now: also set the locale
                Za(a)
        } else
            // pass null for config to unupdate, useful for tests
            null != we[a] && (null != we[a].parentLocale ? we[a] = we[a].parentLocale : null != we[a] && delete we[a]); return we[a]
    }
    // returns locale data
    function ab(a) { var b; if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return se; if (!c(a)) { if (b = Ya(a)) return b; a = [a] } return Xa(a) } function bb() { return rd(we) } function cb(a) { var b, c = a._a; return c && -2 === l(a).overflow && (b = c[Zd] < 0 || c[Zd] > 11 ? Zd : c[$d] < 1 || c[$d] > da(c[Yd], c[Zd]) ? $d : c[_d] < 0 || c[_d] > 24 || 24 === c[_d] && (0 !== c[ae] || 0 !== c[be] || 0 !== c[ce]) ? _d : c[ae] < 0 || c[ae] > 59 ? ae : c[be] < 0 || c[be] > 59 ? be : c[ce] < 0 || c[ce] > 999 ? ce : -1, l(a)._overflowDayOfYear && (Yd > b || b > $d) && (b = $d), l(a)._overflowWeeks && -1 === b && (b = de), l(a)._overflowWeekday && -1 === b && (b = ee), l(a).overflow = b), a }
    // date from iso format
    function db(a) {
        var b, c, d, e, f, g, h = a._i, i = xe.exec(h) || ye.exec(h); if (i) {
            for (l(a).iso = !0, b = 0, c = Ae.length; c > b; b++)if (Ae[b][1].exec(i[1])) { e = Ae[b][0], d = Ae[b][2] !== !1; break } if (null == e) return void (a._isValid = !1); if (i[3]) {
                for (b = 0, c = Be.length; c > b; b++)if (Be[b][1].exec(i[3])) {
                    // match[2] should be 'T' or space
                    f = (i[2] || " ") + Be[b][0]; break
                } if (null == f) return void (a._isValid = !1)
            } if (!d && null != f) return void (a._isValid = !1); if (i[4]) { if (!ze.exec(i[4])) return void (a._isValid = !1); g = "Z" } a._f = e + (f || "") + (g || ""), jb(a)
        } else a._isValid = !1
    }
    // date from iso format or fallback
    function eb(b) { var c = Ce.exec(b._i); return null !== c ? void (b._d = new Date(+c[1])) : (db(b), void (b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b)))) }
    // Pick the first defined of two or three arguments.
    function fb(a, b, c) { return null != a ? a : null != b ? b : c } function gb(b) {
        // hooks is actually the exported moment object
        var c = new Date(a.now()); return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()]
    }
    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function hb(a) {
        var b, c, d, e, f = []; if (!a._d) {
            // Default to current date.
            // * if no year, month, day of month are given, default to today
            // * if day of month is given, default month and year
            // * if month is given, default only year
            // * if year is given, don't default anything
            for (d = gb(a), a._w && null == a._a[$d] && null == a._a[Zd] && ib(a), a._dayOfYear && (e = fb(a._a[Yd], d[Yd]), a._dayOfYear > oa(e) && (l(a)._overflowDayOfYear = !0), c = sa(e, 0, a._dayOfYear), a._a[Zd] = c.getUTCMonth(), a._a[$d] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b)a._a[b] = f[b] = d[b];
            // Zero out whatever was not defaulted, including time
            for (; 7 > b; b++)a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
            // Check for 24:00:00.000
            24 === a._a[_d] && 0 === a._a[ae] && 0 === a._a[be] && 0 === a._a[ce] && (a._nextDay = !0, a._a[_d] = 0), a._d = (a._useUTC ? sa : ra).apply(null, f),
                // Apply timezone offset from input. The actual utcOffset can be changed
                // with parseZone.
                null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[_d] = 24)
        }
    } function ib(a) { var b, c, d, e, f, g, h, i; b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = fb(b.GG, a._a[Yd], va(rb(), 1, 4).year), d = fb(b.W, 1), e = fb(b.E, 1), (1 > e || e > 7) && (i = !0)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = fb(b.gg, a._a[Yd], va(rb(), f, g).year), d = fb(b.w, 1), null != b.d ? (e = b.d, (0 > e || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f), 1 > d || d > wa(c, f, g) ? l(a)._overflowWeeks = !0 : null != i ? l(a)._overflowWeekday = !0 : (h = ua(c, d, e, f, g), a._a[Yd] = h.year, a._dayOfYear = h.dayOfYear) }
    // date from string and format string
    function jb(b) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (b._f === a.ISO_8601) return void db(b); b._a = [], l(b).empty = !0;
        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var c, d, e, f, g, h = "" + b._i, i = h.length, j = 0; for (e = X(b._f, b._locale).match(Bd) || [], c = 0; c < e.length; c++)f = e[c], d = (h.match(Z(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && l(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), Ed[f] ? (d ? l(b).empty = !1 : l(b).unusedTokens.push(f), ca(f, d, b)) : b._strict && !d && l(b).unusedTokens.push(f);
        // add remaining unparsed input length to the string
        l(b).charsLeftOver = i - j, h.length > 0 && l(b).unusedInput.push(h),
            // clear _12h flag if hour is <= 12
            b._a[_d] <= 12 && l(b).bigHour === !0 && b._a[_d] > 0 && (l(b).bigHour = void 0), l(b).parsedDateParts = b._a.slice(0), l(b).meridiem = b._meridiem,
            // handle meridiem
            b._a[_d] = kb(b._locale, b._a[_d], b._meridiem), hb(b), cb(b)
    } function kb(a, b, c) {
        var d;
        // Fallback
        return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b
    }
    // date from string and array of format strings
    function lb(a) { var b, c, d, e, f; if (0 === a._f.length) return l(a).invalidFormat = !0, void (a._d = new Date(NaN)); for (e = 0; e < a._f.length; e++)f = 0, b = p({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], jb(b), m(b) && (f += l(b).charsLeftOver, f += 10 * l(b).unusedTokens.length, l(b).score = f, (null == d || d > f) && (d = f, c = b)); i(a, c || b) } function mb(a) { if (!a._d) { var b = K(a._i); a._a = g([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) { return a && parseInt(a, 10) }), hb(a) } } function nb(a) {
        var b = new q(cb(ob(a)));
        // Adding is smart enough around DST
        return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b
    } function ob(a) { var b = a._i, d = a._f; return a._locale = a._locale || ab(a._l), null === b || void 0 === d && "" === b ? n({ nullInput: !0 }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), r(b) ? new q(cb(b)) : (c(d) ? lb(a) : f(b) ? a._d = b : d ? jb(a) : pb(a), m(a) || (a._d = null), a)) } function pb(b) {
        var d = b._i; void 0 === d ? b._d = new Date(a.now()) : f(d) ? b._d = new Date(d.valueOf()) : "string" == typeof d ? eb(b) : c(d) ? (b._a = g(d.slice(0), function (a) { return parseInt(a, 10) }), hb(b)) : "object" == typeof d ? mb(b) : "number" == typeof d ?
            // from milliseconds
            b._d = new Date(d) : a.createFromInputFallback(b)
    } function qb(a, b, f, g, h) {
        var i = {};
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        return "boolean" == typeof f && (g = f, f = void 0), (d(a) && e(a) || c(a) && 0 === a.length) && (a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = h, i._l = f, i._i = a, i._f = b, i._strict = g, nb(i)
    } function rb(a, b, c, d) { return qb(a, b, c, d, !1) }
    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function sb(a, b) { var d, e; if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return rb(); for (d = b[0], e = 1; e < b.length; ++e)b[e].isValid() && !b[e][a](d) || (d = b[e]); return d }
    // TODO: Use [].sort instead?
    function tb() { var a = [].slice.call(arguments, 0); return sb("isBefore", a) } function ub() { var a = [].slice.call(arguments, 0); return sb("isAfter", a) } function vb(a) {
        var b = K(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0, h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0;
        // representation for dateAddRemove
        this._milliseconds = +k + 1e3 * j +// 1000
            6e4 * i +// 1000 * 60
            1e3 * h * 60 * 60,//using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
            // Because of dateAddRemove treats 24 hours as different from a
            // day when working around DST, we need to store them separately
            this._days = +g + 7 * f,
            // It is impossible translate months into days without knowing
            // which months you are are talking about, so we have to store
            // it separately.
            this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = ab(), this._bubble()
    } function wb(a) { return a instanceof vb }
    // FORMATTING
    function xb(a, b) { T(a, 0, 0, function () { var a = this.utcOffset(), c = "+"; return 0 > a && (a = -a, c = "-"), c + S(~~(a / 60), 2) + b + S(~~a % 60, 2) }) } function yb(a, b) { var c = (b || "").match(a) || [], d = c[c.length - 1] || [], e = (d + "").match(Ge) || ["-", 0, 0], f = +(60 * e[1]) + t(e[2]); return "+" === e[0] ? f : -f }
    // Return a moment from input, that is local/utc/zone equivalent to model.
    function zb(b, c) {
        var d, e;
        // Use low-level api, because this fn is low-level api.
        return c._isUTC ? (d = c.clone(), e = (r(b) || f(b) ? b.valueOf() : rb(b).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), a.updateOffset(d, !1), d) : rb(b).local()
    } function Ab(a) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
    }
    // MOMENTS
    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function Bb(b, c) { var d, e = this._offset || 0; return this.isValid() ? null != b ? ("string" == typeof b ? b = yb(Td, b) : Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Ab(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), e !== b && (!c || this._changeInProgress ? Sb(this, Mb(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ab(this) : null != b ? this : NaN } function Cb(a, b) { return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset() } function Db(a) { return this.utcOffset(0, a) } function Eb(a) { return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ab(this), "m")), this } function Fb() { return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(yb(Sd, this._i)), this } function Gb(a) { return this.isValid() ? (a = a ? rb(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0) : !1 } function Hb() { return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset() } function Ib() { if (!o(this._isDSTShifted)) return this._isDSTShifted; var a = {}; if (p(a, this), a = ob(a), a._a) { var b = a._isUTC ? j(a._a) : rb(a._a); this._isDSTShifted = this.isValid() && u(a._a, b.toArray()) > 0 } else this._isDSTShifted = !1; return this._isDSTShifted } function Jb() { return this.isValid() ? !this._isUTC : !1 } function Kb() { return this.isValid() ? this._isUTC : !1 } function Lb() { return this.isValid() ? this._isUTC && 0 === this._offset : !1 } function Mb(a, b) {
        var c, d, e, f = a,
        // matching against regexp is expensive, do it on demand
        g = null;// checks for null or undefined
        return wb(a) ? f = { ms: a._milliseconds, d: a._days, M: a._months } : "number" == typeof a ? (f = {}, b ? f[b] = a : f.milliseconds = a) : (g = He.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = { y: 0, d: t(g[$d]) * c, h: t(g[_d]) * c, m: t(g[ae]) * c, s: t(g[be]) * c, ms: t(g[ce]) * c }) : (g = Ie.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = { y: Nb(g[2], c), M: Nb(g[3], c), w: Nb(g[4], c), d: Nb(g[5], c), h: Nb(g[6], c), m: Nb(g[7], c), s: Nb(g[8], c) }) : null == f ? f = {} : "object" == typeof f && ("from" in f || "to" in f) && (e = Pb(rb(f.from), rb(f.to)), f = {}, f.ms = e.milliseconds, f.M = e.months), d = new vb(f), wb(a) && h(a, "_locale") && (d._locale = a._locale), d
    } function Nb(a, b) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var c = a && parseFloat(a.replace(",", "."));
        // apply sign while we're at it
        return (isNaN(c) ? 0 : c) * b
    } function Ob(a, b) { var c = { milliseconds: 0, months: 0 }; return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c } function Pb(a, b) { var c; return a.isValid() && b.isValid() ? (b = zb(b, a), a.isBefore(b) ? c = Ob(a, b) : (c = Ob(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : { milliseconds: 0, months: 0 } } function Qb(a) { return 0 > a ? -1 * Math.round(-1 * a) : Math.round(a) }
    // TODO: remove 'name' arg after deprecation is removed
    function Rb(a, b) {
        return function (c, d) {
            var e, f;
            //invert the arguments, but complain about it
            return null === d || isNaN(+d) || (x(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Mb(c, d), Sb(this, e, a), this
        }
    } function Sb(b, c, d, e) { var f = c._milliseconds, g = Qb(c._days), h = Qb(c._months); b.isValid() && (e = null == e ? !0 : e, f && b._d.setTime(b._d.valueOf() + f * d), g && P(b, "Date", O(b, "Date") + g * d), h && ia(b, O(b, "Month") + h * d), e && a.updateOffset(b, g || h)) } function Tb(a, b) { var c = a.diff(b, "days", !0); return -6 > c ? "sameElse" : -1 > c ? "lastWeek" : 0 > c ? "lastDay" : 1 > c ? "sameDay" : 2 > c ? "nextDay" : 7 > c ? "nextWeek" : "sameElse" } function Ub(b, c) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var d = b || rb(), e = zb(d, this).startOf("day"), f = a.calendarFormat(this, e) || "sameElse", g = c && (y(c[f]) ? c[f].call(this, d) : c[f]); return this.format(g || this.localeData().calendar(f, this, rb(d)))
    } function Vb() { return new q(this) } function Wb(a, b) { var c = r(a) ? a : rb(a); return this.isValid() && c.isValid() ? (b = J(o(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf()) : !1 } function Xb(a, b) { var c = r(a) ? a : rb(a); return this.isValid() && c.isValid() ? (b = J(o(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf()) : !1 } function Yb(a, b, c, d) { return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c)) } function Zb(a, b) { var c, d = r(a) ? a : rb(a); return this.isValid() && d.isValid() ? (b = J(b || "millisecond"), "millisecond" === b ? this.valueOf() === d.valueOf() : (c = d.valueOf(), this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf())) : !1 } function $b(a, b) { return this.isSame(a, b) || this.isAfter(a, b) } function _b(a, b) { return this.isSame(a, b) || this.isBefore(a, b) } function ac(a, b, c) {
        var d, e, f, g;// 1000
        // 1000 * 60
        // 1000 * 60 * 60
        // 1000 * 60 * 60 * 24, negate dst
        // 1000 * 60 * 60 * 24 * 7, negate dst
        return this.isValid() ? (d = zb(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = J(b), "year" === b || "month" === b || "quarter" === b ? (g = bc(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : s(g)) : NaN) : NaN
    } function bc(a, b) {
        // difference in months
        var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            f = a.clone().add(e, "months");
        //check for negative zero, return zero if negative zero
        // linear across the month
        // linear across the month
        return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d) || 0
    } function cc() { return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ") } function dc() { var a = this.clone().utc(); return 0 < a.year() && a.year() <= 9999 ? y(Date.prototype.toISOString) ? this.toDate().toISOString() : W(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : W(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") } function ec(b) { b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat); var c = W(this, b); return this.localeData().postformat(c) } function fc(a, b) { return this.isValid() && (r(a) && a.isValid() || rb(a).isValid()) ? Mb({ to: this, from: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate() } function gc(a) { return this.from(rb(), a) } function hc(a, b) { return this.isValid() && (r(a) && a.isValid() || rb(a).isValid()) ? Mb({ from: this, to: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate() } function ic(a) { return this.to(rb(), a) }
    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function jc(a) { var b; return void 0 === a ? this._locale._abbr : (b = ab(a), null != b && (this._locale = b), this) } function kc() { return this._locale } function lc(a) {
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (a = J(a)) {
            case "year": this.month(0);/* falls through */
            case "quarter": case "month": this.date(1);/* falls through */
            case "week": case "isoWeek": case "day": case "date": this.hours(0);/* falls through */
            case "hour": this.minutes(0);/* falls through */
            case "minute": this.seconds(0);/* falls through */
            case "second": this.milliseconds(0)
        }
        // weeks are a special case
        // quarters are also special
        return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
    } function mc(a) {
        // 'date' is an alias for 'day', so it should be considered as such.
        return a = J(a), void 0 === a || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"))
    } function nc() { return this._d.valueOf() - 6e4 * (this._offset || 0) } function oc() { return Math.floor(this.valueOf() / 1e3) } function pc() { return new Date(this.valueOf()) } function qc() { var a = this; return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()] } function rc() { var a = this; return { years: a.year(), months: a.month(), date: a.date(), hours: a.hours(), minutes: a.minutes(), seconds: a.seconds(), milliseconds: a.milliseconds() } } function sc() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null
    } function tc() { return m(this) } function uc() { return i({}, l(this)) } function vc() { return l(this).overflow } function wc() { return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict } } function xc(a, b) { T(0, [a, a.length], 0, b) }
    // MOMENTS
    function yc(a) { return Cc.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy) } function zc(a) { return Cc.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4) } function Ac() { return wa(this.year(), 1, 4) } function Bc() { var a = this.localeData()._week; return wa(this.year(), a.dow, a.doy) } function Cc(a, b, c, d, e) { var f; return null == a ? va(this, d, e).year : (f = wa(a, d, e), b > f && (b = f), Dc.call(this, a, b, c, d, e)) } function Dc(a, b, c, d, e) { var f = ua(a, b, c, d, e), g = sa(f.year, 0, f.dayOfYear); return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this }
    // MOMENTS
    function Ec(a) { return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3) }
    // HELPERS
    // MOMENTS
    function Fc(a) { var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1; return null == a ? b : this.add(a - b, "d") } function Gc(a, b) { b[ce] = t(1e3 * ("0." + a)) }
    // MOMENTS
    function Hc() { return this._isUTC ? "UTC" : "" } function Ic() { return this._isUTC ? "Coordinated Universal Time" : "" } function Jc(a) { return rb(1e3 * a) } function Kc() { return rb.apply(null, arguments).parseZone() } function Lc(a) { return a } function Mc(a, b, c, d) { var e = ab(), f = j().set(d, b); return e[c](f, a) } function Nc(a, b, c) { if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return Mc(a, b, c, "month"); var d, e = []; for (d = 0; 12 > d; d++)e[d] = Mc(a, d, c, "month"); return e }
    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function Oc(a, b, c, d) { "boolean" == typeof a ? ("number" == typeof b && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, "number" == typeof b && (c = b, b = void 0), b = b || ""); var e = ab(), f = a ? e._week.dow : 0; if (null != c) return Mc(b, (c + f) % 7, d, "day"); var g, h = []; for (g = 0; 7 > g; g++)h[g] = Mc(b, (g + f) % 7, d, "day"); return h } function Pc(a, b) { return Nc(a, b, "months") } function Qc(a, b) { return Nc(a, b, "monthsShort") } function Rc(a, b, c) { return Oc(a, b, c, "weekdays") } function Sc(a, b, c) { return Oc(a, b, c, "weekdaysShort") } function Tc(a, b, c) { return Oc(a, b, c, "weekdaysMin") } function Uc() { var a = this._data; return this._milliseconds = Ue(this._milliseconds), this._days = Ue(this._days), this._months = Ue(this._months), a.milliseconds = Ue(a.milliseconds), a.seconds = Ue(a.seconds), a.minutes = Ue(a.minutes), a.hours = Ue(a.hours), a.months = Ue(a.months), a.years = Ue(a.years), this } function Vc(a, b, c, d) { var e = Mb(b, c); return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble() }
    // supports only 2.0-style add(1, 's') or add(duration)
    function Wc(a, b) { return Vc(this, a, b, 1) }
    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function Xc(a, b) { return Vc(this, a, b, -1) } function Yc(a) { return 0 > a ? Math.floor(a) : Math.ceil(a) } function Zc() {
        var a, b, c, d, e, f = this._milliseconds, g = this._days, h = this._months, i = this._data;
        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        // The following code bubbles up values, see the tests for
        // examples of what that means.
        // convert days to months
        // 12 months -> 1 year
        return f >= 0 && g >= 0 && h >= 0 || 0 >= f && 0 >= g && 0 >= h || (f += 864e5 * Yc(_c(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = s(f / 1e3), i.seconds = a % 60, b = s(a / 60), i.minutes = b % 60, c = s(b / 60), i.hours = c % 24, g += s(c / 24), e = s($c(g)), h += e, g -= Yc(_c(e)), d = s(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this
    } function $c(a) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return 4800 * a / 146097
    } function _c(a) {
        // the reverse of daysToMonths
        return 146097 * a / 4800
    } function ad(a) {
        var b, c, d = this._milliseconds; if (a = J(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + $c(b), "month" === a ? c : c / 12; switch (b = this._days + Math.round(_c(this._months)), a) {
            case "week": return b / 7 + d / 6048e5; case "day": return b + d / 864e5; case "hour": return 24 * b + d / 36e5; case "minute": return 1440 * b + d / 6e4; case "second": return 86400 * b + d / 1e3;
            // Math.floor prevents floating point math errors here
            case "millisecond": return Math.floor(864e5 * b) + d; default: throw new Error("Unknown unit " + a)
        }
    }
    // TODO: Use this.as('ms')?
    function bd() { return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * t(this._months / 12) } function cd(a) { return function () { return this.as(a) } } function dd(a) { return a = J(a), this[a + "s"]() } function ed(a) { return function () { return this._data[a] } } function fd() { return s(this.days() / 7) }
    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function gd(a, b, c, d, e) { return e.relativeTime(b || 1, !!c, a, d) } function hd(a, b, c) { var d = Mb(a).abs(), e = jf(d.as("s")), f = jf(d.as("m")), g = jf(d.as("h")), h = jf(d.as("d")), i = jf(d.as("M")), j = jf(d.as("y")), k = e < kf.s && ["s", e] || 1 >= f && ["m"] || f < kf.m && ["mm", f] || 1 >= g && ["h"] || g < kf.h && ["hh", g] || 1 >= h && ["d"] || h < kf.d && ["dd", h] || 1 >= i && ["M"] || i < kf.M && ["MM", i] || 1 >= j && ["y"] || ["yy", j]; return k[2] = b, k[3] = +a > 0, k[4] = c, gd.apply(null, k) }
    // This function allows you to set the rounding function for relative time strings
    function id(a) { return void 0 === a ? jf : "function" == typeof a ? (jf = a, !0) : !1 }
    // This function allows you to set a threshold for relative time strings
    function jd(a, b) { return void 0 === kf[a] ? !1 : void 0 === b ? kf[a] : (kf[a] = b, !0) } function kd(a) { var b = this.localeData(), c = hd(this, !a, b); return a && (c = b.pastFuture(+this, c)), b.postformat(c) } function ld() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var a, b, c, d = lf(this._milliseconds) / 1e3, e = lf(this._days), f = lf(this._months); a = s(d / 60), b = s(a / 60), d %= 60, a %= 60, c = s(f / 12), f %= 12;
        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var g = c, h = f, i = e, j = b, k = a, l = d, m = this.asSeconds(); return m ? (0 > m ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D"
    } var md, nd; nd = Array.prototype.some ? Array.prototype.some : function (a) { for (var b = Object(this), c = b.length >>> 0, d = 0; c > d; d++)if (d in b && a.call(this, b[d], d, b)) return !0; return !1 };
    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var od = a.momentProperties = [], pd = !1, qd = {}; a.suppressDeprecationWarnings = !1, a.deprecationHandler = null; var rd; rd = Object.keys ? Object.keys : function (a) { var b, c = []; for (b in a) h(a, b) && c.push(b); return c }; var sd, td = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, ud = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, vd = "Invalid date", wd = "%d", xd = /\d{1,2}/, yd = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, zd = {}, Ad = {}, Bd = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Cd = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Dd = {}, Ed = {}, Fd = /\d/, Gd = /\d\d/, Hd = /\d{3}/, Id = /\d{4}/, Jd = /[+-]?\d{6}/, Kd = /\d\d?/, Ld = /\d\d\d\d?/, Md = /\d\d\d\d\d\d?/, Nd = /\d{1,3}/, Od = /\d{1,4}/, Pd = /[+-]?\d{1,6}/, Qd = /\d+/, Rd = /[+-]?\d+/, Sd = /Z|[+-]\d\d:?\d\d/gi, Td = /Z|[+-]\d\d(?::?\d\d)?/gi, Ud = /[+-]?\d+(\.\d{1,3})?/, Vd = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Wd = {}, Xd = {}, Yd = 0, Zd = 1, $d = 2, _d = 3, ae = 4, be = 5, ce = 6, de = 7, ee = 8; sd = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) {
        // I know
        var b; for (b = 0; b < this.length; ++b)if (this[b] === a) return b; return -1
    }, T("M", ["MM", 2], "Mo", function () { return this.month() + 1 }), T("MMM", 0, 0, function (a) { return this.localeData().monthsShort(this, a) }), T("MMMM", 0, 0, function (a) { return this.localeData().months(this, a) }), I("month", "M"), L("month", 8), Y("M", Kd), Y("MM", Kd, Gd), Y("MMM", function (a, b) { return b.monthsShortRegex(a) }), Y("MMMM", function (a, b) { return b.monthsRegex(a) }), aa(["M", "MM"], function (a, b) { b[Zd] = t(a) - 1 }), aa(["MMM", "MMMM"], function (a, b, c, d) { var e = c._locale.monthsParse(a, d, c._strict); null != e ? b[Zd] = e : l(c).invalidMonth = a });
    // LOCALES
    var fe = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/, ge = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), he = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), ie = Vd, je = Vd;
    // FORMATTING
    T("Y", 0, 0, function () { var a = this.year(); return 9999 >= a ? "" + a : "+" + a }), T(0, ["YY", 2], 0, function () { return this.year() % 100 }), T(0, ["YYYY", 4], 0, "year"), T(0, ["YYYYY", 5], 0, "year"), T(0, ["YYYYYY", 6, !0], 0, "year"),
        // ALIASES
        I("year", "y"),
        // PRIORITIES
        L("year", 1),
        // PARSING
        Y("Y", Rd), Y("YY", Kd, Gd), Y("YYYY", Od, Id), Y("YYYYY", Pd, Jd), Y("YYYYYY", Pd, Jd), aa(["YYYYY", "YYYYYY"], Yd), aa("YYYY", function (b, c) { c[Yd] = 2 === b.length ? a.parseTwoDigitYear(b) : t(b) }), aa("YY", function (b, c) { c[Yd] = a.parseTwoDigitYear(b) }), aa("Y", function (a, b) { b[Yd] = parseInt(a, 10) }),
        // HOOKS
        a.parseTwoDigitYear = function (a) { return t(a) + (t(a) > 68 ? 1900 : 2e3) };
    // MOMENTS
    var ke = N("FullYear", !0);
    // FORMATTING
    T("w", ["ww", 2], "wo", "week"), T("W", ["WW", 2], "Wo", "isoWeek"),
        // ALIASES
        I("week", "w"), I("isoWeek", "W"),
        // PRIORITIES
        L("week", 5), L("isoWeek", 5),
        // PARSING
        Y("w", Kd), Y("ww", Kd, Gd), Y("W", Kd), Y("WW", Kd, Gd), ba(["w", "ww", "W", "WW"], function (a, b, c, d) { b[d.substr(0, 1)] = t(a) }); var le = {
            dow: 0,// Sunday is the first day of the week.
            doy: 6
        };
    // FORMATTING
    T("d", 0, "do", "day"), T("dd", 0, 0, function (a) { return this.localeData().weekdaysMin(this, a) }), T("ddd", 0, 0, function (a) { return this.localeData().weekdaysShort(this, a) }), T("dddd", 0, 0, function (a) { return this.localeData().weekdays(this, a) }), T("e", 0, 0, "weekday"), T("E", 0, 0, "isoWeekday"),
        // ALIASES
        I("day", "d"), I("weekday", "e"), I("isoWeekday", "E"),
        // PRIORITY
        L("day", 11), L("weekday", 11), L("isoWeekday", 11),
        // PARSING
        Y("d", Kd), Y("e", Kd), Y("E", Kd), Y("dd", function (a, b) { return b.weekdaysMinRegex(a) }), Y("ddd", function (a, b) { return b.weekdaysShortRegex(a) }), Y("dddd", function (a, b) { return b.weekdaysRegex(a) }), ba(["dd", "ddd", "dddd"], function (a, b, c, d) {
            var e = c._locale.weekdaysParse(a, d, c._strict);
            // if we didn't get a weekday name, mark the date as invalid
            null != e ? b.d = e : l(c).invalidWeekday = a
        }), ba(["d", "e", "E"], function (a, b, c, d) { b[d] = t(a) });
    // LOCALES
    var me = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), ne = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), oe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), pe = Vd, qe = Vd, re = Vd; T("H", ["HH", 2], 0, "hour"), T("h", ["hh", 2], 0, Qa), T("k", ["kk", 2], 0, Ra), T("hmm", 0, 0, function () { return "" + Qa.apply(this) + S(this.minutes(), 2) }), T("hmmss", 0, 0, function () { return "" + Qa.apply(this) + S(this.minutes(), 2) + S(this.seconds(), 2) }), T("Hmm", 0, 0, function () { return "" + this.hours() + S(this.minutes(), 2) }), T("Hmmss", 0, 0, function () { return "" + this.hours() + S(this.minutes(), 2) + S(this.seconds(), 2) }), Sa("a", !0), Sa("A", !1),
        // ALIASES
        I("hour", "h"),
        // PRIORITY
        L("hour", 13), Y("a", Ta), Y("A", Ta), Y("H", Kd), Y("h", Kd), Y("HH", Kd, Gd), Y("hh", Kd, Gd), Y("hmm", Ld), Y("hmmss", Md), Y("Hmm", Ld), Y("Hmmss", Md), aa(["H", "HH"], _d), aa(["a", "A"], function (a, b, c) { c._isPm = c._locale.isPM(a), c._meridiem = a }), aa(["h", "hh"], function (a, b, c) { b[_d] = t(a), l(c).bigHour = !0 }), aa("hmm", function (a, b, c) { var d = a.length - 2; b[_d] = t(a.substr(0, d)), b[ae] = t(a.substr(d)), l(c).bigHour = !0 }), aa("hmmss", function (a, b, c) { var d = a.length - 4, e = a.length - 2; b[_d] = t(a.substr(0, d)), b[ae] = t(a.substr(d, 2)), b[be] = t(a.substr(e)), l(c).bigHour = !0 }), aa("Hmm", function (a, b, c) { var d = a.length - 2; b[_d] = t(a.substr(0, d)), b[ae] = t(a.substr(d)) }), aa("Hmmss", function (a, b, c) { var d = a.length - 4, e = a.length - 2; b[_d] = t(a.substr(0, d)), b[ae] = t(a.substr(d, 2)), b[be] = t(a.substr(e)) }); var se, te = /[ap]\.?m?\.?/i, ue = N("Hours", !0), ve = { calendar: td, longDateFormat: ud, invalidDate: vd, ordinal: wd, ordinalParse: xd, relativeTime: yd, months: ge, monthsShort: he, week: le, weekdays: me, weekdaysMin: oe, weekdaysShort: ne, meridiemParse: te }, we = {}, xe = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/, ye = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/, ze = /Z|[+-]\d\d(?::?\d\d)?/, Ae = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], Be = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], Ce = /^\/?Date\((\-?\d+)/i; a.createFromInputFallback = w("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (a) { a._d = new Date(a._i + (a._useUTC ? " UTC" : "")) }),
            // constant that refers to the ISO standard
            a.ISO_8601 = function () { }; var De = w("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var a = rb.apply(null, arguments); return this.isValid() && a.isValid() ? this > a ? this : a : n() }), Ee = w("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var a = rb.apply(null, arguments); return this.isValid() && a.isValid() ? a > this ? this : a : n() }), Fe = function () { return Date.now ? Date.now() : +new Date }; xb("Z", ":"), xb("ZZ", ""),
                // PARSING
                Y("Z", Td), Y("ZZ", Td), aa(["Z", "ZZ"], function (a, b, c) { c._useUTC = !0, c._tzm = yb(Td, a) });
    // HELPERS
    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var Ge = /([\+\-]|\d\d)/gi;
    // HOOKS
    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    a.updateOffset = function () { };
    // ASP.NET json date format regex
    var He = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/, Ie = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/; Mb.fn = vb.prototype; var Je = Rb(1, "add"), Ke = Rb(-1, "subtract"); a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]"; var Le = w("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) { return void 0 === a ? this.localeData() : this.locale(a) });
    // FORMATTING
    T(0, ["gg", 2], 0, function () { return this.weekYear() % 100 }), T(0, ["GG", 2], 0, function () { return this.isoWeekYear() % 100 }), xc("gggg", "weekYear"), xc("ggggg", "weekYear"), xc("GGGG", "isoWeekYear"), xc("GGGGG", "isoWeekYear"),
        // ALIASES
        I("weekYear", "gg"), I("isoWeekYear", "GG"),
        // PRIORITY
        L("weekYear", 1), L("isoWeekYear", 1),
        // PARSING
        Y("G", Rd), Y("g", Rd), Y("GG", Kd, Gd), Y("gg", Kd, Gd), Y("GGGG", Od, Id), Y("gggg", Od, Id), Y("GGGGG", Pd, Jd), Y("ggggg", Pd, Jd), ba(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) { b[d.substr(0, 2)] = t(a) }), ba(["gg", "GG"], function (b, c, d, e) { c[e] = a.parseTwoDigitYear(b) }),
        // FORMATTING
        T("Q", 0, "Qo", "quarter"),
        // ALIASES
        I("quarter", "Q"),
        // PRIORITY
        L("quarter", 7),
        // PARSING
        Y("Q", Fd), aa("Q", function (a, b) { b[Zd] = 3 * (t(a) - 1) }),
        // FORMATTING
        T("D", ["DD", 2], "Do", "date"),
        // ALIASES
        I("date", "D"),
        // PRIOROITY
        L("date", 9),
        // PARSING
        Y("D", Kd), Y("DD", Kd, Gd), Y("Do", function (a, b) { return a ? b._ordinalParse : b._ordinalParseLenient }), aa(["D", "DD"], $d), aa("Do", function (a, b) { b[$d] = t(a.match(Kd)[0], 10) });
    // MOMENTS
    var Me = N("Date", !0);
    // FORMATTING
    T("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
        // ALIASES
        I("dayOfYear", "DDD"),
        // PRIORITY
        L("dayOfYear", 4),
        // PARSING
        Y("DDD", Nd), Y("DDDD", Hd), aa(["DDD", "DDDD"], function (a, b, c) { c._dayOfYear = t(a) }),
        // FORMATTING
        T("m", ["mm", 2], 0, "minute"),
        // ALIASES
        I("minute", "m"),
        // PRIORITY
        L("minute", 14),
        // PARSING
        Y("m", Kd), Y("mm", Kd, Gd), aa(["m", "mm"], ae);
    // MOMENTS
    var Ne = N("Minutes", !1);
    // FORMATTING
    T("s", ["ss", 2], 0, "second"),
        // ALIASES
        I("second", "s"),
        // PRIORITY
        L("second", 15),
        // PARSING
        Y("s", Kd), Y("ss", Kd, Gd), aa(["s", "ss"], be);
    // MOMENTS
    var Oe = N("Seconds", !1);
    // FORMATTING
    T("S", 0, 0, function () { return ~~(this.millisecond() / 100) }), T(0, ["SS", 2], 0, function () { return ~~(this.millisecond() / 10) }), T(0, ["SSS", 3], 0, "millisecond"), T(0, ["SSSS", 4], 0, function () { return 10 * this.millisecond() }), T(0, ["SSSSS", 5], 0, function () { return 100 * this.millisecond() }), T(0, ["SSSSSS", 6], 0, function () { return 1e3 * this.millisecond() }), T(0, ["SSSSSSS", 7], 0, function () { return 1e4 * this.millisecond() }), T(0, ["SSSSSSSS", 8], 0, function () { return 1e5 * this.millisecond() }), T(0, ["SSSSSSSSS", 9], 0, function () { return 1e6 * this.millisecond() }),
        // ALIASES
        I("millisecond", "ms"),
        // PRIORITY
        L("millisecond", 16),
        // PARSING
        Y("S", Nd, Fd), Y("SS", Nd, Gd), Y("SSS", Nd, Hd); var Pe; for (Pe = "SSSS"; Pe.length <= 9; Pe += "S")Y(Pe, Qd); for (Pe = "S"; Pe.length <= 9; Pe += "S")aa(Pe, Gc);
    // MOMENTS
    var Qe = N("Milliseconds", !1);
    // FORMATTING
    T("z", 0, 0, "zoneAbbr"), T("zz", 0, 0, "zoneName"); var Re = q.prototype; Re.add = Je, Re.calendar = Ub, Re.clone = Vb, Re.diff = ac, Re.endOf = mc, Re.format = ec, Re.from = fc, Re.fromNow = gc, Re.to = hc, Re.toNow = ic, Re.get = Q, Re.invalidAt = vc, Re.isAfter = Wb, Re.isBefore = Xb, Re.isBetween = Yb, Re.isSame = Zb, Re.isSameOrAfter = $b, Re.isSameOrBefore = _b, Re.isValid = tc, Re.lang = Le, Re.locale = jc, Re.localeData = kc, Re.max = Ee, Re.min = De, Re.parsingFlags = uc, Re.set = R, Re.startOf = lc, Re.subtract = Ke, Re.toArray = qc, Re.toObject = rc, Re.toDate = pc, Re.toISOString = dc, Re.toJSON = sc, Re.toString = cc, Re.unix = oc, Re.valueOf = nc, Re.creationData = wc,
        // Year
        Re.year = ke, Re.isLeapYear = qa,
        // Week Year
        Re.weekYear = yc, Re.isoWeekYear = zc,
        // Quarter
        Re.quarter = Re.quarters = Ec,
        // Month
        Re.month = ja, Re.daysInMonth = ka,
        // Week
        Re.week = Re.weeks = Aa, Re.isoWeek = Re.isoWeeks = Ba, Re.weeksInYear = Bc, Re.isoWeeksInYear = Ac,
        // Day
        Re.date = Me, Re.day = Re.days = Ja, Re.weekday = Ka, Re.isoWeekday = La, Re.dayOfYear = Fc,
        // Hour
        Re.hour = Re.hours = ue,
        // Minute
        Re.minute = Re.minutes = Ne,
        // Second
        Re.second = Re.seconds = Oe,
        // Millisecond
        Re.millisecond = Re.milliseconds = Qe,
        // Offset
        Re.utcOffset = Bb, Re.utc = Db, Re.local = Eb, Re.parseZone = Fb, Re.hasAlignedHourOffset = Gb, Re.isDST = Hb, Re.isLocal = Jb, Re.isUtcOffset = Kb, Re.isUtc = Lb, Re.isUTC = Lb,
        // Timezone
        Re.zoneAbbr = Hc, Re.zoneName = Ic,
        // Deprecations
        Re.dates = w("dates accessor is deprecated. Use date instead.", Me), Re.months = w("months accessor is deprecated. Use month instead", ja), Re.years = w("years accessor is deprecated. Use year instead", ke), Re.zone = w("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Cb), Re.isDSTShifted = w("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Ib); var Se = Re, Te = B.prototype; Te.calendar = C, Te.longDateFormat = D, Te.invalidDate = E, Te.ordinal = F, Te.preparse = Lc, Te.postformat = Lc, Te.relativeTime = G, Te.pastFuture = H, Te.set = z,
            // Month
            Te.months = ea, Te.monthsShort = fa, Te.monthsParse = ha, Te.monthsRegex = ma, Te.monthsShortRegex = la,
            // Week
            Te.week = xa, Te.firstDayOfYear = za, Te.firstDayOfWeek = ya,
            // Day of Week
            Te.weekdays = Ea, Te.weekdaysMin = Ga, Te.weekdaysShort = Fa, Te.weekdaysParse = Ia, Te.weekdaysRegex = Ma, Te.weekdaysShortRegex = Na, Te.weekdaysMinRegex = Oa,
            // Hours
            Te.isPM = Ua, Te.meridiem = Va, Za("en", { ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (a) { var b = a % 10, c = 1 === t(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th"; return a + c } }),
            // Side effect imports
            a.lang = w("moment.lang is deprecated. Use moment.locale instead.", Za), a.langData = w("moment.langData is deprecated. Use moment.localeData instead.", ab); var Ue = Math.abs, Ve = cd("ms"), We = cd("s"), Xe = cd("m"), Ye = cd("h"), Ze = cd("d"), $e = cd("w"), _e = cd("M"), af = cd("y"), bf = ed("milliseconds"), cf = ed("seconds"), df = ed("minutes"), ef = ed("hours"), ff = ed("days"), gf = ed("months"), hf = ed("years"), jf = Math.round, kf = {
                s: 45,// seconds to minute
                m: 45,// minutes to hour
                h: 22,// hours to day
                d: 26,// days to month
                M: 11
            }, lf = Math.abs, mf = vb.prototype; mf.abs = Uc, mf.add = Wc, mf.subtract = Xc, mf.as = ad, mf.asMilliseconds = Ve, mf.asSeconds = We, mf.asMinutes = Xe, mf.asHours = Ye, mf.asDays = Ze, mf.asWeeks = $e, mf.asMonths = _e, mf.asYears = af, mf.valueOf = bd, mf._bubble = Zc, mf.get = dd, mf.milliseconds = bf, mf.seconds = cf, mf.minutes = df, mf.hours = ef, mf.days = ff, mf.weeks = fd, mf.months = gf, mf.years = hf, mf.humanize = kd, mf.toISOString = ld, mf.toString = ld, mf.toJSON = ld, mf.locale = jc, mf.localeData = kc,
                // Deprecations
                mf.toIsoString = w("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", ld), mf.lang = Le,
                // Side effect imports
                // FORMATTING
                T("X", 0, 0, "unix"), T("x", 0, 0, "valueOf"),
                // PARSING
                Y("x", Rd), Y("X", Ud), aa("X", function (a, b, c) { c._d = new Date(1e3 * parseFloat(a, 10)) }), aa("x", function (a, b, c) { c._d = new Date(t(a)) }),
                // Side effect imports
                a.version = "2.14.1", b(rb), a.fn = Se, a.min = tb, a.max = ub, a.now = Fe, a.utc = j, a.unix = Jc, a.months = Pc, a.isDate = f, a.locale = Za, a.invalid = n, a.duration = Mb, a.isMoment = r, a.weekdays = Rc, a.parseZone = Kc, a.localeData = ab, a.isDuration = wb, a.monthsShort = Qc, a.weekdaysMin = Tc, a.defineLocale = $a, a.updateLocale = _a, a.locales = bb, a.weekdaysShort = Sc, a.normalizeUnits = J, a.relativeTimeRounding = id, a.relativeTimeThreshold = jd, a.calendarFormat = Tb, a.prototype = Se; var nf = a; return nf
});


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(["jquery"], function (a0) {
            return (factory(a0));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        factory(root["jQuery"]);
    }
}(this, function (jQuery) {

    (function ($) {
        'use strict';

        //<editor-fold desc="Shims">
        if (!String.prototype.includes) {
            (function () {
                'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
                var toString = {}.toString;
                var defineProperty = (function () {
                    // IE 8 only supports `Object.defineProperty` on DOM elements
                    try {
                        var object = {};
                        var $defineProperty = Object.defineProperty;
                        var result = $defineProperty(object, object, object) && $defineProperty;
                    } catch (error) {
                    }
                    return result;
                }());
                var indexOf = ''.indexOf;
                var includes = function (search) {
                    if (this == null) {
                        throw new TypeError();
                    }
                    var string = String(this);
                    if (search && toString.call(search) == '[object RegExp]') {
                        throw new TypeError();
                    }
                    var stringLength = string.length;
                    var searchString = String(search);
                    var searchLength = searchString.length;
                    var position = arguments.length > 1 ? arguments[1] : undefined;
                    // `ToInteger`
                    var pos = position ? Number(position) : 0;
                    if (pos != pos) { // better `isNaN`
                        pos = 0;
                    }
                    var start = Math.min(Math.max(pos, 0), stringLength);
                    // Avoid the `indexOf` call if no match is possible
                    if (searchLength + start > stringLength) {
                        return false;
                    }
                    return indexOf.call(string, searchString, pos) != -1;
                };
                if (defineProperty) {
                    defineProperty(String.prototype, 'includes', {
                        'value': includes,
                        'configurable': true,
                        'writable': true
                    });
                } else {
                    String.prototype.includes = includes;
                }
            }());
        }

        if (!String.prototype.startsWith) {
            (function () {
                'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
                var defineProperty = (function () {
                    // IE 8 only supports `Object.defineProperty` on DOM elements
                    try {
                        var object = {};
                        var $defineProperty = Object.defineProperty;
                        var result = $defineProperty(object, object, object) && $defineProperty;
                    } catch (error) {
                    }
                    return result;
                }());
                var toString = {}.toString;
                var startsWith = function (search) {
                    if (this == null) {
                        throw new TypeError();
                    }
                    var string = String(this);
                    if (search && toString.call(search) == '[object RegExp]') {
                        throw new TypeError();
                    }
                    var stringLength = string.length;
                    var searchString = String(search);
                    var searchLength = searchString.length;
                    var position = arguments.length > 1 ? arguments[1] : undefined;
                    // `ToInteger`
                    var pos = position ? Number(position) : 0;
                    if (pos != pos) { // better `isNaN`
                        pos = 0;
                    }
                    var start = Math.min(Math.max(pos, 0), stringLength);
                    // Avoid the `indexOf` call if no match is possible
                    if (searchLength + start > stringLength) {
                        return false;
                    }
                    var index = -1;
                    while (++index < searchLength) {
                        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                            return false;
                        }
                    }
                    return true;
                };
                if (defineProperty) {
                    defineProperty(String.prototype, 'startsWith', {
                        'value': startsWith,
                        'configurable': true,
                        'writable': true
                    });
                } else {
                    String.prototype.startsWith = startsWith;
                }
            }());
        }

        if (!Object.keys) {
            Object.keys = function (
                o, // object
                k, // key
                r  // result array
            ) {
                // initialize object and result
                r = [];
                // iterate over object keys
                for (k in o)
                    // fill result array with non-prototypical keys
                    r.hasOwnProperty.call(o, k) && r.push(k);
                // return result
                return r;
            };
        }

        // set data-selected on select element if the value has been programmatically selected
        // prior to initialization of bootstrap-select
        // * consider removing or replacing an alternative method *
        var valHooks = {
            useDefault: false,
            _set: $.valHooks.select.set
        };

        $.valHooks.select.set = function (elem, value) {
            if (value && !valHooks.useDefault) $(elem).data('selected', true);

            return valHooks._set.apply(this, arguments);
        };

        var changed_arguments = null;
        $.fn.triggerNative = function (eventName) {
            var el = this[0],
                event;

            if (el.dispatchEvent) { // for modern browsers & IE9+
                if (typeof Event === 'function') {
                    // For modern browsers
                    event = new Event(eventName, {
                        bubbles: true
                    });
                } else {
                    // For IE since it doesn't support Event constructor
                    event = document.createEvent('Event');
                    event.initEvent(eventName, true, false);
                }

                el.dispatchEvent(event);
            } else if (el.fireEvent) { // for IE8
                event = document.createEventObject();
                event.eventType = eventName;
                el.fireEvent('on' + eventName, event);
            } else {
                // fall back to jQuery.trigger
                this.trigger(eventName);
            }
        };
        //</editor-fold>

        // Case insensitive contains search
        $.expr.pseudos.icontains = function (obj, index, meta) {
            var $obj = $(obj);
            var haystack = ($obj.data('tokens') || $obj.text()).toString().toUpperCase();
            return haystack.includes(meta[3].toUpperCase());
        };

        // Case insensitive begins search
        $.expr.pseudos.ibegins = function (obj, index, meta) {
            var $obj = $(obj);
            var haystack = ($obj.data('tokens') || $obj.text()).toString().toUpperCase();
            return haystack.startsWith(meta[3].toUpperCase());
        };

        // Case and accent insensitive contains search
        $.expr.pseudos.aicontains = function (obj, index, meta) {
            var $obj = $(obj);
            var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toString().toUpperCase();
            return haystack.includes(meta[3].toUpperCase());
        };

        // Case and accent insensitive begins search
        $.expr.pseudos.aibegins = function (obj, index, meta) {
            var $obj = $(obj);
            var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toString().toUpperCase();
            return haystack.startsWith(meta[3].toUpperCase());
        };

        /**
         * Remove all diatrics from the given text.
         * @access private
         * @param {String} text
         * @returns {String}
         */
        function normalizeToBase(text) {
            var rExps = [
                { re: /[\xC0-\xC6]/g, ch: "A" },
                { re: /[\xE0-\xE6]/g, ch: "a" },
                { re: /[\xC8-\xCB]/g, ch: "E" },
                { re: /[\xE8-\xEB]/g, ch: "e" },
                { re: /[\xCC-\xCF]/g, ch: "I" },
                { re: /[\xEC-\xEF]/g, ch: "i" },
                { re: /[\xD2-\xD6]/g, ch: "O" },
                { re: /[\xF2-\xF6]/g, ch: "o" },
                { re: /[\xD9-\xDC]/g, ch: "U" },
                { re: /[\xF9-\xFC]/g, ch: "u" },
                { re: /[\xC7-\xE7]/g, ch: "c" },
                { re: /[\xD1]/g, ch: "N" },
                { re: /[\xF1]/g, ch: "n" }
            ];
            $.each(rExps, function () {
                text = text ? text.replace(this.re, this.ch) : '';
            });
            return text;
        }


        // List of HTML entities for escaping.
        var escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        };

        var unescapeMap = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#x27;': "'",
            '&#x60;': '`'
        };

        // Functions for escaping and unescaping strings to/from HTML interpolation.
        var createEscaper = function (map) {
            var escaper = function (match) {
                return map[match];
            };
            // Regexes for identifying a key that needs to be escaped.
            var source = '(?:' + Object.keys(map).join('|') + ')';
            var testRegexp = RegExp(source);
            var replaceRegexp = RegExp(source, 'g');
            return function (string) {
                string = string == null ? '' : '' + string;
                return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
            };
        };

        var htmlEscape = createEscaper(escapeMap);
        var htmlUnescape = createEscaper(unescapeMap);

        var Selectpicker = function (element, options) {
            // bootstrap-select has been initialized - revert valHooks.select.set back to its original function
            if (!valHooks.useDefault) {
                $.valHooks.select.set = valHooks._set;
                valHooks.useDefault = true;
            }

            this.$element = $(element);
            this.$newElement = null;
            this.$button = null;
            this.$menu = null;
            this.$lis = null;
            this.options = options;

            // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
            // data-attribute)
            if (this.options.title === null) {
                this.options.title = this.$element.attr('title');
            }

            // Format window padding
            var winPad = this.options.windowPadding;
            if (typeof winPad === 'number') {
                this.options.windowPadding = [winPad, winPad, winPad, winPad];
            }

            //Expose public methods
            this.val = Selectpicker.prototype.val;
            this.render = Selectpicker.prototype.render;
            this.refresh = Selectpicker.prototype.refresh;
            this.setStyle = Selectpicker.prototype.setStyle;
            this.selectAll = Selectpicker.prototype.selectAll;
            this.deselectAll = Selectpicker.prototype.deselectAll;
            this.destroy = Selectpicker.prototype.destroy;
            this.remove = Selectpicker.prototype.remove;
            this.show = Selectpicker.prototype.show;
            this.hide = Selectpicker.prototype.hide;

            this.init();
        };

        Selectpicker.VERSION = '1.12.2';

        // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
        Selectpicker.DEFAULTS = {
            noneSelectedText: 'Nothing selected',
            noneResultsText: 'No results matched {0}',
            countSelectedText: function (numSelected, numTotal) {
                return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
            },
            maxOptionsText: function (numAll, numGroup) {
                return [
                    (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
                    (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
                ];
            },
            selectAllText: 'Select All',
            deselectAllText: 'Deselect All',
            doneButton: false,
            doneButtonText: 'Close',
            multipleSeparator: ', ',
            styleBase: 'btn',
            style: 'btn-default',
            size: 'auto',
            title: null,
            selectedTextFormat: 'values',
            width: false,
            container: false,
            hideDisabled: false,
            showSubtext: false,
            showIcon: true,
            showContent: true,
            dropupAuto: true,
            header: false,
            liveSearch: false,
            liveSearchPlaceholder: null,
            liveSearchNormalize: false,
            liveSearchStyle: 'contains',
            actionsBox: false,
            iconBase: 'material-icons',
            tickIcon: 'done',
            showTick: false,
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: false,
            mobile: false,
            selectOnTab: false,
            dropdownAlignRight: false,
            windowPadding: 0
        };

        Selectpicker.prototype = {

            constructor: Selectpicker,

            init: function () {
                var that = this,
                    id = this.$element.attr('id');

                this.$element.addClass('bs-select-hidden');

                // store originalIndex (key) and newIndex (value) in this.liObj for fast accessibility
                // allows us to do this.$lis.eq(that.liObj[index]) instead of this.$lis.filter('[data-original-index="' + index + '"]')
                this.liObj = {};
                this.multiple = this.$element.prop('multiple');
                this.autofocus = this.$element.prop('autofocus');
                this.$newElement = this.createView();
                this.$element
                    .after(this.$newElement)
                    .appendTo(this.$newElement);
                this.$button = this.$newElement.children('button');
                this.$menu = this.$newElement.children('.dropdown-menu');
                this.$menuInner = this.$menu.children('.inner');
                this.$searchbox = this.$menu.find('input');

                this.$element.removeClass('bs-select-hidden');

                if (this.options.dropdownAlignRight === true) this.$menu.addClass('dropdown-menu-right');

                if (typeof id !== 'undefined') {
                    this.$button.attr('data-id', id);
                    $('label[for="' + id + '"]').click(function (e) {
                        e.preventDefault();
                        that.$button.focus();
                    });
                }

                this.checkDisabled();
                this.clickListener();
                if (this.options.liveSearch) this.liveSearchListener();
                this.render();
                this.setStyle();
                this.setWidth();
                if (this.options.container) this.selectPosition();
                this.$menu.data('this', this);
                this.$newElement.data('this', this);
                if (this.options.mobile) this.mobile();

                this.$newElement.on({
                    'hide.bs.dropdown': function (e) {
                        that.$menuInner.attr('aria-expanded', false);
                        that.$element.trigger('hide.bs.select', e);
                    },
                    'hidden.bs.dropdown': function (e) {
                        that.$element.trigger('hidden.bs.select', e);
                    },
                    'show.bs.dropdown': function (e) {
                        that.$menuInner.attr('aria-expanded', true);
                        that.$element.trigger('show.bs.select', e);
                    },
                    'shown.bs.dropdown': function (e) {
                        that.$element.trigger('shown.bs.select', e);
                    }
                });

                if (that.$element[0].hasAttribute('required')) {
                    this.$element.on('invalid', function () {
                        that.$button
                            .addClass('bs-invalid')
                            .focus();

                        that.$element.on({
                            'focus.bs.select': function () {
                                that.$button.focus();
                                that.$element.off('focus.bs.select');
                            },
                            'shown.bs.select': function () {
                                that.$element
                                    .val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
                                    .off('shown.bs.select');
                            },
                            'rendered.bs.select': function () {
                                // if select is no longer invalid, remove the bs-invalid class
                                if (this.validity.valid) that.$button.removeClass('bs-invalid');
                                that.$element.off('rendered.bs.select');
                            }
                        });
                    });
                }

                setTimeout(function () {
                    that.$element.trigger('loaded.bs.select');
                });
            },

            createDropdown: function () {
                // Options
                // If we are multiple or showTick option is set, then add the show-tick class
                var showTick = (this.multiple || this.options.showTick) ? ' show-tick' : '',
                    inputGroup = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '',
                    autofocus = this.autofocus ? ' autofocus' : '';
                // Elements
                var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '';
                var searchbox = this.options.liveSearch ?
                    '<div class="bs-searchbox">' +
                    '<input type="text" class="form-control" autocomplete="off"' +
                    (null === this.options.liveSearchPlaceholder ? '' : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search">' +
                    '</div>'
                    : '';
                var actionsbox = this.multiple && this.options.actionsBox ?
                    '<div class="bs-actionsbox">' +
                    '<div class="btn-group btn-group-sm btn-block">' +
                    '<button type="button" class="actions-btn bs-select-all btn btn-default">' +
                    this.options.selectAllText +
                    '</button>' +
                    '<button type="button" class="actions-btn bs-deselect-all btn btn-default">' +
                    this.options.deselectAllText +
                    '</button>' +
                    '</div>' +
                    '</div>'
                    : '';
                var donebutton = this.multiple && this.options.doneButton ?
                    '<div class="bs-donebutton">' +
                    '<div class="btn-group btn-block">' +
                    '<button type="button" class="btn btn-sm btn-default">' +
                    this.options.doneButtonText +
                    '</button>' +
                    '</div>' +
                    '</div>'
                    : '';
                var drop =
                    '<div class="btn-group bootstrap-select' + showTick + inputGroup + '">' +
                    '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + ' role="button">' +
                    '<span class="filter-option pull-left"></span>&nbsp;' +
                    '<span class="bs-caret">' +
                    this.options.template.caret +
                    '</span>' +
                    '</button>' +
                    '<div class="dropdown-menu open" role="combobox">' +
                    header +
                    searchbox +
                    actionsbox +
                    '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false">' +
                    '</ul>' +
                    donebutton +
                    '</div>' +
                    '</div>';

                return $(drop);
            },

            createView: function () {
                var $drop = this.createDropdown(),
                    li = this.createLi();

                $drop.find('ul')[0].innerHTML = li;
                return $drop;
            },

            reloadLi: function () {
                // rebuild
                var li = this.createLi();
                this.$menuInner[0].innerHTML = li;
            },

            createLi: function () {
                var that = this,
                    _li = [],
                    optID = 0,
                    titleOption = document.createElement('option'),
                    liIndex = -1; // increment liIndex whenever a new <li> element is created to ensure liObj is correct

                // Helper functions
                /**
                 * @param content
                 * @param [index]
                 * @param [classes]
                 * @param [optgroup]
                 * @returns {string}
                 */
                var generateLI = function (content, index, classes, optgroup) {
                    return '<li' +
                        ((typeof classes !== 'undefined' & '' !== classes) ? ' class="' + classes + '"' : '') +
                        ((typeof index !== 'undefined' & null !== index) ? ' data-original-index="' + index + '"' : '') +
                        ((typeof optgroup !== 'undefined' & null !== optgroup) ? 'data-optgroup="' + optgroup + '"' : '') +
                        '>' + content + '</li>';
                };

                /**
                 * @param text
                 * @param [classes]
                 * @param [inline]
                 * @param [tokens]
                 * @returns {string}
                 */
                var generateA = function (text, classes, inline, tokens) {
                    return '<a tabindex="0"' +
                        (typeof classes !== 'undefined' ? ' class="' + classes + '"' : '') +
                        (inline ? ' style="' + inline + '"' : '') +
                        (that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape($(text).html())) + '"' : '') +
                        (typeof tokens !== 'undefined' || tokens !== null ? ' data-tokens="' + tokens + '"' : '') +
                        ' role="option">' + text +
                        '<span class="' + that.options.iconBase + '  check-mark"> ' + that.options.tickIcon + ' </span>' +
                        '</a>';
                };

                if (this.options.title && !this.multiple) {
                    // this option doesn't create a new <li> element, but does add a new option, so liIndex is decreased
                    // since liObj is recalculated on every refresh, liIndex needs to be decreased even if the titleOption is already appended
                    liIndex--;

                    if (!this.$element.find('.bs-title-option').length) {
                        // Use native JS to prepend option (faster)
                        var element = this.$element[0];
                        titleOption.className = 'bs-title-option';
                        titleOption.innerHTML = this.options.title;
                        titleOption.value = '';
                        element.insertBefore(titleOption, element.firstChild);
                        // Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
                        // the selected item may have been changed by user or programmatically before the bootstrap select plugin runs,
                        // if so, the select will have the data-selected attribute
                        var $opt = $(element.options[element.selectedIndex]);
                        if ($opt.attr('selected') === undefined && this.$element.data('selected') === undefined) {
                            titleOption.selected = true;
                        }
                    }
                }

                this.$element.find('option').each(function (index) {
                    var $this = $(this);

                    liIndex++;

                    if ($this.hasClass('bs-title-option')) return;

                    // Get the class and text for the option
                    var optionClass = this.className || '',
                        inline = this.style.cssText,
                        text = $this.data('content') ? $this.data('content') : $this.html(),
                        tokens = $this.data('tokens') ? $this.data('tokens') : null,
                        subtext = typeof $this.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $this.data('subtext') + '</small>' : '',
                        icon = typeof $this.data('icon') !== 'undefined' ? '<span class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></span> ' : '',
                        $parent = $this.parent(),
                        isOptgroup = $parent[0].tagName === 'OPTGROUP',
                        isOptgroupDisabled = isOptgroup && $parent[0].disabled,
                        isDisabled = this.disabled || isOptgroupDisabled;

                    if (icon !== '' && isDisabled) {
                        icon = '<span>' + icon + '</span>';
                    }

                    if (that.options.hideDisabled && (isDisabled && !isOptgroup || isOptgroupDisabled)) {
                        liIndex--;
                        return;
                    }

                    if (!$this.data('content')) {
                        // Prepend any icon and append any subtext to the main text.
                        text = icon + '<span class="text">' + text + subtext + '</span>';
                    }

                    if (isOptgroup && $this.data('divider') !== true) {
                        if (that.options.hideDisabled && isDisabled) {
                            if ($parent.data('allOptionsDisabled') === undefined) {
                                var $options = $parent.children();
                                $parent.data('allOptionsDisabled', $options.filter(':disabled').length === $options.length);
                            }

                            if ($parent.data('allOptionsDisabled')) {
                                liIndex--;
                                return;
                            }
                        }

                        var optGroupClass = ' ' + $parent[0].className || '';

                        if ($this.index() === 0) { // Is it the first option of the optgroup?
                            optID += 1;

                            // Get the opt group label
                            var label = $parent[0].label,
                                labelSubtext = typeof $parent.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $parent.data('subtext') + '</small>' : '',
                                labelIcon = $parent.data('icon') ? '<span class="' + that.options.iconBase + ' ' + $parent.data('icon') + '"></span> ' : '';

                            label = labelIcon + '<span class="text">' + htmlEscape(label) + labelSubtext + '</span>';

                            if (index !== 0 && _li.length > 0) { // Is it NOT the first option of the select && are there elements in the dropdown?
                                liIndex++;
                                _li.push(generateLI('', null, 'divider', optID + 'div'));
                            }
                            liIndex++;
                            _li.push(generateLI(label, null, 'dropdown-header' + optGroupClass, optID));
                        }

                        if (that.options.hideDisabled && isDisabled) {
                            liIndex--;
                            return;
                        }

                        _li.push(generateLI(generateA(text, 'opt ' + optionClass + optGroupClass, inline, tokens), index, '', optID));
                    } else if ($this.data('divider') === true) {
                        _li.push(generateLI('', index, 'divider'));
                    } else if ($this.data('hidden') === true) {
                        _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, 'hidden is-hidden'));
                    } else {
                        var showDivider = this.previousElementSibling && this.previousElementSibling.tagName === 'OPTGROUP';

                        // if previous element is not an optgroup and hideDisabled is true
                        if (!showDivider && that.options.hideDisabled) {
                            // get previous elements
                            var $prev = $(this).prevAll();

                            for (var i = 0; i < $prev.length; i++) {
                                // find the first element in the previous elements that is an optgroup
                                if ($prev[i].tagName === 'OPTGROUP') {
                                    var optGroupDistance = 0;

                                    // loop through the options in between the current option and the optgroup
                                    // and check if they are hidden or disabled
                                    for (var d = 0; d < i; d++) {
                                        var prevOption = $prev[d];
                                        if (prevOption.disabled || $(prevOption).data('hidden') === true) optGroupDistance++;
                                    }

                                    // if all of the options between the current option and the optgroup are hidden or disabled, show the divider
                                    if (optGroupDistance === i) showDivider = true;

                                    break;
                                }
                            }
                        }

                        if (showDivider) {
                            liIndex++;
                            _li.push(generateLI('', null, 'divider', optID + 'div'));
                        }
                        _li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
                    }

                    that.liObj[index] = liIndex;
                });

                //If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
                if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
                    this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
                }

                return _li.join('');
            },

            findLis: function () {
                if (this.$lis == null) this.$lis = this.$menu.find('li');
                return this.$lis;
            },

            /**
             * @param [updateLi] defaults to true
             */
            render: function (updateLi) {
                var that = this,
                    notDisabled;

                //Update the LI to match the SELECT
                if (updateLi !== false) {
                    this.$element.find('option').each(function (index) {
                        var $lis = that.findLis().eq(that.liObj[index]);

                        that.setDisabled(index, this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled, $lis);
                        that.setSelected(index, this.selected, $lis);
                    });
                }

                this.togglePlaceholder();

                this.tabIndex();

                var selectedItems = this.$element.find('option').map(function () {
                    if (this.selected) {
                        if (that.options.hideDisabled && (this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled)) return;

                        var $this = $(this),
                            icon = $this.data('icon') && that.options.showIcon ? '<i class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></i> ' : '',
                            subtext;

                        if (that.options.showSubtext && $this.data('subtext') && !that.multiple) {
                            subtext = ' <small class="text-muted">' + $this.data('subtext') + '</small>';
                        } else {
                            subtext = '';
                        }
                        if (typeof $this.attr('title') !== 'undefined') {
                            return $this.attr('title');
                        } else if ($this.data('content') && that.options.showContent) {
                            return $this.data('content').toString();
                        } else {
                            return icon + $this.html() + subtext;
                        }
                    }
                }).toArray();

                //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
                //Convert all the values into a comma delimited string
                var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);

                //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
                if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
                    var max = this.options.selectedTextFormat.split('>');
                    if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
                        notDisabled = this.options.hideDisabled ? ', [disabled]' : '';
                        var totalCount = this.$element.find('option').not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length,
                            tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
                        title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
                    }
                }

                if (this.options.title == undefined) {
                    this.options.title = this.$element.attr('title');
                }

                if (this.options.selectedTextFormat == 'static') {
                    title = this.options.title;
                }

                //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
                if (!title) {
                    title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
                }

                //strip all HTML tags and trim the result, then unescape any escaped tags
                this.$button.attr('title', htmlUnescape($.trim(title.replace(/<[^>]*>?/g, ''))));
                this.$button.children('.filter-option').html(title);

                this.$element.trigger('rendered.bs.select');
            },

            /**
             * @param [style]
             * @param [status]
             */
            setStyle: function (style, status) {
                if (this.$element.attr('class')) {
                    this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
                }

                var buttonClass = style ? style : this.options.style;

                if (status == 'add') {
                    this.$button.addClass(buttonClass);
                } else if (status == 'remove') {
                    this.$button.removeClass(buttonClass);
                } else {
                    this.$button.removeClass(this.options.style);
                    this.$button.addClass(buttonClass);
                }
            },

            liHeight: function (refresh) {
                if (!refresh && (this.options.size === false || this.sizeInfo)) return;

                var newElement = document.createElement('div'),
                    menu = document.createElement('div'),
                    menuInner = document.createElement('ul'),
                    divider = document.createElement('li'),
                    li = document.createElement('li'),
                    a = document.createElement('a'),
                    text = document.createElement('span'),
                    header = this.options.header && this.$menu.find('.popover-title').length > 0 ? this.$menu.find('.popover-title')[0].cloneNode(true) : null,
                    search = this.options.liveSearch ? document.createElement('div') : null,
                    actions = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
                    doneButton = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null;

                text.className = 'text';
                newElement.className = this.$menu[0].parentNode.className + ' open';
                menu.className = 'dropdown-menu open';
                menuInner.className = 'dropdown-menu inner';
                divider.className = 'divider';

                text.appendChild(document.createTextNode('Inner text'));
                a.appendChild(text);
                li.appendChild(a);
                menuInner.appendChild(li);
                menuInner.appendChild(divider);
                if (header) menu.appendChild(header);
                if (search) {
                    var input = document.createElement('input');
                    search.className = 'bs-searchbox';
                    input.className = 'form-control';
                    search.appendChild(input);
                    menu.appendChild(search);
                }
                if (actions) menu.appendChild(actions);
                menu.appendChild(menuInner);
                if (doneButton) menu.appendChild(doneButton);
                newElement.appendChild(menu);

                document.body.appendChild(newElement);

                var liHeight = a.offsetHeight,
                    headerHeight = header ? header.offsetHeight : 0,
                    searchHeight = search ? search.offsetHeight : 0,
                    actionsHeight = actions ? actions.offsetHeight : 0,
                    doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
                    dividerHeight = $(divider).outerHeight(true),
                    // fall back to jQuery if getComputedStyle is not supported
                    menuStyle = typeof getComputedStyle === 'function' ? getComputedStyle(menu) : false,
                    $menu = menuStyle ? null : $(menu),
                    menuPadding = {
                        vert: parseInt(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) +
                            parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) +
                            parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) +
                            parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
                        horiz: parseInt(menuStyle ? menuStyle.paddingLeft : $menu.css('paddingLeft')) +
                            parseInt(menuStyle ? menuStyle.paddingRight : $menu.css('paddingRight')) +
                            parseInt(menuStyle ? menuStyle.borderLeftWidth : $menu.css('borderLeftWidth')) +
                            parseInt(menuStyle ? menuStyle.borderRightWidth : $menu.css('borderRightWidth'))
                    },
                    menuExtras = {
                        vert: menuPadding.vert +
                            parseInt(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) +
                            parseInt(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2,
                        horiz: menuPadding.horiz +
                            parseInt(menuStyle ? menuStyle.marginLeft : $menu.css('marginLeft')) +
                            parseInt(menuStyle ? menuStyle.marginRight : $menu.css('marginRight')) + 2
                    }

                document.body.removeChild(newElement);

                this.sizeInfo = {
                    liHeight: liHeight,
                    headerHeight: headerHeight,
                    searchHeight: searchHeight,
                    actionsHeight: actionsHeight,
                    doneButtonHeight: doneButtonHeight,
                    dividerHeight: dividerHeight,
                    menuPadding: menuPadding,
                    menuExtras: menuExtras
                };
            },

            setSize: function () {
                this.findLis();
                this.liHeight();

                if (this.options.header) this.$menu.css('padding-top', 0);
                if (this.options.size === false) return;

                var that = this,
                    $menu = this.$menu,
                    $menuInner = this.$menuInner,
                    $window = $(window),
                    selectHeight = this.$newElement[0].offsetHeight,
                    selectWidth = this.$newElement[0].offsetWidth,
                    liHeight = this.sizeInfo['liHeight'],
                    headerHeight = this.sizeInfo['headerHeight'],
                    searchHeight = this.sizeInfo['searchHeight'],
                    actionsHeight = this.sizeInfo['actionsHeight'],
                    doneButtonHeight = this.sizeInfo['doneButtonHeight'],
                    divHeight = this.sizeInfo['dividerHeight'],
                    menuPadding = this.sizeInfo['menuPadding'],
                    menuExtras = this.sizeInfo['menuExtras'],
                    notDisabled = this.options.hideDisabled ? '.disabled' : '',
                    menuHeight,
                    menuWidth,
                    getHeight,
                    getWidth,
                    selectOffsetTop,
                    selectOffsetBot,
                    selectOffsetLeft,
                    selectOffsetRight,
                    getPos = function () {
                        var pos = that.$newElement.offset(),
                            $container = $(that.options.container),
                            containerPos;

                        if (that.options.container && !$container.is('body')) {
                            containerPos = $container.offset();
                            containerPos.top += parseInt($container.css('borderTopWidth'));
                            containerPos.left += parseInt($container.css('borderLeftWidth'));
                        } else {
                            containerPos = { top: 0, left: 0 };
                        }

                        var winPad = that.options.windowPadding;
                        selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
                        selectOffsetBot = $window.height() - selectOffsetTop - selectHeight - containerPos.top - winPad[2];
                        selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
                        selectOffsetRight = $window.width() - selectOffsetLeft - selectWidth - containerPos.left - winPad[1];
                        selectOffsetTop -= winPad[0];
                        selectOffsetLeft -= winPad[3];
                    };

                getPos();

                if (this.options.size === 'auto') {
                    var getSize = function () {
                        var minHeight,
                            hasClass = function (className, include) {
                                return function (element) {
                                    if (include) {
                                        return (element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                                    } else {
                                        return !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                                    }
                                };
                            },
                            lis = that.$menuInner[0].getElementsByTagName('li'),
                            lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass('hidden', false)) : that.$lis.not('.hidden'),
                            optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass('dropdown-header', true)) : lisVisible.filter('.dropdown-header');

                        getPos();
                        menuHeight = selectOffsetBot - menuExtras.vert;
                        menuWidth = selectOffsetRight - menuExtras.horiz;

                        if (that.options.container) {
                            if (!$menu.data('height')) $menu.data('height', $menu.height());
                            getHeight = $menu.data('height');

                            if (!$menu.data('width')) $menu.data('width', $menu.width());
                            getWidth = $menu.data('width');
                        } else {
                            getHeight = $menu.height();
                            getWidth = $menu.width();
                        }

                        if (that.options.dropupAuto) {
                            that.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras.vert) < getHeight);
                        }

                        if (that.$newElement.hasClass('dropup')) {
                            menuHeight = selectOffsetTop - menuExtras.vert;
                        }

                        if (that.options.dropdownAlignRight === 'auto') {
                            $menu.toggleClass('dropdown-menu-right', selectOffsetLeft > selectOffsetRight && (menuWidth - menuExtras.horiz) < (getWidth - selectWidth));
                        }

                        if ((lisVisible.length + optGroup.length) > 3) {
                            minHeight = liHeight * 3 + menuExtras.vert - 2;
                        } else {
                            minHeight = 0;
                        }

                        $menu.css({
                            'max-height': menuHeight + 'px',
                            'overflow': 'hidden',
                            'min-height': minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px'
                        });
                        $menuInner.css({
                            'max-height': menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert + 'px',
                            'overflow-y': 'auto',
                            'min-height': Math.max(minHeight - menuPadding.vert, 0) + 'px'
                        });
                    };
                    getSize();
                    this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', getSize);
                    $window.off('resize.getSize scroll.getSize').on('resize.getSize scroll.getSize', getSize);
                } else if (this.options.size && this.options.size != 'auto' && this.$lis.not(notDisabled).length > this.options.size) {
                    var optIndex = this.$lis.not('.divider').not(notDisabled).children().slice(0, this.options.size).last().parent().index(),
                        divLength = this.$lis.slice(0, optIndex + 1).filter('.divider').length;
                    menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;

                    if (that.options.container) {
                        if (!$menu.data('height')) $menu.data('height', $menu.height());
                        getHeight = $menu.data('height');
                    } else {
                        getHeight = $menu.height();
                    }

                    if (that.options.dropupAuto) {
                        //noinspection JSUnusedAssignment
                        this.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras.vert) < getHeight);
                    }
                    $menu.css({
                        'max-height': menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px',
                        'overflow': 'hidden',
                        'min-height': ''
                    });
                    $menuInner.css({
                        'max-height': menuHeight - menuPadding.vert + 'px',
                        'overflow-y': 'auto',
                        'min-height': ''
                    });
                }
            },

            setWidth: function () {
                if (this.options.width === 'auto') {
                    this.$menu.css('min-width', '0');

                    // Get correct width if element is hidden
                    var $selectClone = this.$menu.parent().clone().appendTo('body'),
                        $selectClone2 = this.options.container ? this.$newElement.clone().appendTo('body') : $selectClone,
                        ulWidth = $selectClone.children('.dropdown-menu').outerWidth(),
                        btnWidth = $selectClone2.css('width', 'auto').children('button').outerWidth();

                    $selectClone.remove();
                    $selectClone2.remove();

                    // Set width to whatever's larger, button title or longest option
                    this.$newElement.css('width', Math.max(ulWidth, btnWidth) + 'px');
                } else if (this.options.width === 'fit') {
                    // Remove inline min-width so width can be changed from 'auto'
                    this.$menu.css('min-width', '');
                    this.$newElement.css('width', '').addClass('fit-width');
                } else if (this.options.width) {
                    // Remove inline min-width so width can be changed from 'auto'
                    this.$menu.css('min-width', '');
                    this.$newElement.css('width', this.options.width);
                } else {
                    // Remove inline min-width/width so width can be changed
                    this.$menu.css('min-width', '');
                    this.$newElement.css('width', '');
                }
                // Remove fit-width class if width is changed programmatically
                if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
                    this.$newElement.removeClass('fit-width');
                }
            },

            selectPosition: function () {
                this.$bsContainer = $('<div class="bs-container" />');

                var that = this,
                    $container = $(this.options.container),
                    pos,
                    containerPos,
                    actualHeight,
                    getPlacement = function ($element) {
                        that.$bsContainer.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
                        pos = $element.offset();

                        if (!$container.is('body')) {
                            containerPos = $container.offset();
                            containerPos.top += parseInt($container.css('borderTopWidth')) - $container.scrollTop();
                            containerPos.left += parseInt($container.css('borderLeftWidth')) - $container.scrollLeft();
                        } else {
                            containerPos = { top: 0, left: 0 };
                        }

                        actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;

                        that.$bsContainer.css({
                            'top': pos.top - containerPos.top + actualHeight,
                            'left': pos.left - containerPos.left,
                            'width': $element[0].offsetWidth
                        });
                    };

                this.$button.on('click', function () {
                    var $this = $(this);

                    if (that.isDisabled()) {
                        return;
                    }

                    getPlacement(that.$newElement);

                    that.$bsContainer
                        .appendTo(that.options.container)
                        .toggleClass('open', !$this.hasClass('open'))
                        .append(that.$menu);
                });

                $(window).on('resize scroll', function () {
                    getPlacement(that.$newElement);
                });

                this.$element.on('hide.bs.select', function () {
                    that.$menu.data('height', that.$menu.height());
                    that.$bsContainer.detach();
                });
            },

            /**
             * @param {number} index - the index of the option that is being changed
             * @param {boolean} selected - true if the option is being selected, false if being deselected
             * @param {JQuery} $lis - the 'li' element that is being modified
             */
            setSelected: function (index, selected, $lis) {
                if (!$lis) {
                    this.togglePlaceholder(); // check if setSelected is being called by changing the value of the select
                    $lis = this.findLis().eq(this.liObj[index]);
                }

                $lis.toggleClass('selected', selected).find('a').attr('aria-selected', selected);
            },

            /**
             * @param {number} index - the index of the option that is being disabled
             * @param {boolean} disabled - true if the option is being disabled, false if being enabled
             * @param {JQuery} $lis - the 'li' element that is being modified
             */
            setDisabled: function (index, disabled, $lis) {
                if (!$lis) {
                    $lis = this.findLis().eq(this.liObj[index]);
                }

                if (disabled) {
                    $lis.addClass('disabled').children('a').attr('href', '#').attr('tabindex', -1).attr('aria-disabled', true);
                } else {
                    $lis.removeClass('disabled').children('a').removeAttr('href').attr('tabindex', 0).attr('aria-disabled', false);
                }
            },

            isDisabled: function () {
                return this.$element[0].disabled;
            },

            checkDisabled: function () {
                var that = this;

                if (this.isDisabled()) {
                    this.$newElement.addClass('disabled');
                    this.$button.addClass('disabled').attr('tabindex', -1).attr('aria-disabled', true);
                } else {
                    if (this.$button.hasClass('disabled')) {
                        this.$newElement.removeClass('disabled');
                        this.$button.removeClass('disabled').attr('aria-disabled', false);
                    }

                    if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
                        this.$button.removeAttr('tabindex');
                    }
                }

                this.$button.click(function () {
                    return !that.isDisabled();
                });
            },

            togglePlaceholder: function () {
                var value = this.$element.val();
                this.$button.toggleClass('bs-placeholder', value === null || value === '' || (value.constructor === Array && value.length === 0));
            },

            tabIndex: function () {
                if (this.$element.data('tabindex') !== this.$element.attr('tabindex') &&
                    (this.$element.attr('tabindex') !== -98 && this.$element.attr('tabindex') !== '-98')) {
                    this.$element.data('tabindex', this.$element.attr('tabindex'));
                    this.$button.attr('tabindex', this.$element.data('tabindex'));
                }

                this.$element.attr('tabindex', -98);
            },

            clickListener: function () {
                var that = this,
                    $document = $(document);

                $document.data('spaceSelect', false);

                this.$button.on('keyup', function (e) {
                    if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
                        e.preventDefault();
                        $document.data('spaceSelect', false);
                    }
                });

                this.$button.on('click', function () {
                    that.setSize();
                });

                this.$element.on('shown.bs.select', function () {
                    if (!that.options.liveSearch && !that.multiple) {
                        that.$menuInner.find('.selected a').focus();
                    } else if (!that.multiple) {
                        var selectedIndex = that.liObj[that.$element[0].selectedIndex];

                        if (typeof selectedIndex !== 'number' || that.options.size === false) return;

                        // scroll to selected option
                        var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
                        offset = offset - that.$menuInner[0].offsetHeight / 2 + that.sizeInfo.liHeight / 2;
                        that.$menuInner[0].scrollTop = offset;
                    }
                });

                this.$menuInner.on('click', 'li a', function (e) {
                    var $this = $(this),
                        clickedIndex = $this.parent().data('originalIndex'),
                        prevValue = that.$element.val(),
                        prevIndex = that.$element.prop('selectedIndex'),
                        triggerChange = true;

                    // Don't close on multi choice menu
                    if (that.multiple && that.options.maxOptions !== 1) {
                        e.stopPropagation();
                    }

                    e.preventDefault();

                    //Don't run if we have been disabled
                    if (!that.isDisabled() && !$this.parent().hasClass('disabled')) {
                        var $options = that.$element.find('option'),
                            $option = $options.eq(clickedIndex),
                            state = $option.prop('selected'),
                            $optgroup = $option.parent('optgroup'),
                            maxOptions = that.options.maxOptions,
                            maxOptionsGrp = $optgroup.data('maxOptions') || false;

                        if (!that.multiple) { // Deselect all others if not multi select box
                            $options.prop('selected', false);
                            $option.prop('selected', true);
                            that.$menuInner.find('.selected').removeClass('selected').find('a').attr('aria-selected', false);
                            that.setSelected(clickedIndex, true);
                        } else { // Toggle the one we have chosen if we are multi select.
                            $option.prop('selected', !state);
                            that.setSelected(clickedIndex, !state);
                            $this.blur();

                            if (maxOptions !== false || maxOptionsGrp !== false) {
                                var maxReached = maxOptions < $options.filter(':selected').length,
                                    maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

                                if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                                    if (maxOptions && maxOptions == 1) {
                                        $options.prop('selected', false);
                                        $option.prop('selected', true);
                                        that.$menuInner.find('.selected').removeClass('selected');
                                        that.setSelected(clickedIndex, true);
                                    } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                                        $optgroup.find('option:selected').prop('selected', false);
                                        $option.prop('selected', true);
                                        var optgroupID = $this.parent().data('optgroup');
                                        that.$menuInner.find('[data-optgroup="' + optgroupID + '"]').removeClass('selected');
                                        that.setSelected(clickedIndex, true);
                                    } else {
                                        var maxOptionsText = typeof that.options.maxOptionsText === 'string' ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
                                            maxOptionsArr = typeof maxOptionsText === 'function' ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
                                            maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                                            maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                                            $notify = $('<div class="notify"></div>');
                                        // If {var} is set in array, replace it
                                        /** @deprecated */
                                        if (maxOptionsArr[2]) {
                                            maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                                            maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                                        }

                                        $option.prop('selected', false);

                                        that.$menu.append($notify);

                                        if (maxOptions && maxReached) {
                                            $notify.append($('<div>' + maxTxt + '</div>'));
                                            triggerChange = false;
                                            that.$element.trigger('maxReached.bs.select');
                                        }

                                        if (maxOptionsGrp && maxReachedGrp) {
                                            $notify.append($('<div>' + maxTxtGrp + '</div>'));
                                            triggerChange = false;
                                            that.$element.trigger('maxReachedGrp.bs.select');
                                        }

                                        setTimeout(function () {
                                            that.setSelected(clickedIndex, false);
                                        }, 10);

                                        $notify.delay(750).fadeOut(300, function () {
                                            $(this).remove();
                                        });
                                    }
                                }
                            }
                        }

                        if (!that.multiple || (that.multiple && that.options.maxOptions === 1)) {
                            that.$button.focus();
                        } else if (that.options.liveSearch) {
                            that.$searchbox.focus();
                        }

                        // Trigger select 'change'
                        if (triggerChange) {
                            if ((prevValue != that.$element.val() && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
                                // $option.prop('selected') is current option state (selected/unselected). state is previous option state.
                                changed_arguments = [clickedIndex, $option.prop('selected'), state];
                                that.$element
                                    .triggerNative('change');
                            }
                        }
                    }
                });

                this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function (e) {
                    if (e.currentTarget == this) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (that.options.liveSearch && !$(e.target).hasClass('close')) {
                            that.$searchbox.focus();
                        } else {
                            that.$button.focus();
                        }
                    }
                });

                this.$menuInner.on('click', '.divider, .dropdown-header', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (that.options.liveSearch) {
                        that.$searchbox.focus();
                    } else {
                        that.$button.focus();
                    }
                });

                this.$menu.on('click', '.popover-title .close', function () {
                    that.$button.click();
                });

                this.$searchbox.on('click', function (e) {
                    e.stopPropagation();
                });

                this.$menu.on('click', '.actions-btn', function (e) {
                    if (that.options.liveSearch) {
                        that.$searchbox.focus();
                    } else {
                        that.$button.focus();
                    }

                    e.preventDefault();
                    e.stopPropagation();

                    if ($(this).hasClass('bs-select-all')) {
                        that.selectAll();
                    } else {
                        that.deselectAll();
                    }
                });

                this.$element.change(function () {
                    that.render(false);
                    that.$element.trigger('changed.bs.select', changed_arguments);
                    changed_arguments = null;
                });
            },

            liveSearchListener: function () {
                var that = this,
                    $no_results = $('<li class="no-results"></li>');

                this.$button.on('click.dropdown.data-api', function () {
                    that.$menuInner.find('.active').removeClass('active');
                    if (!!that.$searchbox.val()) {
                        that.$searchbox.val('');
                        that.$lis.not('.is-hidden').removeClass('hidden');
                        if (!!$no_results.parent().length) $no_results.remove();
                    }
                    if (!that.multiple) that.$menuInner.find('.selected').addClass('active');
                    setTimeout(function () {
                        that.$searchbox.focus();
                    }, 10);
                });

                this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', function (e) {
                    e.stopPropagation();
                });

                this.$searchbox.on('input propertychange', function () {
                    that.$lis.not('.is-hidden').removeClass('hidden');
                    that.$lis.filter('.active').removeClass('active');
                    $no_results.remove();

                    if (that.$searchbox.val()) {
                        var $searchBase = that.$lis.not('.is-hidden, .divider, .dropdown-header'),
                            $hideItems;
                        if (that.options.liveSearchNormalize) {
                            $hideItems = $searchBase.find('a').not(':a' + that._searchStyle() + '("' + normalizeToBase(that.$searchbox.val()) + '")');
                        } else {
                            $hideItems = $searchBase.find('a').not(':' + that._searchStyle() + '("' + that.$searchbox.val() + '")');
                        }

                        if ($hideItems.length === $searchBase.length) {
                            $no_results.html(that.options.noneResultsText.replace('{0}', '"' + htmlEscape(that.$searchbox.val()) + '"'));
                            that.$menuInner.append($no_results);
                            that.$lis.addClass('hidden');
                        } else {
                            $hideItems.parent().addClass('hidden');

                            var $lisVisible = that.$lis.not('.hidden'),
                                $foundDiv;

                            // hide divider if first or last visible, or if followed by another divider
                            $lisVisible.each(function (index) {
                                var $this = $(this);

                                if ($this.hasClass('divider')) {
                                    if ($foundDiv === undefined) {
                                        $this.addClass('hidden');
                                    } else {
                                        if ($foundDiv) $foundDiv.addClass('hidden');
                                        $foundDiv = $this;
                                    }
                                } else if ($this.hasClass('dropdown-header') && $lisVisible.eq(index + 1).data('optgroup') !== $this.data('optgroup')) {
                                    $this.addClass('hidden');
                                } else {
                                    $foundDiv = null;
                                }
                            });
                            if ($foundDiv) $foundDiv.addClass('hidden');

                            $searchBase.not('.hidden').first().addClass('active');
                        }
                    }
                });
            },

            _searchStyle: function () {
                var styles = {
                    begins: 'ibegins',
                    startsWith: 'ibegins'
                };

                return styles[this.options.liveSearchStyle] || 'icontains';
            },

            val: function (value) {
                if (typeof value !== 'undefined') {
                    this.$element.val(value);
                    this.render();

                    return this.$element;
                } else {
                    return this.$element.val();
                }
            },

            changeAll: function (status) {
                if (!this.multiple) return;
                if (typeof status === 'undefined') status = true;

                this.findLis();

                var $options = this.$element.find('option'),
                    $lisVisible = this.$lis.not('.divider, .dropdown-header, .disabled, .hidden'),
                    lisVisLen = $lisVisible.length,
                    selectedOptions = [];

                if (status) {
                    if ($lisVisible.filter('.selected').length === $lisVisible.length) return;
                } else {
                    if ($lisVisible.filter('.selected').length === 0) return;
                }

                $lisVisible.toggleClass('selected', status);

                for (var i = 0; i < lisVisLen; i++) {
                    var origIndex = $lisVisible[i].getAttribute('data-original-index');
                    selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
                }

                $(selectedOptions).prop('selected', status);

                this.render(false);

                this.togglePlaceholder();

                this.$element
                    .triggerNative('change');
            },

            selectAll: function () {
                return this.changeAll(true);
            },

            deselectAll: function () {
                return this.changeAll(false);
            },

            toggle: function (e) {
                e = e || window.event;

                if (e) e.stopPropagation();

                this.$button.trigger('click');
            },

            keydown: function (e) {
                var $this = $(this),
                    $parent = $this.is('input') ? $this.parent().parent() : $this.parent(),
                    $items,
                    that = $parent.data('this'),
                    index,
                    next,
                    first,
                    last,
                    prev,
                    nextPrev,
                    prevIndex,
                    isActive,
                    selector = ':not(.disabled, .hidden, .dropdown-header, .divider)',
                    keyCodeMap = {
                        32: ' ',
                        48: '0',
                        49: '1',
                        50: '2',
                        51: '3',
                        52: '4',
                        53: '5',
                        54: '6',
                        55: '7',
                        56: '8',
                        57: '9',
                        59: ';',
                        65: 'a',
                        66: 'b',
                        67: 'c',
                        68: 'd',
                        69: 'e',
                        70: 'f',
                        71: 'g',
                        72: 'h',
                        73: 'i',
                        74: 'j',
                        75: 'k',
                        76: 'l',
                        77: 'm',
                        78: 'n',
                        79: 'o',
                        80: 'p',
                        81: 'q',
                        82: 'r',
                        83: 's',
                        84: 't',
                        85: 'u',
                        86: 'v',
                        87: 'w',
                        88: 'x',
                        89: 'y',
                        90: 'z',
                        96: '0',
                        97: '1',
                        98: '2',
                        99: '3',
                        100: '4',
                        101: '5',
                        102: '6',
                        103: '7',
                        104: '8',
                        105: '9'
                    };

                if (that.options.liveSearch) $parent = $this.parent().parent();

                if (that.options.container) $parent = that.$menu;

                $items = $('[role="listbox"] li', $parent);

                isActive = that.$newElement.hasClass('open');

                if (!isActive && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90)) {
                    if (!that.options.container) {
                        that.setSize();
                        that.$menu.parent().addClass('open');
                        isActive = true;
                    } else {
                        that.$button.trigger('click');
                    }
                    that.$searchbox.focus();
                    return;
                }

                if (that.options.liveSearch) {
                    if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        that.$menuInner.click();
                        that.$button.focus();
                    }
                    // $items contains li elements when liveSearch is enabled
                    $items = $('[role="listbox"] li' + selector, $parent);
                    if (!$this.val() && !/(38|40)/.test(e.keyCode.toString(10))) {
                        if ($items.filter('.active').length === 0) {
                            $items = that.$menuInner.find('li');
                            if (that.options.liveSearchNormalize) {
                                $items = $items.filter(':a' + that._searchStyle() + '(' + normalizeToBase(keyCodeMap[e.keyCode]) + ')');
                            } else {
                                $items = $items.filter(':' + that._searchStyle() + '(' + keyCodeMap[e.keyCode] + ')');
                            }
                        }
                    }
                }

                if (!$items.length) return;

                if (/(38|40)/.test(e.keyCode.toString(10))) {
                    index = $items.index($items.find('a').filter(':focus').parent());
                    first = $items.filter(selector).first().index();
                    last = $items.filter(selector).last().index();
                    next = $items.eq(index).nextAll(selector).eq(0).index();
                    prev = $items.eq(index).prevAll(selector).eq(0).index();
                    nextPrev = $items.eq(next).prevAll(selector).eq(0).index();

                    if (that.options.liveSearch) {
                        $items.each(function (i) {
                            if (!$(this).hasClass('disabled')) {
                                $(this).data('index', i);
                            }
                        });
                        index = $items.index($items.filter('.active'));
                        first = $items.first().data('index');
                        last = $items.last().data('index');
                        next = $items.eq(index).nextAll().eq(0).data('index');
                        prev = $items.eq(index).prevAll().eq(0).data('index');
                        nextPrev = $items.eq(next).prevAll().eq(0).data('index');
                    }

                    prevIndex = $this.data('prevIndex');

                    if (e.keyCode == 38) {
                        if (that.options.liveSearch) index--;
                        if (index != nextPrev && index > prev) index = prev;
                        if (index < first) index = first;
                        if (index == prevIndex) index = last;
                    } else if (e.keyCode == 40) {
                        if (that.options.liveSearch) index++;
                        if (index == -1) index = 0;
                        if (index != nextPrev && index < next) index = next;
                        if (index > last) index = last;
                        if (index == prevIndex) index = first;
                    }

                    $this.data('prevIndex', index);

                    if (!that.options.liveSearch) {
                        $items.eq(index).children('a').focus();
                    } else {
                        e.preventDefault();
                        if (!$this.hasClass('dropdown-toggle')) {
                            $items.removeClass('active').eq(index).addClass('active').children('a').focus();
                            $this.focus();
                        }
                    }

                } else if (!$this.is('input')) {
                    var keyIndex = [],
                        count,
                        prevKey;

                    $items.each(function () {
                        if (!$(this).hasClass('disabled')) {
                            if ($.trim($(this).children('a').text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
                                keyIndex.push($(this).index());
                            }
                        }
                    });

                    count = $(document).data('keycount');
                    count++;
                    $(document).data('keycount', count);

                    prevKey = $.trim($(':focus').text().toLowerCase()).substring(0, 1);

                    if (prevKey != keyCodeMap[e.keyCode]) {
                        count = 1;
                        $(document).data('keycount', count);
                    } else if (count >= keyIndex.length) {
                        $(document).data('keycount', 0);
                        if (count > keyIndex.length) count = 1;
                    }

                    $items.eq(keyIndex[count - 1]).children('a').focus();
                }

                // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
                if ((/(13|32)/.test(e.keyCode.toString(10)) || (/(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab)) && isActive) {
                    if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
                    if (!that.options.liveSearch) {
                        var elem = $(':focus');
                        elem.click();
                        // Bring back focus for multiselects
                        elem.focus();
                        // Prevent screen from scrolling if the user hit the spacebar
                        e.preventDefault();
                        // Fixes spacebar selection of dropdown items in FF & IE
                        $(document).data('spaceSelect', true);
                    } else if (!/(32)/.test(e.keyCode.toString(10))) {
                        that.$menuInner.find('.active a').click();
                        $this.focus();
                    }
                    $(document).data('keycount', 0);
                }

                if ((/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch)) || (/(27)/.test(e.keyCode.toString(10)) && !isActive)) {
                    that.$menu.parent().removeClass('open');
                    if (that.options.container) that.$newElement.removeClass('open');
                    that.$button.focus();
                }
            },

            mobile: function () {
                this.$element.addClass('mobile-device');
            },

            refresh: function () {
                this.$lis = null;
                this.liObj = {};
                this.reloadLi();
                this.render();
                this.checkDisabled();
                this.liHeight(true);
                this.setStyle();
                this.setWidth();
                if (this.$lis) this.$searchbox.trigger('propertychange');

                this.$element.trigger('refreshed.bs.select');
            },

            hide: function () {
                this.$newElement.hide();
            },

            show: function () {
                this.$newElement.show();
            },

            remove: function () {
                this.$newElement.remove();
                this.$element.remove();
            },

            destroy: function () {
                this.$newElement.before(this.$element).remove();

                if (this.$bsContainer) {
                    this.$bsContainer.remove();
                } else {
                    this.$menu.remove();
                }

                this.$element
                    .off('.bs.select')
                    .removeData('selectpicker')
                    .removeClass('bs-select-hidden selectpicker');
            }
        };

        // SELECTPICKER PLUGIN DEFINITION
        // ==============================
        function Plugin(option) {
            // get the args of the outer function..
            var args = arguments;
            // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
            // to get lost/corrupted in android 2.3 and IE9 #715 #775
            var _option = option;

            [].shift.apply(args);

            var value;
            var chain = this.each(function () {
                var $this = $(this);
                if ($this.is('select')) {
                    var data = $this.data('selectpicker'),
                        options = typeof _option == 'object' && _option;

                    if (!data) {
                        var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
                        config.template = $.extend({}, Selectpicker.DEFAULTS.template, ($.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}), $this.data().template, options.template);
                        $this.data('selectpicker', (data = new Selectpicker(this, config)));
                    } else if (options) {
                        for (var i in options) {
                            if (options.hasOwnProperty(i)) {
                                data.options[i] = options[i];
                            }
                        }
                    }

                    if (typeof _option == 'string') {
                        if (data[_option] instanceof Function) {
                            value = data[_option].apply(data, args);
                        } else {
                            value = data.options[_option];
                        }
                    }
                }
            });

            if (typeof value !== 'undefined') {
                //noinspection JSUnusedAssignment
                return value;
            } else {
                return chain;
            }
        }

        var old = $.fn.selectpicker;
        $.fn.selectpicker = Plugin;
        $.fn.selectpicker.Constructor = Selectpicker;

        // SELECTPICKER NO CONFLICT
        // ========================
        $.fn.selectpicker.noConflict = function () {
            $.fn.selectpicker = old;
            return this;
        };

        $(document)
            .data('keycount', 0)
            .on('keydown.bs.select', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', Selectpicker.prototype.keydown)
            .on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function (e) {
                e.stopPropagation();
            });

        // SELECTPICKER DATA-API
        // =====================
        $(window).on('load.bs.select.data-api', function () {
            $('.selectpicker').each(function () {
                var $selectpicker = $(this);
                Plugin.call($selectpicker, $selectpicker.data());
            })
        });
    })(jQuery);


}));

(function ($) {
    "use strict";

    var defaultOptions = {
        tagClass: function (item) {
            return 'label label-info';
        },
        focusClass: 'focus',
        itemValue: function (item) {
            return item ? item.toString() : item;
        },
        itemText: function (item) {
            return this.itemValue(item);
        },
        itemTitle: function (item) {
            return null;
        },
        freeInput: true,
        addOnBlur: true,
        maxTags: undefined,
        maxChars: undefined,
        confirmKeys: [13, 44],
        delimiter: ',',
        delimiterRegex: null,
        cancelConfirmKeysOnEmpty: false,
        onTagExists: function (item, $tag) {
            $tag.hide().fadeIn();
        },
        trimValue: false,
        allowDuplicates: false,
        triggerChange: true
    };

    /**
     * Constructor function
     */
    function TagsInput(element, options) {
        this.isInit = true;
        this.itemsArray = [];

        this.$element = $(element);
        this.$element.hide();

        this.isSelect = (element.tagName === 'SELECT');
        this.multiple = (this.isSelect && element.hasAttribute('multiple'));
        this.objectItems = options && options.itemValue;
        this.placeholderText = element.hasAttribute('placeholder') ? this.$element.attr('placeholder') : '';
        this.inputSize = Math.max(1, this.placeholderText.length);

        this.$container = $('<div class="bootstrap-tagsinput"></div>');
        this.$input = $('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container);

        this.$element.before(this.$container);

        this.build(options);
        this.isInit = false;
    }

    TagsInput.prototype = {
        constructor: TagsInput,

        /**
         * Adds the given item as a new tag. Pass true to dontPushVal to prevent
         * updating the elements val()
         */
        add: function (item, dontPushVal, options) {
            var self = this;

            if (self.options.maxTags && self.itemsArray.length >= self.options.maxTags)
                return;

            // Ignore falsey values, except false
            if (item !== false && !item)
                return;

            // Trim value
            if (typeof item === "string" && self.options.trimValue) {
                item = $.trim(item);
            }

            // Throw an error when trying to add an object while the itemValue option was not set
            if (typeof item === "object" && !self.objectItems)
                throw ("Can't add objects when itemValue option is not set");

            // Ignore strings only containg whitespace
            if (item.toString().match(/^\s*$/))
                return;

            // If SELECT but not multiple, remove current tag
            if (self.isSelect && !self.multiple && self.itemsArray.length > 0)
                self.remove(self.itemsArray[0]);

            if (typeof item === "string" && this.$element[0].tagName === 'INPUT') {
                var delimiter = (self.options.delimiterRegex) ? self.options.delimiterRegex : self.options.delimiter;
                var items = item.split(delimiter);
                if (items.length > 1) {
                    for (var i = 0; i < items.length; i++) {
                        this.add(items[i], true);
                    }

                    if (!dontPushVal)
                        self.pushVal(self.options.triggerChange);
                    return;
                }
            }

            var itemValue = self.options.itemValue(item),
                itemText = self.options.itemText(item),
                tagClass = self.options.tagClass(item),
                itemTitle = self.options.itemTitle(item);

            // Ignore items allready added
            var existing = $.grep(self.itemsArray, function (item) { return self.options.itemValue(item) === itemValue; })[0];
            if (existing && !self.options.allowDuplicates) {
                // Invoke onTagExists
                if (self.options.onTagExists) {
                    var $existingTag = $(".tag", self.$container).filter(function () { return $(this).data("item") === existing; });
                    self.options.onTagExists(item, $existingTag);
                }
                return;
            }

            // if length greater than limit
            if (self.items().toString().length + item.length + 1 > self.options.maxInputLength)
                return;

            // raise beforeItemAdd arg
            var beforeItemAddEvent = $.Event('beforeItemAdd', { item: item, cancel: false, options: options });
            self.$element.trigger(beforeItemAddEvent);
            if (beforeItemAddEvent.cancel)
                return;

            // register item in internal array and map
            self.itemsArray.push(item);

            // add a tag element

            var $tag = $('<span class="tag ' + htmlEncode(tagClass) + (itemTitle !== null ? ('" title="' + itemTitle) : '') + '">' + htmlEncode(itemText) + '<span data-role="remove"></span></span>');
            $tag.data('item', item);
            self.findInputWrapper().before($tag);
            $tag.after(' ');

            // Check to see if the tag exists in its raw or uri-encoded form
            var optionExists = (
                $('option[value="' + encodeURIComponent(itemValue) + '"]', self.$element).length ||
                $('option[value="' + htmlEncode(itemValue) + '"]', self.$element).length
            );

            // add <option /> if item represents a value not present in one of the <select />'s options
            if (self.isSelect && !optionExists) {
                var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
                $option.data('item', item);
                $option.attr('value', itemValue);
                self.$element.append($option);
            }

            if (!dontPushVal)
                self.pushVal(self.options.triggerChange);

            // Add class when reached maxTags
            if (self.options.maxTags === self.itemsArray.length || self.items().toString().length === self.options.maxInputLength)
                self.$container.addClass('bootstrap-tagsinput-max');

            // If using typeahead, once the tag has been added, clear the typeahead value so it does not stick around in the input.
            if ($('.typeahead, .twitter-typeahead', self.$container).length) {
                self.$input.typeahead('val', '');
            }

            if (this.isInit) {
                self.$element.trigger($.Event('itemAddedOnInit', { item: item, options: options }));
            } else {
                self.$element.trigger($.Event('itemAdded', { item: item, options: options }));
            }
        },

        /**
         * Removes the given item. Pass true to dontPushVal to prevent updating the
         * elements val()
         */
        remove: function (item, dontPushVal, options) {
            var self = this;

            if (self.objectItems) {
                if (typeof item === "object")
                    item = $.grep(self.itemsArray, function (other) { return self.options.itemValue(other) == self.options.itemValue(item); });
                else
                    item = $.grep(self.itemsArray, function (other) { return self.options.itemValue(other) == item; });

                item = item[item.length - 1];
            }

            if (item) {
                var beforeItemRemoveEvent = $.Event('beforeItemRemove', { item: item, cancel: false, options: options });
                self.$element.trigger(beforeItemRemoveEvent);
                if (beforeItemRemoveEvent.cancel)
                    return;

                $('.tag', self.$container).filter(function () { return $(this).data('item') === item; }).remove();
                $('option', self.$element).filter(function () { return $(this).data('item') === item; }).remove();
                if ($.inArray(item, self.itemsArray) !== -1)
                    self.itemsArray.splice($.inArray(item, self.itemsArray), 1);
            }

            if (!dontPushVal)
                self.pushVal(self.options.triggerChange);

            // Remove class when reached maxTags
            if (self.options.maxTags > self.itemsArray.length)
                self.$container.removeClass('bootstrap-tagsinput-max');

            self.$element.trigger($.Event('itemRemoved', { item: item, options: options }));
        },

        /**
         * Removes all items
         */
        removeAll: function () {
            var self = this;

            $('.tag', self.$container).remove();
            $('option', self.$element).remove();

            while (self.itemsArray.length > 0)
                self.itemsArray.pop();

            self.pushVal(self.options.triggerChange);
        },

        /**
         * Refreshes the tags so they match the text/value of their corresponding
         * item.
         */
        refresh: function () {
            var self = this;
            $('.tag', self.$container).each(function () {
                var $tag = $(this),
                    item = $tag.data('item'),
                    itemValue = self.options.itemValue(item),
                    itemText = self.options.itemText(item),
                    tagClass = self.options.tagClass(item);

                // Update tag's class and inner text
                $tag.attr('class', null);
                $tag.addClass('tag ' + htmlEncode(tagClass));
                $tag.contents().filter(function () {
                    return this.nodeType == 3;
                })[0].nodeValue = htmlEncode(itemText);

                if (self.isSelect) {
                    var option = $('option', self.$element).filter(function () { return $(this).data('item') === item; });
                    option.attr('value', itemValue);
                }
            });
        },

        /**
         * Returns the items added as tags
         */
        items: function () {
            return this.itemsArray;
        },

        /**
         * Assembly value by retrieving the value of each item, and set it on the
         * element.
         */
        pushVal: function () {
            var self = this,
                val = $.map(self.items(), function (item) {
                    return self.options.itemValue(item).toString();
                });

            self.$element.val(val, true);

            if (self.options.triggerChange)
                self.$element.trigger('change');
        },

        /**
         * Initializes the tags input behaviour on the element
         */
        build: function (options) {
            var self = this;

            self.options = $.extend({}, defaultOptions, options);
            // When itemValue is set, freeInput should always be false
            if (self.objectItems)
                self.options.freeInput = false;

            makeOptionItemFunction(self.options, 'itemValue');
            makeOptionItemFunction(self.options, 'itemText');
            makeOptionFunction(self.options, 'tagClass');

            // Typeahead Bootstrap version 2.3.2
            if (self.options.typeahead) {
                var typeahead = self.options.typeahead || {};

                makeOptionFunction(typeahead, 'source');

                self.$input.typeahead($.extend({}, typeahead, {
                    source: function (query, process) {
                        function processItems(items) {
                            var texts = [];

                            for (var i = 0; i < items.length; i++) {
                                var text = self.options.itemText(items[i]);
                                map[text] = items[i];
                                texts.push(text);
                            }
                            process(texts);
                        }

                        this.map = {};
                        var map = this.map,
                            data = typeahead.source(query);

                        if ($.isFunction(data.success)) {
                            // support for Angular callbacks
                            data.success(processItems);
                        } else if ($.isFunction(data.then)) {
                            // support for Angular promises
                            data.then(processItems);
                        } else {
                            // support for functions and jquery promises
                            $.when(data)
                                .then(processItems);
                        }
                    },
                    updater: function (text) {
                        self.add(this.map[text]);
                        return this.map[text];
                    },
                    matcher: function (text) {
                        return (text.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1);
                    },
                    sorter: function (texts) {
                        return texts.sort();
                    },
                    highlighter: function (text) {
                        var regex = new RegExp('(' + this.query + ')', 'gi');
                        return text.replace(regex, "<strong>$1</strong>");
                    }
                }));
            }

            // typeahead.js
            if (self.options.typeaheadjs) {

                // Determine if main configurations were passed or simply a dataset
                var typeaheadjs = self.options.typeaheadjs;
                if (!$.isArray(typeaheadjs)) {
                    typeaheadjs = [null, typeaheadjs];
                }
                var valueKey = typeaheadjs[1].valueKey; // We should test typeaheadjs.size >= 1
                var f_datum = valueKey ? function (datum) { return datum[valueKey]; }
                    : function (datum) { return datum; }
                $.fn.typeahead.apply(self.$input, typeaheadjs).on('typeahead:selected', $.proxy(function (obj, datum) {
                    self.add(f_datum(datum));
                    self.$input.typeahead('val', '');
                }, self));

            }

            self.$container.on('click', $.proxy(function (event) {
                if (!self.$element.attr('disabled')) {
                    self.$input.removeAttr('disabled');
                }
                self.$input.focus();
            }, self));

            if (self.options.addOnBlur && self.options.freeInput) {
                self.$input.on('focusout', $.proxy(function (event) {
                    // HACK: only process on focusout when no typeahead opened, to
                    //       avoid adding the typeahead text as tag
                    if ($('.typeahead, .twitter-typeahead', self.$container).length === 0) {
                        self.add(self.$input.val());
                        self.$input.val('');
                    }
                }, self));
            }

            // Toggle the 'focus' css class on the container when it has focus
            self.$container.on({
                focusin: function () {
                    self.$container.addClass(self.options.focusClass);
                },
                focusout: function () {
                    self.$container.removeClass(self.options.focusClass);
                },
            });

            self.$container.on('keydown', 'input', $.proxy(function (event) {
                var $input = $(event.target),
                    $inputWrapper = self.findInputWrapper();

                if (self.$element.attr('disabled')) {
                    self.$input.attr('disabled', 'disabled');
                    return;
                }

                switch (event.which) {
                    // BACKSPACE
                    case 8:
                        if (doGetCaretPosition($input[0]) === 0) {
                            var prev = $inputWrapper.prev();
                            if (prev.length) {
                                self.remove(prev.data('item'));
                            }
                        }
                        break;

                    // DELETE
                    case 46:
                        if (doGetCaretPosition($input[0]) === 0) {
                            var next = $inputWrapper.next();
                            if (next.length) {
                                self.remove(next.data('item'));
                            }
                        }
                        break;

                    // LEFT ARROW
                    case 37:
                        // Try to move the input before the previous tag
                        var $prevTag = $inputWrapper.prev();
                        if ($input.val().length === 0 && $prevTag[0]) {
                            $prevTag.before($inputWrapper);
                            $input.focus();
                        }
                        break;
                    // RIGHT ARROW
                    case 39:
                        // Try to move the input after the next tag
                        var $nextTag = $inputWrapper.next();
                        if ($input.val().length === 0 && $nextTag[0]) {
                            $nextTag.after($inputWrapper);
                            $input.focus();
                        }
                        break;
                    default:
                    // ignore
                }

                // Reset internal input's size
                var textLength = $input.val().length,
                    wordSpace = Math.ceil(textLength / 5),
                    size = textLength + wordSpace + 1;
                $input.attr('size', Math.max(this.inputSize, $input.val().length));
            }, self));

            self.$container.on('keypress', 'input', $.proxy(function (event) {
                var $input = $(event.target);

                if (self.$element.attr('disabled')) {
                    self.$input.attr('disabled', 'disabled');
                    return;
                }

                var text = $input.val(),
                    maxLengthReached = self.options.maxChars && text.length >= self.options.maxChars;
                if (self.options.freeInput && (keyCombinationInList(event, self.options.confirmKeys) || maxLengthReached)) {
                    // Only attempt to add a tag if there is data in the field
                    if (text.length !== 0) {
                        self.add(maxLengthReached ? text.substr(0, self.options.maxChars) : text);
                        $input.val('');
                    }

                    // If the field is empty, let the event triggered fire as usual
                    if (self.options.cancelConfirmKeysOnEmpty === false) {
                        event.preventDefault();
                    }
                }

                // Reset internal input's size
                var textLength = $input.val().length,
                    wordSpace = Math.ceil(textLength / 5),
                    size = textLength + wordSpace + 1;
                $input.attr('size', Math.max(this.inputSize, $input.val().length));
            }, self));

            // Remove icon clicked
            self.$container.on('click', '[data-role=remove]', $.proxy(function (event) {
                if (self.$element.attr('disabled')) {
                    return;
                }
                self.remove($(event.target).closest('.tag').data('item'));
            }, self));

            // Only add existing value as tags when using strings as tags
            if (self.options.itemValue === defaultOptions.itemValue) {
                if (self.$element[0].tagName === 'INPUT') {
                    self.add(self.$element.val());
                } else {
                    $('option', self.$element).each(function () {
                        self.add($(this).attr('value'), true);
                    });
                }
            }
        },

        /**
         * Removes all tagsinput behaviour and unregsiter all event handlers
         */
        destroy: function () {
            var self = this;

            // Unbind events
            self.$container.off('keypress', 'input');
            self.$container.off('click', '[role=remove]');

            self.$container.remove();
            self.$element.removeData('tagsinput');
            self.$element.show();
        },

        /**
         * Sets focus on the tagsinput
         */
        focus: function () {
            this.$input.focus();
        },

        /**
         * Returns the internal input element
         */
        input: function () {
            return this.$input;
        },

        /**
         * Returns the element which is wrapped around the internal input. This
         * is normally the $container, but typeahead.js moves the $input element.
         */
        findInputWrapper: function () {
            var elt = this.$input[0],
                container = this.$container[0];
            while (elt && elt.parentNode !== container)
                elt = elt.parentNode;

            return $(elt);
        }
    };

    /**
     * Register JQuery plugin
     */
    $.fn.tagsinput = function (arg1, arg2, arg3) {
        var results = [];

        this.each(function () {
            var tagsinput = $(this).data('tagsinput');
            // Initialize a new tags input
            if (!tagsinput) {
                tagsinput = new TagsInput(this, arg1);
                $(this).data('tagsinput', tagsinput);
                results.push(tagsinput);

                if (this.tagName === 'SELECT') {
                    $('option', $(this)).attr('selected', 'selected');
                }

                // Init tags from $(this).val()
                $(this).val($(this).val());
            } else if (!arg1 && !arg2) {
                // tagsinput already exists
                // no function, trying to init
                results.push(tagsinput);
            } else if (tagsinput[arg1] !== undefined) {
                // Invoke function on existing tags input
                if (tagsinput[arg1].length === 3 && arg3 !== undefined) {
                    var retVal = tagsinput[arg1](arg2, null, arg3);
                } else {
                    var retVal = tagsinput[arg1](arg2);
                }
                if (retVal !== undefined)
                    results.push(retVal);
            }
        });

        if (typeof arg1 == 'string') {
            // Return the results from the invoked function calls
            return results.length > 1 ? results : results[0];
        } else {
            return results;
        }
    };

    $.fn.tagsinput.Constructor = TagsInput;

    /**
     * Most options support both a string or number as well as a function as
     * option value. This function makes sure that the option with the given
     * key in the given options is wrapped in a function
     */
    function makeOptionItemFunction(options, key) {
        if (typeof options[key] !== 'function') {
            var propertyName = options[key];
            options[key] = function (item) { return item[propertyName]; };
        }
    }
    function makeOptionFunction(options, key) {
        if (typeof options[key] !== 'function') {
            var value = options[key];
            options[key] = function () { return value; };
        }
    }
    /**
     * HtmlEncodes the given value
     */
    var htmlEncodeContainer = $('<div />');
    function htmlEncode(value) {
        if (value) {
            return htmlEncodeContainer.text(value).html();
        } else {
            return '';
        }
    }

    /**
     * Returns the position of the caret in the given input field
     * http://flightschool.acylt.com/devnotes/caret-position-woes/
     */
    function doGetCaretPosition(oField) {
        var iCaretPos = 0;
        if (document.selection) {
            oField.focus();
            var oSel = document.selection.createRange();
            oSel.moveStart('character', -oField.value.length);
            iCaretPos = oSel.text.length;
        } else if (oField.selectionStart || oField.selectionStart == '0') {
            iCaretPos = oField.selectionStart;
        }
        return (iCaretPos);
    }

    /**
      * Returns boolean indicates whether user has pressed an expected key combination.
      * @param object keyPressEvent: JavaScript event object, refer
      *     http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
      * @param object lookupList: expected key combinations, as in:
      *     [13, {which: 188, shiftKey: true}]
      */
    function keyCombinationInList(keyPressEvent, lookupList) {
        var found = false;
        $.each(lookupList, function (index, keyCombination) {
            if (typeof (keyCombination) === 'number' && keyPressEvent.which === keyCombination) {
                found = true;
                return false;
            }

            if (keyPressEvent.which === keyCombination.which) {
                var alt = !keyCombination.hasOwnProperty('altKey') || keyPressEvent.altKey === keyCombination.altKey,
                    shift = !keyCombination.hasOwnProperty('shiftKey') || keyPressEvent.shiftKey === keyCombination.shiftKey,
                    ctrl = !keyCombination.hasOwnProperty('ctrlKey') || keyPressEvent.ctrlKey === keyCombination.ctrlKey;
                if (alt && shift && ctrl) {
                    found = true;
                    return false;
                }
            }
        });

        return found;
    }

    /**
     * Initialize tagsinput behaviour on inputs and selects which have
     * data-role=tagsinput
     */
    $(function () {
        $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
    });
})(window.jQuery);

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    // Create the defaults once
    var defaults = {
        element: 'body',
        position: null,
        type: "info",
        allow_dismiss: true,
        allow_duplicates: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="material-icons">close</i></button><i data-notify="icon" class="material-icons"></i><span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    };

    String.format = function () {
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
        }
        return str;
    };

    function isDuplicateNotification(notification) {
        var isDupe = false;

        $('[data-notify="container"]').each(function (i, el) {
            var $el = $(el);
            var title = $el.find('[data-notify="title"]').text().trim();
            var message = $el.find('[data-notify="message"]').html().trim();

            // The input string might be different than the actual parsed HTML string!
            // (<br> vs <br /> for example)
            // So we have to force-parse this as HTML here!
            var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
            var isSameMsg = message === $("<div>" + notification.settings.content.message + "</div>").html().trim();
            var isSameType = $el.hasClass('alert-' + notification.settings.type);

            if (isSameTitle && isSameMsg && isSameType) {
                //we found the dupe. Set the var and stop checking.
                isDupe = true;
            }
            return !isDupe;
        });

        return isDupe;
    }

    function Notify(element, content, options) {
        // Setup Content of Notify
        var contentObj = {
            content: {
                message: typeof content === 'object' ? content.message : content,
                title: content.title ? content.title : '',
                icon: content.icon ? content.icon : '',
                url: content.url ? content.url : '#',
                target: content.target ? content.target : '-'
            }
        };

        options = $.extend(true, {}, contentObj, options);
        this.settings = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        if (this.settings.content.target === "-") {
            this.settings.content.target = this.settings.url_target;
        }
        this.animations = {
            start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
            end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
        };

        if (typeof this.settings.offset === 'number') {
            this.settings.offset = {
                x: this.settings.offset,
                y: this.settings.offset
            };
        }

        //if duplicate messages are not allowed, then only continue if this new message is not a duplicate of one that it already showing
        if (this.settings.allow_duplicates || (!this.settings.allow_duplicates && !isDuplicateNotification(this))) {
            this.init();
        }
    }

    $.extend(Notify.prototype, {
        init: function () {
            var self = this;

            this.buildNotify();
            if (this.settings.content.icon) {
                this.setIcon();
            }
            if (this.settings.content.url != "#") {
                this.styleURL();
            }
            this.styleDismiss();
            this.placement();
            this.bind();

            this.notify = {
                $ele: this.$ele,
                update: function (command, update) {
                    var commands = {};
                    if (typeof command === "string") {
                        commands[command] = update;
                    } else {
                        commands = command;
                    }
                    for (var cmd in commands) {
                        switch (cmd) {
                            case "type":
                                this.$ele.removeClass('alert-' + self.settings.type);
                                this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
                                self.settings.type = commands[cmd];
                                this.$ele.addClass('alert-' + commands[cmd]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[cmd]);
                                break;
                            case "icon":
                                var $icon = this.$ele.find('[data-notify="icon"]');
                                if (self.settings.icon_type.toLowerCase() === 'class') {
                                    $icon.html(commands[cmd]);
                                } else {
                                    if (!$icon.is('img')) {
                                        $icon.find('img');
                                    }
                                    $icon.attr('src', commands[cmd]);
                                }
                                break;
                            case "progress":
                                var newDelay = self.settings.delay - (self.settings.delay * (commands[cmd] / 100));
                                this.$ele.data('notify-delay', newDelay);
                                this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
                                break;
                            case "url":
                                this.$ele.find('[data-notify="url"]').attr('href', commands[cmd]);
                                break;
                            case "target":
                                this.$ele.find('[data-notify="url"]').attr('target', commands[cmd]);
                                break;
                            default:
                                this.$ele.find('[data-notify="' + cmd + '"]').html(commands[cmd]);
                        }
                    }
                    var posX = this.$ele.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y);
                    self.reposition(posX);
                },
                close: function () {
                    self.close();
                }
            };

        },
        buildNotify: function () {
            var content = this.settings.content;
            this.$ele = $(String.format(this.settings.template, this.settings.type, content.title, content.message, content.url, content.target));
            this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
            if (!this.settings.allow_dismiss) {
                this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
            }
            if ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) {
                this.$ele.find('[data-notify="progressbar"]').remove();
            }
        },
        setIcon: function () {

            this.$ele.addClass('alert-with-icon');

            if (this.settings.icon_type.toLowerCase() === 'class') {
                this.$ele.find('[data-notify="icon"]').html(this.settings.content.icon);
            } else {
                if (this.$ele.find('[data-notify="icon"]').is('img')) {
                    this.$ele.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
                } else {
                    this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
                }
            }
        },
        styleDismiss: function () {
            this.$ele.find('[data-notify="dismiss"]').css({
                position: 'absolute',
                right: '10px',
                top: '50%',
                marginTop: '-9px',
                zIndex: this.settings.z_index + 2
            });
        },
        styleURL: function () {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: this.settings.z_index + 1
            });
        },
        placement: function () {
            var self = this,
                offsetAmt = this.settings.offset.y,
                css = {
                    display: 'inline-block',
                    margin: '15px auto',
                    position: this.settings.position ? this.settings.position : (this.settings.element === 'body' ? 'fixed' : 'absolute'),
                    transition: 'all .5s ease-in-out',
                    zIndex: this.settings.z_index
                },
                hasAnimation = false,
                settings = this.settings;

            $('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) + parseInt($(this).outerHeight()) + parseInt(settings.spacing));
            });
            if (this.settings.newest_on_top === true) {
                offsetAmt = this.settings.offset.y;
            }
            css[this.settings.placement.from] = offsetAmt + 'px';

            switch (this.settings.placement.align) {
                case "left":
                case "right":
                    css[this.settings.placement.align] = this.settings.offset.x + 'px';
                    break;
                case "center":
                    css.left = 0;
                    css.right = 0;
                    break;
            }
            this.$ele.css(css).addClass(this.settings.animate.enter);
            $.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function (index, prefix) {
                self.$ele[0].style[prefix + 'AnimationIterationCount'] = 1;
            });

            $(this.settings.element).append(this.$ele);

            if (this.settings.newest_on_top === true) {
                offsetAmt = (parseInt(offsetAmt) + parseInt(this.settings.spacing)) + this.$ele.outerHeight();
                this.reposition(offsetAmt);
            }

            if ($.isFunction(self.settings.onShow)) {
                self.settings.onShow.call(this.$ele);
            }

            this.$ele.one(this.animations.start, function () {
                hasAnimation = true;
            }).one(this.animations.end, function () {
                if ($.isFunction(self.settings.onShown)) {
                    self.settings.onShown.call(this);
                }
            });

            setTimeout(function () {
                if (!hasAnimation) {
                    if ($.isFunction(self.settings.onShown)) {
                        self.settings.onShown.call(this);
                    }
                }
            }, 600);
        },
        bind: function () {
            var self = this;

            this.$ele.find('[data-notify="dismiss"]').on('click', function () {
                self.close();
            });

            this.$ele.mouseover(function () {
                $(this).data('data-hover', "true");
            }).mouseout(function () {
                $(this).data('data-hover', "false");
            });
            this.$ele.data('data-hover', "false");

            if (this.settings.delay > 0) {
                self.$ele.data('notify-delay', self.settings.delay);
                var timer = setInterval(function () {
                    var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
                    if ((self.$ele.data('data-hover') === 'false' && self.settings.mouse_over === "pause") || self.settings.mouse_over != "pause") {
                        var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
                        self.$ele.data('notify-delay', delay);
                        self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
                    }
                    if (delay <= -(self.settings.timer)) {
                        clearInterval(timer);
                        self.close();
                    }
                }, self.settings.timer);
            }
        },
        close: function () {
            var self = this,
                posX = parseInt(this.$ele.css(this.settings.placement.from)),
                hasAnimation = false;

            this.$ele.data('closing', 'true').addClass(this.settings.animate.exit);
            self.reposition(posX);

            if ($.isFunction(self.settings.onClose)) {
                self.settings.onClose.call(this.$ele);
            }

            this.$ele.one(this.animations.start, function () {
                hasAnimation = true;
            }).one(this.animations.end, function () {
                $(this).remove();
                if ($.isFunction(self.settings.onClosed)) {
                    self.settings.onClosed.call(this);
                }
            });

            setTimeout(function () {
                if (!hasAnimation) {
                    self.$ele.remove();
                    if (self.settings.onClosed) {
                        self.settings.onClosed(self.$ele);
                    }
                }
            }, 600);
        },
        reposition: function (posX) {
            var self = this,
                notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])',
                $elements = this.$ele.nextAll(notifies);
            if (this.settings.newest_on_top === true) {
                $elements = this.$ele.prevAll(notifies);
            }
            $elements.each(function () {
                $(this).css(self.settings.placement.from, posX);
                posX = (parseInt(posX) + parseInt(self.settings.spacing)) + $(this).outerHeight();
            });
        }
    });

    $.notify = function (content, options) {
        var plugin = new Notify(this, content, options);
        return plugin.notify;
    };
    $.notifyDefaults = function (options) {
        defaults = $.extend(true, {}, defaults, options);
        return defaults;
    };
    $.notifyClose = function (command) {
        if (typeof command === "undefined" || command === "all") {
            $('[data-notify]').find('[data-notify="dismiss"]').trigger('click');
        } else {
            $('[data-notify-position="' + command + '"]').find('[data-notify="dismiss"]').trigger('click');
        }
    };

}));
