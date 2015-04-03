
var PageMain = {

    load: function(doneCallback) {
        
        // do async things here, and then call doneCallback() to display page.
        
        doneCallback();
    },
    unload: function() {
        
    },
    navigate: function(value) {
        
    }

};

// register page with Pages tool
Pages.registerPage('main','page-main', PageMain);