$(function(){
	$(".headerTop").load("index.html #header",function(){
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
				//var nCookie = JSON.parse(cartsNum);
				var num = 0;
				$.each(JSON.parse(cartsNum), function() {
					num++;
				});
				$(".topRight .myCart .cartsNum").html(num);
				//$(document).find(".topRight .myCart .cartsNum").html(num);
			}
				
		}
	});
	$(".chengnuo").load("index.html .promise");
	$(".shouhou").load("index.html .serviceAfter");
	$(".dizhi").load("index.html .shopAddress");
	$(".baozhang").load("index.html .infoLink");
	$(".floatNav").load("index.html .mainNav");
	
	var index = location.search.replace("?",""); 
	
	$.ajax({
		type:"get",
		dataType:"json",
		url:"../data/goodList"+index+".json",
		async:true,
		success:function(res){	
		  /*效果：<div class="goods">
				<div class="goodsImg">
					<a href="#"><img src="../img/goodList/right/small20160310040516-1.png"</a>
				</div>
				<p class="goodsName"><a href="#">爱情手镯(DBW134533D)</a></p>
				<p><span class="goodsPrice">市场价：<span>￥19841.00</span></span><span class="salePrice">商城价：<span>￥10443.00</span></span></p>
			</div>*/
			$.each(res.first, function() {
				$("<div/>").addClass("goods").html("<div class='goodsImg'><a href='#'><img src="+this.img+" alt=''/></a></div><p class='goodsName'><a href='#'>"
				+this.name+"</a></p><p><span class='goodsPrice'>市场价：<span>"+this.oldPrice
				+"</span></span><span class='salePrice'>商城价：<span>"+this.newPrice
				+"</span></span></p>").appendTo(".goodsList");
				
			});
			//页码
			var order = ["first","second","third","fourth","fifth"];
			
			//点击翻页
			$("#listPage a,#pages a").click(function(){
				$(".goodsList .goods").remove();
				var $index = $(this).index()-2;
				$.each(res[order[$index]], function() {
					$("<div/>").addClass("goods").html("<div class='goodsImg'><a href='#'><img src="+this.img+" alt=''/></a></div><p class='goodsName'><a href='#'>"
					+this.name+"</a></p><p><span class='goodsPrice'>市场价：<span>"+this.oldPrice
					+"</span></span><span class='salePrice'>商城价：<span>"+this.newPrice
					+"</span></span></p>").appendTo(".goodsList");
					
				});
				$("#listPage a,#pages a").eq($index).css("background","#D8D8D8").siblings().css("background" ,"#EEEEEE");
				$("#listPage .now,#pages .now").html($index+1);
				//console.log(parseFloat(this.innerHTML));
				if(parseFloat(this.innerHTML)){
					count = this.innerHTML-1;
				}
				else{
				 	return
				 }
				console.log(count);
			});
			//下页
			var count = 0;
			$(".nextPage").click(function(){
				$(".goodsList .goods").remove();
				$.each(res[order[++count]], function() {
					$("<div/>").addClass("goods").html("<div class='goodsImg'><a><img src="+this.img+" alt=''/></a></div><p class='goodsName'><a>"
					+this.name+"</a></p><p><span class='goodsPrice'>市场价：<span>"+this.oldPrice
					+"</span></span><span class='salePrice'>商城价：<span>"+this.newPrice
					+"</span></span></p>").appendTo(".goodsList");
					
				});
				$("#pages a").eq(count).css("background","#D8D8D8").siblings().css("background" ,"#EEEEEE");
				$("#listPage a").eq(count).css("background","#D8D8D8").siblings().css("background" ,"#EEEEEE");
				
				$("#listPage .now,#pages .now").html(count+1);
			});
			
			/*** 点击商品保存数据 ***/
			
			$(".goodsList").on('click','.goodsImg>a>img,.goodsName',function(){
				
				//把需要的产品信息存在cookie里面
				 //商品名称
				 var title = $(this).parents(".goods").find(".goodsName").text();
				 
				 //市场价格
				 var marketPrice =$(this).parents(".goods").find(".goodsPrice>span").html();
				 
				 //商城价格
				 var mallPrice = $(this).parents(".goods").find(".salePrice>span").html();
				 //img
				 var img = $(this).parents(".goods").find(".goodsImg>a>img").attr('src');
				 
				 //新的产品信息
				 var goodObj = {"title":title,"marketPrice":marketPrice,"mallPrice":mallPrice,"img":img};
				
				//goodsCookie 是存在cookie里面的产品信息
				 var goodsCookie = $.cookie("goods"); 	 
				//对返回的cookie 进行判断 如果为空 
				var  bGood = false;  //代表没有信息
				if(goodsCookie == undefined || goodsCookie =="" ){
				   //如果没有产品信息
					var oCookie = [];
					var newGood = {"title":title,data:goodObj}//新的完整的产品信息
					oCookie.push(newGood);
				}else{
					//转换成对象
					var oCookie = JSON.parse(goodsCookie);
					if(bGood==false){
						//生成新的商品信息
						var newGood = {"title":title,data:goodObj}
						//压入新的完整的产品信息
						oCookie.push(newGood);
					}
				}
				//重新设置cookie
				$.cookie("goods",JSON.stringify(oCookie),{expires:30 , path:"/"});
				//点击商品跳转详情页：goodsList
				location.href="goodDetail.html?"+ title;
			});	
		}
	});
	
	/****左边导航****/
	$(".listType ul>.liTitle").click(function(){
		$(this).children("span").css("background","url(../img/goodList/hidebg.png) no-repeat 0 1px").parent().siblings().children("span").css("background","url(../img/goodList/showbg.png) no-repeat 0 1px");
		$(this).children(".show").show().parent().siblings().children(".show").hide();
		
	});
	$(".listType ul>.liTitle>a").click(function(){	
		$(this).css("color","red").parent(".liTitle").siblings().find("a").css("color","#333333").find(".olList a").css("color","#222222");
		$(this).siblings("span").css("background","url(../img/goodList/hidebg.png) no-repeat 0 1px").parent().siblings().children("span").css("background","url(../img/goodList/showbg.png) no-repeat 0 1px");
		$(this).siblings(".show").show().parent().siblings().children(".show").hide();
		$("#dangqian").html("<a href='#'>"+$(this).text()+"</a>");
	});
	$(".listType ul>.liTitle>.show>li>.olList>li").click(function(){
		$(this).find("a").css("color","red");
		$("#dangqian").html("<a href='#'>"+$(this).parent().parent().parent().siblings("a").text()+"</a>&gt;<a href='#'>"+$(this).children("a").text()+"</a>");
	});
	/****右边筛选****/
	//效果：<span class="choosed">黄金<a class="closed">x</a></span>
	$(".category li,.type li,.material li,.price li").click(function(){
		$(this).parent().parent().css("display","none");
		$(".selected").css("display","block");
		$(this).find("a").appendTo(".choosed");
		$(".goodsList").load("chooseTest.html .goodsList");
	});
	//closed 和  全部撤销
	$(".closed,.back").click(function(){
		location.href = "goodList.html";
	});	
});