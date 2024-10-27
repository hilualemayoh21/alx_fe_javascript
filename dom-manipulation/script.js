// Array of quotes with 'text' and 'category' properties.
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", category: "Motivation" },
  { text: "Do not wait to strike till the iron is hot, but make it hot by striking.", category: "Action" },
  { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" }
];
      
      function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}
// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.querySelector('.quoteDisplay');
  const randomQuote = quotes[randomIndex];

  // Store the last viewed quote in session storage
  sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
  // Check if quoteDisplay exists in the DOM.
  
  if (quoteDisplay) {
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"<br/><em>- ${randomQuote.category}</em></p>`;
  } else {
    console.error('Error: quoteDisplay element not found.');
  }
}
// Display the last viewed quote from session storage, if available
function showLastViewedQuote() {
  const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
  if (lastQuote) {
    document.getElementById('quoteDisplay').innerHTML =
      `<p>"${lastQuote.text}"<br/><em>- ${lastQuote.category}</em></p>`;
  }
}



// Function to add a new quote to the array
function createAddQuoteForm() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText && quoteCategory) {
       // Add new quote to the array
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
     saveQuotes(); // Save to local storage
    displayAllQuotes(); 
    
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}      

       
         // Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();

  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // Save imported quotes to local storage
    alert('Quotes imported successfully!');
    displayAllQuotes(); // Update the list
  };
  fileReader.readAsText(event.target.files[0]);
}

// Display all quotes in the list
function displayAllQuotes() {
  const quoteList = document.getElementById('quoteList');
  quoteList.innerHTML = ''; // Clear the list

  quotes.forEach(quote => {
    const quoteItem = document.createElement('li');
    quoteItem.innerHTML = `<p>"${quote.text}"<br/><em>- ${quote.category}</em></p>`;
    quoteList.appendChild(quoteItem);
  });
}


// Event listener to add a new quote
//document.querySelector('.btnAdd').addEventListener('click', addQuote);
// Event listener to show a new quote on button click.
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportButton').addEventListener('click', exportToJsonFile);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
window.onload = () => {
  displayAllQuotes();
  showLastViewedQuote();
};