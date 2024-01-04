let nameInput= document.getElementById("siteName");
let urlInput=document.getElementById("siteURL");
let site={};
let sites=[];
let rows;
let nameRegex=/^\w{3,}$/i;
var urlRegex=/^(https:|http:)(|www\.)\S*/;
getSites();
function addSite(){
    site={
        sName : nameInput.value ,
        sUrl : urlInput.value
    }
    if (validate() == true){
        sites.push(site);
        localStorage.setItem("webSites", JSON.stringify(sites));
    }else{
        document.getElementById("submitBtn").setAttribute("data-bs-target","#exampleModal");
    }
    displaySites();
    clearInputs();
}
function getSites(){
    if(localStorage.getItem("webSites") != null){
        sites=JSON.parse(localStorage.getItem("webSites"));
        displaySites();
    }
}
function displaySites(){
    rows="";
    for (let i = 0; i < sites.length; i++) {
        rows += `<tr> <td>${i+1}</td>
        <td>${sites[i].sName}</td>
        <td><a href="${sites[i].sUrl}" target="_blank" class="btn visitBtn"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr> `
    }
    document.getElementById("tbody").innerHTML = rows;
}
function clearInputs(){
    nameInput.value="";
    urlInput.value="";
}
function deleteSite(index){
    sites.splice(index,1);
    localStorage.setItem("webSites", JSON.stringify(sites));
    displaySites();
}
function validateName(){
    if(nameRegex.test(nameInput.value)){
        return true;
    }
}
function validateUrl(){
    if(urlRegex.test(urlInput.value)){
        return true;
    }
}
function validate(){
    if(validateName() == true && validateUrl() == true){
        return true;
    }
}
