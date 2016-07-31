
<?php global $eo_options;
get_header(OFM);
$cust_layout = get_post_meta($post->ID,'_eo_cust_post_layout',true);
$customimg = get_post_meta($post->ID,"_eo_cust_post_feat_img",true);
?>

<div style="min-height:calc(100% - 205px)"> <!-- minimal height for footer div  -->
  <div class="container" id="maincnot" style="margin-top:50px"></div>
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
	  <div id="content" class="clearfix">
		  <?php if($cust_layout && $cust_layout == "left-sidebar"  || !$cust_layout && $eo_options["main_layout"] == "left-sidebar" || $cust_layout == "default"  && $eo_options["main_layout"] == "left-sidebar" )	get_sidebar(); // sidebar main	?>
          <?php ($cust_layout && $cust_layout == "full" || !$cust_layout && $eo_options["main_layout"]=="full") ? $main_cols = 'col-sm-12' : $main_cols = eo_get_cols('main','',false) ?>
					  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>	
					    <?php get_template_part( 'content-single', get_post_format() ); ?>		

					  <?php endwhile; ?>			
					
					  <?php else : ?>
					
					  <article id="post-not-found">
					      <header>
					    	  <h1><?php _e("Not Found", "bonestheme"); ?></h1>
					      </header>
					      <section class="post_content">
					    	  <p><?php _e("Sorry, but the requested resource was not found on this site.", "bonestheme"); ?></p>
					      </section>
					      <footer>
					      </footer>
					  </article>
					
					  <?php endif; ?>
			  <?php if($cust_layout && $cust_layout == "right-sidebar"  || !$cust_layout  && $eo_options["main_layout"] == "right-sidebar" || $cust_layout == "default"  && $eo_options["main_layout"] == "right-sidebar" )	get_sidebar(); // sidebar main	?>
	</div><!-- maincnot -->
  
</div> <!-- minimal height for footer div  -->

<?php get_footer(OFM); ?>

   <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-75894724-1', 'auto');
  ga('send', 'pageview');

</script>
