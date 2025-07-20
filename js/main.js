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
        tools.style.minHeight = "";
        experience.style.minHeight = "";
        const maxHeight = Math.max(tools.offsetHeight, experience.offsetHeight);
        tools.style.minHeight = maxHeight + "px";
        experience.style.minHeight = maxHeight + "px";
    }
}

function onResizeOrLoad() {
    adjustContactCardMargin();
    syncToolsExperienceHeight();
}

window.addEventListener("DOMContentLoaded", onResizeOrLoad);
window.addEventListener("resize", onResizeOrLoad);
