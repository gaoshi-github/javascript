(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require, exports, module);
	} else {
		factory();
	}
}(this, function(require, exports, module) {
	$.fn.setForm = function(json) {
		var jsonObj = json,
			$this = $(this);
		if (typeof json === "string") {
			jsonObj = $.parseJSON(json);
		}
		for (var key in jsonObj) {
			$this.find("[name='" + key + "']").val(jsonObj[key]);
		}
	}

	$.fn.formValidator = function() {
		$(this).validator({
			patterns: {
				mobile: /^\s*1\d{10}\s*$/
			},
			validClass: 'am-field-valid',
			validateOnSubmit: true,
			onValid: function(validity) {
				// 验证通过
				$(validity.field).closest('.am-form-group').find('.am-alert').fadeOut(333);
			},
			onInValid: function(validity) {
				var $field = $(validity.field),
					_this = this;
				$field.on('focusin focusout', function(e) {
					addAlert(validity,$field,_this);
				});
			},
			validate: function(validity) {
				var $field = $(validity.field),_this = this;
				// 自定义验证方式
				if ($field.is('.js-my-card')) {
					if(idcard($field.val())){
						validity.valid = true;
					}else{
						validity.valid = false;
						$field.data('validationMessage',"请输入正确的身份证号")
						addAlert(validity,$field,_this);
					}
				}
			},
			submit: function(e, validity) {
				var formValidity = this.isFormValid();
				var $thisForm = $(e.target);
				if (formValidity) {
					$thisForm.data("isdata", true);
				} else {
					$thisForm.data("isdata", false);
				}
				return false;
			}
		});
	}
	
	function addAlert(validity,$field,_this){
		// 使用自定义的提示信息 或 插件内置的提示信息
		var msg = $field.data('validationMessage') || _this.getValidationMessage(validity),
			$group = $field.closest('.am-form-group'),
			$alert = $group.find('.am-alert');
		if (!$alert.length) {
			$alert = $('<div class="am-alert am-alert-danger"></div>').hide().appendTo($group);
			/*$field.before($('<div class="am-alert am-alert-danger"></div>').hide());*/
		}
		$alert.html(msg).show();
	}

	// 验证身份证号码
	function idcard(gets) {
		var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子;
		var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，10代表X;
		if (gets.length == 15) {
			return isValidityBrithBy15IdCard(gets);
		} else if (gets.length == 18) {
			var a_idCard = gets.split(""); // 得到身份证数组   
			if (isValidityBrithBy18IdCard(gets) && isTrueValidateCodeBy18IdCard(a_idCard)) {
				return true;
			}
			return false;
		}
		return false;

		function isTrueValidateCodeBy18IdCard(a_idCard) {
			var sum = 0; // 声明加权求和变量   
			if (a_idCard[17].toLowerCase() == 'x') {
				a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
			}
			for (var i = 0; i < 17; i++) {
				sum += Wi[i] * a_idCard[i]; // 加权求和   
			}
			valCodePosition = sum % 11; // 得到验证码所位置   
			if (a_idCard[17] == ValideCode[valCodePosition]) {
				return true;
			}
			return false;
		}

		function isValidityBrithBy18IdCard(idCard18) {
			var year = idCard18.substring(6, 10);
			var month = idCard18.substring(10, 12);
			var day = idCard18.substring(12, 14);
			var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
			// 这里用getFullYear()获取年份，避免千年虫问题   
			if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
				return false;
			}
			return true;
		}

		function isValidityBrithBy15IdCard(idCard15) {
			var year = idCard15.substring(6, 8);
			var month = idCard15.substring(8, 10);
			var day = idCard15.substring(10, 12);
			var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
			// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
			if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
				return false;
			}
			return true;
		}
	}

}));