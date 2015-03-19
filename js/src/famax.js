//Famax Free Version
//Buy Premium version at CodeCanyon

//Only one famax widget per page

var famax_global_options = {};

(function ($) {

	var loadFamax = function() {
		$('#famax').append('<div id="famax-header"><div id="famax-stat-holder"></div></div>');
		
		var famaxColumnsHTML = '';
		var columnWidth = 100/famax_global_options.famaxColumns;
		for(var i =1; i<=famax_global_options.famaxColumns; i++) {
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
	},	

	prepareFamax = function() {
		var famaxPageName = famax_global_options.facebookPageUrl.substring(famax_global_options.facebookPageUrl.lastIndexOf("/")+1);
		var famaxPageId = getIdFromName(famaxPageName);
		famax_global_options.famaxPageId = famaxPageId;
		//console.log
		//$('#famax').empty().append(famaxPageName+' loading ...');
		
		loadFamax();
		//showLoader();	

		//var fqlUrl = "https://graph.facebook.com/fql?q=SELECT+post_id,actor_id,target_id,message,description,attachment,created_time,updated_time+FROM+stream+WHERE+source_id="+famaxPageId+"+AND+actor_id="+famaxPageId+"+ORDER+BY+created_time+DESC&access_token="+fbAccessToken;

		var apiUrl = "https://graph.facebook.com/v2.2/"+famaxPageId+"/posts?limit="+famax_global_options.famaxResultCount+"&access_token="+famax_global_options.fbAccessToken+"&fields=id,type,message,object_id,picture,name,description,link,from,updated_time,created_time,attachments";

		
		getPageDetails(apiUrl);
		
		var fqlUrl = "http://graph.facebook.com/"+famaxPageId;
		
		getPageInfo(fqlUrl);
		
	},
		
	getPageDetails = function(fqlUrl) {
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
	},
	
	getPageInfo = function(fqlUrl) {
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
	},
		
	showFamax = function(response) {
		//console.log(response);
		famax_global_options.nextPageURL = response.paging.next;
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
			post_id = streamArray[i].id;
			actor_id = streamArray[i].from.id;
			message = streamArray[i].message;
			description = streamArray[i].description;
			//actor_name = getNameFromId(actor_id);
			actor_pic_src = "https://graph.facebook.com/"+actor_id+"/picture";
			attachment = streamArray[i].attachments;
			//attachment_name = attachment.name;
			mediaArray = null;
			if(null!=attachment) {
				mediaArray = attachment.data;
			} 
			created_time = streamArray[i].created_time;

			if(null==message||message=="") {
				message = streamArray[i].name;
				if(null==message) {
					message="";
				}
			}

			if(null!=mediaArray&&mediaArray!=""&&mediaArray!="undefined") {
				for(var j=0;j<mediaArray.length;j++) {
					type = mediaArray[j].type;
					src = mediaArray[j].media;
					if(null!=src) {
						src = src.image.src;
					}
				
					href=mediaArray[j].target;
					if(null!=href) {
						href = href.url;
					}
				
					//if(src.indexOf("_s.jpg")!=-1)
					//src=src.replace("_s.jpg","_n.jpg");
						
					if(null!=type){//&&(type=="link"||type=="swf")){
						if(type=="video"){
							//href=mediaArray[j].target.url;
						} else if(type=="photo") {
							//href=attachment.href; ---- changing to media.href
							//href=mediaArray[j].href;
							//width=mediaArray[j].photo.width;
							//height=mediaArray[j].photo.height;
							width=0;
							height=0;
						}
						else {
							//href=attachment.href; ---- changing to media.href
							//href=mediaArray[j].href;
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
			
			
			fbPost = {post_id:post_id,actor_id:actor_id,actor_pic_src:actor_pic_src,message:message,description:description,actor_name:actor_name,fbAttachmentList:fbAttachmentList,created_time:created_time/*,attachment_name:attachment_name*/};
			
			showPost(fbPost);
			
			fbAttachmentList = [];

		
		}
		
		fqlPending = 0;
		famaxLastCreatedTime = created_time;
		$('#load-more').text('Load More..');
	
	},
	
	showPost = function(fbPost) {
		//console.log(fbPost);
		var fbPicAspectRatio = 0;
		var attachment_display;
		var famax_video_tnail;
		var fbAttachmentList=fbPost.fbAttachmentList;
		//var attachment_name = fbPost.attachment_name;
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
					//if(attachment_display.indexOf("_s.")!=-1)
					//	attachment_display=attachment_display.replace("_s.","_n.");
						
					if(attachment_type.indexOf('photo')!=-1) {
						//fbPicAspectRatio = fbAttachmentList[k].width/fbAttachmentList[k].height;
						//famax_video_tnail = '<div id="'+fbPost.post_id+'" data-picSrc="'+attachment_display+'" class="famax-pic-tnail" style="filter: progid:DXImageTransform.Microsoft.AlphaImageLoader( src=\''+attachment_display+'\', sizingMethod=\'scale\'); background-image:url(\''+attachment_display+'\')"></div>';
						
						famax_video_tnail = '<div class="famax-pic-tnail" data-picSrc="'+attachment_display+'" style="width:100%;text-align:center;"><a target="_blank" href="'+attachment_href+'"><img class="video-img"  id="'+fbPost.post_id+'" src="'+attachment_display+'"></a></div>';
						
					} else if(attachment_type.indexOf('link')!=-1 || attachment_type.indexOf('share')!=-1) {
						famax_video_tnail = '<div class="famax-link-tnail" style="width:100%;text-align:center;"><a target="_blank" href="'+attachment_href+'"><i class="_1y4" style="background: url(\'./famax_link.png\') no-repeat 0 0;"></i><img  class="link-img" id="'+fbPost.post_id+'" src="'+attachment_display+'"></a></div>';
					} else if(attachment_type.indexOf('video')!=-1) {
						famax_video_tnail = '<div class="famax-video-tnail" data-videoSrc="'+attachment_href+'" style="width:100%;text-align:center;"><a target="_blank" href="'+attachment_href+'"><i class="_1y4" style="background: url(\'./famax_video.png\') no-repeat 0 0;"></i><img class="video-img"  id="'+fbPost.post_id+'" src="'+attachment_display+'"></a></div>';
					} else {
						//assume it is an image or an album
						famax_video_tnail = '<div class="famax-pic-tnail" data-picSrc="'+attachment_display+'" style="width:100%;text-align:center;"><a target="_blank" href="'+attachment_href+'"><img class="video-img"  id="'+fbPost.post_id+'" src="'+attachment_display+'"></a></div>';
					}
					
				} else if(k>0) {
					if(attachment_type.indexOf('photo')!=-1) {
						famaxPicTrain += '<div class="famax-playlist-sidebar-video" data-picSrc="'+attachment_display+'" style="background-image:url(\''+attachment_display+'\')"></div>';
					}
				}
				
			}
		} else {
			famax_video_tnail = '';
			famaxPicTrain = '';
		}
		
		var famaxColumn = getNextFamaxColumn();
		//console.log('famaxColumn-'+famaxColumn);
		if(null!=famaxPicTrain&&famaxPicTrain!="undefined"&&famaxPicTrain!="") {
			famaxPicTrain = '<div class="famax-pic-train" id="famax-pic-train-'+fbPost.post_id+'">'+famaxPicTrain+'</div>';
		}

		$('#famax-video-list-div'+famaxColumn).append('<div class="famax-video-tnail-box">'+famax_video_tnail+famaxPicTrain+'<span class="famax-video-list-title">'+message+'</span><br/></div>');

		/*
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
		*/
		
		/*if(fbPicAspectRatio!=0) {
			var famaxTnailWidth = $('#'+fbPost.post_id).css('width');
			famaxTnailWidth=famaxTnailWidth.substring(0,famaxTnailWidth.indexOf("px"));
			var famaxTnailHeight = famaxTnailWidth/fbPicAspectRatio;
			$('#'+fbPost.post_id).css({'height':famaxTnailHeight+'px'});
		}		*/
		

	},
	
	getIdFromName = function(pageName) {
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
	},
			
	setHeader = function(xhr) {
		if(xhr && xhr.overrideMimeType) {
			xhr.overrideMimeType("application/j-son;charset=UTF-8");
		}
	},
		
	loadMore = function() {
	
		/*if(!fqlPending&&null!=famaxLastCreatedTime&&famaxLastCreatedTime!=""&&famaxLastCreatedTime!="undefined") {
			var fqlUrl = "https://graph.facebook.com/fql?q=SELECT+post_id,actor_id,target_id,message,description,attachment,created_time,updated_time+FROM+stream+WHERE+source_id="+famaxPageId+"+AND+created_time<"+famaxLastCreatedTime+"+ORDER+BY+created_time+DESC+LIMIT+10&access_token="+fbAccessToken;
			famaxLastCreatedTime="";
			famaxLastCreatedTime=getPageDetails(fqlUrl);	
		}*/

		if(!fqlPending&&null!=famax_global_options.nextPageURL) {
			getPageDetails(famax_global_options.nextPageURL);	
		}		


	},	
	
	getNextFamaxColumn = function() {
		var lowestHeight = $('#famax-video-list-div1').height();
		var tempHeight = 0;
		var columnNumber = 1;
	
		for(var i =1; i<=famax_global_options.famaxColumns; i++) {
			tempHeight = $('#famax-video-list-div'+i).height();
			//console.log("height: "+tempHeight+"   col: "+i);
			if(tempHeight<lowestHeight) {
				lowestHeight=tempHeight;
				columnNumber=i;
			}

		}
		
		return columnNumber;
	},
	
	/* Lightbox removed
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
	}*/	
	
	showInfo = function(response) {
		//console.log(response);

		var pageName = response.name;
		var pagePic = "https://graph.facebook.com/"+response.id+"/picture";
		var pageLikes = response.likes;
		var pageTalkingAboutCount = response.talking_about_count;
		var pageLink = response.link;
		//var channelDesc = response.entry.summary.$t;
		
		$('#famax-header').append('<a target="_blank" href="'+pageLink+'"><img style="vertical-align:middle; height:60px; margin:15px; display:inline-block;" src="'+pagePic+'"/>'+pageName+'</a>&nbsp;&nbsp;&nbsp;');
		
		$('#famax-header').append('<div class="famax-like-wrapper"><iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2F'+famax_global_options.famaxPageId+'&amp;send=false&amp;layout=box_count&amp;width=200&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=90&amp;appId=384323531651193" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:70px;" allowTransparency="true"></iframe></div>');
		
		//$('#famax-stat-holder').append('<div class="famax-stat"><span class="famax-stat-count">'+getReadableNumber(pageTalkingAboutCount)+'</span><br/>Talking About Us</div><div class="famax-stat"><span class="famax-stat-count">'+getReadableNumber(pageLikes)+'</span><br/> Likes </div>');
		
	},
		
	getReadableNumber = function(number) {
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
	};
	
	
	$.fn.famax = function(options) {
	
		famax_global_options.facebookPageUrl = options.facebookPageUrl;
		famax_global_options.fbAccessToken = options.fbAccessToken;
		famax_global_options.famaxWidgetWidth = options.famaxWidgetWidth;
		famax_global_options.famaxWidgetHeight = options.famaxWidgetHeight;
		famax_global_options.famaxColumns = options.famaxColumns||2;
		famax_global_options.famaxResultCount = options.famaxResultCount||10;
		
		var $famaxContainer = this;

		
		if(famax_global_options.famaxWidgetWidth!=null) {
			$famaxContainer.css('width',famax_global_options.famaxWidgetWidth);
		}
		
		if(famax_global_options.famaxWidgetHeight!=null) {
			$famaxContainer.css('height',famax_global_options.famaxWidgetHeight);
		}			
		
		if(null==famax_global_options.fbAccessToken) {
			alert("No Access Token Received");
			return;
		}
		
		if(null==famax_global_options.facebookPageUrl) {
			alert("No FanPage found");
			return;
		}
		
		prepareFamax();
		
		return this;

	};

	
}( jQuery ));

		
	
		
	
