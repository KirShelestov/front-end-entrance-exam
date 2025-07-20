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
window.addEventListener("DOMContentLoaded", adjustContactCardMargin);
window.addEventListener("resize", adjustContactCardMargin);
