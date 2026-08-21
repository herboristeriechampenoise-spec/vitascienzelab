import React, { useState, useEffect, useRef } from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';

const J0 = Object.create;
const wr = Object.defineProperty;
const W0 = Object.getOwnPropertyDescriptor;
const I0 = Object.getOwnPropertyNames;
const P0 = Object.getPrototypeOf;
const eg = Object.prototype.hasOwnProperty;
const on = (e, t) => () => (t || e((t = {
  exports: {}
}).exports, t), t.exports);
const tg = (e, t, n, l) => {
  if (t && typeof t == "object" || typeof t == "function") for (let a of I0(t)) !eg.call(e, a) && a !== n && wr(e, a, {
    get: () => t[a],
    enumerable: !(l = W0(t, a)) || l.enumerable
  });
  return e;
};
const Ql = (e, t, n) => (n = e != null ? J0(P0(e)) : {}, tg(t || !e || !e.__esModule ? wr(n, "default", {
  value: e,
  enumerable: !0
}) : n, e));
const $r = on(J => {
  "use strict";

  var qu = Symbol.for("react.transitional.element"),
    ng = Symbol.for("react.portal"),
    lg = Symbol.for("react.fragment"),
    ag = Symbol.for("react.strict_mode"),
    ig = Symbol.for("react.profiler"),
    og = Symbol.for("react.consumer"),
    ug = Symbol.for("react.context"),
    cg = Symbol.for("react.forward_ref"),
    sg = Symbol.for("react.suspense"),
    rg = Symbol.for("react.memo"),
    Yr = Symbol.for("react.lazy"),
    dg = Symbol.for("react.activity"),
    Fr = Symbol.iterator;
  function fg(e) {
    return e === null || typeof e != "object" ? null : (e = Fr && e[Fr] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Gr = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {}
    },
    Vr = Object.assign,
    Qr = {};
  function Xl(e, t, n) {
    this.props = e, this.context = t, this.refs = Qr, this.updater = n || Gr;
  }
  Xl.prototype.isReactComponent = {};
  Xl.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  Xl.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function Zr() {}
  Zr.prototype = Xl.prototype;
  function Uu(e, t, n) {
    this.props = e, this.context = t, this.refs = Qr, this.updater = n || Gr;
  }
  var wu = Uu.prototype = new Zr();
  wu.constructor = Uu;
  Vr(wu, Xl.prototype);
  wu.isPureReactComponent = !0;
  var Hr = Array.isArray;
  function ku() {}
  var be = {
      H: null,
      A: null,
      T: null,
      S: null
    },
    Xr = Object.prototype.hasOwnProperty;
  function Fu(e, t, n) {
    var l = n.ref;
    return {
      $$typeof: qu,
      type: e,
      key: t,
      ref: l !== void 0 ? l : null,
      props: n
    };
  }
  function pg(e, t) {
    return Fu(e.type, t, e.props);
  }
  function Hu(e) {
    return typeof e == "object" && e !== null && e.$$typeof === qu;
  }
  function mg(e) {
    var t = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function (n) {
      return t[n];
    });
  }
  var jr = /\/+/g;
  function Nu(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? mg("" + e.key) : t.toString(36);
  }
  function gg(e) {
    switch (e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw e.reason;
      default:
        switch (typeof e.status == "string" ? e.then(ku, ku) : (e.status = "pending", e.then(function (t) {
          e.status === "pending" && (e.status = "fulfilled", e.value = t);
        }, function (t) {
          e.status === "pending" && (e.status = "rejected", e.reason = t);
        })), e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
        }
    }
    throw e;
  }
  function Zl(e, t, n, l, a) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var u = !1;
    if (e === null) u = !0;else switch (i) {
      case "bigint":
      case "string":
      case "number":
        u = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case qu:
          case ng:
            u = !0;
            break;
          case Yr:
            return u = e._init, Zl(u(e._payload), t, n, l, a);
        }
    }
    if (u) return a = a(e), u = l === "" ? "." + Nu(e, 0) : l, Hr(a) ? (n = "", u != null && (n = u.replace(jr, "$&/") + "/"), Zl(a, t, n, "", function (v) {
      return v;
    })) : a != null && (Hu(a) && (a = pg(a, n + (a.key == null || e && e.key === a.key ? "" : ("" + a.key).replace(jr, "$&/") + "/") + u)), t.push(a)), 1;
    u = 0;
    var s = l === "" ? "." : l + ":";
    if (Hr(e)) for (var r = 0; r < e.length; r++) l = e[r], i = s + Nu(l, r), u += Zl(l, t, n, i, a);else if (r = fg(e), typeof r == "function") for (e = r.call(e), r = 0; !(l = e.next()).done;) l = l.value, i = s + Nu(l, r++), u += Zl(l, t, n, i, a);else if (i === "object") {
      if (typeof e.then == "function") return Zl(gg(e), t, n, l, a);
      throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    }
    return u;
  }
  function Zi(e, t, n) {
    if (e == null) return e;
    var l = [],
      a = 0;
    return Zl(e, l, "", "", function (i) {
      return t.call(n, i, a++);
    }), l;
  }
  function yg(e) {
    if (e._status === -1) {
      var t = e._result;
      t = t(), t.then(function (n) {
        (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
      }, function (n) {
        (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
      }), e._status === -1 && (e._status = 0, e._result = t);
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var Lr = typeof reportError == "function" ? reportError : function (e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    },
    vg = {
      map: Zi,
      forEach: function (e, t, n) {
        Zi(e, function () {
          t.apply(this, arguments);
        }, n);
      },
      count: function (e) {
        var t = 0;
        return Zi(e, function () {
          t++;
        }), t;
      },
      toArray: function (e) {
        return Zi(e, function (t) {
          return t;
        }) || [];
      },
      only: function (e) {
        if (!Hu(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
    };
  J.Activity = dg;
  J.Children = vg;
  J.Component = Xl;
  J.Fragment = lg;
  J.Profiler = ig;
  J.PureComponent = Uu;
  J.StrictMode = ag;
  J.Suspense = sg;
  J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = be;
  J.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function (e) {
      return be.H.useMemoCache(e);
    }
  };
  J.cache = function (e) {
    return function () {
      return e.apply(null, arguments);
    };
  };
  J.cacheSignal = function () {
    return null;
  };
  J.cloneElement = function (e, t, n) {
    if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
    var l = Vr({}, e.props),
      a = e.key;
    if (t != null) for (i in t.key !== void 0 && (a = "" + t.key), t) !Xr.call(t, i) || i === "key" || i === "__self" || i === "__source" || i === "ref" && t.ref === void 0 || (l[i] = t[i]);
    var i = arguments.length - 2;
    if (i === 1) l.children = n;else if (1 < i) {
      for (var u = Array(i), s = 0; s < i; s++) u[s] = arguments[s + 2];
      l.children = u;
    }
    return Fu(e.type, a, l);
  };
  J.createContext = function (e) {
    return e = {
      $$typeof: ug,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, e.Provider = e, e.Consumer = {
      $$typeof: og,
      _context: e
    }, e;
  };
  J.createElement = function (e, t, n) {
    var l,
      a = {},
      i = null;
    if (t != null) for (l in t.key !== void 0 && (i = "" + t.key), t) Xr.call(t, l) && l !== "key" && l !== "__self" && l !== "__source" && (a[l] = t[l]);
    var u = arguments.length - 2;
    if (u === 1) a.children = n;else if (1 < u) {
      for (var s = Array(u), r = 0; r < u; r++) s[r] = arguments[r + 2];
      a.children = s;
    }
    if (e && e.defaultProps) for (l in u = e.defaultProps, u) a[l] === void 0 && (a[l] = u[l]);
    return Fu(e, i, a);
  };
  J.createRef = function () {
    return {
      current: null
    };
  };
  J.forwardRef = function (e) {
    return {
      $$typeof: cg,
      render: e
    };
  };
  J.isValidElement = Hu;
  J.lazy = function (e) {
    return {
      $$typeof: Yr,
      _payload: {
        _status: -1,
        _result: e
      },
      _init: yg
    };
  };
  J.memo = function (e, t) {
    return {
      $$typeof: rg,
      type: e,
      compare: t === void 0 ? null : t
    };
  };
  J.startTransition = function (e) {
    var t = be.T,
      n = {};
    be.T = n;
    try {
      var l = e(),
        a = be.S;
      a !== null && a(n, l), typeof l == "object" && l !== null && typeof l.then == "function" && l.then(ku, Lr);
    } catch (i) {
      Lr(i);
    } finally {
      t !== null && n.types !== null && (t.types = n.types), be.T = t;
    }
  };
  J.unstable_useCacheRefresh = function () {
    return be.H.useCacheRefresh();
  };
  J.use = function (e) {
    return be.H.use(e);
  };
  J.useActionState = function (e, t, n) {
    return be.H.useActionState(e, t, n);
  };
  J.useCallback = function (e, t) {
    return be.H.useCallback(e, t);
  };
  J.useContext = function (e) {
    return be.H.useContext(e);
  };
  J.useDebugValue = function () {};
  J.useDeferredValue = function (e, t) {
    return be.H.useDeferredValue(e, t);
  };
  J.useEffect = function (e, t) {
    return be.H.useEffect(e, t);
  };
  J.useEffectEvent = function (e) {
    return be.H.useEffectEvent(e);
  };
  J.useId = function () {
    return be.H.useId();
  };
  J.useImperativeHandle = function (e, t, n) {
    return be.H.useImperativeHandle(e, t, n);
  };
  J.useInsertionEffect = function (e, t) {
    return be.H.useInsertionEffect(e, t);
  };
  J.useLayoutEffect = function (e, t) {
    return be.H.useLayoutEffect(e, t);
  };
  J.useMemo = function (e, t) {
    return be.H.useMemo(e, t);
  };
  J.useOptimistic = function (e, t) {
    return be.H.useOptimistic(e, t);
  };
  J.useReducer = function (e, t, n) {
    return be.H.useReducer(e, t, n);
  };
  J.useRef = function (e) {
    return be.H.useRef(e);
  };
  J.useState = function (e) {
    return be.H.useState(e);
  };
  J.useSyncExternalStore = function (e, t, n) {
    return be.H.useSyncExternalStore(e, t, n);
  };
  J.useTransition = function () {
    return be.H.useTransition();
  };
  J.version = "19.2.5";
});
const Xi = on((rv, Kr) => {
  "use strict";

  Kr.exports = $r();
});
const Wr = on($i => {
  "use strict";

  var hg = Symbol.for("react.transitional.element"),
    bg = Symbol.for("react.fragment");
  function Jr(e, t, n) {
    var l = null;
    if (n !== void 0 && (l = "" + n), t.key !== void 0 && (l = "" + t.key), "key" in t) {
      n = {};
      for (var a in t) a !== "key" && (n[a] = t[a]);
    } else n = t;
    return t = n.ref, {
      $$typeof: hg,
      type: e,
      key: l,
      ref: t !== void 0 ? t : null,
      props: n
    };
  }
  $i.Fragment = bg;
  $i.jsx = Jr;
  $i.jsxs = Jr;
});
const Va = on((fv, Ir) => {
  "use strict";

  Ir.exports = Wr();
});
const dd = on(Ae => {
  "use strict";

  function Ju(e, t) {
    var n = e.length;
    e.push(t);
    e: for (; 0 < n;) {
      var l = n - 1 >>> 1,
        a = e[l];
      if (0 < Pi(a, t)) e[l] = t, e[n] = a, n = l;else break e;
    }
  }
  function un(e) {
    return e.length === 0 ? null : e[0];
  }
  function to(e) {
    if (e.length === 0) return null;
    var t = e[0],
      n = e.pop();
    if (n !== t) {
      e[0] = n;
      e: for (var l = 0, a = e.length, i = a >>> 1; l < i;) {
        var u = 2 * (l + 1) - 1,
          s = e[u],
          r = u + 1,
          v = e[r];
        if (0 > Pi(s, n)) r < a && 0 > Pi(v, s) ? (e[l] = v, e[r] = n, l = r) : (e[l] = s, e[u] = n, l = u);else if (r < a && 0 > Pi(v, n)) e[l] = v, e[r] = n, l = r;else break e;
      }
    }
    return t;
  }
  function Pi(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return n !== 0 ? n : e.id - t.id;
  }
  Ae.unstable_now = void 0;
  typeof performance == "object" && typeof performance.now == "function" ? (nd = performance, Ae.unstable_now = function () {
    return nd.now();
  }) : (Xu = Date, ld = Xu.now(), Ae.unstable_now = function () {
    return Xu.now() - ld;
  });
  var nd,
    Xu,
    ld,
    vn = [],
    Yn = [],
    Og = 1,
    jt = null,
    ct = 3,
    Wu = !1,
    Qa = !1,
    Za = !1,
    Iu = !1,
    od = typeof setTimeout == "function" ? setTimeout : null,
    ud = typeof clearTimeout == "function" ? clearTimeout : null,
    ad = typeof setImmediate < "u" ? setImmediate : null;
  function eo(e) {
    for (var t = un(Yn); t !== null;) {
      if (t.callback === null) to(Yn);else if (t.startTime <= e) to(Yn), t.sortIndex = t.expirationTime, Ju(vn, t);else break;
      t = un(Yn);
    }
  }
  function Pu(e) {
    if (Za = !1, eo(e), !Qa) if (un(vn) !== null) Qa = !0, Jl || (Jl = !0, Kl());else {
      var t = un(Yn);
      t !== null && ec(Pu, t.startTime - e);
    }
  }
  var Jl = !1,
    Xa = -1,
    cd = 5,
    sd = -1;
  function rd() {
    return Iu ? !0 : !(Ae.unstable_now() - sd < cd);
  }
  function $u() {
    if (Iu = !1, Jl) {
      var e = Ae.unstable_now();
      sd = e;
      var t = !0;
      try {
        e: {
          Qa = !1, Za && (Za = !1, ud(Xa), Xa = -1), Wu = !0;
          var n = ct;
          try {
            t: {
              for (eo(e), jt = un(vn); jt !== null && !(jt.expirationTime > e && rd());) {
                var l = jt.callback;
                if (typeof l == "function") {
                  jt.callback = null, ct = jt.priorityLevel;
                  var a = l(jt.expirationTime <= e);
                  if (e = Ae.unstable_now(), typeof a == "function") {
                    jt.callback = a, eo(e), t = !0;
                    break t;
                  }
                  jt === un(vn) && to(vn), eo(e);
                } else to(vn);
                jt = un(vn);
              }
              if (jt !== null) t = !0;else {
                var i = un(Yn);
                i !== null && ec(Pu, i.startTime - e), t = !1;
              }
            }
            break e;
          } finally {
            jt = null, ct = n, Wu = !1;
          }
          t = void 0;
        }
      } finally {
        t ? Kl() : Jl = !1;
      }
    }
  }
  var Kl;
  typeof ad == "function" ? Kl = function () {
    ad($u);
  } : typeof MessageChannel < "u" ? (Ku = new MessageChannel(), id = Ku.port2, Ku.port1.onmessage = $u, Kl = function () {
    id.postMessage(null);
  }) : Kl = function () {
    od($u, 0);
  };
  var Ku, id;
  function ec(e, t) {
    Xa = od(function () {
      e(Ae.unstable_now());
    }, t);
  }
  Ae.unstable_IdlePriority = 5;
  Ae.unstable_ImmediatePriority = 1;
  Ae.unstable_LowPriority = 4;
  Ae.unstable_NormalPriority = 3;
  Ae.unstable_Profiling = null;
  Ae.unstable_UserBlockingPriority = 2;
  Ae.unstable_cancelCallback = function (e) {
    e.callback = null;
  };
  Ae.unstable_forceFrameRate = function (e) {
    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : cd = 0 < e ? Math.floor(1e3 / e) : 5;
  };
  Ae.unstable_getCurrentPriorityLevel = function () {
    return ct;
  };
  Ae.unstable_next = function (e) {
    switch (ct) {
      case 1:
      case 2:
      case 3:
        var t = 3;
        break;
      default:
        t = ct;
    }
    var n = ct;
    ct = t;
    try {
      return e();
    } finally {
      ct = n;
    }
  };
  Ae.unstable_requestPaint = function () {
    Iu = !0;
  };
  Ae.unstable_runWithPriority = function (e, t) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e = 3;
    }
    var n = ct;
    ct = e;
    try {
      return t();
    } finally {
      ct = n;
    }
  };
  Ae.unstable_scheduleCallback = function (e, t, n) {
    var l = Ae.unstable_now();
    switch (typeof n == "object" && n !== null ? (n = n.delay, n = typeof n == "number" && 0 < n ? l + n : l) : n = l, e) {
      case 1:
        var a = -1;
        break;
      case 2:
        a = 250;
        break;
      case 5:
        a = 1073741823;
        break;
      case 4:
        a = 1e4;
        break;
      default:
        a = 5e3;
    }
    return a = n + a, e = {
      id: Og++,
      callback: t,
      priorityLevel: e,
      startTime: n,
      expirationTime: a,
      sortIndex: -1
    }, n > l ? (e.sortIndex = n, Ju(Yn, e), un(vn) === null && e === un(Yn) && (Za ? (ud(Xa), Xa = -1) : Za = !0, ec(Pu, n - l))) : (e.sortIndex = a, Ju(vn, e), Qa || Wu || (Qa = !0, Jl || (Jl = !0, Kl()))), e;
  };
  Ae.unstable_shouldYield = rd;
  Ae.unstable_wrapCallback = function (e) {
    var t = ct;
    return function () {
      var n = ct;
      ct = t;
      try {
        return e.apply(this, arguments);
      } finally {
        ct = n;
      }
    };
  };
});
const pd = on((gv, fd) => {
  "use strict";

  fd.exports = dd();
});
const gd = on(pt => {
  "use strict";

  var Ng = Xi();
  function md(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function Gn() {}
  var ft = {
      d: {
        f: Gn,
        r: function () {
          throw Error(md(522));
        },
        D: Gn,
        C: Gn,
        L: Gn,
        m: Gn,
        X: Gn,
        S: Gn,
        M: Gn
      },
      p: 0,
      findDOMNode: null
    },
    kg = Symbol.for("react.portal");
  function qg(e, t, n) {
    var l = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: kg,
      key: l == null ? null : "" + l,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var $a = Ng.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function no(e, t) {
    if (e === "font") return "";
    if (typeof t == "string") return t === "use-credentials" ? t : "";
  }
  pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ft;
  pt.createPortal = function (e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(md(299));
    return qg(e, t, null, n);
  };
  pt.flushSync = function (e) {
    var t = $a.T,
      n = ft.p;
    try {
      if ($a.T = null, ft.p = 2, e) return e();
    } finally {
      $a.T = t, ft.p = n, ft.d.f();
    }
  };
  pt.preconnect = function (e, t) {
    typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, ft.d.C(e, t));
  };
  pt.prefetchDNS = function (e) {
    typeof e == "string" && ft.d.D(e);
  };
  pt.preinit = function (e, t) {
    if (typeof e == "string" && t && typeof t.as == "string") {
      var n = t.as,
        l = no(n, t.crossOrigin),
        a = typeof t.integrity == "string" ? t.integrity : void 0,
        i = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
      n === "style" ? ft.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
        crossOrigin: l,
        integrity: a,
        fetchPriority: i
      }) : n === "script" && ft.d.X(e, {
        crossOrigin: l,
        integrity: a,
        fetchPriority: i,
        nonce: typeof t.nonce == "string" ? t.nonce : void 0
      });
    }
  };
  pt.preinitModule = function (e, t) {
    if (typeof e == "string") if (typeof t == "object" && t !== null) {
      if (t.as == null || t.as === "script") {
        var n = no(t.as, t.crossOrigin);
        ft.d.M(e, {
          crossOrigin: n,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0
        });
      }
    } else t == null && ft.d.M(e);
  };
  pt.preload = function (e, t) {
    if (typeof e == "string" && typeof t == "object" && t !== null && typeof t.as == "string") {
      var n = t.as,
        l = no(n, t.crossOrigin);
      ft.d.L(e, n, {
        crossOrigin: l,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0,
        nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        type: typeof t.type == "string" ? t.type : void 0,
        fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
        referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
        imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
        imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
        media: typeof t.media == "string" ? t.media : void 0
      });
    }
  };
  pt.preloadModule = function (e, t) {
    if (typeof e == "string") if (t) {
      var n = no(t.as, t.crossOrigin);
      ft.d.m(e, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: n,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0
      });
    } else ft.d.m(e);
  };
  pt.requestFormReset = function (e) {
    ft.d.r(e);
  };
  pt.unstable_batchedUpdates = function (e, t) {
    return e(t);
  };
  pt.useFormState = function (e, t, n) {
    return $a.H.useFormState(e, t, n);
  };
  pt.useFormStatus = function () {
    return $a.H.useHostTransitionStatus();
  };
  pt.version = "19.2.5";
});
const hd = on((vv, vd) => {
  "use strict";

  function yd() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yd);
    } catch (e) {
      console.error(e);
    }
  }
  yd(), vd.exports = gd();
});
const M0 = on(Tu => {
  "use strict";

  var Le = pd(),
    Qf = Xi(),
    Ug = hd();
  function A(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function Zf(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function ki(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return;) t = t.return;else {
      e = t;
      do t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return; while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Xf(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function $f(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function bd(e) {
    if (ki(e) !== e) throw Error(A(188));
  }
  function wg(e) {
    var t = e.alternate;
    if (!t) {
      if (t = ki(e), t === null) throw Error(A(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t;;) {
      var a = n.return;
      if (a === null) break;
      var i = a.alternate;
      if (i === null) {
        if (l = a.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (a.child === i.child) {
        for (i = a.child; i;) {
          if (i === n) return bd(a), e;
          if (i === l) return bd(a), t;
          i = i.sibling;
        }
        throw Error(A(188));
      }
      if (n.return !== l.return) n = a, l = i;else {
        for (var u = !1, s = a.child; s;) {
          if (s === n) {
            u = !0, n = a, l = i;
            break;
          }
          if (s === l) {
            u = !0, l = a, n = i;
            break;
          }
          s = s.sibling;
        }
        if (!u) {
          for (s = i.child; s;) {
            if (s === n) {
              u = !0, n = i, l = a;
              break;
            }
            if (s === l) {
              u = !0, l = i, n = a;
              break;
            }
            s = s.sibling;
          }
          if (!u) throw Error(A(189));
        }
      }
      if (n.alternate !== l) throw Error(A(190));
    }
    if (n.tag !== 3) throw Error(A(188));
    return n.stateNode.current === n ? e : t;
  }
  function Kf(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null;) {
      if (t = Kf(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Ee = Object.assign,
    Fg = Symbol.for("react.element"),
    lo = Symbol.for("react.transitional.element"),
    ni = Symbol.for("react.portal"),
    na = Symbol.for("react.fragment"),
    Jf = Symbol.for("react.strict_mode"),
    kc = Symbol.for("react.profiler"),
    Wf = Symbol.for("react.consumer"),
    _n = Symbol.for("react.context"),
    Bs = Symbol.for("react.forward_ref"),
    qc = Symbol.for("react.suspense"),
    Uc = Symbol.for("react.suspense_list"),
    Rs = Symbol.for("react.memo"),
    Vn = Symbol.for("react.lazy"),
    wc = Symbol.for("react.activity"),
    Hg = Symbol.for("react.memo_cache_sentinel"),
    Sd = Symbol.iterator;
  function Ka(e) {
    return e === null || typeof e != "object" ? null : (e = Sd && e[Sd] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var jg = Symbol.for("react.client.reference");
  function Fc(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.$$typeof === jg ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case na:
        return "Fragment";
      case kc:
        return "Profiler";
      case Jf:
        return "StrictMode";
      case qc:
        return "Suspense";
      case Uc:
        return "SuspenseList";
      case wc:
        return "Activity";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case ni:
        return "Portal";
      case _n:
        return e.displayName || "Context";
      case Wf:
        return (e._context.displayName || "Context") + ".Consumer";
      case Bs:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Rs:
        return t = e.displayName || null, t !== null ? t : Fc(e.type) || "Memo";
      case Vn:
        t = e._payload, e = e._init;
        try {
          return Fc(e(t));
        } catch {}
    }
    return null;
  }
  var li = Array.isArray,
    Z = Qf.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    se = Ug.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Cl = {
      pending: !1,
      data: null,
      method: null,
      action: null
    },
    Hc = [],
    la = -1;
  function fn(e) {
    return {
      current: e
    };
  }
  function Ze(e) {
    0 > la || (e.current = Hc[la], Hc[la] = null, la--);
  }
  function he(e, t) {
    la++, Hc[la] = e.current, e.current = t;
  }
  var dn = fn(null),
    Si = fn(null),
    tl = fn(null),
    wo = fn(null);
  function Fo(e, t) {
    switch (he(tl, t), he(Si, e), he(dn, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Tf(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI) t = Tf(t), e = v0(t, e);else switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
    }
    Ze(dn), he(dn, e);
  }
  function xa() {
    Ze(dn), Ze(Si), Ze(tl);
  }
  function jc(e) {
    e.memoizedState !== null && he(wo, e);
    var t = dn.current,
      n = v0(t, e.type);
    t !== n && (he(Si, e), he(dn, n));
  }
  function Ho(e) {
    Si.current === e && (Ze(dn), Ze(Si)), wo.current === e && (Ze(wo), Mi._currentValue = Cl);
  }
  var tc, xd;
  function El(e) {
    if (tc === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      tc = t && t[1] || "", xd = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + tc + e + xd;
  }
  var nc = !1;
  function lc(e, t) {
    if (!e || nc) return "";
    nc = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var E = function () {
                throw Error();
              };
              if (Object.defineProperty(E.prototype, "props", {
                set: function () {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(E, []);
                } catch (p) {
                  var g = p;
                }
                Reflect.construct(e, [], E);
              } else {
                try {
                  E.call();
                } catch (p) {
                  g = p;
                }
                e.call(E.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (p) {
                g = p;
              }
              (E = e()) && typeof E.catch == "function" && E.catch(function () {});
            }
          } catch (p) {
            if (p && g && typeof p.stack == "string") return [p.stack, g.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, "name");
      a && a.configurable && Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot"
      });
      var i = l.DetermineComponentFrameRoot(),
        u = i[0],
        s = i[1];
      if (u && s) {
        var r = u.split(`
`),
          v = s.split(`
`);
        for (a = l = 0; l < r.length && !r[l].includes("DetermineComponentFrameRoot");) l++;
        for (; a < v.length && !v[a].includes("DetermineComponentFrameRoot");) a++;
        if (l === r.length || a === v.length) for (l = r.length - 1, a = v.length - 1; 1 <= l && 0 <= a && r[l] !== v[a];) a--;
        for (; 1 <= l && 0 <= a; l--, a--) if (r[l] !== v[a]) {
          if (l !== 1 || a !== 1) do if (l--, a--, 0 > a || r[l] !== v[a]) {
            var S = `
` + r[l].replace(" at new ", " at ");
            return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), S;
          } while (1 <= l && 0 <= a);
          break;
        }
      }
    } finally {
      nc = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? El(n) : "";
  }
  function Lg(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return El(e.type);
      case 16:
        return El("Lazy");
      case 13:
        return e.child !== t && t !== null ? El("Suspense Fallback") : El("Suspense");
      case 19:
        return El("SuspenseList");
      case 0:
      case 15:
        return lc(e.type, !1);
      case 11:
        return lc(e.type.render, !1);
      case 1:
        return lc(e.type, !0);
      case 31:
        return El("Activity");
      default:
        return "";
    }
  }
  function Ed(e) {
    try {
      var t = "",
        n = null;
      do t += Lg(e, n), n = e, e = e.return; while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Lc = Object.prototype.hasOwnProperty,
    Ms = Le.unstable_scheduleCallback,
    ac = Le.unstable_cancelCallback,
    Yg = Le.unstable_shouldYield,
    Gg = Le.unstable_requestPaint,
    Bt = Le.unstable_now,
    Vg = Le.unstable_getCurrentPriorityLevel,
    If = Le.unstable_ImmediatePriority,
    Pf = Le.unstable_UserBlockingPriority,
    jo = Le.unstable_NormalPriority,
    Qg = Le.unstable_LowPriority,
    ep = Le.unstable_IdlePriority,
    Zg = Le.log,
    Xg = Le.unstable_setDisableYieldValue,
    qi = null,
    Rt = null;
  function Jn(e) {
    if (typeof Zg == "function" && Xg(e), Rt && typeof Rt.setStrictMode == "function") try {
      Rt.setStrictMode(qi, e);
    } catch {}
  }
  var Mt = Math.clz32 ? Math.clz32 : Jg,
    $g = Math.log,
    Kg = Math.LN2;
  function Jg(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - ($g(e) / Kg | 0) | 0;
  }
  var ao = 256,
    io = 262144,
    oo = 4194304;
  function zl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function fu(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var a = 0,
      i = e.suspendedLanes,
      u = e.pingedLanes;
    e = e.warmLanes;
    var s = l & 134217727;
    return s !== 0 ? (l = s & ~i, l !== 0 ? a = zl(l) : (u &= s, u !== 0 ? a = zl(u) : n || (n = s & ~e, n !== 0 && (a = zl(n))))) : (s = l & ~i, s !== 0 ? a = zl(s) : u !== 0 ? a = zl(u) : n || (n = l & ~e, n !== 0 && (a = zl(n)))), a === 0 ? 0 : t !== 0 && t !== a && (t & i) === 0 && (i = a & -a, n = t & -t, i >= n || i === 32 && (n & 4194048) !== 0) ? t : a;
  }
  function Ui(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Wg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function tp() {
    var e = oo;
    return oo <<= 1, (oo & 62914560) === 0 && (oo = 4194304), e;
  }
  function ic(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function wi(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Ig(e, t, n, l, a, i) {
    var u = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var s = e.entanglements,
      r = e.expirationTimes,
      v = e.hiddenUpdates;
    for (n = u & ~n; 0 < n;) {
      var S = 31 - Mt(n),
        E = 1 << S;
      s[S] = 0, r[S] = -1;
      var g = v[S];
      if (g !== null) for (v[S] = null, S = 0; S < g.length; S++) {
        var p = g[S];
        p !== null && (p.lane &= -536870913);
      }
      n &= ~E;
    }
    l !== 0 && np(e, l, 0), i !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(u & ~t));
  }
  function np(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Mt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function lp(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
      var l = 31 - Mt(n),
        a = 1 << l;
      a & t | e[l] & t && (e[l] |= t), n &= ~a;
    }
  }
  function ap(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : Os(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function Os(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Ns(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ip() {
    var e = se.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : T0(e.type));
  }
  function zd(e, t) {
    var n = se.p;
    try {
      return se.p = e, t();
    } finally {
      se.p = n;
    }
  }
  var ml = Math.random().toString(36).slice(2),
    et = "__reactFiber$" + ml,
    zt = "__reactProps$" + ml,
    Oa = "__reactContainer$" + ml,
    Yc = "__reactEvents$" + ml,
    Pg = "__reactListeners$" + ml,
    e1 = "__reactHandles$" + ml,
    Ad = "__reactResources$" + ml,
    Fi = "__reactMarker$" + ml;
  function ks(e) {
    delete e[et], delete e[zt], delete e[Yc], delete e[Pg], delete e[e1];
  }
  function aa(e) {
    var t = e[et];
    if (t) return t;
    for (var n = e.parentNode; n;) {
      if (t = n[Oa] || n[et]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Nf(e); e !== null;) {
          if (n = e[et]) return n;
          e = Nf(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Na(e) {
    if (e = e[et] || e[Oa]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function ai(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(A(33));
  }
  function ma(e) {
    var t = e[Ad];
    return t || (t = e[Ad] = {
      hoistableStyles: new Map(),
      hoistableScripts: new Map()
    }), t;
  }
  function Qe(e) {
    e[Fi] = !0;
  }
  var op = new Set(),
    up = {};
  function Ul(e, t) {
    Ea(e, t), Ea(e + "Capture", t);
  }
  function Ea(e, t) {
    for (up[e] = t, e = 0; e < t.length; e++) op.add(t[e]);
  }
  var t1 = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),
    _d = {},
    Cd = {};
  function n1(e) {
    return Lc.call(Cd, e) ? !0 : Lc.call(_d, e) ? !1 : t1.test(e) ? Cd[e] = !0 : (_d[e] = !0, !1);
  }
  function Eo(e, t, n) {
    if (n1(t)) if (n === null) e.removeAttribute(t);else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
          e.removeAttribute(t);
          return;
        case "boolean":
          var l = t.toLowerCase().slice(0, 5);
          if (l !== "data-" && l !== "aria-") {
            e.removeAttribute(t);
            return;
          }
      }
      e.setAttribute(t, "" + n);
    }
  }
  function uo(e, t, n) {
    if (n === null) e.removeAttribute(t);else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function hn(e, t, n, l) {
    if (l === null) e.removeAttribute(n);else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + l);
    }
  }
  function Yt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function cp(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function l1(e, t, n) {
    var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var a = l.get,
        i = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return a.call(this);
        },
        set: function (u) {
          n = "" + u, i.call(this, u);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function () {
          return n;
        },
        setValue: function (u) {
          n = "" + u;
        },
        stopTracking: function () {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Gc(e) {
    if (!e._valueTracker) {
      var t = cp(e) ? "checked" : "value";
      e._valueTracker = l1(e, t, "" + e[t]);
    }
  }
  function sp(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      l = "";
    return e && (l = cp(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Lo(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var a1 = /[\n"\\]/g;
  function Qt(e) {
    return e.replace(a1, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Vc(e, t, n, l, a, i, u, s) {
    e.name = "", u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" ? e.type = u : e.removeAttribute("type"), t != null ? u === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Yt(t)) : e.value !== "" + Yt(t) && (e.value = "" + Yt(t)) : u !== "submit" && u !== "reset" || e.removeAttribute("value"), t != null ? Qc(e, u, Yt(t)) : n != null ? Qc(e, u, Yt(n)) : l != null && e.removeAttribute("value"), a == null && i != null && (e.defaultChecked = !!i), a != null && (e.checked = a && typeof a != "function" && typeof a != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Yt(s) : e.removeAttribute("name");
  }
  function rp(e, t, n, l, a, i, u, s) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || n != null) {
      if (!(i !== "submit" && i !== "reset" || t != null)) {
        Gc(e);
        return;
      }
      n = n != null ? "" + Yt(n) : "", t = t != null ? "" + Yt(t) : n, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? a, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = s ? e.checked : !!l, e.defaultChecked = !!l, u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.name = u), Gc(e);
  }
  function Qc(e, t, n) {
    t === "number" && Lo(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function ga(e, t, n, l) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Yt(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          e[a].selected = !0, l && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function dp(e, t, n) {
    if (t != null && (t = "" + Yt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Yt(n) : "";
  }
  function fp(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(A(92));
        if (li(l)) {
          if (1 < l.length) throw Error(A(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = Yt(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), Gc(e);
  }
  function za(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var i1 = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Dd(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || i1.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function pp(e, t, n) {
    if (t != null && typeof t != "object") throw Error(A(62));
    if (e = e.style, n != null) {
      for (var l in n) !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var a in t) l = t[a], t.hasOwnProperty(a) && n[a] !== l && Dd(e, a, l);
    } else for (var i in t) t.hasOwnProperty(i) && Dd(e, i, t[i]);
  }
  function qs(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var o1 = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]),
    u1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function zo(e) {
    return u1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Cn() {}
  var Zc = null;
  function Us(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ia = null,
    ya = null;
  function Td(e) {
    var t = Na(e);
    if (t && (e = t.stateNode)) {
      var n = e[zt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Vc(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode;) n = n.parentNode;
            for (n = n.querySelectorAll('input[name="' + Qt("" + t) + '"][type="radio"]'), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var a = l[zt] || null;
                if (!a) throw Error(A(90));
                Vc(l, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
              }
            }
            for (t = 0; t < n.length; t++) l = n[t], l.form === e.form && sp(l);
          }
          break e;
        case "textarea":
          dp(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && ga(e, !!n.multiple, t, !1);
      }
    }
  }
  var oc = !1;
  function mp(e, t, n) {
    if (oc) return e(t, n);
    oc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (oc = !1, (ia !== null || ya !== null) && (Au(), ia && (t = ia, e = ya, ya = ia = null, Td(t), e))) for (t = 0; t < e.length; t++) Td(e[t]);
    }
  }
  function xi(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[zt] || null;
    if (l === null) return null;
    n = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(A(231, t, typeof n));
    return n;
  }
  var Mn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    Xc = !1;
  if (Mn) try {
    Wl = {}, Object.defineProperty(Wl, "passive", {
      get: function () {
        Xc = !0;
      }
    }), window.addEventListener("test", Wl, Wl), window.removeEventListener("test", Wl, Wl);
  } catch {
    Xc = !1;
  }
  var Wl,
    Wn = null,
    ws = null,
    Ao = null;
  function gp() {
    if (Ao) return Ao;
    var e,
      t = ws,
      n = t.length,
      l,
      a = "value" in Wn ? Wn.value : Wn.textContent,
      i = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++);
    var u = n - e;
    for (l = 1; l <= u && t[n - l] === a[i - l]; l++);
    return Ao = a.slice(e, 1 < l ? 1 - l : void 0);
  }
  function _o(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function co() {
    return !0;
  }
  function Bd() {
    return !1;
  }
  function At(e) {
    function t(n, l, a, i, u) {
      this._reactName = n, this._targetInst = a, this.type = l, this.nativeEvent = i, this.target = u, this.currentTarget = null;
      for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? co : Bd, this.isPropagationStopped = Bd, this;
    }
    return Ee(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = co);
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = co);
      },
      persist: function () {},
      isPersistent: co
    }), t;
  }
  var wl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    },
    pu = At(wl),
    Hi = Ee({}, wl, {
      view: 0,
      detail: 0
    }),
    c1 = At(Hi),
    uc,
    cc,
    Ja,
    mu = Ee({}, Hi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Fs,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e ? e.movementX : (e !== Ja && (Ja && e.type === "mousemove" ? (uc = e.screenX - Ja.screenX, cc = e.screenY - Ja.screenY) : cc = uc = 0, Ja = e), uc);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : cc;
      }
    }),
    Rd = At(mu),
    s1 = Ee({}, mu, {
      dataTransfer: 0
    }),
    r1 = At(s1),
    d1 = Ee({}, Hi, {
      relatedTarget: 0
    }),
    sc = At(d1),
    f1 = Ee({}, wl, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }),
    p1 = At(f1),
    m1 = Ee({}, wl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }),
    g1 = At(m1),
    y1 = Ee({}, wl, {
      data: 0
    }),
    Md = At(y1),
    v1 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    },
    h1 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    },
    b1 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
  function S1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = b1[e]) ? !!t[e] : !1;
  }
  function Fs() {
    return S1;
  }
  var x1 = Ee({}, Hi, {
      key: function (e) {
        if (e.key) {
          var t = v1[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = _o(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? h1[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Fs,
      charCode: function (e) {
        return e.type === "keypress" ? _o(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress" ? _o(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }),
    E1 = At(x1),
    z1 = Ee({}, mu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }),
    Od = At(z1),
    A1 = Ee({}, Hi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Fs
    }),
    _1 = At(A1),
    C1 = Ee({}, wl, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }),
    D1 = At(C1),
    T1 = Ee({}, mu, {
      deltaX: function (e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }),
    B1 = At(T1),
    R1 = Ee({}, wl, {
      newState: 0,
      oldState: 0
    }),
    M1 = At(R1),
    O1 = [9, 13, 27, 32],
    Hs = Mn && "CompositionEvent" in window,
    ui = null;
  Mn && "documentMode" in document && (ui = document.documentMode);
  var N1 = Mn && "TextEvent" in window && !ui,
    yp = Mn && (!Hs || ui && 8 < ui && 11 >= ui),
    Nd = " ",
    kd = !1;
  function vp(e, t) {
    switch (e) {
      case "keyup":
        return O1.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function hp(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oa = !1;
  function k1(e, t) {
    switch (e) {
      case "compositionend":
        return hp(t);
      case "keypress":
        return t.which !== 32 ? null : (kd = !0, Nd);
      case "textInput":
        return e = t.data, e === Nd && kd ? null : e;
      default:
        return null;
    }
  }
  function q1(e, t) {
    if (oa) return e === "compositionend" || !Hs && vp(e, t) ? (e = gp(), Ao = ws = Wn = null, oa = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return yp && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var U1 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function qd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!U1[e.type] : t === "textarea";
  }
  function bp(e, t, n, l) {
    ia ? ya ? ya.push(l) : ya = [l] : ia = l, t = iu(t, "onChange"), 0 < t.length && (n = new pu("onChange", "change", null, n, l), e.push({
      event: n,
      listeners: t
    }));
  }
  var ci = null,
    Ei = null;
  function w1(e) {
    m0(e, 0);
  }
  function gu(e) {
    var t = ai(e);
    if (sp(t)) return e;
  }
  function Ud(e, t) {
    if (e === "change") return t;
  }
  var Sp = !1;
  Mn && (Mn ? (ro = "oninput" in document, ro || (rc = document.createElement("div"), rc.setAttribute("oninput", "return;"), ro = typeof rc.oninput == "function"), so = ro) : so = !1, Sp = so && (!document.documentMode || 9 < document.documentMode));
  var so, ro, rc;
  function wd() {
    ci && (ci.detachEvent("onpropertychange", xp), Ei = ci = null);
  }
  function xp(e) {
    if (e.propertyName === "value" && gu(Ei)) {
      var t = [];
      bp(t, Ei, e, Us(e)), mp(w1, t);
    }
  }
  function F1(e, t, n) {
    e === "focusin" ? (wd(), ci = t, Ei = n, ci.attachEvent("onpropertychange", xp)) : e === "focusout" && wd();
  }
  function H1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return gu(Ei);
  }
  function j1(e, t) {
    if (e === "click") return gu(t);
  }
  function L1(e, t) {
    if (e === "input" || e === "change") return gu(t);
  }
  function Y1(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Nt = typeof Object.is == "function" ? Object.is : Y1;
  function zi(e, t) {
    if (Nt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
      l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var a = n[l];
      if (!Lc.call(t, a) || !Nt(e[a], t[a])) return !1;
    }
    return !0;
  }
  function Fd(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e;
  }
  function Hd(e, t) {
    var n = Fd(e);
    e = 0;
    for (var l; n;) {
      if (n.nodeType === 3) {
        if (l = e + n.textContent.length, e <= t && l >= t) return {
          node: n,
          offset: t - e
        };
        e = l;
      }
      e: {
        for (; n;) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Fd(n);
    }
  }
  function Ep(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ep(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function zp(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Lo(e.document); t instanceof e.HTMLIFrameElement;) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;else break;
      t = Lo(e.document);
    }
    return t;
  }
  function js(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var G1 = Mn && "documentMode" in document && 11 >= document.documentMode,
    ua = null,
    $c = null,
    si = null,
    Kc = !1;
  function jd(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Kc || ua == null || ua !== Lo(l) || (l = ua, "selectionStart" in l && js(l) ? l = {
      start: l.selectionStart,
      end: l.selectionEnd
    } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), si && zi(si, l) || (si = l, l = iu($c, "onSelect"), 0 < l.length && (t = new pu("onSelect", "select", null, t, n), e.push({
      event: t,
      listeners: l
    }), t.target = ua)));
  }
  function xl(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var ca = {
      animationend: xl("Animation", "AnimationEnd"),
      animationiteration: xl("Animation", "AnimationIteration"),
      animationstart: xl("Animation", "AnimationStart"),
      transitionrun: xl("Transition", "TransitionRun"),
      transitionstart: xl("Transition", "TransitionStart"),
      transitioncancel: xl("Transition", "TransitionCancel"),
      transitionend: xl("Transition", "TransitionEnd")
    },
    dc = {},
    Ap = {};
  Mn && (Ap = document.createElement("div").style, "AnimationEvent" in window || (delete ca.animationend.animation, delete ca.animationiteration.animation, delete ca.animationstart.animation), "TransitionEvent" in window || delete ca.transitionend.transition);
  function Fl(e) {
    if (dc[e]) return dc[e];
    if (!ca[e]) return e;
    var t = ca[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Ap) return dc[e] = t[n];
    return e;
  }
  var _p = Fl("animationend"),
    Cp = Fl("animationiteration"),
    Dp = Fl("animationstart"),
    V1 = Fl("transitionrun"),
    Q1 = Fl("transitionstart"),
    Z1 = Fl("transitioncancel"),
    Tp = Fl("transitionend"),
    Bp = new Map(),
    Jc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Jc.push("scrollEnd");
  function an(e, t) {
    Bp.set(e, t), Ul(t, [e]);
  }
  var Yo = typeof reportError == "function" ? reportError : function (e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    },
    Lt = [],
    sa = 0,
    Ls = 0;
  function yu() {
    for (var e = sa, t = Ls = sa = 0; t < e;) {
      var n = Lt[t];
      Lt[t++] = null;
      var l = Lt[t];
      Lt[t++] = null;
      var a = Lt[t];
      Lt[t++] = null;
      var i = Lt[t];
      if (Lt[t++] = null, l !== null && a !== null) {
        var u = l.pending;
        u === null ? a.next = a : (a.next = u.next, u.next = a), l.pending = a;
      }
      i !== 0 && Rp(n, a, i);
    }
  }
  function vu(e, t, n, l) {
    Lt[sa++] = e, Lt[sa++] = t, Lt[sa++] = n, Lt[sa++] = l, Ls |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Ys(e, t, n, l) {
    return vu(e, t, n, l), Go(e);
  }
  function Hl(e, t) {
    return vu(e, null, null, t), Go(e);
  }
  function Rp(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var a = !1, i = e.return; i !== null;) i.childLanes |= n, l = i.alternate, l !== null && (l.childLanes |= n), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (a = !0)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, a && t !== null && (a = 31 - Mt(n), e = i.hiddenUpdates, l = e[a], l === null ? e[a] = [t] : l.push(t), t.lane = n | 536870912), i) : null;
  }
  function Go(e) {
    if (50 < hi) throw hi = 0, vs = null, Error(A(185));
    for (var t = e.return; t !== null;) e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ra = {};
  function X1(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Dt(e, t, n, l) {
    return new X1(e, t, n, l);
  }
  function Gs(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Tn(e, t) {
    var n = e.alternate;
    return n === null ? (n = Dt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Mp(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Co(e, t, n, l, a, i) {
    var u = 0;
    if (l = e, typeof e == "function") Gs(e) && (u = 1);else if (typeof e == "string") u = Jy(e, n, dn.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;else e: switch (e) {
      case wc:
        return e = Dt(31, n, t, a), e.elementType = wc, e.lanes = i, e;
      case na:
        return Dl(n.children, a, i, t);
      case Jf:
        u = 8, a |= 24;
        break;
      case kc:
        return e = Dt(12, n, t, a | 2), e.elementType = kc, e.lanes = i, e;
      case qc:
        return e = Dt(13, n, t, a), e.elementType = qc, e.lanes = i, e;
      case Uc:
        return e = Dt(19, n, t, a), e.elementType = Uc, e.lanes = i, e;
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case _n:
            u = 10;
            break e;
          case Wf:
            u = 9;
            break e;
          case Bs:
            u = 11;
            break e;
          case Rs:
            u = 14;
            break e;
          case Vn:
            u = 16, l = null;
            break e;
        }
        u = 29, n = Error(A(130, e === null ? "null" : typeof e, "")), l = null;
    }
    return t = Dt(u, n, t, a), t.elementType = e, t.type = l, t.lanes = i, t;
  }
  function Dl(e, t, n, l) {
    return e = Dt(7, e, l, t), e.lanes = n, e;
  }
  function fc(e, t, n) {
    return e = Dt(6, e, null, t), e.lanes = n, e;
  }
  function Op(e) {
    var t = Dt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function pc(e, t, n) {
    return t = Dt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Ld = new WeakMap();
  function Zt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Ld.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: Ed(t)
      }, Ld.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Ed(t)
    };
  }
  var da = [],
    fa = 0,
    Vo = null,
    Ai = 0,
    Gt = [],
    Vt = 0,
    rl = null,
    cn = 1,
    sn = "";
  function zn(e, t) {
    da[fa++] = Ai, da[fa++] = Vo, Vo = e, Ai = t;
  }
  function Np(e, t, n) {
    Gt[Vt++] = cn, Gt[Vt++] = sn, Gt[Vt++] = rl, rl = e;
    var l = cn;
    e = sn;
    var a = 32 - Mt(l) - 1;
    l &= ~(1 << a), n += 1;
    var i = 32 - Mt(t) + a;
    if (30 < i) {
      var u = a - a % 5;
      i = (l & (1 << u) - 1).toString(32), l >>= u, a -= u, cn = 1 << 32 - Mt(t) + a | n << a | l, sn = i + e;
    } else cn = 1 << i | n << a | l, sn = e;
  }
  function Vs(e) {
    e.return !== null && (zn(e, 1), Np(e, 1, 0));
  }
  function Qs(e) {
    for (; e === Vo;) Vo = da[--fa], da[fa] = null, Ai = da[--fa], da[fa] = null;
    for (; e === rl;) rl = Gt[--Vt], Gt[Vt] = null, sn = Gt[--Vt], Gt[Vt] = null, cn = Gt[--Vt], Gt[Vt] = null;
  }
  function kp(e, t) {
    Gt[Vt++] = cn, Gt[Vt++] = sn, Gt[Vt++] = rl, cn = t.id, sn = t.overflow, rl = e;
  }
  var tt = null,
    xe = null,
    oe = !1,
    nl = null,
    Xt = !1,
    Wc = Error(A(519));
  function dl(e) {
    var t = Error(A(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw _i(Zt(t, e)), Wc;
  }
  function Yd(e) {
    var t = e.stateNode,
      n = e.type,
      l = e.memoizedProps;
    switch (t[et] = e, t[zt] = l, n) {
      case "dialog":
        te("cancel", t), te("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        te("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Bi.length; n++) te(Bi[n], t);
        break;
      case "source":
        te("error", t);
        break;
      case "img":
      case "image":
      case "link":
        te("error", t), te("load", t);
        break;
      case "details":
        te("toggle", t);
        break;
      case "input":
        te("invalid", t), rp(t, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0);
        break;
      case "select":
        te("invalid", t);
        break;
      case "textarea":
        te("invalid", t), fp(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || y0(t.textContent, n) ? (l.popover != null && (te("beforetoggle", t), te("toggle", t)), l.onScroll != null && te("scroll", t), l.onScrollEnd != null && te("scrollend", t), l.onClick != null && (t.onclick = Cn), t = !0) : t = !1, t || dl(e, !0);
  }
  function Gd(e) {
    for (tt = e.return; tt;) switch (tt.tag) {
      case 5:
      case 31:
      case 13:
        Xt = !1;
        return;
      case 27:
      case 3:
        Xt = !0;
        return;
      default:
        tt = tt.return;
    }
  }
  function Il(e) {
    if (e !== tt) return !1;
    if (!oe) return Gd(e), oe = !0, !1;
    var t = e.tag,
      n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Es(e.type, e.memoizedProps)), n = !n), n && xe && dl(e), Gd(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(A(317));
      xe = Of(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(A(317));
      xe = Of(e);
    } else t === 27 ? (t = xe, gl(e.type) ? (e = Cs, Cs = null, xe = e) : xe = t) : xe = tt ? Kt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ml() {
    xe = tt = null, oe = !1;
  }
  function mc() {
    var e = nl;
    return e !== null && (xt === null ? xt = e : xt.push.apply(xt, e), nl = null), e;
  }
  function _i(e) {
    nl === null ? nl = [e] : nl.push(e);
  }
  var Ic = fn(null),
    jl = null,
    Dn = null;
  function Zn(e, t, n) {
    he(Ic, t._currentValue), t._currentValue = n;
  }
  function Bn(e) {
    e._currentValue = Ic.current, Ze(Ic);
  }
  function Pc(e, t, n) {
    for (; e !== null;) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function es(e, t, n, l) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null;) {
      var i = a.dependencies;
      if (i !== null) {
        var u = a.child;
        i = i.firstContext;
        e: for (; i !== null;) {
          var s = i;
          i = a;
          for (var r = 0; r < t.length; r++) if (s.context === t[r]) {
            i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), Pc(i.return, n, e), l || (u = null);
            break e;
          }
          i = s.next;
        }
      } else if (a.tag === 18) {
        if (u = a.return, u === null) throw Error(A(341));
        u.lanes |= n, i = u.alternate, i !== null && (i.lanes |= n), Pc(u, n, e), u = null;
      } else u = a.child;
      if (u !== null) u.return = a;else for (u = a; u !== null;) {
        if (u === e) {
          u = null;
          break;
        }
        if (a = u.sibling, a !== null) {
          a.return = u.return, u = a;
          break;
        }
        u = u.return;
      }
      a = u;
    }
  }
  function ka(e, t, n, l) {
    e = null;
    for (var a = t, i = !1; a !== null;) {
      if (!i) {
        if ((a.flags & 524288) !== 0) i = !0;else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var u = a.alternate;
        if (u === null) throw Error(A(387));
        if (u = u.memoizedProps, u !== null) {
          var s = a.type;
          Nt(a.pendingProps.value, u.value) || (e !== null ? e.push(s) : e = [s]);
        }
      } else if (a === wo.current) {
        if (u = a.alternate, u === null) throw Error(A(387));
        u.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e !== null ? e.push(Mi) : e = [Mi]);
      }
      a = a.return;
    }
    e !== null && es(t, e, n, l), t.flags |= 262144;
  }
  function Qo(e) {
    for (e = e.firstContext; e !== null;) {
      if (!Nt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Ol(e) {
    jl = e, Dn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function nt(e) {
    return qp(jl, e);
  }
  function fo(e, t) {
    return jl === null && Ol(e), qp(e, t);
  }
  function qp(e, t) {
    var n = t._currentValue;
    if (t = {
      context: t,
      memoizedValue: n,
      next: null
    }, Dn === null) {
      if (e === null) throw Error(A(308));
      Dn = t, e.dependencies = {
        lanes: 0,
        firstContext: t
      }, e.flags |= 524288;
    } else Dn = Dn.next = t;
    return n;
  }
  var $1 = typeof AbortController < "u" ? AbortController : function () {
      var e = [],
        t = this.signal = {
          aborted: !1,
          addEventListener: function (n, l) {
            e.push(l);
          }
        };
      this.abort = function () {
        t.aborted = !0, e.forEach(function (n) {
          return n();
        });
      };
    },
    K1 = Le.unstable_scheduleCallback,
    J1 = Le.unstable_NormalPriority,
    we = {
      $$typeof: _n,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
  function Zs() {
    return {
      controller: new $1(),
      data: new Map(),
      refCount: 0
    };
  }
  function ji(e) {
    e.refCount--, e.refCount === 0 && K1(J1, function () {
      e.controller.abort();
    });
  }
  var ri = null,
    ts = 0,
    Aa = 0,
    va = null;
  function W1(e, t) {
    if (ri === null) {
      var n = ri = [];
      ts = 0, Aa = vr(), va = {
        status: "pending",
        value: void 0,
        then: function (l) {
          n.push(l);
        }
      };
    }
    return ts++, t.then(Vd, Vd), t;
  }
  function Vd() {
    if (--ts === 0 && ri !== null) {
      va !== null && (va.status = "fulfilled");
      var e = ri;
      ri = null, Aa = 0, va = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function I1(e, t) {
    var n = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (a) {
          n.push(a);
        }
      };
    return e.then(function () {
      l.status = "fulfilled", l.value = t;
      for (var a = 0; a < n.length; a++) (0, n[a])(t);
    }, function (a) {
      for (l.status = "rejected", l.reason = a, a = 0; a < n.length; a++) (0, n[a])(void 0);
    }), l;
  }
  var Qd = Z.S;
  Z.S = function (e, t) {
    Km = Bt(), typeof t == "object" && t !== null && typeof t.then == "function" && W1(e, t), Qd !== null && Qd(e, t);
  };
  var Tl = fn(null);
  function Xs() {
    var e = Tl.current;
    return e !== null ? e : ve.pooledCache;
  }
  function Do(e, t) {
    t === null ? he(Tl, Tl.current) : he(Tl, t.pool);
  }
  function Up() {
    var e = Xs();
    return e === null ? null : {
      parent: we._currentValue,
      pool: e
    };
  }
  var qa = Error(A(460)),
    $s = Error(A(474)),
    hu = Error(A(542)),
    Zo = {
      then: function () {}
    };
  function Zd(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function wp(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Cn, Cn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, $d(e), e;
      default:
        if (typeof t.status == "string") t.then(Cn, Cn);else {
          if (e = ve, e !== null && 100 < e.shellSuspendCounter) throw Error(A(482));
          e = t, e.status = "pending", e.then(function (l) {
            if (t.status === "pending") {
              var a = t;
              a.status = "fulfilled", a.value = l;
            }
          }, function (l) {
            if (t.status === "pending") {
              var a = t;
              a.status = "rejected", a.reason = l;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, $d(e), e;
        }
        throw Bl = t, qa;
    }
  }
  function Al(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Bl = n, qa) : n;
    }
  }
  var Bl = null;
  function Xd() {
    if (Bl === null) throw Error(A(459));
    var e = Bl;
    return Bl = null, e;
  }
  function $d(e) {
    if (e === qa || e === hu) throw Error(A(483));
  }
  var ha = null,
    Ci = 0;
  function po(e) {
    var t = Ci;
    return Ci += 1, ha === null && (ha = []), wp(ha, e, t);
  }
  function Wa(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function mo(e, t) {
    throw t.$$typeof === Fg ? Error(A(525)) : (e = Object.prototype.toString.call(t), Error(A(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
  }
  function Fp(e) {
    function t(f, m) {
      if (e) {
        var d = f.deletions;
        d === null ? (f.deletions = [m], f.flags |= 16) : d.push(m);
      }
    }
    function n(f, m) {
      if (!e) return null;
      for (; m !== null;) t(f, m), m = m.sibling;
      return null;
    }
    function l(f) {
      for (var m = new Map(); f !== null;) f.key !== null ? m.set(f.key, f) : m.set(f.index, f), f = f.sibling;
      return m;
    }
    function a(f, m) {
      return f = Tn(f, m), f.index = 0, f.sibling = null, f;
    }
    function i(f, m, d) {
      return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < m ? (f.flags |= 67108866, m) : d) : (f.flags |= 67108866, m)) : (f.flags |= 1048576, m);
    }
    function u(f) {
      return e && f.alternate === null && (f.flags |= 67108866), f;
    }
    function s(f, m, d, h) {
      return m === null || m.tag !== 6 ? (m = fc(d, f.mode, h), m.return = f, m) : (m = a(m, d), m.return = f, m);
    }
    function r(f, m, d, h) {
      var w = d.type;
      return w === na ? S(f, m, d.props.children, h, d.key) : m !== null && (m.elementType === w || typeof w == "object" && w !== null && w.$$typeof === Vn && Al(w) === m.type) ? (m = a(m, d.props), Wa(m, d), m.return = f, m) : (m = Co(d.type, d.key, d.props, null, f.mode, h), Wa(m, d), m.return = f, m);
    }
    function v(f, m, d, h) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== d.containerInfo || m.stateNode.implementation !== d.implementation ? (m = pc(d, f.mode, h), m.return = f, m) : (m = a(m, d.children || []), m.return = f, m);
    }
    function S(f, m, d, h, w) {
      return m === null || m.tag !== 7 ? (m = Dl(d, f.mode, h, w), m.return = f, m) : (m = a(m, d), m.return = f, m);
    }
    function E(f, m, d) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint") return m = fc("" + m, f.mode, d), m.return = f, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case lo:
            return d = Co(m.type, m.key, m.props, null, f.mode, d), Wa(d, m), d.return = f, d;
          case ni:
            return m = pc(m, f.mode, d), m.return = f, m;
          case Vn:
            return m = Al(m), E(f, m, d);
        }
        if (li(m) || Ka(m)) return m = Dl(m, f.mode, d, null), m.return = f, m;
        if (typeof m.then == "function") return E(f, po(m), d);
        if (m.$$typeof === _n) return E(f, fo(f, m), d);
        mo(f, m);
      }
      return null;
    }
    function g(f, m, d, h) {
      var w = m !== null ? m.key : null;
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint") return w !== null ? null : s(f, m, "" + d, h);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case lo:
            return d.key === w ? r(f, m, d, h) : null;
          case ni:
            return d.key === w ? v(f, m, d, h) : null;
          case Vn:
            return d = Al(d), g(f, m, d, h);
        }
        if (li(d) || Ka(d)) return w !== null ? null : S(f, m, d, h, null);
        if (typeof d.then == "function") return g(f, m, po(d), h);
        if (d.$$typeof === _n) return g(f, m, fo(f, d), h);
        mo(f, d);
      }
      return null;
    }
    function p(f, m, d, h, w) {
      if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint") return f = f.get(d) || null, s(m, f, "" + h, w);
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case lo:
            return f = f.get(h.key === null ? d : h.key) || null, r(m, f, h, w);
          case ni:
            return f = f.get(h.key === null ? d : h.key) || null, v(m, f, h, w);
          case Vn:
            return h = Al(h), p(f, m, d, h, w);
        }
        if (li(h) || Ka(h)) return f = f.get(d) || null, S(m, f, h, w, null);
        if (typeof h.then == "function") return p(f, m, d, po(h), w);
        if (h.$$typeof === _n) return p(f, m, d, fo(m, h), w);
        mo(m, h);
      }
      return null;
    }
    function R(f, m, d, h) {
      for (var w = null, B = null, M = m, Y = m = 0, O = null; M !== null && Y < d.length; Y++) {
        M.index > Y ? (O = M, M = null) : O = M.sibling;
        var L = g(f, M, d[Y], h);
        if (L === null) {
          M === null && (M = O);
          break;
        }
        e && M && L.alternate === null && t(f, M), m = i(L, m, Y), B === null ? w = L : B.sibling = L, B = L, M = O;
      }
      if (Y === d.length) return n(f, M), oe && zn(f, Y), w;
      if (M === null) {
        for (; Y < d.length; Y++) M = E(f, d[Y], h), M !== null && (m = i(M, m, Y), B === null ? w = M : B.sibling = M, B = M);
        return oe && zn(f, Y), w;
      }
      for (M = l(M); Y < d.length; Y++) O = p(M, f, Y, d[Y], h), O !== null && (e && O.alternate !== null && M.delete(O.key === null ? Y : O.key), m = i(O, m, Y), B === null ? w = O : B.sibling = O, B = O);
      return e && M.forEach(function (de) {
        return t(f, de);
      }), oe && zn(f, Y), w;
    }
    function k(f, m, d, h) {
      if (d == null) throw Error(A(151));
      for (var w = null, B = null, M = m, Y = m = 0, O = null, L = d.next(); M !== null && !L.done; Y++, L = d.next()) {
        M.index > Y ? (O = M, M = null) : O = M.sibling;
        var de = g(f, M, L.value, h);
        if (de === null) {
          M === null && (M = O);
          break;
        }
        e && M && de.alternate === null && t(f, M), m = i(de, m, Y), B === null ? w = de : B.sibling = de, B = de, M = O;
      }
      if (L.done) return n(f, M), oe && zn(f, Y), w;
      if (M === null) {
        for (; !L.done; Y++, L = d.next()) L = E(f, L.value, h), L !== null && (m = i(L, m, Y), B === null ? w = L : B.sibling = L, B = L);
        return oe && zn(f, Y), w;
      }
      for (M = l(M); !L.done; Y++, L = d.next()) L = p(M, f, Y, L.value, h), L !== null && (e && L.alternate !== null && M.delete(L.key === null ? Y : L.key), m = i(L, m, Y), B === null ? w = L : B.sibling = L, B = L);
      return e && M.forEach(function (gt) {
        return t(f, gt);
      }), oe && zn(f, Y), w;
    }
    function Q(f, m, d, h) {
      if (typeof d == "object" && d !== null && d.type === na && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case lo:
            e: {
              for (var w = d.key; m !== null;) {
                if (m.key === w) {
                  if (w = d.type, w === na) {
                    if (m.tag === 7) {
                      n(f, m.sibling), h = a(m, d.props.children), h.return = f, f = h;
                      break e;
                    }
                  } else if (m.elementType === w || typeof w == "object" && w !== null && w.$$typeof === Vn && Al(w) === m.type) {
                    n(f, m.sibling), h = a(m, d.props), Wa(h, d), h.return = f, f = h;
                    break e;
                  }
                  n(f, m);
                  break;
                } else t(f, m);
                m = m.sibling;
              }
              d.type === na ? (h = Dl(d.props.children, f.mode, h, d.key), h.return = f, f = h) : (h = Co(d.type, d.key, d.props, null, f.mode, h), Wa(h, d), h.return = f, f = h);
            }
            return u(f);
          case ni:
            e: {
              for (w = d.key; m !== null;) {
                if (m.key === w) {
                  if (m.tag === 4 && m.stateNode.containerInfo === d.containerInfo && m.stateNode.implementation === d.implementation) {
                    n(f, m.sibling), h = a(m, d.children || []), h.return = f, f = h;
                    break e;
                  } else {
                    n(f, m);
                    break;
                  }
                } else t(f, m);
                m = m.sibling;
              }
              h = pc(d, f.mode, h), h.return = f, f = h;
            }
            return u(f);
          case Vn:
            return d = Al(d), Q(f, m, d, h);
        }
        if (li(d)) return R(f, m, d, h);
        if (Ka(d)) {
          if (w = Ka(d), typeof w != "function") throw Error(A(150));
          return d = w.call(d), k(f, m, d, h);
        }
        if (typeof d.then == "function") return Q(f, m, po(d), h);
        if (d.$$typeof === _n) return Q(f, m, fo(f, d), h);
        mo(f, d);
      }
      return typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint" ? (d = "" + d, m !== null && m.tag === 6 ? (n(f, m.sibling), h = a(m, d), h.return = f, f = h) : (n(f, m), h = fc(d, f.mode, h), h.return = f, f = h), u(f)) : n(f, m);
    }
    return function (f, m, d, h) {
      try {
        Ci = 0;
        var w = Q(f, m, d, h);
        return ha = null, w;
      } catch (M) {
        if (M === qa || M === hu) throw M;
        var B = Dt(29, M, null, f.mode);
        return B.lanes = h, B.return = f, B;
      }
    };
  }
  var Nl = Fp(!0),
    Hp = Fp(!1),
    Qn = !1;
  function Ks(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        lanes: 0,
        hiddenCallbacks: null
      },
      callbacks: null
    };
  }
  function ns(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ll(e) {
    return {
      lane: e,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function al(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (ce & 2) !== 0) {
      var a = l.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t, t = Go(e), Rp(e, null, n), t;
    }
    return vu(e, l, t, n), Go(e);
  }
  function di(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, lp(e, n);
    }
  }
  function gc(e, t) {
    var n = e.updateQueue,
      l = e.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var a = null,
        i = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var u = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          i === null ? a = i = u : i = i.next = u, n = n.next;
        } while (n !== null);
        i === null ? a = i = t : i = i.next = t;
      } else a = i = t;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: i,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var ls = !1;
  function fi() {
    if (ls) {
      var e = va;
      if (e !== null) throw e;
    }
  }
  function pi(e, t, n, l) {
    ls = !1;
    var a = e.updateQueue;
    Qn = !1;
    var i = a.firstBaseUpdate,
      u = a.lastBaseUpdate,
      s = a.shared.pending;
    if (s !== null) {
      a.shared.pending = null;
      var r = s,
        v = r.next;
      r.next = null, u === null ? i = v : u.next = v, u = r;
      var S = e.alternate;
      S !== null && (S = S.updateQueue, s = S.lastBaseUpdate, s !== u && (s === null ? S.firstBaseUpdate = v : s.next = v, S.lastBaseUpdate = r));
    }
    if (i !== null) {
      var E = a.baseState;
      u = 0, S = v = r = null, s = i;
      do {
        var g = s.lane & -536870913,
          p = g !== s.lane;
        if (p ? (ae & g) === g : (l & g) === g) {
          g !== 0 && g === Aa && (ls = !0), S !== null && (S = S.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          e: {
            var R = e,
              k = s;
            g = t;
            var Q = n;
            switch (k.tag) {
              case 1:
                if (R = k.payload, typeof R == "function") {
                  E = R.call(Q, E, g);
                  break e;
                }
                E = R;
                break e;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = k.payload, g = typeof R == "function" ? R.call(Q, E, g) : R, g == null) break e;
                E = Ee({}, E, g);
                break e;
              case 2:
                Qn = !0;
            }
          }
          g = s.callback, g !== null && (e.flags |= 64, p && (e.flags |= 8192), p = a.callbacks, p === null ? a.callbacks = [g] : p.push(g));
        } else p = {
          lane: g,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        }, S === null ? (v = S = p, r = E) : S = S.next = p, u |= g;
        if (s = s.next, s === null) {
          if (s = a.shared.pending, s === null) break;
          p = s, s = p.next, p.next = null, a.lastBaseUpdate = p, a.shared.pending = null;
        }
      } while (!0);
      S === null && (r = E), a.baseState = r, a.firstBaseUpdate = v, a.lastBaseUpdate = S, i === null && (a.shared.lanes = 0), pl |= u, e.lanes = u, e.memoizedState = E;
    }
  }
  function jp(e, t) {
    if (typeof e != "function") throw Error(A(191, e));
    e.call(t);
  }
  function Lp(e, t) {
    var n = e.callbacks;
    if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) jp(n[e], t);
  }
  var _a = fn(null),
    Xo = fn(0);
  function Kd(e, t) {
    e = qn, he(Xo, e), he(_a, t), qn = e | t.baseLanes;
  }
  function as() {
    he(Xo, qn), he(_a, _a.current);
  }
  function Js() {
    qn = Xo.current, Ze(_a), Ze(Xo);
  }
  var kt = fn(null),
    $t = null;
  function Xn(e) {
    var t = e.alternate;
    he(Re, Re.current & 1), he(kt, e), $t === null && (t === null || _a.current !== null || t.memoizedState !== null) && ($t = e);
  }
  function is(e) {
    he(Re, Re.current), he(kt, e), $t === null && ($t = e);
  }
  function Yp(e) {
    e.tag === 22 ? (he(Re, Re.current), he(kt, e), $t === null && ($t = e)) : $n(e);
  }
  function $n() {
    he(Re, Re.current), he(kt, kt.current);
  }
  function Ct(e) {
    Ze(kt), $t === e && ($t = null), Ze(Re);
  }
  var Re = fn(0);
  function $o(e) {
    for (var t = e; t !== null;) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || As(n) || _s(n))) return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var On = 0,
    I = null,
    ge = null,
    qe = null,
    Ko = !1,
    ba = !1,
    kl = !1,
    Jo = 0,
    Di = 0,
    Sa = null,
    P1 = 0;
  function Te() {
    throw Error(A(321));
  }
  function Ws(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!Nt(e[n], t[n])) return !1;
    return !0;
  }
  function Is(e, t, n, l, a, i) {
    return On = i, I = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Z.H = e === null || e.memoizedState === null ? bm : sr, kl = !1, i = n(l, a), kl = !1, ba && (i = Vp(t, n, l, a)), Gp(e), i;
  }
  function Gp(e) {
    Z.H = Ti;
    var t = ge !== null && ge.next !== null;
    if (On = 0, qe = ge = I = null, Ko = !1, Di = 0, Sa = null, t) throw Error(A(300));
    e === null || Fe || (e = e.dependencies, e !== null && Qo(e) && (Fe = !0));
  }
  function Vp(e, t, n, l) {
    I = e;
    var a = 0;
    do {
      if (ba && (Sa = null), Di = 0, ba = !1, 25 <= a) throw Error(A(301));
      if (a += 1, qe = ge = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      Z.H = Sm, i = t(n, l);
    } while (ba);
    return i;
  }
  function ey() {
    var e = Z.H,
      t = e.useState()[0];
    return t = typeof t.then == "function" ? Li(t) : t, e = e.useState()[0], (ge !== null ? ge.memoizedState : null) !== e && (I.flags |= 1024), t;
  }
  function Ps() {
    var e = Jo !== 0;
    return Jo = 0, e;
  }
  function er(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function tr(e) {
    if (Ko) {
      for (e = e.memoizedState; e !== null;) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ko = !1;
    }
    On = 0, qe = ge = I = null, ba = !1, Di = Jo = 0, Sa = null;
  }
  function mt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return qe === null ? I.memoizedState = qe = e : qe = qe.next = e, qe;
  }
  function Me() {
    if (ge === null) {
      var e = I.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ge.next;
    var t = qe === null ? I.memoizedState : qe.next;
    if (t !== null) qe = t, ge = e;else {
      if (e === null) throw I.alternate === null ? Error(A(467)) : Error(A(310));
      ge = e, e = {
        memoizedState: ge.memoizedState,
        baseState: ge.baseState,
        baseQueue: ge.baseQueue,
        queue: ge.queue,
        next: null
      }, qe === null ? I.memoizedState = qe = e : qe = qe.next = e;
    }
    return qe;
  }
  function bu() {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null
    };
  }
  function Li(e) {
    var t = Di;
    return Di += 1, Sa === null && (Sa = []), e = wp(Sa, e, t), t = I, (qe === null ? t.memoizedState : qe.next) === null && (t = t.alternate, Z.H = t === null || t.memoizedState === null ? bm : sr), e;
  }
  function Su(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Li(e);
      if (e.$$typeof === _n) return nt(e);
    }
    throw Error(A(438, String(e)));
  }
  function nr(e) {
    var t = null,
      n = I.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = I.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function (a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = {
      data: [],
      index: 0
    }), n === null && (n = bu(), I.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), l = 0; l < e; l++) n[l] = Hg;
    return t.index++, n;
  }
  function Nn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function To(e) {
    var t = Me();
    return lr(t, ge, e);
  }
  function lr(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(A(311));
    l.lastRenderedReducer = n;
    var a = e.baseQueue,
      i = l.pending;
    if (i !== null) {
      if (a !== null) {
        var u = a.next;
        a.next = i.next, i.next = u;
      }
      t.baseQueue = a = i, l.pending = null;
    }
    if (i = e.baseState, a === null) e.memoizedState = i;else {
      t = a.next;
      var s = u = null,
        r = null,
        v = t,
        S = !1;
      do {
        var E = v.lane & -536870913;
        if (E !== v.lane ? (ae & E) === E : (On & E) === E) {
          var g = v.revertLane;
          if (g === 0) r !== null && (r = r.next = {
            lane: 0,
            revertLane: 0,
            gesture: null,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }), E === Aa && (S = !0);else if ((On & g) === g) {
            v = v.next, g === Aa && (S = !0);
            continue;
          } else E = {
            lane: 0,
            revertLane: v.revertLane,
            gesture: null,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }, r === null ? (s = r = E, u = i) : r = r.next = E, I.lanes |= g, pl |= g;
          E = v.action, kl && n(i, E), i = v.hasEagerState ? v.eagerState : n(i, E);
        } else g = {
          lane: E,
          revertLane: v.revertLane,
          gesture: v.gesture,
          action: v.action,
          hasEagerState: v.hasEagerState,
          eagerState: v.eagerState,
          next: null
        }, r === null ? (s = r = g, u = i) : r = r.next = g, I.lanes |= E, pl |= E;
        v = v.next;
      } while (v !== null && v !== t);
      if (r === null ? u = i : r.next = s, !Nt(i, e.memoizedState) && (Fe = !0, S && (n = va, n !== null))) throw n;
      e.memoizedState = i, e.baseState = u, e.baseQueue = r, l.lastRenderedState = i;
    }
    return a === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function yc(e) {
    var t = Me(),
      n = t.queue;
    if (n === null) throw Error(A(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch,
      a = n.pending,
      i = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var u = a = a.next;
      do i = e(i, u.action), u = u.next; while (u !== a);
      Nt(i, t.memoizedState) || (Fe = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
    }
    return [i, l];
  }
  function Qp(e, t, n) {
    var l = I,
      a = Me(),
      i = oe;
    if (i) {
      if (n === void 0) throw Error(A(407));
      n = n();
    } else n = t();
    var u = !Nt((ge || a).memoizedState, n);
    if (u && (a.memoizedState = n, Fe = !0), a = a.queue, ar($p.bind(null, l, a, e), [e]), a.getSnapshot !== t || u || qe !== null && qe.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ca(9, {
        destroy: void 0
      }, Xp.bind(null, l, a, n, t), null), ve === null) throw Error(A(349));
      i || (On & 127) !== 0 || Zp(l, t, n);
    }
    return n;
  }
  function Zp(e, t, n) {
    e.flags |= 16384, e = {
      getSnapshot: t,
      value: n
    }, t = I.updateQueue, t === null ? (t = bu(), I.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Xp(e, t, n, l) {
    t.value = n, t.getSnapshot = l, Kp(t) && Jp(e);
  }
  function $p(e, t, n) {
    return n(function () {
      Kp(t) && Jp(e);
    });
  }
  function Kp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Nt(e, n);
    } catch {
      return !0;
    }
  }
  function Jp(e) {
    var t = Hl(e, 2);
    t !== null && Et(t, e, 2);
  }
  function os(e) {
    var t = mt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), kl) {
        Jn(!0);
        try {
          n();
        } finally {
          Jn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Nn,
      lastRenderedState: e
    }, t;
  }
  function Wp(e, t, n, l) {
    return e.baseState = n, lr(e, ge, typeof l == "function" ? l : Nn);
  }
  function ty(e, t, n, l, a) {
    if (Eu(e)) throw Error(A(485));
    if (e = t.action, e !== null) {
      var i = {
        payload: a,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (u) {
          i.listeners.push(u);
        }
      };
      Z.T !== null ? n(!0) : i.isTransition = !1, l(i), n = t.pending, n === null ? (i.next = t.pending = i, Ip(t, i)) : (i.next = n.next, t.pending = n.next = i);
    }
  }
  function Ip(e, t) {
    var n = t.action,
      l = t.payload,
      a = e.state;
    if (t.isTransition) {
      var i = Z.T,
        u = {};
      Z.T = u;
      try {
        var s = n(a, l),
          r = Z.S;
        r !== null && r(u, s), Jd(e, t, s);
      } catch (v) {
        us(e, t, v);
      } finally {
        i !== null && u.types !== null && (i.types = u.types), Z.T = i;
      }
    } else try {
      i = n(a, l), Jd(e, t, i);
    } catch (v) {
      us(e, t, v);
    }
  }
  function Jd(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(function (l) {
      Wd(e, t, l);
    }, function (l) {
      return us(e, t, l);
    }) : Wd(e, t, n);
  }
  function Wd(e, t, n) {
    t.status = "fulfilled", t.value = n, Pp(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ip(e, n)));
  }
  function us(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do t.status = "rejected", t.reason = n, Pp(t), t = t.next; while (t !== l);
    }
    e.action = null;
  }
  function Pp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function em(e, t) {
    return t;
  }
  function Id(e, t) {
    if (oe) {
      var n = ve.formState;
      if (n !== null) {
        e: {
          var l = I;
          if (oe) {
            if (xe) {
              t: {
                for (var a = xe, i = Xt; a.nodeType !== 8;) {
                  if (!i) {
                    a = null;
                    break t;
                  }
                  if (a = Kt(a.nextSibling), a === null) {
                    a = null;
                    break t;
                  }
                }
                i = a.data, a = i === "F!" || i === "F" ? a : null;
              }
              if (a) {
                xe = Kt(a.nextSibling), l = a.data === "F!";
                break e;
              }
            }
            dl(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = mt(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: em,
      lastRenderedState: t
    }, n.queue = l, n = ym.bind(null, I, l), l.dispatch = n, l = os(!1), i = cr.bind(null, I, !1, l.queue), l = mt(), a = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = a, n = ty.bind(null, I, a, i, n), a.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function Pd(e) {
    var t = Me();
    return tm(t, ge, e);
  }
  function tm(e, t, n) {
    if (t = lr(e, t, em)[0], e = To(Nn)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var l = Li(t);
    } catch (u) {
      throw u === qa ? hu : u;
    } else l = t;
    t = Me();
    var a = t.queue,
      i = a.dispatch;
    return n !== t.memoizedState && (I.flags |= 2048, Ca(9, {
      destroy: void 0
    }, ny.bind(null, a, n), null)), [l, i, e];
  }
  function ny(e, t) {
    e.action = t;
  }
  function ef(e) {
    var t = Me(),
      n = ge;
    if (n !== null) return tm(t, n, e);
    Me(), t = t.memoizedState, n = Me();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function Ca(e, t, n, l) {
    return e = {
      tag: e,
      create: n,
      deps: l,
      inst: t,
      next: null
    }, t = I.updateQueue, t === null && (t = bu(), I.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function nm() {
    return Me().memoizedState;
  }
  function Bo(e, t, n, l) {
    var a = mt();
    I.flags |= e, a.memoizedState = Ca(1 | t, {
      destroy: void 0
    }, n, l === void 0 ? null : l);
  }
  function xu(e, t, n, l) {
    var a = Me();
    l = l === void 0 ? null : l;
    var i = a.memoizedState.inst;
    ge !== null && l !== null && Ws(l, ge.memoizedState.deps) ? a.memoizedState = Ca(t, i, n, l) : (I.flags |= e, a.memoizedState = Ca(1 | t, i, n, l));
  }
  function tf(e, t) {
    Bo(8390656, 8, e, t);
  }
  function ar(e, t) {
    xu(2048, 8, e, t);
  }
  function ly(e) {
    I.flags |= 4;
    var t = I.updateQueue;
    if (t === null) t = bu(), I.updateQueue = t, t.events = [e];else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function lm(e) {
    var t = Me().memoizedState;
    return ly({
      ref: t,
      nextImpl: e
    }), function () {
      if ((ce & 2) !== 0) throw Error(A(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function am(e, t) {
    return xu(4, 2, e, t);
  }
  function im(e, t) {
    return xu(4, 4, e, t);
  }
  function om(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null) return e = e(), t.current = e, function () {
      t.current = null;
    };
  }
  function um(e, t, n) {
    n = n != null ? n.concat([e]) : null, xu(4, 4, om.bind(null, t, e), n);
  }
  function ir() {}
  function cm(e, t) {
    var n = Me();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && Ws(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function sm(e, t) {
    var n = Me();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && Ws(t, l[1])) return l[0];
    if (l = e(), kl) {
      Jn(!0);
      try {
        e();
      } finally {
        Jn(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function or(e, t, n) {
    return n === void 0 || (On & 1073741824) !== 0 && (ae & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = Wm(), I.lanes |= e, pl |= e, n);
  }
  function rm(e, t, n, l) {
    return Nt(n, t) ? n : _a.current !== null ? (e = or(e, n, l), Nt(e, t) || (Fe = !0), e) : (On & 42) === 0 || (On & 1073741824) !== 0 && (ae & 261930) === 0 ? (Fe = !0, e.memoizedState = n) : (e = Wm(), I.lanes |= e, pl |= e, t);
  }
  function dm(e, t, n, l, a) {
    var i = se.p;
    se.p = i !== 0 && 8 > i ? i : 8;
    var u = Z.T,
      s = {};
    Z.T = s, cr(e, !1, t, n);
    try {
      var r = a(),
        v = Z.S;
      if (v !== null && v(s, r), r !== null && typeof r == "object" && typeof r.then == "function") {
        var S = I1(r, l);
        mi(e, t, S, Ot(e));
      } else mi(e, t, l, Ot(e));
    } catch (E) {
      mi(e, t, {
        then: function () {},
        status: "rejected",
        reason: E
      }, Ot());
    } finally {
      se.p = i, u !== null && s.types !== null && (u.types = s.types), Z.T = u;
    }
  }
  function ay() {}
  function cs(e, t, n, l) {
    if (e.tag !== 5) throw Error(A(476));
    var a = fm(e).queue;
    dm(e, a, t, Cl, n === null ? ay : function () {
      return pm(e), n(l);
    });
  }
  function fm(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Cl,
      baseState: Cl,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Nn,
        lastRenderedState: Cl
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Nn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function pm(e) {
    var t = fm(e);
    t.next === null && (t = e.alternate.memoizedState), mi(e, t.next.queue, {}, Ot());
  }
  function ur() {
    return nt(Mi);
  }
  function mm() {
    return Me().memoizedState;
  }
  function gm() {
    return Me().memoizedState;
  }
  function iy(e) {
    for (var t = e.return; t !== null;) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Ot();
          e = ll(n);
          var l = al(t, e, n);
          l !== null && (Et(l, t, n), di(l, t, n)), t = {
            cache: Zs()
          }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function oy(e, t, n) {
    var l = Ot();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Eu(e) ? vm(t, n) : (n = Ys(e, t, n, l), n !== null && (Et(n, e, l), hm(n, t, l)));
  }
  function ym(e, t, n) {
    var l = Ot();
    mi(e, t, n, l);
  }
  function mi(e, t, n, l) {
    var a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Eu(e)) vm(t, a);else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
        var u = t.lastRenderedState,
          s = i(u, n);
        if (a.hasEagerState = !0, a.eagerState = s, Nt(s, u)) return vu(e, t, a, 0), ve === null && yu(), !1;
      } catch {}
      if (n = Ys(e, t, a, l), n !== null) return Et(n, e, l), hm(n, t, l), !0;
    }
    return !1;
  }
  function cr(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: vr(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Eu(e)) {
      if (t) throw Error(A(479));
    } else t = Ys(e, n, l, 2), t !== null && Et(t, e, 2);
  }
  function Eu(e) {
    var t = e.alternate;
    return e === I || t !== null && t === I;
  }
  function vm(e, t) {
    ba = Ko = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function hm(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, lp(e, n);
    }
  }
  var Ti = {
    readContext: nt,
    use: Su,
    useCallback: Te,
    useContext: Te,
    useEffect: Te,
    useImperativeHandle: Te,
    useLayoutEffect: Te,
    useInsertionEffect: Te,
    useMemo: Te,
    useReducer: Te,
    useRef: Te,
    useState: Te,
    useDebugValue: Te,
    useDeferredValue: Te,
    useTransition: Te,
    useSyncExternalStore: Te,
    useId: Te,
    useHostTransitionStatus: Te,
    useFormState: Te,
    useActionState: Te,
    useOptimistic: Te,
    useMemoCache: Te,
    useCacheRefresh: Te
  };
  Ti.useEffectEvent = Te;
  var bm = {
      readContext: nt,
      use: Su,
      useCallback: function (e, t) {
        return mt().memoizedState = [e, t === void 0 ? null : t], e;
      },
      useContext: nt,
      useEffect: tf,
      useImperativeHandle: function (e, t, n) {
        n = n != null ? n.concat([e]) : null, Bo(4194308, 4, om.bind(null, t, e), n);
      },
      useLayoutEffect: function (e, t) {
        return Bo(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Bo(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = mt();
        t = t === void 0 ? null : t;
        var l = e();
        if (kl) {
          Jn(!0);
          try {
            e();
          } finally {
            Jn(!1);
          }
        }
        return n.memoizedState = [l, t], l;
      },
      useReducer: function (e, t, n) {
        var l = mt();
        if (n !== void 0) {
          var a = n(t);
          if (kl) {
            Jn(!0);
            try {
              n(t);
            } finally {
              Jn(!1);
            }
          }
        } else a = t;
        return l.memoizedState = l.baseState = a, e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: a
        }, l.queue = e, e = e.dispatch = oy.bind(null, I, e), [l.memoizedState, e];
      },
      useRef: function (e) {
        var t = mt();
        return e = {
          current: e
        }, t.memoizedState = e;
      },
      useState: function (e) {
        e = os(e);
        var t = e.queue,
          n = ym.bind(null, I, t);
        return t.dispatch = n, [e.memoizedState, n];
      },
      useDebugValue: ir,
      useDeferredValue: function (e, t) {
        var n = mt();
        return or(n, e, t);
      },
      useTransition: function () {
        var e = os(!1);
        return e = dm.bind(null, I, e.queue, !0, !1), mt().memoizedState = e, [!1, e];
      },
      useSyncExternalStore: function (e, t, n) {
        var l = I,
          a = mt();
        if (oe) {
          if (n === void 0) throw Error(A(407));
          n = n();
        } else {
          if (n = t(), ve === null) throw Error(A(349));
          (ae & 127) !== 0 || Zp(l, t, n);
        }
        a.memoizedState = n;
        var i = {
          value: n,
          getSnapshot: t
        };
        return a.queue = i, tf($p.bind(null, l, i, e), [e]), l.flags |= 2048, Ca(9, {
          destroy: void 0
        }, Xp.bind(null, l, i, n, t), null), n;
      },
      useId: function () {
        var e = mt(),
          t = ve.identifierPrefix;
        if (oe) {
          var n = sn,
            l = cn;
          n = (l & ~(1 << 32 - Mt(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Jo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
        } else n = P1++, t = "_" + t + "r_" + n.toString(32) + "_";
        return e.memoizedState = t;
      },
      useHostTransitionStatus: ur,
      useFormState: Id,
      useActionState: Id,
      useOptimistic: function (e) {
        var t = mt();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        return t.queue = n, t = cr.bind(null, I, !0, n), n.dispatch = t, [e, t];
      },
      useMemoCache: nr,
      useCacheRefresh: function () {
        return mt().memoizedState = iy.bind(null, I);
      },
      useEffectEvent: function (e) {
        var t = mt(),
          n = {
            impl: e
          };
        return t.memoizedState = n, function () {
          if ((ce & 2) !== 0) throw Error(A(440));
          return n.impl.apply(void 0, arguments);
        };
      }
    },
    sr = {
      readContext: nt,
      use: Su,
      useCallback: cm,
      useContext: nt,
      useEffect: ar,
      useImperativeHandle: um,
      useInsertionEffect: am,
      useLayoutEffect: im,
      useMemo: sm,
      useReducer: To,
      useRef: nm,
      useState: function () {
        return To(Nn);
      },
      useDebugValue: ir,
      useDeferredValue: function (e, t) {
        var n = Me();
        return rm(n, ge.memoizedState, e, t);
      },
      useTransition: function () {
        var e = To(Nn)[0],
          t = Me().memoizedState;
        return [typeof e == "boolean" ? e : Li(e), t];
      },
      useSyncExternalStore: Qp,
      useId: mm,
      useHostTransitionStatus: ur,
      useFormState: Pd,
      useActionState: Pd,
      useOptimistic: function (e, t) {
        var n = Me();
        return Wp(n, ge, e, t);
      },
      useMemoCache: nr,
      useCacheRefresh: gm
    };
  sr.useEffectEvent = lm;
  var Sm = {
    readContext: nt,
    use: Su,
    useCallback: cm,
    useContext: nt,
    useEffect: ar,
    useImperativeHandle: um,
    useInsertionEffect: am,
    useLayoutEffect: im,
    useMemo: sm,
    useReducer: yc,
    useRef: nm,
    useState: function () {
      return yc(Nn);
    },
    useDebugValue: ir,
    useDeferredValue: function (e, t) {
      var n = Me();
      return ge === null ? or(n, e, t) : rm(n, ge.memoizedState, e, t);
    },
    useTransition: function () {
      var e = yc(Nn)[0],
        t = Me().memoizedState;
      return [typeof e == "boolean" ? e : Li(e), t];
    },
    useSyncExternalStore: Qp,
    useId: mm,
    useHostTransitionStatus: ur,
    useFormState: ef,
    useActionState: ef,
    useOptimistic: function (e, t) {
      var n = Me();
      return ge !== null ? Wp(n, ge, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: nr,
    useCacheRefresh: gm
  };
  Sm.useEffectEvent = lm;
  function vc(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : Ee({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var ss = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var l = Ot(),
        a = ll(l);
      a.payload = t, n != null && (a.callback = n), t = al(e, a, l), t !== null && (Et(t, e, l), di(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var l = Ot(),
        a = ll(l);
      a.tag = 1, a.payload = t, n != null && (a.callback = n), t = al(e, a, l), t !== null && (Et(t, e, l), di(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Ot(),
        l = ll(n);
      l.tag = 2, t != null && (l.callback = t), t = al(e, l, n), t !== null && (Et(t, e, n), di(t, e, n));
    }
  };
  function nf(e, t, n, l, a, i, u) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, i, u) : t.prototype && t.prototype.isPureReactComponent ? !zi(n, l) || !zi(a, i) : !0;
  }
  function lf(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && ss.enqueueReplaceState(t, t.state, null);
  }
  function ql(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t) l !== "ref" && (n[l] = t[l]);
    }
    if (e = e.defaultProps) {
      n === t && (n = Ee({}, n));
      for (var a in e) n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  function xm(e) {
    Yo(e);
  }
  function Em(e) {
    console.error(e);
  }
  function zm(e) {
    Yo(e);
  }
  function Wo(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, {
        componentStack: t.stack
      });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function af(e, t, n) {
    try {
      var l = e.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function rs(e, t, n) {
    return n = ll(n), n.tag = 3, n.payload = {
      element: null
    }, n.callback = function () {
      Wo(e, t);
    }, n;
  }
  function Am(e) {
    return e = ll(e), e.tag = 3, e;
  }
  function _m(e, t, n, l) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var i = l.value;
      e.payload = function () {
        return a(i);
      }, e.callback = function () {
        af(t, n, l);
      };
    }
    var u = n.stateNode;
    u !== null && typeof u.componentDidCatch == "function" && (e.callback = function () {
      af(t, n, l), typeof a != "function" && (il === null ? il = new Set([this]) : il.add(this));
      var s = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function uy(e, t, n, l, a) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && ka(t, n, a, !0), n = kt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return $t === null ? nu() : n.alternate === null && Be === 0 && (Be = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, l === Zo ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([l]) : t.add(l), Tc(e, l, a)), !1;
          case 22:
            return n.flags |= 65536, l === Zo ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([l]) : n.add(l)), Tc(e, l, a)), !1;
        }
        throw Error(A(435, n.tag));
      }
      return Tc(e, l, a), nu(), !1;
    }
    if (oe) return t = kt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = a, l !== Wc && (e = Error(A(422), {
      cause: l
    }), _i(Zt(e, n)))) : (l !== Wc && (t = Error(A(423), {
      cause: l
    }), _i(Zt(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, l = Zt(l, n), a = rs(e.stateNode, l, a), gc(e, a), Be !== 4 && (Be = 2)), !1;
    var i = Error(A(520), {
      cause: l
    });
    if (i = Zt(i, n), vi === null ? vi = [i] : vi.push(i), Be !== 4 && (Be = 2), t === null) return !0;
    l = Zt(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = a & -a, n.lanes |= e, e = rs(n.stateNode, l, e), gc(n, e), !1;
        case 1:
          if (t = n.type, i = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (il === null || !il.has(i)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Am(a), _m(a, e, n, l), gc(n, a), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var rr = Error(A(461)),
    Fe = !1;
  function Pe(e, t, n, l) {
    t.child = e === null ? Hp(t, null, n, l) : Nl(t, e.child, n, l);
  }
  function of(e, t, n, l, a) {
    n = n.render;
    var i = t.ref;
    if ("ref" in l) {
      var u = {};
      for (var s in l) s !== "ref" && (u[s] = l[s]);
    } else u = l;
    return Ol(t), l = Is(e, t, n, u, i, a), s = Ps(), e !== null && !Fe ? (er(e, t, a), kn(e, t, a)) : (oe && s && Vs(t), t.flags |= 1, Pe(e, t, l, a), t.child);
  }
  function uf(e, t, n, l, a) {
    if (e === null) {
      var i = n.type;
      return typeof i == "function" && !Gs(i) && i.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = i, Cm(e, t, i, l, a)) : (e = Co(n.type, null, l, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !dr(e, a)) {
      var u = i.memoizedProps;
      if (n = n.compare, n = n !== null ? n : zi, n(u, l) && e.ref === t.ref) return kn(e, t, a);
    }
    return t.flags |= 1, e = Tn(i, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Cm(e, t, n, l, a) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (zi(i, l) && e.ref === t.ref) if (Fe = !1, t.pendingProps = l = i, dr(e, a)) (e.flags & 131072) !== 0 && (Fe = !0);else return t.lanes = e.lanes, kn(e, t, a);
    }
    return ds(e, t, n, l, a);
  }
  function Dm(e, t, n, l) {
    var a = l.children,
      i = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (i = i !== null ? i.baseLanes | n : n, e !== null) {
          for (l = t.child = e.child, a = 0; l !== null;) a = a | l.lanes | l.childLanes, l = l.sibling;
          l = a & ~i;
        } else l = 0, t.child = null;
        return cf(e, t, i, n, l);
      }
      if ((n & 536870912) !== 0) t.memoizedState = {
        baseLanes: 0,
        cachePool: null
      }, e !== null && Do(t, i !== null ? i.cachePool : null), i !== null ? Kd(t, i) : as(), Yp(t);else return l = t.lanes = 536870912, cf(e, t, i !== null ? i.baseLanes | n : n, n, l);
    } else i !== null ? (Do(t, i.cachePool), Kd(t, i), $n(t), t.memoizedState = null) : (e !== null && Do(t, null), as(), $n(t));
    return Pe(e, t, a, n), t.child;
  }
  function ii(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function cf(e, t, n, l, a) {
    var i = Xs();
    return i = i === null ? null : {
      parent: we._currentValue,
      pool: i
    }, t.memoizedState = {
      baseLanes: n,
      cachePool: i
    }, e !== null && Do(t, null), as(), Yp(t), e !== null && ka(e, t, l, !0), t.childLanes = a, null;
  }
  function Ro(e, t) {
    return t = Io({
      mode: t.mode,
      children: t.children
    }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function sf(e, t, n) {
    return Nl(t, e.child, null, n), e = Ro(t, t.pendingProps), e.flags |= 2, Ct(t), t.memoizedState = null, e;
  }
  function cy(e, t, n) {
    var l = t.pendingProps,
      a = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (oe) {
        if (l.mode === "hidden") return e = Ro(t, l), t.lanes = 536870912, ii(null, e);
        if (is(t), (e = xe) ? (e = b0(e, Xt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: rl !== null ? {
            id: cn,
            overflow: sn
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Op(e), n.return = t, t.child = n, tt = t, xe = null)) : e = null, e === null) throw dl(t);
        return t.lanes = 536870912, null;
      }
      return Ro(t, l);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var u = i.dehydrated;
      if (is(t), a) {
        if (t.flags & 256) t.flags &= -257, t = sf(e, t, n);else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;else throw Error(A(558));
      } else if (Fe || ka(e, t, n, !1), a = (n & e.childLanes) !== 0, Fe || a) {
        if (l = ve, l !== null && (u = ap(l, n), u !== 0 && u !== i.retryLane)) throw i.retryLane = u, Hl(e, u), Et(l, e, u), rr;
        nu(), t = sf(e, t, n);
      } else e = i.treeContext, xe = Kt(u.nextSibling), tt = t, oe = !0, nl = null, Xt = !1, e !== null && kp(t, e), t = Ro(t, l), t.flags |= 4096;
      return t;
    }
    return e = Tn(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Mo(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);else {
      if (typeof n != "function" && typeof n != "object") throw Error(A(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function ds(e, t, n, l, a) {
    return Ol(t), n = Is(e, t, n, l, void 0, a), l = Ps(), e !== null && !Fe ? (er(e, t, a), kn(e, t, a)) : (oe && l && Vs(t), t.flags |= 1, Pe(e, t, n, a), t.child);
  }
  function rf(e, t, n, l, a, i) {
    return Ol(t), t.updateQueue = null, n = Vp(t, l, n, a), Gp(e), l = Ps(), e !== null && !Fe ? (er(e, t, i), kn(e, t, i)) : (oe && l && Vs(t), t.flags |= 1, Pe(e, t, n, i), t.child);
  }
  function df(e, t, n, l, a) {
    if (Ol(t), t.stateNode === null) {
      var i = ra,
        u = n.contextType;
      typeof u == "object" && u !== null && (i = nt(u)), i = new n(l, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = ss, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = l, i.state = t.memoizedState, i.refs = {}, Ks(t), u = n.contextType, i.context = typeof u == "object" && u !== null ? nt(u) : ra, i.state = t.memoizedState, u = n.getDerivedStateFromProps, typeof u == "function" && (vc(t, n, u, l), i.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (u = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), u !== i.state && ss.enqueueReplaceState(i, i.state, null), pi(t, l, i, a), fi(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      i = t.stateNode;
      var s = t.memoizedProps,
        r = ql(n, s);
      i.props = r;
      var v = i.context,
        S = n.contextType;
      u = ra, typeof S == "object" && S !== null && (u = nt(S));
      var E = n.getDerivedStateFromProps;
      S = typeof E == "function" || typeof i.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, S || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s || v !== u) && lf(t, i, l, u), Qn = !1;
      var g = t.memoizedState;
      i.state = g, pi(t, l, i, a), fi(), v = t.memoizedState, s || g !== v || Qn ? (typeof E == "function" && (vc(t, n, E, l), v = t.memoizedState), (r = Qn || nf(t, n, r, l, g, v, u)) ? (S || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = v), i.props = l, i.state = v, i.context = u, l = r) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      i = t.stateNode, ns(e, t), u = t.memoizedProps, S = ql(n, u), i.props = S, E = t.pendingProps, g = i.context, v = n.contextType, r = ra, typeof v == "object" && v !== null && (r = nt(v)), s = n.getDerivedStateFromProps, (v = typeof s == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== E || g !== r) && lf(t, i, l, r), Qn = !1, g = t.memoizedState, i.state = g, pi(t, l, i, a), fi();
      var p = t.memoizedState;
      u !== E || g !== p || Qn || e !== null && e.dependencies !== null && Qo(e.dependencies) ? (typeof s == "function" && (vc(t, n, s, l), p = t.memoizedState), (S = Qn || nf(t, n, S, l, g, p, r) || e !== null && e.dependencies !== null && Qo(e.dependencies)) ? (v || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(l, p, r), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(l, p, r)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = p), i.props = l, i.state = p, i.context = r, l = S) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return i = l, Mo(e, t), l = (t.flags & 128) !== 0, i || l ? (i = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && l ? (t.child = Nl(t, e.child, null, a), t.child = Nl(t, null, n, a)) : Pe(e, t, n, a), t.memoizedState = i.state, e = t.child) : e = kn(e, t, a), e;
  }
  function ff(e, t, n, l) {
    return Ml(), t.flags |= 256, Pe(e, t, n, l), t.child;
  }
  var hc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function bc(e) {
    return {
      baseLanes: e,
      cachePool: Up()
    };
  }
  function Sc(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Tt), e;
  }
  function Tm(e, t, n) {
    var l = t.pendingProps,
      a = !1,
      i = (t.flags & 128) !== 0,
      u;
    if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (Re.current & 2) !== 0), u && (a = !0, t.flags &= -129), u = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (oe) {
        if (a ? Xn(t) : $n(t), (e = xe) ? (e = b0(e, Xt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: rl !== null ? {
            id: cn,
            overflow: sn
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Op(e), n.return = t, t.child = n, tt = t, xe = null)) : e = null, e === null) throw dl(t);
        return _s(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var s = l.children;
      return l = l.fallback, a ? ($n(t), a = t.mode, s = Io({
        mode: "hidden",
        children: s
      }, a), l = Dl(l, a, n, null), s.return = t, l.return = t, s.sibling = l, t.child = s, l = t.child, l.memoizedState = bc(n), l.childLanes = Sc(e, u, n), t.memoizedState = hc, ii(null, l)) : (Xn(t), fs(t, s));
    }
    var r = e.memoizedState;
    if (r !== null && (s = r.dehydrated, s !== null)) {
      if (i) t.flags & 256 ? (Xn(t), t.flags &= -257, t = xc(e, t, n)) : t.memoizedState !== null ? ($n(t), t.child = e.child, t.flags |= 128, t = null) : ($n(t), s = l.fallback, a = t.mode, l = Io({
        mode: "visible",
        children: l.children
      }, a), s = Dl(s, a, n, null), s.flags |= 2, l.return = t, s.return = t, l.sibling = s, t.child = l, Nl(t, e.child, null, n), l = t.child, l.memoizedState = bc(n), l.childLanes = Sc(e, u, n), t.memoizedState = hc, t = ii(null, l));else if (Xn(t), _s(s)) {
        if (u = s.nextSibling && s.nextSibling.dataset, u) var v = u.dgst;
        u = v, l = Error(A(419)), l.stack = "", l.digest = u, _i({
          value: l,
          source: null,
          stack: null
        }), t = xc(e, t, n);
      } else if (Fe || ka(e, t, n, !1), u = (n & e.childLanes) !== 0, Fe || u) {
        if (u = ve, u !== null && (l = ap(u, n), l !== 0 && l !== r.retryLane)) throw r.retryLane = l, Hl(e, l), Et(u, e, l), rr;
        As(s) || nu(), t = xc(e, t, n);
      } else As(s) ? (t.flags |= 192, t.child = e.child, t = null) : (e = r.treeContext, xe = Kt(s.nextSibling), tt = t, oe = !0, nl = null, Xt = !1, e !== null && kp(t, e), t = fs(t, l.children), t.flags |= 4096);
      return t;
    }
    return a ? ($n(t), s = l.fallback, a = t.mode, r = e.child, v = r.sibling, l = Tn(r, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = r.subtreeFlags & 65011712, v !== null ? s = Tn(v, s) : (s = Dl(s, a, n, null), s.flags |= 2), s.return = t, l.return = t, l.sibling = s, t.child = l, ii(null, l), l = t.child, s = e.child.memoizedState, s === null ? s = bc(n) : (a = s.cachePool, a !== null ? (r = we._currentValue, a = a.parent !== r ? {
      parent: r,
      pool: r
    } : a) : a = Up(), s = {
      baseLanes: s.baseLanes | n,
      cachePool: a
    }), l.memoizedState = s, l.childLanes = Sc(e, u, n), t.memoizedState = hc, ii(e.child, l)) : (Xn(t), n = e.child, e = n.sibling, n = Tn(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (u = t.deletions, u === null ? (t.deletions = [e], t.flags |= 16) : u.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function fs(e, t) {
    return t = Io({
      mode: "visible",
      children: t
    }, e.mode), t.return = e, e.child = t;
  }
  function Io(e, t) {
    return e = Dt(22, e, null, t), e.lanes = 0, e;
  }
  function xc(e, t, n) {
    return Nl(t, e.child, null, n), e = fs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function pf(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Pc(e.return, t, n);
  }
  function Ec(e, t, n, l, a, i) {
    var u = e.memoizedState;
    u === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: a,
      treeForkCount: i
    } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = l, u.tail = n, u.tailMode = a, u.treeForkCount = i);
  }
  function Bm(e, t, n) {
    var l = t.pendingProps,
      a = l.revealOrder,
      i = l.tail;
    l = l.children;
    var u = Re.current,
      s = (u & 2) !== 0;
    if (s ? (u = u & 1 | 2, t.flags |= 128) : u &= 1, he(Re, u), Pe(e, t, l, n), l = oe ? Ai : 0, !s && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null;) {
      if (e.tag === 13) e.memoizedState !== null && pf(e, n, t);else if (e.tag === 19) pf(e, n, t);else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null;) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    switch (a) {
      case "forwards":
        for (n = t.child, a = null; n !== null;) e = n.alternate, e !== null && $o(e) === null && (a = n), n = n.sibling;
        n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Ec(t, !1, a, n, i, l);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, a = t.child, t.child = null; a !== null;) {
          if (e = a.alternate, e !== null && $o(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = n, n = a, a = e;
        }
        Ec(t, !0, n, null, i, l);
        break;
      case "together":
        Ec(t, !1, null, null, void 0, l);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function kn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), pl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
      if (ka(e, t, n, !1), (n & t.childLanes) === 0) return null;
    } else return null;
    if (e !== null && t.child !== e.child) throw Error(A(153));
    if (t.child !== null) {
      for (e = t.child, n = Tn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Tn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function dr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Qo(e)));
  }
  function sy(e, t, n) {
    switch (t.tag) {
      case 3:
        Fo(t, t.stateNode.containerInfo), Zn(t, we, e.memoizedState.cache), Ml();
        break;
      case 27:
      case 5:
        jc(t);
        break;
      case 4:
        Fo(t, t.stateNode.containerInfo);
        break;
      case 10:
        Zn(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return t.flags |= 128, is(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) return l.dehydrated !== null ? (Xn(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Tm(e, t, n) : (Xn(t), e = kn(e, t, n), e !== null ? e.sibling : null);
        Xn(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (l = (n & t.childLanes) !== 0, l || (ka(e, t, n, !1), l = (n & t.childLanes) !== 0), a) {
          if (l) return Bm(e, t, n);
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), he(Re, Re.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Dm(e, t, n, t.pendingProps);
      case 24:
        Zn(t, we, e.memoizedState.cache);
    }
    return kn(e, t, n);
  }
  function Rm(e, t, n) {
    if (e !== null) {
      if (e.memoizedProps !== t.pendingProps) Fe = !0;else {
        if (!dr(e, n) && (t.flags & 128) === 0) return Fe = !1, sy(e, t, n);
        Fe = (e.flags & 131072) !== 0;
      }
    } else Fe = !1, oe && (t.flags & 1048576) !== 0 && Np(t, Ai, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Al(t.elementType), t.type = e, typeof e == "function") Gs(e) ? (l = ql(e, l), t.tag = 1, t = df(null, t, e, l, n)) : (t.tag = 0, t = ds(null, t, e, l, n));else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === Bs) {
                t.tag = 11, t = of(null, t, e, l, n);
                break e;
              } else if (a === Rs) {
                t.tag = 14, t = uf(null, t, e, l, n);
                break e;
              }
            }
            throw t = Fc(e) || e, Error(A(306, t, ""));
          }
        }
        return t;
      case 0:
        return ds(e, t, t.type, t.pendingProps, n);
      case 1:
        return l = t.type, a = ql(l, t.pendingProps), df(e, t, l, a, n);
      case 3:
        e: {
          if (Fo(t, t.stateNode.containerInfo), e === null) throw Error(A(387));
          l = t.pendingProps;
          var i = t.memoizedState;
          a = i.element, ns(e, t), pi(t, l, null, n);
          var u = t.memoizedState;
          if (l = u.cache, Zn(t, we, l), l !== i.cache && es(t, [we], n, !0), fi(), l = u.element, i.isDehydrated) {
            if (i = {
              element: l,
              isDehydrated: !1,
              cache: u.cache
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = ff(e, t, l, n);
              break e;
            } else if (l !== a) {
              a = Zt(Error(A(424)), t), _i(a), t = ff(e, t, l, n);
              break e;
            } else for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, xe = Kt(e.firstChild), tt = t, oe = !0, nl = null, Xt = !0, n = Hp(t, null, l, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
          } else {
            if (Ml(), l === a) {
              t = kn(e, t, n);
              break e;
            }
            Pe(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Mo(e, t), e === null ? (n = qf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : oe || (n = t.type, e = t.pendingProps, l = ou(tl.current).createElement(n), l[et] = t, l[zt] = e, lt(l, n, e), Qe(l), t.stateNode = l) : t.memoizedState = qf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
      case 27:
        return jc(t), e === null && oe && (l = t.stateNode = S0(t.type, t.pendingProps, tl.current), tt = t, Xt = !0, a = xe, gl(t.type) ? (Cs = a, xe = Kt(l.firstChild)) : xe = a), Pe(e, t, t.pendingProps.children, n), Mo(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && oe && ((a = l = xe) && (l = wy(l, t.type, t.pendingProps, Xt), l !== null ? (t.stateNode = l, tt = t, xe = Kt(l.firstChild), Xt = !1, a = !0) : a = !1), a || dl(t)), jc(t), a = t.type, i = t.pendingProps, u = e !== null ? e.memoizedProps : null, l = i.children, Es(a, i) ? l = null : u !== null && Es(a, u) && (t.flags |= 32), t.memoizedState !== null && (a = Is(e, t, ey, null, null, n), Mi._currentValue = a), Mo(e, t), Pe(e, t, l, n), t.child;
      case 6:
        return e === null && oe && ((e = n = xe) && (n = Fy(n, t.pendingProps, Xt), n !== null ? (t.stateNode = n, tt = t, xe = null, e = !0) : e = !1), e || dl(t)), null;
      case 13:
        return Tm(e, t, n);
      case 4:
        return Fo(t, t.stateNode.containerInfo), l = t.pendingProps, e === null ? t.child = Nl(t, null, l, n) : Pe(e, t, l, n), t.child;
      case 11:
        return of(e, t, t.type, t.pendingProps, n);
      case 7:
        return Pe(e, t, t.pendingProps, n), t.child;
      case 8:
        return Pe(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Pe(e, t, t.pendingProps.children, n), t.child;
      case 10:
        return l = t.pendingProps, Zn(t, t.type, l.value), Pe(e, t, l.children, n), t.child;
      case 9:
        return a = t.type._context, l = t.pendingProps.children, Ol(t), a = nt(a), l = l(a), t.flags |= 1, Pe(e, t, l, n), t.child;
      case 14:
        return uf(e, t, t.type, t.pendingProps, n);
      case 15:
        return Cm(e, t, t.type, t.pendingProps, n);
      case 19:
        return Bm(e, t, n);
      case 31:
        return cy(e, t, n);
      case 22:
        return Dm(e, t, n, t.pendingProps);
      case 24:
        return Ol(t), l = nt(we), e === null ? (a = Xs(), a === null && (a = ve, i = Zs(), a.pooledCache = i, i.refCount++, i !== null && (a.pooledCacheLanes |= n), a = i), t.memoizedState = {
          parent: l,
          cache: a
        }, Ks(t), Zn(t, we, a)) : ((e.lanes & n) !== 0 && (ns(e, t), pi(t, null, null, n), fi()), a = e.memoizedState, i = t.memoizedState, a.parent !== l ? (a = {
          parent: l,
          cache: l
        }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Zn(t, we, l)) : (l = i.cache, Zn(t, we, l), l !== a.cache && es(t, [we], n, !0))), Pe(e, t, t.pendingProps.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(A(156, t.tag));
  }
  function bn(e) {
    e.flags |= 4;
  }
  function zc(e, t, n, l, a) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (a & 335544128) === a) if (e.stateNode.complete) e.flags |= 8192;else if (e0()) e.flags |= 8192;else throw Bl = Zo, $s;
    } else e.flags &= -16777217;
  }
  function mf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;else if (e.flags |= 16777216, !z0(t)) if (e0()) e.flags |= 8192;else throw Bl = Zo, $s;
  }
  function go(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? tp() : 536870912, e.lanes |= t, Da |= t);
  }
  function Ia(e, t) {
    if (!oe) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var l = null; n !== null;) n.alternate !== null && (l = n), n = n.sibling;
        l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
    }
  }
  function Se(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      l = 0;
    if (t) for (var a = e.child; a !== null;) n |= a.lanes | a.childLanes, l |= a.subtreeFlags & 65011712, l |= a.flags & 65011712, a.return = e, a = a.sibling;else for (a = e.child; a !== null;) n |= a.lanes | a.childLanes, l |= a.subtreeFlags, l |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function ry(e, t, n) {
    var l = t.pendingProps;
    switch (Qs(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Se(t), null;
      case 1:
        return Se(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Bn(we), xa(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Il(t) ? bn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, mc())), Se(t), null;
      case 26:
        var a = t.type,
          i = t.memoizedState;
        return e === null ? (bn(t), i !== null ? (Se(t), mf(t, i)) : (Se(t), zc(t, a, null, l, n))) : i ? i !== e.memoizedState ? (bn(t), Se(t), mf(t, i)) : (Se(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && bn(t), Se(t), zc(t, a, e, l, n)), null;
      case 27:
        if (Ho(t), n = tl.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== l && bn(t);else {
          if (!l) {
            if (t.stateNode === null) throw Error(A(166));
            return Se(t), null;
          }
          e = dn.current, Il(t) ? Yd(t, e) : (e = S0(a, l, n), t.stateNode = e, bn(t));
        }
        return Se(t), null;
      case 5:
        if (Ho(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== l && bn(t);else {
          if (!l) {
            if (t.stateNode === null) throw Error(A(166));
            return Se(t), null;
          }
          if (i = dn.current, Il(t)) Yd(t, i);else {
            var u = ou(tl.current);
            switch (i) {
              case 1:
                i = u.createElementNS("http://www.w3.org/2000/svg", a);
                break;
              case 2:
                i = u.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                break;
              default:
                switch (a) {
                  case "svg":
                    i = u.createElementNS("http://www.w3.org/2000/svg", a);
                    break;
                  case "math":
                    i = u.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                    break;
                  case "script":
                    i = u.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(i.firstChild);
                    break;
                  case "select":
                    i = typeof l.is == "string" ? u.createElement("select", {
                      is: l.is
                    }) : u.createElement("select"), l.multiple ? i.multiple = !0 : l.size && (i.size = l.size);
                    break;
                  default:
                    i = typeof l.is == "string" ? u.createElement(a, {
                      is: l.is
                    }) : u.createElement(a);
                }
            }
            i[et] = t, i[zt] = l;
            e: for (u = t.child; u !== null;) {
              if (u.tag === 5 || u.tag === 6) i.appendChild(u.stateNode);else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                u.child.return = u, u = u.child;
                continue;
              }
              if (u === t) break e;
              for (; u.sibling === null;) {
                if (u.return === null || u.return === t) break e;
                u = u.return;
              }
              u.sibling.return = u.return, u = u.sibling;
            }
            t.stateNode = i;
            e: switch (lt(i, a, l), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && bn(t);
          }
        }
        return Se(t), zc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== l && bn(t);else {
          if (typeof l != "string" && t.stateNode === null) throw Error(A(166));
          if (e = tl.current, Il(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, a = tt, a !== null) switch (a.tag) {
              case 27:
              case 5:
                l = a.memoizedProps;
            }
            e[et] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || y0(e.nodeValue, n)), e || dl(t, !0);
          } else e = ou(e).createTextNode(l), e[et] = t, t.stateNode = e;
        }
        return Se(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Il(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(A(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(A(557));
              e[et] = t;
            } else Ml(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Se(t), e = !1;
          } else n = mc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e) return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
          if ((t.flags & 128) !== 0) throw Error(A(558));
        }
        return Se(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (a = Il(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!a) throw Error(A(318));
              if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(A(317));
              a[et] = t;
            } else Ml(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Se(t), a = !1;
          } else a = mc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
          if (!a) return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
        }
        return Ct(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, a = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (a = l.alternate.memoizedState.cachePool.pool), i = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (i = l.memoizedState.cachePool.pool), i !== a && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), go(t, t.updateQueue), Se(t), null);
      case 4:
        return xa(), e === null && hr(t.stateNode.containerInfo), Se(t), null;
      case 10:
        return Bn(t.type), Se(t), null;
      case 19:
        if (Ze(Re), l = t.memoizedState, l === null) return Se(t), null;
        if (a = (t.flags & 128) !== 0, i = l.rendering, i === null) {
          if (a) Ia(l, !1);else {
            if (Be !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null;) {
              if (i = $o(e), i !== null) {
                for (t.flags |= 128, Ia(l, !1), e = i.updateQueue, t.updateQueue = e, go(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Mp(n, e), n = n.sibling;
                return he(Re, Re.current & 1 | 2), oe && zn(t, l.treeForkCount), t.child;
              }
              e = e.sibling;
            }
            l.tail !== null && Bt() > eu && (t.flags |= 128, a = !0, Ia(l, !1), t.lanes = 4194304);
          }
        } else {
          if (!a) if (e = $o(i), e !== null) {
            if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, go(t, e), Ia(l, !0), l.tail === null && l.tailMode === "hidden" && !i.alternate && !oe) return Se(t), null;
          } else 2 * Bt() - l.renderingStartTime > eu && n !== 536870912 && (t.flags |= 128, a = !0, Ia(l, !1), t.lanes = 4194304);
          l.isBackwards ? (i.sibling = t.child, t.child = i) : (e = l.last, e !== null ? e.sibling = i : t.child = i, l.last = i);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Bt(), e.sibling = null, n = Re.current, he(Re, a ? n & 1 | 2 : n & 1), oe && zn(t, l.treeForkCount), e) : (Se(t), null);
      case 22:
      case 23:
        return Ct(t), Js(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Se(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Se(t), n = t.updateQueue, n !== null && go(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && Ze(Tl), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Bn(we), Se(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(A(156, t.tag));
  }
  function dy(e, t) {
    switch (Qs(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Bn(we), xa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ho(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ct(t), t.alternate === null) throw Error(A(340));
          Ml();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ct(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(A(340));
          Ml();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Ze(Re), null;
      case 4:
        return xa(), null;
      case 10:
        return Bn(t.type), null;
      case 22:
      case 23:
        return Ct(t), Js(), e !== null && Ze(Tl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Bn(we), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Mm(e, t) {
    switch (Qs(t), t.tag) {
      case 3:
        Bn(we), xa();
        break;
      case 26:
      case 27:
      case 5:
        Ho(t);
        break;
      case 4:
        xa();
        break;
      case 31:
        t.memoizedState !== null && Ct(t);
        break;
      case 13:
        Ct(t);
        break;
      case 19:
        Ze(Re);
        break;
      case 10:
        Bn(t.type);
        break;
      case 22:
      case 23:
        Ct(t), Js(), e !== null && Ze(Tl);
        break;
      case 24:
        Bn(we);
    }
  }
  function Yi(e, t) {
    try {
      var n = t.updateQueue,
        l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var a = l.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var i = n.create,
              u = n.inst;
            l = i(), u.destroy = l;
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (s) {
      pe(t, t.return, s);
    }
  }
  function fl(e, t, n) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        l = i;
        do {
          if ((l.tag & e) === e) {
            var u = l.inst,
              s = u.destroy;
            if (s !== void 0) {
              u.destroy = void 0, a = t;
              var r = n,
                v = s;
              try {
                v();
              } catch (S) {
                pe(a, r, S);
              }
            }
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (S) {
      pe(t, t.return, S);
    }
  }
  function Om(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Lp(t, n);
      } catch (l) {
        pe(e, e.return, l);
      }
    }
  }
  function Nm(e, t, n) {
    n.props = ql(e.type, e.memoizedProps), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      pe(e, t, l);
    }
  }
  function gi(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(l) : n.current = l;
      }
    } catch (a) {
      pe(e, t, a);
    }
  }
  function rn(e, t) {
    var n = e.ref,
      l = e.refCleanup;
    if (n !== null) if (typeof l == "function") try {
      l();
    } catch (a) {
      pe(e, t, a);
    } finally {
      e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
    } else if (typeof n == "function") try {
      n(null);
    } catch (a) {
      pe(e, t, a);
    } else n.current = null;
  }
  function km(e) {
    var t = e.type,
      n = e.memoizedProps,
      l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break e;
        case "img":
          n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (a) {
      pe(e, e.return, a);
    }
  }
  function Ac(e, t, n) {
    try {
      var l = e.stateNode;
      My(l, e.type, n, t), l[zt] = t;
    } catch (a) {
      pe(e, e.return, a);
    }
  }
  function qm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && gl(e.type) || e.tag === 4;
  }
  function _c(e) {
    e: for (;;) {
      for (; e.sibling === null;) {
        if (e.return === null || qm(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
        if (e.tag === 27 && gl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ps(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Cn));else if (l !== 4 && (l === 27 && gl(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (ps(e, t, n), e = e.sibling; e !== null;) ps(e, t, n), e = e.sibling;
  }
  function Po(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);else if (l !== 4 && (l === 27 && gl(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Po(e, t, n), e = e.sibling; e !== null;) Po(e, t, n), e = e.sibling;
  }
  function Um(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var l = e.type, a = t.attributes; a.length;) t.removeAttributeNode(a[0]);
      lt(t, l, n), t[et] = e, t[zt] = n;
    } catch (i) {
      pe(e, e.return, i);
    }
  }
  var An = !1,
    Ue = !1,
    Cc = !1,
    gf = typeof WeakSet == "function" ? WeakSet : Set,
    Ve = null;
  function fy(e, t) {
    if (e = e.containerInfo, Ss = ru, e = zp(e), js(e)) {
      if ("selectionStart" in e) var n = {
        start: e.selectionStart,
        end: e.selectionEnd
      };else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var l = n.getSelection && n.getSelection();
        if (l && l.rangeCount !== 0) {
          n = l.anchorNode;
          var a = l.anchorOffset,
            i = l.focusNode;
          l = l.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var u = 0,
            s = -1,
            r = -1,
            v = 0,
            S = 0,
            E = e,
            g = null;
          t: for (;;) {
            for (var p; E !== n || a !== 0 && E.nodeType !== 3 || (s = u + a), E !== i || l !== 0 && E.nodeType !== 3 || (r = u + l), E.nodeType === 3 && (u += E.nodeValue.length), (p = E.firstChild) !== null;) g = E, E = p;
            for (;;) {
              if (E === e) break t;
              if (g === n && ++v === a && (s = u), g === i && ++S === l && (r = u), (p = E.nextSibling) !== null) break;
              E = g, g = E.parentNode;
            }
            E = p;
          }
          n = s === -1 || r === -1 ? null : {
            start: s,
            end: r
          };
        } else n = null;
      }
      n = n || {
        start: 0,
        end: 0
      };
    } else n = null;
    for (xs = {
      focusedElem: e,
      selectionRange: n
    }, ru = !1, Ve = t; Ve !== null;) if (t = Ve, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Ve = e;else for (; Ve !== null;) {
      switch (t = Ve, i = t.alternate, e = t.flags, t.tag) {
        case 0:
          if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
          break;
        case 11:
        case 15:
          break;
        case 1:
          if ((e & 1024) !== 0 && i !== null) {
            e = void 0, n = t, a = i.memoizedProps, i = i.memoizedState, l = n.stateNode;
            try {
              var R = ql(n.type, a);
              e = l.getSnapshotBeforeUpdate(R, i), l.__reactInternalSnapshotBeforeUpdate = e;
            } catch (k) {
              pe(n, n.return, k);
            }
          }
          break;
        case 3:
          if ((e & 1024) !== 0) {
            if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) zs(e);else if (n === 1) switch (e.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                zs(e);
                break;
              default:
                e.textContent = "";
            }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        default:
          if ((e & 1024) !== 0) throw Error(A(163));
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, Ve = e;
        break;
      }
      Ve = t.return;
    }
  }
  function wm(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xn(e, n), l & 4 && Yi(5, n);
        break;
      case 1:
        if (xn(e, n), l & 4) if (e = n.stateNode, t === null) try {
          e.componentDidMount();
        } catch (u) {
          pe(n, n.return, u);
        } else {
          var a = ql(n.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
          } catch (u) {
            pe(n, n.return, u);
          }
        }
        l & 64 && Om(n), l & 512 && gi(n, n.return);
        break;
      case 3:
        if (xn(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null) switch (n.child.tag) {
            case 27:
            case 5:
              t = n.child.stateNode;
              break;
            case 1:
              t = n.child.stateNode;
          }
          try {
            Lp(e, t);
          } catch (u) {
            pe(n, n.return, u);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Um(n);
      case 26:
      case 5:
        xn(e, n), t === null && l & 4 && km(n), l & 512 && gi(n, n.return);
        break;
      case 12:
        xn(e, n);
        break;
      case 31:
        xn(e, n), l & 4 && jm(e, n);
        break;
      case 13:
        xn(e, n), l & 4 && Lm(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = xy.bind(null, n), Hy(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || An, !l) {
          t = t !== null && t.memoizedState !== null || Ue, a = An;
          var i = Ue;
          An = l, (Ue = t) && !i ? En(e, n, (n.subtreeFlags & 8772) !== 0) : xn(e, n), An = a, Ue = i;
        }
        break;
      case 30:
        break;
      default:
        xn(e, n);
    }
  }
  function Fm(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Fm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ks(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var _e = null,
    St = !1;
  function Sn(e, t, n) {
    for (n = n.child; n !== null;) Hm(e, t, n), n = n.sibling;
  }
  function Hm(e, t, n) {
    if (Rt && typeof Rt.onCommitFiberUnmount == "function") try {
      Rt.onCommitFiberUnmount(qi, n);
    } catch {}
    switch (n.tag) {
      case 26:
        Ue || rn(n, t), Sn(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Ue || rn(n, t);
        var l = _e,
          a = St;
        gl(n.type) && (_e = n.stateNode, St = !1), Sn(e, t, n), bi(n.stateNode), _e = l, St = a;
        break;
      case 5:
        Ue || rn(n, t);
      case 6:
        if (l = _e, a = St, _e = null, Sn(e, t, n), _e = l, St = a, _e !== null) if (St) try {
          (_e.nodeType === 9 ? _e.body : _e.nodeName === "HTML" ? _e.ownerDocument.body : _e).removeChild(n.stateNode);
        } catch (i) {
          pe(n, t, i);
        } else try {
          _e.removeChild(n.stateNode);
        } catch (i) {
          pe(n, t, i);
        }
        break;
      case 18:
        _e !== null && (St ? (e = _e, Rf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Ma(e)) : Rf(_e, n.stateNode));
        break;
      case 4:
        l = _e, a = St, _e = n.stateNode.containerInfo, St = !0, Sn(e, t, n), _e = l, St = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        fl(2, n, t), Ue || fl(4, n, t), Sn(e, t, n);
        break;
      case 1:
        Ue || (rn(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && Nm(n, t, l)), Sn(e, t, n);
        break;
      case 21:
        Sn(e, t, n);
        break;
      case 22:
        Ue = (l = Ue) || n.memoizedState !== null, Sn(e, t, n), Ue = l;
        break;
      default:
        Sn(e, t, n);
    }
  }
  function jm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ma(e);
      } catch (n) {
        pe(t, t.return, n);
      }
    }
  }
  function Lm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
      Ma(e);
    } catch (n) {
      pe(t, t.return, n);
    }
  }
  function py(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new gf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new gf()), t;
      default:
        throw Error(A(435, e.tag));
    }
  }
  function yo(e, t) {
    var n = py(e);
    t.forEach(function (l) {
      if (!n.has(l)) {
        n.add(l);
        var a = Ey.bind(null, e, l);
        l.then(a, a);
      }
    });
  }
  function ht(e, t) {
    var n = t.deletions;
    if (n !== null) for (var l = 0; l < n.length; l++) {
      var a = n[l],
        i = e,
        u = t,
        s = u;
      e: for (; s !== null;) {
        switch (s.tag) {
          case 27:
            if (gl(s.type)) {
              _e = s.stateNode, St = !1;
              break e;
            }
            break;
          case 5:
            _e = s.stateNode, St = !1;
            break e;
          case 3:
          case 4:
            _e = s.stateNode.containerInfo, St = !0;
            break e;
        }
        s = s.return;
      }
      if (_e === null) throw Error(A(160));
      Hm(i, u, a), _e = null, St = !1, i = a.alternate, i !== null && (i.return = null), a.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Ym(t, e), t = t.sibling;
  }
  var ln = null;
  function Ym(e, t) {
    var n = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ht(t, e), bt(e), l & 4 && (fl(3, e, e.return), Yi(3, e), fl(5, e, e.return));
        break;
      case 1:
        ht(t, e), bt(e), l & 512 && (Ue || n === null || rn(n, n.return)), l & 64 && An && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var a = ln;
        if (ht(t, e), bt(e), l & 512 && (Ue || n === null || rn(n, n.return)), l & 4) {
          var i = n !== null ? n.memoizedState : null;
          if (l = e.memoizedState, n === null) {
            if (l === null) {
              if (e.stateNode === null) {
                e: {
                  l = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
                  t: switch (l) {
                    case "title":
                      i = a.getElementsByTagName("title")[0], (!i || i[Fi] || i[et] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = a.createElement(l), a.head.insertBefore(i, a.querySelector("head > title"))), lt(i, l, n), i[et] = e, Qe(i), l = i;
                      break e;
                    case "link":
                      var u = wf("link", "href", a).get(l + (n.href || ""));
                      if (u) {
                        for (var s = 0; s < u.length; s++) if (i = u[s], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                          u.splice(s, 1);
                          break t;
                        }
                      }
                      i = a.createElement(l), lt(i, l, n), a.head.appendChild(i);
                      break;
                    case "meta":
                      if (u = wf("meta", "content", a).get(l + (n.content || ""))) {
                        for (s = 0; s < u.length; s++) if (i = u[s], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                          u.splice(s, 1);
                          break t;
                        }
                      }
                      i = a.createElement(l), lt(i, l, n), a.head.appendChild(i);
                      break;
                    default:
                      throw Error(A(468, l));
                  }
                  i[et] = e, Qe(i), l = i;
                }
                e.stateNode = l;
              } else Ff(a, e.type, e.stateNode);
            } else e.stateNode = Uf(a, l, e.memoizedProps);
          } else i !== l ? (i === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : i.count--, l === null ? Ff(a, e.type, e.stateNode) : Uf(a, l, e.memoizedProps)) : l === null && e.stateNode !== null && Ac(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        ht(t, e), bt(e), l & 512 && (Ue || n === null || rn(n, n.return)), n !== null && l & 4 && Ac(e, e.memoizedProps, n.memoizedProps);
        break;
      case 5:
        if (ht(t, e), bt(e), l & 512 && (Ue || n === null || rn(n, n.return)), e.flags & 32) {
          a = e.stateNode;
          try {
            za(a, "");
          } catch (R) {
            pe(e, e.return, R);
          }
        }
        l & 4 && e.stateNode != null && (a = e.memoizedProps, Ac(e, a, n !== null ? n.memoizedProps : a)), l & 1024 && (Cc = !0);
        break;
      case 6:
        if (ht(t, e), bt(e), l & 4) {
          if (e.stateNode === null) throw Error(A(162));
          l = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = l;
          } catch (R) {
            pe(e, e.return, R);
          }
        }
        break;
      case 3:
        if (ko = null, a = ln, ln = uu(t.containerInfo), ht(t, e), ln = a, bt(e), l & 4 && n !== null && n.memoizedState.isDehydrated) try {
          Ma(t.containerInfo);
        } catch (R) {
          pe(e, e.return, R);
        }
        Cc && (Cc = !1, Gm(e));
        break;
      case 4:
        l = ln, ln = uu(e.stateNode.containerInfo), ht(t, e), bt(e), ln = l;
        break;
      case 12:
        ht(t, e), bt(e);
        break;
      case 31:
        ht(t, e), bt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 13:
        ht(t, e), bt(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (zu = Bt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 22:
        a = e.memoizedState !== null;
        var r = n !== null && n.memoizedState !== null,
          v = An,
          S = Ue;
        if (An = v || a, Ue = S || r, ht(t, e), Ue = S, An = v, bt(e), l & 8192) e: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || r || An || Ue || _l(e)), n = null, t = e;;) {
          if (t.tag === 5 || t.tag === 26) {
            if (n === null) {
              r = n = t;
              try {
                if (i = r.stateNode, a) u = i.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none";else {
                  s = r.stateNode;
                  var E = r.memoizedProps.style,
                    g = E != null && E.hasOwnProperty("display") ? E.display : null;
                  s.style.display = g == null || typeof g == "boolean" ? "" : ("" + g).trim();
                }
              } catch (R) {
                pe(r, r.return, R);
              }
            }
          } else if (t.tag === 6) {
            if (n === null) {
              r = t;
              try {
                r.stateNode.nodeValue = a ? "" : r.memoizedProps;
              } catch (R) {
                pe(r, r.return, R);
              }
            }
          } else if (t.tag === 18) {
            if (n === null) {
              r = t;
              try {
                var p = r.stateNode;
                a ? Mf(p, !0) : Mf(r.stateNode, !1);
              } catch (R) {
                pe(r, r.return, R);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e) break e;
          for (; t.sibling === null;) {
            if (t.return === null || t.return === e) break e;
            n === t && (n = null), t = t.return;
          }
          n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
        }
        l & 4 && (l = e.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, yo(e, n))));
        break;
      case 19:
        ht(t, e), bt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ht(t, e), bt(e);
    }
  }
  function bt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null;) {
          if (qm(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(A(160));
        switch (n.tag) {
          case 27:
            var a = n.stateNode,
              i = _c(e);
            Po(e, i, a);
            break;
          case 5:
            var u = n.stateNode;
            n.flags & 32 && (za(u, ""), n.flags &= -33);
            var s = _c(e);
            Po(e, s, u);
            break;
          case 3:
          case 4:
            var r = n.stateNode.containerInfo,
              v = _c(e);
            ps(e, v, r);
            break;
          default:
            throw Error(A(161));
        }
      } catch (S) {
        pe(e, e.return, S);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Gm(e) {
    if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
      var t = e;
      Gm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
    }
  }
  function xn(e, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) wm(e, t.alternate, t), t = t.sibling;
  }
  function _l(e) {
    for (e = e.child; e !== null;) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          fl(4, t, t.return), _l(t);
          break;
        case 1:
          rn(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && Nm(t, t.return, n), _l(t);
          break;
        case 27:
          bi(t.stateNode);
        case 26:
        case 5:
          rn(t, t.return), _l(t);
          break;
        case 22:
          t.memoizedState === null && _l(t);
          break;
        case 30:
          _l(t);
          break;
        default:
          _l(t);
      }
      e = e.sibling;
    }
  }
  function En(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null;) {
      var l = t.alternate,
        a = e,
        i = t,
        u = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          En(a, i, n), Yi(4, i);
          break;
        case 1:
          if (En(a, i, n), l = i, a = l.stateNode, typeof a.componentDidMount == "function") try {
            a.componentDidMount();
          } catch (v) {
            pe(l, l.return, v);
          }
          if (l = i, a = l.updateQueue, a !== null) {
            var s = l.stateNode;
            try {
              var r = a.shared.hiddenCallbacks;
              if (r !== null) for (a.shared.hiddenCallbacks = null, a = 0; a < r.length; a++) jp(r[a], s);
            } catch (v) {
              pe(l, l.return, v);
            }
          }
          n && u & 64 && Om(i), gi(i, i.return);
          break;
        case 27:
          Um(i);
        case 26:
        case 5:
          En(a, i, n), n && l === null && u & 4 && km(i), gi(i, i.return);
          break;
        case 12:
          En(a, i, n);
          break;
        case 31:
          En(a, i, n), n && u & 4 && jm(a, i);
          break;
        case 13:
          En(a, i, n), n && u & 4 && Lm(a, i);
          break;
        case 22:
          i.memoizedState === null && En(a, i, n), gi(i, i.return);
          break;
        case 30:
          break;
        default:
          En(a, i, n);
      }
      t = t.sibling;
    }
  }
  function fr(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ji(n));
  }
  function pr(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ji(e));
  }
  function nn(e, t, n, l) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Vm(e, t, n, l), t = t.sibling;
  }
  function Vm(e, t, n, l) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        nn(e, t, n, l), a & 2048 && Yi(9, t);
        break;
      case 1:
        nn(e, t, n, l);
        break;
      case 3:
        nn(e, t, n, l), a & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ji(e)));
        break;
      case 12:
        if (a & 2048) {
          nn(e, t, n, l), e = t.stateNode;
          try {
            var i = t.memoizedProps,
              u = i.id,
              s = i.onPostCommit;
            typeof s == "function" && s(u, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
          } catch (r) {
            pe(t, t.return, r);
          }
        } else nn(e, t, n, l);
        break;
      case 31:
        nn(e, t, n, l);
        break;
      case 13:
        nn(e, t, n, l);
        break;
      case 23:
        break;
      case 22:
        i = t.stateNode, u = t.alternate, t.memoizedState !== null ? i._visibility & 2 ? nn(e, t, n, l) : yi(e, t) : i._visibility & 2 ? nn(e, t, n, l) : (i._visibility |= 2, ea(e, t, n, l, (t.subtreeFlags & 10256) !== 0 || !1)), a & 2048 && fr(u, t);
        break;
      case 24:
        nn(e, t, n, l), a & 2048 && pr(t.alternate, t);
        break;
      default:
        nn(e, t, n, l);
    }
  }
  function ea(e, t, n, l, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null;) {
      var i = e,
        u = t,
        s = n,
        r = l,
        v = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ea(i, u, s, r, a), Yi(8, u);
          break;
        case 23:
          break;
        case 22:
          var S = u.stateNode;
          u.memoizedState !== null ? S._visibility & 2 ? ea(i, u, s, r, a) : yi(i, u) : (S._visibility |= 2, ea(i, u, s, r, a)), a && v & 2048 && fr(u.alternate, u);
          break;
        case 24:
          ea(i, u, s, r, a), a && v & 2048 && pr(u.alternate, u);
          break;
        default:
          ea(i, u, s, r, a);
      }
      t = t.sibling;
    }
  }
  function yi(e, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
      var n = e,
        l = t,
        a = l.flags;
      switch (l.tag) {
        case 22:
          yi(n, l), a & 2048 && fr(l.alternate, l);
          break;
        case 24:
          yi(n, l), a & 2048 && pr(l.alternate, l);
          break;
        default:
          yi(n, l);
      }
      t = t.sibling;
    }
  }
  var oi = 8192;
  function Pl(e, t, n) {
    if (e.subtreeFlags & oi) for (e = e.child; e !== null;) Qm(e, t, n), e = e.sibling;
  }
  function Qm(e, t, n) {
    switch (e.tag) {
      case 26:
        Pl(e, t, n), e.flags & oi && e.memoizedState !== null && Wy(n, ln, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Pl(e, t, n);
        break;
      case 3:
      case 4:
        var l = ln;
        ln = uu(e.stateNode.containerInfo), Pl(e, t, n), ln = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = oi, oi = 16777216, Pl(e, t, n), oi = l) : Pl(e, t, n));
        break;
      default:
        Pl(e, t, n);
    }
  }
  function Zm(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do t = e.sibling, e.sibling = null, e = t; while (e !== null);
    }
  }
  function Pa(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null) for (var n = 0; n < t.length; n++) {
        var l = t[n];
        Ve = l, $m(l, e);
      }
      Zm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Xm(e), e = e.sibling;
  }
  function Xm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Pa(e), e.flags & 2048 && fl(9, e, e.return);
        break;
      case 3:
        Pa(e);
        break;
      case 12:
        Pa(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Oo(e)) : Pa(e);
        break;
      default:
        Pa(e);
    }
  }
  function Oo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null) for (var n = 0; n < t.length; n++) {
        var l = t[n];
        Ve = l, $m(l, e);
      }
      Zm(e);
    }
    for (e = e.child; e !== null;) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          fl(8, t, t.return), Oo(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Oo(t));
          break;
        default:
          Oo(t);
      }
      e = e.sibling;
    }
  }
  function $m(e, t) {
    for (; Ve !== null;) {
      var n = Ve;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          fl(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          ji(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, Ve = l;else e: for (n = e; Ve !== null;) {
        l = Ve;
        var a = l.sibling,
          i = l.return;
        if (Fm(l), l === n) {
          Ve = null;
          break e;
        }
        if (a !== null) {
          a.return = i, Ve = a;
          break e;
        }
        Ve = i;
      }
    }
  }
  var my = {
      getCacheForType: function (e) {
        var t = nt(we),
          n = t.data.get(e);
        return n === void 0 && (n = e(), t.data.set(e, n)), n;
      },
      cacheSignal: function () {
        return nt(we).controller.signal;
      }
    },
    gy = typeof WeakMap == "function" ? WeakMap : Map,
    ce = 0,
    ve = null,
    ne = null,
    ae = 0,
    fe = 0,
    _t = null,
    In = !1,
    Ua = !1,
    mr = !1,
    qn = 0,
    Be = 0,
    pl = 0,
    Rl = 0,
    gr = 0,
    Tt = 0,
    Da = 0,
    vi = null,
    xt = null,
    ms = !1,
    zu = 0,
    Km = 0,
    eu = 1 / 0,
    tu = null,
    il = null,
    je = 0,
    ol = null,
    Ta = null,
    Rn = 0,
    gs = 0,
    ys = null,
    Jm = null,
    hi = 0,
    vs = null;
  function Ot() {
    return (ce & 2) !== 0 && ae !== 0 ? ae & -ae : Z.T !== null ? vr() : ip();
  }
  function Wm() {
    if (Tt === 0) if ((ae & 536870912) === 0 || oe) {
      var e = io;
      io <<= 1, (io & 3932160) === 0 && (io = 262144), Tt = e;
    } else Tt = 536870912;
    return e = kt.current, e !== null && (e.flags |= 32), Tt;
  }
  function Et(e, t, n) {
    (e === ve && (fe === 2 || fe === 9) || e.cancelPendingCommit !== null) && (Ba(e, 0), Pn(e, ae, Tt, !1)), wi(e, n), ((ce & 2) === 0 || e !== ve) && (e === ve && ((ce & 2) === 0 && (Rl |= n), Be === 4 && Pn(e, ae, Tt, !1)), pn(e));
  }
  function Im(e, t, n) {
    if ((ce & 6) !== 0) throw Error(A(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ui(e, t),
      a = l ? hy(e, t) : Dc(e, t, !0),
      i = l;
    do {
      if (a === 0) {
        Ua && !l && Pn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, i && !yy(n)) {
          a = Dc(e, t, !1), i = !1;
          continue;
        }
        if (a === 2) {
          if (i = t, e.errorRecoveryDisabledLanes & i) var u = 0;else u = e.pendingLanes & -536870913, u = u !== 0 ? u : u & 536870912 ? 536870912 : 0;
          if (u !== 0) {
            t = u;
            e: {
              var s = e;
              a = vi;
              var r = s.current.memoizedState.isDehydrated;
              if (r && (Ba(s, u).flags |= 256), u = Dc(s, u, !1), u !== 2) {
                if (mr && !r) {
                  s.errorRecoveryDisabledLanes |= i, Rl |= i, a = 4;
                  break e;
                }
                i = xt, xt = a, i !== null && (xt === null ? xt = i : xt.push.apply(xt, i));
              }
              a = u;
            }
            if (i = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          Ba(e, 0), Pn(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, i = a, i) {
            case 0:
            case 1:
              throw Error(A(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Pn(l, t, Tt, !In);
              break e;
            case 2:
              xt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(A(329));
          }
          if ((t & 62914560) === t && (a = zu + 300 - Bt(), 10 < a)) {
            if (Pn(l, t, Tt, !In), fu(l, 0, !0) !== 0) break e;
            Rn = t, l.timeoutHandle = h0(yf.bind(null, l, n, xt, tu, ms, t, Tt, Rl, Da, In, i, "Throttled", -0, 0), a);
            break e;
          }
          yf(l, n, xt, tu, ms, t, Tt, Rl, Da, In, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    pn(e);
  }
  function yf(e, t, n, l, a, i, u, s, r, v, S, E, g, p) {
    if (e.timeoutHandle = -1, E = t.subtreeFlags, E & 8192 || (E & 16785408) === 16785408) {
      E = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Cn
      }, Qm(t, i, E);
      var R = (i & 62914560) === i ? zu - Bt() : (i & 4194048) === i ? Km - Bt() : 0;
      if (R = Iy(E, R), R !== null) {
        Rn = i, e.cancelPendingCommit = R(hf.bind(null, e, t, i, n, l, a, u, s, r, S, E, null, g, p)), Pn(e, i, u, !v);
        return;
      }
    }
    hf(e, t, i, n, l, a, u, s, r);
  }
  function yy(e) {
    for (var t = e;;) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var l = 0; l < n.length; l++) {
        var a = n[l],
          i = a.getSnapshot;
        a = a.value;
        try {
          if (!Nt(i(), a)) return !1;
        } catch {
          return !1;
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;else {
        if (t === e) break;
        for (; t.sibling === null;) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Pn(e, t, n, l) {
    t &= ~gr, t &= ~Rl, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var a = t; 0 < a;) {
      var i = 31 - Mt(a),
        u = 1 << i;
      l[i] = -1, a &= ~u;
    }
    n !== 0 && np(e, n, t);
  }
  function Au() {
    return (ce & 6) === 0 ? (Gi(0, !1), !1) : !0;
  }
  function yr() {
    if (ne !== null) {
      if (fe === 0) var e = ne.return;else e = ne, Dn = jl = null, tr(e), ha = null, Ci = 0, e = ne;
      for (; e !== null;) Mm(e.alternate, e), e = e.return;
      ne = null;
    }
  }
  function Ba(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, ky(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Rn = 0, yr(), ve = e, ne = n = Tn(e.current, null), ae = t, fe = 0, _t = null, In = !1, Ua = Ui(e, t), mr = !1, Da = Tt = gr = Rl = pl = Be = 0, xt = vi = null, ms = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0) for (e = e.entanglements, l &= t; 0 < l;) {
      var a = 31 - Mt(l),
        i = 1 << a;
      t |= e[a], l &= ~i;
    }
    return qn = t, yu(), n;
  }
  function Pm(e, t) {
    I = null, Z.H = Ti, t === qa || t === hu ? (t = Xd(), fe = 3) : t === $s ? (t = Xd(), fe = 4) : fe = t === rr ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, _t = t, ne === null && (Be = 1, Wo(e, Zt(t, e.current)));
  }
  function e0() {
    var e = kt.current;
    return e === null ? !0 : (ae & 4194048) === ae ? $t === null : (ae & 62914560) === ae || (ae & 536870912) !== 0 ? e === $t : !1;
  }
  function t0() {
    var e = Z.H;
    return Z.H = Ti, e === null ? Ti : e;
  }
  function n0() {
    var e = Z.A;
    return Z.A = my, e;
  }
  function nu() {
    Be = 4, In || (ae & 4194048) !== ae && kt.current !== null || (Ua = !0), (pl & 134217727) === 0 && (Rl & 134217727) === 0 || ve === null || Pn(ve, ae, Tt, !1);
  }
  function Dc(e, t, n) {
    var l = ce;
    ce |= 2;
    var a = t0(),
      i = n0();
    (ve !== e || ae !== t) && (tu = null, Ba(e, t)), t = !1;
    var u = Be;
    e: do try {
      if (fe !== 0 && ne !== null) {
        var s = ne,
          r = _t;
        switch (fe) {
          case 8:
            yr(), u = 6;
            break e;
          case 3:
          case 2:
          case 9:
          case 6:
            kt.current === null && (t = !0);
            var v = fe;
            if (fe = 0, _t = null, pa(e, s, r, v), n && Ua) {
              u = 0;
              break e;
            }
            break;
          default:
            v = fe, fe = 0, _t = null, pa(e, s, r, v);
        }
      }
      vy(), u = Be;
      break;
    } catch (S) {
      Pm(e, S);
    } while (!0);
    return t && e.shellSuspendCounter++, Dn = jl = null, ce = l, Z.H = a, Z.A = i, ne === null && (ve = null, ae = 0, yu()), u;
  }
  function vy() {
    for (; ne !== null;) l0(ne);
  }
  function hy(e, t) {
    var n = ce;
    ce |= 2;
    var l = t0(),
      a = n0();
    ve !== e || ae !== t ? (tu = null, eu = Bt() + 500, Ba(e, t)) : Ua = Ui(e, t);
    e: do try {
      if (fe !== 0 && ne !== null) {
        t = ne;
        var i = _t;
        t: switch (fe) {
          case 1:
            fe = 0, _t = null, pa(e, t, i, 1);
            break;
          case 2:
          case 9:
            if (Zd(i)) {
              fe = 0, _t = null, vf(t);
              break;
            }
            t = function () {
              fe !== 2 && fe !== 9 || ve !== e || (fe = 7), pn(e);
            }, i.then(t, t);
            break e;
          case 3:
            fe = 7;
            break e;
          case 4:
            fe = 5;
            break e;
          case 7:
            Zd(i) ? (fe = 0, _t = null, vf(t)) : (fe = 0, _t = null, pa(e, t, i, 7));
            break;
          case 5:
            var u = null;
            switch (ne.tag) {
              case 26:
                u = ne.memoizedState;
              case 5:
              case 27:
                var s = ne;
                if (u ? z0(u) : s.stateNode.complete) {
                  fe = 0, _t = null;
                  var r = s.sibling;
                  if (r !== null) ne = r;else {
                    var v = s.return;
                    v !== null ? (ne = v, _u(v)) : ne = null;
                  }
                  break t;
                }
            }
            fe = 0, _t = null, pa(e, t, i, 5);
            break;
          case 6:
            fe = 0, _t = null, pa(e, t, i, 6);
            break;
          case 8:
            yr(), Be = 6;
            break e;
          default:
            throw Error(A(462));
        }
      }
      by();
      break;
    } catch (S) {
      Pm(e, S);
    } while (!0);
    return Dn = jl = null, Z.H = l, Z.A = a, ce = n, ne !== null ? 0 : (ve = null, ae = 0, yu(), Be);
  }
  function by() {
    for (; ne !== null && !Yg();) l0(ne);
  }
  function l0(e) {
    var t = Rm(e.alternate, e, qn);
    e.memoizedProps = e.pendingProps, t === null ? _u(e) : ne = t;
  }
  function vf(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = rf(n, t, t.pendingProps, t.type, void 0, ae);
        break;
      case 11:
        t = rf(n, t, t.pendingProps, t.type.render, t.ref, ae);
        break;
      case 5:
        tr(t);
      default:
        Mm(n, t), t = ne = Mp(t, qn), t = Rm(n, t, qn);
    }
    e.memoizedProps = e.pendingProps, t === null ? _u(e) : ne = t;
  }
  function pa(e, t, n, l) {
    Dn = jl = null, tr(t), ha = null, Ci = 0;
    var a = t.return;
    try {
      if (uy(e, a, t, n, ae)) {
        Be = 1, Wo(e, Zt(n, e.current)), ne = null;
        return;
      }
    } catch (i) {
      if (a !== null) throw ne = a, i;
      Be = 1, Wo(e, Zt(n, e.current)), ne = null;
      return;
    }
    t.flags & 32768 ? (oe || l === 1 ? e = !0 : Ua || (ae & 536870912) !== 0 ? e = !1 : (In = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = kt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), a0(t, e)) : _u(t);
  }
  function _u(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        a0(t, In);
        return;
      }
      e = t.return;
      var n = ry(t.alternate, t, qn);
      if (n !== null) {
        ne = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        ne = t;
        return;
      }
      ne = t = e;
    } while (t !== null);
    Be === 0 && (Be = 5);
  }
  function a0(e, t) {
    do {
      var n = dy(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, ne = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        ne = e;
        return;
      }
      ne = e = n;
    } while (e !== null);
    Be = 6, ne = null;
  }
  function hf(e, t, n, l, a, i, u, s, r) {
    e.cancelPendingCommit = null;
    do Cu(); while (je !== 0);
    if ((ce & 6) !== 0) throw Error(A(327));
    if (t !== null) {
      if (t === e.current) throw Error(A(177));
      if (i = t.lanes | t.childLanes, i |= Ls, Ig(e, n, i, u, s, r), e === ve && (ne = ve = null, ae = 0), Ta = t, ol = e, Rn = n, gs = i, ys = a, Jm = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, zy(jo, function () {
        return s0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = Z.T, Z.T = null, a = se.p, se.p = 2, u = ce, ce |= 4;
        try {
          fy(e, t, n);
        } finally {
          ce = u, se.p = a, Z.T = l;
        }
      }
      je = 1, i0(), o0(), u0();
    }
  }
  function i0() {
    if (je === 1) {
      je = 0;
      var e = ol,
        t = Ta,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = Z.T, Z.T = null;
        var l = se.p;
        se.p = 2;
        var a = ce;
        ce |= 4;
        try {
          Ym(t, e);
          var i = xs,
            u = zp(e.containerInfo),
            s = i.focusedElem,
            r = i.selectionRange;
          if (u !== s && s && s.ownerDocument && Ep(s.ownerDocument.documentElement, s)) {
            if (r !== null && js(s)) {
              var v = r.start,
                S = r.end;
              if (S === void 0 && (S = v), "selectionStart" in s) s.selectionStart = v, s.selectionEnd = Math.min(S, s.value.length);else {
                var E = s.ownerDocument || document,
                  g = E && E.defaultView || window;
                if (g.getSelection) {
                  var p = g.getSelection(),
                    R = s.textContent.length,
                    k = Math.min(r.start, R),
                    Q = r.end === void 0 ? k : Math.min(r.end, R);
                  !p.extend && k > Q && (u = Q, Q = k, k = u);
                  var f = Hd(s, k),
                    m = Hd(s, Q);
                  if (f && m && (p.rangeCount !== 1 || p.anchorNode !== f.node || p.anchorOffset !== f.offset || p.focusNode !== m.node || p.focusOffset !== m.offset)) {
                    var d = E.createRange();
                    d.setStart(f.node, f.offset), p.removeAllRanges(), k > Q ? (p.addRange(d), p.extend(m.node, m.offset)) : (d.setEnd(m.node, m.offset), p.addRange(d));
                  }
                }
              }
            }
            for (E = [], p = s; p = p.parentNode;) p.nodeType === 1 && E.push({
              element: p,
              left: p.scrollLeft,
              top: p.scrollTop
            });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < E.length; s++) {
              var h = E[s];
              h.element.scrollLeft = h.left, h.element.scrollTop = h.top;
            }
          }
          ru = !!Ss, xs = Ss = null;
        } finally {
          ce = a, se.p = l, Z.T = n;
        }
      }
      e.current = t, je = 2;
    }
  }
  function o0() {
    if (je === 2) {
      je = 0;
      var e = ol,
        t = Ta,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = Z.T, Z.T = null;
        var l = se.p;
        se.p = 2;
        var a = ce;
        ce |= 4;
        try {
          wm(e, t.alternate, t);
        } finally {
          ce = a, se.p = l, Z.T = n;
        }
      }
      je = 3;
    }
  }
  function u0() {
    if (je === 4 || je === 3) {
      je = 0, Gg();
      var e = ol,
        t = Ta,
        n = Rn,
        l = Jm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? je = 5 : (je = 0, Ta = ol = null, c0(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (a === 0 && (il = null), Ns(n), t = t.stateNode, Rt && typeof Rt.onCommitFiberRoot == "function") try {
        Rt.onCommitFiberRoot(qi, t, void 0, (t.current.flags & 128) === 128);
      } catch {}
      if (l !== null) {
        t = Z.T, a = se.p, se.p = 2, Z.T = null;
        try {
          for (var i = e.onRecoverableError, u = 0; u < l.length; u++) {
            var s = l[u];
            i(s.value, {
              componentStack: s.stack
            });
          }
        } finally {
          Z.T = t, se.p = a;
        }
      }
      (Rn & 3) !== 0 && Cu(), pn(e), a = e.pendingLanes, (n & 261930) !== 0 && (a & 42) !== 0 ? e === vs ? hi++ : (hi = 0, vs = e) : hi = 0, Gi(0, !1);
    }
  }
  function c0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ji(t)));
  }
  function Cu() {
    return i0(), o0(), u0(), s0();
  }
  function s0() {
    if (je !== 5) return !1;
    var e = ol,
      t = gs;
    gs = 0;
    var n = Ns(Rn),
      l = Z.T,
      a = se.p;
    try {
      se.p = 32 > n ? 32 : n, Z.T = null, n = ys, ys = null;
      var i = ol,
        u = Rn;
      if (je = 0, Ta = ol = null, Rn = 0, (ce & 6) !== 0) throw Error(A(331));
      var s = ce;
      if (ce |= 4, Xm(i.current), Vm(i, i.current, u, n), ce = s, Gi(0, !1), Rt && typeof Rt.onPostCommitFiberRoot == "function") try {
        Rt.onPostCommitFiberRoot(qi, i);
      } catch {}
      return !0;
    } finally {
      se.p = a, Z.T = l, c0(e, t);
    }
  }
  function bf(e, t, n) {
    t = Zt(n, t), t = rs(e.stateNode, t, 2), e = al(e, t, 2), e !== null && (wi(e, 2), pn(e));
  }
  function pe(e, t, n) {
    if (e.tag === 3) bf(e, e, n);else for (; t !== null;) {
      if (t.tag === 3) {
        bf(t, e, n);
        break;
      } else if (t.tag === 1) {
        var l = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (il === null || !il.has(l))) {
          e = Zt(n, e), n = Am(2), l = al(t, n, 2), l !== null && (_m(n, l, t, e), wi(l, 2), pn(l));
          break;
        }
      }
      t = t.return;
    }
  }
  function Tc(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new gy();
      var a = new Set();
      l.set(t, a);
    } else a = l.get(t), a === void 0 && (a = new Set(), l.set(t, a));
    a.has(n) || (mr = !0, a.add(n), e = Sy.bind(null, e, t, n), t.then(e, e));
  }
  function Sy(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, ve === e && (ae & n) === n && (Be === 4 || Be === 3 && (ae & 62914560) === ae && 300 > Bt() - zu ? (ce & 2) === 0 && Ba(e, 0) : gr |= n, Da === ae && (Da = 0)), pn(e);
  }
  function r0(e, t) {
    t === 0 && (t = tp()), e = Hl(e, t), e !== null && (wi(e, t), pn(e));
  }
  function xy(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), r0(e, n);
  }
  function Ey(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode,
          a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(A(314));
    }
    l !== null && l.delete(t), r0(e, n);
  }
  function zy(e, t) {
    return Ms(e, t);
  }
  var lu = null,
    ta = null,
    hs = !1,
    au = !1,
    Bc = !1,
    el = 0;
  function pn(e) {
    e !== ta && e.next === null && (ta === null ? lu = ta = e : ta = ta.next = e), au = !0, hs || (hs = !0, _y());
  }
  function Gi(e, t) {
    if (!Bc && au) {
      Bc = !0;
      do for (var n = !1, l = lu; l !== null;) {
        if (!t) if (e !== 0) {
          var a = l.pendingLanes;
          if (a === 0) var i = 0;else {
            var u = l.suspendedLanes,
              s = l.pingedLanes;
            i = (1 << 31 - Mt(42 | e) + 1) - 1, i &= a & ~(u & ~s), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
          }
          i !== 0 && (n = !0, Sf(l, i));
        } else i = ae, i = fu(l, l === ve ? i : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), (i & 3) === 0 || Ui(l, i) || (n = !0, Sf(l, i));
        l = l.next;
      } while (n);
      Bc = !1;
    }
  }
  function Ay() {
    d0();
  }
  function d0() {
    au = hs = !1;
    var e = 0;
    el !== 0 && Ny() && (e = el);
    for (var t = Bt(), n = null, l = lu; l !== null;) {
      var a = l.next,
        i = f0(l, t);
      i === 0 ? (l.next = null, n === null ? lu = a : n.next = a, a === null && (ta = n)) : (n = l, (e !== 0 || (i & 3) !== 0) && (au = !0)), l = a;
    }
    je !== 0 && je !== 5 || Gi(e, !1), el !== 0 && (el = 0);
  }
  function f0(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, a = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i;) {
      var u = 31 - Mt(i),
        s = 1 << u,
        r = a[u];
      r === -1 ? ((s & n) === 0 || (s & l) !== 0) && (a[u] = Wg(s, t)) : r <= t && (e.expiredLanes |= s), i &= ~s;
    }
    if (t = ve, n = ae, n = fu(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), l = e.callbackNode, n === 0 || e === t && (fe === 2 || fe === 9) || e.cancelPendingCommit !== null) return l !== null && l !== null && ac(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Ui(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && ac(l), Ns(n)) {
        case 2:
        case 8:
          n = Pf;
          break;
        case 32:
          n = jo;
          break;
        case 268435456:
          n = ep;
          break;
        default:
          n = jo;
      }
      return l = p0.bind(null, e), n = Ms(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && ac(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function p0(e, t) {
    if (je !== 0 && je !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Cu() && e.callbackNode !== n) return null;
    var l = ae;
    return l = fu(e, e === ve ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), l === 0 ? null : (Im(e, l, t), f0(e, Bt()), e.callbackNode != null && e.callbackNode === n ? p0.bind(null, e) : null);
  }
  function Sf(e, t) {
    if (Cu()) return null;
    Im(e, t, !0);
  }
  function _y() {
    qy(function () {
      (ce & 6) !== 0 ? Ms(If, Ay) : d0();
    });
  }
  function vr() {
    if (el === 0) {
      var e = Aa;
      e === 0 && (e = ao, ao <<= 1, (ao & 261888) === 0 && (ao = 256)), el = e;
    }
    return el;
  }
  function xf(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : zo("" + e);
  }
  function Ef(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function Cy(e, t, n, l, a) {
    if (t === "submit" && n && n.stateNode === a) {
      var i = xf((a[zt] || null).action),
        u = l.submitter;
      u && (t = (t = u[zt] || null) ? xf(t.formAction) : u.getAttribute("formAction"), t !== null && (i = t, u = null));
      var s = new pu("action", "action", null, l, a);
      e.push({
        event: s,
        listeners: [{
          instance: null,
          listener: function () {
            if (l.defaultPrevented) {
              if (el !== 0) {
                var r = u ? Ef(a, u) : new FormData(a);
                cs(n, {
                  pending: !0,
                  data: r,
                  method: a.method,
                  action: i
                }, null, r);
              }
            } else typeof i == "function" && (s.preventDefault(), r = u ? Ef(a, u) : new FormData(a), cs(n, {
              pending: !0,
              data: r,
              method: a.method,
              action: i
            }, i, r));
          },
          currentTarget: a
        }]
      });
    }
  }
  for (vo = 0; vo < Jc.length; vo++) ho = Jc[vo], zf = ho.toLowerCase(), Af = ho[0].toUpperCase() + ho.slice(1), an(zf, "on" + Af);
  var ho, zf, Af, vo;
  an(_p, "onAnimationEnd");
  an(Cp, "onAnimationIteration");
  an(Dp, "onAnimationStart");
  an("dblclick", "onDoubleClick");
  an("focusin", "onFocus");
  an("focusout", "onBlur");
  an(V1, "onTransitionRun");
  an(Q1, "onTransitionStart");
  an(Z1, "onTransitionCancel");
  an(Tp, "onTransitionEnd");
  Ea("onMouseEnter", ["mouseout", "mouseover"]);
  Ea("onMouseLeave", ["mouseout", "mouseover"]);
  Ea("onPointerEnter", ["pointerout", "pointerover"]);
  Ea("onPointerLeave", ["pointerout", "pointerover"]);
  Ul("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  Ul("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  Ul("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  Ul("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  Ul("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  Ul("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Bi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    Dy = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bi));
  function m0(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n],
        a = l.event;
      l = l.listeners;
      e: {
        var i = void 0;
        if (t) for (var u = l.length - 1; 0 <= u; u--) {
          var s = l[u],
            r = s.instance,
            v = s.currentTarget;
          if (s = s.listener, r !== i && a.isPropagationStopped()) break e;
          i = s, a.currentTarget = v;
          try {
            i(a);
          } catch (S) {
            Yo(S);
          }
          a.currentTarget = null, i = r;
        } else for (u = 0; u < l.length; u++) {
          if (s = l[u], r = s.instance, v = s.currentTarget, s = s.listener, r !== i && a.isPropagationStopped()) break e;
          i = s, a.currentTarget = v;
          try {
            i(a);
          } catch (S) {
            Yo(S);
          }
          a.currentTarget = null, i = r;
        }
      }
    }
  }
  function te(e, t) {
    var n = t[Yc];
    n === void 0 && (n = t[Yc] = new Set());
    var l = e + "__bubble";
    n.has(l) || (g0(t, e, 2, !1), n.add(l));
  }
  function Rc(e, t, n) {
    var l = 0;
    t && (l |= 4), g0(n, e, l, t);
  }
  var bo = "_reactListening" + Math.random().toString(36).slice(2);
  function hr(e) {
    if (!e[bo]) {
      e[bo] = !0, op.forEach(function (n) {
        n !== "selectionchange" && (Dy.has(n) || Rc(n, !1, e), Rc(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[bo] || (t[bo] = !0, Rc("selectionchange", !1, t));
    }
  }
  function g0(e, t, n, l) {
    switch (T0(t)) {
      case 2:
        var a = tv;
        break;
      case 8:
        a = nv;
        break;
      default:
        a = Er;
    }
    n = a.bind(null, t, n, e), a = void 0, !Xc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), l ? a !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, {
      passive: a
    }) : e.addEventListener(t, n, !1);
  }
  function Mc(e, t, n, l, a) {
    var i = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null) e: for (;;) {
      if (l === null) return;
      var u = l.tag;
      if (u === 3 || u === 4) {
        var s = l.stateNode.containerInfo;
        if (s === a) break;
        if (u === 4) for (u = l.return; u !== null;) {
          var r = u.tag;
          if ((r === 3 || r === 4) && u.stateNode.containerInfo === a) return;
          u = u.return;
        }
        for (; s !== null;) {
          if (u = aa(s), u === null) return;
          if (r = u.tag, r === 5 || r === 6 || r === 26 || r === 27) {
            l = i = u;
            continue e;
          }
          s = s.parentNode;
        }
      }
      l = l.return;
    }
    mp(function () {
      var v = i,
        S = Us(n),
        E = [];
      e: {
        var g = Bp.get(e);
        if (g !== void 0) {
          var p = pu,
            R = e;
          switch (e) {
            case "keypress":
              if (_o(n) === 0) break e;
            case "keydown":
            case "keyup":
              p = E1;
              break;
            case "focusin":
              R = "focus", p = sc;
              break;
            case "focusout":
              R = "blur", p = sc;
              break;
            case "beforeblur":
            case "afterblur":
              p = sc;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              p = Rd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              p = r1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              p = _1;
              break;
            case _p:
            case Cp:
            case Dp:
              p = p1;
              break;
            case Tp:
              p = D1;
              break;
            case "scroll":
            case "scrollend":
              p = c1;
              break;
            case "wheel":
              p = B1;
              break;
            case "copy":
            case "cut":
            case "paste":
              p = g1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              p = Od;
              break;
            case "toggle":
            case "beforetoggle":
              p = M1;
          }
          var k = (t & 4) !== 0,
            Q = !k && (e === "scroll" || e === "scrollend"),
            f = k ? g !== null ? g + "Capture" : null : g;
          k = [];
          for (var m = v, d; m !== null;) {
            var h = m;
            if (d = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || d === null || f === null || (h = xi(m, f), h != null && k.push(Ri(m, h, d))), Q) break;
            m = m.return;
          }
          0 < k.length && (g = new p(g, R, null, n, S), E.push({
            event: g,
            listeners: k
          }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (g = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", g && n !== Zc && (R = n.relatedTarget || n.fromElement) && (aa(R) || R[Oa])) break e;
          if ((p || g) && (g = S.window === S ? S : (g = S.ownerDocument) ? g.defaultView || g.parentWindow : window, p ? (R = n.relatedTarget || n.toElement, p = v, R = R ? aa(R) : null, R !== null && (Q = ki(R), k = R.tag, R !== Q || k !== 5 && k !== 27 && k !== 6) && (R = null)) : (p = null, R = v), p !== R)) {
            if (k = Rd, h = "onMouseLeave", f = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (k = Od, h = "onPointerLeave", f = "onPointerEnter", m = "pointer"), Q = p == null ? g : ai(p), d = R == null ? g : ai(R), g = new k(h, m + "leave", p, n, S), g.target = Q, g.relatedTarget = d, h = null, aa(S) === v && (k = new k(f, m + "enter", R, n, S), k.target = d, k.relatedTarget = Q, h = k), Q = h, p && R) t: {
              for (k = Ty, f = p, m = R, d = 0, h = f; h; h = k(h)) d++;
              h = 0;
              for (var w = m; w; w = k(w)) h++;
              for (; 0 < d - h;) f = k(f), d--;
              for (; 0 < h - d;) m = k(m), h--;
              for (; d--;) {
                if (f === m || m !== null && f === m.alternate) {
                  k = f;
                  break t;
                }
                f = k(f), m = k(m);
              }
              k = null;
            } else k = null;
            p !== null && _f(E, g, p, k, !1), R !== null && Q !== null && _f(E, Q, R, k, !0);
          }
        }
        e: {
          if (g = v ? ai(v) : window, p = g.nodeName && g.nodeName.toLowerCase(), p === "select" || p === "input" && g.type === "file") var B = Ud;else if (qd(g)) {
            if (Sp) B = L1;else {
              B = H1;
              var M = F1;
            }
          } else p = g.nodeName, !p || p.toLowerCase() !== "input" || g.type !== "checkbox" && g.type !== "radio" ? v && qs(v.elementType) && (B = Ud) : B = j1;
          if (B && (B = B(e, v))) {
            bp(E, B, n, S);
            break e;
          }
          M && M(e, g, v), e === "focusout" && v && g.type === "number" && v.memoizedProps.value != null && Qc(g, "number", g.value);
        }
        switch (M = v ? ai(v) : window, e) {
          case "focusin":
            (qd(M) || M.contentEditable === "true") && (ua = M, $c = v, si = null);
            break;
          case "focusout":
            si = $c = ua = null;
            break;
          case "mousedown":
            Kc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Kc = !1, jd(E, n, S);
            break;
          case "selectionchange":
            if (G1) break;
          case "keydown":
          case "keyup":
            jd(E, n, S);
        }
        var Y;
        if (Hs) e: {
          switch (e) {
            case "compositionstart":
              var O = "onCompositionStart";
              break e;
            case "compositionend":
              O = "onCompositionEnd";
              break e;
            case "compositionupdate":
              O = "onCompositionUpdate";
              break e;
          }
          O = void 0;
        } else oa ? vp(e, n) && (O = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (O = "onCompositionStart");
        O && (yp && n.locale !== "ko" && (oa || O !== "onCompositionStart" ? O === "onCompositionEnd" && oa && (Y = gp()) : (Wn = S, ws = "value" in Wn ? Wn.value : Wn.textContent, oa = !0)), M = iu(v, O), 0 < M.length && (O = new Md(O, e, null, n, S), E.push({
          event: O,
          listeners: M
        }), Y ? O.data = Y : (Y = hp(n), Y !== null && (O.data = Y)))), (Y = N1 ? k1(e, n) : q1(e, n)) && (O = iu(v, "onBeforeInput"), 0 < O.length && (M = new Md("onBeforeInput", "beforeinput", null, n, S), E.push({
          event: M,
          listeners: O
        }), M.data = Y)), Cy(E, e, v, n, S);
      }
      m0(E, t);
    });
  }
  function Ri(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function iu(e, t) {
    for (var n = t + "Capture", l = []; e !== null;) {
      var a = e,
        i = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || i === null || (a = xi(e, n), a != null && l.unshift(Ri(e, a, i)), a = xi(e, t), a != null && l.push(Ri(e, a, i))), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Ty(e) {
    if (e === null) return null;
    do e = e.return; while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function _f(e, t, n, l, a) {
    for (var i = t._reactName, u = []; n !== null && n !== l;) {
      var s = n,
        r = s.alternate,
        v = s.stateNode;
      if (s = s.tag, r !== null && r === l) break;
      s !== 5 && s !== 26 && s !== 27 || v === null || (r = v, a ? (v = xi(n, i), v != null && u.unshift(Ri(n, v, r))) : a || (v = xi(n, i), v != null && u.push(Ri(n, v, r)))), n = n.return;
    }
    u.length !== 0 && e.push({
      event: t,
      listeners: u
    });
  }
  var By = /\r\n?/g,
    Ry = /\u0000|\uFFFD/g;
  function Cf(e) {
    return (typeof e == "string" ? e : "" + e).replace(By, `
`).replace(Ry, "");
  }
  function y0(e, t) {
    return t = Cf(t), Cf(e) === t;
  }
  function me(e, t, n, l, a, i) {
    switch (n) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || za(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && za(e, "" + l);
        break;
      case "className":
        uo(e, "class", l);
        break;
      case "tabIndex":
        uo(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        uo(e, n, l);
        break;
      case "style":
        pp(e, l, i);
        break;
      case "data":
        if (t !== "object") {
          uo(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = zo("" + l), e.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof i == "function" && (n === "formAction" ? (t !== "input" && me(e, t, "name", a.name, a, null), me(e, t, "formEncType", a.formEncType, a, null), me(e, t, "formMethod", a.formMethod, a, null), me(e, t, "formTarget", a.formTarget, a, null)) : (me(e, t, "encType", a.encType, a, null), me(e, t, "method", a.method, a, null), me(e, t, "target", a.target, a, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = zo("" + l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = Cn);
        break;
      case "onScroll":
        l != null && te("scroll", e);
        break;
      case "onScrollEnd":
        l != null && te("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(A(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(A(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = zo("" + l), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "" + l) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(n) : e.setAttribute(n, l);
        break;
      case "popover":
        te("beforetoggle", e), te("toggle", e), Eo(e, "popover", l);
        break;
      case "xlinkActuate":
        hn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        hn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        hn(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        hn(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        hn(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        hn(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        hn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        hn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        hn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        Eo(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = o1.get(n) || n, Eo(e, n, l));
    }
  }
  function bs(e, t, n, l, a, i) {
    switch (n) {
      case "style":
        pp(e, l, i);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(A(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(A(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string" ? za(e, l) : (typeof l == "number" || typeof l == "bigint") && za(e, "" + l);
        break;
      case "onScroll":
        l != null && te("scroll", e);
        break;
      case "onScrollEnd":
        l != null && te("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Cn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!up.hasOwnProperty(n)) e: {
          if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), i = e[zt] || null, i = i != null ? i[n] : null, typeof i == "function" && e.removeEventListener(t, i, a), typeof l == "function")) {
            typeof i != "function" && i !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, l, a);
            break e;
          }
          n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : Eo(e, n, l);
        }
    }
  }
  function lt(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        te("error", e), te("load", e);
        var l = !1,
          a = !1,
          i;
        for (i in n) if (n.hasOwnProperty(i)) {
          var u = n[i];
          if (u != null) switch (i) {
            case "src":
              l = !0;
              break;
            case "srcSet":
              a = !0;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(A(137, t));
            default:
              me(e, t, i, u, n, null);
          }
        }
        a && me(e, t, "srcSet", n.srcSet, n, null), l && me(e, t, "src", n.src, n, null);
        return;
      case "input":
        te("invalid", e);
        var s = i = u = a = null,
          r = null,
          v = null;
        for (l in n) if (n.hasOwnProperty(l)) {
          var S = n[l];
          if (S != null) switch (l) {
            case "name":
              a = S;
              break;
            case "type":
              u = S;
              break;
            case "checked":
              r = S;
              break;
            case "defaultChecked":
              v = S;
              break;
            case "value":
              i = S;
              break;
            case "defaultValue":
              s = S;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (S != null) throw Error(A(137, t));
              break;
            default:
              me(e, t, l, S, n, null);
          }
        }
        rp(e, i, s, r, v, u, a, !1);
        return;
      case "select":
        te("invalid", e), l = u = i = null;
        for (a in n) if (n.hasOwnProperty(a) && (s = n[a], s != null)) switch (a) {
          case "value":
            i = s;
            break;
          case "defaultValue":
            u = s;
            break;
          case "multiple":
            l = s;
          default:
            me(e, t, a, s, n, null);
        }
        t = i, n = u, e.multiple = !!l, t != null ? ga(e, !!l, t, !1) : n != null && ga(e, !!l, n, !0);
        return;
      case "textarea":
        te("invalid", e), i = a = l = null;
        for (u in n) if (n.hasOwnProperty(u) && (s = n[u], s != null)) switch (u) {
          case "value":
            l = s;
            break;
          case "defaultValue":
            a = s;
            break;
          case "children":
            i = s;
            break;
          case "dangerouslySetInnerHTML":
            if (s != null) throw Error(A(91));
            break;
          default:
            me(e, t, u, s, n, null);
        }
        fp(e, l, a, i);
        return;
      case "option":
        for (r in n) n.hasOwnProperty(r) && (l = n[r], l != null) && (r === "selected" ? e.selected = l && typeof l != "function" && typeof l != "symbol" : me(e, t, r, l, n, null));
        return;
      case "dialog":
        te("beforetoggle", e), te("toggle", e), te("cancel", e), te("close", e);
        break;
      case "iframe":
      case "object":
        te("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Bi.length; l++) te(Bi[l], e);
        break;
      case "image":
        te("error", e), te("load", e);
        break;
      case "details":
        te("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        te("error", e), te("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (v in n) if (n.hasOwnProperty(v) && (l = n[v], l != null)) switch (v) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(A(137, t));
          default:
            me(e, t, v, l, n, null);
        }
        return;
      default:
        if (qs(t)) {
          for (S in n) n.hasOwnProperty(S) && (l = n[S], l !== void 0 && bs(e, t, S, l, n, void 0));
          return;
        }
    }
    for (s in n) n.hasOwnProperty(s) && (l = n[s], l != null && me(e, t, s, l, n, null));
  }
  function My(e, t, n, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null,
          i = null,
          u = null,
          s = null,
          r = null,
          v = null,
          S = null;
        for (p in n) {
          var E = n[p];
          if (n.hasOwnProperty(p) && E != null) switch (p) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              r = E;
            default:
              l.hasOwnProperty(p) || me(e, t, p, null, l, E);
          }
        }
        for (var g in l) {
          var p = l[g];
          if (E = n[g], l.hasOwnProperty(g) && (p != null || E != null)) switch (g) {
            case "type":
              i = p;
              break;
            case "name":
              a = p;
              break;
            case "checked":
              v = p;
              break;
            case "defaultChecked":
              S = p;
              break;
            case "value":
              u = p;
              break;
            case "defaultValue":
              s = p;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (p != null) throw Error(A(137, t));
              break;
            default:
              p !== E && me(e, t, g, p, l, E);
          }
        }
        Vc(e, u, s, r, v, S, i, a);
        return;
      case "select":
        p = u = s = g = null;
        for (i in n) if (r = n[i], n.hasOwnProperty(i) && r != null) switch (i) {
          case "value":
            break;
          case "multiple":
            p = r;
          default:
            l.hasOwnProperty(i) || me(e, t, i, null, l, r);
        }
        for (a in l) if (i = l[a], r = n[a], l.hasOwnProperty(a) && (i != null || r != null)) switch (a) {
          case "value":
            g = i;
            break;
          case "defaultValue":
            s = i;
            break;
          case "multiple":
            u = i;
          default:
            i !== r && me(e, t, a, i, l, r);
        }
        t = s, n = u, l = p, g != null ? ga(e, !!n, g, !1) : !!l != !!n && (t != null ? ga(e, !!n, t, !0) : ga(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        p = g = null;
        for (s in n) if (a = n[s], n.hasOwnProperty(s) && a != null && !l.hasOwnProperty(s)) switch (s) {
          case "value":
            break;
          case "children":
            break;
          default:
            me(e, t, s, null, l, a);
        }
        for (u in l) if (a = l[u], i = n[u], l.hasOwnProperty(u) && (a != null || i != null)) switch (u) {
          case "value":
            g = a;
            break;
          case "defaultValue":
            p = a;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (a != null) throw Error(A(91));
            break;
          default:
            a !== i && me(e, t, u, a, l, i);
        }
        dp(e, g, p);
        return;
      case "option":
        for (var R in n) g = n[R], n.hasOwnProperty(R) && g != null && !l.hasOwnProperty(R) && (R === "selected" ? e.selected = !1 : me(e, t, R, null, l, g));
        for (r in l) g = l[r], p = n[r], l.hasOwnProperty(r) && g !== p && (g != null || p != null) && (r === "selected" ? e.selected = g && typeof g != "function" && typeof g != "symbol" : me(e, t, r, g, l, p));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var k in n) g = n[k], n.hasOwnProperty(k) && g != null && !l.hasOwnProperty(k) && me(e, t, k, null, l, g);
        for (v in l) if (g = l[v], p = n[v], l.hasOwnProperty(v) && g !== p && (g != null || p != null)) switch (v) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (g != null) throw Error(A(137, t));
            break;
          default:
            me(e, t, v, g, l, p);
        }
        return;
      default:
        if (qs(t)) {
          for (var Q in n) g = n[Q], n.hasOwnProperty(Q) && g !== void 0 && !l.hasOwnProperty(Q) && bs(e, t, Q, void 0, l, g);
          for (S in l) g = l[S], p = n[S], !l.hasOwnProperty(S) || g === p || g === void 0 && p === void 0 || bs(e, t, S, g, l, p);
          return;
        }
    }
    for (var f in n) g = n[f], n.hasOwnProperty(f) && g != null && !l.hasOwnProperty(f) && me(e, t, f, null, l, g);
    for (E in l) g = l[E], p = n[E], !l.hasOwnProperty(E) || g === p || g == null && p == null || me(e, t, E, g, l, p);
  }
  function Df(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Oy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var a = n[l],
          i = a.transferSize,
          u = a.initiatorType,
          s = a.duration;
        if (i && s && Df(u)) {
          for (u = 0, s = a.responseEnd, l += 1; l < n.length; l++) {
            var r = n[l],
              v = r.startTime;
            if (v > s) break;
            var S = r.transferSize,
              E = r.initiatorType;
            S && Df(E) && (r = r.responseEnd, u += S * (r < s ? 1 : (s - v) / (r - v)));
          }
          if (--l, t += 8 * (i + u) / (a.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ss = null,
    xs = null;
  function ou(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Tf(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function v0(e, t) {
    if (e === 0) switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Es(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Oc = null;
  function Ny() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Oc ? !1 : (Oc = e, !0) : (Oc = null, !1);
  }
  var h0 = typeof setTimeout == "function" ? setTimeout : void 0,
    ky = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Bf = typeof Promise == "function" ? Promise : void 0,
    qy = typeof queueMicrotask == "function" ? queueMicrotask : typeof Bf < "u" ? function (e) {
      return Bf.resolve(null).then(e).catch(Uy);
    } : h0;
  function Uy(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function gl(e) {
    return e === "head";
  }
  function Rf(e, t) {
    var n = t,
      l = 0;
    do {
      var a = n.nextSibling;
      if (e.removeChild(n), a && a.nodeType === 8) if (n = a.data, n === "/$" || n === "/&") {
        if (l === 0) {
          e.removeChild(a), Ma(t);
          return;
        }
        l--;
      } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") l++;else if (n === "html") bi(e.ownerDocument.documentElement);else if (n === "head") {
        n = e.ownerDocument.head, bi(n);
        for (var i = n.firstChild; i;) {
          var u = i.nextSibling,
            s = i.nodeName;
          i[Fi] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && i.rel.toLowerCase() === "stylesheet" || n.removeChild(i), i = u;
        }
      } else n === "body" && bi(e.ownerDocument.body);
      n = a;
    } while (n);
    Ma(t);
  }
  function Mf(e, t) {
    var n = e;
    e = 0;
    do {
      var l = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), l && l.nodeType === 8) if (n = l.data, n === "/$") {
        if (e === 0) break;
        e--;
      } else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = l;
    } while (n);
  }
  function zs(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          zs(n), ks(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function wy(e, t, n, l) {
    for (; e.nodeType === 1;) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (l) {
        if (!e[Fi]) switch (t) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence")) break;
            if (i !== a.rel || e.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || e.getAttribute("title") !== (a.title == null ? null : a.title)) break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (i = e.getAttribute("src"), (i !== (a.src == null ? null : a.src) || e.getAttribute("type") !== (a.type == null ? null : a.type) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
            return e;
          default:
            return e;
        }
      } else if (t === "input" && e.type === "hidden") {
        var i = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && e.getAttribute("name") === i) return e;
      } else return e;
      if (e = Kt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Fy(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Kt(e.nextSibling), e === null)) return null;
    return e;
  }
  function b0(e, t) {
    for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Kt(e.nextSibling), e === null)) return null;
    return e;
  }
  function As(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function _s(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Hy(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;else if (e.data !== "$?" || n.readyState !== "loading") t();else {
      var l = function () {
        t(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Kt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Cs = null;
  function Of(e) {
    e = e.nextSibling;
    for (var t = 0; e;) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0) return Kt(e.nextSibling);
          t--;
        } else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Nf(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function S0(e, t, n) {
    switch (t = ou(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(A(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(A(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(A(454));
        return e;
      default:
        throw Error(A(451));
    }
  }
  function bi(e) {
    for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
    ks(e);
  }
  var Jt = new Map(),
    kf = new Set();
  function uu(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Un = se.d;
  se.d = {
    f: jy,
    r: Ly,
    D: Yy,
    C: Gy,
    L: Vy,
    m: Qy,
    X: Xy,
    S: Zy,
    M: $y
  };
  function jy() {
    var e = Un.f(),
      t = Au();
    return e || t;
  }
  function Ly(e) {
    var t = Na(e);
    t !== null && t.tag === 5 && t.type === "form" ? pm(t) : Un.r(e);
  }
  var wa = typeof document > "u" ? null : document;
  function x0(e, t, n) {
    var l = wa;
    if (l && typeof t == "string" && t) {
      var a = Qt(t);
      a = 'link[rel="' + e + '"][href="' + a + '"]', typeof n == "string" && (a += '[crossorigin="' + n + '"]'), kf.has(a) || (kf.add(a), e = {
        rel: e,
        crossOrigin: n,
        href: t
      }, l.querySelector(a) === null && (t = l.createElement("link"), lt(t, "link", e), Qe(t), l.head.appendChild(t)));
    }
  }
  function Yy(e) {
    Un.D(e), x0("dns-prefetch", e, null);
  }
  function Gy(e, t) {
    Un.C(e, t), x0("preconnect", e, t);
  }
  function Vy(e, t, n) {
    Un.L(e, t, n);
    var l = wa;
    if (l && e && t) {
      var a = 'link[rel="preload"][as="' + Qt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (a += '[imagesrcset="' + Qt(n.imageSrcSet) + '"]', typeof n.imageSizes == "string" && (a += '[imagesizes="' + Qt(n.imageSizes) + '"]')) : a += '[href="' + Qt(e) + '"]';
      var i = a;
      switch (t) {
        case "style":
          i = Ra(e);
          break;
        case "script":
          i = Fa(e);
      }
      Jt.has(i) || (e = Ee({
        rel: "preload",
        href: t === "image" && n && n.imageSrcSet ? void 0 : e,
        as: t
      }, n), Jt.set(i, e), l.querySelector(a) !== null || t === "style" && l.querySelector(Vi(i)) || t === "script" && l.querySelector(Qi(i)) || (t = l.createElement("link"), lt(t, "link", e), Qe(t), l.head.appendChild(t)));
    }
  }
  function Qy(e, t) {
    Un.m(e, t);
    var n = wa;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script",
        a = 'link[rel="modulepreload"][as="' + Qt(l) + '"][href="' + Qt(e) + '"]',
        i = a;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Fa(e);
      }
      if (!Jt.has(i) && (e = Ee({
        rel: "modulepreload",
        href: e
      }, t), Jt.set(i, e), n.querySelector(a) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Qi(i))) return;
        }
        l = n.createElement("link"), lt(l, "link", e), Qe(l), n.head.appendChild(l);
      }
    }
  }
  function Zy(e, t, n) {
    Un.S(e, t, n);
    var l = wa;
    if (l && e) {
      var a = ma(l).hoistableStyles,
        i = Ra(e);
      t = t || "default";
      var u = a.get(i);
      if (!u) {
        var s = {
          loading: 0,
          preload: null
        };
        if (u = l.querySelector(Vi(i))) s.loading = 5;else {
          e = Ee({
            rel: "stylesheet",
            href: e,
            "data-precedence": t
          }, n), (n = Jt.get(i)) && br(e, n);
          var r = u = l.createElement("link");
          Qe(r), lt(r, "link", e), r._p = new Promise(function (v, S) {
            r.onload = v, r.onerror = S;
          }), r.addEventListener("load", function () {
            s.loading |= 1;
          }), r.addEventListener("error", function () {
            s.loading |= 2;
          }), s.loading |= 4, No(u, t, l);
        }
        u = {
          type: "stylesheet",
          instance: u,
          count: 1,
          state: s
        }, a.set(i, u);
      }
    }
  }
  function Xy(e, t) {
    Un.X(e, t);
    var n = wa;
    if (n && e) {
      var l = ma(n).hoistableScripts,
        a = Fa(e),
        i = l.get(a);
      i || (i = n.querySelector(Qi(a)), i || (e = Ee({
        src: e,
        async: !0
      }, t), (t = Jt.get(a)) && Sr(e, t), i = n.createElement("script"), Qe(i), lt(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(a, i));
    }
  }
  function $y(e, t) {
    Un.M(e, t);
    var n = wa;
    if (n && e) {
      var l = ma(n).hoistableScripts,
        a = Fa(e),
        i = l.get(a);
      i || (i = n.querySelector(Qi(a)), i || (e = Ee({
        src: e,
        async: !0,
        type: "module"
      }, t), (t = Jt.get(a)) && Sr(e, t), i = n.createElement("script"), Qe(i), lt(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(a, i));
    }
  }
  function qf(e, t, n, l) {
    var a = (a = tl.current) ? uu(a) : null;
    if (!a) throw Error(A(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Ra(n.href), n = ma(a).hoistableStyles, l = n.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : {
          type: "void",
          instance: null,
          count: 0,
          state: null
        };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Ra(n.href);
          var i = ma(a).hoistableStyles,
            u = i.get(e);
          if (u || (a = a.ownerDocument || a, u = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: {
              loading: 0,
              preload: null
            }
          }, i.set(e, u), (i = a.querySelector(Vi(e))) && !i._p && (u.instance = i, u.state.loading = 5), Jt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Jt.set(e, n), i || Ky(a, e, n, u.state))), t && l === null) throw Error(A(528, ""));
          return u;
        }
        if (t && l !== null) throw Error(A(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Fa(n), n = ma(a).hoistableScripts, l = n.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : {
          type: "void",
          instance: null,
          count: 0,
          state: null
        };
      default:
        throw Error(A(444, e));
    }
  }
  function Ra(e) {
    return 'href="' + Qt(e) + '"';
  }
  function Vi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function E0(e) {
    return Ee({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Ky(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function () {
      return l.loading |= 1;
    }), t.addEventListener("error", function () {
      return l.loading |= 2;
    }), lt(t, "link", n), Qe(t), e.head.appendChild(t));
  }
  function Fa(e) {
    return '[src="' + Qt(e) + '"]';
  }
  function Qi(e) {
    return "script[async]" + e;
  }
  function Uf(e, t, n) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var l = e.querySelector('style[data-href~="' + Qt(n.href) + '"]');
        if (l) return t.instance = l, Qe(l), l;
        var a = Ee({}, n, {
          "data-href": n.href,
          "data-precedence": n.precedence,
          href: null,
          precedence: null
        });
        return l = (e.ownerDocument || e).createElement("style"), Qe(l), lt(l, "style", a), No(l, n.precedence, e), t.instance = l;
      case "stylesheet":
        a = Ra(n.href);
        var i = e.querySelector(Vi(a));
        if (i) return t.state.loading |= 4, t.instance = i, Qe(i), i;
        l = E0(n), (a = Jt.get(a)) && br(l, a), i = (e.ownerDocument || e).createElement("link"), Qe(i);
        var u = i;
        return u._p = new Promise(function (s, r) {
          u.onload = s, u.onerror = r;
        }), lt(i, "link", l), t.state.loading |= 4, No(i, n.precedence, e), t.instance = i;
      case "script":
        return i = Fa(n.src), (a = e.querySelector(Qi(i))) ? (t.instance = a, Qe(a), a) : (l = n, (a = Jt.get(i)) && (l = Ee({}, n), Sr(l, a)), e = e.ownerDocument || e, a = e.createElement("script"), Qe(a), lt(a, "link", l), e.head.appendChild(a), t.instance = a);
      case "void":
        return null;
      default:
        throw Error(A(443, t.type));
    } else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, No(l, n.precedence, e));
    return t.instance;
  }
  function No(e, t, n) {
    for (var l = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), a = l.length ? l[l.length - 1] : null, i = a, u = 0; u < l.length; u++) {
      var s = l[u];
      if (s.dataset.precedence === t) i = s;else if (i !== a) break;
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function br(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Sr(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ko = null;
  function wf(e, t, n) {
    if (ko === null) {
      var l = new Map(),
        a = ko = new Map();
      a.set(n, l);
    } else a = ko, l = a.get(n), l || (l = new Map(), a.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
      var i = n[a];
      if (!(i[Fi] || i[et] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var u = i.getAttribute(t) || "";
        u = e + u;
        var s = l.get(u);
        s ? s.push(i) : l.set(u, [i]);
      }
    }
    return l;
  }
  function Ff(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
  }
  function Jy(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
    }
    return !1;
  }
  function z0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Wy(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var a = Ra(l.href),
          i = t.querySelector(Vi(a));
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = cu.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = i, Qe(i);
          return;
        }
        i = t.ownerDocument || t, l = E0(l), (a = Jt.get(a)) && br(l, a), i = i.createElement("link"), Qe(i);
        var u = i;
        u._p = new Promise(function (s, r) {
          u.onload = s, u.onerror = r;
        }), lt(i, "link", l), n.instance = i;
      }
      e.stylesheets === null && (e.stylesheets = new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = cu.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Nc = 0;
  function Iy(e, t) {
    return e.stylesheets && e.count === 0 && qo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function (n) {
      var l = setTimeout(function () {
        if (e.stylesheets && qo(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Nc === 0 && (Nc = 62500 * Oy());
      var a = setTimeout(function () {
        if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && qo(e, e.stylesheets), e.unsuspend)) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, (e.imgBytes > Nc ? 50 : 800) + t);
      return e.unsuspend = n, function () {
        e.unsuspend = null, clearTimeout(l), clearTimeout(a);
      };
    } : null;
  }
  function cu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) qo(this, this.stylesheets);else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var su = null;
  function qo(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, su = new Map(), t.forEach(Py, e), su = null, cu.call(e));
  }
  function Py(e, t) {
    if (!(t.state.loading & 4)) {
      var n = su.get(e);
      if (n) var l = n.get(null);else {
        n = new Map(), su.set(e, n);
        for (var a = e.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < a.length; i++) {
          var u = a[i];
          (u.nodeName === "LINK" || u.getAttribute("media") !== "not all") && (n.set(u.dataset.precedence, u), l = u);
        }
        l && n.set(null, l);
      }
      a = t.instance, u = a.getAttribute("data-precedence"), i = n.get(u) || l, i === l && n.set(null, a), n.set(u, a), this.count++, l = cu.bind(this), a.addEventListener("load", l), a.addEventListener("error", l), i ? i.parentNode.insertBefore(a, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(a, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Mi = {
    $$typeof: _n,
    Provider: null,
    Consumer: null,
    _currentValue: Cl,
    _currentValue2: Cl,
    _threadCount: 0
  };
  function ev(e, t, n, l, a, i, u, s, r) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ic(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ic(0), this.hiddenUpdates = ic(null), this.identifierPrefix = l, this.onUncaughtError = a, this.onCaughtError = i, this.onRecoverableError = u, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = new Map();
  }
  function A0(e, t, n, l, a, i, u, s, r, v, S, E) {
    return e = new ev(e, t, n, u, r, v, S, E, s), t = 1, i === !0 && (t |= 24), i = Dt(3, null, null, t), e.current = i, i.stateNode = e, t = Zs(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, Ks(i), e;
  }
  function _0(e) {
    return e ? (e = ra, e) : ra;
  }
  function C0(e, t, n, l, a, i) {
    a = _0(a), l.context === null ? l.context = a : l.pendingContext = a, l = ll(t), l.payload = {
      element: n
    }, i = i === void 0 ? null : i, i !== null && (l.callback = i), n = al(e, l, t), n !== null && (Et(n, e, t), di(n, e, t));
  }
  function Hf(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function xr(e, t) {
    Hf(e, t), (e = e.alternate) && Hf(e, t);
  }
  function D0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Hl(e, 67108864);
      t !== null && Et(t, e, 67108864), xr(e, 67108864);
    }
  }
  function jf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ot();
      t = Os(t);
      var n = Hl(e, t);
      n !== null && Et(n, e, t), xr(e, t);
    }
  }
  var ru = !0;
  function tv(e, t, n, l) {
    var a = Z.T;
    Z.T = null;
    var i = se.p;
    try {
      se.p = 2, Er(e, t, n, l);
    } finally {
      se.p = i, Z.T = a;
    }
  }
  function nv(e, t, n, l) {
    var a = Z.T;
    Z.T = null;
    var i = se.p;
    try {
      se.p = 8, Er(e, t, n, l);
    } finally {
      se.p = i, Z.T = a;
    }
  }
  function Er(e, t, n, l) {
    if (ru) {
      var a = Ds(l);
      if (a === null) Mc(e, t, l, du, n), Lf(e, l);else if (av(a, e, t, n, l)) l.stopPropagation();else if (Lf(e, l), t & 4 && -1 < lv.indexOf(e)) {
        for (; a !== null;) {
          var i = Na(a);
          if (i !== null) switch (i.tag) {
            case 3:
              if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                var u = zl(i.pendingLanes);
                if (u !== 0) {
                  var s = i;
                  for (s.pendingLanes |= 2, s.entangledLanes |= 2; u;) {
                    var r = 1 << 31 - Mt(u);
                    s.entanglements[1] |= r, u &= ~r;
                  }
                  pn(i), (ce & 6) === 0 && (eu = Bt() + 500, Gi(0, !1));
                }
              }
              break;
            case 31:
            case 13:
              s = Hl(i, 2), s !== null && Et(s, i, 2), Au(), xr(i, 2);
          }
          if (i = Ds(l), i === null && Mc(e, t, l, du, n), i === a) break;
          a = i;
        }
        a !== null && l.stopPropagation();
      } else Mc(e, t, l, null, n);
    }
  }
  function Ds(e) {
    return e = Us(e), zr(e);
  }
  var du = null;
  function zr(e) {
    if (du = null, e = aa(e), e !== null) {
      var t = ki(e);
      if (t === null) e = null;else {
        var n = t.tag;
        if (n === 13) {
          if (e = Xf(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = $f(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return du = e, null;
  }
  function T0(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Vg()) {
          case If:
            return 2;
          case Pf:
            return 8;
          case jo:
          case Qg:
            return 32;
          case ep:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ts = !1,
    ul = null,
    cl = null,
    sl = null,
    Oi = new Map(),
    Ni = new Map(),
    Kn = [],
    lv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function Lf(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ul = null;
        break;
      case "dragenter":
      case "dragleave":
        cl = null;
        break;
      case "mouseover":
      case "mouseout":
        sl = null;
        break;
      case "pointerover":
      case "pointerout":
        Oi.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ni.delete(t.pointerId);
    }
  }
  function ei(e, t, n, l, a, i) {
    return e === null || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: i,
      targetContainers: [a]
    }, t !== null && (t = Na(t), t !== null && D0(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function av(e, t, n, l, a) {
    switch (t) {
      case "focusin":
        return ul = ei(ul, e, t, n, l, a), !0;
      case "dragenter":
        return cl = ei(cl, e, t, n, l, a), !0;
      case "mouseover":
        return sl = ei(sl, e, t, n, l, a), !0;
      case "pointerover":
        var i = a.pointerId;
        return Oi.set(i, ei(Oi.get(i) || null, e, t, n, l, a)), !0;
      case "gotpointercapture":
        return i = a.pointerId, Ni.set(i, ei(Ni.get(i) || null, e, t, n, l, a)), !0;
    }
    return !1;
  }
  function B0(e) {
    var t = aa(e.target);
    if (t !== null) {
      var n = ki(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = Xf(n), t !== null) {
            e.blockedOn = t, zd(e.priority, function () {
              jf(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = $f(n), t !== null) {
            e.blockedOn = t, zd(e.priority, function () {
              jf(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Uo(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
      var n = Ds(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(n.type, n);
        Zc = l, n.target.dispatchEvent(l), Zc = null;
      } else return t = Na(n), t !== null && D0(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Yf(e, t, n) {
    Uo(e) && n.delete(t);
  }
  function iv() {
    Ts = !1, ul !== null && Uo(ul) && (ul = null), cl !== null && Uo(cl) && (cl = null), sl !== null && Uo(sl) && (sl = null), Oi.forEach(Yf), Ni.forEach(Yf);
  }
  function So(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ts || (Ts = !0, Le.unstable_scheduleCallback(Le.unstable_NormalPriority, iv)));
  }
  var xo = null;
  function Gf(e) {
    xo !== e && (xo = e, Le.unstable_scheduleCallback(Le.unstable_NormalPriority, function () {
      xo === e && (xo = null);
      for (var t = 0; t < e.length; t += 3) {
        var n = e[t],
          l = e[t + 1],
          a = e[t + 2];
        if (typeof l != "function") {
          if (zr(l || n) === null) continue;
          break;
        }
        var i = Na(n);
        i !== null && (e.splice(t, 3), t -= 3, cs(i, {
          pending: !0,
          data: a,
          method: n.method,
          action: l
        }, l, a));
      }
    }));
  }
  function Ma(e) {
    function t(r) {
      return So(r, e);
    }
    ul !== null && So(ul, e), cl !== null && So(cl, e), sl !== null && So(sl, e), Oi.forEach(t), Ni.forEach(t);
    for (var n = 0; n < Kn.length; n++) {
      var l = Kn[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Kn.length && (n = Kn[0], n.blockedOn === null);) B0(n), n.blockedOn === null && Kn.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (l = 0; l < n.length; l += 3) {
      var a = n[l],
        i = n[l + 1],
        u = a[zt] || null;
      if (typeof i == "function") u || Gf(n);else if (u) {
        var s = null;
        if (i && i.hasAttribute("formAction")) {
          if (a = i, u = i[zt] || null) s = u.formAction;else if (zr(a) !== null) continue;
        } else s = u.action;
        typeof s == "function" ? n[l + 1] = s : (n.splice(l, 3), l -= 3), Gf(n);
      }
    }
  }
  function R0() {
    function e(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function () {
          return new Promise(function (u) {
            return a = u;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      a !== null && (a(), a = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1,
        a = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function () {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), a !== null && (a(), a = null);
      };
    }
  }
  function Ar(e) {
    this._internalRoot = e;
  }
  Du.prototype.render = Ar.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(A(409));
    var n = t.current,
      l = Ot();
    C0(n, l, e, t, null, null);
  };
  Du.prototype.unmount = Ar.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      C0(e.current, 2, null, e, null, null), Au(), t[Oa] = null;
    }
  };
  function Du(e) {
    this._internalRoot = e;
  }
  Du.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ip();
      e = {
        blockedOn: null,
        target: e,
        priority: t
      };
      for (var n = 0; n < Kn.length && t !== 0 && t < Kn[n].priority; n++);
      Kn.splice(n, 0, e), n === 0 && B0(e);
    }
  };
  var Vf = Qf.version;
  if (Vf !== "19.2.5") throw Error(A(527, Vf, "19.2.5"));
  se.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(A(188)) : (e = Object.keys(e).join(","), Error(A(268, e)));
    return e = wg(t), e = e !== null ? Kf(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var ov = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: Z,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && (ti = __REACT_DEVTOOLS_GLOBAL_HOOK__, !ti.isDisabled && ti.supportsFiber)) try {
    qi = ti.inject(ov), Rt = ti;
  } catch {}
  var ti;
  Tu.createRoot = function (e, t) {
    if (!Zf(e)) throw Error(A(299));
    var n = !1,
      l = "",
      a = xm,
      i = Em,
      u = zm;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (a = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (u = t.onRecoverableError)), t = A0(e, 1, !1, null, null, n, l, null, a, i, u, R0), e[Oa] = t.current, hr(e), new Ar(t);
  };
  Tu.hydrateRoot = function (e, t, n) {
    if (!Zf(e)) throw Error(A(299));
    var l = !1,
      a = "",
      i = xm,
      u = Em,
      s = zm,
      r = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onUncaughtError !== void 0 && (i = n.onUncaughtError), n.onCaughtError !== void 0 && (u = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (r = n.formState)), t = A0(e, 1, !0, t, n ?? null, l, a, r, i, u, s, R0), t.context = _0(null), n = t.current, l = Ot(), l = Os(l), a = ll(l), a.callback = null, al(n, a, l), n = l, t.current.lanes = n, wi(t, n), pn(t), e[Oa] = t.current, hr(e), new Du(t);
  };
  Tu.version = "19.2.5";
});
const k0 = on((bv, N0) => {
  "use strict";

  function O0() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(O0);
    } catch (e) {
      console.error(e);
    }
  }
  O0(), N0.exports = M0();
});
const Ge = import.meta.env.VITE_SUPABASE_URL || "https://zbavzvcnmlwbsepfsnbi.supabase.co";
const j = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiYXZ6dmNubWx3YnNlcGZzbmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNzE1MzEsImV4cCI6MjA5Mjk0NzUzMX0.yn8SfqytABe0DxjMGgJMK-ZFo3yrDDbn4Lx-b-uGz0I";
let activeSessionToken = null;
const ee = Ge.includes("VOTRE");
const Sg = "692312814786-4mrf2rt3us6kkrhqdai4624puhisrog2.apps.googleusercontent.com";
const ju = (e, t) => {
  let n = ["R\xE9f\xE9rence", "Date", "Heure", "Patient", "Email", "T\xE9l\xE9phone", "Prestation", "Dur\xE9e", "Statut", "Notes", "Documents", "R\xE9current"],
    l = e.map(r => [r.id, Ke(r.rdv_date), r.slot, r.patient_name, r.patient_email, r.patient_tel, r.service_title, r.service_dur, r.status, (r.notes || "").replace(/,/g, ";"), (r.docs || []).join("|"), r.recurring ? "Oui" : "Non"]),
    a = [n, ...l].map(r => r.map(v => `"${v || ""}"`).join(",")).join(`
`),
    i = new Blob(["\uFEFF" + a], {
      type: "text/csv;charset=utf-8"
    }),
    u = URL.createObjectURL(i),
    s = document.createElement("a");
  s.href = u, s.download = t, s.click(), URL.revokeObjectURL(u);
};
const xg = "https://www.googleapis.com/auth/calendar.events";
const Eg = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
const yn = {
  conseil: 60,
  suivi: 45
};
const jn = async (e, t, n) => {
  if (!e || e === "\u2014") return !1;
  try {
    let l = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: e,
        subject: t,
        htmlContent: n
      })
    });
    if (!l.ok) {
      let a = await l.text();
      console.error("Email proxy error:", a);
    }
    return l.ok;
  } catch (l) {
    return console.error("sendEmail error:", l), !1;
  }
};
const Ji = (e, t) => {
  let n = t === "48h",
    l = e.patient_name?.split(" ")[0] || "",
    loc = e.location && e.location.trim() ? e.location.trim() : "9 Rue du Champ Pile, 10320 Bouilly";
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
  <div style="background:linear-gradient(135deg,#003891,#1565C0);padding:28px;text-align:center">
    <div style="font-size:28px">\u2697\uFE0F</div>
    <div style="font-size:20px;color:#fff;font-weight:700;margin-top:6px">VITASCIENZELAB</div>
    <div style="font-size:11px;color:rgba(255,255,255,.7)">Herboristerie Champenoise \xB7 Bouilly (Aube)</div>
  </div>
  <div style="padding:28px">
    <h2 style="font-size:18px;color:#1A237E;margin:0 0 12px">${n ? "\u23F0 Rappel \u2014 Votre s\xE9ance est dans 48h" : "\u2705 Votre s\xE9ance est confirm\xE9e"}</h2>
    <p style="color:#546E7A;font-size:13px;line-height:1.7;margin-bottom:16px">
      Bonjour <strong>${l}</strong>,<br>
      ${n ? "Nous vous rappelons votre prochaine s\xE9ance de bien-\xEAtre." : "Votre s\xE9ance a bien \xE9t\xE9 enregistr\xE9e."}
    </p>
    <div style="background:#E8F0FE;border-radius:12px;padding:18px;margin-bottom:16px;font-size:13px">
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(21,101,192,.1)"><span style="color:#78909C">\u{1F9EC} Prestation</span><strong style="color:#1A237E">${e.service_title}</strong></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(21,101,192,.1)"><span style="color:#78909C">\u{1F4C5} Date</span><strong style="color:#1A237E">${vt(e.rdv_date)}</strong></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(21,101,192,.1)"><span style="color:#78909C">\u{1F550} Heure</span><strong style="color:#1A237E">${e.slot}</strong></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0"><span style="color:#78909C">\u{1F4CD} Lieu</span><strong style="color:#1A237E">${loc}</strong></div>
    </div>
    <div style="background:#FFF8E1;border-radius:10px;padding:12px 14px;margin-bottom:12px;font-size:12px;color:#E65100;line-height:1.6">
      <strong>\u{1F4CE} \xC0 apporter :</strong> Pensez \xE0 ramener tout document utile (bilan sanguin, ordonnance\u2026). Non obligatoire mais tr\xE8s pr\xE9cieux.
    </div>
    <div style="margin:20px 0;text-align:center;">
      <a href="https://vitascienzelab.vercel.app" style="background:#1565C0;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;font-size:13px;display:inline-block;">🌐 Accéder à VitaScienzeLab</a>
    </div>
    ${n ? `<div style="background:#FCE4EC;border-radius:10px;padding:12px 14px;font-size:12px;color:#880E4F;line-height:1.6">
      \u26A0\uFE0F En cas d'emp\xEAchement, merci d'annuler au moins 24h \xE0 l'avance \xE0 contact@herboristeriechampenoise.com
    </div>` : ""}
    <p style="font-size:10px;color:#90A4AE;line-height:1.6;margin-top:20px;border-top:1px solid #ECEFF1;padding-top:14px">
      Les s\xE9ances de VITASCIENZELAB rel\xE8vent du bien-\xEAtre et ne constituent pas un acte m\xE9dical. SIRET : 841 057 730 00019
    </p>
  </div>
</div></body></html>`;
};
const Yu = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }
  button { transition: all .15s; cursor: pointer; }
  button:hover:not(:disabled) { filter: brightness(1.06); transform: translateY(-1px); }
  button:disabled { opacity: .5; cursor: not-allowed; }
  input, textarea, select { font-family: 'DM Sans', sans-serif; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse-glow {
    0% { transform: scale(0.95); opacity: 0.6; box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7); }
    70% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 0 5px rgba(255, 82, 82, 0); }
    100% { transform: scale(0.95); opacity: 0.6; box-shadow: 0 0 0 0 rgba(255, 82, 82, 0); }
  }
`;
const q = "#1565C0";
const z = "#003891";
const V = "#E8F0FE";
const zg = "herboristeriechampenoise@gmail.com";
const ye = {
  name: "VITASCIENZELAB",
  sub: "Herboristerie Champenoise",
  owner: "Alexis BERTHAUX-MALARMEY",
  role: "Sp\xE9cialiste en Bien-\xEAtre & Conseil en Compl\xE9ments Alimentaires",
  addr: "9 Rue du Champ Pile, 10320 Bouilly (Aube)",
  email: "contact@herboristeriechampenoise.com",
  siret: "841 057 730 00019",
  siren: "841 057 730",
  naf: "1089Z",
  tva: "FR84841057730"
};
const $l = [{
  id: "conseil",
  icon: "\u{1F9EC}",
  title: "S\xE9ance de Conseil en Compl\xE9ments",
  sub: "Sans engagement \xB7 Aucun achat obligatoire",
  dur: "60 min",
  desc: "\xC9change personnalis\xE9 sur vos habitudes de vie pour vous orienter vers une s\xE9lection de compl\xE9ments alimentaires et de plantes adapt\xE9s \xE0 vos objectifs bien-\xEAtre. S\xE9ance offerte par VITASCIENZELAB."
}, {
  id: "suivi",
  icon: "\u{1F4CB}",
  title: "S\xE9ance de Suivi Bien-\xEAtre",
  sub: "Sans engagement \xB7 Aucun achat obligatoire",
  dur: "45 min",
  desc: "Point d'\xE9tape sur votre programme bien-\xEAtre en cours, ajustement de votre s\xE9lection de compl\xE9ments alimentaires et renouvellement si souhait\xE9. S\xE9ance offerte par VITASCIENZELAB."
}];
const Je = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
const Gu = ["Janvier", "F\xE9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xFBt", "Septembre", "Octobre", "Novembre", "D\xE9cembre"];
const Pr = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const Vu = [{
  k: "objectif_bienetre",
  q: "Quel est votre objectif bien-\xEAtre principal pour cette s\xE9ance ?",
  type: "radio",
  opts: ["Soutenir mon niveau d'\xE9nergie et ma vitalit\xE9 au quotidien", "Accompagner mon \xE9quilibre de poids par une approche nutritionnelle", "Soutenir mon confort digestif", "Renforcer mes d\xE9fenses naturelles de fa\xE7on pr\xE9ventive", "Am\xE9liorer la qualit\xE9 de mon sommeil", "Soutenir ma gestion du stress", "Bilan de mes habitudes nutritionnelles et s\xE9lection de compl\xE9ments adapt\xE9s", "Autre objectif de bien-\xEAtre personnel"]
}];
const Wi = [{
  k: "objectif_bienetre",
  q: "Quel est votre objectif bien-\xEAtre principal pour cette s\xE9ance ?",
  type: "radio",
  opts: ["Soutenir mon niveau d'\xE9nergie et ma vitalit\xE9 au quotidien", "Accompagner mon \xE9quilibre de poids par une approche nutritionnelle", "Soutenir mon confort digestif", "Renforcer mes d\xE9fenses naturelles de fa\xE7on pr\xE9ventive", "Am\xE9liorer la qualit\xE9 de mon sommeil", "Soutenir ma gestion du stress", "Bilan de mes habitudes nutritionnelles et s\xE9lection de compl\xE9ments adapt\xE9s", "Autre objectif de bien-\xEAtre personnel"]
}, {
  k: "mode_alimentaire",
  q: "Comment d\xE9cririez-vous votre mode alimentaire habituel ?",
  type: "radio",
  opts: ["Omnivore vari\xE9 et \xE9quilibr\xE9", "Omnivore avec tendance aux exc\xE8s (sucres, graisses, repas irr\xE9guliers)", "V\xE9g\xE9tarien", "V\xE9g\xE9talien / Vegan", "Alimentation sans gluten", "Alimentation sans lactose", "Autre mode alimentaire sp\xE9cifique"]
}, {
  k: "repas_structure",
  q: "Combien de repas prenez-vous g\xE9n\xE9ralement par jour ?",
  type: "radio",
  opts: ["1 \xE0 2 repas par jour", "3 repas r\xE9guliers", "3 repas et une ou plusieurs collations", "Alimentation fractionn\xE9e ou grignotage fr\xE9quent"]
}, {
  k: "hydratation_eau",
  q: "Quelle est votre consommation d'eau quotidienne habituelle ?",
  type: "radio",
  opts: ["Moins d'1 litre par jour", "Entre 1 et 1,5 litre par jour", "Entre 1,5 et 2 litres par jour", "Plus de 2 litres par jour"]
}, {
  k: "vitalite_quotidienne",
  q: "Comment \xE9valuez-vous votre vitalit\xE9 g\xE9n\xE9rale au quotidien ? (1 = tr\xE8s faible / 5 = excellente)",
  type: "scale"
}, {
  k: "preferences_alimentaires",
  q: "Avez-vous des pr\xE9f\xE9rences ou contraintes alimentaires particuli\xE8res \xE0 nous communiquer ?",
  type: "text",
  ph: "Ex : allergie aux fruits \xE0 coques, v\xE9g\xE9tarien, sans porc, sans alcool\u2026 Ces informations nous aident \xE0 vous proposer des compl\xE9ments alimentaires compatibles avec votre mode de vie."
}, {
  k: "traitements_en_cours",
  q: "Prenez-vous actuellement des m\xE9dicaments ou des compl\xE9ments alimentaires ?",
  type: "text",
  ph: "Cette information est recueillie dans le seul but de v\xE9rifier l'absence d'interactions connues avec les plantes et compl\xE9ments alimentaires que nous proposons. Ex : anticoagulants, antid\xE9presseurs, compl\xE9ments de fer, om\xE9ga-3\u2026 ou 'Aucun'"
}, {
  k: "activite_physique",
  q: "Quelle est votre pratique d'activit\xE9 physique hebdomadaire ?",
  type: "radio",
  opts: ["Tr\xE8s peu ou pas d'activit\xE9 physique", "Activit\xE9 l\xE9g\xE8re (marche, \xE9tirements \u2014 1 \xE0 2h/semaine)", "Activit\xE9 mod\xE9r\xE9e (2 \xE0 3h/semaine)", "Activit\xE9 r\xE9guli\xE8re (3 \xE0 5h/semaine)", "Activit\xE9 intensive (plus de 5h/semaine)"]
}, {
  k: "qualite_sommeil",
  q: "Comment qualifieriez-vous globalement la qualit\xE9 de votre sommeil ?",
  type: "radio",
  opts: ["Tr\xE8s bonne (sommeil r\xE9cup\xE9rateur, 7 \xE0 9h par nuit)", "Correcte avec quelques r\xE9veils nocturnes", "Insuffisante en dur\xE9e (moins de 6h par nuit)", "Perturb\xE9e (endormissement difficile ou r\xE9veils fr\xE9quents)", "Mauvaise de fa\xE7on chronique"]
}, {
  k: "niveau_stress",
  q: "Comment \xE9valuez-vous votre niveau de stress habituel au quotidien ? (1 = tr\xE8s serein / 5 = stress tr\xE8s \xE9lev\xE9)",
  type: "scale"
}, {
  k: "objectifs_complementaires",
  q: "Y a-t-il des informations compl\xE9mentaires sur votre mode de vie ou vos habitudes que vous souhaitez partager pour personnaliser au mieux votre programme de compl\xE9ments alimentaires ?",
  type: "text",
  ph: "Ex : voyages fr\xE9quents, alimentation v\xE9gane depuis peu, pratique du je\xFBne intermittent, grossesse planifi\xE9e, allaitement en cours\u2026 Ces informations nous permettent uniquement d'adapter notre s\xE9lection de produits."
}];
const Ln = () => Math.random().toString(36).slice(2, 9);
const it = e => {
  let t = new Date();
  return t.setDate(t.getDate() + e), t.toISOString().split("T")[0];
};
const ue = {
  users: [{
    id: "u1",
    email: "sophie.martin@email.fr",
    pw: "demo123",
    prenom: "Sophie",
    nom: "Martin",
    tel: "06 11 22 33 44",
    created_at: it(-30)
  }, {
    id: "u2",
    email: "pierre.leblanc@email.fr",
    pw: "demo123",
    prenom: "Pierre",
    nom: "Leblanc",
    tel: "06 55 44 33 22",
    created_at: it(-60)
  }],
  appointments: [{
    id: "RDV001",
    patient_id: "u1",
    patient_name: "Sophie Martin",
    patient_email: "sophie.martin@email.fr",
    patient_tel: "06 11 22 33 44",
    service_id: "conseil",
    service_title: "Rendez-vous Conseil",
    service_icon: "\u{1F9EC}",
    service_dur: "45 min",
    rdv_date: it(1),
    slot: "14:30",
    status: "confirmed",
    notes: "Fatigue chronique depuis 6 mois",
    recurring: !1,
    docs: ["bilan_sanguin_mars2024.pdf"],
    reminder_sent: !1,
    created_at: it(0)
  }, {
    id: "RDV002",
    patient_id: "u1",
    patient_name: "Sophie Martin",
    patient_email: "sophie.martin@email.fr",
    patient_tel: "06 11 22 33 44",
    service_id: "suivi",
    service_title: "Suivi & Renouvellement",
    service_icon: "\u{1F4CB}",
    service_dur: "30 min",
    rdv_date: it(-20),
    slot: "15:00",
    status: "completed",
    notes: "",
    recurring: !1,
    docs: [],
    reminder_sent: !0,
    created_at: it(-25)
  }, {
    id: "RDV003",
    patient_id: "u2",
    patient_name: "Pierre Leblanc",
    patient_email: "pierre.leblanc@email.fr",
    patient_tel: "06 55 44 33 22",
    service_id: "suivi",
    service_title: "R\xE9\xE9quilibrage M\xE9tabolique",
    service_icon: "\u2697\uFE0F",
    service_dur: "60 min",
    rdv_date: it(3),
    slot: "16:00",
    status: "confirmed",
    notes: "Objectif perte de poids",
    recurring: !0,
    docs: [],
    reminder_sent: !1,
    created_at: it(-1)
  }],
  notes: [{
    id: Ln(),
    patient_id: "u1",
    note: "Patiente tr\xE8s motiv\xE9e. Carence en fer suspect\xE9e. Suivi alimentaire rigoureux.",
    created_at: it(-5)
  }, {
    id: Ln(),
    patient_id: "u2",
    note: "Objectif -8kg sur 3 mois. Protocole phytoth\xE9rapie d\xE9marr\xE9.",
    created_at: it(-2)
  }],
  questionnaires: [],
  blocked: []
};
const vt = e => e ? new Date(e + "T12:00:00").toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
}) : "";
const Ke = e => e ? new Date(e + "T12:00:00").toLocaleDateString("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
}) : "";
const ed = () => "RDV" + Date.now().toString().slice(-6);
const Qu = (e, t) => {
  if (!e || !t) return null;
  let [n, l] = t.split(":").map(Number),
    a = new Date(e + "T12:00:00");
  return a.setHours(n, l, 0, 0), Math.round((a - Date.now()) / 36e5);
};
const at = e => {
  let t = Qu(e.rdv_date, e.slot);
  return t !== null && t < 0;
};
const tn = e => {
  let t = Qu(e.rdv_date, e.slot);
  return t > 0 && t <= 50 && !e.reminder_sent && e.status === "confirmed";
};
const Ki = e => ({
  apikey: j,
  Authorization: `Bearer ${e && e !== j ? e : (activeSessionToken || j)}`,
  "Content-Type": "application/json"
});
const Ii = {
  signIn: (e, t) => fetch(`${Ge}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: j,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: e,
      password: t
    })
  }).then(n => n.json()),
  signUp: (e, t, n) => fetch(`${Ge}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: j,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: e,
      password: t,
      data: n
    })
  }).then(l => l.json())
};
const X = {
  get: (e, t, n) => fetch(`${Ge}/rest/v1/${e}?${t || ""}`, {
    headers: Ki(n)
  }).then(l => l.json()),
  post: (e, t, n) => fetch(`${Ge}/rest/v1/${e}`, {
    method: "POST",
    headers: { ...Ki(n), Prefer: "return=minimal" },
    body: JSON.stringify(t)
  }).then(l => l.text().then(text => text ? JSON.parse(text) : {})),
  patch: (e, t, n, l) => fetch(`${Ge}/rest/v1/${e}?id=eq.${t}`, {
    method: "PATCH",
    headers: { ...Ki(l), Prefer: "return=minimal" },
    body: JSON.stringify(n)
  }).then(a => a.text().then(text => text ? JSON.parse(text) : {})),
  del: (e, t, n) => fetch(`${Ge}/rest/v1/${e}?id=eq.${t}`, {
    method: "DELETE",
    headers: Ki(n)
  }).then(l => l.ok)
};
const downloadBase64File = (base64Data, filename) => {
  if (!base64Data) {
    alert("Le fichier est vide ou indisponible.");
    return;
  }
  try {
    let cleanData = String(base64Data).trim();
    if (!cleanData.startsWith("data:")) {
      const a = document.createElement("a");
      a.href = cleanData;
      a.download = filename || "document";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    const parts = cleanData.split(";base64,");
    if (parts.length < 2) {
      const a = document.createElement("a");
      a.href = cleanData;
      a.download = filename || "document";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    const contentType = parts[0].replace("data:", "") || "application/octet-stream";
    let rawBase64 = parts[1].replace(/[\r\n\s]/g, "").replace(/-/g, "+").replace(/_/g, "/");
    while (rawBase64.length % 4 !== 0) {
      rawBase64 += "=";
    }
    const raw = window.atob(rawBase64);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    const blob = new Blob([uInt8Array], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "document";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 2000);
  } catch (err) {
    console.error("Primary base64 download failed, attempting native fetch fallback:", err);
    try {
      fetch(base64Data)
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename || "document";
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 2000);
        })
        .catch(() => {
          const win = window.open();
          if (win) {
            win.document.write(`<iframe src="${base64Data}" frameborder="0" style="border:0; width:100%; height:100%;" allowfullscreen></iframe>`);
          } else {
            window.location.href = base64Data;
          }
        });
    } catch (e) {
      alert("Erreur lors du téléchargement du fichier.");
    }
  }
};
const compressAndReadFile = (file) => {
  return new Promise((resolve, reject) => {
    if (file.size > 15 * 1024 * 1024) {
      reject(new Error(`Le fichier "${file.name}" dépasse la taille maximale autorisée (15 Mo).`));
      return;
    }
    const isImage = file.type.startsWith("image/");
    if (isImage) {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDim = 1600;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
        resolve({
          name: file.name.replace(/\.[^/.]+$/, ".jpg"),
          type: "image/jpeg",
          data: compressedDataUrl
        });
      };
      img.onerror = () => {
        const readerRaw = new FileReader();
        readerRaw.onload = (ev) => resolve({ name: file.name, type: file.type, data: ev.target.result });
        readerRaw.onerror = reject;
        readerRaw.readAsDataURL(file);
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ name: file.name, type: file.type, data: e.target.result });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }
  });
};
function Ag() {
  return _jsx("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: 40
    },
    children: _jsx("div", {
      style: {
        width: 30,
        height: 30,
        border: "3px solid #E3F0FF",
        borderTop: `3px solid ${q}`,
        borderRadius: "50%",
        animation: "spin .8s linear infinite"
      }
    })
  });
}
function We({
  color: e,
  bg: t,
  children: n
}) {
  return _jsx("span", {
    style: {
      background: t || V,
      color: e || q,
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      whiteSpace: "nowrap"
    },
    children: n
  });
}
function ze({
  children: e,
  style: t = {},
  ...n
}) {
  return _jsx("button", {
    style: {
      background: `linear-gradient(135deg,${q},${z})`,
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "12px 24px",
      fontSize: 14,
      fontWeight: 600,
      ...t
    },
    ...n,
    children: e
  });
}
function ot({
  children: e,
  style: t = {},
  ...n
}) {
  return _jsx("button", {
    style: {
      background: "#fff",
      color: q,
      border: `2px solid ${V}`,
      borderRadius: 12,
      padding: "12px 18px",
      fontSize: 14,
      fontWeight: 600,
      ...t
    },
    ...n,
    children: e
  });
}
function Ie({
  label: e,
  error: t,
  children: n
}) {
  return _jsxs("div", {
    style: {
      marginBottom: 14
    },
    children: [e && _jsx("label", {
      style: {
        display: "block",
        fontSize: 12,
        fontWeight: 600,
        color: z,
        marginBottom: 6
      },
      children: e
    }), n, t && _jsx("span", {
      style: {
        fontSize: 11,
        color: "#E53935",
        display: "block",
        marginTop: 4
      },
      children: t
    })]
  });
}
function ut({
  error: e,
  ...t
}) {
  return _jsx("input", {
    style: {
      width: "100%",
      border: `2px solid ${e ? "#E53935" : V}`,
      borderRadius: 10,
      padding: "11px 13px",
      fontSize: 13,
      color: z,
      outline: "none",
      background: "#FAFCFF"
    },
    ...t
  });
}
function _g({
  selected: e,
  onSelect: t,
  blocked: n = []
}) {
  let l = new Date(),
    [a, i] = useState(l.getFullYear()),
    [u, s] = useState(l.getMonth()),
    r = new Date(a, u + 1, 0).getDate(),
    v = new Date(a, u, 1).getDay() - 1;
  v < 0 && (v = 6);
  let S = () => {
      u === 0 ? (s(11), i(f => f - 1)) : s(f => f - 1);
    },
    E = () => {
      u === 11 ? (s(0), i(f => f + 1)) : s(f => f + 1);
    },
    g = f => {
      let m = `${a}-${String(u + 1).padStart(2, "0")}-${String(f).padStart(2, "0")}`,
        d = `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`,
        h = new Date(a, u, f, 12, 0, 0),
        w = n.some(B => B.blocked_date === m && (!B.slot || B.slot === ""));
      return m <= d || h.getDay() === 0 || w;
    },
    p = f => {
      if (!e) return !1;
      let m = `${a}-${String(u + 1).padStart(2, "0")}-${String(f).padStart(2, "0")}`;
      return e === m;
    },
    R = f => {
      let m = `${a}-${String(u + 1).padStart(2, "0")}-${String(f).padStart(2, "0")}`,
        d = `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`;
      return m === d;
    },
    k = f => `${a}-${String(u + 1).padStart(2, "0")}-${String(f).padStart(2, "0")}`,
    Q = [...Array(v).fill(null), ...Array.from({
      length: r
    }, (f, m) => m + 1)];
  return _jsxs("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 2px 20px rgba(21,101,192,.08)"
    },
    children: [_jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16
      },
      children: [_jsx("button", {
        onClick: S,
        style: {
          background: V,
          border: "none",
          borderRadius: 8,
          width: 32,
          height: 32,
          fontSize: 18,
          color: q
        },
        children: "\u2039"
      }), _jsxs("span", {
        style: {
          fontFamily: "'Playfair Display',serif",
          fontSize: 16,
          fontWeight: 700,
          color: q
        },
        children: [Gu[u], " ", a]
      }), _jsx("button", {
        onClick: E,
        style: {
          background: V,
          border: "none",
          borderRadius: 8,
          width: 32,
          height: 32,
          fontSize: 18,
          color: q
        },
        children: "\u203A"
      })]
    }), _jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: 3,
        marginBottom: 6
      },
      children: Pr.map(f => _jsx("div", {
        style: {
          textAlign: "center",
          fontSize: 10,
          fontWeight: 700,
          color: "#90A4AE",
          padding: "4px 0"
        },
        children: f
      }, f))
    }), _jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: 3
      },
      children: Q.map((f, m) => f ? _jsx("button", {
        disabled: g(f),
        onClick: () => t(k(f)),
        style: {
          width: "100%",
          aspectRatio: "1",
          border: "none",
          borderRadius: 8,
          fontSize: 13,
          background: p(f) ? q : R(f) ? V : "transparent",
          color: p(f) ? "#fff" : g(f) ? "#CFD8DC" : z,
          fontWeight: p(f) || R(f) ? 700 : 400,
          outline: R(f) && !p(f) ? `2px solid ${q}` : "none"
        },
        children: f
      }, m) : _jsx("div", {}, m))
    })]
  });
}
function td({
  onClose: e
}) {
  let t = [{
    t: "Identit\xE9 de l'entreprise",
    c: `Raison sociale : VITASCIENZELAB \u2013 Herboristerie Champenoise
Propri\xE9taire : ${ye.owner}
Statut : Entreprise individuelle \u2013 Affaire personnelle commer\xE7ant
SIRET : ${ye.siret} | SIREN : ${ye.siren} | NAF : ${ye.naf}
TVA : ${ye.tva}
Adresse : ${ye.addr}`
  }, {
    t: "Nature des prestations & cadre l\xE9gal",
    c: `VITASCIENZELAB est une entreprise de fabrication et de vente de compl\xE9ments alimentaires (SIRET ${ye.siret} \u2014 NAF ${ye.naf}). Les s\xE9ances propos\xE9es constituent exclusivement des actes de conseil commercial relatifs \xE0 la s\xE9lection de compl\xE9ments alimentaires et \xE0 l'accompagnement du mode de vie, dans le cadre d\xE9fini par la Directive europ\xE9enne 2002/46/CE et le D\xE9cret fran\xE7ais n\xB02006-352 relatif aux compl\xE9ments alimentaires.

Ces s\xE9ances sont r\xE9alis\xE9es par ${ye.owner}, sp\xE9cialiste en bien-\xEAtre et biochimie alimentaire, dans le cadre d'une activit\xE9 de conseil en compl\xE9ments alimentaires et phytoth\xE9rapie. Elles n'entrent \xE0 aucun titre dans le champ de l'exercice de la m\xE9decine (art. L4111-1 CSP), de la pharmacie (art. L4211-1 CSP), de la biologie m\xE9dicale (art. L6211-1 CSP), ni d'aucune profession de sant\xE9 r\xE9glement\xE9e.

Aucune prestation ne constitue un acte m\xE9dical, un diagnostic, une prescription m\xE9dicale, une analyse biologique, ni une pratique th\xE9rapeutique r\xE9glement\xE9e.`
  }, {
    t: "Absence de diagnostic \u2014 Non-substitution \xE0 l'avis m\xE9dical",
    c: `Les conseils d\xE9livr\xE9s lors des s\xE9ances ont une vocation exclusivement pr\xE9ventive et de soutien au bien-\xEAtre g\xE9n\xE9ral. Ils ne constituent en aucun cas :
\u2022 Un diagnostic m\xE9dical ou biologique
\u2022 Une prescription m\xE9dicamenteuse
\u2022 Un acte de t\xE9l\xE9m\xE9decine (art. L6316-1 CSP)
\u2022 Un suivi th\xE9rapeutique

En pr\xE9sence de tout sympt\xF4me persistant, pathologie av\xE9r\xE9e ou suspect\xE9e, le client est express\xE9ment invit\xE9 \xE0 consulter son m\xE9decin traitant ou un sp\xE9cialiste.`
  }, {
    t: "Documents et informations recueillis",
    c: `Les informations recueillies (liste de traitements, compl\xE9ments en cours, habitudes de vie) sont collect\xE9es dans l'unique but de pr\xE9venir d'\xE9ventuelles interactions connues entre les plantes m\xE9dicinales, les nutraceutiques propos\xE9s et les m\xE9dicaments en cours.

Ces informations ne font l'objet d'aucune interpr\xE9tation m\xE9dicale, biologique ou diagnostique. Elles sont utilis\xE9es exclusivement pour adapter la s\xE9lection de compl\xE9ments alimentaires propos\xE9e et trait\xE9es de fa\xE7on strictement confidentielle (RGPD).`
  }, {
    t: "Protection des donn\xE9es personnelles (RGPD \u2014 UE 2016/679)",
    c: `Responsable de traitement : ${ye.owner} \u2014 ${ye.name}
Finalit\xE9 : gestion des s\xE9ances de conseil en compl\xE9ments alimentaires
Dur\xE9e de conservation : 3 ans \xE0 compter du dernier contact
Aucune cession \xE0 des tiers
H\xE9bergement : Supabase (conforme RGPD, Union Europ\xE9enne)
Droits d'acc\xE8s, rectification, suppression : ${ye.email}
Droit de r\xE9clamation aupr\xE8s de la CNIL : www.cnil.fr`
  }, {
    t: "Conformit\xE9 r\xE9glementaire",
    c: `VITASCIENZELAB op\xE8re dans le strict respect du cadre l\xE9gal applicable :
\u2022 Directive europ\xE9enne 2002/46/CE \u2014 compl\xE9ments alimentaires
\u2022 D\xE9cret fran\xE7ais n\xB02006-352 du 20 mars 2006 \u2014 compl\xE9ments alimentaires
\u2022 R\xE8glement CE n\xB01924/2006 \u2014 all\xE9gations nutritionnelles et de sant\xE9
\u2022 Articles L4111-1, L4161-1, L4211-1 et L6211-1 du Code de la sant\xE9 publique
\u2022 Code de la consommation \u2014 conseil commercial en nutrition`
  }, {
    t: "Protection des donn\xE9es (RGPD)",
    c: `\u2022 Donn\xE9es utilis\xE9es uniquement pour la gestion des s\xE9ances de bien-\xEAtre
\u2022 Jamais c\xE9d\xE9es \xE0 des tiers
\u2022 Conservation : 3 ans \xE0 compter du dernier contact
\u2022 Droits (acc\xE8s, rectification, suppression) : ${ye.email}
\u2022 H\xE9bergement : Supabase (conforme RGPD, Union Europ\xE9enne)`
  }];
  return _jsx("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.55)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: e,
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        maxWidth: 660,
        width: "100%",
        maxHeight: "88vh",
        overflowY: "auto",
        padding: 36
      },
      onClick: n => n.stopPropagation(),
      children: [_jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24
        },
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            color: z
          },
          children: "Mentions L\xE9gales & Cadre R\xE9glementaire"
        }), _jsx("button", {
          onClick: e,
          style: {
            background: "none",
            border: "none",
            fontSize: 24,
            color: "#90A4AE",
            cursor: "pointer"
          },
          children: "\xD7"
        })]
      }), t.map(({
        t: n,
        c: l
      }) => _jsxs("div", {
        style: {
          marginBottom: 20
        },
        children: [_jsx("h3", {
          style: {
            fontSize: 11,
            fontWeight: 700,
            color: q,
            marginBottom: 8,
            letterSpacing: 0.8,
            textTransform: "uppercase"
          },
          children: n
        }), _jsx("p", {
          style: {
            fontSize: 13,
            color: "#455A64",
            lineHeight: 1.7,
            whiteSpace: "pre-line"
          },
          children: l
        })]
      }, n)), _jsx("div", {
        style: {
          padding: "14px 18px",
          background: "#E8F5E9",
          borderRadius: 12,
          borderLeft: "4px solid #43A047",
          marginBottom: 20
        },
        children: _jsxs("p", {
          style: {
            fontSize: 12,
            color: "#2E7D32",
            lineHeight: 1.6,
            margin: 0
          },
          children: [_jsx("strong", {
            children: "\u2696\uFE0F Conformit\xE9 :"
          }), " VITASCIENZELAB op\xE8re dans le strict respect du Code de la sant\xE9 publique fran\xE7ais, de la r\xE9glementation sur les compl\xE9ments alimentaires (Directive 2002/46/CE) et de la r\xE9glementation relative aux activit\xE9s de conseil en bien-\xEAtre."]
        })
      }), _jsx(ze, {
        onClick: e,
        style: {
          width: "100%"
        },
        children: "Fermer"
      })]
    })
  });
}
function Cg({
  rdv: e,
  type: t,
  onClose: n
}) {
  let l = t === "48h";
  return _jsx("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.55)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: n,
    children: _jsxs("div", {
      style: {
        background: "#F8FAFF",
        borderRadius: 20,
        maxWidth: 560,
        width: "100%",
        maxHeight: "88vh",
        overflowY: "auto"
      },
      onClick: a => a.stopPropagation(),
      children: [_jsxs("div", {
        style: {
          background: `linear-gradient(135deg,${z},${q})`,
          borderRadius: "20px 20px 0 0",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [_jsxs("div", {
          children: [_jsx("div", {
            style: {
              color: "rgba(255,255,255,.7)",
              fontSize: 11
            },
            children: l ? "\u23F0 Rappel 48h avant la s\xE9ance" : "\u2705 Confirmation de s\xE9ance"
          }), _jsxs("div", {
            style: {
              color: "#fff",
              fontSize: 13,
              fontWeight: 600
            },
            children: ["\xC0 : ", e.patient_email]
          })]
        }), _jsx("button", {
          onClick: n,
          style: {
            background: "rgba(255,255,255,.2)",
            border: "none",
            color: "#fff",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12
          },
          children: "Fermer"
        })]
      }), _jsx("div", {
        style: {
          padding: 24
        },
        children: _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,.08)"
          },
          children: [_jsxs("div", {
            style: {
              background: `linear-gradient(135deg,${z},${q})`,
              padding: 28,
              textAlign: "center"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 28,
                marginBottom: 6
              },
              children: "\u2697\uFE0F"
            }), _jsx("div", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 20,
                color: "#fff",
                fontWeight: 700
              },
              children: "VITASCIENZELAB"
            }), _jsx("div", {
              style: {
                fontSize: 10,
                color: "rgba(255,255,255,.7)",
                letterSpacing: 1
              },
              children: "Herboristerie Champenoise \xB7 Bouilly (Aube)"
            })]
          }), _jsxs("div", {
            style: {
              padding: 28
            },
            children: [_jsx("h2", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 18,
                color: z,
                marginBottom: 12
              },
              children: l ? "\u23F0 Rappel \u2014 Votre s\xE9ance est dans 48h" : "\u2705 Votre s\xE9ance est confirm\xE9e"
            }), _jsxs("p", {
              style: {
                color: "#546E7A",
                fontSize: 13,
                lineHeight: 1.7,
                marginBottom: 16
              },
              children: ["Bonjour ", _jsx("strong", {
                children: e.patient_name?.split(" ")[0]
              }), ",", _jsx("br", {}), l ? "Nous vous rappelons votre prochaine s\xE9ance de bien-\xEAtre." : "Votre s\xE9ance a bien \xE9t\xE9 enregistr\xE9e. Voici votre r\xE9capitulatif."]
            }), _jsx("div", {
              style: {
                background: V,
                borderRadius: 12,
                padding: 18,
                marginBottom: 16
              },
              children: [["\u{1F9EC} Prestation", e.service_title], ["\u23F1 Dur\xE9e", e.service_dur], ["\u{1F4C5} Date", vt(e.rdv_date)], ["\u{1F550} Heure", e.slot], ["\u{1F4CD} Lieu", ye.addr]].map(([a, i]) => _jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px 0",
                  borderBottom: "1px solid rgba(21,101,192,.1)",
                  fontSize: 12
                },
                children: [_jsx("span", {
                  style: {
                    color: "#78909C"
                  },
                  children: a
                }), _jsx("span", {
                  style: {
                    fontWeight: 700,
                    color: z
                  },
                  children: i
                })]
              }, a))
            }), _jsx("div", {
              style: {
                background: "#FFF8E1",
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 12
              },
              children: _jsxs("p", {
                style: {
                  fontSize: 12,
                  color: "#E65100",
                  lineHeight: 1.6,
                  margin: 0
                },
                children: [_jsx("strong", {
                  children: "\u{1F4CE} \xC0 apporter :"
                }), " Si vous en disposez, n'oubliez pas de ramener tout document utile \xE0 votre dossier bien-\xEAtre (bilan sanguin, ordonnance\u2026). Non obligatoire mais tr\xE8s pr\xE9cieux."]
              })
            }), l && _jsx("div", {
              style: {
                background: "#FCE4EC",
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 12
              },
              children: _jsxs("p", {
                style: {
                  fontSize: 12,
                  color: "#880E4F",
                  lineHeight: 1.6,
                  margin: 0
                },
                children: ["\u26A0\uFE0F En cas d'emp\xEAchement, merci d'annuler au moins ", _jsx("strong", {
                  children: "24h \xE0 l'avance"
                }), " \xE0 ", ye.email]
              })
            }), _jsxs("p", {
              style: {
                fontSize: 10,
                color: "#90A4AE",
                lineHeight: 1.6,
                marginTop: 16,
                borderTop: "1px solid #ECEFF1",
                paddingTop: 14
              },
              children: ["Les s\xE9ances de VITASCIENZELAB rel\xE8vent exclusivement du bien-\xEAtre et ne constituent pas un acte m\xE9dical. Elles ne se substituent pas \xE0 l'avis d'un m\xE9decin. SIRET : ", ye.siret]
            })]
          })]
        })
      })]
    })
  });
}
function Dg({
  onAuth: e,
  onBack: t
}) {
  let [n, l] = useState("login"),
    [a, i] = useState({
      email: "",
      pw: "",
      prenom: "",
      nom: "",
      tel: ""
    }),
    [u, s] = useState(""),
    [r, v] = useState(""),
    [S, E] = useState(""),
    [g, p] = useState(""),
    [R, k] = useState(!1),
    Q = d => h => i(w => ({
      ...w,
      [d]: h.target.value
    })),
    f = async () => {
      if (!a.email || !a.pw) {
        p("Email et mot de passe requis");
        return;
      }
      k(!0), p("");
      try {
        if (ee) {
          let d = ue.users.find(h => h.email === a.email && h.pw === a.pw);
          if (!d) {
            p("Email ou mot de passe incorrect"), k(!1);
            return;
          }
          e({
            id: d.id,
            email: d.email,
            prenom: d.prenom,
            nom: d.nom,
            token: "demo_" + d.id
          });
        } else {
          let d = await Ii.signIn(a.email, a.pw),
            h = d.error?.message || d.msg || "",
            w = d.error_code || d.error?.status || "";
          if (h || w) {
            h.includes("Invalid") || w.includes("invalid_credentials") ? p("Email ou mot de passe incorrect.") : h.includes("confirmed") || w.includes("email_not_confirmed") ? p("Confirmez votre email avant de vous connecter.") : p("Erreur : " + (h || w)), k(!1);
            return;
          }
          let B = d.session?.access_token || d.access_token,
            M = d.user || d.session?.user;
          if (!B || !M) {
            p("Email ou mot de passe incorrect."), k(!1);
            return;
          }
          let Y = M?.user_metadata || {},
            O = [],
            L = [];
          try {
            let de = await X.get("profiles", `id=eq.${M.id}`, B);
            Array.isArray(de) && de[0] && (O = de[0].client_files || [], L = de[0].guests || []);
          } catch {}
          e({
            id: M.id,
            email: M.email,
            prenom: Y.prenom || "",
            nom: Y.nom || "",
            tel: Y.tel || "",
            token: B,
            client_files: O,
            guests: L
          });
        }
      } catch (d) {
        p("Erreur : " + d.message);
      }
      k(!1);
    },
    m = async () => {
      if (!a.prenom || !a.nom || !a.email || !a.pw) {
        p("Tous les champs marqu\xE9s * sont requis");
        return;
      }
      if (a.pw.length < 6) {
        p("Mot de passe : 6 caract\xE8res minimum");
        return;
      }
      if (!a.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        p("Adresse email invalide");
        return;
      }
      k(!0), p("");
      try {
        if (ee) {
          if (ue.users.find(h => h.email === a.email)) {
            p("Email d\xE9j\xE0 utilis\xE9"), k(!1);
            return;
          }
          let d = {
            id: Ln(),
            email: a.email,
            pw: a.pw,
            prenom: a.prenom,
            nom: a.nom,
            tel: a.tel,
            created_at: it(0)
          };
          ue.users.push(d), e({
            id: d.id,
            email: d.email,
            prenom: d.prenom,
            nom: d.nom,
            token: "demo_" + d.id
          });
        } else {
          let d = S && r && u ? `${S}-${r}-${u}` : null,
            h = await Ii.signUp(a.email, a.pw, {
              prenom: a.prenom,
              nom: a.nom,
              tel: a.tel,
              dob: d
            }),
            w = h.error?.message || h.msg || "",
            B = h.error_code || "";
          if (w || B) {
            w.includes("already registered") || B.includes("user_already_exists") ? p("Cet email est d\xE9j\xE0 utilis\xE9. Connectez-vous.") : w.includes("password") || B.includes("weak_password") ? p("Mot de passe trop simple. Minimum 6 caract\xE8res.") : p("Erreur : " + (w || B)), k(!1);
            return;
          }
          let M = h.session || h,
            Y = h.user || M?.user,
            O = h.session?.access_token || h.access_token || M?.access_token;
          if (!O) {
            l("confirm"), k(!1);
            return;
          }
          let L = Y?.user_metadata || {};
          e({
            id: Y.id,
            email: Y.email,
            prenom: L.prenom || a.prenom,
            nom: L.nom || a.nom,
            token: O
          });
        }
      } catch {
        p("Erreur r\xE9seau. V\xE9rifiez votre connexion.");
      }
      k(!1);
    };
  return n === "confirm" ? _jsx("div", {
    style: {
      maxWidth: 420,
      margin: "40px auto",
      padding: "0 20px 60px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 24,
        padding: "36px 32px",
        boxShadow: "0 8px 40px rgba(21,101,192,.12)",
        textAlign: "center"
      },
      children: [_jsx("div", {
        style: {
          fontSize: 48,
          marginBottom: 16
        },
        children: "\u{1F4E7}"
      }), _jsx("h3", {
        style: {
          fontFamily: "'Playfair Display',serif",
          fontSize: 18,
          color: z,
          marginBottom: 10
        },
        children: "V\xE9rifiez vos emails !"
      }), _jsxs("p", {
        style: {
          fontSize: 13,
          color: "#546E7A",
          lineHeight: 1.7,
          marginBottom: 20
        },
        children: ["Un lien de confirmation a \xE9t\xE9 envoy\xE9 \xE0 ", _jsx("strong", {
          children: a.email
        }), ".", _jsx("br", {}), "Cliquez sur le lien dans l'email, puis revenez vous connecter."]
      }), _jsx(ze, {
        onClick: () => {
          l("login"), p("");
        },
        style: {
          width: "100%"
        },
        children: "\u2192 Se connecter"
      })]
    })
  }) : _jsx("div", {
    style: {
      maxWidth: 420,
      margin: "40px auto",
      padding: "0 20px 60px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 24,
        padding: "36px 32px",
        boxShadow: "0 8px 40px rgba(21,101,192,.12)"
      },
      children: [_jsxs("div", {
        style: {
          textAlign: "center",
          marginBottom: 24
        },
        children: [_jsx("div", {
          style: {
            fontSize: 36,
            marginBottom: 8
          },
          children: "\u2697\uFE0F"
        }), _jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 6
          },
          children: "Espace Client"
        }), _jsxs("p", {
          style: {
            color: "#78909C",
            fontSize: 12
          },
          children: [ye.name, " \u2013 ", ye.sub]
        })]
      }), _jsx("div", {
        style: {
          display: "flex",
          background: "#F0F4FF",
          borderRadius: 12,
          padding: 4,
          marginBottom: 24
        },
        children: [["login", "Se connecter"], ["register", "Cr\xE9er un compte"]].map(([d, h]) => _jsx("button", {
          onClick: () => {
            l(d), p("");
          },
          style: {
            flex: 1,
            padding: "9px",
            border: "none",
            borderRadius: 9,
            background: n === d ? "#fff" : "transparent",
            color: n === d ? q : "#90A4AE",
            fontWeight: n === d ? 700 : 500,
            fontSize: 13,
            boxShadow: n === d ? "0 2px 8px rgba(0,0,0,.08)" : "none"
          },
          children: h
        }, d))
      }), ee && n === "login" && _jsx("div", {
        style: {
          background: "#E8F5E9",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 16,
          fontSize: 12,
          color: "#2E7D32"
        },
        children: "\u{1F3AD} D\xE9mo : sophie.martin@email.fr / demo123"
      }), n === "register" && _jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        },
        children: [_jsx(Ie, {
          label: "Pr\xE9nom *",
          children: _jsx(ut, {
            value: a.prenom,
            onChange: Q("prenom"),
            placeholder: "Marie"
          })
        }), _jsx(Ie, {
          label: "Nom *",
          children: _jsx(ut, {
            value: a.nom,
            onChange: Q("nom"),
            placeholder: "Dupont"
          })
        })]
      }), n === "register" && _jsx(Ie, {
        label: "Date de naissance *",
        children: _jsxs("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [_jsxs("select", {
            value: u,
            onChange: d => s(d.target.value),
            style: {
              flex: 1,
              border: `1px solid ${V}`,
              borderRadius: 8,
              padding: "9px 8px",
              fontSize: 13,
              color: z,
              background: "#fff",
              outline: "none"
            },
            children: [_jsx("option", {
              value: "",
              children: "Jour"
            }), Array.from({
              length: 31
            }, (d, h) => h + 1).map(d => _jsx("option", {
              value: String(d).padStart(2, "0"),
              children: d
            }, d))]
          }), _jsxs("select", {
            value: r,
            onChange: d => v(d.target.value),
            style: {
              flex: 1.5,
              border: `1px solid ${V}`,
              borderRadius: 8,
              padding: "9px 8px",
              fontSize: 13,
              color: z,
              background: "#fff",
              outline: "none"
            },
            children: [_jsx("option", {
              value: "",
              children: "Mois"
            }), ["Janvier", "F\xE9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xFBt", "Septembre", "Octobre", "Novembre", "D\xE9cembre"].map((d, h) => _jsx("option", {
              value: String(h + 1).padStart(2, "0"),
              children: d
            }, h))]
          }), _jsxs("select", {
            value: S,
            onChange: d => E(d.target.value),
            style: {
              flex: 1.5,
              border: `1px solid ${V}`,
              borderRadius: 8,
              padding: "9px 8px",
              fontSize: 13,
              color: z,
              background: "#fff",
              outline: "none"
            },
            children: [_jsx("option", {
              value: "",
              children: "Ann\xE9e"
            }), Array.from({
              length: 96
            }, (d, h) => 2025 - h).map(d => _jsx("option", {
              value: String(d),
              children: d
            }, d))]
          })]
        })
      }), n === "register" && _jsx(Ie, {
        label: "T\xE9l\xE9phone",
        children: _jsx(ut, {
          value: a.tel,
          onChange: Q("tel"),
          placeholder: "06 12 34 56 78"
        })
      }), _jsx(Ie, {
        label: "Email *",
        children: _jsx(ut, {
          type: "email",
          value: a.email,
          onChange: Q("email"),
          placeholder: "marie@email.com"
        })
      }), _jsx(Ie, {
        label: n === "register" ? "Mot de passe * (6 car. min.)" : "Mot de passe *",
        children: _jsx(ut, {
          type: "password",
          value: a.pw,
          onChange: Q("pw"),
          placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
        })
      }), g && _jsx("p", {
        style: {
          color: "#E53935",
          fontSize: 12,
          textAlign: "center",
          marginBottom: 12
        },
        children: g
      }), _jsx(ze, {
        onClick: n === "login" ? f : m,
        disabled: R,
        style: {
          width: "100%",
          marginBottom: 10
        },
        children: R ? "Chargement\u2026" : n === "login" ? "\u2192 Se connecter" : "\u2192 Cr\xE9er mon compte"
      }), n === "login" && _jsx("button", {
        onClick: async () => {
          if (!a.email) {
            p("Entrez votre email d'abord");
            return;
          }
          if (ee) {
            p("Fonction disponible en production uniquement");
            return;
          }
          (await fetch(`${Ge}/auth/v1/recover`, {
            method: "POST",
            headers: {
              apikey: j,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: a.email
            })
          })).ok ? p("\u2705 Email de r\xE9initialisation envoy\xE9 !") : p("Erreur lors de l'envoi.");
        },
        style: {
          background: "none",
          border: "none",
          color: "#90A4AE",
          fontSize: 12,
          cursor: "pointer",
          textDecoration: "underline",
          width: "100%",
          marginBottom: 8,
          padding: "4px 0"
        },
        children: "Mot de passe oubli\xE9 ?"
      }), _jsx(ot, {
        onClick: t,
        style: {
          width: "100%"
        },
        children: "\u2190 Retour"
      })]
    })
  });
}
function Tg({
  user: e,
  onUpdateUser: t,
  onBook: n,
  onLogout: l
}) {
  let [a, i] = useState([]),
    [u, s] = useState(!0),
    [r, v] = useState(""),
    [S, E] = useState("upcoming"),
    [g, p] = useState(!1),
    [R, k] = useState(""),
    [Q, f] = useState(""),
    [m, d] = useState(!1);
  let [clientNoteFiles, setClientNoteFiles] = useState([]);
  let [freshProfileFiles, setFreshProfileFiles] = useState(null);
  useEffect(() => {
    if (e?.id && !ee) {
      // Use e.token (client's own session JWT) — anon key is blocked by RLS on profiles
      const authToken = e.token || j;
      X.get("profiles", `id=eq.${e.id}&select=client_files`, authToken).then(res => {
        if (Array.isArray(res) && res[0]?.client_files) setFreshProfileFiles(res[0].client_files);
      }).catch(() => {});
      X.get("admin_notes", `patient_id=eq.${e.id}&note=like.*FICHIER*`, authToken).then(notes => {
        if (Array.isArray(notes)) {
          let extracted = [];
          notes.forEach(n => {
            if (n.note && n.note.includes("FICHIER")) {
              try {
                let isFromAdmin = n.note.includes("FICHIER ADMIN");
                let sIdx = n.note.indexOf("{");
                let eIdx = n.note.lastIndexOf("}");
                if (sIdx !== -1 && eIdx !== -1) {
                  let fileObj = JSON.parse(n.note.substring(sIdx, eIdx + 1));
                  fileObj.uploaded_by = isFromAdmin ? "admin" : "client";
                  extracted.push({ ...fileObj, _note_id: n.id });
                }
              } catch(err) {}
            }
          });
          setClientNoteFiles(extracted);
        }
      }).catch(() => {});
    }
  }, [e?.id]);

  // Merge e.client_files (updated immediately by t() on upload) with freshProfileFiles (from DB on mount)
  // This ensures new uploads appear instantly AND DB files are always loaded
  let eMerged = e.client_files || [];
  let dbMerged = freshProfileFiles || [];
  let mergedProfileFiles = [...eMerged];
  let mergedNames = new Set(eMerged.map(f => f.name?.trim().toLowerCase()));
  dbMerged.forEach(f => {
    let k = f.name?.trim().toLowerCase();
    if (k && !mergedNames.has(k)) { mergedNames.add(k); mergedProfileFiles.push(f); }
  });

  let rawCombined = [...mergedProfileFiles, ...clientNoteFiles];
  let combinedFiles = [];
  let seenFileKeys = new Set();
  rawCombined.forEach(f => {
    if (!f || !f.name) return;
    let key = `${f.name.trim().toLowerCase()}_${f.date || ""}`;
    if (!seenFileKeys.has(key)) {
      seenFileKeys.add(key);
      combinedFiles.push(f);
    }
  });

  // adminFiles = everything NOT explicitly uploaded by a client (includes legacy files without uploaded_by)
  let adminFiles = combinedFiles.filter(C => C.uploaded_by !== "client");
  let clientFiles = combinedFiles.filter(C => C.uploaded_by === "client");
  useEffect(() => {
    (async () => {
      s(!0);
      let C = [];
      try {
        if (ee) C = ue.appointments.filter(W => W.patient_id === e.id || W.patient_email === e.email);else {
          let [W, le] = await Promise.all([X.get("appointments", `patient_id=eq.${e.id}&status=neq.archived&order=rdv_date.desc`, e.token), X.get("appointments", `patient_email=eq.${e.email}&status=neq.archived&order=rdv_date.desc`, e.token)]),
            Ne = [...(Array.isArray(W) ? W : []), ...(Array.isArray(le) ? le : [])],
            De = new Set();
          C = Ne.filter(st => De.has(st.id) ? !1 : (De.add(st.id), !0)), C.sort((st, ke) => (ke.rdv_date || "").localeCompare(st.rdv_date || ""));
        }
      } catch (W) {
        console.error("Patient RDV load error:", W);
      }
      i(C), s(!1);
    })();
  }, [e.id]);
  let h = async () => {
      if (R.trim().toLowerCase() !== e.email.toLowerCase()) {
        f("L'email ne correspond pas. Veuillez r\xE9essayer.");
        return;
      }
      d(!0);
      try {
        ee ? (ue.appointments = ue.appointments.filter(C => C.patient_email !== e.email), ue.questionnaires = ue.questionnaires.filter(C => C.patient_email !== e.email), ue.notes.push({
          id: Math.random().toString(36).slice(2),
          patient_id: e.id,
          note: `\u{1F534} COMPTE SUPPRIM\xC9 PAR LE CLIENT \u2014 ${e.email} a demand\xE9 la suppression le ${new Date().toLocaleDateString("fr-FR")}.`,
          created_at: new Date().toISOString()
        })) : (await fetch(`${Ge}/rest/v1/appointments?patient_email=eq.${encodeURIComponent(e.email)}`, {
          method: "DELETE",
          headers: {
            apikey: j,
            Authorization: `Bearer ${j}`,
            Prefer: "return=minimal"
          }
        }), await fetch(`${Ge}/rest/v1/questionnaires?patient_email=eq.${encodeURIComponent(e.email)}`, {
          method: "DELETE",
          headers: {
            apikey: j,
            Authorization: `Bearer ${j}`,
            Prefer: "return=minimal"
          }
        }), await fetch(`${Ge}/rest/v1/admin_notes`, {
          method: "POST",
          headers: {
            apikey: j,
            Authorization: `Bearer ${j}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal"
          },
          body: JSON.stringify({
            patient_id: e.id,
            note: `\u{1F534} COMPTE SUPPRIM\xC9 PAR LE CLIENT \u2014 ${e.prenom} ${e.nom} (${e.email}) a demand\xE9 la suppression de son compte le ${new Date().toLocaleDateString("fr-FR")}. Action requise : supprimer l'utilisateur dans Supabase Auth (Authentication > Users).`,
            created_at: new Date().toISOString()
          })
        })), d(!1), p(!1), l(), alert("Votre compte a bien \xE9t\xE9 supprim\xE9. Vos identifiants de connexion seront d\xE9finitivement effac\xE9s sous 48h par VITASCIENZELAB.");
      } catch (C) {
        console.error(C), f("Erreur lors de la suppression. Contactez contact@herboristeriechampenoise.com"), d(!1);
      }
    },
    w = async C => {
      if (window.confirm("Confirmer l'annulation de cette s\xE9ance ?")) {
        if (ee) {
          let W = ue.appointments.find(le => le.id === C.id);
          W && (W.status = "cancelled");
        } else await X.patch("appointments", C.id, {
          status: "cancelled"
        }, j);
        i(W => W.map(le => le.id === C.id ? {
          ...le,
          status: "cancelled"
        } : le)), await jn(e.email, "\u274C S\xE9ance annul\xE9e \u2014 VITASCIENZELAB", `<div style="font-family:sans-serif;padding:20px;max-width:500px">
        <h2 style="color:#C62828">S\xE9ance annul\xE9e</h2>
        <p>Votre s\xE9ance du <strong>${vt(C.rdv_date)}</strong> \xE0 <strong>${C.slot}</strong> a bien \xE9t\xE9 annul\xE9e.</p>
        <p style="color:#546E7A">Pour reprendre rendez-vous : <a href="https://vitascienzelab.vercel.app">vitascienzelab.vercel.app</a></p>
        <p style="font-size:11px;color:#90A4AE;margin-top:20px">VITASCIENZELAB \u2013 SIRET : 841 057 730 00019</p>
      </div>`), ee || X.post("admin_notes", {
          patient_id: e?.id || "unknown",
          note: `\u{1F4F1} ANNULATION CLIENT \u2014 ${e?.prenom || ""} ${e?.nom || ""} (${e?.email}) a annul\xE9 sa s\xE9ance du ${Ke(C.rdv_date)} \xE0 ${C.slot} (${C.service_title}).`,
          created_at: new Date().toISOString()
        }, j);
      }
    },
    [B, M] = useState(null),
    [Y, O] = useState(""),
    [L, de] = useState(""),
    gt = useRef(null),
    [Oe, Ce] = useState(null),
    yl = useRef(null),
    qt = async () => {
      if (!Y || !L) return;
      let C = {
        rdv_date: Y,
        slot: L,
        docs: B.docs || [],
        docs_data: B.docs_data || []
      };
      if (ee) {
        let le = ue.appointments.find(Ne => Ne.id === B.id);
        le && Object.assign(le, C);
      } else await X.patch("appointments", B.id, C, j);
      i(le => le.map(Ne => Ne.id === B.id ? {
        ...Ne,
        ...C
      } : Ne));
      let W = {
        ...B,
        ...C
      };
      await jn(e.email, "\u{1F4C5} S\xE9ance modifi\xE9e \u2014 VITASCIENZELAB", Ji(W, "confirm")), M(null), O(""), de("");
    },
    Wt = a.filter(C => !at(C) && C.status === "confirmed"),
    It = a.filter(C => at(C) || C.status === "completed" || C.status === "cancelled"),
    Ll = S === "upcoming" ? Wt : It,
    Ha = C => C === "confirmed" ? _jsx(We, {
      bg: "#E8F5E9",
      color: "#2E7D32",
      children: "\u2713 Confirm\xE9"
    }) : C === "cancelled" ? _jsx(We, {
      bg: "#FCE4EC",
      color: "#C62828",
      children: "\u2717 Annul\xE9"
    }) : C === "completed" ? _jsx(We, {
      bg: "#EDE7F6",
      color: "#4527A0",
      children: "\u2713 Effectu\xE9"
    }) : null;
  return _jsxs("div", {
    style: {
      maxWidth: 700,
      margin: "0 auto",
      padding: "28px 20px 60px"
    },
    children: [Oe && _jsx("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 20,
          padding: 28,
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,.15)"
        },
        children: [_jsx("h3", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 17,
            color: z,
            marginBottom: 6
          },
          children: "\u{1F4CE} Documents joints"
        }), _jsxs("p", {
          style: {
            fontSize: 12,
            color: "#78909C",
            marginBottom: 16
          },
          children: [Oe.service_title, " \xB7 ", Ke(Oe.rdv_date), " \xE0 ", Oe.slot]
        }), (Oe.docs || []).length === 0 ? _jsx("p", {
          style: {
            fontSize: 13,
            color: "#90A4AE",
            textAlign: "center",
            padding: "20px 0"
          },
          children: "Aucun document joint pour l'instant."
        }) : (Oe.docs || []).map((C, W) => _jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#F3E5F5",
            borderRadius: 8,
            padding: "10px 12px",
            marginBottom: 8
          },
          children: [_jsx("span", {
            style: {
              fontSize: 18
            },
            children: "\u{1F4C4}"
          }), _jsx("span", {
            style: {
              flex: 1,
              fontSize: 13,
              color: "#6A1B9A",
              fontWeight: 600,
              wordBreak: "break-all"
            },
            children: C
          }), _jsx("button", {
            onClick: async () => {
              if (!window.confirm(`Supprimer "${C}" ?`)) return;
              let le = (Oe.docs || []).filter((st, ke) => ke !== W),
                Ne = (Oe.docs_data || []).filter((st, ke) => ke !== W);
              ee || (await X.patch("appointments", Oe.id, {
                docs: le,
                docs_data: Ne
              }, j));
              let De = {
                ...Oe,
                docs: le,
                docs_data: Ne
              };
              Ce(De), i(st => st.map(ke => ke.id === Oe.id ? De : ke));
            },
            style: {
              background: "#FCE4EC",
              border: "none",
              color: "#C62828",
              borderRadius: 8,
              padding: "5px 10px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            },
            children: "\u{1F5D1} Supprimer"
          })]
        }, W)), _jsx("input", {
          ref: yl,
          type: "file",
          multiple: !0,
          accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx",
          style: {
            display: "none"
          },
          onChange: C => {
            let W = Array.from(C.target.files),
              le = {
                ...Oe
              },
              Ne = W.length;
            W.forEach(De => {
              let st = new FileReader();
              st.onload = async ke => {
                le = {
                  ...le,
                  docs: [...(le.docs || []), De.name],
                  docs_data: [...(le.docs_data || []), {
                    name: De.name,
                    type: De.type,
                    data: ke.target.result
                  }]
                }, Ne--, Ne === 0 && (ee || (await X.patch("appointments", Oe.id, {
                  docs: le.docs,
                  docs_data: le.docs_data
                }, j)), Ce(le), i(vl => vl.map(Ut => Ut.id === Oe.id ? le : Ut)));
              }, st.readAsDataURL(De);
            }), C.target.value = "";
          }
        }), _jsx("button", {
          onClick: () => yl.current?.click(),
          style: {
            background: V,
            border: `1px dashed ${q}`,
            color: q,
            borderRadius: 8,
            padding: "10px",
            fontSize: 13,
            cursor: "pointer",
            width: "100%",
            marginTop: 8,
            fontWeight: 600
          },
          children: "+ Ajouter un document"
        }), _jsx(ot, {
          onClick: () => Ce(null),
          style: {
            width: "100%",
            marginTop: 12
          },
          children: "Fermer"
        })]
      })
    }), B && _jsx("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 20,
          padding: 32,
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,.15)"
        },
        children: [_jsx("h3", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 18,
            color: z,
            marginBottom: 6
          },
          children: "Modifier votre s\xE9ance"
        }), _jsxs("p", {
          style: {
            fontSize: 12,
            color: "#78909C",
            marginBottom: 20
          },
          children: [B.service_icon, " ", B.service_title]
        }), _jsxs("div", {
          style: {
            marginBottom: 14
          },
          children: [_jsx("label", {
            style: {
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: z,
              marginBottom: 6
            },
            children: "Nouvelle date"
          }), _jsx("input", {
            type: "date",
            value: Y,
            onChange: C => O(C.target.value),
            min: new Date().toISOString().split("T")[0],
            style: {
              width: "100%",
              border: `2px solid ${V}`,
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 13,
              color: z,
              outline: "none"
            }
          })]
        }), _jsxs("div", {
          style: {
            marginBottom: 20
          },
          children: [_jsx("label", {
            style: {
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: z,
              marginBottom: 6
            },
            children: "Nouveau cr\xE9neau"
          }), _jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 8
            },
            children: Je.map(C => _jsx("button", {
              onClick: () => de(C),
              style: {
                padding: "10px 6px",
                borderRadius: 9,
                border: `2px solid ${L === C ? q : V}`,
                background: L === C ? q : "#fff",
                color: L === C ? "#fff" : z,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer"
              },
              children: C
            }, C))
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 10
          },
          children: [_jsx(ot, {
            onClick: () => M(null),
            style: {
              flex: 1
            },
            children: "Annuler"
          }), _jsx(ze, {
            onClick: qt,
            disabled: !Y || !L,
            style: {
              flex: 2,
              opacity: Y && L ? 1 : 0.4
            },
            children: "\u2713 Confirmer"
          })]
        })]
      })
    }), g && _jsx("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 20,
          padding: 32,
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,.15)"
        },
        children: [_jsxs("div", {
          style: {
            textAlign: "center",
            marginBottom: 20
          },
          children: [_jsx("div", {
            style: {
              fontSize: 40,
              marginBottom: 10
            },
            children: "\u26A0\uFE0F"
          }), _jsx("h3", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 18,
              color: "#C62828",
              marginBottom: 8
            },
            children: "Supprimer mon compte"
          }), _jsxs("p", {
            style: {
              fontSize: 13,
              color: "#546E7A",
              lineHeight: 1.7
            },
            children: ["Cette action supprimera toutes vos s\xE9ances et donn\xE9es de bien-\xEAtre.", _jsx("br", {}), _jsx("strong", {
              children: "Elle est irr\xE9versible."
            })]
          })]
        }), _jsx("div", {
          style: {
            background: "#FFF3E0",
            borderRadius: 10,
            padding: "12px 14px",
            marginBottom: 20,
            fontSize: 12,
            color: "#E65100",
            lineHeight: 1.6
          },
          children: "\u2139\uFE0F Votre demande sera notifi\xE9e \xE0 VITASCIENZELAB qui proc\xE8dera \xE0 la suppression d\xE9finitive de vos identifiants de connexion sous 48h."
        }), _jsx("p", {
          style: {
            fontSize: 12,
            color: "#78909C",
            marginBottom: 16,
            textAlign: "center"
          },
          children: "Confirmez votre email pour valider :"
        }), _jsx("input", {
          value: R,
          onChange: C => k(C.target.value),
          placeholder: e.email,
          style: {
            width: "100%",
            border: "2px solid #FFCDD2",
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 13,
            color: z,
            outline: "none",
            marginBottom: 16
          }
        }), Q && _jsx("p", {
          style: {
            color: "#E53935",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 10
          },
          children: Q
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 10
          },
          children: [_jsx(ot, {
            onClick: () => {
              p(!1), k(""), f("");
            },
            style: {
              flex: 1
            },
            children: "Annuler"
          }), _jsx("button", {
            onClick: h,
            disabled: m,
            style: {
              flex: 2,
              background: "linear-gradient(135deg,#C62828,#E53935)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer"
            },
            children: m ? "Suppression\u2026" : "Confirmer la suppression"
          })]
        })]
      })
    }), _jsxs("div", {
      style: {
        background: `linear-gradient(135deg,${z},${q})`,
        borderRadius: 20,
        padding: "22px 26px",
        marginBottom: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      },
      children: [_jsxs("div", {
        children: [_jsxs("div", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            color: "#fff"
          },
          children: ["Bonjour, ", e.prenom, " \u{1F44B}"]
        }), _jsx("div", {
          style: {
            fontSize: 12,
            color: "rgba(255,255,255,.7)"
          },
          children: e.email
        })]
      }), _jsxs("div", {
        style: {
          display: "flex",
          gap: 10,
          flexWrap: "wrap"
        },
        children: [_jsx(ze, {
          onClick: n,
          style: {
            fontSize: 13,
            padding: "9px 18px",
            background: "rgba(255,255,255,.25)",
            border: "1px solid rgba(255,255,255,.4)"
          },
          children: "+ Nouvelle s\xE9ance"
        }), _jsx("button", {
          onClick: l,
          style: {
            background: "rgba(255,255,255,.1)",
            border: "1px solid rgba(255,255,255,.2)",
            color: "rgba(255,255,255,.8)",
            borderRadius: 10,
            padding: "9px 14px",
            fontSize: 12
          },
          children: "D\xE9connexion"
        }), _jsx("button", {
          onClick: () => p(!0),
          style: {
            background: "rgba(220,53,69,.2)",
            border: "1px solid rgba(220,53,69,.4)",
            color: "#FFCDD2",
            borderRadius: 10,
            padding: "9px 14px",
            fontSize: 12
          },
          children: "\u{1F5D1} Supprimer mon compte"
        })]
      })]
    }), _jsx("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 20
      },
      children: [["upcoming", `\xC0 venir (${Wt.length})`], ["history", `Historique (${It.length})`]].map(([C, W]) => _jsx("button", {
        onClick: () => E(C),
        style: {
          padding: "8px 18px",
          borderRadius: 20,
          border: `2px solid ${S === C ? q : "#E0E0E0"}`,
          background: S === C ? q : "#fff",
          color: S === C ? "#fff" : "#546E7A",
          fontSize: 13,
          fontWeight: 600
        },
        children: W
      }, C))
    }), u ? _jsx(Ag, {}) : Ll.length === 0 ? _jsx("div", {
      style: {
        textAlign: "center",
        padding: "40px 20px",
        color: "#90A4AE"
      },
      children: S === "upcoming" ? _jsxs(_Fragment, {
        children: [_jsx("div", {
          style: {
            fontSize: 40,
            marginBottom: 12
          },
          children: "\u{1F4C5}"
        }), _jsx("p", {
          style: {
            marginBottom: 16
          },
          children: "Aucune s\xE9ance \xE0 venir."
        }), _jsx(ze, {
          onClick: n,
          children: "R\xE9server une s\xE9ance"
        })]
      }) : _jsx("p", {
        children: "Aucun historique de s\xE9ance."
      })
    }) : Ll.map(C => _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 16,
        padding: "18px 20px",
        marginBottom: 12,
        boxShadow: "0 2px 12px rgba(21,101,192,.06)",
        borderLeft: `4px solid ${C.status === "cancelled" ? "#FFCDD2" : at(C) ? "#B0BEC5" : q}`,
        opacity: C.status === "cancelled" ? 0.7 : 1
      },
      children: [_jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 10
        },
        children: [_jsxs("div", {
          children: [_jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
              flexWrap: "wrap"
            },
            children: [_jsx("span", {
              style: {
                fontSize: 20
              },
              children: C.service_icon
            }), _jsx("span", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 16,
                color: z
              },
              children: C.service_title
            }), Ha(C.status), C.recurring && _jsx(We, {
              bg: "#FFF8E1",
              color: "#F57F17",
              children: "\u{1F501} Mensuel"
            })]
          }), _jsxs("div", {
            style: {
              fontSize: 13,
              color: "#546E7A"
            },
            children: ["\u{1F4C5} ", vt(C.rdv_date), " \xB7 \u{1F550} ", C.slot, " \xB7 \u23F1 ", C.service_dur]
          }), C.docs?.length > 0 && _jsx("div", {
            style: {
              marginTop: 8,
              display: "flex",
              gap: 6,
              flexWrap: "wrap"
            },
            children: C.docs.map(W => _jsxs(We, {
              bg: "#F3E5F5",
              color: "#6A1B9A",
              children: ["\u{1F4CE} ", W]
            }, W))
          })]
        }), C.status === "confirmed" && !at(C) && _jsxs("div", {
          style: {
            display: "flex",
            gap: 8,
            flexWrap: "wrap"
          },
          children: [_jsx("button", {
            onClick: () => {
              M(C), O(C.rdv_date), de(C.slot);
            },
            style: {
              background: V,
              border: "none",
              color: q,
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            },
            children: "\u270F\uFE0F Modifier"
          }), _jsx("button", {
            onClick: () => Ce(C),
            style: {
              background: "#F3E5F5",
              border: "none",
              color: "#6A1B9A",
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            },
            children: "\u{1F4CE} Documents"
          }), _jsx("button", {
            onClick: () => w(C),
            style: {
              background: "#FCE4EC",
              border: "none",
              color: "#C62828",
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            },
            children: "\u2717 Annuler"
          })]
        })]
      }), C.status === "confirmed" && !at(C) && _jsx("div", {
        style: {
          marginTop: 10,
          padding: "10px 12px",
          background: "#FFF8E1",
          borderRadius: 8,
          fontSize: 12,
          color: "#E65100"
        },
        children: "\u{1F4CE} N'oubliez pas d'apporter votre liste de compl\xE9ments alimentaires et produits naturels actuels si vous en prenez."
      })]
    }, C.id)), _jsx("div", {
      style: {
        maxWidth: 560,
        margin: "16px auto 0",
        padding: "0 20px"
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 2px 12px rgba(21,101,192,.08)",
          marginBottom: 12
        },
        children: [_jsx("h4", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 15,
            color: z,
            marginBottom: 6
          },
          children: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467} Famille & Proches"
        }), _jsx("p", {
          style: {
            fontSize: 11,
            color: "#78909C",
            marginBottom: 12
          },
          children: "Ajoutez vos proches pour r\xE9server une s\xE9ance en leur nom."
        }), (e?.guests || []).length === 0 && _jsx("p", {
          style: {
            fontSize: 12,
            color: "#B0BEC5",
            textAlign: "center",
            padding: "8px 0"
          },
          children: "Aucun proche ajout\xE9."
        }), (e?.guests || []).map((C, W) => _jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#F0F4FF",
            borderRadius: 8,
            padding: "8px 12px",
            marginBottom: 6
          },
          children: [_jsx("span", {
            style: {
              fontSize: 16
            },
            children: "\u{1F464}"
          }), _jsx("span", {
            style: {
              flex: 1,
              fontSize: 13,
              fontWeight: 600,
              color: z
            },
            children: C.name
          }), _jsx("button", {
            onClick: async () => {
              if (!window.confirm(`Retirer "${C.name}" ?`)) return;
              let le = (e.guests || []).filter((Ne, De) => De !== W);
              ee || (await X.patch("profiles", e.id, {
                guests: le
              }, j)), t({
                ...e,
                guests: le
              });
            },
            style: {
              background: "#FCE4EC",
              border: "none",
              color: "#C62828",
              borderRadius: 7,
              padding: "5px 8px",
              fontSize: 11,
              cursor: "pointer"
            },
            children: "\u{1F5D1}"
          })]
        }, W)), _jsxs("div", {
          style: {
            display: "flex",
            gap: 8,
            marginTop: 10
          },
          children: [_jsx(ut, {
            value: r,
            onChange: C => v(C.target.value),
            placeholder: "Pr\xE9nom Nom du proche\u2026",
            onKeyDown: async C => {
              if (C.key === "Enter" && r.trim()) {
                let W = [...(e.guests || []), {
                  name: r.trim()
                }];
                ee || (await X.patch("profiles", e.id, {
                  guests: W
                }, j)), t({
                  ...e,
                  guests: W
                }), v("");
              }
            }
          }), _jsx(ze, {
            onClick: async () => {
              if (!r.trim()) return;
              let C = [...(e.guests || []), {
                name: r.trim()
              }];
              ee || (await X.patch("profiles", e.id, {
                guests: C
              }, j)), t({
                ...e,
                guests: C
              }), v("");
            },
            style: {
              padding: "10px 16px",
              fontSize: 13
            },
            children: "+ Ajouter"
          })]
        })]
      })
    }), _jsx("div", {
      style: {
        maxWidth: 560,
        margin: "16px auto 0",
        padding: "0 20px"
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 2px 12px rgba(21,101,192,.08)"
        },
        children: [
          _jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: "#6A1B9A",
              marginBottom: 6
            },
            children: "⬇️ Documents reçus de VitaScienzeLab"
          }),
          _jsx("p", {
            style: {
              fontSize: 11,
              color: "#78909C",
              marginBottom: 10
            },
            children: "Factures, protocoles et documents transmis par VITASCIENZELAB."
          }),
          adminFiles.length === 0 ? _jsx("p", {
            style: {
              fontSize: 12,
              color: "#B0BEC5",
              textAlign: "center",
              padding: "10px 0"
            },
            children: "Aucun document disponible pour l'instant."
          }) : adminFiles.map((C, W) => _jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#F3E5F5",
              borderRadius: 8,
              padding: "10px 12px",
              marginBottom: 6
            },
            children: [
              _jsx("span", {
                style: {
                  fontSize: 20
                },
                children: C.type?.includes("pdf") ? "📕" : C.type?.includes("image") ? "🖼️" : "📄"
              }),
              _jsxs("div", {
                style: {
                  flex: 1
                },
                children: [
                  _jsx("div", {
                    style: {
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#6A1B9A"
                    },
                    children: C.name
                  }),
                  _jsx("div", {
                    style: {
                      fontSize: 10,
                      color: "#90A4AE"
                    },
                    children: C.date
                  })
                ]
              }),
              C.data && _jsx("button", {
                onClick: () => downloadBase64File(C.data, C.name),
                style: {
                  background: "#6A1B9A",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "7px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer"
                },
                children: "⬇️ Télécharger"
              })
            ]
          }, W)),
          _jsx("hr", {
            style: {
              border: "none",
              borderTop: "1px solid #E0E0E0",
              margin: "20px 0"
            }
          }),
          _jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: "#00695C",
              marginBottom: 6
            },
            children: "⬆️ Mes documents partagés"
          }),
          _jsx("p", {
            style: {
              fontSize: 11,
              color: "#78909C",
              marginBottom: 10,
              lineHeight: "1.4"
            },
            children: "Déposez ici vos documents (analyses, ordonnances, comptes rendus…) pour faciliter votre suivi bien-être. Partage sécurisé et confidentiel à titre informatif (ne remplace pas un avis médical)."
          }),
          clientFiles.length === 0 ? _jsx("p", {
            style: {
              fontSize: 12,
              color: "#B0BEC5",
              textAlign: "center",
              padding: "10px 0",
              marginBottom: 12
            },
            children: "Vous n'avez partagé aucun document pour l'instant."
          }) : clientFiles.map((C, W) => _jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#E0F2F1",
              borderRadius: 8,
              padding: "10px 12px",
              marginBottom: 6
            },
            children: [
              _jsx("span", {
                style: {
                  fontSize: 20
                },
                children: C.type?.includes("pdf") ? "📕" : C.type?.includes("image") ? "🖼️" : "📄"
              }),
              _jsxs("div", {
                style: {
                  flex: 1
                },
                children: [
                  _jsx("div", {
                    style: {
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#00695C"
                    },
                    children: C.name
                  }),
                  _jsx("div", {
                    style: {
                      fontSize: 10,
                      color: "#80CBC4"
                    },
                    children: C.date
                  })
                ]
              }),
              _jsxs("div", {
                style: {
                  display: "flex",
                  gap: 8
                },
                children: [
                  C.data && _jsx("button", {
                    onClick: () => downloadBase64File(C.data, C.name),
                    style: {
                      background: "#00695C",
                      color: "#fff",
                      borderRadius: 8,
                      padding: "7px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer"
                    },
                    children: "⬇️"
                  }),
                  _jsx("button", {
                    onClick: async () => {
                      if (!window.confirm(`Supprimer "${C.name}" ?`)) return;
                      const remainingFiles = (e.client_files || []).filter(f => f.name !== C.name);
                      try {
                        if (!ee) {
                          await X.patch("profiles", e.id, {
                            client_files: remainingFiles
                          }, e.token);
                        }
                        t({
                          ...e,
                          client_files: remainingFiles
                        });
                        setFreshProfileFiles(remainingFiles);
                      } catch (err) {
                        console.error("Error deleting file:", err);
                      }
                    },
                    style: {
                      background: "#FFEBEE",
                      border: "none",
                      color: "#C62828",
                      borderRadius: 8,
                      padding: "7px 12px",
                      fontSize: 12,
                      cursor: "pointer"
                    },
                    children: "🗑️"
                  })
                ]
              })
            ]
          }, W)),
          _jsx("input", {
            type: "file",
            id: "clientSelfFileInput",
            multiple: true,
            accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx",
            style: {
              display: "none"
            },
            onChange: async c => {
              const selectedFiles = Array.from(c.target.files);
              if (selectedFiles.length === 0) return;
              try {
                const processedFiles = await Promise.all(selectedFiles.map(file => compressAndReadFile(file)));
                const newFilesList = processedFiles.map(f => ({
                  name: f.name,
                  type: f.type,
                  data: f.data,
                  date: new Date().toLocaleDateString("fr-FR"),
                  uploaded_by: "client",
                  is_new_for_admin: true
                }));
                const currentFiles = e.client_files || [];
                const finalFiles = [...currentFiles, ...newFilesList];

                if (!ee) {
                  let patchRes = await X.patch("profiles", e.id, { client_files: finalFiles }, e.token).catch(() => null);
                  if (!patchRes || patchRes.error || patchRes.code) {
                    patchRes = await X.patch("profiles", e.id, { client_files: finalFiles }, j).catch(() => null);
                  }
                  if (patchRes && (patchRes.error || patchRes.code)) {
                    console.error("Supabase client patch failed:", patchRes);
                    alert("Erreur lors de la sauvegarde du fichier.");
                    return;
                  }

                  for (let fileObj of newFilesList) {
                    const noteText = `📁 FICHIER CLIENT — ${JSON.stringify(fileObj)}`;
                    await X.post("admin_notes", {
                      patient_id: e.id,
                      note: noteText,
                      created_at: new Date().toISOString()
                    }, j).catch(err => console.error("Post file note error:", err));
                  }
                  const clientFullName = `${e.prenom || ''} ${e.nom || ''}`.trim() || e.email;
                  const uploadedNames = newFilesList.map(f => f.name).join(", ");
                  X.post("admin_notes", {
                    patient_id: e.id,
                    note: `📁 NOUVEAU FICHIER CLIENT — ${clientFullName} a déposé le(s) fichier(s) : ${uploadedNames}`,
                    created_at: new Date().toISOString()
                  }, j).catch(() => {});
                }

                t({
                  ...e,
                  client_files: finalFiles
                });
                setFreshProfileFiles(finalFiles);
                alert(`✅ ${newFilesList.length} fichier(s) déposé(s) avec succès !`);
              } catch (err) {
                console.error("Client upload error:", err);
                alert(err.message || "Une erreur est survenue lors de l'enregistrement.");
              } finally {
                c.target.value = "";
              }
            }
          }),
          _jsx("button", {
            onClick: () => document.getElementById("clientSelfFileInput").click(),
            style: {
              background: "#E0F2F1",
              border: "1px dashed #004D40",
              color: "#004D40",
              borderRadius: 10,
              padding: "10px",
              fontSize: 12,
              cursor: "pointer",
              width: "100%",
              marginTop: 10,
              fontWeight: 600
            },
            children: "+ Déposer un document (PDF, analyses, ordonnances…)"
          })
        ]
      })
    })]
  });
}
const Lu = ["Service", "Date", "Cr\xE9neau", "Documents", "Vos infos", "Confirmation"];
function Bg({
  user: e,
  onDone: t
}) {
  let [n, l] = useState(0),
    [a, i] = useState(null),
    [u, s] = useState(""),
    [r, v] = useState(""),
    [S, E] = useState([]),
    [g, p] = useState(0),
    [R, k] = useState({}),
    [Q, f] = useState([]),
    [m, d] = useState([]);
  useEffect(() => {
    if (ee) {
      f(ue.appointments);
      return;
    }
    fetch("/api/get-busy-slots").then(res => res.json()).then(res => {
      Array.isArray(res.appointments) && f(res.appointments), Array.isArray(res.blockedSlots) && d(res.blockedSlots);
    }).catch(() => {});
  }, []);
  let [h, w] = useState(!1),
    [B, M] = useState({
      prenom: e?.prenom || "",
      nom: e?.nom || "",
      email: e?.email || "",
      tel: e?.tel || "",
      notes: "",
      supplements: [],
      suppInput: ""
    }),
    [Y, O] = useState(!1),
    [L, de] = useState({}),
    [gt, Oe] = useState(!1),
    [Ce, yl] = useState(null),
    [qt, Wt] = useState(!1),
    [It, Ll] = useState(""),
    [Ha, C] = useState(""),
    [W, le] = useState(""),
    [Ne, De] = useState(!1),
    [st, ke] = useState(!1),
    vl = useRef(),
    Ut = x => U => M(re => ({
      ...re,
      [x]: U.target.value
    })),
    ja = x => {
      let U = g + x;
      U >= Wi.length ? l(5) : U < 0 ? l(3) : p(U);
    },
    Pt = () => {
      let x = {};
      return B.prenom.trim() || (x.prenom = "Requis"), B.nom.trim() || (x.nom = "Requis"), B.email.match(/^[^@]+@[^@]+\.[^@]+$/) || (x.email = "Email invalide"), B.tel && B.tel.trim().length > 0 && B.tel.trim().length < 8 && (x.tel = "Num\xE9ro trop court"), Y || (x.consent = "Veuillez accepter les conditions"), de(x), Object.keys(x).length > 0 && (x.prenom || x.nom || x.email || x.tel) && l(4), Object.keys(x).length === 0;
    },
    hl = async () => {
      if (!Pt()) return;
      Oe(!0);
      let x = {
        id: ed(),
        patient_id: e?.id || null,
        patient_name: `${B.prenom} ${B.nom}`,
        patient_email: B.email,
        patient_tel: B.tel,
        service_id: a.id,
        service_title: a.title,
        service_icon: a.icon,
        service_dur: a.dur,
        rdv_date: u,
        slot: r,
        status: "confirmed",
        notes: B.notes,
        recurring: h,
        docs: S.map(U => U.name),
        docs_data: S.map(U => ({
          name: U.name,
          type: U.type,
          data: U.data
        })),
        supplements: B.supplements || [],
        reminder_sent: !1,
        created_at: it(0)
      };
      try {
        if (ee) ue.appointments.push(x), Object.keys(R).length > 0 && ue.questionnaires.push({
          id: Ln(),
          appointment_id: x.id,
          patient_id: e?.id || null,
          patient_email: x.patient_email,
          responses: R,
          created_at: new Date().toISOString()
        });else {
          let U = {
            ...x
          };
          delete U.supplements, delete U.docs_data;
          let re = await X.post("appointments", U, j);
          console.log("Save result:", re);
          if (re && (re.error || re.code || re.message)) {
            throw new Error(re.message || "Database insert failed");
          }
          try {
            await X.patch("appointments", x.id, {
              supplements: x.supplements || [],
              docs_data: x.docs_data || []
            }, j);
          } catch (wt) {
            console.log("Extra fields not saved:", wt);
          }
        }
      } catch (U) {
        console.error("Booking error:", U), alert("Erreur r\xE9seau. Veuillez r\xE9essayer."), Oe(!1);
        return;
      }
      if (jn(x.patient_email, "\u2705 Votre s\xE9ance est confirm\xE9e \u2014 VITASCIENZELAB", Ji(x, "confirm")).catch(U => console.error("Email confirm error:", U)), !ee) {
        X.post("admin_notes", {
          patient_id: e?.id || "unknown",
          note: `\u{1F4F1} R\xC9SERVATION CLIENT \u2014 ${x.patient_name} (${x.patient_email}) a r\xE9serv\xE9 : ${x.service_title} le ${Ke(x.rdv_date)} \xE0 ${x.slot}.`,
          created_at: new Date().toISOString()
        }, j).catch(() => {});
        let U = `https://vitascienzelab.vercel.app?questionnaire=${x.id}`;
        jn(x.patient_email, "\u{1F4CB} Pr\xE9parez votre s\xE9ance VITASCIENZELAB (optionnel)", `<html><body style="font-family:Arial,sans-serif;padding:20px;background:#f4f4f4"><div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><div style="background:linear-gradient(135deg,#003891,#1565C0);padding:24px;text-align:center"><div style="font-size:28px">\u2697\uFE0F</div><div style="font-size:18px;color:#fff;font-weight:700;margin-top:6px">VITASCIENZELAB</div></div><div style="padding:24px"><h2 style="color:#1A237E;font-size:16px;margin-bottom:12px">\u{1F4CB} Questionnaire optionnel de pr\xE9paration</h2><p style="color:#546E7A;font-size:13px;line-height:1.7;margin-bottom:16px">Bonjour <strong>${x.patient_name?.split(" ")[0] || ""}</strong>,<br/>Pour pr\xE9parer au mieux votre s\xE9ance du <strong>${vt(x.rdv_date)}</strong> \xE0 <strong>${x.slot}</strong>, vous pouvez r\xE9pondre \xE0 quelques questions sur vos habitudes de vie. C'est <strong>enti\xE8rement facultatif</strong>.</p><div style="background:#FFF8E1;border-radius:8px;padding:12px;margin-bottom:16px;font-size:12px;color:#E65100">\u2139\uFE0F Ces informations servent uniquement \xE0 adapter notre s\xE9lection de compl\xE9ments. Aucun acte m\xE9dical.</div><a href="${U}" style="display:block;text-align:center;background:#1565C0;color:#fff;border-radius:10px;padding:12px;font-size:14px;font-weight:700;text-decoration:none;margin-bottom:12px">\u{1F4CB} Remplir le questionnaire (5 min)</a><p style="font-size:10px;color:#90A4AE;text-align:center">VITASCIENZELAB \xB7 SIRET 841 057 730 00019</p></div></div></body></html>`).catch(() => {});
      }
      if (!ee && e?.id && e.id.length > 20) try {
        let U = await X.get("profiles", `id=eq.${e.id}`, j);
        if (Array.isArray(U) && U[0]) {
          let re = U[0].client_docs || [],
            rt = (x.docs_data || []).map(wn => ({
              ...wn,
              from_rdv: x.rdv_date,
              from_slot: x.slot,
              patient_name: x.patient_name || ""
            })),
            wt = U[0].all_supplements || [],
            bl = (x.supplements || []).map(wn => ({
              name: wn,
              from_rdv: x.rdv_date,
              patient_name: x.patient_name || ""
            }));
          await X.patch("profiles", e.id, {
            client_docs: [...re, ...rt],
            all_supplements: [...wt, ...bl]
          }, j);
        }
      } catch (U) {
        console.error("Profile docs save:", U);
      }
      yl(x), Oe(!1);
    };
  return Ce ? _jsx("div", {
    style: {
      maxWidth: 540,
      margin: "40px auto",
      padding: "20px 20px 60px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 24,
        padding: "40px 32px",
        boxShadow: "0 8px 40px rgba(21,101,192,.12)",
        textAlign: "center"
      },
      children: [_jsx("div", {
        style: {
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#1565C0,#42A5F5)",
          margin: "0 auto 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          color: "#fff"
        },
        children: "\u2713"
      }), _jsx("h2", {
        style: {
          fontFamily: "'Playfair Display',serif",
          fontSize: 22,
          color: "#1A237E",
          marginBottom: 10
        },
        children: "S\xE9ance confirm\xE9e !"
      }), _jsxs("p", {
        style: {
          color: "#78909C",
          fontSize: 13,
          lineHeight: 1.7,
          marginBottom: 24
        },
        children: ["Email envoy\xE9 \xE0 ", _jsx("strong", {
          children: Ce.patient_email
        }), ".", _jsx("br", {}), "Rappel ", _jsx("strong", {
          children: "48h avant"
        }), " votre s\xE9ance."]
      }), _jsx("div", {
        style: {
          background: "#F0F4FF",
          borderRadius: 14,
          padding: 20,
          textAlign: "left",
          marginBottom: 20
        },
        children: [["Prestation", Ce.service_title], ["Date", vt(Ce.rdv_date)], ["Heure", Ce.slot], ["Dur\xE9e", Ce.service_dur]].map(([x, U]) => _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #E8EEFF",
            fontSize: 13
          },
          children: [_jsx("span", {
            style: {
              color: "#78909C"
            },
            children: x
          }), _jsx("span", {
            style: {
              fontWeight: 700,
              color: "#1A237E"
            },
            children: U
          })]
        }, x))
      }), _jsx(ze, {
        onClick: t,
        style: {
          width: "100%",
          marginBottom: 12
        },
        children: e ? "Voir mes s\xE9ances \u2192" : "\u2190 Retour accueil"
      }), !e && qt !== "skip" && _jsxs("div", {
        style: {
          background: "#E8F0FE",
          borderRadius: 16,
          padding: "20px 24px",
          border: "1px solid #C5D8F8",
          textAlign: "left",
          marginTop: 4
        },
        children: [(!qt || qt === !1) && _jsxs("div", {
          children: [_jsxs("div", {
            style: {
              textAlign: "center",
              marginBottom: 10
            },
            children: [_jsx("div", {
              style: {
                fontSize: 22,
                marginBottom: 4
              },
              children: "\u{1F464}"
            }), _jsx("h4", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 14,
                color: "#1A237E",
                marginBottom: 4
              },
              children: "Cr\xE9er votre espace client ?"
            }), _jsx("p", {
              style: {
                fontSize: 12,
                color: "#546E7A",
                lineHeight: 1.5
              },
              children: "Retrouvez et g\xE9rez vos s\xE9ances \xE0 tout moment."
            })]
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              marginTop: 10
            },
            children: [_jsx(ze, {
              onClick: () => Wt("form"),
              style: {
                flex: 2,
                fontSize: 12
              },
              children: "\u2705 Cr\xE9er mon compte"
            }), _jsx(ot, {
              onClick: () => Wt("skip"),
              style: {
                flex: 1,
                fontSize: 11
              },
              children: "Plus tard"
            })]
          })]
        }), qt === "done" && _jsxs("div", {
          style: {
            textAlign: "center"
          },
          children: [_jsx("div", {
            style: {
              fontSize: 28,
              marginBottom: 6
            },
            children: "\u{1F389}"
          }), _jsx("p", {
            style: {
              fontSize: 13,
              fontWeight: 700,
              color: "#1A237E"
            },
            children: "Compte cr\xE9\xE9 !"
          }), _jsx("p", {
            style: {
              fontSize: 12,
              color: "#546E7A",
              marginTop: 4
            },
            children: 'Connectez-vous depuis "Mon espace client".'
          })]
        }), qt === "form" && _jsxs("div", {
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 14,
              color: "#1A237E",
              marginBottom: 8
            },
            children: "Choisissez un mot de passe"
          }), _jsxs("p", {
            style: {
              fontSize: 11,
              color: "#546E7A",
              marginBottom: 10
            },
            children: ["Email : ", _jsx("strong", {
              children: Ce.patient_email
            })]
          }), _jsx(Ie, {
            label: "Mot de passe * (6 car. min.)",
            children: _jsx(ut, {
              type: "password",
              value: It,
              onChange: x => Ll(x.target.value),
              placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            })
          }), _jsx(Ie, {
            label: "Confirmer *",
            children: _jsx(ut, {
              type: "password",
              value: Ha,
              onChange: x => C(x.target.value),
              placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            })
          }), W && _jsx("p", {
            style: {
              color: "#E53935",
              fontSize: 12,
              marginBottom: 8
            },
            children: W
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              marginTop: 8
            },
            children: [_jsx(ze, {
              onClick: async () => {
                if (!It || It.length < 6) {
                  le("Minimum 6 caract\xE8res");
                  return;
                }
                if (It !== Ha) {
                  le("Mots de passe diff\xE9rents");
                  return;
                }
                le("");
                try {
                  let x = await Ii.signUp(Ce.patient_email, It, {
                    prenom: (Ce.patient_name || "").split(" ")[0] || "",
                    nom: (Ce.patient_name || "").split(" ").slice(1).join(" ") || "",
                    tel: Ce.patient_tel || ""
                  });
                  if (x.error || x.msg) {
                    le(x.error?.message || x.msg || "Erreur");
                    return;
                  }
                  x.user?.id && (await X.patch("appointments", Ce.id, {
                    patient_id: x.user.id
                  }, j)), Wt("done");
                } catch {
                  le("Erreur r\xE9seau");
                }
              },
              style: {
                flex: 2
              },
              children: "\u2192 Cr\xE9er"
            }), _jsx(ot, {
              onClick: () => Wt("skip"),
              style: {
                flex: 1
              },
              children: "Annuler"
            })]
          })]
        })]
      })]
    })
  }) : _jsxs("div", {
    children: [Ne && _jsx(td, {
      onClose: () => De(!1)
    }), _jsxs("div", {
      style: {
        background: `linear-gradient(135deg,${z},${q})`,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10
      },
      children: [_jsxs("div", {
        onClick: t,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer"
        },
        title: "\u2190 Retour \xE0 l'accueil",
        children: [_jsx("span", {
          style: {
            fontSize: 18
          },
          children: "\u2697\uFE0F"
        }), _jsx("span", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 13,
            color: "#fff",
            fontWeight: 700
          },
          children: "VITASCIENZELAB"
        })]
      }), _jsx("span", {
        style: {
          color: "rgba(255,255,255,.4)",
          marginLeft: 4
        },
        children: "\xB7"
      }), _jsx("span", {
        style: {
          fontSize: 11,
          color: "rgba(255,255,255,.6)"
        },
        children: "R\xE9servation"
      })]
    }), _jsx("div", {
      style: {
        background: "#fff",
        borderBottom: "1px solid #E3F0FF",
        padding: "0 20px"
      },
      children: _jsx("div", {
        style: {
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          padding: "12px 0",
          overflowX: "auto",
          gap: 0
        },
        children: Lu.map((x, U) => _jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            flex: U < Lu.length - 1 ? 1 : "none"
          },
          children: [_jsxs("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              flexShrink: 0
            },
            children: [_jsx("div", {
              style: {
                width: 26,
                height: 26,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: U < n || U === n ? q : "#E3F0FF",
                color: U <= n ? "#fff" : "#90A4AE",
                fontSize: 11,
                fontWeight: 700
              },
              children: U < n ? "\u2713" : U + 1
            }), _jsx("span", {
              style: {
                fontSize: 9,
                color: U <= n ? q : "#90A4AE",
                fontWeight: U === n ? 700 : 400,
                whiteSpace: "nowrap"
              },
              children: x
            })]
          }), U < Lu.length - 1 && _jsx("div", {
            style: {
              flex: 1,
              height: 2,
              background: U < n ? q : "#E3F0FF",
              margin: "0 4px 16px",
              minWidth: 8
            }
          })]
        }, x))
      })
    }), _jsxs("div", {
      style: {
        maxWidth: 800,
        margin: "0 auto",
        padding: "28px 20px 80px"
      },
      children: [n === 0 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Choisissez votre s\xE9ance"
        }), _jsxs("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: [ye.owner, " \xB7 ", ye.role]
        }), _jsx("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 12
          },
          children: $l.map(x => _jsxs("div", {
            onClick: () => {
              i(x), l(1);
            },
            style: {
              background: "#fff",
              borderRadius: 16,
              padding: "20px 22px",
              border: `2px solid ${a?.id === x.id ? q : V}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 2px 12px rgba(21,101,192,.06)",
              transition: "all .2s"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 32,
                minWidth: 40,
                textAlign: "center"
              },
              children: x.icon
            }), _jsxs("div", {
              style: {
                flex: 1
              },
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 4,
                  flexWrap: "wrap"
                },
                children: [_jsx("span", {
                  style: {
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 17,
                    color: z
                  },
                  children: x.title
                }), _jsx(We, {
                  children: x.dur
                })]
              }), _jsx("p", {
                style: {
                  color: "#90A4AE",
                  fontSize: 12,
                  lineHeight: 1.5
                },
                children: x.desc
              })]
            }), _jsx("span", {
              style: {
                color: q,
                fontSize: 20
              },
              children: "\u203A"
            })]
          }, x.id))
        })]
      }), n === 1 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Choisissez une date"
        }), _jsxs("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: [a?.title, " \xB7 Les dimanches ne sont pas disponibles"]
        }), _jsx(_g, {
          selected: u,
          blocked: m,
          onSelect: x => {
            s(x), v("");
          }
        }), u && _jsxs("div", {
          style: {
            marginTop: 12,
            background: V,
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 14,
            fontWeight: 600,
            color: z
          },
          children: ["\u{1F4C5} ", vt(u)]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 12
          },
          children: [_jsx(ot, {
            onClick: () => l(0),
            children: "\u2190 Retour"
          }), _jsx(ze, {
            onClick: () => l(2),
            disabled: !u,
            style: {
              opacity: u ? 1 : 0.4
            },
            children: "Continuer \u2192"
          })]
        })]
      }), n === 2 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Choisissez un cr\xE9neau"
        }), _jsxs("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: [vt(u), " \xB7 ", a?.dur]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 22,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsx("p", {
            style: {
              color: q,
              fontWeight: 700,
              fontSize: 11,
              marginBottom: 14,
              letterSpacing: 1
            },
            children: "\u{1F550} Cr\xE9neaux disponibles \xB7 12h00 \u2013 19h00 \xB7 Lundi au Samedi"
          }), _jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 8,
              marginBottom: 16
            },
            children: Je.map(x => {
              let U = yn[a?.id] || 60,
                re = Math.ceil(U / 30),
                rt = Je.indexOf(x),
                bl = (Array.isArray(Q) ? Q.filter(en => en.rdv_date === u && en.status === "confirmed") : []).some(en => {
                  let mn = Je.indexOf(en.slot),
                    La = yn[en.service_id] || 60,
                    yt = Math.ceil(La / 30);
                  return rt >= mn && rt < mn + yt || rt < mn && rt + re > mn;
                }),
                wn = rt + re <= Je.length,
                Yl = Array.isArray(m) && m.some(en => en.blocked_date === u && en.slot === x),
                Fn = bl || !wn || Yl;
              return _jsxs("button", {
                onClick: () => !Fn && v(x),
                style: {
                  padding: "12px 6px",
                  borderRadius: 10,
                  border: `2px solid ${r === x ? q : Fn ? "#ECEFF1" : V}`,
                  background: r === x ? q : Fn ? "#F5F5F5" : "#fff",
                  color: r === x ? "#fff" : Fn ? "#BDBDBD" : z,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: Fn ? "not-allowed" : "pointer",
                  position: "relative"
                },
                children: [x, Fn && _jsx("span", {
                  style: {
                    fontSize: 8,
                    display: "block",
                    color: "#BDBDBD"
                  },
                  children: "Indispo."
                })]
              }, x);
            })
          }), a?.id === "suivi" && _jsxs("div", {
            style: {
              marginTop: 16,
              padding: "14px 16px",
              background: "#FFF8E1",
              borderRadius: 10,
              display: "flex",
              gap: 10,
              alignItems: "flex-start"
            },
            children: [_jsx("input", {
              type: "checkbox",
              id: "rec",
              checked: h,
              onChange: x => w(x.target.checked),
              style: {
                marginTop: 3,
                accentColor: q,
                width: 16,
                height: 16,
                flexShrink: 0
              }
            }), _jsxs("label", {
              htmlFor: "rec",
              style: {
                fontSize: 13,
                color: "#E65100",
                lineHeight: 1.6,
                cursor: "pointer"
              },
              children: ["\u{1F501} ", _jsx("strong", {
                children: "Programmer un suivi mensuel"
              }), " \u2014 M\xEAme cr\xE9neau chaque mois pour un accompagnement r\xE9gulier"]
            })]
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 12
          },
          children: [_jsx(ot, {
            onClick: () => l(1),
            children: "\u2190 Retour"
          }), _jsx(ze, {
            onClick: () => l(3),
            disabled: !r,
            style: {
              opacity: r ? 1 : 0.4
            },
            children: "Continuer \u2192"
          })]
        })]
      }), n === 3 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Liste de vos traitements en cours"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: "Facultatif \u2014 Uniquement pour pr\xE9venir les interactions avec nos plantes et compl\xE9ments"
        }), _jsxs("div", {
          style: {
            background: "#E8F5E9",
            border: "1px solid #A5D6A7",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 16,
            display: "flex",
            gap: 12
          },
          children: [_jsx("span", {
            children: "\u{1F4A1}"
          }), _jsxs("p", {
            style: {
              fontSize: 13,
              color: "#2E7D32",
              lineHeight: 1.6,
              margin: 0
            },
            children: ["Si vous prenez des m\xE9dicaments ou des compl\xE9ments alimentaires, vous pouvez nous transmettre leur liste. Cette information est recueillie ", _jsx("strong", {
              children: "uniquement pour v\xE9rifier l'absence d'interactions connues"
            }), " avec les plantes m\xE9dicinales et nutraceutiques que nous proposons. Aucune interpr\xE9tation m\xE9dicale n'est r\xE9alis\xE9e."]
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 18
            },
            children: [["\u{1F48A}", "Liste de vos m\xE9dicaments en cours"], ["\u{1F33F}", "Compl\xE9ments alimentaires actuels"], ["\u{1F4C4}", "Liste de vos plantes / huiles essentielles"], ["\u{1F4CB}", "Tout document utile \xE0 votre suivi bien-\xEAtre"]].map(([x, U]) => _jsxs("div", {
              style: {
                background: "#F8FAFF",
                borderRadius: 10,
                padding: "12px 14px",
                border: `1px solid ${V}`,
                display: "flex",
                gap: 10,
                alignItems: "center"
              },
              children: [_jsx("span", {
                style: {
                  fontSize: 20
                },
                children: x
              }), _jsx("span", {
                style: {
                  fontSize: 12,
                  fontWeight: 600,
                  color: z
                },
                children: U
              })]
            }, U))
          }), _jsx("input", {
            type: "file",
            ref: vl,
            onChange: x => {
              Array.from(x.target.files).forEach(re => {
                let rt = new FileReader();
                rt.onload = wt => {
                  E(bl => [...bl, {
                    name: re.name,
                    size: re.size,
                    type: re.type,
                    data: wt.target.result
                  }]);
                }, rt.readAsDataURL(re);
              }), vl.current.value = "";
            },
            multiple: !0,
            accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx",
            style: {
              display: "none"
            }
          }), _jsx(ot, {
            onClick: () => vl.current.click(),
            style: {
              width: "100%",
              padding: 13
            },
            children: "\u{1F4CE} Ajouter un document (liste de traitements\u2026)"
          }), _jsx("p", {
            style: {
              fontSize: 11,
              color: "#90A4AE",
              textAlign: "center",
              marginTop: 8
            },
            children: "PDF, JPG, PNG, Word accept\xE9s \u2014 Ces documents ne sont pas analys\xE9s m\xE9dicalement"
          }), S.length > 0 && _jsxs("div", {
            style: {
              marginTop: 14
            },
            children: [_jsxs("p", {
              style: {
                fontSize: 12,
                fontWeight: 600,
                color: z,
                marginBottom: 8
              },
              children: ["\u2705 ", S.length, " document", S.length > 1 ? "s" : "", " charg\xE9", S.length > 1 ? "s" : "", " :"]
            }), S.map((x, U) => _jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#E8F5E9",
                borderRadius: 8,
                padding: "9px 12px",
                marginBottom: 8,
                border: "1px solid #A5D6A7"
              },
              children: [_jsx("span", {
                style: {
                  fontSize: 18
                },
                children: x.type?.includes("image") ? "\u{1F5BC}\uFE0F" : x.type?.includes("pdf") ? "\u{1F4D5}" : "\u{1F4C4}"
              }), _jsxs("div", {
                style: {
                  flex: 1
                },
                children: [_jsx("div", {
                  style: {
                    fontSize: 12,
                    color: "#2E7D32",
                    fontWeight: 600,
                    wordBreak: "break-all"
                  },
                  children: x.name
                }), _jsx("div", {
                  style: {
                    fontSize: 10,
                    color: "#78909C"
                  },
                  children: x.size ? `${Math.round(x.size / 1024)} Ko` : ""
                })]
              }), _jsx("button", {
                onClick: () => E(re => re.filter((rt, wt) => wt !== U)),
                style: {
                  background: "none",
                  border: "none",
                  color: "#E53935",
                  fontSize: 20,
                  cursor: "pointer",
                  lineHeight: 1
                },
                children: "\xD7"
              })]
            }, U))]
          })]
        }), _jsx("div", {
          style: {
            background: "#FFF9E6",
            border: "1px solid #FFE082",
            borderRadius: 10,
            padding: "12px 14px",
            marginTop: 14,
            fontSize: 12,
            color: "#F57F17",
            lineHeight: 1.6
          },
          children: "\u2139\uFE0F Cette \xE9tape est enti\xE8rement facultative. Vous pouvez \xE9galement communiquer verbalement la liste de vos traitements lors de la s\xE9ance. Ces informations servent exclusivement \xE0 adapter notre s\xE9lection de compl\xE9ments alimentaires et ne font l'objet d'aucune analyse m\xE9dicale ou biologique."
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            marginTop: 14,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 6
            },
            children: "\u{1F48A} Vos compl\xE9ments actuels (optionnel)"
          }), _jsx("p", {
            style: {
              fontSize: 12,
              color: "#78909C",
              marginBottom: 12
            },
            children: "Saisissez directement vos compl\xE9ments alimentaires, m\xE9dicaments ou plantes en cours. Cela nous permet uniquement de v\xE9rifier l'absence d'interactions."
          }), _jsx("div", {
            style: {
              marginBottom: 8
            },
            children: (B.supplements || []).map((x, U) => _jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#E8F0FE",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 6
              },
              children: [_jsx("span", {
                style: {
                  fontSize: 16
                },
                children: "\u{1F48A}"
              }), _jsx("span", {
                style: {
                  flex: 1,
                  fontSize: 13,
                  color: z,
                  fontWeight: 500
                },
                children: x
              }), _jsx("button", {
                onClick: () => M(re => ({
                  ...re,
                  supplements: (re.supplements || []).filter((rt, wt) => wt !== U)
                })),
                style: {
                  background: "none",
                  border: "none",
                  color: "#E53935",
                  fontSize: 18,
                  cursor: "pointer"
                },
                children: "\xD7"
              })]
            }, U))
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 8
            },
            children: [_jsx(ut, {
              value: B.suppInput || "",
              onChange: x => M(U => ({
                ...U,
                suppInput: x.target.value
              })),
              onKeyDown: x => {
                x.key === "Enter" && B.suppInput?.trim() && (M(U => ({
                  ...U,
                  supplements: [...(U.supplements || []), U.suppInput.trim()],
                  suppInput: ""
                })), x.preventDefault());
              },
              placeholder: "Ex: Om\xE9ga-3, Magn\xE9sium\u2026 puis Entr\xE9e",
              style: {
                flex: 1
              }
            }), _jsx(ze, {
              onClick: () => {
                B.suppInput?.trim() && M(x => ({
                  ...x,
                  supplements: [...(x.supplements || []), x.suppInput.trim()],
                  suppInput: ""
                }));
              },
              style: {
                padding: "10px 16px",
                fontSize: 13
              },
              children: "+"
            })]
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 12
          },
          children: [_jsx(ot, {
            onClick: () => l(2),
            children: "\u2190 Retour"
          }), _jsx(ze, {
            onClick: () => l(4),
            children: "Continuer \u2192"
          })]
        })]
      }), n === 4 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Vos coordonn\xE9es"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: "Pour recevoir la confirmation et le rappel de votre s\xE9ance"
        }), e && (e.guests || []).length > 0 && _jsxs("div", {
          style: {
            background: "#E8F0FE",
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16
          },
          children: [_jsx("p", {
            style: {
              fontSize: 12,
              fontWeight: 600,
              color: z,
              marginBottom: 8
            },
            children: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467} Pour qui est cette s\xE9ance ?"
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 8,
              flexWrap: "wrap"
            },
            children: [_jsxs("button", {
              onClick: () => M(x => ({
                ...x,
                prenom: e.prenom || "",
                nom: e.nom || ""
              })),
              style: {
                background: !B.prenom || B.prenom === e.prenom && B.nom === e.nom ? "#1565C0" : "#fff",
                color: !B.prenom || B.prenom === e.prenom && B.nom === e.nom ? "#fff" : z,
                border: `1px solid ${V}`,
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: ["\u{1F464} Moi (", e.prenom, ")"]
            }), (e.guests || []).map((x, U) => _jsxs("button", {
              onClick: () => M(re => ({
                ...re,
                prenom: x.name.split(" ")[0] || x.name,
                nom: x.name.split(" ").slice(1).join(" ") || ""
              })),
              style: {
                background: B.prenom === x.name.split(" ")[0] && B.nom === x.name.split(" ").slice(1).join(" ") ? "#1565C0" : "#fff",
                color: B.prenom === x.name.split(" ")[0] && B.nom === x.name.split(" ").slice(1).join(" ") ? "#fff" : z,
                border: `1px solid ${V}`,
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: ["\u{1F464} ", x.name]
            }, U))]
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12
            },
            children: [_jsxs(Ie, {
              label: "Pr\xE9nom *",
              children: [_jsx(ut, {
                value: B.prenom,
                onChange: x => M(U => ({
                  ...U,
                  prenom: x.target.value
                })),
                placeholder: "Marie"
              }), L.prenom && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: L.prenom
              })]
            }), _jsxs(Ie, {
              label: "Nom *",
              children: [_jsx(ut, {
                value: B.nom,
                onChange: x => M(U => ({
                  ...U,
                  nom: x.target.value
                })),
                placeholder: "Dupont"
              }), L.nom && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: L.nom
              })]
            })]
          }), _jsxs(Ie, {
            label: "Email *",
            children: [_jsx(ut, {
              type: "email",
              value: B.email,
              onChange: x => M(U => ({
                ...U,
                email: x.target.value
              })),
              placeholder: "marie@email.com"
            }), L.email && _jsx("span", {
              style: {
                fontSize: 11,
                color: "#E53935"
              },
              children: L.email
            })]
          }), _jsxs(Ie, {
            label: "T\xE9l\xE9phone *",
            children: [_jsx(ut, {
              type: "tel",
              value: B.tel,
              onChange: x => M(U => ({
                ...U,
                tel: x.target.value
              })),
              placeholder: "06 12 34 56 78"
            }), L.tel && _jsx("span", {
              style: {
                fontSize: 11,
                color: "#E53935"
              },
              children: L.tel
            })]
          }), _jsx(Ie, {
            label: "Notes (optionnel)",
            children: _jsx(ut, {
              value: B.notes,
              onChange: x => M(U => ({
                ...U,
                notes: x.target.value
              })),
              placeholder: "Informations compl\xE9mentaires\u2026"
            })
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 20
          },
          children: [_jsx(ot, {
            onClick: () => l(3),
            children: "\u2190 Retour"
          }), _jsx(ze, {
            onClick: () => {
              let x = {};
              B.prenom.trim() || (x.prenom = "Requis"), B.nom.trim() || (x.nom = "Requis"), B.email.match(/^[^@]+@[^@]+\.[^@]+$/) || (x.email = "Email invalide"), B.tel.match(/[\d\s\+\-\.]{8,}/) || (x.tel = "Invalide"), de(x), Object.keys(x).length === 0 && l(5);
            },
            style: {
              flex: 2
            },
            children: "Suivant \u2192"
          })]
        })]
      }), n === 5 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "R\xE9capitulatif & Confirmation"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: "V\xE9rifiez vos informations avant de valider"
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 18,
            padding: 26,
            boxShadow: "0 4px 30px rgba(21,101,192,.10)",
            marginBottom: 16
          },
          children: [_jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingBottom: 16,
              marginBottom: 16,
              borderBottom: `1px solid ${V}`
            },
            children: [_jsx("span", {
              style: {
                fontSize: 34
              },
              children: a?.icon
            }), _jsxs("div", {
              children: [_jsx("div", {
                style: {
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 19,
                  color: z
                },
                children: a?.title
              }), _jsxs("div", {
                style: {
                  color: "#78909C",
                  fontSize: 12
                },
                children: [a?.sub, " \xB7 ", a?.dur, h ? " \xB7 \u{1F501} Mensuel" : ""]
              })]
            })]
          }), [["\u{1F4C5} Date", vt(u)], ["\u{1F550} Heure", r], ["\u{1F464} Nom", `${B.prenom} ${B.nom}`], ["\u{1F4E7} Email", B.email], ["\u{1F4DE} T\xE9l.", B.tel]].map(([x, U]) => _jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "9px 0",
              borderBottom: "1px solid #F0F4FF",
              fontSize: 13
            },
            children: [_jsx("span", {
              style: {
                color: "#78909C"
              },
              children: x
            }), _jsx("span", {
              style: {
                fontWeight: 600,
                color: z
              },
              children: U
            })]
          }, x)), S.length > 0 && _jsx("div", {
            style: {
              paddingTop: 12,
              display: "flex",
              gap: 8,
              flexWrap: "wrap"
            },
            children: S.map((x, U) => _jsxs(We, {
              bg: "#F3E5F5",
              color: "#6A1B9A",
              children: ["\u{1F4CE} ", x.name]
            }, U))
          }), Object.keys(R).length > 0 && _jsxs("div", {
            style: {
              marginTop: 12,
              padding: "10px 12px",
              background: "#F0F4FF",
              borderRadius: 8,
              fontSize: 12,
              color: "#546E7A"
            },
            children: ["\u2705 Formulaire bien-\xEAtre compl\xE9t\xE9 (", Object.keys(R).length, " r\xE9ponses)"]
          })]
        }), _jsxs("div", {
          style: {
            background: "#FFF8E1",
            border: "1px solid #FFD54F",
            borderRadius: 12,
            padding: "14px 16px",
            marginBottom: 14,
            fontSize: 12,
            color: "#BF360C",
            lineHeight: 1.6
          },
          children: ["\u{1F4CE} ", _jsx("strong", {
            children: "Le jour de la s\xE9ance :"
          }), " Si vous le souhaitez, pensez \xE0 noter la liste de vos m\xE9dicaments et compl\xE9ments alimentaires actuels. Non obligatoire \u2014 ces informations nous permettent uniquement d'adapter votre s\xE9lection de compl\xE9ments alimentaires et ne font l'objet d'aucune interpr\xE9tation m\xE9dicale."]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 12,
            padding: "16px 18px",
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 16
          },
          children: [_jsxs("label", {
            style: {
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              cursor: "pointer"
            },
            children: [_jsx("input", {
              type: "checkbox",
              checked: Y,
              onChange: x => O(x.target.checked),
              style: {
                marginTop: 3,
                accentColor: q,
                width: 15,
                height: 15,
                flexShrink: 0
              }
            }), _jsxs("span", {
              style: {
                fontSize: 12,
                color: "#546E7A",
                lineHeight: 1.7
              },
              children: ["J'ai pris connaissance que les s\xE9ances de VITASCIENZELAB sont des ", _jsx("strong", {
                children: "actes de conseil commercial en compl\xE9ments alimentaires"
              }), ", r\xE9alis\xE9s par un sp\xE9cialiste en bien-\xEAtre et biochimie alimentaire. Elles ne constituent en aucun cas un acte m\xE9dical, un diagnostic ou une prescription, et ne remplacent pas l'avis d'un m\xE9decin. J'accepte les", " ", _jsx("button", {
                onClick: x => {
                  x.preventDefault(), De(!0);
                },
                style: {
                  background: "none",
                  border: "none",
                  color: q,
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: 12,
                  padding: 0
                },
                children: "mentions l\xE9gales"
              }), "."]
            })]
          }), L.consent && _jsx("span", {
            style: {
              fontSize: 11,
              color: "#E53935",
              display: "block",
              marginTop: 6
            },
            children: L.consent
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            gap: 12
          },
          children: [_jsx(ot, {
            onClick: () => l(4),
            children: "\u2190 Modifier"
          }), _jsx(ze, {
            onClick: hl,
            disabled: gt,
            style: {
              background: `linear-gradient(135deg,${q},${z})`
            },
            children: gt ? "Enregistrement\u2026" : "\u2713 Confirmer ma s\xE9ance"
          })]
        })]
      })]
    })]
  });
}
function Rg({
  onBack: e
}) {
  let [t, n] = useState(!1),
    [l, a] = useState(""),
    [i, u] = useState(""),
    [s, r] = useState(!1),
    [v, S] = useState(!1),
    [E, g] = useState("agenda"),
    [p, R] = useState([]),
    [k, Q] = useState(null),
    [f, m] = useState(""),
    [d, h] = useState(""),
    [w, B] = useState([]),
    [M, Y] = useState([]),
    [O, L] = useState(null),
    [de, gt] = useState([]),
    [Oe, Ce] = useState([]),
    [yl, qt] = useState([]),
    [Wt, It] = useState(""),
    [Ll, Ha] = useState(0),
    [C, W] = useState(null),
    [le, Ne] = useState("confirm"),
    [De, st] = useState(""),
    [ke, vl] = useState("all"),
    [Ut, ja] = useState({
      blocked_date: "",
      slot: "",
      reason: ""
    }),
    [Pt, hl] = useState(new Date().getMonth()),
    [sendingEmails, setSendingEmails] = useState(!1),
    [x, U] = useState(new Date().getFullYear()),
    [re, rt] = useState("all"),
    [wt, bl] = useState("nom"),
    [wn, Yl] = useState([]),
    [Fn, en] = useState(-1),
    [mn, La] = useState(null),
    [yt, Bu] = useState(!1),
    [_r, Cr] = useState(!1),
    [Ya, Dr] = useState([]),
    [Ga, gn] = useState(""),
    [ie, Ft] = useState({
      prenom: "",
      nom: "",
      email: "",
      tel: "",
      service_id: "conseil",
      rdv_date: "",
      slot: "",
      notes: "",
      recurring: !1
    }),
    [dt, w0] = useState({}),
    [F0, Tr] = useState(!1),
    [Br, Rr] = useState(!1),
    H0 = "VitaAdmin2024",
    Ru = async () => {
      if (ee) {
        l === H0 ? n(!0) : r(!0);
        return;
      }
      if (!i || !l) {
        r(!0);
        return;
      }
      S(!0), r(!1);
      try {
        let c = await Ii.signIn(i, l);
        if (c.error || c.msg || !c.user) {
          r(!0);
        } else {
          activeSessionToken = c.access_token;
          n(!0);
        }
      } catch {
        r(!0);
      }
      S(!1);
    };
  useEffect(() => {
    return () => {
      activeSessionToken = null;
    };
  }, []);
  useEffect(() => {
    if (t) if (ee) {
      R([...ue.appointments]);
      try {
        let localSynced = JSON.parse(localStorage.getItem("gcal_synced_ids") || "[]");
        let syncedIds = ue.appointments.filter(y => y.gcal_event_id || localSynced.includes(y.id)).map(y => y.id);
        Dr(syncedIds);
      } catch (e) {
        console.error("Local mock sync init error:", e);
      }
      let c = {};
      ue.appointments.forEach(y => {
        y.patient_email && !c[y.patient_email] && (c[y.patient_email] = {
          id: y.patient_id || y.patient_email,
          email: y.patient_email,
          prenom: y.patient_name?.split(" ")[0] || "",
          nom: y.patient_name?.split(" ").slice(1).join(" ") || "",
          tel: y.patient_tel || "",
          created_at: y.created_at
        });
      }), B(Object.values(c).filter(y => y.email && y.email.trim() !== "").sort((y, b) => (y.nom || "").localeCompare(b.nom || ""))), Y([...ue.blocked]);
    } else Promise.all([X.get("appointments", "status=neq.archived&order=rdv_date.asc", j), X.get("profiles", "select=id,email,prenom,nom,tel,dob,created_at,guests&order=created_at.desc", j), X.get("blocked_slots", "order=blocked_date.asc", j)]).then(([c, y, b]) => {
      if (Array.isArray(c)) {
        R(c);
        try {
          let localSynced = JSON.parse(localStorage.getItem("gcal_synced_ids") || "[]");
          let syncedIds = c.filter(item => item.gcal_event_id || localSynced.includes(item.id)).map(item => item.id);
          Dr(syncedIds);
        } catch (e) {
          console.error("Local sync init error:", e);
        }
      }
      Array.isArray(b) && Y(b);
      let _ = {},
        G = {};
      Array.isArray(y) && y.forEach(N => {
        if (!N.id || N.email && N.email.toLowerCase() === zg.toLowerCase()) return;
        let K = {
          id: N.id,
          email: N.email || "",
          prenom: N.prenom || "",
          nom: N.nom || "",
          tel: N.tel || "",
          dob: N.dob || "",
          client_files: Array.isArray(N.client_files) ? N.client_files : [],
          client_docs: Array.isArray(N.client_docs) ? N.client_docs : [],
          all_supplements: Array.isArray(N.all_supplements) ? N.all_supplements : [],
          guests: Array.isArray(N.guests) ? N.guests : [],
          created_at: N.created_at,
          has_account: !0
        };
        _[N.id] = K, N.email && (G[N.email.toLowerCase()] = K);
      }), Array.isArray(c) && c.forEach(N => {
        if (!N.patient_email) return;
        let K = N.patient_email.toLowerCase();
        if (N.patient_id && _[N.patient_id]) {
          let P = _[N.patient_id];
          P.email || (P.email = N.patient_email, G[K] = P), P.tel || (P.tel = N.patient_tel || ""), P.prenom || (P.prenom = N.patient_name?.split(" ")[0] || ""), P.nom || (P.nom = N.patient_name?.split(" ").slice(1).join(" ") || "");
        } else if (G[K]) {
          let P = G[K];
          P.tel || (P.tel = N.patient_tel || ""), P.prenom || (P.prenom = N.patient_name?.split(" ")[0] || ""), P.nom || (P.nom = N.patient_name?.split(" ").slice(1).join(" ") || "");
        } else {
          let P = N.patient_id || K;
          if (!_[P]) {
            let Ye = {
              id: N.patient_id || K,
              email: N.patient_email,
              prenom: N.patient_name?.split(" ")[0] || "",
              nom: N.patient_name?.split(" ").slice(1).join(" ") || "",
              tel: N.patient_tel || "",
              created_at: N.created_at,
              has_account: !1
            };
            _[P] = Ye, G[K] = Ye;
          }
        }
      });
      let H = Object.values(_).filter(N => N.prenom || N.nom || N.email).sort((N, K) => (N.nom || N.email || "").localeCompare(K.nom || K.email || ""));
      B(H);
      let F = new Date(Date.now() - 48 * 3600 * 1e3).toISOString();
      return fetch(`${Ge}/rest/v1/admin_notes?created_at=lt.${F}`, {
        method: "DELETE",
        headers: {
          apikey: j,
          Authorization: `Bearer ${j}`,
          Prefer: "return=minimal"
        }
      }).catch(() => {}).then(() => X.get("admin_notes", `created_at=gte.${F}&order=created_at.desc&limit=100`, j));
    }).then(c => {
      if (Array.isArray(c)) {
        let y = c.filter(b => b.note && (b.note.includes("\u{1F4F1}") || b.note.includes("\u270F\uFE0F") || b.note.includes("\u{1F4E7}") || b.note.includes("\u{1F5D1}"))).map(b => ({
          type: "note",
          msg: b.note.split(" \u2014 ")[0] || b.note.slice(0, 50),
          detail: b.note.split(" \u2014 ")[1] || "",
          time: b.created_at ? new Date(b.created_at).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
          }) : "",
          icon: b.note.startsWith("\u{1F4F1}") ? "\u{1F4F1}" : b.note.startsWith("\u{1F5D1}") ? "\u{1F5D1}\uFE0F" : "\u{1F4CB}",
          full: b.note
        }));
        Yl(y);
      }
    }).catch(c => console.error("Admin load error:", c));
  }, [t]);
  let Mr = c => {
      try {
        if (!c) return;
        if (L(c), gt([]), Ce([]), qt([]), ee) gt(ue.appointments.filter(y => c.email ? y.patient_email === c.email : y.patient_id === c.id)), Ce(ue.notes.filter(y => y.patient_id === c.id)), qt(ue.questionnaires.filter(y => c.email ? y.patient_email === c.email : y.patient_id === c.id));else {
          let y = c.email && c.email.trim() !== "",
            b = c.id && !c.id.includes("@") && c.id.length > 20,
            _ = y ? `patient_email=eq.${encodeURIComponent(c.email)}&status=neq.archived&order=rdv_date.desc` : `patient_id=eq.${c.id}&status=neq.archived&order=rdv_date.desc`,
            G = b ? `patient_id=eq.${c.id}&order=created_at.desc` : `patient_id=eq.${c.id}&order=created_at.desc`,
            H = b && y ? `or=(patient_id.eq.${c.id},patient_email.eq.${encodeURIComponent(c.email)})&order=created_at.desc` : y ? `patient_email=eq.${encodeURIComponent(c.email)}&order=created_at.desc` : `patient_id=eq.${c.id}&order=created_at.desc`,
            profParam = b ? `id=eq.${c.id}` : y ? `email=eq.${encodeURIComponent(c.email)}` : null;
          profParam && X.get("profiles", profParam, j).then(async F => {
            if (Array.isArray(F) && F[0]) {
              let targetProf = F[0];
              let files = Array.isArray(targetProf.client_files) ? targetProf.client_files : [];
              let hasNew = files.some(f => f.uploaded_by === "client" && f.is_new_for_admin === true);
              if (hasNew) {
                files = files.map(f => f.uploaded_by === "client" && f.is_new_for_admin === true ? { ...f, is_new_for_admin: false } : f);
                await X.patch("profiles", targetProf.id, { client_files: files }, j).catch(err => console.error("Error marking files read:", err));
                B(prev => prev.map(p => (p.id === targetProf.id || p.email === targetProf.email) ? { ...p, client_files: files } : p));
              }
              L(N => ({
                ...N,
                id: targetProf.id || N.id,
                client_files: files,
                client_docs: Array.isArray(targetProf.client_docs) ? targetProf.client_docs : [],
                all_supplements: Array.isArray(targetProf.all_supplements) ? targetProf.all_supplements : [],
                guests: Array.isArray(targetProf.guests) ? targetProf.guests : [],
                has_account: true
              }));
            }
          }).catch(() => {}), Promise.all([X.get("appointments", _, j), X.get("admin_notes", G, j), X.get("questionnaires", H, j)]).then(([F, N, K]) => {
            if (Array.isArray(F)) {
              let P = new Date(),
                Ye = F.filter(D => {
                  if (D.status !== "confirmed") return !1;
                  let He = yn[D.service_id] || 60,
                    [$, Xe] = (D.slot || "00:00").split(":").map(Number),
                    $e = new Date(`${D.rdv_date}T${String($).padStart(2, "0")}:${String(Xe).padStart(2, "0")}:00`);
                  return $e.setMinutes($e.getMinutes() + He), $e < P;
                });
              Ye.forEach(D => X.patch("appointments", D.id, {
                status: "completed"
              }, j).catch(() => {}));
              let Ht = F.map(D => Ye.find(He => He.id === D.id) ? {
                ...D,
                status: "completed"
              } : D);
              gt(Ht);
            }
            Array.isArray(N) && Ce(N), Array.isArray(K) && qt(K);
          }).catch(F => console.error("Fiche patient erreur:", F));
        }
        g("fiche");
      } catch (y) {
        console.error("openPat error:", y), g("fiche");
      }
    },
    j0 = async () => {
      if (!Wt.trim()) return;
      let c = {
        id: Ln(),
        patient_id: O.id,
        note: Wt,
        created_at: it(0)
      };
      ee ? ue.notes.push(c) : await X.post("admin_notes", c, j), Ce(y => [c, ...y]), It("");
    },
    Mu = async c => {
      if (await jn(c.patient_email, "\u23F0 Rappel \u2014 Votre s\xE9ance VITASCIENZELAB est dans 48h", Ji(c, "48h")), ee) {
        let y = ue.appointments.find(b => b.id === c.id);
        y && (y.reminder_sent = !0);
      } else await X.patch("appointments", c.id, {
        reminder_sent: !0
      }, j);
      R(y => y.map(b => b.id === c.id ? {
        ...b,
        reminder_sent: !0
      } : b)), Yl(y => [{
        type: "reminder_sent",
        msg: `Rappel 48h envoy\xE9 \xE0 ${c.patient_name}`,
        detail: `${c.service_title} \u2014 ${Ke(c.rdv_date)} \xE0 ${c.slot}`,
        time: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit"
        }),
        icon: "\u{1F4E7}"
      }, ...y.slice(0, 49)]);
    };
  useEffect(() => {
    if (!t || ee) return;
    let c = async () => {
      let b = p.filter(tn);
      for (let _ of b) await Mu(_);
    };
    c();
    let y = setInterval(c, 36e5);
    return () => clearInterval(y);
  }, [t, p.length]);
  let L0 = async () => {
      if (!Ut.blocked_date) return;
      let c = {
        blocked_date: Ut.blocked_date,
        slot: Ut.slot || null,
        reason: Ut.reason || ""
      };
      if (ee) ue.blocked.push({
        ...c,
        id: Ln()
      }), Y(y => [...y, {
        ...c,
        id: Ln()
      }]);else {
        let y = await X.post("blocked_slots", c, j);
        if (y?.code) {
          alert("Erreur: " + (y.message || JSON.stringify(y)));
          return;
        }
        let b = Array.isArray(y) ? y[0] : y;
        Y(_ => [..._, {
          ...c,
          id: b?.id || Ln()
        }]);
      }
      ja({
        blocked_date: "",
        slot: "",
        reason: ""
      });
    },
    Y0 = c => {
      ee ? ue.blocked = ue.blocked.filter(y => y.id !== c) : X.del("blocked_slots", c, j), Y(y => y.filter(b => b.id !== c));
    },
    G0 = () => new Promise(c => {
      if (window.google?.accounts) {
        c();
        return;
      }
      let y = document.createElement("script");
      y.src = "https://accounts.google.com/gsi/client", y.onload = c, document.head.appendChild(y);
    }),
    V0 = (c, y) => {
      let [b, _] = y.split(":").map(Number),
        G = new Date(c + "T00:00:00");
      return G.setHours(b, _, 0, 0), G.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    },
    Or = c => {
      let b = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//VITASCIENZELAB//FR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", ...c.map(F => {
          let N = yn[F.service_id] || 45,
            K = V0(F.rdv_date, F.slot),
            [P, Ye] = F.slot.split(":").map(Number),
            Ht = new Date(F.rdv_date + "T00:00:00");
          Ht.setHours(P, Ye + N, 0, 0);
          let D = Ht.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
          return ["BEGIN:VEVENT", `UID:${F.id}@vitascienzelab.fr`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`, `DTSTART:${K}`, `DTEND:${D}`, `SUMMARY:${F.service_icon} ${F.patient_name} \u2014 ${F.service_title}`, "LOCATION:9 Rue du Champ Pile, 10320 Bouilly (Aube)", `DESCRIPTION:Patient : ${F.patient_name}
Email : ${F.patient_email}
T\xE9l : ${F.patient_tel}
Notes : ${F.notes || "\u2014"}
R\xE9f : ${F.id}`, "BEGIN:VALARM", "TRIGGER:-PT24H", "ACTION:DISPLAY", "DESCRIPTION:Rappel s\xE9ance demain", "END:VALARM", "END:VEVENT"].join(`\r
`);
        }), "END:VCALENDAR"].join(`\r
`),
        _ = new Blob([b], {
          type: "text/calendar;charset=utf-8"
        }),
        G = URL.createObjectURL(_),
        H = document.createElement("a");
      H.href = G, H.download = "vitascienzelab-seances.ics", H.click(), URL.revokeObjectURL(G);
    },
    Q0 = async () => {
      gn("");
      try {
        await G0(), window.google.accounts.oauth2.initTokenClient({
          client_id: Sg,
          scope: xg,
          callback: y => {
            if (y.error) {
              gn("Connexion Google refus\xE9e : " + y.error);
              return;
            }
            La(y.access_token), Bu(!0);
          }
        }).requestAccessToken();
      } catch {
        gn("Erreur lors de la connexion Google.");
      }
    },
    Z0 = c => {
      let y = yn[c.service_id] || 45,
        [b, _] = c.slot.split(":").map(Number),
        G = new Date(c.rdv_date + "T00:00:00");
      G.setHours(b, _, 0, 0);
      let H = new Date(G.getTime() + y * 6e4);
      return {
        summary: `${c.service_icon} ${c.patient_name} \u2014 ${c.service_title}`,
        location: "9 Rue du Champ Pile, 10320 Bouilly (Aube)",
        description: `Patient : ${c.patient_name}
Email : ${c.patient_email}
T\xE9l : ${c.patient_tel}
Notes : ${c.notes || "\u2014"}

R\xE9f. : ${c.id}

Secr\xE9tariat VITASCIENZELAB \u2013 Herboristerie Champenoise`,
        start: {
          dateTime: G.toISOString(),
          timeZone: "Europe/Paris"
        },
        end: {
          dateTime: H.toISOString(),
          timeZone: "Europe/Paris"
        },
        colorId: c.service_id === "conseil" ? "1" : c.service_id === "suivi" ? "2" : "6",
        reminders: {
          useDefault: !1,
          overrides: [{
            method: "email",
            minutes: 1440
          }, {
            method: "popup",
            minutes: 60
          }]
        }
      };
    },
    Ou = async c => {
      if (!mn) return gn("Connectez d'abord votre Google Agenda."), !1;
      try {
        let y = await fetch(Eg, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${mn}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(Z0(c))
        });
        if (y.ok) {
          try {
            const eventData = await y.json();
            const gcalEventId = eventData.id || "synced";
            try {
              let localSynced = JSON.parse(localStorage.getItem("gcal_synced_ids") || "[]");
              if (!localSynced.includes(c.id)) {
                localSynced.push(c.id);
                localStorage.setItem("gcal_synced_ids", JSON.stringify(localSynced));
              }
            } catch (err) {
              console.error("Local storage sync save error:", err);
            }
            if (!ee) {
              await X.patch("appointments", c.id, {
                gcal_event_id: gcalEventId
              }, j).catch(err => {
                console.error("Supabase patch error:", err);
              });
            } else {
              let appt = ue.appointments.find(item => item.id === c.id);
              if (appt) appt.gcal_event_id = gcalEventId;
            }
            R(prev => prev.map(item => item.id === c.id ? { ...item, gcal_event_id: gcalEventId } : item));
            gt(prev => prev.map(item => item.id === c.id ? { ...item, gcal_event_id: gcalEventId } : item));
          } catch (e) {
            console.error("Error processing GCal response:", e);
          }
          Dr(_ => [..._, c.id]);
          return !0;
        } else {
          let errBody = await y.json().catch(() => ({}));
          if (errBody.error?.code === 401) {
            Bu(!1);
            La(null);
            gn("Session Google expirée. Reconnectez-vous.");
          }
          return !1;
        }
      } catch {
        return gn("Erreur réseau Google Calendar."), !1;
      }
    },
    X0 = async () => {
      if (!mn) {
        gn("Connectez d'abord votre Google Agenda.");
        return;
      }
      Cr(!0), gn("");
      let c = p.filter(b => !at(b) && b.status === "confirmed" && !Ya.includes(b.id)),
        y = 0;
      for (let b of c) (await Ou(b)) && y++;
      Cr(!1), y > 0 && gn(`\u2705 ${y} s\xE9ance${y > 1 ? "s" : ""} synchronis\xE9e${y > 1 ? "s" : ""} !`);
    },
    $0 = async () => {
      let c = {};
      if (ie.prenom.trim() || (c.prenom = "Requis"), ie.nom.trim() || (c.nom = "Requis"), ie.rdv_date || (c.rdv_date = "Requis"), ie.slot || (c.slot = "Requis"), !ie.email.match(/^[^@]+@[^@]+\.[^@]+$/) && ie.email && (c.email = "Email invalide"), w0(c), Object.keys(c).length > 0) return;
      Rr(!0);
      let y = $l.find(_ => _.id === ie.service_id),
        b = {
          id: ed(),
          patient_id: null,
          patient_name: `${ie.prenom} ${ie.nom}`,
          patient_email: ie.email || "\u2014",
          patient_tel: ie.tel || "\u2014",
          service_id: y.id,
          service_title: y.title,
          service_icon: y.icon,
          service_dur: y.dur,
          rdv_date: ie.rdv_date,
          slot: ie.slot,
          status: "confirmed",
          notes: ie.notes,
          location: ie.location || "",
          recurring: ie.recurring,
          docs: [],
          reminder_sent: !1,
          created_at: new Date().toISOString()
        };
      try {
        if (ee) ue.appointments.push(b);else {
          let _ = {
            ...b
          };
          delete _.docs_data;
          let G = await X.post("appointments", _, j);
          (G?.error || G?.code) && console.error("Erreur Supabase manual RDV:", G);
        }
        if (R(_ => [..._, b]), !w.find(_ => _.email === b.patient_email)) {
          let _ = {
            id: b.patient_id || b.patient_email,
            email: b.patient_email,
            prenom: ie.prenom,
            nom: ie.nom,
            tel: ie.tel,
            created_at: new Date().toISOString(),
            has_account: !1
          };
          B(G => [...G, _].sort((H, F) => (H.nom || "").localeCompare(F.nom || "")));
        }
        Yl(_ => [{
          type: "rdv_added",
          msg: `S\xE9ance ajout\xE9e pour ${b.patient_name}`,
          detail: `${b.service_title} \u2014 ${Ke(b.rdv_date)} \xE0 ${b.slot}`,
          time: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
          }),
          icon: "\u270F\uFE0F"
        }, ..._.slice(0, 49)]), Tr(!0), Ft({
          prenom: "",
          nom: "",
          email: "",
          tel: "",
          service_id: "conseil",
          rdv_date: "",
          slot: "",
          notes: "",
          location: "",
          recurring: !1
        }), setTimeout(() => Tr(!1), 4e3), b.patient_email && b.patient_email !== "\u2014" && (await jn(b.patient_email, "\u2705 Votre s\xE9ance est confirm\xE9e \u2014 VITASCIENZELAB", Ji(b, "confirm")));
      } catch (_) {
        console.error(_);
      }
      Rr(!1);
    },
    Nr = async c => {
      if (!c || !c.email || c.email.trim() === "") {
        alert("Impossible de supprimer ce client : email manquant.");
        return;
      }
      let y = `${c.prenom || ""} ${c.nom || ""}`.trim() || c.email;
      if (window.confirm(`Supprimer d\xE9finitivement le client "${y}" ?

Toutes ses s\xE9ances et notes seront aussi supprim\xE9es.

Cette action est irr\xE9versible.`)) try {
        let b = c.email.trim();
        ee ? (ue.appointments = ue.appointments.filter(_ => _.patient_email !== b), ue.notes = ue.notes.filter(_ => _.patient_id !== c.id), ue.questionnaires = ue.questionnaires.filter(_ => _.patient_email !== b)) : (await fetch(`${Ge}/rest/v1/appointments?patient_email=eq.${encodeURIComponent(b)}`, {
          method: "DELETE",
          headers: {
            apikey: j,
            Authorization: `Bearer ${j}`,
            Prefer: "return=minimal"
          }
        }), await fetch(`${Ge}/rest/v1/admin_notes?patient_id=eq.${c.id}`, {
          method: "DELETE",
          headers: {
            apikey: j,
            Authorization: `Bearer ${j}`,
            Prefer: "return=minimal"
          }
        }), await fetch(`${Ge}/rest/v1/questionnaires?patient_email=eq.${encodeURIComponent(b)}`, {
          method: "DELETE",
          headers: {
            apikey: j,
            Authorization: `Bearer ${j}`,
            Prefer: "return=minimal"
          }
        }), c.id ? await fetch(`${Ge}/rest/v1/profiles?id=eq.${c.id}`, {
          method: "DELETE",
          headers: {
            apikey: j,
            Authorization: `Bearer ${j}`,
            Prefer: "return=minimal"
          }
        }) : await fetch(`${Ge}/rest/v1/profiles?email=eq.${encodeURIComponent(b)}`, {
          method: "DELETE",
          headers: {
            apikey: j,
            Authorization: `Bearer ${j}`,
            Prefer: "return=minimal"
          }
        })), R(_ => _.filter(G => G.patient_email !== b)), B(_ => _.filter(G => G.email !== b)), Yl(_ => [{
          type: "patient_deleted",
          msg: `Client supprim\xE9 : ${y}`,
          detail: b,
          time: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
          }),
          icon: "\u{1F5D1}\uFE0F"
        }, ..._.slice(0, 49)]), E === "fiche" && (g("clients"), L(null));
      } catch (b) {
        console.error("Erreur suppression patient:", b), alert("Erreur lors de la suppression. R\xE9essayez.");
      }
    },
    kr = async c => {
      if (window.confirm(`Supprimer le RDV de ${c.patient_name} (${Ke(c.rdv_date)} \xE0 ${c.slot}) ?

Les documents transmis seront conserv\xE9s sur la fiche client.`)) try {
        if ((c.docs_data || []).length > 0 && O?.id && O.id.length > 20) {
          let y = [...(O.historical_docs || []), ...(c.docs_data || []).map(b => ({
            ...b,
            from_rdv: c.rdv_date,
            from_slot: c.slot,
            from_name: c.patient_name
          }))];
          await X.patch("profiles", O.id, {
            historical_docs: y
          }, j).catch(() => {}), L(b => ({
            ...b,
            historical_docs: y
          }));
        }
        if (c.gcal_event_id) {
          try {
            let localSynced = JSON.parse(localStorage.getItem("gcal_synced_ids") || "[]");
            localSynced = localSynced.filter(id => id !== c.id);
            localStorage.setItem("gcal_synced_ids", JSON.stringify(localSynced));
          } catch (e) {
            console.error("Local storage delete sync error:", e);
          }
          if (mn) {
            try {
              await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${c.gcal_event_id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${mn}`
                }
              });
            } catch (gcalErr) {
              console.error("GCal delete error:", gcalErr);
            }
          }
        }
        ee ? ue.appointments = ue.appointments.filter(y => y.id !== c.id) : await fetch(`${Ge}/rest/v1/appointments?id=eq.${c.id}`, {
          method: "DELETE",
          headers: {
            apikey: j,
            Authorization: `Bearer ${j}`,
            Prefer: "return=minimal"
          }
        }), R(y => y.filter(b => b.id !== c.id)), gt(y => y.filter(b => b.id !== c.id));
      } catch (y) {
        console.error(y);
      }
    },
    Gl = p.filter(tn),
    qr = p.filter(c => {
      if (ke === "upcoming") return !at(c) && c.status === "confirmed";
      if (ke === "today") {
        let y = Qu(c.rdv_date, c.slot);
        return y !== null && y >= 0 && y < 24;
      }
      return ke === "past" ? at(c) && c.status === "confirmed" : ke === "reminder" ? tn(c) : ke === "cancelled" ? c.status === "cancelled" : c.status !== "archived";
    }).filter(c => !De || `${c.patient_name} ${c.patient_email}`.toLowerCase().includes(De.toLowerCase())),
    uv = Array.from({
      length: 7
    }, (c, y) => {
      let b = new Date(),
        _ = b.getDay(),
        G = new Date(b);
      G.setDate(b.getDate() - (_ === 0 ? 6 : _ - 1) + Ll * 7);
      let H = new Date(G);
      return H.setDate(G.getDate() + y), H;
    }),
    Hn = {
      total: p.length,
      upcoming: p.filter(c => !at(c) && c.status === "confirmed").length,
      patients: w.length,
      withDocs: p.filter(c => c.docs?.length > 0).length,
      recurring: p.filter(c => c.recurring).length,
      byService: $l.map(c => ({
        ...c,
        count: p.filter(y => y.service_id === c.id).length
      })),
      monthly: Array.from({
        length: 6
      }, (c, y) => {
        let b = new Date();
        b.setMonth(b.getMonth() - 5 + y);
        let _ = b.toISOString().slice(0, 7);
        return {
          label: Gu[b.getMonth()].slice(0, 3),
          count: p.filter(G => G.rdv_date?.startsWith(_)).length
        };
      })
    };
  if (!t) return _jsxs("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      background: "linear-gradient(180deg,#EBF0FE,#F8FAFF)"
    },
    children: [_jsx("style", {
      children: Yu
    }), _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        padding: 40,
        maxWidth: 380,
        width: "100%",
        boxShadow: "0 8px 40px rgba(21,101,192,.12)",
        textAlign: "center"
      },
      children: [_jsxs("form", {
        onSubmit: c => {
          c.preventDefault(), Ru();
        },
        autoComplete: "on",
        children: [_jsx("div", {
          style: {
            fontSize: 36,
            marginBottom: 12
          },
          children: "\u{1F510}"
        }), _jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            color: z,
            marginBottom: 6
          },
          children: "Espace Administrateur"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 12,
            marginBottom: 22
          },
          children: "VITASCIENZELAB \u2013 Acc\xE8s restreint"
        }), _jsx("input", {
          type: "email",
          autoComplete: "username",
          value: i,
          onChange: c => u(c.target.value),
          onKeyDown: c => c.key === "Enter" && Ru(),
          placeholder: "Email administrateur",
          style: {
            width: "100%",
            border: `2px solid ${s ? "#E53935" : V}`,
            borderRadius: 10,
            padding: "11px 13px",
            fontSize: 13,
            color: z,
            outline: "none",
            marginBottom: 8
          }
        }), _jsx("input", {
          type: "password",
          autoComplete: "current-password",
          value: l,
          onChange: c => a(c.target.value),
          onKeyDown: c => c.key === "Enter" && Ru(),
          placeholder: "Mot de passe",
          style: {
            width: "100%",
            border: `2px solid ${s ? "#E53935" : V}`,
            borderRadius: 10,
            padding: "11px 13px",
            fontSize: 13,
            color: z,
            outline: "none",
            letterSpacing: 4,
            marginBottom: 8
          }
        }), s && _jsx("p", {
          style: {
            color: "#E53935",
            fontSize: 12,
            marginBottom: 8
          },
          children: "Email ou mot de passe incorrect"
        }), _jsx("button", {
          type: "submit",
          disabled: v,
          style: {
            width: "100%",
            background: `linear-gradient(135deg,${q},${z})`,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "13px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 10
          },
          children: v ? "Connexion\u2026" : "Acc\xE9der"
        })]
      }), _jsx(ot, {
        onClick: e,
        style: {
          width: "100%"
        },
        children: "\u2190 Retour"
      })]
    })]
  });
  let newFileNotes = yl.filter(n => n.full && n.full.includes("NOUVEAU FICHIER CLIENT")),
    Ur = p.filter(tn).length,
    newFilesClientsCount = newFileNotes.length || w.filter(c => (c.client_files || []).some(f => f.uploaded_by === "client" && f.is_new_for_admin === true)).length,
    K0 = [["agenda", "\u{1F4C5} Agenda"], ["nouveau", "\u270F\uFE0F Nouveau RDV"], ["gcal", "\u{1F4C6} Google Agenda"], ["rdvs", Ur > 0 ? `\u{1F4CB} S\xE9ances \u{1F534}${Ur}` : "\u{1F4CB} S\xE9ances"], ["clients", newFilesClientsCount > 0 ? `\u{1F465} Clients 🔴${newFilesClientsCount}` : "\u{1F465} Clients"], ["activite", newFileNotes.length > 0 ? `\u26A1 Activit\xE9 📁${newFileNotes.length}` : "\u26A1 Activit\xE9"], ["stats", "\u{1F4CA} Statistiques"], ["dispo", "\u{1F512} Disponibilit\xE9s"]],
    Vl = {
      width: "100%",
      border: `2px solid ${V}`,
      borderRadius: 10,
      padding: "9px 12px",
      fontSize: 12,
      color: z,
      outline: "none"
    };
  return _jsxs("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(180deg,#EBF0FE,#F8FAFF)"
    },
    children: [_jsx("style", {
      children: Yu
    }), k && _jsx("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 20,
          padding: 28,
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,.2)"
        },
        children: [_jsx("h3", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 17,
            color: z,
            marginBottom: 6
          },
          children: "\u270F\uFE0F Modifier le RDV"
        }), _jsxs("p", {
          style: {
            fontSize: 12,
            color: "#78909C",
            marginBottom: 16
          },
          children: [k.patient_name, " \xB7 ", k.service_title]
        }), _jsx(Ie, {
          label: "Nouvelle date *",
          children: _jsx(ut, {
            type: "date",
            value: f,
            onChange: c => m(c.target.value),
            min: new Date().toISOString().split("T")[0]
          })
        }), _jsx(Ie, {
          label: "Nouvel horaire *",
          children: _jsxs("select", {
            value: d,
            onChange: c => h(c.target.value),
            style: {
              width: "100%",
              border: `1px solid ${V}`,
              borderRadius: 8,
              padding: "9px 12px",
              fontSize: 13,
              color: z,
              background: "#fff",
              outline: "none"
            },
            children: [_jsx("option", {
              value: "",
              children: "Choisir un cr\xE9neau"
            }), Je.map(c => _jsx("option", {
              value: c,
              children: c
            }, c))]
          })
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 10,
            marginTop: 16
          },
          children: [_jsx(ot, {
            onClick: () => {
              Q(null), m(""), h("");
            },
            style: {
              flex: 1
            },
            children: "Annuler"
          }), _jsx(ze, {
            onClick: async () => {
              !f || !d || (await X.patch("appointments", k.id, {
                rdv_date: f,
                slot: d
              }, j), R(c => c.map(y => y.id === k.id ? {
                ...y,
                rdv_date: f,
                slot: d
              } : y)), gt(c => c.map(y => y.id === k.id ? {
                ...y,
                rdv_date: f,
                slot: d
              } : y)), jn(k.patient_email, "\u{1F4C5} Votre s\xE9ance a \xE9t\xE9 modifi\xE9e \u2014 VITASCIENZELAB", `<div style="font-family:sans-serif;padding:20px;max-width:500px"><h2 style="color:#1565C0">S\xE9ance modifi\xE9e</h2><p>Bonjour ${k.patient_name?.split(" ")[0] || ""},</p><p>Votre s\xE9ance <strong>${k.service_title}</strong> a \xE9t\xE9 modifi\xE9e :</p><table style="margin:16px 0;font-size:14px"><tr><td style="color:#78909C;padding:4px 12px 4px 0">Nouvelle date</td><td><strong>${vt(f)}</strong></td></tr><tr><td style="color:#78909C;padding:4px 12px 4px 0">Nouvel horaire</td><td><strong>${d}</strong></td></tr></table><p style="color:#546E7A;font-size:12px">VITASCIENZELAB \xB7 SIRET ${ye.siret}</p></div>`).catch(() => {}), Q(null), m(""), h(""));
            },
            style: {
              flex: 2
            },
            children: "\u{1F4BE} Enregistrer + Email"
          })]
        })]
      })
    }), C && _jsx(Cg, {
      rdv: C,
      type: le,
      onClose: () => W(null)
    }), _jsx("div", {
      style: {
        background: `linear-gradient(135deg,${z},${q})`,
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 100
      },
      children: _jsxs("div", {
        style: {
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 0",
          gap: 10,
          flexWrap: "wrap"
        },
        children: [_jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10
          },
          children: [_jsx("div", {
            style: {
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "rgba(255,255,255,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17
            },
            children: "\u2697\uFE0F"
          }), _jsxs("div", {
            children: [_jsx("div", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 14,
                color: "#fff",
                fontWeight: 700
              },
              children: "VITASCIENZELAB"
            }), _jsx("div", {
              style: {
                fontSize: 10,
                color: "rgba(255,255,255,.6)"
              },
              children: "Tableau de bord"
            })]
          })]
        }), _jsx("div", {
          style: {
            display: "flex",
            gap: 5,
            flexWrap: "wrap"
          },
          children: K0.map(([c, y]) => {
            const isClientsTab = c === "clients";
            const showDot = isClientsTab && newFilesClientsCount > 0;
            return _jsxs("button", {
              onClick: () => {
                g(c), L(null);
              },
              style: {
                padding: "6px 12px",
                borderRadius: 7,
                border: `1px solid ${E === c ? "#fff" : "rgba(255,255,255,.25)"}`,
                background: E === c ? "rgba(255,255,255,.25)" : "transparent",
                color: "#fff",
                fontSize: 11,
                fontWeight: E === c ? 700 : 400,
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 4
              },
              children: [
                y,
                showDot && _jsx("span", {
                  style: {
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#FF5252",
                    display: "inline-block",
                    boxShadow: "0 0 6px #FF5252",
                    animation: "pulse-glow 1.5s infinite"
                  }
                })
              ]
            }, c);
          })
        }), _jsx("button", {
          onClick: e,
          style: {
            background: "rgba(255,255,255,.12)",
            border: "1px solid rgba(255,255,255,.3)",
            color: "#fff",
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 11
          },
          children: "\u2190 Site"
        })]
      })
    }), _jsxs("div", {
      style: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: "22px 20px 60px"
      },
      children: [newFileNotes.length > 0 && _jsxs("div", {
        style: {
          background: "linear-gradient(135deg, #E0F2F1, #E8F5E9)",
          border: "1.5px solid #00897B",
          borderRadius: 14,
          padding: "14px 18px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          boxShadow: "0 3px 12px rgba(0,77,64,.08)",
          flexWrap: "wrap"
        },
        children: [
          _jsxs("div", {
            style: { display: "flex", alignItems: "center", gap: 12 },
            children: [
              _jsx("span", { style: { fontSize: 24 }, children: "📁" }),
              _jsxs("div", {
                children: [
                  _jsx("strong", { style: { color: "#004D40", fontSize: 14 }, children: `🔔 ${newFileNotes.length} nouveau(x) document(s) client(s) reçu(s) !` }),
                  _jsx("div", { style: { color: "#00695C", fontSize: 12, marginTop: 2 }, children: newFileNotes[0].full.replace("📁 NOUVEAU FICHIER CLIENT — ", "") })
                ]
              })
            ]
          }),
          _jsx("button", {
            onClick: () => {
              let noteItem = newFileNotes[0];
              let matchedClient = w.find(p => noteItem.patient_id ? p.id === noteItem.patient_id : (p.email && noteItem.full.toLowerCase().includes(p.email.toLowerCase())) || (p.nom && noteItem.full.toLowerCase().includes(p.nom.toLowerCase())));
              if (matchedClient) {
                Mr(matchedClient);
              } else {
                g("activite");
              }
            },
            style: {
              background: "#00695C",
              color: "#fff",
              border: "none",
              padding: "9px 16px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              whiteSpace: "nowrap"
            },
            children: "👁️ Voir le document client"
          })
        ]
      }), Gl.length > 0 && E !== "fiche" && _jsxs("div", {
        style: {
          background: "linear-gradient(135deg,#FFF8E1,#FFF3E0)",
          border: "1px solid #FFB300",
          borderRadius: 14,
          padding: "14px 18px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap"
        },
        children: [_jsx("span", {
          style: {
            fontSize: 22
          },
          children: "\u23F0"
        }), _jsxs("div", {
          style: {
            flex: 1
          },
          children: [_jsxs("div", {
            style: {
              fontWeight: 700,
              color: "#E65100",
              fontSize: 13
            },
            children: ["Rappels 48h \xE0 envoyer (", Gl.length, ")"]
          }), _jsx("div", {
            style: {
              fontSize: 11,
              color: "#BF360C"
            },
            children: Gl.map(c => `${c.patient_name} \u2014 ${Ke(c.rdv_date)} \xE0 ${c.slot}`).join(" \u2022 ")
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [_jsx("button", {
            onClick: () => {
              W(Gl[0]), Ne("48h");
            },
            style: {
              background: "#FF8F00",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 700
            },
            children: "Aper\xE7u email"
          }), _jsx("button", {
            onClick: () => Mu(Gl[0]),
            style: {
              background: "#fff",
              color: "#E65100",
              border: "1px solid #FFB300",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 12
            },
            children: "\u2713 Marqu\xE9 envoy\xE9"
          })]
        })]
      }), E === "nouveau" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24
          },
          children: [_jsx("div", {
            style: {
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `linear-gradient(135deg,${q},${z})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20
            },
            children: "\u270F\uFE0F"
          }), _jsxs("div", {
            children: [_jsx("h3", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 20,
                color: z,
                margin: 0
              },
              children: "Ajouter un rendez-vous manuellement"
            }), _jsx("p", {
              style: {
                fontSize: 12,
                color: "#78909C",
                margin: 0
              },
              children: "Le cr\xE9neau sera automatiquement bloqu\xE9 pour les patients"
            })]
          })]
        }), F0 && _jsxs("div", {
          style: {
            background: "#E8F5E9",
            border: "1px solid #A5D6A7",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12
          },
          children: [_jsx("span", {
            style: {
              fontSize: 22
            },
            children: "\u2705"
          }), _jsx("span", {
            style: {
              fontWeight: 700,
              color: "#2E7D32",
              fontSize: 14
            },
            children: "Rendez-vous ajout\xE9 avec succ\xE8s ! Le cr\xE9neau est maintenant r\xE9serv\xE9."
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 26,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsx("p", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: q,
              letterSpacing: 1,
              marginBottom: 14
            },
            children: "\u{1F464} INFORMATIONS PATIENT"
          }), _jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12
            },
            children: [_jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: "Pr\xE9nom *"
              }), _jsx("input", {
                value: ie.prenom,
                onChange: c => Ft(y => ({
                  ...y,
                  prenom: c.target.value
                })),
                placeholder: "Marie",
                style: {
                  width: "100%",
                  border: `2px solid ${dt.prenom ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              }), dt.prenom && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.prenom
              })]
            }), _jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: "Nom *"
              }), _jsx("input", {
                value: ie.nom,
                onChange: c => Ft(y => ({
                  ...y,
                  nom: c.target.value
                })),
                placeholder: "Dupont",
                style: {
                  width: "100%",
                  border: `2px solid ${dt.nom ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              }), dt.nom && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.nom
              })]
            })]
          }), _jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 20
            },
            children: [_jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: "Email"
              }), _jsx("input", {
                value: ie.email,
                onChange: c => Ft(y => ({
                  ...y,
                  email: c.target.value
                })),
                placeholder: "marie@email.com",
                type: "email",
                style: {
                  width: "100%",
                  border: `2px solid ${dt.email ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              }), dt.email && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.email
              })]
            }), _jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: "T\xE9l\xE9phone"
              }), _jsx("input", {
                value: ie.tel,
                onChange: c => Ft(y => ({
                  ...y,
                  tel: c.target.value
                })),
                placeholder: "06 12 34 56 78",
                style: {
                  width: "100%",
                  border: `2px solid ${V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              })]
            })]
          }), _jsx("p", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: q,
              letterSpacing: 1,
              marginBottom: 14
            },
            children: "\u{1F4C5} S\xC9ANCE"
          }), _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsx("label", {
              style: {
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: z,
                marginBottom: 5
              },
              children: "Type de s\xE9ance *"
            }), _jsx("select", {
              value: ie.service_id,
              onChange: c => Ft(y => ({
                ...y,
                service_id: c.target.value
              })),
              style: {
                width: "100%",
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
                color: z,
                outline: "none",
                background: "#FAFCFF"
              },
              children: $l.map(c => _jsxs("option", {
                value: c.id,
                children: [c.icon, " ", c.title, " (", c.dur, ")"]
              }, c.id))
            })]
          }), _jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12
            },
            children: [_jsxs("div", {
              children: [_jsxs("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: ["Date * ", _jsx("span", {
                  style: {
                    fontWeight: 400,
                    color: "#90A4AE"
                  },
                  children: "(lun.\u2013sam.)"
                })]
              }), _jsx("input", {
                type: "date",
                value: ie.rdv_date,
                onChange: c => Ft(y => ({
                  ...y,
                  rdv_date: c.target.value
                })),
                min: new Date().toISOString().split("T")[0],
                style: {
                  width: "100%",
                  border: `2px solid ${dt.rdv_date ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              }), dt.rdv_date && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.rdv_date
              })]
            }), _jsxs("div", {
              children: [_jsxs("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: ["Cr\xE9neau * ", _jsx("span", {
                  style: {
                    fontWeight: 400,
                    color: "#90A4AE"
                  },
                  children: "(14h\u201319h)"
                })]
              }), _jsxs("select", {
                value: ie.slot,
                onChange: c => Ft(y => ({
                  ...y,
                  slot: c.target.value
                })),
                style: {
                  width: "100%",
                  border: `2px solid ${dt.slot ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none",
                  background: "#FAFCFF"
                },
                children: [_jsx("option", {
                  value: "",
                  children: "-- Choisir --"
                }), Je.map(c => {
                  let y = yn[ie.service_id] || 60,
                    b = Math.ceil(y / 30),
                    _ = Je.indexOf(c),
                    isConflict = p.filter(F => F.rdv_date === ie.rdv_date && F.status === "confirmed").some(F => {
                      let N = Je.indexOf(F.slot),
                        K = yn[F.service_id] || 60,
                        P = Math.ceil(K / 30);
                      return _ >= N && _ < N + P || _ < N && _ + b > N;
                    }),
                    isOverflow = _ + b > Je.length;
                  return _jsxs("option", {
                    value: c,
                    disabled: isOverflow,
                    children: [c, isOverflow ? " — dépasse l'horaire" : isConflict ? " — occupé (double réservation autorisée)" : ""]
                  }, c);
                })]
              }), dt.slot && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.slot
              })]
            })]
          }), ie.rdv_date && _jsxs("div", {
            style: {
              background: "#F8FAFF",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 12,
              border: `1px solid ${V}`
            },
            children: [_jsxs("p", {
              style: {
                fontSize: 11,
                fontWeight: 700,
                color: z,
                marginBottom: 10
              },
              children: ["Vue des cr\xE9neaux \u2014 ", new Date(ie.rdv_date + "T12:00:00").toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long"
              })]
            }), _jsx("div", {
              style: {
                display: "flex",
                gap: 6,
                flexWrap: "wrap"
              },
              children: Je.map(c => {
                let y = yn[ie.service_id] || 60,
                  b = Math.ceil(y / 30),
                  _ = Je.indexOf(c),
                  H = p.filter(K => K.rdv_date === ie.rdv_date && K.status === "confirmed").find(K => {
                    let P = Je.indexOf(K.slot),
                      Ye = yn[K.service_id] || 60,
                      Ht = Math.ceil(Ye / 30);
                    return _ >= P && _ < P + Ht || _ < P && _ + b > P;
                  }),
                  F = _ + b > Je.length;
                return _jsxs("div", {
                  onClick: () => !F && Ft(K => ({
                    ...K,
                    slot: c
                  })),
                  style: {
                    padding: "7px 12px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: F ? "not-allowed" : "pointer",
                    background: ie.slot === c ? q : F ? "#ECEFF1" : H ? "#FFEBEE" : "#E8F0FE",
                    color: ie.slot === c ? "#fff" : F ? "#BDBDBD" : H ? "#C62828" : q,
                    userSelect: "none"
                  },
                  children: [c, H ? ` (${H.patient_name?.split(" ")[0]})` : ""]
                }, c);
              })
            })]
          }), _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsx("label", {
              style: {
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: z,
                marginBottom: 5
              },
              children: "Notes internes"
            }), _jsx("textarea", {
              value: ie.notes,
              onChange: c => Ft(y => ({
                ...y,
                notes: c.target.value
              })),
              placeholder: "Motif du rendez-vous, informations particuli\xE8res\u2026",
              style: {
                width: "100%",
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
                color: z,
                outline: "none",
                minHeight: 70,
                resize: "vertical"
              }
            })]
          }), _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsx("label", {
              style: {
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: z,
                marginBottom: 5
              },
              children: "\u{1F4CD} Lieu du rendez-vous (Optionnel)"
            }), _jsx("input", {
              value: ie.location || "",
              onChange: c => Ft(y => ({
                ...y,
                location: c.target.value
              })),
              placeholder: "Par d\xE9faut : 9 Rue du Champ Pile, 10320 Bouilly (ou rdv \xE0 domicile, point spécifique...)",
              style: {
                width: "100%",
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
                color: z,
                outline: "none"
              }
            })]
          }), _jsxs("div", {
            style: {
              marginBottom: 20,
              padding: "12px 14px",
              background: "#FFF8E1",
              borderRadius: 10,
              display: "flex",
              gap: 10,
              alignItems: "center"
            },
            children: [_jsx("input", {
              type: "checkbox",
              id: "manRec",
              checked: ie.recurring,
              onChange: c => Ft(y => ({
                ...y,
                recurring: c.target.checked
              })),
              style: {
                width: 15,
                height: 15,
                accentColor: q,
                flexShrink: 0
              }
            }), _jsx("label", {
              htmlFor: "manRec",
              style: {
                fontSize: 12,
                color: "#E65100",
                cursor: "pointer"
              },
              children: "\u{1F501} Suivi mensuel r\xE9current \u2014 bloquer le m\xEAme cr\xE9neau chaque mois"
            })]
          }), _jsx("button", {
            onClick: $0,
            disabled: Br,
            style: {
              background: `linear-gradient(135deg,${q},${z})`,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "13px 28px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              width: "100%"
            },
            children: Br ? "Enregistrement\u2026" : "\u2713 Ajouter ce rendez-vous"
          })]
        })]
      }), E === "gcal" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24
          },
          children: [_jsx("div", {
            style: {
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg,#4285F4,#34A853)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22
            },
            children: "\u{1F4C6}"
          }), _jsxs("div", {
            children: [_jsx("h3", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 20,
                color: z,
                margin: 0
              },
              children: "Synchronisation Google Agenda"
            }), _jsx("p", {
              style: {
                fontSize: 12,
                color: "#78909C",
                margin: 0
              },
              children: "Vos s\xE9ances appara\xEEtront directement dans votre Google Calendar"
            })]
          })]
        }), _jsxs("div", {
          style: {
            background: yt ? "#E8F5E9" : "#fff",
            border: `2px solid ${yt ? "#A5D6A7" : V}`,
            borderRadius: 16,
            padding: "22px 24px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14
          },
          children: [_jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 14
            },
            children: [_jsx("div", {
              style: {
                width: 48,
                height: 48,
                borderRadius: 14,
                background: yt ? "#43A047" : "#E0E0E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24
              },
              children: yt ? "\u2705" : "\u{1F517}"
            }), _jsxs("div", {
              children: [_jsx("div", {
                style: {
                  fontWeight: 700,
                  color: yt ? "#2E7D32" : z,
                  fontSize: 15
                },
                children: yt ? "Google Agenda connect\xE9" : "Google Agenda non connect\xE9"
              }), _jsx("div", {
                style: {
                  fontSize: 12,
                  color: "#78909C"
                },
                children: yt ? `${Ya.length} s\xE9ance${Ya.length > 1 ? "s" : ""} synchronis\xE9e${Ya.length > 1 ? "s" : ""}` : "Cliquez pour autoriser l'acc\xE8s \xE0 votre agenda"
              })]
            })]
          }), yt ? _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              flexWrap: "wrap"
            },
            children: [_jsx("button", {
              onClick: X0,
              disabled: _r,
              style: {
                background: "linear-gradient(135deg,#34A853,#2E7D32)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 20px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: _r ? "\u23F3 Sync en cours\u2026" : "\u{1F504} Sync toutes les s\xE9ances \xE0 venir"
            }), _jsx("button", {
              onClick: () => {
                Bu(!1), La(null), Dr([]);
              },
              style: {
                background: "#fff",
                border: "2px solid #FFCDD2",
                color: "#C62828",
                borderRadius: 12,
                padding: "12px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "D\xE9connecter"
            })]
          }) : _jsxs("button", {
            onClick: Q0,
            style: {
              background: "linear-gradient(135deg,#4285F4,#1a73e8)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px 22px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8
            },
            children: [_jsx("span", {
              style: {
                fontSize: 18
              },
              children: "G"
            }), " Connecter Google Agenda"]
          })]
        }), Ga && _jsx("div", {
          style: {
            background: Ga.startsWith("\u2705") ? "#E8F5E9" : "#FFF3E0",
            border: `1px solid ${Ga.startsWith("\u2705") ? "#A5D6A7" : "#FFB300"}`,
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16,
            fontSize: 13,
            color: Ga.startsWith("\u2705") ? "#2E7D32" : "#E65100"
          },
          children: Ga
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 22,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsx("p", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: q,
              letterSpacing: 1,
              marginBottom: 16
            },
            children: "\u{1F4C5} S\xC9ANCES \xC0 VENIR \u2014 \xC9TAT DE SYNCHRONISATION"
          }), p.filter(c => !at(c) && c.status === "confirmed").length === 0 ? _jsx("p", {
            style: {
              color: "#90A4AE",
              fontSize: 13,
              textAlign: "center",
              padding: 20
            },
            children: "Aucune s\xE9ance \xE0 venir."
          }) : p.filter(c => !at(c) && c.status === "confirmed").sort((c, y) => c.rdv_date.localeCompare(y.rdv_date)).map(c => {
            let y = Ya.includes(c.id);
            return _jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #F0F4FF",
                flexWrap: "wrap",
                gap: 10
              },
              children: [_jsxs("div", {
                children: [_jsxs("div", {
                  style: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: z
                  },
                  children: [c.service_icon, " ", c.patient_name]
                }), _jsxs("div", {
                  style: {
                    fontSize: 12,
                    color: "#78909C"
                  },
                  children: ["\u{1F4C5} ", new Date(c.rdv_date + "T12:00:00").toLocaleDateString("fr-FR", {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                  }), " \xB7 \u{1F550} ", c.slot, " \xB7 ", c.service_title]
                })]
              }), _jsx("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                },
                children: y ? _jsx("span", {
                  style: {
                    background: "#E8F5E9",
                    color: "#2E7D32",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 20
                  },
                  children: "\u2713 Dans Google Agenda"
                }) : _jsx("button", {
                  onClick: () => Ou(c),
                  disabled: !yt,
                  style: {
                    background: yt ? "linear-gradient(135deg,#4285F4,#1a73e8)" : "#E0E0E0",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: yt ? "pointer" : "not-allowed"
                  },
                  children: yt ? "Ajouter \xE0 Google" : "Connectez-vous d'abord"
                })
              })]
            }, c.id);
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 22,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)",
            marginTop: 20
          },
          children: [_jsx("p", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: q,
              letterSpacing: 1,
              marginBottom: 16
            },
            children: "\u{1F4E5} EXPORT FICHIER CALENDRIER (.ICS) \u2014 DISPONIBLE MAINTENANT"
          }), _jsxs("p", {
            style: {
              fontSize: 13,
              color: "#546E7A",
              marginBottom: 18,
              lineHeight: 1.6
            },
            children: ["T\xE9l\xE9chargez vos s\xE9ances au format ", _jsx("strong", {
              children: ".ics"
            }), " (compatible Google Agenda, Apple Calendrier, Outlook). Double-cliquez sur le fichier t\xE9l\xE9charg\xE9 et vos s\xE9ances s'importent automatiquement."]
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 12,
              flexWrap: "wrap"
            },
            children: [_jsx("button", {
              onClick: () => Or(p.filter(c => !at(c) && c.status === "confirmed")),
              style: {
                background: `linear-gradient(135deg,${q},${z})`,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 22px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: "\u{1F4E5} T\xE9l\xE9charger toutes les s\xE9ances \xE0 venir"
            }), _jsx("button", {
              onClick: () => Or(p.filter(c => c.status === "confirmed")),
              style: {
                background: "#fff",
                color: q,
                border: `2px solid ${V}`,
                borderRadius: 12,
                padding: "12px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F4E5} T\xE9l\xE9charger tout l'historique"
            })]
          })]
        }), _jsxs("div", {
          style: {
            background: "#E8F0FE",
            borderRadius: 14,
            padding: "18px 20px",
            marginTop: 16
          },
          children: [_jsx("p", {
            style: {
              fontSize: 12,
              color: q,
              fontWeight: 700,
              marginBottom: 8
            },
            children: "\u2139\uFE0F Connexion directe Google (OAuth)"
          }), _jsxs("p", {
            style: {
              fontSize: 12,
              color: "#546E7A",
              lineHeight: 1.7
            },
            children: [`La connexion OAuth directe (bouton "Connecter Google Agenda") fonctionnera automatiquement une fois l'application d\xE9ploy\xE9e sur votre domaine. En attendant, utilisez l'export `, _jsx("strong", {
              children: ".ics"
            }), " ci-dessus \u2014 c'est la m\xE9thode la plus universelle et elle fonctionne partout."]
          })]
        })]
      }), k && _jsx("div", {
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.55)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16
        },
        children: _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 20,
            padding: 28,
            maxWidth: 400,
            width: "100%",
            boxShadow: "0 8px 40px rgba(0,0,0,.15)"
          },
          children: [_jsx("h3", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 17,
              color: z,
              marginBottom: 6
            },
            children: "\u270F\uFE0F Modifier le RDV"
          }), _jsxs("p", {
            style: {
              fontSize: 12,
              color: "#78909C",
              marginBottom: 16
            },
            children: [k.patient_name, " \xB7 ", k.service_title]
          }), _jsx(Ie, {
            label: "Nouvelle date *",
            children: _jsx(ut, {
              type: "date",
              value: f,
              onChange: c => m(c.target.value),
              min: new Date().toISOString().split("T")[0]
            })
          }), _jsx(Ie, {
            label: "Nouvel horaire *",
            children: _jsxs("select", {
              value: d,
              onChange: c => h(c.target.value),
              style: {
                width: "100%",
                border: `1px solid ${V}`,
                borderRadius: 8,
                padding: "9px 12px",
                fontSize: 13,
                color: z,
                background: "#fff",
                outline: "none"
              },
              children: [_jsx("option", {
                value: "",
                children: "Choisir un cr\xE9neau"
              }), Je.map(c => _jsx("option", {
                value: c,
                children: c
              }, c))]
            })
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              marginTop: 16
            },
            children: [_jsx(ot, {
              onClick: () => {
                Q(null), m(""), h("");
              },
              style: {
                flex: 1
              },
              children: "Annuler"
            }), _jsx(ze, {
              onClick: async () => {
                !f || !d || (await X.patch("appointments", k.id, {
                  rdv_date: f,
                  slot: d
                }, j), R(c => c.map(y => y.id === k.id ? {
                  ...y,
                  rdv_date: f,
                  slot: d
                } : y)), gt(c => c.map(y => y.id === k.id ? {
                  ...y,
                  rdv_date: f,
                  slot: d
                } : y)), jn(k.patient_email, "\u{1F4C5} Votre s\xE9ance a \xE9t\xE9 modifi\xE9e \u2014 VITASCIENZELAB", `<div style="font-family:sans-serif;padding:20px;max-width:500px"><h2 style="color:#1565C0">S\xE9ance modifi\xE9e</h2><p>Bonjour ${k.patient_name?.split(" ")[0] || ""},</p><p>Votre s\xE9ance <strong>${k.service_title}</strong> a \xE9t\xE9 modifi\xE9e :</p><table style="margin:16px 0;font-size:14px"><tr><td style="color:#78909C;padding:4px 12px 4px 0">Nouvelle date</td><td><strong>${vt(f)}</strong></td></tr><tr><td style="color:#78909C;padding:4px 12px 4px 0">Nouvel horaire</td><td><strong>${d}</strong></td></tr></table><p style="color:#546E7A;font-size:12px">Si vous avez des questions, contactez-nous \xE0 ${ye.email}</p><p style="font-size:11px;color:#90A4AE">VITASCIENZELAB \xB7 SIRET ${ye.siret}</p></div>`).catch(() => {}), Q(null), m(""), h(""));
              },
              style: {
                flex: 2
              },
              children: "\u{1F4BE} Enregistrer + Email"
            })]
          })]
        })
      }), E === "agenda" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 10
          },
          children: [_jsxs("h3", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 20,
              color: z
            },
            children: ["Agenda \u2014 ", Gu[Pt], " ", x]
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap"
            },
            children: [_jsx("div", {
              style: {
                display: "flex",
                gap: 6
              },
              children: $l.map(c => _jsxs("span", {
                style: {
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: 20,
                  background: c.id === "conseil" ? "#E3F0FF" : c.id === "suivi" ? "#E8F5E9" : "#EDE7F6",
                  color: z
                },
                children: [c.icon, " ", c.title.split(" ")[0]]
              }, c.id))
            }), _jsx("button", {
              onClick: () => {
                Pt === 0 ? (hl(11), U(c => c - 1)) : hl(c => c - 1);
              },
              style: {
                background: V,
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                color: q,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: "\u2190 Pr\xE9c."
            }), _jsx("button", {
              onClick: () => {
                let c = new Date();
                hl(c.getMonth()), U(c.getFullYear());
              },
              style: {
                background: q,
                border: "none",
                borderRadius: 8,
                padding: "6px 12px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "Aujourd'hui"
            }), _jsx("button", {
              onClick: () => {
                Pt === 11 ? (hl(0), U(c => c + 1)) : hl(c => c + 1);
              },
              style: {
                background: V,
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                color: q,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: "Suiv. \u2192"
            })]
          })]
        }), _jsx("div", {
          style: {
            display: "flex",
            gap: 10,
            marginBottom: 14,
            flexWrap: "wrap"
          },
          children: [["#E3F0FF", "S\xE9ance Conseil"], ["#E8F5E9", "Suivi Bien-\xEAtre"], ["#EDE7F6", "Bilan Nutritionnel"], ["#FFF3E0", "Rappel 48h"]].map(([c, y]) => _jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              color: "#546E7A"
            },
            children: [_jsx("div", {
              style: {
                width: 12,
                height: 12,
                borderRadius: 3,
                background: c,
                border: "1px solid rgba(0,0,0,.1)"
              }
            }), y]
          }, y))
        }), _jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: 4,
            marginBottom: 4
          },
          children: Pr.map(c => _jsx("div", {
            style: {
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#90A4AE",
              padding: "6px 0",
              background: "#fff",
              borderRadius: 6
            },
            children: c
          }, c))
        }), _jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: 4
          },
          children: (() => {
            let c = new Date().toISOString().split("T")[0],
              y = new Date(x, Pt, 1).getDay(),
              b = y === 0 ? 6 : y - 1,
              _ = new Date(x, Pt + 1, 0).getDate(),
              G = [...Array(b).fill(null), ...Array.from({
                length: _
              }, (H, F) => F + 1)];
            for (; G.length % 7 !== 0;) G.push(null);
            return G.map((H, F) => {
              if (!H) return _jsx("div", {
                style: {
                  minHeight: 80
                }
              }, F);
              let N = `${x}-${String(Pt + 1).padStart(2, "0")}-${String(H).padStart(2, "0")}`,
                K = N === c,
                P = new Date(x, Pt, H).getDay() === 0,
                Ye = p.filter($ => $.rdv_date === N && $.status === "confirmed"),
                Ht = Ye.some($ => tn($)),
                D = N < c,
                He = M.some($ => $.blocked_date === N && (!$.slot || $.slot === ""));
              return _jsxs("div", {
                style: {
                  background: He ? "#FFF3E0" : P ? "#F8FAFF" : D ? "#FAFAFA" : "#fff",
                  borderRadius: 10,
                  padding: "6px 8px",
                  border: `2px solid ${K ? q : He ? "#FF8F00" : V}`,
                  minHeight: 80,
                  opacity: P ? 0.4 : 1,
                  position: "relative",
                  backgroundImage: He ? "repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(255,143,0,.15) 4px,rgba(255,143,0,.15) 8px)" : "none"
                },
                children: [_jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4
                  },
                  children: [_jsx("span", {
                    style: {
                      fontSize: 13,
                      fontWeight: 700,
                      color: K ? "#fff" : D ? "#B0BEC5" : He ? "#E65100" : z,
                      background: K ? q : "transparent",
                      borderRadius: "50%",
                      width: 22,
                      height: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    },
                    children: H
                  }), He && _jsx("span", {
                    style: {
                      fontSize: 9,
                      color: "#E65100",
                      fontWeight: 700
                    },
                    children: "\u{1F512} Bloqu\xE9"
                  }), Ye.length > 0 && _jsx("span", {
                    style: {
                      fontSize: 9,
                      background: Ht ? "#FF8F00" : q,
                      color: "#fff",
                      borderRadius: 10,
                      padding: "1px 5px",
                      fontWeight: 700
                    },
                    children: Ye.length
                  })]
                }), P ? _jsx("div", {
                  style: {
                    fontSize: 8,
                    color: "#BDBDBD",
                    textAlign: "center"
                  },
                  children: "Ferm\xE9"
                }) : Ye.slice(0, 3).map($ => _jsxs("div", {
                  onClick: () => {
                    let Xe = w.find($e => $e.email === $.patient_email) || {
                      id: $.patient_id || $.patient_email,
                      email: $.patient_email,
                      prenom: $.patient_name?.split(" ")[0] || "",
                      nom: $.patient_name?.split(" ").slice(1).join(" ") || "",
                      created_at: $.created_at
                    };
                    Mr(Xe);
                  },
                  style: {
                    background: tn($) ? "#FFF3E0" : $.service_id === "conseil" ? "#E3F0FF" : $.service_id === "suivi" ? "#E8F5E9" : "#EDE7F6",
                    borderRadius: 5,
                    padding: "3px 5px",
                    marginBottom: 3,
                    fontSize: 9,
                    color: z,
                    cursor: "pointer",
                    borderLeft: `2px solid ${$.service_id === "conseil" ? q : $.service_id === "suivi" ? "#43A047" : "#7B1FA2"}`
                  },
                  children: [_jsx("span", {
                    style: {
                      fontWeight: 700
                    },
                    children: $.slot
                  }), " ", $.service_icon, " ", _jsx("span", {
                    style: {
                      opacity: 0.8
                    },
                    children: $.patient_name?.split(" ")[0]
                  })]
                }, $.id)), Ye.length > 3 && _jsxs("div", {
                  style: {
                    fontSize: 8,
                    color: "#90A4AE",
                    textAlign: "center"
                  },
                  children: ["+", Ye.length - 3, " autres"]
                })]
              }, F);
            });
          })()
        }), _jsx("div", {
          style: {
            display: "flex",
            gap: 12,
            marginTop: 16,
            flexWrap: "wrap"
          },
          children: [[`\u{1F4C5} ${p.filter(c => c.rdv_date?.startsWith(`${x}-${String(Pt + 1).padStart(2, "0")}`)).length} s\xE9ance(s) ce mois`, V, q], [`\u23F0 ${p.filter(c => c.rdv_date?.startsWith(`${x}-${String(Pt + 1).padStart(2, "0")}`) && tn(c)).length} rappel(s) 48h`, "#FFF3E0", "#E65100"]].map(([c, y, b]) => _jsx("div", {
            style: {
              background: y,
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 12,
              color: b,
              fontWeight: 600
            },
            children: c
          }, c))
        })]
      }), E === "rdvs" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            gap: 8,
            marginBottom: 16,
            flexWrap: "wrap",
            alignItems: "center"
          },
          children: [[["all", "Toutes"], ["upcoming", "\xC0 venir"], ["today", "Aujourd'hui"], ["past", "Pass\xE9es"], ["reminder", "Rappels 48h"], ["cancelled", "Annul\xE9es"]].map(([c, y]) => _jsx("button", {
            onClick: () => vl(c),
            style: {
              padding: "7px 13px",
              borderRadius: 20,
              border: `2px solid ${ke === c ? q : "#E0E0E0"}`,
              background: ke === c ? q : "#fff",
              color: ke === c ? "#fff" : "#546E7A",
              fontSize: 12,
              fontWeight: 600
            },
            children: y
          }, c)), _jsx("input", {
            value: De,
            onChange: c => st(c.target.value),
            placeholder: "\u{1F50D} Rechercher\u2026",
            style: {
              ...Vl,
              flex: 1,
              minWidth: 140
            }
          })]
        }), qr.length === 0 ? _jsx("p", {
          style: {
            textAlign: "center",
            color: "#90A4AE",
            padding: 30
          },
          children: "Aucune s\xE9ance trouv\xE9e."
        }) : qr.map(c => _jsx("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: "16px 18px",
            marginBottom: 10,
            boxShadow: "0 2px 10px rgba(21,101,192,.06)",
            borderLeft: `4px solid ${c.status === "cancelled" ? "#FFCDD2" : tn(c) ? "#FF8F00" : at(c) ? "#CFD8DC" : q}`,
            opacity: c.status === "cancelled" ? 0.7 : 1
          },
          children: _jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10
            },
            children: [_jsxs("div", {
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: 5
                },
                children: [_jsx("span", {
                  style: {
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 15,
                    color: z,
                    fontWeight: 700
                  },
                  children: c.patient_name
                }), _jsxs(We, {
                  children: [c.service_icon, " ", c.service_title]
                }), c.status === "cancelled" && _jsx(We, {
                  bg: "#FCE4EC",
                  color: "#C62828",
                  children: "\u2717 Annul\xE9"
                }), tn(c) && _jsx(We, {
                  bg: "#FFF3E0",
                  color: "#E65100",
                  children: "\u23F0 Rappel 48h"
                }), c.recurring && _jsx(We, {
                  bg: "#FFF8E1",
                  color: "#F57F17",
                  children: "\u{1F501}"
                })]
              }), _jsxs("div", {
                style: {
                  fontSize: 12,
                  color: "#546E7A"
                },
                children: ["\u{1F4C5} ", vt(c.rdv_date), " \xB7 \u{1F550} ", c.slot, " \xB7 \u{1F4E7} ", c.patient_email]
              }), c.notes && _jsxs("div", {
                style: {
                  fontSize: 11,
                  color: "#78909C",
                  marginTop: 3,
                  fontStyle: "italic"
                },
                children: ["\u{1F4AC} ", c.notes]
              }), c.docs?.length > 0 && _jsx("div", {
                style: {
                  marginTop: 5,
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap"
                },
                children: c.docs.map(y => _jsxs(We, {
                  bg: "#F3E5F5",
                  color: "#6A1B9A",
                  children: ["\u{1F4CE} ", y]
                }, y))
              })]
            }), _jsxs("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 5,
                alignItems: "flex-end"
              },
              children: [_jsx("span", {
                style: {
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "#90A4AE"
                },
                children: c.id
              }), _jsx("button", {
                onClick: () => {
                  W(c), Ne("confirm");
                },
                style: {
                  background: V,
                  border: "none",
                  color: q,
                  borderRadius: 7,
                  padding: "5px 10px",
                  fontSize: 11,
                  fontWeight: 600
                },
                children: "\u{1F4E7} Aper\xE7u"
              }), tn(c) && _jsx("button", {
                onClick: () => {
                  W(c), Ne("48h");
                },
                style: {
                  background: "#FFF3E0",
                  border: "none",
                  color: "#E65100",
                  borderRadius: 7,
                  padding: "5px 10px",
                  fontSize: 11,
                  fontWeight: 600
                },
                children: "\u23F0 Rappel"
              }), tn(c) && _jsx("button", {
                onClick: () => Mu(c),
                style: {
                  background: "#E8F5E9",
                  border: "none",
                  color: "#2E7D32",
                  borderRadius: 7,
                  padding: "5px 10px",
                  fontSize: 11
                },
                children: "\u2713 Envoy\xE9"
              }), _jsx("button", {
                onClick: () => kr(c),
                style: {
                  background: "#FCE4EC",
                  border: "none",
                  color: "#C62828",
                  borderRadius: 7,
                  padding: "5px 10px",
                  fontSize: 11,
                  fontWeight: 600
                },
                children: "\u{1F5D1} Supprimer"
              })]
            })]
          })
        }, c.id))]
      }), E === "clients" && !O && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            gap: 10,
            marginBottom: 16,
            flexWrap: "wrap",
            alignItems: "center"
          },
          children: [_jsx("input", {
            value: De,
            onChange: c => st(c.target.value),
            placeholder: "\u{1F50D} Rechercher un client\u2026",
            style: {
              ...Vl,
              flex: 1,
              minWidth: 180
            }
          }), _jsxs("select", {
            value: wt || "nom",
            onChange: c => bl(c.target.value),
            style: {
              ...Vl,
              width: "auto",
              padding: "8px 12px"
            },
            children: [_jsx("option", {
              value: "nom",
              children: "Trier par nom"
            }), _jsx("option", {
              value: "date",
              children: "Trier par inscription"
            }), _jsx("option", {
              value: "seances",
              children: "Trier par nb de séances"
            }), _jsx("option", {
              value: "suivi",
              children: "Trier par suivi requis"
            })]
          }), _jsx("button", {
            disabled: sendingEmails,
            onClick: async () => {
              if (!window.confirm("Envoyer l'e-mail de suivi métabolique mensuel à tous vos clients (avec ou sans compte) ?")) return;
              setSendingEmails(!0);
              try {
                const res = await fetch("/api/send-monthly-reminders", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${activeSessionToken || j}`
                  }
                });
                const data = await res.json();
                if (res.ok && data.success) {
                  alert(`📧 Succès : e-mails envoyés à ${data.sent} client(s) (${data.failed} échec(s)).`);
                } else {
                  alert(`❌ Erreur : ${data.error || "Impossible d'envoyer les e-mails."}`);
                }
              } catch (err) {
                console.error("Manual reminders trigger error:", err);
                alert("❌ Une erreur est survenue lors de la communication avec le serveur.");
              } finally {
                setSendingEmails(!1);
              }
            },
            style: {
              background: sendingEmails ? "#E0E0E0" : "#E0F2F1",
              border: "1px solid #80CBC4",
              color: "#004D40",
              borderRadius: 10,
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 600,
              cursor: sendingEmails ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            },
            children: sendingEmails ? "Envoi en cours..." : "✉️ Rappel mensuel global"
          })]
        }), [...w].filter(c => !De || `${c.prenom} ${c.nom} ${c.email}`.toLowerCase().includes(De.toLowerCase())).sort((a, b) => {
          if (wt === "date") {
            return (b.created_at || "").localeCompare(a.created_at || "");
          }
          if (wt === "seances") {
            const countA = p.filter(h => h.patient_id === a.id).length;
            const countB = p.filter(h => h.patient_id === b.id).length;
            return countB - countA;
          }
          if (wt === "suivi") {
            const getFollowUpDays = c => {
              const sessions = p.filter(h => h.patient_id === c.id && h.status !== "cancelled");
              if (sessions.length === 0) return -1;
              const last = [...sessions].sort((x, y) => (y.rdv_date || "").localeCompare(x.rdv_date || ""))[0];
              if (!last || !last.rdv_date) return -1;
              return Math.floor((Date.now() - new Date(last.rdv_date + "T12:00:00")) / 864e5);
            };
            return getFollowUpDays(b) - getFollowUpDays(a);
          }
          // Default: sort alphabetically by last name (nom), then first name (prenom)
          const getSortName = c => {
            const nom = (c.nom || "").replace(/^[^a-zA-ZÀ-ÿ0-9]+/g, "").trim().toLowerCase();
            const prenom = (c.prenom || "").replace(/^[^a-zA-ZÀ-ÿ0-9]+/g, "").trim().toLowerCase();
            if (nom && prenom) return `${nom} ${prenom}`;
            if (nom) return nom;
            if (prenom) return prenom;
            return (c.email || "").trim().toLowerCase();
          };
          return getSortName(a).localeCompare(getSortName(b));
        }).map(c => {
          let y = p.filter(H => H.patient_id === c.id),
            b = y.filter(H => !at(H) && H.status === "confirmed").sort((H, F) => H.rdv_date.localeCompare(F.date))[0],
            _ = y.filter(H => at(H)).sort((H, F) => F.date.localeCompare(H.rdv_date))[0],
            G = ((c.prenom || "?")[0] + (c.nom || "?")[0]).toUpperCase();
          return _jsxs("div", {
            onClick: () => Mr(c),
            style: {
              background: "#fff",
              borderRadius: 14,
              padding: "16px 18px",
              marginBottom: 10,
              boxShadow: "0 2px 10px rgba(21,101,192,.06)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              flexWrap: "wrap"
            },
            children: [_jsx("div", {
              style: {
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `linear-gradient(135deg,${q},#42A5F5)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                color: "#fff",
                fontWeight: 700,
                fontFamily: "'Playfair Display',serif",
                flexShrink: 0
              },
              children: G
            }), _jsxs("div", {
              style: {
                flex: 1
              },
              children: [_jsxs("div", {
                style: {
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 15,
                  color: z,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                },
                children: [
                  c.prenom || c.nom ? `${(c.nom || "").toUpperCase()} ${c.prenom || ""}`.trim() : c.email,
                  (c.client_files || []).some(f => f.uploaded_by === "client" && f.is_new_for_admin === true) && _jsx("span", {
                    style: {
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#FF5252",
                      display: "inline-block",
                      boxShadow: "0 0 6px #FF5252",
                      animation: "pulse-glow 1.5s infinite"
                    }
                  })
                ]
              }), _jsxs("div", {
                style: {
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginTop: 3
                },
                children: [
                  c.has_account ? _jsx("span", {
                    style: {
                      background: "#E3F2FD",
                      color: "#1565C0",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: "\u{1F464} Compte cr\xE9\xE9"
                  }) : _jsx("span", {
                    style: {
                      background: "#ECEFF1",
                      color: "#455A64",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: "\u{1F4CB} Fiche admin"
                  }),
                  y.length === 0 && _jsx("span", {
                    style: {
                      background: "#E8F5E9",
                      color: "#2E7D32",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: "\u{1F195} Nouveau"
                  }), (() => {
                  let H = y.filter(N => N.status !== "cancelled").sort((N, K) => (K.rdv_date || "").localeCompare(N.rdv_date || ""))[0];
                  if (!H) return null;
                  let F = Math.floor((Date.now() - new Date(H.rdv_date + "T12:00:00")) / 864e5);
                  return F >= 30 && F < 90 ? _jsxs("span", {
                    style: {
                      background: "#FFF3E0",
                      color: "#E65100",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: ["\u26A0\uFE0F Suivi requis (", F, "j)"]
                  }) : F >= 90 ? _jsxs("span", {
                    style: {
                      background: "#FCE4EC",
                      color: "#C62828",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: ["\u{1F534} Inactif (", F, "j)"]
                  }) : null;
                })()]
              }), _jsxs("div", {
                style: {
                  fontSize: 12,
                  color: "#78909C",
                  marginTop: 2
                },
                children: [c.email, " \xB7 ", y.length, " s\xE9ance", y.length > 1 ? "s" : ""]
              })]
            }), _jsxs("div", {
              style: {
                textAlign: "right",
                fontSize: 11,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 6
              },
              children: [b && _jsxs("div", {
                style: {
                  color: "#2E7D32"
                },
                children: ["Prochain : ", Ke(b.rdv_date)]
              }), _ && _jsxs("div", {
                style: {
                  color: "#78909C"
                },
                children: ["Dernier : ", Ke(_.rdv_date)]
              }), _jsx("button", {
                onClick: H => {
                  H.stopPropagation(), Nr(c);
                },
                style: {
                  background: "#FCE4EC",
                  border: "none",
                  color: "#C62828",
                  borderRadius: 7,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: 4
                },
                children: "\u{1F5D1} Supprimer"
              })]
            })]
          }, c.id);
        })]
      }), E === "fiche" && O && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16
          },
          children: [_jsx("button", {
            onClick: () => {
              g("clients"), L(null);
            },
            style: {
              background: "#fff",
              border: `2px solid ${V}`,
              color: q,
              borderRadius: 10,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600
            },
            children: "\u2190 Liste clients"
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10
            },
            children: [_jsx("button", {
              onClick: () => {
                g("nouveau"), Ft(c => ({
                  ...c,
                  prenom: O.prenom,
                  nom: O.nom,
                  email: O.email,
                  tel: O.tel
                }));
              },
              style: {
                background: V,
                border: "none",
                color: q,
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F4C5} Nouveau RDV pour ce client"
            }), _jsx("button", {
              onClick: () => Nr(O),
              style: {
                background: "#FCE4EC",
                border: "none",
                color: "#C62828",
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F5D1} Supprimer ce client"
            })]
          })]
        }), _jsxs("div", {
          style: {
            background: `linear-gradient(135deg,${z},${q})`,
            borderRadius: 16,
            padding: "20px 24px",
            marginBottom: 20,
            display: "flex",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap"
          },
          children: [_jsx("div", {
            style: {
              width: 50,
              height: 50,
              borderRadius: 12,
              background: "rgba(255,255,255,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#fff",
              fontFamily: "'Playfair Display',serif",
              fontWeight: 700
            },
            children: ((O.prenom || "?")[0] + (O.nom || "?")[0]).toUpperCase()
          }), _jsxs("div", {
            children: [_jsxs("div", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 20,
                color: "#fff"
              },
              children: [O.prenom, " ", O.nom]
            }), _jsxs("div", {
              style: {
                fontSize: 12,
                color: "rgba(255,255,255,.7)"
              },
              children: [O.email, O.tel ? ` \xB7 ${O.tel}` : "", O.dob ? ` \xB7 N\xE9(e) le ${new Date(O.dob).toLocaleDateString("fr-FR")}` : ""]
            })]
          }), _jsxs("div", {
            style: {
              marginLeft: "auto",
              textAlign: "right"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
                fontFamily: "'Playfair Display',serif"
              },
              children: de.length
            }), _jsxs("div", {
              style: {
                fontSize: 10,
                color: "rgba(255,255,255,.7)"
              },
              children: ["s\xE9ance", de.length > 1 ? "s" : ""]
            })]
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 16,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F4C5} Historique des s\xE9ances"
          }), de.filter(c => c.status !== "archived").length === 0 ? _jsx("p", {
            style: {
              color: "#90A4AE",
              fontSize: 13
            },
            children: "Aucune s\xE9ance."
          }) : de.filter(c => c.status !== "archived").map(c => _jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "9px 0",
              borderBottom: "1px solid #F0F4FF",
              fontSize: 12,
              flexWrap: "wrap",
              gap: 6,
              opacity: c.status === "archived" ? 0.6 : 1
            },
            children: [_jsxs("span", {
              children: [_jsxs("span", {
                style: {
                  color: "#78909C"
                },
                children: [Ke(c.rdv_date), " \xE0 ", c.slot]
              }), " \xB7 ", _jsxs("strong", {
                style: {
                  color: z
                },
                children: [c.service_icon, " ", c.service_title]
              }), " ", c.status === "cancelled" && _jsx(We, {
                bg: "#FCE4EC",
                color: "#C62828",
                children: "Annul\xE9"
              }), c.status === "completed" && _jsx(We, {
                bg: "#E8F5E9",
                color: "#2E7D32",
                children: "\u2713 Effectu\xE9e"
              }), c.status === "confirmed" && c.rdv_date >= new Date().toISOString().split("T")[0] && _jsx(We, {
                bg: "#E3F0FF",
                color: "#1565C0",
                children: "Confirm\xE9"
              })]
            }), _jsxs("div", {
              style: {
                display: "flex",
                gap: 6,
                alignItems: "center",
                flexWrap: "wrap"
              },
              children: [c.docs?.length > 0 && _jsx("div", {
                style: {
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap"
                },
                children: c.docs.map(y => _jsxs(We, {
                  bg: "#F3E5F5",
                  color: "#6A1B9A",
                  children: ["\u{1F4CE} ", y]
                }, y))
              }), c.status !== "completed" && _jsx("button", {
                onClick: () => Q(c),
                style: {
                  background: V,
                  border: "none",
                  color: q,
                  borderRadius: 7,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer"
                },
                children: "\u270F\uFE0F Modifier"
              }), _jsx("button", {
                onClick: () => kr(c),
                style: {
                  background: "#FCE4EC",
                  border: "none",
                  color: "#C62828",
                  borderRadius: 7,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer"
                },
                children: "\u{1F5D1} Supprimer"
              })]
            })]
          }, c.id))]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 16,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F4DD} Formulaires bien-\xEAtre"
          }), yl.length === 0 ? _jsx("p", {
            style: {
              color: "#90A4AE",
              fontSize: 13
            },
            children: "Aucun formulaire rempli pour l'instant."
          }) : yl.map((c, y) => {
            let b = Fn === y,
              _ = vt(c.created_at?.split("T")[0]),
              G = Object.entries(c.responses || {}).filter(([H, F]) => F ? H.endsWith("_detail") ? !0 : Wi.find(N => N.k === H) || Vu.find(N => N.k === H) : !1);
            return _jsxs("div", {
              style: {
                borderRadius: 10,
                marginBottom: 10,
                border: `1px solid ${V}`,
                overflow: "hidden"
              },
              children: [_jsxs("div", {
                style: {
                  background: b ? "#1565C0" : "#F8FAFF",
                  display: "flex",
                  alignItems: "center",
                  transition: "all .2s"
                },
                children: [_jsxs("div", {
                  onClick: () => en(b ? -1 : y),
                  style: {
                    flex: 1,
                    padding: "12px 16px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [_jsxs("div", {
                    children: [_jsxs("div", {
                      style: {
                        fontSize: 13,
                        fontWeight: 700,
                        color: b ? "#fff" : z
                      },
                      children: ["\u{1F4CB} Formulaire du ", _]
                    }), _jsxs("div", {
                      style: {
                        fontSize: 11,
                        color: b ? "rgba(255,255,255,.7)" : "#90A4AE"
                      },
                      children: [G.length, " r\xE9ponse", G.length > 1 ? "s" : ""]
                    })]
                  }), _jsx("span", {
                    style: {
                      color: b ? "#fff" : q,
                      fontSize: 18,
                      display: "inline-block",
                      transform: b ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform .2s"
                    },
                    children: "\u25BE"
                  })]
                }), _jsx("button", {
                  onClick: async H => {
                    if (H.stopPropagation(), !!window.confirm("Supprimer ce formulaire d\xE9finitivement ?")) try {
                      ee || (await X.del("questionnaires", c.id, j)), qt(F => F.filter((N, K) => K !== y)), en(-1);
                    } catch (F) {
                      console.error(F);
                    }
                  },
                  style: {
                    background: "#FCE4EC",
                    border: "none",
                    color: "#C62828",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: 13,
                    borderLeft: `1px solid ${b ? "rgba(255,255,255,.2)" : "#E3F0FF"}`
                  },
                  title: "Supprimer ce formulaire",
                  children: "\u{1F5D1}"
                })]
              }), b && _jsx("div", {
                style: {
                  padding: "14px 16px",
                  background: "#fff"
                },
                children: G.map(([H, F]) => {
                  let N = Wi.find(P => P.k === H) || Vu.find(P => P.k === H),
                    K = H.endsWith("_detail") ? "\u2192 Pr\xE9cisions (Autre objectif)" : N?.q || H;
                  return _jsxs("div", {
                    style: {
                      fontSize: 12,
                      color: "#546E7A",
                      marginBottom: 10,
                      padding: "8px 0",
                      borderBottom: "1px solid #F0F4FF"
                    },
                    children: [_jsx("div", {
                      style: {
                        fontWeight: 600,
                        color: z,
                        marginBottom: 4
                      },
                      children: K
                    }), _jsxs("div", {
                      style: {
                        color: "#1565C0",
                        background: "#E8F0FE",
                        borderRadius: 6,
                        padding: "4px 10px",
                        display: "inline-block"
                      },
                      children: ["\u2192 ", F]
                    })]
                  }, H);
                })
              })]
            }, y);
          })]
        }), (() => {
          let c = `${O.prenom || ""} ${O.nom || ""}`.trim();
          return [{
            name: c,
            isMain: !0
          }, ...(O.guests || []).map(b => ({
            name: b.name,
            isMain: !1
          }))].map((b, _) => {
            let G = (O.client_docs || []).filter(D => b.isMain ? !D.patient_name || D.patient_name === c || D.patient_name === "" : D.patient_name === b.name),
              H = de.filter(D => b.isMain ? !D.patient_name || D.patient_name === c || D.patient_name === "" : D.patient_name === b.name).flatMap(D => (D.docs || []).map((He, $) => ({
                name: He,
                data: D.docs_data?.[$]?.data || null,
                type: D.docs_data?.[$]?.type || "",
                date: D.rdv_date,
                slot: D.slot,
                rdv: D,
                rdvDocIdx: $
              }))),
              F = (O.all_supplements || []).filter(D => b.isMain ? !D.patient_name || D.patient_name === c || D.patient_name === "" : D.patient_name === b.name),
              N = de.filter(D => b.isMain ? !D.patient_name || D.patient_name === c || D.patient_name === "" : D.patient_name === b.name).flatMap(D => (D.supplements || []).map((He, $) => ({
                s: He,
                si: $,
                rdv: D
              }))),
              K = new Set(G.map(D => D.name + "_" + D.from_rdv)),
              P = [...G.map(D => ({
                ...D,
                fromProfile: !0
              })), ...H.filter(D => !K.has(D.name + "_" + D.date))],
              Ye = new Set(F.map(D => D.name + "_" + D.from_rdv)),
              Ht = [...F.map((D, He) => ({
                s: D.name,
                date: D.from_rdv,
                fromProfile: !0,
                idx: He
              })), ...N.filter(D => !Ye.has(D.s + "_" + D.rdv.rdv_date)).map(D => ({
                s: D.s,
                date: D.rdv.rdv_date,
                si: D.si,
                rdv: D.rdv
              }))];
            return P.length === 0 && Ht.length === 0 ? null : _jsxs("div", {
              style: {
                background: "#fff",
                borderRadius: 14,
                padding: 20,
                boxShadow: "0 2px 12px rgba(21,101,192,.06)",
                marginBottom: 14,
                border: b.isMain ? "none" : "2px solid #E3F0FF"
              },
              children: [_jsxs("h4", {
                style: {
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 15,
                  color: b.isMain ? z : q,
                  marginBottom: 14
                },
                children: [b.isMain ? "\u{1F4CE} Documents & Compl\xE9ments \u2014 " : "\u{1F4CE} ", b.name, !b.isMain && _jsx("span", {
                  style: {
                    fontSize: 11,
                    color: "#90A4AE",
                    fontWeight: 400
                  },
                  children: " (proche)"
                })]
              }), Ht.length > 0 && _jsxs("div", {
                style: {
                  background: "#E8F0FE",
                  borderRadius: 10,
                  padding: "10px 14px",
                  marginBottom: 12
                },
                children: [_jsx("p", {
                  style: {
                    fontSize: 12,
                    fontWeight: 700,
                    color: z,
                    marginBottom: 8
                  },
                  children: "\u{1F48A} Compl\xE9ments alimentaires :"
                }), Ht.map((D, He) => _jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#fff",
                    borderRadius: 6,
                    padding: "5px 10px",
                    marginBottom: 4
                  },
                  children: [_jsx("span", {
                    style: {
                      fontSize: 14
                    },
                    children: "\u{1F48A}"
                  }), _jsx("span", {
                    style: {
                      fontSize: 13,
                      color: z,
                      flex: 1
                    },
                    children: D.s
                  }), _jsx("span", {
                    style: {
                      fontSize: 10,
                      color: "#90A4AE"
                    },
                    children: D.date ? Ke(D.date) : ""
                  }), _jsx("button", {
                    onClick: async () => {
                      if (window.confirm(`Supprimer "${D.s}" ?`)) {
                        if (D.fromProfile) {
                          let $ = (O.all_supplements || []).filter((Xe, $e) => $e !== D.idx);
                          ee || (await X.patch("profiles", O.id, {
                            all_supplements: $
                          }, j)), L(Xe => ({
                            ...Xe,
                            all_supplements: $
                          }));
                        } else if (D.rdv) {
                          let $ = (D.rdv.supplements || []).filter((Xe, $e) => $e !== D.si);
                          ee || (await X.patch("appointments", D.rdv.id, {
                            supplements: $
                          }, j)), gt(Xe => Xe.map($e => $e.id === D.rdv.id ? {
                            ...$e,
                            supplements: $
                          } : $e));
                        }
                      }
                    },
                    style: {
                      background: "#FCE4EC",
                      border: "none",
                      color: "#C62828",
                      borderRadius: 6,
                      padding: "3px 7px",
                      fontSize: 11,
                      cursor: "pointer"
                    },
                    children: "\u{1F5D1}"
                  })]
                }, He))]
              }), P.map((D, He) => _jsx("div", {
                style: {
                  background: "#F3E5F5",
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 8
                },
                children: _jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                  },
                  children: [_jsx("span", {
                    style: {
                      fontSize: 18
                    },
                    children: D.type?.includes("pdf") ? "\u{1F4D5}" : D.type?.includes("image") ? "\u{1F5BC}\uFE0F" : "\u{1F4C4}"
                  }), _jsxs("div", {
                    style: {
                      flex: 1
                    },
                    children: [_jsx("div", {
                      style: {
                        fontSize: 13,
                        color: "#6A1B9A",
                        fontWeight: 600
                      },
                      children: D.name
                    }), _jsx("div", {
                      style: {
                        fontSize: 11,
                        color: "#90A4AE"
                      },
                      children: D.fromProfile ? `S\xE9ance du ${Ke(D.from_rdv)} \xE0 ${D.from_slot || ""}` : `S\xE9ance du ${Ke(D.date)} \xE0 ${D.slot}`
                    })]
                  }), D.data && _jsx("button", {
                    onClick: () => downloadBase64File(D.data, D.name),
                    style: {
                      background: "#6A1B9A",
                      color: "#fff",
                      borderRadius: 7,
                      padding: "5px 12px",
                      fontSize: 11,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer"
                    },
                    children: "⬇ DL"
                  }), _jsx("button", {
                    onClick: async () => {
                      if (window.confirm(`Supprimer "${D.name}" ?`)) {
                        if (D.fromProfile) {
                          let $ = (O.client_docs || []).filter(Xe => !(Xe.name === D.name && Xe.from_rdv === D.from_rdv));
                          ee || (await X.patch("profiles", O.id, {
                            client_docs: $
                          }, j)), L(Xe => ({
                            ...Xe,
                            client_docs: $
                          }));
                        } else if (D.rdv) {
                          let $ = (D.rdv.docs || []).filter(($e, Sl) => Sl !== D.rdvDocIdx),
                            Xe = (D.rdv.docs_data || []).filter(($e, Sl) => Sl !== D.rdvDocIdx);
                          ee || (await X.patch("appointments", D.rdv.id, {
                            docs: $,
                            docs_data: Xe
                          }, j)), gt($e => $e.map(Sl => Sl.id === D.rdv.id ? {
                            ...Sl,
                            docs: $,
                            docs_data: Xe
                          } : Sl));
                        }
                      }
                    },
                    style: {
                      background: "#FCE4EC",
                      border: "none",
                      color: "#C62828",
                      borderRadius: 7,
                      padding: "5px 8px",
                      fontSize: 12,
                      cursor: "pointer"
                    },
                    children: "\u{1F5D1}"
                  })]
                })
              }, He))]
            }, _);
          }).filter(Boolean);
        })(), (O.guests || []).length > 0 && _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14,
            border: "2px solid #E8F0FE"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 12
            },
            children: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467} Famille / Proches"
          }), (O.guests || []).map((c, y) => {
            let b = de.filter(_ => _.patient_name && _.patient_name.trim() === c.name.trim());
            return _jsxs("div", {
              style: {
                marginBottom: 12,
                paddingBottom: 12,
                borderBottom: y < (O.guests || []).length - 1 ? `1px solid ${V}` : "none"
              },
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 6
                },
                children: [_jsx("span", {
                  style: {
                    fontSize: 16
                  },
                  children: "\u{1F464}"
                }), _jsx("span", {
                  style: {
                    fontSize: 13,
                    fontWeight: 700,
                    color: z
                  },
                  children: c.name
                }), _jsxs("span", {
                  style: {
                    fontSize: 10,
                    color: "#90A4AE"
                  },
                  children: ["\u2014 proche de ", O.prenom]
                })]
              }), b.length === 0 ? _jsx("p", {
                style: {
                  fontSize: 11,
                  color: "#B0BEC5",
                  marginLeft: 24
                },
                children: "Aucune s\xE9ance pour l'instant."
              }) : b.map(_ => _jsxs("div", {
                style: {
                  background: "#F0F4FF",
                  borderRadius: 8,
                  padding: "6px 12px",
                  marginBottom: 4,
                  fontSize: 12,
                  color: "#546E7A",
                  display: "flex",
                  justifyContent: "space-between"
                },
                children: [_jsxs("span", {
                  children: [_.service_icon, " ", _.service_title]
                }), _jsxs("span", {
                  style: {
                    color: _.status === "cancelled" ? "#E53935" : "#546E7A"
                  },
                  children: [Ke(_.rdv_date), " \xE0 ", _.slot, _.status === "cancelled" ? " \u2014 Annul\xE9" : ""]
                })]
              }, _.id))]
            }, y);
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14,
            border: "2px solid #EDE7F6"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: "#6A1B9A",
              marginBottom: 6
            },
            children: "\u{1F5C2} Dossier client (factures & documents)"
          }), _jsx("p", {
            style: {
              fontSize: 11,
              color: "#78909C",
              marginBottom: 12
            },
            children: "Le client peut t\xE9l\xE9charger ces fichiers depuis son espace, mais ne peut pas les supprimer."
          }), (() => {
            let drawerNoteFiles = [];
            if (Array.isArray(Oe)) {
              Oe.forEach(n => {
                if (n.note && (n.note.includes("📁 FICHIER CLIENT — ") || n.note.includes("📁 FICHIER ADMIN — "))) {
                  try {
                    let sIdx = n.note.indexOf("{");
                    let eIdx = n.note.lastIndexOf("}");
                    if (sIdx !== -1 && eIdx !== -1) {
                      let fileObj = JSON.parse(n.note.substring(sIdx, eIdx + 1));
                      drawerNoteFiles.push({ ...fileObj, _note_id: n.id });
                    }
                  } catch(err) {}
                }
              });
            }
            // Merge: start from O.client_files (source of truth), add note files not already present by name
            let profileFiles = O.client_files || [];
            let profileNames = new Set(profileFiles.map(f => f.name?.trim().toLowerCase()));
            let extraNoteFiles = drawerNoteFiles.filter(f => f.name && !profileNames.has(f.name.trim().toLowerCase()));
            let allDrawerFiles = [...profileFiles, ...extraNoteFiles];
            return allDrawerFiles.length === 0 ? _jsx("p", {
              style: {
                fontSize: 12,
                color: "#B0BEC5",
                textAlign: "center",
                padding: "8px 0"
              },
              children: "Aucun fichier d\xE9pos\xE9."
            }) : allDrawerFiles.map((c, y) => {
              const isFromClient = c.uploaded_by === "client";
              return _jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: isFromClient ? "#E0F2F1" : "#F3E5F5",
                  borderRadius: 8,
                  padding: "8px 12px",
                  marginBottom: 6
                },
                children: [_jsx("span", {
                  style: {
                    fontSize: 18
                  },
                  children: c.type?.includes("pdf") ? "📕" : c.type?.includes("image") ? "🖼️" : "📄"
                }), _jsxs("div", {
                  style: {
                    flex: 1
                  },
                  children: [_jsxs("div", {
                    style: {
                      fontSize: 12,
                      fontWeight: 600,
                      color: isFromClient ? "#00695C" : "#6A1B9A",
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    },
                    children: [
                      c.name,
                      _jsx("span", {
                        style: {
                          fontSize: 9,
                          background: isFromClient ? "#004D40" : "#4A148C",
                          color: "#fff",
                          padding: "1px 5px",
                          borderRadius: 4,
                          fontWeight: 700
                        },
                        children: isFromClient ? "Client" : "VitaScienzeLab"
                      })
                    ]
                  }), _jsx("div", {
                    style: {
                      fontSize: 10,
                      color: isFromClient ? "#80CBC4" : "#90A4AE"
                    },
                    children: c.date
                  })
                ]
              }), c.data ? _jsx("button", {
                  onClick: () => downloadBase64File(c.data, c.name),
                  style: {
                    background: isFromClient ? "#00695C" : "#6A1B9A",
                    color: "#fff",
                    borderRadius: 7,
                    padding: "4px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer"
                  },
                  children: "⬇️"
                }) : _jsx("label", {
                  style: {
                    background: "#FFF3E0",
                    color: "#E65100",
                    borderRadius: 7,
                    padding: "3px 8px",
                    fontSize: 10,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid #FFE0B2",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4
                  },
                  children: [
                    "📤 Joindre PDF",
                    _jsx("input", {
                      type: "file",
                      accept: "application/pdf,image/*",
                      style: { display: "none" },
                      onChange: async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = async (evt) => {
                          const b64Data = evt.target.result;
                          const updatedDoc = { ...c, data: b64Data, date: new Date().toLocaleDateString("fr-FR") };
                          let updatedList = (O.client_files || []).map(f => f.name === c.name ? updatedDoc : f);
                          if (!updatedList.some(f => f.name === c.name)) updatedList.push(updatedDoc);
                          await X.patch("profiles", O.id, { client_files: updatedList }, j);
                          L(prev => ({ ...prev, client_files: updatedList }));
                          B(prev => prev.map(p => p.id === O.id ? { ...p, client_files: updatedList } : p));
                        };
                        reader.readAsDataURL(file);
                      }
                    })
                  ]
                }), _jsx("button", {
                  onClick: async () => {
                    if (!window.confirm(`Supprimer "${c.name}" du dossier ?`)) return;
                    try {
                      if (c._note_id) {
                        await fetch(`${Ge}/rest/v1/admin_notes?id=eq.${c._note_id}`, {
                          method: "DELETE",
                          headers: { apikey: j, Authorization: `Bearer ${j}` }
                        });
                        Ce(prev => (Array.isArray(prev) ? prev.filter(n => n.id !== c._note_id) : []));
                      }
                      // Always remove by name from profiles.client_files (name is the unique key)
                      let b = (O.client_files || []).filter(f => f.name !== c.name);
                      if (!ee) await X.patch("profiles", O.id, { client_files: b }, j);
                      L(_ => ({ ..._, client_files: b }));
                      B(_ => _.map(G => G.id === O.id ? { ...G, client_files: b } : G));
                    } catch (err) {
                      console.error("Delete file error:", err);
                      alert("Erreur lors de la suppression.");
                    }
                  },
                  style: {
                    background: "#FCE4EC",
                    border: "none",
                    color: "#C62828",
                    borderRadius: 7,
                    padding: "4px 8px",
                    fontSize: 12,
                    cursor: "pointer"
                  },
                  children: "🗑️"
                })]
              }, y);
            });
          })(), _jsx("input", {
            type: "file",
            id: "clientFileInput",
            multiple: !0,
            accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx",
            style: {
              display: "none"
            },
            onChange: async c => {
              const selectedFiles = Array.from(c.target.files);
              if (selectedFiles.length === 0) return;
              try {
                const processedFiles = await Promise.all(selectedFiles.map(file => compressAndReadFile(file)));
                const newFilesList = processedFiles.map(f => ({
                  name: f.name,
                  type: f.type,
                  data: f.data,
                  date: new Date().toLocaleDateString("fr-FR"),
                  uploaded_by: "admin"
                }));
                const currentFiles = O.client_files || [];
                const finalFiles = [...currentFiles, ...newFilesList];

                if (!ee) {
                  // Save files permanently into profiles.client_files so clients can read them (admin_notes is blocked by RLS for clients)
                  await X.patch("profiles", O.id, { client_files: finalFiles }, j).catch(err => console.error("Profile patch error:", err));
                  for (let fileObj of newFilesList) {
                    const noteText = `📁 FICHIER ADMIN — ${JSON.stringify(fileObj)}`;
                    await X.post("admin_notes", {
                      patient_id: O.id,
                      note: noteText,
                      created_at: new Date().toISOString()
                    }, j).catch(err => console.error("Post admin file note error:", err));
                  }
                  if (O.email && O.email !== "—" && O.email.includes("@")) {
                    const emailSubject = "📄 Nouveau document disponible — VITASCIENZELAB";
                    const emailHtml = `<div style="font-family:sans-serif;padding:20px;max-width:500px">
                      <h2 style="color:#1565C0">Nouveau document disponible</h2>
                      <p>Bonjour ${O.prenom || ""},</p>
                      <p>Un ou plusieurs nouveaux documents ont été ajoutés à votre dossier sur votre espace client :</p>
                      <blockquote style="background:#F5F5F5;padding:12px;border-left:4px solid #1565C0;margin:16px 0;border-radius:4px;">
                        <strong>${selectedFiles.length > 1 ? "Fichiers ajoutés :" : "Fichier ajouté :"}</strong><br/>
                        ${newFilesList.map(f => `• ${f.name}`).join("<br/>")}
                      </blockquote>
                      <p>Vous pouvez vous connecter à votre compte pour les consulter et les télécharger :</p>
                      <div style="margin:20px 0;">
                        <a href="https://vitascienzelab.vercel.app" style="background:#1565C0;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;display:inline-block;">Accéder à mon espace client</a>
                      </div>
                      <p style="color:#546E7A;font-size:12px">Si vous n'avez pas encore créé de compte, vous pouvez le faire en utilisant cette même adresse e-mail (${O.email}) pour y retrouver automatiquement vos documents.</p>
                      <hr style="border:none;border-top:1px solid #ECEFF1;margin:20px 0;"/>
                      <p style="color:#90A4AE;font-size:11px">VITASCIENZELAB &middot; Herboristerie Champenoise</p>
                    </div>`;
                    await jn(O.email, emailSubject, emailHtml).catch(() => {});
                  }
                }
                L(N => ({
                  ...N,
                  client_files: finalFiles
                }));
                B(N => N.map(K => K.id === O.id ? {
                  ...K,
                  client_files: finalFiles
                } : K));
                alert(`✅ ${newFilesList.length} fichier(s) déposé(s) avec succès !`);
              } catch (err) {
                console.error("Admin upload error:", err);
                alert(err.message || "Une erreur est survenue lors de l'enregistrement.");
              } finally {
                c.target.value = "";
              }
            }
          }), O.has_account ? _jsx("button", {
            onClick: () => document.getElementById("clientFileInput").click(),
            style: {
              background: "#F3E5F5",
              border: "1px dashed #6A1B9A",
              color: "#6A1B9A",
              borderRadius: 8,
              padding: "9px",
              fontSize: 12,
              cursor: "pointer",
              width: "100%",
              marginTop: 4,
              fontWeight: 600
            },
            children: "+ Déposer un fichier (facture, document…)"
          }) : _jsx("div", {
            style: {
              background: "#FFF3E0",
              border: "1px solid #FFE0B2",
              color: "#E65100",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 11,
              marginTop: 4,
              fontWeight: 500,
              textAlign: "center",
              lineHeight: "1.4"
            },
            children: "⚠️ Pour déposer des fichiers, ce client doit d'abord créer son compte en ligne avec l'adresse : " + (O.email || "—")
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 16,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F512} Notes priv\xE9es (visibles uniquement par vous)"
          }), _jsx("textarea", {
            value: Wt,
            onChange: c => It(c.target.value),
            placeholder: "Ajouter une note priv\xE9e\u2026",
            style: {
              width: "100%",
              border: `2px solid ${V}`,
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 13,
              color: z,
              outline: "none",
              minHeight: 60,
              resize: "vertical",
              marginBottom: 8
            }
          }), _jsx(ze, {
            onClick: j0,
            style: {
              fontSize: 12,
              padding: "8px 16px"
            },
            children: "+ Ajouter"
          }), Oe.filter(c => c.note && !c.note.includes("📁 FICHIER CLIENT — ") && !c.note.includes("📁 FICHIER ADMIN — ") && !c.note.includes("📁 NOUVEAU FICHIER CLIENT")).map(c => _jsxs("div", {
            style: {
              background: "#FFF8E1",
              borderRadius: 10,
              padding: "12px 14px",
              marginTop: 10,
              borderLeft: "3px solid #FFD54F"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 10,
                color: "#90A4AE",
                marginBottom: 6
              },
              children: Ke(c.created_at)
            }), _jsx("p", {
              style: {
                margin: 0,
                fontSize: 13,
                color: "#546E7A",
                lineHeight: 1.6
              },
              children: c.note
            })]
          }, c.id))]
        })]
      }), E === "activite" && _jsxs("div", {
        children: [_jsx("h3", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            color: z,
            marginBottom: 16
          },
          children: "\u26A1 Journal d'activit\xE9"
        }), wn.length === 0 ? _jsxs("div", {
          style: {
            textAlign: "center",
            padding: "40px 20px",
            color: "#90A4AE"
          },
          children: [_jsx("div", {
            style: {
              fontSize: 40,
              marginBottom: 12
            },
            children: "\u{1F4CB}"
          }), _jsx("p", {
            children: "Aucune activit\xE9 enregistr\xE9e pour l'instant."
          }), _jsx("p", {
            style: {
              fontSize: 12,
              marginTop: 8
            },
            children: "Les actions (ajout de RDV, suppression, etc.) appara\xEEtront ici en temps r\xE9el."
          })]
        }) : _jsx("div", {
          children: wn.map((c, y) => _jsxs("div", {
            style: {
              background: "#fff",
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 10,
              boxShadow: "0 2px 8px rgba(21,101,192,.06)",
              display: "flex",
              gap: 14,
              alignItems: "flex-start"
            },
            children: [_jsx("div", {
              style: {
                width: 36,
                height: 36,
                borderRadius: 10,
                background: V,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0
              },
              children: c.icon
            }), _jsxs("div", {
              style: {
                flex: 1
              },
              children: [_jsx("div", {
                style: {
                  fontSize: 13,
                  fontWeight: 700,
                  color: z
                },
                children: c.msg
              }), c.detail && _jsx("div", {
                style: {
                  fontSize: 12,
                  color: "#78909C",
                  marginTop: 2
                },
                children: c.detail
              })]
            }), _jsx("div", {
              style: {
                fontSize: 11,
                color: "#90A4AE",
                whiteSpace: "nowrap"
              },
              children: c.time
            })]
          }, y))
        })]
      }), E === "stats" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 16,
            display: "flex",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap"
          },
          children: [_jsxs("div", {
            style: {
              textAlign: "center"
            },
            children: [_jsx("img", {
              src: `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent("https://vitascienzelab.vercel.app")}&color=1565C0&bgcolor=ffffff`,
              alt: "QR Code",
              style: {
                width: 100,
                height: 100,
                borderRadius: 8
              }
            }), _jsx("div", {
              style: {
                fontSize: 10,
                color: "#90A4AE",
                marginTop: 6
              },
              children: "Scanner pour r\xE9server"
            })]
          }), _jsxs("div", {
            children: [_jsx("h4", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 16,
                color: z,
                marginBottom: 8
              },
              children: "\u{1F4F1} QR Code de r\xE9servation"
            }), _jsx("p", {
              style: {
                fontSize: 13,
                color: "#546E7A",
                lineHeight: 1.6,
                marginBottom: 12
              },
              children: "Imprimez ce QR code et affichez-le dans votre boutique. Vos clients le scannent et arrivent directement sur votre page de r\xE9servation."
            }), _jsx("a", {
              href: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent("https://vitascienzelab.vercel.app")}&color=1565C0&bgcolor=ffffff`,
              download: "qrcode-vitascienzelab.png",
              target: "_blank",
              style: {
                background: `linear-gradient(135deg,${q},${z})`,
                color: "#fff",
                borderRadius: 10,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block"
              },
              children: "\u2B07 T\xE9l\xE9charger le QR Code"
            })]
          })]
        }), _jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
            gap: 12,
            marginBottom: 22
          },
          children: [["Total s\xE9ances", Hn.total, "\u{1F4C5}", q], ["\xC0 venir", Hn.upcoming, "\u2705", "#2E7D32"], ["Rappels 48h", Gl.length, "\u23F0", "#E65100"], ["Avec docs", Hn.withDocs, "\u{1F4CE}", "#6A1B9A"], ["Clients", Hn.patients, "\u{1F465}", z], ["R\xE9currents", Hn.recurring, "\u{1F501}", "#F57F17"]].map(([c, y, b, _]) => _jsxs("div", {
            style: {
              background: "#fff",
              borderRadius: 14,
              padding: "16px 14px",
              boxShadow: "0 2px 12px rgba(21,101,192,.06)"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 20,
                marginBottom: 4
              },
              children: b
            }), _jsx("div", {
              style: {
                fontSize: 26,
                fontWeight: 800,
                color: _,
                fontFamily: "'Playfair Display',serif"
              },
              children: y
            }), _jsx("div", {
              style: {
                fontSize: 11,
                color: "#78909C"
              },
              children: c
            })]
          }, c))
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "R\xE9partition par type de s\xE9ance"
          }), Hn.byService.map(c => _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                marginBottom: 4
              },
              children: [_jsxs("span", {
                children: [c.icon, " ", c.title]
              }), _jsx("strong", {
                children: c.count
              })]
            }), _jsx("div", {
              style: {
                background: "#E3F0FF",
                borderRadius: 20,
                height: 8,
                overflow: "hidden"
              },
              children: _jsx("div", {
                style: {
                  height: "100%",
                  background: q,
                  width: `${p.length ? Math.round(c.count / p.length * 100) : 0}%`,
                  borderRadius: 20,
                  transition: "width .5s"
                }
              })
            })]
          }, c.id))]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F4E5} Export des donn\xE9es"
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              flexWrap: "wrap"
            },
            children: [_jsx("button", {
              onClick: () => ju(p.filter(c => !at(c) && c.status === "confirmed"), `vita-rdv-avenir-${it(0)}.csv`),
              style: {
                background: `linear-gradient(135deg,${q},${z})`,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 18px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: "\u{1F4CA} Export s\xE9ances \xE0 venir (.csv)"
            }), _jsx("button", {
              onClick: () => ju(p, `vita-historique-${it(0)}.csv`),
              style: {
                background: "#fff",
                color: q,
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F4CA} Export historique complet (.csv)"
            }), _jsx("button", {
              onClick: () => ju(p.filter(c => {
                let y = new Date(),
                  b = c.rdv_date?.slice(0, 7),
                  _ = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}`;
                return b === _;
              }), `vita-mois-${it(0)}.csv`),
              style: {
                background: "#fff",
                color: q,
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F4CA} Export ce mois-ci (.csv)"
            })]
          }), _jsx("p", {
            style: {
              fontSize: 11,
              color: "#90A4AE",
              marginTop: 10
            },
            children: "Fichier CSV compatible Excel, Google Sheets, LibreOffice"
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F4CA} Taux de remplissage"
          }), (() => {
            let b = Je.length * 26,
              _ = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
              G = p.filter(F => F.rdv_date?.startsWith(_) && F.status === "confirmed").length,
              H = Math.min(100, Math.round(G / b * 100));
            return _jsxs("div", {
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  marginBottom: 8,
                  fontWeight: 600
                },
                children: [_jsxs("span", {
                  style: {
                    color: "#546E7A"
                  },
                  children: ["Ce mois (", G, " s\xE9ances / ", b, " cr\xE9neaux disponibles)"]
                }), _jsxs("span", {
                  style: {
                    color: H > 80 ? "#E53935" : H > 50 ? "#FF8F00" : "#2E7D32",
                    fontWeight: 700
                  },
                  children: [H, "%"]
                })]
              }), _jsx("div", {
                style: {
                  background: "#E3F0FF",
                  borderRadius: 20,
                  height: 12,
                  overflow: "hidden"
                },
                children: _jsx("div", {
                  style: {
                    height: "100%",
                    background: H > 80 ? "linear-gradient(135deg,#E53935,#FF8F00)" : H > 50 ? "#FF8F00" : `linear-gradient(135deg,${q},#42A5F5)`,
                    width: `${H}%`,
                    borderRadius: 20,
                    transition: "width .5s"
                  }
                })
              }), _jsx("p", {
                style: {
                  fontSize: 11,
                  color: "#90A4AE",
                  marginTop: 8
                },
                children: H < 30 ? "\u{1F4C8} Agenda bien disponible \u2014 partagez votre lien de r\xE9servation !" : H < 70 ? "\u2705 Bonne activit\xE9 ce mois" : "\u{1F525} Agenda tr\xE8s charg\xE9 ce mois"
              })]
            });
          })()]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "Activit\xE9 sur 6 mois"
          }), _jsx("div", {
            style: {
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
              height: 90
            },
            children: Hn.monthly.map(c => {
              let y = Math.max(...Hn.monthly.map(b => b.count), 1);
              return _jsxs("div", {
                style: {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4
                },
                children: [c.count > 0 && _jsx("span", {
                  style: {
                    fontSize: 10,
                    color: q,
                    fontWeight: 700
                  },
                  children: c.count
                }), _jsx("div", {
                  style: {
                    width: "100%",
                    background: q,
                    borderRadius: "4px 4px 0 0",
                    height: `${Math.round(c.count / y * 64) + 4}px`,
                    minHeight: 4
                  }
                }), _jsx("span", {
                  style: {
                    fontSize: 10,
                    color: "#90A4AE"
                  },
                  children: c.label
                })]
              }, c.label);
            })
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginTop: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F3C6} Fid\xE9lit\xE9 patients"
          }), (() => {
            let c = (b, _) => w.filter(G => {
                let H = p.filter(F => F.patient_email === G.email && F.status !== "cancelled").length;
                return H >= b && (_ === null || H < _);
              }).length,
              y = Math.max(w.length, 1);
            return [["\u{1F195} Inscrits sans s\xE9ance", c(0, 1), "#E8F5E9", "#2E7D32"], ["1\uFE0F\u20E3 Venue une seule fois", c(1, 2), "#E3F0FF", q], ["\u{1F504} Clients r\xE9guliers (2-4 s\xE9ances)", c(2, 5), "#FFF8E1", "#F57F17"], ["\u2B50 Clients fid\xE8les (5+ s\xE9ances)", c(5, null), "#EDE7F6", "#6A1B9A"]].map(([b, _, G, H]) => _jsxs("div", {
              style: {
                marginBottom: 10
              },
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 4
                },
                children: [_jsx("span", {
                  style: {
                    color: "#546E7A"
                  },
                  children: b
                }), _jsxs("strong", {
                  style: {
                    color: H
                  },
                  children: [_, " (", Math.round(_ / y * 100), "%)"]
                })]
              }), _jsx("div", {
                style: {
                  background: "#F0F4FF",
                  borderRadius: 20,
                  height: 8,
                  overflow: "hidden"
                },
                children: _jsx("div", {
                  style: {
                    height: "100%",
                    background: H,
                    width: `${Math.round(_ / y * 100)}%`,
                    borderRadius: 20
                  }
                })
              })]
            }, b));
          })()]
        })]
      }), E === "dispo" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F512} Bloquer une date ou un cr\xE9neau"
          }), _jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 10
            },
            children: [_jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: z,
                  marginBottom: 5
                },
                children: "Date *"
              }), _jsx("input", {
                type: "date",
                value: Ut.blocked_date,
                onChange: c => ja(y => ({
                  ...y,
                  blocked_date: c.target.value
                })),
                style: Vl
              })]
            }), _jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: z,
                  marginBottom: 5
                },
                children: "Cr\xE9neau (vide = journ\xE9e enti\xE8re)"
              }), _jsxs("select", {
                value: Ut.slot,
                onChange: c => ja(y => ({
                  ...y,
                  slot: c.target.value
                })),
                style: Vl,
                children: [_jsx("option", {
                  value: "",
                  children: "Toute la journ\xE9e"
                }), Je.map(c => _jsx("option", {
                  value: c,
                  children: c
                }, c))]
              })]
            })]
          }), _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsx("label", {
              style: {
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                color: z,
                marginBottom: 5
              },
              children: "Motif"
            }), _jsx("input", {
              value: Ut.reason,
              onChange: c => ja(y => ({
                ...y,
                reason: c.target.value
              })),
              placeholder: "Ex : Cong\xE9s, Formation\u2026",
              style: Vl
            })]
          }), _jsx(ze, {
            onClick: L0,
            disabled: !Ut.blocked_date,
            children: "Bloquer ce cr\xE9neau"
          })]
        }), M.length === 0 ? _jsx("p", {
          style: {
            textAlign: "center",
            color: "#90A4AE",
            padding: 20
          },
          children: "Aucun cr\xE9neau bloqu\xE9."
        }) : M.map(c => _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10
          },
          children: [_jsxs("div", {
            children: [_jsxs("div", {
              style: {
                fontSize: 14,
                fontWeight: 700,
                color: z
              },
              children: ["\u{1F6AB} ", Ke(c.blocked_date || c.date), " ", c.slot ? `\xE0 ${c.slot}` : "\u2014 Journ\xE9e enti\xE8re"]
            }), c.reason && _jsx("div", {
              style: {
                fontSize: 12,
                color: "#78909C"
              },
              children: c.reason
            })]
          }), _jsx("button", {
            onClick: () => Y0(c.id),
            style: {
              background: "#FCE4EC",
              border: "none",
              color: "#C62828",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 600
            },
            children: "Supprimer"
          })]
        }, c.id))]
      })]
    })]
  });
}
function Mg({
  rdvId: e,
  onDone: t
}) {
  let [n, l] = useState(null),
    [a, i] = useState({}),
    [u, s] = useState("loading"),
    [r, v] = useState("");
  useEffect(() => {
    if (!e) return;
    fetch(`/api/get-questionnaire-info?id=${e}`).then(res => res.json()).then(data => {
      if (data && data.success && data.appointment) {
        l(data.appointment);
        if (data.alreadyDone) {
          s("already_done");
        } else {
          s("form");
        }
      } else {
        X.get("appointments", `id=eq.${e}`, j).then(g => {
          Array.isArray(g) && g.length > 0 ? (l(g[0]), X.get("questionnaires", `appointment_id=eq.${e}`, j).then(p => {
            Array.isArray(p) && p.length > 0 ? s("already_done") : s("form");
          })) : s("error");
        }).catch(() => s("error"));
      }
    }).catch(() => s("error"));
  }, [e]);
  let S = async () => {
    if (Object.keys(a).length < 1) {
      v("Merci de r\xE9pondre \xE0 au moins la premi\xE8re question.");
      return;
    }
    try {
      await X.post("questionnaires", {
        appointment_id: e,
        patient_id: n?.patient_id || null,
        patient_email: n?.patient_email || "",
        responses: a,
        created_at: new Date().toISOString()
      }, j), s("done");
    } catch {
      v("Erreur lors de l'envoi. R\xE9essayez.");
    }
  };
  if (u === "loading") return _jsx("div", {
    style: {
      textAlign: "center",
      padding: "60px 20px",
      color: q
    },
    children: "\u2697\uFE0F Chargement..."
  });
  if (u === "error") return _jsx("div", {
    style: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#E53935"
    },
    children: "Lien invalide ou expir\xE9."
  });
  if (u === "already_done") return _jsx("div", {
    style: {
      maxWidth: 480,
      margin: "40px auto",
      padding: "0 20px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        padding: 32,
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(21,101,192,.1)"
      },
      children: [_jsx("div", {
        style: {
          fontSize: 48,
          marginBottom: 12
        },
        children: "\u2705"
      }), _jsx("h3", {
        style: {
          fontFamily: "'Playfair Display',serif",
          color: z
        },
        children: "Questionnaire d\xE9j\xE0 compl\xE9t\xE9"
      }), _jsx("p", {
        style: {
          color: "#546E7A",
          fontSize: 13,
          marginTop: 8,
          marginBottom: 20
        },
        children: "Merci, vos r\xE9ponses ont d\xE9j\xE0 \xE9t\xE9 enregistr\xE9es pour cette s\xE9ance."
      }), _jsx(ze, {
        onClick: t,
        children: "\u2190 Retour au site"
      })]
    })
  });
  if (u === "done") return _jsx("div", {
    style: {
      maxWidth: 480,
      margin: "40px auto",
      padding: "0 20px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        padding: 32,
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(21,101,192,.1)"
      },
      children: [_jsx("div", {
        style: {
          fontSize: 48,
          marginBottom: 12
        },
        children: "\u{1F389}"
      }), _jsx("h3", {
        style: {
          fontFamily: "'Playfair Display',serif",
          color: z
        },
        children: "Merci !"
      }), _jsx("p", {
        style: {
          color: "#546E7A",
          fontSize: 13,
          marginTop: 8,
          marginBottom: 20
        },
        children: "Vos r\xE9ponses ont bien \xE9t\xE9 enregistr\xE9es. Alexis les consultera avant votre s\xE9ance pour vous proposer les compl\xE9ments les plus adapt\xE9s."
      }), _jsx(ze, {
        onClick: t,
        children: "\u2190 Retour au site"
      })]
    })
  });
  let E = (g, p) => i(R => ({
    ...R,
    [g]: p
  }));
  return _jsxs("div", {
    style: {
      maxWidth: 560,
      margin: "0 auto",
      padding: "20px 20px 60px"
    },
    children: [_jsxs("div", {
      style: {
        textAlign: "center",
        marginBottom: 24
      },
      children: [_jsx("div", {
        style: {
          fontSize: 36
        },
        children: "\u2697\uFE0F"
      }), _jsx("h2", {
        style: {
          fontFamily: "'Playfair Display',serif",
          fontSize: 22,
          color: z,
          marginTop: 8
        },
        children: "Questionnaire de pr\xE9paration"
      }), _jsxs("p", {
        style: {
          color: "#78909C",
          fontSize: 13,
          marginTop: 4
        },
        children: ["Pour votre s\xE9ance du ", n ? vt(n.rdv_date) : "", " \xE0 ", n?.slot]
      })]
    }), _jsxs("div", {
      style: {
        background: "#FFF8E1",
        borderRadius: 12,
        padding: "12px 16px",
        marginBottom: 20,
        fontSize: 12,
        color: "#E65100",
        lineHeight: 1.6
      },
      children: ["\u2139\uFE0F Ce questionnaire est ", _jsx("strong", {
        children: "enti\xE8rement facultatif"
      }), ". Les informations recueillies servent uniquement \xE0 adapter notre s\xE9lection de compl\xE9ments alimentaires. Elles ne constituent pas un acte m\xE9dical."]
    }), (Vu || Wi).map(g => _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 14,
        padding: "18px 20px",
        marginBottom: 12,
        boxShadow: "0 2px 10px rgba(21,101,192,.06)"
      },
      children: [_jsx("p", {
        style: {
          fontSize: 14,
          fontWeight: 600,
          color: z,
          marginBottom: 12,
          lineHeight: 1.5
        },
        children: g.q
      }), g.type === "radio" && g.opts.map(p => _jsxs("div", {
        children: [_jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 8,
            cursor: "pointer",
            background: a[g.k] === p ? "#E8F0FE" : "#F8FAFF",
            marginBottom: 6,
            border: `1px solid ${a[g.k] === p ? q : V}`
          },
          children: [_jsx("input", {
            type: "radio",
            name: g.k,
            value: p,
            checked: a[g.k] === p,
            onChange: () => E(g.k, p),
            style: {
              accentColor: q
            }
          }), _jsx("span", {
            style: {
              fontSize: 13,
              color: a[g.k] === p ? q : "#546E7A"
            },
            children: p
          })]
        }), p === "Autre objectif de bien-\xEAtre personnel" && a[g.k] === p && _jsx("textarea", {
          value: a[g.k + "_detail"] || "",
          onChange: R => E(g.k + "_detail", R.target.value),
          placeholder: "D\xE9crivez votre objectif bien-\xEAtre personnel\u2026",
          rows: 3,
          style: {
            width: "100%",
            border: `1px solid ${q}`,
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 13,
            color: z,
            resize: "vertical",
            outline: "none",
            marginBottom: 6
          }
        })]
      }, p)), g.type === "scale" && _jsx("div", {
        style: {
          display: "flex",
          gap: 8,
          justifyContent: "center"
        },
        children: [1, 2, 3, 4, 5].map(p => _jsx("button", {
          onClick: () => E(g.k, String(p)),
          style: {
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `2px solid ${a[g.k] === String(p) ? q : V}`,
            background: a[g.k] === String(p) ? q : "#fff",
            color: a[g.k] === String(p) ? "#fff" : z,
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer"
          },
          children: p
        }, p))
      }), g.type === "text" && _jsx("textarea", {
        value: a[g.k] || "",
        onChange: p => E(g.k, p.target.value),
        placeholder: g.ph || "",
        rows: 2,
        style: {
          width: "100%",
          border: `1px solid ${V}`,
          borderRadius: 10,
          padding: "10px 12px",
          fontSize: 13,
          color: z,
          resize: "vertical",
          outline: "none"
        }
      })]
    }, g.k)), r && _jsx("p", {
      style: {
        color: "#E53935",
        fontSize: 13,
        textAlign: "center",
        marginBottom: 12
      },
      children: r
    }), _jsx(ze, {
      onClick: S,
      style: {
        width: "100%",
        marginTop: 8
      },
      children: "\u2705 Envoyer mes r\xE9ponses"
    }), _jsx("button", {
      onClick: t,
      style: {
        width: "100%",
        marginTop: 10,
        background: "none",
        border: "none",
        color: "#90A4AE",
        fontSize: 12,
        cursor: "pointer",
        textDecoration: "underline"
      },
      children: "Passer \u2014 Je ne souhaite pas remplir le questionnaire"
    })]
  });
}
function Zu() {
  let [e, t] = useState("home"),
    [n, l] = useState(null),
    [a, i] = useState(!1),
    [u, s] = useState(null),
    [r, v] = useState(null);
  useEffect(() => {
    let g = new URL(window.location.href),
      p = window.location.hash,
      R = g.searchParams.get("questionnaire");
    if (R) {
      s(R), t("questionnaire"), window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    (p.includes("access_token") || p.includes("error") || g.searchParams.has("code") || g.searchParams.has("error")) && window.history.replaceState({}, document.title, window.location.pathname);
  }, []);
  let S = g => {
      l(g), t("dashboard");
    },
    E = () => {
      l(null), t("home");
    };
  return e === "questionnaire" && u ? _jsx(Mg, {
    rdvId: u,
    onDone: () => {
      t("home"), s(null);
    }
  }) : e === "admin" ? _jsx(Rg, {
    onBack: () => t("home")
  }) : _jsxs("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(180deg,#EBF0FE,#F8FAFF)"
    },
    children: [_jsx("style", {
      children: Yu
    }), a && _jsx(td, {
      onClose: () => i(!1)
    }), _jsx("header", {
      style: {
        background: `linear-gradient(135deg,${z},${q})`,
        padding: "0 20px"
      },
      children: _jsxs("div", {
        style: {
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 0",
          gap: 10,
          flexWrap: "wrap"
        },
        children: [_jsxs("div", {
          onClick: () => window.scrollTo({
            top: 0,
            behavior: "smooth"
          }),
          style: {
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            gap: 12
          },
          children: [_jsx("div", {
            style: {
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(255,255,255,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22
            },
            children: "\u2697\uFE0F"
          }), _jsxs("div", {
            children: [_jsx("div", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 18,
                color: "#fff",
                fontWeight: 700
              },
              children: "VITASCIENZELAB"
            }), _jsx("div", {
              style: {
                fontSize: 10,
                color: "rgba(255,255,255,.6)"
              },
              children: "Herboristerie Champenoise \xB7 Bouilly (Aube)"
            })]
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap"
          },
          children: [n ? _jsxs(_Fragment, {
            children: [_jsxs("span", {
              style: {
                fontSize: 12,
                color: "rgba(255,255,255,.8)"
              },
              children: ["\u{1F464} ", n.prenom]
            }), _jsx("button", {
              onClick: () => t("dashboard"),
              style: {
                background: "rgba(255,255,255,.15)",
                border: "1px solid rgba(255,255,255,.3)",
                color: "#fff",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 11
              },
              children: "Mon espace"
            }), _jsx("button", {
              onClick: E,
              style: {
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "rgba(255,255,255,.7)",
                borderRadius: 8,
                padding: "6px 10px",
                fontSize: 11
              },
              children: "D\xE9co."
            })]
          }) : _jsx("button", {
            onClick: () => t("auth"),
            style: {
              background: "rgba(255,255,255,.15)",
              border: "1px solid rgba(255,255,255,.3)",
              color: "#fff",
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12
            },
            children: "\u{1F464} Espace client"
          }), _jsx("button", {
            onClick: () => t("admin"),
            style: {
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.15)",
              color: "rgba(255,255,255,.6)",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 11
            },
            children: "\u{1F510} Admin"
          })]
        })]
      })
    }), e === "home" && _jsxs("div", {
      style: {
        maxWidth: 800,
        margin: "0 auto",
        padding: "44px 20px 80px"
      },
      children: [ee && _jsxs("div", {
        style: {
          background: "#FFF8E1",
          border: "1px solid #FFD54F",
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 24,
          textAlign: "center",
          fontSize: 12,
          color: "#F57F17"
        },
        children: ["\u{1F3AD} ", _jsx("strong", {
          children: "Mode d\xE9mo"
        }), " \u2014 Remplacez SB_URL et SB_KEY pour connecter Supabase"]
      }), _jsxs("div", {
        style: {
          textAlign: "center",
          marginBottom: 40
        },
        children: [_jsx("div", {
          style: {
            fontSize: 52,
            marginBottom: 14
          },
          children: "\u2697\uFE0F"
        }), _jsx("h1", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 30,
            color: z,
            marginBottom: 8
          },
          children: "VITASCIENZELAB"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 6
          },
          children: "Herboristerie Champenoise \xB7 Bouilly (Aube)"
        }), _jsxs("p", {
          style: {
            color: "#546E7A",
            fontSize: 13,
            lineHeight: 1.7,
            marginBottom: 28
          },
          children: [ye.owner, " \xB7 ", ye.role, _jsx("br", {}), "Compl\xE9ments Alimentaires \xB7 Phytoth\xE9rapie \xB7 Nutraceutiques \xB7 Aromath\xE9rapie"]
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap"
          },
          children: [_jsx(ze, {
            onClick: () => t("booking"),
            style: {
              fontSize: 15,
              padding: "14px 28px"
            },
            children: "\u{1F4C5} R\xE9server une s\xE9ance"
          }), _jsx(ot, {
            onClick: () => t("auth"),
            style: {
              fontSize: 15,
              padding: "14px 28px"
            },
            children: "\u{1F464} Mon espace client"
          })]
        })]
      }), _jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 14
        },
        children: $l.map(g => _jsxs("div", {
          onClick: () => t("booking"),
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: "22px 20px",
            boxShadow: "0 2px 16px rgba(21,101,192,.08)",
            cursor: "pointer",
            border: `2px solid ${V}`,
            transition: "all .2s"
          },
          children: [_jsx("div", {
            style: {
              fontSize: 28,
              marginBottom: 10
            },
            children: g.icon
          }), _jsx("div", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 16,
              color: z,
              marginBottom: 6
            },
            children: g.title
          }), _jsx(We, {
            children: g.dur
          }), _jsx("p", {
            style: {
              fontSize: 12,
              color: "#90A4AE",
              lineHeight: 1.5,
              marginTop: 10
            },
            children: g.desc
          })]
        }, g.id))
      })]
    }), e === "auth" && _jsx(Dg, {
      onAuth: S,
      onBack: () => t("home")
    }), e === "dashboard" && n && _jsx(Tg, {
      user: n,
      onUpdateUser: g => l(g),
      onBook: g => {
        g && g.guestPrenom ? v(g) : v(null), t("booking");
      },
      onLogout: E
    }), e === "booking" && _jsx(Bg, {
      user: n,
      guestBooking: r,
      onDone: () => {
        v(null), t(n ? "dashboard" : "home");
      }
    }), _jsx("footer", {
      style: {
        background: "#fff",
        borderTop: `1px solid ${V}`,
        padding: "14px 20px",
        textAlign: "center"
      },
      children: _jsxs("div", {
        style: {
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          alignItems: "center"
        },
        children: [_jsxs("span", {
          style: {
            fontSize: 10,
            color: "#B0BEC5"
          },
          children: ["\xA9 ", new Date().getFullYear(), " VITASCIENZELAB \u2013 Herboristerie Champenoise \xB7 SIRET ", ye.siret, " \xB7 NAF ", ye.naf]
        }), _jsx("span", {
          style: {
            color: "#CFD8DC"
          },
          children: "\xB7"
        }), _jsx("button", {
          onClick: () => i(!0),
          style: {
            background: "none",
            border: "none",
            color: "#90A4AE",
            fontSize: 10,
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0
          },
          children: "Mentions l\xE9gales & cadre r\xE9glementaire"
        }), _jsx("span", {
          style: {
            color: "#CFD8DC"
          },
          children: "\xB7"
        }), _jsx("span", {
          style: {
            fontSize: 10,
            color: "#B0BEC5"
          },
          children: "Conseil en compl\xE9ments alimentaires \u2014 Ne constitue pas un acte m\xE9dical \u2014 Ne se substitue pas \xE0 l'avis d'un m\xE9decin"
        })]
      })
    })]
  });
}
export default Zu;
