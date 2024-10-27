// script.js
const quotes = [
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", category: "Motivation" },
  { text: "Do not wait to strike till the iron is hot, but make it hot by striking.", category: "Action" },
  { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" }
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.querySelector('.quoteDisplay');
  quoteDisplay.innerHTML = `<p>"${quotes[randomIndex].text}"<br/><em>- ${quotes[randomIndex].category}</em></p>`;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value;
  const quoteCategory = document.getElementById('newQuoteCategory').value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}
