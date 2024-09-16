
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("teamForm");
    const avatarInput = document.getElementById("avatar");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        
        const teamName = document.getElementById("teamName").value;

        
        const file = avatarInput.files[0];
        let fileReader = new FileReader();
        
        fileReader.onloadend = function () {
            
            localStorage.setItem("teamName", teamName);
            localStorage.setItem("avatar", fileReader.result);
            
            window.location.href = "index2.html";
        };
        
        if (file) {
            fileReader.readAsDataURL(file);
        } else {
            localStorage.setItem("teamName", teamName);
            localStorage.setItem("avatar", "");
            window.location.href = "index2.html";
        }
    });
});
