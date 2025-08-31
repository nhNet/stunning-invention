console.log("LaggedAPI_old: v2.1.0");
var prerollStart = !0;

function randomInteger(e, a) {
    return Math.floor(Math.random() * (a - e + 1)) + e
}
var googletag, rewardedSlot, parent_campaign_id = 0,
    parent_qrID = 0,
    parent_qrID_reward = randomInteger(1, 1e5),
    parent_user_lifeID = 0,
    parent_creative_id = 0,
    isOnLagged = !1,
    sendValuetoFB = !1,
    userParentPPID = 0;
LaggedAPI = {},
    function() {
        var d = !1,
            o = !1;
        try {
            o = window.parent.document
        } catch (e) {
            console.log(e)
        }
        if (o) {
            isOnLagged = !0;
            try {
                parent_campaign_id = window.parent.campaign_id, window.parent.allFireBaseLoaded && (sendValuetoFB = !0)
            } catch (e) {
                console.log(e)
            }
            try {
                parent_user_lifeID = window.parent.user_lifeID, parent_creative_id = window.parent.creative_id, userParentPPID = window.parent.userPPID
            } catch (e) {
                console.log(e)
            }
        }
        if (isOnLagged) try {
            window.addEventListener("keydown", e => {
                ["ArrowDown", "ArrowUp", "Space"].includes(e.code) && e.preventDefault()
            })
        } catch (e) {
            console.error(e)
        }
        try {
            "localhost" !== location.hostname && "127.0.0.1" !== location.hostname && "preview.construct.net" !== location.hostname && "lagged.app" !== location.hostname || (isOnLagged = !(d = !0))
        } catch (e) {
            console.log(e)
        }
        if (!d && !isOnLagged) {
            var e = "https://lagged.com/redirect_to_game.php?swf=" + location.href,
                a = document.createElement("div");
            a.id = "examplepopup", a.onclick = function() {
                window.open(e, "_blank")
            }, a.style.position = "absolute", a.style.width = "60%", a.style.height = "60px", a.style.left = "20%", a.style.bottom = "30px", a.style.border = "1px solid #000", a.style.textAlign = "center", a.style.lineHeight = "25px", a.style.backgroundColor = "#fff", a.style.color = "#000", a.style.cursor = "pointer", a.innerHTML = "<b>Website Not Approved</b><br>Sorry this game is only playable on Lagged", document.body.appendChild(a);
            try {
                document.body.addEventListener("click", function() {
                    window.open(e, "_blank")
                }, !1), document.body.addEventListener("touchstart", function() {
                    window.open(e, "_blank")
                }, !1)
            } catch (e) {
                console.log(e)
            }
        }(a = document.createElement("link")).href = d ? "https://lagged.com/api/rev-share/devmode.css" : "api/rev-share/base.css", a.rel = "stylesheet", a.media = "screen", document.getElementsByTagName("head")[0].appendChild(a), LaggedAPI.init = function() {}, setInterval(function() {
            lastRewardFallback++
        }, 999), LaggedAPI.APIAds = {
            show: function(e, a, t, o) {
                if (console.log("show an ad"), d) {
                    console.log("DEV MODE: Showing example ad, click on ad to close.");
                    var n = document.createElement("div");
                    return n.id = "exampleadpopup", n.onclick = function() {
                        document.getElementById("exampleadpopup").remove(), response()
                    }, void document.body.appendChild(n)
                }
                if (theIsH5AdReady) console.log("show H5 ad"), adCallbackDef = o, h5AdEvent.makeGameManualInterstitialVisible(), theIsH5AdReady = !1;
                else if (canGiveReward && 30 < lastRewardFallback) {
                    keepShowAdFn();
                    try {
                        var r = {
                            success: !0
                        };
                        o && o(r)
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    try {
                        window.parent.interShow()
                    } catch (e) {
                        console.log(e)
                    }
                    try {
                        r = {
                            success: !0
                        };
                        o && o(r)
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }, LaggedAPI.GEvents = {
            start: function(e) {
                console.log("event START"), LaggedAPI.APIAds.show(e)
            },
            next: function(e) {
                console.log("event NEXT"), LaggedAPI.APIAds.show(e)
            },
            reward: function(e, a) {
                if (canGiveReward) return e(!0, keepShowAdFn), void(rewardAdCallback = a);
                console.log("Reward ad not available"), e(!1)
            }
        }, LaggedAPI.User = {
            get: function(e) {
                var a = {
                    user: {
                        id: 0,
                        name: "Example User",
                        avatar: "https://lagged.com/images/avatars/default-avatar.jpg"
                    }
                };
                if (isOnLagged && !d) try {
                    a.user.id = window.parent.userid_ds, a.user.name = window.parent.username, a.user.avatar = window.parent.useravatar
                } catch (e) {
                    console.log(e)
                }
                e(a)
            }
        }, vL = [], b = [], LaggedAPI.Achievements = {
            save: function(e, a) {
                for (var o, n, t = 0, r = e.length; t < r; t++) - 1 === vL.indexOf(e[t]) && (vL.push(e[t]), b.push(e[t]));
                0 < b.length ? (o = b.length, n = a, setTimeout(function() {
                    if (b.length > o) n({
                        success: !0
                    });
                    else {
                        var e = {
                            action: "save"
                        };
                        e.publickey = c, e.awards = b, b = [];
                        var a = JSON.stringify(e),
                            t = g.base64(a);
                        if (d) {
                            console.log("LaggedAPI: Save achievements: ", e.awards);
                            a = document.createElement("div");
                            return a.id = "exampleawardpopup", a.onclick = function() {
                                document.getElementById("exampleawardpopup") && document.getElementById("exampleawardpopup").remove()
                            }, a.innerHTML = "<p>Award ID: " + e.awards + "</p>", document.body.appendChild(a), setTimeout(function() {
                                document.getElementById("exampleawardpopup") && document.getElementById("exampleawardpopup").remove()
                            }, 4e3), void window.parent.postMessage("awards|" + t, "*")
                        }
                        l("award", "award", "save", t, s, n)
                    }
                }, 35)) : a({
                    success: !0
                })
            },
            show: function() {
                try {
                    window.parent.openAwards()
                } catch (e) {
                    try {
                        window.parent.postMessage("openAwards", "*")
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        };
        var n = [];
        LaggedAPI.Scores = {
            save: function(e, a) {
                if (e.board, !(0 === e.score || e.score < 0)) {
                    if (n[e.board]) {
                        if (!(n[e.board] < e.score)) return;
                        n[e.board] = e.score
                    } else n[e.board] = e.score;
                    var t = {
                        action: "save"
                    };
                    t.publickey = c, t.board = e.board, t.score = e.score;
                    var o = JSON.stringify(t),
                        t = g.base64(o);
                    if (d) {
                        console.log("LaggedAPI: Save high score: ", e);
                        o = document.createElement("div");
                        return o.id = "examplehighscorepopup", o.onclick = function() {
                            document.getElementById("examplehighscorepopup") && document.getElementById("examplehighscorepopup").remove()
                        }, o.innerHTML = "<p>Score: " + e.score + "<br>Board ID: " + e.board + "</p>", document.body.appendChild(o), void window.parent.postMessage("savescore|" + t, "*")
                    }
                    l("highscore", "hs", "save", t, r, a)
                }
            },
            load: function(e, a) {
                try {
                    window.parent.openLeaderboards()
                } catch (e) {
                    console.log(e)
                }
            }
        };
        var s = function(e, a) {
                var t = {
                    success: !0
                };
                e && !0 === e.success ? !0 === e.data.show && i(e.data.achdata, e.user) : (alert("Error: Achievement did not save!"), console.log(e), t.success = !1, t.errormsg = "Error: Achievement did not save!"), a && a(t)
            },
            r = function(e, a) {
                var t = {
                    success: !0
                };
                e && !0 === e.success ? (hsData = e, function() {
                    try {
                        window.parent.showHSSaved(hsData), LaggedAPI.GEvents.next(function() {
                            console.log("ad done")
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }()) : (o.getElementById("leaderboard-modal").remove(), alert("Error: Could not save high score!"), console.log(e), t.success = !1, t.errormsg = "Error: Could not save high score!"), a && a(t)
            },
            i = function(e) {
                try {
                    window.parent.showAwardSaved(e)
                } catch (e) {
                    console.log(e)
                }
            };

        function l(e, a, t, o, n, r) {
            var d = new XMLHttpRequest;
            d.onreadystatechange = function() {
                var e;
                4 == this.readyState && 200 == this.status ? (e = (e = this.responseText).replace(")]}',", ""), e = JSON.parse(e), n(e, r)) : 4 == this.readyState && n(e = {
                    success: !1
                }, r)
            };
            a = "//lagged.com/api/v4/ajax_" + a + ".php";
            d.open("POST", a, !0), d.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), d.send("type=" + e + "&action=" + t + "&data=" + o)
        }
        var c, g = new function() {
            function s(e, a) {
                return (e >>> 1 | a >>> 1) << 1 | 1 & e | 1 & a
            }

            function i(e, a) {
                return (e >>> 1 ^ a >>> 1) << 1 | 1 & e ^ 1 & a
            }

            function l(e, a) {
                return (e >>> 1 & a >>> 1) << 1 | 1 & e & a
            }

            function g(e, a) {
                var t = (65535 & e) + (65535 & a);
                return (e >> 16) + (a >> 16) + (t >> 16) << 16 | 65535 & t
            }

            function p(e) {
                for (var a = "", t = 0; t <= 3; t++) a += o.charAt(e >> 8 * t + 4 & 15) + o.charAt(e >> 8 * t & 15);
                return a
            }

            function c(e, a, t, o, n, r) {
                return g((r = g(g(a, e), g(o, r))) << n | r >>> 32 - n, t)
            }

            function u(e, a, t, o, n, r, d) {
                return c(s(l(a, t), l(~a, o)), e, a, n, r, d)
            }

            function w(e, a, t, o, n, r, d) {
                return c(s(l(a, o), l(t, ~o)), e, a, n, r, d)
            }

            function m(e, a, t, o, n, r, d) {
                return c(i(i(a, t), o), e, a, n, r, d)
            }

            function h(e, a, t, o, n, r, d) {
                return c(i(t, s(a, ~o)), e, a, n, r, d)
            }
            var v = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                o = "0123456789abcdef";
            return {
                base64: function(e) {
                    var a, t, o, n, r, d, s = "",
                        i = 0;
                    for (e = function(e) {
                            if (!e) return "";
                            e = e.replace(/\r\n/g, "\n");
                            for (var a = "", t = 0; t < e.length; t++) {
                                var o = e.charCodeAt(t);
                                o < 128 ? a += String.fromCharCode(o) : (127 < o && o < 2048 ? a += String.fromCharCode(o >> 6 | 192) : (a += String.fromCharCode(o >> 12 | 224), a += String.fromCharCode(o >> 6 & 63 | 128)), a += String.fromCharCode(63 & o | 128))
                            }
                            return a
                        }(e); i < e.length;) o = (d = e.charCodeAt(i++)) >> 2, n = (3 & d) << 4 | (a = e.charCodeAt(i++)) >> 4, r = (15 & a) << 2 | (t = e.charCodeAt(i++)) >> 6, d = 63 & t, isNaN(a) ? r = d = 64 : isNaN(t) && (d = 64), s = s + v.charAt(o) + v.charAt(n) + v.charAt(r) + v.charAt(d);
                    return s
                },
                md5: function(e) {
                    for (var a = function(e) {
                            for (var a = 1 + (e.length + 8 >> 6), t = new Array(16 * a), o = 0; o < 16 * a; o++) t[o] = 0;
                            for (o = 0; o < e.length; o++) t[o >> 2] |= e.charCodeAt(o) << (8 * e.length + o) % 4 * 8;
                            t[o >> 2] |= 128 << (8 * e.length + o) % 4 * 8;
                            var n = 8 * e.length;
                            return t[16 * a - 2] = 255 & n, t[16 * a - 2] |= (n >>> 8 & 255) << 8, t[16 * a - 2] |= (n >>> 16 & 255) << 16, t[16 * a - 2] |= (n >>> 24 & 255) << 24, t
                        }(e), t = 1732584193, o = -271733879, n = -1732584194, r = 271733878, d = 0; d < a.length; d += 16) {
                        var s = t,
                            i = o,
                            l = n,
                            c = r,
                            o = h(o = h(o = h(o = h(o = m(o = m(o = m(o = m(o = w(o = w(o = w(o = w(o = u(o = u(o = u(o = u(o, n = u(n, r = u(r, t = u(t, o, n, r, a[d + 0], 7, -680876936), o, n, a[d + 1], 12, -389564586), t, o, a[d + 2], 17, 606105819), r, t, a[d + 3], 22, -1044525330), n = u(n, r = u(r, t = u(t, o, n, r, a[d + 4], 7, -176418897), o, n, a[d + 5], 12, 1200080426), t, o, a[d + 6], 17, -1473231341), r, t, a[d + 7], 22, -45705983), n = u(n, r = u(r, t = u(t, o, n, r, a[d + 8], 7, 1770035416), o, n, a[d + 9], 12, -1958414417), t, o, a[d + 10], 17, -42063), r, t, a[d + 11], 22, -1990404162), n = u(n, r = u(r, t = u(t, o, n, r, a[d + 12], 7, 1804603682), o, n, a[d + 13], 12, -40341101), t, o, a[d + 14], 17, -1502002290), r, t, a[d + 15], 22, 1236535329), n = w(n, r = w(r, t = w(t, o, n, r, a[d + 1], 5, -165796510), o, n, a[d + 6], 9, -1069501632), t, o, a[d + 11], 14, 643717713), r, t, a[d + 0], 20, -373897302), n = w(n, r = w(r, t = w(t, o, n, r, a[d + 5], 5, -701558691), o, n, a[d + 10], 9, 38016083), t, o, a[d + 15], 14, -660478335), r, t, a[d + 4], 20, -405537848), n = w(n, r = w(r, t = w(t, o, n, r, a[d + 9], 5, 568446438), o, n, a[d + 14], 9, -1019803690), t, o, a[d + 3], 14, -187363961), r, t, a[d + 8], 20, 1163531501), n = w(n, r = w(r, t = w(t, o, n, r, a[d + 13], 5, -1444681467), o, n, a[d + 2], 9, -51403784), t, o, a[d + 7], 14, 1735328473), r, t, a[d + 12], 20, -1926607734), n = m(n, r = m(r, t = m(t, o, n, r, a[d + 5], 4, -378558), o, n, a[d + 8], 11, -2022574463), t, o, a[d + 11], 16, 1839030562), r, t, a[d + 14], 23, -35309556), n = m(n, r = m(r, t = m(t, o, n, r, a[d + 1], 4, -1530992060), o, n, a[d + 4], 11, 1272893353), t, o, a[d + 7], 16, -155497632), r, t, a[d + 10], 23, -1094730640), n = m(n, r = m(r, t = m(t, o, n, r, a[d + 13], 4, 681279174), o, n, a[d + 0], 11, -358537222), t, o, a[d + 3], 16, -722521979), r, t, a[d + 6], 23, 76029189), n = m(n, r = m(r, t = m(t, o, n, r, a[d + 9], 4, -640364487), o, n, a[d + 12], 11, -421815835), t, o, a[d + 15], 16, 530742520), r, t, a[d + 2], 23, -995338651), n = h(n, r = h(r, t = h(t, o, n, r, a[d + 0], 6, -198630844), o, n, a[d + 7], 10, 1126891415), t, o, a[d + 14], 15, -1416354905), r, t, a[d + 5], 21, -57434055), n = h(n, r = h(r, t = h(t, o, n, r, a[d + 12], 6, 1700485571), o, n, a[d + 3], 10, -1894986606), t, o, a[d + 10], 15, -1051523), r, t, a[d + 1], 21, -2054922799), n = h(n, r = h(r, t = h(t, o, n, r, a[d + 8], 6, 1873313359), o, n, a[d + 15], 10, -30611744), t, o, a[d + 6], 15, -1560198380), r, t, a[d + 13], 21, 1309151649), n = h(n, r = h(r, t = h(t, o, n, r, a[d + 4], 6, -145523070), o, n, a[d + 11], 10, -1120210379), t, o, a[d + 2], 15, 718787259), r, t, a[d + 9], 21, -343485551),
                            t = g(t, s);
                        o = g(o, i), n = g(n, l), r = g(r, c)
                    }
                    return p(t) + p(o) + p(n) + p(r)
                }
            }
        }
    }();
var rewardEvent, gameManualInterstitialSlot, canGiveReward = !1,
    rewardAdSuccess = !1,
    rewardAdCallback = function() {},
    adCallbackDef = function() {},
    keepShowAdFn = function() {
        canGiveReward && rewardEvent.makeRewardedVisible()
    },
    lastRewardFallback = 0;
0 < parent_campaign_id && (lastRewardFallback = 20);
var h5AdEvent, theIsH5AdReady = !1,
    gptScript2 = document.createElement("script");

function defineGameManualInterstitialSlot() {
    (gameManualInterstitialSlot = googletag.defineOutOfPageSlot("/1786990/lagged_h5_ingame", googletag.enums.OutOfPageFormat.GAME_MANUAL_INTERSTITIAL)) && (parent_qrID = randomInteger(1, 1e5), gameManualInterstitialSlot.setTargeting("rnd_id", [parent_qrID, parent_user_lifeID]).setTargeting("campaign_id", [parent_campaign_id]).setTargeting("creative_id", [parent_creative_id]).addService(googletag.pubads()), console.log("waiting for H5 ad to be ready..."), googletag.pubads().addEventListener("gameManualInterstitialSlotReady", e => {
        gameManualInterstitialSlot === e.slot && (console.log("H5 ad is ready..."), theIsH5AdReady = !0, h5AdEvent = e)
    }), googletag.pubads().addEventListener("gameManualInterstitialSlotClosed", resumeGameFromH5))
}

function resumeGameFromH5() {
    if (0 < parent_campaign_id) try {
        window.parent.interShow()
    } catch (e) {
        console.log(e)
    }
    adCallbackDef({
        success: !(theIsH5AdReady = !1)
    });
    try {
        googletag.destroySlots([gameManualInterstitialSlot]), defineGameManualInterstitialSlot(), googletag.display(gameManualInterstitialSlot)
    } catch (e) {
        console.log(e)
    }
}
gptScript2.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js", gptScript2.async = !0, gptScript2.onload = function() {
    (googletag = window.googletag || {
        cmd: []
    }).cmd.push(() => {
        console.log("GAM loaded"), defineGameManualInterstitialSlot(), (rewardedSlot = googletag.defineOutOfPageSlot("/1786990/lagged_reward_ad", googletag.enums.OutOfPageFormat.REWARDED)).setTargeting("rnd_id", [parent_qrID_reward, parent_user_lifeID]).setTargeting("campaign_id", [parent_campaign_id]).setTargeting("creative_id", [parent_creative_id]).addService(googletag.pubads()), googletag.pubads().setPublisherProvidedId(userParentPPID), googletag.enableServices(), googletag.pubads().addEventListener("rewardedSlotReady", function(e) {
            console.log("reward ad is ready"), rewardEvent = e, canGiveReward = !(rewardAdSuccess = !(rewardAdCallback = function() {
                console.log("empty reward")
            }))
        }), googletag.pubads().addEventListener("rewardedSlotGranted", function(e) {
            canGiveReward = !(rewardAdSuccess = !0), console.log("reward ad completed")
        }), googletag.pubads().addEventListener("rewardedSlotClosed", function(e) {
            canGiveReward = !1, lastRewardFallback = 0 < parent_campaign_id ? -15 : -60, rewardAdCallback(!!rewardAdSuccess), googletag.destroySlots([rewardedSlot]), console.log("reward ad closed"), parent_qrID_reward = randomInteger(1, 1e5), (rewardedSlot = googletag.defineOutOfPageSlot("/1786990/lagged_reward_ad", googletag.enums.OutOfPageFormat.REWARDED)).setTargeting("rnd_id", [parent_qrID_reward, parent_user_lifeID]).setTargeting("campaign_id", [parent_campaign_id]).setTargeting("creative_id", [parent_creative_id]).addService(googletag.pubads()), googletag.pubads().setPublisherProvidedId(userParentPPID), googletag.enableServices(), googletag.display(rewardedSlot)
        }), googletag.pubads().addEventListener("slotOnload", e => {
            if (sendValuetoFB) {
                var e = e.slot.getAdUnitPath(),
                    a = 0,
                    t = !1;
                "/1786990/lagged_h5_ingame" == e ? (a = "23145623174", t = parent_qrID) : "/1786990/lagged_reward_ad" == e && (a = "23144999044", t = parent_qrID_reward);
                try {
                    window.parent.sendToFireBase(t, window.location.pathname, a)
                } catch (e) {
                    console.log(e)
                }
            }
        }), googletag.display(gameManualInterstitialSlot), googletag.display(rewardedSlot)
    })
}, isOnLagged;
try {
    isOnLagged && window.parent.postMessage("api_loaded", "*")
} catch (e) {
    console.log(e)
}