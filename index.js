const { program } = require("commander");
const Contacts = require("./contacts.js");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();      
      return console.table(contacts);;
      break;
    case "get":
      const сontact = await Contacts.getContactById(id);
      return сontact;
    case "add":
      newContact = await Contacts.addContact({
        name,
        email,
        phone,
      });
          return newContact;
      break;
    case "remove":
      const removeContactId = await Contacts.removeContact(id);
          return removeContactId;
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv)
  .then((data) => console.log(data))
  .catch((error) => console.error(error));