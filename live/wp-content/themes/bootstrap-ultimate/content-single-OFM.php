<?php global $eo_options;
$customimg = get_post_meta($post->ID,"_eo_cust_post_feat_img",true); ?>

		  <?php   if ( has_post_thumbnail() ) { 
		  		  	($eo_options["featimg_disp"] == "block" || $eo_options["featimg_disp"] == "hybrid") ? $fimg_dcl = '' : $fimg_dcl = 'cbinl col-sm-3 col-md-4 col-lg-3';
                     $thumbargs = array(
                //	'src'	=> $src,
                    'class' => 'feat-thumb img-responsive',
                    'alt'	=> trim(strip_tags(get_the_title() ) ),
                    'title'	=> trim(strip_tags(get_the_title() ) )
                    );
					($eo_options["featimg_size_s"]) ? $featimg_size = $eo_options["featimg_size_s"] : $featimg_size = 'eo-carousel';
                    $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large');
                    echo '<a href="' . $large_image_url[0] . '" class="thumbnail cboxElement '.$fimg_dcl.'">';
                    the_post_thumbnail( $featimg_size,$thumbargs ); 
                    echo '</a>';
                }
                elseif($customimg) { 
                    $pimg = '<a href="'.$customimg. '" class="thumbnail cboxElement cbinl col-sm-3 col-md-4 col-lg-3" title="' . the_title_attribute('echo=0') . '"><img src="'.$customimg.'" class="featurette-image img-responsive custimg" /></a>';
                    echo $pimg;
                }
                    the_content();
                ?>
               <?php wp_link_pages(); ?>
               
   <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-75894724-1', 'auto');
  ga('send', 'pageview');

</script>
            