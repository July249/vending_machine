import ColaGenerator from './components/ColaGenerator.js';
import VendingMachine from './components/VendingMachine.js';

const colaGenerator = new ColaGenerator();
const vendingMachine = new VendingMachine();

// Top-level await
await colaGenerator.setup();
vendingMachine.setup();
