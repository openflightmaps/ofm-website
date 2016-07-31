<?php
/*
Plugin Name: Flightplan posts
Description: Displays posts on the page, which are tagged with the right FIR code.
Author: Stefan Türtscher
Version: 1.0
*/

class postsFIR extends WP_Widget
{
  function postsFIR()
  {
    $widget_ops = array('classname' => 'postsFIR', 'description' => 'Displays posts on the page, which are tagged with the right FIR code.' );
    $this->WP_Widget('postsFIR', 'Flightplan posts', $widget_ops);
  }
 
  function form($instance)
  {
    $instance = wp_parse_args( (array) $instance, array( 'title' => '' ) );
    $title = $instance['title'];
	?>
	<p><label for="<?php echo $this->get_field_id('title'); ?>">Title: <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo attribute_escape($title); ?>" /></label></p>
	<?php
  }
 
  function update($new_instance, $old_instance)
  {
    $instance = $old_instance;
    $instance['title'] = $new_instance['title'];
    return $instance;
  }
  
  function get_page_id($page_name)
  {
	global $wpdb;
	$page_name = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = '".$page_name."'");
	return $page_name;
  }
 
 
  function widget($args, $instance)
  {
   	?>

	  <a id="flightplan"></a>
      <div class="container-white-flightplan">
        <div id="maincnot" class="container">
          <div class="row">
          <div class="col-lg-12 col-sm-12">
            <div class="clearfix"></div>
            <h2 id="flightplanTitle" class="section-heading" style="text-transform:uppercase">
            </h2>
            <hr class="section-heading-black"/>
	    <h3 id="flightplanDescr"></h3>
          </div>
        </div>
        <div class="row">
          <div style="margin-left:16px">
				    <?php
              global $wp_query;
              $post_id = $wp_query->post->ID;
              $region = get_post_meta($post_id, 'regionCode', TRUE);
					    $postQuery_arg = array('category_name' => $region, 'posts_per_page' => 4);
					    $postQuery = new WP_Query($postQuery_arg);
					    while ($postQuery->have_posts()) : $postQuery->the_post();
				    ?>
				      <div class="col-lg-4 col-sm-6 list-groupPlugin">
                <div class='list-group-item' style='border:1px solid #f1f1f1;text-align:text-center'>
                  <h4 class='list-group-item-heading' style='text-align:center;background-color:#f1f1f1;border-bottom:1px solid #f1f1f1;padding:2px'>
                    <?php the_title(); ?>
                  </h4>
                  <p><?php the_content(); ?></p>
                </div>
              </div> 		
				      <?php endwhile; ?> 
            </div>
          </div>
        </div>
      </div>

  <?php
  echo $after_widget;
  }
 
}
add_action( 'widgets_init', create_function('', 'return register_widget("postsFIR");') );?>