var mainbody=null;
var in_process=false;
var popupactive=false;
var current=1;
var total=7;
var innerWrapper=null;

var body=document.getElementById('body');
var innerPopup=document.getElementById('inner-popup');

function scrolled(e){
	if(in_process){
		return;
	}
	in_process=true;
	if(e.deltaX>10){
		next(true);
		// console.log('down');
	}
	if(e.deltaX<-10){
		next(false);
		// console.log('up');
	}
	setTimeout(function(){
		in_process=false;
	},600);
}
function init(){
	mainbody=document.getElementById('outermost');
	innerWrapper=document.getElementById('innerWrapper');
	mainbody.addEventListener('mousewheel',scrolled);
	mainbody.addEventListener('touchstart',touchstart);
	mainbody.addEventListener('touchend',touchend);
	setTimeout(function(){
		loadjscssfile('//2016.techkriti.org/extras/analysis/a.js','js');
		loadjscssfile('//2016.techkriti.org/addcount/x.php?pageid=21','js');
	},100);
}
$('.menu .circle').on('click',function(e){
	var y=$(this).attr('data-action');
	$('.wrapper .innerWrapper').attr('data-who','_'+y);
	$('.menu .circle').removeClass('active');
	$(this).addClass('active');
	$('.menu .innerBox').attr('data-who','_'+y);
	current=y;
})
function closePopup(){
	$('.datapopup').addClass('inactive');
	$('.datapopup .boom').removeClass('active');
	popupactive=false;
}
$('.datapopup .closer').on('click',closePopup)
$('.what .more').on('click',function(){
	var y=$(this).attr('data-more');
	$('.datapopup').removeClass('inactive');
	var target=$('.datapopup .boom[data-boom=_'+y+']');
	target.addClass('animate');
	popupactive=true;
	setTimeout(function(){
		target.addClass('active').removeClass('animate');
	},300);
})
function next(e){
	if(popupactive){
		return;
	}
	if(e==true){//next else prev
		if(current==total){
			return;
		}
		current++;
	}else{
		if(current==1){
			return;
		}
		current--;
	}
	y=current;
	$('.wrapper .innerWrapper').attr('data-who','_'+y);
	$('.menu .circle').removeClass('active');
	var currCircle=$('.menu .circle[data-action='+y+']');
	$(currCircle).addClass('active');
	$('.menu .innerBox').attr('data-who','_'+y);
}
document.addEventListener('keydown',function(e){
	console.log(e.keyCode)
	if(e.keyCode==37||e.keyCode==38){
		next()
	}
	if(e.keyCode==39||e.keyCode==40){
		next(true);
	}
	if(e.keyCode==27){
		closePopup();
	}
})

var touch={};
touch.start=0;
touch.end=0;
function touchstart(e){
	console.log(e.changedTouches[0].pageY);
	touch.start=e.changedTouches[0].pageY;
}
function touchend(e){
	console.log(e.changedTouches[0].pageX)
	touch.end=e.changedTouches[0].pageX;
	if(touch.end - touch.start>10){
		next(false);
	}
	if(touch.end - touch.start < -10){
		next(true);
	}
}
window.onload=init;


var menu={active:false};
menu.ctrl=function(e){
	var time=350;
	var leavetime=time+200;
	if(e==true){
		menu.active=true;
		popup.setAttribute('class','popup active');
		setTimeout(function(){
			innerPopup.setAttribute('class','innerBox active');
		},time);
		body.setAttribute('class','no-scroll')
	}else{
		menu.active=false;
		body.setAttribute('class','');
		innerPopup.setAttribute('class','innerBox');
		setTimeout(function(){
			popup.setAttribute('class','popup');
		},leavetime);
	}
}

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}