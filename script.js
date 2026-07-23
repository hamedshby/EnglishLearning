const lessons = [
    {
        id: 1,
        day: "روز اول",
        shortTitle: "معرفی خود در مصاحبه",
        title: "معرفی خود در مصاحبه شغلی",
        description:
            "در این درس، واژگان کاربردی حوزه نرم‌افزار را یاد می‌گیری و تمرین می‌کنی که در ابتدای مصاحبه خودت را به‌شکل حرفه‌ای معرفی کنی.",
        duration: "۳۰ دقیقه",
        level: "مقدماتی",
        category: "Job Interview",

        vocabulary: [
            {
                word: "maintain",
                pronunciation: "/meɪnˈteɪn/",
                meaning: "نگهداری کردن"
            },
            {
                word: "scalable",
                pronunciation: "/ˈskeɪləbl/",
                meaning: "مقیاس‌پذیر"
            },
            {
                word: "reliable",
                pronunciation: "/rɪˈlaɪəbl/",
                meaning: "قابل اعتماد"
            },
            {
                word: "deployment",
                pronunciation: "/dɪˈplɔɪmənt/",
                meaning: "استقرار"
            },
            {
                word: "architecture",
                pronunciation: "/ˈɑːrkɪtektʃər/",
                meaning: "معماری"
            },
            {
                word: "performance",
                pronunciation: "/pərˈfɔːrməns/",
                meaning: "کارایی"
            },
            {
                word: "optimize",
                pronunciation: "/ˈɑːptɪmaɪz/",
                meaning: "بهینه کردن"
            },
            {
                word: "requirement",
                pronunciation: "/rɪˈkwaɪərmənt/",
                meaning: "نیازمندی"
            },
            {
                word: "implement",
                pronunciation: "/ˈɪmplɪment/",
                meaning: "پیاده‌سازی کردن"
            },
            {
                word: "troubleshoot",
                pronunciation: "/ˈtrʌblʃuːt/",
                meaning: "عیب‌یابی کردن"
            }
        ],

        sentences: [
            {
                english: "I am a Senior .NET Backend Developer.",
                persian: "من یک برنامه‌نویس ارشد بک‌اند دات‌نت هستم."
            },
            {
                english: "I have experience building scalable microservices.",
                persian: "در ساخت میکروسرویس‌های مقیاس‌پذیر تجربه دارم."
            },
            {
                english: "I mainly work with ASP.NET Core and SQL Server.",
                persian: "بیشتر با ASP.NET Core و SQL Server کار می‌کنم."
            },
            {
                english: "I enjoy solving backend performance problems.",
                persian: "از حل مشکلات کارایی در بک‌اند لذت می‌برم."
            },
            {
                english: "I have worked on payment systems.",
                persian: "روی سیستم‌های پرداخت کار کرده‌ام."
            },
            {
                english: "I use RabbitMQ for asynchronous communication.",
                persian:
                    "برای ارتباطات غیرهمزمان از RabbitMQ استفاده می‌کنم."
            },
            {
                english:
                    "I'm currently learning Docker and Kubernetes.",
                persian:
                    "در حال یادگیری Docker و Kubernetes هستم."
            }
        ],

        speakingQuestion: "Can you introduce yourself?",

        answerExample: [
            "Hello, my name is Hamed.",
            "I am a Senior .NET Backend Developer.",
            "I have more than seven years of experience in backend development.",
            "I mainly work with ASP.NET Core, SQL Server, RabbitMQ, and Microservices.",
            "Recently, I have been learning Docker, Kubernetes, and GitLab CI/CD.",
            "I am looking for a remote backend position where I can build scalable systems."
        ],

        exerciseQuestion: "Tell me about yourself."
    },

    {
        id: 2,
        day: "روز دوم",
        shortTitle: "توضیح تجربه کاری",
        title: "صحبت درباره تجربه کاری",
        description:
            "در این درس یاد می‌گیری درباره سابقه کاری، پروژه‌ها و مسئولیت‌های خود در مصاحبه‌های شغلی صحبت کنی.",
        duration: "۳۰ دقیقه",
        level: "مقدماتی",
        category: "Work Experience",

        vocabulary: [
            {
                word: "responsibility",
                pronunciation: "/rɪˌspɑːnsəˈbɪləti/",
                meaning: "مسئولیت"
            },
            {
                word: "contribute",
                pronunciation: "/kənˈtrɪbjuːt/",
                meaning: "مشارکت کردن"
            },
            {
                word: "collaborate",
                pronunciation: "/kəˈlæbəreɪt/",
                meaning: "همکاری کردن"
            },
            {
                word: "develop",
                pronunciation: "/dɪˈveləp/",
                meaning: "توسعه دادن"
            },
            {
                word: "design",
                pronunciation: "/dɪˈzaɪn/",
                meaning: "طراحی کردن"
            },
            {
                word: "improve",
                pronunciation: "/ɪmˈpruːv/",
                meaning: "بهبود دادن"
            },
            {
                word: "deliver",
                pronunciation: "/dɪˈlɪvər/",
                meaning: "تحویل دادن"
            },
            {
                word: "project",
                pronunciation: "/ˈprɑːdʒekt/",
                meaning: "پروژه"
            },
            {
                word: "team",
                pronunciation: "/tiːm/",
                meaning: "تیم"
            },
            {
                word: "challenge",
                pronunciation: "/ˈtʃælɪndʒ/",
                meaning: "چالش"
            }
        ],

        sentences: [
            {
                english:
                    "I have more than seven years of experience in software development.",
                persian:
                    "بیش از هفت سال تجربه در توسعه نرم‌افزار دارم."
            },
            {
                english:
                    "My main responsibility was developing backend services.",
                persian:
                    "مسئولیت اصلی من توسعه سرویس‌های بک‌اند بود."
            },
            {
                english:
                    "I worked closely with frontend developers and product managers.",
                persian:
                    "من با توسعه‌دهندگان فرانت‌اند و مدیران محصول همکاری نزدیکی داشتم."
            },
            {
                english:
                    "I contributed to the design of our microservices architecture.",
                persian:
                    "در طراحی معماری میکروسرویس‌های شرکت مشارکت داشتم."
            },
            {
                english:
                    "I helped improve the performance of our APIs.",
                persian:
                    "به بهبود کارایی APIهای شرکت کمک کردم."
            }
        ],

        speakingQuestion:
            "Can you tell me about your work experience?",

        answerExample: [
            "I have more than seven years of experience in backend development.",
            "During my career, I have worked on financial and payment systems.",
            "My main responsibilities included developing APIs, maintaining microservices, and optimizing SQL queries.",
            "I also collaborated with frontend developers, DevOps engineers, and product teams.",
            "One of my main achievements was improving the performance and reliability of payment services."
        ],

        exerciseQuestion:
            "Can you tell me about your work experience?"
    },

    {
        id: 3,
        day: "روز سوم",
        shortTitle: "معرفی پروژه",
        title: "توضیح یک پروژه نرم‌افزاری",
        description:
            "در این درس تمرین می‌کنی یک پروژه واقعی را با ساختاری ساده، قابل فهم و حرفه‌ای برای مصاحبه‌کننده توضیح بدهی.",
        duration: "۳۰ دقیقه",
        level: "مقدماتی",
        category: "Project Description",

        vocabulary: [
            {
                word: "solution",
                pronunciation: "/səˈluːʃn/",
                meaning: "راهکار"
            },
            {
                word: "feature",
                pronunciation: "/ˈfiːtʃər/",
                meaning: "قابلیت"
            },
            {
                word: "integration",
                pronunciation: "/ˌɪntɪˈɡreɪʃn/",
                meaning: "یکپارچه‌سازی"
            },
            {
                word: "process",
                pronunciation: "/ˈprɑːses/",
                meaning: "فرایند"
            },
            {
                word: "transaction",
                pronunciation: "/trænˈzækʃn/",
                meaning: "تراکنش"
            },
            {
                word: "database",
                pronunciation: "/ˈdeɪtəbeɪs/",
                meaning: "پایگاه داده"
            },
            {
                word: "security",
                pronunciation: "/sɪˈkjʊrəti/",
                meaning: "امنیت"
            },
            {
                word: "monitor",
                pronunciation: "/ˈmɑːnɪtər/",
                meaning: "نظارت کردن"
            },
            {
                word: "failure",
                pronunciation: "/ˈfeɪljər/",
                meaning: "خرابی یا شکست"
            },
            {
                word: "availability",
                pronunciation: "/əˌveɪləˈbɪləti/",
                meaning: "دسترس‌پذیری"
            }
        ],

        sentences: [
            {
                english:
                    "I worked on a high-traffic payment system.",
                persian:
                    "من روی یک سیستم پرداخت پرترافیک کار کردم."
            },
            {
                english:
                    "The system was built using ASP.NET Core and SQL Server.",
                persian:
                    "این سیستم با ASP.NET Core و SQL Server ساخته شده بود."
            },
            {
                english:
                    "We used RabbitMQ for asynchronous communication.",
                persian:
                    "برای ارتباطات غیرهمزمان از RabbitMQ استفاده کردیم."
            },
            {
                english:
                    "My role was to develop and maintain backend services.",
                persian:
                    "نقش من توسعه و نگهداری سرویس‌های بک‌اند بود."
            },
            {
                english:
                    "We improved the reliability of financial transactions.",
                persian:
                    "قابلیت اطمینان تراکنش‌های مالی را بهبود دادیم."
            }
        ],

        speakingQuestion:
            "Can you describe one of your recent projects?",

        answerExample: [
            "One of my recent projects was a payment platform.",
            "The system processed a large number of financial transactions.",
            "We used ASP.NET Core, SQL Server, Redis, and RabbitMQ.",
            "My responsibility was developing backend services and improving API performance.",
            "One of the main challenges was maintaining consistency and reliability during high traffic.",
            "We solved this by optimizing database queries and using asynchronous processing."
        ],

        exerciseQuestion:
            "Can you describe one of your recent projects?"
    }
];

const lessonMenu = document.getElementById("lessonMenu");
const lessonContent = document.getElementById("lessonContent");
const breadcrumbTitle = document.getElementById("breadcrumbTitle");

const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
const progressText = document.getElementById("progressText");

const themeToggle = document.getElementById("themeToggle");

const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

let currentLessonId = Number(
    localStorage.getItem("currentLessonId")
) || lessons[0].id;

let completedLessons = JSON.parse(
    localStorage.getItem("completedLessons")
) || [];

function renderLessonMenu() {
    lessonMenu.innerHTML = lessons
        .map((lesson) => {
            const isActive = lesson.id === currentLessonId;
            const isCompleted = completedLessons.includes(lesson.id);

            return `
                <button
                    class="lesson-menu-item
                        ${isActive ? "active" : ""}
                        ${isCompleted ? "completed" : ""}"
                    type="button"
                    data-lesson-id="${lesson.id}"
                >
                    <span class="lesson-number">
                        ${toPersianNumber(lesson.id)}
                    </span>

                    <span class="lesson-menu-content">
                        <strong>${lesson.day}</strong>
                        <small>${lesson.shortTitle}</small>
                    </span>

                    <span class="lesson-status">
                        ✓
                    </span>
                </button>
            `;
        })
        .join("");

    const menuItems = document.querySelectorAll(
        ".lesson-menu-item"
    );

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            const lessonId = Number(item.dataset.lessonId);

            selectLesson(lessonId);
            closeMobileMenu();
        });
    });
}

function renderLesson(lessonId) {
    const lesson = lessons.find(
        (item) => item.id === lessonId
    );

    if (!lesson) {
        return;
    }

    breadcrumbTitle.textContent = lesson.day;

    const isCompleted = completedLessons.includes(lesson.id);

    lessonContent.innerHTML = `
        <section class="lesson-hero">

            <div class="lesson-badge">
                <span>📘</span>
                ${lesson.day}
            </div>

            <h1>${lesson.title}</h1>

            <p class="lesson-hero-description">
                ${lesson.description}
            </p>

            <div class="lesson-meta">

                <div class="meta-item">
                    <span>⏱️</span>
                    ${lesson.duration}
                </div>

                <div class="meta-item">
                    <span>📊</span>
                    سطح ${lesson.level}
                </div>

                <div class="meta-item">
                    <span>💼</span>
                    ${lesson.category}
                </div>

            </div>

        </section>

        <div class="intro-alert">

            <div class="alert-icon">
                💡
            </div>

            <div>
                <strong>
                    روش مطالعه این درس
                </strong>

                <p>
                    کلمات و جملات انگلیسی را چند بار با صدای بلند
                    بخوان. هدف اصلی، صحبت‌کردن روان در محیط کاری
                    است؛ بنابراین فقط متن را مطالعه نکن.
                </p>
            </div>

        </div>

        ${renderVocabularySection(lesson)}

        ${renderSentencesSection(lesson)}

        ${renderSpeakingSection(lesson)}

        ${renderExerciseSection(lesson)}

        <button
            id="completeLessonButton"
            class="complete-lesson-button
                ${isCompleted ? "completed" : ""}"
            type="button"
        >
            <span>
                ${isCompleted ? "✓" : "○"}
            </span>

            ${isCompleted
            ? "این درس تکمیل شده است"
            : "علامت‌گذاری درس به‌عنوان تکمیل‌شده"
        }
        </button>

        ${renderLessonNavigation(lesson)}
    `;

    const completeButton = document.getElementById(
        "completeLessonButton"
    );

    completeButton.addEventListener("click", () => {
        toggleLessonCompletion(lesson.id);
    });

    const navigationButtons = document.querySelectorAll(
        "[data-navigation-id]"
    );

    navigationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetLessonId = Number(
                button.dataset.navigationId
            );

            selectLesson(targetLessonId);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });
}

function renderVocabularySection(lesson) {
    const rows = lesson.vocabulary
        .map(
            (item, index) => `
                <tr>
                    <td>
                        ${toPersianNumber(index + 1)}
                    </td>

                    <td class="english-word">
                        ${item.word}
                    </td>

                    <td class="pronunciation">
                        ${item.pronunciation}
                    </td>

                    <td>
                        ${item.meaning}
                    </td>
                </tr>
            `
        )
        .join("");

    return `
        <section class="lesson-section">

            <div class="section-header">

                <div class="section-number">
                    01
                </div>

                <div class="section-title">
                    <h2>واژگان مصاحبه</h2>
                    <p>۱۰ دقیقه تمرین واژگان تخصصی</p>
                </div>

            </div>

            <p class="section-description">
                هر کلمه را سه بار با صدای بلند بخوان و سپس تلاش کن
                با آن یک جمله مرتبط با تجربه کاری خودت بسازی.
            </p>

            <div class="table-wrapper">

                <table class="vocabulary-table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>کلمه انگلیسی</th>
                            <th>تلفظ</th>
                            <th>معنی</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>

                </table>

            </div>

        </section>
    `;
}

function renderSentencesSection(lesson) {
    const sentences = lesson.sentences
        .map(
            (sentence) => `
                <div class="sentence-card">

                    <p class="sentence-english">
                        ${sentence.english}
                    </p>

                    <p class="sentence-persian">
                        ${sentence.persian}
                    </p>

                </div>
            `
        )
        .join("");

    return `
        <section class="lesson-section">

            <div class="section-header">

                <div class="section-number">
                    02
                </div>

                <div class="section-title">
                    <h2>جملات واقعی مصاحبه</h2>
                    <p>۱۰ دقیقه تمرین جملات کاربردی</p>
                </div>

            </div>

            <p class="section-description">
                جملات زیر را با صدای بلند بخوان. بعد از هر جمله
                تلاش کن بدون نگاه‌کردن به متن، آن را تکرار کنی.
            </p>

            <div class="sentence-list">
                ${sentences}
            </div>

        </section>
    `;
}

function renderSpeakingSection(lesson) {
    const answerLines = lesson.answerExample
        .map(
            (line) => `
                <p>${line}</p>
            `
        )
        .join("");

    return `
        <section class="lesson-section">

            <div class="section-header">

                <div class="section-number">
                    03
                </div>

                <div class="section-title">
                    <h2>تمرین Speaking</h2>
                    <p>۱۰ دقیقه تمرین مکالمه</p>
                </div>

            </div>

            <p class="section-description">
                ابتدا بدون نگاه‌کردن به پاسخ نمونه، به سؤال زیر
                جواب بده. سپس پاسخ خودت را با نمونه مقایسه کن.
            </p>

            <div class="question-box">

                <span class="question-label">
                    Interview Question
                </span>

                <p class="question-text">
                    ${lesson.speakingQuestion}
                </p>

            </div>

            <div class="answer-example">
                ${answerLines}
            </div>

            <div class="tip-box">

                <span>✅</span>

                <div>
                    <strong>نکته مهم</strong>

                    <p>
                        لازم نیست پاسخ نمونه را دقیقاً حفظ کنی.
                        ساختار آن را یاد بگیر و اطلاعات واقعی خودت
                        را جایگزین کن.
                    </p>
                </div>

            </div>

        </section>
    `;
}

function renderExerciseSection(lesson) {
    return `
        <section class="exercise-card">

            <h2 class="exercise-title">
                <span>🎯</span>
                تمرین امروز
            </h2>

            <p class="exercise-description">
                صدای خودت را ضبط کن و فقط به زبان انگلیسی به سؤال
                زیر جواب بده. سپس پاسخ را گوش کن و روی روان‌بودن،
                تلفظ و جمله‌بندی تمرکز کن.
            </p>

            <div class="exercise-question">
                ${lesson.exerciseQuestion}
            </div>

        </section>
    `;
}

function renderLessonNavigation(lesson) {
    const currentIndex = lessons.findIndex(
        (item) => item.id === lesson.id
    );

    const previousLesson = lessons[currentIndex - 1];
    const nextLesson = lessons[currentIndex + 1];

    return `
        <div class="lesson-navigation">

            <button
                class="navigation-button next
                    ${nextLesson ? "" : "disabled"}"
                type="button"
                ${nextLesson
            ? `data-navigation-id="${nextLesson.id}"`
            : ""
        }
            >
                <span>→</span>

                <div>
                    <small>درس بعدی</small>

                    <strong>
                        ${nextLesson
            ? `${nextLesson.day}: ${nextLesson.shortTitle}`
            : "پایان درس‌ها"
        }
                    </strong>
                </div>
            </button>

            <button
                class="navigation-button previous
                    ${previousLesson ? "" : "disabled"}"
                type="button"
                ${previousLesson
            ? `data-navigation-id="${previousLesson.id}"`
            : ""
        }
            >
                <div>
                    <small>درس قبلی</small>

                    <strong>
                        ${previousLesson
            ? `${previousLesson.day}: ${previousLesson.shortTitle}`
            : "این اولین درس است"
        }
                    </strong>
                </div>

                <span>←</span>
            </button>

        </div>
    `;
}

function selectLesson(lessonId) {
    currentLessonId = lessonId;

    localStorage.setItem(
        "currentLessonId",
        currentLessonId.toString()
    );

    renderLessonMenu();
    renderLesson(currentLessonId);
}

function toggleLessonCompletion(lessonId) {
    const lessonIndex = completedLessons.indexOf(lessonId);

    if (lessonIndex === -1) {
        completedLessons.push(lessonId);
    } else {
        completedLessons.splice(lessonIndex, 1);
    }

    localStorage.setItem(
        "completedLessons",
        JSON.stringify(completedLessons)
    );

    renderLessonMenu();
    renderLesson(currentLessonId);
    updateProgress();
}

function updateProgress() {
    const completedCount = completedLessons.length;
    const lessonCount = lessons.length;

    const percentage =
        lessonCount === 0
            ? 0
            : Math.round((completedCount / lessonCount) * 100);

    progressBar.style.width = `${percentage}%`;
    progressPercent.textContent = `${toPersianNumber(
        percentage
    )}%`;

    if (completedCount === 0) {
        progressText.textContent =
            "هنوز هیچ درسی تکمیل نشده است.";
        return;
    }

    if (completedCount === lessonCount) {
        progressText.textContent =
            "تبریک! تمام درس‌های دوره را تکمیل کرده‌ای.";
        return;
    }

    progressText.textContent =
        `${toPersianNumber(completedCount)} درس از ` +
        `${toPersianNumber(lessonCount)} درس تکمیل شده است.`;
}

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
        .replace(/\d/g, (digit) => persianDigits[digit]);
}

function openMobileMenu() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("show");

    document.body.style.overflow = "";
}

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

menuToggle.addEventListener("click", openMobileMenu);
closeSidebar.addEventListener("click", closeMobileMenu);
sidebarOverlay.addEventListener("click", closeMobileMenu);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

function initializeApp() {
    const lessonExists = lessons.some(
        (lesson) => lesson.id === currentLessonId
    );

    if (!lessonExists) {
        currentLessonId = lessons[0].id;
    }

    completedLessons = completedLessons.filter(
        (lessonId) =>
            lessons.some((lesson) => lesson.id === lessonId)
    );

    initializeTheme();
    renderLessonMenu();
    renderLesson(currentLessonId);
    updateProgress();
}

initializeApp();