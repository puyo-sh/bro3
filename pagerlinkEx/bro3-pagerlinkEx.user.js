// ==UserScript==
// @name           3gokushi-PagerLinkExtend
// @namespace      https://github.com/puyo-sh/bro3
// @description    ブラウザ三国志 PagerLink拡張
// @include        http://*.3gokushi.jp/*
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// 2015.04.01 ver1.0 とりあえず作成

(function ($){

		makePageLinks = function(){
			var last_page_num = j$("ul.pager li.last").eq(0).prev().text();
			if(!last_page_num){
				last_page_num = j$("ul.pager li:last-child").eq(0).text();
			}
			var file_path = window.location.pathname;

			var getParam = getParameter();
			if(getParam.p == void(0)){
				getParam.p = 1;
			}
			var view_page = getParam.p;
			// オブジェクトからページパラメータを削除する
			delete getParam.p;

			// 残ったオブジェクトからGETパラメータ用URLを生成する
			var param_url = '';
			j$.each(getParam,function(index,value){
				param_url += index+"="+value+"&";
			});

			if($("ul.pager").length > 0){

				var $select_elm = j$("<select name='pyPageLink' style='width:4em;' onChange='location.href=value;'>");
				var $option_li = j$("<option>");
				var $wrapper_li = j$("<li>");

				for(var i=1;i<=last_page_num;i++){
					var $option_line = $option_li.clone();
					$option_line.attr({
						value:file_path+"?"+ param_url +"p="+i+"#file-1",
						text:i
					});
					$select_elm.append($option_line);
				}

				$wrapper_li.append($select_elm);
				j$("ul.pager").append($wrapper_li);
				j$("select[name='pyPageLink']").find("option:nth-child("+ view_page +")").attr("selected","selected");
			}
		}

		/* Functions
		-----------------------------------------------------------------------*/
		// Get URL parameters
		function getParameter() {
			var arg  = new Object;
			var pair = location.search.substring(1).split('&');
			for(i=0; pair[i]; i++) {
				var kv = pair[i].split('=');
				arg[kv[0]] = kv[1];
			}
			return arg;
		}

		// Run
		makePageLinks();

})(jQuery);
jQuery.noConflict();
j$ = jQuery;

