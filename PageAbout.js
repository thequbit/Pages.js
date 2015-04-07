
var PageAbout = {

    name: 'about',
    id: 'page-about',
    load: function(doneCallback) {
        
        // do async things here, and then call doneCallback() to display page.
        
        doneCallback('about');
    },
    unload: function() {
        
    },
    navigate: function(value) {
        
    }

};

// register page with Pages tool
Pages.registerPage(PageAbout);