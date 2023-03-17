import ColaGenerator from "./ColaGenerator.js";
import VendingMachine from "./VendingMachine.js";

const colaGenerator = new ColaGenerator();
const vendingMachine = new VendingMachine();

// Top-level await
await colaGenerator.setup();
vendingMachine.setup();
