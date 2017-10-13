! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("wxapi", [], t) : "object" == typeof exports ? exports.wxapi = t() : e.wxapi = t()
}(this, function () {
  return function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = n[o] = {
        i: o,
        l: !1,
        exports: {}
      };
      return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.i = function (e) {
      return e
    }, t.d = function (e, n, o) {
      t.o(e, n) || Object.defineProperty(e, n, {
        configurable: !1,
        enumerable: !0,
        get: o
      })
    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return t.d(n, "a", n), n
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 72)
  }([function (e, t, n) {
    "use strict";

    function o(e) {
      e = e.split("?");
      var t = e.length > 1 ? e[1] : "",
        n = {
          path: e[0],
          query: {}
        };
      return t.split("&").forEach(function (e) {
        e = e.split("="), e.length > 1 && (n.query[e[0]] = e[1])
      }), n
    }

    function r(e, t, n, o) {
      var r = "ok" === t ? "success" : "fail";
      if (n) {
        var i = (0, c.default)({}, {
          errMsg: e + ":" + t
        }, o || {});
        n[r] && n[r](i), n.complete && n.complete(i)
      }
    }

    function i(e, t) {
      "function" == typeof e[t] && e[t](), e.$children.forEach(function (e) {
        i(e, t)
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = n(22),
      c = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(a);
    t.parseUrl = o, t.result = r, t.invokeComMethod = i
  }, function (e, t) {
    var n = e.exports = {
      version: "2.4.0"
    };
    "number" == typeof __e && (__e = n)
  }, function (e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
  }, function (e, t, n) {
    "use strict";
    (function (o) {
      var r, i = n(17),
        a = function (e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i);
      ! function (o, i) {
        void 0 !== (r = function () {
          return i(o)
        }.call(t, n, t, e)) && (e.exports = r)
      }(window || o, function (e, t) {
        function n(t, n, o) {
          e.WeixinJSBridge ? WeixinJSBridge.invoke(t, r(n), function (e) {
            u(t, e, o)
          }) : f(t, o)
        }

        function o(t, n, o) {
          e.WeixinJSBridge ? WeixinJSBridge.on(t, function (e) {
            o && o.trigger && o.trigger(e), u(t, e, n)
          }) : o ? f(t, o) : f(t, n)
        }

        function r(e) {
          return e = e || {}, e.appId = C.appId, e.verifyAppId = C.appId, e.verifySignType = "sha1", e.verifyTimestamp = C.timestamp + "", e.verifyNonceStr = C.nonceStr, e.verifySignature = C.signature, e
        }

        function i(e) {
          return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
          }
        }

        function c(e) {
          return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e
        }

        function u(e, t, n) {
          var o, r;
          switch ("openEnterpriseChat" == e && (t.errCode = t.err_code), delete t.err_code, delete t.err_desc, delete t.err_detail, o = t.errMsg, o || (o = t.err_msg, delete t.err_msg, o = s(e, o), t.errMsg = o), n = n || {}, n._complete && (n._complete(t), delete n._complete), o = t.errMsg || "", C.debug && !n.isInnerInvoke && alert((0, a.default)(t)), r = o.indexOf(":"), o.substring(r + 1)) {
            case "ok":
              n.success && n.success(t);
              break;
            case "cancel":
              n.cancel && n.cancel(t);
              break;
            default:
              n.fail && n.fail(t)
          }
          n.complete && n.complete(t)
        }

        function s(e, t) {
          var n, o, r = e,
            i = y[r];
          return i && (r = i), n = "ok", t && (o = t.indexOf(":"), n = t.substring(o + 1), "confirm" == n && (n = "ok"), "failed" == n && (n = "fail"), -1 != n.indexOf("failed_") && (n = n.substring(7)), -1 != n.indexOf("fail_") && (n = n.substring(5)), n = n.replace(/_/g, " "), n = n.toLowerCase(), ("access denied" == n || "no permission to execute" == n) && (n = "permission denied"), "config" == r && "function not exist" == n && (n = "ok"), "" == n && (n = "fail")), t = r + ":" + n
        }

        function l(e) {
          var t, n, o, r;
          if (e) {
            for (t = 0, n = e.length; n > t; ++t) o = e[t], (r = v[o]) && (e[t] = r);
            return e
          }
        }

        function f(e, t) {
          if (!(!C.debug || t && t.isInnerInvoke)) {
            var n = y[e];
            n && (e = n), t && t._complete && delete t._complete, console.log('"' + e + '",', t || "")
          }
        }

        function d() {
          if (!(k || b || C.debug || "6.0.2" > I || P.systemType < 0)) {
            var e = new Image;
            P.appId = C.appId, P.initTime = O.initEndTime - O.initStartTime, P.preVerifyTime = O.preVerifyEndTime - O.preVerifyStartTime, L.getNetworkType({
              isInnerInvoke: !0,
              success: function (t) {
                P.networkType = t.networkType;
                var n = "https://open.weixin.qq.com/sdk/report?v=" + P.version + "&o=" + P.isPreVerifyOk + "&s=" + P.systemType + "&c=" + P.clientVersion + "&a=" + P.appId + "&n=" + P.networkType + "&i=" + P.initTime + "&p=" + P.preVerifyTime + "&u=" + P.url;
                e.src = n
              }
            })
          }
        }

        function p() {
          return (new Date).getTime()
        }

        function h(t) {
          x && (e.WeixinJSBridge ? t() : m.addEventListener && m.addEventListener("WeixinJSBridgeReady", t, !1))
        }

        function g() {
          L.invoke || (L.invoke = function (t, n, o) {
            e.WeixinJSBridge && WeixinJSBridge.invoke(t, r(n), o)
          }, L.on = function (t, n) {
            e.WeixinJSBridge && WeixinJSBridge.on(t, n)
          })
        }
        var v, y, m, S, w, _, k, b, x, T, M, I, O, P, C, j, R, L;
        if (!e.jWeixin) return v = {
          config: "preVerifyJSAPI",
          onMenuShareTimeline: "menu:share:timeline",
          onMenuShareAppMessage: "menu:share:appmessage",
          onMenuShareQQ: "menu:share:qq",
          onMenuShareWeibo: "menu:share:weiboApp",
          onMenuShareQZone: "menu:share:QZone",
          previewImage: "imagePreview",
          getLocation: "geoLocation",
          openProductSpecificView: "openProductViewWithPid",
          addCard: "batchAddCard",
          openCard: "batchViewCard",
          chooseWXPay: "getBrandWCPayRequest",
          openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
          startSearchBeacons: "startMonitoringBeacons",
          stopSearchBeacons: "stopMonitoringBeacons",
          onSearchBeacons: "onBeaconsInRange",
          consumeAndShareCard: "consumedShareCard",
          openAddress: "editAddress"
        }, y = function () {
          var e, t = {};
          for (e in v) t[v[e]] = e;
          return t
        }(), m = e.document, S = m.title, w = navigator.userAgent.toLowerCase(), _ = navigator.platform.toLowerCase(), k = !(!_.match("mac") && !_.match("win")), b = -1 != w.indexOf("wxdebugger"), x = -1 != w.indexOf("micromessenger"), T = -1 != w.indexOf("android"), M = -1 != w.indexOf("iphone") || -1 != w.indexOf("ipad"), I = function () {
          var e = w.match(/micromessenger\/(\d+\.\d+\.\d+)/) || w.match(/micromessenger\/(\d+\.\d+)/);
          return e ? e[1] : ""
        }(), O = {
          initStartTime: p(),
          initEndTime: 0,
          preVerifyStartTime: 0,
          preVerifyEndTime: 0
        }, P = {
          version: 1,
          appId: "",
          initTime: 0,
          preVerifyTime: 0,
          networkType: "",
          isPreVerifyOk: 1,
          systemType: M ? 1 : T ? 2 : -1,
          clientVersion: I,
          url: encodeURIComponent(location.href)
        }, C = {}, j = {
          _completes: []
        }, R = {
          state: 0,
          data: {}
        }, h(function () {
          O.initEndTime = p()
        }), L = {
          config: function (e) {
            C = e, f("config", e);
            var t = !1 !== C.check;
            h(function () {
              var e, o, r;
              if (t) n(v.config, {
                verifyJsApiList: l(C.jsApiList)
              }, function () {
                j._complete = function (e) {
                  O.preVerifyEndTime = p(), R.state = 1, R.data = e
                }, j.success = function () {
                  P.isPreVerifyOk = 0
                }, j.fail = function (e) {
                  j._fail ? j._fail(e) : R.state = -1
                };
                var e = j._completes;
                return e.push(function () {
                  d()
                }), j.complete = function () {
                  for (var t = 0, n = e.length; n > t; ++t) e[t]();
                  j._completes = []
                }, j
              }()), O.preVerifyStartTime = p();
              else {
                for (R.state = 1, e = j._completes, o = 0, r = e.length; r > o; ++o) e[o]();
                j._completes = []
              }
            }), C.beta && g()
          },
          ready: function (e) {
            0 != R.state ? e() : (j._completes.push(e), !x && C.debug && e())
          },
          error: function (e) {
            "6.0.2" > I || (-1 == R.state ? e(R.data) : j._fail = e)
          },
          checkJsApi: function (e) {
            var t = function (e) {
              var t, n, o = e.checkResult;
              for (t in o)(n = y[t]) && (o[n] = o[t], delete o[t]);
              return e
            };
            n("checkJsApi", {
              jsApiList: l(e.jsApiList)
            }, function () {
              return e._complete = function (e) {
                if (T) {
                  var n = e.checkResult;
                  n && (e.checkResult = JSON.parse(n))
                }
                e = t(e)
              }, e
            }())
          },
          onMenuShareTimeline: function (e) {
            o(v.onMenuShareTimeline, {
              complete: function () {
                n("shareTimeline", {
                  title: e.title || S,
                  desc: e.title || S,
                  img_url: e.imgUrl || "",
                  link: e.link || location.href,
                  type: e.type || "link",
                  data_url: e.dataUrl || ""
                }, e)
              }
            }, e)
          },
          onMenuShareAppMessage: function (e) {
            o(v.onMenuShareAppMessage, {
              complete: function () {
                n("sendAppMessage", {
                  title: e.title || S,
                  desc: e.desc || "",
                  link: e.link || location.href,
                  img_url: e.imgUrl || "",
                  type: e.type || "link",
                  data_url: e.dataUrl || ""
                }, e)
              }
            }, e)
          },
          onMenuShareQQ: function (e) {
            o(v.onMenuShareQQ, {
              complete: function () {
                n("shareQQ", {
                  title: e.title || S,
                  desc: e.desc || "",
                  img_url: e.imgUrl || "",
                  link: e.link || location.href
                }, e)
              }
            }, e)
          },
          onMenuShareWeibo: function (e) {
            o(v.onMenuShareWeibo, {
              complete: function () {
                n("shareWeiboApp", {
                  title: e.title || S,
                  desc: e.desc || "",
                  img_url: e.imgUrl || "",
                  link: e.link || location.href
                }, e)
              }
            }, e)
          },
          onMenuShareQZone: function (e) {
            o(v.onMenuShareQZone, {
              complete: function () {
                n("shareQZone", {
                  title: e.title || S,
                  desc: e.desc || "",
                  img_url: e.imgUrl || "",
                  link: e.link || location.href
                }, e)
              }
            }, e)
          },
          startRecord: function (e) {
            n("startRecord", {}, e)
          },
          stopRecord: function (e) {
            n("stopRecord", {}, e)
          },
          onVoiceRecordEnd: function (e) {
            o("onVoiceRecordEnd", e)
          },
          playVoice: function (e) {
            n("playVoice", {
              localId: e.localId
            }, e)
          },
          pauseVoice: function (e) {
            n("pauseVoice", {
              localId: e.localId
            }, e)
          },
          stopVoice: function (e) {
            n("stopVoice", {
              localId: e.localId
            }, e)
          },
          onVoicePlayEnd: function (e) {
            o("onVoicePlayEnd", e)
          },
          uploadVoice: function (e) {
            n("uploadVoice", {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
          },
          downloadVoice: function (e) {
            n("downloadVoice", {
              serverId: e.serverId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
          },
          translateVoice: function (e) {
            n("translateVoice", {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
          },
          chooseImage: function (e) {
            n("chooseImage", {
              scene: "1|2",
              count: e.count || 9,
              sizeType: e.sizeType || ["original", "compressed"],
              sourceType: e.sourceType || ["album", "camera"]
            }, function () {
              return e._complete = function (e) {
                if (T) {
                  var t = e.localIds;
                  t && (e.localIds = JSON.parse(t))
                }
              }, e
            }())
          },
          previewImage: function (e) {
            n(v.previewImage, {
              current: e.current,
              urls: e.urls
            }, e)
          },
          uploadImage: function (e) {
            n("uploadImage", {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
          },
          downloadImage: function (e) {
            n("downloadImage", {
              serverId: e.serverId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
          },
          getNetworkType: function (e) {
            var t = function (e) {
              var t, n, o, r = e.errMsg;
              if (e.errMsg = "getNetworkType:ok", t = e.subtype, delete e.subtype, t) e.networkType = t;
              else switch (n = r.indexOf(":"), o = r.substring(n + 1)) {
                case "wifi":
                case "edge":
                case "wwan":
                  e.networkType = o;
                  break;
                default:
                  e.errMsg = "getNetworkType:fail"
              }
              return e
            };
            n("getNetworkType", {}, function () {
              return e._complete = function (e) {
                e = t(e)
              }, e
            }())
          },
          openLocation: function (e) {
            n("openLocation", {
              latitude: e.latitude,
              longitude: e.longitude,
              name: e.name || "",
              address: e.address || "",
              scale: e.scale || 28,
              infoUrl: e.infoUrl || ""
            }, e)
          },
          getLocation: function (e) {
            e = e || {}, n(v.getLocation, {
              type: e.type || "wgs84"
            }, function () {
              return e._complete = function (e) {
                delete e.type
              }, e
            }())
          },
          hideOptionMenu: function (e) {
            n("hideOptionMenu", {}, e)
          },
          showOptionMenu: function (e) {
            n("showOptionMenu", {}, e)
          },
          closeWindow: function (e) {
            e = e || {}, n("closeWindow", {}, e)
          },
          hideMenuItems: function (e) {
            n("hideMenuItems", {
              menuList: e.menuList
            }, e)
          },
          showMenuItems: function (e) {
            n("showMenuItems", {
              menuList: e.menuList
            }, e)
          },
          hideAllNonBaseMenuItem: function (e) {
            n("hideAllNonBaseMenuItem", {}, e)
          },
          showAllNonBaseMenuItem: function (e) {
            n("showAllNonBaseMenuItem", {}, e)
          },
          scanQRCode: function (e) {
            e = e || {}, n("scanQRCode", {
              needResult: e.needResult || 0,
              scanType: e.scanType || ["qrCode", "barCode"]
            }, function () {
              return e._complete = function (e) {
                var t, n;
                M && (t = e.resultStr) && (n = JSON.parse(t), e.resultStr = n && n.scan_code && n.scan_code.scan_result)
              }, e
            }())
          },
          openAddress: function (e) {
            n(v.openAddress, {}, function () {
              return e._complete = function (e) {
                e = c(e)
              }, e
            }())
          },
          openProductSpecificView: function (e) {
            n(v.openProductSpecificView, {
              pid: e.productId,
              view_type: e.viewType || 0,
              ext_info: e.extInfo
            }, e)
          },
          addCard: function (e) {
            var t, o, r, i, a = e.cardList,
              c = [];
            for (t = 0, o = a.length; o > t; ++t) r = a[t], i = {
              card_id: r.cardId,
              card_ext: r.cardExt
            }, c.push(i);
            n(v.addCard, {
              card_list: c
            }, function () {
              return e._complete = function (e) {
                var t, n, o, r = e.card_list;
                if (r) {
                  for (r = JSON.parse(r), t = 0, n = r.length; n > t; ++t) o = r[t], o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ;
                  e.cardList = r, delete e.card_list
                }
              }, e
            }())
          },
          chooseCard: function (e) {
            n("chooseCard", {
              app_id: C.appId,
              location_id: e.shopId || "",
              sign_type: e.signType || "SHA1",
              card_id: e.cardId || "",
              card_type: e.cardType || "",
              card_sign: e.cardSign,
              time_stamp: e.timestamp + "",
              nonce_str: e.nonceStr
            }, function () {
              return e._complete = function (e) {
                e.cardList = e.choose_card_info, delete e.choose_card_info
              }, e
            }())
          },
          openCard: function (e) {
            var t, o, r, i, a = e.cardList,
              c = [];
            for (t = 0, o = a.length; o > t; ++t) r = a[t], i = {
              card_id: r.cardId,
              code: r.code
            }, c.push(i);
            n(v.openCard, {
              card_list: c
            }, e)
          },
          consumeAndShareCard: function (e) {
            n(v.consumeAndShareCard, {
              consumedCardId: e.cardId,
              consumedCode: e.code
            }, e)
          },
          chooseWXPay: function (e) {
            n(v.chooseWXPay, i(e), e)
          },
          openEnterpriseRedPacket: function (e) {
            n(v.openEnterpriseRedPacket, i(e), e)
          },
          startSearchBeacons: function (e) {
            n(v.startSearchBeacons, {
              ticket: e.ticket
            }, e)
          },
          stopSearchBeacons: function (e) {
            n(v.stopSearchBeacons, {}, e)
          },
          onSearchBeacons: function (e) {
            o(v.onSearchBeacons, e)
          },
          openEnterpriseChat: function (e) {
            n("openEnterpriseChat", {
              useridlist: e.userIds,
              chatname: e.groupName
            }, e)
          }
        }, t && (e.wx = e.jWeixin = L), L
      })
    }).call(t, n(122))
  }, function (e, t, n) {
    e.exports = !n(10)(function () {
      return 7 != Object.defineProperty({}, "a", {
        get: function () {
          return 7
        }
      }).a
    })
  }, function (e, t, n) {
    var o = n(2),
      r = n(1),
      i = n(39),
      a = n(11),
      c = function (e, t, n) {
        var u, s, l, f = e & c.F,
          d = e & c.G,
          p = e & c.S,
          h = e & c.P,
          g = e & c.B,
          v = e & c.W,
          y = d ? r : r[t] || (r[t] = {}),
          m = y.prototype,
          S = d ? o : p ? o[t] : (o[t] || {}).prototype;
        d && (n = t);
        for (u in n)(s = !f && S && void 0 !== S[u]) && u in y || (l = s ? S[u] : n[u], y[u] = d && "function" != typeof S[u] ? n[u] : g && s ? i(l, o) : v && S[u] == l ? function (e) {
          var t = function (t, n, o) {
            if (this instanceof e) {
              switch (arguments.length) {
                case 0:
                  return new e;
                case 1:
                  return new e(t);
                case 2:
                  return new e(t, n)
              }
              return new e(t, n, o)
            }
            return e.apply(this, arguments)
          };
          return t.prototype = e.prototype, t
        }(l) : h && "function" == typeof l ? i(Function.call, l) : l, h && ((y.virtual || (y.virtual = {}))[u] = l, e & c.R && m && !m[u] && a(m, u, l)))
      };
    c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
  }, function (e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function (e, t) {
      return n.call(e, t)
    }
  }, function (e, t, n) {
    var o = n(15),
      r = n(41),
      i = n(34),
      a = Object.defineProperty;
    t.f = n(4) ? Object.defineProperty : function (e, t, n) {
      if (o(e), t = i(t, !0), o(n), r) try {
        return a(e, t, n)
      } catch (e) {}
      if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
      return "value" in n && (e[t] = n.value), e
    }
  }, function (e, t, n) {
    var o = n(42),
      r = n(24);
    e.exports = function (e) {
      return o(r(e))
    }
  }, function (e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function (e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
  }, function (e, t) {
    e.exports = function (e) {
      try {
        return !!e()
      } catch (e) {
        return !0
      }
    }
  }, function (e, t, n) {
    var o = n(7),
      r = n(19);
    e.exports = n(4) ? function (e, t, n) {
      return o.f(e, t, r(1, n))
    } : function (e, t, n) {
      return e[t] = n, e
    }
  }, function (e, t, n) {
    var o = n(47),
      r = n(25);
    e.exports = Object.keys || function (e) {
      return o(e, r)
    }
  }, function (e, t, n) {
    var o = n(32)("wks"),
      r = n(21),
      i = n(2).Symbol,
      a = "function" == typeof i;
    (e.exports = function (e) {
      return o[e] || (o[e] = a && i[e] || (a ? i : r)("Symbol." + e))
    }).store = o
  }, function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var o = n(76),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o);
    t.default = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), (0, r.default)(e, o.key, o)
        }
      }
      return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t
      }
    }()
  }, function (e, t, n) {
    var o = n(16);
    e.exports = function (e) {
      if (!o(e)) throw TypeError(e + " is not an object!");
      return e
    }
  }, function (e, t) {
    e.exports = function (e) {
      return "object" == typeof e ? null !== e : "function" == typeof e
    }
  }, function (e, t, n) {
    e.exports = {
      default: n(83),
      __esModule: !0
    }
  }, function (e, t) {
    t.f = {}.propertyIsEnumerable
  }, function (e, t) {
    e.exports = function (e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      }
    }
  }, function (e, t, n) {
    var o = n(24);
    e.exports = function (e) {
      return Object(o(e))
    }
  }, function (e, t) {
    var n = 0,
      o = Math.random();
    e.exports = function (e) {
      return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + o).toString(36))
    }
  }, function (e, t, n) {
    e.exports = {
      default: n(84),
      __esModule: !0
    }
  }, function (e, t, n) {
    e.exports = {
      default: n(88),
      __esModule: !0
    }
  }, function (e, t) {
    e.exports = function (e) {
      if (void 0 == e) throw TypeError("Can't call method on  " + e);
      return e
    }
  }, function (e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
  }, function (e, t) {
    e.exports = {}
  }, function (e, t) {
    e.exports = !0
  }, function (e, t, n) {
    var o = n(15),
      r = n(103),
      i = n(25),
      a = n(31)("IE_PROTO"),
      c = function () {},
      u = function () {
        var e, t = n(40)("iframe"),
          o = i.length;
        for (t.style.display = "none", n(96).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object<\/script>"), e.close(), u = e.F; o--;) delete u.prototype[i[o]];
        return u()
      };
    e.exports = Object.create || function (e, t) {
      var n;
      return null !== e ? (c.prototype = o(e), n = new c, c.prototype = null, n[a] = e) : n = u(), void 0 === t ? n : r(n, t)
    }
  }, function (e, t) {
    t.f = Object.getOwnPropertySymbols
  }, function (e, t, n) {
    var o = n(7).f,
      r = n(6),
      i = n(13)("toStringTag");
    e.exports = function (e, t, n) {
      e && !r(e = n ? e : e.prototype, i) && o(e, i, {
        configurable: !0,
        value: t
      })
    }
  }, function (e, t, n) {
    var o = n(32)("keys"),
      r = n(21);
    e.exports = function (e) {
      return o[e] || (o[e] = r(e))
    }
  }, function (e, t, n) {
    var o = n(2),
      r = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
    e.exports = function (e) {
      return r[e] || (r[e] = {})
    }
  }, function (e, t) {
    var n = Math.ceil,
      o = Math.floor;
    e.exports = function (e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? o : n)(e)
    }
  }, function (e, t, n) {
    var o = n(16);
    e.exports = function (e, t) {
      if (!o(e)) return e;
      var n, r;
      if (t && "function" == typeof (n = e.toString) && !o(r = n.call(e))) return r;
      if ("function" == typeof (n = e.valueOf) && !o(r = n.call(e))) return r;
      if (!t && "function" == typeof (n = e.toString) && !o(r = n.call(e))) return r;
      throw TypeError("Can't convert object to primitive value")
    }
  }, function (e, t, n) {
    var o = n(2),
      r = n(1),
      i = n(27),
      a = n(36),
      c = n(7).f;
    e.exports = function (e) {
      var t = r.Symbol || (r.Symbol = i ? {} : o.Symbol || {});
      "_" == e.charAt(0) || e in t || c(t, e, {
        value: a.f(e)
      })
    }
  }, function (e, t, n) {
    t.f = n(13)
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    t.__esModule = !0;
    var r = n(80),
      i = o(r),
      a = n(79),
      c = o(a),
      u = "function" == typeof c.default && "symbol" == typeof i.default ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof c.default && e.constructor === c.default && e !== c.default.prototype ? "symbol" : typeof e
      };
    t.default = "function" == typeof c.default && "symbol" === u(i.default) ? function (e) {
      return void 0 === e ? "undefined" : u(e)
    } : function (e) {
      return e && "function" == typeof c.default && e.constructor === c.default && e !== c.default.prototype ? "symbol" : void 0 === e ? "undefined" : u(e)
    }
  }, function (e, t) {
    var n = {}.toString;
    e.exports = function (e) {
      return n.call(e).slice(8, -1)
    }
  }, function (e, t, n) {
    var o = n(92);
    e.exports = function (e, t, n) {
      if (o(e), void 0 === t) return e;
      switch (n) {
        case 1:
          return function (n) {
            return e.call(t, n)
          };
        case 2:
          return function (n, o) {
            return e.call(t, n, o)
          };
        case 3:
          return function (n, o, r) {
            return e.call(t, n, o, r)
          }
      }
      return function () {
        return e.apply(t, arguments)
      }
    }
  }, function (e, t, n) {
    var o = n(16),
      r = n(2).document,
      i = o(r) && o(r.createElement);
    e.exports = function (e) {
      return i ? r.createElement(e) : {}
    }
  }, function (e, t, n) {
    e.exports = !n(4) && !n(10)(function () {
      return 7 != Object.defineProperty(n(40)("div"), "a", {
        get: function () {
          return 7
        }
      }).a
    })
  }, function (e, t, n) {
    var o = n(38);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
      return "String" == o(e) ? e.split("") : Object(e)
    }
  }, function (e, t, n) {
    "use strict";
    var o = n(27),
      r = n(5),
      i = n(49),
      a = n(11),
      c = n(6),
      u = n(26),
      s = n(98),
      l = n(30),
      f = n(46),
      d = n(13)("iterator"),
      p = !([].keys && "next" in [].keys()),
      h = function () {
        return this
      };
    e.exports = function (e, t, n, g, v, y, m) {
      s(n, t, g);
      var S, w, _, k = function (e) {
          if (!p && e in M) return M[e];
          switch (e) {
            case "keys":
            case "values":
              return function () {
                return new n(this, e)
              }
          }
          return function () {
            return new n(this, e)
          }
        },
        b = t + " Iterator",
        x = "values" == v,
        T = !1,
        M = e.prototype,
        I = M[d] || M["@@iterator"] || v && M[v],
        O = I || k(v),
        P = v ? x ? k("entries") : O : void 0,
        C = "Array" == t ? M.entries || I : I;
      if (C && (_ = f(C.call(new e))) !== Object.prototype && (l(_, b, !0), o || c(_, d) || a(_, d, h)), x && I && "values" !== I.name && (T = !0, O = function () {
          return I.call(this)
        }), o && !m || !p && !T && M[d] || a(M, d, O), u[t] = O, u[b] = h, v)
        if (S = {
            values: x ? O : k("values"),
            keys: y ? O : k("keys"),
            entries: P
          }, m)
          for (w in S) w in M || i(M, w, S[w]);
        else r(r.P + r.F * (p || T), t, S);
      return S
    }
  }, function (e, t, n) {
    var o = n(18),
      r = n(19),
      i = n(8),
      a = n(34),
      c = n(6),
      u = n(41),
      s = Object.getOwnPropertyDescriptor;
    t.f = n(4) ? s : function (e, t) {
      if (e = i(e), t = a(t, !0), u) try {
        return s(e, t)
      } catch (e) {}
      if (c(e, t)) return r(!o.f.call(e, t), e[t])
    }
  }, function (e, t, n) {
    var o = n(47),
      r = n(25).concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function (e) {
      return o(e, r)
    }
  }, function (e, t, n) {
    var o = n(6),
      r = n(20),
      i = n(31)("IE_PROTO"),
      a = Object.prototype;
    e.exports = Object.getPrototypeOf || function (e) {
      return e = r(e), o(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
    }
  }, function (e, t, n) {
    var o = n(6),
      r = n(8),
      i = n(94)(!1),
      a = n(31)("IE_PROTO");
    e.exports = function (e, t) {
      var n, c = r(e),
        u = 0,
        s = [];
      for (n in c) n != a && o(c, n) && s.push(n);
      for (; t.length > u;) o(c, n = t[u++]) && (~i(s, n) || s.push(n));
      return s
    }
  }, function (e, t, n) {
    var o = n(5),
      r = n(1),
      i = n(10);
    e.exports = function (e, t) {
      var n = (r.Object || {})[e] || Object[e],
        a = {};
      a[e] = t(n), o(o.S + o.F * i(function () {
        n(1)
      }), "Object", a)
    }
  }, function (e, t, n) {
    e.exports = n(11)
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(9),
      i = o(r),
      a = n(14),
      c = o(a),
      u = n(0),
      s = function () {
        function e(t) {
          (0, i.default)(this, e), this.mapObj = t
        }
        return (0, c.default)(e, [{
          key: "getCenterLocation",
          value: function (e) {
            if (e) {
              var t = this.mapObj.getCenter(),
                n = t.getLat(),
                o = t.getLng(),
                r = {
                  latitude: n,
                  longitude: o
                };
              (0, u.result)("getCenterLocation", "ok", e, r)
            }
          }
        }, {
          key: "moveToLocation",
          value: function () {}
        }]), e
      }();
    t.default = {
      createMapContext: function (e) {
        var t = document.getElementById(e);
        return t && t._map ? new s(t._map) : null
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(3),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o),
      i = n(0);
    t.default = {
      requestPayment: function (e) {
        e && r.default.chooseWXPay({
          timestamp: e.timeStamp,
          nonceStr: e.nonceStr,
          package: e.package,
          signType: e.signType || "MD5",
          paySign: e.paySign,
          success: function (t) {
            var n = t.err_msg;
            n.endsWith(":ok") ? (0, i.result)("requestPayment", "ok", e) : n.endsWith(":cancel") ? (e.fail && e.fail({
              errMsg: "requestPayment:fail cancel"
            }), e.complete && e.complete({
              errMsg: "requestPayment:cancel"
            })) : (0, i.result)("requestPayment", "fail", e)
          }
        })
      },
      chooseAddress: function (e) {
        if (e) return window.WeixinJSBridge ? void r.default.openAddress({
          success: function (t) {
            if ("openAddress:ok" !== t.errMsg) return void(0, i.result)("chooseAddress", "fail", e);
            t.errMsg = "chooseAddress:ok", t.provinceFirstStageName = t.provinceName, (0, i.result)("chooseAddress", "ok", e, t)
          },
          cancel: function () {
            (0, i.result)("chooseAddress", "fail", e, {
              errMsg: "chooseAddress:fail cancel"
            })
          }
        }) : void(0, i.result)("chooseAddress", "ok", e, {
          userName: "张三",
          postalCode: "315000",
          provinceName: "浙江省",
          provinceFirstStageName: "浙江省",
          cityName: "宁波市",
          countyName: "鄞州区",
          detailInfo: "汇港大厦210室",
          nationalCode: "315100",
          telNumber: "18888888888"
        })
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(70),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o);
    t.default = {
      createVideoContext: function (e) {
        if (!e) throw new Error("缺少videoId");
        return new r.default(e)
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(71),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o),
      i = n(0);
    t.default = {
      createCanvasContext: function (e) {
        return e ? new r.default(e) : null
      },
      createContext: function () {
        return new r.default
      },
      drawCanvas: function (e) {
        if (e && e.canvasId && e.actions) {
          new r.default(e.canvasId, e.actions, e.reserve || !1).draw()
        }
      },
      canvasToTempFilePath: function (e) {
        if (e && e.canvasId) {
          var t = document.getElementById(e.canvasId);
          if (t && t.toDataURL) return void(0, i.result)("canvasToTempFilePath", "ok", e, {
            tempFilePath: t.toDataURL()
          })
        }(0, i.result)("canvasToTempFilePath", "fail", e)
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(3),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o),
      i = n(0);
    t.default = {
      addCard: function (e) {
        if (!(e && e.cardList && e.cardList instanceof Array)) return void(0, i.result)("addCard", "fail", e);
        r.default.addCard({
          cardList: e.cardList,
          success: function (t) {
            var n = t.cardList;
            n ? (0, i.result)("addCard", "ok", e, {
              cardList: n
            }) : (0, i.result)("addCard", "fail", e)
          }
        })
      },
      openCard: function (e) {
        if (!(e && e.cardList && e.cardList instanceof Array)) return void(0, i.result)("openCard", "fail", e);
        r.default.openCard({
          cardList: e.cardList
        }), (0, i.result)("openCard", "ok", e)
      }
    }
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return "" === e || void 0 === e || null === e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(17),
      i = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(r);
    t.default = {
      setStorage: function (e) {
        var t = e && e.key || "",
          n = e && (0, i.default)(e.data) || "",
          r = {
            errMsg: "setStorage:ok"
          };
        if (o(t)) return r.errMsg = "setStorage:fail key不能为空!", e.fail && e.fail(r), void(e.complete && e.complete(r));
        setTimeout(function () {
          try {
            localStorage.setItem(t, n), e.success && e.success(r)
          } catch (t) {
            r.errMsg = "setStorage:fail " + t.message, e.fail && e.fail(r)
          }
          e.complete && e.complete(r)
        }, 10)
      },
      setStorageSync: function (e, t) {
        if (o(e)) throw new Error("key不能为空!");
        localStorage.setItem(e, (0, i.default)(t))
      },
      getStorage: function (e) {
        var t = e && e.key || "",
          n = {
            errMsg: "getStorage:ok"
          };
        if (o(t)) return n.errMsg = "getStorage:fail key不能为空!", e.fail && e.fail(n), void(e.complete && e.complete(n));
        setTimeout(function () {
          try {
            var o = localStorage.getItem(t);
            n.data = void 0 === o ? "" : JSON.parse(o), e.success && e.success(n)
          } catch (t) {
            n.errMsg = "getStorage:fail " + t.message, e.fail && e.fail(n)
          }
          e.complete && e.complete(n)
        }, 10)
      },
      getStorageSync: function (e) {
        if (o(e)) throw new Error("key不能为空!");
        var t = localStorage.getItem(e);
        return void 0 === t ? "" : JSON.parse(t)
      },
      getStorageInfo: function (e) {
        var t = this;
        setTimeout(function () {
          var n = t.getStorageInfoSync();
          n.errMsg = "getStorageInfo:ok", e.success && e.success(n), e.complete && e.complete(n)
        }, 10)
      },
      getStorageInfoSync: function () {
        var e = {
          keys: [],
          currentSize: 0,
          limitSize: 10240
        };
        for (var t in localStorage) e.keys.push(t);
        return e
      },
      removeStorage: function (e) {
        var t = e && e.key || "",
          n = {
            errMsg: "removeStorage:ok"
          };
        if (o(t)) return n.errMsg = "removeStorage:fail key不能为空!", e.fail && e.fail(n), void(e.complete && e.complete(n));
        setTimeout(function () {
          try {
            localStorage.removeItem(t), e.success && e.success(n)
          } catch (t) {
            n.errMsg = "removeStorage:fail " + t.message, e.fail && e.fail(n)
          }
          e.complete && e.complete(n)
        }, 10)
      },
      removeStorageSync: function (e) {
        if (o(e)) throw new Error("key不能为空!");
        localStorage.removeItem(e)
      },
      clearStorage: function (e) {
        var t = {
          errMsg: "clearStorage:ok"
        };
        setTimeout(function () {
          try {
            localStorage.clear(), e.success && e.success(t)
          } catch (n) {
            t.errMsg = "clearStorage:fail " + n.message, e.fail && e.fail(t)
          }
          e.complete && e.complete(t)
        }, 10)
      },
      clearStorageSync: function () {
        localStorage.clear()
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(3),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o),
      i = n(0);
    t.default = {
      getNetworkType: function (e) {
        r.default.getNetworkType({
          success: function (t) {
            t ? (0, i.result)("getNetworkType", "ok", e, t) : (0, i.result)("getNetworkType", "fail", e)
          }
        })
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(0),
      r = {},
      i = [];
    t.default = {
      canIUse: function () {
        return !0
      },
      setNavigationBarTitle: function (e) {
        e && e.title && (document.title = e.title)
      },
      showNavigationBarLoading: function () {
        console.log("not support showNavigationBarLoading")
      },
      hideNavigationBarLoading: function () {
        console.log("not support hideNavigationBarLoading")
      },
      navigateTo: function (e) {
        if (e && e.url) {
          var t = (0, o.parseUrl)(e.url);
          window.$router.push({
            path: t.path,
            query: t.query
          })
        }
      },
      redirectTo: function (e) {
        if (e && e.url) {
          var t = (0, o.parseUrl)(e.url);
          window.$router.replace({
            path: t.path,
            query: t.query
          })
        }
      },
      switchTab: function (e) {
        this.redirectTo(e)
      },
      reLaunch: function (e) {
        e && e.url && (this.redirectTo(e), i = [i[i.length - 1]])
      },
      navigateBack: function (e) {
        e = e && e.delta ? e : {
          delta: 1
        };
        var t = window.history.length - 1,
          n = e.delta > t ? t : e.delta;
        window.$router.go(-parseInt(n))
      },
      getCurrentPages: function () {
        return i
      },
      getCurrentPage: function () {
        return i[i.length - 1]
      },
      getApp: function () {
        return r
      },
      $pushPage: function (e) {
        i.push(e)
      },
      $popPage: function () {
        i.length > 1 && i.pop()
      },
      $setApp: function (e) {
        r = e
      },
      hideKeyboard: function () {
        document.activeElement.blur()
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(3),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o),
      i = n(0);
    t.default = {
      getLocation: function (e) {
        e && r.default.getLocation({
          type: e.type || "wgs84",
          success: function (t) {
            if (t) return void(0, i.result)("getLocation", "ok", e, t);
            (0, i.result)("getLocation", "fail", e)
          }
        })
      },
      openLocation: function (e) {
        e && (r.default.openLocation({
          latitude: e.latitude,
          longitude: e.longitude,
          name: e.name || "",
          address: e.address || "",
          scale: e.scale || 28
        }), (0, i.result)("openLocation", "ok", e))
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(0),
      r = void 0;
    t.default = {
      login: function (e) {
        var t = (0, o.parseUrl)(window.location.href).query.code;
        if (t) r = t, (0, o.result)("login", "ok", e, {
          code: t
        });
        else if (e.appid) {
          var n = e.scope || "snsapi_userinfo";
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + e.appid + "&redirect_uri=" + window.location.href + "&response_type=code&scope=" + n + "&state=" + e.state + "#wechat_redirect"
        } else r = t = "the code is a mock one", (0, o.result)("login", "ok", e, {
          code: t
        })
      },
      checkSession: function (e) {
        r ? (0, o.result)("checkSession", "ok", e) : (0, o.result)("checkSession", "fail", e)
      },
      getUserInfo: function (e) {
        var t = {
          avatarUrl: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM64QtO7Q6eAMTX2icibXWZ2uGUCJECibj8T13l0oWibehKuug/132",
          city: "Ningbo",
          gender: 1,
          nickName: "测试用户",
          province: "Zhejiang",
          platform: "test"
        };
        if (t) return void(0, o.result)("getUserInfo", "ok", e, {
          userInfo: t
        });
        (0, o.result)("getUserInfo", "fail", e)
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(3),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o),
      i = n(0);
    t.default = {
      chooseImage: function (e) {
        if (e) {
          var t = e.count,
            n = e.sizeType || ["original", "compressed"],
            o = e.sourceType || ["album", "camera"];
          r.default.chooseImage({
            count: t,
            sizeType: n,
            sourceType: o,
            success: function (t) {
              var n = t.localIds;
              if (n) return void(0, i.result)("chooseImage", "ok", e, {
                tempFilePaths: n
              });
              (0, i.result)("chooseImage", "fail", e)
            }
          })
        }
      },
      previewImage: function (e) {
        if (e && e.urls) {
          var t = e.current || t.urls[0],
            n = t.urls;
          r.default.previewImage({
            current: t,
            urls: n
          }), (0, i.result)("previewImage", "ok", e)
        }
      },
      getImageInfo: function (e) {
        var t = this;
        if (e && e.src) {
          var n = new Image,
            o = {
              width: 0,
              height: 0,
              path: e.src
            };
          n.onload = function () {
            o.width = t.width, o.height = t.height, (0, i.result)("getImageInfo", "ok", e, o)
          }, n.src = e.src
        }
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(3),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o),
      i = n(0),
      a = void 0;
    t.default = {
      startRecord: function (e) {
        r.default.startRecord(), r.default.onVoiceRecordEnd({
          complete: function (t) {
            if (a = t.localId) return void(0, i.result)("startRecord", "ok", e, {
              tempFilePath: a
            });
            (0, i.result)("startRecord", "fail", e)
          }
        })
      },
      stopRecord: function () {
        r.default.stopRecord({
          success: function (e) {
            a = e.localId
          }
        })
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(3),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o),
      i = n(0),
      a = void 0;
    t.default = {
      playVoice: function (e) {
        e && e.filePath && (a = e.filePath, r.default.playVoice({
          localId: a
        }), (0, i.result)("playVoice", "ok", e))
      },
      pauseVoice: function () {
        a && r.default.pauseVoice({
          localId: a
        })
      },
      stopVoice: function () {
        a && (r.default.stopVoice({
          localId: a
        }), a = null)
      }
    }
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      console.group(new Date + " wx.socket 错误"), console.error(e), console.groupEnd()
    }

    function r(e) {
      return function (t) {
        return Object.prototype.toString.call(t) === "[object " + e + "]"
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(17),
      a = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(i),
      c = null,
      u = !1;
    t.default = {
      connectSocket: function (e) {
        if (!e.url) return void o("请设置websocket url!");
        c = new WebSocket(e.url)
      },
      onSocketOpen: function (e) {
        c && (c.onopen = function () {
          u = !0, e()
        })
      },
      onSocketError: function (e) {
        c && (c.onerror = function () {
          e()
        })
      },
      sendSocketMessage: function (e) {
        if (c && u && e && e.data) {
          var t = e.data;
          r("String")(t) || r("ArrayBuffer")(t) || (t = (0, a.default)(t)), c.send(t)
        }
      },
      onSocketMessage: function () {
        c && (c.onmessage = function (e) {
          callback({
            data: e.data
          })
        })
      },
      closeSocket: function () {
        c.close(), u = !1, c = null
      },
      onSocketClose: function (e) {
        c && (c.onclose = function () {
          e()
        })
      }
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(0);
    t.default = {
      makePhoneCall: function (e) {
        if (e && e.phoneNumber) {
          var t = document.createElement("a");
          t.href = "tel:" + e.phoneNumber, t.click(), (0, o.result)("makePhoneCall", "ok", e)
        }
      }
    }
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function r(e) {
      console.group(new Date + " wx.request 错误"), console.error(e), console.groupEnd()
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(17),
      a = o(i),
      c = n(23),
      u = o(c),
      s = 0,
      l = [],
      f = {
        setRequest: function (e) {
          return e.url ? f.checkTLS(e.url) ? (l.push(e), void f.doRequest()) : void r("请使用正确的https链接!") : void r("请填写正确的url!")
        },
        doRequest: function () {
          if (l.length && s < 5) {
            var e = l.shift();
            ++s, f.sendRequest(e)
          }
        },
        sendRequest: function (e) {
          var t = new XMLHttpRequest,
            n = e.method || "GET",
            o = e.url,
            i = e.dataType || "json",
            a = e.data || {},
            c = e.header || {},
            l = null;
          t.open(n, o, !0), t.onreadystatechange = function () {
            if (t.readyState === XMLHttpRequest.DONE) {
              --s, t.onreadystatechange = null;
              var n = t.status,
                o = {};
              o = 0 === n ? {
                errMsg: "request:fail",
                statusCode: n
              } : {
                data: "json" === i && t.responseText ? JSON.parse(t.responseText) : t.responseText,
                errMsg: "request:ok",
                statusCode: t.status
              }, e.success && e.success(o), e.complete && e.complete(o), clearTimeout(l), f.doRequest()
            }
          }, t.onerror = function () {
            --s, clearTimeout(l), e.fail && e.fail(), e.complete && e.complete(), r("请求失败")
          }, l = setTimeout(function () {
            t.abort(), --s, r(o + " 请求超时!"), clearTimeout(l)
          }, 6e4);
          var d = !1,
            p = "application/x-www-form-urlencoded; charset=UTF-8";
          ["HEAD", "GET"].indexOf(n) > -1 && (o += "?" + f.handleData(a, n, p)), t.open(n, o, !0), (0, u.default)(c).forEach(function (n) {
            var o = e.header[n];
            d = "content-type" === n.toLowerCase() || d, "content-type" === n.toLowerCase() && (p = o), "cookie" === n ? t.setRequestHeader("_Cookie", o) : t.setRequestHeader(n, o)
          }), "POST" === n || d || t.setRequestHeader("Content-Type", ""), t.setRequestHeader("X-Requested-With", "XMLHttpRequest"), a = f.handleData(a, n, p);
          try {
            t.send(a)
          } catch (e) {
            --s, clearTimeout(l)
          }
        },
        handleData: function (e, t, n) {
          var o = "";
          return e ? "string" == typeof e ? e : ("GET" === t || -1 !== n.indexOf("application/x-www-form-urlencoded") ? (console.log(t, n), (0, u.default)(e).forEach(function (t) {
            o += encodeURIComponent(t) + "=" + encodeURIComponent(e[t]) + "&"
          }), o = o.substring(0, o.length - 1)) : o = (0, a.default)(e), o) : null
        },
        checkTLS: function (e) {
          return e.startsWith("https://")
        }
      };
    t.default = f.setRequest
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      pageScrollTo: function (e) {
        e && void 0 !== e.scrollTop && setTimeout(function () {
          window.scrollTo(0, e.scrollTop)
        }, 1)
      }
    }
  }, function (e, t, n) {
    "use strict";

    function o() {
      var e = window.navigator.userAgent.toLowerCase(),
        t = e.match(/android\s([0-9\.]*)/);
      return !!t && t[1]
    }

    function r() {
      if (/iP(hone|od|ad)/.test(window.navigator.platform)) {
        var e = window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)].join(".")
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(0);
    t.default = {
      getSystemInfo: function (e) {
        if (e && e.success) {
          var t = this.getSystemInfoSync();
          (0, i.result)("getSystemInfo", "ok", e, t)
        }
      },
      getSystemInfoSync: function () {
        return {
          model: window.navigator.platform,
          pixelRatio: window.devicePixelRatio,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          language: window.navigator.language || window.navigator.userLanguage,
          system: o() || r() || 0,
          platform: "weichen",
          version: 0,
          SDKVersion: 0
        }
      }
    }
  }, function (e, t, n) {
    "use strict";

    function o() {
      var e = c - window.scrollY <= 0;
      return c = window.scrollY, !!(window.scrollY + r() + u >= i() && e)
    }

    function r() {
      return "CSS1Compat" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight
    }

    function i() {
      var e = 0,
        t = 0;
      return document.body && (e = document.body.scrollHeight), document.documentElement && (t = document.documentElement.scrollHeight), Math.max(e, t)
    }

    function a(e) {
      s && (e(), s = !1, setTimeout(function () {
        s = !0
      }, 350))
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function (e) {
      window.onscroll = function () {
        o() && a(e)
      }
    };
    var c = 0,
      u = 50,
      s = !0
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(74),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o);
    t.default = {
      createSelectorQuery: function () {
        return new r.default
      }
    }
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(9),
      i = o(r),
      a = n(14),
      c = o(a),
      u = function () {
        function e(t) {
          if ((0, i.default)(this, e), t) {
            this.videoId = t;
            var n = document.querySelector("#" + t);
            n && n.__vue__ && (this.video = n.__vue__, this.player = this.video.$refs.player)
          }
        }
        return (0, c.default)(e, [{
          key: "play",
          value: function () {
            this.player.paused && this.video.play()
          }
        }, {
          key: "pause",
          value: function () {
            this.player.paused || this.video.play()
          }
        }, {
          key: "seek",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            this.player.currentTime = e
          }
        }, {
          key: "sendDanmu",
          value: function (e) {
            e && e.text && this.video._sendDanmu(e)
          }
        }, {
          key: "playbackRate",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.player.playbackRate = e
          }
        }, {
          key: "requestFullScreen",
          value: function () {
            var e = this.player;
            (e.requestFullscreen || e.webkitRequestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen)()
          }
        }, {
          key: "exitFullScreen",
          value: function () {
            var e = this.player;
            (e.exitFullScreen || e.webkitExitFullscreen || e.mozCancelFullScreen || e.msExitFullscreen)()
          }
        }]), e
      }();
    t.default = u
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(77),
      i = o(r),
      a = n(82),
      c = o(a),
      u = n(81),
      s = o(u),
      l = n(23),
      f = o(l),
      d = n(9),
      p = o(d),
      h = n(14),
      g = o(h),
      v = function () {
        function e(t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          if ((0, p.default)(this, e), t) {
            var o = document.getElementById(t);
            this.ctx = o.getContext("2d"), this.actions = n || {}
          }
        }
        return (0, g.default)(e, [{
          key: "setFillStyle",
          value: function () {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "black";
            this.actions.fillStyle = function () {
              e.ctx.fillStyle = t.isPrototypeOf(y) ? t.getGradient() : t
            }
          }
        }, {
          key: "setStrokeStyle",
          value: function () {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "black";
            this.actions.strokeStyle = function () {
              e.ctx.strokeStyle = t.isPrototypeOf(y) ? t.getGradient() : t
            }
          }
        }, {
          key: "setShadow",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "black";
            this.actions.shadowOffsetX = e, this.actions.shadowOffsetY = t, this.actions.shadowBlur = n, this.actions.shadowColor = o
          }
        }, {
          key: "createLinearGradient",
          value: function (e, t, n, o) {
            return new m(this.ctx, e, t, n, o)
          }
        }, {
          key: "createCircularGradient",
          value: function (e, t, n) {
            return new S(this.ctx, e, t, n)
          }
        }, {
          key: "setLineWidth",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.actions.lineWidth = e
          }
        }, {
          key: "setLineCap",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "butt";
            ["butt", "round", "square"].indexOf(e) < 0 || (this.actions.lineCap = e)
          }
        }, {
          key: "setLineJoin",
          value: function () {
            ["bevel", "round", "miter"].indexOf(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "miter") < 0 || (this.actions.lineJoin = this.lineJoin)
          }
        }, {
          key: "setMiterLimit",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10;
            this.actions.miterLimit = e
          }
        }, {
          key: "rect",
          value: function (e, t, n, o) {
            var r = this;
            this.actions.rect = function () {
              r.ctx.rect(e, t, n, o)
            }
          }
        }, {
          key: "fillRect",
          value: function (e, t, n, o) {
            var r = this;
            this.actions.fillRect = function () {
              r.ctx.fillRect(e, t, n, o)
            }
          }
        }, {
          key: "strokeRect",
          value: function (e, t, n, o) {
            var r = this;
            this.actions.strokeRect = function () {
              r.ctx.strokeRect(e, t, n, o)
            }
          }
        }, {
          key: "clearRect",
          value: function (e, t, n, o) {
            var r = this;
            this.actions.clearRect = function () {
              r.ctx.clearRect(e, t, n, o)
            }
          }
        }, {
          key: "fill",
          value: function () {
            var e = this;
            this.actions.fill = function () {
              e.ctx.fill()
            }
          }
        }, {
          key: "stroke",
          value: function () {
            var e = this;
            this.actions.stroke = function () {
              e.ctx.stroke()
            }
          }
        }, {
          key: "beginPath",
          value: function () {
            var e = this;
            this.actions.beginPath = function () {
              e.ctx.beginPath()
            }
          }
        }, {
          key: "closePath",
          value: function () {
            var e = this;
            this.actions.closePath = function () {
              e.ctx.closePath()
            }
          }
        }, {
          key: "moveTo",
          value: function (e, t) {
            var n = this;
            this.actions.moveTo = function () {
              n.ctx.moveTo(e, t)
            }
          }
        }, {
          key: "lineTo",
          value: function (e, t) {
            var n = this;
            this.actions.lineTo = function () {
              n.ctx.lineTo(e, t)
            }
          }
        }, {
          key: "arc",
          value: function (e, t, n) {
            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
              r = this,
              i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2 * Math.PI,
              a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
            this.actions.arc = function () {
              r.ctx.arc(e, t, n, o, i, a)
            }
          }
        }, {
          key: "quadraticCurveTo",
          value: function (e, t, n, o) {
            var r = this;
            this.actions.quadraticCurveTo = function () {
              r.ctx.quadraticCurveTo(e, t, n, o)
            }
          }
        }, {
          key: "bezierCurveTo",
          value: function (e, t, n, o, r, i) {
            var a = this;
            this.actions.bezierCurveTo = function () {
              a.ctx.bezierCurveTo(e, t, n, o, r, i)
            }
          }
        }, {
          key: "scale",
          value: function (e, t) {
            var n = this;
            this.actions.scale = function () {
              n.ctx.scale(e, t)
            }
          }
        }, {
          key: "rotate",
          value: function (e) {
            var t = this;
            this.actions.rotate = function () {
              t.ctx.rotate(e)
            }
          }
        }, {
          key: "translate",
          value: function (e, t) {
            var n = this;
            this.actions.translate = function () {
              n.ctx.translate(e, t)
            }
          }
        }, {
          key: "fillText",
          value: function (e, t, n) {
            var o = this;
            this.actions.fillText = function () {
              o.ctx.fillText(e, t, n)
            }
          }
        }, {
          key: "setFontSize",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10;
            this.actions.font = e + "px sans-serif"
          }
        }, {
          key: "drawImage",
          value: function (e, t, n, o, r) {
            var i = this;
            if (e) {
              var a = document.createElement("img");
              a.src = e, this.actions.drawImage = function () {
                i.ctx.drawImage(a, t, n, o, r)
              }
            }
          }
        }, {
          key: "setGlobalAlpha",
          value: function () {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.actions.globalAlpha = function () {
              e.ctx.globalAlpha = t
            }
          }
        }, {
          key: "save",
          value: function () {
            var e = this;
            this.actions.save = function () {
              e.ctx.save()
            }
          }
        }, {
          key: "restore",
          value: function () {
            var e = this;
            this.actions.restore = function () {
              e.ctx.restore()
            }
          }
        }, {
          key: "draw",
          value: function () {
            var e = this;
            (0, f.default)(this.actions || {}).forEach(function (t) {
              var n = e.actions[t];
              "function" == typeof n ? n() : e.ctx[t] = n
            })
          }
        }, {
          key: "getActions",
          value: function () {
            return this.actions
          }
        }, {
          key: "clearActions",
          value: function () {
            this.actions = {}
          }
        }]), e
      }(),
      y = function () {
        function e() {
          if ((0, p.default)(this, e), this.constructor === e) throw new TypeError("Cannot construct Abstract instances directly");
          if (void 0 === this.getGradient) throw new TypeError("Must override getGradient");
          this.colorStops = []
        }
        return (0, g.default)(e, [{
          key: "addColorStop",
          value: function (e, t) {
            this.colorStops.push({
              stop: e,
              color: t
            })
          }
        }]), e
      }(),
      m = function (e) {
        function t(e, n, o, r, a) {
          (0, p.default)(this, t);
          var u = (0, c.default)(this, (t.__proto__ || (0, i.default)(t)).call(this));
          return u.ctx = e, u.x0 = n, u.y0 = o, u.x1 = r, u.y1 = a, u
        }
        return (0, s.default)(t, e), (0, g.default)(t, [{
          key: "getGradient",
          value: function () {
            var e = this.ctx.createLinearGradient(this.x0, this.y0, this.x1, this.y1);
            this.colorStops.forEach(function (t) {
              e.addColorStop(t.stop, t.color)
            })
          }
        }]), t
      }(y),
      S = function (e) {
        function t(e, n, o, r) {
          (0, p.default)(this, t);
          var a = (0, c.default)(this, (t.__proto__ || (0, i.default)(t)).call(this));
          return a.ctx = e, a.x = n, a.y = o, a.r = r, a
        }
        return (0, s.default)(t, e), (0, g.default)(t, [{
          key: "getGradient",
          value: function () {
            var e = this.ctx.createRadialGradient(this.x, this.y, this.r, this.x, this.y, 0);
            this.colorStops.forEach(function (t) {
              e.addColorStop(t.stop, t.color)
            })
          }
        }]), t
      }(y);
    t.default = v
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(22),
      i = o(r),
      a = n(23),
      c = o(a),
      u = n(9),
      s = o(u),
      l = n(0),
      f = n(68),
      d = o(f),
      p = n(65),
      h = o(p),
      g = n(55),
      v = o(g),
      y = n(63),
      m = o(y),
      S = n(57),
      w = o(S),
      _ = n(59),
      k = o(_),
      b = n(61),
      x = o(b),
      T = n(62),
      M = o(T),
      I = n(60),
      O = o(I),
      P = n(50),
      C = o(P),
      j = n(64),
      R = o(j),
      L = n(54),
      E = o(L),
      A = n(51),
      N = o(A),
      B = n(58),
      q = o(B),
      V = n(56),
      F = o(V),
      W = n(53),
      Q = o(W),
      J = n(67),
      U = o(J),
      $ = n(66),
      D = o($),
      H = n(52),
      z = o(H),
      G = n(69),
      X = o(G),
      K = {
        isWeiChen: !0,
        canIUse: w.default.canIUse,
        login: k.default.login,
        checkSession: k.default.checkSession,
        getUserInfo: k.default.getUserInfo,
        startRecord: x.default.startRecord,
        stopRecord: x.default.stopRecord,
        playVoice: M.default.playVoice,
        pauseVoice: M.default.pauseVoice,
        stopVoice: M.default.stopVoice,
        chooseImage: O.default.chooseImage,
        previewImage: O.default.previewImage,
        getImageInfo: O.default.getImageInfo,
        request: h.default,
        connectSocket: m.default.connectSocket,
        onSocketOpen: m.default.onSocketOpen,
        onSocketError: m.default.onSocketError,
        sendSocketMessage: m.default.sendSocketMessage,
        onSocketMessage: m.default.onSocketMessage,
        closeSocket: m.default.closeSocket,
        onSocketClose: m.default.onSocketClose,
        setStorage: v.default.setStorage,
        setStorageSync: v.default.setStorageSync,
        getStorage: v.default.getStorage,
        getStorageSync: v.default.getStorageSync,
        getStorageInfo: v.default.getStorageInfo,
        getStorageInfoSync: v.default.getStorageInfoSync,
        removeStorage: v.default.removeStorage,
        removeStorageSync: v.default.removeStorageSync,
        clearStorage: v.default.clearStorage,
        clearStorageSync: v.default.clearStorageSync,
        setNavigationBarTitle: w.default.setNavigationBarTitle,
        showNavigationBarLoading: w.default.showNavigationBarLoading,
        hideNavigationBarLoading: w.default.hideNavigationBarLoading,
        navigateTo: w.default.navigateTo,
        redirectTo: w.default.redirectTo,
        reLaunch: w.default.reLaunch,
        switchTab: w.default.switchTab,
        navigateBack: w.default.navigateBack,
        $pushPage: w.default.$pushPage,
        $popPage: w.default.$popPage,
        $setApp: w.default.$setApp,
        hideKeyboard: w.default.hideKeyboard,
        createMapContext: C.default.createMapContext,
        makePhoneCall: R.default.makePhoneCall,
        addCard: E.default.addCard,
        openCard: E.default.openCard,
        requestPayment: N.default.requestPayment,
        chooseAddress: N.default.chooseAddress,
        getLocation: q.default.getLocation,
        openLocation: q.default.openLocation,
        getNetworkType: F.default.getNetworkType,
        createCanvasContext: Q.default.createCanvasContext,
        createContext: Q.default.createContext,
        drawCanvas: Q.default.drawCanvas,
        canvasToTempFilePath: Q.default.canvasToTempFilePath,
        getSystemInfo: U.default.getSystemInfo,
        getSystemInfoSync: U.default.getSystemInfoSync,
        pageScrollTo: D.default.pageScrollTo,
        createSelectorQuery: X.default.createSelectorQuery,
        createVideoContext: z.default.createVideoContext
      },
      Z = function e() {
        (0, s.default)(this, e)
      };
    t.default = Z, Z.install = function (e) {
      e.mixin({
        created: function () {
          var e = this;
          if (!this.$parent && this.$route) {
            var t = {
              path: "pages" + this.$route.path,
              query: (0, c.default)(this.$route.params).length && this.$route.params || this.$route.query
            };
            this.onLaunch && function () {
              e.onLaunch(t)
            }(), this.onShow && this.onShow(t), K.$setApp(this)
          }
        },
        activated: function () {
          this.onLoad && this.onLoad((0, c.default)(this.$route.params).length && this.$route.params || this.$route.query), this.onShow && this.onShow(), this.onReady && this.onReady(), this.$parent === this.$root && wx.$pushPage(this)
        },
        deactivated: function () {
          this.onUnload && this.onUnload(), this.$parent === this.$root && wx.$popPage()
        },
        destroyed: function () {
          this.onHide && this.onHide()
        }
      })
    }, "undefined" !== window && (window.wx = (0, i.default)(window.wx || {}, K), window.getCurrentPages = w.default.getCurrentPages, window.getCurrentPage = w.default.getCurrentPage, window.getApp = w.default.getApp, (0, d.default)(function () {
      (0, l.invokeComMethod)(window.getCurrentPage(), "onReachBottom")
    })), "undefined" !== window && window.Vue && window.Vue.use(Z)
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function r(e) {
      var t = e.getBoundingClientRect();
      return {
        left: t.left,
        right: t.right,
        top: t.top,
        bottom: t.bottom,
        width: t.width,
        height: t.height
      }
    }

    function i(e, t) {
      return {
        id: e.id,
        dataset: (0, d.default)({}, e.dataset),
        left: t.left,
        right: t.right,
        top: t.top,
        bottom: t.bottom,
        width: t.width,
        height: t.height
      }
    }

    function a(e, t) {
      return {
        id: e.id,
        dataset: (0, d.default)({}, e.dataset),
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var c = n(9),
      u = o(c),
      s = n(14),
      l = o(s),
      f = n(22),
      d = o(f),
      p = function () {
        function e(t) {
          (0, u.default)(this, e), this.selectorQuery = t
        }
        return (0, l.default)(e, [{
          key: "boundingClientRect",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function () {},
              t = [].concat(this.selectorQuery.el),
              n = [null];
            return t.forEach(function (e, t) {
              e && (n[t] = i(e, r(e)))
            }), n = this.selectorQuery.el && this.selectorQuery.el.length ? n : n[0], this.selectorQuery.rst.push(n), this.clientRectCallBack = function () {
              e(n)
            }, this.selectorQuery
          }
        }, {
          key: "scrollOffset",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function () {},
              t = [].concat(this.selectorQuery.el),
              n = [null];
            return t.forEach(function (e, t) {
              e && (n[t] = a(e, {
                scrollLeft: e.scrollLeft,
                scrollTop: e.scrollTop
              }))
            }), n = this.selectorQuery.el && this.selectorQuery.el.length ? n : n[0], this.selectorQuery.rst.push(n), this.scrollOffsetCallBack = function () {
              e(n)
            }, this.selectorQuery
          }
        }, {
          key: "fields",
          value: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {};
            e = (0, d.default)({
              id: !1,
              dataset: !1,
              rect: !1,
              size: !1,
              scrollOffset: !1,
              properties: []
            }, e || {});
            var n = [].concat(this.selectorQuery.el),
              o = [null],
              i = void 0,
              a = void 0;
            return n.forEach(function (t, n) {
              t && (a = {}, i = r(t), e.id && (a.id = t.id), e.dataset && (a.dataset = (0, d.default)({}, t.dataset)), e.rect && (a = (0, d.default)(a, {
                left: i.left,
                right: i.right,
                top: i.top,
                bottom: i.bottom
              })), e.size && (a = (0, d.default)(a, {
                width: i.width,
                height: i.height
              })), e.scrollOffset && (a.scrollLeft = t.scrollLeft, a.scrollTop = t.scrollTop), (e.properties || []).forEach(function (e) {
                t.__vue__ && (a[e] = t.__vue__[e])
              }), o[n] = a)
            }), o = this.selectorQuery.el && this.selectorQuery.el.length ? o : o[0], this.selectorQuery.rst.push(o), this.fieldsCallBack = function () {
              t(o)
            }, this.selectorQuery
          }
        }]), e
      }();
    t.default = p
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(9),
      i = o(r),
      a = n(14),
      c = o(a),
      u = n(73),
      s = o(u),
      l = function () {
        function e() {
          (0, i.default)(this, e), this.rst = [], this.nodesRefs = []
        }
        return (0, c.default)(e, [{
          key: "select",
          value: function (e) {
            if (!e) throw "请输入选择器";
            return this.el = document.querySelector(e), this.nodesRefs.push(new s.default(this)), this.nodesRefs[this.nodesRefs.length - 1]
          }
        }, {
          key: "selectAll",
          value: function (e) {
            if (!e) throw "请输入选择器";
            return this.el = [].slice.call(document.querySelectorAll(e)), this.nodesRefs.push(new s.default(this)), this.nodesRefs[this.nodesRefs.length - 1]
          }
        }, {
          key: "selectViewport",
          value: function () {
            return this.el = document.body, this.nodesRefs.push(new s.default(this)), this.nodesRefs[this.nodesRefs.length - 1]
          }
        }, {
          key: "exec",
          value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function () {};
            this.nodesRefs.length && (this.nodesRefs.forEach(function (e) {
              e.clientRectCallBack && e.clientRectCallBack(), e.scrollOffsetCallBack && e.scrollOffsetCallBack(), e.fieldsCallBack && e.fieldsCallBack()
            }), e(this.rst))
          }
        }]), e
      }();
    t.default = l
  }, function (e, t, n) {
    e.exports = {
      default: n(85),
      __esModule: !0
    }
  }, function (e, t, n) {
    e.exports = {
      default: n(86),
      __esModule: !0
    }
  }, function (e, t, n) {
    e.exports = {
      default: n(87),
      __esModule: !0
    }
  }, function (e, t, n) {
    e.exports = {
      default: n(89),
      __esModule: !0
    }
  }, function (e, t, n) {
    e.exports = {
      default: n(90),
      __esModule: !0
    }
  }, function (e, t, n) {
    e.exports = {
      default: n(91),
      __esModule: !0
    }
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    t.__esModule = !0;
    var r = n(78),
      i = o(r),
      a = n(75),
      c = o(a),
      u = n(37),
      s = o(u);
    t.default = function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : (0, s.default)(t)));
      e.prototype = (0, c.default)(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (i.default ? (0, i.default)(e, t) : e.__proto__ = t)
    }
  }, function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var o = n(37),
      r = function (e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(o);
    t.default = function (e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" !== (void 0 === t ? "undefined" : (0, r.default)(t)) && "function" != typeof t ? e : t
    }
  }, function (e, t, n) {
    var o = n(1),
      r = o.JSON || (o.JSON = {
        stringify: JSON.stringify
      });
    e.exports = function (e) {
      return r.stringify.apply(r, arguments)
    }
  }, function (e, t, n) {
    n(110), e.exports = n(1).Object.assign
  }, function (e, t, n) {
    n(111);
    var o = n(1).Object;
    e.exports = function (e, t) {
      return o.create(e, t)
    }
  }, function (e, t, n) {
    n(112);
    var o = n(1).Object;
    e.exports = function (e, t, n) {
      return o.defineProperty(e, t, n)
    }
  }, function (e, t, n) {
    n(113), e.exports = n(1).Object.getPrototypeOf
  }, function (e, t, n) {
    n(114), e.exports = n(1).Object.keys
  }, function (e, t, n) {
    n(115), e.exports = n(1).Object.setPrototypeOf
  }, function (e, t, n) {
    n(118), n(116), n(119), n(120), e.exports = n(1).Symbol
  }, function (e, t, n) {
    n(117), n(121), e.exports = n(36).f("iterator")
  }, function (e, t) {
    e.exports = function (e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");
      return e
    }
  }, function (e, t) {
    e.exports = function () {}
  }, function (e, t, n) {
    var o = n(8),
      r = n(108),
      i = n(107);
    e.exports = function (e) {
      return function (t, n, a) {
        var c, u = o(t),
          s = r(u.length),
          l = i(a, s);
        if (e && n != n) {
          for (; s > l;)
            if ((c = u[l++]) != c) return !0
        } else
          for (; s > l; l++)
            if ((e || l in u) && u[l] === n) return e || l || 0;
        return !e && -1
      }
    }
  }, function (e, t, n) {
    var o = n(12),
      r = n(29),
      i = n(18);
    e.exports = function (e) {
      var t = o(e),
        n = r.f;
      if (n)
        for (var a, c = n(e), u = i.f, s = 0; c.length > s;) u.call(e, a = c[s++]) && t.push(a);
      return t
    }
  }, function (e, t, n) {
    e.exports = n(2).document && document.documentElement
  }, function (e, t, n) {
    var o = n(38);
    e.exports = Array.isArray || function (e) {
      return "Array" == o(e)
    }
  }, function (e, t, n) {
    "use strict";
    var o = n(28),
      r = n(19),
      i = n(30),
      a = {};
    n(11)(a, n(13)("iterator"), function () {
      return this
    }), e.exports = function (e, t, n) {
      e.prototype = o(a, {
        next: r(1, n)
      }), i(e, t + " Iterator")
    }
  }, function (e, t) {
    e.exports = function (e, t) {
      return {
        value: t,
        done: !!e
      }
    }
  }, function (e, t, n) {
    var o = n(12),
      r = n(8);
    e.exports = function (e, t) {
      for (var n, i = r(e), a = o(i), c = a.length, u = 0; c > u;)
        if (i[n = a[u++]] === t) return n
    }
  }, function (e, t, n) {
    var o = n(21)("meta"),
      r = n(16),
      i = n(6),
      a = n(7).f,
      c = 0,
      u = Object.isExtensible || function () {
        return !0
      },
      s = !n(10)(function () {
        return u(Object.preventExtensions({}))
      }),
      l = function (e) {
        a(e, o, {
          value: {
            i: "O" + ++c,
            w: {}
          }
        })
      },
      f = function (e, t) {
        if (!r(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
        if (!i(e, o)) {
          if (!u(e)) return "F";
          if (!t) return "E";
          l(e)
        }
        return e[o].i
      },
      d = function (e, t) {
        if (!i(e, o)) {
          if (!u(e)) return !0;
          if (!t) return !1;
          l(e)
        }
        return e[o].w
      },
      p = function (e) {
        return s && h.NEED && u(e) && !i(e, o) && l(e), e
      },
      h = e.exports = {
        KEY: o,
        NEED: !1,
        fastKey: f,
        getWeak: d,
        onFreeze: p
      }
  }, function (e, t, n) {
    "use strict";
    var o = n(12),
      r = n(29),
      i = n(18),
      a = n(20),
      c = n(42),
      u = Object.assign;
    e.exports = !u || n(10)(function () {
      var e = {},
        t = {},
        n = Symbol(),
        o = "abcdefghijklmnopqrst";
      return e[n] = 7, o.split("").forEach(function (e) {
        t[e] = e
      }), 7 != u({}, e)[n] || Object.keys(u({}, t)).join("") != o
    }) ? function (e, t) {
      for (var n = a(e), u = arguments.length, s = 1, l = r.f, f = i.f; u > s;)
        for (var d, p = c(arguments[s++]), h = l ? o(p).concat(l(p)) : o(p), g = h.length, v = 0; g > v;) f.call(p, d = h[v++]) && (n[d] = p[d]);
      return n
    } : u
  }, function (e, t, n) {
    var o = n(7),
      r = n(15),
      i = n(12);
    e.exports = n(4) ? Object.defineProperties : function (e, t) {
      r(e);
      for (var n, a = i(t), c = a.length, u = 0; c > u;) o.f(e, n = a[u++], t[n]);
      return e
    }
  }, function (e, t, n) {
    var o = n(8),
      r = n(45).f,
      i = {}.toString,
      a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
      c = function (e) {
        try {
          return r(e)
        } catch (e) {
          return a.slice()
        }
      };
    e.exports.f = function (e) {
      return a && "[object Window]" == i.call(e) ? c(e) : r(o(e))
    }
  }, function (e, t, n) {
    var o = n(16),
      r = n(15),
      i = function (e, t) {
        if (r(e), !o(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
      };
    e.exports = {
      set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, o) {
        try {
          o = n(39)(Function.call, n(44).f(Object.prototype, "__proto__").set, 2), o(e, []), t = !(e instanceof Array)
        } catch (e) {
          t = !0
        }
        return function (e, n) {
          return i(e, n), t ? e.__proto__ = n : o(e, n), e
        }
      }({}, !1) : void 0),
      check: i
    }
  }, function (e, t, n) {
    var o = n(33),
      r = n(24);
    e.exports = function (e) {
      return function (t, n) {
        var i, a, c = String(r(t)),
          u = o(n),
          s = c.length;
        return u < 0 || u >= s ? e ? "" : void 0 : (i = c.charCodeAt(u), i < 55296 || i > 56319 || u + 1 === s || (a = c.charCodeAt(u + 1)) < 56320 || a > 57343 ? e ? c.charAt(u) : i : e ? c.slice(u, u + 2) : a - 56320 + (i - 55296 << 10) + 65536)
      }
    }
  }, function (e, t, n) {
    var o = n(33),
      r = Math.max,
      i = Math.min;
    e.exports = function (e, t) {
      return e = o(e), e < 0 ? r(e + t, 0) : i(e, t)
    }
  }, function (e, t, n) {
    var o = n(33),
      r = Math.min;
    e.exports = function (e) {
      return e > 0 ? r(o(e), 9007199254740991) : 0
    }
  }, function (e, t, n) {
    "use strict";
    var o = n(93),
      r = n(99),
      i = n(26),
      a = n(8);
    e.exports = n(43)(Array, "Array", function (e, t) {
      this._t = a(e), this._i = 0, this._k = t
    }, function () {
      var e = this._t,
        t = this._k,
        n = this._i++;
      return !e || n >= e.length ? (this._t = void 0, r(1)) : "keys" == t ? r(0, n) : "values" == t ? r(0, e[n]) : r(0, [n, e[n]])
    }, "values"), i.Arguments = i.Array, o("keys"), o("values"), o("entries")
  }, function (e, t, n) {
    var o = n(5);
    o(o.S + o.F, "Object", {
      assign: n(102)
    })
  }, function (e, t, n) {
    var o = n(5);
    o(o.S, "Object", {
      create: n(28)
    })
  }, function (e, t, n) {
    var o = n(5);
    o(o.S + o.F * !n(4), "Object", {
      defineProperty: n(7).f
    })
  }, function (e, t, n) {
    var o = n(20),
      r = n(46);
    n(48)("getPrototypeOf", function () {
      return function (e) {
        return r(o(e))
      }
    })
  }, function (e, t, n) {
    var o = n(20),
      r = n(12);
    n(48)("keys", function () {
      return function (e) {
        return r(o(e))
      }
    })
  }, function (e, t, n) {
    var o = n(5);
    o(o.S, "Object", {
      setPrototypeOf: n(105).set
    })
  }, function (e, t) {}, function (e, t, n) {
    "use strict";
    var o = n(106)(!0);
    n(43)(String, "String", function (e) {
      this._t = String(e), this._i = 0
    }, function () {
      var e, t = this._t,
        n = this._i;
      return n >= t.length ? {
        value: void 0,
        done: !0
      } : (e = o(t, n), this._i += e.length, {
        value: e,
        done: !1
      })
    })
  }, function (e, t, n) {
    "use strict";
    var o = n(2),
      r = n(6),
      i = n(4),
      a = n(5),
      c = n(49),
      u = n(101).KEY,
      s = n(10),
      l = n(32),
      f = n(30),
      d = n(21),
      p = n(13),
      h = n(36),
      g = n(35),
      v = n(100),
      y = n(95),
      m = n(97),
      S = n(15),
      w = n(8),
      _ = n(34),
      k = n(19),
      b = n(28),
      x = n(104),
      T = n(44),
      M = n(7),
      I = n(12),
      O = T.f,
      P = M.f,
      C = x.f,
      j = o.Symbol,
      R = o.JSON,
      L = R && R.stringify,
      E = p("_hidden"),
      A = p("toPrimitive"),
      N = {}.propertyIsEnumerable,
      B = l("symbol-registry"),
      q = l("symbols"),
      V = l("op-symbols"),
      F = Object.prototype,
      W = "function" == typeof j,
      Q = o.QObject,
      J = !Q || !Q.prototype || !Q.prototype.findChild,
      U = i && s(function () {
        return 7 != b(P({}, "a", {
          get: function () {
            return P(this, "a", {
              value: 7
            }).a
          }
        })).a
      }) ? function (e, t, n) {
        var o = O(F, t);
        o && delete F[t], P(e, t, n), o && e !== F && P(F, t, o)
      } : P,
      $ = function (e) {
        var t = q[e] = b(j.prototype);
        return t._k = e, t
      },
      D = W && "symbol" == typeof j.iterator ? function (e) {
        return "symbol" == typeof e
      } : function (e) {
        return e instanceof j
      },
      H = function (e, t, n) {
        return e === F && H(V, t, n), S(e), t = _(t, !0), S(n), r(q, t) ? (n.enumerable ? (r(e, E) && e[E][t] && (e[E][t] = !1), n = b(n, {
          enumerable: k(0, !1)
        })) : (r(e, E) || P(e, E, k(1, {})), e[E][t] = !0), U(e, t, n)) : P(e, t, n)
      },
      z = function (e, t) {
        S(e);
        for (var n, o = y(t = w(t)), r = 0, i = o.length; i > r;) H(e, n = o[r++], t[n]);
        return e
      },
      G = function (e, t) {
        return void 0 === t ? b(e) : z(b(e), t)
      },
      X = function (e) {
        var t = N.call(this, e = _(e, !0));
        return !(this === F && r(q, e) && !r(V, e)) && (!(t || !r(this, e) || !r(q, e) || r(this, E) && this[E][e]) || t)
      },
      K = function (e, t) {
        if (e = w(e), t = _(t, !0), e !== F || !r(q, t) || r(V, t)) {
          var n = O(e, t);
          return !n || !r(q, t) || r(e, E) && e[E][t] || (n.enumerable = !0), n
        }
      },
      Z = function (e) {
        for (var t, n = C(w(e)), o = [], i = 0; n.length > i;) r(q, t = n[i++]) || t == E || t == u || o.push(t);
        return o
      },
      Y = function (e) {
        for (var t, n = e === F, o = C(n ? V : w(e)), i = [], a = 0; o.length > a;) !r(q, t = o[a++]) || n && !r(F, t) || i.push(q[t]);
        return i
      };
    W || (j = function () {
      if (this instanceof j) throw TypeError("Symbol is not a constructor!");
      var e = d(arguments.length > 0 ? arguments[0] : void 0),
        t = function (n) {
          this === F && t.call(V, n), r(this, E) && r(this[E], e) && (this[E][e] = !1), U(this, e, k(1, n))
        };
      return i && J && U(F, e, {
        configurable: !0,
        set: t
      }), $(e)
    }, c(j.prototype, "toString", function () {
      return this._k
    }), T.f = K, M.f = H, n(45).f = x.f = Z, n(18).f = X, n(29).f = Y, i && !n(27) && c(F, "propertyIsEnumerable", X, !0), h.f = function (e) {
      return $(p(e))
    }), a(a.G + a.W + a.F * !W, {
      Symbol: j
    });
    for (var ee = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), te = 0; ee.length > te;) p(ee[te++]);
    for (var ee = I(p.store), te = 0; ee.length > te;) g(ee[te++]);
    a(a.S + a.F * !W, "Symbol", {
      for: function (e) {
        return r(B, e += "") ? B[e] : B[e] = j(e)
      },
      keyFor: function (e) {
        if (D(e)) return v(B, e);
        throw TypeError(e + " is not a symbol!")
      },
      useSetter: function () {
        J = !0
      },
      useSimple: function () {
        J = !1
      }
    }), a(a.S + a.F * !W, "Object", {
      create: G,
      defineProperty: H,
      defineProperties: z,
      getOwnPropertyDescriptor: K,
      getOwnPropertyNames: Z,
      getOwnPropertySymbols: Y
    }), R && a(a.S + a.F * (!W || s(function () {
      var e = j();
      return "[null]" != L([e]) || "{}" != L({
        a: e
      }) || "{}" != L(Object(e))
    })), "JSON", {
      stringify: function (e) {
        if (void 0 !== e && !D(e)) {
          for (var t, n, o = [e], r = 1; arguments.length > r;) o.push(arguments[r++]);
          return t = o[1], "function" == typeof t && (n = t), !n && m(t) || (t = function (e, t) {
            if (n && (t = n.call(this, e, t)), !D(t)) return t
          }), o[1] = t, L.apply(R, o)
        }
      }
    }), j.prototype[A] || n(11)(j.prototype, A, j.prototype.valueOf), f(j, "Symbol"), f(Math, "Math", !0), f(o.JSON, "JSON", !0)
  }, function (e, t, n) {
    n(35)("asyncIterator")
  }, function (e, t, n) {
    n(35)("observable")
  }, function (e, t, n) {
    n(109);
    for (var o = n(2), r = n(11), i = n(26), a = n(13)("toStringTag"), c = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], u = 0; u < 5; u++) {
      var s = c[u],
        l = o[s],
        f = l && l.prototype;
      f && !f[a] && r(f, a, s), i[s] = i.Array
    }
  }, function (e, t) {
    var n;
    n = function () {
      return this
    }();
    try {
      n = n || Function("return this")() || (0, eval)("this")
    } catch (e) {
      "object" == typeof window && (n = window)
    }
    e.exports = n
  }])
});
