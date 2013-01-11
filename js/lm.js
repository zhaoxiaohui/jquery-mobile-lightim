$(document).ready(function(){
	lm.login();
	lm.subscribe();
	lm.delete();
});

var server= {};
var me = {};
var msg = {};
var lm = {

	subscribe : function(){
		$(".register_form").bind("submit",function(e){

			var new_user = $(".new_login",this).val();
			var new_password = $(".new_password",this).val();

			server = $("select",this).val();

			var url_register = server+"/create/"+new_user+"/"+new_password;
			console.log(url_register);

			$.ajax({
				url: url_register,
				dataType: "jsonp",
				success: function(data){
					me = {
						login: new_user,
						password: new_password
					}
					console.log("Inscription réussie");
					$.mobile.changePage($("#login"), {
						transition: "slide"
					});
				},
				error: function(err){
					console.log(err);
				}
			});
			e.preventDefault();
		});
	},

	login : function(data){

		$(".login_form").bind("submit",function(e){
			var user = $(".login",this).val();
			var pass = $(".password",this).val();

			server = $("select",this).val();

			var url_login = server+"/login/"+user+"/"+pass;
			console.log(url_login);

			$.ajax({
				url: url_login,
				dataType:"jsonp",
				success: function(data){
					me = {
						login: user,
						password: pass,
						token: data.token
					}

					lm.retrieve(me);
					$.mobile.changePage($("#contacts"), {
						transition: "slide",
						changeHash: "false"
					});

				},
				error: function(err){
					alert("Erreur connexion");
				}
			});
			e.preventDefault();
			return false;
		});
	},

	send : function(to,message){

			var url_tell = server+"/tell/"+me.login+"/"+me.token+"/"+to+"/"+message;
			console.log(url_tell);

			$.ajax({
				url: url_tell,
				dataType:"jsonp",
				success: function(data){
					console.log("Envoyé");
					var date = new Date();
					// now = date.getFullYear()+"-"+(date.getMonth())+1+"-"+date.getDate()+"T"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
					var now = date.toGMTString();
					lm.dispatch(to,now,message,"out")
				},
				error: function(err){
					alert("Erreur envoi");
				}
			});
		
	},

	retrieve : function(me){

		var url_inbox = server+"/inbox/"+me.login+"/"+me.token;
		console.log("Checking... "+url_inbox);
		ui.display_conversations();

		$.ajax({
			url: url_inbox,
			dataType: "jsonp",

			success: function(data){
				// console.log(data.inbox);
				$(data.inbox).each(function(i){
					var name = data.inbox[i].from;
					var dt = data.inbox[i].dt;
					var message = data.inbox[i].message;
					lm.dispatch(name,dt,message,"in");
					ui.display_conversations();
				});
				window.setTimeout(function(){
					lm.retrieve(me);
				},5000);
			}
		});
	},

	dispatch : function(name,dt,message,direction){
			var msg_data = new Object();
			msg_data["text"] = message;
			msg_data["date"] = dt;
			msg_data["direction"] = direction;
			// console.log(msg_data);
			if(msg[name]==undefined){
				msg[name] = [];
				msg[name].inbox = [];
				msg[name].unread = 0;
			}
			msg[name].inbox.push(msg_data);
			if (direction=="in") {
				msg[name].unread++
			}
			console.log(msg);
	},

	delete : function(){
		$(".delete-form").bind("submit",function(e){

			var delete_user = $(".delete_login",this).val();
			var delete_password = $(".delete_password",this).val();

			var url_delete = server+"/delete/"+delete_user+"/"+delete_password;
			// console.log(url_delete);

			$.ajax({
				url: url_delete,
				dataType: "jsonp",
				success: function(data){
					console.log("Supression du compte");
					$.mobile.changePage($("#login"), {
						transition: "slide",
						reverse: "true",
						reloadPage: "true"
					});
				},
				error: function(err){
					console.log(err);
				}
			});
			e.preventDefault();
			return false;
		});
	}

}