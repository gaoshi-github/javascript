(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(["jquery", "amazeui"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("jquery"), require("amazeui"));
	} else {
		factory(root.jQuery);
	}

}(this, function($) {
	setTimeout(function() {
			$(".loading").hide();
		}, 222)
		// -- 宽窄屏切换
	$(".fixed-widtn").on("click", function() {
		var fixedTxt = $(this).children(".fixed-txt"),
			txt = fixedTxt.text().trim();
		fixedTxt.text((txt == "宽屏") ? "窄屏" : "宽屏")
		$("body").toggleClass("am-g-fixed-1200");
		$(window).trigger("resize"); // 触发resize事件,轮播重设宽度
	});
	// -- 关闭浮动二维码
	var floatCode = $("#float-code");
	floatCode.on("click", ".am-btn", function() {
		floatCode.fadeOut(1000, function() {
			floatCode.removeClass("am-show-lg-only");
		});
	})

	require(["formValid"], function() {
		// 登录验证
		$("#login-form").formValidator().on("submit", function() {
			var $this = $(this);
			if ($this.data("isdata")) {
				console.log($this.serialize())
			}
		})
	});
	
	
	// -- 登录注册弹窗
	var loginPopup = $("#my-login-popup"),regPopup = $("#my-register-popup");
	$(".login,.register").on("click", function() {
		var $this = $(this),popup;
		if ($this.hasClass("login")) {
			popup = loginPopup;
			regPopup.modal("close");
		} else {
			popup = regPopup;
			loginPopup.modal("close");
		}
		popup.modal({
			relatedTarget: this,
			closeViaDimmer: false
		}).find('.submit').off('click.close.modal.amui').on("click", function() {
			popup.find("form").submit();
		});
	});
}));