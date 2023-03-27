/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/ColaGenerator.ts":
/*!*****************************************!*\
  !*** ./src/components/ColaGenerator.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColaGenerator)
/* harmony export */ });
class ColaGenerator {
    constructor() {
        this.itemList = document.querySelector('.list-item');
    }
    async setup() {
        await this.loadData((json) => {
            this.colaFactory(json);
        });
    }
    async loadData(callback) {
        const res = await fetch('https://raw.githubusercontent.com/July249/vending_machine/main/public/data/item.json');
        if (res.status === 200) {
            callback(await res.json());
        }
        else {
            new Error(`Connect Error: ${res.status}`);
        }
    }
    colaFactory(data /* JSON data */) {
        const docFrag = document.createDocumentFragment();
        data.forEach((el) => {
            const item = document.createElement('li');
            const itemTemplate = `
          <button type="button" class="btn-item">
            <img src="" alt="" class="img-item" />
            <strong class="tit-item"></strong>
            <span class="txt-price"></span>
          </button>
        `;
            item.innerHTML = itemTemplate;
            const buttonItem = item.querySelector('.btn-item');
            buttonItem.dataset.item = el.name;
            buttonItem.dataset.count = `${el.count}`;
            buttonItem.dataset.price = `${el.cost}`;
            buttonItem.dataset.img = el.img;
            const imgItem = item.querySelector('.img-item');
            imgItem.src = `./src/assets/img/${el.img}`;
            const titleItem = item.querySelector('.tit-item');
            titleItem.textContent = el.name;
            const productCost = item.querySelector('.txt-price');
            productCost.textContent = `${el.cost}원`;
            docFrag.appendChild(item);
            this.itemList.appendChild(docFrag);
        });
    }
}


/***/ }),

/***/ "./src/components/VendingMachine.ts":
/*!******************************************!*\
  !*** ./src/components/VendingMachine.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VendingMachine)
/* harmony export */ });
class VendingMachine {
    constructor() {
        const vendingMachine = document.querySelector('.vending-machine');
        this.balance = vendingMachine.querySelector('.txt-balance');
        this.itemList = vendingMachine.querySelector('.list-item');
        this.inputCostEl = vendingMachine.querySelector('.inp-put');
        this.btnPut = vendingMachine.querySelector('.btn-put');
        this.btnReturn = vendingMachine.querySelector('.btn-return');
        this.btnGet = vendingMachine.querySelector('.btn-get');
        this.stagedList = vendingMachine.querySelector('.list-item-staged');
        const myinfo = document.querySelector('.my-info');
        this.myMoney = myinfo.querySelector('.txt-mymoney');
        this.gotList = myinfo.querySelector('.list-item-staged');
        this.txtTotal = myinfo.querySelector('.txt-total');
    }
    setup() {
        this.bindEvents();
    }
    stagedItemGenerator(target) {
        const stagedItem = document.createElement('li');
        stagedItem.dataset.item = target.dataset.item;
        stagedItem.dataset.price = target.dataset.price;
        stagedItem.innerHTML = `
      <button type="button" class="btn-staged">
        <img src="" alt="" class="img-item">
        <strong class="txt-item"></strong>
        <span class="num-counter">1</span>
        <div class="btn-unstaged"><i class="fa-solid fa-circle-minus" style="color: #f03f3f;"></i></div>
      </button>
    `;
        const unstagedBtn = stagedItem.querySelector('.btn-unstaged');
        unstagedBtn.id = `${target.dataset.item}`;
        const imgItem = stagedItem.querySelector('.img-item');
        imgItem.src = `./src/assets/img/${target.dataset.img}`;
        const titleItem = stagedItem.querySelector('.txt-item');
        titleItem.textContent = `${target.dataset.item}`;
        const quantityItem = stagedItem.querySelector('.num-counter');
        quantityItem.textContent = '1';
        this.stagedList.appendChild(stagedItem);
    }
    bindEvents() {
        this.stagedList.addEventListener('click', (e) => {
            const targetEl = e.target;
            if (targetEl.classList.contains('fa-circle-minus')) {
                const docFrag = document.createDocumentFragment();
                const unstagedBtn = targetEl.parentElement;
                const stagedItemList = this.stagedList.querySelectorAll('li');
                const updatedStagedItemList = Array.prototype.filter.call(stagedItemList, (item) => {
                    var _a, _b, _c, _d;
                    if (((_a = item.dataset) === null || _a === void 0 ? void 0 : _a.item) === (unstagedBtn === null || unstagedBtn === void 0 ? void 0 : unstagedBtn.id)) {
                        const quantityItem = item.querySelector('.num-counter');
                        const quantity = parseInt(quantityItem.textContent);
                        let currentBalance = parseInt((_b = this.balance.textContent) === null || _b === void 0 ? void 0 : _b.replaceAll(',', ''));
                        currentBalance += parseInt((_c = item.dataset) === null || _c === void 0 ? void 0 : _c.price) * quantity;
                        this.balance.textContent = new Intl.NumberFormat().format(currentBalance);
                    }
                    return ((_d = item.dataset) === null || _d === void 0 ? void 0 : _d.item) !== (unstagedBtn === null || unstagedBtn === void 0 ? void 0 : unstagedBtn.id);
                });
                for (const list of updatedStagedItemList) {
                    docFrag.appendChild(list);
                }
                this.stagedList.innerHTML = '';
                this.stagedList.append(docFrag);
            }
        });
        this.btnPut.addEventListener('click', () => {
            const inputCost = parseInt(this.inputCostEl.value);
            const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', ''));
            const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));
            if (inputCost) {
                if (inputCost <= myMoneyVal) {
                    this.myMoney.textContent =
                        new Intl.NumberFormat().format(myMoneyVal - inputCost) + ' 원';
                    this.balance.textContent = new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputCost);
                }
                else {
                    alert('소지금이 부족합니다.');
                }
                this.inputCostEl.value = null;
            }
        });
        this.btnReturn.addEventListener('click', () => {
            const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));
            const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',', ''));
            if (balanceVal) {
                this.myMoney.textContent =
                    new Intl.NumberFormat().format(balanceVal + myMoneyVal) + '원';
                this.balance.textContent = '0';
            }
            else {
                alert('반환될 거스름돈이 없습니다.');
            }
        });
        const btnsCola = this.itemList.querySelectorAll('button');
        btnsCola.forEach((item) => {
            item.addEventListener('click', (e) => {
                var _a, _b;
                const targetEl = e.currentTarget;
                const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));
                let isStaged = false;
                const targetElPrice = parseInt(targetEl.dataset.price);
                let targetCount = parseInt(targetEl.dataset.count);
                const stagedListItem = this.stagedList.querySelectorAll('li');
                if (balanceVal >= targetElPrice) {
                    this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElPrice);
                    for (const item of stagedListItem) {
                        if (item.dataset.item === targetEl.dataset.item) {
                            let quantityItem = item.querySelector('.num-counter');
                            quantityItem.textContent = `${parseInt(item.querySelector('.num-counter').textContent) + 1}`;
                            isStaged = true;
                            break;
                        }
                    }
                    if (!isStaged) {
                        this.stagedItemGenerator(targetEl);
                    }
                    if (targetEl.dataset.count) {
                        targetCount -= 1;
                        targetEl.dataset.count = `${targetCount}`;
                    }
                    if (parseInt(targetEl.dataset.count) === 0) {
                        (_a = targetEl.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('sold-out');
                        const warning = document.createElement('em');
                        warning.textContent = '해당 상품은 품절입니다.';
                        warning.classList.add('ir');
                        (_b = targetEl.parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(warning, targetEl);
                    }
                }
                else {
                    alert('잔액이 부족합니다! 입금해주세요~');
                }
            });
        });
        this.btnGet.addEventListener('click', () => {
            let isGot = false;
            let totalPrice = 0;
            for (const itemStaged of this.stagedList.querySelectorAll('li')) {
                for (const itemGot of this.gotList.querySelectorAll('li')) {
                    let itemGotCount = itemGot.querySelector('.num-counter');
                    if (itemStaged.dataset.item === itemGot.dataset.item) {
                        itemGotCount.textContent = `${parseInt(itemGotCount.textContent) +
                            parseInt(itemStaged.querySelector('.num-counter').textContent)}`;
                        isGot = true;
                        break;
                    }
                }
                if (!isGot) {
                    this.gotList.appendChild(itemStaged);
                }
            }
            this.stagedList.innerHTML = '';
            this.gotList.querySelectorAll('li').forEach((itemGot) => {
                totalPrice +=
                    parseInt(itemGot.dataset.price) *
                        parseInt(itemGot.querySelector('.num-counter').textContent);
            });
            this.txtTotal.textContent = `총금액 : ${new Intl.NumberFormat().format(totalPrice)}원`;
        });
    }
}


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ColaGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ColaGenerator */ "./src/components/ColaGenerator.ts");
/* harmony import */ var _components_VendingMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/VendingMachine */ "./src/components/VendingMachine.ts");


const colaGenerator = new _components_ColaGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
const vendingMachine = new _components_VendingMachine__WEBPACK_IMPORTED_MODULE_1__["default"]();
// Top-level await
await colaGenerator.setup();
vendingMachine.setup();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQSxFQUFFO1dBQ0Y7V0FDQTs7Ozs7V0NoRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvY29tcG9uZW50cy9Db2xhR2VuZXJhdG9yLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy9jb21wb25lbnRzL1ZlbmRpbmdNYWNoaW5lLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2FzeW5jIG1vZHVsZSIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIERhdGEgPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgY29zdDogbnVtYmVyO1xuICBpbWc6IHN0cmluZztcbiAgY291bnQ6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGFHZW5lcmF0b3Ige1xuICBpdGVtTGlzdDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWl0ZW0nKSE7XG4gIH1cblxuICBhc3luYyBzZXR1cCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmxvYWREYXRhKChqc29uKSA9PiB7XG4gICAgICB0aGlzLmNvbGFGYWN0b3J5KGpzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZERhdGEoY2FsbGJhY2s6IChhcmc6IFtdKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0p1bHkyNDkvdmVuZGluZ19tYWNoaW5lL21haW4vcHVibGljL2RhdGEvaXRlbS5qc29uJ1xuICAgICk7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgY2FsbGJhY2soYXdhaXQgcmVzLmpzb24oKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBFcnJvcihgQ29ubmVjdCBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH1cbiAgfVxuXG4gIGNvbGFGYWN0b3J5KGRhdGE6IERhdGFbXSAvKiBKU09OIGRhdGEgKi8pOiB2b2lkIHtcbiAgICBjb25zdCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgZGF0YS5mb3JFYWNoKChlbDogRGF0YSkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICAgIGNvbnN0IGl0ZW1UZW1wbGF0ZSA9IGBcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1pdGVtXCI+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGNsYXNzPVwiaW1nLWl0ZW1cIiAvPlxuICAgICAgICAgICAgPHN0cm9uZyBjbGFzcz1cInRpdC1pdGVtXCI+PC9zdHJvbmc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInR4dC1wcmljZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgYDtcblxuICAgICAgaXRlbS5pbm5lckhUTUwgPSBpdGVtVGVtcGxhdGU7XG5cbiAgICAgIGNvbnN0IGJ1dHRvbkl0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5idG4taXRlbScpISBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5pdGVtID0gZWwubmFtZTtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5jb3VudCA9IGAke2VsLmNvdW50fWA7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQucHJpY2UgPSBgJHtlbC5jb3N0fWA7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQuaW1nID0gZWwuaW1nO1xuXG4gICAgICBjb25zdCBpbWdJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuaW1nLWl0ZW0nKSEgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgIGltZ0l0ZW0uc3JjID0gYC4vc3JjL2Fzc2V0cy9pbWcvJHtlbC5pbWd9YDtcblxuICAgICAgY29uc3QgdGl0bGVJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudGl0LWl0ZW0nKSEgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0aXRsZUl0ZW0udGV4dENvbnRlbnQgPSBlbC5uYW1lO1xuXG4gICAgICBjb25zdCBwcm9kdWN0Q29zdCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnR4dC1wcmljZScpISBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICBwcm9kdWN0Q29zdC50ZXh0Q29udGVudCA9IGAke2VsLmNvc3R97JuQYDtcblxuICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIHRoaXMuaXRlbUxpc3QuYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlbmRpbmdNYWNoaW5lIHtcbiAgcHJpdmF0ZSBiYWxhbmNlOiBIVE1MU3BhbkVsZW1lbnQ7XG4gIHByaXZhdGUgaXRlbUxpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gIHByaXZhdGUgaW5wdXRDb3N0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHByaXZhdGUgYnRuUHV0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgcHJpdmF0ZSBidG5SZXR1cm46IEhUTUxCdXR0b25FbGVtZW50O1xuICBwcml2YXRlIGJ0bkdldDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIHByaXZhdGUgc3RhZ2VkTGlzdDogSFRNTFVMaXN0RWxlbWVudDtcbiAgcHJpdmF0ZSBteU1vbmV5OiBIVE1MU3BhbkVsZW1lbnQ7XG4gIHByaXZhdGUgZ290TGlzdDogSFRNTFVMaXN0RWxlbWVudDtcbiAgcHJpdmF0ZSB0eHRUb3RhbDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgdmVuZGluZ01hY2hpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy52ZW5kaW5nLW1hY2hpbmUnXG4gICAgKSEgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5iYWxhbmNlID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLnR4dC1iYWxhbmNlJykhO1xuICAgIHRoaXMuaXRlbUxpc3QgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtJykhO1xuICAgIHRoaXMuaW5wdXRDb3N0RWwgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKCcuaW5wLXB1dCcpITtcbiAgICB0aGlzLmJ0blB1dCA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoJy5idG4tcHV0JykhO1xuICAgIHRoaXMuYnRuUmV0dXJuID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLmJ0bi1yZXR1cm4nKSE7XG4gICAgdGhpcy5idG5HZXQgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKCcuYnRuLWdldCcpITtcbiAgICB0aGlzLnN0YWdlZExpc3QgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtLXN0YWdlZCcpITtcblxuICAgIGNvbnN0IG15aW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1pbmZvJykhIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMubXlNb25leSA9IG15aW5mby5xdWVyeVNlbGVjdG9yKCcudHh0LW15bW9uZXknKSE7XG4gICAgdGhpcy5nb3RMaXN0ID0gbXlpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWl0ZW0tc3RhZ2VkJykhO1xuICAgIHRoaXMudHh0VG90YWwgPSBteWluZm8ucXVlcnlTZWxlY3RvcignLnR4dC10b3RhbCcpITtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhZ2VkSXRlbUdlbmVyYXRvcih0YXJnZXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3Qgc3RhZ2VkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgc3RhZ2VkSXRlbS5kYXRhc2V0Lml0ZW0gPSB0YXJnZXQuZGF0YXNldC5pdGVtITtcbiAgICBzdGFnZWRJdGVtLmRhdGFzZXQucHJpY2UgPSB0YXJnZXQuZGF0YXNldC5wcmljZSE7XG4gICAgc3RhZ2VkSXRlbS5pbm5lckhUTUwgPSBgXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1zdGFnZWRcIj5cbiAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBjbGFzcz1cImltZy1pdGVtXCI+XG4gICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0eHQtaXRlbVwiPjwvc3Ryb25nPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm51bS1jb3VudGVyXCI+MTwvc3Bhbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi11bnN0YWdlZFwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLW1pbnVzXCIgc3R5bGU9XCJjb2xvcjogI2YwM2YzZjtcIj48L2k+PC9kaXY+XG4gICAgICA8L2J1dHRvbj5cbiAgICBgO1xuXG4gICAgY29uc3QgdW5zdGFnZWRCdG4gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJ0bi11bnN0YWdlZCdcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB1bnN0YWdlZEJ0bi5pZCA9IGAke3RhcmdldC5kYXRhc2V0Lml0ZW19YDtcblxuICAgIGNvbnN0IGltZ0l0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pbWctaXRlbScpISBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIGltZ0l0ZW0uc3JjID0gYC4vc3JjL2Fzc2V0cy9pbWcvJHt0YXJnZXQuZGF0YXNldC5pbWd9YDtcblxuICAgIGNvbnN0IHRpdGxlSXRlbSA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcignLnR4dC1pdGVtJykhIGFzIEhUTUxFbGVtZW50O1xuICAgIHRpdGxlSXRlbS50ZXh0Q29udGVudCA9IGAke3RhcmdldC5kYXRhc2V0Lml0ZW19YDtcblxuICAgIGNvbnN0IHF1YW50aXR5SXRlbSA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcihcbiAgICAgICcubnVtLWNvdW50ZXInXG4gICAgKSEgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCA9ICcxJztcblxuICAgIHRoaXMuc3RhZ2VkTGlzdC5hcHBlbmRDaGlsZChzdGFnZWRJdGVtKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZEV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLnN0YWdlZExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0RWwgPSBlLnRhcmdldCEgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAodGFyZ2V0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1jaXJjbGUtbWludXMnKSkge1xuICAgICAgICBjb25zdCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCB1bnN0YWdlZEJ0biA9IHRhcmdldEVsLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHN0YWdlZEl0ZW1MaXN0ID0gdGhpcy5zdGFnZWRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgJ2xpJ1xuICAgICAgICApISBhcyBOb2RlTGlzdE9mPEhUTUxMSUVsZW1lbnQ+O1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRTdGFnZWRJdGVtTGlzdDogSFRNTExJRWxlbWVudFtdID1cbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoc3RhZ2VkSXRlbUxpc3QsIChpdGVtOiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Py5pdGVtID09PSB1bnN0YWdlZEJ0bj8uaWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgcXVhbnRpdHlJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICkhIGFzIEhUTUxTcGFuRWxlbWVudDtcblxuICAgICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9IHBhcnNlSW50KHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCEpO1xuXG4gICAgICAgICAgICAgIGxldCBjdXJyZW50QmFsYW5jZTogbnVtYmVyID0gcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgdGhpcy5iYWxhbmNlLnRleHRDb250ZW50Py5yZXBsYWNlQWxsKCcsJywgJycpIVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGN1cnJlbnRCYWxhbmNlICs9IHBhcnNlSW50KGl0ZW0uZGF0YXNldD8ucHJpY2UhKSAqIHF1YW50aXR5O1xuXG4gICAgICAgICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgpLmZvcm1hdChcbiAgICAgICAgICAgICAgICBjdXJyZW50QmFsYW5jZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGF0YXNldD8uaXRlbSAhPT0gdW5zdGFnZWRCdG4/LmlkITtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IGxpc3Qgb2YgdXBkYXRlZFN0YWdlZEl0ZW1MaXN0KSB7XG4gICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChsaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhZ2VkTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5zdGFnZWRMaXN0LmFwcGVuZChkb2NGcmFnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYnRuUHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXRDb3N0ID0gcGFyc2VJbnQodGhpcy5pbnB1dENvc3RFbC52YWx1ZSk7XG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMubXlNb25leS50ZXh0Q29udGVudCEucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSBwYXJzZUludChcbiAgICAgICAgdGhpcy5iYWxhbmNlLnRleHRDb250ZW50IS5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICApO1xuXG4gICAgICBpZiAoaW5wdXRDb3N0KSB7XG4gICAgICAgIGlmIChpbnB1dENvc3QgPD0gbXlNb25leVZhbCkge1xuICAgICAgICAgIHRoaXMubXlNb25leS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICBuZXcgSW50bC5OdW1iZXJGb3JtYXQoKS5mb3JtYXQobXlNb25leVZhbCAtIGlucHV0Q29zdCkgKyAnIOybkCc7XG4gICAgICAgICAgdGhpcy5iYWxhbmNlLnRleHRDb250ZW50ID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KFxuICAgICAgICAgICAgKGJhbGFuY2VWYWwgPyBiYWxhbmNlVmFsIDogMCkgKyBpbnB1dENvc3RcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KCfshozsp4DquIjsnbQg67aA7KGx7ZWp64uI64ukLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5wdXRDb3N0RWwudmFsdWUgPSBudWxsITtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYnRuUmV0dXJuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLmJhbGFuY2UudGV4dENvbnRlbnQhLnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMubXlNb25leS50ZXh0Q29udGVudCEucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcblxuICAgICAgaWYgKGJhbGFuY2VWYWwpIHtcbiAgICAgICAgdGhpcy5teU1vbmV5LnRleHRDb250ZW50ID1cbiAgICAgICAgICBuZXcgSW50bC5OdW1iZXJGb3JtYXQoKS5mb3JtYXQoYmFsYW5jZVZhbCArIG15TW9uZXlWYWwpICsgJ+ybkCc7XG4gICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCA9ICcwJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCfrsJjtmZjrkKAg6rGw7Iqk66aE64+I7J20IOyXhuyKteuLiOuLpC4nKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGJ0bnNDb2xhID0gdGhpcy5pdGVtTGlzdC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgJ2J1dHRvbidcbiAgICApISBhcyBOb2RlTGlzdE9mPEhUTUxCdXR0b25FbGVtZW50PjtcblxuICAgIGJ0bnNDb2xhLmZvckVhY2goKGl0ZW06IEhUTUxCdXR0b25FbGVtZW50KSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSBwYXJzZUludChcbiAgICAgICAgICB0aGlzLmJhbGFuY2UudGV4dENvbnRlbnQhLnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgaXNTdGFnZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxQcmljZSA9IHBhcnNlSW50KHRhcmdldEVsLmRhdGFzZXQucHJpY2UhKTtcbiAgICAgICAgbGV0IHRhcmdldENvdW50ID0gcGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5jb3VudCEpO1xuICAgICAgICBjb25zdCBzdGFnZWRMaXN0SXRlbSA9IHRoaXMuc3RhZ2VkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICdsaSdcbiAgICAgICAgKSEgYXMgTm9kZUxpc3RPZjxIVE1MTElFbGVtZW50PjtcblxuICAgICAgICBpZiAoYmFsYW5jZVZhbCA+PSB0YXJnZXRFbFByaWNlKSB7XG4gICAgICAgICAgdGhpcy5iYWxhbmNlLnRleHRDb250ZW50ID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KFxuICAgICAgICAgICAgYmFsYW5jZVZhbCAtIHRhcmdldEVsUHJpY2VcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHN0YWdlZExpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Lml0ZW0gPT09IHRhcmdldEVsLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICBsZXQgcXVhbnRpdHlJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICkhIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgPSBgJHtcbiAgICAgICAgICAgICAgICBwYXJzZUludChpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5udW0tY291bnRlcicpIS50ZXh0Q29udGVudCEpICsgMVxuICAgICAgICAgICAgICB9YDtcbiAgICAgICAgICAgICAgaXNTdGFnZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWlzU3RhZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YWdlZEl0ZW1HZW5lcmF0b3IodGFyZ2V0RWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0YXJnZXRFbC5kYXRhc2V0LmNvdW50KSB7XG4gICAgICAgICAgICB0YXJnZXRDb3VudCAtPSAxO1xuICAgICAgICAgICAgdGFyZ2V0RWwuZGF0YXNldC5jb3VudCA9IGAke3RhcmdldENvdW50fWA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcnNlSW50KHRhcmdldEVsLmRhdGFzZXQuY291bnQhKSA9PT0gMCkge1xuICAgICAgICAgICAgdGFyZ2V0RWwucGFyZW50RWxlbWVudD8uY2xhc3NMaXN0LmFkZCgnc29sZC1vdXQnKTtcblxuICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2VtJykhIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgd2FybmluZy50ZXh0Q29udGVudCA9ICftlbTri7kg7IOB7ZKI7J2AIO2SiOygiOyeheuLiOuLpC4nO1xuICAgICAgICAgICAgd2FybmluZy5jbGFzc0xpc3QuYWRkKCdpcicpO1xuICAgICAgICAgICAgdGFyZ2V0RWwucGFyZW50RWxlbWVudD8uaW5zZXJ0QmVmb3JlKHdhcm5pbmcsIHRhcmdldEVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ+yelOyVoeydtCDrtoDsobHtlanri4jri6QhIOyeheq4iO2VtOyjvOyEuOyalH4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJ0bkdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCBpc0dvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHRvdGFsUHJpY2U6IG51bWJlciA9IDA7XG5cbiAgICAgIGZvciAoY29uc3QgaXRlbVN0YWdlZCBvZiB0aGlzLnN0YWdlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW1Hb3Qgb2YgdGhpcy5nb3RMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgICAgICBsZXQgaXRlbUdvdENvdW50ID0gaXRlbUdvdC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgICApISBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgaWYgKGl0ZW1TdGFnZWQuZGF0YXNldC5pdGVtID09PSBpdGVtR290LmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgaXRlbUdvdENvdW50LnRleHRDb250ZW50ID0gYCR7XG4gICAgICAgICAgICAgIHBhcnNlSW50KGl0ZW1Hb3RDb3VudC50ZXh0Q29udGVudCEpICtcbiAgICAgICAgICAgICAgcGFyc2VJbnQoaXRlbVN0YWdlZC5xdWVyeVNlbGVjdG9yKCcubnVtLWNvdW50ZXInKSEudGV4dENvbnRlbnQhKVxuICAgICAgICAgICAgfWA7XG4gICAgICAgICAgICBpc0dvdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0dvdCkge1xuICAgICAgICAgIHRoaXMuZ290TGlzdC5hcHBlbmRDaGlsZChpdGVtU3RhZ2VkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YWdlZExpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgIHRoaXMuZ290TGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2goKGl0ZW1Hb3QpID0+IHtcbiAgICAgICAgdG90YWxQcmljZSArPVxuICAgICAgICAgIHBhcnNlSW50KGl0ZW1Hb3QuZGF0YXNldC5wcmljZSEpICpcbiAgICAgICAgICBwYXJzZUludChpdGVtR290LnF1ZXJ5U2VsZWN0b3IoJy5udW0tY291bnRlcicpIS50ZXh0Q29udGVudCEpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnR4dFRvdGFsLnRleHRDb250ZW50ID0gYOy0neq4iOyVoSA6ICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KFxuICAgICAgICB0b3RhbFByaWNlXG4gICAgICApfeybkGA7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBDb2xhR2VuZXJhdG9yIGZyb20gJy4vY29tcG9uZW50cy9Db2xhR2VuZXJhdG9yJztcbmltcG9ydCBWZW5kaW5nTWFjaGluZSBmcm9tICcuL2NvbXBvbmVudHMvVmVuZGluZ01hY2hpbmUnO1xuXG5jb25zdCBjb2xhR2VuZXJhdG9yID0gbmV3IENvbGFHZW5lcmF0b3IoKTtcbmNvbnN0IHZlbmRpbmdNYWNoaW5lID0gbmV3IFZlbmRpbmdNYWNoaW5lKCk7XG5cbi8vIFRvcC1sZXZlbCBhd2FpdFxuYXdhaXQgY29sYUdlbmVyYXRvci5zZXR1cCgpO1xudmVuZGluZ01hY2hpbmUuc2V0dXAoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmICFxdWV1ZS5kKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IDEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9