let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  { text: "It's not whether you get knocked down, it's whether you get up.", category: "Resilience" }
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteDisplay").innerText =
    `"${quotes[randomIndex].text}" — ${quotes[randomIndex].category}`;
}

function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();
  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    showRandomQuote();
  }
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show a quote at start
showRandomQuote();