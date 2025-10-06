async function fetchUsersPage(page = 1, limit = 30) {
  if (!Number.isInteger(page) || page < 1) throw new TypeError('page must be an integer >= 1');
  if (!Number.isInteger(limit) || limit < 1) throw new TypeError('limit must be an integer >= 1');

  const skip = (page - 1) * limit;
  const url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text ? '- ' + text : ''}`);
  }

  const data = await res.json();
  const total = Number.isFinite(data.total) ? data.total : 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    users: Array.isArray(data.users) ? data.users : [],
    page,
    limit,
    skip,
    total,
    totalPages
  };
}

async function fetchAllUsers(limit = 30) {
  const first = await fetchUsersPage(1, limit);
  const results = [...first.users];
  for (let p = 2; p <= first.totalPages; p++) {
    const pageData = await fetchUsersPage(p, limit);
    results.push(...pageData.users);
  }

  return results;
}

(async () => {
  try {
    const page1 = await fetchUsersPage(1);
    console.log('page 1 users:', page1.users);
    console.log(`page ${page1.page} of ${page1.totalPages}, total users = ${page1.total}`);
    const page5 = await fetchUsersPage(5);
    console.log('page 5 users count:', page5.users.length);
  } catch (err) {
    console.error('Error fetching users:', err);
  }
})();

//fetchUsersPage(1).then(console.log);
