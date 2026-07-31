const lessonContent = document.getElementById("lessonContent");
const lessonMenu = document.getElementById("lessonMenu");
const lessonGroupToggle = document.getElementById("lessonGroupToggle");
const jobInterviewLessons = document.getElementById("jobInterviewLessons");
const breadcrumbTitle = document.getElementById("breadcrumbTitle");

const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
const progressText = document.getElementById("progressText");

const themeToggle = document.getElementById("themeToggle");

const menuToggle = document.getElementById("menuToggle");
const closeSidebarButton = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const lessonButtons = [
    ...document.querySelectorAll(".lesson-menu-item")
];

let currentLessonId =
    Number(localStorage.getItem("currentLessonId")) || 1;

let completedLessons = getCompletedLessons();

/**
 * خواندن لیست درس‌های تکمیل‌شده از LocalStorage
 */
function getCompletedLessons() {
    try {
        const storedValue = localStorage.getItem(
            "completedLessons"
        );

        return storedValue
            ? JSON.parse(storedValue)
            : [];
    } catch {
        return [];
    }
}

/**
 * بارگذاری محتوای یک درس از فایل HTML
 */
async function loadLesson(button, updateHistory = true) {
    if (!button) {
        showLoadError("درس موردنظر پیدا نشد.");
        return;
    }

    const lessonId = Number(button.dataset.lessonId);
    const lessonFile = button.dataset.file;
    const lessonTitle = button.dataset.title;

    if (!lessonFile) {
        showLoadError("آدرس فایل درس مشخص نشده است.");
        return;
    }

    showLoading();

    try {
        const response = await fetch(lessonFile, {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        const htmlContent = await response.text();

        lessonContent.innerHTML = htmlContent;

        currentLessonId = lessonId;

        localStorage.setItem(
            "currentLessonId",
            currentLessonId.toString()
        );

        breadcrumbTitle.textContent = lessonTitle;

        setActiveMenuItem(button);
        initializeLessonActions();
        updateProgress();

        if (updateHistory) {
            updatePageUrl(lessonId);
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    } catch (error) {
        console.error("Lesson loading error:", error);

        showLoadError(
            "محتوای درس بارگذاری نشد. مطمئن شوید پروژه را با یک وب‌سرور اجرا کرده‌اید."
        );
    }
}

/**
 * نمایش وضعیت بارگذاری
 */
function showLoading() {
    lessonContent.innerHTML = `
        <div class="loading-state">
            <span class="loading-spinner"></span>
            <p>در حال بارگذاری درس...</p>
        </div>
    `;
}

/**
 * نمایش خطای بارگذاری
 */
function showLoadError(message) {
    lessonContent.innerHTML = `
        <div class="load-error">
            <div class="load-error-icon">!</div>

            <h2>خطا در بارگذاری درس</h2>

            <p>${message}</p>

            <button
                id="retryLessonButton"
                class="retry-button"
                type="button"
            >
                تلاش مجدد
            </button>
        </div>
    `;

    const retryButton = document.getElementById(
        "retryLessonButton"
    );

    retryButton?.addEventListener("click", () => {
        const currentButton = findLessonButton(
            currentLessonId
        );

        loadLesson(currentButton, false);
    });
}

/**
 * فعال‌کردن آیتم انتخاب‌شده در منو
 */
function setActiveMenuItem(activeButton) {
    lessonButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button === activeButton
        );
    });
}

/**
 * رویدادهای داخل فایل روز را فعال می‌کند
 */
function initializeLessonActions() {
    const completeButton = document.getElementById(
        "completeLessonButton"
    );

    if (completeButton) {
        const isCompleted = completedLessons.includes(
            currentLessonId
        );

        updateCompleteButton(
            completeButton,
            isCompleted
        );

        completeButton.addEventListener("click", () => {
            toggleLessonCompletion(currentLessonId);
        });
    }

    const navigationButtons = document.querySelectorAll(
        "[data-navigation-id]"
    );

    navigationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetLessonId = Number(
                button.dataset.navigationId
            );

            const targetButton = findLessonButton(
                targetLessonId
            );

            if (targetButton) {
                loadLesson(targetButton);
            }
        });
    });
}

/**
 * تکمیل یا لغو تکمیل درس
 */
function toggleLessonCompletion(lessonId) {
    const index = completedLessons.indexOf(lessonId);

    if (index === -1) {
        completedLessons.push(lessonId);
    } else {
        completedLessons.splice(index, 1);
    }

    localStorage.setItem(
        "completedLessons",
        JSON.stringify(completedLessons)
    );

    const completeButton = document.getElementById(
        "completeLessonButton"
    );

    if (completeButton) {
        updateCompleteButton(
            completeButton,
            completedLessons.includes(lessonId)
        );
    }

    updateProgress();
}

/**
 * تغییر ظاهر دکمه تکمیل درس
 */
function updateCompleteButton(button, isCompleted) {
    button.classList.toggle("completed", isCompleted);

    if (isCompleted) {
        button.innerHTML = `
            <span>✓</span>
            این درس تکمیل شده است
        `;
    } else {
        button.innerHTML = `
            <span>○</span>
            علامت‌گذاری درس به‌عنوان تکمیل‌شده
        `;
    }
}

/**
 * بروزرسانی درصد پیشرفت
 */
function updateProgress() {
    lessonButtons.forEach((button) => {
        const lessonId = Number(button.dataset.lessonId);

        button.classList.toggle(
            "completed",
            completedLessons.includes(lessonId)
        );
    });

    const totalLessons = lessonButtons.length;

    const validCompletedLessons =
        completedLessons.filter((lessonId) => {
            return findLessonButton(lessonId) !== null;
        });

    const completedCount =
        validCompletedLessons.length;

    const percentage =
        totalLessons === 0
            ? 0
            : Math.round(
                (completedCount / totalLessons) * 100
            );

    progressBar.style.width = `${percentage}%`;

    progressPercent.textContent =
        `${toPersianNumber(percentage)}٪`;

    if (completedCount === 0) {
        progressText.textContent =
            "هنوز هیچ درسی تکمیل نشده است.";

        return;
    }

    if (completedCount === totalLessons) {
        progressText.textContent =
            "تبریک! تمام درس‌های دوره را تکمیل کرده‌ای.";

        return;
    }

    progressText.textContent =
        `${toPersianNumber(completedCount)} درس از ` +
        `${toPersianNumber(totalLessons)} درس تکمیل شده است.`;
}

/**
 * پیدا کردن دکمه یک درس
 */
function findLessonButton(lessonId) {
    return (
        lessonButtons.find((button) => {
            return (
                Number(button.dataset.lessonId) ===
                Number(lessonId)
            );
        }) || null
    );
}

/**
 * قرار دادن شماره درس در URL
 */
function updatePageUrl(lessonId) {
    const url = new URL(window.location.href);

    url.searchParams.set("day", lessonId);

    window.history.pushState(
        { lessonId },
        "",
        url
    );
}

/**
 * گرفتن شماره درس از URL
 */
function getLessonIdFromUrl() {
    const url = new URL(window.location.href);
    const lessonId = Number(url.searchParams.get("day"));

    return Number.isInteger(lessonId)
        ? lessonId
        : null;
}

/**
 * تبدیل اعداد انگلیسی به فارسی
 */
function toPersianNumber(value) {
    const persianDigits = [
        "۰",
        "۱",
        "۲",
        "۳",
        "۴",
        "۵",
        "۶",
        "۷",
        "۸",
        "۹"
    ];

    return value
        .toString()
        .replace(/\d/g, (digit) => {
            return persianDigits[Number(digit)];
        });
}

/**
 * باز کردن منوی موبایل
 */
function openMobileMenu() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}

/**
 * بستن منوی موبایل
 */
function closeMobileMenu() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("show");

    document.body.style.overflow = "";
}

/**
 * تنظیم تم روشن و تاریک
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains(
        "dark-theme"
    );

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );
});

function toggleLessonGroup() {
    const isExpanded =
        lessonGroupToggle.getAttribute("aria-expanded") === "true";

    lessonGroupToggle.setAttribute(
        "aria-expanded",
        String(!isExpanded)
    );
    jobInterviewLessons.hidden = isExpanded;
}

lessonGroupToggle.addEventListener(
    "click",
    toggleLessonGroup
);

lessonMenu.addEventListener("click", (event) => {
    const button = event.target.closest(
        ".lesson-menu-item"
    );

    if (!button) {
        return;
    }

    loadLesson(button);
    closeMobileMenu();
});

menuToggle.addEventListener(
    "click",
    openMobileMenu
);

closeSidebarButton.addEventListener(
    "click",
    closeMobileMenu
);

sidebarOverlay.addEventListener(
    "click",
    closeMobileMenu
);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

window.addEventListener("popstate", (event) => {
    const lessonId =
        event.state?.lessonId ||
        getLessonIdFromUrl() ||
        1;

    const button = findLessonButton(lessonId);

    if (button) {
        loadLesson(button, false);
    }
});

/**
 * راه‌اندازی سایت
 */
function initializeApp() {
    initializeTheme();
    updateProgress();

    const lessonIdFromUrl = getLessonIdFromUrl();

    const initialLessonId =
        lessonIdFromUrl || currentLessonId;

    const initialButton =
        findLessonButton(initialLessonId) ||
        lessonButtons[0];

    loadLesson(initialButton, false);
}

initializeApp();
