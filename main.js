//Dynamic Menu with Wordpress REST API & AJAX - DEMO
//Global Variables
var buttonTest = document.getElementById("buttonTest")
var nav = document.getElementById("nav")
var container = document.getElementById("container")

//Query Pages and create a Menu Point for each one with an Even Handler
function createNav() {
    console.log("createNav")
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://blog.thecell.eu/wp-json/wp/v2/pages');
    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var pages = JSON.parse(ourRequest.responseText);
            for (var page in pages) {
                let navPoint = document.createElement("button");
                navPoint.id = pages[page].id;
                navPoint.innerHTML = pages[page].title.rendered;
                nav.appendChild(navPoint);
                navPoint.addEventListener("click", function () {
                    getContent(navPoint.id)
                })
            }
        } else {
            console.log("We connected to the server, but it returned an error.");
        }
    };

    ourRequest.onerror = function () {
        console.log("Connection error");
    };

    ourRequest.send();
}

createNav();

//Load Content according to the selected Menu Point (id is the Worpress id of the page)
function getContent(id) {
    var ourRequest = new XMLHttpRequest();
    var url = 'http://blog.thecell.eu/wp-json/wp/v2/pages/' + id;
    ourRequest.open('GET', url);
    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var data = JSON.parse(ourRequest.responseText);
            var pageHtmlString
            //console.log(data)
            pageHtmlString += '<h2>' + data.title.rendered + '</h2>';
            pageHtmlString += data.content.rendered;
            container.innerHTML = pageHtmlString;
        } else {
            console.log("We connected to the server, but it returned an error.");
        }
    };

    ourRequest.onerror = function () {
        console.log("Connection error");
    };

    ourRequest.send();
}
