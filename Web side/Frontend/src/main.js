const fileInput=document.getElementById("file_uploaded");
const uploadBtn=document.getElementById("upload_btn");


uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload MRI image");
        return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!validTypes.includes(file.type)) {
        alert("Only JPG, JPEG, PNG allowed");
        return;
    }

    // SHOW LOADING SCREEN
    document.getElementById("loading_screen").style.display = "flex";

    // HIDE RESULTS WHILE LOADING
    document.getElementById("result_container").style.display = "none";

    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
     
        // HIDE LOADING SCREEN
        document.getElementById("loading_screen").style.display = "none";

        // SHOW RESULT SECTION
        document.getElementById("hello_text").style.display = "none";
        document.getElementById("file_upload").style.display = "none";
        document.getElementById("result_container").style.display = "grid";

        document.getElementById("uploaded_image").src = URL.createObjectURL(file);

        document.getElementById("prediction_status").innerHTML = data.status;
        document.getElementById("tumor_type").innerText = data.class;
        document.getElementById("confidence_score").innerText = data.class_confidence + "%";

        if (data.segmentation_mask) {
            document.getElementById("segmented_image").src = data.segmentation_mask;
        }

    } catch (error) {
        document.getElementById("loading_screen").style.display = "none";
        alert("API Error");
        console.log(error);
    }
});