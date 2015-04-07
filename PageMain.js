
var PageMain = {

    name: 'main',
    id: 'page-main',
    load: function(doneCallback) {
        
        // do async things here, and then call doneCallback() to display page.
        
        console.log('PageMain.load(): doneCallback()');
        doneCallback('main');
    },
    unload: function() {
        
    },
    navigate: function(value) {
        
    }

};

// register page with Pages tool
Pages.registerHomePage(PageMain);