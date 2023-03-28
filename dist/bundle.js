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
            console.log((0,_types_typeGuard_isColaItem__WEBPACK_IMPORTED_MODULE_0__.isColaItem)(data));
            if ((0,_types_typeGuard_isColaItem__WEBPACK_IMPORTED_MODULE_0__.isColaItem)(data)) {
                callback(data);
                console.log(data);
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
    if (!Array.isArray(item))
        return false;
    if (item.length === 0)
        return false;
    if (item[0].name === undefined)
        return false;
    if (item[0].cost === undefined)
        return false;
    if (item[0].count === undefined)
        return false;
    if (item[0].img === undefined)
        return false;
    return true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQSxzR0FBc0c7V0FDdEc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ2hFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy9jb21wb25lbnRzL0NvbGFHZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL2NvbXBvbmVudHMvVmVuZGluZ01hY2hpbmUudHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL3R5cGVzL3R5cGVHdWFyZC9pc0NvbGFJdGVtLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy91dGlsL251bWJlckZvcm1hdC50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDb2xhSXRlbSB9IGZyb20gJy4uL3R5cGVzL2NvbGFJdGVtJztcbmltcG9ydCB7IGlzQ29sYUl0ZW0gfSBmcm9tICcuLi90eXBlcy90eXBlR3VhcmQvaXNDb2xhSXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGFHZW5lcmF0b3Ige1xuICAjaXRlbUxpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy4jaXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgfVxuXG4gIGFzeW5jIHNldHVwKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubG9hZERhdGEoKGpzb24pID0+IHtcbiAgICAgIHRoaXMuY29sYUZhY3RvcnkoanNvbik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWREYXRhKGNhbGxiYWNrOiAoYXJnOiBDb2xhSXRlbVtdKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0p1bHkyNDkvdmVuZGluZ19tYWNoaW5lL21haW4vcHVibGljL2RhdGEvaXRlbS5qc29uJ1xuICAgICk7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgY29uc3QgZGF0YSA9IChhd2FpdCByZXMuanNvbigpKSBhcyBDb2xhSXRlbVtdO1xuICAgICAgY29uc29sZS5sb2coaXNDb2xhSXRlbShkYXRhKSk7XG4gICAgICBpZiAoaXNDb2xhSXRlbShkYXRhKSkge1xuICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBFcnJvcihgQ29ubmVjdCBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29sYUZhY3RvcnkoZGF0YTogQ29sYUl0ZW1bXSAvKiBKU09OIGRhdGEgKi8pOiB2b2lkIHtcbiAgICBjb25zdCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgZGF0YS5mb3JFYWNoKChlbDogQ29sYUl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgICBjb25zdCBpdGVtVGVtcGxhdGUgPSBgXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4taXRlbVwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBjbGFzcz1cImltZy1pdGVtXCIgLz5cbiAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0aXQtaXRlbVwiPjwvc3Ryb25nPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eHQtcHJpY2VcIj48L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIGA7XG5cbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gaXRlbVRlbXBsYXRlO1xuXG4gICAgICBjb25zdCBidXR0b25JdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYnRuLWl0ZW0nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5pdGVtID0gZWwubmFtZTtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5jb3VudCA9IGAke2VsLmNvdW50fWA7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQucHJpY2UgPSBgJHtlbC5jb3N0fWA7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQuaW1nID0gZWwuaW1nO1xuXG4gICAgICBjb25zdCBpbWdJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuaW1nLWl0ZW0nKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgaW1nSXRlbS5zcmMgPSBgLi9zcmMvYXNzZXRzL2ltZy8ke2VsLmltZ31gO1xuXG4gICAgICBjb25zdCB0aXRsZUl0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50aXQtaXRlbScpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGl0bGVJdGVtLnRleHRDb250ZW50ID0gZWwubmFtZTtcblxuICAgICAgY29uc3QgcHJvZHVjdENvc3QgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50eHQtcHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICBwcm9kdWN0Q29zdC50ZXh0Q29udGVudCA9IGAke2VsLmNvc3R97JuQYDtcblxuICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIHRoaXMuI2l0ZW1MaXN0LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgbnVtYmVyRm9ybWF0IGZyb20gJy4uL3V0aWwvbnVtYmVyRm9ybWF0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVuZGluZ01hY2hpbmUge1xuICAjYmFsYW5jZTogSFRNTFNwYW5FbGVtZW50O1xuICAjaXRlbUxpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gICNpbnB1dENvc3RFbDogSFRNTElucHV0RWxlbWVudDtcbiAgI2J0blB1dDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICNidG5SZXR1cm46IEhUTUxCdXR0b25FbGVtZW50O1xuICAjYnRuR2V0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgI3N0YWdlZExpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gICNteU1vbmV5OiBIVE1MU3BhbkVsZW1lbnQ7XG4gICNnb3RMaXN0OiBIVE1MVUxpc3RFbGVtZW50O1xuICAjdHh0VG90YWw6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHZlbmRpbmdNYWNoaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcudmVuZGluZy1tYWNoaW5lJ1xuICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy4jYmFsYW5jZSA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLnR4dC1iYWxhbmNlJ1xuICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIHRoaXMuI2l0ZW1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbScpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgdGhpcy4jaW5wdXRDb3N0RWwgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5pbnAtcHV0J1xuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLiNidG5QdXQgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5idG4tcHV0J1xuICAgICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgdGhpcy4jYnRuUmV0dXJuID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcuYnRuLXJldHVybidcbiAgICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHRoaXMuI2J0bkdldCA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJ0bi1nZXQnXG4gICAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICB0aGlzLiNzdGFnZWRMaXN0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcubGlzdC1pdGVtLXN0YWdlZCdcbiAgICApIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG5cbiAgICBjb25zdCBteWluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktaW5mbycpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuI215TW9uZXkgPSBteWluZm8ucXVlcnlTZWxlY3RvcignLnR4dC1teW1vbmV5JykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIHRoaXMuI2dvdExpc3QgPSBteWluZm8ucXVlcnlTZWxlY3RvcihcbiAgICAgICcubGlzdC1pdGVtLXN0YWdlZCdcbiAgICApIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgdGhpcy4jdHh0VG90YWwgPSBteWluZm8ucXVlcnlTZWxlY3RvcignLnR4dC10b3RhbCcpIGFzIEhUTUxFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIHNldHVwKCk6IHZvaWQge1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFnZWRJdGVtR2VuZXJhdG9yKHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFnZWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIHN0YWdlZEl0ZW0uZGF0YXNldC5pdGVtID0gdGFyZ2V0LmRhdGFzZXQuaXRlbSB8fCAnJztcbiAgICBzdGFnZWRJdGVtLmRhdGFzZXQucHJpY2UgPSB0YXJnZXQuZGF0YXNldC5wcmljZSB8fCAnMCc7XG4gICAgc3RhZ2VkSXRlbS5pbm5lckhUTUwgPSBgXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1zdGFnZWRcIj5cbiAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBjbGFzcz1cImltZy1pdGVtXCI+XG4gICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0eHQtaXRlbVwiPjwvc3Ryb25nPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm51bS1jb3VudGVyXCI+PC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLXVuc3RhZ2VkXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaXJjbGUtbWludXNcIiBzdHlsZT1cImNvbG9yOiAjZjAzZjNmO1wiPjwvaT48L2Rpdj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIGA7XG5cbiAgICBjb25zdCB1bnN0YWdlZEJ0biA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcihcbiAgICAgICcuYnRuLXVuc3RhZ2VkJ1xuICAgICkgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgdW5zdGFnZWRCdG4uaWQgPSBgJHt0YXJnZXQuZGF0YXNldC5pdGVtfWA7XG5cbiAgICBjb25zdCBpbWdJdGVtID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKCcuaW1nLWl0ZW0nKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIGltZ0l0ZW0uc3JjID0gYC4vc3JjL2Fzc2V0cy9pbWcvJHt0YXJnZXQuZGF0YXNldC5pbWd9YDtcblxuICAgIGNvbnN0IHRpdGxlSXRlbSA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcignLnR4dC1pdGVtJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGl0bGVJdGVtLnRleHRDb250ZW50ID0gdGFyZ2V0LmRhdGFzZXQuaXRlbSB8fCAnJztcblxuICAgIGNvbnN0IHF1YW50aXR5SXRlbSA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcihcbiAgICAgICcubnVtLWNvdW50ZXInXG4gICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgcXVhbnRpdHlJdGVtLnRleHRDb250ZW50ID0gJzEnO1xuXG4gICAgdGhpcy4jc3RhZ2VkTGlzdC5hcHBlbmRDaGlsZChzdGFnZWRJdGVtKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZEV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLiNzdGFnZWRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldEVsID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAodGFyZ2V0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1jaXJjbGUtbWludXMnKSkge1xuICAgICAgICBjb25zdCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCB1bnN0YWdlZEJ0biA9IHRhcmdldEVsLnBhcmVudEVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHN0YWdlZEl0ZW1MaXN0ID0gdGhpcy4jc3RhZ2VkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRTdGFnZWRJdGVtTGlzdDogSFRNTExJRWxlbWVudFtdID1cbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoc3RhZ2VkSXRlbUxpc3QsIChpdGVtOiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Py5pdGVtID09PSB1bnN0YWdlZEJ0bj8uaWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgcXVhbnRpdHlJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVhbnRpdHlJdGVtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9IHBhcnNlSW50KHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCk7XG5cbiAgICAgICAgICAgICAgaWYgKCF0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbGV0IGN1cnJlbnRCYWxhbmNlID0gcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgaWYgKCFpdGVtLmRhdGFzZXQucHJpY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY3VycmVudEJhbGFuY2UgKz0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LnByaWNlKSAqIHF1YW50aXR5O1xuXG4gICAgICAgICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQoY3VycmVudEJhbGFuY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZGF0YXNldC5pdGVtICE9PSB1bnN0YWdlZEJ0bi5pZDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB1cGRhdGVkU3RhZ2VkSXRlbUxpc3QuZm9yRWFjaCgobGlzdDogSFRNTExJRWxlbWVudCkgPT5cbiAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGxpc3QpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy4jc3RhZ2VkTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4jc3RhZ2VkTGlzdC5hcHBlbmQoZG9jRnJhZyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNidG5QdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI2lucHV0Q29zdEVsLnZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dENvc3QgPSBwYXJzZUludCh0aGlzLiNpbnB1dENvc3RFbC52YWx1ZSk7XG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSBwYXJzZUludChcbiAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICApO1xuXG4gICAgICBpZiAoIWlucHV0Q29zdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dENvc3QgPD0gbXlNb25leVZhbCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VkVmFsdWUgPSBteU1vbmV5VmFsIC0gaW5wdXRDb3N0O1xuICAgICAgICB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KGNoYW5nZWRWYWx1ZSkgKyAnIOybkCc7XG4gICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQoXG4gICAgICAgICAgKGJhbGFuY2VWYWwgPyBiYWxhbmNlVmFsIDogMCkgKyBpbnB1dENvc3RcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCfshozsp4DquIjsnbQg67aA7KGx7ZWp64uI64ukLicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4jYnRuUmV0dXJuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcblxuICAgICAgaWYgKGJhbGFuY2VWYWwpIHtcbiAgICAgICAgY29uc3QgcmV0dXJuTW9uZXkgPSBiYWxhbmNlVmFsICsgbXlNb25leVZhbDtcbiAgICAgICAgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudCA9IG51bWJlckZvcm1hdChyZXR1cm5Nb25leSkgKyAn7JuQJztcbiAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCA9ICcwJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCfrsJjtmZjrkKAg6rGw7Iqk66aE64+I7J20IOyXhuyKteuLiOuLpC4nKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGJ0bnNDb2xhID0gdGhpcy4jaXRlbUxpc3QucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5cbiAgICBidG5zQ29sYS5mb3JFYWNoKChpdGVtOiBIVE1MQnV0dG9uRWxlbWVudCkgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgICAgIGlmICghdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiYWxhbmNlVmFsID0gcGFyc2VJbnQoXG4gICAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IGlzU3RhZ2VkID0gZmFsc2U7XG4gICAgICAgIGlmICghdGFyZ2V0RWwuZGF0YXNldC5wcmljZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YXJnZXRFbFByaWNlID0gcGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5wcmljZSk7XG4gICAgICAgIGNvbnN0IHN0YWdlZExpc3RJdGVtID0gdGhpcy4jc3RhZ2VkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIGlmIChiYWxhbmNlVmFsID49IHRhcmdldEVsUHJpY2UpIHtcbiAgICAgICAgICBjb25zdCB3aXRoZHJhdyA9IGJhbGFuY2VWYWwgLSB0YXJnZXRFbFByaWNlO1xuICAgICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQod2l0aGRyYXcpO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHN0YWdlZExpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uZGF0YXNldC5pdGVtIHx8ICF0YXJnZXRFbC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Lml0ZW0gPT09IHRhcmdldEVsLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICBsZXQgcXVhbnRpdHlJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVhbnRpdHlJdGVtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgPSBgJHtcbiAgICAgICAgICAgICAgICBwYXJzZUludChxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQpICsgMVxuICAgICAgICAgICAgICB9YDtcbiAgICAgICAgICAgICAgaXNTdGFnZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWlzU3RhZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YWdlZEl0ZW1HZW5lcmF0b3IodGFyZ2V0RWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0YXJnZXRFbC5kYXRhc2V0LmNvdW50KSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0Q291bnQgPSBwYXJzZUludCh0YXJnZXRFbC5kYXRhc2V0LmNvdW50KTtcbiAgICAgICAgICAgIHRhcmdldENvdW50IC09IDE7XG4gICAgICAgICAgICB0YXJnZXRFbC5kYXRhc2V0LmNvdW50ID0gYCR7dGFyZ2V0Q291bnR9YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRhcmdldEVsLmRhdGFzZXQuY291bnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5jb3VudCkgPT09IDApIHtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0RWwucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXRFbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NvbGQtb3V0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdlbScpO1xuICAgICAgICAgICAgd2FybmluZy50ZXh0Q29udGVudCA9ICftlbTri7kg7IOB7ZKI7J2AIO2SiOygiOyeheuLiOuLpC4nO1xuICAgICAgICAgICAgd2FybmluZy5jbGFzc0xpc3QuYWRkKCdpcicpO1xuICAgICAgICAgICAgdGFyZ2V0RWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUod2FybmluZywgdGFyZ2V0RWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydCgn7J6U7JWh7J20IOu2gOyhse2VqeuLiOuLpCEg7J6F6riI7ZW07KO87IS47JqUficpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuI2J0bkdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCBpc0dvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHRvdGFsUHJpY2U6IG51bWJlciA9IDA7XG5cbiAgICAgIHRoaXMuI3N0YWdlZExpc3RcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAgICAgLmZvckVhY2goKGl0ZW1TdGFnZWQ6IEhUTUxMSUVsZW1lbnQpID0+IHtcbiAgICAgICAgICBpZiAoIWl0ZW1TdGFnZWQuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4jZ290TGlzdFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAgICAgICAgIC5mb3JFYWNoKChpdGVtR290OiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICghaXRlbUdvdC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoaXRlbVN0YWdlZC5kYXRhc2V0Lml0ZW0gPT09IGl0ZW1Hb3QuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1Hb3RDb3VudCA9IGl0ZW1Hb3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhZ2VkUXVhbnRpdHkgPSBpdGVtU3RhZ2VkLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAnLm51bS1jb3VudGVyJ1xuICAgICAgICAgICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtR290Q291bnQudGV4dENvbnRlbnQgfHwgIXN0YWdlZFF1YW50aXR5LnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbUdvdENvdW50LnRleHRDb250ZW50ID0gYCR7XG4gICAgICAgICAgICAgICAgICBwYXJzZUludChpdGVtR290Q291bnQudGV4dENvbnRlbnQpICtcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHN0YWdlZFF1YW50aXR5LnRleHRDb250ZW50KVxuICAgICAgICAgICAgICAgIH1gO1xuICAgICAgICAgICAgICAgIGlzR290ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIWlzR290KSB7XG4gICAgICAgICAgICB0aGlzLiNnb3RMaXN0LmFwcGVuZENoaWxkKGl0ZW1TdGFnZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI3N0YWdlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKChpdGVtOiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmICghaXRlbS5kYXRhc2V0LnByaWNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5udW0tY291bnRlcicpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1RdWFudGl0eUVsID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgIGNvbnN0IGl0ZW1QcmljZSA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5wcmljZSk7XG4gICAgICAgIGNvbnN0IGl0ZW1RdWFudGl0eSA9IHBhcnNlSW50KGl0ZW1RdWFudGl0eUVsLnRleHRDb250ZW50IHx8ICcwJyk7XG5cbiAgICAgICAgdG90YWxQcmljZSArPSBpdGVtUHJpY2UgKiBpdGVtUXVhbnRpdHk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy4jdHh0VG90YWwudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQodG90YWxQcmljZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBDb2xhR2VuZXJhdG9yIGZyb20gJy4vY29tcG9uZW50cy9Db2xhR2VuZXJhdG9yJztcbmltcG9ydCBWZW5kaW5nTWFjaGluZSBmcm9tICcuL2NvbXBvbmVudHMvVmVuZGluZ01hY2hpbmUnO1xuXG5jb25zdCBjb2xhR2VuZXJhdG9yID0gbmV3IENvbGFHZW5lcmF0b3IoKTtcbmNvbnN0IHZlbmRpbmdNYWNoaW5lID0gbmV3IFZlbmRpbmdNYWNoaW5lKCk7XG5cbi8vIFRvcC1sZXZlbCBhd2FpdFxuYXdhaXQgY29sYUdlbmVyYXRvci5zZXR1cCgpO1xudmVuZGluZ01hY2hpbmUuc2V0dXAoKTtcbiIsImltcG9ydCB0eXBlIHsgQ29sYUl0ZW0gfSBmcm9tICcuLi9jb2xhSXRlbSc7XG5cbmV4cG9ydCBjb25zdCBpc0NvbGFJdGVtID0gKGl0ZW06IGFueSk6IGl0ZW0gaXMgQ29sYUl0ZW1bXSA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShpdGVtKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXRlbS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgaWYgKGl0ZW1bMF0ubmFtZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtWzBdLmNvc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXRlbVswXS5jb3VudCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtWzBdLmltZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG51bWJlckZvcm1hdChudW06IG51bWJlcikge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KG51bSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyIHdlYnBhY2tRdWV1ZXMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIHF1ZXVlc1wiKSA6IFwiX193ZWJwYWNrX3F1ZXVlc19fXCI7XG52YXIgd2VicGFja0V4cG9ydHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGV4cG9ydHNcIikgOiBcIl9fd2VicGFja19leHBvcnRzX19cIjtcbnZhciB3ZWJwYWNrRXJyb3IgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGVycm9yXCIpIDogXCJfX3dlYnBhY2tfZXJyb3JfX1wiO1xudmFyIHJlc29sdmVRdWV1ZSA9IChxdWV1ZSkgPT4ge1xuXHRpZihxdWV1ZSAmJiAhcXVldWUuZCkge1xuXHRcdHF1ZXVlLmQgPSAxO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tKSk7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0gPyBmbi5yKysgOiBmbigpKSk7XG5cdH1cbn1cbnZhciB3cmFwRGVwcyA9IChkZXBzKSA9PiAoZGVwcy5tYXAoKGRlcCkgPT4ge1xuXHRpZihkZXAgIT09IG51bGwgJiYgdHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIikge1xuXHRcdGlmKGRlcFt3ZWJwYWNrUXVldWVzXSkgcmV0dXJuIGRlcDtcblx0XHRpZihkZXAudGhlbikge1xuXHRcdFx0dmFyIHF1ZXVlID0gW107XG5cdFx0XHRxdWV1ZS5kID0gMDtcblx0XHRcdGRlcC50aGVuKChyKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXhwb3J0c10gPSByO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSwgKGUpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFcnJvcl0gPSBlO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgb2JqID0ge307XG5cdFx0XHRvYmpbd2VicGFja1F1ZXVlc10gPSAoZm4pID0+IChmbihxdWV1ZSkpO1xuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9XG5cdH1cblx0dmFyIHJldCA9IHt9O1xuXHRyZXRbd2VicGFja1F1ZXVlc10gPSB4ID0+IHt9O1xuXHRyZXRbd2VicGFja0V4cG9ydHNdID0gZGVwO1xuXHRyZXR1cm4gcmV0O1xufSkpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5hID0gKG1vZHVsZSwgYm9keSwgaGFzQXdhaXQpID0+IHtcblx0dmFyIHF1ZXVlO1xuXHRoYXNBd2FpdCAmJiAoKHF1ZXVlID0gW10pLmQgPSAxKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIChxdWV1ZS5kID0gMCk7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ21vZHVsZScgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==