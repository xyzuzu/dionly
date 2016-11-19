/*index首页*/
$(function(){
	//加载内容
	$.ajax({
		type:"get",
		dataType:"json",
		url:"../data/index.json",
		async:true,
		success:function(res){
			//banner
			/*$.each(res.banner,function(){
				$('<li/>').html("<a href='#'><img src="+this.img+" alt=''/></a>").appendTo(".bannerImg");
				$('<li/>').html("<span></span>").appendTo(".order");
			});	*/
			//activity
			$.each(res.activity,function(){
				$('<div/>').addClass(this.className).html("<a href='#'><img src="+this.img+" alt=''/><p>"+this.words+"</p></a>").appendTo(".activity");
			});
			//firstLine
			//.firstLineLeft
			$.each(res.firstLineLeft, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo(".firstLineLeft");
			});
			//firstLineRight
			$.each(res.firstLineColor, function() {
				$('<span/>').html("<img src="+this.img+" alt=''/>").appendTo('.rightTwo');
			});
			$.each(res.firstLinePolish, function() {
				$('<span/>').html("<img src="+this.img+" alt=''/>").appendTo('.rightThree');
			});
			$.each(res.firstLineClarity, function() {
				$('<span/>').html("<img src="+this.img+" alt=''/>").appendTo('.rightFour');
			});
			//btn
			$.each(res.firstLineBtn, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.rightBtn');
			});
			//secondLine
			//中间部分
			$.each(res.secondLineOne, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.secondCenter');
			});
			//secondRight imgTop  
			$.each(res.secondLinespTop, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.imgTop');
			});
			//imgButtom
			$.each(res.secondLinespBut, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.imgButtom');
			});
			//thirdLine
			$.each(res.thirdLineLeft, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.thirdLeft');
			});
			//thirdLineRing
			$.each(res.thirdLineRight, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo("."+this.className);
			});
			//fourthLine
			//fourthCenterTop  
			$.each(res.fourthLineCenterTop, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.fourthCenterTop');
			});
			// fourthCenterButtom
			$.each(res.fourthLineCenterBut, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.fourthCenterButtom');
			});
			$.each(res.fourthLineCenterRight, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.fourthRight');
			});
			//fifthLine
			//中间部分
			$.each(res.fifthLineCenter, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.fifthCenter');
			});
			//rightTop
			$.each(res.fifthLineRightTop, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.rightTop');
			});
			//rightButtom
			$.each(res.fifthLineRightBut, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.rightButtom');
			});
			//sixthLine
			$.each(res.sixthLine, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.sixthLine');
			});
			//seventhLine
			//seventhLineCenterTop
			$.each(res.seventhLineCenterTop, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.seventhCenterTop');
			});
			//seventhLineCenterButtom
			$.each(res.seventhLineCenterBut, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.seventhCenterButtom');
			});
			//seventhRight
			$.each(res.seventhLineRight, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.seventhRight');
			});
			//eighthLine
			//eighthCenterTop
			$.each(res.eighthLineCenterTop, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.eighthCenterTop');
			});
			//eighthCenterButtom
			$.each(res.eighthLineCenterBut, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.eighthCenterButtom');
			});
			//eighthRight
			$.each(res.eighthLineRight, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.eighthRight');
			});
			
			//infoNews
			$.each(res.infoNews, function() {
				
				$('<a/>').attr('href','#').html(this.title).appendTo('.'+this.className+' .infoTitle');
				$("<img src="+this.img+" alt=''/>").appendTo('.'+this.className+' .infoImg');
				
				for(var index=0;index<this.news.length;index++){
					$('<p/>').html('· '+"<a href='#'>"+this.news[index]+"</a>").appendTo('.'+this.className+' .infoList');	
				}
			});
			//infoNews img
			$.each(res.infoNewsImg, function() {
				$('<a/>').attr('href','#').html("<img src="+this.img+" alt=''/>").appendTo('.infoNewsFour');
			});
			
		}
	});
	$(document).on("click",".rightBtn",function(){
		location.href = "goodList.html";
	});
	
	/**banner**/
	var $bannerImg = $('.bannerImg');
	var $bannerOrder = $('.order');
	//下标0
	var banIndex = 0;
	show();
	var banTimer = setInterval(run,5000);
	function run(){
		banIndex++;
		show();
	}
	function show(){
		if(banIndex >= $bannerImg.find('li').length){
			banIndex = 0;
		}else if(banIndex < 0){
			banIndex = $bannerImg.find('li').length - 1;
		}
		//图片轮播
		$bannerImg.find('li').eq(banIndex).stop().animate({'opacity':1},200).siblings().stop().animate({'opacity':0},500);
		$bannerOrder.find('li').eq(banIndex).find('span').stop().addClass('ordBgColor').parent().siblings().find('span').stop().removeClass('ordBgColor');
		
	}
	//点击圆点变化
	$bannerOrder.find('li').click(function(){
		//clearInterval(banTimer);
		banIndex = $(this).index();
		console.log(banIndex);
		show();
	})
});