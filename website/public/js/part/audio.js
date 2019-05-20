(function(){
	audioPlay();
	//音频播放控件
	function audioPlay(){
		let audio=$("audio")[0],
			volBar=$(".volume-bar"),
            volPoint=$(".volume-point");
		//首次加载默认音量
		audio.volume=0.5;
		//网页加载完自动播放
		window.onload=function(){
			audio.play().catch(e=>{
				console.log(e)
			})
		};
		//计算时长
		function getTime(time){
			let h=Math.floor(time/3600),
				m=Math.floor(time%3600/60),
				s=Math.floor(time%60);
			h=h<10?"0"+h:h;
			m=m<10?"0"+m:m;
			s=s<10?"0"+s:s;
			return h+":"+m+":"+s;
		}
		//音频播放前准备
		audio.oncanplay=function(){
			let result=getTime(audio.duration),
				name = audio.src.replace(/\/\/|\./g,"/").split("/");
			name = name[name.length - 2];
			$(".audio-count-time").text(result);//显示视频总时长
			$(".audio-title").text(decodeURI(name));
		};
		//音频播放时
		audio.ontimeupdate=function(){
			let current=audio.currentTime,//获取当前播放的时间
				result=getTime(current);
			$(".audio-this-time").text(result);
			let percent= current/audio.duration*100+"%";//计算播放百分比
			$(".audio-this-setbacks").css("width",percent);//进度条
		};
		//音频播放
		$(".switch").click(function(){
			if(audio.paused){
				audio.play()
			}else{
				audio.pause();
			}
			$(this).toggleClass("audio-play audio-stop");
		});
		//音频点击跳播
		$(".audio-cache-setbacks").click(function(e){
			let barLeft=e.offsetX;
			let percent=barLeft/$(this).width();//计算百分比
			audio.currentTime=percent*audio.duration;
		});
		//播放完毕之后重复播放
		audio.onended=function(){
			audio.currentTime=0;
			audio.play();
		};
		//音量面板显示
		$(".audio-volume").click(function(e){
			e.stopPropagation();
			if($(".audio-set-volume")[0].style.display==="block"){
				$(".audio-set-volume").css({display:"none"});
			}else{
				$(".audio-set-volume").css({display:"block"});
			}
		});
		//音量面板隐藏
		$(document).click(function(e){
			if(e.target.className==="audio-set-volume"||e.target.className==="volume-box"||e.target.className==="volume-bar"||e.target.className==="volume-point"
            ||e.target.className==="volume-setbacks"){
				return false;
			}else{
				$(".audio-set-volume").css({display:"none"});
			}
		});
		//首次加载默认音量高度
        let h=audio.volume*100;//音量条高度
		volBar.height(h+"px");
		volPoint.css("top",h-5+"px");
		//音量调节
        volPoint.mousedown(function(e){
			let y=e.clientY-parseInt(volPoint.css("top"));
			$(document).mousemove(function(e){
				let y2=e.clientY-y;
				if(y2<-5){
					y2=-5;
				}else if(y2>95){
					y2=95;
				}
				volPoint.css("top",y2);
				audio.volume= (95-y2)/100;
				volBar.height(95-y2);
				//清楚光标选中的内容
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			});
		});
		//鼠标在按下后弹起（释放）事件
		$(document).mouseup(function(){
			$(this).unbind('mousemove');
		});
		//音量点击
        $(".volume-setbacks").click(function(e){
            let a=e.offsetY;
            audio.volume=(100-a)/100;
            volBar.height(100-a+"px");
            volPoint.css("top",a-5+"px");
        })
	}
})();