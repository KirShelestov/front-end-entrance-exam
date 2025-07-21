/* jshint esversion: 6 */
function getUniqueKey(el, idx) {
    const parent = el.parentElement ? el.parentElement.className : "";
    return `${el.tagName}-${el.className}-${parent}-${idx}`;
}

function setupEditable(el, idx) {
    if (el.classList.contains("most-recent")) return;

    el.addEventListener("dblclick", function () {
        if (el.querySelector("input")) return;
        const key = el.dataset.key || getUniqueKey(el, idx);
        const value = el.textContent.trim();
        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.className = "editable-input";
        input.style.width = "100%";
        el.textContent = "";
        el.appendChild(input);
        input.focus();

        function save() {
            el.textContent = input.value;
            localStorage.setItem("editable-" + key, input.value);
            el.classList.add("wave-apply");
            setTimeout(() => {
                el.classList.remove("wave-apply");
            }, 900);
        }

        input.addEventListener("blur", save);
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") input.blur();
        });
    });
}

function makeEditable() {
    const selectors = [
        ".contact-card p",
        ".contact-card span",
        ".exp-header span",
        ".exp-title",
        ".exp-card li",
        ".interest-tags span",
        ".edu-year",
        ".edu-title",
        ".edu-tags",
        ".edu-school",
        ".lang-bar span",
        ".profile-info h1",
        ".profile-info span",
        ".profile-info p",
        ".editable-part",
        ".exp-meta",
    ];
    selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el, idx) => {
            if (sel === ".contact-card span" && el.textContent.includes("|"))
                return;
            if (
                sel === ".exp-meta" &&
                el.innerHTML.includes("&nbsp; | &nbsp;")
            ) {
                const parts = el.innerHTML.split("&nbsp; | &nbsp;");
                if (parts.length === 2) {
                    el.innerHTML = `
                        <span class="editable-part" data-key="expmeta-${idx}-left">${parts[0].trim()}</span>
                        &nbsp; | &nbsp;
                        <span class="editable-part" data-key="expmeta-${idx}-right">${parts[1].trim()}</span>
                    `;
                }
            } else {
                setupEditable(el, idx);
            }
        });
    });

    document
        .querySelectorAll(".editable-part")
        .forEach((el, idx) => setupEditable(el, idx));
}

function restoreEditable() {
    const selectors = [
        ".contact-card p",
        ".contact-card span",
        ".exp-header span",
        ".exp-title",
        ".exp-card li",
        ".interest-tags span",
        ".edu-year",
        ".edu-title",
        ".edu-tags",
        ".edu-school",
        ".lang-bar span",
        ".profile-info h1",
        ".profile-info span",
        ".profile-info p",
        ".editable-part",
        ".exp-meta",
    ];
    selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el, idx) => {
            if (sel === ".contact-card span" && el.textContent.includes("|"))
                return;
            const key = el.dataset.key || getUniqueKey(el, idx);
            const saved = localStorage.getItem("editable-" + key);
            if (saved) el.textContent = saved;
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    makeEditable();
    restoreEditable();
});

document.addEventListener("click", function (e) {
    const target = e.target.closest(".ripple-zone");
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const size = Math.max(target.offsetWidth, target.offsetHeight);
    const ripple = document.createElement("span");
    ripple.className = "material-ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    target.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
        ripple.remove();
    });
});
