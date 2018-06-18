!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('puppeteer')))
    : 'function' == typeof define && define.amd
      ? define(['puppeteer'], t)
      : 'object' == typeof exports
        ? (exports['@pdfator/core'] = t(require('puppeteer')))
        : (e['@pdfator/core'] = t(e[void 0]));
})(global, function(e) {
  return (function(e) {
    var t = {};
    function r(n) {
      if (t[n]) return t[n].exports;
      var o = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (r.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (r.t = function(e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var o in e)
            r.d(
              n,
              o,
              function(t) {
                return e[t];
              }.bind(null, o)
            );
        return n;
      }),
      (r.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return r.d(t, 'a', t), t;
      }),
      (r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ''),
      r((r.s = 3))
    );
  })([
    function(e, t) {
      e.exports = require('path');
    },
    function(t, r) {
      t.exports = e;
    },
    function(e, t, r) {
      'use strict';
      var n =
          (this && this.__assign) ||
          Object.assign ||
          function(e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
              for (var o in (t = arguments[r]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          },
        o =
          (this && this.__awaiter) ||
          function(e, t, r, n) {
            return new (r || (r = Promise))(function(o, u) {
              function i(e) {
                try {
                  c(n.next(e));
                } catch (e) {
                  u(e);
                }
              }
              function a(e) {
                try {
                  c(n.throw(e));
                } catch (e) {
                  u(e);
                }
              }
              function c(e) {
                e.done
                  ? o(e.value)
                  : new r(function(t) {
                      t(e.value);
                    }).then(i, a);
              }
              c((n = n.apply(e, t || [])).next());
            });
          },
        u =
          (this && this.__generator) ||
          function(e, t) {
            var r,
              n,
              o,
              u,
              i = {
                label: 0,
                sent: function() {
                  if (1 & o[0]) throw o[1];
                  return o[1];
                },
                trys: [],
                ops: []
              };
            return (
              (u = { next: a(0), throw: a(1), return: a(2) }),
              'function' == typeof Symbol &&
                (u[Symbol.iterator] = function() {
                  return this;
                }),
              u
            );
            function a(u) {
              return function(a) {
                return (function(u) {
                  if (r) throw new TypeError('Generator is already executing.');
                  for (; i; )
                    try {
                      if (
                        ((r = 1),
                        n &&
                          (o =
                            2 & u[0]
                              ? n.return
                              : u[0]
                                ? n.throw || ((o = n.return) && o.call(n), 0)
                                : n.next) &&
                          !(o = o.call(n, u[1])).done)
                      )
                        return o;
                      switch (((n = 0), o && (u = [2 & u[0], o.value]), u[0])) {
                        case 0:
                        case 1:
                          o = u;
                          break;
                        case 4:
                          return i.label++, { value: u[1], done: !1 };
                        case 5:
                          i.label++, (n = u[1]), (u = [0]);
                          continue;
                        case 7:
                          (u = i.ops.pop()), i.trys.pop();
                          continue;
                        default:
                          if (
                            !(o = (o = i.trys).length > 0 && o[o.length - 1]) &&
                            (6 === u[0] || 2 === u[0])
                          ) {
                            i = 0;
                            continue;
                          }
                          if (
                            3 === u[0] &&
                            (!o || (u[1] > o[0] && u[1] < o[3]))
                          ) {
                            i.label = u[1];
                            break;
                          }
                          if (6 === u[0] && i.label < o[1]) {
                            (i.label = o[1]), (o = u);
                            break;
                          }
                          if (o && i.label < o[2]) {
                            (i.label = o[2]), i.ops.push(u);
                            break;
                          }
                          o[2] && i.ops.pop(), i.trys.pop();
                          continue;
                      }
                      u = t.call(e, i);
                    } catch (e) {
                      (u = [6, e]), (n = 0);
                    } finally {
                      r = o = 0;
                    }
                  if (5 & u[0]) throw u[1];
                  return { value: u[0] ? u[1] : void 0, done: !0 };
                })([u, a]);
              };
            }
          };
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(1),
        a = r(0);
      t.convert = function(e) {
        var t = e.url,
          r = e.outputFile,
          c = e.format;
        return o(this, void 0, void 0, function() {
          var e, o, l, f;
          return u(this, function(u) {
            switch (u.label) {
              case 0:
                return [4, i.launch()];
              case 1:
                return [4, (e = u.sent()).newPage()];
              case 2:
                return [4, (o = u.sent()).emulateMedia('screen')];
              case 3:
                return u.sent(), [4, o.goto(t, { waitUntil: 'networkidle2' })];
              case 4:
                return (
                  u.sent(),
                  (l = { path: r }),
                  '.pdf' !== (f = a.extname(r))
                    ? [3, 6]
                    : [
                        4,
                        o.pdf(
                          n({}, l, {
                            format: c,
                            printBackground: !0,
                            scale: 0.78,
                            margin: {
                              top: '0',
                              right: '0',
                              bottom: '0',
                              left: '0'
                            }
                          })
                        )
                      ]
                );
              case 5:
                return u.sent(), [3, 8];
              case 6:
                return '.png' !== f
                  ? [3, 8]
                  : [4, o.screenshot(n({}, l, { fullPage: !0 }))];
              case 7:
                u.sent(), (u.label = 8);
              case 8:
                return [4, e.close()];
              case 9:
                return u.sent(), [2];
            }
          });
        });
      };
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n = r(2);
      t.convert = n.convert;
    }
  ]);
});
