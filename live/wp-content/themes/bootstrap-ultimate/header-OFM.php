<?php
if ( ! defined( 'ABSPATH' ) ) exit;

global $eo_options,$wpdb,$th_xs_slug;

?><!DOCTYPE html> 
<!--[if IEMobile 7 ]> <html <?php language_attributes(); ?>class="no-js iem7"> <![endif]-->
<!--[if lt IE 7 ]> <html <?php language_attributes(); ?> class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html <?php language_attributes(); ?> class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html <?php language_attributes(); ?> class="no-js ie8"> <![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->

<!-- -->

<!-- The page ID of the documentation, FAQ, About and OFM need to be changed by installing wordPress some place else. -->

<!-- -->

<head>

	<!-- This section sets all variables for the navbar from wordPress.  -->
	<?php
		/* Get the data for the navbar */
		global $wp_query;
		$post_id = $wp_query->post->ID;

		/* Get all the main pages */
		$regionCodeCategoryArray = get_the_terms($post_id,'category');
		$regionCodeCategory = $regionCodeCategoryArray[0]->name;
		$regionCodeCategory = substr($regionCodeCategory,4,5);

		$regionCode = get_post_meta($post_id, 'regionCode', TRUE);
		$regionNameEnglish = get_post_meta($post_id, 'regionNameEnglish', TRUE);
		$regionNameLocal = get_post_meta($post_id, 'regionNameLocal', TRUE);

		if ($regionCode == ''){$regionCode = $regionCodeCategory;}
		$pageQuery_arg = array('meta_key' => 'regionCode', 'meta_value' => $regionCode);
		$pages = get_pages($pageQuery_arg);

		/* Get all regions */
		$regionQuery_arg = array('sort_column' => 'post_title', 'meta_key' => 'regionCode','parent' => 0);
		$regions = get_pages($regionQuery_arg);
		$pageUrl = get_page_link($post_id);

		/* Get the region name for the logo and the URL of the main page */
		$mainPage_arg = array('meta_key' => 'regionCode', 'meta_value' => $regionCode, 'parent' => 0);
		$mainPages = get_pages($mainPage_arg);
		$mainPage = $mainPages[0];
		$mainPageUrl = $mainPage->guid;
		$mainPageId = $mainPage->ID;

		$regionNameEnglish = get_post_meta($mainPageId, 'regionNameEnglish', TRUE);
		$regionNameLocal = get_post_meta($mainPageId, 'regionNameLocal', TRUE);
		$xmlUrl = get_post_meta($post_id, 'publicationUrl', TRUE);
	?>

	<script src="http://www.openflightmaps.org/live/js/jquery.js"></script>
	<script src="http://www.openflightmaps.org/live/js/bootstrap.min.js"></script>
	<script src="http://www.openflightmaps.org/live/js/ofmTemplate.js"></script>
	<script src="http://www.openflightmaps.org/live/wp-content/plugins/jobs/jobs.js"></script>
	<script src="http://www.openflightmaps.org/live/js/timeago.js"></script>

	<script>
	
	// idle detection
	var idleTime = 0;
	

	
	// Set global variables and functions for page.

		var languageLocal = (window.location.hash =="#lang=local");	// Global variable for the chosen language. 
		var onMaintenance = "false";	// Global variable for maintenance mode of the page.
		var xmlDoc;					// Global varibale for the .xml file.
		var toggleUpdating = true;

		var xmlUrl = "<?php echo $xmlUrl; ?>";							// Get url from wordPress.
		var regionNameEnglish = "<?php echo $regionNameEnglish; ?>";	// Get region name in english from wordPress.
		var regionNameLocal = "<?php echo $regionNameLocal; ?>";		// Get local region name from wordPress

		jQuery(window).on("load", function() {

	    	//Increment the idle time counter every minute.
		    var idleInterval = setInterval(timerIncrement, 60000); //  
		
		    //Zero the idle timer on mouse movement.
		    $(this).mousemove(function (e) {
		        idleTime = 0;
		    });
		    $(this).keypress(function (e) {
		        idleTime = 0;
		    });

			function timerIncrement() {
			    idleTime = idleTime + 1;
			    if (idleTime > 20) { // 20 minutes
			        window.location.reload();
			    }
			}


			$("#languageEnglish").click(function () {
				languageLocal = !languageLocal;
				xml2html();
			});

			$("#languageLocal").click(function () {
				languageLocal = !languageLocal;
				xml2html();
			});

			// resize event handler (background image slideshow)
			$( window ).resize(function() {
				backgroundPicture();
			});

			setNavbar();
			setTimeout(function(){backgroundPicture();},500);

			setTimeout(function(){requestPublications();},500);
	 
			window.setInterval(slideShow, 8000);
			window.setInterval(requestPublications, 20000);
			window.setInterval(createCommercialString, 5000);
			window.setInterval(updateProgress, 500);

		});	

	</script>

	<meta charset="utf-8">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
				
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
            <?php if( ! empty ($eo_options["favicon_url"]) ) { ?>
       		<link rel="shortcut icon" href="<?php echo $eo_options["favicon_url"]; ?>">
			<?php } ?>
	<!-- media-queries.js (fallback) -->
	<!--[if lt IE 9]>
		<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>			
	<![endif]-->

	<!-- html5.js -->
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<script src="library/js/respond.min.js"></script>
	<![endif]-->
		
  	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php if($eo_options["use_placeholder"] == "1") { ?>
	<script type='text/javascript' src='<?php echo get_template_directory_uri()?>/rsc/js/holder.js'></script>
    <?php } ?>
	<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>

	<!-- theme options from options panel -->
    <?php if ( $eo_options['use_bsw_themes'] == "1" && $eo_options['bsw_theme'] != "default"  && $eo_options['bsw_theme_sup'] == "1" ) { 
	$gl_u = get_template_directory_uri().'/lib/bootstrap/fonts/';
	?>
    <?php
	    echo '<style>@font-face {
		font-family: "Glyphicons Halflings";
		src: url("'.$gl_u.'glyphicons-halflings-regular.eot");
		src: url("'.$gl_u.'glyphicons-halflings-regular.eot?#iefix") format("embedded-opentype"), url("'.$gl_u.'glyphicons-halflings-regular.woff") format("woff"), url("'.$gl_u.'glyphicons-halflings-regular.ttf") format("truetype"), url("'.$gl_u.'glyphicons-halflings-regular.svg#glyphicons-halflingsregular") format("svg");
	}
	</style>';
	} ?>
	<?php  if ( is_singular() ) eo_inline_css_per_post(); ?>

	<?php if ( $eo_options['eo_typo_body'] && array_key_exists("source",$eo_options['eo_typo_body']) && $eo_options['eo_typo_body']["source"] == "gwf_font") { ?>
	<link href='http://fonts.googleapis.com/css?family=<?php echo $eo_options['eo_typo_body']["face"] ?>:<?php echo $eo_options['eo_typo_body']["variant"] ?>' rel='stylesheet' type='text/css'>
    <?php } ?>
	<?php if ( $eo_options['eo_typo_heading'] && array_key_exists("source",$eo_options['eo_typo_heading']) && $eo_options['eo_typo_heading']["source"] == "gwf_font") { ?>
	<link href='http://fonts.googleapis.com/css?family=<?php echo $eo_options['eo_typo_heading']["face"] ?>:<?php echo $eo_options['eo_typo_heading']["variant"] ?>' rel='stylesheet' type='text/css'>
    <?php } ?>
    <?php if ( $eo_options['eo_typo_nav'] && array_key_exists("source",$eo_options['eo_typo_nav']) && $eo_options['eo_typo_nav']["source"] == "gwf_font") { ?>
	<link href='http://fonts.googleapis.com/css?family=<?php echo $eo_options['eo_typo_nav']["face"] ?>:<?php echo $eo_options['eo_typo_nav']["variant"] ?>' rel='stylesheet' type='text/css'>
    <?php }
	// _eo-todo: compact the typography csses ? ?>
    <?php wp_head(); ?>

</head>

<body>
	
	<nav class="navbar navbar-ofm navbar-fixed-top topnav" role="navigation">
		<div class="container topnav">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button  type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>

			<!-- OFM logo in navbar -->

			<a class="navbar-brand topnav hidden-xs" href="<?php if(is_404() != true ){ echo $mainPageUrl; } else {echo 'http://www.openflightmaps.org/live/'; } ?>"><img src="http://www.openflightmaps.org/live/img/openflightmaps.png" width="128px" height="" /><span id="regionName" style="color:white; vertical-align:bottom; margin-left:3px"></span></a>	
			<a class="navbar-brand topnav hidden-sm hidden-md hidden-lg"><img src="http://www.openflightmaps.org/live/img/openflightmaps.png" width="128px" height="" /><span id="regionNameXs" style="color:white; vertical-align:bottom; margin-left:3px"></span></a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->

			<div class="collapse navbar-collapse" id="myNavbar">
				<ul class="nav navbar-nav">
					<li>
						<a id="commitNumber_mnu" title="Total commit number of the last 24h" style="margin-left:20px; margin-right:20px; cursor:pointer; font-weight: bold; color: white;"></a>
					</li>
					<li id="download_mnu" class="hidden-sm" style="display:none">
						<a id="downloadTitleMnu" style="cursor:pointer" ></a>
					</li>
					<li id="news_mnu" class="hidden-sm" style="display:none">
						<a id="newsTitleMnu" style="cursor:pointer" ></a>
					</li>
					<li id="flightplan_mnu" class="hidden-sm" style="display:none">
						<a id="flightplanTitleMnu" style="cursor:pointer" ></a>
					</li>
					<li>
						<a style="cursor:pointer" data-toggle="dropdown" class="dropdown-toggle" id="pagesTitle">Pages<b class="caret"></b></a>
						<ul class="dropdown-menu">
						<?php
							foreach ( $pages as $page ) {
							if($page->post_title != get_the_title()){
							$pageTitle = $page->post_title;
							$url = $page->guid;
							?>
							<li><a href="<?php echo $url ?>"><?php echo $pageTitle ?></a></li>
							<?php }}
								$pageHome = get_page(6);
								$urlHome = $pageHome->guid; 
								$pageDocu = get_page(10);
								$urlDocu = $pageDocu->guid;
								$pageAbout = get_page(12);
								$urlAbout = $pageAbout->guid;
								$pageFaq = get_page(14);
								$urlFaq = $pageFaq->guid;
							?>
							<li class="divider"></li>
							<?php if($post_id != 6){ ?>
							<li><a href="<?php echo $urlHome; ?>">Home</a></li>
							<?php } if($post_id != 10){ ?>
							<li><a href="<?php echo $urlDocu; ?>">Documentation</a></li>
							<?php } ?>
							<?php
								if($post_id == 6 OR $post_id == 12 OR $post_id == 14 OR $post_id == 10){
								if($post_id != 14){ ?>
								<li><a href="<?php echo $urlFaq; ?>">FAQ</a></li>
								<?php } if($post_id != 12){ ?>
								<li><a href="<?php echo $urlAbout; ?>">About</a></li>
							<?php }} ?>
						</ul>
					</li>
					<li>
						<a style="cursor:pointer;color:white" data-toggle="dropdown" class="dropdown-toggle" id="regionsTitle">Regions<b class="caret"></b></a>
						<ul class="dropdown-menu">
						<?php
							foreach ( $regions as $page ) {
							if($page->post_title != get_the_title() AND $page->ID != 6 AND $page->ID != 10 AND $page->ID != 12 AND $page->ID != 14){
							$pageTitle = $page->post_title;
							$url = $page->guid;
							?>
							<li><a href="<?php echo $url ?>"><?php echo $pageTitle ?></a></li>
							<?php }} ?>
						</ul>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li>
						<?php if ( is_user_logged_in() ) { 
						$current_user = wp_get_current_user();
						?>
						<a style="cursor:pointer; color:white" data-toggle="dropdown" class="dropdown-toggle"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><?php echo $current_user->display_name ?><b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a id="editProfile_cmd" href="<?php echo get_edit_profile_url(); ?>">Edit My Profile</a></li>
							<li class="divider"></li>
							<li><a id="logOut_cmd" href="<?php echo wp_logout_url(); ?>">Log Out</a></li>
						</ul>
						<?php
						} else {
							?>
							<a href="<?php echo wp_login_url( get_permalink() ); ?>" id="login" >Login</a>
							<?php } ?>
					</li>
					<?php if ( $post_id != 10 AND is_404() != true AND $post_id != 6 AND $post_id != 12 AND $post_id != 14 AND $xmlUrl != "") { 
						?>
					<li>
						<a id="languageEnglish" style="color:white; cursor:pointer"></a>
					</li>
					<li style="margin-top:12px" class="hidden-xs">
						<div style="color:white">|</div>
					</li>
					<li>
						<a id="languageLocal" style="color:white; cursor:pointer"></a>
					</li>
					<?php } ?>
				</ul>
			</div>
		</div>
	</nav>
