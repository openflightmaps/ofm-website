<?php
/*
Plugin Name: Subscribe Information
Description: Informations to subscribe for the openflightmaps project.
Author: Stefan Türtscher
Version: 1.0
*/

class subscribe extends WP_Widget
{
  function subscribe()
  {
    $widget_ops = array('classname' => 'subscribe', 'description' => 'Informations to subscribe for the openflightmaps project.' );
    $this->WP_Widget('subscribe', 'Subscribe Information', $widget_ops);
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

<a id="subscribe"></a>
<div class="container-white-flightplan">
  <div id="maincnot" class="container">
    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <h2 id="subscribeTitle" class="section-heading">
        </h2>
        <hr class="section-heading-black"/>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-6">
        <h3> Subscribe to our mailing list</h3>
        <p class="lead">Get informed about the latest and important data updates on the project.</p>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-info btn-lg ofm-blue" data-toggle="modal" data-target="#myModal">
          Subscribe to our Newsletter
        </button>

          <!-- Modal -->
        <div class='modal' data-backdrop='static' data-keyboard='false' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>
          <div class='modal-dialog' role='document'>
            <div class='modal-content' style='border-radius: 0px;'>
              <div class='modal-header'>
                <button onClick='ignoreUpdateTimer=false;' type='button' class='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
                <h3 class="modal-title" id="myModalLabel">Interested to participate?</h3>
              </div>
              <div class="modal-body">
                <!-- Begin MailChimp Signup Form -->
                <link href="http://openflightmaps.org/cdn-images.mailchimp.com/embedcode/classic-081711.css" rel="stylesheet" type="text/css"/>
                <style type="text/css">
                    #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
                    /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
                    We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
                </style>
                <div id="mc_embed_signup">
                  <form action="http://openflightmaps.us10.list-manage.com/subscribe/post?u=acb60964fff05a9b1321b88e6&amp;id=c3a98de455" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate="">
                    <div id="mc_embed_signup_scroll">
                      <h2>Subscribe to our mailing list</h2>
                      <div class="indicates-required">
                        <span class="asterisk">*</span> indicates required
                      </div>
                      <div class="mc-field-group">
                        <label for="mce-EMAIL">
                          Email Address  <span class="asterisk">*</span>
                        </label>
                        <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL"></input>
                        <div id="mce-responses" class="clear">
                          <div class="response" id="mce-error-response" style="display:none"></div>
                          <div class="response" id="mce-success-response" style="display:none"></div>
                        </div>
                        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                          <div style="position: absolute; left: -5000px;">
                            <input type="text" name="b_acb60964fff05a9b1321b88e6_c3a98de455" tabindex="-1" value=""></input>
                          </div>
                          <div class="clear">
                            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></input>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!--End mc_embed_signup-->
                </div>
                <div class="modal-footer">
                  <button onClick='ignoreUpdateTimer = false;' type='button' class='btn btn-default' data-dismiss='modal' style='border-radius: 0px;'>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class="col-lg-6 col-sm-6">
        <h3>Contact us</h3>
        <p class="lead">
          Please report to us in case of data alterations, as well as license requests to the following address:
        </p>
        <span>
          <img src="http://openflightmaps.org/live/img/mail.png" alt="contact" width="250px" height="" />
        </span>
      </div>  
    </div>
  </div>
</div>

<?php
    echo $after_widget;
  }
 
}
add_action( 'widgets_init', create_function('', 'return register_widget("subscribe");') );?>