<?php
/*
Plugin Name: socialNetwork Information
Description: social network banner, please adjust the filepaths within this plugin.
Author: Oliver Vorderegger
Version: 1.0
*/

class socialNetwork extends WP_Widget
{
  function socialNetwork()
  {
    $widget_ops = array('classname' => 'socialNetwork', 'description' => 'social network banner' );
    $this->WP_Widget('socialNetwork', 'socialNetwork Information', $widget_ops);
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
<style>
.main_block {
    width: 20px;
    margin:0px;

    left:0px;
}

.main_block: before, .main_block: after {
    overflow: hidden;
    content: "";
    display: table;
    
}

.main_block: after {
    clear: both;
}

.inner_block {
    display: inline-block;
    float: left;
    padding-right:10px;
    padding-top: 5px;
}

.inner_block img {
    width: 100%;
    height: auto;
    vertical-align: left;
    margin:0px;
    padding:0px;
}</style>
<!-- I got these buttons from simplesharebuttons.com -->
<div align="left" style="width:50px">

<div>
     
    <!-- Facebook -->
    <a class="inner_block" href="https://www.facebook.com/sharer.php?u=http://openflightmaps.org&title=aeronautical data under a public license" target="_blank">
        <img  src="http://www.openflightmaps.org/live/wp-content/plugins/socialNetwork/img/facebook.png" alt="Facebook">
    </a >
    
        <!-- Twitter -->
    <a  class="inner_block" href="https://twitter.com/openflightmaps" target="_blank">
        <img  src="http://www.openflightmaps.org/live/wp-content/plugins/socialNetwork/img/twitter.png" alt="Facebook">
    </a>

   
</div>
</div>
<?php
    echo $after_widget;
  }
 
}
add_action( 'widgets_init', create_function('', 'return register_widget("socialNetwork");') );?>