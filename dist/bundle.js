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
                        if (targetEl.classList.contains('sold-out')) {
                            targetEl.classList.remove('sold-out');
                        }
                        if (targetEl.firstElementChild.hasAttribute('disabled')) {
                            targetEl.firstElementChild.removeAttribute('disabled');
                        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLENBQUM7Ozs7Ozs7VUNGRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0Esc0dBQXNHO1dBQ3RHO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQSxFQUFFO1dBQ0Y7V0FDQTs7Ozs7V0NoRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvY29tcG9uZW50cy9Db2xhR2VuZXJhdG9yLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy9jb21wb25lbnRzL1ZlbmRpbmdNYWNoaW5lLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS8uL3NyYy90eXBlcy90eXBlR3VhcmQvaXNDb2xhSXRlbS50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvdXRpbC9udW1iZXJGb3JtYXQudHMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvYXN5bmMgbW9kdWxlIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ29sYUl0ZW0gfSBmcm9tICcuLi90eXBlcy9jb2xhSXRlbSc7XG5pbXBvcnQgeyBpc0NvbGFJdGVtIH0gZnJvbSAnLi4vdHlwZXMvdHlwZUd1YXJkL2lzQ29sYUl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xhR2VuZXJhdG9yIHtcbiAgI2l0ZW1MaXN0OiBIVE1MVUxpc3RFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuI2l0ZW1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbScpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gIH1cblxuICBhc3luYyBzZXR1cCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmxvYWREYXRhKChqc29uKSA9PiB7XG4gICAgICB0aGlzLmNvbGFGYWN0b3J5KGpzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkRGF0YShjYWxsYmFjazogKGFyZzogQ29sYUl0ZW1bXSkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9KdWx5MjQ5L3ZlbmRpbmdfbWFjaGluZS9tYWluL3B1YmxpYy9kYXRhL2l0ZW0uanNvbidcbiAgICApO1xuICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNvbnN0IGRhdGEgPSAoYXdhaXQgcmVzLmpzb24oKSkgYXMgQ29sYUl0ZW1bXTtcbiAgICAgIGlmIChpc0NvbGFJdGVtKGRhdGEpKSB7XG4gICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgRXJyb3IoYENvbm5lY3QgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbGFGYWN0b3J5KGRhdGE6IENvbGFJdGVtW10gLyogSlNPTiBkYXRhICovKTogdm9pZCB7XG4gICAgY29uc3QgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGRhdGEuZm9yRWFjaCgoZWw6IENvbGFJdGVtKSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgICAgY29uc3QgaXRlbVRlbXBsYXRlID0gYFxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWl0ZW1cIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgY2xhc3M9XCJpbWctaXRlbVwiIC8+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwidGl0LWl0ZW1cIj48L3N0cm9uZz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidHh0LXByaWNlXCI+PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBgO1xuXG4gICAgICBpdGVtLmlubmVySFRNTCA9IGl0ZW1UZW1wbGF0ZTtcblxuICAgICAgY29uc3QgYnV0dG9uSXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmJ0bi1pdGVtJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQuaXRlbSA9IGVsLm5hbWU7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQuY291bnQgPSBgJHtlbC5jb3VudH1gO1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0LnByaWNlID0gYCR7ZWwuY29zdH1gO1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0LmltZyA9IGVsLmltZztcblxuICAgICAgY29uc3QgaW1nSXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmltZy1pdGVtJykgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgIGltZ0l0ZW0uc3JjID0gYC4vc3JjL2Fzc2V0cy9pbWcvJHtlbC5pbWd9YDtcblxuICAgICAgY29uc3QgdGl0bGVJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudGl0LWl0ZW0nKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRpdGxlSXRlbS50ZXh0Q29udGVudCA9IGVsLm5hbWU7XG5cbiAgICAgIGNvbnN0IHByb2R1Y3RDb3N0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudHh0LXByaWNlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgcHJvZHVjdENvc3QudGV4dENvbnRlbnQgPSBgJHtlbC5jb3N0feybkGA7XG5cbiAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICB0aGlzLiNpdGVtTGlzdC5hcHBlbmRDaGlsZChkb2NGcmFnKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IG51bWJlckZvcm1hdCBmcm9tICcuLi91dGlsL251bWJlckZvcm1hdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlbmRpbmdNYWNoaW5lIHtcbiAgI2JhbGFuY2U6IEhUTUxTcGFuRWxlbWVudDtcbiAgI2l0ZW1MaXN0OiBIVE1MVUxpc3RFbGVtZW50O1xuICAjaW5wdXRDb3N0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICNidG5QdXQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAjYnRuUmV0dXJuOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgI2J0bkdldDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICNzdGFnZWRMaXN0OiBIVE1MVUxpc3RFbGVtZW50O1xuICAjbXlNb25leTogSFRNTFNwYW5FbGVtZW50O1xuICAjZ290TGlzdDogSFRNTFVMaXN0RWxlbWVudDtcbiAgI3R4dFRvdGFsOiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCB2ZW5kaW5nTWFjaGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLnZlbmRpbmctbWFjaGluZSdcbiAgICApIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuI2JhbGFuY2UgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy50eHQtYmFsYW5jZSdcbiAgICApIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICB0aGlzLiNpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWl0ZW0nKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgIHRoaXMuI2lucHV0Q29zdEVsID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcuaW5wLXB1dCdcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy4jYnRuUHV0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcihcbiAgICAgICcuYnRuLXB1dCdcbiAgICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHRoaXMuI2J0blJldHVybiA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJ0bi1yZXR1cm4nXG4gICAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICB0aGlzLiNidG5HZXQgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5idG4tZ2V0J1xuICAgICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgdGhpcy4jc3RhZ2VkTGlzdCA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmxpc3QtaXRlbS1zdGFnZWQnXG4gICAgKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuXG4gICAgY29uc3QgbXlpbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15LWluZm8nKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLiNteU1vbmV5ID0gbXlpbmZvLnF1ZXJ5U2VsZWN0b3IoJy50eHQtbXltb25leScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICB0aGlzLiNnb3RMaXN0ID0gbXlpbmZvLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmxpc3QtaXRlbS1zdGFnZWQnXG4gICAgKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgIHRoaXMuI3R4dFRvdGFsID0gbXlpbmZvLnF1ZXJ5U2VsZWN0b3IoJy50eHQtdG90YWwnKSBhcyBIVE1MRWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhZ2VkSXRlbUdlbmVyYXRvcih0YXJnZXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3Qgc3RhZ2VkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICBzdGFnZWRJdGVtLmRhdGFzZXQuaXRlbSA9IHRhcmdldC5kYXRhc2V0Lml0ZW0gfHwgJyc7XG4gICAgc3RhZ2VkSXRlbS5kYXRhc2V0LnByaWNlID0gdGFyZ2V0LmRhdGFzZXQucHJpY2UgfHwgJzAnO1xuICAgIHN0YWdlZEl0ZW0uaW5uZXJIVE1MID0gYFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tc3RhZ2VkXCI+XG4gICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgY2xhc3M9XCJpbWctaXRlbVwiPlxuICAgICAgICA8c3Ryb25nIGNsYXNzPVwidHh0LWl0ZW1cIj48L3N0cm9uZz5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJudW0tY291bnRlclwiPjwvc3Bhbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi11bnN0YWdlZFwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLW1pbnVzXCIgc3R5bGU9XCJjb2xvcjogI2YwM2YzZjtcIj48L2k+PC9kaXY+XG4gICAgICA8L2J1dHRvbj5cbiAgICBgO1xuXG4gICAgY29uc3QgdW5zdGFnZWRCdG4gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJ0bi11bnN0YWdlZCdcbiAgICApIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIHVuc3RhZ2VkQnRuLmlkID0gYCR7dGFyZ2V0LmRhdGFzZXQuaXRlbX1gO1xuXG4gICAgY29uc3QgaW1nSXRlbSA9IHN0YWdlZEl0ZW0ucXVlcnlTZWxlY3RvcignLmltZy1pdGVtJykgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICBpbWdJdGVtLnNyYyA9IGAuL3NyYy9hc3NldHMvaW1nLyR7dGFyZ2V0LmRhdGFzZXQuaW1nfWA7XG5cbiAgICBjb25zdCB0aXRsZUl0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy50eHQtaXRlbScpIGFzIEhUTUxFbGVtZW50O1xuICAgIHRpdGxlSXRlbS50ZXh0Q29udGVudCA9IHRhcmdldC5kYXRhc2V0Lml0ZW0gfHwgJyc7XG5cbiAgICBjb25zdCBxdWFudGl0eUl0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLm51bS1jb3VudGVyJ1xuICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCA9ICcxJztcblxuICAgIHRoaXMuI3N0YWdlZExpc3QuYXBwZW5kQ2hpbGQoc3RhZ2VkSXRlbSk7XG4gIH1cblxuICBwcml2YXRlIGJpbmRFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy4jc3RhZ2VkTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRFbCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgaWYgKHRhcmdldEVsLmNsYXNzTGlzdC5jb250YWlucygnZmEtY2lyY2xlLW1pbnVzJykpIHtcbiAgICAgICAgY29uc3QgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgdW5zdGFnZWRCdG4gPSB0YXJnZXRFbC5wYXJlbnRFbGVtZW50IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICBjb25zdCBzdGFnZWRJdGVtTGlzdCA9IHRoaXMuI3N0YWdlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgICAgICBjb25zdCB1cGRhdGVkU3RhZ2VkSXRlbUxpc3Q6IEhUTUxMSUVsZW1lbnRbXSA9XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKFxuICAgICAgICAgICAgc3RhZ2VkSXRlbUxpc3QsXG4gICAgICAgICAgICAoc3RhZ2VkSXRlbTogSFRNTExJRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc3RhZ2VkSXRlbS5kYXRhc2V0Lml0ZW0gJiZcbiAgICAgICAgICAgICAgICBzdGFnZWRJdGVtLmRhdGFzZXQuaXRlbSA9PT0gdW5zdGFnZWRCdG4uaWRcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIGJhbGFuY2UgdmFsdWUgd2hlbiB1bnN0YWdlZCBpdGVtIGlzIGNsaWNrZWQgYW5kIHJlbW92ZSBpdGVtIGZyb20gc3RhZ2VkIGxpc3RcbiAgICAgICAgICAgICAgICBjb25zdCBxdWFudGl0eUl0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAnLm51bS1jb3VudGVyJ1xuICAgICAgICAgICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VJbnQocXVhbnRpdHlJdGVtLnRleHRDb250ZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudEJhbGFuY2UgPSBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXN0YWdlZEl0ZW0uZGF0YXNldC5wcmljZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50QmFsYW5jZSArPSBwYXJzZUludChzdGFnZWRJdGVtLmRhdGFzZXQucHJpY2UpICogcXVhbnRpdHk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KGN1cnJlbnRCYWxhbmNlKTtcblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBpdGVtTGlzdCBxdWFudGl0eSB2YWx1ZSB3aGVuIHVuc3RhZ2VkIGl0ZW0gaXMgY2xpY2tlZFxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1MaXN0ID0gdGhpcy4jaXRlbUxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbDogSFRNTExJRWxlbWVudCA9IEFycmF5LnByb3RvdHlwZS5maW5kLmNhbGwoXG4gICAgICAgICAgICAgICAgICBpdGVtTGlzdCxcbiAgICAgICAgICAgICAgICAgIChjb2xhOiBIVE1MTElFbGVtZW50KSA9PlxuICAgICAgICAgICAgICAgICAgICBjb2xhLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLnRleHRDb250ZW50ID09PVxuICAgICAgICAgICAgICAgICAgICBzdGFnZWRJdGVtLmRhdGFzZXQuaXRlbVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXRFbC5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY29sYVF1YW50aXR5ID0gcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgICB0YXJnZXRFbC5maXJzdEVsZW1lbnRDaGlsZC5hdHRyaWJ1dGVzWzNdLnZhbHVlXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGNvbGFRdWFudGl0eSArPSBxdWFudGl0eTtcblxuICAgICAgICAgICAgICAgIHRhcmdldEVsLmZpcnN0RWxlbWVudENoaWxkLmF0dHJpYnV0ZXNbM10udmFsdWUgPVxuICAgICAgICAgICAgICAgICAgY29sYVF1YW50aXR5LnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb2xkLW91dCcpKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdzb2xkLW91dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0RWwuZmlyc3RFbGVtZW50Q2hpbGQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRFbC5maXJzdEVsZW1lbnRDaGlsZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBzdGFnZWRJdGVtLmRhdGFzZXQuaXRlbSAhPT0gdW5zdGFnZWRCdG4uaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB1cGRhdGVkU3RhZ2VkSXRlbUxpc3QuZm9yRWFjaCgobGlzdDogSFRNTExJRWxlbWVudCkgPT5cbiAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGxpc3QpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHN0YWdlZCBsaXN0IGFmdGVyIGNsZWFyaW5nIHN0YWdlZCBsaXN0XG4gICAgICAgIHRoaXMuI3N0YWdlZExpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuI3N0YWdlZExpc3QuYXBwZW5kKGRvY0ZyYWcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4jYnRuUHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLiNpbnB1dENvc3RFbC52YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5wdXRDb3N0ID0gcGFyc2VJbnQodGhpcy4jaW5wdXRDb3N0RWwudmFsdWUpO1xuXG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI215TW9uZXkudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSBwYXJzZUludChcbiAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICApO1xuXG4gICAgICBpZiAoIWlucHV0Q29zdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dENvc3QgPD0gbXlNb25leVZhbCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VkVmFsdWUgPSBteU1vbmV5VmFsIC0gaW5wdXRDb3N0O1xuICAgICAgICB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KGNoYW5nZWRWYWx1ZSkgKyAnIOybkCc7XG4gICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgPSBudW1iZXJGb3JtYXQoXG4gICAgICAgICAgKGJhbGFuY2VWYWwgPyBiYWxhbmNlVmFsIDogMCkgKyBpbnB1dENvc3RcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCfshozsp4DquIjsnbQg67aA7KGx7ZWp64uI64ukLicpO1xuICAgICAgfVxuICAgICAgLy8gY2xlYXIgaW5wdXQgdmFsdWVcbiAgICAgIHRoaXMuI2lucHV0Q29zdEVsLnZhbHVlID0gJyc7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNidG5SZXR1cm4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiYWxhbmNlVmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuI2JhbGFuY2UudGV4dENvbnRlbnQucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG15TW9uZXlWYWwgPSBwYXJzZUludChcbiAgICAgICAgdGhpcy4jbXlNb25leS50ZXh0Q29udGVudC5yZXBsYWNlQWxsKCcsJywgJycpXG4gICAgICApO1xuXG4gICAgICBpZiAoYmFsYW5jZVZhbCkge1xuICAgICAgICBjb25zdCByZXR1cm5Nb25leSA9IGJhbGFuY2VWYWwgKyBteU1vbmV5VmFsO1xuICAgICAgICB0aGlzLiNteU1vbmV5LnRleHRDb250ZW50ID0gbnVtYmVyRm9ybWF0KHJldHVybk1vbmV5KSArICfsm5AnO1xuICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50ID0gJzAnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoJ+uwmO2ZmOuQoCDqsbDsiqTrpoTrj4jsnbQg7JeG7Iq164uI64ukLicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYnRuc0NvbGEgPSB0aGlzLiNpdGVtTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblxuICAgIGJ0bnNDb2xhLmZvckVhY2goKGl0ZW06IEhUTUxCdXR0b25FbGVtZW50KSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSBwYXJzZUludChcbiAgICAgICAgICB0aGlzLiNiYWxhbmNlLnRleHRDb250ZW50LnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgaXNTdGFnZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0YXJnZXRFbC5kYXRhc2V0LnByaWNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhcmdldEVsUHJpY2UgPSBwYXJzZUludCh0YXJnZXRFbC5kYXRhc2V0LnByaWNlKTtcbiAgICAgICAgY29uc3Qgc3RhZ2VkTGlzdEl0ZW0gPSB0aGlzLiNzdGFnZWRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cbiAgICAgICAgaWYgKGJhbGFuY2VWYWwgPj0gdGFyZ2V0RWxQcmljZSkge1xuICAgICAgICAgIGNvbnN0IHdpdGhkcmF3ID0gYmFsYW5jZVZhbCAtIHRhcmdldEVsUHJpY2U7XG4gICAgICAgICAgdGhpcy4jYmFsYW5jZS50ZXh0Q29udGVudCA9IG51bWJlckZvcm1hdCh3aXRoZHJhdyk7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc3RhZ2VkTGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIGlmICghaXRlbS5kYXRhc2V0Lml0ZW0gfHwgIXRhcmdldEVsLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Lml0ZW0gPT09IHRhcmdldEVsLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICBpZiAoIXRhcmdldEVsLmRhdGFzZXQuY291bnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRhcmdldEVsLmRhdGFzZXQuY291bnQpID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBxdWFudGl0eUl0ZW0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAnLm51bS1jb3VudGVyJ1xuICAgICAgICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHF1YW50aXR5SXRlbS50ZXh0Q29udGVudCA9IGAke1xuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQocXVhbnRpdHlJdGVtLnRleHRDb250ZW50KSArIDFcbiAgICAgICAgICAgICAgICB9YDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpc1N0YWdlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghaXNTdGFnZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhZ2VkSXRlbUdlbmVyYXRvcih0YXJnZXRFbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCF0YXJnZXRFbC5kYXRhc2V0LmNvdW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCB0YXJnZXRDb3VudCA9IHBhcnNlSW50KHRhcmdldEVsLmRhdGFzZXQuY291bnQpO1xuXG4gICAgICAgICAgaWYgKHRhcmdldEVsLmRhdGFzZXQuY291bnQgJiYgdGFyZ2V0Q291bnQgPiAwKSB7XG4gICAgICAgICAgICB0YXJnZXRDb3VudCAtPSAxO1xuICAgICAgICAgICAgdGFyZ2V0RWwuZGF0YXNldC5jb3VudCA9IGAke3RhcmdldENvdW50fWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0YXJnZXRFbC5kYXRhc2V0LmNvdW50ICYmIHRhcmdldENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoIXRhcmdldEVsLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXRFbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NvbGQtb3V0Jyk7XG4gICAgICAgICAgICB0YXJnZXRFbC5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdlbScpO1xuICAgICAgICAgICAgd2FybmluZy50ZXh0Q29udGVudCA9ICftlbTri7kg7IOB7ZKI7J2AIO2SiOygiOyeheuLiOuLpC4nO1xuICAgICAgICAgICAgd2FybmluZy5jbGFzc0xpc3QuYWRkKCdpcicpO1xuICAgICAgICAgICAgdGFyZ2V0RWwucGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIHdhcm5pbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydCgn7J6U7JWh7J20IOu2gOyhse2VqeuLiOuLpCEg7J6F6riI7ZW07KO87IS47JqUficpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuI2J0bkdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCBpc0dvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHRvdGFsUHJpY2U6IG51bWJlciA9IDA7XG5cbiAgICAgIHRoaXMuI3N0YWdlZExpc3RcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAgICAgLmZvckVhY2goKGl0ZW1TdGFnZWQ6IEhUTUxMSUVsZW1lbnQpID0+IHtcbiAgICAgICAgICBpZiAoIWl0ZW1TdGFnZWQuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4jZ290TGlzdFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAgICAgICAgIC5mb3JFYWNoKChpdGVtR290OiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICghaXRlbUdvdC5kYXRhc2V0Lml0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoaXRlbVN0YWdlZC5kYXRhc2V0Lml0ZW0gPT09IGl0ZW1Hb3QuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1Hb3RDb3VudCA9IGl0ZW1Hb3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICAgKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhZ2VkUXVhbnRpdHkgPSBpdGVtU3RhZ2VkLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAnLm51bS1jb3VudGVyJ1xuICAgICAgICAgICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtR290Q291bnQudGV4dENvbnRlbnQgfHwgIXN0YWdlZFF1YW50aXR5LnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXRlbUdvdENvdW50LnRleHRDb250ZW50ID0gYCR7XG4gICAgICAgICAgICAgICAgICBwYXJzZUludChpdGVtR290Q291bnQudGV4dENvbnRlbnQpICtcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHN0YWdlZFF1YW50aXR5LnRleHRDb250ZW50KVxuICAgICAgICAgICAgICAgIH1gO1xuICAgICAgICAgICAgICAgIGlzR290ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIWlzR290KSB7XG4gICAgICAgICAgICB0aGlzLiNnb3RMaXN0LmFwcGVuZENoaWxkKGl0ZW1TdGFnZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI3N0YWdlZExpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgIHRoaXMuI2dvdExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKChpdGVtR290OiBIVE1MTElFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmICghaXRlbUdvdC5kYXRhc2V0LnByaWNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpdGVtR290LnF1ZXJ5U2VsZWN0b3IoJy5udW0tY291bnRlcicpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1Hb3RRdWFudGl0eUVsID0gaXRlbUdvdC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICkgYXMgSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgICAgIGNvbnN0IGl0ZW1Hb3RQcmljZSA9IHBhcnNlSW50KGl0ZW1Hb3QuZGF0YXNldC5wcmljZSk7XG4gICAgICAgIGNvbnN0IGl0ZW1Hb3RRdWFudGl0eSA9IHBhcnNlSW50KGl0ZW1Hb3RRdWFudGl0eUVsLnRleHRDb250ZW50IHx8ICcwJyk7XG5cbiAgICAgICAgdG90YWxQcmljZSArPSBpdGVtR290UHJpY2UgKiBpdGVtR290UXVhbnRpdHk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy4jdHh0VG90YWwudGV4dENvbnRlbnQgPSBg7LSdIOq4iOyVoTogJHtudW1iZXJGb3JtYXQodG90YWxQcmljZSl97JuQYDtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IENvbGFHZW5lcmF0b3IgZnJvbSAnLi9jb21wb25lbnRzL0NvbGFHZW5lcmF0b3InO1xuaW1wb3J0IFZlbmRpbmdNYWNoaW5lIGZyb20gJy4vY29tcG9uZW50cy9WZW5kaW5nTWFjaGluZSc7XG5cbmNvbnN0IGNvbGFHZW5lcmF0b3IgPSBuZXcgQ29sYUdlbmVyYXRvcigpO1xuY29uc3QgdmVuZGluZ01hY2hpbmUgPSBuZXcgVmVuZGluZ01hY2hpbmUoKTtcblxuLy8gVG9wLWxldmVsIGF3YWl0XG5hd2FpdCBjb2xhR2VuZXJhdG9yLnNldHVwKCk7XG52ZW5kaW5nTWFjaGluZS5zZXR1cCgpO1xuIiwiaW1wb3J0IHR5cGUgeyBDb2xhSXRlbSB9IGZyb20gJy4uL2NvbGFJdGVtJztcblxuLy8gQ29sYUl0ZW0g7YOA7J6F7J2EIOqwgOynhCDrsLDsl7Tsnbjsp4Ag7ZmV7J247ZWY64qUIO2DgOyehSDqsIDrk5xcbmV4cG9ydCBjb25zdCBpc0NvbGFJdGVtID0gKGl0ZW06IGFueSk6IGl0ZW0gaXMgQ29sYUl0ZW1bXSA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShpdGVtKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXRlbS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgaWYgKGl0ZW1bMF0ubmFtZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtWzBdLmNvc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXRlbVswXS5jb3VudCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtWzBdLmltZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG51bWJlckZvcm1hdChudW06IG51bWJlcikge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KG51bSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyIHdlYnBhY2tRdWV1ZXMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIHF1ZXVlc1wiKSA6IFwiX193ZWJwYWNrX3F1ZXVlc19fXCI7XG52YXIgd2VicGFja0V4cG9ydHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGV4cG9ydHNcIikgOiBcIl9fd2VicGFja19leHBvcnRzX19cIjtcbnZhciB3ZWJwYWNrRXJyb3IgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGVycm9yXCIpIDogXCJfX3dlYnBhY2tfZXJyb3JfX1wiO1xudmFyIHJlc29sdmVRdWV1ZSA9IChxdWV1ZSkgPT4ge1xuXHRpZihxdWV1ZSAmJiAhcXVldWUuZCkge1xuXHRcdHF1ZXVlLmQgPSAxO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tKSk7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0gPyBmbi5yKysgOiBmbigpKSk7XG5cdH1cbn1cbnZhciB3cmFwRGVwcyA9IChkZXBzKSA9PiAoZGVwcy5tYXAoKGRlcCkgPT4ge1xuXHRpZihkZXAgIT09IG51bGwgJiYgdHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIikge1xuXHRcdGlmKGRlcFt3ZWJwYWNrUXVldWVzXSkgcmV0dXJuIGRlcDtcblx0XHRpZihkZXAudGhlbikge1xuXHRcdFx0dmFyIHF1ZXVlID0gW107XG5cdFx0XHRxdWV1ZS5kID0gMDtcblx0XHRcdGRlcC50aGVuKChyKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXhwb3J0c10gPSByO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSwgKGUpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFcnJvcl0gPSBlO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgb2JqID0ge307XG5cdFx0XHRvYmpbd2VicGFja1F1ZXVlc10gPSAoZm4pID0+IChmbihxdWV1ZSkpO1xuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9XG5cdH1cblx0dmFyIHJldCA9IHt9O1xuXHRyZXRbd2VicGFja1F1ZXVlc10gPSB4ID0+IHt9O1xuXHRyZXRbd2VicGFja0V4cG9ydHNdID0gZGVwO1xuXHRyZXR1cm4gcmV0O1xufSkpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5hID0gKG1vZHVsZSwgYm9keSwgaGFzQXdhaXQpID0+IHtcblx0dmFyIHF1ZXVlO1xuXHRoYXNBd2FpdCAmJiAoKHF1ZXVlID0gW10pLmQgPSAxKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIChxdWV1ZS5kID0gMCk7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ21vZHVsZScgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==