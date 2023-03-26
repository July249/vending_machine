import ColaGenerator from './components/ColaGenerator';
import VendingMachine from './components/VendingMachine';
const colaGenerator = new ColaGenerator();
const vendingMachine = new VendingMachine();
// Top-level await
await colaGenerator.setup();
vendingMachine.setup();
//# sourceMappingURL=main.js.map