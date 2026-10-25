
const fileInput = document.getElementById("file_uploaded");
const uploadBtn = document.getElementById('upload_btn');


uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("please upload MRI image");
        return;
    }
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!validTypes.includes(file.type)) {
        alert("Only JPG, JPEG, PNG allowed");
        return;
    }

    // everything good - show loading screen
    document.getElementById("loading_screen").style.display = "flex";

    // hide the result while loading
    document.getElementById("result_container").style.display = "none";

    try {
        const formData = new FormData();
        formData.append("file", file)

        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        // Hide Loading screen
        document.getElementById("loading_screen").style.display = "none";



    } catch (error) {
        document.getElementById("loading_screen").style.display = "none";
        alert("API Error");
        console.log(error);
    }
})