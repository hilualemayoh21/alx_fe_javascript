// Load quotes from local storage or initialize with default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", category: "Motivation" },
  { text: "Do not wait to strike till the iron is hot, but make it hot by striking.", category: "Action" },
  { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" }
];

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // Format with indentation
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  document.body.appendChild(downloadLink); // Append to trigger download
  downloadLink.click();
  document.body.removeChild(downloadLink); // Clean up

  URL.revokeObjectURL(url); // Free up memory
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // Save imported quotes
    displayAllQuotes(); // Update the list
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Display all quotes
function displayAllQuotes() {
  const quoteList = document.getElementById('quoteList');
  quoteList.innerHTML = ''; // Clear the list

  quotes.forEach(quote => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<p>"${quote.text}"<br/><em>- ${quote.category}</em></p>`;
    quoteList.appendChild(listItem);
  });
}

// Display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomQuote = quotes[randomIndex];

  sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote)); // Store in session

  quoteDisplay.innerHTML = `<p>"${randomQuote.text}"<br/><em>- ${randomQuote.category}</em></p>`;
}

// Add a new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // Save to local storage
    displayAllQuotes(); // Update the list

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
  } else {
    alert('Please fill in both fields.');
  }
}

// Initialize event listeners and load data
window.onload = () => {
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteButton').addEventListener('click', addQuote);
  document.getElementById('exportButton').addEventListener('click', exportToJsonFile);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);

  displayAllQuotes(); // Display quotes on load

  const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
  if (lastQuote) {
    document.getElementById('quoteDisplay').innerHTML =
      `<p>"${lastQuote.text}"<br/><em>- ${lastQuote.category}</em></p>`;
  }
};
