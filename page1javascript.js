document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("teamForm");
    const avatarInput = document.getElementById("avatar");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const teamName = document.getElementById("teamName").value;
        const file = avatarInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {

                localStorage.setItem("teamName", teamName);
                localStorage.setItem("avatar", reader.result);
             
                window.location.href = "page2.html";
            };
            reader.readAsDataURL(file);
        } else {
    
            localStorage.setItem("teamName", teamName);
            localStorage.setItem("avatar", "");
            window.location.href = "page2.html";
        }
    });
});
