// read url
const url = window.location.href;
// red parts
const urlParts = url.split("/");
const server = urlParts[0] + "//" + urlParts[2]
// console.log(urlParts)
// take the path after the server (page name)
page = '';
for (pathIndex in urlParts){
    if(pathIndex > 2) { page += '/'; page += urlParts[pathIndex]; }
}
// console.log(page)
window.location = server + '/?page='+ page ;
