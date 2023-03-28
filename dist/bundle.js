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
                        // update balance value when unstaged item is clicked and remove item from staged list
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
            // clear input value
            __classPrivateFieldGet(this, _VendingMachine_inputCostEl, "f").value = '';
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
                    if (!targetEl.dataset.count) {
                        return;
                    }
                    let targetCount = parseInt(targetEl.dataset.count);
                    if (targetEl.dataset.count && targetCount > 1) {
                        targetCount -= 1;
                        targetEl.dataset.count = `${targetCount}`;
                    }
                    else if (targetEl.dataset.count && targetCount === 1) {
                        if (!targetEl.parentElement) {
                            return;
                        }
                        targetEl.parentElement.classList.add('sold-out');
                        targetEl.disabled = true;
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
            __classPrivateFieldGet(this, _VendingMachine_stagedList, "f").innerHTML = '';
            __classPrivateFieldGet(this, _VendingMachine_gotList, "f").querySelectorAll('li').forEach((itemGot) => {
                if (!itemGot.dataset.price) {
                    return;
                }
                if (!itemGot.querySelector('.num-counter')) {
                    return;
                }
                const itemGotQuantityEl = itemGot.querySelector('.num-counter');
                const itemGotPrice = parseInt(itemGot.dataset.price);
                const itemGotQuantity = parseInt(itemGotQuantityEl.textContent || '0');
                totalPrice += itemGotPrice * itemGotQuantity;
            });
            __classPrivateFieldGet(this, _VendingMachine_txtTotal, "f").textContent = `총 금액: ${(0,_util_numberFormat__WEBPACK_IMPORTED_MODULE_0__["default"])(totalPrice)}원`;
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
// ColaItem 타입을 가진 배열인지 확인하는 타입 가드
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBLHNHQUFzRztXQUN0RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDaEVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL2NvbXBvbmVudHMvQ29sYUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvY29tcG9uZW50cy9WZW5kaW5nTWFjaGluZS50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvdHlwZXMvdHlwZUd1YXJkL2lzQ29sYUl0ZW0udHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL3V0aWwvbnVtYmVyRm9ybWF0LnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2FzeW5jIG1vZHVsZSIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENvbGFJdGVtIH0gZnJvbSAnLi4vdHlwZXMvY29sYUl0ZW0nO1xuaW1wb3J0IHsgaXNDb2xhSXRlbSB9IGZyb20gJy4uL3R5cGVzL3R5cGVHdWFyZC9pc0NvbGFJdGVtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sYUdlbmVyYXRvciB7XG4gICNpdGVtTGlzdDogSFRNTFVMaXN0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLiNpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWl0ZW0nKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICB9XG5cbiAgYXN5bmMgc2V0dXAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgoanNvbikgPT4ge1xuICAgICAgdGhpcy5jb2xhRmFjdG9yeShqc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZERhdGEoY2FsbGJhY2s6IChhcmc6IENvbGFJdGVtW10pID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcbiAgICAgICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vSnVseTI0OS92ZW5kaW5nX21hY2hpbmUvbWFpbi9wdWJsaWMvZGF0YS9pdGVtLmpzb24nXG4gICAgKTtcbiAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICBjb25zdCBkYXRhID0gKGF3YWl0IHJlcy5qc29uKCkpIGFzIENvbGFJdGVtW107XG4gICAgICBpZiAoaXNDb2xhSXRlbShkYXRhKSkge1xuICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IEVycm9yKGBDb25uZWN0IEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb2xhRmFjdG9yeShkYXRhOiBDb2xhSXRlbVtdIC8qIEpTT04gZGF0YSAqLyk6IHZvaWQge1xuICAgIGNvbnN0IGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBkYXRhLmZvckVhY2goKGVsOiBDb2xhSXRlbSkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICAgIGNvbnN0IGl0ZW1UZW1wbGF0ZSA9IGBcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1pdGVtXCI+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGNsYXNzPVwiaW1nLWl0ZW1cIiAvPlxuICAgICAgICAgICAgPHN0cm9uZyBjbGFzcz1cInRpdC1pdGVtXCI+PC9zdHJvbmc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInR4dC1wcmljZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgYDtcblxuICAgICAgaXRlbS5pbm5lckhUTUwgPSBpdGVtVGVtcGxhdGU7XG5cbiAgICAgIGNvbnN0IGJ1dHRvbkl0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5idG4taXRlbScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0Lml0ZW0gPSBlbC5uYW1lO1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0LmNvdW50ID0gYCR7ZWwuY291bnR9YDtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5wcmljZSA9IGAke2VsLmNvc3R9YDtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5pbWcgPSBlbC5pbWc7XG5cbiAgICAgIGNvbnN0IGltZ0l0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pbWctaXRlbScpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICBpbWdJdGVtLnNyYyA9IGAuL3NyYy9hc3NldHMvaW1nLyR7ZWwuaW1nfWA7XG5cbiAgICAgIGNvbnN0IHRpdGxlSXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRpdC1pdGVtJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0aXRsZUl0ZW0udGV4dENvbnRlbnQgPSBlbC5uYW1lO1xuXG4gICAgICBjb25zdCBwcm9kdWN0Q29zdCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnR4dC1wcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgIHByb2R1Y3RDb3N0LnRleHRDb250ZW50ID0gYCR7ZWwuY29zdH3sm5BgO1xuXG4gICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgdGhpcy4jaXRlbUxpc3QuYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBudW1iZXJGb3JtYXQgZnJvbSAnLi4vdXRpbC9udW1iZXJGb3JtYXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZW5kaW5nTWFjaGluZSB7XG4gICNiYWxhbmNlOiBIVE1MU3BhbkVsZW1lbnQ7XG4gICNpdGVtTGlzdDogSFRNTFVMaXN0RWxlbWVudDtcbiAgI2lucHV0Q29zdEVsOiBIVE1MSW5wdXRFbGVtZW50O1xuICAjYnRuUHV0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgI2J0blJldHVybjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICNidG5HZXQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAjc3RhZ2VkTGlzdDogSFRNTFVMaXN0RWxlbWVudDtcbiAgI215TW9uZXk6IEhUTUxTcGFuRWxlbWVudDtcbiAgI2dvdExpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gICN0eHRUb3RhbDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgdmVuZGluZ01hY2hpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy52ZW5kaW5nLW1hY2hpbmUnXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLiNiYWxhbmNlID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcudHh0LWJhbGFuY2UnXG4gICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgdGhpcy4jaXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICB0aGlzLiNpbnB1dENvc3RFbCA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmlucC1wdXQnXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMuI2J0blB1dCA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJ0bi1wdXQnXG4gICAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICB0aGlzLiNidG5SZXR1cm4gPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5idG4tcmV0dXJuJ1xuICAgICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgdGhpcy4jYnRuR2V0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcuYnRuLWdldCdcbiAgICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHRoaXMuI3N0YWdlZExpc3QgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5saXN0LWl0ZW0tc3RhZ2VkJ1xuICAgICkgYXMgSFRNTFVMaXN0RWxlbWVudDtcblxuICAgIGNvbnN0IG15aW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1pbmZvJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy4jbXlNb25leSA9IG15aW5mby5xdWVyeVNlbGVjdG9yKCcudHh0LW15bW9uZXknKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgdGhpcy4jZ290TGlzdCA9IG15aW5mby5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5saXN0LWl0ZW0tc3RhZ2VkJ1xuICAgICkgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICB0aGlzLiN0eHRUb3RhbCA9IG15aW5mby5xdWVyeVNlbGVjdG9yKCcudHh0LXRvdGFsJykgYXMgSFRNTEVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN0YWdlZEl0ZW1HZW5lcmF0b3IodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YWdlZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgc3RhZ2VkSXRlbS5kYXRhc2V0Lml0ZW0gPSB0YXJnZXQuZGF0YXNldC5pdGVtIHx8ICcnO1xuICAgIHN0YWdlZEl0ZW0uZGF0YXNldC5wcmljZSA9IHRhcmdldC5kYXRhc2V0LnByaWNlIHx8ICcwJztcbiAgICBzdGFnZWRJdGVtLmlubmVySFRNTCA9IGBcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLXN0YWdlZFwiPlxuICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGNsYXNzPVwiaW1nLWl0ZW1cIj5cbiAgICAgICAgPHN0cm9uZyBjbGFzcz1cInR4dC1pdGVtXCI+PC9zdHJvbmc+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibnVtLWNvdW50ZXJcIj48L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tdW5zdGFnZWRcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZS1taW51c1wiIHN0eWxlPVwiY29sb3I6ICNmMDNmM2Y7XCI+PC9pPjwvZGl2PlxuICAgICAgPC9idXR0b24+XG4gICAgYDtcblxuICAgIGNvbnN0IHVuc3RhZ2VkQnRuID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5idG4tdW5zdGFnZWQnXG4gICAgKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB1bnN0YWdlZEJ0bi5pZCA9IGAke3RhcmdldC5kYXRhc2V0Lml0ZW19YDtcblxuICAgIGNvbnN0IGltZ0l0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pbWctaXRlbScpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgaW1nSXRlbS5zcmMgPSBgLi9zcmMvYXNzZXRzL2ltZy8ke3RhcmdldC5kYXRhc2V0LmltZ31gO1xuXG4gICAgY29uc3QgdGl0bGVJdGVtID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKCcudHh0LWl0ZW0nKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aXRsZUl0ZW0udGV4dENvbnRlbnQgPSB0YXJnZXQuZGF0YXNldC5pdGVtIHx8ICcnO1xuXG4gICAgY29uc3QgcXVhbnRpdHlJdGVtID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5udW0tY291bnRlcidcbiAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgPSAnMSc7XG5cbiAgICB0aGlzLiNzdGFnZWRMaXN0LmFwcGVuZENoaWxkKHN0YWdlZEl0ZW0pO1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuI3N0YWdlZExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0RWwgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGlmICh0YXJnZXRFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLWNpcmNsZS1taW51cycpKSB7XG4gICAgICAgIGNvbnN0IGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGNvbnN0IHVuc3RhZ2VkQnRuID0gdGFyZ2V0RWwucGFyZW50RWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgY29uc3Qgc3RhZ2VkSXRlbUxpc3QgPSB0aGlzLiNzdGFnZWRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlZFN0YWdlZEl0ZW1MaXN0OiBIVE1MTElFbGVtZW50W10gPVxuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChzdGFnZWRJdGVtTGlzdCwgKGl0ZW06IEhUTUxMSUVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmRhdGFzZXQ/Lml0ZW0gPT09IHVuc3RhZ2VkQnRuPy5pZCkge1xuICAgICAgICAgICAgICAvLyB1cGRhdGUgYmFsYW5jZSB2YWx1ZSB3aGVuIHVuc3RhZ2VkIGl0ZW0gaXMgY2xpY2tlZCBhbmQgcmVtb3ZlIGl0ZW0gZnJvbSBzdGFnZWQgbGlzdFxuICAgICAgICAgICAgICBjb25zdCBxdWFudGl0eUl0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgICAgICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VJbnQocXVhbnRpdHlJdGVtLnRleHRDb250ZW50KTtcblxuICAgICAgICAgICAgICBpZiAoIXRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBsZXQgY3VycmVudEJhbGFuY2UgPSBwYXJzZUludChcbiAgICAgICAgICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBpZiAoIWl0ZW0uZGF0YXNldC5wcmljZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjdXJyZW50QmFsYW5jZSArPSBwYXJzZUludChpdGVtLmRhdGFzZXQucHJpY2UpICogcXVhbnRpdHk7XG5cbiAgICAgICAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCA9IG51bWJlckZvcm1hdChjdXJyZW50QmFsYW5jZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5kYXRhc2V0Lml0ZW0gIT09IHVuc3RhZ2VkQnRuLmlkO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIHVwZGF0ZWRTdGFnZWRJdGVtTGlzdC5mb3JFYWNoKChsaXN0OiBIVE1MTElFbGVtZW50KSA9PlxuICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQobGlzdClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLiNzdGFnZWRMaXN0LmFwcGVuZChkb2NGcmFnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuI2J0blB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy4jaW5wdXRDb3N0RWwudmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlucHV0Q29zdCA9IHBhcnNlSW50KHRoaXMuI2lucHV0Q29zdEVsLnZhbHVlKTtcblxuICAgICAgY29uc3QgbXlNb25leVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG4gICAgICBjb25zdCBiYWxhbmNlVmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcblxuICAgICAgaWYgKCFpbnB1dENvc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5wdXRDb3N0IDw9IG15TW9uZXlWYWwpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlZFZhbHVlID0gbXlNb25leVZhbCAtIGlucHV0Q29zdDtcbiAgICAgICAgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudCA9IG51bWJlckZvcm1hdChjaGFuZ2VkVmFsdWUpICsgJyDsm5AnO1xuICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KFxuICAgICAgICAgIChiYWxhbmNlVmFsID8gYmFsYW5jZVZhbCA6IDApICsgaW5wdXRDb3N0XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydCgn7IaM7KeA6riI7J20IOu2gOyhse2VqeuLiOuLpC4nKTtcbiAgICAgIH1cbiAgICAgIC8vIGNsZWFyIGlucHV0IHZhbHVlXG4gICAgICB0aGlzLiNpbnB1dENvc3RFbC52YWx1ZSA9ICcnO1xuICAgIH0pO1xuXG4gICAgdGhpcy4jYnRuUmV0dXJuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcblxuICAgICAgaWYgKGJhbGFuY2VWYWwpIHtcbiAgICAgICAgY29uc3QgcmV0dXJuTW9uZXkgPSBiYWxhbmNlVmFsICsgbXlNb25leVZhbDtcbiAgICAgICAgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudCA9IG51bWJlckZvcm1hdChyZXR1cm5Nb25leSkgKyAn7JuQJztcbiAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCA9ICcwJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCfrsJjtmZjrkKAg6rGw7Iqk66aE64+I7J20IOyXhuyKteuLiOuLpC4nKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGJ0bnNDb2xhID0gdGhpcy4jaXRlbUxpc3QucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5cbiAgICBidG5zQ29sYS5mb3JFYWNoKChpdGVtOiBIVE1MQnV0dG9uRWxlbWVudCkgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgICAgIGlmICghdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiYWxhbmNlVmFsID0gcGFyc2VJbnQoXG4gICAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IGlzU3RhZ2VkID0gZmFsc2U7XG4gICAgICAgIGlmICghdGFyZ2V0RWwuZGF0YXNldC5wcmljZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YXJnZXRFbFByaWNlID0gcGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5wcmljZSk7XG4gICAgICAgIGNvbnN0IHN0YWdlZExpc3RJdGVtID0gdGhpcy4jc3RhZ2VkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuXG4gICAgICAgIGlmIChiYWxhbmNlVmFsID49IHRhcmdldEVsUHJpY2UpIHtcbiAgICAgICAgICBjb25zdCB3aXRoZHJhdyA9IGJhbGFuY2VWYWwgLSB0YXJnZXRFbFByaWNlO1xuICAgICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQod2l0aGRyYXcpO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHN0YWdlZExpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uZGF0YXNldC5pdGVtIHx8ICF0YXJnZXRFbC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Lml0ZW0gPT09IHRhcmdldEVsLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICBsZXQgcXVhbnRpdHlJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVhbnRpdHlJdGVtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgPSBgJHtcbiAgICAgICAgICAgICAgICBwYXJzZUludChxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQpICsgMVxuICAgICAgICAgICAgICB9YDtcbiAgICAgICAgICAgICAgaXNTdGFnZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWlzU3RhZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YWdlZEl0ZW1HZW5lcmF0b3IodGFyZ2V0RWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGFyZ2V0RWwuZGF0YXNldC5jb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgdGFyZ2V0Q291bnQgPSBwYXJzZUludCh0YXJnZXRFbC5kYXRhc2V0LmNvdW50KTtcblxuICAgICAgICAgIGlmICh0YXJnZXRFbC5kYXRhc2V0LmNvdW50ICYmIHRhcmdldENvdW50ID4gMSkge1xuICAgICAgICAgICAgdGFyZ2V0Q291bnQgLT0gMTtcbiAgICAgICAgICAgIHRhcmdldEVsLmRhdGFzZXQuY291bnQgPSBgJHt0YXJnZXRDb3VudH1gO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0RWwuZGF0YXNldC5jb3VudCAmJiB0YXJnZXRDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKCF0YXJnZXRFbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFyZ2V0RWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzb2xkLW91dCcpO1xuICAgICAgICAgICAgdGFyZ2V0RWwuZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBjb25zdCB3YXJuaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZW0nKTtcbiAgICAgICAgICAgIHdhcm5pbmcudGV4dENvbnRlbnQgPSAn7ZW064u5IOyDge2SiOydgCDtkojsoIjsnoXri4jri6QuJztcbiAgICAgICAgICAgIHdhcm5pbmcuY2xhc3NMaXN0LmFkZCgnaXInKTtcbiAgICAgICAgICAgIHRhcmdldEVsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHdhcm5pbmcsIHRhcmdldEVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ+yelOyVoeydtCDrtoDsobHtlanri4jri6QhIOyeheq4iO2VtOyjvOyEuOyalH4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNidG5HZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgaXNHb3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGxldCB0b3RhbFByaWNlOiBudW1iZXIgPSAwO1xuXG4gICAgICB0aGlzLiNzdGFnZWRMaXN0XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICAgICAgIC5mb3JFYWNoKChpdGVtU3RhZ2VkOiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgICAgaWYgKCFpdGVtU3RhZ2VkLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuI2dvdExpc3RcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaXRlbUdvdDogSFRNTExJRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWl0ZW1Hb3QuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGl0ZW1TdGFnZWQuZGF0YXNldC5pdGVtID09PSBpdGVtR290LmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtR290Q291bnQgPSBpdGVtR290LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAnLm51bS1jb3VudGVyJ1xuICAgICAgICAgICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YWdlZFF1YW50aXR5ID0gaXRlbVN0YWdlZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgICAgICAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGlmICghaXRlbUdvdENvdW50LnRleHRDb250ZW50IHx8ICFzdGFnZWRRdWFudGl0eS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGl0ZW1Hb3RDb3VudC50ZXh0Q29udGVudCA9IGAke1xuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoaXRlbUdvdENvdW50LnRleHRDb250ZW50KSArXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChzdGFnZWRRdWFudGl0eS50ZXh0Q29udGVudClcbiAgICAgICAgICAgICAgICB9YDtcbiAgICAgICAgICAgICAgICBpc0dvdCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKCFpc0dvdCkge1xuICAgICAgICAgICAgdGhpcy4jZ290TGlzdC5hcHBlbmRDaGlsZChpdGVtU3RhZ2VkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB0aGlzLiNzdGFnZWRMaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgICB0aGlzLiNnb3RMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykuZm9yRWFjaCgoaXRlbUdvdDogSFRNTExJRWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW1Hb3QuZGF0YXNldC5wcmljZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXRlbUdvdC5xdWVyeVNlbGVjdG9yKCcubnVtLWNvdW50ZXInKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtR290UXVhbnRpdHlFbCA9IGl0ZW1Hb3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnLm51bS1jb3VudGVyJ1xuICAgICAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcblxuICAgICAgICBjb25zdCBpdGVtR290UHJpY2UgPSBwYXJzZUludChpdGVtR290LmRhdGFzZXQucHJpY2UpO1xuICAgICAgICBjb25zdCBpdGVtR290UXVhbnRpdHkgPSBwYXJzZUludChpdGVtR290UXVhbnRpdHlFbC50ZXh0Q29udGVudCB8fCAnMCcpO1xuXG4gICAgICAgIHRvdGFsUHJpY2UgKz0gaXRlbUdvdFByaWNlICogaXRlbUdvdFF1YW50aXR5O1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI3R4dFRvdGFsLnRleHRDb250ZW50ID0gYOy0nSDquIjslaE6ICR7bnVtYmVyRm9ybWF0KHRvdGFsUHJpY2UpfeybkGA7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBDb2xhR2VuZXJhdG9yIGZyb20gJy4vY29tcG9uZW50cy9Db2xhR2VuZXJhdG9yJztcbmltcG9ydCBWZW5kaW5nTWFjaGluZSBmcm9tICcuL2NvbXBvbmVudHMvVmVuZGluZ01hY2hpbmUnO1xuXG5jb25zdCBjb2xhR2VuZXJhdG9yID0gbmV3IENvbGFHZW5lcmF0b3IoKTtcbmNvbnN0IHZlbmRpbmdNYWNoaW5lID0gbmV3IFZlbmRpbmdNYWNoaW5lKCk7XG5cbi8vIFRvcC1sZXZlbCBhd2FpdFxuYXdhaXQgY29sYUdlbmVyYXRvci5zZXR1cCgpO1xudmVuZGluZ01hY2hpbmUuc2V0dXAoKTtcbiIsImltcG9ydCB0eXBlIHsgQ29sYUl0ZW0gfSBmcm9tICcuLi9jb2xhSXRlbSc7XG5cbi8vIENvbGFJdGVtIO2DgOyeheydhCDqsIDsp4Qg67Cw7Je07J247KeAIO2ZleyduO2VmOuKlCDtg4DsnoUg6rCA65OcXG5leHBvcnQgY29uc3QgaXNDb2xhSXRlbSA9IChpdGVtOiBhbnkpOiBpdGVtIGlzIENvbGFJdGVtW10gPT4ge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbSkpIHJldHVybiBmYWxzZTtcbiAgaWYgKGl0ZW0ubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtWzBdLm5hbWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXRlbVswXS5jb3N0ID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgaWYgKGl0ZW1bMF0uY291bnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXRlbVswXS5pbWcgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBudW1iZXJGb3JtYXQobnVtOiBudW1iZXIpIHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgpLmZvcm1hdChudW0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciB3ZWJwYWNrUXVldWVzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBxdWV1ZXNcIikgOiBcIl9fd2VicGFja19xdWV1ZXNfX1wiO1xudmFyIHdlYnBhY2tFeHBvcnRzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBleHBvcnRzXCIpIDogXCJfX3dlYnBhY2tfZXhwb3J0c19fXCI7XG52YXIgd2VicGFja0Vycm9yID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBlcnJvclwiKSA6IFwiX193ZWJwYWNrX2Vycm9yX19cIjtcbnZhciByZXNvbHZlUXVldWUgPSAocXVldWUpID0+IHtcblx0aWYocXVldWUgJiYgIXF1ZXVlLmQpIHtcblx0XHRxdWV1ZS5kID0gMTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSkpO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tID8gZm4ucisrIDogZm4oKSkpO1xuXHR9XG59XG52YXIgd3JhcERlcHMgPSAoZGVwcykgPT4gKGRlcHMubWFwKChkZXApID0+IHtcblx0aWYoZGVwICE9PSBudWxsICYmIHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpIHtcblx0XHRpZihkZXBbd2VicGFja1F1ZXVlc10pIHJldHVybiBkZXA7XG5cdFx0aWYoZGVwLnRoZW4pIHtcblx0XHRcdHZhciBxdWV1ZSA9IFtdO1xuXHRcdFx0cXVldWUuZCA9IDA7XG5cdFx0XHRkZXAudGhlbigocikgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0V4cG9ydHNdID0gcjtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0sIChlKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXJyb3JdID0gZTtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIG9iaiA9IHt9O1xuXHRcdFx0b2JqW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAoZm4ocXVldWUpKTtcblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fVxuXHR9XG5cdHZhciByZXQgPSB7fTtcblx0cmV0W3dlYnBhY2tRdWV1ZXNdID0geCA9PiB7fTtcblx0cmV0W3dlYnBhY2tFeHBvcnRzXSA9IGRlcDtcblx0cmV0dXJuIHJldDtcbn0pKTtcbl9fd2VicGFja19yZXF1aXJlX18uYSA9IChtb2R1bGUsIGJvZHksIGhhc0F3YWl0KSA9PiB7XG5cdHZhciBxdWV1ZTtcblx0aGFzQXdhaXQgJiYgKChxdWV1ZSA9IFtdKS5kID0gMSk7XG5cdHZhciBkZXBRdWV1ZXMgPSBuZXcgU2V0KCk7XG5cdHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XG5cdHZhciBjdXJyZW50RGVwcztcblx0dmFyIG91dGVyUmVzb2x2ZTtcblx0dmFyIHJlamVjdDtcblx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cdFx0cmVqZWN0ID0gcmVqO1xuXHRcdG91dGVyUmVzb2x2ZSA9IHJlc29sdmU7XG5cdH0pO1xuXHRwcm9taXNlW3dlYnBhY2tFeHBvcnRzXSA9IGV4cG9ydHM7XG5cdHByb21pc2Vbd2VicGFja1F1ZXVlc10gPSAoZm4pID0+IChxdWV1ZSAmJiBmbihxdWV1ZSksIGRlcFF1ZXVlcy5mb3JFYWNoKGZuKSwgcHJvbWlzZVtcImNhdGNoXCJdKHggPT4ge30pKTtcblx0bW9kdWxlLmV4cG9ydHMgPSBwcm9taXNlO1xuXHRib2R5KChkZXBzKSA9PiB7XG5cdFx0Y3VycmVudERlcHMgPSB3cmFwRGVwcyhkZXBzKTtcblx0XHR2YXIgZm47XG5cdFx0dmFyIGdldFJlc3VsdCA9ICgpID0+IChjdXJyZW50RGVwcy5tYXAoKGQpID0+IHtcblx0XHRcdGlmKGRbd2VicGFja0Vycm9yXSkgdGhyb3cgZFt3ZWJwYWNrRXJyb3JdO1xuXHRcdFx0cmV0dXJuIGRbd2VicGFja0V4cG9ydHNdO1xuXHRcdH0pKVxuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGZuID0gKCkgPT4gKHJlc29sdmUoZ2V0UmVzdWx0KSk7XG5cdFx0XHRmbi5yID0gMDtcblx0XHRcdHZhciBmblF1ZXVlID0gKHEpID0+IChxICE9PSBxdWV1ZSAmJiAhZGVwUXVldWVzLmhhcyhxKSAmJiAoZGVwUXVldWVzLmFkZChxKSwgcSAmJiAhcS5kICYmIChmbi5yKyssIHEucHVzaChmbikpKSk7XG5cdFx0XHRjdXJyZW50RGVwcy5tYXAoKGRlcCkgPT4gKGRlcFt3ZWJwYWNrUXVldWVzXShmblF1ZXVlKSkpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBmbi5yID8gcHJvbWlzZSA6IGdldFJlc3VsdCgpO1xuXHR9LCAoZXJyKSA9PiAoKGVyciA/IHJlamVjdChwcm9taXNlW3dlYnBhY2tFcnJvcl0gPSBlcnIpIDogb3V0ZXJSZXNvbHZlKGV4cG9ydHMpKSwgcmVzb2x2ZVF1ZXVlKHF1ZXVlKSkpO1xuXHRxdWV1ZSAmJiAocXVldWUuZCA9IDApO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=