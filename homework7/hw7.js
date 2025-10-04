//task 1
async function fetchAndRetry(url, retries = 5, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`error. status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.log(`Attempt ${attempt} ${error.message}`);

      if (attempt === retries) {
        throw new Error(`attempts failed. ${error.message}`);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

fetchAndRetry("https://jsonplaceholde.typicode.com/posts")
  .then(data => console.log("received:", data))
  .catch(err => console.error("Error:", err.message));



//task 2
async function fetchAvailable(urls) {
  try {
    const response = await Promise.any(
      urls.map(url =>
        fetch(url).then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
      )
    );

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

fetchAvailable([
  "https://dummyjson.com/users",
  "https://jsonplaceholder.typicode.com/users"
]);


//task 3
async function getProductsWithPriceAbove10() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    const filtered = data.products.filter(product => product.price > 10);
    return filtered;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

getProductsWithPriceAbove10().then(products => {
  console.log(products);
});

//task 4
async function getWebDevelopers() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    const webDevs = data.users.filter(user => user.company?.title === "Web Developer");

    webDevs.forEach(user => {
      console.log({
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.address?.city,
        email: user.email,
        phone: user.phone
      });
    });

  } catch (error) {
    console.error(error);
  }
}

getWebDevelopers();

//task 5
async function fetchAllDummyJson() {
  const endpoints = {
    recipes:  "https://dummyjson.com/recipes",
    comments: "https://dummyjson.com/comments",
    todos:    "https://dummyjson.com/todos",
    quotes:   "https://dummyjson.com/quotes"
  };

  const entries = Object.entries(endpoints);
  const fetchPromises = entries.map(([key, url]) =>
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`${key} fetch failed: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(json => [key, json])
  );
  const keyValuePairs = await Promise.all(fetchPromises);
  return Object.fromEntries(keyValuePairs);
}

fetchAllDummyJson()
  .then(({ recipes, comments, todos, quotes }) => {
    console.log('recipes:', recipes);
    console.log('comments:', comments);
    console.log('todos:', todos);
    console.log('quotes:', quotes);
  })
  .catch(err => {
    console.error('One or more requests failed:', err);
  });
