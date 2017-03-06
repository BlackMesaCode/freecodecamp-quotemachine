import jQuery from "jquery";
window.$ = window.jQuery = jQuery;  // make jQuery globally available
import tether from "tether";
window.Tether = tether;  // make tether globally available

require('bootstrap');

// import bootstrap from "bootstrap"; // ES6 import doesnt work for bootstrap
// bootstrap.$ = bootstrap.jQuery = jQuery;

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './custom.scss';


var restEndpoint = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var currentQuote = "";
var currentAuthor = "";


function getQuote() {
    $.ajax({
        url: restEndpoint,
        cache: false,  // caching needs to be disabled, otherwise we will always receive the same quote
        success: (data) => {
            currentQuote = $(data[0].content).text();
            currentAuthor = data[0].title;
            $("#quote").html(data[0].content + "<p>— " + data[0].title + "</p>")
        }
    });
}

function tweetQuote() {
    window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '"  ' + currentAuthor), '_blank');
}


$(() => {
    getQuote();
    $('#tweet-quote-button').click(tweetQuote);
    $("#new-quote-button").click(getQuote);
});





