// Description:
// There are three main functions the createSite(), createDownloadBox() and createDownloadList().
// The created html-code from the createSite() function is set via the static ID (#downloadMenu) in the download.php file.
// All needed IDs to set html-code for the download box are included in the html-code.
// The same is true for the needed IDs to insert the actual list of downloads in the download box.

// Reloading of the .xml file:
// If the .xml file is reloaded the whole html-code within the <div> with the ID #downloadContent will be saved before rewriting and reloaded afterwards.
// Only the createSite() function will be executed.

// Changing language:
// The selected products in the different sections are saved in the variables productSelected and sectionSelected so that after changing language the html-code is completely rebuild and all texts have changed.
// Even the search text in the input field will be remembered.


var products = [];              // Array of products
var sectionSelected;            // Remembers the selected section in which the product has been selected.
var productsArray = [];         // Array of the products Array
var productSelected = [];       // Remembers the selected product for rebuilding the page after reloading the .xml file.
var numberShownDownloads = [];
var languageDownloads;          // Calls the createDownloadBox() function if the language has changed.
var toggleProducts = [];        // Remembers if a product has been selected or not.
var search = [];                    
var lastSearch = [];
var downloadContents = [];      // Saves the whole html-code within the <div> with the ID #downloadContent to rewrite the html-code after reloading the .xml file.

// Translations needed globally
var searchForProducts = "";
var noMatches = "";
var moreMatchesAvail = "";

function createSite() {
    // This function creates the html-code for the download plugin.
    // The function is called in the requestPublications() function in the /ofmTemplate.js file.

    $(xmlDoc).find('item').each(function () {
        var type = $(this).attr("type");

        switch (type) {
            case 'downloads':
                var htmlString = "";          // Sets the string empty because of the reload.

                if (languageLocal) {
                    searchForProducts = $(this).attr("searchForProducts_local");
                    noMatches = $(this).attr("noMatches_local");
                    moreMatchesAvail = $(this).attr("moreMatchesAvail_local");
                } else {
                    searchForProducts = $(this).attr("searchForProducts_english");
                    noMatches = $(this).attr("noMatches_english");
                    moreMatchesAvail = $(this).attr("moreMatchesAvail_english");
                }

                if (onMaintenance == "false") {     // Maintenance mode
                    var j = 0;  // Variable for different sections.

                    // Remembering content before reloading page
                    var numberOfSections = 0;
                    $(this).find('section').each(function () {
                        numberOfSections++
                    })
                    for (ii = 0; ii < numberOfSections; ii++) {
                        try {
                            downloadContents[ii] = "";
                            downloadContents[ii] = document.getElementById("downloadContent" + ii).innerHTML;
                        }
                        catch (err) {}
                    }

                    $(this).find('section').each(function () {
                        if (languageLocal) {                                 
                            var header = $(this).attr("header_local");
                            var content = $(this).attr("body_local");
                        } else {
                            var header = $(this).attr("header_english");
                            var content = $(this).attr("body_english");
                        }

                        // Plugin header and content:   // margin-top:35px seperates the section (distance of 50 px) for better readibility
                        htmlString += "<div class='row' style='margin-top:35px'><div class='col-lg-12'><h2 style='font-weight: normal'>" + header + "</h2><p class='lead'>" + content + "</p></div></div>";
                        htmlString += "<div class='row'><div class='col-lg-12'><div class='btn-group' role='group' aria-label='...'>";

                        var i = 0;  // Variable for different products in the sections.
                        var randomArrayDownloads = [];      // Array to build a two dimensional array.
                        var randomArrayToggle = [];         // Array to build a two dimensional array.
                        var testProducts = [];

                        $(this).find('product').each(function () {

                            if (randomArrayDownloads[i] == undefined) {     // For executing just the first time the function is called.
                                randomArrayDownloads[i] = 0;
                                $(this).find('download').each(function () {
                                    randomArrayDownloads[i]++
                                })
                            }
                            numberShownDownloads[j] = randomArrayDownloads;

                            var title = "";

                            if (languageLocal) {                                    
                                title = $(this).attr("title_local");
                            } else {
                                title = $(this).attr("title_english");
                            }

                            if (toggleProducts[j] == undefined) {           // For executing just the first time the function is called.
                                if (randomArrayToggle[i] == undefined) {
                                    randomArrayToggle[i] = false;
                                }
                                toggleProducts[j] = randomArrayToggle;
                            }

                            if (productSelected[sectionSelected] == i && sectionSelected == j) {
                                htmlString += "<button id='myProduct" + j + i + "' type='button' class='btn btn-lg' style='border-radius:0px; border-color:white' onClick='toggleProducts[" + j + "][" + i + "] = !toggleProducts[" + j + "][" + i + "]; createDownloadBox(" + j + "," + i + ",true); $(\"#searchText" + j + i + "\").select();return false;'>" + title + " <span class='badge' id='bag" + j + i + "'>" + numberShownDownloads[j][i] + "</span></</button>";

                            } else if (productSelected[sectionSelected] == undefined) {
                                htmlString += "<button id='myProduct" + j + i + "' type='button' class='btn btn-lg' style='border-radius:0px;' onClick='toggleProducts[" + j + "][" + i + "] = !toggleProducts[" + j + "][" + i + "]; createDownloadBox(" + j + "," + i + ",true); $(\"#searchText" + j + i + "\").select();return false;'>" + title + " <span class='badge' id='bag" + j + i + "'>" + numberShownDownloads[j][i] + "</span></</button>";

                            } else {
                                htmlString += "<button id='myProduct" + j + i + "' type='button' class='btn btn-lg' style='border-radius:0px;' onClick='toggleProducts[" + j + "][" + i + "] = !toggleProducts[" + j + "][" + i + "]; createDownloadBox(" + j + "," + i + ",true); $(\"#searchText" + j + i + "\").select();return false;'>" + title + " <span class='badge' id='bag" + j + i + "'>" + numberShownDownloads[j][i] + "</span></</button>";
                            }

                            testProducts[i] = $(this);
                            i = i + 1;

                        })
                        productsArray[j] = testProducts;
                        htmlString += "</div></div></div><div id='downloadContent" + j + "'></div>";
                        j = j + 1;

                    })
                    document.getElementById("downloadMenu").innerHTML = htmlString;
                    if (languageDownloads == !languageLocal) {  // Changing language
                        for (ll = 0; ll < j; ll++) {
                            createDownloadBox(ll, productSelected[ll]);
                        }

                    } else {    // Relaoding the .xml file
                        for (ii = 0; ii < j; ii++) {
                            document.getElementById("downloadContent" + ii).innerHTML = downloadContents[ii];
                        }
                    }

                } else {    // Maintenance mode
                    htmlString += "<div style='margin-left:-16px' class='col-md-12 col-sm-12 col-lg-12' ><h2><span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>on maintenance</h2></div></div>";
                    document.getElementById("downloadMenu").innerHTML = htmlString;

                }
                break;

            default:
                //alert("error unknown type " + type);
        }
    });
}

function createDownloadBox(j, i, scrollTo) {
    // This function creates the html-code for the box in which the downloads list will be shown.
    // The function is called in the createSite() function.

    var title;
    var description;

    // Saves the selected product in the selected section
    sectionSelected = j;
    productSelected[sectionSelected] = i;

    if (toggleProducts[j][i] == true) {

        for (ii = 0; ii < toggleProducts[j].length; ii++) {
            if (ii !== i) {
                toggleProducts[j][ii] = false;
            }
        }

        $("#myProduct" + j + i).css("border-color", "white")
        for (ii = 0; ii < productsArray[j].length; ii++) {
            if (ii !== i) {
                $("#myProduct" + j + ii).css("border-color", "#dddddd")
            }
        }

        if (languageLocal) {                                    
            title = $(productsArray[j][i]).attr("title_local");
            description = $(productsArray[j][i]).attr("descr_local");
        } else {
            title = $(productsArray[j][i]).attr("title_english");
            description = $(productsArray[j][i]).attr("descr_english");
        }


        var htmlString = "<div style='border-style:solid; border-color:white; border-width: 1px; background-color:white;'><div class='row' style='padding:5px'><div class='col-lg-12'><h3>" + title + "</h3><p>" + description + "</p></div></div><div class='row' style='padding:5px'><div class='col-lg-12' ><div class='input-group pull-right' style='width:100%;max-width:250px'><form onkeyup='createDownloadsList(" + j + "," + i + ");return false;' onsubmit='return false'><input id='searchText" + j + i + "' style='border:1px black solid' autocomplete='off' type='text' class='form-control' placeholder='" + searchForProducts + "' /></form></div></div></div><div class='row' style='margin-left:5px; margin-right:-9px'><div id=downloadList" + j +"></div></div></div></div></div>";
        document.getElementById("downloadContent" + j).innerHTML = htmlString;
        createDownloadsList(j, i);

        //animate
        if (scrollTo == true) { setTimeout(function () { $('html, body').animate({ scrollTop: $('#downloadContent' + j).offset().top - 120 }, 'fast'); }, 100); }

    } else if (toggleProducts[j][i] == false) { 
        document.getElementById("downloadContent" + j).innerHTML = "";

    }

    languageDownloads = languageLocal;
}

function createDownloadsList(jj, i) {
    // This function creates the html-code for the downloads list depending on the search result.
    // The function is called in the button, created by the createDownloadBox() function.

    var k = 0;
    var randomArraySearch = [];     // Array to build a two dimensional array.

    // Saves the selected product in the selected section
    sectionSelected = jj;
    productSelected[sectionSelected] = i;

    if (search[jj] == undefined) {
        search[jj] = randomArraySearch;
        lastSearch[jj] = randomArraySearch;
    }

    var lengthOfTextSearch = 0;
    if (search[jj][i] != undefined) { lenthOfTextSearch = search[jj][i].length; }

    try {
        if (search[jj][i] == undefined | search[jj][i] == "") {
            search[jj][i] = document.getElementById('searchText' + jj + i).value;
            search[jj][i] = search[jj][i].toLowerCase();

        } else if (document.getElementById('searchText' + jj + i).value == "" & search[jj][i] !== "") {

            if (lastSearch[jj][i].length == 1) { $('#searchText' + jj + i).val(""); search[jj][i] = " "; } else { $('#searchText' + jj + i).val(lastSearch[jj][i]); }
        } else {
            search[jj][i] = document.getElementById('searchText' + jj + i).value;
            search[jj][i] = search[jj][i].toLowerCase();
            lastSearch[jj][i] = search[jj][i];
        }

    }
    catch (err) { alert(err.message) }

    var htmlString = "";
    numberShownDownloads[jj][i] = 0;

    // Building the list depending on the search input
    $(productsArray[jj][i]).find('download').each(function () {
        var name = $(this).attr("name");
        var query = $(this).attr("query");
        var downloadId = $(this).attr("id");

        query = query.toLowerCase();

        if (query.indexOf(search[jj][i]) !== -1 | search[jj][i] == "" | search[jj][i] == undefined) {

            var inProgress = $(this).attr("inProgress");
            var timestamp = $(this).attr("timestamp");
            var timeLeftStr = jQuery.timeago(timestamp);               // Get duration in words.

            if (inProgress == "true") {
                timeLeftStr = "<b>ETA: </b> in " + timeLeftStr.replace("ago", "");
            } else {
                timeLeftStr = "<b>ATA: </b> " + timeLeftStr;
            }
            var details = $(this).attr("details_english");
            if (languageLocal) { details = $(this).attr("details_local"); }

            var detailsAbbr;
            var maxLength = 200;
            if (details.length > maxLength) { detailsAbbr = details.substring(0, maxLength) + '...'; } else { detailsAbbr = details; }
            var detailsRespHtml = "<small class='hidden-md hidden-lg hidden-sm' style='font-size:15px'>" + details + "</small><small class='hidden-xs'>" + detailsAbbr + "</small>";

            // if URL in this node available, skip variants
            var urlUnique = $(this).attr("URL");
            var noVariants = (urlUnique != null);

            var filter1 = [];
            var filter2 = [];
            var checkbox = [];
            var url = [];

            var j = 0;
            var keineAhnung = [];

            numberShownDownloads[jj][i]++;

            $(this).find('variant').each(function () {
                if (languageLocal) {                                // Sets language
                    filter1[j] = $(this).attr("filter1_local");
                    filter2[j] = $(this).attr("filter2_local");
                } else {
                    filter1[j] = $(this).attr("filter1_english");
                    filter2[j] = $(this).attr("filter2_english");
                }

                url[j] = $(this).attr("URL");

                j = j + 1;

            })

            var windowWidth = $(window).width();

            if (filter2[0] == undefined && filter2[1] == undefined) { // only one filter
                if (windowWidth <= 700) {       // Default mobil
                    checkbox[0] = filter1[1];
                    checkbox[2] = filter1[0];
                    keineAhnung[1] = 0;
                    keineAhnung[3] = 1;
                } else {
                    checkbox[0] = filter1[0];
                    checkbox[2] = filter1[1];
                    keineAhnung[1] = 1;
                    keineAhnung[3] = 0;
                };
            } else { // two filters
                if (windowWidth <= 700) {       // Default mobil
                    checkbox[0] = filter1[1];
                    checkbox[1] = filter2[1];
                    keineAhnung[3] = 1;

                    for (kk = 0; kk < 4; kk++) {
                        if (kk !== 1) {
                            if (filter1[1] !== filter1[kk] & filter2[1] == filter2[kk]) {
                                checkbox[2] = filter1[kk];
                                keineAhnung[0] = kk;
                            } else if (filter2[1] !== filter2[kk] & filter1[1] == filter1[kk]) {
                                checkbox[3] = filter2[kk];
                                keineAhnung[1] = kk;
                            } else {
                                keineAhnung[2] = kk;
                            }
                        }
                    }

                } else {                        // Default
                    checkbox[0] = filter1[0];
                    checkbox[1] = filter2[0];
                    keineAhnung[3] = 0;

                    for (kk = 1; kk < 4; kk++) {
                        if (filter1[0] !== filter1[kk] & filter2[0] == filter2[kk]) {
                            checkbox[2] = filter1[kk];
                            keineAhnung[0] = kk;
                        } else if (filter2[0] !== filter2[kk] & filter1[0] == filter1[kk]) {
                            checkbox[3] = filter2[kk];
                            keineAhnung[1] = kk;
                        } else {
                            keineAhnung[2] = kk;
                        }
                    }
                }
            }


            if (k < 12) { // Shown boxes

                if (noVariants == true) { // no filters
                    htmlString += "<div class='col-md-4 col-sm-6 col-lg-3 list-groupPlugin' style='cursor:default;min-height:90px;padding-bottom:5px;padding-top:5px;'><div><div><table style='width:100%; background:#f1f1f1;' ><tbody><tr><td style='width:50%' colspan='2'><div style='margin-left:6px'><span style='margin-top:0px;padding:1px'>" + name + "</span><small style='margin:3px;font-size:14px'>" + detailsRespHtml + "</small></div><hr style='margin:0;padding:0;border-color:white'></td></tr><tr><td colspan='2'><small style='padding:2px;font-size:11px;margin-left:4px'>" + timeLeftStr + "</small></td></tr><tr><td style='text-align:left' colspan='2'><tr><td style='text-align:right;' colspan='2'><button id='url" + jj + i + k + "'  onClick='window.open(\"" + urlUnique + "\")' class='btn btn-info btn-sm ofm-blue' style='border-radius:0px;margin-bottom:3px;margin-right:3px;max-width:150px;' type='button' href='#'>Download</button></td></tr></tbody></table></div></div></div>";
                } else if (filter2[0] != undefined && filter2[1] != undefined) { // two filters
                    htmlString += "<div class='col-md-4 col-sm-6 col-lg-3 list-groupPlugin' style='cursor:default;min-height:90px;padding-bottom:5px;padding-top:5px;'><div><div><table style='width:100%; background:#f1f1f1;' ><tbody><tr><td style='width:50%' colspan='2'><div style='margin-left:6px'><span style='margin-top:0px;padding:1px'>" + name + "</span><small style='margin:3px;font-size:14px'>" + detailsRespHtml + "</small></div><hr style='margin:0;padding:0;border-color:white'></td></tr><tr><td colspan='2'><small style='padding:2px;font-size:11px;margin-left:4px'>" + timeLeftStr + "</small></td></tr><tr><td style='text-align:left' colspan='2'><button id='settings_cmd" + jj + i + k + "' class='btn btn-sm' style='border:0px;border-radius:0px; background:#f1f1f1;width:auto; text-align:left;margin-bottom:0px;margin-left:3px;' type='button' onClick=' $(\"#settings_cmd" + jj + i + k + "\").css(\"background-color\",\"white\"); document.getElementById(\"checkboxRow1" + jj + i + k + "\").style.display = \"block\"; document.getElementById(\"checkboxRow2" + jj + i + k + "\").style.display = \"block\"';>" + settings + "</button></td></tr><tr id='checkboxRow1" + jj + i + k + "' style='display:none;background-color:white;border-left: 3px #f1f1f1 solid;border-right: 3px #f1f1f1 solid'><td width='50%'><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio1" + jj + i + k + "' id='optradio0" + jj + i + k + "' checked><small style='font-size:11px'>" + checkbox[0] + "</small></input></label></div></td><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio1" + jj + i + k + "' id='optradio2" + jj + i + k + "'><small style='font-size:11px'>" + checkbox[2] + "</small></input></label></div></td></tr><tr id='checkboxRow2" + jj + i + k + "' style='display:none;background-color:white;border-bottom: 3px #f1f1f1 solid;border-left: 3px #f1f1f1 solid;border-right: 3px #f1f1f1 solid;margin-bottom:0px'><td width='50%'><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio2" + jj + i + k + "' id='optradio1" + jj + i + k + "' checked><small style='font-size:11px'>" + checkbox[1] + "</small></input></label></div></td><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio2" + jj + i + k + "' id='optradio3" + jj + i + k + "'><small style='font-size:11px'>" + checkbox[3] + "</small></input></label></div></td></tr><tr><td style='text-align:right;' colspan='2'><button id='url" + jj + i + k + "' onClick='if (document.getElementById(\"optradio0" + jj + i + k + "\").checked) { if (document.getElementById(\"optradio1" + jj + i + k + "\").checked) { window.open(\"" + url[keineAhnung[3]] + "\"); } else { window.open(\"" + url[keineAhnung[1]] + "\"); } } else { if (document.getElementById(\"optradio1" + jj + i + k + "\").checked) { window.open(\"" + url[keineAhnung[0]] + "\"); } else { window.open(\"" + url[keineAhnung[2]] + "\"); } }' class='btn btn-info btn-sm ofm-blue' style='border-radius:0px;margin-bottom:3px;margin-right:3px;max-width:150px;' type='button' href='#'>Download</button></td></tr></tbody></table></div></div></div>";
                } else { // one filter
                    htmlString += "<div class='col-md-4 col-sm-6 col-lg-3 list-groupPlugin' style='cursor:default;min-height:90px;padding-bottom:5px;padding-top:5px;'><div><div><table style='width:100%; background:#f1f1f1;'><tbody><tr><td style='width:50%' colspan='2'><div style='margin-left:6px'><span style='margin-top:0px;padding:1px'>" + name + "</span><small style='margin:3px;font-size:14px'>" + detailsRespHtml + "</small></div><hr style='margin:0;padding:0;border-color:white'></td></tr><tr><td colspan='2'><small style='padding:2px;font-size:11px;margin-left:4px'>" + timeLeftStr + "</small></td></tr><tr><td style='text-align:left' colspan='2'><button id='settings_cmd" + jj + i + k + "' class='btn btn-sm' style='border:0px;border-radius:0px; background:#f1f1f1;width:auto; text-align:left;margin-bottom:0px;margin-left:3px;' type='button' onClick='$(\"#settings_cmd" + jj + i + k + "\" ).css(\"background-color\",\"white\"); document.getElementById(\"checkboxRow1" + jj + i + k + "\" ).style.display=\"block\";'> " + settings + "</button></td></tr><tr id='checkboxRow1" + jj + i + k + "' style='display:none;background-color:white;border-left: 3px #f1f1f1 solid;border-right: 3px #f1f1f1 solid'><td width='50%'><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio1" + jj + i + k + "' id='optradio0" + jj + i + k + "' checked><small style='font-size:11px'>" + checkbox[0] + "</small></input></label></div></td><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio1" + jj + i + k + "' id='optradio2" + jj + i + k + "'><small style='font-size:11px'>" + checkbox[2] + "</small></input></label></div></td></tr><tr><td style='text-align:right;' colspan='2'><button id='url" + jj + i + k + "' onClick='if (document.getElementById(\"optradio0" + jj + i + k + "\").checked) { window.open(\"" + url[keineAhnung[3]] + "\"); } else { window.open(\"" + url[keineAhnung[1]] + "\"); }' class='btn btn-info btn-sm ofm-blue' style='border-radius:0px;margin-bottom:3px;margin-right:3px;max-width:150px;' type='button' href='#'>Download</button></td></tr></tbody></table></div></div></div>";
                }
            } else if (k == 12) {
                htmlString += "<div class='col-md-12 col-sm-12 col-lg-12 list-groupPlugin'><a class='list-group-item' style='border-style:none'><div><h4>" + moreMatchesAvail + "</h4></div></a></div>";
                htmlString += "<div style='display:none' class='col-md-3 col-sm-6 col-lg-3 list-groupPlugin'><a class='list-group-item'><div><table style='width:100%; background:#f1f1f1; ><tbody><tr><td style='width:50%' colspan='2'><div style='margin-left:6px'><span style='margin-top:0px;padding:1px'>" + name + "</span><small style='margin:3px;font-size:14px'>" + timeLeftStr + "</small></div></td></tr><tr><td colspan='2'><small style='text-align:left; margin-left:6px'>" + timeLeftStr + "</small></td></tr><tr><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio1" + jj + i + k + "' id='optradio0" + jj + i + k + "' checked><small style='font-size:13px'>" + checkbox[0] + "</small></input></label></div></td><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio1" + jj + i + k + "' id='optradio2" + jj + i + k + "'><small style='font-size:13px'>" + checkbox[2] + "</small></input></label></div></td></tr><tr><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio2" + jj + i + k + "' id='optradio1" + jj + i + k + "' checked><small style='font-size:13px'>" + checkbox[1] + "</small></input></label></div></td><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio2" + jj + i + k + "' id='optradio3" + jj + i + k + "'><small style='font-size:13px'>" + checkbox[3] + "</small></input></label></div></td></tr><tr><td style='text-align:center' colspan='2'><button id='url" + jj + i + k + "' onClick='if (document.getElementById(\"optradio0" + jj + i + k + "\").checked) { if (document.getElementById(\"optradio1" + jj + i + k + "\").checked) { window.open(\"" + url[keineAhnung[3]] + "\"); } else { window.open(\"" + url[keineAhnung[1]] + "\"); } } else { if (document.getElementById(\"optradio1" + jj + i + k + "\").checked) { window.open(\"" + url[keineAhnung[0]] + "\"); } else { window.open(\"" + url[keineAhnung[2]] + "\"); } }' class='btn btn-info btn-lg ofm-blue' style='border-radius:0px; width:100%' type='button' href='#'>Download</button></td></tr></tbody></table></div></a></div>";

            } else {

            }
            //<tr id='checkboxRow1" + i + k + "' style='display:none'><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio1" + i + k + "' id='optradio0" + i + k + "' checked><small style='font-size:13px'>" + checkbox[0] + "</small></input></label></div></td><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio1" + i + k + "' id='optradio2" + i + k + "'><small style='font-size:13px'>" + checkbox[2] + "</small></input></label></div></td></tr><tr id='checkboxRow2" + i + k + "' style='display:none'><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio2" + i + k + "' id='optradio1" + i + k + "' checked><small style='font-size:13px'>" + checkbox[1] + "</small></input></label></div></td><td><div class='radio' style='margin-left:6px'><label><input type='radio' name='optradio2" + i + k + "' id='optradio3" + i + k + "'><small style='font-size:13px'>" + checkbox[3] + "</small></input></label></div></td></tr>

            //document.getElementById(\"checkboxRow1" + i + k + "\").style.display = 'none'; document.getElementById(\"checkboxRow2" + i + k + "\").style.display = 'none';
            k = k + 1;

        }

        if (noVariants == true) {
            //alert("hello");
            //htmlString += "<button onClick='window.open(\"" + urlUnique + "\");' class='btn btn-info btn-lg ofm-blue' style='border-radius:0px; width:100%' type='button' href='#'>Download</button>";
        }

    })



    //no matches
    if (k == 0) { htmlString += "<h4><small>" + noMatches + "</small>  " + search[jj][i] + "</h4>"; }

    document.getElementById("downloadList" + jj).innerHTML = htmlString;
    document.getElementById("bag" + jj + i).innerHTML = numberShownDownloads[jj][i];

}
