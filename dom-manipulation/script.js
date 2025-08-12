const quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Perseverance" }
];

function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

function createAddQuoteForm() {
    const container = document.getElementById("quoteFormContainer");

    const textInput = document.createElement("input");
    textInput.id = "newQuoteText";
    textInput.type = "text";
    textInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    container.appendChild(textInput);
    container.appendChild(categoryInput);
    container.appendChild(addButton);
}

function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (newText && newCategory) {
        quotes.push({ text: newText, category: newCategory });
        textInput.value = "";
        categoryInput.value = "";
        showRandomQuote(); // Show the newly added quote
    }
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

showRandomQuote();
createAddQuoteForm();