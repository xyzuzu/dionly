
function loadHtml(url, targetId) {
	$.ajax({
			url: url,
			dataType: "html",
			async: false,
			success: function(msg) {
				$("#"+targetId).html(msg);
		}
	})
}

$(function(){
	/**top.searchText**/
	$(document).on("focus",".searchText",function(){
		$(this).attr("placeholder","");
	}).on("blur",".searchText",function(){
		$(this).attr("placeholder","请输入型号或者名称");
	});
	/**top.searchBtn**/
	$(document).on("click",".searchBtn",function(){
		
	});
	/****menu*****/
	$(document).on("mouseenter",".typeAll",function(){
		$('#typeAll').show();
	});
	$(document).on("mouseleave",".typeAll",function(){
		$('#typeAll').hide();
	});
/*	$('.typeAll').hover(function(){
		$('#typeAll').show();
			
		},function(){
			$('#typeAll').hide();
	});*/
		
	/***对应商品列表***/
	var goodsIndex = ["","diamond","ring","pendant","earring","bracelet"];
	$(document).on("click",".bold",function(){
		
		var index = $(this).parent().index();
		var $goodsIndex = goodsIndex[index];
		console.log($goodsIndex);
		console.log(index);
		location.href="goodList.html?"+$goodsIndex;
		$.ajax({
			type:"get",
			dataType:"json",
			url:"../data/goodList"+$goodsIndex+".json",
			async:true,
			success:function(res){	
				console.log(res);
			  /*效果：<div class="goods">
					<div class="goodsImg">
						<a href="#"><img src="../img/goodList/right/small20160310040516-1.png"</a>
					</div>
					<p class="goodsName"><a href="#">爱情手镯(DBW134533D)</a></p>
					<p><span class="goodsPrice">市场价：<span>￥19841.00</span></span><span class="salePrice">商城价：<span>￥10443.00</span></span></p>
				</div>*/
				var order = ["first","second","third","fourth","fifth"];
				$.each(res[order[index]], function() {
					console.log(res[order[index]]);
					$("<div/>").addClass("goods").html("<div class='goodsImg'><a href='#'><img src="+this.img+" alt=''/></a></div><p class='goodsName'><a href='#'>"
					+this.name+"</a></p><p><span class='goodsPrice'>市场价：<span>"+this.oldPrice
					+"</span></span><span class='salePrice'>商城价：<span>"+this.newPrice
					+"</span></span></p>").appendTo(".goodsList");
					
				});
			}	
		});
	});
	/***cityList***/
	$(document).on("mouseover",".cityList li",function(){
	//$('.cityList li').mouseover(function(){
		var $index = $(this).index();
		$(this).addClass('select').siblings().removeClass('select');
		$(this).parent().parent().siblings('.cityMap').children().eq($index).show().siblings().hide();
		$(this).parent().parent().siblings('.shop').children().eq($index).show().siblings().hide();
	});
	/****二维码.evm****/
	$(document).on("mouseenter","#evm",function(){
		$("#evm").find('.sevm').show();
	});
	$(document).on("mouseleave","#evm",function(){
		$("#evm").find('.sevm').hide();
	});
	
	//返回顶部
	$(document).on("click","#toTop", function(){
	//$("#toTop").click(function(){
		//瞬间回到顶部
		$("html,body").animate({scrollTop:0}, 0);
	});
	
	//判断是否登录
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
			$(".topLeft .state").html("<a class='back'>退出</a>");
		}
		//珠宝箱数量
		var cartsNum = $.cookie("myCart");
		if(cartsNum == undefined || cartsNum == ""){
			$(".topRight .myCart .cartsNum").html(0);
		}else{
			//var nCookie = JSON.parse(cartsNum);
			var num = 0;
			$.each(JSON.parse(cartsNum), function() {
				num++;
			});
			$(".topRight .myCart .cartsNum").html(num);
			//$(document).find(".topRight .myCart .cartsNum").html(num);
		}
			
	}
	$(document).on("click",".back",function(){
		$.cookie("login",$(".topLeft .user").text(),{expires: -1, path: "/"});
	});
	
});
