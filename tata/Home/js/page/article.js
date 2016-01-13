(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("jquery"));
	} else {
		factory(root.jQuery);
	}
}(this, function($, laytpl) {
	var articleUser = $("#article-user");
	articleUser.on("click", "li", function(e) {
		console.log($(this).html());
	});

	/*    -- 侦测导航 --    */
	var at = $("#article-template"), // 需要侦测的盒子
		atNav = at.find(".at-nav"), // 需要侦测的导航
		atRight = at.find(".c-right"),
		$win = $(window);
	if (atNav.length > 0) {
		if (!atNav.is(":hidden")) {
			atNav.sticky({
				top: 61
			}).scrollspynav();
		}
		$win.on("scroll", function() {
			scrollAtNav();
		});
		
	}
	
	function scrollAtNav() {
		var leftTop = atNav.offset().top + atNav.height();
		var rightTop = atRight.offset().top + atRight.height();
		if (leftTop >= rightTop - 50) {
			atNav.hide();
		} else {
			atNav.show();
		}
	}
}));