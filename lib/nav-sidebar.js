// client side script

const themeChangeBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const navMenu = document.querySelector(".nav-sidebar");
const burgerIcon = document.getElementById("burger-menu");
const closeMenuIcon = document.getElementById("closeMenuIcon");
const currentPath = window.location.pathname; // Get the current path from the URL
const navLinks = document.querySelectorAll('.nav-sidebar a'); // Select all links in the sidebar
const article = document.querySelector('.article-content');


navLinks[0].href = '/'; // Sets the first link in the nav menu to the index page

navLinks.forEach(link => {
  const linkPath = new URL(link.href).pathname;
  // Check if the link path matches the current page path
  if (linkPath === currentPath) {
    link.classList.add('active'); // Add a class to highlight the active link
    if (window.innerWidth > 768)
      link.scrollIntoView({ block: 'center' }); // Only scroll to the active link and center vertically on desktop
  } else {
    link.classList.remove('active'); // Remove the active class from other links
  }
});

// Checks if the site is on the index page
if (currentPath == '/') {
  navLinks[0].classList.add('active'); // Adds an active state to the first link in the nav menu
}

// Checks if the nav sidebar has been scrolled.
if (navMenu.scrollTop > 0) {
  article.style.marginTop = '40px';
}


let themeSwitch = '0'; // 0 - dark, 1 - light
let savedThemeChoice = localStorage.getItem("themeChoice");

// Check if a theme choice has been saved
if (savedThemeChoice !== null) {
  if (savedThemeChoice == '0') {
    themeIcon.name = "sunny";
    document.body.classList.remove("dark-mode");
  }
  else if(savedThemeChoice == '1') {
    themeIcon.name = "moon";
    document.body.classList.add("dark-mode");
  }
}

if (savedThemeChoice == '1') {
  themeSwitch = '1'
}
themeChangeBtn.onclick = (e) => {
  // Toggle theme and update the name attribute of themeIcon
  themeIcon.name = themeIcon.name == "sunny" ? "moon" : "sunny";
  // console.log(themeIcon.name)
 document.body.classList.toggle("dark-mode");
 
  if(themeSwitch == '0') {
    themeSwitch = '1';
  }
  else if(themeSwitch == '1') {
    themeSwitch = '0';
  }

  localStorage.setItem("themeChoice", themeSwitch);
};

// open nav menu
burgerIcon.onclick=()=>{	
  navMenu.classList.add("showMenu");
}

// close nav menu
closeMenuIcon.onclick=()=>{
  navMenu.classList.remove("showMenu");
}