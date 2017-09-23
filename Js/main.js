"use strict";

//Run Js only when the document has fully loaded
document.addEventListener("DOMContentLoaded", () => {

    //Reference to the DOM element which data is being appended to
    const dom = document.querySelector('#domAccess');

    //Reference each file path in reference
    const homeP = "Data/home.html";
    const blogP = "Data/blog.html";
    const cwP = "Data/completedworks.html";
    const npP = "Data/newsandpress.html";
    const linkP = "Data/links.html";
    const aboutP = "Data/about.html";
    const contactP = "Data/contact.html";

    //Reference to json files
    const dataBlog = "Js/blogData.json"
    const dataCW = "Js/completedWorksData.json"

    //Reference all page navegation elements
    const navElements = document.querySelectorAll('nav ul li'); 

    //Function to hold xhr requests
    function XHR (url, callback=null, datatype="html") {

        fetch(url)
        .then(response => {
            if (datatype === "html") return response.text();
            else if (datatype === "json") return response.json();
        })
        .then(data => {

            //If DATATYPE is html append it to the DOM
            if (datatype === "html") dom.innerHTML = data;  

            //Check if CALLBACK is of function type
            if (typeof callback === "function") callback(data);
        })
        .catch(err => console.log(err));
        
        //Reference url called by ajax and generate and appropriate page title
        let a = url;
        a = a.substring('Data/'.length);
        a = a.substring( 0, a.indexOf(".html"));
        a = a.charAt(0).toUpperCase() + a.slice(1);

        history.pushState({url, a}, null, a);
    }

    //Load home page content
    function loadHome () {
        //Make two XHR requests in order to get BLOG and CW data
        XHR(homeP, () => {
            XHR(dataBlog, (data) => {
                const ul = document.querySelector('#blogPrev');
                for (let item in data) {
                    const li = document.createElement('li');
                    const h3 = document.createElement('h3');
                    const h4 = document.createElement('h4');

                    h3.innerText = data[item].title;
                    h4.innerText = data[item].date;

                    li.appendChild(h3);
                    li.appendChild(h4);

                    ul.appendChild(li);
                    // console.log(data[item].title);
                }
            }, 'json');

            XHR(dataCW, (data) => {
                const ul = document.querySelector('#cwPrev');
                for (let item in data) {
                    const li = document.createElement('li');
                    const h3 = document.createElement('h3');
                    const h4 = document.createElement('h4');

                    h3.innerText = data[item].title;
                    h4.innerText = data[item].date;

                    li.appendChild(h3);
                    li.appendChild(h4);

                    ul.appendChild(li);
                    // console.log(data[item].title);
                }
            }, 'json');
        });
    }

    //Load home content as soon as the page loads
    // XHR(homeP);
    loadHome();

    //Logic for navigation elements 
    navElements.forEach(e => e.addEventListener('click', e => {

        //Reference each elements innerText
        const t = e.target.innerText;    
        
        //Switch statement to check text content of each li element
        switch (t) {
            case "Home":
            loadHome(); 
            break;        
            case "Blog":
            XHR(blogP, () => {
                XHR(dataBlog, (data) => {
                    const ul = document.querySelector('#blogPosts');
                    console.log(ul);
                    for (let item in data) {
                        const li = document.createElement('li');
                        const h3 = document.createElement('h3');
                        const h4 = document.createElement('h4');
    
                        h3.innerText = data[item].title;
                        h4.innerText = data[item].date;
    
                        li.appendChild(h3);
                        li.appendChild(h4);
    
                        ul.appendChild(li);
                        // console.log(data[item]);
                    }
                }, 'json');
            });
            break;
            case "Completed Works":
            XHR(cwP, () => {
                XHR(dataCW, (data) => {
                    const ul = document.querySelector('#cwPosts~');
                    console.log(ul);
                    for (let item in data) {
                        const li = document.createElement('li');
                        const h3 = document.createElement('h3');
                        const h4 = document.createElement('h4');
    
                        h3.innerText = data[item].title;
                        h4.innerText = data[item].date;
    
                        li.appendChild(h3);
                        li.appendChild(h4);
    
                        ul.appendChild(li);
                        // console.log(data[item]);
                    }
                }, 'json');
            });
            break;   
            case "News and Press":
            XHR(npP)
            break;
            case "Links":
            XHR(linkP);
            break;
            case "About":
            XHR(aboutP);
            break;
            case "Contact":
            XHR(contactP);
            break;                
        }
    }));

    //Handle back button use with popstate
    window.addEventListener('popstate', e => {

        //Revert to the last visited url

        console.log(e.state);
        console.log(e.state.url);        

        fetch(e.state.url) 
        .then(res => res.text())    
        .then(data => dom.innerHTML = data)
        .catch(err => console.log(err));
    });
});