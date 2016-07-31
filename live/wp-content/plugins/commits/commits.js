function createCommitsList() {
    // This function creates the html-code for the commits plugin.
    // The function is called in the requestPublications() function in the /ofmTemplate.js file.

    $(xmlDoc).find('item').each(function () {
        var type = $(this).attr("type");
        switch (type) {
            case 'latest commits':
                var htmlString = "<div class='row'>";           // Sets the string back because of the reload.
             
				var descr = "";
				var noContent = "";
 				if (languageLocal) {                                        // Sets language
                    descr= $(this).attr("descr_local");  
                    noContent = $(this).attr("noContent_local");    
                } else {
					descr= $(this).attr("descr_english");    
					noContent = $(this).attr("noContent_english");  
                }
             
				htmlString += '<h3>' + descr + '</h3>';

			   var htmlStringModal = "";                       // Sets the string empty because of the reload.
                var i = 0;
                if (onMaintenance == "false") {                 // Maintenance mode of plugin
                    $(this).find('commit').each(function () {
                        var timestamp = $(this).attr("timestamp");
                        var name = $(this).attr("name");
                        var codeType = $(this).attr("codeType");
                        var contributor = $(this).attr("contributor");
                        var commitMsg = $(this).attr("commitMsg");
                        var url = $(this).attr("URL");
                        var alertMsg = $(this).attr("alert");
                        var timestamp = $(this).attr("timestamp");
                        var duration = jQuery.timeago(timestamp);               // Get duration in words.

                        // Without alert message:
                        if (alertMsg == null || alertMsg == "") {
                            htmlString += "<div class='col-md-4 col-sm-5 col-lg-3'><a class='list-group-item'><div style='background-color:#f1f1f1;padding:5px;border:3px solid #e7e7e7'><table style='width:100%;min-height:120px'><tbody><tr height='0px'><td style='width:60%'><div style='margin-left:6px'><small>" + contributor + "</small></div></td><td style='background:transparent; width:40%; text-align:right'><small>" + codeType + "</small></td></tr><tr height='70%'><td style='text-align:center' colspan='2'><span style='margin:4px;font-size:20px'>" + name + "</span></td></tr><tr height='0px'><td> <div style='margin-left:6px'><span><small style='font-size:12px'>" + duration + "</small></span></div></td><td style='text-align:right'><button onClick='ignoreUpdateTimer = true;' data-toggle='modal' data-target='#myModal" + i + "' class='btn btn-default' style='border-radius: 0px;' type='button'>Details</button></td></tr></tbody></table></div></a></div>";
                            htmlStringModal += "<div class='modal' data-backdrop='static' data-keyboard='false' id='myModal" + i + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'><div class='modal-dialog' role='document'><div class='modal-content' style='border-radius: 0px;'><div class='modal-header'><button onClick='ignoreUpdateTimer=false;' type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h3 class='modal-title' id='myModalLabel'>" + name + "</h3></div><div class='modal-body'><h4>Commit Message:</h4><p>" + commitMsg + "</p><h5 style='text-align:left'>" + contributor + "</h5><h5 style='text-align:left'>" + timestamp + "</h5></div><div class='modal-footer'><button href='" + url + "' type='button' class='btn btn-default' data-dismiss='modal' style='border-radius: 0px;' disabled='disabled' title='Work in progress ...'>View</button><button onClick='ignoreUpdateTimer = false;' type='button' class='btn btn-default' data-dismiss='modal' style='border-radius: 0px;'>Close</button></div></div></div></div>";
                            i += 1;

                        // With alert message:
                        } else {
                            var alertMsgShort = alertMsg.substring(0, 20) + "...";
                            htmlString += "<div class='col-md-3 col-sm-6 col-lg-3 list-groupPlugin' style='min-height:300px'><a class='list-group-item'><div><table id='table' style='width:100%; background:#f1f1f1;min-height:140px'><tbody><tr><td style='width:60%'><div style='margin-left:6px'>" + contributor + "</div></td><td style='background:transparent; width:40%; text-align:center '>" + codeType + "</td></tr><tr style='height:40px'><td style='text-align:center' colspan='2'><h4>" + name + "</h4></td></tr><tr><td style='text-align:center' colspan='2'><div style='background:#ffa500'>" + alertMsgShort + "</div></td></tr><tr><td> <div style='margin-left:6px'>" + duration + "</div></td><td style='text-align:right'><button data-toggle='modal' data-target='#myModal" + i + "' class='btn btn-default' style='border-radius: 0px;' type='button' onClick='ignoreUpdateTimer = true;'>Details</button></td></tr></tbody></table></div></a></div>";
                            htmlStringModal += "<div class='modal' data-backdrop='static' data-keyboard='false' id='myModal" + i + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'><div class='modal-dialog' role='document'><div class='modal-content' style='border-radius: 0px;'><div class='modal-header'><button onClick='ignoreUpdateTimer=false;' type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h3 class='modal-title' id='myModalLabel'>" + name + "</h3></div><div class='modal-body'><h4>Commit Message:</h4><p>" + commitMsg + "</p><h4>Alert Message:</h4><p>" + alertMsg + "</p><h5 style='text-align:left'>" + contributor + "</h5><h5 style='text-align:left'>" + timestamp + "</h5></div><div class='modal-footer'><button href='" + url + "' type='button' class='btn btn-default' data-dismiss='modal' style='border-radius: 0px;' disabled='disabled' title='Work in progress ...'>View</button><button onClick='ignoreUpdateTimer = false;' type='button' class='btn btn-default' data-dismiss='modal' style='border-radius: 0px;'>Close</button></div></div></div></div>";
                            i += 1;
                        }
                    })
                    
                    // no content
                    if (i==0){htmlString += '<p>' + noContent + '</p>';}

                    htmlString += "</div>";
                    document.getElementById("commitsContent").innerHTML = htmlString;
                    document.getElementById("commitsContentModal").innerHTML = htmlStringModal;
                                       
                } else {
                    htmlString += "<div style='margin-left:-16px' class='col-md-12 col-sm-12 col-lg-12' ><h2><span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>on maintenance</h2></div></div>";
                    document.getElementById("commitsContent").innerHTML = htmlString;
                }
                break;

            default:
                //alert("error unknown type " + type);
        }
    });
}