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
/* harmony import */ var _types_typeGuard_isColaItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/typeGuard/isColaItem */ "./src/types/typeGuard/isColaItem.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ColaGenerator_itemList;

class ColaGenerator {
    constructor() {
        _ColaGenerator_itemList.set(this, void 0);
        __classPrivateFieldSet(this, _ColaGenerator_itemList, document.querySelector('.list-item'), "f");
    }
    async setup() {
        await this.loadData((json) => {
            this.colaFactory(json);
        });
    }
    async loadData(callback) {
        const res = await fetch('https://raw.githubusercontent.com/July249/vending_machine/main/public/data/item.json');
        if (res.status === 200) {
            const data = (await res.json());
            if ((0,_types_typeGuard_isColaItem__WEBPACK_IMPORTED_MODULE_0__.isColaItem)(data)) {
                callback(data);
            }
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
            __classPrivateFieldGet(this, _ColaGenerator_itemList, "f").appendChild(docFrag);
        });
    }
}
_ColaGenerator_itemList = new WeakMap();


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
/* harmony import */ var _util_numberFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/numberFormat */ "./src/util/numberFormat.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _VendingMachine_balance, _VendingMachine_itemList, _VendingMachine_inputCostEl, _VendingMachine_btnPut, _VendingMachine_btnReturn, _VendingMachine_btnGet, _VendingMachine_stagedList, _VendingMachine_myMoney, _VendingMachine_gotList, _VendingMachine_txtTotal;

class VendingMachine {
    constructor() {
        _VendingMachine_balance.set(this, void 0);
        _VendingMachine_itemList.set(this, void 0);
        _VendingMachine_inputCostEl.set(this, void 0);
        _VendingMachine_btnPut.set(this, void 0);
        _VendingMachine_btnReturn.set(this, void 0);
        _VendingMachine_btnGet.set(this, void 0);
        _VendingMachine_stagedList.set(this, void 0);
        _VendingMachine_myMoney.set(this, void 0);
        _VendingMachine_gotList.set(this, void 0);
        _VendingMachine_txtTotal.set(this, void 0);
        const vendingMachine = document.querySelector('.vending-machine');
        __classPrivateFieldSet(this, _VendingMachine_balance, vendingMachine.querySelector('.txt-balance'), "f");
        __classPrivateFieldSet(this, _VendingMachine_itemList, document.querySelector('.list-item'), "f");
        __classPrivateFieldSet(this, _VendingMachine_inputCostEl, vendingMachine.querySelector('.inp-put'), "f");
        __classPrivateFieldSet(this, _VendingMachine_btnPut, vendingMachine.querySelector('.btn-put'), "f");
        __classPrivateFieldSet(this, _VendingMachine_btnReturn, vendingMachine.querySelector('.btn-return'), "f");
        __classPrivateFieldSet(this, _VendingMachine_btnGet, vendingMachine.querySelector('.btn-get'), "f");
        __classPrivateFieldSet(this, _VendingMachine_stagedList, vendingMachine.querySelector('.list-item-staged'), "f");
        const myinfo = document.querySelector('.my-info');
        __classPrivateFieldSet(this, _VendingMachine_myMoney, myinfo.querySelector('.txt-mymoney'), "f");
        __classPrivateFieldSet(this, _VendingMachine_gotList, myinfo.querySelector('.list-item-staged'), "f");
        __classPrivateFieldSet(this, _VendingMachine_txtTotal, myinfo.querySelector('.txt-total'), "f");
    }
    setup() {
        this.bindEvents();
    }
    stagedItemGenerator(target) {
        const stagedItem = document.createElement('li');
        stagedItem.dataset.item = target.dataset.item || '';
        stagedItem.dataset.price = target.dataset.price || '0';
        stagedItem.innerHTML = `
      <button type="button" class="btn-staged">
        <img src="" alt="" class="img-item">
        <strong class="txt-item"></strong>
        <span class="num-counter"></span>
        <div class="btn-unstaged"><i class="fa-solid fa-circle-minus" style="color: #f03f3f;"></i></div>
      </button>
    `;
        const unstagedBtn = stagedItem.querySelector('.btn-unstaged');
        unstagedBtn.id = `${target.dataset.item}`;
        const imgItem = stagedItem.querySelector('.img-item');
        imgItem.src = `./src/assets/img/${target.dataset.img}`;
        const titleItem = stagedItem.querySelector('.txt-item');
        titleItem.textContent = target.dataset.item || '';
        const quantityItem = stagedItem.querySelector('.num-counter');
        quantityItem.textContent = '1';
        __classPrivateFieldGet(this, _VendingMachine_stagedList, "f").appendChild(stagedItem);
    }
    bindEvents() {
        __classPrivateFieldGet(this, _VendingMachine_stagedList, "f").addEventListener('click', (e) => {
            const targetEl = e.target;
            if (targetEl.classList.contains('fa-circle-minus')) {
                const docFrag = document.createDocumentFragment();
                const unstagedBtn = targetEl.parentElement;
                const stagedItemList = __classPrivateFieldGet(this, _VendingMachine_stagedList, "f").querySelectorAll('li');
                const updatedStagedItemList = Array.prototype.filter.call(stagedItemList, (item) => {
                    var _a;
                    if (((_a = item.dataset) === null || _a === void 0 ? void 0 : _a.item) === (unstagedBtn === null || unstagedBtn === void 0 ? void 0 : unstagedBtn.id)) {
                        const quantityItem = item.querySelector('.num-counter');
                        if (typeof quantityItem.textContent !== 'string') {
                            return;
                        }
                        const quantity = parseInt(quantityItem.textContent);
                        if (!__classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent) {
                            return;
                        }
                        let currentBalance = parseInt(__classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent.replaceAll(',', ''));
                        if (!item.dataset.price) {
                            return;
                        }
                        currentBalance += parseInt(item.dataset.price) * quantity;
                        __classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent = (0,_util_numberFormat__WEBPACK_IMPORTED_MODULE_0__["default"])(currentBalance);
                    }
                    return item.dataset.item !== unstagedBtn.id;
                });
                updatedStagedItemList.forEach((list) => docFrag.appendChild(list));
                __classPrivateFieldGet(this, _VendingMachine_stagedList, "f").innerHTML = '';
                __classPrivateFieldGet(this, _VendingMachine_stagedList, "f").append(docFrag);
            }
        });
        __classPrivateFieldGet(this, _VendingMachine_btnPut, "f").addEventListener('click', () => {
            if (typeof __classPrivateFieldGet(this, _VendingMachine_inputCostEl, "f").value !== 'string') {
                return;
            }
            if (typeof __classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent !== 'string') {
                return;
            }
            if (typeof __classPrivateFieldGet(this, _VendingMachine_myMoney, "f").textContent !== 'string') {
                return;
            }
            const inputCost = parseInt(__classPrivateFieldGet(this, _VendingMachine_inputCostEl, "f").value);
            const myMoneyVal = parseInt(__classPrivateFieldGet(this, _VendingMachine_myMoney, "f").textContent.replaceAll(',', ''));
            const balanceVal = parseInt(__classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent.replaceAll(',', ''));
            if (!inputCost) {
                return;
            }
            if (inputCost <= myMoneyVal) {
                const changedValue = myMoneyVal - inputCost;
                __classPrivateFieldGet(this, _VendingMachine_myMoney, "f").textContent = (0,_util_numberFormat__WEBPACK_IMPORTED_MODULE_0__["default"])(changedValue) + ' 원';
                __classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent = (0,_util_numberFormat__WEBPACK_IMPORTED_MODULE_0__["default"])((balanceVal ? balanceVal : 0) + inputCost);
            }
            else {
                alert('소지금이 부족합니다.');
            }
        });
        __classPrivateFieldGet(this, _VendingMachine_btnReturn, "f").addEventListener('click', () => {
            if (typeof __classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent !== 'string') {
                return;
            }
            if (typeof __classPrivateFieldGet(this, _VendingMachine_myMoney, "f").textContent !== 'string') {
                return;
            }
            const balanceVal = parseInt(__classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent.replaceAll(',', ''));
            const myMoneyVal = parseInt(__classPrivateFieldGet(this, _VendingMachine_myMoney, "f").textContent.replaceAll(',', ''));
            if (balanceVal) {
                const returnMoney = balanceVal + myMoneyVal;
                __classPrivateFieldGet(this, _VendingMachine_myMoney, "f").textContent = (0,_util_numberFormat__WEBPACK_IMPORTED_MODULE_0__["default"])(returnMoney) + '원';
                __classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent = '0';
            }
            else {
                alert('반환될 거스름돈이 없습니다.');
            }
        });
        const btnsCola = __classPrivateFieldGet(this, _VendingMachine_itemList, "f").querySelectorAll('button');
        btnsCola.forEach((item) => {
            item.addEventListener('click', (e) => {
                const targetEl = e.currentTarget;
                if (!__classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent) {
                    return;
                }
                const balanceVal = parseInt(__classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent.replaceAll(',', ''));
                let isStaged = false;
                if (!targetEl.dataset.price) {
                    return;
                }
                const targetElPrice = parseInt(targetEl.dataset.price);
                const stagedListItem = __classPrivateFieldGet(this, _VendingMachine_stagedList, "f").querySelectorAll('li');
                if (balanceVal >= targetElPrice) {
                    const withdraw = balanceVal - targetElPrice;
                    __classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent = (0,_util_numberFormat__WEBPACK_IMPORTED_MODULE_0__["default"])(withdraw);
                    for (const item of stagedListItem) {
                        if (!item.dataset.item || !targetEl.dataset.item) {
                            return;
                        }
                        if (item.dataset.item === targetEl.dataset.item) {
                            let quantityItem = item.querySelector('.num-counter');
                            if (typeof quantityItem.textContent !== 'string') {
                                return;
                            }
                            quantityItem.textContent = `${parseInt(quantityItem.textContent) + 1}`;
                            isStaged = true;
                            break;
                        }
                    }
                    if (!isStaged) {
                        this.stagedItemGenerator(targetEl);
                    }
                    if (targetEl.dataset.count) {
                        let targetCount = parseInt(targetEl.dataset.count);
                        targetCount -= 1;
                        targetEl.dataset.count = `${targetCount}`;
                    }
                    if (!targetEl.dataset.count) {
                        return;
                    }
                    if (parseInt(targetEl.dataset.count) === 0) {
                        if (!targetEl.parentElement) {
                            return;
                        }
                        targetEl.parentElement.classList.add('sold-out');
                        const warning = document.createElement('em');
                        warning.textContent = '해당 상품은 품절입니다.';
                        warning.classList.add('ir');
                        targetEl.parentElement.insertBefore(warning, targetEl);
                    }
                }
                else {
                    alert('잔액이 부족합니다! 입금해주세요~');
                }
            });
        });
        __classPrivateFieldGet(this, _VendingMachine_btnGet, "f").addEventListener('click', () => {
            let isGot = false;
            let totalPrice = 0;
            __classPrivateFieldGet(this, _VendingMachine_stagedList, "f")
                .querySelectorAll('li')
                .forEach((itemStaged) => {
                if (!itemStaged.dataset.item) {
                    return;
                }
                __classPrivateFieldGet(this, _VendingMachine_gotList, "f")
                    .querySelectorAll('li')
                    .forEach((itemGot) => {
                    if (!itemGot.dataset.item) {
                        return;
                    }
                    if (itemStaged.dataset.item === itemGot.dataset.item) {
                        let itemGotCount = itemGot.querySelector('.num-counter');
                        const stagedQuantity = itemStaged.querySelector('.num-counter');
                        if (!itemGotCount.textContent || !stagedQuantity.textContent) {
                            return;
                        }
                        itemGotCount.textContent = `${parseInt(itemGotCount.textContent) +
                            parseInt(stagedQuantity.textContent)}`;
                        isGot = true;
                    }
                });
                if (!isGot) {
                    __classPrivateFieldGet(this, _VendingMachine_gotList, "f").appendChild(itemStaged);
                }
            });
            __classPrivateFieldGet(this, _VendingMachine_stagedList, "f").querySelectorAll('li').forEach((item) => {
                if (!item.dataset.price) {
                    return;
                }
                if (!item.querySelector('.num-counter')) {
                    return;
                }
                const itemQuantityEl = item.querySelector('.num-counter');
                const itemPrice = parseInt(item.dataset.price);
                const itemQuantity = parseInt(itemQuantityEl.textContent || '0');
                totalPrice += itemPrice * itemQuantity;
            });
            __classPrivateFieldGet(this, _VendingMachine_txtTotal, "f").textContent = (0,_util_numberFormat__WEBPACK_IMPORTED_MODULE_0__["default"])(totalPrice);
        });
    }
}
_VendingMachine_balance = new WeakMap(), _VendingMachine_itemList = new WeakMap(), _VendingMachine_inputCostEl = new WeakMap(), _VendingMachine_btnPut = new WeakMap(), _VendingMachine_btnReturn = new WeakMap(), _VendingMachine_btnGet = new WeakMap(), _VendingMachine_stagedList = new WeakMap(), _VendingMachine_myMoney = new WeakMap(), _VendingMachine_gotList = new WeakMap(), _VendingMachine_txtTotal = new WeakMap();


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

/***/ }),

/***/ "./src/types/typeGuard/isColaItem.ts":
/*!*******************************************!*\
  !*** ./src/types/typeGuard/isColaItem.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isColaItem": () => (/* binding */ isColaItem)
/* harmony export */ });
const isColaItem = (item) => {
    return item.name !== undefined;
};


/***/ }),

/***/ "./src/util/numberFormat.ts":
/*!**********************************!*\
  !*** ./src/util/numberFormat.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ numberFormat)
/* harmony export */ });
function numberFormat(num) {
    return new Intl.NumberFormat().format(num);
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUMyRDtBQUU1QyxNQUFNLGFBQWE7SUFHaEM7UUFGQSwwQ0FBNEI7UUFHMUIsMkJBQUksMkJBQWEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQXFCLE9BQUM7SUFDNUUsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQW1DO1FBQ3hELE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUNyQixzRkFBc0YsQ0FDdkYsQ0FBQztRQUNGLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBZSxDQUFDO1lBQzlDLElBQUksdUVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hCO1NBQ0Y7YUFBTTtZQUNMLElBQUksS0FBSyxDQUFDLGtCQUFrQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFTyxXQUFXLENBQUMsSUFBZ0IsQ0FBQyxlQUFlO1FBQ2xELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRWxELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFZLEVBQUUsRUFBRTtZQUM1QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFDLE1BQU0sWUFBWSxHQUFHOzs7Ozs7U0FNbEIsQ0FBQztZQUVKLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1lBRTlCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFzQixDQUFDO1lBQ3hFLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUVoQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBcUIsQ0FBQztZQUNwRSxPQUFPLENBQUMsR0FBRyxHQUFHLG9CQUFvQixFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFM0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQWdCLENBQUM7WUFDakUsU0FBUyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBRWhDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFvQixDQUFDO1lBQ3hFLFdBQVcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUM7WUFFeEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQiwyQkFBSSwrQkFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRStDO0FBRWpDLE1BQU0sY0FBYztJQVlqQztRQVhBLDBDQUEwQjtRQUMxQiwyQ0FBNEI7UUFDNUIsOENBQStCO1FBQy9CLHlDQUEyQjtRQUMzQiw0Q0FBOEI7UUFDOUIseUNBQTJCO1FBQzNCLDZDQUE4QjtRQUM5QiwwQ0FBMEI7UUFDMUIsMENBQTJCO1FBQzNCLDJDQUF1QjtRQUdyQixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQyxrQkFBa0IsQ0FDSixDQUFDO1FBQ2pCLDJCQUFJLDJCQUFZLGNBQWMsQ0FBQyxhQUFhLENBQzFDLGNBQWMsQ0FDSSxPQUFDO1FBQ3JCLDJCQUFJLDRCQUFhLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFxQixPQUFDO1FBQzFFLDJCQUFJLCtCQUFnQixjQUFjLENBQUMsYUFBYSxDQUM5QyxVQUFVLENBQ1MsT0FBQztRQUN0QiwyQkFBSSwwQkFBVyxjQUFjLENBQUMsYUFBYSxDQUN6QyxVQUFVLENBQ1UsT0FBQztRQUN2QiwyQkFBSSw2QkFBYyxjQUFjLENBQUMsYUFBYSxDQUM1QyxhQUFhLENBQ08sT0FBQztRQUN2QiwyQkFBSSwwQkFBVyxjQUFjLENBQUMsYUFBYSxDQUN6QyxVQUFVLENBQ1UsT0FBQztRQUN2QiwyQkFBSSw4QkFBZSxjQUFjLENBQUMsYUFBYSxDQUM3QyxtQkFBbUIsQ0FDQSxPQUFDO1FBRXRCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFnQixDQUFDO1FBQ2pFLDJCQUFJLDJCQUFZLE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFvQixPQUFDO1FBQ3hFLDJCQUFJLDJCQUFZLE1BQU0sQ0FBQyxhQUFhLENBQ2xDLG1CQUFtQixDQUNBLE9BQUM7UUFDdEIsMkJBQUksNEJBQWEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQWdCLE9BQUM7SUFDckUsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLG1CQUFtQixDQUFDLE1BQW1CO1FBQzdDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQztRQUN2RCxVQUFVLENBQUMsU0FBUyxHQUFHOzs7Ozs7O0tBT3RCLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUMxQyxlQUFlLENBQ0UsQ0FBQztRQUNwQixXQUFXLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUxQyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBcUIsQ0FBQztRQUMxRSxPQUFPLENBQUMsR0FBRyxHQUFHLG9CQUFvQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRXZELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFnQixDQUFDO1FBQ3ZFLFNBQVMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRWxELE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQzNDLGNBQWMsQ0FDSSxDQUFDO1FBQ3JCLFlBQVksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBRS9CLDJCQUFJLGtDQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxVQUFVO1FBQ2hCLDJCQUFJLGtDQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYSxFQUFFLEVBQUU7WUFDM0QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQXFCLENBQUM7WUFDekMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUNsRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDbEQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQStCLENBQUM7Z0JBQzdELE1BQU0sY0FBYyxHQUFHLDJCQUFJLGtDQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRS9ELE1BQU0scUJBQXFCLEdBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFtQixFQUFFLEVBQUU7O29CQUNsRSxJQUFJLFdBQUksQ0FBQyxPQUFPLDBDQUFFLElBQUksT0FBSyxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsRUFBRSxHQUFFO3dCQUMxQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUNyQyxjQUFjLENBQ0ksQ0FBQzt3QkFFckIsSUFBSSxPQUFPLFlBQVksQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFOzRCQUNoRCxPQUFPO3lCQUNSO3dCQUNELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBRXBELElBQUksQ0FBQywyQkFBSSwrQkFBUyxDQUFDLFdBQVcsRUFBRTs0QkFDOUIsT0FBTzt5QkFDUjt3QkFFRCxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQzNCLDJCQUFJLCtCQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQzlDLENBQUM7d0JBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFOzRCQUN2QixPQUFPO3lCQUNSO3dCQUNELGNBQWMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUM7d0JBRTFELDJCQUFJLCtCQUFTLENBQUMsV0FBVyxHQUFHLDhEQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7cUJBQzFEO29CQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLENBQUM7Z0JBRUwscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBbUIsRUFBRSxFQUFFLENBQ3BELE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQzFCLENBQUM7Z0JBRUYsMkJBQUksa0NBQVksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNoQywyQkFBSSxrQ0FBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQUksOEJBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQzFDLElBQUksT0FBTywyQkFBSSxtQ0FBYSxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQy9DLE9BQU87YUFDUjtZQUNELElBQUksT0FBTywyQkFBSSwrQkFBUyxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0JBQ2pELE9BQU87YUFDUjtZQUNELElBQUksT0FBTywyQkFBSSwrQkFBUyxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0JBQ2pELE9BQU87YUFDUjtZQUVELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQywyQkFBSSxtQ0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FDekIsMkJBQUksK0JBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDOUMsQ0FBQztZQUNGLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FDekIsMkJBQUksK0JBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDOUMsQ0FBQztZQUVGLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2QsT0FBTzthQUNSO1lBRUQsSUFBSSxTQUFTLElBQUksVUFBVSxFQUFFO2dCQUMzQixNQUFNLFlBQVksR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDO2dCQUM1QywyQkFBSSwrQkFBUyxDQUFDLFdBQVcsR0FBRyw4REFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDOUQsMkJBQUksK0JBQVMsQ0FBQyxXQUFXLEdBQUcsOERBQVksQ0FDdEMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUMxQyxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBSSxpQ0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDN0MsSUFBSSxPQUFPLDJCQUFJLCtCQUFTLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtnQkFDakQsT0FBTzthQUNSO1lBQ0QsSUFBSSxPQUFPLDJCQUFJLCtCQUFTLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtnQkFDakQsT0FBTzthQUNSO1lBRUQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUN6QiwyQkFBSSwrQkFBUyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUM5QyxDQUFDO1lBQ0YsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUN6QiwyQkFBSSwrQkFBUyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUM5QyxDQUFDO1lBRUYsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsTUFBTSxXQUFXLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDNUMsMkJBQUksK0JBQVMsQ0FBQyxXQUFXLEdBQUcsOERBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQzVELDJCQUFJLCtCQUFTLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsMkJBQUksZ0NBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBdUIsRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFhLEVBQUUsRUFBRTtnQkFDL0MsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGFBQWtDLENBQUM7Z0JBRXRELElBQUksQ0FBQywyQkFBSSwrQkFBUyxDQUFDLFdBQVcsRUFBRTtvQkFDOUIsT0FBTztpQkFDUjtnQkFDRCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQ3pCLDJCQUFJLCtCQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQzlDLENBQUM7Z0JBRUYsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQzNCLE9BQU87aUJBQ1I7Z0JBQ0QsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sY0FBYyxHQUFHLDJCQUFJLGtDQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRS9ELElBQUksVUFBVSxJQUFJLGFBQWEsRUFBRTtvQkFDL0IsTUFBTSxRQUFRLEdBQUcsVUFBVSxHQUFHLGFBQWEsQ0FBQztvQkFDNUMsMkJBQUksK0JBQVMsQ0FBQyxXQUFXLEdBQUcsOERBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFbkQsS0FBSyxNQUFNLElBQUksSUFBSSxjQUFjLEVBQUU7d0JBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFOzRCQUNoRCxPQUFPO3lCQUNSO3dCQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7NEJBQy9DLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQ25DLGNBQWMsQ0FDQSxDQUFDOzRCQUNqQixJQUFJLE9BQU8sWUFBWSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0NBQ2hELE9BQU87NkJBQ1I7NEJBQ0QsWUFBWSxDQUFDLFdBQVcsR0FBRyxHQUN6QixRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ3ZDLEVBQUUsQ0FBQzs0QkFDSCxRQUFRLEdBQUcsSUFBSSxDQUFDOzRCQUNoQixNQUFNO3lCQUNQO3FCQUNGO29CQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNwQztvQkFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO3dCQUMxQixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDbkQsV0FBVyxJQUFJLENBQUMsQ0FBQzt3QkFDakIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQztxQkFDM0M7b0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO3dCQUMzQixPQUFPO3FCQUNSO29CQUVELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTs0QkFDM0IsT0FBTzt5QkFDUjt3QkFDRCxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBRWpELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzdDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO3dCQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDNUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUN4RDtpQkFDRjtxQkFBTTtvQkFDTCxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztpQkFDN0I7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQUksOEJBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQzFDLElBQUksS0FBSyxHQUFZLEtBQUssQ0FBQztZQUMzQixJQUFJLFVBQVUsR0FBVyxDQUFDLENBQUM7WUFFM0IsMkJBQUksa0NBQVk7aUJBQ2IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO2lCQUN0QixPQUFPLENBQUMsQ0FBQyxVQUF5QixFQUFFLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtvQkFDNUIsT0FBTztpQkFDUjtnQkFFRCwyQkFBSSwrQkFBUztxQkFDVixnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7cUJBQ3RCLE9BQU8sQ0FBQyxDQUFDLE9BQXNCLEVBQUUsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO3dCQUN6QixPQUFPO3FCQUNSO29CQUVELElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7d0JBQ3BELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQ3RDLGNBQWMsQ0FDSSxDQUFDO3dCQUNyQixNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUM3QyxjQUFjLENBQ0ksQ0FBQzt3QkFFckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFOzRCQUM1RCxPQUFPO3lCQUNSO3dCQUVELFlBQVksQ0FBQyxXQUFXLEdBQUcsR0FDekIsUUFBUSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7NEJBQ2xDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUNyQyxFQUFFLENBQUM7d0JBQ0gsS0FBSyxHQUFHLElBQUksQ0FBQztxQkFDZDtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFFTCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLDJCQUFJLCtCQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUN2QztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUwsMkJBQUksa0NBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFtQixFQUFFLEVBQUU7Z0JBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtvQkFDdkIsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRTtvQkFDdkMsT0FBTztpQkFDUjtnQkFDRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUN2QyxjQUFjLENBQ0ksQ0FBQztnQkFFckIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUVqRSxVQUFVLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUVILDJCQUFJLGdDQUFVLENBQUMsV0FBVyxHQUFHLDhEQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2VXNEO0FBQ0U7QUFFekQsTUFBTSxhQUFhLEdBQUcsSUFBSSxpRUFBYSxFQUFFLENBQUM7QUFDMUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxrRUFBYyxFQUFFLENBQUM7QUFFNUMsa0JBQWtCO0FBQ2xCLE1BQU0sYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzVCLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaEIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFTLEVBQXNCLEVBQUU7SUFDMUQsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztBQUNqQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ0phLFNBQVMsWUFBWSxDQUFDLEdBQVc7SUFDOUMsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0MsQ0FBQzs7Ozs7OztVQ0ZEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQSxzR0FBc0c7V0FDdEc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ2hFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy9jb21wb25lbnRzL0NvbGFHZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL2NvbXBvbmVudHMvVmVuZGluZ01hY2hpbmUudHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL3R5cGVzL3R5cGVHdWFyZC9pc0NvbGFJdGVtLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy91dGlsL251bWJlckZvcm1hdC50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDb2xhSXRlbSB9IGZyb20gJy4uL3R5cGVzL2NvbGFJdGVtJztcbmltcG9ydCB7IGlzQ29sYUl0ZW0gfSBmcm9tICcuLi90eXBlcy90eXBlR3VhcmQvaXNDb2xhSXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGFHZW5lcmF0b3Ige1xuICAjaXRlbUxpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy4jaXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgfVxuXG4gIGFzeW5jIHNldHVwKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubG9hZERhdGEoKGpzb24pID0+IHtcbiAgICAgIHRoaXMuY29sYUZhY3RvcnkoanNvbik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWREYXRhKGNhbGxiYWNrOiAoYXJnOiBDb2xhSXRlbVtdKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0p1bHkyNDkvdmVuZGluZ19tYWNoaW5lL21haW4vcHVibGljL2RhdGEvaXRlbS5qc29uJ1xuICAgICk7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgY29uc3QgZGF0YSA9IChhd2FpdCByZXMuanNvbigpKSBhcyBDb2xhSXRlbVtdO1xuICAgICAgaWYgKGlzQ29sYUl0ZW0oZGF0YSkpIHtcbiAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBFcnJvcihgQ29ubmVjdCBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29sYUZhY3RvcnkoZGF0YTogQ29sYUl0ZW1bXSAvKiBKU09OIGRhdGEgKi8pOiB2b2lkIHtcbiAgICBjb25zdCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgZGF0YS5mb3JFYWNoKChlbDogQ29sYUl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgICBjb25zdCBpdGVtVGVtcGxhdGUgPSBgXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4taXRlbVwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBjbGFzcz1cImltZy1pdGVtXCIgLz5cbiAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0aXQtaXRlbVwiPjwvc3Ryb25nPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eHQtcHJpY2VcIj48L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIGA7XG5cbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gaXRlbVRlbXBsYXRlO1xuXG4gICAgICBjb25zdCBidXR0b25JdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYnRuLWl0ZW0nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5pdGVtID0gZWwubmFtZTtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5jb3VudCA9IGAke2VsLmNvdW50fWA7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQucHJpY2UgPSBgJHtlbC5jb3N0fWA7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQuaW1nID0gZWwuaW1nO1xuXG4gICAgICBjb25zdCBpbWdJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuaW1nLWl0ZW0nKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgaW1nSXRlbS5zcmMgPSBgLi9zcmMvYXNzZXRzL2ltZy8ke2VsLmltZ31gO1xuXG4gICAgICBjb25zdCB0aXRsZUl0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50aXQtaXRlbScpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGl0bGVJdGVtLnRleHRDb250ZW50ID0gZWwubmFtZTtcblxuICAgICAgY29uc3QgcHJvZHVjdENvc3QgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50eHQtcHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICBwcm9kdWN0Q29zdC50ZXh0Q29udGVudCA9IGAke2VsLmNvc3R97JuQYDtcblxuICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIHRoaXMuI2l0ZW1MaXN0LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgbnVtYmVyRm9ybWF0IGZyb20gJy4uL3V0aWwvbnVtYmVyRm9ybWF0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVuZGluZ01hY2hpbmUge1xuICAjYmFsYW5jZTogSFRNTFNwYW5FbGVtZW50O1xuICAjaXRlbUxpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gICNpbnB1dENvc3RFbDogSFRNTElucHV0RWxlbWVudDtcbiAgI2J0blB1dDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICNidG5SZXR1cm46IEhUTUxCdXR0b25FbGVtZW50O1xuICAjYnRuR2V0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgI3N0YWdlZExpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gICNteU1vbmV5OiBIVE1MU3BhbkVsZW1lbnQ7XG4gICNnb3RMaXN0OiBIVE1MVUxpc3RFbGVtZW50O1xuICAjdHh0VG90YWw6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHZlbmRpbmdNYWNoaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcudmVuZGluZy1tYWNoaW5lJ1xuICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy4jYmFsYW5jZSA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLnR4dC1iYWxhbmNlJ1xuICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIHRoaXMuI2l0ZW1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbScpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgdGhpcy4jaW5wdXRDb3N0RWwgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5pbnAtcHV0J1xuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLiNidG5QdXQgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5idG4tcHV0J1xuICAgICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgdGhpcy4jYnRuUmV0dXJuID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcuYnRuLXJldHVybidcbiAgICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHRoaXMuI2J0bkdldCA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJ0bi1nZXQnXG4gICAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICB0aGlzLiNzdGFnZWRMaXN0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcubGlzdC1pdGVtLXN0YWdlZCdcbiAgICApIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG5cbiAgICBjb25zdCBteWluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktaW5mbycpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuI215TW9uZXkgPSBteWluZm8ucXVlcnlTZWxlY3RvcignLnR4dC1teW1vbmV5JykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIHRoaXMuI2dvdExpc3QgPSBteWluZm8ucXVlcnlTZWxlY3RvcihcbiAgICAgICcubGlzdC1pdGVtLXN0YWdlZCdcbiAgICApIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgdGhpcy4jdHh0VG90YWwgPSBteWluZm8ucXVlcnlTZWxlY3RvcignLnR4dC10b3RhbCcpIGFzIEhUTUxFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIHNldHVwKCk6IHZvaWQge1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFnZWRJdGVtR2VuZXJhdG9yKHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFnZWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIHN0YWdlZEl0ZW0uZGF0YXNldC5pdGVtID0gdGFyZ2V0LmRhdGFzZXQuaXRlbSB8fCAnJztcbiAgICBzdGFnZWRJdGVtLmRhdGFzZXQucHJpY2UgPSB0YXJnZXQuZGF0YXNldC5wcmljZSB8fCAnMCc7XG4gICAgc3RhZ2VkSXRlbS5pbm5lckhUTUwgPSBgXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1zdGFnZWRcIj5cbiAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBjbGFzcz1cImltZy1pdGVtXCI+XG4gICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0eHQtaXRlbVwiPjwvc3Ryb25nPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm51bS1jb3VudGVyXCI+PC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLXVuc3RhZ2VkXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaXJjbGUtbWludXNcIiBzdHlsZT1cImNvbG9yOiAjZjAzZjNmO1wiPjwvaT48L2Rpdj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIGA7XG5cbiAgICBjb25zdCB1bnN0YWdlZEJ0biA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcihcbiAgICAgICcuYnRuLXVuc3RhZ2VkJ1xuICAgICkgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgdW5zdGFnZWRCdG4uaWQgPSBgJHt0YXJnZXQuZGF0YXNldC5pdGVtfWA7XG5cbiAgICBjb25zdCBpbWdJdGVtID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKCcuaW1nLWl0ZW0nKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIGltZ0l0ZW0uc3JjID0gYC4vc3JjL2Fzc2V0cy9pbWcvJHt0YXJnZXQuZGF0YXNldC5pbWd9YDtcblxuICAgIGNvbnN0IHRpdGxlSXRlbSA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcignLnR4dC1pdGVtJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGl0bGVJdGVtLnRleHRDb250ZW50ID0gdGFyZ2V0LmRhdGFzZXQuaXRlbSB8fCAnJztcblxuICAgIGNvbnN0IHF1YW50aXR5SXRlbSA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcihcbiAgICAgICcubnVtLWNvdW50ZXInXG4gICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgcXVhbnRpdHlJdGVtLnRleHRDb250ZW50ID0gJzEnO1xuXG4gICAgdGhpcy4jc3RhZ2VkTGlzdC5hcHBlbmRDaGlsZChzdGFnZWRJdGVtKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZEV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLiNzdGFnZWRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldEVsID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAodGFyZ2V0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1jaXJjbGUtbWludXMnKSkge1xuICAgICAgICBjb25zdCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCB1bnN0YWdlZEJ0biA9IHRhcmdldEVsLnBhcmVudEVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHN0YWdlZEl0ZW1MaXN0ID0gdGhpcy4jc3RhZ2VkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRTdGFnZWRJdGVtTGlzdDogSFRNTExJRWxlbWVudFtdID1cbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoc3RhZ2VkSXRlbUxpc3QsIChpdGVtOiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Py5pdGVtID09PSB1bnN0YWdlZEJ0bj8uaWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgcXVhbnRpdHlJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVhbnRpdHlJdGVtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9IHBhcnNlSW50KHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCk7XG5cbiAgICAgICAgICAgICAgaWYgKCF0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbGV0IGN1cnJlbnRCYWxhbmNlID0gcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgaWYgKCFpdGVtLmRhdGFzZXQucHJpY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY3VycmVudEJhbGFuY2UgKz0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LnByaWNlKSAqIHF1YW50aXR5O1xuXG4gICAgICAgICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQoY3VycmVudEJhbGFuY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGF0YXNldC5pdGVtICE9PSB1bnN0YWdlZEJ0bi5pZDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB1cGRhdGVkU3RhZ2VkSXRlbUxpc3QuZm9yRWFjaCgobGlzdDogSFRNTExJRWxlbWVudCkgPT5cbiAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGxpc3QpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy4jc3RhZ2VkTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4jc3RhZ2VkTGlzdC5hcHBlbmQoZG9jRnJhZyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNidG5QdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI2lucHV0Q29zdEVsLnZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dENvc3QgPSBwYXJzZUludCh0aGlzLiNpbnB1dENvc3RFbC52YWx1ZSk7XG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSBwYXJzZUludChcbiAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICApO1xuXG4gICAgICBpZiAoIWlucHV0Q29zdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dENvc3QgPD0gbXlNb25leVZhbCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VkVmFsdWUgPSBteU1vbmV5VmFsIC0gaW5wdXRDb3N0O1xuICAgICAgICB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KGNoYW5nZWRWYWx1ZSkgKyAnIOybkCc7XG4gICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQoXG4gICAgICAgICAgKGJhbGFuY2VWYWwgPyBiYWxhbmNlVmFsIDogMCkgKyBpbnB1dENvc3RcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCfshozsp4DquIjsnbQg67aA7KGx7ZWp64uI64ukLicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4jYnRuUmV0dXJuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcblxuICAgICAgaWYgKGJhbGFuY2VWYWwpIHtcbiAgICAgICAgY29uc3QgcmV0dXJuTW9uZXkgPSBiYWxhbmNlVmFsICsgbXlNb25leVZhbDtcbiAgICAgICAgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudCA9IG51bWJlckZvcm1hdChyZXR1cm5Nb25leSkgKyAn7JuQJztcbiAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCA9ICcwJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCfrsJjtmZjrkKAg6rGw7Iqk66aE64+I7J20IOyXhuyKteuLiOuLpC4nKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGJ0bnNDb2xhID0gdGhpcy4jaXRlbUxpc3QucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5cbiAgICBidG5zQ29sYS5mb3JFYWNoKChpdGVtOiBIVE1MQnV0dG9uRWxlbWVudCkgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgICAgIGlmICghdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiYWxhbmNlVmFsID0gcGFyc2VJbnQoXG4gICAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IGlzU3RhZ2VkID0gZmFsc2U7XG4gICAgICAgIGlmICghdGFyZ2V0RWwuZGF0YXNldC5wcmljZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YXJnZXRFbFByaWNlID0gcGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5wcmljZSk7XG4gICAgICAgIGNvbnN0IHN0YWdlZExpc3RJdGVtID0gdGhpcy4jc3RhZ2VkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIGlmIChiYWxhbmNlVmFsID49IHRhcmdldEVsUHJpY2UpIHtcbiAgICAgICAgICBjb25zdCB3aXRoZHJhdyA9IGJhbGFuY2VWYWwgLSB0YXJnZXRFbFByaWNlO1xuICAgICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQod2l0aGRyYXcpO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHN0YWdlZExpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uZGF0YXNldC5pdGVtIHx8ICF0YXJnZXRFbC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Lml0ZW0gPT09IHRhcmdldEVsLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICBsZXQgcXVhbnRpdHlJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVhbnRpdHlJdGVtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgPSBgJHtcbiAgICAgICAgICAgICAgICBwYXJzZUludChxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQpICsgMVxuICAgICAgICAgICAgICB9YDtcbiAgICAgICAgICAgICAgaXNTdGFnZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWlzU3RhZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YWdlZEl0ZW1HZW5lcmF0b3IodGFyZ2V0RWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0YXJnZXRFbC5kYXRhc2V0LmNvdW50KSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0Q291bnQgPSBwYXJzZUludCh0YXJnZXRFbC5kYXRhc2V0LmNvdW50KTtcbiAgICAgICAgICAgIHRhcmdldENvdW50IC09IDE7XG4gICAgICAgICAgICB0YXJnZXRFbC5kYXRhc2V0LmNvdW50ID0gYCR7dGFyZ2V0Q291bnR9YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRhcmdldEVsLmRhdGFzZXQuY291bnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5jb3VudCkgPT09IDApIHtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0RWwucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXRFbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NvbGQtb3V0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdlbScpO1xuICAgICAgICAgICAgd2FybmluZy50ZXh0Q29udGVudCA9ICftlbTri7kg7IOB7ZKI7J2AIO2SiOygiOyeheuLiOuLpC4nO1xuICAgICAgICAgICAgd2FybmluZy5jbGFzc0xpc3QuYWRkKCdpcicpO1xuICAgICAgICAgICAgdGFyZ2V0RWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUod2FybmluZywgdGFyZ2V0RWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydCgn7J6U7JWh7J20IOu2gOyhse2VqeuLiOuLpCEg7J6F6riI7ZW07KO87IS47JqUficpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuI2J0bkdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCBpc0dvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHRvdGFsUHJpY2U6IG51bWJlciA9IDA7XG5cbiAgICAgIHRoaXMuI3N0YWdlZExpc3RcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAgICAgLmZvckVhY2goKGl0ZW1TdGFnZWQ6IEhUTUxMSUVsZW1lbnQpID0+IHtcbiAgICAgICAgICBpZiAoIWl0ZW1TdGFnZWQuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4jZ290TGlzdFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAgICAgICAgIC5mb3JFYWNoKChpdGVtR290OiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICghaXRlbUdvdC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoaXRlbVN0YWdlZC5kYXRhc2V0Lml0ZW0gPT09IGl0ZW1Hb3QuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1Hb3RDb3VudCA9IGl0ZW1Hb3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhZ2VkUXVhbnRpdHkgPSBpdGVtU3RhZ2VkLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAnLm51bS1jb3VudGVyJ1xuICAgICAgICAgICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtR290Q291bnQudGV4dENvbnRlbnQgfHwgIXN0YWdlZFF1YW50aXR5LnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbUdvdENvdW50LnRleHRDb250ZW50ID0gYCR7XG4gICAgICAgICAgICAgICAgICBwYXJzZUludChpdGVtR290Q291bnQudGV4dENvbnRlbnQpICtcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHN0YWdlZFF1YW50aXR5LnRleHRDb250ZW50KVxuICAgICAgICAgICAgICAgIH1gO1xuICAgICAgICAgICAgICAgIGlzR290ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIWlzR290KSB7XG4gICAgICAgICAgICB0aGlzLiNnb3RMaXN0LmFwcGVuZENoaWxkKGl0ZW1TdGFnZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI3N0YWdlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKChpdGVtOiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmICghaXRlbS5kYXRhc2V0LnByaWNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5udW0tY291bnRlcicpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1RdWFudGl0eUVsID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgIGNvbnN0IGl0ZW1QcmljZSA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5wcmljZSk7XG4gICAgICAgIGNvbnN0IGl0ZW1RdWFudGl0eSA9IHBhcnNlSW50KGl0ZW1RdWFudGl0eUVsLnRleHRDb250ZW50IHx8ICcwJyk7XG5cbiAgICAgICAgdG90YWxQcmljZSArPSBpdGVtUHJpY2UgKiBpdGVtUXVhbnRpdHk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy4jdHh0VG90YWwudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQodG90YWxQcmljZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBDb2xhR2VuZXJhdG9yIGZyb20gJy4vY29tcG9uZW50cy9Db2xhR2VuZXJhdG9yJztcbmltcG9ydCBWZW5kaW5nTWFjaGluZSBmcm9tICcuL2NvbXBvbmVudHMvVmVuZGluZ01hY2hpbmUnO1xuXG5jb25zdCBjb2xhR2VuZXJhdG9yID0gbmV3IENvbGFHZW5lcmF0b3IoKTtcbmNvbnN0IHZlbmRpbmdNYWNoaW5lID0gbmV3IFZlbmRpbmdNYWNoaW5lKCk7XG5cbi8vIFRvcC1sZXZlbCBhd2FpdFxuYXdhaXQgY29sYUdlbmVyYXRvci5zZXR1cCgpO1xudmVuZGluZ01hY2hpbmUuc2V0dXAoKTtcbiIsImltcG9ydCB0eXBlIHsgQ29sYUl0ZW0gfSBmcm9tICcuLi9jb2xhSXRlbSc7XG5cbmV4cG9ydCBjb25zdCBpc0NvbGFJdGVtID0gKGl0ZW06IGFueSk6IGl0ZW0gaXMgQ29sYUl0ZW1bXSA9PiB7XG4gIHJldHVybiBpdGVtLm5hbWUgIT09IHVuZGVmaW5lZDtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBudW1iZXJGb3JtYXQobnVtOiBudW1iZXIpIHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgpLmZvcm1hdChudW0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciB3ZWJwYWNrUXVldWVzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBxdWV1ZXNcIikgOiBcIl9fd2VicGFja19xdWV1ZXNfX1wiO1xudmFyIHdlYnBhY2tFeHBvcnRzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBleHBvcnRzXCIpIDogXCJfX3dlYnBhY2tfZXhwb3J0c19fXCI7XG52YXIgd2VicGFja0Vycm9yID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBlcnJvclwiKSA6IFwiX193ZWJwYWNrX2Vycm9yX19cIjtcbnZhciByZXNvbHZlUXVldWUgPSAocXVldWUpID0+IHtcblx0aWYocXVldWUgJiYgIXF1ZXVlLmQpIHtcblx0XHRxdWV1ZS5kID0gMTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSkpO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tID8gZm4ucisrIDogZm4oKSkpO1xuXHR9XG59XG52YXIgd3JhcERlcHMgPSAoZGVwcykgPT4gKGRlcHMubWFwKChkZXApID0+IHtcblx0aWYoZGVwICE9PSBudWxsICYmIHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpIHtcblx0XHRpZihkZXBbd2VicGFja1F1ZXVlc10pIHJldHVybiBkZXA7XG5cdFx0aWYoZGVwLnRoZW4pIHtcblx0XHRcdHZhciBxdWV1ZSA9IFtdO1xuXHRcdFx0cXVldWUuZCA9IDA7XG5cdFx0XHRkZXAudGhlbigocikgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0V4cG9ydHNdID0gcjtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0sIChlKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXJyb3JdID0gZTtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIG9iaiA9IHt9O1xuXHRcdFx0b2JqW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAoZm4ocXVldWUpKTtcblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fVxuXHR9XG5cdHZhciByZXQgPSB7fTtcblx0cmV0W3dlYnBhY2tRdWV1ZXNdID0geCA9PiB7fTtcblx0cmV0W3dlYnBhY2tFeHBvcnRzXSA9IGRlcDtcblx0cmV0dXJuIHJldDtcbn0pKTtcbl9fd2VicGFja19yZXF1aXJlX18uYSA9IChtb2R1bGUsIGJvZHksIGhhc0F3YWl0KSA9PiB7XG5cdHZhciBxdWV1ZTtcblx0aGFzQXdhaXQgJiYgKChxdWV1ZSA9IFtdKS5kID0gMSk7XG5cdHZhciBkZXBRdWV1ZXMgPSBuZXcgU2V0KCk7XG5cdHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cdHZhciBjdXJyZW50RGVwcztcblx0dmFyIG91dGVyUmVzb2x2ZTtcblx0dmFyIHJlamVjdDtcblx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cdFx0cmVqZWN0ID0gcmVqO1xuXHRcdG91dGVyUmVzb2x2ZSA9IHJlc29sdmU7XG5cdH0pO1xuXHRwcm9taXNlW3dlYnBhY2tFeHBvcnRzXSA9IGV4cG9ydHM7XG5cdHByb21pc2Vbd2VicGFja1F1ZXVlc10gPSAoZm4pID0+IChxdWV1ZSAmJiBmbihxdWV1ZSksIGRlcFF1ZXVlcy5mb3JFYWNoKGZuKSwgcHJvbWlzZVtcImNhdGNoXCJdKHggPT4ge30pKTtcblx0bW9kdWxlLmV4cG9ydHMgPSBwcm9taXNlO1xuXHRib2R5KChkZXBzKSA9PiB7XG5cdFx0Y3VycmVudERlcHMgPSB3cmFwRGVwcyhkZXBzKTtcblx0XHR2YXIgZm47XG5cdFx0dmFyIGdldFJlc3VsdCA9ICgpID0+IChjdXJyZW50RGVwcy5tYXAoKGQpID0+IHtcblx0XHRcdGlmKGRbd2VicGFja0Vycm9yXSkgdGhyb3cgZFt3ZWJwYWNrRXJyb3JdO1xuXHRcdFx0cmV0dXJuIGRbd2VicGFja0V4cG9ydHNdO1xuXHRcdH0pKVxuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGZuID0gKCkgPT4gKHJlc29sdmUoZ2V0UmVzdWx0KSk7XG5cdFx0XHRmbi5yID0gMDtcblx0XHRcdHZhciBmblF1ZXVlID0gKHEpID0+IChxICE9PSBxdWV1ZSAmJiAhZGVwUXVldWVzLmhhcyhxKSAmJiAoZGVwUXVldWVzLmFkZChxKSwgcSAmJiAhcS5kICYmIChmbi5yKyssIHEucHVzaChmbikpKSk7XG5cdFx0XHRjdXJyZW50RGVwcy5tYXAoKGRlcCkgPT4gKGRlcFt3ZWJwYWNrUXVldWVzXShmblF1ZXVlKSkpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBmbi5yID8gcHJvbWlzZSA6IGdldFJlc3VsdCgpO1xuXHR9LCAoZXJyKSA9PiAoKGVyciA/IHJlamVjdChwcm9taXNlW3dlYnBhY2tFcnJvcl0gPSBlcnIpIDogb3V0ZXJSZXNvbHZlKGV4cG9ydHMpKSwgcmVzb2x2ZVF1ZXVlKHF1ZXVlKSkpO1xuXHRxdWV1ZSAmJiAocXVldWUuZCA9IDApO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=