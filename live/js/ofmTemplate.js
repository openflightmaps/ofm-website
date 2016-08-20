var urlCommercial = ['not set'];            // If the .xml hasn't been loaded yet.
var urlPictures = ['not set'];              // If the .xml hasn't been loaded yet.
var alphaPictures = [0];
var commercialIteration = 0;                // Counter to avoid skiping commeracial after reloading .xml.
var backgroundIteration = 0;                // Counter to avoid skiping background pictures after reloading .xml.
var ignoreUpdateTimer = false;              // For not closing modal windows after reloading .xml.

// general translations
var login="";
var editProfile="";
var logout="";
var register="";
var areachart="";
var settings="";

function setNavbar() {
    // This function sets the navbar by checking the used widgets (plugins) of each site.
    // This function is called in the header-OFM.php file.
                       
    var scrollOffset = 50;

    var download = document.getElementById('download');
    if (download != null) {
        $('#download_mnu').css('display', 'block');
    }

    var news = document.getElementById('news');
    if (news != null) {
        $('#news_mnu').css('display', 'block');
    }

    var flightplan = document.getElementById('flightplan');
    if (flightplan != null) {
        $('#flightplan_mnu').css('display', 'block');
    }

    $("#download_mnu").click(function () {
        $('html, body').animate({
            scrollTop: $("#download").offset().top - scrollOffset
        }, 500);
    });

    $("#subscribe_mnu").click(function () {
        $('html, body').animate({
            scrollTop: $("#subscribe").offset().top - scrollOffset
        }, 500);
    });

    $("#news_mnu").click(function () {
        $('html, body').animate({
            scrollTop: $("#news").offset().top - scrollOffset
        }, 500);
    });

    $("#flightplan_mnu").click(function () {
        $('html, body').animate({
            scrollTop: $("#flightplan").offset().top - scrollOffset
        }, 500);
    });

    $("#download_link").click(function () {
        $('html, body').animate({
            scrollTop: $("#download").offset().top - scrollOffset
        }, 500);
    });

    $("#commitNumber_mnu").click(function () {
        $('html, body').animate({
            scrollTop: $("#commits").offset().top - scrollOffset
        }, 500);
    });
}

function xml2html() {
    // This function sets values for different objects in the code by reading the .xml file.
    // The function is called in the requestPublications() function in the /ofmTemplate.js file.	

    $(xmlDoc).find('item').each(function () {
        var type = $(this).attr("type")
        switch (type) {
            case 'broadcast':
                onMaintenance = $(this).attr("onMaintenance");
                var htmlString = "";                                        // Sets the string empty because of the reload.
                $(this).find('message').each(function () {
                    var header = $(this).attr("header_english");
                    header = header + ":";
                    header = header.bold();
                    var content = $(this).attr("body_english");

                    htmlString += "<div class='list-group'><a href='#' class='list-group-item'><h4 class='list-group-item-heading'>" + header + "</h4><p class='list-group-item-text'>" + content + "</p></a></div>";
                })
                try {
                    document.getElementById("broadcast").innerHTML = htmlString;
                }
                catch (err) {
                }
                break;

            case 'navbar':
                $("#languageEnglish").text($(this).find('language').attr("shortcut_english"));
                $("#languageLocal").text($(this).find('language').attr("shortcut_local"));

                if (languageLocal) {
                    $("#regionsTitle").text($(this).find("regions").attr("title_local"));
                    $("#pagesTitle").text($(this).find("pages").attr("title_local"));
                    $("#languageLocal").css("font-weight", "bold")
                    $("#languageEnglish").css("font-weight", "normal")

                } else {
                    $("#regionsTitle").text($(this).find("regions").attr("title_english"));
                    $("#pagesTitle").text($(this).find("pages").attr("title_english"));
                    $("#languageLocal").css("font-weight", "normal")
                    $("#languageEnglish").css("font-weight", "bold")

                }

                break;

            case 'latest commits':
            	var glyphIconCommits = " <span class='glyphicon glyphicon-stats' aria-hidden='true'></span> ";
    
                $("#commitNumber_mnu").text($(this).attr("nbrLast24Hrs"));
                try {
                    if (languageLocal) {
                        $("#commitsTitle").html(glyphIconCommits + $(this).attr("title_local"));
                    } else {
                        $("#commitsTitle").html(glyphIconCommits + $(this).attr("title_english"));
                    }
                }
                catch (err) { }
                break;

            case 'properties':
            	var glyphIconNews = " <span class='glyphicon glyphicon-list' aria-hidden='true'></span> ";
            	var glyphIconFlightPlan = " <span class='glyphicon glyphicon-send' aria-hidden='true'></span> ";
    			var glyphIconSubscribe = " <span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> ";
    	



    
                if (languageLocal) {
                    $("#slogan").text($(this).find('slogan').attr("slogan_local"));
                    $("#download_slogan").text($(this).find("download_slogan").attr("slogan_local"));
                    $("#newsTitle").html(glyphIconNews  + $(this).find("news").attr("title_local"));
                    $("#newsDescr").text($(this).find("news").attr("descr_local"));


              	

                    $("#flightplanTitle").html(glyphIconFlightPlan + $(this).find("flightplan").attr("title_local"));
                    $("#flightplanDescr").text($(this).find("flightplan").attr("descr_local"));

                    $("#subscribeTitle").html(glyphIconSubscribe + $(this).find("subscribe").attr("title_local"));
                    $("#newsTitleMnu").text($(this).find("news").attr("title_local"));
                    $("#flightplanTitleMnu").text($(this).find("flightplan").attr("title_local"));
                    
                   	login = $(this).find("general").attr("login_local");
                   	logout = $(this).find("general").attr("logout_local");
				  	editProfile = $(this).find("general").attr("editMyProfile_local");
					register = $(this).find("general").attr("register_local");
					areachart = $(this).find("general").attr("areachart_local");
					settings = $(this).find("general").attr("settings_local");		
						
                } else {
                    $("#slogan").text($(this).find('slogan').attr("slogan_english"));
                    $("#download_slogan").text($(this).find("download_slogan").attr("slogan_english"));
                    $("#newsTitle").html(glyphIconNews  +  $(this).find("news").attr("title_english"));
                    $("#newsDescr").text($(this).find("news").attr("descr_english"));

                    $("#flightplanTitle").html(glyphIconFlightPlan + $(this).find("flightplan").attr("title_english"));
                    $("#flightplanDescr").text($(this).find("flightplan").attr("descr_english"));

                    $("#subscribeTitle").html(glyphIconSubscribe + $(this).find("subscribe").attr("title_english"));
                    $("#newsTitleMnu").text($(this).find("news").attr("title_english"));
                    $("#flightplanTitleMnu").text($(this).find("flightplan").attr("title_english"));
                 
				  	login = $(this).find("general").attr("login_english");
				  	logout = $(this).find("general").attr("logout_english");
				  	editProfile = $(this).find("general").attr("editMyProfile_english");
					register = $(this).find("general").attr("register_english");
					areachart = $(this).find("general").attr("areachart_english");
					settings = $(this).find("general").attr("settings_english");
	                }
                
            	$("#login").text(login);
            	$("#logOut_cmd").text(logout);
				$("#editProfile_cmd").text(editProfile);	

				$("#loginLinkImage").text(login.toUpperCase());	
				$("#registerLinkImage").text(register.toUpperCase());	

				
                break;

            case 'commercials':
                var htmlString = "";
                var i = 0;

                $(this).find('commercial').each(function () {
                    urlCommercial[i] = $(this).attr("url");
                    i += 1;
                })
                break;

            case 'jobs':
            
                var glyphIcon = " <span class='glyphicon glyphicon-tasks' aria-hidden='true'></span> ";
    
    
                try {
                    if (languageLocal) {
                        $("#jobsTitle").html(glyphIcon + $(this).attr("title_local"));
                    } else {
                        $("#jobsTitle").html(glyphIcon + $(this).attr("title_english"));
                    }
                }
                catch (err) {}
                break;

            case 'downloads':
            
            var glyphIcon = " <span class='glyphicon glyphicon-download-alt' aria-hidden='true'></span> ";
            
                try {
                    if (languageLocal) {
                        $("#downloadsTitle").html(glyphIcon + $(this).attr("title_local"));
                        $("#downloadTitleMnu").text($(this).attr("title_local"));
                    } else {
                        $("#downloadsTitle").html(glyphIcon + $(this).attr("title_english"));
                        $("#downloadTitleMnu").text($(this).attr("title_english"));
                    }
                }
                catch (err) { }
                break;

            case 'background pictures':
                var htmlString = "";
                var i = 0;

                $(this).find('picture').each(function () {
                    urlPictures[i] = $(this).attr("url");
                    alphaPictures[i] = $(this).attr("background-alpha");

                    i += 1;
                })
                break;

            default:
                //alert("error unknown type " + type);
        }
    });

    try {
        if (toggleUpdating == true) { createSite(); }
    }
    catch (err) { }

    try {
        createCommitsList();
    }
    catch (err) { }

    try {
        createJobsList();
    }
    catch (err) { }

    // Sets names from the custom fields in wordPress.
    if (languageLocal) {
        $("#regionName").text(regionNameLocal)          // region name next to the logo in navbar
        $("#regionNameXs").text(regionNameLocal)        // region name next to the logo in navbar in css "xs" mode
        $("#regionNameOfm").text(regionNameLocal);      // region name next to the logo in the header 
    } else {
        $("#regionName").text(regionNameEnglish);
        $("#regionNameXs").text(regionNameEnglish);
        $("#regionNameOfm").text(regionNameEnglish);
    }
    
   // make all local/english texts invisible
	var localElements = document.getElementsByName("local");
	for (i = 0; i < localElements.length; i++) { 
	 	if (!languageLocal) {
	 	localElements[i].style.display="none";
		}else{
		localElements[i].style.display="block";
		}
	}
	
	var localElements = document.getElementsByName("english");
	for (i = 0; i < localElements.length; i++) { 
	 	if (languageLocal) {
	 	localElements[i].style.display="none";
	 	}else{
		localElements[i].style.display="block";
		}

 
	}

    
}

function requestPublications() {
    // This funct ion loads the .xml file and savonMaintenancees it as a global variabl named xmlDoc.xml.
    // This function is called in the header-OFM.php file.

    if (ignoreUpdateTimer == true) { return; }
    var currentdate = new Date();

    var today = new Date();

    var lastUpdateLabel = today.toISOString().substring(0, 16);
    $('#lastUpdate').text(lastUpdateLabel);

    xmlUrl += '?time=' + currentdate.getMinutes() + currentdate.getSeconds();
    $.ajax(
    {
        type: "GET",
        url: xmlUrl,
        crossDomain: true,
        dataType: "xml",
        cache: false,
        success: function (result) {
            xmlDoc = result;
            xml2html();
            $("#loader").css("display", "none");
            $("#pageContent").scrollTop(0);
            $("#pageContent").fadeIn(1000);
            $("#footer").css('display', 'block');
            $("#footer2").css('display', 'block');
            backgroundPicture();

        },
        error: function (request, error) {
            console.log(arguments);
            //alert(" Can't do because: " + error);
        },
        async: true
    });
}


function createCommercialString() {
    // This function creats the string for the commercials in the footer.
    // This function is called in the header-OFM.php file.

    var numberCommercials = urlCommercial.length - 1;
    if (urlCommercial[commercialIteration] == 'not set') { return; }

    htmlString = "<img src=\"" + urlCommercial[commercialIteration] + "\" alt=\"favicon\" width=\"180px\" height=\"\" />";
    document.getElementById("commercial").innerHTML = htmlString;
    if (commercialIteration < numberCommercials) {
        commercialIteration += 1;
    } else {
        commercialIteration = 0;
    }
}
var imgLatch = true;
var oldIdx= 0;
function slideShow() {
    // This function sets the pictures for the background in the header.
    // This function is called in the header-OFM.php file.

    var numberPictures = urlPictures.length - 1;
    if (urlPictures[backgroundIteration] == 'not set') { return; }
    
    
    var fadeOut=alphaPictures[oldIdx];
    if (fadeOut < 0.2){fadeOut=0.2} //make elements not completly disappear (buttons)
	$("#opacityBackground").fadeTo(2000,fadeOut);

	setTimeout(function(){

		$("#opacityBackground").css("background-color","rgba(0,0,0," + alphaPictures[oldIdx ] + ")" );
		$("#opacityBackground").fadeTo(2000,1);

		},2000);
			 
	oldIdx = backgroundIteration;
			 
	 if (imgLatch) {
 

        $("#backgroundPicture2").css("background", "url('" +  urlPictures[backgroundIteration] + "')");
        $("#backgroundPicture2").css("background-size", "cover ");
        $("#backgroundPicture2").css("min-width", "100% ");
        $("#backgroundPicture2").css("background-repeat", "no-repeat");
        $("#backgroundPicture2").css("background-position", "50% 50%");
 


           setTimeout(function(){
             $("#backgroundPicture2").fadeIn(2000);
                     
           },2000);
           
      	  
     
       if (backgroundIteration < numberPictures) {
        backgroundIteration += 1;
	    } else {
	        backgroundIteration = 0;
	    }
	     
    } else {
    
    	
        $("#backgroundPicture").css("background", "url('" +  urlPictures[backgroundIteration] + "')");
        $("#backgroundPicture").css("background-size", "cover");
      	$("#backgroundPicture").css("min-width", "100% ");
      	$("#backgroundPicture").css("background-repeat", "no-repeat");
        $("#backgroundPicture").css("background-position", "50% 50%");


        setTimeout(function(){        
        	$("#backgroundPicture2").fadeOut(2000);
        },2000);
        
          if (backgroundIteration < numberPictures) {
		        backgroundIteration += 1;
		    } else {
		        backgroundIteration = 0;
		    }
    }
    
 

    imgLatch = !imgLatch ;
}

var windowWidth;
var windowHeight;
var windowHeightOld=0;
function backgroundPicture() {
    // This function sets the size for the backgroundpicture frame.
    // This function is called in the header-OFM.php file.

    windowWidth = $(window).width();
    windowHeight = $(window).height()-50;
    var picWidth = windowWidth;
    var picHeight = 1 / 2 * windowWidth;
    if (picHeight < windowHeight) {
        picHeight = windowHeight ;
    }
    
      var topDistance = (windowHeight-$("#opacityBackground").height())/ 2;
    
   if (picHeight < 380){topDistance =30;picHeight=380}
    $("#backgroundPicture").css("width", picWidth);
    $("#backgroundPicture2").css("width", picWidth);
    $("#sloganContainer").css("padding-top", topDistance);

    //avoid jumping of size on google chrome android when addressbar appears/hides
    if (Math.abs(windowHeightOld-windowHeight)<100)
    {
     	windowHeight = windowHeightOld;
     	return;
     }else{
       	 
    	windowHeightOld= windowHeight;
 
    }
     
    
  

  
    $("#backgroundPicture").css("height", picHeight);
    $("#backgroundPicture2").css("height", picHeight);

   
}
