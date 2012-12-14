/*global
    require, phantom
*/

var REFRESH_DELAY = 5000;

var page = require('webpage').create(),
    url = 'http://www.reddit.com/r/vimeo/new/',
    first_load = true,
    outer_context = this,
    cache;

/**
 * Replace the content of this method with your own logic
 */
function evaluatePage(first_load, cache) {
    try {
        var page_content = document.body.innerHTML;

        if (first_load) {
            cache = page_content;
            first_load = false;

            return false;
        }

        return page_content !== cache;
    }
    catch(x) {
        console.log(x);
    }
}

function load() {
    page.open(url, function() {
        var test_passed = page.evaluate(evaluatePage, first_load, cache);

        if (test_passed) {
            console.log('pass');
            // phantom.exit();
        }
        else {
            console.log('fail');
            setTimeout(load, REFRESH_DELAY);
        }
    });
}

load();