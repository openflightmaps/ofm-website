<?php
/*
Plugin Name: News section
Description: Displays posts on the page, which are tagged with the right FIR and news code.
Author: Stefan Türtscher
Version: 1.0
*/

class news extends WP_Widget
{
  function news()
  {
    $widget_ops = array('classname' => 'news', 'description' => 'Displays posts on the page, which are tagged with the right FIR and news code.' );
    $this->WP_Widget('news', 'News Section', $widget_ops);
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

	  <a id="news"></a>
      <div class="container-white-news">
        <div id="maincnot" class="container">
          <div class="row">    
            <div class="col-lg-12 col-sm-12">
                <div class="clearfix"></div>
                <h2 id="newsTitle" class="section-heading" style="text-transform:uppercase">
                </h2>
                <hr class="section-heading-black"/>
		<h3 id="newsDescr"></h3><br>
            </div>
            <ul style="margin-right:16px">
				      <?php
                global $wp_query;
                $post_id = $wp_query->post->ID;
                $regionCode = get_post_meta($post_id, 'regionCode', TRUE);
                $regionNews = 'news' . $regionCode;
					      $newsQuery_arg = array('category_name' => $regionNews, 'posts_per_page' => 6);
					      $newsQuery = new WP_Query($newsQuery_arg);
					      while ($newsQuery->have_posts()) : $newsQuery->the_post();
				      ?>
              <li>
                <h3 style=""><a href="<?php the_permalink(); ?>"><?php the_title(); ?> </a>
                </h3>
                <a style="font-weight: normal; font-style: italic; color: #666;">
                  <?php the_time( get_option( 'date_format' ) ); ?>
                </a>
                  <?php the_content('Read more...'); ?>
              </li>  		
				      <?php endwhile; ?>
            </ul>
          </div>
        </div>
      </div>
    
<?php
    echo $after_widget;
  }
 
}
add_action( 'widgets_init', create_function('', 'return register_widget("news");') );?>