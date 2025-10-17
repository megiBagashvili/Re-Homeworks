const fs = require('fs');
const https = require('https');

const url = 'https://jsonplaceholder.typicode.com/users';

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const users = JSON.parse(data);

    const filteredUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }));

    fs.writeFile('users.json', JSON.stringify(filteredUsers, null, 2), (err) => {
      if (err) throw err;
      console.log('✅ users.json has been saved!');
    });
  });
}).on('error', (err) => {
  console.error('Error fetching data:', err);
});
