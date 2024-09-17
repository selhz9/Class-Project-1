document.addEventListener("DOMContentLoaded", function() {

    const teamName = localStorage.getItem("teamName");
    const avatar = localStorage.getItem("avatar");

 
    if (teamName) {
        document.getElementById("teamNameDisplay").textContent = `${teamName}'s Card`;
    } else {
        document.getElementById("teamNameDisplay").textContent = "Team Name: Not Found";
    }

    const teamAvatar = document.getElementById("teamAvatar");
    if (avatar) {
        teamAvatar.src = avatar;
        teamAvatar.style.display = "block"; 
    } else {
        teamAvatar.style.display = "none"; 
    }
});

const themeSwitcher = document.querySelector('#theme-switcher');
const container = document.querySelector('.container');


let mode = 'dark';


themeSwitcher.addEventListener('click', function () {
  
  if (mode === 'dark') {
    mode = 'light';
    container.setAttribute('class', 'light');
  }
  
  else {
    mode = 'dark';
    container.setAttribute('class', 'dark');
  }
});
