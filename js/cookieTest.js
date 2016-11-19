//		获取cookie
//		[{"oNo":"20223",
//		"oName":"时尚环保pu夹克系列/防风保暖环保/pu/黑色/净色/夹克",
//		"NowPrice":"¥399",
//		"OldPrice":"￥1699.00",
//		"oSize":"S",
//		"oNum":"1"}]
		
jQuery(function($){
	var oldP = $("#old_p");//原价
	var favour = $("#favour");//优惠价
	var oEnd = $(".end");//商品总金额

	var str = getCookie("arr");
	var arr = [];
	if(str != ""){
		arr = JSON.parse(str);
	}
	//alert(str);

	// 取出数组中元素，arr[i] 是一个对象,
	//    再取出这个对象中的产品名 和 价格
   //动态创建DOM元素
	for (var i = 0; i < arr.length; i++){
		var $tr = $('<tr/>');
		var oNo = $("<td/>").html(arr[i].oNo);//商品款号
		var $pro = $('<td/>').addClass('pro');
		var $poreat = $('<div/>').addClass('poreat');
		var $proa = $('<a class="proa" href="" style="color:#796353;">');
		var $img1 = $("<img/>").attr({ src: arr[i].img}).css({width:52,height:70});	
		var $oP = $('<p/>');
		var $oA = $('<a/>').attr({ style: "color:#796353;"});
		var $oSpan = $('<span/>').html(arr[i].oName);//商品名
		
		var op = $oP.append($oSpan.appendTo($oA));
						
		var NowPrice = $("<td/>").html(arr[i].NowPrice);//现价
		var OldPrice = $("<td/>").html(arr[i].OldPrice);//原价
		var oSize = $("<td/>").html(arr[i].oSize);//尺寸
		
		var $div = $poreat.append($img1.appendTo($proa));
		
		var $td1 = $pro.append([$div,op]);
		
		
		var $Td = $("<td/>");
		var $div1 = $('<div/>').css({position:'relative'});
		var $input = $('<input type="text" class="num" value="'+arr[i].oNum+'">').css({width:20,height:10});//数量	
		var $div2 = $('<div/>').addClass('red');
		
		var div1 = $input.appendTo($div1);
		var div2 = $div2.appendTo($div1);
		
		var $td2 = $Td.append([div1,div2]);
		
		var oCount = $("<td/>").html(arr[i].NowPrice);//小计
		var $delete = $('<td><span class="gray" id="maso_del">删除</span></td>');
		
		$tr.append([oNo,$td1,oSize,OldPrice,NowPrice,$td2,oCount,$delete]);

		oldP.html(arr[i].OldPrice);
		
		//优惠价
		favour.html(arr[i].favour);
		$tr.appendTo('#tbody')
		//总价
		var sum = 0;
		for (var j = 0; j <= i; j++) {
			sum += arr[i].sum;
		}
		oEnd.html(sum);
		//alert(oNum.value*NowStr);
	}
	//删除商品
	$("#tab tr").each(function(idx,item) {
	  	var $del = $(item).find('#maso_del'); 
	  	$del.on('click',function(){console.log($(this))   
	  	$(this).parents('tr').remove();
		  	var idx = $(this).index();
		  	var data = JSON.parse(getCookie("arr"));
		  	
		  	//splice() 方法向/从数组中添加/删除项目,然后返回被删除的项目
		   	data.splice(idx,1);
		   	var pro=JSON.stringify(data);
			addCookie('arr',pro,7);
	    });
	});

	//alert(oNum.value*NowStr);
	//给添加按钮和减去按钮绑定点击事件
	var low = $('#low');
	var add = $('#add');
	low.on('click.low',function(){
	
		if($num>1){
			$input.val($num --);
		}
	});
	add.on('click.add',function(){
		$input.val($num ++);
	});
});


//获取
jQuery(function($){
	var str = getCookie('arr');
	var arr = [];
	if(str != ""){
		arr = JSON.parse(str);
	}
	var oBtn = $("#submit_btn2");

	//商品款号
	var oNo = $("#No");
	
	//商品名
	var oName = $("#name");
	// 这个是商品价格
	//现价
	var NowPrice = $(".price24");
	//原价
	var OldPrice = $('#old_price');
	
	// 商品数量
	var oNum = $("#num");  
	// 这个商品的尺寸
	var oSizeBox = $('#selectSizeBox');	
	var oSizeLi = oSizeBox.find('li');
	var oSize = oSizeLi.find('i');

	var obj = {};
	//给商品颜色选择绑定点击事件
	$('.goods_color').on('click.li','li',function(){
		
		var idx = $(this).index();
		$(this).addClass('color_red').siblings('li').removeClass('color_red');
	
		obj.img = $(this).find('img').attr('src');
//		console.log(obj.img)
	});
	
	//给商品尺寸绑定点击事件
	oSizeLi.on('click.i',function(){
		var idx = $(this).index();		
		$(this).addClass('cur').siblings('li').removeClass('cur');
		
		obj.oSize = oSize.eq(idx).html();
	});
	
	oBtn.on('click.btn',function(){
		//购物车商品数
		var oTab = $("#maso_tab");
		var oAdd = $('#add_num');
		var $tab = parseInt(oTab.html());
		var $add = parseInt(oAdd.html());
	
		//购物车数量改变
		oTab.html($tab+1 );
		oAdd.html($add+1 );
									
		obj.oNo = oNo.html();
		obj.oName = oName.html();
		obj.NowPrice = NowPrice.html();
		obj.OldPrice = OldPrice.html();			
		obj.oNum = oNum.val();
		
		var $now = parseInt(NowPrice.html().substring(1));
		var $old = parseInt(OldPrice.html().substring(1));
		obj.sum = (obj.oNum)*($now);//总价
		//console.log(obj.sum);
		obj.favour = $old - $now;
		// 将创建好的商品添加到数组中
		arr.push(obj);
		console.log(arr)
		// cookie 的名字是 arr, 内容是数组中的商品，过期时间是7天以后
		addCookie("arr", JSON.stringify(arr), 7);
		obj = {};
		//alert("添加成功");
	});	
	
	//给添加按钮和减去按钮绑定点击事件
	var low = $('#low');
	var add = $('#add');
	low.on('click.low',function(){
		var $num = parseInt($(this).next().val());  
		if($num>1){
			oNum.val($num -1 );
		}
	});
	add.on('click.add',function(){
		var $num = parseInt($(this).prev().val());  
		oNum.val($num +1);
	});
});



//详情界面
//*

function setCookie(name, val, iDay) {

	// var str = name + "=" + encodeURIComponent(val);
	var str = name + "=" + val;

	str += ";"

	var oDate = new Date();

	oDate.setDate(oDate.getDate() + iDay);

	str += "expires=" + oDate;

	document.cookie = str;
}

function getCookie(name) {
	var arr = document.cookie.split("; ");

	for (var i = 0; i < arr.length; i++) {
		
		var arr2 = arr[i].split("=");

		if (arr2[0] == name) {
			return arr2[1];
			// return decodeURIComponent(arr2[1]);
		}
	}

	return "";
}

function removeCookie(name) {
	setCookie(name, 1, -1);
}

