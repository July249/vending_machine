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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0Esc0dBQXNHO1dBQ3RHO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQSxFQUFFO1dBQ0Y7V0FDQTs7Ozs7V0NoRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvY29tcG9uZW50cy9Db2xhR2VuZXJhdG9yLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy9jb21wb25lbnRzL1ZlbmRpbmdNYWNoaW5lLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy90eXBlcy90eXBlR3VhcmQvaXNDb2xhSXRlbS50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvdXRpbC9udW1iZXJGb3JtYXQudHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvYXN5bmMgbW9kdWxlIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ29sYUl0ZW0gfSBmcm9tICcuLi90eXBlcy9jb2xhSXRlbSc7XG5pbXBvcnQgeyBpc0NvbGFJdGVtIH0gZnJvbSAnLi4vdHlwZXMvdHlwZUd1YXJkL2lzQ29sYUl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xhR2VuZXJhdG9yIHtcbiAgI2l0ZW1MaXN0OiBIVE1MVUxpc3RFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuI2l0ZW1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbScpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gIH1cblxuICBhc3luYyBzZXR1cCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmxvYWREYXRhKChqc29uKSA9PiB7XG4gICAgICB0aGlzLmNvbGFGYWN0b3J5KGpzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkRGF0YShjYWxsYmFjazogKGFyZzogQ29sYUl0ZW1bXSkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9KdWx5MjQ5L3ZlbmRpbmdfbWFjaGluZS9tYWluL3B1YmxpYy9kYXRhL2l0ZW0uanNvbidcbiAgICApO1xuICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNvbnN0IGRhdGEgPSAoYXdhaXQgcmVzLmpzb24oKSkgYXMgQ29sYUl0ZW1bXTtcbiAgICAgIGlmIChpc0NvbGFJdGVtKGRhdGEpKSB7XG4gICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgRXJyb3IoYENvbm5lY3QgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbGFGYWN0b3J5KGRhdGE6IENvbGFJdGVtW10gLyogSlNPTiBkYXRhICovKTogdm9pZCB7XG4gICAgY29uc3QgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGRhdGEuZm9yRWFjaCgoZWw6IENvbGFJdGVtKSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgICAgY29uc3QgaXRlbVRlbXBsYXRlID0gYFxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWl0ZW1cIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgY2xhc3M9XCJpbWctaXRlbVwiIC8+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwidGl0LWl0ZW1cIj48L3N0cm9uZz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidHh0LXByaWNlXCI+PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBgO1xuXG4gICAgICBpdGVtLmlubmVySFRNTCA9IGl0ZW1UZW1wbGF0ZTtcblxuICAgICAgY29uc3QgYnV0dG9uSXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmJ0bi1pdGVtJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQuaXRlbSA9IGVsLm5hbWU7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQuY291bnQgPSBgJHtlbC5jb3VudH1gO1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0LnByaWNlID0gYCR7ZWwuY29zdH1gO1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0LmltZyA9IGVsLmltZztcblxuICAgICAgY29uc3QgaW1nSXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmltZy1pdGVtJykgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgIGltZ0l0ZW0uc3JjID0gYC4vc3JjL2Fzc2V0cy9pbWcvJHtlbC5pbWd9YDtcblxuICAgICAgY29uc3QgdGl0bGVJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudGl0LWl0ZW0nKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRpdGxlSXRlbS50ZXh0Q29udGVudCA9IGVsLm5hbWU7XG5cbiAgICAgIGNvbnN0IHByb2R1Y3RDb3N0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudHh0LXByaWNlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgcHJvZHVjdENvc3QudGV4dENvbnRlbnQgPSBgJHtlbC5jb3N0feybkGA7XG5cbiAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICB0aGlzLiNpdGVtTGlzdC5hcHBlbmRDaGlsZChkb2NGcmFnKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IG51bWJlckZvcm1hdCBmcm9tICcuLi91dGlsL251bWJlckZvcm1hdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlbmRpbmdNYWNoaW5lIHtcbiAgI2JhbGFuY2U6IEhUTUxTcGFuRWxlbWVudDtcbiAgI2l0ZW1MaXN0OiBIVE1MVUxpc3RFbGVtZW50O1xuICAjaW5wdXRDb3N0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICNidG5QdXQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAjYnRuUmV0dXJuOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgI2J0bkdldDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICNzdGFnZWRMaXN0OiBIVE1MVUxpc3RFbGVtZW50O1xuICAjbXlNb25leTogSFRNTFNwYW5FbGVtZW50O1xuICAjZ290TGlzdDogSFRNTFVMaXN0RWxlbWVudDtcbiAgI3R4dFRvdGFsOiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCB2ZW5kaW5nTWFjaGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLnZlbmRpbmctbWFjaGluZSdcbiAgICApIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuI2JhbGFuY2UgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy50eHQtYmFsYW5jZSdcbiAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICB0aGlzLiNpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWl0ZW0nKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgIHRoaXMuI2lucHV0Q29zdEVsID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcuaW5wLXB1dCdcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy4jYnRuUHV0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcuYnRuLXB1dCdcbiAgICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHRoaXMuI2J0blJldHVybiA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJ0bi1yZXR1cm4nXG4gICAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICB0aGlzLiNidG5HZXQgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5idG4tZ2V0J1xuICAgICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgdGhpcy4jc3RhZ2VkTGlzdCA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmxpc3QtaXRlbS1zdGFnZWQnXG4gICAgKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuXG4gICAgY29uc3QgbXlpbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15LWluZm8nKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLiNteU1vbmV5ID0gbXlpbmZvLnF1ZXJ5U2VsZWN0b3IoJy50eHQtbXltb25leScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICB0aGlzLiNnb3RMaXN0ID0gbXlpbmZvLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmxpc3QtaXRlbS1zdGFnZWQnXG4gICAgKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgIHRoaXMuI3R4dFRvdGFsID0gbXlpbmZvLnF1ZXJ5U2VsZWN0b3IoJy50eHQtdG90YWwnKSBhcyBIVE1MRWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhZ2VkSXRlbUdlbmVyYXRvcih0YXJnZXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3Qgc3RhZ2VkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICBzdGFnZWRJdGVtLmRhdGFzZXQuaXRlbSA9IHRhcmdldC5kYXRhc2V0Lml0ZW0gfHwgJyc7XG4gICAgc3RhZ2VkSXRlbS5kYXRhc2V0LnByaWNlID0gdGFyZ2V0LmRhdGFzZXQucHJpY2UgfHwgJzAnO1xuICAgIHN0YWdlZEl0ZW0uaW5uZXJIVE1MID0gYFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tc3RhZ2VkXCI+XG4gICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgY2xhc3M9XCJpbWctaXRlbVwiPlxuICAgICAgICA8c3Ryb25nIGNsYXNzPVwidHh0LWl0ZW1cIj48L3N0cm9uZz5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJudW0tY291bnRlclwiPjwvc3Bhbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi11bnN0YWdlZFwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLW1pbnVzXCIgc3R5bGU9XCJjb2xvcjogI2YwM2YzZjtcIj48L2k+PC9kaXY+XG4gICAgICA8L2J1dHRvbj5cbiAgICBgO1xuXG4gICAgY29uc3QgdW5zdGFnZWRCdG4gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJ0bi11bnN0YWdlZCdcbiAgICApIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIHVuc3RhZ2VkQnRuLmlkID0gYCR7dGFyZ2V0LmRhdGFzZXQuaXRlbX1gO1xuXG4gICAgY29uc3QgaW1nSXRlbSA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcignLmltZy1pdGVtJykgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICBpbWdJdGVtLnNyYyA9IGAuL3NyYy9hc3NldHMvaW1nLyR7dGFyZ2V0LmRhdGFzZXQuaW1nfWA7XG5cbiAgICBjb25zdCB0aXRsZUl0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy50eHQtaXRlbScpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRpdGxlSXRlbS50ZXh0Q29udGVudCA9IHRhcmdldC5kYXRhc2V0Lml0ZW0gfHwgJyc7XG5cbiAgICBjb25zdCBxdWFudGl0eUl0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLm51bS1jb3VudGVyJ1xuICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCA9ICcxJztcblxuICAgIHRoaXMuI3N0YWdlZExpc3QuYXBwZW5kQ2hpbGQoc3RhZ2VkSXRlbSk7XG4gIH1cblxuICBwcml2YXRlIGJpbmRFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy4jc3RhZ2VkTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRFbCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgaWYgKHRhcmdldEVsLmNsYXNzTGlzdC5jb250YWlucygnZmEtY2lyY2xlLW1pbnVzJykpIHtcbiAgICAgICAgY29uc3QgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgdW5zdGFnZWRCdG4gPSB0YXJnZXRFbC5wYXJlbnRFbGVtZW50IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICBjb25zdCBzdGFnZWRJdGVtTGlzdCA9IHRoaXMuI3N0YWdlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICBjb25zdCB1cGRhdGVkU3RhZ2VkSXRlbUxpc3Q6IEhUTUxMSUVsZW1lbnRbXSA9XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKHN0YWdlZEl0ZW1MaXN0LCAoaXRlbTogSFRNTExJRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZGF0YXNldD8uaXRlbSA9PT0gdW5zdGFnZWRCdG4/LmlkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5SXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAnLm51bS1jb3VudGVyJ1xuICAgICAgICAgICAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBwYXJzZUludChxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQpO1xuXG4gICAgICAgICAgICAgIGlmICghdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGxldCBjdXJyZW50QmFsYW5jZSA9IHBhcnNlSW50KFxuICAgICAgICAgICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGlmICghaXRlbS5kYXRhc2V0LnByaWNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGN1cnJlbnRCYWxhbmNlICs9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5wcmljZSkgKiBxdWFudGl0eTtcblxuICAgICAgICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KGN1cnJlbnRCYWxhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmRhdGFzZXQuaXRlbSAhPT0gdW5zdGFnZWRCdG4uaWQ7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgdXBkYXRlZFN0YWdlZEl0ZW1MaXN0LmZvckVhY2goKGxpc3Q6IEhUTUxMSUVsZW1lbnQpID0+XG4gICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChsaXN0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuI3N0YWdlZExpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuI3N0YWdlZExpc3QuYXBwZW5kKGRvY0ZyYWcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4jYnRuUHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLiNpbnB1dENvc3RFbC52YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5wdXRDb3N0ID0gcGFyc2VJbnQodGhpcy4jaW5wdXRDb3N0RWwudmFsdWUpO1xuXG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSBwYXJzZUludChcbiAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICApO1xuXG4gICAgICBpZiAoIWlucHV0Q29zdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dENvc3QgPD0gbXlNb25leVZhbCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VkVmFsdWUgPSBteU1vbmV5VmFsIC0gaW5wdXRDb3N0O1xuICAgICAgICB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KGNoYW5nZWRWYWx1ZSkgKyAnIOybkCc7XG4gICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQoXG4gICAgICAgICAgKGJhbGFuY2VWYWwgPyBiYWxhbmNlVmFsIDogMCkgKyBpbnB1dENvc3RcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCfshozsp4DquIjsnbQg67aA7KGx7ZWp64uI64ukLicpO1xuICAgICAgfVxuICAgICAgLy8gY2xlYXIgaW5wdXQgdmFsdWVcbiAgICAgIHRoaXMuI2lucHV0Q29zdEVsLnZhbHVlID0gJyc7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNidG5SZXR1cm4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiYWxhbmNlVmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG15TW9uZXlWYWwgPSBwYXJzZUludChcbiAgICAgICAgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICApO1xuXG4gICAgICBpZiAoYmFsYW5jZVZhbCkge1xuICAgICAgICBjb25zdCByZXR1cm5Nb25leSA9IGJhbGFuY2VWYWwgKyBteU1vbmV5VmFsO1xuICAgICAgICB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KHJldHVybk1vbmV5KSArICfsm5AnO1xuICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ID0gJzAnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoJ+uwmO2ZmOuQoCDqsbDsiqTrpoTrj4jsnbQg7JeG7Iq164uI64ukLicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYnRuc0NvbGEgPSB0aGlzLiNpdGVtTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblxuICAgIGJ0bnNDb2xhLmZvckVhY2goKGl0ZW06IEhUTUxCdXR0b25FbGVtZW50KSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSBwYXJzZUludChcbiAgICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgaXNTdGFnZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0YXJnZXRFbC5kYXRhc2V0LnByaWNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhcmdldEVsUHJpY2UgPSBwYXJzZUludCh0YXJnZXRFbC5kYXRhc2V0LnByaWNlKTtcbiAgICAgICAgY29uc3Qgc3RhZ2VkTGlzdEl0ZW0gPSB0aGlzLiNzdGFnZWRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgaWYgKGJhbGFuY2VWYWwgPj0gdGFyZ2V0RWxQcmljZSkge1xuICAgICAgICAgIGNvbnN0IHdpdGhkcmF3ID0gYmFsYW5jZVZhbCAtIHRhcmdldEVsUHJpY2U7XG4gICAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCA9IG51bWJlckZvcm1hdCh3aXRoZHJhdyk7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc3RhZ2VkTGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIGlmICghaXRlbS5kYXRhc2V0Lml0ZW0gfHwgIXRhcmdldEVsLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtLmRhdGFzZXQuaXRlbSA9PT0gdGFyZ2V0RWwuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICAgIGxldCBxdWFudGl0eUl0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgICAgICAgKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCA9IGAke1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCkgKyAxXG4gICAgICAgICAgICAgIH1gO1xuICAgICAgICAgICAgICBpc1N0YWdlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghaXNTdGFnZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhZ2VkSXRlbUdlbmVyYXRvcih0YXJnZXRFbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRhcmdldEVsLmRhdGFzZXQuY291bnQpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRDb3VudCA9IHBhcnNlSW50KHRhcmdldEVsLmRhdGFzZXQuY291bnQpO1xuICAgICAgICAgICAgdGFyZ2V0Q291bnQgLT0gMTtcbiAgICAgICAgICAgIHRhcmdldEVsLmRhdGFzZXQuY291bnQgPSBgJHt0YXJnZXRDb3VudH1gO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGFyZ2V0RWwuZGF0YXNldC5jb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJzZUludCh0YXJnZXRFbC5kYXRhc2V0LmNvdW50KSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKCF0YXJnZXRFbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldEVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc29sZC1vdXQnKTtcblxuICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2VtJyk7XG4gICAgICAgICAgICB3YXJuaW5nLnRleHRDb250ZW50ID0gJ+2VtOuLuSDsg4HtkojsnYAg7ZKI7KCI7J6F64uI64ukLic7XG4gICAgICAgICAgICB3YXJuaW5nLmNsYXNzTGlzdC5hZGQoJ2lyJyk7XG4gICAgICAgICAgICB0YXJnZXRFbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh3YXJuaW5nLCB0YXJnZXRFbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KCfsnpTslaHsnbQg67aA7KGx7ZWp64uI64ukISDsnoXquIjtlbTso7zshLjsmpR+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy4jYnRuR2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IGlzR290OiBib29sZWFuID0gZmFsc2U7XG4gICAgICBsZXQgdG90YWxQcmljZTogbnVtYmVyID0gMDtcblxuICAgICAgdGhpcy4jc3RhZ2VkTGlzdFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnbGknKVxuICAgICAgICAuZm9yRWFjaCgoaXRlbVN0YWdlZDogSFRNTExJRWxlbWVudCkgPT4ge1xuICAgICAgICAgIGlmICghaXRlbVN0YWdlZC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLiNnb3RMaXN0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnbGknKVxuICAgICAgICAgICAgLmZvckVhY2goKGl0ZW1Hb3Q6IEhUTUxMSUVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFpdGVtR290LmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpdGVtU3RhZ2VkLmRhdGFzZXQuaXRlbSA9PT0gaXRlbUdvdC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUdvdENvdW50ID0gaXRlbUdvdC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgICAgICAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFnZWRRdWFudGl0eSA9IGl0ZW1TdGFnZWQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW1Hb3RDb3VudC50ZXh0Q29udGVudCB8fCAhc3RhZ2VkUXVhbnRpdHkudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtR290Q291bnQudGV4dENvbnRlbnQgPSBgJHtcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KGl0ZW1Hb3RDb3VudC50ZXh0Q29udGVudCkgK1xuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoc3RhZ2VkUXVhbnRpdHkudGV4dENvbnRlbnQpXG4gICAgICAgICAgICAgICAgfWA7XG4gICAgICAgICAgICAgICAgaXNHb3QgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghaXNHb3QpIHtcbiAgICAgICAgICAgIHRoaXMuI2dvdExpc3QuYXBwZW5kQ2hpbGQoaXRlbVN0YWdlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgdGhpcy4jc3RhZ2VkTGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgICAgdGhpcy4jZ290TGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2goKGl0ZW1Hb3Q6IEhUTUxMSUVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKCFpdGVtR290LmRhdGFzZXQucHJpY2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW1Hb3QucXVlcnlTZWxlY3RvcignLm51bS1jb3VudGVyJykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbUdvdFF1YW50aXR5RWwgPSBpdGVtR290LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3QgaXRlbUdvdFByaWNlID0gcGFyc2VJbnQoaXRlbUdvdC5kYXRhc2V0LnByaWNlKTtcbiAgICAgICAgY29uc3QgaXRlbUdvdFF1YW50aXR5ID0gcGFyc2VJbnQoaXRlbUdvdFF1YW50aXR5RWwudGV4dENvbnRlbnQgfHwgJzAnKTtcblxuICAgICAgICB0b3RhbFByaWNlICs9IGl0ZW1Hb3RQcmljZSAqIGl0ZW1Hb3RRdWFudGl0eTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLiN0eHRUb3RhbC50ZXh0Q29udGVudCA9IGDstJ0g6riI7JWhOiAke251bWJlckZvcm1hdCh0b3RhbFByaWNlKX3sm5BgO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sYUdlbmVyYXRvciBmcm9tICcuL2NvbXBvbmVudHMvQ29sYUdlbmVyYXRvcic7XG5pbXBvcnQgVmVuZGluZ01hY2hpbmUgZnJvbSAnLi9jb21wb25lbnRzL1ZlbmRpbmdNYWNoaW5lJztcblxuY29uc3QgY29sYUdlbmVyYXRvciA9IG5ldyBDb2xhR2VuZXJhdG9yKCk7XG5jb25zdCB2ZW5kaW5nTWFjaGluZSA9IG5ldyBWZW5kaW5nTWFjaGluZSgpO1xuXG4vLyBUb3AtbGV2ZWwgYXdhaXRcbmF3YWl0IGNvbGFHZW5lcmF0b3Iuc2V0dXAoKTtcbnZlbmRpbmdNYWNoaW5lLnNldHVwKCk7XG4iLCJpbXBvcnQgdHlwZSB7IENvbGFJdGVtIH0gZnJvbSAnLi4vY29sYUl0ZW0nO1xuXG4vLyBDb2xhSXRlbSDtg4DsnoXsnYQg6rCA7KeEIOuwsOyXtOyduOyngCDtmZXsnbjtlZjripQg7YOA7J6FIOqwgOuTnFxuZXhwb3J0IGNvbnN0IGlzQ29sYUl0ZW0gPSAoaXRlbTogYW55KTogaXRlbSBpcyBDb2xhSXRlbVtdID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW0pKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXRlbVswXS5uYW1lID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgaWYgKGl0ZW1bMF0uY29zdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtWzBdLmNvdW50ID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgaWYgKGl0ZW1bMF0uaW1nID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbnVtYmVyRm9ybWF0KG51bTogbnVtYmVyKSB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoKS5mb3JtYXQobnVtKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmICFxdWV1ZS5kKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IDEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9