function adjustContactCardMargin() {
    const education = document.querySelector(".education-section");
    const interests = document.querySelector(".interests-section");
    const contact = document.querySelector(".contact-card");
    if (education && interests && contact) {
        const available =
            education.offsetHeight -
            interests.offsetHeight -
            contact.offsetHeight;
        contact.style.marginTop = available > 0 ? available + "px" : "18px";
    }
}

function syncToolsExperienceHeight() {
    const tools = document.querySelector(".sidebar");
    const experience = document.querySelector(".experience");
    if (tools && experience) {
        tools.style.height = "";
        experience.style.height = "";
        const toolsHeight = tools.offsetHeight;
        const expHeight = experience.offsetHeight;
        const maxHeight = Math.max(toolsHeight, expHeight);
        const diff = Math.abs(toolsHeight - expHeight);

        if (diff > 40) {
            tools.style.height = maxHeight + "px";
            experience.style.height = maxHeight + "px";
        }
    }
}

function syncProfileBlocksHeight() {
    const imgBlock = document.querySelector(".profile-image img");
    const infoBlock = document.querySelector(".profile-info");
    const langBlock = document.querySelector(".languages");
    if (imgBlock && infoBlock && langBlock) {
        imgBlock.style.height = "";
        infoBlock.style.height = "";
        langBlock.style.height = "";
        const imgHeight = imgBlock.offsetHeight;
        const infoHeight = infoBlock.offsetHeight;
        const langHeight = langBlock.offsetHeight;
        const maxHeight = Math.max(imgHeight, infoHeight, langHeight);
        imgBlock.style.height = maxHeight + "px";
        infoBlock.style.height = maxHeight + "px";
        langBlock.style.height = maxHeight + "px";
        const img = imgBlock.querySelector("img");
        if (img) {
            img.style.height = maxHeight - 2 * 32 + "px";
            img.style.width = img.style.height;
            img.style.objectFit = "cover";
        }
    }
}

function syncProfileImageSquare() {
    const imgBlock = document.querySelector(".profile-image img");
    if (imgBlock) {
        const height = imgBlock.offsetHeight;
        imgBlock.style.width = height + "px";
        imgBlock.style.objectFit = "cover";
    }
}

function onResizeOrLoad() {
    adjustContactCardMargin();
    syncToolsExperienceHeight();
    syncProfileBlocksHeight();
    syncProfileImageSquare();
}

window.addEventListener("DOMContentLoaded", onResizeOrLoad);
window.addEventListener("resize", onResizeOrLoad);

document.querySelector(".download-btn").addEventListener("click", function () {
    const element = document.querySelector(".container");
    html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new window.jspdf.jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("resume.pdf");
    });
});
