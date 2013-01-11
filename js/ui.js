$(document).ready(function(){
	ui.new();
	ui.reply();
});

var ui = {

	new : function(){
		$(".new_form .to").bind("keyup",function(e){
			$(".new_form .to").css({'background-color': 'white'});
			var url_about = server+"/about/"+$(this).val();

			$.ajax({
				url: url_about,
				dataType:"jsonp",
				success: function(data){
					$(".new_form .to").css({'background-color': '#c7fdd3'});
				},
				error: function(err){
					alert("Erreur envoi");
				}
			});
		});



		$(".new_form").bind("submit",function(e){
			var to = $(".to",this).val();
			var message = encodeURIComponent($(".message",this).val());
			lm.send(to,message);
			$.mobile.changePage($("#conversation"), {
				transition: "slide",
				changeHash: "false",
				reverse: "true"
			});
			window.setTimeout(function(){
				ui.display_messages(to);
				$("form #message").val('');
				$("form .to").val('');
			},1000);
			e.preventDefault();
			return false;
		});
	},

	reply : function(){
		$("form.reply_form").bind("submit",function(e){
			var to = $('h1.contact-name').html().toLowerCase();;
			var message = encodeURIComponent($(".message",this).val());
			lm.send(to,message);
			window.setTimeout(function(){
				ui.display_messages(to);
				$("#message").val('');
			},1000);
			e.preventDefault();
			return false;
		});
	},

	display_conversations : function(){
		// console.log("Refresh screen");
		$(".conversations-list").empty();
		jQuery.each(msg, function(i) {

			var upper_user = i.toLowerCase().replace(/\b[a-z]/g, function(letter) {
				return letter.toUpperCase();
			});

			if (msg[i].unread!=0) {
				var unread = "<span class='ui-li-count ui-btn-up-b ui-btn-corner-all'>"+msg[i].unread+"</span>";
			}else{
				var unread="";
			}

			var contact = "<div class='ui-btn-inner ui-li'><div class='ui-btn-text'><a class='unread ui-link-inherit'>"+upper_user+unread+"</a></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'> </span></div>";

			var classes = "ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-li-last ui-btn-up-c "+i
			var li = $("<li>").addClass(classes).html(contact);
			$(".conversations-list").append(li);

			$("."+i).unbind("click");
			$("."+i).bind("click",function(e){
					// console.log("click: "+i);
					ui.display_messages(i);
					ui.display_name(i);
					$.mobile.changePage($("#conversation"), {
						transition: "slide",
						changeHash: "false"
					});
				e.preventDefault();
				return false;
			});
		});

	},

	display_name : function(user){
		var upper_user = user.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			return letter.toUpperCase();
		});
		$(".contact-name").empty();
		$(".contact-name").append(upper_user);
	},

	display_messages : function(name){
		$(".messages-list").empty();
		var x = msg[name].inbox;

		$(x,this).each(function(i){
			if (x[i].direction=="out") {
				var classes = "message ui-li ui-li-static ui-btn-up-c ui-li-last reply"
			}else{
				var classes = "message ui-li ui-li-static ui-btn-up-c ui-li-last"
			}
			var span = $("<span>").addClass("dt").html(" ("+x[i].date+")");
			var li = $("<li>").addClass(classes).html(decodeURIComponent(x[i].text)).append(span);
			$(".messages-list").append(li);
			msg[name].unread = 0;
		});

		$("#conversation").swipeleft(function() {
    		ui.display_messages(name);
		});
	}

}