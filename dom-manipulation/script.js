let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Get busy living or get busy dying.", category: "Motivation" }
];

function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

function addQuote() {
  let newQuoteText = document.getElementById("newQuoteText").value;
  let newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" }
    ];
    saveQuotes();
  }
}
loadQuotes();

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    document.getElementById("newQuoteText").value = '';
    document.getElementById("newQuoteCategory").value = '';
    alert("Quote added!");
  } else {
    alert("Please fill in both fields.");
  }
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `<p>"${randomQuote.text}"</p><p>- ${randomQuote.category}</p>`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

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

function fetchQuotesFromServer() {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5') // Limit to 5 for testing
    .then(response => response.json())
    .then(serverQuotes => {
      const formattedQuotes = serverQuotes.map(post => ({
        text: post.body,
        category: post.title
      }));

      const localData = localStorage.getItem('quotes');
      const localQuotes = localData ? JSON.parse(localData) : [];

      const hasConflict = JSON.stringify(formattedQuotes) !== JSON.stringify(localQuotes);

      if (hasConflict) {
        quotes = formattedQuotes;
        saveQuotes();
        showConflictNotification("Conflicts resolved: Server quotes have replaced local data.");
      }
    })
    .catch(error => {
      console.error('Error fetching server data:', error);
    });
}

function showConflictNotification(message) {
  const notice = document.createElement('div');
  notice.textContent = message;
  notice.style.backgroundColor = '#ffd700';
  notice.style.color = '#000';
  notice.style.padding = '10px';
  notice.style.marginTop = '10px';
  notice.style.border = '1px solid #ccc';
  document.body.insertBefore(notice, document.body.firstChild);
}

setInterval(fetchQuotesFromServer, 30000); // 30,000 ms = 30 seconds

fetchQuotesFromServer();