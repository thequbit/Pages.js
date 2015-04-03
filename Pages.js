
pages = []

var Pages = {
    _pages : [],
    _currentPage : '',
    _homePage : '',
    _loadingPageId : '',
    init : function() {
        var navPage = location.hash.slice(1);
        if ( navPage == '' ) {
            if (Pages._homePage == undefined || Pages._homePage == '' ) {
                navPage = "/" + Pages._pages[0].pageName;
            } else {
                navPage = "/" + Pages._homePage;
            }
        }
        Pages._navigate(navPage);
    },
    registerHomePage : function(pageName, divId, pageDef) {
        console.log("Pages: registerHomePage()");
        Pages._homePage = pageName;
        Pages.registerPage(pageName, divId, pageDef);
    },
    registerPage : function(pageName, divId, pageDef) {
        console.log("Pages: registerPage()");
        Pages._pages.push({
            pageName: pageName,
            divId: divId,
            loadFunction: pageDef.load,
            unloadFunction: pageDef.unload,
            navigate: pageDef.navigate
        });
    },
    registerLoadingPage : function(divId) {
        console.log("Pages: registerLoadingPage()");
        Pages._loadingPageId = divId;
    },
    loadPage : function(pageName) {
        console.log("Pages: loadPage(), pageName = '" + pageName + "'");
        Pages._hidePages();
        Pages._showLoadingPage();
        var page = undefined;
        if ( pageName != undefined && pageName != '' ) {
            page = Pages._getPage(pageName);
        } else {
            page = Pages._getPage(Pages._homePage);
            pageName = Pages._homePage;
        }
        console.log("Pages: loadPage(), page: " + page);
        var camelPageName = page.pageName.charAt(0).toUpperCase() + page.pageName.slice(1);
        $('#' + page.divId).find('.page-header').html('<h4>' + camelPageName + '</h4>');
        if ( page.loadFunction != undefined ) {
            page.loadFunction( function() { Pages._showPage(pageName); } );
        }
    },
    _showPage : function(pageName) {
        console.log("Pages: _showPage()");
        Pages._hideLoadingPage();
        $('#' + Pages._getPage(pageName).divId).show();
        $('#pages-nav-' + Pages._currentPage).removeClass('pages-nav-highlight');
        Pages._currentPage = pageName;
        $('#pages-nav-' + Pages._currentPage).addClass('pages-nav-highlight');
    },
    _showLoadingPage : function() {
        console.log("Pages: _showLoadingPage()");
        $('#' + Pages._loadingPageId).show();
    },
    _hideLoadingPage : function() {
        console.log("Pages: _hideLoadingPage()");
        $('#' + Pages._loadingPageId).hide();
    },
    _hidePages : function() {
        console.log("Pages: _hidePages()");
        for(var i=0; i<Pages._pages.length; i++) {
            $('#' + Pages._pages[i].divId).hide();
        }
    },
    _navigate : function(url) {
        console.log("Pages: _navigate(), url = '" + url + "'");
        var pageName = '';
        var value = undefined;
        if ( url == undefined || url == '' ) {
            pageName = Pages._homePage;
        } else {
            pageName = url.split('/')[1];
            if ( url.split('/').length > 1 ) {
                value = url.split('/').splice(2,url.split('/').length).join('/');
            }
        }
        Pages.loadPage(pageName);
        location.hash = "#" + url;
        console.log("Pages: _navigate(), url: " + url);
        console.log("Pages: _navigate(), pageName: " + pageName);
        if ( Pages._getPage(pageName).navigate != undefined ) {
            Pages._getPage(pageName).navigate(value);
        }
    },
    _getPage : function(pageName) {
        for(var i=0; i<Pages._pages.length; i++) {
            if(Pages._pages[i].pageName == pageName) {
                return Pages._pages[i];
            }
        }
    },
    IsNumeric : function(input)
    {
        return (input - 0) == input && (''+input).trim().length > 0;
    }
};

$(window).on('hashchange', function() {
    console.log('hash changed, new url: ' + location.hash);
    Pages._navigate(location.hash.slice(1));
});

