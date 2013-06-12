<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>LightIM</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

<link rel="stylesheet" href="css/jquery.mobile-1.2.0.min.css" />
<link rel="stylesheet" href="css/lightim.css" />

<script src="js/jquery-1.8.2.min.js"></script>
<script src="js/jquery.mobile-1.2.0.min.js"></script>
<script src="js/lm.js?r=<?php echo rand(); ?>"></script>
<script src="js/ui.js?r=<?php echo rand(); ?>"></script>

<meta name="apple-mobile-web-app-capable" content="yes" />
<meta property="og:type" content="website"/>

<link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-57x57-precomposed.png">
<link rel="icon" sizes="57x57" href="favicon.ico">
</head>
<body>

<div data-role="page" id="login">

	<div data-role="header" data-position="fixed">
		<h1>Connexion</h1>
		<a data-role="button" class="ui-btn-right" href="#register" data-transition="slide">Inscription</a>
	</div><!-- /header -->

	<div data-role="content">
		<img class="logo" src="img/lightim.png" alt="Bienvenue!" height="120px" width="120px">
		<form class="login_form">
	        <div class="input-group">
	          <div class="input-row">
	            <label>Pseudo</label>
	            <input type="text" class="login" placeholder="Votre pseudo" value="adrien">
	          </div>
	          <div class="input-row">
	            <label>Password</label>
	            <input type="password" class="password" placeholder="Votre mot de passe" value="pwsword">
	          </div>
	          <div class="server_select">
		          <label for="server" class="select">Serveur:</label>
				  <select name="server" class="server">
					<option value="http://lightim.aws.af.cm/">AWS</option>
					<option value="http://node.kw-creation.com">KW-Creation</option>
				  </select>
			  </div>
	        </div>
	        <input type="submit" value="Connexion">
      	</form>
	</div><!-- /content -->

</div><!-- /page login-->



<div data-role="page" id="register">

	<div data-role="header" data-position="fixed">
		<a data-role="button" data-transition="slide" data-icon="arrow-l" href="#login">Connexion</a>
		<h1>Inscription</h1>
	</div><!-- /header -->

	<div data-role="content">	
		<form class="register_form">
	        <div class="input-group">
	          <div class="input-row">
	            <label>Pseudo</label>
	            <input type="text" class="new_login" placeholder="Choisissez un pseudo">
	          </div>
	          <div class="input-row">
	            <label>Password</label>
	            <input type="password" class="new_password" placeholder="Choisissez un mot de passe">
	          </div>
	          <div class="server_select">
		          <label for="server" class="select">Serveur:</label>
				  <select name="server" class="server">
					<option value="http://node.freelancis.net">Freelancis</option>
					<option value="http://node.kw-creation.com">KW-Creation</option>
				  </select>
			  </div>
	        </div>
	        <input type="submit" value="Inscription">
      	</form>
	</div><!-- /content -->

</div><!-- /page register-->



<div data-role="page" id="contacts">

	<div data-role="header" data-position="fixed">
		<h1>Messagerie</h1>
		<a href="#popupBasic" data-rel="popup" data-role="button" class="ui-btn-right" data-icon="grid" data-iconpos="right">Menu</a>
	</div><!-- /header -->

	<div data-role="popup" id="popupBasic">
		<ul data-role="listview" data-count-theme="b">
			<li><a href="#new" data-transition="pop">Nouveau message</a></li>
			<li><a href="#options" data-transition="slide">Paramètres</a></li>
		<ul>
	</div>

	<div data-role="content">	
		<ul data-role="listview" data-count-theme="b" class="conversations-list" data-filter="true" data-filter-placeholder="Rechercher...">
			<!-- Ici les contacts s'ajoute via JS -->
		</ul>
	</div><!-- /content -->

</div><!-- /page contacts-->



<div data-role="page" id="conversation">

	<div data-role="header" data-position="fixed">
		<h1 class="contact-name"></h1>
		<a data-role="button" data-transition="slidedown" data-icon="arrow-l" href="#contacts">Contacts</a>
	</div><!-- /header -->

	<div data-role="content">
		<ul data-role="listview" class="messages-list" id="list">
			<!-- Ici les message s'ajoute via JS -->
		</ul>
		<form class="reply_form">
			<textarea class="message" name="message" id="message" placeholder="Tapez votre message...."></textarea>
			<input type="submit" value="Envoyer">
		</form>
	</div><!-- /content -->

</div><!-- /page conversation-->



<div data-role="page" id="new">

	<div data-role="header" data-position="fixed">
		<h1>Nouveau message</h1>
		<a data-role="button" data-transition="slidedown" data-icon="arrow-l" href="#contacts">Contacts</a>
	</div><!-- /header -->

	<div data-role="content">	
		<form class="new_form">
			<label for="to" id="message">À</label>
	        <input class="to" type="text" placeholder="Destinataire">
			<label for="message">Votre message:</label>
			<textarea class="message" name="message" id="message" placeholder="Tapez votre message...."></textarea>
			<input type="submit" value="Envoyer">
      	</form>
      	
	</div><!-- /content -->

</div><!-- /page -->

<div data-role="page" id="options">

	<div data-role="header" data-position="fixed">
		<h1>Paramètres</h1>
		<a data-role="button" data-transition="pop" data-icon="arrow-l" href="#contacts">Contacts</a>
	</div><!-- /header -->

	<div data-role="content">
		<form>
		   <label for="timer">Rafraichissement (en ms):</label>
		   <input type="range" name="slider" id="timer" value="5000" min="1000" max="30000"  />
		</form>
		<br>
		<br>
		<form class="delete-form">
	        <div class="input-group">
	          <div class="input-row">
	            <label>Pseudo</label>
	            <input type="text" class="delete_login" placeholder="Votre pseudo">
	          </div>
	          <div class="input-row">
	            <label>Password</label>
	            <input type="password" class="delete_password" placeholder="Votre mot de passe">
	          </div>
	        </div>
		   <input type="submit" value="Supprimer" data-theme="b">
		</form>
	</div><!-- /content -->

</div><!-- /page -->
	
</body>
</html>


