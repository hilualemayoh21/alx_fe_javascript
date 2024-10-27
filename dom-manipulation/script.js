// Array of quotes with 'text' and 'category' properties.
const quotes = [
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", category: "Motivation" },
  { text: "Do not wait to strike till the iron is hot, but make it hot by striking.", category: "Action" },
  { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.querySelector('.quoteDisplay');

  // Check if quoteDisplay exists in the DOM.
  
  if (quoteDisplay) {
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"<br/><em>- ${randomQuote.category}</em></p>`;
  } else {
    console.error('Error: quoteDisplay element not found.');
  }
}



// Event listener to show a new quote on button click.
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add a new quote to the array
function createAddQuoteForm() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText && quoteCategory) {
       // Add new quote to the array
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);

     const quoteItem = document.createElement('li'); // Create list item
    const quoteTextElem = document.createElement('p'); // Create paragraph for quote text
    const quoteCategoryElem = document.createElement('em'); // Create emphasis for category

    // Set the text content for the new elements
    quoteTextElem.textContent = `"${newQuote.text}"`;
    quoteCategoryElem.textContent = `- ${newQuote.category}`;

    // Append category to the quote text and then the text to the list item
    quoteTextElem.appendChild(quoteCategoryElem);
    quoteItem.appendChild(quoteTextElem);
    // Append the list item to the quote list
    quoteList.appendChild(quoteItem);
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

// Event listener to add a new quote
document.querySelector('.btnAdd').addEventListener('click', addQuote);
