"use strict";

const pages = [
    {'url': "/data/home.html", 'scripts': ["/js/loadXHRContent.js?f=js/blogData.json&oc=blogPrev&no=3", "/js/loadXHRContent.js?f=js/completedWorksData.json&oc=cwPrev&no=3"] },
    {'url': "/data/completedworks.html", 'scripts': ["/js/loadXHRContent.js?f=js/completedWorksData.json&oc=cwPosts&no=10&s=0"] },
    {'url': "/data/blog.html", 'scripts': ["/js/loadXHRContent.js?f=js/blogData.json&oc=blogPosts&no=10&s=0"] }
] 
//Run Js only when the document has fully loaded
document.addEventListener("DOMContentLoaded", () => {

    //Reference to the DOM element which data is being appended to
    const dom = document.querySelector('#domAccess');

    //Reference all page navegation elements
    const navElements = document.querySelectorAll('[data-url]'); 

    navElements.forEach(e => e.addEventListener('click', e => {
                    //Reference each elements innerText
                    const url = e.srcElement.getAttribute('data-url'); 
                    fetchPage(url);
    }));

    function fetchPage(url){
        fetch(url)
        .then(response => response.text())
        .then(data => dom.innerHTML = data )
        .then( () => history.pushState({ url }, null, url))
        .then( () => { 
            let results = pages.find(obj => obj.url === url); 
            // console.log(results)
            if(results){
                results.scripts.forEach((script)=>{
                    var scriptElement = document.createElement('script');
                    scriptElement.src = script;
                    dom.appendChild(scriptElement);
                })
            }

            
        })
        // .then( () => console.log(url))
        .catch(err => console.log(err));
    }

    // extract a key from querystring
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    const url = window.location.href;
    const page = getParameterByName( "page", url) || null;
    if(page) fetchPage(page); else fetchPage("/data/home.html");

    //Handle back button use with popstate
    window.addEventListener('popstate', function (historyData) {
        fetch(historyData.state.url)
        .then(response => response.text())
        .then(data => dom.innerHTML = data )
        .then( () => { 
            let results = pages.find(obj => obj.url === historyData.state.url); 
            // console.log(results)
            if(results){
                results.scripts.forEach((script)=>{
                    var scriptElement = document.createElement('script');
                    scriptElement.src = script;
                    dom.appendChild(scriptElement);
                })
            }
            
        })
        // .then( () => console.log(url))
        .catch(err => console.log(err));
    });
});
