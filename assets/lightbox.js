// Custom Lightbox (pairs with lightbox.css)
var modal = document.getElementById("lightbox");
var span = document.getElementsByClassName("close")[0];
// Configuration 
var display = true;
var org = "Github";
var delay = 3500 
// For hiding the lightbox from users who visit more than once per day. 
var test = 100
var fullDay = 86400000
var today = Date.now();
var lastVisit = localStorage.getItem("lastVisit");

// Function to clear local storage variable
function refreshMe(){
  localStorage.removeItem("lastVisit")
  setTimeout(()=>{
    location.reload()
  }, 3000)
}

// Function to show the lightbox as long as it's active
function launchLightbox(){
  if (display == true){
    modal.style.display="none";
    setTimeout(()=> { modal.style.display="block" }, delay);
    console.log(`${org} Custom Lightbox is enabled. `)
  } else {
    modal.style.display="none";
    console.log(`${org} Custom Lightbox is disabled. `)
  } 
}

// Function to get destroy or hid the lightbox
function destroyLightbox(){
	modal.style.display = "none";
}

// When the user clicks the X it closes the modal
span.onclick = () => {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Wait for the document to load
window.onload = (event) => {
// If the user hasn't visited us before, show the light box
  if (lastVisit == null || undefined) {
    localStorage.setItem("lastVisit", Date.now());
    launchLightbox()
    console.log(`${org}: Showing lightbox, new visit (${today}) logged. `);
  } else {
// If the user has visited us before, but its not been more than 24 hours, hide the lightbox
    if(today - lastVisit < test){
      destroyLightbox()
      console.log(`${org}: Not showing lightbox, it's too soon! Last visit was ${new Date(Number(lastVisit)).toLocaleString()}`)
    } else {
// If the user has visited us before, but it's been more than 24 hours, show the lightbox
      localStorage.setItem("lastVisit", Date.now());
      launchLightbox()
      console.log(`${org}: Show lightbox, it's been more than a day. Today: ${new Date(Number(today)).toLocaleString()} / Last Visit: ${new Date(Number(lastVisit)).toLocaleString()}`);
    }
  }
};