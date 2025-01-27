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

// Web3Forms hidden form references
const form = document.getElementById("valentine-form");
const mealField = document.getElementById("meal-preference");
const giftsField = document.getElementById("gift-preferences");
const commentsField = document.getElementById("general-comments-field");

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
submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default form submission for custom processing

  // Collect responses
  const meal = document.querySelector(".single-select.selected")?.dataset.value || "None";
  const mealOtherValue = mealOtherInput.value;

  const gifts = Array.from(document.querySelectorAll(".multi-select.selected")).map((b) => b.dataset.value);
  const giftOtherValue = giftOtherInput.value;

  const generalComments = document.getElementById("general-comments").value;

  // Determine final meal and gift preferences
  const finalMeal = meal === "Other" ? mealOtherValue : meal;
  const finalGifts = gifts.includes("Other") ? [...gifts.filter((g) => g !== "Other"), giftOtherValue] : gifts;

  // Populate hidden form fields
  mealField.value = finalMeal;
  giftsField.value = finalGifts.join(", ");
  commentsField.value = generalComments;

  console.log("Submitting Response:", {
    mealPreference: finalMeal,
    giftPreferences: finalGifts,
    generalComments: generalComments,
  });

  // Submit the hidden form
  form.submit();

  // Hide the questions section and show the thank-you message
  questionsContent.style.display = "none";
  thankYouContent.style.display = "block";
});
