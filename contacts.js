const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(data);
}

function write(data) {

  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
    const data = await read();

    return data;
}

async function getContactById(contactId) {
  const data = await read();

  const foundContact = data.find((contact) => contact.id === contactId);

  if (foundContact === undefined) {
    return null; 
  }

  return foundContact;
}

async function removeContact(contactId) {
    const data = await read();

    const index = data.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }

    const newContacts = [
        ...data.slice(0, index),
        ...data.slice(index + 1),
    ];

    await write(newContacts);

    return data[index];
}

async function addContact(contact) {
  const data = await read();

  const newContact = {
    id: crypto.randomUUID(),
    ...contact,
  };
  data.push(newContact);

  await write(data);

  return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}