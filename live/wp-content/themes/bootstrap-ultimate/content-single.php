<?php global $eo_options;
$customimg = get_post_meta($post->ID,"_eo_cust_post_feat_img",true); ?>

	<header>							
		<div class="page-header"><h4 class="single-title" itemprop="headline"><?php the_title(); ?></h4></div>
	</header> <!-- end article header -->

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