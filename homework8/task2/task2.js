async function getQuotes() {
  try {
    const response = await fetch('https://dummyjson.com/quotes');
    const data = await response.json();

    const container = document.getElementById('quotesContainer');
    container.innerHTML = '';
    data.quotes.forEach(q => {
      const quoteElement = document.createElement('p');
      quoteElement.textContent = `"${q.quote}" — ${q.author}`;
      container.appendChild(quoteElement);
    });

  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
}

document.getElementById('fetchBtn').addEventListener('click', getQuotes);
