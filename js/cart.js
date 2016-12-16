$(function(){
	$(".cartTop").load("index.html #header",function(){
		var str = $.cookie("login");			
		if(str==undefined ||str==""){
			$(".topLeft .user").html("您好");
		}else{
			var oCookie = JSON.parse(str);
			console.log(oCookie);
			if(oCookie.type==false){
				
				$(".topLeft .user").html("您好");
			}else{
				$(".topLeft .user").html("<a href='#'>"+oCookie.name+"</a>");
				$(".topLeft .state").html("<a href='login.html'>退出</a>");
			}
			//珠宝箱数量
			var cartsNum = $.cookie("myCart");
			if(cartsNum == undefined || cartsNum == ""){
				$(".topRight .myCart .cartsNum").html(0);
			}else{
				
				var num = 0;
				$.each(JSON.parse(cartsNum), function() {
					num++;
				});
				$(".topRight .myCart .cartsNum").html(num);
				//$(document).find(".topRight .myCart .cartsNum").html(num);
			}
				
		}
	});
	$(".cartFooter").load("index.html .footer");
	$(".floatNav").load("index.html .mainNav");
	
	//获取cookie信息
	var carts = $.cookie("myCart");
	
	if(carts == undefined || carts == ""){
		
		$(".cartEmpty").show();
		$(".shoppingCart").hide();
		$(".checkout").hide();
		
	}else{
		
		var myCartsCookie =JSON.parse(carts);
		$.each(myCartsCookie, function(){
			/*<li><img src="../img/goodDetail/prif5.jpg"/></li>
			<li><a href="#">遇见❤缘，材质：D，镶口：55-60分 DRW124505D</a></li>
			<li>4</li>
			<li></li>
			<li>3470.00</li>
			<li>1456.00</li>
			<li>1618.00</li>
			<li>
				<a class="delete">删除</a>
				<a class="revise">修改</a>
			</li>*/
			var goodsTitle = decodeURIComponent(this.title);
			var liImg = "<li><img src="+this.data.img+" alt='' /></li>";
			var liName = "<li><a href=goodDetail.html?"+goodsTitle+">"+goodsTitle+", 材质: "+"18k"+" ,镶口:<span class='xk'> "+this.data.weight+"</span></a></li>";
			var liSize = "<li>"+this.data.size+"</li>";
			var liLetter = "<li>"+this.data.letter+"</li>";
			var liMarketPrice = "<li class='marPrice'>"+this.data.marketPrice+"</li>";
			var liSale = "<li class='sale'>"+this.data.sale+".00</li>";
			var liMallPrice = "<li class='malPrice'>"+this.data.mallPrice+"</li>";
			var liChange = "<li><a class='delete'>删除</a><a class='revise'>修改</a></li>";
			$("<ul></ul>").html(liImg+liName+liSize+liLetter+liMarketPrice+liSale+liMallPrice+liChange).appendTo(".cartGoods");
		});
	}
	
	//清空购物车
	$(".emptyCarts").click(function(){
		$.cookie("myCart",{expires: -1, path: "/"});
		//location.href = "cart.html";
		$(".cartEmpty").show();
		$(".shoppingCart").hide();
		$(".checkout").hide();
		$(".topRight .myCart .cartsNum").html(0)
	});
	
	//商品数量
	var cartGoods = document.getElementById("cartGoods");
	var ulLength = cartGoods.getElementsByTagName("ul");
	$(".counts").html(ulLength.length);
	//商品金额
	var sum = 0;
	$.each($(".marPrice"),function(){
		 sum = parseInt($(this).text())+sum;
		 return sum;
	})
	$(".primePrice").html(sum+".00 ");
	//优惠金额
	var saleSum = 0;
	$.each($(".sale"),function(){
		 saleSum = parseInt($(this).text())+saleSum;
		 return saleSum;
	})
	$(".discount").html(saleSum+".00 ");
	//订单总金额
	//优惠金额
	var mallSum = 0;
	
	$.each($(".malPrice"),function(){
		 mallSum = parseInt($(this).text())+mallSum;
		 return mallSum;
	})
	$(".specialPrice").html(mallSum+".00 ");
	//删除商品
	$(".delete").click(function(){
		var $self = $(this);
		$(".tanchuang").show();
		$(".overlay").show();
		//确定删除商品
		$(".yes").click(function(){
			var index = parseInt($self.closest("ul").index());
			
			console.log(index);
		
			if($.cookie("myCart") == undefined || $.cookie("myCart") == ""){
				
				$(".cartEmpty").show();
				$(".shoppingCart").hide();
				$(".checkout").hide();
				
			}else{
				
				var goods = JSON.parse($.cookie("myCart"));
				var deletes = goods.splice(index,1);//获取到cookie对应信息的索引值,并删除，返回的是删除后的
				
				console.log(deletes);
				console.log(goods);
				$.cookie("myCart",JSON.stringify(goods),{expires:30 , path:"/"});	
				
				location.href = "cart.html";
			}
		});
		
	});
	//修改商品
	$(".revise").click(function(){
		var $self = $(this);
		$(".tanchuangChange").show();
		$(".overlay").show();
		$(".yescg").click(function(){
			$self.closest("ul").find(".xk").html($(".tcQuerencg select").val());
			$(".tanchuangChange").hide();
			$(".overlay").hide();
		});
	});
	//删除商品弹窗提示
	$(".tanchuang .closeRight").click(function(){
		$(".tanchuang").hide();
		$(".overlay").hide();
	});
	$(".tanchuang .no").click(function(){
		$(".tanchuang").hide();
		$(".overlay").hide();
	});
	//修改商品弹窗提示
	$(".tanchuangChange .closeRightcg").click(function(){
		$(".tanchuangChange").hide();
		$(".overlay").hide();
	});
	$(".tanchuangChange .nocg").click(function(){
		$(".tanchuangChange").hide();
		$(".overlay").hide();
	});
	
	//结算
	$(".checkoutBtn").click(function(){
		if(confirm("温馨提示:\n"
		+"订单包含空托，如需定制成品请点'取消'前去挑选钻石，如只需购买空托请点'确定'进入结算页")){
				window.location.href = "cart.html";
			}
	});
	
	//热门点击
	$(".hostPre").click(function(){
		
		$(this).parent().find("ul").find("li").eq(0).clone().appendTo(".hostestContent ul");
		$(this).parent().find("ul").find("li").eq(0).remove();
	
	});
	
	//下个
	$(".hostNex").click(function(){
		
		$(this).parent().find("ul").find("li").eq(-1).clone(true).insertBefore($(this).parent().find("ul").find("li").eq(0));
		$(this).parent().find("ul").find("li").eq(-1).remove();
	
	});
	//点击商品跳转相关详情页面、
	$(".hostestContent ul li").click(function(){
		//trim()  消除字符串两边的空格
		window.location.href = "goodDetail.html?"+$(this).text().trim();
	});
});