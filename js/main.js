function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

function updateNoti(notification){
	if(notification !== undefined){
		$('.notifications').html(notification);
	}
}

function updateQuickActions(quickActions){
	if(quickActions !== undefined){

		var navSectionsContent = qsa(".nav-section");
		for(var i=0; i < quickActions.length; i++){
			navSectionsContent[i].innerHTML = "<p>" + quickActions[i].label + "</p>" + navSectionsContent[i].innerHTML;
			navSectionsContent[i].style.background = "url(./img/"+ quickActions[i].icon +".png) left 50% top 75px no-repeat black";
		}

		var menuHintContent = qsa(".menu-hint");
		for(var i=0; i < quickActions.length; i++){
			menuHintContent[i].innerHTML = "<p>" + quickActions[i].actionsLabel + "</p>" + menuHintContent[i].innerHTML;
		}
		var actionLists = qsa(".action-list");
		for(var i=0; i < quickActions.length; i++){
			for(var j=0; j < quickActions[i].actions.length; j++){
				actionLists[i].innerHTML += "<li><a href=\"" + quickActions[i].actions[j].url + "\">" + quickActions[i].actions[j].label + "</a></li>"
			}
		}
	}
}

function updatePageData(data){
	updateNoti(data.notification);
	updateQuickActions(data.quickActions);
}

function manageTabs(tab_id){
	// remove class "active" from current tab
	$('#tabs-list li a').removeClass('active');

	// add class "active" to the selected tab
	 $('#tabs-list a[rel="'+tab_id+'"]').addClass("active");

	 // hide all tabs content
    $('.tabs .tab-content').addClass('hidden');
 
    // Show the selected tab content
    $('.tabs #' +tab_id).removeClass('hidden');
}

// manage tabs when one of them clicked
$('#tabs-list li').click(function(){
	var tab_id = $(this).children('a').attr('rel');
	//  Update the url hash
	window.location.hash = tab_id;
	manageTabs(tab_id);
	return;
});

function gerUrlHash(){
	if (window.location.hash) {
        //  Get the hash from URL
        var url = window.location.hash;
        //  Remove the #
        var currentHash = url.substring(1);
        //  activate tab
        manageTabs(currentHash);
        }
}

function getActiveTabIndex(Tabs){
	for (var i = 0; i < Tabs.length; i++) {
	        if(Tabs[i].getAttribute('class') == 'active'){
	            return i;
	        }
	    }
}

// Support tabs navigation using the keyboard
var keyboardTabNavigation = function (e){
 	var tabs = document.getElementById("tabs-list").getElementsByTagName("a");
    var activeTabIndex = getActiveTabIndex(tabs);
    switch (e.keyCode) {
        case 37:{
                if(activeTabIndex !== 0 ){
                window.location.hash = tabs[parseInt(activeTabIndex) - 1].getAttribute('rel');
                }
            break;
            }
        case 39:{
                if(activeTabIndex !== tabs.length - 1 ){
                window.location.hash = tabs[parseInt(activeTabIndex) + 1].getAttribute('rel');
                }
            break;
            }
        }
}


document.onkeydown = keyboardTabNavigation;

function initPage(){
	UTILS.ajax("data/config.json", {done: updatePageData});
}

$(document).ready(function(){
	gerUrlHash();
	$(window).bind('hashchange', function(e) {
        e.preventDefault();
        gerUrlHash();
    });
});

window.onLoad = initPage();