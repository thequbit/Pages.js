
var PageHelp = {

    name: 'help',
    id: 'page-help',
    load: function(doneCallback) {
        
        // do async things here, and then call doneCallback() to display page.
        
        doneCallback('help');
        
    },
    unload: function() {
        
    },
    navigate: function(value) {
        
    }

};

// register page with Pages tool
Pages.registerPage(PageHelp);