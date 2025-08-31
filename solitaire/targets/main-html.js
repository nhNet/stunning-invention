/** Cooked with Flambe, https://getflambe.com */
'use strict';
(function() {
    function r(a, b) {
        function c() {}
        c.prototype = a;
        var f = new c,
            w;
        for (w in b) f[w] = b[w];
        b.toString !== Object.prototype.toString && (f.toString = b.toString);
        return f
    }

    function Fe(a) {
        return a instanceof Array ? function() {
            return y.iter(a)
        } : "function" == typeof a.iterator ? R(a, a.iterator) : a.iterator
    }

    function R(a, b) {
        if (null == b) return null;
        null == b.__id__ && (b.__id__ = eg++);
        var c;
        null == a.hx__closures__ ? a.hx__closures__ = {} : c = a.hx__closures__[b.__id__];
        null == c && (c = function() {
            return c.method.apply(c.scope,
                arguments)
        }, c.scope = a, c.method = b, a.hx__closures__[b.__id__] = c);
        return c
    }
    var e = {},
        sa = function() {};
    e.DateTools = sa;
    sa.__name__ = ["DateTools"];
    sa.__format_get = function(a, b) {
        switch (b) {
            case "%":
                return "%";
            case "C":
                return J.lpad(t.string(t["int"](a.getFullYear() / 100)), "0", 2);
            case "d":
                return J.lpad(t.string(a.getDate()), "0", 2);
            case "D":
                return sa.__format(a, "%m/%d/%y");
            case "e":
                return t.string(a.getDate());
            case "F":
                return sa.__format(a, "%Y-%m-%d");
            case "H":
            case "k":
                return J.lpad(t.string(a.getHours()), "H" ==
                    b ? "0" : " ", 2);
            case "I":
            case "l":
                var c = a.getHours() % 12;
                return J.lpad(t.string(0 == c ? 12 : c), "I" == b ? "0" : " ", 2);
            case "m":
                return J.lpad(t.string(a.getMonth() + 1), "0", 2);
            case "M":
                return J.lpad(t.string(a.getMinutes()), "0", 2);
            case "n":
                return "\n";
            case "p":
                return 11 < a.getHours() ? "PM" : "AM";
            case "r":
                return sa.__format(a, "%I:%M:%S %p");
            case "R":
                return sa.__format(a, "%H:%M");
            case "s":
                return t.string(t["int"](a.getTime() / 1E3));
            case "S":
                return J.lpad(t.string(a.getSeconds()), "0", 2);
            case "t":
                return "\t";
            case "T":
                return sa.__format(a,
                    "%H:%M:%S");
            case "u":
                return c = a.getDay(), 0 == c ? "7" : null == c ? "null" : "" + c;
            case "w":
                return t.string(a.getDay());
            case "y":
                return J.lpad(t.string(a.getFullYear() % 100), "0", 2);
            case "Y":
                return t.string(a.getFullYear());
            default:
                throw new n("Date.format %" + b + "- not implemented yet.");
        }
    };
    sa.__format = function(a, b) {
        for (var c = new ta, f = 0;;) {
            var w = b.indexOf("%", f);
            if (0 > w) break;
            c.addSub(b, f, w - f);
            c.add(sa.__format_get(a, y.substr(b, w + 1, 1)));
            f = w + 2
        }
        c.addSub(b, f, b.length - f);
        return c.b
    };
    sa.format = function(a, b) {
        return sa.__format(a,
            b)
    };
    var wa = function(a, b) {
        b = b.split("u").join("");
        this.r = RegExp(a, b)
    };
    e.EReg = wa;
    wa.__name__ = ["EReg"];
    wa.prototype = {
        match: function(a) {
            this.r.global && (this.r.lastIndex = 0);
            this.r.m = this.r.exec(a);
            this.r.s = a;
            return null != this.r.m
        },
        matched: function(a) {
            if (null != this.r.m && 0 <= a && a < this.r.m.length) return this.r.m[a];
            throw new n("EReg::matched");
        },
        matchedPos: function() {
            if (null == this.r.m) throw new n("No string matched");
            return {
                pos: this.r.m.index,
                len: this.r.m[0].length
            }
        },
        __class__: wa
    };
    var y = function() {};
    e.HxOverrides =
        y;
    y.__name__ = ["HxOverrides"];
    y.dateStr = function(a) {
        var b = a.getMonth() + 1,
            c = a.getDate(),
            f = a.getHours(),
            w = a.getMinutes(),
            d = a.getSeconds();
        return a.getFullYear() + "-" + (10 > b ? "0" + b : "" + b) + "-" + (10 > c ? "0" + c : "" + c) + " " + (10 > f ? "0" + f : "" + f) + ":" + (10 > w ? "0" + w : "" + w) + ":" + (10 > d ? "0" + d : "" + d)
    };
    y.strDate = function(a) {
        switch (a.length) {
            case 8:
                var a = a.split(":"),
                    b = new Date;
                b.setTime(0);
                b.setUTCHours(a[0]);
                b.setUTCMinutes(a[1]);
                b.setUTCSeconds(a[2]);
                return b;
            case 10:
                return a = a.split("-"), new Date(a[0], a[1] - 1, a[2], 0, 0, 0);
            case 19:
                return b =
                    a.split(" "), a = b[0].split("-"), b = b[1].split(":"), new Date(a[0], a[1] - 1, a[2], b[0], b[1], b[2]);
            default:
                throw new n("Invalid date format : " + a);
        }
    };
    y.cca = function(a, b) {
        var c = a.charCodeAt(b);
        return c != c ? void 0 : c
    };
    y.substr = function(a, b, c) {
        if (null != b && 0 != b && null != c && 0 > c) return "";
        null == c && (c = a.length);
        0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > c && (c = a.length + c - b);
        return a.substr(b, c)
    };
    y.remove = function(a, b) {
        var c = a.indexOf(b);
        if (-1 == c) return !1;
        a.splice(c, 1);
        return !0
    };
    y.iter = function(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function() {
                return this.cur <
                    this.arr.length
            },
            next: function() {
                return this.arr[this.cur++]
            }
        }
    };
    var xb = function() {};
    e.Lambda = xb;
    xb.__name__ = ["Lambda"];
    xb.array = function(a) {
        for (var b = [], a = Fe(a)(); a.hasNext();) {
            var c = a.next();
            b.push(c)
        }
        return b
    };
    xb.exists = function(a, b) {
        for (var c = Fe(a)(); c.hasNext();) {
            var f = c.next();
            if (b(f)) return !0
        }
        return !1
    };
    xb.count = function(a, b) {
        var c = 0;
        if (null == b)
            for (var f = Fe(a)(); f.hasNext();) f.next(), c++;
        else
            for (f = Fe(a)(); f.hasNext();) {
                var w = f.next();
                b(w) && c++
            }
        return c
    };
    var kb = function() {
        this.length = 0
    };
    e.List =
        kb;
    kb.__name__ = ["List"];
    kb.prototype = {
        add: function(a) {
            a = [a];
            null == this.h ? this.h = a : this.q[1] = a;
            this.q = a;
            this.length++
        },
        push: function(a) {
            this.h = a = [a, this.h];
            null == this.q && (this.q = a);
            this.length++
        },
        iterator: function() {
            return new rd(this.h)
        },
        __class__: kb
    };
    var rd = function(a) {
        this.head = a;
        this.val = null
    };
    e["_List.ListIterator"] = rd;
    rd.__name__ = ["_List", "ListIterator"];
    rd.prototype = {
        hasNext: function() {
            return null != this.head
        },
        next: function() {
            this.val = this.head[0];
            this.head = this.head[1];
            return this.val
        },
        __class__: rd
    };
    Math.__name__ = ["Math"];
    var K = function() {};
    e.Reflect = K;
    K.__name__ = ["Reflect"];
    K.field = function(a, b) {
        try {
            return a[b]
        } catch (c) {
            return c instanceof n && (c = c.val), null
        }
    };
    K.setField = function(a, b, c) {
        a[b] = c
    };
    K.callMethod = function(a, b, c) {
        return b.apply(a, c)
    };
    K.fields = function(a) {
        var b = [];
        if (null != a) {
            var c = Object.prototype.hasOwnProperty,
                f;
            for (f in a) "__id__" != f && "hx__closures__" != f && c.call(a, f) && b.push(f)
        }
        return b
    };
    K.isFunction = function(a) {
        return "function" == typeof a && !(a.__name__ || a.__ename__)
    };
    K.deleteField =
        function(a, b) {
            if (!Object.prototype.hasOwnProperty.call(a, b)) return !1;
            delete a[b];
            return !0
        };
    var t = function() {};
    e.Std = t;
    t.__name__ = ["Std"];
    t.is = function(a, b) {
        return N.__instanceof(a, b)
    };
    t.string = function(a) {
        return N.__string_rec(a, "")
    };
    t["int"] = function(a) {
        return a | 0
    };
    t.parseInt = function(a) {
        var b = parseInt(a, 10);
        if (0 == b && (120 == y.cca(a, 1) || 88 == y.cca(a, 1))) b = parseInt(a);
        return isNaN(b) ? null : b
    };
    t.parseFloat = function(a) {
        return parseFloat(a)
    };
    var ta = function() {
        this.b = ""
    };
    e.StringBuf = ta;
    ta.__name__ = ["StringBuf"];
    ta.prototype = {
        add: function(a) {
            this.b += t.string(a)
        },
        addSub: function(a, b, c) {
            this.b = null == c ? this.b + y.substr(a, b, null) : this.b + y.substr(a, b, c)
        },
        __class__: ta
    };
    var J = function() {};
    e.StringTools = J;
    J.__name__ = ["StringTools"];
    J.startsWith = function(a, b) {
        return a.length >= b.length && y.substr(a, 0, b.length) == b
    };
    J.isSpace = function(a, b) {
        var c = y.cca(a, b);
        return 8 < c && 14 > c || 32 == c
    };
    J.ltrim = function(a) {
        for (var b = a.length, c = 0; c < b && J.isSpace(a, c);) c++;
        return 0 < c ? y.substr(a, c, b - c) : a
    };
    J.rtrim = function(a) {
        for (var b = a.length,
                c = 0; c < b && J.isSpace(a, b - c - 1);) c++;
        return 0 < c ? y.substr(a, 0, b - c) : a
    };
    J.trim = function(a) {
        return J.ltrim(J.rtrim(a))
    };
    J.lpad = function(a, b, c) {
        if (0 >= b.length) return a;
        for (; a.length < c;) a = b + a;
        return a
    };
    J.fastCodeAt = function(a, b) {
        return a.charCodeAt(b)
    };
    var F = e.ValueType = {
        __ename__: ["ValueType"],
        __constructs__: "TNull,TInt,TFloat,TBool,TObject,TFunction,TClass,TEnum,TUnknown".split(",")
    };
    F.TNull = ["TNull", 0];
    F.TNull.__enum__ = F;
    F.TInt = ["TInt", 1];
    F.TInt.__enum__ = F;
    F.TFloat = ["TFloat", 2];
    F.TFloat.__enum__ = F;
    F.TBool = ["TBool", 3];
    F.TBool.__enum__ = F;
    F.TObject = ["TObject", 4];
    F.TObject.__enum__ = F;
    F.TFunction = ["TFunction", 5];
    F.TFunction.__enum__ = F;
    F.TClass = function(a) {
        a = ["TClass", 6, a];
        a.__enum__ = F;
        return a
    };
    F.TEnum = function(a) {
        a = ["TEnum", 7, a];
        a.__enum__ = F;
        return a
    };
    F.TUnknown = ["TUnknown", 8];
    F.TUnknown.__enum__ = F;
    var S = function() {};
    e.Type = S;
    S.__name__ = ["Type"];
    S.getClassName = function(a) {
        a = a.__name__;
        return null == a ? null : a.join(".")
    };
    S.getEnumName = function(a) {
        return a.__ename__.join(".")
    };
    S.resolveClass = function(a) {
        a =
            e[a];
        return null == a || !a.__name__ ? null : a
    };
    S.resolveEnum = function(a) {
        a = e[a];
        return null == a || !a.__ename__ ? null : a
    };
    S.createEmptyInstance = function(a) {
        function b() {}
        b.prototype = a.prototype;
        return new b
    };
    S.createEnum = function(a, b, c) {
        var f = K.field(a, b);
        if (null == f) throw new n("No such constructor " + b);
        if (K.isFunction(f)) {
            if (null == c) throw new n("Constructor " + b + " need parameters");
            return K.callMethod(a, f, c)
        }
        if (null != c && 0 != c.length) throw new n("Constructor " + b + " does not need parameters");
        return f
    };
    S.getEnumConstructs =
        function(a) {
            return a.__constructs__.slice()
        };
    S["typeof"] = function(a) {
        switch (typeof a) {
            case "boolean":
                return F.TBool;
            case "string":
                return F.TClass(String);
            case "number":
                return Math.ceil(a) == a % 2147483648 ? F.TInt : F.TFloat;
            case "object":
                if (null == a) return F.TNull;
                var b = a.__enum__;
                if (null != b) return F.TEnum(b);
                a = N.getClass(a);
                return null != a ? F.TClass(a) : F.TObject;
            case "function":
                return a.__name__ || a.__ename__ ? F.TObject : F.TFunction;
            case "undefined":
                return F.TNull;
            default:
                return F.TUnknown
        }
    };
    var o = function(a) {
        this.nodeType =
            a;
        this.children = [];
        this.attributeMap = new ka
    };
    e.Xml = o;
    o.__name__ = ["Xml"];
    o.parse = function(a) {
        return $a.parse(a)
    };
    o.createElement = function(a) {
        var b = new o(o.Element);
        if (b.nodeType != o.Element) throw new n("Bad node type, expected Element but found " + b.nodeType);
        b.nodeName = a;
        return b
    };
    o.createPCData = function(a) {
        var b = new o(o.PCData);
        if (b.nodeType == o.Document || b.nodeType == o.Element) throw new n("Bad node type, unexpected " + b.nodeType);
        b.nodeValue = a;
        return b
    };
    o.createCData = function(a) {
        var b = new o(o.CData);
        if (b.nodeType == o.Document || b.nodeType == o.Element) throw new n("Bad node type, unexpected " + b.nodeType);
        b.nodeValue = a;
        return b
    };
    o.createComment = function(a) {
        var b = new o(o.Comment);
        if (b.nodeType == o.Document || b.nodeType == o.Element) throw new n("Bad node type, unexpected " + b.nodeType);
        b.nodeValue = a;
        return b
    };
    o.createDocType = function(a) {
        var b = new o(o.DocType);
        if (b.nodeType == o.Document || b.nodeType == o.Element) throw new n("Bad node type, unexpected " + b.nodeType);
        b.nodeValue = a;
        return b
    };
    o.createProcessingInstruction =
        function(a) {
            var b = new o(o.ProcessingInstruction);
            if (b.nodeType == o.Document || b.nodeType == o.Element) throw new n("Bad node type, unexpected " + b.nodeType);
            b.nodeValue = a;
            return b
        };
    o.createDocument = function() {
        return new o(o.Document)
    };
    o.prototype = {
        get_nodeName: function() {
            if (this.nodeType != o.Element) throw new n("Bad node type, expected Element but found " + this.nodeType);
            return this.nodeName
        },
        get: function(a) {
            if (this.nodeType != o.Element) throw new n("Bad node type, expected Element but found " + this.nodeType);
            return this.attributeMap.get(a)
        },
        set: function(a, b) {
            if (this.nodeType != o.Element) throw new n("Bad node type, expected Element but found " + this.nodeType);
            this.attributeMap.set(a, b)
        },
        exists: function(a) {
            if (this.nodeType != o.Element) throw new n("Bad node type, expected Element but found " + this.nodeType);
            return this.attributeMap.exists(a)
        },
        iterator: function() {
            if (this.nodeType != o.Document && this.nodeType != o.Element) throw new n("Bad node type, expected Element or Document but found " + this.nodeType);
            return y.iter(this.children)
        },
        elementsNamed: function(a) {
            if (this.nodeType != o.Document && this.nodeType != o.Element) throw new n("Bad node type, expected Element or Document but found " + this.nodeType);
            for (var b = [], c = 0, f = this.children; c < f.length;) {
                var w = f[c];
                ++c;
                var d;
                if (d = w.nodeType == o.Element) {
                    if (w.nodeType != o.Element) throw new n("Bad node type, expected Element but found " + w.nodeType);
                    d = w.nodeName == a
                }
                d && b.push(w)
            }
            return y.iter(b)
        },
        firstElement: function() {
            if (this.nodeType != o.Document && this.nodeType != o.Element) throw new n("Bad node type, expected Element or Document but found " +
                this.nodeType);
            for (var a = 0, b = this.children; a < b.length;) {
                var c = b[a];
                ++a;
                if (c.nodeType == o.Element) return c
            }
            return null
        },
        addChild: function(a) {
            if (this.nodeType != o.Document && this.nodeType != o.Element) throw new n("Bad node type, expected Element or Document but found " + this.nodeType);
            null != a.parent && a.parent.removeChild(a);
            this.children.push(a);
            a.parent = this
        },
        removeChild: function(a) {
            if (this.nodeType != o.Document && this.nodeType != o.Element) throw new n("Bad node type, expected Element or Document but found " +
                this.nodeType);
            return y.remove(this.children, a) ? (a.parent = null, !0) : !1
        },
        __class__: o
    };
    var q = function() {};
    e["com.EntityHelper"] = q;
    q.__name__ = ["com", "EntityHelper"];
    q.attachToNewEntity = function(a, b, c) {
        null == c && (c = !0);
        a = (new M).add(a);
        null != b && b.addChild(a, c);
        return a
    };
    q.delayedCall = function(a, b, c) {
        null == c && (null == q.sciptEnt && (q.sciptEnt = new M, h.root.addChild(q.sciptEnt)), c = q.sciptEnt);
        null == q.allTweensArray && (q.allTweensArray = []);
        var f = new vc,
            w = new M;
        q.allTweensArray.push(w);
        c.addChild(w);
        w.add(f);
        f.run(new wc([new xc(a),
            new Kb(b), new Kb(function() {
                null != f.owner && f.owner.dispose()
            })
        ]));
        return f
    };
    var pa = e["com.funtomic.GameOpsStatus"] = {
        __ename__: ["com", "funtomic", "GameOpsStatus"],
        __constructs__: ["UNINITIALIZED", "INITIALIZING", "INITIALIZED", "QUITTING"]
    };
    pa.UNINITIALIZED = ["UNINITIALIZED", 0];
    pa.UNINITIALIZED.__enum__ = pa;
    pa.INITIALIZING = ["INITIALIZING", 1];
    pa.INITIALIZING.__enum__ = pa;
    pa.INITIALIZED = ["INITIALIZED", 2];
    pa.INITIALIZED.__enum__ = pa;
    pa.QUITTING = ["QUITTING", 3];
    pa.QUITTING.__enum__ = pa;
    var m = function() {};
    e["com.funtomic.GameOps"] =
        m;
    m.__name__ = ["com", "funtomic", "GameOps"];
    m.IOErrorHandler = function(a) {
        Y.error(["Error caught ", a])
    };
    m.getEventsStaticParams = function(a) {
        a = {
            domain: m.domain,
            uuid: m.userID,
            platform: m.platform,
            is_native: m.isNative,
            is_synced: m.localStorage.isSynced,
            install_date: m.localStorage.installDate,
            original_version: m.localStorage.originalVersion,
            partial_data: m.localStorage.partialData,
            is_in_kizi_app: m.isInKiziApp(),
            events: a
        };
        null != m.localStorage.isConverted && (a.is_converted = m.localStorage.isConverted);
        null != m.mediaSource &&
            (a.media_source = m.mediaSource);
        null != m.campaignName && (a.campaign_name = m.campaignName);
        return a
    };
    m.reportEvents = function(a) {
        if (m.status != pa.INITIALIZED) m.queueEvents(a);
        else {
            var b = m.getEventsStaticParams(a),
                c = m.apiURLPrefix + m.apiEventsLocation,
                f = new sd(c);
            f.addParameter("data", JSON.stringify(b));
            Y.verbose(["Posting event to:", c]);
            f.onData = m.eventReportSucceeded;
            f.onStatus = function(b) {
                m.onEventReportReturned(b, a)
            };
            f.onError = m.IOErrorHandler;
            f.request(!0);
            m.sessionEnd()
        }
    };
    m.onEventReportReturned = function(a,
        b) {
        switch (a) {
            case 500:
                m.eventReportFailed();
                break;
            case 0:
                m.eventReportTimeout(b)
        }
    };
    m.eventReportTimeout = function(a) {
        Y.error(["Report event timeout"]);
        m.queueEvents(a)
    };
    m.eventReportFailed = function() {
        Y.error(["Report event failed"]);
        m.localStorage.unsentEvents = [];
        m.writeLocalStorage()
    };
    m.eventReportSucceeded = function(a) {
        Y.verbose(["Event Posted " + a]);
        m.reportUnsentEvents()
    };
    m.reportEvent = function(a, b) {
        if (!m.isEventsTraceOnly) switch (m.status[1]) {
            case 1:
                m.deferredReportEvents.push(function() {
                    m.reportEvent(a,
                        b)
                });
                break;
            default:
                var c = m.prepareEventObject(a, b);
                m.reportEvents([c])
        }
    };
    m.prepareEventObject = function(a, b) {
        var c = sa.format(new Date, "%Y-%m-%d %H:%M:%S"),
            f = t.string(new Date),
            w = f.indexOf("+"),
            f = y.substr(f, w, 5),
            c = {
                event_type: a,
                date: c + f
            };
        null != m.experimentId && (c.experiment_id = m.experimentId);
        null != m.alternativeId && (c.alternative_id = m.alternativeId);
        c.elapsed_play_time = Math.round(m.elapsedPlayTimeAtInit + m.sampleTimer("session") / 1E3);
        c.session_id = m.sessionId;
        c.game_ops_version = m.gameOpsVersion;
        c.game_version =
            m.gameVersion;
        null != m.url && (c.url = m.url);
        m.firstSession && (c.first_session = !0);
        null != m.fbId && (c.fb_id = m.fbId);
        return c = m.extendObject(c, b)
    };
    m.queueEvents = function(a) {
        Y.verbose(["Queuing events:" + JSON.stringify(a)]);
        null == m.localStorage.unsentEvents && (m.localStorage.unsentEvents = []);
        for (var b = 0; b < a.length;) {
            var c = a[b];
            ++b;
            m.localStorage.unsentEvents.push(c)
        }
        m.localStorage.unsentEvents.length > m.MAX_SAVED_UNSENT_EVENTS && (m.localStorage.unsentEvents = [], m.localStorage.partialData = !0);
        m.writeLocalStorage();
        Y.verbose(["There are now " + t.string(m.localStorage.unsentEvents.length) + " unsent events."])
    };
    m.reportUnsentEvents = function() {
        null != m.localStorage.unsentEvents && 0 < m.localStorage.unsentEvents.length && (Y.verbose(["reporting unsent events", m.localStorage.unsentEvents.length]), m.reportEvents(m.localStorage.unsentEvents), m.localStorage.unsentEvents = [], m.writeLocalStorage())
    };
    m.sessionEnd = function(a, b) {
        null == a && (a = !0);
        var c = m.sampleTimer("session");
        if (-1 == c) Y.error(["sessionEnd was called without a matching sessionStart!"]);
        else {
            for (var f = [], w = 0, d = m.levelsNumbers; w < d.length;) {
                var e = d[w];
                ++w; - 1 == f.indexOf(e) && f.push(e)
            }
            f = {
                session_duration: Math.round(c / 1E3),
                levels_numbers: f.toString(),
                won_percent: 0,
                levels_count: m.levelsNumbers.length,
                levels_won: m.levelsWon,
                sent_by: "application"
            };
            null != b && (f = m.extendObject(b, f));
            0 < f.levels_count && (f.won_percent = 100 * (m.levelsWon / m.levelsNumbers.length));
            m.updateTotalElapsedTime(c / 1E3);
            c = m.prepareEventObject("session_end", f);
            a ? (Y.verbose(["writing session end event to local storage"]), m.storageSet("FuntomicGameOps-SessionEndEvent",
                c)) : m.reportEvents([c])
        }
    };
    m.updateTotalElapsedTime = function(a) {
        m.storageSet("FuntomicGameOps-ElapsedGameTime", m.elapsedPlayTimeAtInit + a)
    };
    m.sampleTimer = function(a, b) {
        null == b && (b = !1);
        if (null == K.field(m.timers, a)) return -1;
        var c = K.field(m.timers, a)[1];
        0 != K.field(m.timers, a)[0] && (c += m.getTimestamp() - K.field(m.timers, a)[0]);
        b && K.deleteField(m.timers, a);
        Y.verbose(["Timer '" + a + "' sampled. Current elapsed time is " + c]);
        return c
    };
    m.getTimestamp = function() {
        return (new Date).getTime()
    };
    m.extendObject = function(a,
        b) {
        for (var c = 0, f = K.fields(b); c < f.length;) {
            var w = f[c];
            ++c;
            var d = K.field(b, w);
            a[null == w ? "null" : "" + w] = d
        }
        return a
    };
    m.storageSet = function(a, b) {
        return null != m.gameOpsStorage ? K.field(m.gameOpsStorage, "set")(m.domain + a, b) : h._platform.getStorage().set(m.domain + a, b)
    };
    m.writeLocalStorage = function() {
        m.storageSet("FuntomicGameOps", m.localStorage)
    };
    m.isInKiziApp = function() {
        return null != K.field(window, "jsinterface")
    };
    var xa = function() {};
    e["flambe.util.Disposable"] = xa;
    xa.__name__ = ["flambe", "util", "Disposable"];
    xa.prototype = {
        __class__: xa
    };
    var z = function() {
        this._flags = 0;
        this.owner = this.next = null
    };
    e["flambe.Component"] = z;
    z.__name__ = ["flambe", "Component"];
    z.__interfaces__ = [xa];
    z.prototype = {
        onAdded: function() {},
        onRemoved: function() {},
        onStart: function() {},
        onStop: function() {},
        onUpdate: function() {},
        dispose: function() {
            null != this.owner && this.owner.remove(this)
        },
        get_name: function() {
            return null
        },
        __class__: z
    };
    var Y = function() {};
    e["com.funtomic.GameOpsLogger"] = Y;
    Y.__name__ = ["com", "funtomic", "GameOpsLogger"];
    Y.verbose = function(a) {
        Y.log(2,
            a.join(" "))
    };
    Y.error = function(a) {
        Y.log(0, "ERROR - " + a.join(" "));
        null
    };
    Y.log = function(a) {
        a <= Y.logLevel && (a = new Date, a.getDay(), a.getMonth(), a.getFullYear(), a.getHours(), a.getMinutes(), a.getSeconds(), null)
    };
    var G = function() {};
    e["com.funtomic.GameOpsStorage"] = G;
    G.__name__ = ["com", "funtomic", "GameOpsStorage"];
    G.init = function() {
        null != S.resolveClass("flambe.System") && (G._prefix = "flambe:");
        G._storage = window.localStorage;
        G._isInitialized = !0
    };
    G.validateInitialized = function() {
        if (!G._isInitialized) throw new n("GameOpsStorage Is Not Initialized!");
    };
    G.reportErrorEvent = function(a) {
        3 < G._isErrorEventsSent || (G._isErrorEventsSent += 1, m.reportEvent("local_storage_error", a))
    };
    G.get_supported = function() {
        return !0
    };
    G.set = function(a, b) {
        G.validateInitialized();
        var c;
        try {
            var f = new ya;
            f.useCache = !0;
            f.useEnumIndex = !1;
            f.serialize(b);
            c = f.toString()
        } catch (w) {
            return w instanceof n && (w = w.val), console.warn("Storage serialization failed:", w), G.reportErrorEvent({
                error_message: "Storage serialization failed: " + t.string(w)
            }), !1
        }
        try {
            G._storage.setItem(G._prefix + a, c)
        } catch (d) {
            d instanceof
            n && (d = d.val);
            console.warn("localStorage.setItem failed:", d.message);
            c = -2;
            f = !0 == K.field(window, "isStorageRedirected");
            try {
                c = JSON.stringify(window.parent.localStorage).length / 1024
            } catch (e) {
                e instanceof n && (e = e.val), c = -1
            }
            G.reportErrorEvent({
                error_message: "localStorage.setItem failed: " + t.string(d.message),
                local_storage_size: c,
                is_storage_redirected: f
            });
            G.clear();
            return !1
        }
        return !0
    };
    G.get = function(a, b) {
        G.validateInitialized();
        var c = null;
        try {
            c = G._storage.getItem(G._prefix + a)
        } catch (f) {
            f instanceof n && (f =
                f.val), console.warn("localStorage.getItem failed:", f.message), G.reportErrorEvent({
                error_message: "localStorage.getItem failed: " + t.string(f.message)
            })
        }
        if (null != c) try {
            return ba.run(c)
        } catch (d) {
            d instanceof n && (d = d.val), console.warn("Storage unserialization failed:", d), G.reportErrorEvent({
                error_message: "Storage unserialization failed: " + t.string(d)
            })
        }
        return b
    };
    G.remove = function(a) {
        G.validateInitialized();
        try {
            G._storage.removeItem(G._prefix + a)
        } catch (b) {
            b instanceof n && (b = b.val), console.warn("localStorage.removeItem failed:",
                b.message), G.reportErrorEvent({
                error_message: "localStorage.removeItem failed: " + t.string(b.message)
            })
        }
    };
    G.clear = function() {
        G.validateInitialized();
        try {
            G._storage.clear()
        } catch (a) {
            a instanceof n && (a = a.val), console.warn("localStorage.clear failed:", a.message), G.reportErrorEvent({
                error_message: "localStorage.clear failed: " + t.string(a.message)
            })
        }
    };
    var B = function() {
        this.currentScore = 0;
        this.stockPile = [];
        this.wastePile = [];
        this.foundationPile = [];
        this.foundationPile[0] = [];
        this.foundationPile[1] = [];
        this.foundationPile[2] = [];
        this.foundationPile[3] = [];
        this.tableuPile = [];
        this.tableuPile[0] = [];
        this.tableuPile[1] = [];
        this.tableuPile[2] = [];
        this.tableuPile[3] = [];
        this.tableuPile[4] = [];
        this.tableuPile[5] = [];
        this.tableuPile[6] = []
    };
    e["farmgame.BoardData"] = B;
    B.__name__ = ["farmgame", "BoardData"];
    B.isBdataChanged = function(a, b) {
        return !1 == B.isArrayIdentical(a.foundationPile[0], b.foundationPile[0]) || !1 == B.isArrayIdentical(a.foundationPile[1], b.foundationPile[1]) || !1 == B.isArrayIdentical(a.foundationPile[2], b.foundationPile[2]) || !1 ==
            B.isArrayIdentical(a.foundationPile[3], b.foundationPile[3]) || !1 == B.isArrayIdentical(a.tableuPile[0], b.tableuPile[0]) || !1 == B.isArrayIdentical(a.tableuPile[1], b.tableuPile[1]) || !1 == B.isArrayIdentical(a.tableuPile[2], b.tableuPile[2]) || !1 == B.isArrayIdentical(a.tableuPile[3], b.tableuPile[3]) || !1 == B.isArrayIdentical(a.tableuPile[4], b.tableuPile[4]) || !1 == B.isArrayIdentical(a.tableuPile[5], b.tableuPile[5]) || !1 == B.isArrayIdentical(a.tableuPile[6], b.tableuPile[6]) || !1 == B.isArrayIdentical(a.stockPile, b.stockPile) ||
            !1 == B.isArrayIdentical(a.wastePile, b.wastePile) ? !0 : !1
    };
    B.isArrayIdentical = function(a, b) {
        if (a.length != b.length) return !1;
        for (var c = a.length; 0 < c--;)
            if (null == a[c] || null == b[c] || a[c].cardIdx != b[c].cardIdx || a[c].suitIdx != b[c].suitIdx || a[c].turned != b[c].turned) return !1;
        return !0
    };
    B.prototype = {
        addToBdata: function(a) {
            var b = new td(a.suitIdx, a.cardIdx, a.turned);
            a.myState == k.STATE_STOCK ? this.stockPile[a.stockIdx] = b : a.myState == k.STATE_TABLEU ? this.tableuPile[a.tableouIdx][a.tableouPosition] = b : a.myState == k.STATE_WASTE ?
                (b.turned = !0, this.wastePile[a.wasteIdx] = b) : a.myState == k.STATE_FOUNDATION && (this.foundationPile[a.foundationIdx][a.foundationPosition] = b)
        },
        fromSnapshotToBoard: function(a) {
            this.justUndoedArray = [];
            this.manageStockPile();
            this.manageTableu();
            this.manageWaste();
            this.manageFoundation();
            a || this.fixPostUndoLayering();
            this.fixTurnedCards();
            v.currentScore = this.currentScore
        },
        fixTurnedCards: function() {
            for (var a = k.cardArray.length; 0 < a--;) {
                var b = k.cardArray[a];
                b.myState == k.STATE_TABLEU && O.isOnTableuTop(b) && (b.turned = !0)
            }
        },
        manageFoundation: function() {
            for (var a = this.foundationPile.length; 0 < a--;)
                for (var b = this.foundationPile[a].length; 0 < b--;) {
                    var c = this.foundationPile[a][b],
                        f = j.getByCardAndSuitIdx(c.suitIdx, c.cardIdx);
                    f.myState == k.STATE_FOUNDATION && f.foundationIdx == a && f.foundationPosition == b && f.turned == c.turned || this.justUndoedArray.push(f);
                    f.myState = k.STATE_FOUNDATION;
                    f.foundationIdx = a;
                    f.foundationPosition = b;
                    f.AssignTurned(c.turned);
                    p.layerTiles.addChild(f.owner, !1)
                }
        },
        manageWaste: function() {
            for (var a = this.wastePile.length; 0 <
                a--;) {
                var b = this.wastePile[a],
                    c = j.getByCardAndSuitIdx(b.suitIdx, b.cardIdx);
                c.myState == k.STATE_WASTE && c.wasteIdx == a && c.turned == b.turned || this.justUndoedArray.push(c);
                c.myState = k.STATE_WASTE;
                c.wasteIdx = a;
                c.AssignTurned(b.turned);
                p.layerTiles.addChild(c.owner, !1)
            }
        },
        manageTableu: function() {
            for (var a = this.tableuPile.length; 0 < a--;)
                for (var b = this.tableuPile[a].length; 0 < b--;) {
                    var c = this.tableuPile[a][b],
                        f = j.getByCardAndSuitIdx(c.suitIdx, c.cardIdx);
                    f.myState == k.STATE_TABLEU && f.tableouIdx == a && f.tableouPosition ==
                        b && f.turned == c.turned || this.justUndoedArray.push(f);
                    f.myState = k.STATE_TABLEU;
                    f.tableouIdx = a;
                    f.tableouPosition = b;
                    f.AssignTurned(c.turned);
                    p.layerTiles.addChild(f.owner, !1);
                    null
                }
        },
        fixPostUndoLayering: function() {
            for (var a = this.justUndoedArray.length; 0 < a--;) null;
            if (!(0 >= this.justUndoedArray.length)) {
                this.justUndoedArray[0].myState == k.STATE_TABLEU ? this.justUndoedArray.sort(function(a, c) {
                    return a.tableouPosition > c.tableouPosition ? -1 : a.tableouPosition == c.tableouPosition ? 0 : 1
                }) : this.justUndoedArray.sort(function(a,
                    c) {
                    return a.foundationPosition > c.foundationPosition ? 1 : a.foundationPosition == c.foundationPosition ? 0 : -1
                });
                for (a = this.justUndoedArray.length; 0 < a--;) p.layerTiles.addChild(this.justUndoedArray[a].owner)
            }
        },
        manageStockPile: function() {
            for (var a = this.stockPile.length; 0 < a--;) {
                var b = this.stockPile[a];
                if (null != b) {
                    var c = j.getByCardAndSuitIdx(b.suitIdx, b.cardIdx);
                    c.myState == k.STATE_STOCK && c.stockIdx == a && c.turned == b.turned || this.justUndoedArray.push(c);
                    c.myState = k.STATE_STOCK;
                    c.stockIdx = a;
                    c.AssignTurned(b.turned);
                    p.layerTiles.addChild(c.owner, !1)
                }
            }
        },
        __class__: B
    };
    var u = function() {};
    e["farmgame.BoardManager"] = u;
    u.__name__ = ["farmgame", "BoardManager"];
    u.InitializeBoard = function() {
        u.resetBoardSnapshot();
        u.generateCards();
        u.generateStock();
        u.generateTableou();
        u.generateBoardSnapshot();
        ca.delay(function() {
            v.restartTimer()
        }, 1500);
        u.autoCompleteInProgress = !1;
        u.gameOverFlag = !1
    };
    u.RestartBoard = function() {
        u.fromSnapshotToBoard(B.boardDataArray[0], !0);
        ca.delay(function() {
            v.gameStartedStamp = ca.stamp()
        }, 1500);
        B.boardDataIdx = -1;
        B.boardDataArray = [];
        u.resetBoardSnapshot();
        u.generateBoardSnapshot();
        u.autoCompleteInProgress = !1;
        u.gameOverFlag = !1
    };
    u.resetBoardSnapshot = function() {
        B.boardDataArray = [];
        B.boardDataIdx = -1
    };
    u.generateBoardSnapshot = function() {
        q.delayedCall(0.02, u.actuallyGenerateSnapshot)
    };
    u.actuallyGenerateSnapshot = function() {
        null == B.boardDataArray && (B.boardDataArray = [], B.boardDataIdx = 0);
        for (var a = new B, b = k.cardArray.length; 0 < b--;) a.addToBdata(k.cardArray[b]);
        a.currentScore = v.currentScore;
        2 <= B.boardDataArray.length ?
            u.isBdataChanged(a, B.boardDataArray[B.boardDataArray.length - 1]) && (B.boardDataArray.push(a), B.boardDataIdx = B.boardDataArray.length - 1) : (B.boardDataArray.push(a), B.boardDataIdx = B.boardDataArray.length - 1)
    };
    u.isBdataChanged = function(a, b) {
        return B.isBdataChanged(a, b)
    };
    u.Undo = function() {
        1 < B.boardDataArray.length ? (B.boardDataArray.pop(), u.fromSnapshotToBoard(B.boardDataArray[B.boardDataArray.length - 1])) : u.fromSnapshotToBoard(B.boardDataArray[0])
    };
    u.fromSnapshotToBoard = function(a, b) {
        null == b && (b = !1);
        a.fromSnapshotToBoard(b)
    };
    u.generateStock = function() {
        for (var a = 0, b = k.cardArray.length; 28 < b--;) k.cardArray[b].addToStock(a++), k.cardArray[b].initAnimationStart(0)
    };
    u.generateTableou = function() {
        for (var a = 0, b = 7; 0 < b--;)
            for (var c = b + 1; 0 < c--;) c == b ? k.cardArray[a].addToTableu(b, c, !0) : k.cardArray[a].addToTableu(b, c, !1), k.cardArray[a].initAnimationStart(32 - a), a++
    };
    u.generateCards = function() {
        k.cardArray = [];
        for (var a = j.NUM_SUITS; 0 < a--;)
            for (var b = j.NUM_CARDS_PER_SUIT; 0 < b--;) new k(a, b);
        j.ShuffleArray(k.cardArray)
    };
    u.tryToAutofinishGame =
        function() {
            var a = !0,
                b = k.cardArray;
            if (null != b) {
                for (b = b.length; 0 < b--;) {
                    var c = k.cardArray[b];
                    if (!1 == c.turned || c.myState == k.STATE_WASTE || c.myState == k.STATE_STOCK) {
                        a = !1;
                        break
                    }
                }
                a && u.autoCompleteCalled()
            }
        };
    u.autoCompleteCalled = function() {
        u.autoCompleteInProgress = !0;
        for (var a = k.cardArray.length; 0 < a--;) {
            var b = k.cardArray[a];
            if (b.myState == k.STATE_TABLEU && b.doubleClickCall(!0)) {
                p.layerTiles.addChild(b.owner);
                break
            }
        }
    };
    u.removeAllCardsFromBoard = function() {
        for (var a = k.cardArray, b = a.length; 0 < b--;) a[b].owner.dispose()
    };
    u.checkIfGameOver = function() {
        if (!(null == k.cardArray || u.gameOverFlag)) {
            u.gameOverFlag = !0;
            for (var a = k.cardArray.length; 0 < a--;) k.cardArray[a].myState != k.STATE_FOUNDATION && (u.gameOverFlag = !1);
            u.gameOverFlag && v.myRef.gameOverStarted()
        }
    };
    var V = function(a, b, c) {
        z.call(this);
        this.owner = new M;
        a.addChild(this.owner);
        this.container = a;
        this.imgNormal = new da(p.pack.getTexture(b));
        this.imgNormalEnt = q.attachToNewEntity(this.imgNormal, this.owner);
        this.imgover = new da(p.pack.getTexture(c));
        q.attachToNewEntity(this.imgover,
            this.owner);
        this.imgover.get_pointerOut().connect(R(this, this.onMouseOut));
        this.imgNormal.get_pointerIn().connect(R(this, this.onMouseOver));
        this.imgNormal.get_pointerDown().connect(R(this, this.onClick));
        this.imgover.get_pointerDown().connect(R(this, this.onClick));
        this.imgNormal.set_visible(!0);
        this.imgover.set_visible(!1)
    };
    e["farmgame.ButtonWithOverState"] = V;
    V.__name__ = ["farmgame", "ButtonWithOverState"];
    V.__super__ = z;
    V.prototype = r(z.prototype, {
        get_name: function() {
            return "ButtonWithOverState_13"
        },
        onClick: function() {
            h._platform.getMouse().set_cursor(Z.Default)
        },
        onMouseOut: function() {
            this.imgNormal.set_visible(!0);
            this.imgover.set_visible(!1);
            h._platform.getMouse().set_cursor(Z.Default)
        },
        onMouseOver: function() {
            this.imgNormal.set_visible(!1);
            this.imgover.set_visible(!0);
            h._platform.getMouse().set_cursor(Z.Button)
        },
        setXY: function(a, b) {
            this.imgNormal.setXY(a, b);
            this.imgover.setXY(a, b)
        },
        setVisible: function() {
            this.container.addChild(this.owner)
        },
        setInvisible: function() {
            null != this.owner && null != this.owner.parent && this.owner.parent.removeChild(this.owner)
        },
        centerAnchor: function() {
            this.imgover.centerAnchor();
            this.imgNormal.centerAnchor()
        },
        __class__: V
    });
    var k = function(a, b) {
        this.initAnimationState = this.preInitState = !0;
        this.selectedFlag = !1;
        this.myState = -1;
        z.call(this);
        this.owner = new M;
        p.layerTiles.addChild(this.owner);
        this.owner.add(this);
        this.cardIdx = b;
        this.suitIdx = a;
        this.cardImgBack = new da(p.pack.getTexture("CARDS/back"));
        this.cardImgFront = new da(p.pack.getTexture("CARDS/" + j.getCardImageName(a, b)));
        q.attachToNewEntity(this.cardImgFront, this.owner);
        q.attachToNewEntity(this.cardImgBack, this.owner);
        this.cardImgBack.set_visible(!1);
        k.cardArray.push(this);
        this.cardImgFront.get_pointerDown().connect(R(this, this.onPointerDownFront));
        this.cardImgFront.get_pointerUp().connect(R(this, this.onPointerUpFront));
        this.cardImgBack.centerAnchor();
        this.cardImgFront.centerAnchor();
        this.cardImgBack.get_pointerDown().connect(R(this, this.onPointerDownCardImgBack));
        this.cardImgPosition = new ab;
        this.cardImgFront.setXY(400, -200);
        this.cardImgBack.setXY(400, -200)
    };
    e["farmgame.Card"] = k;
    k.__name__ = ["farmgame", "Card"];
    k.__super__ = z;
    k.prototype = r(z.prototype, {
        get_name: function() {
            return "Card_7"
        },
        onPointerUpFront: function() {
            null != k.cardClicked && k.cardClicked.unpressClickedCard();
            k.banAllCardsFromSelection = !0;
            ca.delay(function() {
                k.banAllCardsFromSelection = !1
            }, 50)
        },
        unpressClickedCard: function() {
            k.readyForDoubleclick ? (q.delayedCall(0.01, R(this, this.doubleClicked)), k.readyForDoubleclick = !1) : (null, !1 != this.selectedFlag && (this.deselect() || x.playInvalid()))
        },
        onPointerDownFront: function() {
            if (!(k.banAllCardsFromSelection || this.myState == k.STATE_FOUNDATION && j.notOnFoundationTop(this)) &&
                !(this.myState == k.STATE_WASTE && this.wasteIdx != j.getWasteLength() - 1)) k.readyForDoubleclick = !0, null != this.doubleclickScr && (this.doubleclickScr.stopAll(), this.doubleclickScr.dispose()), this.doubleclickScr = q.delayedCall(0.4, function() {
                k.readyForDoubleclick = !1
            }, this.owner), this.getoOffSetAndSelect(), k.cardClicked = this, x.play("SOUNDS/grabcard")
        },
        deselect: function() {
            if (!1 == this.selectedFlag) return !1;
            this.selectedFlag = !1;
            var a = this.tableouIdx,
                b = this.tableouPosition;
            if (O.checkIfCardPlacedAtValidSpot(this)) {
                var c =
                    0,
                    f = null,
                    d = !0;
                do d = !0, c++, f = j.getByTableuPosition(a, b + 1), null != f && !0 == f.selectedFlag && (d = !1, f.myState = this.myState, f.tableouIdx = this.tableouIdx, f.tableouPosition = this.tableouPosition + c, f.selectedFlag = !1, b++); while (!1 == d);
                return !0
            }
            for (a = k.cardArray.length; 0 < a--;) k.cardArray[a].selectedFlag = !1;
            return !1
        },
        onPointerDownCardImgBack: function() {
            !1 != k.selectionAllowed && (k.selectionAllowed = !1, ca.delay(function() {
                k.selectionAllowed = !0
            }, 100), this.myState == k.STATE_STOCK && (1 == p.drawCardNum ? (j.drawCardFromStock(),
                u.generateBoardSnapshot()) : j.draw3CardsFromStockToWaste()))
        },
        moveFromStockToWaste: function() {
            1 == p.drawCardNum ? (this.flipCard(), this.myState = k.STATE_WASTE, p.layerTiles.addChild(this.owner), this.wasteIdx = j.getWasteLength() - 1, u.generateBoardSnapshot()) : (this.flipCard(), this.myState = k.STATE_WASTE, p.layerTiles.addChild(this.owner), this.wasteIdx = j.getWasteLength() - 1)
        },
        flipCard: function() {
            var a = this;
            if (!0 == this.turned) return !1;
            q.delayedCall(0.06, function() {
                a.cardImgFront.scaleX.animate(0.2, 1, 0.06);
                a.cardImgBack.scaleX.animateTo(1,
                    0.2);
                a.turned = !0
            });
            this.cardImgBack.scaleX.animate(1, 0.2, 0.06);
            return !0
        },
        doubleClicked: function() {
            this.doubleclickScr.stopAll();
            this.doubleclickScr.dispose();
            k.readyForDoubleclick = !1;
            var a = j.getByTableuPosition(this.tableouIdx, this.tableouPosition - 1);
            null != a && a.turned && this.myState == k.STATE_TABLEU && a.selectedFlag ? a.doubleClickCall() : this.doubleClickCall()
        },
        doubleClickCall: function(a) {
            null == a && (a = !1);
            return j.doubleClicked(this, a)
        },
        getoOffSetAndSelect: function() {
            this.dragOffset = new ab(O.returnNormalizedMouseCoords().x -
                this.cardImgFront.x._value, O.returnNormalizedMouseCoords().y - this.cardImgFront.y._value + 3);
            p.layerTiles.addChild(this.owner);
            this.selectCard();
            if (this.myState == k.STATE_TABLEU) {
                var a = j.getByTableuPosition(this.tableouIdx, this.tableouPosition + 1);
                null != a && a.getoOffSetAndSelect()
            }
        },
        onUpdate: function(a) {
            var b = this;
            z.prototype.onUpdate.call(this, a);
            this.turned ? (this.cardImgFront.set_visible(!0), this.cardImgBack.set_visible(!1)) : (this.cardImgFront.set_visible(!1), this.cardImgBack.set_visible(!0));
            if (!this.preInitState)
                if (this.initAnimationState) this.manageInitialAnimation();
                else if (this.selectedFlag) !1 == h._platform.getPointer().isDown() && ca.delay(function() {
                b.deselect()
            }, 50), this.cardImgFront.setXY(O.returnNormalizedMouseCoords().x - this.dragOffset.x, O.returnNormalizedMouseCoords().y - this.dragOffset.y), this.cardImgPosition.x = this.cardImgFront.x._value, this.cardImgPosition.y = this.cardImgFront.y._value;
            else {
                this.myState == k.STATE_TABLEU ? j.SetToTableu(this) : this.myState == k.STATE_STOCK ? j.SetToStock(this) : this.myState == k.STATE_WASTE ? j.SetToWaste(this) : this.myState == k.STATE_FOUNDATION &&
                    j.SetToFoundation(this);
                var a = 0.25 * (this.cardImgPosition.y - this.cardImgFront.y._value),
                    c = this.cardImgFront.x;
                c.set__(c._value + 0.25 * (this.cardImgPosition.x - this.cardImgFront.x._value));
                c = this.cardImgFront.y;
                c.set__(c._value + a);
                this.cardImgBack.setXY(this.cardImgFront.x._value, this.cardImgFront.y._value)
            }
        },
        manageInitialAnimation: function() {
            this.myState == k.STATE_TABLEU ? j.SetToTableu(this) : this.myState == k.STATE_STOCK ? j.SetToStock(this) : this.myState == k.STATE_WASTE ? j.SetToWaste(this) : this.myState == k.STATE_FOUNDATION &&
                j.SetToFoundation(this);
            var a = this.cardImgFront.x;
            a.set__(a._value + 0.24 * (this.cardImgPosition.x - this.cardImgFront.x._value));
            a = this.cardImgFront.y;
            a.set__(a._value + 0.24 * (this.cardImgPosition.y - this.cardImgFront.y._value));
            this.cardImgBack.setXY(this.cardImgFront.x._value, this.cardImgFront.y._value)
        },
        setXY: function(a, b, c) {
            null == c && (c = !1);
            this.cardImgPosition.x = a + 0.5 * this.cardImgFront.getNaturalWidth();
            this.cardImgPosition.y = b + 0.5 * this.cardImgFront.getNaturalHeight();
            c && (this.cardImgFront.setXY(this.cardImgPosition.x,
                this.cardImgPosition.y), this.cardImgBack.setXY(this.cardImgPosition.x, this.cardImgPosition.y))
        },
        addToTableu: function(a, b, c) {
            this.turned = c;
            this.tableouPosition = b;
            this.tableouIdx = a;
            this.myState = k.STATE_TABLEU
        },
        addToStock: function(a) {
            this.turned = !1;
            this.stockIdx = a;
            this.myState = k.STATE_STOCK;
            this.cardImgBack.setScale(1)
        },
        selectCard: function() {
            this.selectedFlag = !0
        },
        AssignTurned: function(a) {
            this.turned = a
        },
        initAnimationStart: function(a) {
            var b = this;
            q.delayedCall(0.05 * a, function() {
                b.preInitState = !1;
                b.initAnimationState = !0;
                x.playDealCards();
                q.delayedCall(2, function() {
                    b.initAnimationState = !1
                })
            })
        },
        __class__: k
    });
    var td = function(a, b, c) {
        this.turned = c;
        this.cardIdx = b;
        this.suitIdx = a
    };
    e["farmgame.CardData"] = td;
    td.__name__ = ["farmgame", "CardData"];
    td.prototype = {
        __class__: td
    };
    var j = function() {};
    e["farmgame.CardUtil"] = j;
    j.__name__ = ["farmgame", "CardUtil"];
    j.getCardImageName = function(a, b) {
        return j.cardNameArray[a * j.NUM_CARDS_PER_SUIT + b]
    };
    j.ShuffleArray = function(a) {
        for (var b = 10; 0 < b--;) a.sort(function() {
            return -1 + Math.floor(3 * Math.random())
        });
        for (b = a.length; 0 < b--;) p.layerTiles.addChild(a[b].owner)
    };
    j.SetToTableu = function(a) {
        a.setXY(69 + 97 * a.tableouIdx, 210 + 16 * a.tableouPosition)
    };
    j.SetToFoundation = function(a) {
        a.setXY(69 + 97 * (3 + a.foundationIdx), 70)
    };
    j.overlapsEmptyTableu = function(a) {
        a = Math.ceil((a.x._value - a.getNaturalWidth() - 69) / 97);
        if (0 > a || 6 < a) return !1;
        for (var b = k.cardArray, c = b.length; 0 < c--;)
            if (b[c].tableouIdx == a && b[c].myState == k.STATE_TABLEU) return !1;
        return !0
    };
    j.droppedOnEmptyTableu = function(a) {
        var b = Math.ceil((a.cardImgFront.x._value - a.cardImgFront.getNaturalWidth() -
            69) / 97);
        O.uncoverTableu(a);
        a.tableouIdx = b;
        a.tableouPosition = 0;
        a.myState = k.STATE_TABLEU;
        x.play("SOUNDS/valid");
        a.onUpdate(0);
        u.generateBoardSnapshot()
    };
    j.SetToStock = function(a) {
        a.setXY(69 - 0.5 * a.stockIdx, 70 - 0.5 * a.stockIdx)
    };
    j.SetToWaste = function(a) {
        if (1 == p.drawCardNum) a.setXY(166, 70);
        else {
            var b = 166 + 22.77 * j.get3CardWasteIdx(a);
            a.setXY(b, 70)
        }
    };
    j.get3CardWasteIdx = function(a) {
        var b = j.getWasteLength() - 3;
        return 3 > j.getWasteLength() ? a.wasteIdx : a.wasteIdx > b ? a.wasteIdx - b : 0
    };
    j.getByTableuPosition = function(a,
        b) {
        for (var c = k.cardArray.length; 0 < c--;) {
            var f = k.cardArray[c];
            if (f.myState == k.STATE_TABLEU && f.tableouIdx == a && f.tableouPosition == b) return f
        }
        return null
    };
    j.overlapsFoundation = function(a) {
        var b = Math.ceil((a.x._value - a.getNaturalWidth() - 69) / 97) - 3;
        return 0 <= b && 3 >= b && a.y._value < 190 + 0.5 * a.getNaturalHeight() ? !0 : !1
    };
    j.droppedOnFoundation = function(a, b) {
        null == b && (b = -1);
        if (!(a.myState == k.STATE_TABLEU && null != j.getByTableuPosition(a.tableouIdx, a.tableouPosition + 1))) {
            var c = !1;
            a.myState == k.STATE_WASTE && (c = !0);
            var f;
            f = -1 == b ? Math.ceil((a.cardImgFront.x._value - a.cardImgFront.getNaturalWidth() - 69) / 97) - 3 : b;
            j.cardExistsOnFoundation(f) ? j.tryToPlaceCardonNonEmptyFoundation(a, f) : !1 == j.tryToPlaceCardOnEmptyFoundation(a, f) && x.playInvalid();
            a.myState != k.STATE_TABLEU && !1 == c && O.uncoverTableu(a)
        }
    };
    j.tryToPlaceCardonNonEmptyFoundation = function(a, b) {
        for (var c = k.cardArray, f = c.length, d = 0, e = null; 0 < f--;) {
            var g = c[f];
            g.myState == k.STATE_FOUNDATION && g.foundationIdx == b && g.foundationPosition >= d && (d = g.foundationPosition, e = g)
        }
        if (null !=
            e && e.suitIdx == a.suitIdx && a.cardIdx != j.CARD_IDX_A) {
            if (e.cardIdx == j.CARD_IDX_A && a.cardIdx == j.CARD_IDX_02 || e.cardIdx + 1 == a.cardIdx) return j.placeCardOnNonEmptyFoundation(a, e), !0;
            x.playInvalid()
        } else null != e && a.cardIdx != j.CARD_IDX_A ? x.playInvalid() : null == e && x.playInvalid();
        return !1
    };
    j.placeCardOnNonEmptyFoundation = function(a, b) {
        a.myState == k.STATE_WASTE && (v.currentScore += 10, x.play("SOUNDS/cardtofoundation"));
        a.myState == k.STATE_TABLEU && (v.currentScore += 10, x.play("SOUNDS/cardtofoundation"));
        a.myState = k.STATE_FOUNDATION;
        a.foundationIdx = b.foundationIdx;
        a.foundationPosition = b.foundationPosition + 1;
        a.selectedFlag = !1;
        a.doubleclickInProgress = !1;
        u.generateBoardSnapshot()
    };
    j.tryToPlaceCardOnEmptyFoundation = function(a, b) {
        return a.cardIdx == j.CARD_IDX_A ? (a.myState == k.STATE_WASTE && (v.currentScore += 10, x.play("SOUNDS/cardtofoundation")), a.myState == k.STATE_TABLEU && (v.currentScore += 10, x.play("SOUNDS/cardtofoundation")), a.myState = k.STATE_FOUNDATION, a.foundationIdx = b, a.foundationPosition = 0, a.selectedFlag = !1, a.doubleclickInProgress = !1, u.generateBoardSnapshot(), !0) : !1
    };
    j.cardExistsOnFoundation = function(a) {
        for (var b = k.cardArray, c = b.length; 0 < c--;)
            if (b[c].myState == k.STATE_FOUNDATION && b[c].foundationIdx == a) return !0;
        return !1
    };
    j.doubleClicked = function(a, b) {
        a.doubleclickInProgress = !0;
        if (!1 == a.doubleclickInProgress) return !0;
        j.droppedOnFoundation(a, 0);
        if (!1 == a.doubleclickInProgress) return !0;
        j.droppedOnFoundation(a, 1);
        if (!1 == a.doubleclickInProgress) return !0;
        j.droppedOnFoundation(a, 2);
        if (!1 == a.doubleclickInProgress) return !0;
        j.droppedOnFoundation(a,
            3);
        if (!1 == a.doubleclickInProgress) return !0;
        if (b) return !1;
        var c = new ab(a.cardImgPosition.x - 0.5 * a.cardImgFront.getNaturalWidth(), a.cardImgPosition.y - 0.5 * a.cardImgFront.getNaturalHeight()),
            f = [0, 1, 2, 3, 4, 5, 6];
        c.x < a.cardImgFront.x._value && (f = [6, 5, 4, 3, 2, 1, 0]);
        j.tryToAutoclickToTableu(a, f[0]);
        if (!1 == a.doubleclickInProgress) return !0;
        j.tryToAutoclickToTableu(a, f[1]);
        if (!1 == a.doubleclickInProgress) return !0;
        j.tryToAutoclickToTableu(a, f[2]);
        if (!1 == a.doubleclickInProgress) return !0;
        j.tryToAutoclickToTableu(a, f[3]);
        if (!1 == a.doubleclickInProgress) return !0;
        j.tryToAutoclickToTableu(a, f[4]);
        if (!1 == a.doubleclickInProgress) return !0;
        j.tryToAutoclickToTableu(a, f[5]);
        if (!1 == a.doubleclickInProgress) return !0;
        j.tryToAutoclickToTableu(a, f[6]);
        if (!1 == a.doubleclickInProgress) return !0;
        a.setXY(c.x, c.y, !0);
        a.doubleclickInProgress = !1;
        x.playInvalid();
        return !1
    };
    j.tryToAutoclickToTableu = function(a, b) {
        if (!(a.myState == k.STATE_FOUNDATION || a.myState == k.STATE_TABLEU && a.tableouIdx == b)) {
            a.getoOffSetAndSelect();
            for (var c = null, f = k.cardArray,
                    d = f.length; 0 < d--;) {
                var e = f[d];
                if (e.myState == k.STATE_TABLEU && e.tableouIdx == b && O.isOnTableuTop(e)) {
                    c = e;
                    break
                }
            }
            d = [];
            for (e = f.length; 0 < e--;) {
                var g = f[e];
                g.selectedFlag && (d.push(g), g.oldPosition = new ab(g.cardImgPosition.x - 0.5 * g.cardImgFront.getNaturalWidth(), g.cardImgPosition.y - 0.5 * g.cardImgFront.getNaturalHeight()), null != c ? g.setXY(c.cardImgFront.x._value, c.cardImgFront.y._value, !0) : g.setXY(69 + 97 * b, 210, !0))
            }
            a.deselect();
            for (c = d.length; 0 < c--;) d[c].setXY(d[c].oldPosition.x, d[c].oldPosition.y, !0)
        }
    };
    j.turnoverPressed =
        function() {
            j.isEmptyStockPile() && j.doTheTurnover()
        };
    j.doTheTurnover = function() {
        x.play("SOUNDS/flipbackemptystockpile");
        var a;
        j.getWasteLength();
        do {
            a = j.getWasteLength();
            var b = j.getByWastePosition(a - 1);
            null != b && b.addToStock(j.stockLength());
            a--
        } while (0 < a);
        a = 0;
        b = null;
        do {
            for (var b = null, c = k.cardArray, f = c.length; 0 < f--;) {
                var d = c[f];
                d.stockIdx == a && d.myState == k.STATE_STOCK && (b = d, p.layerTiles.addChild(b.owner))
            }
            a++
        } while (null != b);
        u.generateBoardSnapshot()
    };
    j.stockLength = function() {
        for (var a = k.cardArray, b = a.length,
                c = 0; 0 < b--;) a[b].myState == k.STATE_STOCK && c++;
        return c
    };
    j.getByWastePosition = function(a) {
        for (var b = k.cardArray, c = b.length; 0 < c--;) {
            var f = b[c];
            if (f.wasteIdx == a && f.myState == k.STATE_WASTE) return f
        }
        return null
    };
    j.isEmptyStockPile = function() {
        for (var a = k.cardArray, b = a.length; 0 < b--;)
            if (a[b].myState == k.STATE_STOCK) return !1;
        return !0
    };
    j.getWasteLength = function() {
        for (var a = 0, b = k.cardArray, c = b.length; 0 < c--;) b[c].myState == k.STATE_WASTE && a++;
        return a
    };
    j.Undo = function() {
        u.Undo()
    };
    j.getByCardAndSuitIdx = function(a, b) {
        for (var c =
                k.cardArray, f = c.length; 0 < f--;) {
            var d = c[f];
            if (d.suitIdx == a && d.cardIdx == b) return d
        }
        return null
    };
    j.drawCardFromStock = function() {
        x.play("SOUNDS/dealcards");
        for (var a = k.cardArray, b = a.length, c = null, f = -1; 0 < b--;) {
            var d = a[b];
            d.myState == k.STATE_STOCK && d.stockIdx > f && (f = d.stockIdx, c = d)
        }
        null != c && c.moveFromStockToWaste();
        return c
    };
    j.draw3CardsFromStockToWaste = function() {
        j.drawCardFromStock();
        j.drawCardFromStock();
        j.drawCardFromStock();
        u.generateBoardSnapshot()
    };
    j.notOnFoundationTop = function(a) {
        for (var b = k.cardArray,
                c = b.length; 0 < c--;) {
            var f = b[c];
            if (f.myState == k.STATE_FOUNDATION && f.foundationIdx == a.foundationIdx && f.foundationPosition == a.foundationPosition + 1) return !0
        }
        return !1
    };
    var P = function() {};
    e["farmgame.GameConsts"] = P;
    P.__name__ = ["farmgame", "GameConsts"];
    var p = function(a) {
        p.ctx = this;
        null == a._compMap.Director_3 && a.add((new yc).setSize(P.WIDTH, P.HEIGHT));
        this._viewport = a
    };
    e["farmgame.GameContext"] = p;
    p.__name__ = ["farmgame", "GameContext"];
    p.prototype = {
        unwindToScene: function(a, b) {
            this._viewport._compMap.Director_3.unwindToScene(a,
                b)
        },
        __class__: p
    };
    var lb = function(a) {
        var b = this;
        z.call(this);
        this.owner = new M;
        this.owner.add(this);
        v.currentSeconds = 0;
        v.gameInProgress = !1;
        a.addChild(this.owner);
        this.menuBack = new da(p.pack.getTexture("menu_back"));
        var a = q.attachToNewEntity(this.menuBack, this.owner),
            c = new T(p.font_white_24, l.HOW_TO_PLAY_FULL[l.langIdx]);
        c.setLineSpacing(4);
        c.setAlign(W.Center);
        c.setXY(150, 325);
        c.setWrapWidth(620);
        c.setScale(0.8);
        q.attachToNewEntity(c, a);
        c = new Lb(a, 1);
        a = new Lb(a, 3);
        c.setXY(150, 430);
        a.setXY(400, 430);
        lb.myRef = this;
        a = new X(16777215, 300, 50);
        a.alpha.set__(1.0E-9);
        a.get_pointerDown().connect(R(this, this.onFooterClicked));
        a.setXY(250, 550);
        q.attachToNewEntity(a, this.owner);
        a.get_pointerIn().connect(function() {
            h._platform.getMouse().set_cursor(Z.Button)
        });
        a.get_pointerOut().connect(function() {
            h._platform.getMouse().set_cursor(Z.Default)
        });
        h._platform.getExternal().bind("onBodyClicked", function() {
            //b.justClickedSquidbyte && (h._platform.getWeb().openBrowser("http://gameboss.com"), b.justClickedSquidbyte = !1)
        });
        h._platform.getExternal().call("addBindListener")
    };
    e["farmgame.InitScreen"] = lb;
    lb.__name__ = ["farmgame", "InitScreen"];
    lb.__super__ = z;
    lb.prototype = r(z.prototype, {
        get_name: function() {
            return "InitScreen_15"
        },
        onFooterClicked: function() {
            var a = this;
            this.justClickedSquidbyte = !0;
            q.delayedCall(0.5, function() {
                a.justClickedSquidbyte = !1
            });
            h._platform.getExternal().call("openSquidByte")
        },
        remove: function() {
            lb.myRef = null;
            this.owner.dispose()
        },
        __class__: lb
    });
    var l = function() {};
    e["farmgame.Language"] = l;
    l.__name__ = ["farmgame",
        "Language"
    ];
    l.initLanguage = function() {
        var a = h._platform.getExternal().call("location.href.toString").split("lang=")[1];
        null == a && (a = "en");
        var a = a.toUpperCase(),
            b = o.parse(p.pack.getFile("language.xml").toString()),
            b = new Mb(b.firstElement());
        l.LanguageAbbrevations = [];
        l.DRAW_1_CARD = [];
        l.DRAW_3_CARDS = [];
        l.MENU = [];
        l.TIME = [];
        l.BEST = [];
        l.PLAY_SHORT = [];
        l.HOW_TO_PLAY_FULL = [];
        l.HOW_TO_PLAY = [];
        l.YOU_WIN = [];
        l.BONUS = [];
        l.SCORE = [];
        l.TOTAL = [];
        l.GAME_OVER = [];
        l.NEW_GAME = [];
        l.RESTART_GAME = [];
        l.SOUND_ON = [];
        l.SOUND_OFF = [];
        l.MORE_GAMES = [];
        l.ARE_YOU_SURE_NEW = [];
        l.ARE_YOU_SURE_RESTART = [];
        l.TIME_BONUS = [];
        l.YES = [];
        l.NO = [];
        l.RESTART = [];
        for (b = b.nodes.resolve("language").iterator(); null != b.head;) {
            var c;
            b.val = b.head[0];
            b.head = b.head[1];
            c = b.val;
            l.LanguageAbbrevations.push(c.att.resolve("name").toString());
            l.PLAY_SHORT.push(c.node.resolve("play").get_innerData().toString());
            l.HOW_TO_PLAY_FULL.push(c.node.resolve("HOW_TO_PLAY_FULL").get_innerData().toString());
            l.HOW_TO_PLAY.push(c.node.resolve("HOW_TO_PLAY").get_innerData().toString());
            l.YOU_WIN.push(c.node.resolve("YOU_WIN").get_innerData().toString());
            l.BONUS.push(c.node.resolve("BONUS").get_innerData().toString());
            l.SCORE.push(c.node.resolve("SCORE").get_innerData().toString());
            l.TOTAL.push(c.node.resolve("TOTAL").get_innerData().toString());
            l.GAME_OVER.push(c.node.resolve("GAME_OVER").get_innerData().toString());
            l.DRAW_1_CARD.push(c.node.resolve("draw_1_card").get_innerData().toString());
            l.DRAW_3_CARDS.push(c.node.resolve("draw_3_card").get_innerData().toString());
            l.MENU.push(c.node.resolve("menu").get_innerData().toString());
            l.TIME.push(c.node.resolve("time").get_innerData().toString());
            l.NEW_GAME.push(c.node.resolve("new_game").get_innerData().toString());
            l.RESTART_GAME.push(c.node.resolve("restart_game").get_innerData().toString());
            l.SOUND_ON.push(c.node.resolve("sound_on").get_innerData().toString());
            l.SOUND_OFF.push(c.node.resolve("sound_off").get_innerData().toString());
            l.MORE_GAMES.push(c.node.resolve("more_games").get_innerData().toString());
            l.ARE_YOU_SURE_NEW.push(c.node.resolve("are_you_sure_new").get_innerData().toString());
            l.ARE_YOU_SURE_RESTART.push(c.node.resolve("are_you_sure_restart").get_innerData().toString());
            l.TIME_BONUS.push(c.node.resolve("time_bonus").get_innerData().toString());
            l.BEST.push(c.node.resolve("best").get_innerData().toString());
            l.YES.push(c.node.resolve("YES").get_innerData().toString());
            l.NO.push(c.node.resolve("NO").get_innerData().toString());
            l.RESTART.push(c.node.resolve("RESTART").get_innerData().toString())
        }
        l.langIdx = l.LanguageAbbrevations.indexOf(a.toLowerCase());
        null
    };
    var i = function() {};
    e["farmgame.Main"] = i;
    i.__name__ = ["farmgame", "Main"];
    i.main = function() {
        h.init();
        C.SHOULD_HIDE_MOBILE_BROWSER = !1;
        i.layerBackground = new M;
        i.layerGame = new M;
        i.layerRotate = new M;
        i.layerPrompts = new M;
        i.layerPreBg = new M;
        h.root.addChild(i.layerPreBg);
        h.root.addChild(i.layerBackground);
        h.root.addChild(i.layerGame);
        h.root.addChild(i.layerPrompts);
        h.root.addChild(i.layerRotate);
        P.MOBILE_BROWSER = O.isMobileBrowser(h._platform.getExternal().call("getUserAgent")) ? !0 : !1;
        h._platform.getExternal().call("addClickListener");
        i.determineScreenSizeMode();
        i.borderN = new X(16711680, 0, 0);
        i.borderE = new X(16711680, 0, 0);
        i.borderS = new X(16711680, 0, 0);
        i.borderW = new X(16711680, 0, 0);
        i.imageN = null;
        i.imageE = null;
        i.imageS = null;
        i.imageW = null;
        i.borderN.set_visible(i.borderE.set_visible(i.borderS.set_visible(i.borderW.set_visible(!1))));
        i.onConfigLoaded(!1);
        h._platform.getStage().resize.connect(i.onResize, !0)
    };
    i.determineScreenSizeMode = function() {
        !1 == h._platform.getStage().fullscreen.get__() && 1 < h._platform.getExternal().call("eligibleForResize") &&
            P.MOBILE_BROWSER && (P.SMALL_DEVICE_MODE = !0, null)
    };
    i.addBackgroundSprite = function() {
        null != p.pack && (i.backgroundState2 ? (i.preBg = new X(13553614, h._platform.getStage().get_width(), h._platform.getStage().get_height()), q.attachToNewEntity(i.preBg, i.layerBackground), i.preBg.setXY(0, 0), i.backgroundSprite = new da(p.pack.getTexture("game_bg_hd")), i.bgSpriteEnt.add(i.backgroundSprite)) : (i.backgroundSprite = new da(p.pack.getTexture("game_bg_hd")), i.bgSpriteEnt = q.attachToNewEntity(i.backgroundSprite, i.layerBackground,
                !1), i.bgWhiteFill = new X(13553614, h._platform.getStage().get_width(), h._platform.getStage().get_height()), q.attachToNewEntity(i.bgWhiteFill, i.layerBackground)), i.backgroundSprite.centerAnchor(), i.backgroundSprite.scaleX.set__(h._platform.getStage().get_width() / i.backgroundSprite.getNaturalWidth()), i.backgroundSprite.scaleY.set__(h._platform.getStage().get_height() / i.backgroundSprite.getNaturalHeight()), i.backgroundSprite.setScale(Math.max(i.backgroundSprite.scaleX._value, i.backgroundSprite.scaleY._value)),
            i.backgroundSprite.setXY(h._platform.getStage().get_width() / 2, h._platform.getStage().get_height() / 2), i.backgroundSprite.set_visible(!1), i.bgWhiteFill.centerAnchor(), i.bgWhiteFill.scaleX.set__(h._platform.getStage().get_width() / i.bgWhiteFill.getNaturalWidth()), i.bgWhiteFill.scaleY.set__(h._platform.getStage().get_height() / i.bgWhiteFill.getNaturalHeight()), i.bgWhiteFill.setScale(Math.max(i.bgWhiteFill.scaleX._value, i.bgWhiteFill.scaleY._value)), i.bgWhiteFill.setXY(h._platform.getStage().get_width() /
                2, h._platform.getStage().get_height() / 2))
    };
    i.addRotateImg = function() {
        i.rotateImg = new da(p.pack.getTexture("TURN"));
        q.attachToNewEntity(i.rotateImg, i.layerRotate, !1);
        i.rotateImg.centerAnchor();
        null != h._platform.getStage() && (i.rotateImg.setXY(h._platform.getStage().get_width() / 2, h._platform.getStage().get_height() / 2), i.rotateImg.scaleX.set__(h._platform.getStage().get_width() / i.rotateImg.getNaturalWidth()), i.rotateImg.scaleY.set__(h._platform.getStage().get_height() / i.rotateImg.getNaturalHeight()),
            i.rotateImg.set_visible(!1), i.rotateImg.setScale(Math.max(i.rotateImg.scaleX._value, i.rotateImg.scaleY._value)))
    };
    i.onResize = function() {
        i.resizeCalled = !0;
        i.layoutBorders()
    };
    i.onConfigLoaded = function() {
        var a = na.fromAssets("bootstrap"),
            a = h._platform.loadAssetPack(a);
        i.viewport = (new M).add(new I);
        i.mainSprite = new I;
        (new M).add(i.mainSprite);
        i.layerGame.addChild(i.mainSprite.owner);
        i.mainSprite.owner.addChild(i.viewport);
        i.layoutBorders();
        a.get(i.onBootstrapFinish)
    };
    i.resizeHtml = function() {
        null
    };
    i.layoutBorders =
        function() {
            i.determineScreenSizeMode();
            var a = h._platform.getStage().get_width(),
                b = h._platform.getStage().get_height();
            i.theWidth = h._platform.getExternal().call("getWidth");
            i.theHeight = h._platform.getExternal().call("getHeight");
            if (b > a) {
                var c = b,
                    b = a,
                    a = c;
                i.mainSprite.setRotation(90).setXY(b, 0);
                i.isRotated = !0
            } else i.mainSprite.setRotation(0).setXY(0, 0), i.isRotated = !1, b = i.theHeight * a / i.theWidth;
            var f = a / P.WIDTH,
                d = b / P.HEIGHT,
                c = Math.min(f, d);
            P.scaleX = f;
            P.scaleY = d;
            P.scale = c;
            f = i.viewport._compMap.Sprite_0;
            f.x.set__(0.5 * a - 0.5 * c * P.WIDTH);
            f.y.set__(0.5 * b - 0.5 * c * P.HEIGHT);
            f.setScale(c);
            p.viewPortSprite = f;
            i.borderN.setXY(0, 0);
            i.borderN.width.set__(a);
            i.borderN.height.set__(f.y._value);
            i.borderN.disablePointer();
            i.borderE.setXY(a - f.x._value - 1, f.y._value);
            i.borderE.width.set__(1 + f.x._value);
            i.borderE.height.set__(b - 2 * f.y._value);
            i.borderE.disablePointer();
            i.borderS.setXY(0, b - f.y._value);
            i.borderS.width.set__(a);
            i.borderS.height.set__(f.y._value);
            i.borderS.disablePointer();
            i.borderW.setXY(0, f.y._value);
            i.borderW.width.set__(1 +
                f.x._value);
            i.borderW.height.set__(b - 2 * f.y._value);
            i.borderW.disablePointer();
            null != i.rotateImg && (i.theHeight > i.theWidth ? (i.rotateImg.set_visible(!0), i.rotateImg.centerAnchor(), i.rotateImg.setXY(h._platform.getStage().get_width() / 2, h._platform.getStage().get_height() / 2), i.rotateImg.scaleX.set__(h._platform.getStage().get_width() / i.rotateImg.getNaturalWidth()), i.rotateImg.scaleY.set__(h._platform.getStage().get_height() / i.rotateImg.getNaturalHeight()), i.rotateImg.setScale(Math.max(i.rotateImg.scaleX._value,
                i.rotateImg.scaleY._value))) : i.rotateImg.set_visible(!1));
            h._platform.getExternal().call("hideIosBar");
            i.addBackgroundSprite();
            q.delayedCall(1.5, i.checkIfNeedsToBeResized)
        };
    i.checkIfNeedsToBeResized = function() {
        h._platform.getStage().orientation.get__() == mb.Landscape && (i.theWidth != h._platform.getStage().get_width() || i.theHeight != h._platform.getStage().get_height()) && h._platform.getStage().requestResize(i.theWidth, i.theHeight)
    };
    i.onBootstrapFinish = function(a) {
        var b = new p(i.viewport);
        p.pack = a;
        p.preloaderPack =
            a;
        i.addBackgroundSprite();
        i.addRotateImg();
        h._platform.getStage().resize.connect(i.layoutBorders);
        q.delayedCall(1, i.layoutBorders);
        b.unwindToScene(E.create(b))
    };
    var A = function() {};
    e["farmgame.MainScene"] = A;
    A.__name__ = ["farmgame", "MainScene"];
    A.create = function() {
        h.root.add(new zc(1));
        A.scene = new M;
        A.scene.add(new aa);
        p.mainScene = A.scene;
        P.SMALL_DEVICE_MODE ? q.delayedCall(1.0E-4, A.initScene) : A.initScene();
        v.startTimer();
        return A.scene
    };
    A.initScene = function() {
        A.backgroundSprite = new da(p.pack.getTexture("game_bg_hd"));
        q.attachToNewEntity(A.backgroundSprite, A.scene);
        A.backgroundSprite.setXY(0, 0);
        A.backgroundSprite.set_visible(!1);
        q.delayedCall(0.2, function() {
            A.backgroundSprite.set_visible(!0)
        });
        A.turnOverCard = new X(16777215, 90, 140);
        q.attachToNewEntity(A.turnOverCard, A.scene);
        A.turnOverCard.setXY(60, 50);
        A.turnOverCard.get_pointerDown().connect(A.onTurnoverPressed);
        A.turnOverCard.setAlpha(0.001);
        i.backgroundState2 = !0;
        i.backgroundSprite = null;
        i.addBackgroundSprite();
        A.createLayers(A.scene);
        h._platform.getKeyboard().down.connect(A.onKeyDown);
        h._platform.getKeyboard().up.connect(A.onKeyUp);
        A.addInitScreen();
        new v
    };
    A.addInitScreen = function() {
        new lb(A.scene)
    };
    A.onTurnoverPressed = function() {
        j.turnoverPressed()
    };
    A.onKeyUp = function(a) {
        a.key == d.Control && (A.controlPressed = !1)
    };
    A.onKeyDown = function(a) {
        A.controlPressed && a.key == d.Z && j.Undo();
        a.key == d.Control && (A.controlPressed = !0);
        a.key == d.D && (1 == p.drawCardNum ? j.drawCardFromStock() : j.draw3CardsFromStockToWaste())
    };
    A.createLayers = function(a) {
        var b = new M,
            c = new M,
            f = new M,
            d = new M,
            e = new M;
        p.layerBG =
            b;
        p.layerTiles = c;
        p.layerUI = f;
        P.layerRotate = d;
        p.layerUIBelow = e;
        a.addChild(b);
        a.addChild(e);
        a.addChild(c);
        a.addChild(f);
        a.addChild(d);
        a = new X(16777215, 1, 1);
        p.layerTiles.add(a)
    };
    A.reset = function() {};
    A.newGame = function() {
        u.removeAllCardsFromBoard();
        v.myRef.owner.dispose();
        A.addInitScreen();
        new v
    };
    A.startGame = function() {
        lb.myRef.remove();
        u.InitializeBoard()
    };
    A.restartGame = function() {
        v.myRef.owner.dispose();
        new v;
        u.RestartBoard()
    };
    var v = function() {
        this.counter = 0;
        this.highScoreReached = !1;
        this.maxScore = this.maxScore3 =
            0;
        var a = this;
        z.call(this);
        v.myRef = this;
        this.owner = new M;
        p.layerUI.addChild(this.owner);
        this.owner.add(this);
        v.currentScore = 0;
        v.gameStartedStamp = 0;
        v.currentSeconds = 0;
        var b = new da(p.pack.getTexture("BG_BAR"));
        q.attachToNewEntity(b, this.owner);
        new Ac(p.layerUIBelow);
        new Bc(p.layerUIBelow);
        new Cc(this.owner);
        this.scoreTxt = new T(p.font_white_semibold_24, "Score: 0");
        this.scoreTxt.setXY(500, 10);
        q.attachToNewEntity(this.scoreTxt, this.owner);
        this.scoreTxt.setScale(0.8);
        this.timeTxt = new T(p.font_white_semibold_24,
            "Time: ");
        this.timeTxt.setXY(140, 10);
        q.attachToNewEntity(this.timeTxt, this.owner);
        this.timeTxt.setScale(0.8);
        this.bestScoreTxt = new T(p.font_white_semibold_24, "Best: ");
        this.bestScoreTxt.setXY(660, 10);
        q.attachToNewEntity(this.bestScoreTxt, this.owner);
        this.bestScoreTxt.setScale(0.8);
        b = new X(16777215, 300, 50);
        b.alpha.set__(1.0E-9);
        b.setXY(250, 560);
        b.get_pointerDown().connect(R(this, this.onFooterClicked));
        b.get_pointerIn().connect(function() {
            h._platform.getMouse().set_cursor(Z.Button)
        });
        b.get_pointerOut().connect(function() {
            h._platform.getMouse().set_cursor(Z.Default)
        });
        q.attachToNewEntity(b, this.owner);
        h._platform.getExternal().bind("onBodyClicked", function() {
            //a.justClickedSquidbyte && (h._platform.getWeb().openBrowser("http://gameboss2.com"), a.justClickedSquidbyte = !1)
        });
        h._platform.getExternal().call("addBindListener");
        this.manageHighScore()
    };
    e["farmgame.MainUI"] = v;
    v.__name__ = ["farmgame", "MainUI"];
    v.startTimer = function() {
        ca.delay(v.countTime, 1E3)
    };
    v.countTime = function() {
        null == i.layerPrompts.firstChild && v.gameInProgress && v.currentSeconds++;
        ca.delay(v.countTime, 1E3)
    };
    v.restartTimer = function() {
        v.gameInProgress = !0;
        v.currentSeconds = 0
    };
    v.__super__ = z;
    v.prototype = r(z.prototype, {
        get_name: function() {
            return "MainUI_14"
        },
        onFooterClicked: function() {
            var a = this;
            this.justClickedSquidbyte = !0;
            q.delayedCall(0.5, function() {
                a.justClickedSquidbyte = !1
            });
            h._platform.getExternal().call("openSquidByte")
        },
        onUpdate: function(a) {
            this.scoreTxt.set_text(l.SCORE[l.langIdx] + v.currentScore);
            this.timeTxt.set_text(l.TIME[l.langIdx] + this.formatTime(Math.floor(v.currentSeconds)));
            z.prototype.onUpdate.call(this,
                a);
            0 == this.counter++ % 8 && (u.tryToAutofinishGame(), u.checkIfGameOver());
            this.manageHighScore()
        },
        formatTime: function(a) {
            return this.convertToHHMMSS(a)
        },
        manageHighScore: function() {
            if (1 == p.drawCardNum) {
                h._platform.getStorage().get("maxScore2", 0) > this.maxScore && (this.maxScore = h._platform.getStorage().get("maxScore2", 0));
                var a = v.currentScore;
                a > this.maxScore && !0 != this.highScoreReached ? (this.highScoreReached = !0, this.maxScore = a, h._platform.getStorage().set("maxScore2", this.maxScore)) : a > this.maxScore && h._platform.getStorage().set("maxScore2",
                    a);
                this.bestScoreTxt.set_text(l.BEST[l.langIdx] + this.maxScore)
            } else h._platform.getStorage().get("maxScore2345", 0) > this.maxScore3 && (this.maxScore3 = h._platform.getStorage().get("maxScore2345", 0)), a = v.currentScore, a > this.maxScore3 && !0 != this.highScoreReached ? (this.highScoreReached = !0, this.maxScore = a, h._platform.getStorage().set("maxScore2345", this.maxScore3)) : a > this.maxScore3 && h._platform.getStorage().set("maxScore2345", a), this.bestScoreTxt.set_text(l.BEST[l.langIdx] + this.maxScore3)
        },
        convertToHHMMSS: function(a) {
            var b =
                a % 60,
                c = Math.floor(a % 3600 / 60),
                a = this.doubleDigitFormat(Math.floor(a / 3600)) + ":",
                c = this.doubleDigitFormat(c) + ":",
                b = this.doubleDigitFormat(b);
            return a + c + b
        },
        doubleDigitFormat: function(a) {
            return 10 > a ? "0" + a : "" + a
        },
        gameOverStarted: function() {
            new za(v.currentScore, v.currentSeconds)
        },
        __class__: v
    });
    var E = function() {};
    e["farmgame.PreloaderScene"] = E;
    E.__name__ = ["farmgame", "PreloaderScene"];
    E.create = function(a) {
        l.initLanguage();
        E.deltaY = 150;
        E.ctx = a;
        E.scene = new M;
        a = na.fromAssets("hd_assets");
        a = h._platform.loadAssetPack(a);
        E.imgSpr = new da(p.pack.getTexture("squidbyte"));
        //q.attachToNewEntity(E.imgSpr, E.scene);
        E.imgSpr.setXY(P.WIDTH / 2, P.HEIGHT / 2);
        E.imgSpr.centerAnchor();
        E.imgSpr.setScale(1);
        E.imgSpr.disablePointer();
        E.logo = new da(p.pack.getTexture("m_poollogo"));
        E.logo.setXY(P.WIDTH / 2, P.HEIGHT / 2 - 50 - E.deltaY);
        E.logo.centerAnchor();
        E.logo.setScale(1);
        E.logo.disablePointer();
        E.logo.set_visible(!1);
        q.delayedCall(0, E.tryToStartNextScene);
        a.get(function(a) {
            p.pack = a;
            E.allowNextScreen = !0;
            x.Init();
            p.font_white_24 = new Aa(p.pack,
                "font_white_24/font");
            p.font_white_semibold_24 = new Aa(p.pack, "font_white_semibold_24/font");
            p.font_black_32 = new Aa(p.pack, "font_black_32/font");
            p.font_white_26_bold = new Aa(p.pack, "font_white_26_bold/font");
            p.font_white_52_bold = new Aa(p.pack, "font_white_52_bold/font");
            q.delayedCall(0.5, function() {
                null
            });
            q.delayedCall(2, function() {
                null
            });
            q.delayedCall(4, function() {
                null
            })
        });
        return E.scene
    };
    E.tryToStartNextScene = function() {
        E.allowNextScreen ? q.delayedCall(0, E.startNextScene) : q.delayedCall(0, E.tryToStartNextScene)
    };
    E.startNextScene = function() {
        E.imgSpr.alpha.animateTo(0, 0.25);
        i.bgWhiteFill.alpha.animateTo(0, 0.25);
        q.delayedCall(0.25, E.showPlayBut)
    };
    E.showPlayBut = function() {
        E.actuallyStartNextScene()
    };
    E.actuallyStartNextScene = function() {
        E.scene.disposeChildren();
        E.scene.dispose();
        E.ctx.unwindToScene(A.create(E.ctx), new Dc(0.01))
    };
    var aa = function() {
        this.counter = 0;
        z.call(this);
        aa.imageFiller = new X(0, h._platform.getStage().get_width(), h._platform.getStage().get_height());
        q.attachToNewEntity(aa.imageFiller, i.layerGame,
            !0);
        aa.imageFiller.setAlpha(0.75);
        aa.imageFiller.set_visible(!1)
    };
    e["farmgame.SceneManager"] = aa;
    aa.__name__ = ["farmgame", "SceneManager"];
    aa.__super__ = z;
    aa.prototype = r(z.prototype, {
        get_name: function() {
            return "SceneManager_10"
        },
        onUpdate: function(a) {
            null != i.layerPrompts.firstChild ? aa.imageFiller.set_visible(!0) : aa.imageFiller.set_visible(!1);
            if (0 == this.counter++ % 2 && (aa.imageFiller.getNaturalWidth() != h._platform.getStage().get_width() || aa.imageFiller.getNaturalHeight() != h._platform.getStage().get_height())) aa.imageFiller.dispose(),
                aa.imageFiller = new X(0, h._platform.getStage().get_width(), h._platform.getStage().get_height()), aa.imageFiller.set_visible(!1), q.attachToNewEntity(aa.imageFiller, i.layerGame, !0), aa.imageFiller.setAlpha(0.75);
            0 == this.counter % 80 && (this.theWidth = h._platform.getExternal().call("getWidth"), this.theHeight = h._platform.getExternal().call("getHeight"), (this.theWidth != h._platform.getStage().get_width() || this.theHeight != h._platform.getStage().get_height()) && h._platform.getStage().requestResize(this.theWidth,
                this.theHeight), this.theWidth > this.theHeight ? i.rotateImg.set_visible(!1) : (i.rotateImg.set_visible(!0), i.rotateImg.centerAnchor(), i.rotateImg.setXY(0.5 * this.theWidth, 0.5 * this.theHeight), i.rotateImg.scaleX.set__(this.theWidth / i.rotateImg.getNaturalWidth()), i.rotateImg.scaleY.set__(this.theHeight / i.rotateImg.getNaturalHeight())));
            z.prototype.onUpdate.call(this, a)
        },
        __class__: aa
    });
    var Ec = function() {
        z.call(this);
        this.owner = (new M).add(this);
        h.root.addChild(this.owner)
    };
    e["farmgame.SoundIndexHolder"] = Ec;
    Ec.__name__ = ["farmgame", "SoundIndexHolder"];
    Ec.__super__ = z;
    Ec.prototype = r(z.prototype, {
        get_name: function() {
            return "SoundIndexHolder_11"
        },
        onUpdate: function(a) {
            var b = x.allPlaybacks[this.soundIdx][this.counterIdx];
            !1 == b.get_paused() && 0 == this.soundIdx && b.get_position();
            z.prototype.onUpdate.call(this, a)
        },
        playSoundStarted: function(a) {
            this.playSoundTween = q.delayedCall(a + 0.1, R(this, this.playSoundEnded))
        },
        playSoundEnded: function() {
            null != this.playSoundTween && null != this.playSoundTween.owner && this.playSoundTween.owner.dispose();
            var a = x.allPlaybacks[this.soundIdx][this.counterIdx],
                a = p.pack.getSound(x.allSoundArrayNames[this.soundIdx]).play();
            a.set_paused(!0);
            a.volume.set__(0);
            x.allPlaybacks[this.soundIdx][this.counterIdx] = a;
            null
        },
        __class__: Ec
    });
    var x = function() {};
    e["farmgame.SoundPlayer2"] = x;
    x.__name__ = ["farmgame", "SoundPlayer2"];
    x.Init = function() {
        if (H.get_supported()) P.WebAudioSupported = !0;
        else {
            x.allPlaybacks = [];
            x.playbackIndexes = [];
            for (var a = x.allSoundArrayNames.length; 0 < a--;) {
                x.playbackIndexes[a] = 0;
                x.allPlaybacks[a] = [];
                for (var b = x.MAX_CACHED[a]; 0 < b--;) {
                    var c = p.pack.getSound(x.allSoundArrayNames[a]).play();
                    c.set_paused(!0);
                    c.volume.set__(0);
                    x.allPlaybacks[a][b] = c;
                    null
                }
            }
            null
        }
    };
    x.play = function(a, b) {
        null == b && (b = 1);
        H.ctx && H.ctx.resume();
        if (!1 != Xa.soundFlag)
            if (H.get_supported()) p.pack.getSound(a).play(b);
            else if ("SOUNDS/cardtofoundation" == a && (a = "SOUNDS/dealcards1"), "SOUNDS/invalid" != a) {
            var c = x.allSoundArrayNames.lastIndexOf(a),
                f = x.allPlaybacks[c],
                d = x.playbackIndexes[c] % x.MAX_CACHED[c];
            x.playbackIndexes[c]++;
            f[d].set_paused(!1);
            f[d].volume.set__(b);
            for (var e = f.length; 0 < e--;) d != e && (f[e].volume.set__(0), f[e].set_paused(!0));
            e = new Ec;
            e.counterIdx = d;
            e.soundIdx = c;
            e.playSoundStarted(f[d].get_sound().get_duration())
        }
    };
    x.playInvalid = function() {
        x.canPlayInvalid && (x.play("SOUNDS/invalid"), ca.delay(function() {
            x.canPlayInvalid = !0
        }, 50), x.canPlayInvalid = !1)
    };
    x.playDealCards = function() {
        x.canPlayDeal && (x.play("SOUNDS/dealcards"), ca.delay(function() {
            x.canPlayDeal = !0
        }, 5), x.canPlayDeal = !1)
    };
    var O = function() {};
    e["farmgame.Util"] = O;
    O.__name__ = ["farmgame", "Util"];
    O.isMobileBrowser = function(a) {
        return 0 <= a.lastIndexOf("Mobile") || 0 <= a.lastIndexOf("Android") ? !0 : !1
    };
    O.returnNormalizedMouseCoords = function() {
        h._platform.getStage().get_width();
        var a = (h._platform.getPointer().get_x() - i.borderE.width._value) / P.scale,
            b = 600 * (h._platform.getPointer().get_y() / h._platform.getStage().get_height());
        return new ab(a, b)
    };
    O.overlapping = function(a, b) {
        return a == b ? !1 : a.x._value < b.x._value + b.getNaturalWidth() && a.x._value + a.getNaturalWidth() > b.x._value && a.y._value <
            b.y._value + b.getNaturalHeight() && a.getNaturalHeight() + a.y._value > b.y._value ? !0 : !1
    };
    O.checkIfCardPlacedAtValidSpot = function(a) {
        var b = !1;
        if (j.overlapsEmptyTableu(a.cardImgFront) && a.cardIdx == j.CARD_IDX_K) return b = !1, a.myState == k.STATE_TABLEU && (b = !0), j.droppedOnEmptyTableu(a), a.doubleclickInProgress = !1, b;
        if (j.overlapsFoundation(a.cardImgFront)) return j.droppedOnFoundation(a), !0;
        for (var c = k.cardArray, f = c.length; 0 < f--;)
            if (O.overlapping(c[f].cardImgFront, a.cardImgFront) && c[f].myState == k.STATE_TABLEU && O.droppedOnTableu(a,
                    c[f])) {
                a.doubleclickInProgress = !1;
                b = !0;
                break
            } return b
    };
    O.droppedOnTableu = function(a, b) {
        return O.isOnTableuTop(b) && b.turned ? O.tryToPlaceOnTableu(a, b) : !1
    };
    O.tryToPlaceOnTableu = function(a, b) {
        if (b.cardIdx != j.CARD_IDX_A && (a.cardIdx == j.CARD_IDX_A && b.cardIdx == j.CARD_IDX_02 || a.cardIdx + 1 == b.cardIdx))
            if (b.suitIdx == j.SUIT_CLUBS || b.suitIdx == j.SUIT_SPADES) {
                if (a.suitIdx == j.SUIT_HEARTS || a.suitIdx == j.SUIT_DIAMONDS) return O.placeOnTableu(a, b)
            } else if (a.suitIdx == j.SUIT_CLUBS || a.suitIdx == j.SUIT_SPADES) return O.placeOnTableu(a,
            b);
        return !1
    };
    O.placeOnTableu = function(a, b) {
        O.uncoverTableu(a);
        a.myState == k.STATE_FOUNDATION && (v.currentScore -= 15);
        a.myState == k.STATE_WASTE && (v.currentScore += 5);
        x.play("SOUNDS/valid");
        a.myState = k.STATE_TABLEU;
        a.tableouIdx = b.tableouIdx;
        a.tableouPosition = b.tableouPosition + 1;
        a.selectedFlag = !1;
        u.generateBoardSnapshot();
        u.lastTableuoSuccessPlacementIdx = a.tableouIdx;
        return !0
    };
    O.uncoverTableu = function(a) {
        if (!(a.myState != k.STATE_TABLEU && a.myState != k.STATE_FOUNDATION))
            for (var b = k.cardArray, c = b.length; 0 < c--;) b[c].myState ==
                k.STATE_TABLEU && b[c].tableouIdx == a.tableouIdx && b[c].tableouPosition + 1 == a.tableouPosition && b[c].flipCard() && (v.currentScore += 5)
    };
    O.isOnTableuTop = function(a) {
        for (var b = a.tableouIdx, c = k.cardArray, f = c.length; 0 < f--;) {
            var d = c[f];
            if (d.myState == k.STATE_TABLEU && d.tableouIdx == b && d.tableouPosition > a.tableouPosition) return !1
        }
        return !0
    };
    var D = function(a, b, c, f, d) {
        null == d && (d = !0);
        null == f && (f = "button_prompt_over");
        null == c && (c = "button_prompt");
        V.call(this, a, c, f);
        d ? (this.textSpr = new T(p.font_white_52_bold, "" + b), this.textSpr.setScale(0.5)) :
            this.textSpr = new T(p.font_white_semibold_24, "" + b);
        q.attachToNewEntity(this.textSpr, this.owner);
        this.textSpr.setAlign(W.Center);
        this.textSpr.setXY(0.5 * this.imgNormal.getNaturalWidth(), 0.25 * this.imgNormal.getNaturalHeight());
        this.textSpr.disablePointer()
    };
    e["farmgame.buttons.ButtonWithOverAndText"] = D;
    D.__name__ = ["farmgame", "buttons", "ButtonWithOverAndText"];
    D.__super__ = V;
    D.prototype = r(V.prototype, {
        setXY: function(a, b) {
            this.textSpr.setXY(a + 0.5 * this.imgNormal.getNaturalWidth(), b + 0.25 * this.imgNormal.getNaturalHeight());
            V.prototype.setXY.call(this, a, b)
        },
        __class__: D
    });
    var Lb = function(a, b) {
        null == b && (b = 1);
        1 == b ? D.call(this, a, l.DRAW_1_CARD[l.langIdx], "menu_but_under", "menu_but_over", !0) : D.call(this, a, l.DRAW_3_CARDS[l.langIdx], "menu_but_under", "menu_but_over", !0);
        this.cardNum = b
    };
    e["farmgame.buttons.DrawCardButton"] = Lb;
    Lb.__name__ = ["farmgame", "buttons", "DrawCardButton"];
    Lb.__super__ = D;
    Lb.prototype = r(D.prototype, {
        onClick: function(a) {
            1 == this.cardNum ? p.drawCardNum = this.cardNum : 3 == this.cardNum && (p.drawCardNum = this.cardNum);
            //h._platform.getStage().requestFullscreen();
            A.startGame(this.cardNum);
            x.play("SOUNDS/click");
            h._platform.getStage().requestResize(h._platform.getExternal().call("getWidth"), h._platform.getExternal().call("getHeight"));
            q.delayedCall(0.5, i.resizeHtml);
            q.delayedCall(0.55, i.onResize);
            D.prototype.onClick.call(this, a)
        },
        setXY: function(a, b) {
            D.prototype.setXY.call(this, a, b);
            this.textSpr.setXY(a + 0.5 * this.imgNormal.getNaturalWidth(), b + 0.25 * this.imgNormal.getNaturalHeight())
        },
        __class__: Lb
    });
    var Cc = function(a) {
        V.call(this,
            a, "ui/game_menu_icon", "ui/game_menu_icon");
        this.setXY(15, 15);
        a = new T(p.font_white_semibold_24, l.MENU[l.langIdx]);
        q.attachToNewEntity(a, this.owner);
        a.setXY(40, 10);
        a.setScale(0.8);
        a = new X(16777215, 96, 30);
        a.get_pointerDown().connect(R(this, this.onClick));
        a.get_pointerIn().connect(R(this, this.onMouseOver));
        a.get_pointerOut().connect(R(this, this.onMouseOut));
        q.attachToNewEntity(a, this.owner);
        a.setXY(10, 10);
        a.alpha.set__(0.001)
    };
    e["farmgame.buttons.MenuButton"] = Cc;
    Cc.__name__ = ["farmgame", "buttons", "MenuButton"];
    Cc.__super__ = V;
    Cc.prototype = r(V.prototype, {
        onClick: function(a) {
            u.autoCompleteInProgress || (new bb, V.prototype.onClick.call(this, a))
        },
        __class__: Cc
    });
    var Fc = function(a) {
        D.call(this, a, l.MORE_GAMES[l.langIdx], "promt_button", "promt_button_over")
    };
    e["farmgame.buttons.MoreGamesButton"] = Fc;
    Fc.__name__ = ["farmgame", "buttons", "MoreGamesButton"];
    Fc.__super__ = D;
    Fc.prototype = r(D.prototype, {
        onClick: function(a) {
            v.myRef.onFooterClicked(null);
            D.prototype.onClick.call(this, a)
        },
        __class__: Fc
    });
    var Nb = function(a, b) {
        null ==
            b && (b = !1);
        D.call(this, a, l.NEW_GAME[l.langIdx], "promt_button", "promt_button_over");
        this.newGameDirectly = b;
        this.setXY(10, 590 - this.imgNormal.getNaturalHeight())
    };
    e["farmgame.buttons.NewGameButton"] = Nb;
    Nb.__name__ = ["farmgame", "buttons", "NewGameButton"];
    Nb.__super__ = D;
    Nb.prototype = r(D.prototype, {
        onClick: function(a) {
            this.newGameDirectly ? (null != za.myRef && za.myRef.owner.dispose(), A.newGame()) : (new Ob, null != bb.myRef && bb.myRef.owner.dispose());
            D.prototype.onClick.call(this, a)
        },
        __class__: Nb
    });
    var Ac = function(a) {
        V.call(this,
            a, "ui/game_newgame", "ui/game_newgame_over");
        this.setXY(10, 590 - this.imgNormal.getNaturalHeight())
    };
    e["farmgame.buttons.NewGameButtonUI"] = Ac;
    Ac.__name__ = ["farmgame", "buttons", "NewGameButtonUI"];
    Ac.__super__ = V;
    Ac.prototype = r(V.prototype, {
        onClick: function(a) {
            u.autoCompleteInProgress || (new Ob, V.prototype.onClick.call(this, a))
        },
        __class__: Ac
    });
    var Pb = function(a, b) {
        D.call(this, a, l.NO[l.langIdx], "promt_button", "promt_button_over");
        this.noFunction = b
    };
    e["farmgame.buttons.NoButton"] = Pb;
    Pb.__name__ = ["farmgame",
        "buttons", "NoButton"
    ];
    Pb.__super__ = D;
    Pb.prototype = r(D.prototype, {
        onClick: function(a) {
            this.noFunction();
            D.prototype.onClick.call(this, a)
        },
        setXY: function(a, b) {
            D.prototype.setXY.call(this, a, b);
            this.textSpr.setXY(a, b - 0.23 * this.textSpr.getNaturalHeight())
        },
        __class__: Pb
    });
    var Qb = function(a, b) {
        null == b && (b = !1);
        D.call(this, a, l.RESTART_GAME[l.langIdx], "promt_button", "promt_button_over");
        this.restartDirectly = b;
        this.setXY(10, 590 - this.imgNormal.getNaturalHeight())
    };
    e["farmgame.buttons.RestartButton"] = Qb;
    Qb.__name__ = ["farmgame", "buttons", "RestartButton"];
    Qb.__super__ = D;
    Qb.prototype = r(D.prototype, {
        onClick: function(a) {
            this.restartDirectly ? (null != za.myRef && za.myRef.owner.dispose(), A.restartGame()) : new Gc;
            D.prototype.onClick.call(this, a)
        },
        __class__: Qb
    });
    var Xa = function(a) {
        z.call(this);
        this.owner = (new M).add(this);
        a.addChild(this.owner);
        this.soundButtonOn = new Hc(a);
        this.soundButtonOff = new Ic(a);
        this.soundButtonOn.parentbutton = this;
        this.soundButtonOff.parentbutton = this
    };
    e["farmgame.buttons.SoundButton"] = Xa;
    Xa.__name__ = ["farmgame", "buttons", "SoundButton"];
    Xa.__super__ = z;
    Xa.prototype = r(z.prototype, {
        get_name: function() {
            return "SoundButton_12"
        },
        onUpdate: function(a) {
            Xa.soundFlag ? (this.soundButtonOn.setVisible(), this.soundButtonOff.setInvisible()) : (this.soundButtonOn.setInvisible(), this.soundButtonOff.setVisible());
            z.prototype.onUpdate.call(this, a)
        },
        setXY: function(a, b) {
            this.soundButtonOn.setXY(a, b);
            this.soundButtonOff.setXY(a, b)
        },
        __class__: Xa
    });
    var Ic = function(a) {
        D.call(this, a, l.SOUND_OFF[l.langIdx], "promt_button", "promt_button_over");
        this.imgNormal.centerAnchor();
        this.imgover.centerAnchor()
    };
    e["farmgame.buttons.SoundButtonOff"] = Ic;
    Ic.__name__ = ["farmgame", "buttons", "SoundButtonOff"];
    Ic.__super__ = D;
    Ic.prototype = r(D.prototype, {
        onClick: function(a) {
            Xa.soundFlag = !0;
            this.parentbutton.soundButtonOn.imgNormal.setScale(this.imgNormal.scaleX._value);
            D.prototype.onClick.call(this, a)
        },
        setXY: function(a, b) {
            this.textSpr.setXY(a, b - 0.25 * this.imgNormal.getNaturalHeight());
            this.imgNormal.setXY(a, b);
            this.imgover.setXY(a, b)
        },
        __class__: Ic
    });
    var Hc =
        function(a) {
            D.call(this, a, l.SOUND_ON[l.langIdx], "promt_button", "promt_button_over");
            this.imgNormal.centerAnchor();
            this.imgover.centerAnchor()
        };
    e["farmgame.buttons.SoundButtonOn"] = Hc;
    Hc.__name__ = ["farmgame", "buttons", "SoundButtonOn"];
    Hc.__super__ = D;
    Hc.prototype = r(D.prototype, {
        onClick: function(a) {
            Xa.soundFlag = !1;
            this.parentbutton.soundButtonOff.imgNormal.setScale(this.imgNormal.scaleX._value);
            D.prototype.onClick.call(this, a)
        },
        onMouseOver: function(a) {
            D.prototype.onMouseOver.call(this, a)
        },
        setXY: function(a,
            b) {
            this.textSpr.setXY(a, b - 0.25 * this.imgNormal.getNaturalHeight());
            this.imgNormal.setXY(a, b);
            this.imgover.setXY(a, b)
        },
        __class__: Hc
    });
    var Bc = function(a) {
        this.canAutoclick = !0;
        V.call(this, a, "ui/game_undomove", "ui/game_undomove_over");
        this.setXY(790 - this.imgNormal.getNaturalWidth(), 590 - this.imgNormal.getNaturalHeight())
    };
    e["farmgame.buttons.UndoButton"] = Bc;
    Bc.__name__ = ["farmgame", "buttons", "UndoButton"];
    Bc.__super__ = V;
    Bc.prototype = r(V.prototype, {
        onClick: function(a) {
            var b = this;
            u.autoCompleteInProgress ||
                !1 == this.canAutoclick || (this.canAutoclick = !1, ca.delay(function() {
                    b.canAutoclick = !0
                }, 125), u.Undo(), V.prototype.onClick.call(this, a))
        },
        __class__: Bc
    });
    var Rb = function(a, b) {
        D.call(this, a, l.YES[l.langIdx], "promt_button", "promt_button_over");
        this.yesFunction = b
    };
    e["farmgame.buttons.YesButton"] = Rb;
    Rb.__name__ = ["farmgame", "buttons", "YesButton"];
    Rb.__super__ = D;
    Rb.prototype = r(D.prototype, {
        onClick: function(a) {
            this.yesFunction();
            D.prototype.onClick.call(this, a)
        },
        setXY: function(a, b) {
            D.prototype.setXY.call(this,
                a, b);
            this.textSpr.setXY(a, b - 0.23 * this.textSpr.getNaturalHeight())
        },
        __class__: Rb
    });
    var ea = function(a, b, c) {
        null == c && (c = 355);
        null == b && (b = 450);
        null == a && (a = !1);
        var f = this;
        z.call(this);
        this.owner = new M;
        i.layerPrompts.addChild(this.owner);
        this.owner.add(this);
        var d = new X(16777215, h._platform.getStage().get_width(), h._platform.getStage().get_height());
        d.alpha.set__(1.0E-7);
        var e = new X(16777215, 0.1, 0.1);
        this.owner.add(e);
        e.y.set__(0.5 * h._platform.getStage().get_height());
        e.y.animateTo(0, 0.55, Sb.cubeOut);
        q.attachToNewEntity(d,
            this.owner);
        this.promptBaseImg = new X(16777215, b, c);
        this.promptBaseImgEnt = q.attachToNewEntity(this.promptBaseImg, this.owner);
        this.promptBaseImg.centerAnchor();
        this.promptBaseImg.setXY(0.5 * h._platform.getStage().get_width(), 0.5 * h._platform.getStage().get_height());
        !1 == a && q.delayedCall(0.55, function() {
            d.get_pointerDown().connect(R(f, f.onPointerDown))
        });
        this.promptExitIcon = new da(p.pack.getTexture("prompt_exit"));
        q.attachToNewEntity(this.promptExitIcon, this.promptBaseImgEnt);
        this.promptExitIcon.centerAnchor();
        this.promptExitIcon.setXY(0.94 * this.promptBaseImg.getNaturalWidth(), 25);
        this.promptExitIcon.get_pointerDown().connect(R(this, this.onPromptExitIconDown));
        this.promptExitIcon.get_pointerIn().connect(function() {
            h._platform.getMouse().set_cursor(Z.Button)
        });
        this.promptExitIcon.get_pointerOut().connect(function() {
            h._platform.getMouse().set_cursor(Z.Default)
        })
    };
    e["farmgame.prompt.PromptBase"] = ea;
    ea.__name__ = ["farmgame", "prompt", "PromptBase"];
    ea.__super__ = z;
    ea.prototype = r(z.prototype, {
        get_name: function() {
            return "PromptBase_8"
        },
        onPromptExitIconDown: function() {
            this.remove()
        },
        onPointerDown: function() {
            this.remove()
        },
        remove: function() {
            null != this.owner && this.owner.dispose();
            h._platform.getMouse().set_cursor(Z.Default)
        },
        onUpdate: function(a) {
            this.promptBaseImg.setXY(0.5 * h._platform.getStage().get_width(), 0.5 * h._platform.getStage().get_height());
            this.promptBaseImg.setScale(Math.min(h._platform.getStage().get_width() / 800, h._platform.getStage().get_height() / 600));
            z.prototype.onUpdate.call(this, a)
        },
        __class__: ea
    });
    var bb = function() {
        ea.call(this,
            !1, 346, 355);
        bb.myRef = this;
        var a = new T(p.font_black_32, l.MENU[l.langIdx].toUpperCase());
        q.attachToNewEntity(a, this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 40);
        a.centerAnchor();
        a = new Nb(this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth() - 0.5 * a.imgNormal.getNaturalWidth(), 0.23 * this.promptBaseImg.getNaturalHeight());
        a = new Qb(this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth() - 0.5 * a.imgNormal.getNaturalWidth(), 0.42 * this.promptBaseImg.getNaturalHeight());
        (new Xa(this.promptBaseImgEnt)).setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 0.68 * this.promptBaseImg.getNaturalHeight());
        a = new Fc(this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth() - 0.5 * a.imgNormal.getNaturalWidth(), 0.8 * this.promptBaseImg.getNaturalHeight())
    };
    e["farmgame.prompt.MenuPrompt"] = bb;
    bb.__name__ = ["farmgame", "prompt", "MenuPrompt"];
    bb.__super__ = ea;
    bb.prototype = r(ea.prototype, {
        __class__: bb
    });
    var Ob = function() {
        ea.call(this);
        var a = new T(p.font_black_32, l.NEW_GAME[l.langIdx]);
        q.attachToNewEntity(a, this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 40);
        a.centerAnchor();
        a = new T(p.font_black_32, l.ARE_YOU_SURE_NEW[l.langIdx]);
        a.setWrapWidth(600);
        q.attachToNewEntity(a, this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 100);
        a.centerAnchor();
        a.setScale(0.6);
        a.setAlign(W.Center);
        a = new Rb(this.promptBaseImgEnt, R(this, this.yesFunction));
        q.attachToNewEntity(a, this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 200);
        a.centerAnchor();
        a = new Pb(this.promptBaseImgEnt, R(this, this.noFunction));
        q.attachToNewEntity(a, this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 270);
        a.centerAnchor()
    };
    e["farmgame.prompt.NewGamePrompt"] = Ob;
    Ob.__name__ = ["farmgame", "prompt", "NewGamePrompt"];
    Ob.__super__ = ea;
    Ob.prototype = r(ea.prototype, {
        noFunction: function() {
            this.remove()
        },
        yesFunction: function() {
            this.remove();
            A.newGame()
        },
        __class__: Ob
    });
    var Gc = function() {
        ea.call(this);
        var a = new T(p.font_black_32, l.RESTART[l.langIdx]);
        q.attachToNewEntity(a,
            this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 40);
        a.centerAnchor();
        a = new T(p.font_black_32, l.ARE_YOU_SURE_RESTART[l.langIdx]);
        a.setWrapWidth(600);
        q.attachToNewEntity(a, this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 100);
        a.centerAnchor();
        a.setScale(0.6);
        a.setAlign(W.Center);
        a = new Rb(this.promptBaseImgEnt, R(this, this.yesFunction));
        q.attachToNewEntity(a, this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 200);
        a.centerAnchor();
        a = new Pb(this.promptBaseImgEnt,
            R(this, this.noFunction));
        q.attachToNewEntity(a, this.promptBaseImgEnt);
        a.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 270);
        a.centerAnchor()
    };
    e["farmgame.prompt.RestartGamePrompt"] = Gc;
    Gc.__name__ = ["farmgame", "prompt", "RestartGamePrompt"];
    Gc.__super__ = ea;
    Gc.prototype = r(ea.prototype, {
        noFunction: function() {
            this.remove()
        },
        yesFunction: function() {
            bb.myRef.remove();
            this.remove();
            A.restartGame()
        },
        __class__: Gc
    });
    var za = function(a, b) {
        ea.call(this, !0, 492, 350);
        this.totalTime = b;
        x.play("SOUNDS/won");
        var c = 0;
        30 <=
            b && (c = Math.ceil(7E5 / b));
        za.myRef = this;
        var f = new T(p.font_black_32, l.YOU_WIN[l.langIdx]);
        q.attachToNewEntity(f, this.promptBaseImgEnt);
        f.setXY(0.5 * this.promptBaseImg.getNaturalWidth(), 40);
        f.centerAnchor();
        this.scoreTxt = new T(p.font_black_32, l.SCORE[l.langIdx].toUpperCase());
        q.attachToNewEntity(this.scoreTxt, this.promptBaseImgEnt);
        this.scoreTxt.setAlign(W.Left);
        this.scoreTxt.setXY(130, 70);
        this.scoreTxt.setScale(0.6);
        this.scoreTxtRight = new T(p.font_black_32, " " + a);
        q.attachToNewEntity(this.scoreTxtRight,
            this.promptBaseImgEnt);
        this.scoreTxtRight.setAlign(W.Right);
        this.scoreTxtRight.setXY(355, 70);
        this.scoreTxtRight.setScale(0.6);
        this.bonusTxt = new T(p.font_black_32, l.TIME_BONUS[l.langIdx]);
        q.attachToNewEntity(this.bonusTxt, this.promptBaseImgEnt);
        this.bonusTxt.setAlign(W.Left);
        this.bonusTxt.setXY(130, 100);
        this.bonusTxt.setScale(0.6);
        this.bonusTxtRight = new T(p.font_black_32, "" + c);
        q.attachToNewEntity(this.bonusTxtRight, this.promptBaseImgEnt);
        this.bonusTxtRight.setAlign(W.Right);
        this.bonusTxtRight.setXY(355,
            100);
        this.bonusTxtRight.setScale(0.6);
        this.totalTxt = new T(p.font_black_32, l.TOTAL[l.langIdx]);
        q.attachToNewEntity(this.totalTxt, this.promptBaseImgEnt);
        this.totalTxt.setAlign(W.Left);
        this.totalTxt.setXY(130, 130);
        this.totalTxt.setScale(0.6);
        c = a + c;
        this.totalTxtRight = new T(p.font_black_32, "" + c);
        q.attachToNewEntity(this.totalTxtRight, this.promptBaseImgEnt);
        this.totalTxtRight.setAlign(W.Right);
        this.totalTxtRight.setXY(355, 130);
        this.totalTxtRight.setScale(0.6);
        (new Nb(this.promptBaseImgEnt, !0)).setXY(96,
            260);
        (new Qb(this.promptBaseImgEnt, !0)).setXY(96, 180);
        v.currentScore = c;
        v.myRef.manageHighScore();
        v.currentScore = 0;
        this.promptExitIcon.set_visible(!1)
    };
    e["farmgame.prompt.YouWinPrompt"] = za;
    za.__name__ = ["farmgame", "prompt", "YouWinPrompt"];
    za.__super__ = ea;
    za.prototype = r(ea.prototype, {
        onPointerDown: function(a) {
            ea.prototype.onPointerDown.call(this, a);
            za.myRef = null;
            A.reset()
        },
        onPromptExitIconDown: function() {},
        __class__: za
    });
    var M = function() {
        this.parent = this.firstChild = this.next = this.firstComponent = null;
        this._compMap = {}
    };
    e["flambe.Entity"] = M;
    M.__name__ = ["flambe", "Entity"];
    M.__interfaces__ = [xa];
    M.prototype = {
        add: function(a) {
            null != a.owner && a.owner.remove(a);
            var b = a.get_name(),
                c = this._compMap[b];
            null != c && this.remove(c);
            this._compMap[b] = a;
            b = null;
            for (c = this.firstComponent; null != c;) b = c, c = c.next;
            null != b ? b.next = a : this.firstComponent = a;
            a.owner = this;
            a.next = null;
            a.onAdded();
            return this
        },
        remove: function(a) {
            for (var b = null, c = this.firstComponent; null != c;) {
                var f = c.next;
                if (c == a) return null == b ? this.firstComponent =
                    f : (b.owner = this, b.next = f), delete this._compMap[c.get_name()], 0 != (c._flags & 1) && (c.onStop(), c._flags &= -2), c.onRemoved(), c.owner = null, c.next = null, !0;
                b = c;
                c = f
            }
            return !1
        },
        addChild: function(a, b) {
            null == b && (b = !0);
            null != a.parent && a.parent.removeChild(a);
            a.parent = this;
            if (b) {
                for (var c = null, f = this.firstChild; null != f;) c = f, f = f.next;
                null != c ? c.next = a : this.firstChild = a
            } else a.next = this.firstChild, this.firstChild = a;
            return this
        },
        removeChild: function(a) {
            for (var b = null, c = this.firstChild; null != c;) {
                var f = c.next;
                if (c == a) {
                    null ==
                        b ? this.firstChild = f : b.next = f;
                    c.parent = null;
                    c.next = null;
                    break
                }
                b = c;
                c = f
            }
        },
        disposeChildren: function() {
            for (; null != this.firstChild;) this.firstChild.dispose()
        },
        dispose: function() {
            for (null != this.parent && this.parent.removeChild(this); null != this.firstComponent;) this.firstComponent.dispose();
            this.disposeChildren()
        },
        __class__: M
    };
    var Ge = function() {};
    e["flambe.util.PackageLog"] = Ge;
    Ge.__name__ = ["flambe", "util", "PackageLog"];
    var ud = function() {};
    e["flambe.platform.Platform"] = ud;
    ud.__name__ = ["flambe", "platform", "Platform"];
    ud.prototype = {
        __class__: ud
    };
    var cb = function() {};
    e["flambe.platform.html.HtmlPlatform"] = cb;
    cb.__name__ = ["flambe", "platform", "html", "HtmlPlatform"];
    cb.__interfaces__ = [ud];
    cb.prototype = {
        init: function() {
            var a = this;
            C.fixAndroidMath();
            var b = null;
            try {
                b = window.flambe.canvas
            } catch (c) {
                c instanceof n && (c = c.val)
            }
            b.setAttribute("tabindex", "0");
            b.style.outlineStyle = "none";
            b.style.webkitTapHighlightColor = "transparent";
            b.setAttribute("moz-opaque", "true");
            this._stage = new yb(b);
            this._pointer = new fa;
            this._mouse = new Jc(this._pointer,
                b);
            this._renderer = this.createRenderer(b);
            this.mainLoop = new zb;
            this.musicPlaying = !1;
            this._canvas = b;
            this._container = b.parentElement;
            this._container.style.overflow = "hidden";
            this._container.style.position = "relative";
            this._container.style.msTouchAction = "none";
            var f = 0,
                d = function(c) {
                    if (!(1E3 > c.timeStamp - f)) {
                        var d = b.getBoundingClientRect(),
                            e = a.getX(c, d),
                            d = a.getY(c, d);
                        switch (c.type) {
                            case "mousedown":
                                c.target == b && (c.preventDefault(), a._mouse.submitDown(e, d, c.button), b.focus());
                                break;
                            case "mousemove":
                                a._mouse.submitMove(e,
                                    d);
                                break;
                            case "mouseup":
                                a._mouse.submitUp(e, d, c.button);
                                break;
                            case "mousewheel":
                            case "DOMMouseScroll":
                                a._mouse.submitScroll(e, d, "mousewheel" == c.type ? c.wheelDelta / 40 : -c.detail) && c.preventDefault()
                        }
                    }
                };
            window.addEventListener("mousedown", d, !1);
            window.addEventListener("mousemove", d, !1);
            window.addEventListener("mouseup", d, !1);
            b.addEventListener("mousewheel", d, !1);
            b.addEventListener("DOMMouseScroll", d, !1);
            b.addEventListener("contextmenu", function(a) {
                a.preventDefault()
            }, !1);
            var e = "undefined" != typeof window.ontouchstart,
                d = "msMaxTouchPoints" in window.navigator && 1 < window.navigator.msMaxTouchPoints;
            if (e || d) {
                var g = new Kc(this._pointer, e ? 4 : window.navigator.msMaxTouchPoints);
                this._touch = g;
                d = function(b) {
                    var c;
                    c = e ? b.changedTouches : [b];
                    var d = b.target.getBoundingClientRect();
                    f = b.timeStamp;
                    switch (b.type) {
                        case "touchstart":
                        case "MSPointerDown":
                        case "pointerdown":
                            b.preventDefault();
                            C.SHOULD_HIDE_MOBILE_BROWSER && C.hideMobileBrowser();
                            for (b = 0; b < c.length;) {
                                var w = c[b];
                                ++b;
                                var i = a.getX(w, d),
                                    h = a.getY(w, d);
                                g.submitDown((e ? w.identifier :
                                    w.pointerId) | 0, i, h)
                            }
                            break;
                        case "touchmove":
                        case "MSPointerMove":
                        case "pointermove":
                            b.preventDefault();
                            for (b = 0; b < c.length;) w = c[b], ++b, i = a.getX(w, d), h = a.getY(w, d), g.submitMove((e ? w.identifier : w.pointerId) | 0, i, h);
                            break;
                        case "touchend":
                        case "touchcancel":
                        case "MSPointerUp":
                        case "pointerup":
                            for (b = 0; b < c.length;) w = c[b], ++b, i = a.getX(w, d), h = a.getY(w, d), g.submitUp((e ? w.identifier : w.pointerId) | 0, i, h)
                    }
                };
                e ? (b.addEventListener("touchstart", d, !1), b.addEventListener("touchmove", d, !1), b.addEventListener("touchend",
                    d, !1), b.addEventListener("touchcancel", d, !1)) : (b.addEventListener("MSPointerDown", d, !1), b.addEventListener("MSPointerMove", d, !1), b.addEventListener("MSPointerUp", d, !1))
            } else this._touch = new Lc;
            var i = window.onerror;
            window.onerror = function(a, b, c) {
                h.uncaughtError.emit(a);
                return null != i ? i(a, b, c) : !1
            };
            var k = C.loadExtension("hidden", window.document);
            null != k.value ? (d = function() {
                h.hidden.set__(K.field(window.document, k.field))
            }, d(null), window.document.addEventListener(k.prefix + "visibilitychange", d, !1)) : (d =
                function(a) {
                    h.hidden.set__("pagehide" == a.type)
                }, window.addEventListener("pageshow", d, !1), window.addEventListener("pagehide", d, !1));
            h.hidden.get_changed().connect(function(b) {
                b || (a._skipFrame = !0)
            });
            this._skipFrame = !1;
            this._lastUpdate = Date.now();
            var m = C.loadExtension("requestAnimationFrame").value;
            if (null != m) {
                var j = window.performance,
                    l = null != j && C.polyfill("now", j);
                l ? this._lastUpdate = j.now() : null;
                var o = null,
                    o = function(c) {
                        a.update(l ? j.now() : c);
                        m(o, b)
                    };
                m(o, b)
            } else window.setInterval(function() {
                    a.update(Date.now())
                },
                16);
            d = new Tb;
            d.success.connect(function() {
                Ub.info("Initialized HTML platform", ["renderer", a._renderer.get_type()])
            });
            d.set_result(!0);
            return d
        },
        loadAssetPack: function(a) {
            return (new L(this, a)).promise
        },
        getStage: function() {
            return this._stage
        },
        getStorage: function() {
            if (null == this._storage) {
                var a = Mc.getLocalStorage();
                this._storage = null != a ? new Nc(a) : new Oc
            }
            return this._storage
        },
        update: function(a) {
            var b = (a - this._lastUpdate) / 1E3;
            this._lastUpdate = a;
            h.hidden._value || (this._skipFrame ? this._skipFrame = !1 : (this.mainLoop.update(b),
                this.mainLoop.render(this._renderer)))
        },
        getPointer: function() {
            return this._pointer
        },
        getMouse: function() {
            return this._mouse
        },
        getKeyboard: function() {
            var a = this;
            if (null == this._keyboard) {
                this._keyboard = new ua;
                var b = function(b) {
                    switch (b.type) {
                        case "keydown":
                            a._keyboard.submitDown(b.keyCode) && b.preventDefault();
                            break;
                        case "keyup":
                            a._keyboard.submitUp(b.keyCode)
                    }
                };
                this._canvas.addEventListener("keydown", b, !1);
                this._canvas.addEventListener("keyup", b, !1)
            }
            return this._keyboard
        },
        getWeb: function() {
            null == this._web &&
                (this._web = new Pc(this._container));
            return this._web
        },
        getExternal: function() {
            null == this._external && (this._external = new Qc);
            return this._external
        },
        getRenderer: function() {
            return this._renderer
        },
        getX: function(a, b) {
            return (a.clientX - b.left) * this._stage.get_width() / b.width
        },
        getY: function(a, b) {
            return (a.clientY - b.top) * this._stage.get_height() / b.height
        },
        createRenderer: function(a) {
            return new Ab(a)
        },
        __class__: cb
    };
    var la = function(a, b) {
        this._value = a;
        this._changed = null != b ? new Vb(b) : null
    };
    e["flambe.util.Value"] =
        la;
    la.__name__ = ["flambe", "util", "Value"];
    la.prototype = {
        watch: function(a) {
            a(this._value, this._value);
            return this.get_changed().connect(a)
        },
        get__: function() {
            return this._value
        },
        set__: function(a) {
            var b = this._value;
            a != b && (this._value = a, null != this._changed && this._changed.emit(a, b));
            return a
        },
        get_changed: function() {
            null == this._changed && (this._changed = new Vb);
            return this._changed
        },
        __class__: la
    };
    var Bb = function(a, b) {
        this._next = null;
        this._signal = a;
        this._listener = b;
        this.stayInList = !0
    };
    e["flambe.util.SignalConnection"] =
        Bb;
    Bb.__name__ = ["flambe", "util", "SignalConnection"];
    Bb.__interfaces__ = [xa];
    Bb.prototype = {
        once: function() {
            this.stayInList = !1;
            return this
        },
        dispose: function() {
            null != this._signal && (this._signal.disconnect(this), this._signal = null)
        },
        __class__: Bb
    };
    var $ = function(a) {
        this._head = null != a ? new Bb(this, a) : null;
        this._deferredTasks = null
    };
    e["flambe.util.SignalBase"] = $;
    $.__name__ = ["flambe", "util", "SignalBase"];
    $.prototype = {
        connectImpl: function(a, b) {
            var c = this,
                f = new Bb(this, a);
            this._head == $.DISPATCHING_SENTINEL ? this.defer(function() {
                c.listAdd(f,
                    b)
            }) : this.listAdd(f, b);
            return f
        },
        disconnect: function(a) {
            var b = this;
            this._head == $.DISPATCHING_SENTINEL ? this.defer(function() {
                b.listRemove(a)
            }) : this.listRemove(a)
        },
        defer: function(a) {
            for (var b = null, c = this._deferredTasks; null != c;) b = c, c = c.next;
            a = new vd(a);
            null != b ? b.next = a : this._deferredTasks = a
        },
        willEmit: function() {
            var a = this._head;
            this._head = $.DISPATCHING_SENTINEL;
            return a
        },
        didEmit: function(a) {
            this._head = a;
            a = this._deferredTasks;
            for (this._deferredTasks = null; null != a;) a.fn(), a = a.next
        },
        listAdd: function(a,
            b) {
            if (b) a._next = this._head, this._head = a;
            else {
                for (var c = null, f = this._head; null != f;) c = f, f = f._next;
                null != c ? c._next = a : this._head = a
            }
        },
        listRemove: function(a) {
            for (var b = null, c = this._head; null != c;) {
                if (c == a) {
                    a = c._next;
                    null == b ? this._head = a : b._next = a;
                    break
                }
                b = c;
                c = c._next
            }
        },
        __class__: $
    };
    var Vb = function(a) {
        $.call(this, a)
    };
    e["flambe.util.Signal2"] = Vb;
    Vb.__name__ = ["flambe", "util", "Signal2"];
    Vb.__super__ = $;
    Vb.prototype = r($.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        emit: function(a,
            b) {
            var c = this;
            this._head == $.DISPATCHING_SENTINEL ? this.defer(function() {
                c.emitImpl(a, b)
            }) : this.emitImpl(a, b)
        },
        emitImpl: function(a, b) {
            for (var c = this.willEmit(), f = c; null != f;) f._listener(a, b), f.stayInList || f.dispose(), f = f._next;
            this.didEmit(c)
        },
        __class__: Vb
    });
    var Q = function(a) {
        $.call(this, a)
    };
    e["flambe.util.Signal1"] = Q;
    Q.__name__ = ["flambe", "util", "Signal1"];
    Q.__super__ = $;
    Q.prototype = r($.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        emit: function(a) {
            var b = this;
            this._head ==
                $.DISPATCHING_SENTINEL ? this.defer(function() {
                    b.emitImpl(a)
                }) : this.emitImpl(a)
        },
        emitImpl: function(a) {
            for (var b = this.willEmit(), c = b; null != c;) c._listener(a), c.stayInList || c.dispose(), c = c._next;
            this.didEmit(b)
        },
        __class__: Q
    });
    var U = function(a, b) {
        this._behavior = null;
        la.call(this, a, b)
    };
    e["flambe.animation.AnimatedFloat"] = U;
    U.__name__ = ["flambe", "animation", "AnimatedFloat"];
    U.__super__ = la;
    U.prototype = r(la.prototype, {
        set__: function(a) {
            this._behavior = null;
            return la.prototype.set__.call(this, a)
        },
        update: function(a) {
            null !=
                this._behavior && (la.prototype.set__.call(this, this._behavior.update(a)), this._behavior.isComplete() && (this._behavior = null))
        },
        animate: function(a, b, c, f) {
            this.set__(a);
            this.animateTo(b, c, f)
        },
        animateTo: function(a, b, c) {
            this.set_behavior(new Rc(this._value, a, b, c))
        },
        set_behavior: function(a) {
            this._behavior = a;
            this.update(0);
            return a
        },
        __class__: U
    });
    var h = function() {};
    e["flambe.System"] = h;
    h.__name__ = ["flambe", "System"];
    h.init = function() {
        h._calledInit || (h.promise = h._platform.init(), h._calledInit = !0);
        return h.promise
    };
    var Ub = function() {};
    e["flambe.Log"] = Ub;
    Ub.__name__ = ["flambe", "Log"];
    Ub.info = function() {
        null
    };
    Ub.__super__ = Ge;
    Ub.prototype = r(Ge.prototype, {
        __class__: Ub
    });
    var zc = function(a) {
        null == a && (a = 1);
        this._realDt = 0;
        z.call(this);
        this.scale = new U(a)
    };
    e["flambe.SpeedAdjuster"] = zc;
    zc.__name__ = ["flambe", "SpeedAdjuster"];
    zc.__super__ = z;
    zc.prototype = r(z.prototype, {
        get_name: function() {
            return "SpeedAdjuster_5"
        },
        onUpdate: function(a) {
            0 < this._realDt && (a = this._realDt, this._realDt = 0);
            this.scale.update(a)
        },
        __class__: zc
    });
    var wd =
        function() {};
    e["flambe.animation.Behavior"] = wd;
    wd.__name__ = ["flambe", "animation", "Behavior"];
    wd.prototype = {
        __class__: wd
    };
    var Sb = function() {};
    e["flambe.animation.Ease"] = Sb;
    Sb.__name__ = ["flambe", "animation", "Ease"];
    Sb.linear = function(a) {
        return a
    };
    Sb.cubeOut = function(a) {
        return 1 + --a * a * a
    };
    var Rc = function(a, b, c, f) {
        this._from = a;
        this._to = b;
        this._duration = c;
        this.elapsed = 0;
        this._easing = null != f ? f : Sb.linear
    };
    e["flambe.animation.Tween"] = Rc;
    Rc.__name__ = ["flambe", "animation", "Tween"];
    Rc.__interfaces__ = [wd];
    Rc.prototype = {
        update: function(a) {
            this.elapsed += a;
            return this.elapsed >= this._duration ? this._to : this._from + (this._to - this._from) * this._easing(this.elapsed / this._duration)
        },
        isComplete: function() {
            return this.elapsed >= this._duration
        },
        __class__: Rc
    };
    var nb = function() {};
    e["flambe.asset.Asset"] = nb;
    nb.__name__ = ["flambe", "asset", "Asset"];
    nb.__interfaces__ = [xa];
    nb.prototype = {
        __class__: nb
    };
    var s = e["flambe.asset.AssetFormat"] = {
        __ename__: ["flambe", "asset", "AssetFormat"],
        __constructs__: "WEBP,JXR,PNG,JPG,GIF,DDS,PVR,PKM,MP3,M4A,OPUS,OGG,WAV,Data".split(",")
    };
    s.WEBP = ["WEBP", 0];
    s.WEBP.__enum__ = s;
    s.JXR = ["JXR", 1];
    s.JXR.__enum__ = s;
    s.PNG = ["PNG", 2];
    s.PNG.__enum__ = s;
    s.JPG = ["JPG", 3];
    s.JPG.__enum__ = s;
    s.GIF = ["GIF", 4];
    s.GIF.__enum__ = s;
    s.DDS = ["DDS", 5];
    s.DDS.__enum__ = s;
    s.PVR = ["PVR", 6];
    s.PVR.__enum__ = s;
    s.PKM = ["PKM", 7];
    s.PKM.__enum__ = s;
    s.MP3 = ["MP3", 8];
    s.MP3.__enum__ = s;
    s.M4A = ["M4A", 9];
    s.M4A.__enum__ = s;
    s.OPUS = ["OPUS", 10];
    s.OPUS.__enum__ = s;
    s.OGG = ["OGG", 11];
    s.OGG.__enum__ = s;
    s.WAV = ["WAV", 12];
    s.WAV.__enum__ = s;
    s.Data = ["Data", 13];
    s.Data.__enum__ = s;
    var xd = function(a, b, c, f) {
        this.name =
            a;
        this.url = b;
        this.format = c;
        this.bytes = f
    };
    e["flambe.asset.AssetEntry"] = xd;
    xd.__name__ = ["flambe", "asset", "AssetEntry"];
    xd.prototype = {
        __class__: xd
    };
    var Sc = function() {};
    e["flambe.asset.AssetPack"] = Sc;
    Sc.__name__ = ["flambe", "asset", "AssetPack"];
    Sc.__interfaces__ = [xa];
    Sc.prototype = {
        __class__: Sc
    };
    var Tc = function() {};
    e["flambe.asset.File"] = Tc;
    Tc.__name__ = ["flambe", "asset", "File"];
    Tc.__interfaces__ = [nb];
    Tc.prototype = {
        __class__: Tc
    };
    var na = function() {
        this._localBase = this._remoteBase = null;
        this._entries = []
    };
    e["flambe.asset.Manifest"] =
        na;
    na.__name__ = ["flambe", "asset", "Manifest"];
    na.fromAssets = function(a, b) {
        null == b && (b = !0);
        var c = K.field(Uc.getType(na).assets[0], a);
        if (null == c) {
            if (b) throw new n(ia.withFields("Missing asset pack", ["name", a]));
            return null
        }
        var f = new na;
        f.set_localBase("assets");
        for (var d = 0; d < c.length;) {
            var e = c[d];
            ++d;
            var g = e.name,
                i = a + "/" + g + "?v=" + t.string(e.md5),
                h = na.inferFormat(g);
            h != s.Data && (g = ia.removeFileExtension(g));
            f.add(g, i, e.bytes, h)
        }
        return f
    };
    na.inferFormat = function(a) {
        a = ia.getUrlExtension(a);
        if (null != a) switch (a.toLowerCase()) {
            case "gif":
                return s.GIF;
            case "jpg":
            case "jpeg":
                return s.JPG;
            case "jxr":
            case "wdp":
                return s.JXR;
            case "png":
                return s.PNG;
            case "webp":
                return s.WEBP;
            case "dds":
                return s.DDS;
            case "pvr":
                return s.PVR;
            case "pkm":
                return s.PKM;
            case "m4a":
                return s.M4A;
            case "mp3":
                return s.MP3;
            case "ogg":
                return s.OGG;
            case "opus":
                return s.OPUS;
            case "wav":
                return s.WAV
        } else null;
        return s.Data
    };
    na.prototype = {
        add: function(a, b, c, f) {
            null == c && (c = 0);
            null == f && (f = na.inferFormat(b));
            a = new xd(a, b, f, c);
            this._entries.push(a);
            return a
        },
        iterator: function() {
            return y.iter(this._entries)
        },
        getFullURL: function(a) {
            var b;
            b = null != this.get_remoteBase() && na._supportsCrossOrigin ? this.get_remoteBase() : this.get_localBase();
            return null != b ? ia.joinPath(b, a.url) : a.url
        },
        get_localBase: function() {
            return this._localBase
        },
        set_localBase: function(a) {
            null != a && He.that(!J.startsWith(a, "http://") && !J.startsWith(a, "https://"), "localBase must be a path on the same domain, NOT starting with http(s)://", null);
            return this._localBase = a
        },
        get_remoteBase: function() {
            return this._remoteBase
        },
        __class__: na
    };
    var ga = e["flambe.display.BlendMode"] = {
        __ename__: ["flambe", "display", "BlendMode"],
        __constructs__: "Normal,Add,Multiply,Screen,Mask,Copy".split(",")
    };
    ga.Normal = ["Normal", 0];
    ga.Normal.__enum__ = ga;
    ga.Add = ["Add", 1];
    ga.Add.__enum__ = ga;
    ga.Multiply = ["Multiply", 2];
    ga.Multiply.__enum__ = ga;
    ga.Screen = ["Screen", 3];
    ga.Screen.__enum__ = ga;
    ga.Mask = ["Mask", 4];
    ga.Mask.__enum__ = ga;
    ga.Copy = ["Copy", 5];
    ga.Copy.__enum__ = ga;
    var ab = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b
    };
    e["flambe.math.Point"] = ab;
    ab.__name__ = ["flambe", "math", "Point"];
    ab.prototype = {
        __class__: ab
    };
    var I = function() {
        this.blendMode = this.scissor = null;
        var a = this;
        z.call(this);
        this._flags |= 54;
        this._localMatrix = new yd;
        var b = function() {
            a._flags |= 24
        };
        this.x = new U(0, b);
        this.y = new U(0, b);
        this.rotation = new U(0, b);
        this.scaleX = new U(1, b);
        this.scaleY = new U(1, b);
        this.anchorX = new U(0, b);
        this.anchorY = new U(0, b);
        this.alpha = new U(1)
    };
    e["flambe.display.Sprite"] = I;
    I.__name__ = ["flambe", "display", "Sprite"];
    I.hitTest = function(a, b, c, f) {
        null == f && (f = 0);
        f++;
        var d = a._compMap.Sprite_0;
        if (null != d) {
            if (6 != (d._flags &
                    6)) return null;
            d.getLocalMatrix().inverseTransform(b, c, I._scratchPoint) && (b = I._scratchPoint.x, c = I._scratchPoint.y);
            var e = d.scissor;
            if (null != e && !e.contains(b, c)) return null
        }
        a = I.hitTestBackwards(a.firstChild, b, c, f);
        return null != a ? a : null != d && d.containsLocal(b, c) ? d : null
    };
    I.render = function(a, b) {
        var c = a._compMap.Sprite_0;
        if (null != c) {
            var f = c.alpha._value;
            if (0 == (c._flags & 2) || 0 >= f) return;
            b.save();
            1 > f && b.multiplyAlpha(f);
            null != c.blendMode && b.setBlendMode(c.blendMode);
            var f = c.getLocalMatrix(),
                d = f.m02,
                e = f.m12;
            0 != (c._flags & 32) && (d = Math.round(d), e = Math.round(e));
            b.transform(f.m00, f.m10, f.m01, f.m11, d, e);
            f = c.scissor;
            null != f && b.applyScissor(f.x, f.y, f.width, f.height);
            c.draw(b)
        }
        f = a._compMap.Director_3;
        if (null != f) {
            f = f.occludedScenes;
            for (d = 0; d < f.length;) e = f[d], ++d, I.render(e, b)
        }
        for (f = a.firstChild; null != f;) d = f.next, I.render(f, b), f = d;
        null != c && b.restore()
    };
    I.hitTestBackwards = function(a, b, c, f) {
        if (null != a) {
            var d = I.hitTestBackwards(a.next, b, c, f);
            return null != d ? d : I.hitTest(a, b, c, f)
        }
        return null
    };
    I.__super__ = z;
    I.prototype =
        r(z.prototype, {
            get_name: function() {
                return "Sprite_0"
            },
            getNaturalWidth: function() {
                return 0
            },
            getNaturalHeight: function() {
                return 0
            },
            containsLocal: function(a, b) {
                return 0 <= a && a < this.getNaturalWidth() && 0 <= b && b < this.getNaturalHeight()
            },
            getLocalMatrix: function() {
                0 != (this._flags & 8) && (this._flags &= -9, this._localMatrix.compose(this.x._value, this.y._value, this.scaleX._value, this.scaleY._value, 3.141592653589793 * this.rotation._value / 180), this._localMatrix.translate(-this.anchorX._value, -this.anchorY._value));
                return this._localMatrix
            },
            centerAnchor: function() {
                this.anchorX.set__(this.getNaturalWidth() / 2);
                this.anchorY.set__(this.getNaturalHeight() / 2);
                return this
            },
            setXY: function(a, b) {
                this.x.set__(a);
                this.y.set__(b);
                return this
            },
            setAlpha: function(a) {
                this.alpha.set__(a);
                return this
            },
            setRotation: function(a) {
                this.rotation.set__(a);
                return this
            },
            setScale: function(a) {
                this.scaleX.set__(a);
                this.scaleY.set__(a);
                return this
            },
            disablePointer: function() {
                this.set_pointerEnabled(!1);
                return this
            },
            onAdded: function() {
                0 != (this._flags & 64) && this.connectHover()
            },
            onRemoved: function() {
                null != this._hoverConnection && (this._hoverConnection.dispose(), this._hoverConnection = null)
            },
            onUpdate: function(a) {
                this.x.update(a);
                this.y.update(a);
                this.rotation.update(a);
                this.scaleX.update(a);
                this.scaleY.update(a);
                this.alpha.update(a);
                this.anchorX.update(a);
                this.anchorY.update(a)
            },
            draw: function() {},
            getParentSprite: function() {
                if (null == this.owner) return null;
                for (var a = this.owner.parent; null != a;) {
                    var b = a._compMap.Sprite_0;
                    if (null != b) return b;
                    a = a.parent
                }
                return null
            },
            get_pointerDown: function() {
                null ==
                    this._pointerDown && (this._pointerDown = new Q);
                return this._pointerDown
            },
            get_pointerUp: function() {
                null == this._pointerUp && (this._pointerUp = new Q);
                return this._pointerUp
            },
            get_pointerIn: function() {
                null == this._pointerIn && (this._pointerIn = new Q);
                return this._pointerIn
            },
            get_pointerOut: function() {
                null == this._pointerOut && (this._pointerOut = new Q);
                return this._pointerOut
            },
            connectHover: function() {
                var a = this;
                null == this._hoverConnection && (this._hoverConnection = h._platform.getPointer().move.connect(function(b) {
                    for (var c =
                            b.hit; null != c;) {
                        if (c == a) return;
                        c = c.getParentSprite()
                    }
                    null != a._pointerOut && 0 != (a._flags & 64) && a._pointerOut.emit(b);
                    a._flags &= -65;
                    a._hoverConnection.dispose();
                    a._hoverConnection = null
                }))
            },
            set_visible: function(a) {
                this._flags = zd.set(this._flags, 2, a);
                return a
            },
            set_pointerEnabled: function(a) {
                this._flags = zd.set(this._flags, 4, a);
                return a
            },
            onPointerDown: function(a) {
                this.onHover(a);
                null != this._pointerDown && this._pointerDown.emit(a)
            },
            onPointerMove: function(a) {
                this.onHover(a);
                null != this._pointerMove && this._pointerMove.emit(a)
            },
            onHover: function(a) {
                if (0 == (this._flags & 64) && (this._flags |= 64, null != this._pointerIn || null != this._pointerOut)) null != this._pointerIn && this._pointerIn.emit(a), this.connectHover()
            },
            onPointerUp: function(a) {
                switch (a.source[1]) {
                    case 1:
                        null != this._pointerOut && 0 != (this._flags & 64) && this._pointerOut.emit(a), this._flags &= -65, null != this._hoverConnection && (this._hoverConnection.dispose(), this._hoverConnection = null)
                }
                null != this._pointerUp && this._pointerUp.emit(a)
            },
            __class__: I
        });
    var X = function(a, b, c) {
        I.call(this);
        this.color = a;
        this.width = new U(b);
        this.height = new U(c)
    };
    e["flambe.display.FillSprite"] = X;
    X.__name__ = ["flambe", "display", "FillSprite"];
    X.__super__ = I;
    X.prototype = r(I.prototype, {
        draw: function(a) {
            a.fillRect(this.color, 0, 0, this.width._value, this.height._value)
        },
        getNaturalWidth: function() {
            return this.width._value
        },
        getNaturalHeight: function() {
            return this.height._value
        },
        onUpdate: function(a) {
            I.prototype.onUpdate.call(this, a);
            this.width.update(a);
            this.height.update(a)
        },
        __class__: X
    });
    var Vc = function(a) {
        this._kernings =
            null;
        this.xOffset = this.yOffset = this.xAdvance = 0;
        this.page = null;
        this.x = this.y = this.width = this.height = 0;
        this.charCode = a
    };
    e["flambe.display.Glyph"] = Vc;
    Vc.__name__ = ["flambe", "display", "Glyph"];
    Vc.prototype = {
        draw: function(a, b, c) {
            0 < this.width && a.drawSubTexture(this.page, b + this.xOffset, c + this.yOffset, this.x, this.y, this.width, this.height)
        },
        getKerning: function(a) {
            return null != this._kernings ? t["int"](this._kernings.h[a]) : 0
        },
        setKerning: function(a, b) {
            null == this._kernings && (this._kernings = new qa);
            this._kernings.h[a] =
                b
        },
        __class__: Vc
    };
    var Aa = function(a, b) {
        this.name = b;
        this._pack = a;
        this._file = a.getFile(b + ".fnt");
        this.reload()
    };
    e["flambe.display.Font"] = Aa;
    Aa.__name__ = ["flambe", "display", "Font"];
    Aa.prototype = {
        layoutText: function(a, b, c, f, d) {
            null == d && (d = 0);
            null == f && (f = 0);
            null == c && (c = 0);
            null == b && (b = W.Left);
            return new ob(this, a, b, c, f, d)
        },
        reload: function() {
            this._glyphs = new qa;
            this._glyphs.h[Aa.NEWLINE.charCode] = Aa.NEWLINE;
            for (var a = new Cb(this._file.toString()), b = new qa, c = this.name.lastIndexOf("/"), c = 0 <= c ? y.substr(this.name,
                    0, c + 1) : "", f = a.keywords(); f.hasNext();) switch (f.next()) {
                case "info":
                    for (var d = a.pairs(); d.hasNext();) {
                        var e = d.next();
                        switch (e.key) {
                            case "size":
                                this.size = e.getInt()
                        }
                    }
                    break;
                case "common":
                    for (d = a.pairs(); d.hasNext();) switch (e = d.next(), e.key) {
                        case "lineHeight":
                            this.lineHeight = e.getInt()
                    }
                    break;
                case "page":
                    for (var d = 0, e = null, g = a.pairs(); g.hasNext();) {
                        var i = g.next();
                        switch (i.key) {
                            case "id":
                                d = i.getInt();
                                break;
                            case "file":
                                e = i.getString()
                        }
                    }
                    e = this._pack.getTexture(c + ia.removeFileExtension(e));
                    b.h[d] = e;
                    break;
                case "char":
                    d = null;
                    for (e = a.pairs(); e.hasNext();) switch (g = e.next(), g.key) {
                        case "id":
                            d = new Vc(g.getInt());
                            break;
                        case "x":
                            d.x = g.getInt();
                            break;
                        case "y":
                            d.y = g.getInt();
                            break;
                        case "width":
                            d.width = g.getInt();
                            break;
                        case "height":
                            d.height = g.getInt();
                            break;
                        case "page":
                            g = g.getInt();
                            d.page = b.h[g];
                            break;
                        case "xoffset":
                            d.xOffset = g.getInt();
                            break;
                        case "yoffset":
                            d.yOffset = g.getInt();
                            break;
                        case "xadvance":
                            d.xAdvance = g.getInt()
                    }
                    this._glyphs.h[d.charCode] = d;
                    break;
                case "kerning":
                    d = null;
                    g = e = 0;
                    for (i = a.pairs(); i.hasNext();) {
                        var h =
                            i.next();
                        switch (h.key) {
                            case "first":
                                d = this._glyphs.h[h.getInt()];
                                break;
                            case "second":
                                e = h.getInt();
                                break;
                            case "amount":
                                g = h.getInt()
                        }
                    }
                    null != d && 0 != g && d.setKerning(e, g)
            }
        },
        __class__: Aa
    };
    var W = e["flambe.display.TextAlign"] = {
        __ename__: ["flambe", "display", "TextAlign"],
        __constructs__: ["Left", "Center", "Right"]
    };
    W.Left = ["Left", 0];
    W.Left.__enum__ = W;
    W.Center = ["Center", 1];
    W.Center.__enum__ = W;
    W.Right = ["Right", 2];
    W.Right.__enum__ = W;
    var ob = function(a, b, c, f, d, e) {
        this.lines = 0;
        var g = this;
        this._font = a;
        this._glyphs = [];
        this._offsets = [];
        this._lineOffset = Math.round(a.lineHeight + e);
        this.bounds = new Ad;
        for (var i = [], e = b.length, h = 0; h < e;) {
            var k = h++,
                k = b.charCodeAt(k),
                k = a._glyphs.h[k];
            null != k ? this._glyphs.push(k) : null
        }
        for (var b = -1, m = 0, j = 0, a = a._glyphs.h[10], e = function() {
                g.bounds.width = Wc.max(g.bounds.width, m);
                g.bounds.height += j;
                i[g.lines] = m;
                j = m = 0;
                ++g.lines
            }, h = 0; h < this._glyphs.length;) {
            k = this._glyphs[h];
            this._offsets[h] = Math.round(m);
            var l = 0 < f && m + k.width > f;
            l || k == a ? (l && (0 <= b ? (this._glyphs[b] = a, m = this._offsets[b], h = b) : this._glyphs.splice(h,
                0, a)), b = -1, j = this._lineOffset, e()) : (32 == k.charCode && (b = h), m += k.xAdvance + d, j = Wc.max(j, k.height + k.yOffset), h + 1 < this._glyphs.length && (m += k.getKerning(this._glyphs[h + 1].charCode)));
            ++h
        }
        e();
        d = 0;
        a = ob.getAlignOffset(c, i[0], f);
        b = 1.79769313486231E308;
        e = -1.79769313486231E308;
        k = h = 0;
        for (l = this._glyphs.length; k < l;) {
            var n = this._glyphs[k];
            10 == n.charCode && (d += this._lineOffset, ++h, a = ob.getAlignOffset(c, i[h], f));
            this._offsets[k] += a;
            var o = d + n.yOffset,
                b = b < o ? b : o,
                e = Wc.max(e, o + n.height);
            ++k
        }
        this.bounds.x = ob.getAlignOffset(c,
            this.bounds.width, f);
        this.bounds.y = b;
        this.bounds.height = e - b
    };
    e["flambe.display.TextLayout"] = ob;
    ob.__name__ = ["flambe", "display", "TextLayout"];
    ob.getAlignOffset = function(a, b, c) {
        switch (a[1]) {
            case 0:
                return 0;
            case 2:
                return c - b;
            case 1:
                return Math.round((c - b) / 2)
        }
    };
    ob.prototype = {
        draw: function(a) {
            for (var b = 0, c = 0, f = this._glyphs.length; c < f;) {
                var d = this._glyphs[c];
                10 == d.charCode ? b += this._lineOffset : d.draw(a, this._offsets[c], b);
                ++c
            }
        },
        __class__: ob
    };
    var Cb = function(a) {
        this._configText = a;
        this._keywordPattern = new wa("([A-Za-z]+)(.*)",
            "");
        this._pairPattern = new wa('([A-Za-z]+)=("[^"]*"|[^\\s]+)', "")
    };
    e["flambe.display._Font.ConfigParser"] = Cb;
    Cb.__name__ = ["flambe", "display", "_Font", "ConfigParser"];
    Cb.advance = function(a, b) {
        var c = b.matchedPos();
        return y.substr(a, c.pos + c.len, a.length)
    };
    Cb.prototype = {
        keywords: function() {
            var a = this,
                b = this._configText;
            return {
                next: function() {
                    b = Cb.advance(b, a._keywordPattern);
                    a._pairText = a._keywordPattern.matched(2);
                    return a._keywordPattern.matched(1)
                },
                hasNext: function() {
                    return a._keywordPattern.match(b)
                }
            }
        },
        pairs: function() {
            var a = this,
                b = this._pairText;
            return {
                next: function() {
                    b = Cb.advance(b, a._pairPattern);
                    return new Bd(a._pairPattern.matched(1), a._pairPattern.matched(2))
                },
                hasNext: function() {
                    return a._pairPattern.match(b)
                }
            }
        },
        __class__: Cb
    };
    var Bd = function(a, b) {
        this.key = a;
        this._value = b
    };
    e["flambe.display._Font.ConfigPair"] = Bd;
    Bd.__name__ = ["flambe", "display", "_Font", "ConfigPair"];
    Bd.prototype = {
        getInt: function() {
            return t.parseInt(this._value)
        },
        getString: function() {
            return 34 != this._value.charCodeAt(0) ? null :
                y.substr(this._value, 1, this._value.length - 2)
        },
        __class__: Bd
    };
    var Cd = function() {};
    e["flambe.display.Graphics"] = Cd;
    Cd.__name__ = ["flambe", "display", "Graphics"];
    Cd.prototype = {
        __class__: Cd
    };
    var da = function(a) {
        I.call(this);
        this.texture = a
    };
    e["flambe.display.ImageSprite"] = da;
    da.__name__ = ["flambe", "display", "ImageSprite"];
    da.__super__ = I;
    da.prototype = r(I.prototype, {
        draw: function(a) {
            null != this.texture && a.drawTexture(this.texture, 0, 0)
        },
        getNaturalWidth: function() {
            return null != this.texture ? this.texture.get_width() :
                0
        },
        getNaturalHeight: function() {
            return null != this.texture ? this.texture.get_height() : 0
        },
        __class__: da
    });
    var mb = e["flambe.display.Orientation"] = {
        __ename__: ["flambe", "display", "Orientation"],
        __constructs__: ["Portrait", "Landscape"]
    };
    mb.Portrait = ["Portrait", 0];
    mb.Portrait.__enum__ = mb;
    mb.Landscape = ["Landscape", 1];
    mb.Landscape.__enum__ = mb;
    var Xc = function() {};
    e["flambe.display.Texture"] = Xc;
    Xc.__name__ = ["flambe", "display", "Texture"];
    Xc.__interfaces__ = [nb];
    Xc.prototype = {
        __class__: Xc
    };
    var Ie = function() {};
    e["flambe.display.SubTexture"] =
        Ie;
    Ie.__name__ = ["flambe", "display", "SubTexture"];
    Ie.__interfaces__ = [Xc];
    var T = function(a, b) {
        null == b && (b = "");
        this._layout = null;
        var c = this;
        I.call(this);
        this._font = a;
        this._text = b;
        this._align = W.Left;
        this._flags |= 128;
        var f = function() {
            c._flags |= 128
        };
        this.wrapWidth = new U(0, f);
        this.letterSpacing = new U(0, f);
        this.lineSpacing = new U(0, f)
    };
    e["flambe.display.TextSprite"] = T;
    T.__name__ = ["flambe", "display", "TextSprite"];
    T.__super__ = I;
    T.prototype = r(I.prototype, {
        draw: function(a) {
            this.updateLayout();
            this._layout.draw(a)
        },
        getNaturalWidth: function() {
            this.updateLayout();
            return 0 < this.wrapWidth._value ? this.wrapWidth._value : this._layout.bounds.width
        },
        getNaturalHeight: function() {
            this.updateLayout();
            var a = this._layout.lines * (this._font.lineHeight + this.lineSpacing._value),
                b = this._layout.bounds.height;
            return a > b ? a : b
        },
        containsLocal: function(a, b) {
            this.updateLayout();
            return this._layout.bounds.contains(a, b)
        },
        setWrapWidth: function(a) {
            this.wrapWidth.set__(a);
            return this
        },
        setLineSpacing: function(a) {
            this.lineSpacing.set__(a);
            return this
        },
        setAlign: function(a) {
            this.set_align(a);
            return this
        },
        set_text: function(a) {
            a != this._text && (this._text = a, this._flags |= 128);
            return a
        },
        set_align: function(a) {
            a != this._align && (this._align = a, this._flags |= 128);
            return a
        },
        updateLayout: function() {
            0 != (this._flags & 128) && (this._flags &= -129, this._layout = this._font.layoutText(this._text, this._align, this.wrapWidth._value, this.letterSpacing._value, this.lineSpacing._value))
        },
        onUpdate: function(a) {
            I.prototype.onUpdate.call(this, a);
            this.wrapWidth.update(a);
            this.letterSpacing.update(a);
            this.lineSpacing.update(a)
        },
        __class__: T
    });
    var d = e["flambe.input.Key"] = {
        __ename__: ["flambe", "input", "Key"],
        __constructs__: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Number0,Number1,Number2,Number3,Number4,Number5,Number6,Number7,Number8,Number9,Numpad0,Numpad1,Numpad2,Numpad3,Numpad4,Numpad5,Numpad6,Numpad7,Numpad8,Numpad9,NumpadAdd,NumpadDecimal,NumpadDivide,NumpadEnter,NumpadMultiply,NumpadSubtract,F1,F2,F3,F4,F5,F6,F7,F8,F9,F10,F11,F12,F13,F14,F15,Left,Up,Right,Down,Alt,Backquote,Backslash,Backspace,CapsLock,Comma,Command,Control,Delete,End,Enter,Equals,Escape,Home,Insert,LeftBracket,Minus,PageDown,PageUp,Period,Quote,RightBracket,Semicolon,Shift,Slash,Space,Tab,Menu,Search,Unknown".split(",")
    };
    d.A = ["A", 0];
    d.A.__enum__ = d;
    d.B = ["B", 1];
    d.B.__enum__ = d;
    d.C = ["C", 2];
    d.C.__enum__ = d;
    d.D = ["D", 3];
    d.D.__enum__ = d;
    d.E = ["E", 4];
    d.E.__enum__ = d;
    d.F = ["F", 5];
    d.F.__enum__ = d;
    d.G = ["G", 6];
    d.G.__enum__ = d;
    d.H = ["H", 7];
    d.H.__enum__ = d;
    d.I = ["I", 8];
    d.I.__enum__ = d;
    d.J = ["J", 9];
    d.J.__enum__ = d;
    d.K = ["K", 10];
    d.K.__enum__ = d;
    d.L = ["L", 11];
    d.L.__enum__ = d;
    d.M = ["M", 12];
    d.M.__enum__ = d;
    d.N = ["N", 13];
    d.N.__enum__ = d;
    d.O = ["O", 14];
    d.O.__enum__ = d;
    d.P = ["P", 15];
    d.P.__enum__ = d;
    d.Q = ["Q", 16];
    d.Q.__enum__ = d;
    d.R = ["R", 17];
    d.R.__enum__ = d;
    d.S = ["S",
        18
    ];
    d.S.__enum__ = d;
    d.T = ["T", 19];
    d.T.__enum__ = d;
    d.U = ["U", 20];
    d.U.__enum__ = d;
    d.V = ["V", 21];
    d.V.__enum__ = d;
    d.W = ["W", 22];
    d.W.__enum__ = d;
    d.X = ["X", 23];
    d.X.__enum__ = d;
    d.Y = ["Y", 24];
    d.Y.__enum__ = d;
    d.Z = ["Z", 25];
    d.Z.__enum__ = d;
    d.Number0 = ["Number0", 26];
    d.Number0.__enum__ = d;
    d.Number1 = ["Number1", 27];
    d.Number1.__enum__ = d;
    d.Number2 = ["Number2", 28];
    d.Number2.__enum__ = d;
    d.Number3 = ["Number3", 29];
    d.Number3.__enum__ = d;
    d.Number4 = ["Number4", 30];
    d.Number4.__enum__ = d;
    d.Number5 = ["Number5", 31];
    d.Number5.__enum__ = d;
    d.Number6 = ["Number6", 32];
    d.Number6.__enum__ = d;
    d.Number7 = ["Number7", 33];
    d.Number7.__enum__ = d;
    d.Number8 = ["Number8", 34];
    d.Number8.__enum__ = d;
    d.Number9 = ["Number9", 35];
    d.Number9.__enum__ = d;
    d.Numpad0 = ["Numpad0", 36];
    d.Numpad0.__enum__ = d;
    d.Numpad1 = ["Numpad1", 37];
    d.Numpad1.__enum__ = d;
    d.Numpad2 = ["Numpad2", 38];
    d.Numpad2.__enum__ = d;
    d.Numpad3 = ["Numpad3", 39];
    d.Numpad3.__enum__ = d;
    d.Numpad4 = ["Numpad4", 40];
    d.Numpad4.__enum__ = d;
    d.Numpad5 = ["Numpad5", 41];
    d.Numpad5.__enum__ = d;
    d.Numpad6 = ["Numpad6", 42];
    d.Numpad6.__enum__ = d;
    d.Numpad7 = ["Numpad7", 43];
    d.Numpad7.__enum__ = d;
    d.Numpad8 = ["Numpad8", 44];
    d.Numpad8.__enum__ = d;
    d.Numpad9 = ["Numpad9", 45];
    d.Numpad9.__enum__ = d;
    d.NumpadAdd = ["NumpadAdd", 46];
    d.NumpadAdd.__enum__ = d;
    d.NumpadDecimal = ["NumpadDecimal", 47];
    d.NumpadDecimal.__enum__ = d;
    d.NumpadDivide = ["NumpadDivide", 48];
    d.NumpadDivide.__enum__ = d;
    d.NumpadEnter = ["NumpadEnter", 49];
    d.NumpadEnter.__enum__ = d;
    d.NumpadMultiply = ["NumpadMultiply", 50];
    d.NumpadMultiply.__enum__ = d;
    d.NumpadSubtract = ["NumpadSubtract", 51];
    d.NumpadSubtract.__enum__ = d;
    d.F1 = ["F1", 52];
    d.F1.__enum__ = d;
    d.F2 = ["F2", 53];
    d.F2.__enum__ = d;
    d.F3 = ["F3", 54];
    d.F3.__enum__ = d;
    d.F4 = ["F4", 55];
    d.F4.__enum__ = d;
    d.F5 = ["F5", 56];
    d.F5.__enum__ = d;
    d.F6 = ["F6", 57];
    d.F6.__enum__ = d;
    d.F7 = ["F7", 58];
    d.F7.__enum__ = d;
    d.F8 = ["F8", 59];
    d.F8.__enum__ = d;
    d.F9 = ["F9", 60];
    d.F9.__enum__ = d;
    d.F10 = ["F10", 61];
    d.F10.__enum__ = d;
    d.F11 = ["F11", 62];
    d.F11.__enum__ = d;
    d.F12 = ["F12", 63];
    d.F12.__enum__ = d;
    d.F13 = ["F13", 64];
    d.F13.__enum__ = d;
    d.F14 = ["F14", 65];
    d.F14.__enum__ = d;
    d.F15 = ["F15", 66];
    d.F15.__enum__ = d;
    d.Left = ["Left", 67];
    d.Left.__enum__ =
        d;
    d.Up = ["Up", 68];
    d.Up.__enum__ = d;
    d.Right = ["Right", 69];
    d.Right.__enum__ = d;
    d.Down = ["Down", 70];
    d.Down.__enum__ = d;
    d.Alt = ["Alt", 71];
    d.Alt.__enum__ = d;
    d.Backquote = ["Backquote", 72];
    d.Backquote.__enum__ = d;
    d.Backslash = ["Backslash", 73];
    d.Backslash.__enum__ = d;
    d.Backspace = ["Backspace", 74];
    d.Backspace.__enum__ = d;
    d.CapsLock = ["CapsLock", 75];
    d.CapsLock.__enum__ = d;
    d.Comma = ["Comma", 76];
    d.Comma.__enum__ = d;
    d.Command = ["Command", 77];
    d.Command.__enum__ = d;
    d.Control = ["Control", 78];
    d.Control.__enum__ = d;
    d.Delete = ["Delete", 79];
    d.Delete.__enum__ = d;
    d.End = ["End", 80];
    d.End.__enum__ = d;
    d.Enter = ["Enter", 81];
    d.Enter.__enum__ = d;
    d.Equals = ["Equals", 82];
    d.Equals.__enum__ = d;
    d.Escape = ["Escape", 83];
    d.Escape.__enum__ = d;
    d.Home = ["Home", 84];
    d.Home.__enum__ = d;
    d.Insert = ["Insert", 85];
    d.Insert.__enum__ = d;
    d.LeftBracket = ["LeftBracket", 86];
    d.LeftBracket.__enum__ = d;
    d.Minus = ["Minus", 87];
    d.Minus.__enum__ = d;
    d.PageDown = ["PageDown", 88];
    d.PageDown.__enum__ = d;
    d.PageUp = ["PageUp", 89];
    d.PageUp.__enum__ = d;
    d.Period = ["Period", 90];
    d.Period.__enum__ = d;
    d.Quote = ["Quote", 91];
    d.Quote.__enum__ = d;
    d.RightBracket = ["RightBracket", 92];
    d.RightBracket.__enum__ = d;
    d.Semicolon = ["Semicolon", 93];
    d.Semicolon.__enum__ = d;
    d.Shift = ["Shift", 94];
    d.Shift.__enum__ = d;
    d.Slash = ["Slash", 95];
    d.Slash.__enum__ = d;
    d.Space = ["Space", 96];
    d.Space.__enum__ = d;
    d.Tab = ["Tab", 97];
    d.Tab.__enum__ = d;
    d.Menu = ["Menu", 98];
    d.Menu.__enum__ = d;
    d.Search = ["Search", 99];
    d.Search.__enum__ = d;
    d.Unknown = function(a) {
        a = ["Unknown", 100, a];
        a.__enum__ = d;
        return a
    };
    var Dd = function() {
        this.init(0, null)
    };
    e["flambe.input.KeyboardEvent"] =
        Dd;
    Dd.__name__ = ["flambe", "input", "KeyboardEvent"];
    Dd.prototype = {
        init: function(a, b) {
            this.id = a;
            this.key = b
        },
        __class__: Dd
    };
    var oa = e["flambe.input.MouseButton"] = {
        __ename__: ["flambe", "input", "MouseButton"],
        __constructs__: ["Left", "Middle", "Right", "Unknown"]
    };
    oa.Left = ["Left", 0];
    oa.Left.__enum__ = oa;
    oa.Middle = ["Middle", 1];
    oa.Middle.__enum__ = oa;
    oa.Right = ["Right", 2];
    oa.Right.__enum__ = oa;
    oa.Unknown = function(a) {
        a = ["Unknown", 3, a];
        a.__enum__ = oa;
        return a
    };
    var Z = e["flambe.input.MouseCursor"] = {
        __ename__: ["flambe", "input",
            "MouseCursor"
        ],
        __constructs__: ["Default", "Button", "None"]
    };
    Z.Default = ["Default", 0];
    Z.Default.__enum__ = Z;
    Z.Button = ["Button", 1];
    Z.Button.__enum__ = Z;
    Z.None = ["None", 2];
    Z.None.__enum__ = Z;
    var Ed = function() {
        this.init(0, 0, 0, null)
    };
    e["flambe.input.MouseEvent"] = Ed;
    Ed.__name__ = ["flambe", "input", "MouseEvent"];
    Ed.prototype = {
        init: function(a, b, c, f) {
            this.id = a;
            this.viewX = b;
            this.viewY = c;
            this.button = f
        },
        __class__: Ed
    };
    var Yc = e["flambe.input.EventSource"] = {
        __ename__: ["flambe", "input", "EventSource"],
        __constructs__: ["Mouse",
            "Touch"
        ]
    };
    Yc.Mouse = function(a) {
        a = ["Mouse", 0, a];
        a.__enum__ = Yc;
        return a
    };
    Yc.Touch = function(a) {
        a = ["Touch", 1, a];
        a.__enum__ = Yc;
        return a
    };
    var Fd = function() {
        this.init(0, 0, 0, null, null)
    };
    e["flambe.input.PointerEvent"] = Fd;
    Fd.__name__ = ["flambe", "input", "PointerEvent"];
    Fd.prototype = {
        init: function(a, b, c, f, d) {
            this.id = a;
            this.viewX = b;
            this.viewY = c;
            this.hit = f;
            this.source = d;
            this._stopped = !1
        },
        __class__: Fd
    };
    var Gd = function(a) {
        this.id = a;
        this._source = Yc.Touch(this)
    };
    e["flambe.input.TouchPoint"] = Gd;
    Gd.__name__ = ["flambe",
        "input", "TouchPoint"
    ];
    Gd.prototype = {
        init: function(a, b) {
            this.viewX = a;
            this.viewY = b
        },
        __class__: Gd
    };
    var Wc = function() {};
    e["flambe.math.FMath"] = Wc;
    Wc.__name__ = ["flambe", "math", "FMath"];
    Wc.max = function(a, b) {
        return a > b ? a : b
    };
    var yd = function() {
        this.identity()
    };
    e["flambe.math.Matrix"] = yd;
    yd.__name__ = ["flambe", "math", "Matrix"];
    yd.prototype = {
        set: function(a, b, c, f, d, e) {
            this.m00 = a;
            this.m01 = c;
            this.m02 = d;
            this.m10 = b;
            this.m11 = f;
            this.m12 = e
        },
        identity: function() {
            this.set(1, 0, 0, 1, 0, 0)
        },
        compose: function(a, b, c, f, d) {
            var e =
                Math.sin(d),
                d = Math.cos(d);
            this.set(d * c, e * c, -e * f, d * f, a, b)
        },
        translate: function(a, b) {
            this.m02 += this.m00 * a + this.m01 * b;
            this.m12 += this.m11 * b + this.m10 * a
        },
        determinant: function() {
            return this.m00 * this.m11 - this.m01 * this.m10
        },
        inverseTransform: function(a, b, c) {
            var f = this.determinant();
            if (0 == f) return !1;
            a -= this.m02;
            b -= this.m12;
            c.x = (a * this.m11 - b * this.m01) / f;
            c.y = (b * this.m00 - a * this.m10) / f;
            return !0
        },
        __class__: yd
    };
    var Ad = function(a, b, c, f) {
        null == f && (f = 0);
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.set(a, b, c, f)
    };
    e["flambe.math.Rectangle"] = Ad;
    Ad.__name__ = ["flambe", "math", "Rectangle"];
    Ad.prototype = {
        set: function(a, b, c, f) {
            this.x = a;
            this.y = b;
            this.width = c;
            this.height = f
        },
        contains: function(a, b) {
            a -= this.x;
            if (0 <= this.width) {
                if (0 > a || a > this.width) return !1
            } else if (0 < a || a < this.width) return !1;
            b -= this.y;
            if (0 <= this.height) {
                if (0 > b || b > this.height) return !1
            } else if (0 < b || b < this.height) return !1;
            return !0
        },
        __class__: Ad
    };
    var ja = function() {
        this._disposed = !1
    };
    e["flambe.platform.BasicAsset"] = ja;
    ja.__name__ = ["flambe", "platform", "BasicAsset"];
    ja.__interfaces__ = [nb];
    ja.prototype = {
        dispose: function() {
            this._disposed || (this._disposed = !0, this.onDisposed())
        },
        onDisposed: function() {
            null
        },
        __class__: ja
    };
    var pb = function(a, b) {
        var c = this;
        this.manifest = b;
        this._platform = a;
        this.promise = new Tb;
        this._bytesLoaded = new ka;
        this._pack = new Zc(b, this);
        var f = xb.array(b);
        if (0 == f.length) this.handleSuccess();
        else {
            for (var d = new ka, e = 0; e < f.length;) {
                var g = f[e];
                ++e;
                var i = d.get(g.name);
                null == i && (i = [], d.set(g.name, i));
                i.push(g)
            }
            this._assetsRemaining = xb.count(d);
            for (f = new $c(d,
                    d.arrayKeys()); f.hasNext();) d = [f.next()], this.pickBestEntry(d[0], function(a) {
                return function(f) {
                    if (null != f) {
                        var d = b.getFullURL(f);
                        try {
                            c.loadEntry(d, f)
                        } catch (e) {
                            e instanceof n && (e = e.val), c.handleError(f, "Unexpected error: " + t.string(e))
                        }
                        d = c.promise;
                        d.set_total(d._total + f.bytes)
                    } else f = a[0][0], pb.isAudio(f.format) ? c.handleLoad(f, ra.getInstance()) : c.handleError(f, "Could not find a supported format to load")
                }
            }(d))
        }
    };
    e["flambe.platform.BasicAssetPackLoader"] = pb;
    pb.__name__ = ["flambe", "platform", "BasicAssetPackLoader"];
    pb.isAudio = function(a) {
        switch (a[1]) {
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                return !0;
            default:
                return !1
        }
    };
    pb.prototype = {
        onDisposed: function() {},
        pickBestEntry: function(a, b) {
            this.getAssetFormats(function(c) {
                for (var f = 0; f < c.length;) {
                    var d = c[f];
                    ++f;
                    for (var e = 0; e < a.length;) {
                        var g = a[e];
                        ++e;
                        if (g.format == d) {
                            b(g);
                            return
                        }
                    }
                }
                b(null)
            })
        },
        loadEntry: function() {
            null
        },
        getAssetFormats: function() {
            null
        },
        handleLoad: function(a, b) {
            if (!this._pack.disposed) {
                this.handleProgress(a, a.bytes);
                var c;
                switch (a.format[1]) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        c =
                            this._pack.textures;
                        break;
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        c = this._pack.sounds;
                        break;
                    case 13:
                        c = this._pack.files
                }
                c.set(a.name, b);
                this._assetsRemaining -= 1;
                0 == this._assetsRemaining && this.handleSuccess()
            }
        },
        handleProgress: function(a, b) {
            this._bytesLoaded.set(a.name, b);
            for (var c = 0, f = this._bytesLoaded.iterator(); f.hasNext();) var d = f.next(),
                c = c + d;
            this.promise.set_progress(c)
        },
        handleSuccess: function() {
            this.promise.set_result(this._pack)
        },
        handleError: function(a, b) {
            this.promise.error.emit(ia.withFields(b,
                ["url", a.url]))
        },
        handleTextureError: function(a) {
            this.handleError(a, "Failed to create texture. Is the GPU context unavailable?")
        },
        __class__: pb
    };
    var Zc = function(a, b) {
        this.disposed = !1;
        this._manifest = a;
        this.loader = b;
        this.textures = new ka;
        this.sounds = new ka;
        this.files = new ka
    };
    e["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = Zc;
    Zc.__name__ = ["flambe", "platform", "_BasicAssetPackLoader", "BasicAssetPack"];
    Zc.__interfaces__ = [Sc];
    Zc.prototype = {
        getTexture: function(a, b) {
            null == b && (b = !0);
            var c = this.textures.get(a);
            if (null == c && b) throw new n(ia.withFields("Missing texture", ["name", a]));
            return c
        },
        getSound: function(a, b) {
            null == b && (b = !0);
            var c = this.sounds.get(a);
            if (null == c && b) throw new n(ia.withFields("Missing sound", ["name", a]));
            return c
        },
        getFile: function(a, b) {
            null == b && (b = !0);
            var c = this.files.get(a);
            if (null == c && b) throw new n(ia.withFields("Missing file", ["name", a]));
            return c
        },
        dispose: function() {
            if (!this.disposed) {
                this.disposed = !0;
                for (var a = this.textures.iterator(); a.hasNext();) a.next().dispose();
                this.textures = null;
                for (a = this.sounds.iterator(); a.hasNext();) a.next().dispose();
                this.sounds = null;
                for (a = this.files.iterator(); a.hasNext();) a.next().dispose();
                this.files = null;
                this.loader.onDisposed()
            }
        },
        __class__: Zc
    };
    var Wb = function(a) {
        this._disposed = !1;
        this._content = a
    };
    e["flambe.platform.BasicFile"] = Wb;
    Wb.__name__ = ["flambe", "platform", "BasicFile"];
    Wb.__interfaces__ = [Tc];
    Wb.__super__ = ja;
    Wb.prototype = r(ja.prototype, {
        toString: function() {
            return this._content
        },
        onDisposed: function() {
            this._content = null
        },
        __class__: Wb
    });
    var Hd =
        function() {};
    e["flambe.subsystem.KeyboardSystem"] = Hd;
    Hd.__name__ = ["flambe", "subsystem", "KeyboardSystem"];
    Hd.prototype = {
        __class__: Hd
    };
    var ua = function() {
        this.down = new Q;
        this.up = new Q;
        this.backButton = new qb;
        this._keyStates = new qa
    };
    e["flambe.platform.BasicKeyboard"] = ua;
    ua.__name__ = ["flambe", "platform", "BasicKeyboard"];
    ua.__interfaces__ = [Hd];
    ua.prototype = {
        submitDown: function(a) {
            if (16777238 == a) return null != this.backButton._head ? (this.backButton.emit(), !0) : !1;
            this._keyStates.h.hasOwnProperty(a) || (this._keyStates.h[a] = !0, ua._sharedEvent.init(ua._sharedEvent.id + 1, Id.toKey(a)), this.down.emit(ua._sharedEvent));
            return !0
        },
        submitUp: function(a) {
            this._keyStates.h.hasOwnProperty(a) && (this._keyStates.remove(a), ua._sharedEvent.init(ua._sharedEvent.id + 1, Id.toKey(a)), this.up.emit(ua._sharedEvent))
        },
        __class__: ua
    };
    var Jd = function() {};
    e["flambe.subsystem.MouseSystem"] = Jd;
    Jd.__name__ = ["flambe", "subsystem", "MouseSystem"];
    Jd.prototype = {
        __class__: Jd
    };
    var ma = function(a) {
        this._pointer = a;
        this._source = Yc.Mouse(ma._sharedEvent);
        this.down =
            new Q;
        this.move = new Q;
        this.up = new Q;
        this.scroll = new Q;
        this._y = this._x = 0;
        this._cursor = Z.Default;
        this._buttonStates = new qa
    };
    e["flambe.platform.BasicMouse"] = ma;
    ma.__name__ = ["flambe", "platform", "BasicMouse"];
    ma.__interfaces__ = [Jd];
    ma.prototype = {
        set_cursor: function(a) {
            return this._cursor = a
        },
        submitDown: function(a, b, c) {
            this._buttonStates.h.hasOwnProperty(c) || (this._buttonStates.h[c] = !0, this.prepare(a, b, Kd.toButton(c)), this._pointer.submitDown(a, b, this._source), this.down.emit(ma._sharedEvent))
        },
        submitMove: function(a,
            b) {
            this.prepare(a, b, null);
            this._pointer.submitMove(a, b, this._source);
            this.move.emit(ma._sharedEvent)
        },
        submitUp: function(a, b, c) {
            this._buttonStates.h.hasOwnProperty(c) && (this._buttonStates.remove(c), this.prepare(a, b, Kd.toButton(c)), this._pointer.submitUp(a, b, this._source), this.up.emit(ma._sharedEvent))
        },
        submitScroll: function(a, b, c) {
            this._x = a;
            this._y = b;
            if (null == this.scroll._head) return !1;
            this.scroll.emit(c);
            return !0
        },
        prepare: function(a, b, c) {
            this._x = a;
            this._y = b;
            ma._sharedEvent.init(ma._sharedEvent.id +
                1, a, b, c)
        },
        __class__: ma
    };
    var Ld = function() {};
    e["flambe.subsystem.PointerSystem"] = Ld;
    Ld.__name__ = ["flambe", "subsystem", "PointerSystem"];
    Ld.prototype = {
        __class__: Ld
    };
    var fa = function(a, b, c) {
        null == c && (c = !1);
        null == b && (b = 0);
        null == a && (a = 0);
        this.down = new Q;
        this.move = new Q;
        this.up = new Q;
        this._x = a;
        this._y = b;
        this._isDown = c
    };
    e["flambe.platform.BasicPointer"] = fa;
    fa.__name__ = ["flambe", "platform", "BasicPointer"];
    fa.__interfaces__ = [Ld];
    fa.prototype = {
        get_x: function() {
            return this._x
        },
        get_y: function() {
            return this._y
        },
        isDown: function() {
            return this._isDown
        },
        submitDown: function(a, b, c) {
            if (!this._isDown) {
                this.submitMove(a, b, c);
                this._isDown = !0;
                var f = [],
                    d = I.hitTest(h.root, a, b);
                if (null != d) {
                    var e = d.owner;
                    do {
                        var g = e._compMap.Sprite_0;
                        null != g && f.push(g);
                        e = e.parent
                    } while (null != e)
                }
                this.prepare(a, b, d, c);
                for (a = 0; a < f.length;)
                    if (b = f[a], ++a, b.onPointerDown(fa._sharedEvent), fa._sharedEvent._stopped) return;
                this.down.emit(fa._sharedEvent)
            }
        },
        submitMove: function(a, b, c) {
            if (!(a == this._x && b == this._y)) {
                var f = [],
                    d = I.hitTest(h.root, a, b);
                if (null != d) {
                    var e = d.owner;
                    do {
                        var g = e._compMap.Sprite_0;
                        null != g && f.push(g);
                        e = e.parent
                    } while (null != e)
                }
                this.prepare(a, b, d, c);
                for (a = 0; a < f.length;)
                    if (b = f[a], ++a, b.onPointerMove(fa._sharedEvent), fa._sharedEvent._stopped) return;
                this.move.emit(fa._sharedEvent)
            }
        },
        submitUp: function(a, b, c) {
            if (this._isDown) {
                this.submitMove(a, b, c);
                this._isDown = !1;
                var f = [],
                    d = I.hitTest(h.root, a, b);
                if (null != d) {
                    var e = d.owner;
                    do {
                        var g = e._compMap.Sprite_0;
                        null != g && f.push(g);
                        e = e.parent
                    } while (null != e)
                }
                this.prepare(a, b, d, c);
                for (a = 0; a <
                    f.length;)
                    if (b = f[a], ++a, b.onPointerUp(fa._sharedEvent), fa._sharedEvent._stopped) return;
                this.up.emit(fa._sharedEvent)
            }
        },
        prepare: function(a, b, c, f) {
            this._x = a;
            this._y = b;
            fa._sharedEvent.init(fa._sharedEvent.id + 1, a, b, c, f)
        },
        __class__: fa
    };
    var rb = function(a, b, c) {
        this._parent = null;
        this.rootX = this.rootY = 0;
        this._disposed = !1;
        this.root = a;
        this._width = b;
        this._height = c
    };
    e["flambe.platform.BasicTexture"] = rb;
    rb.__name__ = ["flambe", "platform", "BasicTexture"];
    rb.__interfaces__ = [Ie];
    rb.__super__ = ja;
    rb.prototype = r(ja.prototype, {
        onDisposed: function() {
            null == this._parent && this.root.dispose()
        },
        get_width: function() {
            return this._width
        },
        get_height: function() {
            return this._height
        },
        __class__: rb
    });
    var Je = function() {};
    e["flambe.subsystem.TouchSystem"] = Je;
    Je.__name__ = ["flambe", "subsystem", "TouchSystem"];
    var Kc = function(a, b) {
        null == b && (b = 4);
        this._pointer = a;
        this._maxPoints = b;
        this._pointMap = new qa;
        this._points = [];
        this.down = new Q;
        this.move = new Q;
        this.up = new Q
    };
    e["flambe.platform.BasicTouch"] = Kc;
    Kc.__name__ = ["flambe", "platform", "BasicTouch"];
    Kc.__interfaces__ = [Je];
    Kc.prototype = {
        submitDown: function(a, b, c) {
            if (!this._pointMap.h.hasOwnProperty(a)) {
                var f = new Gd(a);
                f.init(b, c);
                this._pointMap.h[a] = f;
                this._points.push(f);
                null == this._pointerTouch && (this._pointerTouch = f, this._pointer.submitDown(b, c, f._source));
                this.down.emit(f)
            }
        },
        submitMove: function(a, b, c) {
            a = this._pointMap.h[a];
            null != a && (a.init(b, c), this._pointerTouch == a && this._pointer.submitMove(b, c, a._source), this.move.emit(a))
        },
        submitUp: function(a, b, c) {
            var f = this._pointMap.h[a];
            null != f && (f.init(b,
                c), this._pointMap.remove(a), y.remove(this._points, f), this._pointerTouch == f && (this._pointerTouch = null, this._pointer.submitUp(b, c, f._source)), this.up.emit(f))
        },
        __class__: Kc
    };
    var Db = function() {};
    e["flambe.sound.Sound"] = Db;
    Db.__name__ = ["flambe", "sound", "Sound"];
    Db.__interfaces__ = [nb];
    Db.prototype = {
        __class__: Db
    };
    var ra = function() {
        this._disposed = !1;
        this._playback = new ad(this)
    };
    e["flambe.platform.DummySound"] = ra;
    ra.__name__ = ["flambe", "platform", "DummySound"];
    ra.__interfaces__ = [Db];
    ra.getInstance = function() {
        null ==
            ra._instance && (ra._instance = new ra);
        return ra._instance
    };
    ra.__super__ = ja;
    ra.prototype = r(ja.prototype, {
        play: function() {
            return this._playback
        },
        get_duration: function() {
            return 0
        },
        onDisposed: function() {},
        __class__: ra
    });
    var Eb = function() {};
    e["flambe.sound.Playback"] = Eb;
    Eb.__name__ = ["flambe", "sound", "Playback"];
    Eb.__interfaces__ = [xa];
    Eb.prototype = {
        __class__: Eb
    };
    var ad = function(a) {
        this._sound = a;
        this.volume = new U(0);
        this._complete = new la(!0)
    };
    e["flambe.platform.DummyPlayback"] = ad;
    ad.__name__ = ["flambe", "platform",
        "DummyPlayback"
    ];
    ad.__interfaces__ = [Eb];
    ad.prototype = {
        get_sound: function() {
            return this._sound
        },
        get_paused: function() {
            return !0
        },
        set_paused: function() {
            return !0
        },
        get_position: function() {
            return 0
        },
        dispose: function() {},
        __class__: ad
    };
    var bd = function() {};
    e["flambe.subsystem.StorageSystem"] = bd;
    bd.__name__ = ["flambe", "subsystem", "StorageSystem"];
    bd.prototype = {
        __class__: bd
    };
    var Oc = function() {
        this.clear()
    };
    e["flambe.platform.DummyStorage"] = Oc;
    Oc.__name__ = ["flambe", "platform", "DummyStorage"];
    Oc.__interfaces__ = [bd];
    Oc.prototype = {
        set: function(a, b) {
            this._hash.set(a, b);
            return !0
        },
        get: function(a, b) {
            return this._hash.exists(a) ? this._hash.get(a) : b
        },
        clear: function() {
            this._hash = new ka
        },
        __class__: Oc
    };
    var Lc = function() {
        this.down = new Q;
        this.move = new Q;
        this.up = new Q
    };
    e["flambe.platform.DummyTouch"] = Lc;
    Lc.__name__ = ["flambe", "platform", "DummyTouch"];
    Lc.__interfaces__ = [Je];
    Lc.prototype = {
        __class__: Lc
    };
    var Xb = function() {
        this._entries = []
    };
    e["flambe.platform.EventGroup"] = Xb;
    Xb.__name__ = ["flambe", "platform", "EventGroup"];
    Xb.__interfaces__ = [xa];
    Xb.prototype = {
        addListener: function(a, b, c) {
            a.addEventListener(b, c, !1);
            this._entries.push(new Md(a, b, c))
        },
        addDisposingListener: function(a, b, c) {
            var f = this;
            this.addListener(a, b, function(a) {
                f.dispose();
                c(a)
            })
        },
        dispose: function() {
            for (var a = 0, b = this._entries; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispatcher.removeEventListener(c.type, c.listener, !1)
            }
            this._entries = []
        },
        __class__: Xb
    };
    var Md = function(a, b, c) {
        this.dispatcher = a;
        this.type = b;
        this.listener = c
    };
    e["flambe.platform._EventGroup.Entry"] = Md;
    Md.__name__ = ["flambe",
        "platform", "_EventGroup", "Entry"
    ];
    Md.prototype = {
        __class__: Md
    };
    var cd = function() {};
    e["flambe.platform.InternalGraphics"] = cd;
    cd.__name__ = ["flambe", "platform", "InternalGraphics"];
    cd.__interfaces__ = [Cd];
    cd.prototype = {
        __class__: cd
    };
    var Nd = function() {};
    e["flambe.subsystem.RendererSystem"] = Nd;
    Nd.__name__ = ["flambe", "subsystem", "RendererSystem"];
    Nd.prototype = {
        __class__: Nd
    };
    var dd = function() {};
    e["flambe.platform.InternalRenderer"] = dd;
    dd.__name__ = ["flambe", "platform", "InternalRenderer"];
    dd.__interfaces__ = [Nd];
    dd.prototype = {
        __class__: dd
    };
    var Id = function() {};
    e["flambe.platform.KeyCodes"] = Id;
    Id.__name__ = ["flambe", "platform", "KeyCodes"];
    Id.toKey = function(a) {
        switch (a) {
            case 65:
                return d.A;
            case 66:
                return d.B;
            case 67:
                return d.C;
            case 68:
                return d.D;
            case 69:
                return d.E;
            case 70:
                return d.F;
            case 71:
                return d.G;
            case 72:
                return d.H;
            case 73:
                return d.I;
            case 74:
                return d.J;
            case 75:
                return d.K;
            case 76:
                return d.L;
            case 77:
                return d.M;
            case 78:
                return d.N;
            case 79:
                return d.O;
            case 80:
                return d.P;
            case 81:
                return d.Q;
            case 82:
                return d.R;
            case 83:
                return d.S;
            case 84:
                return d.T;
            case 85:
                return d.U;
            case 86:
                return d.V;
            case 87:
                return d.W;
            case 88:
                return d.X;
            case 89:
                return d.Y;
            case 90:
                return d.Z;
            case 48:
                return d.Number0;
            case 49:
                return d.Number1;
            case 50:
                return d.Number2;
            case 51:
                return d.Number3;
            case 52:
                return d.Number4;
            case 53:
                return d.Number5;
            case 54:
                return d.Number6;
            case 55:
                return d.Number7;
            case 56:
                return d.Number8;
            case 57:
                return d.Number9;
            case 96:
                return d.Numpad0;
            case 97:
                return d.Numpad1;
            case 98:
                return d.Numpad2;
            case 99:
                return d.Numpad3;
            case 100:
                return d.Numpad4;
            case 101:
                return d.Numpad5;
            case 102:
                return d.Numpad6;
            case 103:
                return d.Numpad7;
            case 104:
                return d.Numpad8;
            case 105:
                return d.Numpad9;
            case 107:
                return d.NumpadAdd;
            case 110:
                return d.NumpadDecimal;
            case 111:
                return d.NumpadDivide;
            case 108:
                return d.NumpadEnter;
            case 106:
                return d.NumpadMultiply;
            case 109:
                return d.NumpadSubtract;
            case 112:
                return d.F1;
            case 113:
                return d.F2;
            case 114:
                return d.F3;
            case 115:
                return d.F4;
            case 116:
                return d.F5;
            case 117:
                return d.F6;
            case 118:
                return d.F7;
            case 119:
                return d.F8;
            case 120:
                return d.F9;
            case 121:
                return d.F10;
            case 122:
                return d.F11;
            case 123:
                return d.F12;
            case 37:
                return d.Left;
            case 38:
                return d.Up;
            case 39:
                return d.Right;
            case 40:
                return d.Down;
            case 18:
                return d.Alt;
            case 192:
                return d.Backquote;
            case 220:
                return d.Backslash;
            case 8:
                return d.Backspace;
            case 20:
                return d.CapsLock;
            case 188:
                return d.Comma;
            case 15:
                return d.Command;
            case 17:
                return d.Control;
            case 46:
                return d.Delete;
            case 35:
                return d.End;
            case 13:
                return d.Enter;
            case 187:
                return d.Equals;
            case 27:
                return d.Escape;
            case 36:
                return d.Home;
            case 45:
                return d.Insert;
            case 219:
                return d.LeftBracket;
            case 189:
                return d.Minus;
            case 34:
                return d.PageDown;
            case 33:
                return d.PageUp;
            case 190:
                return d.Period;
            case 222:
                return d.Quote;
            case 221:
                return d.RightBracket;
            case 186:
                return d.Semicolon;
            case 16:
                return d.Shift;
            case 191:
                return d.Slash;
            case 32:
                return d.Space;
            case 9:
                return d.Tab;
            case 16777234:
                return d.Menu;
            case 16777247:
                return d.Search
        }
        return d.Unknown(a)
    };
    var zb = function() {
        this._tickables = []
    };
    e["flambe.platform.MainLoop"] = zb;
    zb.__name__ = ["flambe", "platform", "MainLoop"];
    zb.updateEntity =
        function(a, b) {
            var c = a._compMap.SpeedAdjuster_5;
            if (null != c && (c._realDt = b, b *= c.scale._value, 0 >= b)) {
                c.onUpdate(b);
                return
            }
            for (c = a.firstComponent; null != c;) {
                var f = c.next;
                0 == (c._flags & 1) && (c._flags |= 1, c.onStart());
                c.onUpdate(b);
                c = f
            }
            for (c = a.firstChild; null != c;) f = c.next, zb.updateEntity(c, b), c = f
        };
    zb.prototype = {
        update: function(a) {
            if (!(0 >= a)) {
                1 < a && (a = 1);
                for (var b = 0; b < this._tickables.length;) {
                    var c = this._tickables[b];
                    null == c || c.update(a) ? this._tickables.splice(b, 1) : ++b
                }
                h.volume.update(a);
                zb.updateEntity(h.root,
                    a)
            }
        },
        render: function(a) {
            var b = a.graphics;
            null != b && (a.willRender(), I.render(h.root, b), a.didRender())
        },
        addTickable: function(a) {
            this._tickables.push(a)
        },
        __class__: zb
    };
    var Kd = function() {};
    e["flambe.platform.MouseCodes"] = Kd;
    Kd.__name__ = ["flambe", "platform", "MouseCodes"];
    Kd.toButton = function(a) {
        switch (a) {
            case 0:
                return oa.Left;
            case 1:
                return oa.Middle;
            case 2:
                return oa.Right
        }
        return oa.Unknown(a)
    };
    var Zf = function() {};
    e["flambe.platform.TextureRoot"] = Zf;
    Zf.__name__ = ["flambe", "platform", "TextureRoot"];
    var ed =
        function() {};
    e["flambe.platform.Tickable"] = ed;
    ed.__name__ = ["flambe", "platform", "Tickable"];
    ed.prototype = {
        __class__: ed
    };
    var fd = function(a, b) {
        this._firstDraw = !1;
        this._canvasCtx = a.getContext("2d", {
            alpha: b
        })
    };
    e["flambe.platform.html.CanvasGraphics"] = fd;
    fd.__name__ = ["flambe", "platform", "html", "CanvasGraphics"];
    fd.__interfaces__ = [cd];
    fd.prototype = {
        save: function() {
            this._canvasCtx.save()
        },
        transform: function(a, b, c, f, d, e) {
            this._canvasCtx.transform(a, b, c, f, d, e)
        },
        restore: function() {
            this._canvasCtx.restore()
        },
        drawTexture: function(a, b, c) {
            this.drawSubTexture(a, b, c, 0, 0, a.get_width(), a.get_height())
        },
        drawSubTexture: function(a, b, c, f, d, e, g) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawSubTexture(a, b, c, f, d, e, g), this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.root.image, a.rootX + f | 0, a.rootY + d | 0, e | 0, g | 0, b | 0, c | 0, e | 0, g | 0)
        },
        fillRect: function(a, b, c, f, d) {
            if (this._firstDraw) this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy",
                this.fillRect(a, b, c, f, d), this._canvasCtx.globalCompositeOperation = "source-over";
            else {
                for (a = (16777215 & a).toString(16); 6 > a.length;) a = "0" + t.string(a);
                this._canvasCtx.fillStyle = "#" + t.string(a);
                this._canvasCtx.fillRect(b | 0, c | 0, f | 0, d | 0)
            }
        },
        multiplyAlpha: function(a) {
            this._canvasCtx.globalAlpha *= a
        },
        setBlendMode: function(a) {
            var b;
            switch (a[1]) {
                case 0:
                    b = "source-over";
                    break;
                case 1:
                    b = "lighter";
                    break;
                case 2:
                    b = "multiply";
                    break;
                case 3:
                    b = "screen";
                    break;
                case 4:
                    b = "destination-in";
                    break;
                case 5:
                    b = "copy"
            }
            this._canvasCtx.globalCompositeOperation =
                b
        },
        applyScissor: function(a, b, c, f) {
            this._canvasCtx.beginPath();
            this._canvasCtx.rect(a | 0, b | 0, c | 0, f | 0);
            this._canvasCtx.clip()
        },
        willRender: function() {
            this._firstDraw = !0
        },
        didRender: function() {},
        __class__: fd
    };
    var Ab = function(a) {
        this.graphics = new fd(a, !1);
        this._hasGPU = new la(!0)
    };
    e["flambe.platform.html.CanvasRenderer"] = Ab;
    Ab.__name__ = ["flambe", "platform", "html", "CanvasRenderer"];
    Ab.__interfaces__ = [dd];
    Ab.prototype = {
        get_type: function() {
            return db.Canvas
        },
        createTextureFromImage: function(a) {
            a = new Yb(Ab.CANVAS_TEXTURES ?
                C.createCanvas(a) : a);
            return a.createTexture(a.width, a.height)
        },
        getCompressedTextureFormats: function() {
            return []
        },
        createCompressedTexture: function() {
            return null
        },
        willRender: function() {
            this.graphics.willRender()
        },
        didRender: function() {
            this.graphics.didRender()
        },
        __class__: Ab
    };
    var gd = function(a, b, c) {
        rb.call(this, a, b, c)
    };
    e["flambe.platform.html.CanvasTexture"] = gd;
    gd.__name__ = ["flambe", "platform", "html", "CanvasTexture"];
    gd.__super__ = rb;
    gd.prototype = r(rb.prototype, {
        __class__: gd
    });
    var Yb = function(a) {
        this._graphics =
            null;
        this._disposed = !1;
        this.image = a;
        this.width = a.width;
        this.height = a.height
    };
    e["flambe.platform.html.CanvasTextureRoot"] = Yb;
    Yb.__name__ = ["flambe", "platform", "html", "CanvasTextureRoot"];
    Yb.__interfaces__ = [Zf];
    Yb.__super__ = ja;
    Yb.prototype = r(ja.prototype, {
        createTexture: function(a, b) {
            return new gd(this, a, b)
        },
        onDisposed: function() {
            this._graphics = this.image = null
        },
        __class__: Yb
    });
    var L = function(a, b) {
        pb.call(this, a, b)
    };
    e["flambe.platform.html.HtmlAssetPackLoader"] = L;
    L.__name__ = ["flambe", "platform", "html",
        "HtmlAssetPackLoader"
    ];
    L.detectImageFormats = function(a) {
        var b = [s.PNG, s.JPG, s.GIF],
            c = 2,
            f;
        f = window.document.createElement("img");
        f.onload = f.onerror = function() {
            1 == f.width && b.unshift(s.WEBP);
            --c;
            0 == c && a(b)
        };
        f.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
        var d;
        d = window.document.createElement("img");
        d.onload = d.onerror = function() {
            1 == d.width && b.unshift(s.JXR);
            --c;
            0 == c && a(b)
        };
        d.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA=="
    };
    L.detectAudioFormats = function() {
        var a;
        a = window.document.createElement("audio");
        if (null == a || null == R(a, a.canPlayType)) return [];
        var b = new wa("\\b(iPhone|iPod|iPad|Android|Windows Phone)\\b", ""),
            c = new wa("\\bCrosswalk\\b", ""),
            f = window.navigator.userAgent;
        if (!H.get_supported() && b.match(f) && !c.match(f)) return [];
        b = [{
            format: s.M4A,
            mimeType: "audio/mp4; codecs=mp4a"
        }, {
            format: s.MP3,
            mimeType: "audio/mpeg"
        }, {
            format: s.OPUS,
            mimeType: "audio/ogg; codecs=opus"
        }, {
            format: s.OGG,
            mimeType: "audio/ogg; codecs=vorbis"
        }, {
            format: s.WAV,
            mimeType: "audio/wav"
        }];
        c = [];
        for (f = 0; f < b.length;) {
            var d = b[f];
            ++f;
            var e = "";
            try {
                e = a.canPlayType(d.mimeType)
            } catch (g) {
                g instanceof n && (g = g.val)
            }
            "" != e && c.push(d.format)
        }
        return c
    };
    L.supportsBlob = function() {
        if (L._detectBlobSupport) {
            L._detectBlobSupport = !1;
            if ((new wa("\\bSilk\\b", "")).match(window.navigator.userAgent) || null == window.Blob) return !1;
            var a = new XMLHttpRequest;
            a.open("GET", ".", !0);
            if ("" != a.responseType) return !1;
            a.responseType = "blob";
            if ("blob" != a.responseType) return !1;
            L._URL = C.loadExtension("URL").value
        }
        return null !=
            L._URL && null != L._URL.createObjectURL
    };
    L.__super__ = pb;
    L.prototype = r(pb.prototype, {
        loadEntry: function(a, b) {
            var c = this;
            switch (b.format[1]) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    var f;
                    f = window.document.createElement("img");
                    var d = new Xb;
                    d.addDisposingListener(f, "load", function() {
                        L.supportsBlob() && L._URL.revokeObjectURL(f.src);
                        var a = c._platform.getRenderer().createTextureFromImage(f);
                        null != a ? c.handleLoad(b, a) : c.handleTextureError(b)
                    });
                    d.addDisposingListener(f, "error", function() {
                        c.handleError(b, "Failed to load image")
                    });
                    L.supportsBlob() ? this.download(a, b, "blob", function(a) {
                        f.src = L._URL.createObjectURL(a)
                    }) : f.src = a;
                    break;
                case 5:
                case 6:
                case 7:
                    this.download(a, b, "arraybuffer", function() {
                        var a = c._platform.getRenderer().createCompressedTexture(b.format, null);
                        null != a ? c.handleLoad(b, a) : c.handleTextureError(b)
                    });
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    if (H.get_supported()) this.download(a, b, "arraybuffer", function(a) {
                        H.ctx.decodeAudioData(a, function(a) {
                            c.handleLoad(b, new H(a))
                        }, function() {
                            c.handleLoad(b, ra.getInstance())
                        })
                    });
                    else {
                        var e;
                        e = window.document.createElement("audio");
                        e.preload = "auto";
                        var g = ++L._mediaRefCount;
                        null == L._mediaElements && (L._mediaElements = new qa);
                        L._mediaElements.h[g] = e;
                        d = new Xb;
                        d.addDisposingListener(e, "canplaythrough", function() {
                            L._mediaElements.remove(g);
                            c.handleLoad(b, new Zb(e))
                        });
                        d.addDisposingListener(e, "error", function() {
                            L._mediaElements.remove(g);
                            var a = e.error.code;
                            3 == a || 4 == a ? c.handleLoad(b, ra.getInstance()) : c.handleError(b, "Failed to load audio: " + e.error.code)
                        });
                        d.addListener(e, "progress",
                            function() {
                                if (0 < e.buffered.length && 0 < e.duration) {
                                    var a = e.buffered.end(0) / e.duration;
                                    c.handleProgress(b, a * b.bytes | 0)
                                }
                            });
                        e.src = a;
                        e.load()
                    }
                    break;
                case 13:
                    this.download(a, b, "text", function(a) {
                        c.handleLoad(b, new Wb(a))
                    })
            }
        },
        getAssetFormats: function(a) {
            var b = this;
            null == L._supportedFormats && (L._supportedFormats = new Tb, L.detectImageFormats(function(a) {
                L._supportedFormats.set_result(b._platform.getRenderer().getCompressedTextureFormats().concat(a).concat(L.detectAudioFormats()).concat([s.Data]))
            }));
            L._supportedFormats.get(a)
        },
        download: function(a, b, c, f) {
            var d = this,
                e = null,
                g = null,
                i = 0,
                h = !1,
                k = function() {
                    h && (h = !1, window.clearInterval(i))
                },
                m = 3,
                j = function() {
                    --m;
                    return 0 <= m ? (g(), !0) : !1
                },
                g = function() {
                    k();
                    null != e && e.abort();
                    e = new XMLHttpRequest;
                    e.open("GET", a, !0);
                    e.responseType = c;
                    var g = 0;
                    e.onprogress = function(a) {
                        h || (h = !0, i = window.setInterval(function() {
                            4 != e.readyState && 5E3 < Date.now() - g && !j() && (k(), d.handleError(b, "Download stalled"))
                        }, 1E3));
                        g = Date.now();
                        d.handleProgress(b, a.loaded)
                    };
                    e.onerror = function() {
                        if (0 != e.status || !j()) k(),
                            d.handleError(b, "HTTP error " + e.status)
                    };
                    e.onload = function() {
                        var a = e.response;
                        null == a && (a = e.responseText);
                        k();
                        f(a)
                    };
                    e.send()
                };
            g()
        },
        __class__: L
    });
    var Od = function() {};
    e["flambe.subsystem.ExternalSystem"] = Od;
    Od.__name__ = ["flambe", "subsystem", "ExternalSystem"];
    Od.prototype = {
        __class__: Od
    };
    var Qc = function() {};
    e["flambe.platform.html.HtmlExternal"] = Qc;
    Qc.__name__ = ["flambe", "platform", "html", "HtmlExternal"];
    Qc.__interfaces__ = [Od];
    Qc.prototype = {
        call: function(a, b) {
            null == b && (b = []);
            for (var c = window, f = c, d = 0, e =
                    a.split("."); d < e.length;) {
                var g = e[d];
                ++d;
                c = f;
                f = K.field(c, g)
            }
            return f.apply(c, b)
        },
        bind: function(a, b) {
            K.setField(window, a, b)
        },
        __class__: Qc
    };
    var Jc = function(a, b) {
        ma.call(this, a);
        this._canvas = b
    };
    e["flambe.platform.html.HtmlMouse"] = Jc;
    Jc.__name__ = ["flambe", "platform", "html", "HtmlMouse"];
    Jc.__super__ = ma;
    Jc.prototype = r(ma.prototype, {
        set_cursor: function(a) {
            var b;
            switch (a[1]) {
                case 0:
                    b = "";
                    break;
                case 1:
                    b = "pointer";
                    break;
                case 2:
                    b = "none"
            }
            this._canvas.style.cursor = b;
            return ma.prototype.set_cursor.call(this, a)
        },
        __class__: Jc
    });
    var Zb = function(a) {
        this._disposed = !1;
        this.audioElement = a
    };
    e["flambe.platform.html.HtmlSound"] = Zb;
    Zb.__name__ = ["flambe", "platform", "html", "HtmlSound"];
    Zb.__interfaces__ = [Db];
    Zb.__super__ = ja;
    Zb.prototype = r(ja.prototype, {
        play: function(a) {
            null == a && (a = 1);
            return new hd(this, a, !1)
        },
        get_duration: function() {
            return this.audioElement.duration
        },
        onDisposed: function() {
            this.audioElement = null
        },
        __class__: Zb
    });
    var hd = function(a, b, c) {
        var f = this;
        this._sound = a;
        this._tickableAdded = !1;
        this._clonedElement =
            window.document.createElement("audio");
        this._clonedElement.loop = c;
        this._clonedElement.src = a.audioElement.src;
        this.volume = new U(b, function() {
            f.updateVolume()
        });
        this.updateVolume();
        this._complete = new la(!1);
        this.playAudio();
        h.hidden._value && this.set_paused(!0)
    };
    e["flambe.platform.html._HtmlSound.HtmlPlayback"] = hd;
    hd.__name__ = ["flambe", "platform", "html", "_HtmlSound", "HtmlPlayback"];
    hd.__interfaces__ = [ed, Eb];
    hd.prototype = {
        get_sound: function() {
            return this._sound
        },
        get_paused: function() {
            return this._clonedElement.paused
        },
        set_paused: function(a) {
            this._clonedElement.paused != a && (a ? this._clonedElement.pause() : this.playAudio());
            return a
        },
        get_position: function() {
            return this._clonedElement.currentTime
        },
        update: function(a) {
            this.volume.update(a);
            this._complete.set__(this._clonedElement.ended);
            return this._complete._value || this._clonedElement.paused ? (this._tickableAdded = !1, this._volumeBinding.dispose(), this._hideBinding.dispose(), !0) : !1
        },
        dispose: function() {
            this.set_paused(!0);
            this._complete.set__(!0)
        },
        playAudio: function() {
            var a =
                this;
            this._clonedElement.play();
            this._tickableAdded || (cb.instance.mainLoop.addTickable(this), this._tickableAdded = !0, this._volumeBinding = h.volume.get_changed().connect(function() {
                a.updateVolume()
            }), this._hideBinding = h.hidden.get_changed().connect(function(b) {
                b ? (a._wasPaused = a._clonedElement.paused, a.set_paused(!0)) : a.set_paused(a._wasPaused)
            }))
        },
        updateVolume: function() {
            this._clonedElement.volume = h.volume._value * this.volume._value
        },
        __class__: hd
    };
    var Pd = function() {};
    e["flambe.subsystem.StageSystem"] =
        Pd;
    Pd.__name__ = ["flambe", "subsystem", "StageSystem"];
    Pd.prototype = {
        __class__: Pd
    };
    var yb = function(a) {
        var b = this;
        this._canvas = a;
        this.resize = new qb;
        this.preResize = new qb;
        this.scaleFactor = yb.computeScaleFactor();
        1 != this.scaleFactor && (C.setVendorStyle(this._canvas, "transform-origin", "top left"), C.setVendorStyle(this._canvas, "transform", "scale(" + 1 / this.scaleFactor + ")"));
        C.SHOULD_HIDE_MOBILE_BROWSER && (window.addEventListener("orientationchange", function() {
            C.callLater(R(b, b.hideMobileBrowser), 200)
        }, !1), this.hideMobileBrowser());
        window.addEventListener("resize", R(this, this.onWindowResize), !1);
        this.onWindowResize(null);
        this.orientation = new la(null);
        null != window.orientation && (window.addEventListener("orientationchange", R(this, this.onOrientationChange), !1), this.onOrientationChange(null));
        this.fullscreen = new la(!1);
        C.addVendorListener(window.document, "fullscreenchange", function() {
            b.updateFullscreen()
        }, !1);
        this.updateFullscreen()
    };
    e["flambe.platform.html.HtmlStage"] = yb;
    yb.__name__ = ["flambe", "platform", "html", "HtmlStage"];
    yb.__interfaces__ = [Pd];
    yb.computeScaleFactor = function() {
        var a = window.devicePixelRatio;
        null == a && (a = 1);
        var b = window.document.createElement("canvas").getContext("2d", null),
            b = C.loadExtension("backingStorePixelRatio", b).value;
        null == b && (b = 1);
        a /= b;
        b = window.screen.height;
        return 1136 < a * window.screen.width || 1136 < a * b ? 1 : a
    };
    yb.prototype = {
        get_width: function() {
            return this._canvas.width
        },
        get_height: function() {
            return this._canvas.height
        },
        requestResize: function(a, b) {
            if (this.resizeCanvas(a, b)) {
                var c = this._canvas.parentElement;
                c.style.width =
                    a + "px";
                c.style.height = b + "px"
            }
        },
        requestFullscreen: function(a) {
            null == a && (a = !0);
            if (a) {
                var a = window.document.documentElement,
                    b = C.loadFirstExtension(["requestFullscreen", "requestFullScreen"], a).value;
                null != b && b.apply(a, [])
            } else a = C.loadFirstExtension(["cancelFullscreen", "cancelFullScreen"], window.document).value, null != a && K.callMethod(window.document, a, [])
        },
        onWindowResize: function() {
            this.preResize.emit();
            var a = this._canvas.parentElement.getBoundingClientRect();
            this.resizeCanvas(a.width, a.height)
        },
        resizeCanvas: function(a,
            b) {
            var c = this.scaleFactor * a,
                f = this.scaleFactor * b;
            if (this._canvas.width == c && this._canvas.height == f) return !1;
            this._canvas.width = c | 0;
            this._canvas.height = f | 0;
            this.resize.emit();
            return !0
        },
        hideMobileBrowser: function() {
            var a = this,
                b = window.document.documentElement.style;
            b.height = window.innerHeight + 100 + "px";
            b.width = window.innerWidth + "px";
            b.overflow = "visible";
            C.callLater(function() {
                C.hideMobileBrowser();
                C.callLater(function() {
                    b.height = window.innerHeight + "px";
                    a.onWindowResize(null)
                }, 100)
            })
        },
        onOrientationChange: function() {
            this.orientation.set__(C.orientation(window.orientation))
        },
        updateFullscreen: function() {
            this.fullscreen.set__(!0 == C.loadFirstExtension(["fullscreen", "fullScreen", "isFullScreen"], window.document).value)
        },
        __class__: yb
    };
    var Nc = function(a) {
        this._storage = a
    };
    e["flambe.platform.html.HtmlStorage"] = Nc;
    Nc.__name__ = ["flambe", "platform", "html", "HtmlStorage"];
    Nc.__interfaces__ = [bd];
    Nc.prototype = {
        set: function(a, b) {
            var c;
            try {
                var f = new ya;
                f.useCache = !0;
                f.useEnumIndex = !1;
                f.serialize(b);
                c = f.toString()
            } catch (d) {
                return d instanceof n && (d = d.val), !1
            }
            try {
                this._storage.setItem("flambe:" +
                    a, c)
            } catch (e) {
                return e instanceof n && (e = e.val), !1
            }
            return !0
        },
        get: function(a, b) {
            var c = null;
            try {
                c = this._storage.getItem("flambe:" + a)
            } catch (f) {
                f instanceof n && (f = f.val), null
            }
            if (null != c) try {
                return ba.run(c)
            } catch (d) {
                d instanceof n && (d = d.val), null
            }
            return b
        },
        __class__: Nc
    };
    var C = function() {};
    e["flambe.platform.html.HtmlUtil"] = C;
    C.__name__ = ["flambe", "platform", "html", "HtmlUtil"];
    C.callLater = function(a, b) {
        null == b && (b = 0);
        window.setTimeout(a, b)
    };
    C.hideMobileBrowser = function() {
        window.scrollTo(1, 0)
    };
    C.loadExtension =
        function(a, b) {
            null == b && (b = window);
            var c = K.field(b, a);
            if (null != c) return {
                prefix: "",
                field: a,
                value: c
            };
            for (var c = a.charAt(0).toUpperCase() + y.substr(a, 1, null), f = 0, d = C.VENDOR_PREFIXES; f < d.length;) {
                var e = d[f];
                ++f;
                var g = e + c,
                    i = K.field(b, g);
                if (null != i) return {
                    prefix: e,
                    field: g,
                    value: i
                }
            }
            return {
                prefix: null,
                field: null,
                value: null
            }
        };
    C.loadFirstExtension = function(a, b) {
        for (var c = 0; c < a.length;) {
            var f = a[c];
            ++c;
            f = C.loadExtension(f, b);
            if (null != f.field) return f
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    C.polyfill = function(a,
        b) {
        null == b && (b = window);
        var c = C.loadExtension(a, b).value;
        if (null == c) return !1;
        b[a] = c;
        return !0
    };
    C.setVendorStyle = function(a, b, c) {
        for (var a = a.style, f = 0, d = C.VENDOR_PREFIXES; f < d.length;) {
            var e = d[f];
            ++f;
            a.setProperty("-" + e + "-" + b, c)
        }
        a.setProperty(b, c)
    };
    C.addVendorListener = function(a, b, c, f) {
        for (var d = 0, e = C.VENDOR_PREFIXES; d < e.length;) {
            var g = e[d];
            ++d;
            a.addEventListener(g + b, c, f)
        }
        a.addEventListener(b, c, f)
    };
    C.orientation = function(a) {
        switch (a) {
            case -90:
            case 90:
                return mb.Landscape;
            default:
                return mb.Portrait
        }
    };
    C.createEmptyCanvas =
        function(a, b) {
            var c;
            c = window.document.createElement("canvas");
            c.width = a;
            c.height = b;
            return c
        };
    C.createCanvas = function(a) {
        var b = C.createEmptyCanvas(a.width, a.height),
            c = b.getContext("2d", null);
        c.save();
        c.globalCompositeOperation = "copy";
        c.drawImage(a, 0, 0);
        c.restore();
        return b
    };
    C.fixAndroidMath = function() {
        if (0 <= window.navigator.userAgent.indexOf("Linux; U; Android 4")) {
            var a = Math.sin,
                b = Math.cos;
            Math.sin = function(b) {
                return 0 == b ? 0 : a(b)
            };
            Math.cos = function(a) {
                return 0 == a ? 1 : b(a)
            }
        }
    };
    var Qd = function() {};
    e["flambe.subsystem.WebSystem"] =
        Qd;
    Qd.__name__ = ["flambe", "subsystem", "WebSystem"];
    Qd.prototype = {
        __class__: Qd
    };
    var Pc = function(a) {
        this._container = a
    };
    e["flambe.platform.html.HtmlWeb"] = Pc;
    Pc.__name__ = ["flambe", "platform", "html", "HtmlWeb"];
    Pc.__interfaces__ = [Qd];
    Pc.prototype = {
        openBrowser: function(a) {
            window.open(a, "_blank")
        },
        __class__: Pc
    };
    var H = function(a) {
        this._disposed = !1;
        this.buffer = a
    };
    e["flambe.platform.html.WebAudioSound"] = H;
    H.__name__ = ["flambe", "platform", "html", "WebAudioSound"];
    H.__interfaces__ = [Db];
    H.get_supported = function() {
        if (H._detectSupport) {
            H._detectSupport = !1;
            var a = C.loadExtension("AudioContext").value;
            null != a && (H.ctx = new a, H.gain = H.createGain(), H.gain.connect(H.ctx.destination), h.volume.watch(function(a) {
                H.gain.gain.value = a
            }))
        }
        return null != H.ctx
    };
    H.createGain = function() {
        return null != H.ctx.createGain ? H.ctx.createGain() : H.ctx.createGainNode()
    };
    H.start = function(a, b) {
        null != a.start ? a.start(b) : a.noteOn(b)
    };
    H.__super__ = ja;
    H.prototype = r(ja.prototype, {
        play: function(a) {
            null == a && (a = 1);
            return new id(this, a, !1)
        },
        get_duration: function() {
            return this.buffer.duration
        },
        onDisposed: function() {
            this.buffer = null
        },
        __class__: H
    });
    var id = function(a, b, c) {
        var f = this;
        this._sound = a;
        this._head = H.gain;
        this._complete = new la(!1);
        this._sourceNode = H.ctx.createBufferSource();
        this._sourceNode.buffer = a.buffer;
        this._sourceNode.loop = c;
        this._sourceNode.onended = function() {
            f._complete.set__(!0)
        };
        H.start(this._sourceNode, 0);
        this.playAudio();
        this.volume = new U(b, function(a) {
            f.setVolume(a)
        });
        1 != b && this.setVolume(b);
        h.hidden._value && this.set_paused(!0)
    };
    e["flambe.platform.html._WebAudioSound.WebAudioPlayback"] =
        id;
    id.__name__ = ["flambe", "platform", "html", "_WebAudioSound", "WebAudioPlayback"];
    id.__interfaces__ = [ed, Eb];
    id.prototype = {
        get_sound: function() {
            return this._sound
        },
        get_paused: function() {
            return 0 <= this._pausedAt
        },
        set_paused: function(a) {
            a != 0 <= this._pausedAt && (a ? (this._sourceNode.disconnect(), this._pausedAt = this.get_position()) : this.playAudio());
            return a
        },
        get_position: function() {
            return this._complete._value ? this._sound.get_duration() : 0 <= this._pausedAt ? this._pausedAt : (H.ctx.currentTime - this._startedAt) %
                this._sound.get_duration()
        },
        update: function(a) {
            this.volume.update(a);
            3 == this._sourceNode.playbackState && this._complete.set__(!0);
            return this._complete._value || 0 <= this._pausedAt ? (this._tickableAdded = !1, this._hideBinding.dispose(), !0) : !1
        },
        dispose: function() {
            this.set_paused(!0);
            this._complete.set__(!0)
        },
        setVolume: function(a) {
            null == this._gainNode && (this._gainNode = H.createGain(), this.insertNode(this._gainNode));
            this._gainNode.gain.value = a
        },
        insertNode: function(a) {
            0 <= this._pausedAt || (this._sourceNode.disconnect(),
                this._sourceNode.connect(a));
            a.connect(this._head);
            this._head = a
        },
        playAudio: function() {
            var a = this;
            this._sourceNode.connect(this._head);
            this._startedAt = H.ctx.currentTime;
            this._pausedAt = -1;
            this._tickableAdded || (cb.instance.mainLoop.addTickable(this), this._tickableAdded = !0, this._hideBinding = h.hidden.get_changed().connect(function(b) {
                b ? (a._wasPaused = 0 <= a._pausedAt, a.set_paused(!0)) : a.set_paused(a._wasPaused)
            }))
        },
        __class__: id
    };
    var yc = function() {
        this._width = this._height = -1;
        this._transitor = null;
        z.call(this);
        this.scenes = [];
        this.occludedScenes = [];
        this._root = new M
    };
    e["flambe.scene.Director"] = yc;
    yc.__name__ = ["flambe", "scene", "Director"];
    yc.__super__ = z;
    yc.prototype = r(z.prototype, {
        get_name: function() {
            return "Director_3"
        },
        setSize: function(a, b) {
            this._width = a;
            this._height = b;
            return this
        },
        pushScene: function(a, b) {
            var c = this;
            this.completeTransition();
            var f = this.get_topScene();
            null != f ? this.playTransition(f, a, b, function() {
                c.hide(f)
            }) : (this.add(a), this.invalidateVisibility())
        },
        unwindToScene: function(a, b) {
            var c = this;
            this.completeTransition();
            var f = this.get_topScene();
            if (null != f) {
                if (f != a) {
                    for (this.scenes.pop(); 0 < this.scenes.length && this.scenes[this.scenes.length - 1] != a;) this.scenes.pop().dispose();
                    this.playTransition(f, a, b, function() {
                        c.hideAndDispose(f)
                    })
                }
            } else this.pushScene(a, b)
        },
        onAdded: function() {
            this.owner.addChild(this._root)
        },
        onRemoved: function() {
            this.completeTransition();
            for (var a = 0, b = this.scenes; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispose()
            }
            this.scenes = [];
            this.occludedScenes = [];
            this._root.dispose()
        },
        onUpdate: function(a) {
            null !=
                this._transitor && this._transitor.update(a) && this.completeTransition()
        },
        get_topScene: function() {
            var a = this.scenes.length;
            return 0 < a ? this.scenes[a - 1] : null
        },
        add: function(a) {
            var b = this.get_topScene();
            null != b && this._root.removeChild(b);
            y.remove(this.scenes, a);
            this.scenes.push(a);
            this._root.addChild(a)
        },
        hide: function(a) {
            a = a._compMap.Scene_6;
            null != a && a.hidden.emit()
        },
        hideAndDispose: function(a) {
            this.hide(a);
            a.dispose()
        },
        show: function(a) {
            a = a._compMap.Scene_6;
            null != a && a.shown.emit()
        },
        invalidateVisibility: function() {
            for (var a =
                    this.scenes.length; 0 < a;) {
                var b = this.scenes[--a]._compMap.Scene_6;
                if (null == b || b.opaque) break
            }
            this.occludedScenes = 0 < this.scenes.length ? this.scenes.slice(a, this.scenes.length - 1) : [];
            a = this.get_topScene();
            null != a && this.show(a)
        },
        completeTransition: function() {
            null != this._transitor && (this._transitor.complete(), this._transitor = null, this.invalidateVisibility())
        },
        playTransition: function(a, b, c, f) {
            this.completeTransition();
            this.add(b);
            null != c ? (this.occludedScenes.push(a), this._transitor = new Rd(a, b, c, f), this._transitor.init(this)) :
                (f(), this.invalidateVisibility())
        },
        __class__: yc
    });
    var Rd = function(a, b, c, f) {
        this._from = a;
        this._to = b;
        this._transition = c;
        this._onComplete = f
    };
    e["flambe.scene._Director.Transitor"] = Rd;
    Rd.__name__ = ["flambe", "scene", "_Director", "Transitor"];
    Rd.prototype = {
        init: function(a) {
            this._transition.init(a, this._from, this._to)
        },
        update: function(a) {
            return this._transition.update(a)
        },
        complete: function() {
            this._transition.complete();
            this._onComplete()
        },
        __class__: Rd
    };
    var $b = function() {};
    e["flambe.scene.Transition"] = $b;
    $b.__name__ = ["flambe", "scene", "Transition"];
    $b.prototype = {
        init: function(a, b, c) {
            this._director = a;
            this._from = b;
            this._to = c
        },
        update: function() {
            return !0
        },
        complete: function() {},
        __class__: $b
    };
    var eb = function(a, b) {
        this._duration = a;
        this._ease = null != b ? b : Sb.linear
    };
    e["flambe.scene.TweenTransition"] = eb;
    eb.__name__ = ["flambe", "scene", "TweenTransition"];
    eb.__super__ = $b;
    eb.prototype = r($b.prototype, {
        init: function(a, b, c) {
            $b.prototype.init.call(this, a, b, c);
            this._elapsed = 0
        },
        update: function(a) {
            this._elapsed += a;
            return this._elapsed >=
                this._duration
        },
        interp: function(a, b) {
            return a + (b - a) * this._ease(this._elapsed / this._duration)
        },
        __class__: eb
    });
    var Dc = function(a, b) {
        eb.call(this, a, b)
    };
    e["flambe.scene.FadeTransition"] = Dc;
    Dc.__name__ = ["flambe", "scene", "FadeTransition"];
    Dc.__super__ = eb;
    Dc.prototype = r(eb.prototype, {
        init: function(a, b, c) {
            eb.prototype.init.call(this, a, b, c);
            a = this._to._compMap.Sprite_0;
            null == a && this._to.add(a = new I);
            a.alpha.set__(0)
        },
        update: function(a) {
            a = eb.prototype.update.call(this, a);
            this._to._compMap.Sprite_0.alpha.set__(this.interp(0,
                1));
            return a
        },
        complete: function() {
            this._to._compMap.Sprite_0.alpha.set__(1)
        },
        __class__: Dc
    });
    var Sd = function() {};
    e["flambe.scene.Scene"] = Sd;
    Sd.__name__ = ["flambe", "scene", "Scene"];
    Sd.__super__ = z;
    Sd.prototype = r(z.prototype, {
        get_name: function() {
            return "Scene_6"
        },
        __class__: Sd
    });
    var ac = function() {};
    e["flambe.script.Action"] = ac;
    ac.__name__ = ["flambe", "script", "Action"];
    ac.prototype = {
        __class__: ac
    };
    var Kb = function(a) {
        this._fn = a
    };
    e["flambe.script.CallFunction"] = Kb;
    Kb.__name__ = ["flambe", "script", "CallFunction"];
    Kb.__interfaces__ = [ac];
    Kb.prototype = {
        update: function() {
            this._fn();
            return 0
        },
        __class__: Kb
    };
    var xc = function(a) {
        this._duration = a;
        this._elapsed = 0
    };
    e["flambe.script.Delay"] = xc;
    xc.__name__ = ["flambe", "script", "Delay"];
    xc.__interfaces__ = [ac];
    xc.prototype = {
        update: function(a) {
            this._elapsed += a;
            if (this._elapsed >= this._duration) {
                var b = this._elapsed - this._duration;
                this._elapsed = 0;
                return a - b
            }
            return -1
        },
        __class__: xc
    };
    var vc = function() {
        z.call(this);
        this.stopAll()
    };
    e["flambe.script.Script"] = vc;
    vc.__name__ = ["flambe",
        "script", "Script"
    ];
    vc.__super__ = z;
    vc.prototype = r(z.prototype, {
        get_name: function() {
            return "Script_4"
        },
        run: function(a) {
            a = new jd(a);
            this._handles.push(a);
            return a
        },
        stopAll: function() {
            this._handles = []
        },
        onUpdate: function(a) {
            for (var b = 0; b < this._handles.length;) {
                var c = this._handles[b];
                c.removed || 0 <= c.action.update(a, this.owner) ? this._handles.splice(b, 1) : ++b
            }
        },
        __class__: vc
    });
    var jd = function(a) {
        this.removed = !1;
        this.action = a
    };
    e["flambe.script._Script.Handle"] = jd;
    jd.__name__ = ["flambe", "script", "_Script", "Handle"];
    jd.__interfaces__ = [xa];
    jd.prototype = {
        dispose: function() {
            this.removed = !0;
            this.action = null
        },
        __class__: jd
    };
    var wc = function(a) {
        this._idx = 0;
        this._runningActions = null != a ? a.slice() : []
    };
    e["flambe.script.Sequence"] = wc;
    wc.__name__ = ["flambe", "script", "Sequence"];
    wc.__interfaces__ = [ac];
    wc.prototype = {
        update: function(a, b) {
            for (var c = 0;;) {
                var f = this._runningActions[this._idx];
                if (null != f)
                    if (f = f.update(a - c, b), 0 <= f) c += f;
                    else return -1;
                ++this._idx;
                if (this._idx >= this._runningActions.length) {
                    this._idx = 0;
                    break
                } else if (c >
                    a) return -1
            }
            return c
        },
        __class__: wc
    };
    var db = e["flambe.subsystem.RendererType"] = {
        __ename__: ["flambe", "subsystem", "RendererType"],
        __constructs__: ["Stage3D", "WebGL", "Canvas"]
    };
    db.Stage3D = ["Stage3D", 0];
    db.Stage3D.__enum__ = db;
    db.WebGL = ["WebGL", 1];
    db.WebGL.__enum__ = db;
    db.Canvas = ["Canvas", 2];
    db.Canvas.__enum__ = db;
    var He = function() {};
    e["flambe.util.Assert"] = He;
    He.__name__ = ["flambe", "util", "Assert"];
    He.that = function() {};
    var zd = function() {};
    e["flambe.util.BitSets"] = zd;
    zd.__name__ = ["flambe", "util", "BitSets"];
    zd.set = function(a, b, c) {
        return c ? a | b : a & ~b
    };
    var Tb = function() {
        this.success = new Q;
        this.error = new Q;
        this.progressChanged = new qb;
        this.hasResult = !1;
        this._total = this._progress = 0
    };
    e["flambe.util.Promise"] = Tb;
    Tb.__name__ = ["flambe", "util", "Promise"];
    Tb.prototype = {
        set_result: function(a) {
            if (this.hasResult) throw new n("Promise result already assigned");
            this._result = a;
            this.hasResult = !0;
            this.success.emit(a);
            return a
        },
        get: function(a) {
            return this.hasResult ? (a(this._result), null) : this.success.connect(a).once()
        },
        set_progress: function(a) {
            this._progress !=
                a && (this._progress = a, this.progressChanged.emit());
            return a
        },
        set_total: function(a) {
            this._total != a && (this._total = a, this.progressChanged.emit());
            return a
        },
        __class__: Tb
    };
    var qb = function(a) {
        $.call(this, a)
    };
    e["flambe.util.Signal0"] = qb;
    qb.__name__ = ["flambe", "util", "Signal0"];
    qb.__super__ = $;
    qb.prototype = r($.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        emit: function() {
            var a = this;
            this._head == $.DISPATCHING_SENTINEL ? this.defer(function() {
                a.emitImpl()
            }) : this.emitImpl()
        },
        emitImpl: function() {
            for (var a =
                    this.willEmit(), b = a; null != b;) b._listener(), b.stayInList || b.dispose(), b = b._next;
            this.didEmit(a)
        },
        __class__: qb
    });
    var vd = function(a) {
        this.next = null;
        this.fn = a
    };
    e["flambe.util._SignalBase.Task"] = vd;
    vd.__name__ = ["flambe", "util", "_SignalBase", "Task"];
    vd.prototype = {
        __class__: vd
    };
    var ia = function() {};
    e["flambe.util.Strings"] = ia;
    ia.__name__ = ["flambe", "util", "Strings"];
    ia.getFileExtension = function(a) {
        var b = a.lastIndexOf(".");
        return 0 < b ? y.substr(a, b + 1, null) : null
    };
    ia.removeFileExtension = function(a) {
        var b = a.lastIndexOf(".");
        return 0 < b ? y.substr(a, 0, b) : a
    };
    ia.getUrlExtension = function(a) {
        var b = a.lastIndexOf("?");
        0 <= b && (a = y.substr(a, 0, b));
        b = a.lastIndexOf("/");
        0 <= b && (a = y.substr(a, b + 1, null));
        return ia.getFileExtension(a)
    };
    ia.joinPath = function(a, b) {
        0 < a.length && 47 != a.charCodeAt(a.length - 1) && (a += "/");
        return a + b
    };
    ia.withFields = function(a, b) {
        var c = b.length;
        if (0 < c) {
            for (var a = 0 < a.length ? a + " [" : a + "[", f = 0; f < c;) {
                0 < f && (a += ", ");
                var d = b[f],
                    e = b[f + 1];
                if (t.is(e, Error)) {
                    var g = e.stack;
                    null != g && (e = g)
                }
                a += d + "=" + t.string(e);
                f += 2
            }
            a += "]"
        }
        return a
    };
    var Td = function() {};
    e["haxe.IMap"] = Td;
    Td.__name__ = ["haxe", "IMap"];
    var sd = function(a) {
        this.url = a;
        this.headers = new kb;
        this.params = new kb;
        this.async = !0
    };
    e["haxe.Http"] = sd;
    sd.__name__ = ["haxe", "Http"];
    sd.prototype = {
        addParameter: function(a, b) {
            this.params.push({
                param: a,
                value: b
            });
            return this
        },
        request: function(a) {
            var b = this;
            b.responseData = null;
            var c = this.req = Mc.createXMLHttpRequest(),
                f = function() {
                    if (4 == c.readyState) {
                        var a;
                        try {
                            a = c.status
                        } catch (f) {
                            f instanceof n && (f = f.val), a = null
                        }
                        if (null != a) {
                            var d = window.location.protocol.toLowerCase();
                            (new wa("^(?:about|app|app-storage|.+-extension|file|res|widget):$", "")).match(d) && (a = null != c.responseText ? 200 : 404)
                        }
                        void 0 == a && (a = null);
                        if (null != a) b.onStatus(a);
                        if (null != a && 200 <= a && 400 > a) b.req = null, b.onData(b.responseData = c.responseText);
                        else if (null == a) b.req = null, b.onError("Failed to connect or resolve host");
                        else switch (a) {
                            case 12029:
                                b.req = null;
                                b.onError("Failed to connect to host");
                                break;
                            case 12007:
                                b.req = null;
                                b.onError("Unknown host");
                                break;
                            default:
                                b.req = null, b.responseData = c.responseText, b.onError("Http Error #" +
                                    c.status)
                        }
                    }
                };
            this.async && (c.onreadystatechange = f);
            var d = this.postData;
            if (null != d) a = !0;
            else
                for (var e = this.params.h, g = null; null != e;) g = e[0], e = e[1], d = null == d ? "" : d + "&", d += encodeURIComponent(g.param) + "=" + encodeURIComponent(g.value);
            try {
                if (a) c.open("POST", this.url, this.async);
                else if (null != d) {
                    var i = 1 >= this.url.split("?").length;
                    c.open("GET", this.url + (i ? "?" : "&") + d, this.async);
                    d = null
                } else c.open("GET", this.url, this.async)
            } catch (h) {
                h instanceof n && (h = h.val);
                b.req = null;
                this.onError(h.toString());
                return
            }!xb.exists(this.headers,
                function(a) {
                    return "Content-Type" == a.header
                }) && a && null == this.postData && c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            a = this.headers.h;
            for (e = null; null != a;) e = a[0], a = a[1], c.setRequestHeader(e.header, e.value);
            c.send(d);
            this.async || f(null)
        },
        onData: function() {},
        onError: function() {},
        onStatus: function() {},
        __class__: sd
    };
    var Ud = function(a, b) {
        this.high = a;
        this.low = b
    };
    e["haxe._Int64.___Int64"] = Ud;
    Ud.__name__ = ["haxe", "_Int64", "___Int64"];
    Ud.prototype = {
        __class__: Ud
    };
    var ya = function() {
        this.buf =
            new ta;
        this.cache = [];
        this.useCache = ya.USE_CACHE;
        this.useEnumIndex = ya.USE_ENUM_INDEX;
        this.shash = new ka;
        this.scount = 0
    };
    e["haxe.Serializer"] = ya;
    ya.__name__ = ["haxe", "Serializer"];
    ya.prototype = {
        toString: function() {
            return this.buf.b
        },
        serializeString: function(a) {
            var b = this.shash.get(a);
            null != b ? (this.buf.b += "R", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)) : (this.shash.set(a, this.scount++), this.buf.b += "y", a = encodeURIComponent(a), this.buf.b = null == a.length ? this.buf.b + "null" : this.buf.b + ("" + a.length),
                this.buf.b += ":", this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a))
        },
        serializeRef: function(a) {
            for (var b = typeof a, c = 0, f = this.cache.length; c < f;) {
                var d = c++,
                    e = this.cache[d];
                if (typeof e == b && e == a) return this.buf.b += "r", this.buf.b = null == d ? this.buf.b + "null" : this.buf.b + ("" + d), !0
            }
            this.cache.push(a);
            return !1
        },
        serializeFields: function(a) {
            for (var b = 0, c = K.fields(a); b < c.length;) {
                var f = c[b];
                ++b;
                this.serializeString(f);
                this.serialize(K.field(a, f))
            }
            this.buf.b += "g"
        },
        serialize: function(a) {
            var b = S["typeof"](a);
            switch (b[1]) {
                case 0:
                    this.buf.b +=
                        "n";
                    break;
                case 1:
                    if (0 == a) {
                        this.buf.b += "z";
                        break
                    }
                    this.buf.b += "i";
                    this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a);
                    break;
                case 2:
                    isNaN(a) ? this.buf.b += "k" : isFinite(a) ? (this.buf.b += "d", this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a)) : this.buf.b = 0 > a ? this.buf.b + "m" : this.buf.b + "p";
                    break;
                case 3:
                    this.buf.b = a ? this.buf.b + "t" : this.buf.b + "f";
                    break;
                case 6:
                    b = b[2];
                    if (b == String) {
                        this.serializeString(a);
                        break
                    }
                    if (this.useCache && this.serializeRef(a)) break;
                    switch (b) {
                        case Array:
                            b = 0;
                            this.buf.b += "a";
                            for (var c =
                                    a.length, f = 0; f < c;) {
                                var d = f++;
                                null == a[d] ? b++ : (0 < b && (1 == b ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)), b = 0), this.serialize(a[d]))
                            }
                            0 < b && (1 == b ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)));
                            this.buf.b += "h";
                            break;
                        case kb:
                            this.buf.b += "l";
                            a = a.h;
                            for (b = null; null != a;) b = a[0], a = a[1], this.serialize(b);
                            this.buf.b += "h";
                            break;
                        case Date:
                            this.buf.b += "v";
                            this.buf.add(a.getTime());
                            break;
                        case ka:
                            this.buf.b += "b";
                            for (b = a.keys(); b.hasNext();) c =
                                b.next(), this.serializeString(c), this.serialize(null != sb[c] ? a.getReserved(c) : a.h[c]);
                            this.buf.b += "h";
                            break;
                        case qa:
                            this.buf.b += "q";
                            for (b = a.keys(); b.hasNext();) c = b.next(), this.buf.b += ":", this.buf.b = null == c ? this.buf.b + "null" : this.buf.b + ("" + c), this.serialize(a.h[c]);
                            this.buf.b += "h";
                            break;
                        case tb:
                            this.buf.b += "M";
                            for (b = a.keys(); b.hasNext();) c = b.next(), f = K.field(c, "__id__"), K.deleteField(c, "__id__"), this.serialize(c), c.__id__ = f, this.serialize(a.h[c.__id__]);
                            this.buf.b += "h";
                            break;
                        case Fb:
                            f = 0;
                            d = a.length -
                                2;
                            b = new ta;
                            for (c = ya.BASE64; f < d;) {
                                var e = a.get(f++),
                                    g = a.get(f++),
                                    i = a.get(f++);
                                b.add(c.charAt(e >> 2));
                                b.add(c.charAt((e << 4 | g >> 4) & 63));
                                b.add(c.charAt((g << 2 | i >> 6) & 63));
                                b.add(c.charAt(i & 63))
                            }
                            f == d ? (d = a.get(f++), a = a.get(f++), b.add(c.charAt(d >> 2)), b.add(c.charAt((d << 4 | a >> 4) & 63)), b.add(c.charAt(a << 2 & 63))) : f == d + 1 && (a = a.get(f++), b.add(c.charAt(a >> 2)), b.add(c.charAt(a << 4 & 63)));
                            a = b.b;
                            this.buf.b += "s";
                            this.buf.b = null == a.length ? this.buf.b + "null" : this.buf.b + ("" + a.length);
                            this.buf.b += ":";
                            this.buf.b = null == a ? this.buf.b +
                                "null" : this.buf.b + ("" + a);
                            break;
                        default:
                            this.useCache && this.cache.pop(), null != a.hxSerialize ? (this.buf.b += "C", this.serializeString(S.getClassName(b)), this.useCache && this.cache.push(a), a.hxSerialize(this), this.buf.b += "g") : (this.buf.b += "c", this.serializeString(S.getClassName(b)), this.useCache && this.cache.push(a), this.serializeFields(a))
                    }
                    break;
                case 4:
                    if (N.__instanceof(a, ag)) a = S.getClassName(a), this.buf.b += "A", this.serializeString(a);
                    else if (N.__instanceof(a, bg)) this.buf.b += "B", this.serializeString(S.getEnumName(a));
                    else {
                        if (this.useCache && this.serializeRef(a)) break;
                        this.buf.b += "o";
                        this.serializeFields(a)
                    }
                    break;
                case 7:
                    b = b[2];
                    if (this.useCache) {
                        if (this.serializeRef(a)) break;
                        this.cache.pop()
                    }
                    this.buf.b = this.useEnumIndex ? this.buf.b + "j" : this.buf.b + "w";
                    this.serializeString(S.getEnumName(b));
                    this.useEnumIndex ? (this.buf.b += ":", this.buf.b += t.string(a[1])) : this.serializeString(a[0]);
                    this.buf.b += ":";
                    b = a.length;
                    this.buf.b += t.string(b - 2);
                    for (c = 2; c < b;) f = c++, this.serialize(a[f]);
                    this.useCache && this.cache.push(a);
                    break;
                case 5:
                    throw new n("Cannot serialize function");
                default:
                    throw new n("Cannot serialize " + t.string(a));
            }
        },
        __class__: ya
    };
    var ca = function(a) {
        var b = this;
        this.id = setInterval(function() {
            b.run()
        }, a)
    };
    e["haxe.Timer"] = ca;
    ca.__name__ = ["haxe", "Timer"];
    ca.delay = function(a, b) {
        var c = new ca(b);
        c.run = function() {
            c.stop();
            a()
        };
        return c
    };
    ca.stamp = function() {
        return (new Date).getTime() / 1E3
    };
    ca.prototype = {
        stop: function() {
            null != this.id && (clearInterval(this.id), this.id = null)
        },
        run: function() {},
        __class__: ca
    };
    var ba = function(a) {
        this.buf = a;
        this.length = a.length;
        this.pos = 0;
        this.scache = [];
        this.cache = [];
        a = ba.DEFAULT_RESOLVER;
        null == a && (a = S, ba.DEFAULT_RESOLVER = a);
        this.setResolver(a)
    };
    e["haxe.Unserializer"] = ba;
    ba.__name__ = ["haxe", "Unserializer"];
    ba.initCodes = function() {
        for (var a = [], b = 0, c = ba.BASE64.length; b < c;) {
            var f = b++;
            a[ba.BASE64.charCodeAt(f)] = f
        }
        return a
    };
    ba.run = function(a) {
        return (new ba(a)).unserialize()
    };
    ba.prototype = {
        setResolver: function(a) {
            this.resolver = null == a ? {
                resolveClass: function() {
                    return null
                },
                resolveEnum: function() {
                    return null
                }
            } : a
        },
        get: function(a) {
            return this.buf.charCodeAt(a)
        },
        readDigits: function() {
            for (var a = 0, b = !1, c = this.pos;;) {
                var f = this.buf.charCodeAt(this.pos);
                if (f != f) break;
                if (45 == f) {
                    if (this.pos != c) break;
                    b = !0
                } else {
                    if (48 > f || 57 < f) break;
                    a = 10 * a + (f - 48)
                }
                this.pos++
            }
            b && (a *= -1);
            return a
        },
        readFloat: function() {
            for (var a = this.pos;;) {
                var b = this.buf.charCodeAt(this.pos);
                if (43 <= b && 58 > b || 101 == b || 69 == b) this.pos++;
                else break
            }
            return t.parseFloat(y.substr(this.buf, a, this.pos - a))
        },
        unserializeObject: function(a) {
            for (;;) {
                if (this.pos >= this.length) throw new n("Invalid object");
                if (103 == this.buf.charCodeAt(this.pos)) break;
                var b = this.unserialize();
                if ("string" != typeof b) throw new n("Invalid object key");
                var c = this.unserialize();
                a[b] = c
            }
            this.pos++
        },
        unserializeEnum: function(a, b) {
            if (58 != this.get(this.pos++)) throw new n("Invalid enum format");
            var c = this.readDigits();
            if (0 == c) return S.createEnum(a, b);
            for (var f = []; 0 < c--;) f.push(this.unserialize());
            return S.createEnum(a, b, f)
        },
        unserialize: function() {
            switch (this.get(this.pos++)) {
                case 110:
                    return null;
                case 116:
                    return !0;
                case 102:
                    return !1;
                case 122:
                    return 0;
                case 105:
                    return this.readDigits();
                case 100:
                    return this.readFloat();
                case 121:
                    var a = this.readDigits();
                    if (58 != this.get(this.pos++) || this.length - this.pos < a) throw new n("Invalid string length");
                    var b = y.substr(this.buf, this.pos, a);
                    this.pos += a;
                    b = decodeURIComponent(b.split("+").join(" "));
                    this.scache.push(b);
                    return b;
                case 107:
                    return NaN;
                case 109:
                    return -Infinity;
                case 112:
                    return Infinity;
                case 97:
                    a = [];
                    for (this.cache.push(a);;) {
                        b = this.buf.charCodeAt(this.pos);
                        if (104 == b) {
                            this.pos++;
                            break
                        }
                        117 == b ? (this.pos++, b = this.readDigits(), a[a.length + b - 1] =
                            null) : a.push(this.unserialize())
                    }
                    return a;
                case 111:
                    return a = {}, this.cache.push(a), this.unserializeObject(a), a;
                case 114:
                    a = this.readDigits();
                    if (0 > a || a >= this.cache.length) throw new n("Invalid reference");
                    return this.cache[a];
                case 82:
                    a = this.readDigits();
                    if (0 > a || a >= this.scache.length) throw new n("Invalid string reference");
                    return this.scache[a];
                case 120:
                    throw new n(this.unserialize());
                case 99:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw new n("Class not found " + a);
                    a = S.createEmptyInstance(b);
                    this.cache.push(a);
                    this.unserializeObject(a);
                    return a;
                case 119:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw new n("Enum not found " + a);
                    a = this.unserializeEnum(b, this.unserialize());
                    this.cache.push(a);
                    return a;
                case 106:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw new n("Enum not found " + a);
                    this.pos++;
                    var c = this.readDigits(),
                        f = S.getEnumConstructs(b)[c];
                    if (null == f) throw new n("Unknown enum index " + a + "@" + c);
                    a = this.unserializeEnum(b, f);
                    this.cache.push(a);
                    return a;
                case 108:
                    a = new kb;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) a.add(this.unserialize());
                    this.pos++;
                    return a;
                case 98:
                    a = new ka;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) b = this.unserialize(), a.set(b, this.unserialize());
                    this.pos++;
                    return a;
                case 113:
                    a = new qa;
                    this.cache.push(a);
                    for (b = this.get(this.pos++); 58 == b;) b = this.readDigits(), a.set(b, this.unserialize()), b = this.get(this.pos++);
                    if (104 != b) throw new n("Invalid IntMap format");
                    return a;
                case 77:
                    a = new tb;
                    for (this.cache.push(a); 104 !=
                        this.buf.charCodeAt(this.pos);) b = this.unserialize(), a.set(b, this.unserialize());
                    this.pos++;
                    return a;
                case 118:
                    return 48 <= this.buf.charCodeAt(this.pos) && 57 >= this.buf.charCodeAt(this.pos) && 48 <= this.buf.charCodeAt(this.pos + 1) && 57 >= this.buf.charCodeAt(this.pos + 1) && 48 <= this.buf.charCodeAt(this.pos + 2) && 57 >= this.buf.charCodeAt(this.pos + 2) && 48 <= this.buf.charCodeAt(this.pos + 3) && 57 >= this.buf.charCodeAt(this.pos + 3) && 45 == this.buf.charCodeAt(this.pos + 4) ? (a = y.substr(this.buf, this.pos, 19), a = y.strDate(a), this.pos +=
                        19) : (a = this.readFloat(), b = new Date, b.setTime(a), a = b), this.cache.push(a), a;
                case 115:
                    a = this.readDigits();
                    f = this.buf;
                    if (58 != this.get(this.pos++) || this.length - this.pos < a) throw new n("Invalid bytes length");
                    var d = ba.CODES;
                    null == d && (d = ba.initCodes(), ba.CODES = d);
                    for (var e = this.pos, g = a & 3, i = e + (a - g), b = Fb.alloc(3 * (a >> 2) + (2 <= g ? g - 1 : 0)), c = 0; e < i;) {
                        var h = d[J.fastCodeAt(f, e++)],
                            k = d[J.fastCodeAt(f, e++)];
                        b.set(c++, h << 2 | k >> 4);
                        h = d[J.fastCodeAt(f, e++)];
                        b.set(c++, k << 4 | h >> 2);
                        k = d[J.fastCodeAt(f, e++)];
                        b.set(c++, h << 6 | k)
                    }
                    2 <=
                        g && (k = d[J.fastCodeAt(f, e++)], i = d[J.fastCodeAt(f, e++)], b.set(c++, k << 2 | i >> 4), 3 == g && (f = d[J.fastCodeAt(f, e++)], b.set(c++, i << 4 | f >> 2)));
                    this.pos += a;
                    this.cache.push(b);
                    return b;
                case 67:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw new n("Class not found " + a);
                    a = S.createEmptyInstance(b);
                    this.cache.push(a);
                    a.hxUnserialize(this);
                    if (103 != this.get(this.pos++)) throw new n("Invalid custom data");
                    return a;
                case 65:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw new n("Class not found " +
                        a);
                    return b;
                case 66:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw new n("Enum not found " + a);
                    return b
            }
            this.pos--;
            throw new n("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
        },
        __class__: ba
    };
    var qa = function() {
        this.h = {}
    };
    e["haxe.ds.IntMap"] = qa;
    qa.__name__ = ["haxe", "ds", "IntMap"];
    qa.__interfaces__ = [Td];
    qa.prototype = {
        set: function(a, b) {
            this.h[a] = b
        },
        remove: function(a) {
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) &&
                a.push(b | 0);
            return y.iter(a)
        },
        __class__: qa
    };
    var tb = function() {
        this.h = {};
        this.h.__keys__ = {}
    };
    e["haxe.ds.ObjectMap"] = tb;
    tb.__name__ = ["haxe", "ds", "ObjectMap"];
    tb.__interfaces__ = [Td];
    tb.prototype = {
        set: function(a, b) {
            var c = a.__id__ || (a.__id__ = ++tb.count);
            this.h[c] = b;
            this.h.__keys__[c] = a
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h.__keys__) this.h.hasOwnProperty(b) && a.push(this.h.__keys__[b]);
            return y.iter(a)
        },
        __class__: tb
    };
    var $c = function(a, b) {
        this.map = a;
        this.keys = b;
        this.index = 0;
        this.count = b.length
    };
    e["haxe.ds._StringMap.StringMapIterator"] =
        $c;
    $c.__name__ = ["haxe", "ds", "_StringMap", "StringMapIterator"];
    $c.prototype = {
        hasNext: function() {
            return this.index < this.count
        },
        next: function() {
            return this.map.get(this.keys[this.index++])
        },
        __class__: $c
    };
    var ka = function() {
        this.h = {}
    };
    e["haxe.ds.StringMap"] = ka;
    ka.__name__ = ["haxe", "ds", "StringMap"];
    ka.__interfaces__ = [Td];
    ka.prototype = {
        set: function(a, b) {
            null != sb[a] ? this.setReserved(a, b) : this.h[a] = b
        },
        get: function(a) {
            return null != sb[a] ? this.getReserved(a) : this.h[a]
        },
        exists: function(a) {
            return null != sb[a] ? this.existsReserved(a) :
                this.h.hasOwnProperty(a)
        },
        setReserved: function(a, b) {
            null == this.rh && (this.rh = {});
            this.rh["$" + a] = b
        },
        getReserved: function(a) {
            return null == this.rh ? null : this.rh["$" + a]
        },
        existsReserved: function(a) {
            return null == this.rh ? !1 : this.rh.hasOwnProperty("$" + a)
        },
        keys: function() {
            var a = this.arrayKeys();
            return y.iter(a)
        },
        arrayKeys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b);
            if (null != this.rh)
                for (b in this.rh) 36 == b.charCodeAt(0) && a.push(b.substr(1));
            return a
        },
        iterator: function() {
            return new $c(this,
                this.arrayKeys())
        },
        __class__: ka
    };
    var Fb = function(a) {
        this.length = a.byteLength;
        this.b = new $f(a);
        this.b.bufferValue = a;
        a.hxBytes = this;
        a.bytes = this.b
    };
    e["haxe.io.Bytes"] = Fb;
    Fb.__name__ = ["haxe", "io", "Bytes"];
    Fb.alloc = function(a) {
        return new Fb(new Ke(a))
    };
    Fb.prototype = {
        get: function(a) {
            return this.b[a]
        },
        set: function(a, b) {
            this.b[a] = b & 255
        },
        __class__: Fb
    };
    var Ba = e["haxe.io.Error"] = {
        __ename__: ["haxe", "io", "Error"],
        __constructs__: ["Blocked", "Overflow", "OutsideBounds", "Custom"]
    };
    Ba.Blocked = ["Blocked", 0];
    Ba.Blocked.__enum__ =
        Ba;
    Ba.Overflow = ["Overflow", 1];
    Ba.Overflow.__enum__ = Ba;
    Ba.OutsideBounds = ["OutsideBounds", 2];
    Ba.OutsideBounds.__enum__ = Ba;
    Ba.Custom = function(a) {
        a = ["Custom", 3, a];
        a.__enum__ = Ba;
        return a
    };
    var Ca = function() {};
    e["haxe.io.FPHelper"] = Ca;
    Ca.__name__ = ["haxe", "io", "FPHelper"];
    Ca.i32ToFloat = function(a) {
        var b = a >>> 23 & 255,
            c = a & 8388607;
        return 0 == c && 0 == b ? 0 : (1 - (a >>> 31 << 1)) * (1 + Math.pow(2, -23) * c) * Math.pow(2, b - 127)
    };
    Ca.floatToI32 = function(a) {
        if (0 == a) return 0;
        var b;
        b = 0 > a ? -a : a;
        var c = Math.floor(Math.log(b) / 0.6931471805599453); -
        127 > c ? c = -127 : 128 < c && (c = 128);
        b = Math.round(8388608 * (b / Math.pow(2, c) - 1)) & 8388607;
        return (0 > a ? -2147483648 : 0) | c + 127 << 23 | b
    };
    Ca.i64ToDouble = function(a, b) {
        var c = (b >> 20 & 2047) - 1023,
            f = 4294967296 * (b & 1048575) + 2147483648 * (a >>> 31) + (a & 2147483647);
        return 0 == f && -1023 == c ? 0 : (1 - (b >>> 31 << 1)) * (1 + Math.pow(2, -52) * f) * Math.pow(2, c)
    };
    Ca.doubleToI64 = function(a) {
        var b = Ca.i64tmp;
        if (0 == a) b.low = 0, b.high = 0;
        else {
            var c;
            c = 0 > a ? -a : a;
            var f = Math.floor(Math.log(c) / 0.6931471805599453);
            c = 4503599627370496 * (c / Math.pow(2, f) - 1);
            c = Math.round(c);
            b.low = c | 0;
            b.high = (0 > a ? -2147483648 : 0) | f + 1023 << 20 | c / 4294967296 | 0
        }
        return b
    };
    var Uc = function() {};
    e["haxe.rtti.Meta"] = Uc;
    Uc.__name__ = ["haxe", "rtti", "Meta"];
    Uc.getType = function(a) {
        a = Uc.getMeta(a);
        return null == a || null == a.obj ? {} : a.obj
    };
    Uc.getMeta = function(a) {
        return a.__meta__
    };
    var Vd = function(a) {
        this.__x = a
    };
    e["haxe.xml._Fast.NodeAccess"] = Vd;
    Vd.__name__ = ["haxe", "xml", "_Fast", "NodeAccess"];
    Vd.prototype = {
        resolve: function(a) {
            var b = this.__x.elementsNamed(a).next();
            if (null == b) throw b = this.__x.nodeType == o.Document ?
                "Document" : this.__x.get_nodeName(), new n(b + " is missing element " + a);
            return new Mb(b)
        },
        __class__: Vd
    };
    var Wd = function(a) {
        this.__x = a
    };
    e["haxe.xml._Fast.AttribAccess"] = Wd;
    Wd.__name__ = ["haxe", "xml", "_Fast", "AttribAccess"];
    Wd.prototype = {
        resolve: function(a) {
            if (this.__x.nodeType == o.Document) throw new n("Cannot access document attribute " + a);
            var b = this.__x.get(a);
            if (null == b) throw new n(this.__x.get_nodeName() + " is missing attribute " + a);
            return b
        },
        __class__: Wd
    };
    var Xd = function(a) {
        this.__x = a
    };
    e["haxe.xml._Fast.HasAttribAccess"] =
        Xd;
    Xd.__name__ = ["haxe", "xml", "_Fast", "HasAttribAccess"];
    Xd.prototype = {
        __class__: Xd
    };
    var Yd = function(a) {
        this.__x = a
    };
    e["haxe.xml._Fast.HasNodeAccess"] = Yd;
    Yd.__name__ = ["haxe", "xml", "_Fast", "HasNodeAccess"];
    Yd.prototype = {
        __class__: Yd
    };
    var Zd = function(a) {
        this.__x = a
    };
    e["haxe.xml._Fast.NodeListAccess"] = Zd;
    Zd.__name__ = ["haxe", "xml", "_Fast", "NodeListAccess"];
    Zd.prototype = {
        resolve: function(a) {
            for (var b = new kb, a = this.__x.elementsNamed(a); a.hasNext();) {
                var c = a.next();
                b.add(new Mb(c))
            }
            return b
        },
        __class__: Zd
    };
    var Mb = function(a) {
        if (a.nodeType != o.Document && a.nodeType != o.Element) throw new n("Invalid nodeType " + a.nodeType);
        this.x = a;
        this.node = new Vd(a);
        this.nodes = new Zd(a);
        this.att = new Wd(a);
        this.has = new Xd(a);
        this.hasNode = new Yd(a)
    };
    e["haxe.xml.Fast"] = Mb;
    Mb.__name__ = ["haxe", "xml", "Fast"];
    Mb.prototype = {
        get_name: function() {
            return this.x.nodeType == o.Document ? "Document" : this.x.get_nodeName()
        },
        get_innerData: function() {
            var a = this.x.iterator();
            if (!a.hasNext()) throw new n(this.get_name() + " does not have data");
            var b =
                a.next(),
                c = a.next();
            if (null != c) {
                if (b.nodeType == o.PCData && c.nodeType == o.CData && "" == J.trim(function() {
                        if (b.nodeType == o.Document || b.nodeType == o.Element) throw new n("Bad node type, unexpected " + b.nodeType);
                        return b.nodeValue
                    }(this))) {
                    var f = a.next();
                    if (null == f || f.nodeType == o.PCData && "" == J.trim(function() {
                            if (f.nodeType == o.Document || f.nodeType == o.Element) throw new n("Bad node type, unexpected " + f.nodeType);
                            return f.nodeValue
                        }(this)) && null == a.next()) {
                        if (c.nodeType == o.Document || c.nodeType == o.Element) throw new n("Bad node type, unexpected " +
                            c.nodeType);
                        return c.nodeValue
                    }
                }
                throw new n(this.get_name() + " does not only have data");
            }
            if (b.nodeType != o.PCData && b.nodeType != o.CData) throw new n(this.get_name() + " does not have data");
            if (b.nodeType == o.Document || b.nodeType == o.Element) throw new n("Bad node type, unexpected " + b.nodeType);
            return b.nodeValue
        },
        __class__: Mb
    };
    var $a = function() {};
    e["haxe.xml.Parser"] = $a;
    $a.__name__ = ["haxe", "xml", "Parser"];
    $a.parse = function(a, b) {
        null == b && (b = !1);
        var c = o.createDocument();
        $a.doParse(a, b, 0, c);
        return c
    };
    $a.doParse =
        function(a, b, c, f) {
            null == c && (c = 0);
            for (var d = null, e = 1, g = 1, i = null, h = 0, k = 0, m = 0, j = a.charCodeAt(c), l = new ta, p = 1, q = -1; j == j;) {
                switch (e) {
                    case 0:
                        switch (j) {
                            case 10:
                            case 13:
                            case 9:
                            case 32:
                                break;
                            default:
                                e = g;
                                continue
                        }
                        break;
                    case 1:
                        switch (j) {
                            case 60:
                                e = 0;
                                g = 2;
                                break;
                            default:
                                h = c;
                                e = 13;
                                continue
                        }
                        break;
                    case 13:
                        60 == j ? (l.addSub(a, h, c - h), g = o.createPCData(l.b), l = new ta, f.addChild(g), k++, e = 0, g = 2) : 38 == j && (l.addSub(a, h, c - h), e = 18, p = 13, h = c + 1);
                        break;
                    case 17:
                        93 == j && 93 == a.charCodeAt(c + 1) && 62 == a.charCodeAt(c + 2) && (j = o.createCData(y.substr(a,
                            h, c - h)), f.addChild(j), k++, c += 2, e = 1);
                        break;
                    case 2:
                        switch (j) {
                            case 33:
                                if (91 == a.charCodeAt(c + 1)) {
                                    c += 2;
                                    if ("CDATA[" != y.substr(a, c, 6).toUpperCase()) throw new n("Expected <![CDATA[");
                                    c += 5;
                                    e = 17
                                } else if (68 == a.charCodeAt(c + 1) || 100 == a.charCodeAt(c + 1)) {
                                    if ("OCTYPE" != y.substr(a, c + 2, 6).toUpperCase()) throw new n("Expected <!DOCTYPE");
                                    c += 8;
                                    e = 16
                                } else {
                                    if (45 != a.charCodeAt(c + 1) || 45 != a.charCodeAt(c + 2)) throw new n("Expected <\!--");
                                    c += 2;
                                    e = 15
                                }
                                h = c + 1;
                                break;
                            case 63:
                                e = 14;
                                h = c;
                                break;
                            case 47:
                                if (null == f) throw new n("Expected node name");
                                h = c + 1;
                                e = 0;
                                g = 10;
                                break;
                            default:
                                e = 3;
                                h = c;
                                continue
                        }
                        break;
                    case 3:
                        if (!(97 <= j && 122 >= j || 65 <= j && 90 >= j || 48 <= j && 57 >= j || 58 == j || 46 == j || 95 == j || 45 == j)) {
                            if (c == h) throw new n("Expected node name");
                            d = o.createElement(y.substr(a, h, c - h));
                            f.addChild(d);
                            k++;
                            e = 0;
                            g = 4;
                            continue
                        }
                        break;
                    case 4:
                        switch (j) {
                            case 47:
                                e = 11;
                                break;
                            case 62:
                                e = 9;
                                break;
                            default:
                                e = 5;
                                h = c;
                                continue
                        }
                        break;
                    case 5:
                        if (!(97 <= j && 122 >= j || 65 <= j && 90 >= j || 48 <= j && 57 >= j || 58 == j || 46 == j || 95 == j || 45 == j)) {
                            if (h == c) throw new n("Expected attribute name");
                            i = y.substr(a, h, c - h);
                            if (d.exists(i)) throw new n("Duplicate attribute");
                            e = 0;
                            g = 6;
                            continue
                        }
                        break;
                    case 6:
                        switch (j) {
                            case 61:
                                e = 0;
                                g = 7;
                                break;
                            default:
                                throw new n("Expected =");
                        }
                        break;
                    case 7:
                        switch (j) {
                            case 34:
                            case 39:
                                l = new ta;
                                e = 8;
                                h = c + 1;
                                q = j;
                                break;
                            default:
                                throw new n('Expected "');
                        }
                        break;
                    case 8:
                        switch (j) {
                            case 38:
                                l.addSub(a, h, c - h);
                                e = 18;
                                p = 8;
                                h = c + 1;
                                break;
                            case 62:
                                if (b) throw new n("Invalid unescaped " + String.fromCharCode(j) + " in attribute value");
                                j == q && (l.addSub(a, h, c - h), g = l.b, l = new ta, d.set(i, g), e = 0, g = 4);
                                break;
                            case 60:
                                if (b) throw new n("Invalid unescaped " + String.fromCharCode(j) + " in attribute value");
                                j == q && (l.addSub(a, h, c - h), g = l.b, l = new ta, d.set(i, g), e = 0, g = 4);
                                break;
                            default:
                                j == q && (l.addSub(a, h, c - h), g = l.b, l = new ta, d.set(i, g), e = 0, g = 4)
                        }
                        break;
                    case 9:
                        h = c = $a.doParse(a, b, c, d);
                        e = 1;
                        break;
                    case 11:
                        switch (j) {
                            case 62:
                                e = 1;
                                break;
                            default:
                                throw new n("Expected >");
                        }
                        break;
                    case 12:
                        switch (j) {
                            case 62:
                                return 0 == k && f.addChild(o.createPCData("")), c;
                            default:
                                throw new n("Expected >");
                        }
                    case 10:
                        if (!(97 <= j && 122 >= j || 65 <= j && 90 >= j || 48 <= j && 57 >= j || 58 == j || 46 == j || 95 == j || 45 == j)) {
                            if (h == c) throw new n("Expected node name");
                            g = y.substr(a,
                                h, c - h);
                            if (f.nodeType != o.Element) throw new n("Bad node type, expected Element but found " + f.nodeType);
                            if (g != f.nodeName) throw new n("Expected </" + function() {
                                if (f.nodeType != o.Element) throw "Bad node type, expected Element but found " + f.nodeType;
                                return f.nodeName
                            }(this) + ">");
                            e = 0;
                            g = 12;
                            continue
                        }
                        break;
                    case 15:
                        45 == j && 45 == a.charCodeAt(c + 1) && 62 == a.charCodeAt(c + 2) && (j = o.createComment(y.substr(a, h, c - h)), f.addChild(j), k++, c += 2, e = 1);
                        break;
                    case 16:
                        91 == j ? m++ : 93 == j ? m-- : 62 == j && 0 == m && (j = o.createDocType(y.substr(a, h,
                            c - h)), f.addChild(j), k++, e = 1);
                        break;
                    case 14:
                        63 == j && 62 == a.charCodeAt(c + 1) && (c++, j = y.substr(a, h + 1, c - h - 2), j = o.createProcessingInstruction(j), f.addChild(j), k++, e = 1);
                        break;
                    case 18:
                        if (59 == j) {
                            h = y.substr(a, h, c - h);
                            if (35 == h.charCodeAt(0)) h = 120 == h.charCodeAt(1) ? t.parseInt("0" + y.substr(h, 1, h.length - 1)) : t.parseInt(y.substr(h, 1, h.length - 1)), l.b += String.fromCharCode(h);
                            else if ($a.escapes.exists(h)) l.add($a.escapes.get(h));
                            else {
                                if (b) throw new n("Undefined entity: " + h);
                                l.b += t.string("&" + h + ";")
                            }
                            h = c + 1;
                            e = p
                        } else if (!(97 <=
                                j && 122 >= j || 65 <= j && 90 >= j || 48 <= j && 57 >= j || 58 == j || 46 == j || 95 == j || 45 == j) && 35 != j) {
                            if (b) throw new n("Invalid character in entity: " + String.fromCharCode(j));
                            l.b += "&";
                            l.addSub(a, h, c - h);
                            c--;
                            h = c + 1;
                            e = p
                        }
                }
                j = J.fastCodeAt(a, ++c)
            }
            1 == e && (h = c, e = 13);
            if (13 == e) {
                if (c != h || 0 == k) l.addSub(a, h, c - h), a = o.createPCData(l.b), f.addChild(a), k++;
                return c
            }
            if (!b && 18 == e && 13 == p) return l.b += "&", l.addSub(a, h, c - h), a = o.createPCData(l.b), f.addChild(a), k++, c;
            throw new n("Unexpected end");
        };
    var n = function(a) {
        Error.call(this);
        this.val = a;
        this.message =
            "" + a;
        Error.captureStackTrace && Error.captureStackTrace(this, n)
    };
    e["js._Boot.HaxeError"] = n;
    n.__name__ = ["js", "_Boot", "HaxeError"];
    n.__super__ = Error;
    n.prototype = r(Error.prototype, {
        __class__: n
    });
    var N = function() {};
    e["js.Boot"] = N;
    N.__name__ = ["js", "Boot"];
    N.getClass = function(a) {
        if (a instanceof Array && null == a.__enum__) return Array;
        var b = a.__class__;
        if (null != b) return b;
        a = N.__nativeClassName(a);
        return null != a ? N.__resolveNativeClass(a) : null
    };
    N.__string_rec = function(a, b) {
        if (null == a) return "null";
        if (5 <= b.length) return "<...>";
        var c = typeof a;
        if ("function" == c && (a.__name__ || a.__ename__)) c = "object";
        switch (c) {
            case "object":
                if (a instanceof Array) {
                    if (a.__enum__) {
                        if (2 == a.length) return a[0];
                        for (var c = a[0] + "(", b = b + "\t", f = 2, d = a.length; f < d;) var e = f++,
                            c = 2 != e ? c + ("," + N.__string_rec(a[e], b)) : c + N.__string_rec(a[e], b);
                        return c + ")"
                    }
                    c = a.length;
                    f = "[";
                    b += "\t";
                    for (d = 0; d < c;) e = d++, f += (0 < e ? "," : "") + N.__string_rec(a[e], b);
                    return f + "]"
                }
                try {
                    f = a.toString
                } catch (g) {
                    return g instanceof n && (g = g.val), "???"
                }
                if (null != f && f != Object.toString && "function" == typeof f &&
                    (c = a.toString(), "[object Object]" != c)) return c;
                c = null;
                f = "{\n";
                b += "\t";
                d = null != a.hasOwnProperty;
                for (c in a)
                    if (!d || a.hasOwnProperty(c)) "prototype" == c || "__class__" == c || "__super__" == c || "__interfaces__" == c || "__properties__" == c || (2 != f.length && (f += ", \n"), f += b + c + " : " + N.__string_rec(a[c], b));
                b = b.substring(1);
                return f + ("\n" + b + "}");
            case "function":
                return "<function>";
            case "string":
                return a;
            default:
                return "" + a
        }
    };
    N.__interfLoop = function(a, b) {
        if (null == a) return !1;
        if (a == b) return !0;
        var c = a.__interfaces__;
        if (null !=
            c)
            for (var d = 0, e = c.length; d < e;) {
                var g = d++,
                    g = c[g];
                if (g == b || N.__interfLoop(g, b)) return !0
            }
        return N.__interfLoop(a.__super__, b)
    };
    N.__instanceof = function(a, b) {
        if (null == b) return !1;
        switch (b) {
            case fg:
                return (a | 0) === a;
            case cg:
                return "number" == typeof a;
            case dg:
                return "boolean" == typeof a;
            case String:
                return "string" == typeof a;
            case Array:
                return a instanceof Array && null == a.__enum__;
            case gg:
                return !0;
            default:
                if (null != a)
                    if ("function" == typeof b) {
                        if (a instanceof b || N.__interfLoop(N.getClass(a), b)) return !0
                    } else {
                        if ("object" ==
                            typeof b && N.__isNativeObj(b) && a instanceof b) return !0
                    }
                else return !1;
                return b == ag && null != a.__name__ || b == bg && null != a.__ename__ ? !0 : a.__enum__ == b
        }
    };
    N.__nativeClassName = function(a) {
        a = N.__toStr.call(a).slice(8, -1);
        return "Object" == a || "Function" == a || "Math" == a || "JSON" == a ? null : a
    };
    N.__isNativeObj = function(a) {
        return null != N.__nativeClassName(a)
    };
    N.__resolveNativeClass = function(a) {
        return Function("return typeof " + a + ' != "undefined" ? ' + a + " : null")()
    };
    var Mc = function() {};
    e["js.Browser"] = Mc;
    Mc.__name__ = ["js", "Browser"];
    Mc.getLocalStorage = function() {
        try {
            var a = window.localStorage;
            a.getItem("");
            return a
        } catch (b) {
            return b instanceof n && (b = b.val), null
        }
    };
    Mc.createXMLHttpRequest = function() {
        if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
        if ("undefined" != typeof ActiveXObject) return new ActiveXObject("Microsoft.XMLHTTP");
        throw new n("Unable to create XMLHttpRequest object.");
    };
    var Da = function(a) {
        if (a instanceof Array && null == a.__enum__) this.a = a, this.byteLength = a.length;
        else {
            this.a = [];
            for (var b = 0; b < a;) this.a[b++] =
                0;
            this.byteLength = a
        }
    };
    e["js.html.compat.ArrayBuffer"] = Da;
    Da.__name__ = ["js", "html", "compat", "ArrayBuffer"];
    Da.sliceImpl = function(a, b) {
        var c = new $f(this, a, null == b ? null : b - a),
            d = new Ke(c.byteLength);
        (new $f(d)).set(c);
        return d
    };
    Da.prototype = {
        slice: function(a, b) {
            return new Da(this.a.slice(a, b))
        },
        __class__: Da
    };
    var Le = function(a, b, c) {
        this.buf = a;
        this.offset = null == b ? 0 : b;
        this.length = null == c ? a.byteLength - this.offset : c;
        if (0 > this.offset || 0 > this.length || this.offset + this.length > a.byteLength) throw new n(Ba.OutsideBounds);
    };
    e["js.html.compat.DataView"] = Le;
    Le.__name__ = ["js", "html", "compat", "DataView"];
    Le.prototype = {
        getInt8: function(a) {
            a = this.buf.a[this.offset + a];
            return 128 <= a ? a - 256 : a
        },
        getUint8: function(a) {
            return this.buf.a[this.offset + a]
        },
        getInt16: function(a, b) {
            var c = this.getUint16(a, b);
            return 32768 <= c ? c - 65536 : c
        },
        getUint16: function(a, b) {
            return b ? this.buf.a[this.offset + a] | this.buf.a[this.offset + a + 1] << 8 : this.buf.a[this.offset + a] << 8 | this.buf.a[this.offset + a + 1]
        },
        getInt32: function(a, b) {
            var c = this.offset + a,
                d = this.buf.a[c++],
                e = this.buf.a[c++],
                g = this.buf.a[c++],
                c = this.buf.a[c++];
            return b ? d | e << 8 | g << 16 | c << 24 : c | g << 8 | e << 16 | d << 24
        },
        getUint32: function(a, b) {
            var c = this.getInt32(a, b);
            return 0 > c ? c + 4294967296 : c
        },
        getFloat32: function(a, b) {
            return Ca.i32ToFloat(this.getInt32(a, b))
        },
        getFloat64: function(a, b) {
            var c = this.getInt32(a, b),
                d = this.getInt32(a + 4, b);
            return Ca.i64ToDouble(b ? c : d, b ? d : c)
        },
        setInt8: function(a, b) {
            this.buf.a[a + this.offset] = 0 > b ? b + 128 & 255 : b & 255
        },
        setUint8: function(a, b) {
            this.buf.a[a + this.offset] = b & 255
        },
        setInt16: function(a, b,
            c) {
            this.setUint16(a, 0 > b ? b + 65536 : b, c)
        },
        setUint16: function(a, b, c) {
            a += this.offset;
            c ? (this.buf.a[a] = b & 255, this.buf.a[a++] = b >> 8 & 255) : (this.buf.a[a++] = b >> 8 & 255, this.buf.a[a] = b & 255)
        },
        setInt32: function(a, b, c) {
            this.setUint32(a, b, c)
        },
        setUint32: function(a, b, c) {
            a += this.offset;
            c ? (this.buf.a[a++] = b & 255, this.buf.a[a++] = b >> 8 & 255, this.buf.a[a++] = b >> 16 & 255, this.buf.a[a++] = b >>> 24) : (this.buf.a[a++] = b >>> 24, this.buf.a[a++] = b >> 16 & 255, this.buf.a[a++] = b >> 8 & 255, this.buf.a[a++] = b & 255)
        },
        setFloat32: function(a, b, c) {
            this.setUint32(a,
                Ca.floatToI32(b), c)
        },
        setFloat64: function(a, b, c) {
            b = Ca.doubleToI64(b);
            c ? (this.setUint32(a, b.low), this.setUint32(a, b.high)) : (this.setUint32(a, b.high), this.setUint32(a, b.low))
        },
        __class__: Le
    };
    var fb = function() {};
    e["js.html.compat.Uint8Array"] = fb;
    fb.__name__ = ["js", "html", "compat", "Uint8Array"];
    fb._new = function(a, b, c) {
        if ("number" == typeof a) {
            c = [];
            for (b = 0; b < a;) {
                var d = b++;
                c[d] = 0
            }
            c.byteLength = c.length;
            c.byteOffset = 0;
            c.buffer = new Da(c)
        } else if (N.__instanceof(a, Da)) null == b && (b = 0), null == c && (c = a.byteLength - b), c =
            0 == b ? a.a : a.a.slice(b, b + c), c.byteLength = c.length, c.byteOffset = b, c.buffer = a;
        else if (a instanceof Array && null == a.__enum__) c = a.slice(), c.byteLength = c.length, c.byteOffset = 0, c.buffer = new Da(c);
        else throw new n("TODO " + t.string(a));
        c.subarray = fb._subarray;
        c.set = fb._set;
        return c
    };
    fb._set = function(a, b) {
        if (N.__instanceof(a.buffer, Da)) {
            if (a.byteLength + b > this.byteLength) throw new n("set() outside of range");
            for (var c = 0, d = a.byteLength; c < d;) {
                var e = c++;
                this[e + b] = a[e]
            }
        } else if (a instanceof Array && null == a.__enum__) {
            if (a.length +
                b > this.byteLength) throw new n("set() outside of range");
            c = 0;
            for (d = a.length; c < d;) e = c++, this[e + b] = a[e]
        } else throw new n("TODO");
    };
    fb._subarray = function(a, b) {
        var c = fb._new(this.slice(a, b));
        c.byteOffset = a;
        return c
    };
    var Ea = function() {
        this.zpp_inner = null
    };
    e["nape.callbacks.Callback"] = Ea;
    Ea.__name__ = ["nape", "callbacks", "Callback"];
    Ea.prototype = {
        toString: function() {
            return ""
        },
        __class__: Ea
    };
    var $d = function() {};
    e["nape.callbacks.BodyCallback"] = $d;
    $d.__name__ = ["nape", "callbacks", "BodyCallback"];
    $d.__super__ =
        Ea;
    $d.prototype = r(Ea.prototype, {
        toString: function() {
            var a;
            a = "Cb:" + ["WAKE", "SLEEP"][this.zpp_inner.event - 2];
            a += ":" + this.zpp_inner.body.outer.toString();
            return a += " : listener: " + t.string(this.zpp_inner.listener.outer)
        },
        __class__: $d
    });
    var Fa = function() {
        this.zpp_inner = null
    };
    e["nape.callbacks.Listener"] = Fa;
    Fa.__name__ = ["nape", "callbacks", "Listener"];
    Fa.prototype = {
        toString: function() {
            var a = "BEGIN,END,WAKE,SLEEP,BREAK,PRE,ONGOING".split(",")[this.zpp_inner.event];
            if (0 == this.zpp_inner.type) return "BodyListener{" +
                a + "::" + t.string(this.zpp_inner.body.outer_zn.zpp_inner_zn.options.outer) + "}";
            if (1 == this.zpp_inner.type) return "ConstraintListener{" + a + "::" + t.string(this.zpp_inner.constraint.outer_zn.zpp_inner_zn.options.outer) + "}";
            var b = this.zpp_inner.interaction,
                c;
            switch (b.itype) {
                case 1:
                    c = "COLLISION";
                    break;
                case 2:
                    c = "SENSOR";
                    break;
                case 4:
                    c = "FLUID";
                    break;
                default:
                    c = "ALL"
            }
            return (2 == this.zpp_inner.type ? "InteractionListener{" + a + "#" + c + "::" + t.string(b.outer_zni.zpp_inner_zn.options1.outer) + ":" + t.string(b.outer_zni.zpp_inner_zn.options2.outer) +
                "}" : "PreListener{" + c + "::" + t.string(b.outer_znp.zpp_inner_zn.options1.outer) + ":" + t.string(b.outer_znp.zpp_inner_zn.options2.outer) + "}") + " precedence=" + this.zpp_inner.precedence
        },
        __class__: Fa
    };
    var ae = function() {
        this.zpp_inner_zn = null
    };
    e["nape.callbacks.BodyListener"] = ae;
    ae.__name__ = ["nape", "callbacks", "BodyListener"];
    ae.__super__ = Fa;
    ae.prototype = r(Fa.prototype, {
        __class__: ae
    });
    var Ya = function() {};
    e["nape.callbacks.CbEvent"] = Ya;
    Ya.__name__ = ["nape", "callbacks", "CbEvent"];
    Ya.prototype = {
        toString: function() {
            var a;
            null == g.CbEvent_PRE && (g.internal = !0, g.CbEvent_PRE = new Ya, g.internal = !1);
            this == g.CbEvent_PRE ? a = "PRE" : (null == g.CbEvent_BEGIN && (g.internal = !0, g.CbEvent_BEGIN = new Ya, g.internal = !1), this == g.CbEvent_BEGIN ? a = "BEGIN" : (null == g.CbEvent_ONGOING && (g.internal = !0, g.CbEvent_ONGOING = new Ya, g.internal = !1), this == g.CbEvent_ONGOING ? a = "ONGOING" : (null == g.CbEvent_END && (g.internal = !0, g.CbEvent_END = new Ya, g.internal = !1), this == g.CbEvent_END ? a = "END" : (null == g.CbEvent_WAKE && (g.internal = !0, g.CbEvent_WAKE = new Ya, g.internal = !1),
                this == g.CbEvent_WAKE ? a = "WAKE" : (null == g.CbEvent_SLEEP && (g.internal = !0, g.CbEvent_SLEEP = new Ya, g.internal = !1), this == g.CbEvent_SLEEP ? a = "SLEEP" : (null == g.CbEvent_BREAK && (g.internal = !0, g.CbEvent_BREAK = new Ya, g.internal = !1), a = this == g.CbEvent_BREAK ? "BREAK" : ""))))));
            return a
        },
        __class__: Ya
    };
    var Gb = function() {
        this.zpp_inner = null;
        this.zpp_inner = new va;
        this.zpp_inner.outer = this
    };
    e["nape.callbacks.CbType"] = Gb;
    Gb.__name__ = ["nape", "callbacks", "CbType"];
    Gb.prototype = {
        toString: function() {
            return this == va.ANY_BODY ? "ANY_BODY" :
                this == va.ANY_SHAPE ? "ANY_SHAPE" : this == va.ANY_COMPOUND ? "ANY_COMPOUND" : this == va.ANY_CONSTRAINT ? "ANY_CONSTRAINT" : "CbType#" + this.zpp_inner.id
        },
        __class__: Gb
    };
    var Ga = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.callbacks.CbTypeIterator"] = Ga;
    Ga.__name__ = ["nape", "callbacks", "CbTypeIterator"];
    Ga.get = function(a) {
        var b;
        null == Ga.zpp_pool ? (Za.internal = !0, b = new Ga, Za.internal = !1) : (b = Ga.zpp_pool, Ga.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Ga.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Ga.zpp_pool;
            Ga.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Ga
    };
    var be = function() {
        this.zpp_inner = null;
        this.zpp_inner = new Za;
        this.zpp_inner.outer = this
    };
    e["nape.callbacks.CbTypeList"] = be;
    be.__name__ = ["nape", "callbacks", "CbTypeList"];
    be.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Ga.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: be
    };
    var ce = function() {};
    e["nape.callbacks.ConstraintCallback"] = ce;
    ce.__name__ = ["nape", "callbacks", "ConstraintCallback"];
    ce.__super__ = Ea;
    ce.prototype = r(Ea.prototype, {
        toString: function() {
            var a;
            a = "Cb:" + ["WAKE", "SLEEP", "BREAK"][this.zpp_inner.event - 2];
            a += ":" + this.zpp_inner.constraint.outer.toString();
            return a += " : listener: " + t.string(this.zpp_inner.listener.outer)
        },
        __class__: ce
    });
    var de = function() {
        this.zpp_inner_zn = null
    };
    e["nape.callbacks.ConstraintListener"] = de;
    de.__name__ = ["nape", "callbacks", "ConstraintListener"];
    de.__super__ = Fa;
    de.prototype = r(Fa.prototype, {
        __class__: de
    });
    var ee = function() {};
    e["nape.callbacks.InteractionCallback"] = ee;
    ee.__name__ = ["nape", "callbacks", "InteractionCallback"];
    ee.__super__ = Ea;
    ee.prototype = r(Ea.prototype, {
        toString: function() {
            var a;
            a = "Cb:" + "BEGIN,END,,,,,ONGOING".split(",")[this.zpp_inner.event];
            a += ":" + this.zpp_inner.int1.outer_i.toString() + "/" + this.zpp_inner.int2.outer_i.toString();
            a += " : " + this.zpp_inner.wrap_arbiters.toString();
            return a += " : listener: " + t.string(this.zpp_inner.listener.outer)
        },
        __class__: ee
    });
    var fe = function() {
        this.zpp_inner_zn = null
    };
    e["nape.callbacks.InteractionListener"] = fe;
    fe.__name__ = ["nape", "callbacks", "InteractionListener"];
    fe.__super__ = Fa;
    fe.prototype = r(Fa.prototype, {
        __class__: fe
    });
    var Hb = function() {};
    e["nape.callbacks.InteractionType"] = Hb;
    Hb.__name__ = ["nape", "callbacks",
        "InteractionType"
    ];
    Hb.prototype = {
        toString: function() {
            var a;
            null == g.InteractionType_COLLISION && (g.internal = !0, g.InteractionType_COLLISION = new Hb, g.internal = !1);
            this == g.InteractionType_COLLISION ? a = "COLLISION" : (null == g.InteractionType_SENSOR && (g.internal = !0, g.InteractionType_SENSOR = new Hb, g.internal = !1), this == g.InteractionType_SENSOR ? a = "SENSOR" : (null == g.InteractionType_FLUID && (g.internal = !0, g.InteractionType_FLUID = new Hb, g.internal = !1), this == g.InteractionType_FLUID ? a = "FLUID" : (null == g.InteractionType_ANY &&
                (g.internal = !0, g.InteractionType_ANY = new Hb, g.internal = !1), a = this == g.InteractionType_ANY ? "ANY" : "")));
            return a
        },
        __class__: Hb
    };
    var Ha = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.callbacks.ListenerIterator"] = Ha;
    Ha.__name__ = ["nape", "callbacks", "ListenerIterator"];
    Ha.get = function(a) {
        var b;
        null == Ha.zpp_pool ? (bc.internal = !0, b = new Ha, bc.internal = !1) : (b = Ha.zpp_pool, Ha.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Ha.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Ha.zpp_pool;
            Ha.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Ha
    };
    var Me = function() {
        this.zpp_inner = null
    };
    e["nape.callbacks.ListenerList"] = Me;
    Me.__name__ = ["nape", "callbacks", "ListenerList"];
    Me.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length =
                this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Ha.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Me
    };
    var Ib = function() {};
    e["nape.callbacks.ListenerType"] = Ib;
    Ib.__name__ = ["nape", "callbacks", "ListenerType"];
    Ib.prototype = {
        toString: function() {
            var a;
            null == g.ListenerType_BODY && (g.internal = !0, g.ListenerType_BODY = new Ib, g.internal = !1);
            this == g.ListenerType_BODY ? a = "BODY" : (null == g.ListenerType_CONSTRAINT && (g.internal = !0, g.ListenerType_CONSTRAINT =
                new Ib, g.internal = !1), this == g.ListenerType_CONSTRAINT ? a = "CONSTRAINT" : (null == g.ListenerType_INTERACTION && (g.internal = !0, g.ListenerType_INTERACTION = new Ib, g.internal = !1), this == g.ListenerType_INTERACTION ? a = "INTERACTION" : (null == g.ListenerType_PRE && (g.internal = !0, g.ListenerType_PRE = new Ib, g.internal = !1), a = this == g.ListenerType_PRE ? "PRE" : "")));
            return a
        },
        __class__: Ib
    };
    var Ne = function() {
        this.zpp_inner = null
    };
    e["nape.callbacks.OptionType"] = Ne;
    Ne.__name__ = ["nape", "callbacks", "OptionType"];
    Ne.prototype = {
        toString: function() {
            null ==
                this.zpp_inner.wrap_includes && this.zpp_inner.setup_includes();
            var a = this.zpp_inner.wrap_includes.toString();
            null == this.zpp_inner.wrap_excludes && this.zpp_inner.setup_excludes();
            return "@{" + a + " excluding " + this.zpp_inner.wrap_excludes.toString() + "}"
        },
        __class__: Ne
    };
    var ge = function() {};
    e["nape.callbacks.PreCallback"] = ge;
    ge.__name__ = ["nape", "callbacks", "PreCallback"];
    ge.__super__ = Ea;
    ge.prototype = r(Ea.prototype, {
        toString: function() {
            var a;
            a = "Cb:PRE:" + (":" + this.zpp_inner.int1.outer_i.toString() + "/" + this.zpp_inner.int2.outer_i.toString());
            a += " : " + this.zpp_inner.pre_arbiter.wrapper().toString();
            return a += " : listnener: " + t.string(this.zpp_inner.listener.outer)
        },
        __class__: ge
    });
    var Ia = function() {};
    e["nape.callbacks.PreFlag"] = Ia;
    Ia.__name__ = ["nape", "callbacks", "PreFlag"];
    Ia.prototype = {
        toString: function() {
            var a;
            null == g.PreFlag_ACCEPT && (g.internal = !0, g.PreFlag_ACCEPT = new Ia, g.internal = !1);
            this == g.PreFlag_ACCEPT ? a = "ACCEPT" : (null == g.PreFlag_IGNORE && (g.internal = !0, g.PreFlag_IGNORE = new Ia, g.internal = !1), this == g.PreFlag_IGNORE ? a = "IGNORE" : (null ==
                g.PreFlag_ACCEPT_ONCE && (g.internal = !0, g.PreFlag_ACCEPT_ONCE = new Ia, g.internal = !1), this == g.PreFlag_ACCEPT_ONCE ? a = "ACCEPT_ONCE" : (null == g.PreFlag_IGNORE_ONCE && (g.internal = !0, g.PreFlag_IGNORE_ONCE = new Ia, g.internal = !1), a = this == g.PreFlag_IGNORE_ONCE ? "IGNORE_ONCE" : "")));
            return a
        },
        __class__: Ia
    };
    var he = function() {
        this.zpp_inner_zn = null
    };
    e["nape.callbacks.PreListener"] = he;
    he.__name__ = ["nape", "callbacks", "PreListener"];
    he.__super__ = Fa;
    he.prototype = r(Fa.prototype, {
        __class__: he
    });
    var Oe = function() {};
    e["nape.constraint.Constraint"] =
        Oe;
    Oe.__name__ = ["nape", "constraint", "Constraint"];
    Oe.prototype = {
        toString: function() {
            return "{Constraint}"
        },
        __class__: Oe
    };
    var Ja = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.constraint.ConstraintIterator"] = Ja;
    Ja.__name__ = ["nape", "constraint", "ConstraintIterator"];
    Ja.get = function(a) {
        var b;
        null == Ja.zpp_pool ? (cc.internal = !0, b = new Ja, cc.internal = !1) : (b = Ja.zpp_pool, Ja.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Ja.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Ja.zpp_pool;
            Ja.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Ja
    };
    var Pe = function() {
        this.zpp_inner = null
    };
    e["nape.constraint.ConstraintList"] = Pe;
    Pe.__name__ = ["nape", "constraint", "ConstraintList"];
    Pe.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length =
                this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Ja.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Pe
    };
    var ub = function() {
        this.zpp_inner = null
    };
    e["nape.dynamics.Arbiter"] = ub;
    ub.__name__ = ["nape", "dynamics", "Arbiter"];
    ub.prototype = {
        get_state: function() {
            var a = this.zpp_inner.immState;
            if (5 == a) return null == g.PreFlag_ACCEPT && (g.internal = !0, g.PreFlag_ACCEPT = new Ia, g.internal = !1), g.PreFlag_ACCEPT;
            switch (a) {
                case 1:
                    return null == g.PreFlag_ACCEPT_ONCE &&
                        (g.internal = !0, g.PreFlag_ACCEPT_ONCE = new Ia, g.internal = !1), g.PreFlag_ACCEPT_ONCE;
                default:
                    if (6 == a) return null == g.PreFlag_IGNORE && (g.internal = !0, g.PreFlag_IGNORE = new Ia, g.internal = !1), g.PreFlag_IGNORE;
                    null == g.PreFlag_IGNORE_ONCE && (g.internal = !0, g.PreFlag_IGNORE_ONCE = new Ia, g.internal = !1);
                    return g.PreFlag_IGNORE_ONCE
            }
        },
        toString: function() {
            var a;
            a = this.zpp_inner.type == ha.COL ? "CollisionArbiter" : this.zpp_inner.type == ha.FLUID ? "FluidArbiter" : "SensorArbiter";
            return this.zpp_inner.cleared ? a + "(object-pooled)" :
                a + "(" + (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws2.outer : this.zpp_inner.ws1.outer).toString() + "|" + (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws1.outer : this.zpp_inner.ws2.outer).toString() + ")" + (this.zpp_inner.type == ha.COL ? "[" + ["SD", "DD"][this.zpp_inner.colarb.stat ? 0 : 1] + "]" : "") + "<-" + this.get_state().toString()
        },
        __class__: ub
    };
    var Ka = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.dynamics.ArbiterIterator"] = Ka;
    Ka.__name__ = ["nape", "dynamics", "ArbiterIterator"];
    Ka.get = function(a) {
        var b;
        null == Ka.zpp_pool ? (dc.internal = !0, b = new Ka, dc.internal = !1) : (b = Ka.zpp_pool, Ka.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Ka.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.zpp_gl();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Ka.zpp_pool;
            Ka.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Ka
    };
    var Qe = function() {
        this.zpp_inner = null
    };
    e["nape.dynamics.ArbiterList"] = Qe;
    Qe.__name__ = ["nape", "dynamics", "ArbiterList"];
    Qe.prototype = {
        zpp_gl: function() {
            this.zpp_inner.valmod();
            if (this.zpp_inner.zip_length) {
                this.zpp_inner.zip_length = !1;
                this.zpp_inner.user_length = 0;
                for (var a = this.zpp_inner.inner.head; null != a;) a.elt.active && this.zpp_inner.user_length++, a = a.next
            }
            return this.zpp_inner.user_length
        },
        zpp_vm: function() {
            this.zpp_inner.valmod()
        },
        at: function(a) {
            this.zpp_vm();
            this.zpp_inner.reverse_flag &&
                (a = this.zpp_gl() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) {
                this.zpp_inner.at_index = 0;
                for (this.zpp_inner.at_ite = this.zpp_inner.inner.head; !this.zpp_inner.at_ite.elt.active;) this.zpp_inner.at_ite = this.zpp_inner.at_ite.next
            }
            for (; this.zpp_inner.at_index != a;) {
                this.zpp_inner.at_index++;
                for (this.zpp_inner.at_ite = this.zpp_inner.at_ite.next; !this.zpp_inner.at_ite.elt.active;) this.zpp_inner.at_ite = this.zpp_inner.at_ite.next
            }
            return this.zpp_inner.at_ite.elt.wrapper()
        },
        iterator: function() {
            this.zpp_vm();
            return Ka.get(this)
        },
        toString: function() {
            for (var a = "[", b = !0, c = this.iterator(); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Qe
    };
    var ec = function() {};
    e["nape.dynamics.ArbiterType"] = ec;
    ec.__name__ = ["nape", "dynamics", "ArbiterType"];
    ec.prototype = {
        toString: function() {
            var a;
            null == g.ArbiterType_COLLISION && (g.internal = !0, g.ArbiterType_COLLISION = new ec, g.internal = !1);
            this == g.ArbiterType_COLLISION ? a = "COLLISION" : (null ==
                g.ArbiterType_SENSOR && (g.internal = !0, g.ArbiterType_SENSOR = new ec, g.internal = !1), this == g.ArbiterType_SENSOR ? a = "SENSOR" : (null == g.ArbiterType_FLUID && (g.internal = !0, g.ArbiterType_FLUID = new ec, g.internal = !1), a = this == g.ArbiterType_FLUID ? "FLUID" : ""));
            return a
        },
        __class__: ec
    };
    var kd = function() {
        this.zpp_inner = null
    };
    e["nape.dynamics.CollisionArbiter"] = kd;
    kd.__name__ = ["nape", "dynamics", "CollisionArbiter"];
    kd.__super__ = ub;
    kd.prototype = r(ub.prototype, {
        __class__: kd
    });
    var ie = function() {
        this.zpp_inner = null
    };
    e["nape.dynamics.Contact"] =
        ie;
    ie.__name__ = ["nape", "dynamics", "Contact"];
    ie.prototype = {
        toString: function() {
            return null == this.zpp_inner.arbiter || this.zpp_inner.arbiter.cleared ? "{object-pooled}" : "{Contact}"
        },
        __class__: ie
    };
    var La = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.dynamics.ContactIterator"] = La;
    La.__name__ = ["nape", "dynamics", "ContactIterator"];
    La.get = function(a) {
        var b;
        null == La.zpp_pool ? (fc.internal = !0, b = new La, fc.internal = !1) : (b = La.zpp_pool, La.zpp_pool = b.zpp_next);
        b.zpp_i =
            0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    La.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = La.zpp_pool;
            La.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: La
    };
    var Re = function() {
        this.zpp_inner = null
    };
    e["nape.dynamics.ContactList"] = Re;
    Re.__name__ = ["nape", "dynamics", "ContactList"];
    Re.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            if (this.zpp_inner.zip_length) {
                this.zpp_inner.zip_length = !1;
                this.zpp_inner.user_length = 0;
                for (var a = this.zpp_inner.inner.next; null != a;) {
                    var b = a;
                    b.active && b.arbiter.active && this.zpp_inner.user_length++;
                    a = a.next
                }
            }
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) {
                this.zpp_inner.at_index = 0;
                for (this.zpp_inner.at_ite = this.zpp_inner.inner.next;;) {
                    var b = this.zpp_inner.at_ite;
                    if (b.active && b.arbiter.active) break;
                    this.zpp_inner.at_ite = this.zpp_inner.at_ite.next
                }
            }
            for (; this.zpp_inner.at_index != a;) {
                this.zpp_inner.at_index++;
                for (this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;;) {
                    b = this.zpp_inner.at_ite;
                    if (b.active && b.arbiter.active) break;
                    this.zpp_inner.at_ite = this.zpp_inner.at_ite.next
                }
            }
            return this.zpp_inner.at_ite.wrapper()
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = La.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b ||
                    (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Re
    };
    var ld = function() {
        this.zpp_inner = null
    };
    e["nape.dynamics.FluidArbiter"] = ld;
    ld.__name__ = ["nape", "dynamics", "FluidArbiter"];
    ld.__super__ = ub;
    ld.prototype = r(ub.prototype, {
        __class__: ld
    });
    var Se = function() {};
    e["nape.dynamics.InteractionFilter"] = Se;
    Se.__name__ = ["nape", "dynamics", "InteractionFilter"];
    Se.prototype = {
        __class__: Se
    };
    var Te = function() {
        this.zpp_inner = null
    };
    e["nape.dynamics.InteractionGroup"] = Te;
    Te.__name__ = ["nape", "dynamics",
        "InteractionGroup"
    ];
    Te.prototype = {
        toString: function() {
            var a = "InteractionGroup";
            this.zpp_inner.ignore && (a += ":ignore");
            return a
        },
        __class__: Te
    };
    var Ma = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.dynamics.InteractionGroupIterator"] = Ma;
    Ma.__name__ = ["nape", "dynamics", "InteractionGroupIterator"];
    Ma.get = function(a) {
        var b;
        null == Ma.zpp_pool ? (gc.internal = !0, b = new Ma, gc.internal = !1) : (b = Ma.zpp_pool, Ma.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Ma.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Ma.zpp_pool;
            Ma.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Ma
    };
    var Ue = function() {
        this.zpp_inner = null
    };
    e["nape.dynamics.InteractionGroupList"] = Ue;
    Ue.__name__ = ["nape", "dynamics", "InteractionGroupList"];
    Ue.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Ma.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Ue
    };
    var Ve = function() {
        this.zpp_inner = null
    };
    e["nape.geom.AABB"] = Ve;
    Ve.__name__ = ["nape", "geom", "AABB"];
    Ve.prototype = {
        toString: function() {
            this.zpp_inner.validate();
            return this.zpp_inner.toString()
        },
        __class__: Ve
    };
    var We = function() {
        this.zpp_inner = null
    };
    e["nape.geom.ConvexResult"] = We;
    We.__name__ = ["nape", "geom", "ConvexResult"];
    We.prototype = {
        toString: function() {
            return "{ shape: " + t.string(this.zpp_inner.shape) + " toi: " + this.zpp_inner.toiDistance + " }"
        },
        __class__: We
    };
    var Na = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.geom.ConvexResultIterator"] = Na;
    Na.__name__ = ["nape", "geom", "ConvexResultIterator"];
    Na.get = function(a) {
        var b;
        null == Na.zpp_pool ? (hc.internal = !0, b = new Na, hc.internal = !1) : (b = Na.zpp_pool, Na.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Na.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Na.zpp_pool;
            Na.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Na
    };
    var Xe = function() {
        this.zpp_inner = null
    };
    e["nape.geom.ConvexResultList"] = Xe;
    Xe.__name__ = ["nape", "geom", "ConvexResultList"];
    Xe.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Na.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Xe
    };
    var Ye = function() {
        this.zpp_inner = null
    };
    e["nape.geom.GeomPoly"] = Ye;
    Ye.__name__ = ["nape", "geom", "GeomPoly"];
    Ye.prototype = {
        toString: function() {
            var a = "GeomPoly[",
                b = this.zpp_inner.vertices,
                c = this.zpp_inner.vertices;
            if (null != b) {
                do {
                    var d = b;
                    d != this.zpp_inner.vertices && (a += ",");
                    a += "{" +
                        d.x + "," + d.y + "}";
                    b = b.next
                } while (b != c)
            }
            return a + "]"
        },
        __class__: Ye
    };
    var Oa = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.geom.GeomPolyIterator"] = Oa;
    Oa.__name__ = ["nape", "geom", "GeomPolyIterator"];
    Oa.get = function(a) {
        var b;
        null == Oa.zpp_pool ? (ic.internal = !0, b = new Oa, ic.internal = !1) : (b = Oa.zpp_pool, Oa.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Oa.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Oa.zpp_pool;
            Oa.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Oa
    };
    var Ze = function() {
        this.zpp_inner = null
    };
    e["nape.geom.GeomPolyList"] = Ze;
    Ze.__name__ = ["nape", "geom", "GeomPolyList"];
    Ze.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Oa.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Ze
    };
    var $e = function() {
        this.zpp_inner = null
    };
    e["nape.geom.Mat23"] = $e;
    $e.__name__ = ["nape", "geom", "Mat23"];
    $e.prototype = {
        toString: function() {
            return "{ a: " + this.zpp_inner.a + " b: " + this.zpp_inner.b + " c: " + this.zpp_inner.c + " d: " + this.zpp_inner.d + " tx: " + this.zpp_inner.tx + " ty: " + this.zpp_inner.ty + " }"
        },
        __class__: $e
    };
    var af = function() {
        this.zpp_inner = null
    };
    e["nape.geom.MatMN"] = af;
    af.__name__ = ["nape",
        "geom", "MatMN"
    ];
    af.prototype = {
        toString: function() {
            for (var a = "{ ", b = !0, c = 0, d = this.zpp_inner.m; c < d;) {
                var e = c++;
                b || (a += "; ");
                for (var b = !1, g = 0, h = this.zpp_inner.n; g < h;) var i = g++,
                    a = a + (this.zpp_inner.x[e * this.zpp_inner.n + i] + " ")
            }
            return a + "}"
        },
        __class__: af
    };
    var bf = function() {
        this.zpp_inner = null
    };
    e["nape.geom.RayResult"] = bf;
    bf.__name__ = ["nape", "geom", "RayResult"];
    bf.prototype = {
        toString: function() {
            return "{ shape: " + t.string(this.zpp_inner.shape) + " distance: " + this.zpp_inner.toiDistance + " ?inner: " + t.string(this.zpp_inner.inner) +
                " }"
        },
        __class__: bf
    };
    var Pa = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.geom.RayResultIterator"] = Pa;
    Pa.__name__ = ["nape", "geom", "RayResultIterator"];
    Pa.get = function(a) {
        var b;
        null == Pa.zpp_pool ? (jc.internal = !0, b = new Pa, jc.internal = !1) : (b = Pa.zpp_pool, Pa.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Pa.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i <
                a) return !0;
            this.zpp_next = Pa.zpp_pool;
            Pa.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Pa
    };
    var cf = function() {
        this.zpp_inner = null
    };
    e["nape.geom.RayResultList"] = cf;
    cf.__name__ = ["nape", "geom", "RayResultList"];
    cf.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Pa.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: cf
    };
    var je = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.zpp_inner = null;
        this.zpp_inner = Qa.get(a, b, null);
        this.zpp_inner.outer = this
    };
    e["nape.geom.Vec2"] = je;
    je.__name__ = ["nape", "geom", "Vec2"];
    je.prototype = {
        toString: function() {
            this.zpp_inner.validate();
            return this.zpp_inner.toString()
        },
        __class__: je
    };
    var Ra = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.geom.Vec2Iterator"] = Ra;
    Ra.__name__ = ["nape",
        "geom", "Vec2Iterator"
    ];
    Ra.get = function(a) {
        var b;
        null == Ra.zpp_pool ? (kc.internal = !0, b = new Ra, kc.internal = !1) : (b = Ra.zpp_pool, Ra.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Ra.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.zpp_gl();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Ra.zpp_pool;
            Ra.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Ra
    };
    var df = function() {
        this.zpp_inner = null
    };
    e["nape.geom.Vec2List"] = df;
    df.__name__ = ["nape", "geom", "Vec2List"];
    df.prototype = {
        zpp_gl: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        zpp_vm: function() {
            this.zpp_inner.valmod()
        },
        at: function(a) {
            this.zpp_vm();
            this.zpp_inner.reverse_flag && (a = this.zpp_gl() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index =
                a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.wrapper()
        },
        iterator: function() {
            this.zpp_vm();
            return Ra.get(this)
        },
        toString: function() {
            for (var a = "[", b = !0, c = this.iterator(); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: df
    };
    var ef = function() {
        this.zpp_inner =
            null
    };
    e["nape.geom.Vec3"] = ef;
    ef.__name__ = ["nape", "geom", "Vec3"];
    ef.prototype = {
        toString: function() {
            this.zpp_inner.validate();
            var a = "{ x: " + this.zpp_inner.x + " y: ";
            this.zpp_inner.validate();
            a = a + this.zpp_inner.y + " z: ";
            this.zpp_inner.validate();
            return a + this.zpp_inner.z + " }"
        },
        __class__: ef
    };
    var lc = function() {};
    e["nape.geom.Winding"] = lc;
    lc.__name__ = ["nape", "geom", "Winding"];
    lc.prototype = {
        toString: function() {
            var a;
            null == g.Winding_UNDEFINED && (g.internal = !0, g.Winding_UNDEFINED = new lc, g.internal = !1);
            this ==
                g.Winding_UNDEFINED ? a = "UNDEFINED" : (null == g.Winding_CLOCKWISE && (g.internal = !0, g.Winding_CLOCKWISE = new lc, g.internal = !1), this == g.Winding_CLOCKWISE ? a = "CLOCKWISE" : (null == g.Winding_ANTICLOCKWISE && (g.internal = !0, g.Winding_ANTICLOCKWISE = new lc, g.internal = !1), a = this == g.Winding_ANTICLOCKWISE ? "ANTICLOCKWISE" : ""));
            return a
        },
        __class__: lc
    };
    var gb = function() {
        this.zpp_inner_i = null
    };
    e["nape.phys.Interactor"] = gb;
    gb.__name__ = ["nape", "phys", "Interactor"];
    gb.prototype = {
        toString: function() {
            return ""
        },
        __class__: gb
    };
    var ke =
        function() {
            this.zpp_inner = null
        };
    e["nape.phys.Body"] = ke;
    ke.__name__ = ["nape", "phys", "Body"];
    ke.__super__ = gb;
    ke.prototype = r(gb.prototype, {
        toString: function() {
            return (this.zpp_inner.world ? "(space::world" : "(" + (2 == this.zpp_inner.type ? "dynamic" : 1 == this.zpp_inner.type ? "static" : "kinematic")) + ")#" + this.zpp_inner_i.id
        },
        __class__: ke
    });
    var Sa = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.phys.BodyIterator"] = Sa;
    Sa.__name__ = ["nape", "phys", "BodyIterator"];
    Sa.get = function(a) {
        var b;
        null == Sa.zpp_pool ? (mc.internal = !0, b = new Sa, mc.internal = !1) : (b = Sa.zpp_pool, Sa.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Sa.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Sa.zpp_pool;
            Sa.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Sa
    };
    var ff = function() {
        this.zpp_inner = null
    };
    e["nape.phys.BodyList"] =
        ff;
    ff.__name__ = ["nape", "phys", "BodyList"];
    ff.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index !=
                    a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Sa.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: ff
    };
    var nc = function() {};
    e["nape.phys.BodyType"] = nc;
    nc.__name__ = ["nape", "phys", "BodyType"];
    nc.prototype = {
        toString: function() {
            var a;
            null == g.BodyType_STATIC && (g.internal = !0, g.BodyType_STATIC = new nc, g.internal = !1);
            this == g.BodyType_STATIC ? a = "STATIC" : (null == g.BodyType_DYNAMIC && (g.internal = !0, g.BodyType_DYNAMIC = new nc, g.internal = !1), this == g.BodyType_DYNAMIC ? a = "DYNAMIC" : (null == g.BodyType_KINEMATIC && (g.internal = !0, g.BodyType_KINEMATIC = new nc, g.internal = !1), a = this == g.BodyType_KINEMATIC ? "KINEMATIC" : ""));
            return a
        },
        __class__: nc
    };
    var le = function() {};
    e["nape.phys.Compound"] = le;
    le.__name__ = ["nape", "phys", "Compound"];
    le.__super__ = gb;
    le.prototype = r(gb.prototype, {
        toString: function() {
            return "Compound" +
                this.zpp_inner_i.id
        },
        __class__: le
    });
    var Ta = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.phys.CompoundIterator"] = Ta;
    Ta.__name__ = ["nape", "phys", "CompoundIterator"];
    Ta.get = function(a) {
        var b;
        null == Ta.zpp_pool ? (oc.internal = !0, b = new Ta, oc.internal = !1) : (b = Ta.zpp_pool, Ta.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Ta.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Ta.zpp_pool;
            Ta.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Ta
    };
    var gf = function() {
        this.zpp_inner = null
    };
    e["nape.phys.CompoundList"] = gf;
    gf.__name__ = ["nape", "phys", "CompoundList"];
    gf.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Ta.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: gf
    };
    var hf = function() {
        this.zpp_inner = null
    };
    e["nape.phys.FluidProperties"] = hf;
    hf.__name__ = ["nape", "phys", "FluidProperties"];
    hf.prototype = {
        toString: function() {
            return "{ density: " + 1E3 * this.zpp_inner.density + " viscosity: " + this.zpp_inner.viscosity + " gravity: " + t.string(this.zpp_inner.wrap_gravity) + " }"
        },
        __class__: hf
    };
    var pc = function() {};
    e["nape.phys.GravMassMode"] = pc;
    pc.__name__ = ["nape", "phys", "GravMassMode"];
    pc.prototype = {
        toString: function() {
            var a;
            null == g.GravMassMode_DEFAULT && (g.internal = !0, g.GravMassMode_DEFAULT = new pc, g.internal = !1);
            this == g.GravMassMode_DEFAULT ? a = "DEFAULT" : (null == g.GravMassMode_FIXED && (g.internal = !0, g.GravMassMode_FIXED = new pc, g.internal = !1), this == g.GravMassMode_FIXED ? a = "FIXED" : (null == g.GravMassMode_SCALED && (g.internal = !0, g.GravMassMode_SCALED = new pc, g.internal = !1), a = this == g.GravMassMode_SCALED ? "SCALED" : ""));
            return a
        },
        __class__: pc
    };
    var md = function() {};
    e["nape.phys.InertiaMode"] = md;
    md.__name__ = ["nape", "phys", "InertiaMode"];
    md.prototype = {
        toString: function() {
            var a;
            null == g.InertiaMode_DEFAULT && (g.internal = !0, g.InertiaMode_DEFAULT = new md, g.internal = !1);
            this == g.InertiaMode_DEFAULT ? a = "DEFAULT" : (null == g.InertiaMode_FIXED && (g.internal = !0, g.InertiaMode_FIXED = new md, g.internal = !1), a = this == g.InertiaMode_FIXED ? "FIXED" : "");
            return a
        },
        __class__: md
    };
    var Ua = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.phys.InteractorIterator"] = Ua;
    Ua.__name__ = ["nape",
        "phys", "InteractorIterator"
    ];
    Ua.get = function(a) {
        var b;
        null == Ua.zpp_pool ? (qc.internal = !0, b = new Ua, qc.internal = !1) : (b = Ua.zpp_pool, Ua.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Ua.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Ua.zpp_pool;
            Ua.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Ua
    };
    var jf = function() {
        this.zpp_inner = null
    };
    e["nape.phys.InteractorList"] = jf;
    jf.__name__ = ["nape", "phys", "InteractorList"];
    jf.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index =
                a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer_i
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Ua.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: jf
    };
    var nd = function() {};
    e["nape.phys.MassMode"] = nd;
    nd.__name__ = ["nape",
        "phys", "MassMode"
    ];
    nd.prototype = {
        toString: function() {
            var a;
            null == g.MassMode_DEFAULT && (g.internal = !0, g.MassMode_DEFAULT = new nd, g.internal = !1);
            this == g.MassMode_DEFAULT ? a = "DEFAULT" : (null == g.MassMode_FIXED && (g.internal = !0, g.MassMode_FIXED = new nd, g.internal = !1), a = this == g.MassMode_FIXED ? "FIXED" : "");
            return a
        },
        __class__: nd
    };
    var kf = function() {
        this.zpp_inner = null
    };
    e["nape.phys.Material"] = kf;
    kf.__name__ = ["nape", "phys", "Material"];
    kf.prototype = {
        toString: function() {
            return "{ elasticity: " + this.zpp_inner.elasticity +
                " dynamicFriction: " + this.zpp_inner.dynamicFriction + " staticFriction: " + this.zpp_inner.staticFriction + " density: " + 1E3 * this.zpp_inner.density + " rollingFriction: " + this.zpp_inner.rollingFriction + " }"
        },
        __class__: kf
    };
    var vb = function() {
        this.zpp_inner = null
    };
    e["nape.shape.Shape"] = vb;
    vb.__name__ = ["nape", "shape", "Shape"];
    vb.__super__ = gb;
    vb.prototype = r(gb.prototype, {
        toString: function() {
            return (0 == this.zpp_inner.type ? "Circle" : "Polygon") + "#" + this.zpp_inner_i.id
        },
        __class__: vb
    });
    var me = function() {};
    e["nape.shape.Circle"] =
        me;
    me.__name__ = ["nape", "shape", "Circle"];
    me.__super__ = vb;
    me.prototype = r(vb.prototype, {
        __class__: me
    });
    var ne = function() {
        this.zpp_inner = null
    };
    e["nape.shape.Edge"] = ne;
    ne.__name__ = ["nape", "shape", "Edge"];
    ne.prototype = {
        toString: function() {
            if (null == this.zpp_inner.polygon) return "Edge(object-pooled)";
            if (null == this.zpp_inner.polygon.body) return this.zpp_inner.polygon.validate_laxi(), "{ localNormal : " + ("{ x: " + this.zpp_inner.lnormx + " y: " + this.zpp_inner.lnormy + " }") + " }";
            this.zpp_inner.polygon.validate_gaxi();
            return "{ localNormal : " + ("{ x: " + this.zpp_inner.lnormx + " y: " + this.zpp_inner.lnormy + " }") + " worldNormal : " + ("{ x: " + this.zpp_inner.gnormx + " y: " + this.zpp_inner.gnormy + " }") + " }"
        },
        __class__: ne
    };
    var Va = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    e["nape.shape.EdgeIterator"] = Va;
    Va.__name__ = ["nape", "shape", "EdgeIterator"];
    Va.get = function(a) {
        var b;
        null == Va.zpp_pool ? (rc.internal = !0, b = new Va, rc.internal = !1) : (b = Va.zpp_pool, Va.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner =
            a;
        b.zpp_critical = !1;
        return b
    };
    Va.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Va.zpp_pool;
            Va.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Va
    };
    var lf = function() {
        this.zpp_inner = null
    };
    e["nape.shape.EdgeList"] = lf;
    lf.__name__ = ["nape", "shape", "EdgeList"];
    lf.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && a != this.get_length() - 1 && (a = this.get_length() - 2 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.wrapper()
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Va.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: lf
    };
    var oe = function() {};
    e["nape.shape.Polygon"] = oe;
    oe.__name__ = ["nape", "shape", "Polygon"];
    oe.__super__ = vb;
    oe.prototype = r(vb.prototype, {
        __class__: oe
    });
    var Wa = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner =
            null
    };
    e["nape.shape.ShapeIterator"] = Wa;
    Wa.__name__ = ["nape", "shape", "ShapeIterator"];
    Wa.get = function(a) {
        var b;
        null == Wa.zpp_pool ? (sc.internal = !0, b = new Wa, sc.internal = !1) : (b = Wa.zpp_pool, Wa.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Wa.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Wa.zpp_pool;
            Wa.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Wa
    };
    var mf = function() {
        this.zpp_inner = null
    };
    e["nape.shape.ShapeList"] = mf;
    mf.__name__ = ["nape", "shape", "ShapeList"];
    mf.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null ==
                this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Wa.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: mf
    };
    var od = function() {};
    e["nape.shape.ShapeType"] = od;
    od.__name__ = ["nape", "shape", "ShapeType"];
    od.prototype = {
        toString: function() {
            var a;
            null == g.ShapeType_CIRCLE && (g.internal = !0, g.ShapeType_CIRCLE = new od, g.internal = !1);
            this == g.ShapeType_CIRCLE ? a = "CIRCLE" : (null == g.ShapeType_POLYGON && (g.internal = !0, g.ShapeType_POLYGON = new od, g.internal = !1), a = this == g.ShapeType_POLYGON ? "POLYGON" : "");
            return a
        },
        __class__: od
    };
    var Jb = function() {};
    e["nape.shape.ValidationResult"] = Jb;
    Jb.__name__ = ["nape", "shape", "ValidationResult"];
    Jb.prototype = {
        toString: function() {
            var a;
            null == g.ValidationResult_VALID && (g.internal = !0, g.ValidationResult_VALID = new Jb, g.internal = !1);
            this == g.ValidationResult_VALID ? a = "VALID" : (null == g.ValidationResult_DEGENERATE && (g.internal = !0, g.ValidationResult_DEGENERATE = new Jb, g.internal = !1), this == g.ValidationResult_DEGENERATE ? a = "DEGENERATE" : (null == g.ValidationResult_CONCAVE && (g.internal = !0, g.ValidationResult_CONCAVE = new Jb, g.internal = !1), this == g.ValidationResult_CONCAVE ? a = "CONCAVE" : (null == g.ValidationResult_SELF_INTERSECTING && (g.internal = !0, g.ValidationResult_SELF_INTERSECTING =
                new Jb, g.internal = !1), a = this == g.ValidationResult_SELF_INTERSECTING ? "SELF_INTERSECTING" : "")));
            return a
        },
        __class__: Jb
    };
    var pd = function() {};
    e["nape.space.Broadphase"] = pd;
    pd.__name__ = ["nape", "space", "Broadphase"];
    pd.prototype = {
        toString: function() {
            var a;
            null == g.Broadphase_DYNAMIC_AABB_TREE && (g.internal = !0, g.Broadphase_DYNAMIC_AABB_TREE = new pd, g.internal = !1);
            this == g.Broadphase_DYNAMIC_AABB_TREE ? a = "DYNAMIC_AABB_TREE" : (null == g.Broadphase_SWEEP_AND_PRUNE && (g.internal = !0, g.Broadphase_SWEEP_AND_PRUNE = new pd,
                g.internal = !1), a = this == g.Broadphase_SWEEP_AND_PRUNE ? "SWEEP_AND_PRUNE" : "");
            return a
        },
        __class__: pd
    };
    var nf = function() {};
    e["nape.space.Space"] = nf;
    nf.__name__ = ["nape", "space", "Space"];
    nf.prototype = {
        __class__: nf
    };
    var qd = function() {};
    e["zpp_nape.ZPP_ID"] = qd;
    qd.__name__ = ["zpp_nape", "ZPP_ID"];
    qd.CbType = function() {
        return qd._CbType++
    };
    var of = function() {
        this.listener = this.int1 = this.int2 = this.wrap_arbiters = this.pre_arbiter = this.body = this.constraint = null;
        this.event = 0
    };
    e["zpp_nape.callbacks.ZPP_Callback"] = of ; of .__name__ = ["zpp_nape", "callbacks", "ZPP_Callback"]; of .prototype = {
        __class__: of
    };
    var pe = function() {};
    e["zpp_nape.util.ZNPList_ZPP_InteractionListener"] = pe;
    pe.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_InteractionListener"];
    pe.prototype = {
        __class__: pe
    };
    var qe = function() {};
    e["zpp_nape.util.ZNPList_ZPP_BodyListener"] = qe;
    qe.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_BodyListener"];
    qe.prototype = {
        __class__: qe
    };
    var re = function() {};
    e["zpp_nape.util.ZNPList_ZPP_ConstraintListener"] = re;
    re.__name__ = ["zpp_nape", "util",
        "ZNPList_ZPP_ConstraintListener"
    ];
    re.prototype = {
        __class__: re
    };
    var se = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_Constraint"] = se;
    se.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Constraint"];
    se.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: se
    };
    var te = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_Interactor"] = te;
    te.__name__ = ["zpp_nape", "util",
        "ZNPList_ZPP_Interactor"
    ];
    te.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: te
    };
    var ue = function() {};
    e["zpp_nape.util.ZNPList_ZPP_CbSet"] = ue;
    ue.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_CbSet"];
    ue.prototype = {
        __class__: ue
    };
    var va = function() {
        this.cbsets = this.listeners = this.bodylisteners = this.conlisteners = null;
        this.id = 0;
        this.outer = null;
        this.id = qd.CbType();
        this.listeners = new pe;
        this.bodylisteners = new qe;
        this.conlisteners = new re;
        this.constraints = new se;
        this.interactors = new te;
        this.cbsets = new ue
    };
    e["zpp_nape.callbacks.ZPP_CbType"] = va;
    va.__name__ = ["zpp_nape", "callbacks", "ZPP_CbType"];
    va.prototype = {
        __class__: va
    };
    var g = function() {};
    e["zpp_nape.util.ZPP_Flags"] = g;
    g.__name__ = ["zpp_nape", "util", "ZPP_Flags"];
    var hb = function() {
        this.body = this.constraint = this.interaction = null;
        this.type = this.event = this.precedence = 0;
        this.outer = null
    };
    e["zpp_nape.callbacks.ZPP_Listener"] = hb;
    hb.__name__ = ["zpp_nape", "callbacks", "ZPP_Listener"];
    hb.prototype = {
        __class__: hb
    };
    var ve =
        function() {
            this.outer_zn = this.options = null
        };
    e["zpp_nape.callbacks.ZPP_BodyListener"] = ve;
    ve.__name__ = ["zpp_nape", "callbacks", "ZPP_BodyListener"];
    ve.__super__ = hb;
    ve.prototype = r(hb.prototype, {
        __class__: ve
    });
    var we = function() {
        this.outer_zn = this.options = null
    };
    e["zpp_nape.callbacks.ZPP_ConstraintListener"] = we;
    we.__name__ = ["zpp_nape", "callbacks", "ZPP_ConstraintListener"];
    we.__super__ = hb;
    we.prototype = r(hb.prototype, {
        __class__: we
    });
    var xe = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_CbType"] = xe;
    xe.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_CbType"];
    xe.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: xe
    };
    var ye = function() {
        this.options1 = this.options2 = null;
        this.itype = 0;
        this.outer_zni = this.outer_znp = null
    };
    e["zpp_nape.callbacks.ZPP_InteractionListener"] = ye;
    ye.__name__ = ["zpp_nape", "callbacks", "ZPP_InteractionListener"];
    ye.__super__ = hb;
    ye.prototype = r(hb.prototype, {
        __class__: ye
    });
    var pf = function() {
        this.outer =
            this.includes = this.excludes = this.wrap_includes = this.wrap_excludes = null
    };
    e["zpp_nape.callbacks.ZPP_OptionType"] = pf;
    pf.__name__ = ["zpp_nape", "callbacks", "ZPP_OptionType"];
    pf.prototype = {
        setup_includes: function() {
            this.wrap_includes = Za.get(this.includes, !0)
        },
        setup_excludes: function() {
            this.wrap_excludes = Za.get(this.excludes, !0)
        },
        __class__: pf
    };
    var qf = function() {
        this.outer = null
    };
    e["zpp_nape.constraint.ZPP_Constraint"] = qf;
    qf.__name__ = ["zpp_nape", "constraint", "ZPP_Constraint"];
    qf.prototype = {
        __class__: qf
    };
    var ha =
        function() {
            this.colarb = this.fluidarb = null;
            this.type = 0;
            this.ws1 = this.ws2 = null;
            this.immState = 0;
            this.active = this.cleared = !1;
            this.outer = null
        };
    e["zpp_nape.dynamics.ZPP_Arbiter"] = ha;
    ha.__name__ = ["zpp_nape", "dynamics", "ZPP_Arbiter"];
    ha.prototype = {
        wrapper: function() {
            null == this.outer && (ha.internal = !0, this.type == ha.COL ? (this.colarb.outer_zn = new kd, this.outer = this.colarb.outer_zn) : this.type == ha.FLUID ? (this.fluidarb.outer_zn = new ld, this.outer = this.fluidarb.outer_zn) : this.outer = new ub, this.outer.zpp_inner = this,
                ha.internal = !1);
            return this.outer
        },
        __class__: ha
    };
    var ze = function() {
        this.outer_zn = null
    };
    e["zpp_nape.dynamics.ZPP_FluidArbiter"] = ze;
    ze.__name__ = ["zpp_nape", "dynamics", "ZPP_FluidArbiter"];
    ze.__super__ = ha;
    ze.prototype = r(ha.prototype, {
        __class__: ze
    });
    var Ae = function() {
        this.stat = !1;
        this.outer_zn = null
    };
    e["zpp_nape.dynamics.ZPP_ColArbiter"] = Ae;
    Ae.__name__ = ["zpp_nape", "dynamics", "ZPP_ColArbiter"];
    Ae.__super__ = ha;
    Ae.prototype = r(ha.prototype, {
        __class__: Ae
    });
    var tc = function() {
        this.modified = this.pushmod = !1;
        this.next =
            null;
        this.active = !1;
        this.outer = this.arbiter = null
    };
    e["zpp_nape.dynamics.ZPP_Contact"] = tc;
    tc.__name__ = ["zpp_nape", "dynamics", "ZPP_Contact"];
    tc.prototype = {
        wrapper: function() {
            null == this.outer && (tc.internal = !0, this.outer = new ie, tc.internal = !1, this.outer.zpp_inner = this);
            return this.outer
        },
        __class__: tc
    };
    var rf = function() {
        this.ignore = !1;
        this.outer = null
    };
    e["zpp_nape.dynamics.ZPP_InteractionGroup"] = rf;
    rf.__name__ = ["zpp_nape", "dynamics", "ZPP_InteractionGroup"];
    rf.prototype = {
        __class__: rf
    };
    var sf = function() {
        this.minx =
            this.miny = this.maxx = this.maxy = 0;
        this._validate = null
    };
    e["zpp_nape.geom.ZPP_AABB"] = sf;
    sf.__name__ = ["zpp_nape", "geom", "ZPP_AABB"];
    sf.prototype = {
        validate: function() {
            null != this._validate && this._validate()
        },
        toString: function() {
            return "{ x: " + this.minx + " y: " + this.miny + " w: " + (this.maxx - this.minx) + " h: " + (this.maxy - this.miny) + " }"
        },
        __class__: sf
    };
    var tf = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_Vec2"] = tf;
    tf.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Vec2"];
    tf.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: tf
    };
    var uf = function() {
        this.toiDistance = 0;
        this.inner = !1;
        this.shape = null
    };
    e["zpp_nape.geom.ZPP_ConvexRayResult"] = uf;
    uf.__name__ = ["zpp_nape", "geom", "ZPP_ConvexRayResult"];
    uf.prototype = {
        __class__: uf
    };
    var vf = function() {
        this.next = null;
        this.x = this.y = 0
    };
    e["zpp_nape.geom.ZPP_GeomVert"] = vf;
    vf.__name__ = ["zpp_nape", "geom", "ZPP_GeomVert"];
    vf.prototype = {
        __class__: vf
    };
    var wf = function() {
        this.outer = this.vertices =
            null
    };
    e["zpp_nape.geom.ZPP_GeomPoly"] = wf;
    wf.__name__ = ["zpp_nape", "geom", "ZPP_GeomPoly"];
    wf.prototype = {
        __class__: wf
    };
    var xf = function() {
        this.a = this.b = this.c = this.d = this.tx = this.ty = 0
    };
    e["zpp_nape.geom.ZPP_Mat23"] = xf;
    xf.__name__ = ["zpp_nape", "geom", "ZPP_Mat23"];
    xf.prototype = {
        __class__: xf
    };
    var yf = function() {
        this.x = null;
        this.m = this.n = 0
    };
    e["zpp_nape.geom.ZPP_MatMN"] = yf;
    yf.__name__ = ["zpp_nape", "geom", "ZPP_MatMN"];
    yf.prototype = {
        __class__: yf
    };
    var Qa = function() {
        this.length = this.x = this.y = 0;
        this.modified = this.pushmod = !1;
        this.next = null;
        this.weak = !1;
        this._isimmutable = this.outer = null;
        this._immutable = !1;
        this._invalidate = this._validate = null
    };
    e["zpp_nape.geom.ZPP_Vec2"] = Qa;
    Qa.__name__ = ["zpp_nape", "geom", "ZPP_Vec2"];
    Qa.get = function(a, b, c) {
        null == c && (c = !1);
        var d;
        null == Qa.zpp_pool ? d = new Qa : (d = Qa.zpp_pool, Qa.zpp_pool = d.next, d.next = null);
        d.weak = !1;
        d._immutable = c;
        d.x = a;
        d.y = b;
        return d
    };
    Qa.prototype = {
        validate: function() {
            null != this._validate && this._validate()
        },
        wrapper: function() {
            if (null == this.outer) {
                this.outer = new je;
                var a = this.outer.zpp_inner;
                null != a.outer && (a.outer.zpp_inner = null, a.outer = null);
                a._isimmutable = null;
                a._validate = null;
                a._invalidate = null;
                a.next = Qa.zpp_pool;
                Qa.zpp_pool = a;
                this.outer.zpp_inner = this
            }
            return this.outer
        },
        reverse: function() {
            for (var a = this.next, b = null; null != a;) {
                var c = a.next;
                a.next = b;
                b = this.next = a;
                a = c
            }
            this.pushmod = this.modified = !0
        },
        toString: function() {
            return "{ x: " + this.x + " y: " + this.y + " }"
        },
        __class__: Qa
    };
    var zf = function() {
        this._validate = null;
        this.x = this.y = this.z = 0
    };
    e["zpp_nape.geom.ZPP_Vec3"] = zf;
    zf.__name__ = ["zpp_nape",
        "geom", "ZPP_Vec3"
    ];
    zf.prototype = {
        validate: function() {
            null != this._validate && this._validate()
        },
        __class__: zf
    };
    var ib = function() {
        this.id = 0;
        this.outer_i = null
    };
    e["zpp_nape.phys.ZPP_Interactor"] = ib;
    ib.__name__ = ["zpp_nape", "phys", "ZPP_Interactor"];
    ib.prototype = {
        __class__: ib
    };
    var Be = function() {
        this.zip_axis = !1;
        this.type = this.posx = this.posy = this.rot = this.axisx = this.axisy = 0;
        this.world = !1;
        this.outer = null
    };
    e["zpp_nape.phys.ZPP_Body"] = Be;
    Be.__name__ = ["zpp_nape", "phys", "ZPP_Body"];
    Be.__super__ = ib;
    Be.prototype = r(ib.prototype, {
        validate_axis: function() {
            this.zip_axis && (this.zip_axis = !1, this.axisx = Math.sin(this.rot), this.axisy = Math.cos(this.rot), null)
        },
        __class__: Be
    });
    var Ce = function() {
        this.outer = null
    };
    e["zpp_nape.phys.ZPP_Compound"] = Ce;
    Ce.__name__ = ["zpp_nape", "phys", "ZPP_Compound"];
    Ce.__super__ = ib;
    Ce.prototype = r(ib.prototype, {
        __class__: Ce
    });
    var Af = function() {
        this.wrap_gravity = null;
        this.viscosity = this.density = 0
    };
    e["zpp_nape.phys.ZPP_FluidProperties"] = Af;
    Af.__name__ = ["zpp_nape", "phys", "ZPP_FluidProperties"];
    Af.prototype = {
        __class__: Af
    };
    var Bf = function() {
        this.dynamicFriction = this.staticFriction = this.density = this.elasticity = this.rollingFriction = 0
    };
    e["zpp_nape.phys.ZPP_Material"] = Bf;
    Bf.__name__ = ["zpp_nape", "phys", "ZPP_Material"];
    Bf.prototype = {
        __class__: Bf
    };
    var wb = function() {
        this.circle = this.polygon = null;
        this.inertia = this.localCOMx = this.localCOMy = 0;
        this.zip_area_inertia = !1;
        this.type = this.area = 0;
        this.outer = this.body = null
    };
    e["zpp_nape.shape.ZPP_Shape"] = wb;
    wb.__name__ = ["zpp_nape", "shape", "ZPP_Shape"];
    wb.__super__ = ib;
    wb.prototype = r(ib.prototype, {
        validate_area_inertia: function() {
            this.zip_area_inertia && (this.zip_area_inertia = !1, 0 == this.type ? this.circle.__validate_area_inertia() : this.polygon.__validate_area_inertia())
        },
        __class__: wb
    });
    var De = function() {
        this.radius = 0
    };
    e["zpp_nape.shape.ZPP_Circle"] = De;
    De.__name__ = ["zpp_nape", "shape", "ZPP_Circle"];
    De.__super__ = wb;
    De.prototype = r(wb.prototype, {
        __validate_area_inertia: function() {
            var a = this.radius * this.radius;
            this.area = a * Math.PI;
            this.inertia = 0.5 * a + (this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy)
        },
        __class__: De
    });
    var uc = function() {
        this.tp0 = this.tp1 = 0;
        this.lp0 = this.gp0 = this.lp1 = this.gp1 = null;
        this.length = this.lprojection = this.gprojection = 0;
        this.wrap_gnorm = null;
        this.gnormx = this.gnormy = 0;
        this.wrap_lnorm = null;
        this.lnormx = this.lnormy = 0;
        this.polygon = this.outer = null
    };
    e["zpp_nape.shape.ZPP_Edge"] = uc;
    uc.__name__ = ["zpp_nape", "shape", "ZPP_Edge"];
    uc.prototype = {
        wrapper: function() {
            null == this.outer && (uc.internal = !0, this.outer = new ne, uc.internal = !1, this.outer.zpp_inner = this);
            return this.outer
        },
        __class__: uc
    };
    var Ee = function() {
        this.reverse_flag = this.zip_lverts = this.zip_laxi = this.zip_gverts = this.zip_gaxi = !1;
        this.edgeCnt = 0;
        this.lverts = this.wrap_lverts = this.gverts = this.wrap_gverts = this.edges = this.wrap_edges = null
    };
    e["zpp_nape.shape.ZPP_Polygon"] = Ee;
    Ee.__name__ = ["zpp_nape", "shape", "ZPP_Polygon"];
    Ee.__super__ = wb;
    Ee.prototype = r(wb.prototype, {
        validate_lverts: function() {
            this.zip_lverts && (this.zip_lverts = !1, 2 < this.lverts.length && (this.validate_area_inertia(), 0 > this.area && (this.reverse_vertices(), this.area = -this.area)))
        },
        reverse_vertices: function() {
            this.lverts.reverse();
            this.gverts.reverse();
            this.edges.reverse();
            var a = this.edges.iterator_at(this.edgeCnt - 1),
                b = this.edges.pop_unsafe();
            this.edges.insert(a, b);
            this.reverse_flag = !this.reverse_flag;
            null != this.wrap_lverts && (this.wrap_lverts.zpp_inner.reverse_flag = this.reverse_flag);
            null != this.wrap_gverts && (this.wrap_gverts.zpp_inner.reverse_flag = this.reverse_flag);
            null != this.wrap_edges && (this.wrap_edges.zpp_inner.reverse_flag = this.reverse_flag)
        },
        validate_laxi: function() {
            if (this.zip_laxi) {
                this.zip_laxi = !1;
                this.validate_lverts();
                for (var a = this.edges.head, b = this.lverts.next, c = b, b = b.next; null != b;) {
                    var d = b,
                        e = a.elt,
                        a = a.next;
                    e.lp0 = c;
                    e.lp1 = d;
                    var g = 0,
                        h = 0,
                        g = c.x - d.x,
                        h = c.y - d.y,
                        i = Math.sqrt(g * g + h * h);
                    e.length = i;
                    i = 1 / i;
                    g *= i;
                    h *= i;
                    i = g;
                    g = -h;
                    h = i;
                    e.lprojection = g * c.x + h * c.y;
                    e.lnormx = g;
                    e.lnormy = h;
                    null != e.wrap_lnorm && (e.wrap_lnorm.zpp_inner.x = g, e.wrap_lnorm.zpp_inner.y = h);
                    c = d;
                    b = b.next
                }
                e = this.lverts.next;
                a = a.elt;
                a.lp0 = c;
                a.lp1 = e;
                d = b = 0;
                b = c.x - e.x;
                d = c.y - e.y;
                e = Math.sqrt(b * b + d * d);
                a.length = e;
                e = 1 / e;
                g = b * e;
                b = -(d * e);
                d = g;
                a.lprojection =
                    b * c.x + d * c.y;
                a.lnormx = b;
                a.lnormy = d;
                null != a.wrap_lnorm && (a.wrap_lnorm.zpp_inner.x = b, a.wrap_lnorm.zpp_inner.y = d)
            }
        },
        validate_gverts: function() {
            if (this.zip_gverts && null != this.body) {
                this.zip_gverts = !1;
                this.validate_lverts();
                this.body.validate_axis();
                for (var a = this.lverts.next, b = this.gverts.next; null != b;) {
                    var c = b,
                        d = a,
                        a = a.next;
                    c.x = this.body.posx + (this.body.axisy * d.x - this.body.axisx * d.y);
                    c.y = this.body.posy + (d.x * this.body.axisx + d.y * this.body.axisy);
                    b = b.next
                }
            }
        },
        validate_gaxi: function() {
            if (this.zip_gaxi && null !=
                this.body) {
                this.zip_gaxi = !1;
                this.validate_laxi();
                this.body.validate_axis();
                this.validate_gverts();
                for (var a = this.edges.head, b = this.gverts.next, c = b, b = b.next; null != b;) {
                    var d = b,
                        e = a.elt,
                        a = a.next;
                    e.gp0 = c;
                    e.gp1 = d;
                    e.gnormx = this.body.axisy * e.lnormx - this.body.axisx * e.lnormy;
                    e.gnormy = e.lnormx * this.body.axisx + e.lnormy * this.body.axisy;
                    e.gprojection = this.body.posx * e.gnormx + this.body.posy * e.gnormy + e.lprojection;
                    null != e.wrap_gnorm && (e.wrap_gnorm.zpp_inner.x = e.gnormx, e.wrap_gnorm.zpp_inner.y = e.gnormy);
                    e.tp0 = e.gp0.y *
                        e.gnormx - e.gp0.x * e.gnormy;
                    e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
                    c = d;
                    b = b.next
                }
                b = this.gverts.next;
                a = a.elt;
                a.gp0 = c;
                a.gp1 = b;
                a.gnormx = this.body.axisy * a.lnormx - this.body.axisx * a.lnormy;
                a.gnormy = a.lnormx * this.body.axisx + a.lnormy * this.body.axisy;
                a.gprojection = this.body.posx * a.gnormx + this.body.posy * a.gnormy + a.lprojection;
                null != a.wrap_gnorm && (a.wrap_gnorm.zpp_inner.x = a.gnormx, a.wrap_gnorm.zpp_inner.y = a.gnormy);
                a.tp0 = a.gp0.y * a.gnormx - a.gp0.x * a.gnormy;
                a.tp1 = a.gp1.y * a.gnormx - a.gp1.x * a.gnormy
            }
        },
        __validate_area_inertia: function() {
            if (null ==
                this.lverts.next || null == this.lverts.next.next || null == this.lverts.next.next.next) this.inertia = this.area = 0;
            else {
                for (var a = this.area = 0, b = 0, c = this.lverts.next, d = c, e = c = c.next, c = c.next; null != c;) {
                    var g = c,
                        h = e.y * d.x - e.x * d.y,
                        a = a + h * (e.x * e.x + e.y * e.y + (e.x * d.x + e.y * d.y) + (d.x * d.x + d.y * d.y)),
                        b = b + h;
                    this.area += e.x * (g.y - d.y);
                    d = e;
                    e = g;
                    c = c.next
                }
                h = c = this.lverts.next;
                g = e.y * d.x - e.x * d.y;
                a += g * (e.x * e.x + e.y * e.y + (e.x * d.x + e.y * d.y) + (d.x * d.x + d.y * d.y));
                this.area += e.x * (h.y - d.y);
                d = e;
                e = h;
                c = c.next;
                h = e.y * d.x - e.x * d.y;
                a += h * (e.x * e.x + e.y * e.y +
                    (e.x * d.x + e.y * d.y) + (d.x * d.x + d.y * d.y));
                this.area += e.x * (c.y - d.y);
                this.inertia = a / (6 * (b + g + h));
                this.area *= 0.5;
                0 > this.area && (this.area = -this.area, this.reverse_vertices())
            }
        },
        __class__: Ee
    });
    var Cf = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_Shape"] = Cf;
    Cf.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Shape"];
    Cf.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Cf
    };
    var Df = function() {
        this.length = 0;
        this.modified =
            this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_Body"] = Df;
    Df.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Body"];
    Df.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Df
    };
    var Ef = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_Compound"] = Ef;
    Ef.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Compound"];
    Ef.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Ef
    };
    var Ff = function() {
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_Arbiter"] = Ff;
    Ff.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Arbiter"];
    Ff.prototype = {
        __class__: Ff
    };
    var Gf = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_Edge"] = Gf;
    Gf.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Edge"];
    Gf.prototype = {
        insert: function(a, b) {
            return this.inlined_insert(a, b)
        },
        inlined_insert: function(a, b) {
            var c;
            null == jb.zpp_pool ? c = new jb : (c = jb.zpp_pool,
                jb.zpp_pool = c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next = this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = jb.zpp_pool;
            jb.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        reverse: function() {
            for (var a =
                    this.head, b = null; null != a;) {
                var c = a.next;
                a.next = b;
                b = this.head = a;
                a = c
            }
            this.pushmod = this.modified = !0
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Gf
    };
    var Hf = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_Listener"] = Hf;
    Hf.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Listener"];
    Hf.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Hf
    };
    var If = function() {
        this.length =
            0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_InteractionGroup"] = If;
    If.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_InteractionGroup"];
    If.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: If
    };
    var Jf = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ConvexResult"] = Jf;
    Jf.__name__ = ["zpp_nape", "util", "ZNPList_ConvexResult"];
    Jf.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 <
                a-- && null != b;) b = b.next;
            return b
        },
        __class__: Jf
    };
    var Kf = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_ZPP_GeomPoly"] = Kf;
    Kf.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_GeomPoly"];
    Kf.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Kf
    };
    var Lf = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    e["zpp_nape.util.ZNPList_RayResult"] = Lf;
    Lf.__name__ = ["zpp_nape", "util", "ZNPList_RayResult"];
    Lf.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Lf
    };
    var Mf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_CbType"] = Mf;
    Mf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_CbType"];
    Mf.prototype = {
        __class__: Mf
    };
    var Nf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_Shape"] = Nf;
    Nf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Shape"];
    Nf.prototype = {
        __class__: Nf
    };
    var Of = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_Body"] =
        Of;
    Of.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Body"];
    Of.prototype = {
        __class__: Of
    };
    var Pf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_Constraint"] = Pf;
    Pf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Constraint"];
    Pf.prototype = {
        __class__: Pf
    };
    var Qf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_Compound"] = Qf;
    Qf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Compound"];
    Qf.prototype = {
        __class__: Qf
    };
    var Rf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_Arbiter"] =
        Rf;
    Rf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Arbiter"];
    Rf.prototype = {
        __class__: Rf
    };
    var Sf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_Interactor"] = Sf;
    Sf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Interactor"];
    Sf.prototype = {
        __class__: Sf
    };
    var Tf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_Vec2"] = Tf;
    Tf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Vec2"];
    Tf.prototype = {
        __class__: Tf
    };
    var jb = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_Edge"] = jb;
    jb.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Edge"];
    jb.prototype = {
        __class__: jb
    };
    var Uf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_Listener"] = Uf;
    Uf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Listener"];
    Uf.prototype = {
        __class__: Uf
    };
    var Vf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_InteractionGroup"] = Vf;
    Vf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_InteractionGroup"];
    Vf.prototype = {
        __class__: Vf
    };
    var Wf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ConvexResult"] =
        Wf;
    Wf.__name__ = ["zpp_nape", "util", "ZNPNode_ConvexResult"];
    Wf.prototype = {
        __class__: Wf
    };
    var Xf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_ZPP_GeomPoly"] = Xf;
    Xf.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_GeomPoly"];
    Xf.prototype = {
        __class__: Xf
    };
    var Yf = function() {
        this.next = this.elt = null
    };
    e["zpp_nape.util.ZNPNode_RayResult"] = Yf;
    Yf.__name__ = ["zpp_nape", "util", "ZNPNode_RayResult"];
    Yf.prototype = {
        __class__: Yf
    };
    var cc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_ConstraintList"] = cc;
    cc.__name__ = ["zpp_nape", "util", "ZPP_ConstraintList"];
    cc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: cc
    };
    var mc =
        function() {
            this.user_length = 0;
            this.zip_length = !1;
            this.at_ite = this.push_ite = null;
            this.at_index = 0;
            this.reverse_flag = !1;
            this._validate = null;
            this._invalidated = !1;
            this.inner = null
        };
    e["zpp_nape.util.ZPP_BodyList"] = mc;
    mc.__name__ = ["zpp_nape", "util", "ZPP_BodyList"];
    mc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: mc
    };
    var qc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_InteractorList"] = qc;
    qc.__name__ = ["zpp_nape", "util", "ZPP_InteractorList"];
    qc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: qc
    };
    var oc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_CompoundList"] = oc;
    oc.__name__ = ["zpp_nape", "util", "ZPP_CompoundList"];
    oc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod &&
                (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: oc
    };
    var bc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_ListenerList"] = bc;
    bc.__name__ = ["zpp_nape", "util", "ZPP_ListenerList"];
    bc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: bc
    };
    var Za = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this.immutable = this._invalidated = !1;
        this.outer = this.inner = null;
        this.inner = new xe;
        this._invalidated = !0
    };
    e["zpp_nape.util.ZPP_CbTypeList"] = Za;
    Za.__name__ = ["zpp_nape", "util", "ZPP_CbTypeList"];
    Za.get = function(a, b) {
        null == b && (b = !1);
        var c = new be;
        c.zpp_inner.inner = a;
        b && (c.zpp_inner.immutable = !0);
        c.zpp_inner.zip_length = !0;
        return c
    };
    Za.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: Za
    };
    var kc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_Vec2List"] = kc;
    kc.__name__ = ["zpp_nape", "util", "ZPP_Vec2List"];
    kc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: kc
    };
    var ic = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_GeomPolyList"] = ic;
    ic.__name__ = ["zpp_nape", "util", "ZPP_GeomPolyList"];
    ic.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null),
                this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: ic
    };
    var jc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_RayResultList"] = jc;
    jc.__name__ = ["zpp_nape", "util", "ZPP_RayResultList"];
    jc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: jc
    };
    var hc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_ConvexResultList"] = hc;
    hc.__name__ = ["zpp_nape",
        "util", "ZPP_ConvexResultList"
    ];
    hc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: hc
    };
    var rc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_EdgeList"] = rc;
    rc.__name__ = ["zpp_nape", "util", "ZPP_EdgeList"];
    rc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: rc
    };
    var sc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index =
            0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_ShapeList"] = sc;
    sc.__name__ = ["zpp_nape", "util", "ZPP_ShapeList"];
    sc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: sc
    };
    var gc = function() {
        this.user_length =
            0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_InteractionGroupList"] = gc;
    gc.__name__ = ["zpp_nape", "util", "ZPP_InteractionGroupList"];
    gc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: gc
    };
    var dc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_ArbiterList"] = dc;
    dc.__name__ = ["zpp_nape", "util", "ZPP_ArbiterList"];
    dc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1,
                this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: dc
    };
    var fc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    e["zpp_nape.util.ZPP_ContactList"] = fc;
    fc.__name__ = ["zpp_nape", "util", "ZPP_ContactList"];
    fc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite =
                null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: fc
    };
    var eg = 0;
    e.Math = Math;
    String.prototype.__class__ = e.String = String;
    String.__name__ = ["String"];
    e.Array = Array;
    Array.__name__ = ["Array"];
    Date.prototype.__class__ = e.Date = Date;
    Date.__name__ = ["Date"];
    var fg = e.Int = {
            __name__: ["Int"]
        },
        gg = e.Dynamic = {
            __name__: ["Dynamic"]
        },
        cg = e.Float = Number;
    cg.__name__ = ["Float"];
    var dg = e.Bool = Boolean;
    dg.__ename__ = ["Bool"];
    var ag = e.Class = {
            __name__: ["Class"]
        },
        bg = {},
        sb = {},
        Ke = Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null")() || Da;
    null == Ke.prototype.slice && (Ke.prototype.slice = Da.sliceImpl);
    Function("return typeof DataView != 'undefined' ? DataView : null")();
    var $f = Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null")() || fb._new;
    o.Element = 0;
    o.PCData = 1;
    o.CData = 2;
    o.Comment = 3;
    o.DocType = 4;
    o.ProcessingInstruction = 5;
    o.Document = 6;
    m.isEventsTraceOnly = !1;
    m.apiURLPrefix = "http://tools.funtomic.com/";
    m.gameOpsVersion = "0.7.1";
    m.apiEventsLocation = "v2/events/";
    m.status = pa.UNINITIALIZED;
    m.MAX_SAVED_UNSENT_EVENTS = 1E3;
    m.localStorage = {};
    m.firstSession = !1;
    m.levelsNumbers = [];
    m.deferredReportEvents = [];
    m.timers = {};
    Y.logLevel = 0;
    G._prefix = "";
    G._isErrorEventsSent = 0;
    B.boardDataIdx = -1;
    u.lastTableuoSuccessPlacementIdx = 0;
    u.autoCompleteInProgress = !1;
    k.STATE_TABLEU = 0;
    k.STATE_STOCK = 1;
    k.STATE_WASTE = 2;
    k.STATE_FOUNDATION = 3;
    k.selectionAllowed = !0;
    j.cardNameArray = "clubs02,clubs03,clubs04,clubs05,clubs06,clubs07,clubs08,clubs09,clubs10,clubsj,clubsq,clubsk,clubsa,diamonds02,diamonds03,diamonds04,diamonds05,diamonds06,diamonds07,diamonds08,diamonds09,diamonds10,diamondsj,diamondsq,diamondsk,diamondsa,hearts02,hearts03,hearts04,hearts05,hearts06,hearts07,hearts08,hearts09,hearts10,heartsj,heartsq,heartsk,heartsa,spades02,spades03,spades04,spades05,spades06,spades07,spades08,spades09,spades10,spadesj,spadesq,spadesk,spadesa".split(",");
    j.SUIT_CLUBS = 0;
    j.SUIT_DIAMONDS = 1;
    j.SUIT_HEARTS = 2;
    j.SUIT_SPADES = 3;
    j.CARD_IDX_02 = 0;
    j.CARD_IDX_K = 11;
    j.CARD_IDX_A = 12;
    j.NUM_SUITS = 4;
    j.NUM_CARDS_PER_SUIT = 13;
    P.WIDTH = 800;
    P.HEIGHT = 600;
    P.SMALL_DEVICE_MODE = !1;
    P.WebAudioSupported = !1;
    P.MOBILE_BROWSER = !0;
    l.LanguageAbbrevations = "EN,NL,FR,DE,IT,PL".split(",");
    l.PLAY_SHORT = "Play,STARTEN,JOUER,Spielen,Jugar,Jucati".split(",");
    l.HOW_TO_PLAY_FULL = ["The goal in this Solitaire game is to move all the cards to the four empty stacks in order from ace to king. You can choose to deal 1 card at a time or 3."];
    l.DRAW_1_CARD = ["DRAW 1 CARD"];
    l.DRAW_3_CARDS = ["DRAW 3 CARDS"];
    l.HOW_TO_PLAY = ["HOW TO PLAY"];
    l.YOU_WIN = ["YOU WIN!"];
    l.BONUS = ["BONUS: "];
    l.SCORE = ["SCORE: "];
    l.TOTAL = ["TOTAL: "];
    l.GAME_OVER = ["YOU LOST!"];
    i.backgroundState2 = !1;
    v.currentScore = 0;
    v.gameStartedStamp = 0;
    v.currentSeconds = 0;
    v.gameInProgress = !1;
    E.allowNextScreen = !1;
    x.allSoundArrayNames = "SOUNDS/cardtofoundation,SOUNDS/click,SOUNDS/dealcards,SOUNDS/fail,SOUNDS/flipbackemptystockpile,SOUNDS/grabcard,SOUNDS/invalid,SOUNDS/valid,SOUNDS/won,SOUNDS/dealcards1".split(",");
    x.MAX_CACHED = [2, 2, 2, 1, 1, 4, 1, 4, 2, 3, 3, 2, 2, 4, 4, 4];
    x.canPlayInvalid = !0;
    x.canPlayDeal = !0;
    Xa.soundFlag = !0;
    cb.instance = new cb;
    $.DISPATCHING_SENTINEL = new Bb(null, null);
    h.root = new M;
    h.uncaughtError = new Q;
    h.hidden = new la(!1);
    h.volume = new U(1);
    h._platform = cb.instance;
    h._calledInit = !1;
    na.__meta__ = {
        obj: {
            assets: [{
                bootstrap: [{
                    bytes: 184466,
                    md5: "d64869dc1df0d1b0f27f38835250e4d1",
                    name: "buttonfont/font.fnt"
                }, {
                    bytes: 29571,
                    md5: "6c598ce10f2bdaf6bcdd721cd6b0b4d0",
                    name: "buttonfont/font.png"
                }, {
                    bytes: 3650,
                    md5: "fe0e819bea10d225d37e0ab9f504e78d",
                    name: "CLICK_TILE.m4a"
                }, {
                    bytes: 2035,
                    md5: "878c9ef11b0cde2a0a9b444e1d770ba3",
                    name: "CLICK_TILE.mp3"
                }, {
                    bytes: 4843,
                    md5: "f490c90b842f4465fa1ea31dd8f29bff",
                    name: "CLICK_TILE.ogg"
                }, {
                    bytes: 6637,
                    md5: "02ac5a2ecc5f2621acfa844a7d14aa98",
                    name: "game_bg_hd.png"
                }, {
                    bytes: 7920,
                    md5: "8107b2a6c9a24e713b7b6fdf42209a7b",
                    name: "language.xml"
                }, {
                    bytes: 6904,
                    md5: "5ab896f72d1debb321cc9973a487892a",
                    name: "m_but.png"
                }, {
                    bytes: 7040,
                    md5: "0f6af6cc239d859163f16eb4ed3179ad",
                    name: "m_but_over.png"
                }, {
                    bytes: 78813,
                    md5: "7bb521cb9c4013084ba67ce32cdaec2a",
                    name: "m_poollogo.png"
                }, {
                    bytes: 7530,
                    md5: "fd9eb733eb57b9abe46f6fce90a15973",
                    name: "squidbyte.png"
                }, {
                    bytes: 8374,
                    md5: "2ef66164f665021e6a31e334bcf4422f",
                    name: "TURN.png"
                }],
                hd_assets: [{
                        bytes: 3027,
                        md5: "91ff17e8bb4481816201ebe71e877436",
                        name: "BG_BAR.png"
                    }, {
                        bytes: 2750,
                        md5: "c5684b4521527e051f02d9c4369c0dfa",
                        name: "CARDS/back.png"
                    }, {
                        bytes: 4194,
                        md5: "18bcb4c8c68665917385be1f936dec41",
                        name: "CARDS/clubs02.png"
                    }, {
                        bytes: 4968,
                        md5: "eeb372f2a3b5289d3d9698d2b789205b",
                        name: "CARDS/clubs03.png"
                    }, {
                        bytes: 5728,
                        md5: "a9d7fd50b71958dd9620c917cc51db5d",
                        name: "CARDS/clubs04.png"
                    }, {
                        bytes: 6509,
                        md5: "3c78b73494c02e01998abdfbef043641",
                        name: "CARDS/clubs05.png"
                    }, {
                        bytes: 7307,
                        md5: "e8ba71cf4bce30ab21754728cf075157",
                        name: "CARDS/clubs06.png"
                    }, {
                        bytes: 8087,
                        md5: "fb936e8ab5eb59ec7ba083efabb8583f",
                        name: "CARDS/clubs07.png"
                    }, {
                        bytes: 8582,
                        md5: "815a60ad963a0aa619a4b77ec9baef31",
                        name: "CARDS/clubs08.png"
                    }, {
                        bytes: 9154,
                        md5: "4d70e45d839f86283a14b639d32c2966",
                        name: "CARDS/clubs09.png"
                    }, {
                        bytes: 9913,
                        md5: "7c23273e92167fe405c0ba9c06ffb8bd",
                        name: "CARDS/clubs10.png"
                    }, {
                        bytes: 3823,
                        md5: "29a86e0f5c167b913fef8769fc8140cb",
                        name: "CARDS/clubsa.png"
                    }, {
                        bytes: 2543,
                        md5: "11e89449d321687cbd50e6b77659c5d0",
                        name: "CARDS/clubsj.png"
                    }, {
                        bytes: 2813,
                        md5: "b9a3eeda3a8a7e40298ba761c748c477",
                        name: "CARDS/clubsk.png"
                    }, {
                        bytes: 3323,
                        md5: "b47a9dc95c6de7260f95adbbd8a9706b",
                        name: "CARDS/clubsq.png"
                    }, {
                        bytes: 5318,
                        md5: "c44cec89ca0b0e4e2b0e06e5e5c8366b",
                        name: "CARDS/diamonds02.png"
                    }, {
                        bytes: 5707,
                        md5: "bb689adeed965421d15bce08bdd203c3",
                        name: "CARDS/diamonds03.png"
                    }, {
                        bytes: 5882,
                        md5: "11ff31e06b833af6dad71158246b7c10",
                        name: "CARDS/diamonds04.png"
                    }, {
                        bytes: 6115,
                        md5: "8042223505ddc59ee3ee1bcb595f8d67",
                        name: "CARDS/diamonds05.png"
                    }, {
                        bytes: 6671,
                        md5: "718cf09f874d8cae95bc23524985bbaa",
                        name: "CARDS/diamonds06.png"
                    }, {
                        bytes: 7481,
                        md5: "58347152283d9afc9029ca8afb5e11fd",
                        name: "CARDS/diamonds07.png"
                    }, {
                        bytes: 8408,
                        md5: "2c88f00c3888a202a41f525599d135e9",
                        name: "CARDS/diamonds08.png"
                    }, {
                        bytes: 8416,
                        md5: "4dba63e8f8178fd843c1675c9aae1412",
                        name: "CARDS/diamonds09.png"
                    }, {
                        bytes: 9146,
                        md5: "19d9fe0bcbf9efa241b311ceae8da16c",
                        name: "CARDS/diamonds10.png"
                    }, {
                        bytes: 3768,
                        md5: "de0910d04e8256c6caf4c0004208c1c9",
                        name: "CARDS/diamondsa.png"
                    }, {
                        bytes: 2449,
                        md5: "3abc2142f3f22bcb360c56fa41a278bb",
                        name: "CARDS/diamondsj.png"
                    }, {
                        bytes: 2711,
                        md5: "892816dc49bcd4378c5bf57a01dcaa67",
                        name: "CARDS/diamondsk.png"
                    }, {
                        bytes: 3162,
                        md5: "20b83c1e509fbc15d44bc1c968086bc8",
                        name: "CARDS/diamondsq.png"
                    }, {
                        bytes: 5419,
                        md5: "514503445fabc0aca182f47dfd8eef97",
                        name: "CARDS/hearts02.png"
                    }, {
                        bytes: 4789,
                        md5: "6c0524d05d93ae2aed583791c93ef3d0",
                        name: "CARDS/hearts03.png"
                    }, {
                        bytes: 5772,
                        md5: "25145e36e28d02fe923bfa04bb9af6c8",
                        name: "CARDS/hearts04.png"
                    }, {
                        bytes: 6159,
                        md5: "c33b61ffe208b441a6615add68b3f893",
                        name: "CARDS/hearts05.png"
                    }, {
                        bytes: 7687,
                        md5: "dde0dba89e680b596a0a5f4a6429a262",
                        name: "CARDS/hearts06.png"
                    }, {
                        bytes: 8175,
                        md5: "07e2a7ec387db51a0f84ff7c94f946f7",
                        name: "CARDS/hearts07.png"
                    }, {
                        bytes: 8323,
                        md5: "693e0e875b135ebf609cab22e3feaa67",
                        name: "CARDS/hearts08.png"
                    }, {
                        bytes: 9792,
                        md5: "5b9709563c6e469bcd59ba94863c1171",
                        name: "CARDS/hearts09.png"
                    }, {
                        bytes: 9289,
                        md5: "723dd69386596dd655512c2f8de76388",
                        name: "CARDS/hearts10.png"
                    }, {
                        bytes: 5354,
                        md5: "512a3ee8737bcdf57aafe3cac42ccc5c",
                        name: "CARDS/heartsa.png"
                    }, {
                        bytes: 2410,
                        md5: "5a88c421d2d7bfcdc5a4a336ad738cd4",
                        name: "CARDS/heartsj.png"
                    }, {
                        bytes: 2664,
                        md5: "e133eeb9d0db8938ae3fc653e2037eb0",
                        name: "CARDS/heartsk.png"
                    }, {
                        bytes: 3119,
                        md5: "2f2ea5b16eebd56aa5813d82d402fd22",
                        name: "CARDS/heartsq.png"
                    }, {
                        bytes: 3907,
                        md5: "3ed6d9e101e78f19aa9bb8be1c48e28d",
                        name: "CARDS/spades02.png"
                    }, {
                        bytes: 4867,
                        md5: "6f60c6221d2683e8ba3ee18b5b7d90f6",
                        name: "CARDS/spades03.png"
                    }, {
                        bytes: 5291,
                        md5: "2b0b5596a6e903484a6a6d044e8bbc60",
                        name: "CARDS/spades04.png"
                    }, {
                        bytes: 6713,
                        md5: "b21567cfcf0ebbd529db8ddccf671b49",
                        name: "CARDS/spades05.png"
                    }, {
                        bytes: 6933,
                        md5: "c0c2f1267cf1aeb0e73b185428ec8a4b",
                        name: "CARDS/spades06.png"
                    }, {
                        bytes: 7045,
                        md5: "2074bc058d1c4f6040edafea24967d53",
                        name: "CARDS/spades07.png"
                    }, {
                        bytes: 7861,
                        md5: "d0b7328ff20e22097ce55a3b3b31790a",
                        name: "CARDS/spades08.png"
                    }, {
                        bytes: 8190,
                        md5: "b5760dc4b242bf6ecc3b3fa7e346aa57",
                        name: "CARDS/spades09.png"
                    }, {
                        bytes: 8906,
                        md5: "251fce2f57b0f7ead83c732faee77164",
                        name: "CARDS/spades10.png"
                    }, {
                        bytes: 3153,
                        md5: "23e9f6ce504720a014a9f4986f0920e7",
                        name: "CARDS/spadesa.png"
                    }, {
                        bytes: 2416,
                        md5: "5ff22d5c49694c3826e1c8085a669a72",
                        name: "CARDS/spadesj.png"
                    }, {
                        bytes: 3503,
                        md5: "266276ed03959b72be8b232609f0216a",
                        name: "CARDS/spadesk.png"
                    }, {
                        bytes: 3228,
                        md5: "eee592464eb7f6258943125bc7b37e21",
                        name: "CARDS/spadesq.png"
                    }, {
                        bytes: 5420,
                        md5: "0cc47901d89a3f7fa86a25887c8f5dd4",
                        name: "fla/Particle.fla"
                    }, {
                        bytes: 1068,
                        md5: "8904d2a073c0dd9cab715129d1c96cfb",
                        name: "fla/Particle.png"
                    }, {
                        bytes: 81689,
                        md5: "302a0963f08f60e8c2168b9469cdd164",
                        name: "font_black_32/font.fnt"
                    }, {
                        bytes: 27555,
                        md5: "900626944bbf51ed187355674cc78b76",
                        name: "font_black_32/font.png"
                    }, {
                        bytes: 81027,
                        md5: "eb0f728d5ab53a1e38afa7d05b016174",
                        name: "font_white_24/font.fnt"
                    }, {
                        bytes: 19123,
                        md5: "7e53ade5f4fda4fb78ca62802bc57984",
                        name: "font_white_24/font.png"
                    }, {
                        bytes: 81656,
                        md5: "577b1c88badf9b1f6000dcc472d3e58d",
                        name: "font_white_26_bold/font.fnt"
                    }, {
                        bytes: 22320,
                        md5: "ae6f79d9045d2a38113a66590c2e7160",
                        name: "font_white_26_bold/font.png"
                    }, {
                        bytes: 25088,
                        md5: "5540a2762aaf1ed9e14747ba17fd4d8f",
                        name: "font_white_26_bold/Thumbs.db"
                    },
                    {
                        bytes: 82224,
                        md5: "68ac2b077741c55340d0967543fd2b7f",
                        name: "font_white_52_bold/font.fnt"
                    }, {
                        bytes: 52114,
                        md5: "17e66ed29ff5444e209a57918a887c24",
                        name: "font_white_52_bold/font.png"
                    }, {
                        bytes: 27136,
                        md5: "7ef7de0fdefb564293ab00ff75b66598",
                        name: "font_white_52_bold/Thumbs.db"
                    }, {
                        bytes: 81012,
                        md5: "e5c9d870460c0b6872699b33a1d88d14",
                        name: "font_white_semibold_24/font.fnt"
                    }, {
                        bytes: 19065,
                        md5: "98d63f3a33a66eaae9263ae097df39a2",
                        name: "font_white_semibold_24/font.png"
                    }, {
                        bytes: 6237,
                        md5: "22dff731b321b4e1221ba25bccf4a065",
                        name: "game_bg_hd.gif"
                    },
                    {
                        bytes: 10088,
                        md5: "1a0f23b583bb5c21151318ffb1c72aa8",
                        name: "menu_back.gif"
                    }, {
                        bytes: 1310,
                        md5: "484baa7be493822bd93c781fcaaf33a4",
                        name: "menu_but_over.gif"
                    }, {
                        bytes: 1310,
                        md5: "7bae0678f3f80c2895f7f99fcedb24d4",
                        name: "menu_but_under.gif"
                    }, {
                        bytes: 2461,
                        md5: "43f4c426c9f0ab0f82c11ce8f1cdaa04",
                        name: "prompt_exit.gif"
                    }, {
                        bytes: 1345,
                        md5: "c665aec20594d7cf424096a192043718",
                        name: "promt_button.gif"
                    }, {
                        bytes: 1345,
                        md5: "c0e06d4dadd91ccb5cf2b2a025dc08d1",
                        name: "promt_button_over.gif"
                    }, {
                        bytes: 56874,
                        md5: "698d52a243f9a4168d81c442b75ac98f",
                        name: "SOUNDS/cardtofoundation.m4a"
                    }, {
                        bytes: 37470,
                        md5: "a19570514cd52f7fb16bd045d9d4870d",
                        name: "SOUNDS/cardtofoundation.mp3"
                    }, {
                        bytes: 28597,
                        md5: "42b1d4eef5a76d18c78e65d54370246a",
                        name: "SOUNDS/cardtofoundation.ogg"
                    }, {
                        bytes: 2826,
                        md5: "35d6007a052b61160f8366118ca8d844",
                        name: "SOUNDS/click.m4a"
                    }, {
                        bytes: 2924,
                        md5: "515cab11ea5d0ae0686a4898a7674e52",
                        name: "SOUNDS/click.mp3"
                    }, {
                        bytes: 4534,
                        md5: "32597efcd310462dabd5d04b1583ca6c",
                        name: "SOUNDS/click.ogg"
                    }, {
                        bytes: 3849,
                        md5: "f713bf6966b183ff10f14e19f41e1875",
                        name: "SOUNDS/dealcards.m4a"
                    },
                    {
                        bytes: 2817,
                        md5: "a6e95e720a5dd6c3e14a7bc5f2dc1e3a",
                        name: "SOUNDS/dealcards.mp3"
                    }, {
                        bytes: 5184,
                        md5: "a3294ed2c851b9d6c72c42af97b60c7b",
                        name: "SOUNDS/dealcards.ogg"
                    }, {
                        bytes: 3849,
                        md5: "f713bf6966b183ff10f14e19f41e1875",
                        name: "SOUNDS/dealcards1.m4a"
                    }, {
                        bytes: 2817,
                        md5: "a6e95e720a5dd6c3e14a7bc5f2dc1e3a",
                        name: "SOUNDS/dealcards1.mp3"
                    }, {
                        bytes: 5184,
                        md5: "a3294ed2c851b9d6c72c42af97b60c7b",
                        name: "SOUNDS/dealcards1.ogg"
                    }, {
                        bytes: 57606,
                        md5: "8d1dfa0320416421472160d06a8c1902",
                        name: "SOUNDS/fail.m4a"
                    }, {
                        bytes: 44350,
                        md5: "c95aed7af961436adf2ed5b8f78fbe8d",
                        name: "SOUNDS/fail.mp3"
                    }, {
                        bytes: 32001,
                        md5: "11ed6144341001476d0a33c8f6de2a62",
                        name: "SOUNDS/fail.ogg"
                    }, {
                        bytes: 7485,
                        md5: "f036ef1507e984a2c949e7b5bedd9000",
                        name: "SOUNDS/flipbackemptystockpile.m4a"
                    }, {
                        bytes: 5425,
                        md5: "26f941627efc2bd6c39c6a73e0aa512b",
                        name: "SOUNDS/flipbackemptystockpile.mp3"
                    }, {
                        bytes: 6636,
                        md5: "0d2b2724ee421014585941060488ddb8",
                        name: "SOUNDS/flipbackemptystockpile.ogg"
                    }, {
                        bytes: 7610,
                        md5: "1434439cd642b924348cc314831d4087",
                        name: "SOUNDS/grabcard.m4a"
                    }, {
                        bytes: 6653,
                        md5: "76d942dd8bdda5b88b47de9c3eb5e5e1",
                        name: "SOUNDS/grabcard.mp3"
                    }, {
                        bytes: 7288,
                        md5: "f571e35f0995a3aa43a7716d04ff32ff",
                        name: "SOUNDS/grabcard.ogg"
                    }, {
                        bytes: 6866,
                        md5: "886e2202eb13ac785cf5814552016365",
                        name: "SOUNDS/invalid.m4a"
                    }, {
                        bytes: 7940,
                        md5: "cff7a9c139aa4ed3ba25e3502dfceb6e",
                        name: "SOUNDS/invalid.mp3"
                    }, {
                        bytes: 7147,
                        md5: "0f14c44c54a6f3a6d6fba6cf4946a16f",
                        name: "SOUNDS/invalid.ogg"
                    }, {
                        bytes: 461,
                        md5: "edce3eea3f74b3bc43418e076d38fef4",
                        name: "SOUNDS/sounds_info.txt"
                    }, {
                        bytes: 13963,
                        md5: "21a615fde09c894fbc4ae66696d81029",
                        name: "SOUNDS/valid.m4a"
                    }, {
                        bytes: 7941,
                        md5: "6609f708ffd9e856676e359c86195f79",
                        name: "SOUNDS/valid.mp3"
                    }, {
                        bytes: 10035,
                        md5: "e1f2ec4796999b594803f11907e502f1",
                        name: "SOUNDS/valid.ogg"
                    }, {
                        bytes: 76301,
                        md5: "345ec3ece88d895d566fe08c55f33a5a",
                        name: "SOUNDS/won.m4a"
                    }, {
                        bytes: 121104,
                        md5: "46fe01cc0b74684884a8b2f50590367b",
                        name: "SOUNDS/won.mp3"
                    }, {
                        bytes: 39898,
                        md5: "bf9998a519e2a8660b9da4515fc61670",
                        name: "SOUNDS/won.ogg"
                    }, {
                        bytes: 8374,
                        md5: "2ef66164f665021e6a31e334bcf4422f",
                        name: "TURN.png"
                    }, {
                        bytes: 1051,
                        md5: "e70c15440878a473609d364891740ff8",
                        name: "ui/game_menu_icon.png"
                    },
                    {
                        bytes: 1297,
                        md5: "ba03047747a6aa882ab3544d6f04c782",
                        name: "ui/game_newgame.gif"
                    }, {
                        bytes: 1297,
                        md5: "fb3378d7ca104cf3b029cb9ac8e5f34a",
                        name: "ui/game_newgame_over.gif"
                    }, {
                        bytes: 1981,
                        md5: "1138ca9652b5aba4e21ee02e104dc63b",
                        name: "ui/game_undomove.gif"
                    }, {
                        bytes: 1981,
                        md5: "a98fb280017e5c5582ab42918ed48a6b",
                        name: "ui/game_undomove_over.gif"
                    }, {
                        bytes: 8192,
                        md5: "95690102d9b87edd03bfe19a87142b8c",
                        name: "ui/Thumbs.db"
                    }
                ]
            }]
        }
    };
    na._supportsCrossOrigin = function() {
        var a;
        a = 0 <= window.navigator.userAgent.indexOf("Linux; U; Android") ?
            !1 : null != (new XMLHttpRequest).withCredentials;
        a || null;
        return a
    }();
    I._scratchPoint = new ab;
    Aa.NEWLINE = new Vc(10);
    ua._sharedEvent = new Dd;
    ma._sharedEvent = new Ed;
    fa._sharedEvent = new Fd;
    Ab.CANVAS_TEXTURES = (new wa("(iPhone|iPod|iPad)", "")).match(window.navigator.userAgent);
    L._mediaRefCount = 0;
    L._detectBlobSupport = !0;
    C.VENDOR_PREFIXES = ["webkit", "moz", "ms", "o", "khtml"];
    C.SHOULD_HIDE_MOBILE_BROWSER = window.top == window && (new wa("Mobile(/.*)? Safari", "")).match(window.navigator.userAgent);
    H._detectSupport = !0;
    ya.USE_CACHE = !1;
    ya.USE_ENUM_INDEX = !1;
    ya.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    ba.DEFAULT_RESOLVER = S;
    ba.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    tb.count = 0;
    Ca.i64tmp = new Ud(0, 0);
    $a.escapes = function() {
        var a = new ka;
        null != sb.lt ? a.setReserved("lt", "<") : a.h.lt = "<";
        null != sb.gt ? a.setReserved("gt", ">") : a.h.gt = ">";
        null != sb.amp ? a.setReserved("amp", "&") : a.h.amp = "&";
        null != sb.quot ? a.setReserved("quot", '"') : a.h.quot = '"';
        null != sb.apos ? a.setReserved("apos", "'") :
            a.h.apos = "'";
        return a
    }(this);
    N.__toStr = {}.toString;
    fb.BYTES_PER_ELEMENT = 1;
    qd._CbType = 0;
    va.ANY_SHAPE = new Gb;
    va.ANY_BODY = new Gb;
    va.ANY_COMPOUND = new Gb;
    va.ANY_CONSTRAINT = new Gb;
    g.internal = !1;
    ha.internal = !1;
    ha.COL = 1;
    ha.FLUID = 4;
    tc.internal = !1;
    uc.internal = !1;
    cc.internal = !1;
    mc.internal = !1;
    qc.internal = !1;
    oc.internal = !1;
    bc.internal = !1;
    Za.internal = !1;
    kc.internal = !1;
    ic.internal = !1;
    jc.internal = !1;
    hc.internal = !1;
    rc.internal = !1;
    sc.internal = !1;
    gc.internal = !1;
    dc.internal = !1;
    fc.internal = !1;
    i.main()
})();