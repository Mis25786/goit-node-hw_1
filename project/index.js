// const argv = require("yargs").argv;

const { program } = require("commander");

const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log("contacts :>> ", contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.log("contact :>> ", contact);
      if (!contact) {
        throw new Error(`Product with id=${id} not found!`);
      }
      break;

    case "add":
      const addContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log("addContact :>> ", addContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log("removeContact :>> ", removeContact);
      break;

    default:
      console.warn("Unknown action!!!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();
invokeAction(options);
