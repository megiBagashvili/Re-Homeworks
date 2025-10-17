const fs = require('fs');
const path = require('path');

const contactsFile = path.join(__dirname, 'contacts.json');

function readContacts() {
    if (!fs.existsSync(contactsFile)) {
        fs.writeFileSync(contactsFile, '[]');
    }
    const data = fs.readFileSync(contactsFile);
    return JSON.parse(data);
}

function writeContacts(contacts) {
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
}

const [, , command, number, name] = process.argv;

switch (command) {
    case 'add':
        addContact(number, name);
        break;

    case 'delete':
        deleteContact(number);
        break;

    case 'show':
        showContacts();
        break;

    default:
        console.log('Usage: node phone.js [add <number> <name> | delete <number> | show]');
        break;
}

function addContact(number, name) {
    if (!number || !name) {
        console.log('Please provide both number and name.');
        return;
    }

    const contacts = readContacts();

    const exists = contacts.some(contact => contact.number === number);
    if (exists) {
        console.log('Number already exists, not added.');
        return;
    }

    contacts.push({ number, name });
    writeContacts(contacts);
    console.log(`Added contact: ${name} (${number})`);
}

function deleteContact(number) {
    if (!number) {
        console.log('Please provide a number to delete.');
        return;
    }

    const contacts = readContacts();
    const updatedContacts = contacts.filter(contact => contact.number !== number);

    if (updatedContacts.length === contacts.length) {
        console.log('Number not found, nothing deleted.');
    } else {
        writeContacts(updatedContacts);
        console.log(`Deleted contact with number: ${number}`);
    }
}

function showContacts() {
    const contacts = readContacts();
    if (contacts.length === 0) {
        console.log('No contacts found.');
    } else {
        console.log('All Contacts:');
        contacts.forEach(c => console.log(`- ${c.name}: ${c.number}`));
    }
}
