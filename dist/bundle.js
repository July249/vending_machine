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
                const updatedStagedItemList = Array.prototype.filter.call(stagedItemList, (stagedItem) => {
                    if (stagedItem.dataset.item &&
                        stagedItem.dataset.item === unstagedBtn.id) {
                        // update balance value when unstaged item is clicked and remove item from staged list
                        const quantityItem = stagedItem.querySelector('.num-counter');
                        if (typeof quantityItem.textContent !== 'string') {
                            return;
                        }
                        const quantity = parseInt(quantityItem.textContent);
                        if (!__classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent) {
                            return;
                        }
                        let currentBalance = parseInt(__classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent.replaceAll(',', ''));
                        if (!stagedItem.dataset.price) {
                            return;
                        }
                        currentBalance += parseInt(stagedItem.dataset.price) * quantity;
                        __classPrivateFieldGet(this, _VendingMachine_balance, "f").textContent = (0,_util_numberFormat__WEBPACK_IMPORTED_MODULE_0__["default"])(currentBalance);
                        // update itemList quantity value when unstaged item is clicked
                        const itemList = __classPrivateFieldGet(this, _VendingMachine_itemList, "f").querySelectorAll('li');
                        const targetEl = Array.prototype.find.call(itemList, (cola) => cola.children[0].children[1].textContent ===
                            stagedItem.dataset.item);
                        if (!targetEl.firstElementChild) {
                            return;
                        }
                        let colaQuantity = parseInt(targetEl.firstElementChild.attributes[3].value);
                        colaQuantity += quantity;
                        targetEl.firstElementChild.attributes[3].value =
                            colaQuantity.toString();
                        targetEl.classList.remove('sold-out');
                        targetEl.firstElementChild.removeAttribute('disabled');
                    }
                    return stagedItem.dataset.item !== unstagedBtn.id;
                });
                updatedStagedItemList.forEach((list) => docFrag.appendChild(list));
                // update staged list after clearing staged list
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
                            if (!targetEl.dataset.count) {
                                return;
                            }
                            if (parseInt(targetEl.dataset.count) > 0) {
                                let quantityItem = item.querySelector('.num-counter');
                                if (typeof quantityItem.textContent !== 'string') {
                                    return;
                                }
                                quantityItem.textContent = `${parseInt(quantityItem.textContent) + 1}`;
                            }
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
                    if (targetEl.dataset.count && targetCount > 0) {
                        targetCount -= 1;
                        targetEl.dataset.count = `${targetCount}`;
                    }
                    if (targetEl.dataset.count && targetCount === 0) {
                        if (!targetEl.parentElement) {
                            return;
                        }
                        targetEl.parentElement.classList.add('sold-out');
                        targetEl.disabled = true;
                        const warning = document.createElement('em');
                        warning.textContent = '해당 상품은 품절입니다.';
                        warning.classList.add('ir');
                        targetEl.parentElement.insertAdjacentElement('beforeend', warning);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBLHNHQUFzRztXQUN0RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDaEVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL2NvbXBvbmVudHMvQ29sYUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvY29tcG9uZW50cy9WZW5kaW5nTWFjaGluZS50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvdHlwZXMvdHlwZUd1YXJkL2lzQ29sYUl0ZW0udHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL3V0aWwvbnVtYmVyRm9ybWF0LnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2FzeW5jIG1vZHVsZSIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENvbGFJdGVtIH0gZnJvbSAnLi4vdHlwZXMvY29sYUl0ZW0nO1xuaW1wb3J0IHsgaXNDb2xhSXRlbSB9IGZyb20gJy4uL3R5cGVzL3R5cGVHdWFyZC9pc0NvbGFJdGVtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sYUdlbmVyYXRvciB7XG4gICNpdGVtTGlzdDogSFRNTFVMaXN0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLiNpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWl0ZW0nKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICB9XG5cbiAgYXN5bmMgc2V0dXAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgoanNvbikgPT4ge1xuICAgICAgdGhpcy5jb2xhRmFjdG9yeShqc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZERhdGEoY2FsbGJhY2s6IChhcmc6IENvbGFJdGVtW10pID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcbiAgICAgICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vSnVseTI0OS92ZW5kaW5nX21hY2hpbmUvbWFpbi9wdWJsaWMvZGF0YS9pdGVtLmpzb24nXG4gICAgKTtcbiAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICBjb25zdCBkYXRhID0gKGF3YWl0IHJlcy5qc29uKCkpIGFzIENvbGFJdGVtW107XG4gICAgICBpZiAoaXNDb2xhSXRlbShkYXRhKSkge1xuICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IEVycm9yKGBDb25uZWN0IEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb2xhRmFjdG9yeShkYXRhOiBDb2xhSXRlbVtdIC8qIEpTT04gZGF0YSAqLyk6IHZvaWQge1xuICAgIGNvbnN0IGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBkYXRhLmZvckVhY2goKGVsOiBDb2xhSXRlbSkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICAgIGNvbnN0IGl0ZW1UZW1wbGF0ZSA9IGBcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1pdGVtXCI+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGNsYXNzPVwiaW1nLWl0ZW1cIiAvPlxuICAgICAgICAgICAgPHN0cm9uZyBjbGFzcz1cInRpdC1pdGVtXCI+PC9zdHJvbmc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInR4dC1wcmljZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgYDtcblxuICAgICAgaXRlbS5pbm5lckhUTUwgPSBpdGVtVGVtcGxhdGU7XG5cbiAgICAgIGNvbnN0IGJ1dHRvbkl0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5idG4taXRlbScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0Lml0ZW0gPSBlbC5uYW1lO1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0LmNvdW50ID0gYCR7ZWwuY291bnR9YDtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5wcmljZSA9IGAke2VsLmNvc3R9YDtcbiAgICAgIGJ1dHRvbkl0ZW0uZGF0YXNldC5pbWcgPSBlbC5pbWc7XG5cbiAgICAgIGNvbnN0IGltZ0l0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pbWctaXRlbScpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICBpbWdJdGVtLnNyYyA9IGAuL3NyYy9hc3NldHMvaW1nLyR7ZWwuaW1nfWA7XG5cbiAgICAgIGNvbnN0IHRpdGxlSXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRpdC1pdGVtJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0aXRsZUl0ZW0udGV4dENvbnRlbnQgPSBlbC5uYW1lO1xuXG4gICAgICBjb25zdCBwcm9kdWN0Q29zdCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnR4dC1wcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgIHByb2R1Y3RDb3N0LnRleHRDb250ZW50ID0gYCR7ZWwuY29zdH3sm5BgO1xuXG4gICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgdGhpcy4jaXRlbUxpc3QuYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBudW1iZXJGb3JtYXQgZnJvbSAnLi4vdXRpbC9udW1iZXJGb3JtYXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZW5kaW5nTWFjaGluZSB7XG4gICNiYWxhbmNlOiBIVE1MU3BhbkVsZW1lbnQ7XG4gICNpdGVtTGlzdDogSFRNTFVMaXN0RWxlbWVudDtcbiAgI2lucHV0Q29zdEVsOiBIVE1MSW5wdXRFbGVtZW50O1xuICAjYnRuUHV0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgI2J0blJldHVybjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICNidG5HZXQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAjc3RhZ2VkTGlzdDogSFRNTFVMaXN0RWxlbWVudDtcbiAgI215TW9uZXk6IEhUTUxTcGFuRWxlbWVudDtcbiAgI2dvdExpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gICN0eHRUb3RhbDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgdmVuZGluZ01hY2hpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy52ZW5kaW5nLW1hY2hpbmUnXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLiNiYWxhbmNlID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcudHh0LWJhbGFuY2UnXG4gICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgdGhpcy4jaXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICB0aGlzLiNpbnB1dENvc3RFbCA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmlucC1wdXQnXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMuI2J0blB1dCA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJ0bi1wdXQnXG4gICAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICB0aGlzLiNidG5SZXR1cm4gPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5idG4tcmV0dXJuJ1xuICAgICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgdGhpcy4jYnRuR2V0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcuYnRuLWdldCdcbiAgICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHRoaXMuI3N0YWdlZExpc3QgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5saXN0LWl0ZW0tc3RhZ2VkJ1xuICAgICkgYXMgSFRNTFVMaXN0RWxlbWVudDtcblxuICAgIGNvbnN0IG15aW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1pbmZvJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy4jbXlNb25leSA9IG15aW5mby5xdWVyeVNlbGVjdG9yKCcudHh0LW15bW9uZXknKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgdGhpcy4jZ290TGlzdCA9IG15aW5mby5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5saXN0LWl0ZW0tc3RhZ2VkJ1xuICAgICkgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICB0aGlzLiN0eHRUb3RhbCA9IG15aW5mby5xdWVyeVNlbGVjdG9yKCcudHh0LXRvdGFsJykgYXMgSFRNTEVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN0YWdlZEl0ZW1HZW5lcmF0b3IodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YWdlZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgc3RhZ2VkSXRlbS5kYXRhc2V0Lml0ZW0gPSB0YXJnZXQuZGF0YXNldC5pdGVtIHx8ICcnO1xuICAgIHN0YWdlZEl0ZW0uZGF0YXNldC5wcmljZSA9IHRhcmdldC5kYXRhc2V0LnByaWNlIHx8ICcwJztcbiAgICBzdGFnZWRJdGVtLmlubmVySFRNTCA9IGBcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLXN0YWdlZFwiPlxuICAgICAgICA8aW1nIHNyYz1cIlwiIGFsdD1cIlwiIGNsYXNzPVwiaW1nLWl0ZW1cIj5cbiAgICAgICAgPHN0cm9uZyBjbGFzcz1cInR4dC1pdGVtXCI+PC9zdHJvbmc+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibnVtLWNvdW50ZXJcIj48L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tdW5zdGFnZWRcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZS1taW51c1wiIHN0eWxlPVwiY29sb3I6ICNmMDNmM2Y7XCI+PC9pPjwvZGl2PlxuICAgICAgPC9idXR0b24+XG4gICAgYDtcblxuICAgIGNvbnN0IHVuc3RhZ2VkQnRuID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5idG4tdW5zdGFnZWQnXG4gICAgKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB1bnN0YWdlZEJ0bi5pZCA9IGAke3RhcmdldC5kYXRhc2V0Lml0ZW19YDtcblxuICAgIGNvbnN0IGltZ0l0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pbWctaXRlbScpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgaW1nSXRlbS5zcmMgPSBgLi9zcmMvYXNzZXRzL2ltZy8ke3RhcmdldC5kYXRhc2V0LmltZ31gO1xuXG4gICAgY29uc3QgdGl0bGVJdGVtID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKCcudHh0LWl0ZW0nKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aXRsZUl0ZW0udGV4dENvbnRlbnQgPSB0YXJnZXQuZGF0YXNldC5pdGVtIHx8ICcnO1xuXG4gICAgY29uc3QgcXVhbnRpdHlJdGVtID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5udW0tY291bnRlcidcbiAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgPSAnMSc7XG5cbiAgICB0aGlzLiNzdGFnZWRMaXN0LmFwcGVuZENoaWxkKHN0YWdlZEl0ZW0pO1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuI3N0YWdlZExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0RWwgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGlmICh0YXJnZXRFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLWNpcmNsZS1taW51cycpKSB7XG4gICAgICAgIGNvbnN0IGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGNvbnN0IHVuc3RhZ2VkQnRuID0gdGFyZ2V0RWwucGFyZW50RWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgY29uc3Qgc3RhZ2VkSXRlbUxpc3QgPSB0aGlzLiNzdGFnZWRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlZFN0YWdlZEl0ZW1MaXN0OiBIVE1MTElFbGVtZW50W10gPVxuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChcbiAgICAgICAgICAgIHN0YWdlZEl0ZW1MaXN0LFxuICAgICAgICAgICAgKHN0YWdlZEl0ZW06IEhUTUxMSUVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHN0YWdlZEl0ZW0uZGF0YXNldC5pdGVtICYmXG4gICAgICAgICAgICAgICAgc3RhZ2VkSXRlbS5kYXRhc2V0Lml0ZW0gPT09IHVuc3RhZ2VkQnRuLmlkXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBiYWxhbmNlIHZhbHVlIHdoZW4gdW5zdGFnZWQgaXRlbSBpcyBjbGlja2VkIGFuZCByZW1vdmUgaXRlbSBmcm9tIHN0YWdlZCBsaXN0XG4gICAgICAgICAgICAgICAgY29uc3QgcXVhbnRpdHlJdGVtID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgICAgICAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVhbnRpdHlJdGVtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9IHBhcnNlSW50KHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRCYWxhbmNlID0gcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzdGFnZWRJdGVtLmRhdGFzZXQucHJpY2UpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VycmVudEJhbGFuY2UgKz0gcGFyc2VJbnQoc3RhZ2VkSXRlbS5kYXRhc2V0LnByaWNlKSAqIHF1YW50aXR5O1xuXG4gICAgICAgICAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCA9IG51bWJlckZvcm1hdChjdXJyZW50QmFsYW5jZSk7XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgaXRlbUxpc3QgcXVhbnRpdHkgdmFsdWUgd2hlbiB1bnN0YWdlZCBpdGVtIGlzIGNsaWNrZWRcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtTGlzdCA9IHRoaXMuI2l0ZW1MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWw6IEhUTUxMSUVsZW1lbnQgPSBBcnJheS5wcm90b3R5cGUuZmluZC5jYWxsKFxuICAgICAgICAgICAgICAgICAgaXRlbUxpc3QsXG4gICAgICAgICAgICAgICAgICAoY29sYTogSFRNTExJRWxlbWVudCkgPT5cbiAgICAgICAgICAgICAgICAgICAgY29sYS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS50ZXh0Q29udGVudCA9PT1cbiAgICAgICAgICAgICAgICAgICAgc3RhZ2VkSXRlbS5kYXRhc2V0Lml0ZW1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0RWwuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNvbGFRdWFudGl0eSA9IHBhcnNlSW50KFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuZmlyc3RFbGVtZW50Q2hpbGQuYXR0cmlidXRlc1szXS52YWx1ZVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBjb2xhUXVhbnRpdHkgKz0gcXVhbnRpdHk7XG5cbiAgICAgICAgICAgICAgICB0YXJnZXRFbC5maXJzdEVsZW1lbnRDaGlsZC5hdHRyaWJ1dGVzWzNdLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgIGNvbGFRdWFudGl0eS50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnc29sZC1vdXQnKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRFbC5maXJzdEVsZW1lbnRDaGlsZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN0YWdlZEl0ZW0uZGF0YXNldC5pdGVtICE9PSB1bnN0YWdlZEJ0bi5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIHVwZGF0ZWRTdGFnZWRJdGVtTGlzdC5mb3JFYWNoKChsaXN0OiBIVE1MTElFbGVtZW50KSA9PlxuICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQobGlzdClcbiAgICAgICAgKTtcblxuICAgICAgICAvLyB1cGRhdGUgc3RhZ2VkIGxpc3QgYWZ0ZXIgY2xlYXJpbmcgc3RhZ2VkIGxpc3RcbiAgICAgICAgdGhpcy4jc3RhZ2VkTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4jc3RhZ2VkTGlzdC5hcHBlbmQoZG9jRnJhZyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiNidG5QdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI2lucHV0Q29zdEVsLnZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dENvc3QgPSBwYXJzZUludCh0aGlzLiNpbnB1dENvc3RFbC52YWx1ZSk7XG5cbiAgICAgIGNvbnN0IG15TW9uZXlWYWwgPSBwYXJzZUludChcbiAgICAgICAgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICApO1xuICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG5cbiAgICAgIGlmICghaW5wdXRDb3N0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlucHV0Q29zdCA8PSBteU1vbmV5VmFsKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRWYWx1ZSA9IG15TW9uZXlWYWwgLSBpbnB1dENvc3Q7XG4gICAgICAgIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQoY2hhbmdlZFZhbHVlKSArICcg7JuQJztcbiAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCA9IG51bWJlckZvcm1hdChcbiAgICAgICAgICAoYmFsYW5jZVZhbCA/IGJhbGFuY2VWYWwgOiAwKSArIGlucHV0Q29zdFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoJ+yGjOyngOq4iOydtCDrtoDsobHtlanri4jri6QuJyk7XG4gICAgICB9XG4gICAgICAvLyBjbGVhciBpbnB1dCB2YWx1ZVxuICAgICAgdGhpcy4jaW5wdXRDb3N0RWwudmFsdWUgPSAnJztcbiAgICB9KTtcblxuICAgIHRoaXMuI2J0blJldHVybi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSBwYXJzZUludChcbiAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICApO1xuICAgICAgY29uc3QgbXlNb25leVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG5cbiAgICAgIGlmIChiYWxhbmNlVmFsKSB7XG4gICAgICAgIGNvbnN0IHJldHVybk1vbmV5ID0gYmFsYW5jZVZhbCArIG15TW9uZXlWYWw7XG4gICAgICAgIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQocmV0dXJuTW9uZXkpICsgJ+ybkCc7XG4gICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSAnMCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydCgn67CY7ZmY65CgIOqxsOyKpOumhOuPiOydtCDsl4bsirXri4jri6QuJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBidG5zQ29sYSA9IHRoaXMuI2l0ZW1MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG4gICAgYnRuc0NvbGEuZm9yRWFjaCgoaXRlbTogSFRNTEJ1dHRvbkVsZW1lbnQpID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgICAgICBpZiAoIXRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBpc1N0YWdlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRhcmdldEVsLmRhdGFzZXQucHJpY2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFyZ2V0RWxQcmljZSA9IHBhcnNlSW50KHRhcmdldEVsLmRhdGFzZXQucHJpY2UpO1xuICAgICAgICBjb25zdCBzdGFnZWRMaXN0SXRlbSA9IHRoaXMuI3N0YWdlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICBpZiAoYmFsYW5jZVZhbCA+PSB0YXJnZXRFbFByaWNlKSB7XG4gICAgICAgICAgY29uc3Qgd2l0aGRyYXcgPSBiYWxhbmNlVmFsIC0gdGFyZ2V0RWxQcmljZTtcbiAgICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KHdpdGhkcmF3KTtcblxuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBzdGFnZWRMaXN0SXRlbSkge1xuICAgICAgICAgICAgaWYgKCFpdGVtLmRhdGFzZXQuaXRlbSB8fCAhdGFyZ2V0RWwuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpdGVtLmRhdGFzZXQuaXRlbSA9PT0gdGFyZ2V0RWwuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICAgIGlmICghdGFyZ2V0RWwuZGF0YXNldC5jb3VudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5jb3VudCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHF1YW50aXR5SXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICAgKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcXVhbnRpdHlJdGVtLnRleHRDb250ZW50ID0gYCR7XG4gICAgICAgICAgICAgICAgICBwYXJzZUludChxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQpICsgMVxuICAgICAgICAgICAgICAgIH1gO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlzU3RhZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFpc1N0YWdlZCkge1xuICAgICAgICAgICAgdGhpcy5zdGFnZWRJdGVtR2VuZXJhdG9yKHRhcmdldEVsKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRhcmdldEVsLmRhdGFzZXQuY291bnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHRhcmdldENvdW50ID0gcGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5jb3VudCk7XG5cbiAgICAgICAgICBpZiAodGFyZ2V0RWwuZGF0YXNldC5jb3VudCAmJiB0YXJnZXRDb3VudCA+IDApIHtcbiAgICAgICAgICAgIHRhcmdldENvdW50IC09IDE7XG4gICAgICAgICAgICB0YXJnZXRFbC5kYXRhc2V0LmNvdW50ID0gYCR7dGFyZ2V0Q291bnR9YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRhcmdldEVsLmRhdGFzZXQuY291bnQgJiYgdGFyZ2V0Q291bnQgPT09IDApIHtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0RWwucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhcmdldEVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc29sZC1vdXQnKTtcbiAgICAgICAgICAgIHRhcmdldEVsLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2VtJyk7XG4gICAgICAgICAgICB3YXJuaW5nLnRleHRDb250ZW50ID0gJ+2VtOuLuSDsg4HtkojsnYAg7ZKI7KCI7J6F64uI64ukLic7XG4gICAgICAgICAgICB3YXJuaW5nLmNsYXNzTGlzdC5hZGQoJ2lyJyk7XG4gICAgICAgICAgICB0YXJnZXRFbC5wYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgd2FybmluZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KCfsnpTslaHsnbQg67aA7KGx7ZWp64uI64ukISDsnoXquIjtlbTso7zshLjsmpR+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy4jYnRuR2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IGlzR290OiBib29sZWFuID0gZmFsc2U7XG4gICAgICBsZXQgdG90YWxQcmljZTogbnVtYmVyID0gMDtcblxuICAgICAgdGhpcy4jc3RhZ2VkTGlzdFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnbGknKVxuICAgICAgICAuZm9yRWFjaCgoaXRlbVN0YWdlZDogSFRNTExJRWxlbWVudCkgPT4ge1xuICAgICAgICAgIGlmICghaXRlbVN0YWdlZC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLiNnb3RMaXN0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnbGknKVxuICAgICAgICAgICAgLmZvckVhY2goKGl0ZW1Hb3Q6IEhUTUxMSUVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFpdGVtR290LmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpdGVtU3RhZ2VkLmRhdGFzZXQuaXRlbSA9PT0gaXRlbUdvdC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUdvdENvdW50ID0gaXRlbUdvdC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgICAgICAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFnZWRRdWFudGl0eSA9IGl0ZW1TdGFnZWQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW1Hb3RDb3VudC50ZXh0Q29udGVudCB8fCAhc3RhZ2VkUXVhbnRpdHkudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtR290Q291bnQudGV4dENvbnRlbnQgPSBgJHtcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KGl0ZW1Hb3RDb3VudC50ZXh0Q29udGVudCkgK1xuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoc3RhZ2VkUXVhbnRpdHkudGV4dENvbnRlbnQpXG4gICAgICAgICAgICAgICAgfWA7XG4gICAgICAgICAgICAgICAgaXNHb3QgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghaXNHb3QpIHtcbiAgICAgICAgICAgIHRoaXMuI2dvdExpc3QuYXBwZW5kQ2hpbGQoaXRlbVN0YWdlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgdGhpcy4jc3RhZ2VkTGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgICAgdGhpcy4jZ290TGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2goKGl0ZW1Hb3Q6IEhUTUxMSUVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKCFpdGVtR290LmRhdGFzZXQucHJpY2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW1Hb3QucXVlcnlTZWxlY3RvcignLm51bS1jb3VudGVyJykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbUdvdFF1YW50aXR5RWwgPSBpdGVtR290LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3QgaXRlbUdvdFByaWNlID0gcGFyc2VJbnQoaXRlbUdvdC5kYXRhc2V0LnByaWNlKTtcbiAgICAgICAgY29uc3QgaXRlbUdvdFF1YW50aXR5ID0gcGFyc2VJbnQoaXRlbUdvdFF1YW50aXR5RWwudGV4dENvbnRlbnQgfHwgJzAnKTtcblxuICAgICAgICB0b3RhbFByaWNlICs9IGl0ZW1Hb3RQcmljZSAqIGl0ZW1Hb3RRdWFudGl0eTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLiN0eHRUb3RhbC50ZXh0Q29udGVudCA9IGDstJ0g6riI7JWhOiAke251bWJlckZvcm1hdCh0b3RhbFByaWNlKX3sm5BgO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sYUdlbmVyYXRvciBmcm9tICcuL2NvbXBvbmVudHMvQ29sYUdlbmVyYXRvcic7XG5pbXBvcnQgVmVuZGluZ01hY2hpbmUgZnJvbSAnLi9jb21wb25lbnRzL1ZlbmRpbmdNYWNoaW5lJztcblxuY29uc3QgY29sYUdlbmVyYXRvciA9IG5ldyBDb2xhR2VuZXJhdG9yKCk7XG5jb25zdCB2ZW5kaW5nTWFjaGluZSA9IG5ldyBWZW5kaW5nTWFjaGluZSgpO1xuXG4vLyBUb3AtbGV2ZWwgYXdhaXRcbmF3YWl0IGNvbGFHZW5lcmF0b3Iuc2V0dXAoKTtcbnZlbmRpbmdNYWNoaW5lLnNldHVwKCk7XG4iLCJpbXBvcnQgdHlwZSB7IENvbGFJdGVtIH0gZnJvbSAnLi4vY29sYUl0ZW0nO1xuXG4vLyBDb2xhSXRlbSDtg4DsnoXsnYQg6rCA7KeEIOuwsOyXtOyduOyngCDtmZXsnbjtlZjripQg7YOA7J6FIOqwgOuTnFxuZXhwb3J0IGNvbnN0IGlzQ29sYUl0ZW0gPSAoaXRlbTogYW55KTogaXRlbSBpcyBDb2xhSXRlbVtdID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW0pKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXRlbVswXS5uYW1lID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgaWYgKGl0ZW1bMF0uY29zdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtWzBdLmNvdW50ID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgaWYgKGl0ZW1bMF0uaW1nID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbnVtYmVyRm9ybWF0KG51bTogbnVtYmVyKSB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoKS5mb3JtYXQobnVtKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmICFxdWV1ZS5kKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IDEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9