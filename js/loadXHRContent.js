(function(){
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
    const urlParts = url.split("/");
    const server = urlParts[0] + "//" + urlParts[2]
    // console.log( document.currentScript.src)
    // File
const f = getParameterByName( "f", document.currentScript.src)
// Output Container
const oc = getParameterByName( "oc", document.currentScript.src) || 'output';
// Number of Items to be displayed
const no = getParameterByName( "no", document.currentScript.src) || 10;
// Short: true / false
const s = getParameterByName( "s", document.currentScript.src) || 0;



if(f){
    fetch(server+'/'+f)
    .then(response => response.json())
    .then(jsonData => Object.values(jsonData)) // ES6
    .then(jsonArray => {
        let output = document.getElementById(oc);
        // console.log(no)
        for(let i=0; i<no; i++){
            // console.log(i)
            const item = jsonArray.pop();
            // console.log(item)
            if(item){
                const li = document.createElement('li');
                const h3 = document.createElement('h3');
                const h4 = document.createElement('h4');
//                 const h5 = document.createElement('h5');
    
                h3.innerText = item.title;
                h4.innerText = item.date;
//                 h5.innerText = item.body;
    
                li.appendChild(h3);
                li.appendChild(h4);
//                 li.appendChild(h5);
                // console.log(li)
                output.appendChild(li);
            }

        }

    } )
    // .then( () => console.log(url))
    .catch(err => console.log(err));
}


})()

