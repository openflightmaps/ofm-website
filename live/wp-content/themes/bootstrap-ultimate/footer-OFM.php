<?php 
global $eo_options;
// Move footer outside #wrap if sticky footer is enabled
if( $eo_options["sticky_footer"] == "1" ) echo "</div></div>";
?>

<!-- Footer -->


<div id="footer" style="display:block; margin-top:0px; padding: 20px 0 10px; background-color:#F7F7F7!important; color: black;border-top: 2px #E1E1E1 solid">

  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <p>
          <img src="http://www.openflightmaps.org/live/img/ofm-logo-black.png" alt="favicon" width="180px" height="" />
        </p>
        <p style="margin-top:20px" id="commercial">
        </p>
      </div>

      <div class="col-sm-3">
        <h5>General Information</h5>
        <?php         
          $pageAbout = get_page(12);
          $urlAbout = $pageAbout->guid;
          $pageFaq = get_page(14);
          $urlFaq = $pageFaq->guid;
        ?>
        <ul class="list-unstyled">
          <li>
            <a href="<?php echo $urlAbout; ?>">What is open flightmaps</a>
          </li>
          <li>
            <a href="<?php echo $urlFaq; ?>">Frequently Asked Questions</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-3">
        <h5>Legal</h5>
        <ul class="list-unstyled">
          <li>
            <a href="http://www.openflightmaps.org/live/downloads/20150306-LCN.pdf" target="_blank">Legal and Copyright Notice</a>
          </li>
          <li>
            <a href="http://www.openflightmaps.org/live/downloads/20150306-CA.pdf" target="_blank">Contributor´s Agreement</a>
          </li>
          <li>
            <a href="http://www.openflightmaps.org/live/downloads/20150306-GUL.pdf" target="_blank">General Users' License</a>
          </li>
          <li>
            <a href="http://www.openflightmaps.org/live/downloads/20150306-DC.pdf" target="_blank">Disclaimer</a>
          </li>
        </ul>
      </div>

      <div class="col-sm-3">
          <a href="http://www.tugraz.at">
          <img src="http://www.openflightmaps.org/live/img/tulogo.png" alt="TU Graz" height="27px" />
        </a>
        <a href="http://www.fh-joanneum.at/aw/home/Studienangebot_Uebersicht/department_engineering/~cyr/lav/?lan=de">
          <img src="http://www.openflightmaps.org/live/img/johanneum.png" alt="FH Joanneum" height="27px" />
        </a>
      </div>

    </div>
    <!-- Close Row w cols -->
    <!-- Close Row footer -->

  </div>
  <!-- close container -->

</div>
 <div id="footer2" style="display:block;background-color:black;color:#e7e7e7;margin:0px;padding:0px"><b style="margin-left:5px;font-weight:lighter">open flightmaps association</b><small class="hidden-xs" style="font-weight:lighter"> | Getreidegasse 32 | 5020 Salzburg | Austria</small><small id="lastUpdate" class="pull-right hidden-xs" style="text-align:right;font-weight:lighter;color:white;margin-top:2px;margin-right:5px">12.12.2016 10:12 UTC</small></div>
<!-- close ID Footer -->

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-75894724-1', 'auto');
  ga('send', 'pageview');

</script>

</body>

</html>
