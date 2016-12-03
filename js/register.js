$(function() {
	$("#headTop").load("index.html #header");
	$(".footer").load("index.html .footer");
	$(".floatNav").load("index.html .mainNav");

	//手机校验
	$("#userName").focus(function() {
		//清空
		$(this).attr("placeholder", "");
	}).blur(function() {
		//失去焦点恢复
		$(this).attr("placeholder", "11位数字");
		//手机号码只能是数字
		var str = $(this).val();
		//手机号码必须是13以上开头
		var reg = /^1[3-8]\d{9}$/;
		if(!reg.test(str)) {
			$(".promptName").html("请输入正确的手机号");
			return;
		} else {
			$(".promptName").html("");
		}

		if(str[0] != /1/.test(str)) {
			$(".promptName").html("请输入正确的手机号");
			return;
		} else {
			$(".promptName").html("");
		}
		console.log(str);
	});
	//校验码
	$("#change").click(function() {
		var codeStr = "";
		for(var i = 0; i < 4; i++) {
			var a = parseInt(Math.random() * 10);
			codeStr = codeStr.concat(a);
		}
		$("#jiaoyan").html(codeStr);
	});
	$(".checkCode").focus(function() {
		var codeStr = "";
		for(var i = 0; i < 4; i++) {
			var a = parseInt(Math.random() * 10);
			codeStr = codeStr.concat(a);
		}
		$("#jiaoyan").html(codeStr);
	}).blur(function() {
		if($(".checkCode").val() != $("#jiaoyan").text()) {
			$(".promptCheck").html("您输入的验证码不正确，请重新输入");
		} else {
			$(".promptCheck").html("");
		}
	});

	//短信校验
	$("#phoneCode").focus(function() {
		//清空
		$(this).attr("placeholder", "");
	}).blur(function() {
		//失去焦点恢复
		$(this).attr("placeholder", "6位验证码");
	});
	//密码校验
	//var pswReg = /^\w[a-zA-Z]+[0-9]+\w{6,20}$/;
	var pswReg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	$("#setPsw1").focus(function() {
		//清空
		$(this).attr("placeholder", "");
	}).blur(function() {
		//失去焦点恢复
		$(this).attr("placeholder", "6-20位必须包含字母数字");
		var psw1 = $(this).val();

		console.log(psw1);
		if(!pswReg.test(psw1)) {
			$(".promptPswbg").html("设置密码为6-20位必须包含字母和数字");

			//return true;	
		} else {
			$(".promptPswbg").html("");
		}
	});
	//密码再次校验
	$("#setPsw2").focus(function() {
		//清空
		$(this).attr("placeholder", "");
	}).blur(function() {
		//失去焦点恢复
		$(this).attr("placeholder", "6-20位必须包含字母数字");
		var psw2 = $(this).val()
		if(!pswReg.test(psw2)) {
			$(".promptPswag").html("设置密码为6-20位必须包含字母和数字");
			//return true;	
		} else {
			$(".promptPswag").html("");
		}
		if($("#setPsw1").val() != psw2) {
			$(".promptPswag").html("确认密码与设置密码不一致");
		} else {
			return true;
		}
	});
	//注册保存cookie
	$(".regBtn").click(function() {
		if($("#userName").val() != "" && $("#setPsw2").val() != "") { //首先判断输入信息是否为空
			//若为空，就生成一个新的用户对象
			var inReg = false; //默认false为未注册
			var userCookie = $.cookie("user"); //获取保存了的用户信息

			if(userCookie == undefined || userCookie == "") { //如果cookie中用户信息为空时
				var usersCookie = []; //生成新的用户信息数组
				inReg = false;
				//usersCookie.push(newUser);
			} else {
				var usersCookie = JSON.parse(userCookie); //若不为空，则提取cookie里面的用户信息
				//检查是否已经注册
				$.each(usersCookie, function() {
					if(this.userName == $('#userName').val()) {
						//若遍历到符合条件的则为已注册
						inReg = true;
					}
				});
			}
			if(inReg) { //inreg为真时，表示已经注册
				$(".promptName").html("该用户名已注册！");
			} else {
				//在用户信息数组中添加新的用户
				var newUser = {
					"userName": $("#userName").val(),
					"pswd": $("#setPsw2").val()
				};
				console.log(newUser);
				//将更新后的数组存入cookie
				usersCookie.push(newUser);
				$.cookie("user", JSON.stringify(usersCookie), {
					expires: 10,
					path: "/"
				});
				console.log($.cookie("user"));
				if(confirm("注册成功，是否跳转到登录页面")) {
					location.href = "login.html";
				}
			}
		}

	});

});