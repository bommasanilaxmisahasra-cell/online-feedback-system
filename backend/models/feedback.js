const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "..", "feedback.json");

function readFeedback() {
    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, "[]");
    }

    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function addFeedback(newFeedback) {
    const feedback = readFeedback();

    feedback.push(newFeedback);

    fs.writeFileSync(
        dataFile,
        JSON.stringify(feedback, null, 2)
    );

    return newFeedback;
}

module.exports = {
    readFeedback,
    addFeedback
};