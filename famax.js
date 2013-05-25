	if(null==pathToLoadingImage||pathToLoadingImage==""||pathToLoadingImage=="undefined")
		var pathToLoadingImage = '';
	
	if(null==famaxWidgetWidth||famaxWidgetWidth==""||famaxWidgetWidth=="undefined")
		var famaxWidgetWidth = 640;
	
	if (typeof famaxWidgetHeight !== 'undefined') {
		if(null!=famaxWidgetHeight&&famaxWidgetHeight!=""&&famaxWidgetHeight!="undefined")
			$('html > head').append('<style>#famax{overflow-y:auto;height:'+famaxWidgetHeight+'px;}</style>');	
	}
	
	if(null==famaxColumns||famaxColumns==""||famaxColumns=="undefined")
		var famaxColumns = 2;
	
	if(null==fbAccessToken||fbAccessToken==""||fbAccessToken=="undefined")
		var fbAccessToken = "460135344048321|44473b4be8cdf726e70daaff38068ab8";


	var famaxPageId;

	function loadFamax() {
		$('#famax').append('<div id="famax-header"><div id="famax-stat-holder"></div></div>');
		
		var famaxColumnsHTML = '';
		var columnWidth = 100/famaxColumns;
		for(var i =1; i<=famaxColumns; i++) {
			famaxColumnsHTML+='<div id="famax-video-list-div'+i+'" style="width:'+columnWidth+'%;" class="famax-video-list-div"></div>';
		}
		
		$('#famax').append('<div id="famax-encloser">'+famaxColumnsHTML+'<div class="load-more-wrapper"><span class="load-more" id="load-more"> Load More..</span></div></div>');
		
		$('#load-more').click(function(){
			$('#load-more').text('loading..');
			loadMore();
		});
		
		//$('#famax-video').hide();
		
		//$('#famax').append('<div id="famax-lightbox"><div style="width:100%; position:absolute; top:20%;"><iframe id="famax-video-lightbox" width="640" height="360" src="" frameborder="0" allowfullscreen></iframe></div></div>');
		
		$('#famax').append('<div id="famax-lightbox"><div id="picasa-lightbox-wrapper"><div id="picasa-lightbox-image"><img id="picasa-img-lightbox" src=""><iframe id="famax-video-lightbox" width="640" height="360" src="" frameborder="0" allowfullscreen></iframe></div><div id="picasa-lightbox-helper"></div></div></div>');
		
		$('#famax-lightbox').click(function(){
			$('#picasa-img-lightbox').attr('src','');
			$('#famax-video-lightbox').attr('src','');
			$('#famax-lightbox').hide();
			$('#famax-img-lightbox').hide();
			$('#famax-video-lightbox').hide();
		});

		$('#famax-lightbox').hide();
		$('#famax-img-lightbox').hide();
		$('#famax-video-lightbox').hide();
	}
		
	
		$(document).ready(function() {
		
			var style = '<style>.famax-showing {color:black;font-weight:normal;}.famax-duration {background-color: black;color: white;padding: 2px 3px;font-weight: bold;position: absolute;bottom: 0;right: 0;opacity: 0.8;}#famax-header {background-color:rgb(53,53,53);font:24px Arial;color:white;line-height:25px;height:90px;text-align:left;border: 1px solid rgb(53,53,53);}.famax-stat {float:right;margin:10px;font:10px Arial;color:#ccc;margin-top: 25px;text-align: center;}#famax-stat-holder {float:right;height:100%;}.famax-stat-count {font: 18px Arial;}#famax-channel-desc {text-align:left;}#famax {width:'+famaxWidgetWidth+'px;background-color: rgb(230,230,230);margin:0px auto;font-family: Calibri;font-size: 14px;text-align:center; overflow-x:hidden; border: 1px solid #cccccc;}.famax-video-tnail,.famax-pic-tnail,.famax-link-tnail {min-height:50px;width:100%; background-repeat:no-repeat; background-size:cover;position: relative;}.famax-video-tnail-box {width:94%;margin:3%;float:left;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 1px 3px rgba(0, 0, 0, 0.2);cursor:pointer;cursor:hand;}#famax-encloser {padding: 0.5%;display: inline-block;}.famax-video-list-div{text-align:left;display: inline-block;background-color:rgb(230,230,230);float:left;	}.famax-video-list-title {color:#438bc5;display: inline-block;padding:2% 10px; padding-bottom: 10px;font-weight:bold;}.famax-video-list-views {color:#555;padding:1% 10px; padding-bottom: 3%;display:inline-block;font-size:12px;}.famax-playlist-sidebar {background-color:rgba(0,0,0,0.8);float:right;max-width:50%;height:100%;color:white;text-align:center;}.famax-playlist-video-count {	display:inline-block;margin:3%;margin-top:5%;height:20%;}.famax-playlist-sidebar-video {opacity:1;width:22%;height:50px;float:left;background-color:rgb(230,230,230);display:inline-block;margin:1%;background-size:cover;background-position: center center;background-repeat:no-repeat;}.famax-tab {background-color:rgb(230,230,230);color:#666;text-shadow:0 1px 0 #fff;display: inline-block;margin: 5px;margin-top: 10px;padding: 5px;cursor:pointer;cursor:hand;}#famax-tabs {text-align:left;background-color:rgb(230,230,230);padding-left: 10px;border-left: 1px solid #cccccc;border-right: 1px solid #cccccc;}#famax-lightbox {position:fixed;background-color:rgba(0,0,0,0.9);z-index:100;width:100%;height:100%;left:0;top:0;}#famax-video-lightbox {opacity:1;}#famax-header a {float:left;text-decoration: none;color: inherit;}#famax-encloser a {font-weight:normal; color:#555;}</style>';
			$('html > head').append(style);		
			
			var lightboxStyle = '<style>#famax-lightbox {position:fixed;background-color:rgba(0,0,0,0.9);z-index:100;width:100%;height:100%;left:0;top:0;}#picasa-img-lightbox {opacity:1; max-width:1000px; max-height:700px; z-index:200;cursor:pointer;cursor:mouse;}#picasa-lightbox-wrapper {height: 100%;width: 100%;white-space: nowrap;}#picasa-lightbox-image {display: inline-block;vertical-align: middle;white-space: normal;z-index:120;}#picasa-lightbox-helper {display: inline-block;vertical-align: middle;height: 100%;}#famax-video-lightbox{}</style>';
			$('html > head').append(lightboxStyle);		
			
			var extraStyle = '<style>.famax-pic-train {width: 100%;border: none;display: block;margin: 2%;}._1y4 {height: 26px;left: 50%;margin: -13px 0 0 -17px;position: absolute;top: 50%;width: 35px;}.link-img,.video-img {width:100%;}.load-more-wrapper {}#load-more {border: 1px solid gainsboro;display: block;padding: 10px 0;text-align: center;color: #555;font: 13px arial,sans-serif;font-weight: bold;float: left;width: 96%;margin: 5px 2%;cursor: pointer;cursor: mouse;}.load-more:hover {background-color: rgb(223, 221, 221);}.famax-like-wrapper{display:inline-block; margin-top:15px;}</style>';
			$('html > head').append(extraStyle);		

			var style='<style>::-webkit-scrollbar {width: 10px;}::-webkit-scrollbar-button {display:none;}::-webkit-scrollbar-track-piece {background: #888}::-webkit-scrollbar-thumb {background: #eee}</style>';
			$('html > head').append(style);		

			prepareFamax();
			
		});

		function prepareFamax() {
			famaxPageName = facebookPageUrl.substring(facebookPageUrl.lastIndexOf("/")+1);
			famaxPageId = getIdFromName(famaxPageName);
			//console.log
			//$('#famax').empty().append(famaxPageName+' loading ...');
			
			loadFamax();
			//showLoader();	

			var fqlUrl = "https://graph.facebook.com/fql?q=SELECT+post_id,actor_id,target_id,message,description,attachment,created_time,updated_time+FROM+stream+WHERE+source_id="+famaxPageId+"+AND+actor_id="+famaxPageId+"+ORDER+BY+created_time+DESC&access_token="+fbAccessToken;
			
			getPageDetails(fqlUrl);
			
			var fqlUrl = "http://graph.facebook.com/"+famaxPageId;
			
			getPageInfo(fqlUrl);
			
		}
		
		function getPageDetails(fqlUrl) {
			//console.log(fqlUrl);
			fqlPending = 1;

			$.ajax({
				url: fqlUrl,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { showFamax(response);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});		
		}
		
		function getPageInfo(fqlUrl) {
			//console.log(fqlUrl);

			$.ajax({
				url: fqlUrl,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { showInfo(response);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});		
		}
		
		
	function showFamax(response) {
		//console.log(response);
		var streamArray = response.data;
		var post_id;
		var actor_id;
		var message;
		var description;
		var actor_name;	
		var actor_pic_src;
		var attachment;
		var mediaArray;

		var fbAttachmentList = [];
		var fbAttachment;
		var type;
		var src;
		var href;
		
		var fbPost;
	
		//$('#famax-video-list-div1').empty();
	
		for(var i=0;i<streamArray.length;i++) {
			post_id = streamArray[i].post_id;
			actor_id = streamArray[i].actor_id;
			message = streamArray[i].message;
			description = streamArray[i].description;
			//actor_name = getNameFromId(actor_id);
			actor_pic_src = "https://graph.facebook.com/"+actor_id+"/picture";
			attachment = streamArray[i].attachment;
			attachment_name = attachment.name;
			mediaArray = attachment.media;
			created_time = streamArray[i].created_time;

			if(null==message||message==""||message=="undefined")
				continue;

			if(null!=mediaArray&&mediaArray!=""&&mediaArray!="undefined") {
				for(var j=0;j<mediaArray.length;j++) {
					type = mediaArray[j].type;
					src = mediaArray[j].src;
					//if(src.indexOf("_s.jpg")!=-1)
					//	src=src.replace("_s.jpg","_n.jpg");
						
					if(null!=type){//&&(type=="link"||type=="swf")){
						if(type=="video"){
							href=mediaArray[j].video.source_url;
						} else if(type=="photo") {
							//href=attachment.href; ---- changing to media.href
							href=mediaArray[j].href;
							width=mediaArray[j].photo.width;
							height=mediaArray[j].photo.height;
						}
						else {
							//href=attachment.href; ---- changing to media.href
							href=mediaArray[j].href;
							width=0;
							height=0;
						}
					} else {
						href = null;
					}
					fbAttachment = {type:type,src:src,href:href,height:height,width:width};
					fbAttachmentList.push(fbAttachment);
				}
			} else {
				fbAttachmentList=null;
				type=null;
				src=null;
				href=null;
			}
			
			
			fbPost = {post_id:post_id,actor_id:actor_id,actor_pic_src:actor_pic_src,message:message,description:description,actor_name:actor_name,fbAttachmentList:fbAttachmentList,created_time:created_time,attachment_name:attachment_name};
			
			showPost(fbPost);
			
			fbAttachmentList = [];

		
		}
		
		fqlPending = 0;
		famaxLastCreatedTime = created_time;
		$('#load-more').text('Load More..');
	
	}
	
	function showPost(fbPost) {
		//console.log(fbPost);
		var fbPicAspectRatio = 0;
		var attachment_display;
		var famax_video_tnail;
		var fbAttachmentList=fbPost.fbAttachmentList;
		var attachment_name = fbPost.attachment_name;
		var famaxPicTrain='';
		
		var message = fbPost.message;
		if(null!=message&&message!=""&&message!="undefined"){
		
			//convert links to anchors--------------------------------------
			var linkStartIndex;
			var leftLinkSeparator;
			var index;
			var parsedLink = "";
			var messageLength = message.length;
			if(message.indexOf("http://")!=-1){
				linkStartIndex=message.indexOf("http://");
				//alert(leftLinkSeparator);
				leftLinkSeparator=message.charAt(linkStartIndex-1);
				index=linkStartIndex;
				while(message.charAt(index)!=leftLinkSeparator){
					parsedLink += message.charAt(index++);
					if(message.charAt(index)==" " || index>=messageLength || message.charAt(index)=="\n" || message.charAt(index)=="\r\n")
						break;
				}
				message=message.replace(parsedLink,'<a target="_blank" href="'+parsedLink+'">'+parsedLink+'</a>');
				//alert(parsedLink);
				//alert(message);
			} else if(message.indexOf("https://")!=-1){
				linkStartIndex=message.indexOf("https://");
				leftLinkSeparator=message.charAt(linkStartIndex-1);
				index=linkStartIndex;
				while(message.charAt(index)!=leftLinkSeparator){
					parsedLink += message.charAt(index++);
					if(message.charAt(index)==" " || index>=messageLength || message.charAt(index)=="\n" || message.charAt(index)=="\r\n")
						break;
				}
				message=message.replace(parsedLink,'<a target="_blank" href="'+parsedLink+'">'+parsedLink+'</a>');
			} else if(message.indexOf("www.")!=-1){
				linkStartIndex=message.indexOf("www.");
				leftLinkSeparator=message.charAt(linkStartIndex-1);
				index=linkStartIndex;
				while(message.charAt(index)!=leftLinkSeparator){
					parsedLink += message.charAt(index++);
					if(message.charAt(index)==" " || index>=messageLength || message.charAt(index)=="\n" || message.charAt(index)=="\r\n")
						break;
				}
				message=message.replace(parsedLink,'<a target="_blank" href="'+parsedLink+'">'+parsedLink+'</a>');
			}

			//---------------------------------------------------------------
			
		}		
		
		if(null!=fbAttachmentList&&fbAttachmentList!=""&&fbAttachmentList!="undefined") {
			for (var k=0;k<fbAttachmentList.length;k++) {
				attachment_type=fbAttachmentList[k].type;
				attachment_display=fbAttachmentList[k].src;
				attachment_href=fbAttachmentList[k].href;
				
				
				if(k==0) {
					if(attachment_display.indexOf("_s.")!=-1)
						attachment_display=attachment_display.replace("_s.","_n.");
						
					if(attachment_type=='photo') {
						fbPicAspectRatio = fbAttachmentList[k].width/fbAttachmentList[k].height;
						famax_video_tnail = '<div id="'+fbPost.post_id+'" data-picSrc="'+attachment_display+'" class="famax-pic-tnail" style="filter: progid:DXImageTransform.Microsoft.AlphaImageLoader( src=\''+attachment_display+'\', sizingMethod=\'scale\'); background-image:url(\''+attachment_display+'\')"></div>';
					} else if(attachment_type=='link') {
						famax_video_tnail = '<div class="famax-link-tnail" style="width:100%;text-align:center;"><a target="_blank" href="'+attachment_href+'"><i class="_1y4" style="background: url(\'./famax_link.png\') no-repeat 0 0;"></i><img  class="link-img" id="'+fbPost.post_id+'" src="'+attachment_display+'"></a></div>';
					} else if(attachment_type=='video') {
						famax_video_tnail = '<div class="famax-video-tnail" data-videoSrc="'+attachment_href+'" style="width:100%;text-align:center;"><i class="_1y4" style="background: url(\'./famax_video.png\') no-repeat 0 0;"></i><img class="video-img"  id="'+fbPost.post_id+'" src="'+attachment_display+'"></div>';
					} else {
						//rowHTML += 'attachment_type: '+attachment_type+'<br/>';
					}
					
				} else if(k>0) {
					if(attachment_type=='photo') {
						famaxPicTrain += '<div class="famax-playlist-sidebar-video" data-picSrc="'+attachment_display+'" style="background-image:url(\''+attachment_display+'\')"></div>';
					}
				}
				
			}
		} else {
			famax_video_tnail = '';
			famaxPicTrain = '';
		}
		
		var famaxColumn = getNextFamaxColumn();
		
		if(null!=famaxPicTrain&&famaxPicTrain!="undefined"&&famaxPicTrain!="") {
			famaxPicTrain = '<div class="famax-pic-train" id="famax-pic-train-'+fbPost.post_id+'">'+famaxPicTrain+'</div>';
		}

		$('#famax-video-list-div'+famaxColumn).append('<div class="famax-video-tnail-box">'+famax_video_tnail+famaxPicTrain+'<span class="famax-video-list-title">'+message+'</span><br/></div>');


		$('.famax-pic-tnail').click(function(){
			showPicLightbox(this.getAttribute('data-picSrc'));
		});
		
		$('.famax-video-tnail').click(function(){
			showVideoLightbox(this.getAttribute('data-videoSrc'));
		});
		
		$('.famax-playlist-sidebar-video').click(function(){
			var tmpPicSrc = this.getAttribute('data-picSrc');
			if(tmpPicSrc.indexOf("_s.")!=-1)
				tmpPicSrc=tmpPicSrc.replace("_s.","_n.");
			showPicLightbox(tmpPicSrc);
		});
		
		if(fbPicAspectRatio!=0) {
			var famaxTnailWidth = $('#'+fbPost.post_id).css('width');
			famaxTnailWidth=famaxTnailWidth.substring(0,famaxTnailWidth.indexOf("px"));
			var famaxTnailHeight = famaxTnailWidth/fbPicAspectRatio;
			$('#'+fbPost.post_id).css({'height':famaxTnailHeight+'px'});
		}		
		

	}	
	
	function getIdFromName(pageName) {
		var graphLink = "https://graph.facebook.com/"+pageName;
		var objectId;
		
		$.ajax({
			type: "GET",
			url: graphLink,
			async: false,
			beforeSend: function(x) {
				if(x && x.overrideMimeType) {
					x.overrideMimeType("application/j-son;charset=UTF-8");
				}
			},
			dataType: "json",
			success: function(response){
				objectId = response.id;
			}
		});		
		return objectId;
	}
			
	function setHeader(xhr) {
		if(xhr && xhr.overrideMimeType) {
			xhr.overrideMimeType("application/j-son;charset=UTF-8");
		}
	}
		
	function loadMore() {
		if(!fqlPending&&null!=famaxLastCreatedTime&&famaxLastCreatedTime!=""&&famaxLastCreatedTime!="undefined") {
			var fqlUrl = "https://graph.facebook.com/fql?q=SELECT+post_id,actor_id,target_id,message,description,attachment,created_time,updated_time+FROM+stream+WHERE+source_id="+famaxPageId+"+AND+created_time<"+famaxLastCreatedTime+"+ORDER+BY+created_time+DESC+LIMIT+10&access_token="+fbAccessToken;
			famaxLastCreatedTime="";
			famaxLastCreatedTime=getPageDetails(fqlUrl);	
		}		
	}		
	
	function getNextFamaxColumn() {
		var lowestHeight = $('#famax-video-list-div1').height();
		var tempHeight = 0;
		var columnNumber = 1;
	
		for(var i =1; i<=famaxColumns; i++) {
			tempHeight = $('#famax-video-list-div'+i).height();
			//console.log("height: "+tempHeight+"   col: "+i);
			if(tempHeight<lowestHeight) {
				lowestHeight=tempHeight;
				columnNumber=i;
			}

		}
		
		return columnNumber;
	}
	
	function showPicLightbox(picSrc) {
		$('#famax-img-lightbox').show();
		$('#famax-lightbox').show();
		showLoadingInLightbox();
		setTimeout(function(){$('#picasa-img-lightbox').attr('src',picSrc);},10);
	}

	function showVideoLightbox(videoSrc) {
		$('#famax-video-lightbox').show();		
		//console.log(videoSrc);
		$('#famax-lightbox').show();
		//showLoadingInLightbox();
		setTimeout(function(){$('#famax-video-lightbox').attr('src',videoSrc);},10);
	}
		
	function showLoadingInLightbox() {
		$('#picasa-img-lightbox').attr('src','');
		$('#picasa-img-lightbox').attr('src',pathToLoadingImage);
	}		
	
	function showInfo(response) {
		//console.log(response);

		var pageName = response.name;
		var pagePic = "https://graph.facebook.com/"+response.id+"/picture";
		var pageLikes = response.likes;
		var pageTalkingAboutCount = response.talking_about_count;
		var pageLink = response.link;
		//var channelDesc = response.entry.summary.$t;
		
		$('#famax-header').append('<a target="_blank" href="'+pageLink+'"><img style="vertical-align:middle; height:60px; margin:15px; display:inline-block;" src="'+pagePic+'"/>'+pageName+'</a>&nbsp;&nbsp;&nbsp;');
		
		$('#famax-header').append('<div class="famax-like-wrapper"><iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2F'+famaxPageId+'&amp;send=false&amp;layout=box_count&amp;width=200&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=90&amp;appId=384323531651193" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:70px;" allowTransparency="true"></iframe></div>');
		
		$('#famax-stat-holder').append('<div class="famax-stat"><span class="famax-stat-count">'+getReadableNumber(pageTalkingAboutCount)+'</span><br/>Talking About Us</div><div class="famax-stat"><span class="famax-stat-count">'+getReadableNumber(pageLikes)+'</span><br/> Likes </div>');
		
	}	
		
	function getReadableNumber(number) {
		if(null==number||number==""||number=="undefined")
			return "?";
			
		number=number.toString();
		var readableNumber = '';
		var count=0;
		for(var k=number.length; k>=0;k--) {
			readableNumber+=number.charAt(k);
			if(count==3&&k>0) {
				count=1;
				readableNumber+=',';
			} else {
				count++;
			}
		}
		return readableNumber.split("").reverse().join("");
	}
		
	
		
	
