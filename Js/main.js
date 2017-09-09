"use strict";
$(pageReady);

function pageReady () {

    const dom = $('#domAccess');

    const homeP = "Data/home.html";
    const blogP = "Data/blog.html";
    const cwP = "Data/completedworks.html";
    const npP = "Data/newsandpress.html";
    const linkP = "Data/links.html";
    const aboutP = "Data/about.html";
    const contactP = "Data/contact.html";

    const dataJSON = "js/data.json";

    //Store all page navegation elements
    const navElements = $('nav ul li'); 

    //Base function to hold ajax requests
    function ajaxR (url, type="get") {
        $.ajax({
            url,
            type,
            catch : true,
            success : (data) => {
                // console.log(data);
                dom.html(data);
            },
            error : ( jqXHR, textStatus, errorThrown ) => {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }
    
    //Load home content as soon as the page loads
    ajaxR(homeP);  
    
    //Logic for navigation elements
    navElements.on('click', (e) => {

        //Store each elements innerText
        const t = e.target.innerText;

        if (t === "Home") {
            // console.log('Home');
            ajaxR(homeP); 

        } else if (t === "Blog") {
            // console.log('Blog');    
            ajaxR(blogP);            

        } else if (t === "Completed Works") {
            // console.log('Completed Works');
            ajaxR(cwP);
            
        } else if (t === "News and Press") {
            console.log('News and Press');
            ajaxR(npP);
            
        } else if (t === "Links") {
            // console.log('Links');
            ajaxR(linkP);            
            
        } else if (t === "About") {
            // console.log('About');
            ajaxR(aboutP);
            
        } else if (t === "Contact") {
            console.log('Contact');
            ajaxR(contactP);
        }        
    });
}