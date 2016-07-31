<?php
/*
Plugin Name: Commits
Description: Displays commits on the page, which are tagged within the FIR.
Author: Stefan Türtscher
Version: 1.0
*/

class commits extends WP_Widget
{
  function commits()
  {
    $widget_ops = array('classname' => 'commits', 'description' => 'Displays commits on the page, which are tagged within the FIR.' );
    $this->WP_Widget('commits', 'Commits', $widget_ops);
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
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://www.openflightmaps.org/live/js/timeago.js"></script>
  <script src="http://www.openflightmaps.org/live/wp-content/plugins/commits/commits.js"></script>

  <a id="commits"></a>
    <div class="container-gray-commits">
      <div id="maincnot" class="container"> 
        <div class="row">
          <div class="col-lg-12 col-sm-12">
            <div class="clearfix"></div>
            <h2 id="commitsTitle" class="section-heading" style="text-transform:uppercase">
            </h2>
            <hr class="section-heading-black"/>
          </div>
        </div>
        <div id="commitsContent" style='margin-left:16px'></div>
        <div id="commitsContentModal"></div>
      </div>
    </div>

  <?php
  
  echo $after_widget;
  }
}
add_action( 'widgets_init', create_function('', 'return register_widget("commits");') );?>