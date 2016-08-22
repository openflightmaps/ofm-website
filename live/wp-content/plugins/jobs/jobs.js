var timeStart = [];
var timeEnd = [];

// blink feature
var toggleBlink = false;

var cnt = 0;
setInterval(function(){
cnt +=1;
if (cnt == 100) {toggleBlink = !toggleBlink;cnt =0;}

if (toggleBlink){

 if ( cnt > 70) {$("[name='blinkMe']").css('background-color','white');}
  if (( cnt > 80)&&(cnt < 90)) {$("[name='blinkMe']").css('background-color','transparent');}

}else{
 $("[name='blinkMe']").css('background-color','transparent');
}
},10);

function getMinutesBetweenDates(d0, d1) {

  var msPerMin = 8.64e7 / 24 / 60;

  // Copy dates so don't mess them up
  var x0 = new Date(d0);
  var x1 = new Date(d1);

  

  // Round to remove daylight saving errors
  return Math.round( (x1 - x0) / msPerMin );
}


function createJobsList() {
    // This function creates the html-code for the download plugin.
    // The function is called in the requestPublications() function in the /ofmTemplate.js file.

    $(xmlDoc).find('item').each(function () {
        var type = $(this).attr("type");
        switch (type) {
            case 'jobs':
                var htmlString = "<div class='row'>";                       // Sets the string back because of the reload.
                var i = 0;
                var progress = [];

				var descr = "";
				var noContent = "";
 				if (languageLocal) {                                        // Sets language
                    descr= $(this).attr("descr_local");    
                    noContent = $(this).attr("noContent_local");    
                } else {
					descr= $(this).attr("descr_english");  
					noContent = $(this).attr("noContent_english");    
                }
             
                htmlString += '<h3>' + descr + '</h3></div><div class="row">';

				var descr_local=  $(this).attr("descr_local");
			 
                if (onMaintenance == "false") {                             // Maintenance mode of plugin
                    $(this).find('job').each(function () {
                        var type = $(this).attr("type");
                        var name = $(this).attr("name");
                        
                        // details (abbreviated and normal)
                        var details_english = $(this).attr("details_english");
                        var details_local = $(this).attr("details_local");

          				var descr_english = $(this).attr("descr_english");
                        var descr_local = $(this).attr("descr_local");
                        
                        // handle language dependency
                        var descr=descr_english.toUpperCase();
 						if (languageLocal==true){descr=descr_local.toUpperCase();}
 						
 						var details=details_english.toUpperCase();
 						if (languageLocal==true){details=details_local.toUpperCase();}


                        var detailsAbbr;
                        var maxLength = 200;
                        if (details.length>maxLength ){detailsAbbr= details.substring(0,maxLength) + '...';}else{detailsAbbr = details;}      	
                      	var detailsRespHtml = "<small class='hidden-md hidden-lg hidden-sm' style='font-size:15px'>" + details + "</small><small class='hidden-xs'>" + detailsAbbr + "</small>";

              
                        
                        var timestamp_start = $(this).attr("timestamp_start");
                        var timestamp_estimateFinish = $(this).attr("timestamp_estimateFinish");
                        var inProgress = $(this).attr("inProgress");
                        var url = $(this).attr("URL");

                        var productId = $(this).attr("productId");
                        var searchName = name.toLowerCase();

                        timeStart[i] = getDate(timestamp_start).getTime();
                        timeEnd[i] = getDate(timestamp_estimateFinish).getTime();

                        // To avoid jumping of the progress bar after reload.
                        var dateNow = new Date();
                        var timeNow = dateNow.getTime();
                        progress[i] = (timeNow - timeStart[i]) * 100 / (timeEnd[i] - timeStart[i]);

                        if (progress[i] > 100) { progress[i] = 100;}
                        var progressBar = progress[i];

						var  disabled = "style='display:none'";

						var style=" background:transparent;border:1px black solid;height:150px;margin-bottom:13px;";
					    var progBarDisplay = "block";
						var timeLeftStr= jQuery.timeago(timestamp_estimateFinish);
						var styleName="background-color:transparent;color:black;margin-left:9px;font-weight:bold;";
					    var blinkName="blinkMe";
  						
  						var opacity = 1-Math.abs(getMinutesBetweenDates(timeNow,timeEnd[i]) / 8)
  						if (opacity < 0.3){opacity=0.3}
  						if ((inProgress == "false")&&(progressBar>98))  {                             // Checks if the job is still in progress and disables the download button.
                           disabled = "";
                           style="opacity:" + opacity + "; background: #e4e4e4;height:152px;margin-bottom:13px;border:1px white solid;";
                           progBarDisplay = "none";
                           styleName= "background-color:transparent;color:black;margin-left:9px;font-weight:bold;";
							blinkName = "";
                        }
 						if (inProgress=="true")
 						{
 							 timeLeftStr = "<b>ETA: </b> in " + timeLeftStr.replace("ago",""); 
 							 }else{
 							 timeLeftStr = "<b>ATA: </b> " + timeLeftStr; 

 						}
					
 
 						htmlString += "<div class='col-md-3 col-sm-5 col-lg-3 list-groupPlugin' onClick='lastSearch=\"" + searchName + "\"; search[" + productId + "]=\"" + searchName + "\"; if(toggleProducts[" + productId + "]== true){toggleProducts[" + productId + "] = !toggleProducts[" + productId + "];} $(\"#myProduct" + productId + "\").click();' style='min-height:90px;padding-top:1px'><div ><div class=\"progress\" style=\"border-radius: 0px; height:2px; margin-bottom:0px;display:" + progBarDisplay + "\" ><div id='jobProgress" + i + "' class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + progressBar + "%;\"><span class=\"sr-only\">30% Complete</span></div></div><div><table style='" + style + ";width:100%;'><tbody><tr><td style='width:70%'><span style='margin-top:0px;padding:1px;" + styleName + "'>" + name + "</span><br><small style='margin:3px;font-size:14px'>" + detailsRespHtml + "</small><br><small  name='" + blinkName + "' style='padding:2px;font-size:11px;margin-left:4px'>" + timeLeftStr + "</small></td><td><h5 style='text-align:right; margin-right:6px;top:0px'>" + type + "</h5></td></tr><tr style='height:40px'><td style='text-align:center' colspan='2'><p style='margin-left:4px'>" + descr + "</p></td></tr><tr><td></td><td><div style='text-align:right'><a style='display:none' role='button' target='_blank' href=\"" + url + "\" class='btn btn-default' style='border-radius:0px;'><span class='glyphicon glyphicon-download-alt' aria-hidden='true'></span>get it</a></div></td></tr></tbody></table></div></div></div>";
                        i += 1;

                    })
                    
                   
                    
                    // no content
                    if (i==0){htmlString += '<p>' + noContent + '</p>';}
                  
                    htmlString += "</div>";
                    document.getElementById("jobsContent").innerHTML = htmlString;

                } else {
                    htmlString += "<div style='margin-left:-16px' class='col-md-12 col-sm-12 col-lg-12' ><h2><span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>on maintenance</h2></div></div>";
                    document.getElementById("jobsContent").innerHTML = htmlString;
                }
                break;

            default:
                //alert("error unknown type " + type);
        }
    });
    }

function getDate (iso8601) {
    var s = $.trim(iso8601);
    s = s.replace(/\.\d+/, ""); // remove milliseconds
    s = s.replace(/-/, "/").replace(/-/, "/");
    s = s.replace(/T/, " ").replace(/Z/, " UTC");
    s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
    s = s.replace(/([\+\-]\d\d)$/, " $100"); // +09 -> +0900
    return new Date(s);
}

function updateProgress() {
    // This function updates the progress bars.
    // The function is called in the header-OFM.php file.

    var dateNow = new Date();
    var timeNow = dateNow.getTime();
    var progress = [];

    // If there are no jobs in the .xml file.
    if (timeEnd.length == 0) { return; }

    // If the jobs plugin hasn't been added
    try {
        var test = document.getElementById("jobProgress1").id;
    }
    catch (err) { return; }

    for (i = 0; i <= timeEnd.length-1; i++) {
        progress[i] = (timeNow - timeStart[i]) * 100 / (timeEnd[i] - timeStart[i]);
        if (progress[i] >= 100) {
            progress[i] = 100;
        }
 

        var progressBar = "width:" + progress[i] + "%";
        document.getElementById("jobProgress" + i).setAttribute("style", progressBar);
    }
}
