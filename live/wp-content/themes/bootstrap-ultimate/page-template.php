<?php 

/*
	Template Name: OFM
*/
	
global $eo_options;
get_header(OFM);
$cust_layout = get_post_meta($post->ID,'_eo_cust_post_layout',true);
$customimg = get_post_meta($post->ID,"_eo_cust_post_feat_img",true);
?>

<!-- Loading -->
<div id="loader" style="height:calc(100%); text-align:center;" >
  <span style=" display: inline-block; height:50%; vertical-align:middle;"></span>
  <div >
    <img height="24px" style="vertical-align: middle;" src="http://www.openflightmaps.org/live/wp-content/plugins/jobs/ajaxLoader.gif"/>
    <br/>loading...
  </div>
</div>

<!-- Header -->
<div id="pageContent" style="display:none;" class="ofm-page-wp"> <!-- loading div  -->
  <div style="margin-top:50px"></div>
      <div class="broadcast" >
        <div class="container" >
          <div id="broadcast" >
          </div>
        </div>
      </div>
  <div id="backgroundPicture" class="background-changing">
    <div id="backgroundPicture2" class="background-changing2" style="display:none"></div>
      <div id="sloganContainer">
      <div id="opacityBackground" style="background-color:rgba(0,0,0,0.3) ;width:50%;min-width:350px;margin: 0 auto 0;padding:15px;border-radius:0;border:1px rgba(255,255,255,0.2) solid" align="center">
        <div><h1>
          <img class="hidden-xs hidden-sm hidden-md" src="http://www.openflightmaps.org/live/img/ofm-logo.png" alt="open flightmaps" width="500px" height=""/>
          <img class="hidden-xs hidden-sm hidden-lg" src="http://www.openflightmaps.org/live/img/ofm-logo.png" alt="open flightmaps" width="400px" height=""/>
          <img class="hidden-xs hidden-lg hidden-md" src="http://www.openflightmaps.org/live/img/ofm-logo.png" alt="open flightmaps" width="300px" height=""/>
          <img class="hidden-sm hidden-lg hidden-md" src="http://www.openflightmaps.org/live/img/ofm-logo.png" alt="open flightmaps" width="200px" height=""/>
          <span id="regionNameOfm" style="color:white;" class="hidden-xs">
          </span>
        </h1>
        <h4 id="slogan"></h4>
        <hr class="intro-divider"/>
        <ul class="list-inline intro-social-buttons">
          <li>
            <a style="cursor:pointer; border-radius: 0px" id="download_link" class="btn btn-info btn-lg ofm-blue">
              <span class="glyphicon glyphicon-file" aria-hidden="true"></span>
              <span id="download_slogan" class="network-name"></span>
              </a>
 
              	   <br><div style="margin-top:30px;color:white">

                <span style="margin:5px">
					<img href="https://www.facebook.com/openflightmaps/" width="20px" src="http://www.openflightmaps.org/testumgebung/img/facebook.png"> <a href="https://www.facebook.com/openflightmaps/" style="color:white">facebook</a>
				</span>  
				<span style="margin:5px">
					<img href="https://twitter.com/openflightmaps" width="20px" src="http://www.openflightmaps.org/testumgebung/img/twitter.png"> <a href="https://twitter.com/openflightmaps" style="color:white">twitter</a>
				</span>
 
          </li>
        </ul>
        </div>
        </div>
      </div>
    </div>
  

  <!-- Content --> 
  <?php
  $mod_idfs = array("high"=>'highlights',"caru"=>'carousel',"feat"=>'featurettes');
  foreach ($mod_idfs as $mod_idf=>$fnam ) {
	  if( !empty($eo_options[$mod_idf.'_also_disp']) & is_array($eo_options[$mod_idf.'_also_disp']) ) {
		  //var_dump($eo_options[$mod_idf.'_also_disp']);
		  if(array_key_exists($post->ID,$eo_options[$mod_idf.'_also_disp']) && $eo_options[$mod_idf.'_also_disp'][$post->ID] == "1") {
			  eo_get_template_part( 'inc/modules/'.$fnam ); 
			  wp_reset_query();
		  }
	  }
  }

  ?>
	  <div id="content" class="clearfix ofm-page-wp" style="margin-top:30px">
		  <?php if($cust_layout && $cust_layout == "left-sidebar"  || !$cust_layout && $eo_options["main_layout"] == "left-sidebar" || $cust_layout == "default"  && $eo_options["main_layout"] == "left-sidebar" )	get_sidebar(); // sidebar main	?>
          <?php ($cust_layout && $cust_layout == "full" || !$cust_layout && $eo_options["main_layout"]=="full") ? $main_cols = 'col-sm-12' : $main_cols = eo_get_cols('main','',false) ?>
					    <?php get_template_part( 'content-single-OFM', get_post_format() ); ?>		
			  <?php if($cust_layout && $cust_layout == "right-sidebar"  || !$cust_layout  && $eo_options["main_layout"] == "right-sidebar" || $cust_layout == "default"  && $eo_options["main_layout"] == "right-sidebar" )	get_sidebar(); // sidebar main	?>
    </div> <!-- end #content -->
  
</div> <!-- loading div-->

<?php get_footer(OFM); ?>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-75894724-1', 'auto');
  ga('send', 'pageview');

</script>
