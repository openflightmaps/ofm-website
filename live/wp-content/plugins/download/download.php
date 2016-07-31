<?php
/*
Plugin Name: Download section
Description: Displays available downloads for this FIR.
Author: Stefan Türtscher
Version: 1.0
*/

class download extends WP_Widget
{
  function download()
  {
    $widget_ops = array('classname' => 'download', 'description' => 'Displays available downloads for this FIR.' );
    $this->WP_Widget('download', 'Download Section', $widget_ops);
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
 
 
  function widget($args, $instance)
  {
  ?>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://www.openflightmaps.org/live/js/timeago.js"></script>
  <script src="http://www.openflightmaps.org/live/wp-content/plugins/download/download.js"></script>
  <script>
    // Stops the reloading for the download plugin while the curser is in an input field.
    $(document).ready(function(){
      $("#downloadMenu").focusin(function () {
        toggleUpdating = false;
      });
      $("#downloadMenu").focusout(function () {
        toggleUpdating = true;
      });
    });
  </script>

  <link rel="stylesheet" href="http://www.openflightmaps.org/live/wp-content/plugins/download/download.css"/>
    
  <a id="download"></a>
    <div class="container-gray-download">
      <div id="maincnot" class="container">
        <div class="row">
          <div class="col-lg-12 col-sm-12">
            <h2 id="downloadsTitle" class="section-heading">
            </h2>
            <hr class="section-heading-black"/>
            <div id="downloadMenu">
            </div>
          </div>
        </div>
      </div>
    </div>

    <?php
      echo $after_widget;
    }
}
add_action( 'widgets_init', create_function('', 'return register_widget("download");') );?>