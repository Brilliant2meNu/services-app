import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, step, userData } = req.body;

  try {
    let responseContent = "";
    const bookingLink =
      "https://book.squareup.com/appointments/n6earhm0fgnmcq/location/LCD7YSX6BMFG1/services?buttonTextColor=ffffff&category_id=MJNRZ4AEDUMOPJ7YUJ2FZIRT&color=000000&locale=en&referrer=so";

    // Auto-initiate greeting if no step is provided
    if (!step) {
      responseContent =
        "Hello! Welcome to our salon assistant. I'm here to help you with your beauty needs. You can respond by tapping the mic button or typing your response. " +
        "Are you an existing client? If so, please log into your account. If not, please provide your first name, last name, and email so we can assist you better.";
    } else {
      switch (step) {
        case "collectInfo":
          if (userData?.firstName && userData?.lastName && userData?.email) {
            responseContent = `Thank you, ${userData.firstName}! Your information has been saved. Can I ask you three quick questions about your skin?`;
          } else {
            responseContent =
              "Please provide your first name, last name, and email for us to assist you better.";
          }
          break;

        case "askSkinQuestions":
          if (userData?.consent === "yes") {
            responseContent =
              "Great! Let's get started. Question 1: How would you describe your skin type (e.g., oily, dry, combination)? Question 2: Do you have any specific skin concerns you'd like to address? Question 3: How often do you currently follow a skincare routine?";
          } else {
            responseContent =
              "No worries! Feel free to explore our services or check out our FAQ for more information.";
          }
          break;

        case "recommend":
          if (userData?.skinResponses) {
            responseContent = `Based on your answers, we recommend:
              - Service A for hydration and rejuvenation.
              - Service B for targeting specific skin concerns.
              Would you like to book a service now?`;
          } else {
            responseContent = "Please answer the questions so we can provide recommendations.";
          }
          break;

        case "bookOrFaq":
          if (text.toLowerCase() === "book") {
            responseContent = `Fantastic! Redirecting you to our booking page: ${bookingLink}`;
          } else if (text.toLowerCase() === "faq") {
            responseContent = "Sure! Here's a placeholder for the FAQ section. More information coming soon.";
          } else {
            responseContent = "Let me know if you'd like to book or check out the FAQ!";
          }
          break;

        default:
          responseContent = "Thank you for using our assistant. We look forward to seeing you at the salon!";
          break;
      }
    }

    // Send response back to the client
    res.status(200).json({ reply: responseContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
}
