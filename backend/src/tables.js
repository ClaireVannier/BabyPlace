// Import the manager modules responsible for handling data operations on the tables
const ItemManager = require("./managers/ItemManager");
const ParentManager = require("./managers/ParentManager");
const NurseryManager = require("./managers/NurseryManager");
const ChildrenManager = require("./managers/ChildrenManager");
const BookingManager = require("./managers/BookingManager");
const AdministrativeManager = require("./managers/AdministrativeManager");
const DateManager = require("./managers/DateManager");
const UserManager = require("./managers/UserManager");
const UploadManager = require("./managers/UploadManager");

const managers = [
  ItemManager,
  ParentManager,
  NurseryManager,
  ChildrenManager,
  BookingManager,
  AdministrativeManager,
  DateManager,
  UserManager,
  UploadManager,
];

// Create an empty object to hold data managers for different tables
const tables = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass(); // Nursery manager {table: "nursery"}
  // a revoir parce que pas compris
  tables[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
