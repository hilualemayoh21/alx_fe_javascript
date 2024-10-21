const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "The best way to predict the future is to create it.", category: "Wisdom" }
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${quotes[randomIndex].text}</p><p><em>${quotes[randomIndex].category}</em></p>`;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    }
}
 quotes = JSON.parse(localStorage.getItem('quotes')) || [];

function addQuote(quote) {
    quotes.push(quote);
    saveQuotes();
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
    quotes.forEach(quote => {
        displayQuote(quote);
    });
}

function displayQuote(quote) {
    // Code to display the quote on the webpage
}

document.addEventListener('DOMContentLoaded', loadQuotes);

document.getElementById('exportButton').addEventListener('click', function() {
    const blob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

document.getElementById('importFile').addEventListener('change', importFromJsonFile);

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Optional: Using session storage for user preferences
function setLastViewedQuote(index) {
    sessionStorage.setItem('lastViewedQuote', index);
}

function getLastViewedQuote() {
    return sessionStorage.getItem('lastViewedQuote');
}
 function populateCategories() {
            const categories = [...new Set(quotes.map(quote => quote.category))];
            const categoryFilter = document.getElementById('categoryFilter');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categoryFilter.appendChild(option);
            });
            const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
            categoryFilter.value = lastSelectedCategory;
            filterQuotes();
        }

        function filterQuotes() {
            const selectedCategory = document.getElementById('categoryFilter').value;
            const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
            const quoteDisplay = document.getElementById('quoteDisplay');
            quoteDisplay.innerHTML = filteredQuotes.map(quote => `<p>${quote.text}</p>`).join('');
            localStorage.setItem('lastSelectedCategory', selectedCategory);
        }

        function addQuote(text, category) {
            quotes.push({ text, category });
            populateCategories();
        }

        window.onload = populateCategories;
    // Step 1: Simulate Server Interaction
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let localQuotes = [];

// Function to fetch quotes from the server
async function fetchQuotes() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.slice(0, 5); // Simulating fetching 5 quotes
}

// Periodic fetching of quotes
setInterval(async () => {
    const serverQuotes = await fetchQuotes();
    syncQuotes(serverQuotes);
}, 10000); // Fetch every 10 seconds

// Step 2: Implement Data Syncing
function syncQuotes(serverQuotes) {
    serverQuotes.forEach(serverQuote => {
        const localQuote = localQuotes.find(q => q.id === serverQuote.id);
        if (!localQuote) {
            localQuotes.push(serverQuote); // Add new quote
        } else if (localQuote.title !== serverQuote.title) {
            // Conflict resolution: server data takes precedence
            Object.assign(localQuote, serverQuote);
            notifyUser(`Quote updated: ${localQuote.title}`);
        }
    });
    saveToLocalStorage();
}

// Save quotes to local storage
function saveToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(localQuotes));
}

// Step 3: Handling Conflicts
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.className = 'notification';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}