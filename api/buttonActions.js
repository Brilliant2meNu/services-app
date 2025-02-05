
// buttonActions.js
export function setupButtonActions() {
  document.getElementById("bookNowButton").addEventListener("click", () => {
    window.open("https://book.squareup.com/appointments/n6earhm0fgnmcq/location/LCD7YSX6BMFG1/services?buttonTextColor=ffffff&category_id=MJNRZ4AEDUMOPJ7YUJ2FZIRT&color=000000&locale=en&referrer=so");
  });

  document.getElementById("contactButton").addEventListener("click", () => {
    window.open("https://www.beautybyjingmeiko.com/contact");
  });

  document.getElementById("faqButton").addEventListener("click", () => {
    window.open("https://github.com/Brilliant2meNu/services-app/blob/main/public/FAQ.html");
  });
}
