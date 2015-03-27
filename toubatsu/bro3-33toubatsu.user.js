// ==UserScript==
// @name           3gokushi-Toubatsu
// @namespace      http://xxx.xxxx.xxxx
// @description    討伐リンク生成
// @include        http://*.3gokushi.jp/*
// @version        1.06
// ==/UserScript==

(function(){

    var PROGRAM_NAME = '討伐リンク生成';
    var VERSION = '1.06';

    var d = document;
    var $ = function (id, pd) {return pd ? pd.getElementById(id) : document.getElementById(id);};
    /**
     * $x
     * @description 以前の$a xpathを評価し結果を配列で返す
     * @param {String} xp
     * @param {HTMLElement|HTMLDocument} dc
     * @returns {Array}
     * @throws
     * @function
     */
    var $x = function(xp, dc) {function c(f) {var g = ''; if (typeof f === 'string') {g = f;} var h = function(a) {var b = document.implementation.createHTMLDocument(''); var c = b.createRange(); c.selectNodeContents(b.documentElement); c.deleteContents(); b.documentElement.appendChild(c.createContextualFragment(a)); return b;}; if (0 <= navigator.userAgent.toLowerCase().indexOf('firefox')) {h = function(a) {var b = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd'); var c = document.implementation.createDocument(null, 'html', b); var d = document.createRange(); d.selectNodeContents(document.documentElement); var e = c.adoptNode(d.createContextualFragment(a)); c.documentElement.appendChild(e); return c;};} return h(g);} var m = [], r = null, n = null; var o = dc || document.documentElement; var p = o.ownerDocument; if (typeof dc === 'object' && typeof dc.nodeType === 'number') {if (dc.nodeType === 1 && dc.nodeName.toUpperCase() === 'HTML') {o = c(dc.innerHTML); p = o;} else if (dc.nodeType === 9) {o = dc.documentElement; p = dc;}} else if (typeof dc === 'string') {o = c(dc); p = o;} try {r = p.evaluate(xp, o, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); for (var i = 0, l = r.snapshotLength; i < l; i++) m.push(r.snapshotItem(i));} catch (e) {try {var q = p.evaluate(xp, o, null, XPathResult.ANY_TYPE, null); while (n = q.iterateNext()) m.push(n);} catch (e) {throw new Error(e.message);}} return m;};

    /**
     * $s
     * @description 以前の$x xpathを評価し1つの結果を返す
     * @param {String} xp
     * @param {HTMLElement|HTMLDocument} dc
     * @returns {Node}
     * @throws
     * @see $x
     * @function
     */
    var $s = function(xp, dc) {return $x(xp, dc).shift();};

    /**
     * $e
     * @param {HTMLElement|HTMLDocument|Window} doc
     * @param {String|Object} event string or event.click=f or event.click=[f, f, f]
     * @param {Function} event handler
     * @param {Boolean} [useCapture=false]
     * @function
     */
    var $e = function(doc, event, func, useCapture) {var eventList = event; var eType = null; var capture = useCapture || false; if (typeof event == 'string') {eventList = new Object(); eventList[event] = new Array(func);} else {for (eType in eventList) {if (typeof eventList[eType] == 'object'&& eventList[eType] instanceof Array) {continue;} eventList[eType] = [ event[eType] ];}} for (eType in eventList) {var eventName = eType; for (var i = 0; i < eventList[eType].length; i++) {doc.addEventListener(eventName, eventList[eType][i], capture);}}};

	disp_ToubatsuLink();

	//討伐戦
	function disp_ToubatsuLink() {
		// ひとことコメント
		var comment = $x('id("commentList")//tr/td[2]');
		for (var i = 0; i < comment.length; i++) {
			setToubatsuLink(comment[i]);
		}

		// コメント一覧
		var targetPath = new Array();
		if (location.pathname == '/alliance/chat_view.php') {
			targetPath.push('//div[contains(concat(" ", normalize-space(@class), " "), " hitokotoList2 ")]/p[3]');
		}
		for (var i = 0; i < targetPath.length; i++) {
			var elms = $x(targetPath[i]);
			for (var j = 0; j < elms.length; j++) {
				setToubatsuLink(elms[j]);
			}
		}

		function setToubatsuLink(elm){
			var tmpHTML = elm.innerHTML;
			var reg = /[0-9]{4,6}/g;
			tmpHTML = tmpHTML.replace(reg,"<a style=\"display:inline;\" href=\"/card/event_battle_attack.php?entry_id=$&\">$&</a>");
			elm.innerHTML = tmpHTML;
		}

		// ショートカットリンクを生成する
		var target = $("whiteWrapper");
		target.style.position = "relative";

		var br = d.createElement("br");
		var wrapper = d.createElement("div");
		wrapper.style.backgroundColor = "#000000";
		wrapper.style.position = "absolute";
		wrapper.style.top = "0";
		wrapper.style.right = "0";
		wrapper.style.zIndex = "999";
		wrapper.style.padding = "3px";
		wrapper.style.fontSize = "11px";

		var slt = d.createElement("span");
		slt.innerHTML = "[レイドSC]";
		slt.style.marginRight = "8px";
		slt.style.color = "#FFFFFF";
		wrapper.appendChild(slt);

		var sl1 = d.createElement("a");
		sl1.href = "/card/event_battle_top.php?filter_damege=1&filter_level=-1&filter_hp=-1&scope=3";
		sl1.innerHTML = "W攻";
		sl1.style.marginRight = "8px";
		wrapper.appendChild(sl1);

		var sl2 = d.createElement("a");
		sl2.href = "/card/event_battle_top.php?filter_damege=2&filter_level=-1&filter_hp=-1&scope=3";
		sl2.innerHTML = "W防";
		sl2.style.marginRight = "8px";
		wrapper.appendChild(sl2);

		var sl3 = d.createElement("a");
		sl3.href = "/card/event_battle_top.php?filter_damege=3&filter_level=-1&filter_hp=-1&scope=3";
		sl3.innerHTML = "W知";
		sl3.style.marginRight = "8px";
		wrapper.appendChild(sl3);

		var sl4 = d.createElement("a");
		sl4.href = "/card/event_battle_top.php?filter_damege=4&filter_level=-1&filter_hp=-1&scope=3";
		sl4.innerHTML = "W速";
		wrapper.appendChild(sl4);

		target.appendChild(wrapper);
	}

}) ();
