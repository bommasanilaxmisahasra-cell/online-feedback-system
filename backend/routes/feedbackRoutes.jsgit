const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");

// Submit feedback
router.post("/", (req, res) => {
    const { student, subject, rating, comment } = req.body;

    const studentName =
        typeof student === "string" ? student.trim() : "";

    const subjectName =
        typeof subject === "string" ? subject.trim() : "";

    const feedbackComment =
        typeof comment === "string" ? comment.trim() : "";

    const ratingValue = Number(rating);

    if (
        !studentName ||
        !subjectName ||
        !feedbackComment ||
        !Number.isInteger(ratingValue) ||
        ratingValue < 1 ||
        ratingValue > 5
    ) {
        return res.status(400).json({
            message: "Please fill all fields correctly."
        });
    }

    try {
        const newFeedback = {
            id: Date.now(),
            student: studentName,
            subject: subjectName,
            rating: ratingValue,
            comment: feedbackComment,
            date: new Date().toLocaleString()
        };

        Feedback.addFeedback(newFeedback);

        res.status(201).json({
            message: "Feedback submitted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to save feedback."
        });
    }
});

// Get all feedback
router.get("/", (req, res) => {
    try {
        const feedback = Feedback.readFeedback();
        res.json(feedback);
    } catch (error) {
        res.status(500).json({
            message: "Unable to read feedback."
        });
    }
});

module.exports = router;