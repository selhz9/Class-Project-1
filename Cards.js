document.addEventListener("DOMContentLoaded", function() {

    const teamName = localStorage.getItem("teamName");
    const avatar = localStorage.getItem("avatar");

 
    if (teamName) {
        document.getElementById("teamNameDisplay").textContent = ${teamName}'s Card;
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
