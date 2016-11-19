//头部+尾部
$(function(){
	$("#headTop").load("index.html #header");
	$(".footer").load("index.html .footer");
	$(".floatNav").load("index.html .mainNav");
	
	//手机校验
	$("#userName").focus(function(){
		
		$(this).attr("placeholder","");
		
	}).blur(function(){
		
		$(this).attr("placeholder","11位数字");
		
		var str = $(this).val();
		//手机号码必须是13以上开头
		var reg = /^1[3-8]\d{9}$/;
		
		if (!reg.test(str))
		{
			$(".promptName").html("请输入正确的手机号") ;
			return ;
		}else{
			$(".promptName").html("");
		}

		if (str[0] != /1/.test(str))
		{
			$(".promptName").html("请输入正确的手机号") ;
			return ;
		}else{
			$(".promptName").html("");
		}
	});
	//密码校验
	var pswLog = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	
	$("#psw").focus(function(){
		
		$(this).attr("placeholder","");
		
	}).blur(function(){
		//失去焦点恢复
		$(this).attr("placeholder","6-20位必须包含字母数字");
		
		if(!pswLog.test($(this).val())){
			
			$(".promptPsw").html("设置密码为6-20位必须包含字母和数字");
			
		}else{
			$(".promptPsw").html("");
		}
	});
	
	$(".loginBtn").click(function(){
		
		var $userName = $("#userName").val();
		var $psw = $("#psw").val();
		
		//判断用户名和密码是否为空
		if($userName != "" && $psw != ""){
			
			var uCookie = $.cookie("user");
			console.log(uCookie);
			//如果字符串为空，则跳转注册页面
			if(uCookie == "" || uCookie == undefined){
				
				console.log("注册页面跳转");
				location.href = "register.html";
				var obj = {type:false};
				
			}else{//未注册
				var arrCookie = JSON.parse(uCookie);
				console.log(arrCookie);
				var inReg = true;
				
				$.each(arrCookie,function(){
					
					if( this.userName == $userName && this.pswd == $psw){
						
						console.log("登录成功");
						location.href = "index.html";
						//登录成功
						inReg = false;
						
					}else if( this.userName == $userName && this.pswd != $psw){
						
						$(".promptPsw").html("用户名与密码不符,请查证后再输入");
						//登录成功
						inReg = true;	
						
					}/*else if(this.userName != $userName){
						
						$(".promptName").html("您输入的手机号码不存在，请先注册");
						
					}*/else{
						return true;
					}
				});
				if(inReg){//未注册
					
					var obj ={type:false};
					Location.href = "register.html";
					
				}else{
					var obj = {type:true,name:$userName};
				}
			}
			$.cookie("login",JSON.stringify(obj),{expires:7 , path:"/"});
		}else{
			Location.href = "register.html";
		}
	});
	
	
});
