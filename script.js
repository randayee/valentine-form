// Get references to main sections
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const mainContent = document.getElementById("main-content");
const questionsContent = document.getElementById("questions-content");
const rejectionContent = document.getElementById("rejection-content");
const thankYouContent = document.getElementById("thank-you-content");

// Question-specific references
const mealOtherInput = document.getElementById("meal-other-input");
const giftOtherInput = document.getElementById("gift-other-input");
const submitBtn = document.getElementById("submit-btn");

// "Yes" button shows the questions section
yesBtn.addEventListener("click", () => {
  mainContent.style.display = "none";
  questionsContent.style.display = "block";
});

// "No" button moves away when hovered
noBtn.addEventListener("mouseenter", () => {
  const randomX = Math.floor(Math.random() * 80);
  const randomY = Math.floor(Math.random() * 80);
  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomX}%`;
  noBtn.style.top = `${randomY}%`;
});

// Single-select logic
document.querySelectorAll(".single-select").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    document.querySelectorAll(".single-select").forEach((b) => b.classList.remove("selected"));
    event.target.classList.add("selected");

    // Show or hide the "Other" input
    if (event.target.classList.contains("other-btn")) {
      mealOtherInput.style.display = "block";
    } else {
      mealOtherInput.style.display = "none";
    }
  });
});

// Multi-select logic
document.querySelectorAll(".multi-select").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.target.classList.toggle("selected");

    // Show or hide the "Other" input
    if (event.target.classList.contains("other-btn") && event.target.classList.contains("selected")) {
      giftOtherInput.style.display = "block";
    } else if (event.target.classList.contains("other-btn")) {
      giftOtherInput.style.display = "none";
    }
  });
});

// Submit button logic
submitBtn.addEventListener("click", async () => {
  // Collect responses
  const meal = document.querySelector(".single-select.selected")?.dataset.value || null;
  const mealOtherValue = mealOtherInput.value;

  const gifts = Array.from(document.querySelectorAll(".multi-select.selected")).map((b) => b.dataset.value);
  const giftOtherValue = giftOtherInput.value;

  const generalComments = document.getElementById("general-comments").value;

  // Prepare the response object
  const response = {
    mealPreference: meal === "Other" ? mealOtherValue : meal,
    giftPreferences: gifts.includes("Other") ? [...gifts, giftOtherValue] : gifts,
    generalComments: generalComments,
  };

  console.log("Submitting Response:", response);

  // Google Apps Script Web App URL
  const googleScriptURL = "https://script.google.com/macros/s/AKfycbxFFYAI_Rhvt3B8OWf-qVRoysR54xQhjaREVtAr9hTpCkf7R73bd-CC_Y8jGVgXnG1q3w/exec"; // Replace with your Web App URL

  try {
    // Send data to Google Sheets
    const res = await fetch(googleScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });

    if (res.ok) {
      console.log("Response submitted successfully!");
      // Hide the questions section and show the thank-you message
      questionsContent.style.display = "none";
      thankYouContent.style.display = "block";
    } else {
      console.error("Error submitting response:", res.statusText);
      alert(`There was an error submitting your response: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error submitting response:", error);
    alert("There was an error submitting your response. Please check your connection and try again.");
  }
});
