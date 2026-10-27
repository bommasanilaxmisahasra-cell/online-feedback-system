const loginForm = document.getElementById("loginForm");
const feedbackForm = document.getElementById("feedbackForm");
const refreshButton = document.getElementById("refreshButton");

// Demo login
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("loginName").value.trim();
        const email = document.getElementById("loginEmail").value.trim();
        const message = document.getElementById("loginMessage");

        if (!name || !email) {
            message.textContent = "Please enter your name and email.";
            return;
        }

        localStorage.setItem("studentName", name);
        localStorage.setItem("studentEmail", email);

        window.location.href = "feedback.html";
    });
}

// Submit feedback to the backend
if (feedbackForm) {
    const studentInput = document.getElementById("student");
    const savedName = localStorage.getItem("studentName");

    if (savedName) {
        studentInput.value = savedName;
    }

    feedbackForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const message = document.getElementById("feedbackMessage");

        const feedback = {
            student: studentInput.value.trim(),
            subject: document.getElementById("subject").value.trim(),
            rating: Number(document.getElementById("rating").value),
            comment: document.getElementById("comment").value.trim()
        };

        message.textContent = "Submitting feedback...";

        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(feedback)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Could not submit feedback.");
            }

            message.textContent = result.message;
            feedbackForm.reset();

            if (savedName) {
                studentInput.value = savedName;
            }
        } catch (error) {
            message.textContent =
                error.message || "Unable to connect to the server.";
        }
    });
}

// Load feedback for the dashboard
async function loadFeedback() {
    const list = document.getElementById("feedbackList");

    if (!list) {
        return;
    }

    const message = document.getElementById("dashboardMessage");

    list.replaceChildren();
    message.textContent = "Loading feedback...";

    try {
        const response = await fetch("/api/feedback");

        if (!response.ok) {
            throw new Error("Could not load feedback.");
        }

        const feedback = await response.json();

        document.getElementById("totalFeedback").textContent =
            feedback.length;

        const totalRating = feedback.reduce(function(sum, item) {
            return sum + item.rating;
        }, 0);

        const average = feedback.length
            ? (totalRating / feedback.length).toFixed(1)
            : "0";

        document.getElementById("averageRating").textContent =
            average + " / 5";

        if (feedback.length === 0) {
            message.textContent = "No feedback submitted yet.";
            return;
        }

        message.textContent = "";

        feedback.forEach(function(item) {
            const card = document.createElement("div");
            card.className = "feedback-item";

            const title = document.createElement("h3");
            title.textContent = item.subject;

            const student = document.createElement("p");
            student.textContent = "Student: " + item.student;

            const rating = document.createElement("p");
            rating.textContent = "Rating: " + item.rating + " / 5";

            const comment = document.createElement("p");
            comment.textContent = "Comment: " + item.comment;

            const date = document.createElement("small");
            date.textContent = "Date: " + item.date;

            card.append(title, student, rating, comment, date);
            list.appendChild(card);
        });
    } catch (error) {
        message.textContent =
            "Unable to load feedback. Please check the server.";
    }
}

if (refreshButton) {
    refreshButton.addEventListener("click", loadFeedback);
}

if (document.getElementById("feedbackList")) {
    loadFeedback();
}