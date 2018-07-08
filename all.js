var maxPicNo = 12;	// 最大pic頁數
var minPicNo = 1;		// 最小pic頁數
var subPicNo = 5;		// 小畫面顯示總頁數

var starPicIndex = 100 ;      // 小畫面開始頁數 
var showPageIndex = 100 ;			// 顯示頁數
var showChapterIndex = 100 ;  // 顯示章節


window.onload = function() {
	// get current html's file name 
	var pathFileArrary = window.location.pathname.split('/') ;
	name = pathFileArrary[pathFileArrary.length-1] ;

	switch (name) {
		case "read.html" :
			// show current .html
			//console.log("read : " + name) ;
			processRead();
			break;
		default :
			//console.log("other : " + name) ;
			break
	}
}

function processRead() {
	// get parameter from href
	var mytext ;
	var click
	mytext = getUrlParam('chapter','Empty');
	//console.log("chapter : " + mytext);

	showchapterIndex = parseInt(mytext) ;
	if (isNaN(showchapterIndex)) {
		showchapterIndex = 1 ;
	}
	showStory( showchapterIndex, 1) ;
}

// html add parameter format : ?content=aaa&person=aa&telphone=ab&mail=ac
// get parameter from href --> if not exist give default value
// var mytext = getUrlParam('text','Empty');
function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
      urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}
// get parameter from href 
// var mytext = getUrlVars()["text"];
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function showStory(chapterNo, pageNo) {
	var chapterId = document.getElementById("chapter");
	var pageId = document.getElementById("page");
	var picMainId = document.getElementById("pic-main");
	var picTopId = document.getElementById("pic-top");
	var sliderId = document.getElementById("slider");
	var subStartIndex = 1 ;

	if (chapterId) {
		chapterId.options[chapterNo-1].selected = true ;
		showchapterIndex = chapterNo;
	}
	if (pageId) {
		pageId.options[pageNo-1].selected = true ;
		// showPageIndex = pageNo;
	}
	if (picMainId) {
		picMainId.src = "img/storyboard-" + pageNo +".png";
	}
	if (picTopId) {
		picTopId.src = "img/storyboard-" + pageNo +".png";
	}
	if (sliderId) {
		sliderId.value = pageNo.toString();
	}

	if ((pageNo < starPicIndex) || (pageNo >= (starPicIndex+subPicNo))) {
		showPageIndex = pageNo;
		if ((pageNo+subPicNo-1) >= maxPicNo) {
			subStartIndex = maxPicNo - subPicNo + 1;
		}
		else {
		  subStartIndex = pageNo;
		}
		showSubPic(subStartIndex) ;
	}
	else {
		var temp = document.getElementsByClassName("select") ;
		var list = temp[0].getElementsByTagName('li');
		if (showPageIndex <= maxPicNo) {
			list[showPageIndex-starPicIndex+1].getElementsByTagName("img")[0].classList.remove('pic-active'); // Remove class
		}
		showPageIndex = pageNo;
		list[showPageIndex-starPicIndex+1].getElementsByTagName("img")[0].classList.add('pic-active'); // Remove class
	}

	// show page no
	//console.log("("+ chapterNo + "," + pageNo +')');
}

function showSubPic(subStartIndex) {
	var temp = document.getElementsByClassName("select") ;
  var activeIndex = showPageIndex-subStartIndex+1
	starPicIndex = subStartIndex;

	if (temp) {
		var list = temp[0].getElementsByTagName('li');
		if (list) {
			for(var i=1; i <= subPicNo ; i++) {
				var h3 = list[i].getElementsByTagName("h3")[0] ;
				var img = list[i].getElementsByTagName("img")[0] ;

				h3.innerText = (subStartIndex+i-1).toString();
				img.src = "img/storyboard-" + (subStartIndex+i-1) +".png";
				if (i == activeIndex) {
					img.classList.add('pic-active'); // Add class
				}
				else {
					img.classList.remove('pic-active'); // Remove class
				}

				//console.log(list[i]);
			}
		}
	}
}
function chapterChange(e) {
	// console.log(e) ;
	showStory( parseInt(e.currentTarget.value), 1) ;
}

function PgaeChange(e) {
	// console.log(e) ;
	showStory( showchapterIndex, parseInt(e.currentTarget.value)) ;
}

function picShiftRight() {
	if (showPageIndex < maxPicNo) {
		showStory( showchapterIndex, showPageIndex+1) ;
	}
}

function picShiftLeft() {
	if (showPageIndex > minPicNo) {
		showStory( showchapterIndex, showPageIndex-1) ;
	}
}

function picSelect() {
	var sliderId = document.getElementById("slider");
	if (sliderId) {
		showStory( showchapterIndex, parseInt(sliderId.value)) ;
	}
}

function subSelect(liIndex) {
	showStory( showchapterIndex, starPicIndex+liIndex-1) ;
}
function popPic() {
	document.getElementById("pop-pic").style.display = "block";
}

function closePic() {
	document.getElementById("pop-pic").style.display = "none";
}