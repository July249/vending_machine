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
                const updatedStagedItemList = Array.prototype.filter.call(stagedItemList, (item) => { var _a; return ((_a = item.dataset) === null || _a === void 0 ? void 0 : _a.item) !== (unstagedBtn === null || unstagedBtn === void 0 ? void 0 : unstagedBtn.id); });
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
                    this.balance.textContent =
                        new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputCost) + ' 원';
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
                this.balance.textContent = '원';
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
                    this.balance.textContent =
                        new Intl.NumberFormat().format(balanceVal - targetElPrice) + '원';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxFQUFFLENBQUM7QUFDNUIsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDOzs7Ozs7Ozs7VUNSdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBLHNHQUFzRztXQUN0RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDaEVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL2NvbXBvbmVudHMvQ29sYUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvY29tcG9uZW50cy9WZW5kaW5nTWFjaGluZS50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidHlwZSBEYXRhID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvc3Q6IG51bWJlcjtcbiAgaW1nOiBzdHJpbmc7XG4gIGNvdW50OiBudW1iZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xhR2VuZXJhdG9yIHtcbiAgaXRlbUxpc3Q6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtJykhO1xuICB9XG5cbiAgYXN5bmMgc2V0dXAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgoanNvbikgPT4ge1xuICAgICAgdGhpcy5jb2xhRmFjdG9yeShqc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGxvYWREYXRhKGNhbGxiYWNrOiAoYXJnOiBbXSkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9KdWx5MjQ5L3ZlbmRpbmdfbWFjaGluZS9tYWluL3B1YmxpYy9kYXRhL2l0ZW0uanNvbidcbiAgICApO1xuICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNhbGxiYWNrKGF3YWl0IHJlcy5qc29uKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgRXJyb3IoYENvbm5lY3QgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9XG4gIH1cblxuICBjb2xhRmFjdG9yeShkYXRhOiBEYXRhW10gLyogSlNPTiBkYXRhICovKTogdm9pZCB7XG4gICAgY29uc3QgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGRhdGEuZm9yRWFjaCgoZWw6IERhdGEpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgICBjb25zdCBpdGVtVGVtcGxhdGUgPSBgXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4taXRlbVwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJcIiBhbHQ9XCJcIiBjbGFzcz1cImltZy1pdGVtXCIgLz5cbiAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0aXQtaXRlbVwiPjwvc3Ryb25nPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eHQtcHJpY2VcIj48L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIGA7XG5cbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gaXRlbVRlbXBsYXRlO1xuXG4gICAgICBjb25zdCBidXR0b25JdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYnRuLWl0ZW0nKSEgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQuaXRlbSA9IGVsLm5hbWU7XG4gICAgICBidXR0b25JdGVtLmRhdGFzZXQuY291bnQgPSBgJHtlbC5jb3VudH1gO1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0LnByaWNlID0gYCR7ZWwuY29zdH1gO1xuICAgICAgYnV0dG9uSXRlbS5kYXRhc2V0LmltZyA9IGVsLmltZztcblxuICAgICAgY29uc3QgaW1nSXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmltZy1pdGVtJykhIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICBpbWdJdGVtLnNyYyA9IGAuL3NyYy9hc3NldHMvaW1nLyR7ZWwuaW1nfWA7XG5cbiAgICAgIGNvbnN0IHRpdGxlSXRlbSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRpdC1pdGVtJykhIGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGl0bGVJdGVtLnRleHRDb250ZW50ID0gZWwubmFtZTtcblxuICAgICAgY29uc3QgcHJvZHVjdENvc3QgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50eHQtcHJpY2UnKSEgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgcHJvZHVjdENvc3QudGV4dENvbnRlbnQgPSBgJHtlbC5jb3N0feybkGA7XG5cbiAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICB0aGlzLml0ZW1MaXN0LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZW5kaW5nTWFjaGluZSB7XG4gIHByaXZhdGUgYmFsYW5jZTogSFRNTFNwYW5FbGVtZW50O1xuICBwcml2YXRlIGl0ZW1MaXN0OiBIVE1MVUxpc3RFbGVtZW50O1xuICBwcml2YXRlIGlucHV0Q29zdEVsOiBIVE1MSW5wdXRFbGVtZW50O1xuICBwcml2YXRlIGJ0blB1dDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIHByaXZhdGUgYnRuUmV0dXJuOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgcHJpdmF0ZSBidG5HZXQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICBwcml2YXRlIHN0YWdlZExpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gIHByaXZhdGUgbXlNb25leTogSFRNTFNwYW5FbGVtZW50O1xuICBwcml2YXRlIGdvdExpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gIHByaXZhdGUgdHh0VG90YWw6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHZlbmRpbmdNYWNoaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcudmVuZGluZy1tYWNoaW5lJ1xuICAgICkhIGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuYmFsYW5jZSA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoJy50eHQtYmFsYW5jZScpITtcbiAgICB0aGlzLml0ZW1MaXN0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbScpITtcbiAgICB0aGlzLmlucHV0Q29zdEVsID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLmlucC1wdXQnKSE7XG4gICAgdGhpcy5idG5QdXQgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKCcuYnRuLXB1dCcpITtcbiAgICB0aGlzLmJ0blJldHVybiA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoJy5idG4tcmV0dXJuJykhO1xuICAgIHRoaXMuYnRuR2V0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLmJ0bi1nZXQnKSE7XG4gICAgdGhpcy5zdGFnZWRMaXN0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbS1zdGFnZWQnKSE7XG5cbiAgICBjb25zdCBteWluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktaW5mbycpISBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLm15TW9uZXkgPSBteWluZm8ucXVlcnlTZWxlY3RvcignLnR4dC1teW1vbmV5JykhO1xuICAgIHRoaXMuZ290TGlzdCA9IG15aW5mby5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtLXN0YWdlZCcpITtcbiAgICB0aGlzLnR4dFRvdGFsID0gbXlpbmZvLnF1ZXJ5U2VsZWN0b3IoJy50eHQtdG90YWwnKSE7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN0YWdlZEl0ZW1HZW5lcmF0b3IodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YWdlZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHN0YWdlZEl0ZW0uZGF0YXNldC5pdGVtID0gdGFyZ2V0LmRhdGFzZXQuaXRlbSE7XG4gICAgc3RhZ2VkSXRlbS5kYXRhc2V0LnByaWNlID0gdGFyZ2V0LmRhdGFzZXQucHJpY2UhO1xuICAgIHN0YWdlZEl0ZW0uaW5uZXJIVE1MID0gYFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tc3RhZ2VkXCI+XG4gICAgICAgIDxpbWcgc3JjPVwiXCIgYWx0PVwiXCIgY2xhc3M9XCJpbWctaXRlbVwiPlxuICAgICAgICA8c3Ryb25nIGNsYXNzPVwidHh0LWl0ZW1cIj48L3N0cm9uZz5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJudW0tY291bnRlclwiPjE8L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tdW5zdGFnZWRcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZS1taW51c1wiIHN0eWxlPVwiY29sb3I6ICNmMDNmM2Y7XCI+PC9pPjwvZGl2PlxuICAgICAgPC9idXR0b24+XG4gICAgYDtcblxuICAgIGNvbnN0IHVuc3RhZ2VkQnRuID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5idG4tdW5zdGFnZWQnXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgdW5zdGFnZWRCdG4uaWQgPSBgJHt0YXJnZXQuZGF0YXNldC5pdGVtfWA7XG5cbiAgICBjb25zdCBpbWdJdGVtID0gc3RhZ2VkSXRlbS5xdWVyeVNlbGVjdG9yKCcuaW1nLWl0ZW0nKSEgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICBpbWdJdGVtLnNyYyA9IGAuL3NyYy9hc3NldHMvaW1nLyR7dGFyZ2V0LmRhdGFzZXQuaW1nfWA7XG5cbiAgICBjb25zdCB0aXRsZUl0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy50eHQtaXRlbScpISBhcyBIVE1MRWxlbWVudDtcbiAgICB0aXRsZUl0ZW0udGV4dENvbnRlbnQgPSBgJHt0YXJnZXQuZGF0YXNldC5pdGVtfWA7XG5cbiAgICBjb25zdCBxdWFudGl0eUl0ZW0gPSBzdGFnZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLm51bS1jb3VudGVyJ1xuICAgICkhIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgPSAnMSc7XG5cbiAgICB0aGlzLnN0YWdlZExpc3QuYXBwZW5kQ2hpbGQoc3RhZ2VkSXRlbSk7XG4gIH1cblxuICBwcml2YXRlIGJpbmRFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFnZWRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldEVsID0gZS50YXJnZXQhIGFzIEhUTUxFbGVtZW50O1xuICAgICAgaWYgKHRhcmdldEVsLmNsYXNzTGlzdC5jb250YWlucygnZmEtY2lyY2xlLW1pbnVzJykpIHtcbiAgICAgICAgY29uc3QgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgdW5zdGFnZWRCdG4gPSB0YXJnZXRFbC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBzdGFnZWRJdGVtTGlzdCA9IHRoaXMuc3RhZ2VkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICdsaSdcbiAgICAgICAgKSEgYXMgTm9kZUxpc3RPZjxIVE1MTElFbGVtZW50PjtcbiAgICAgICAgY29uc3QgdXBkYXRlZFN0YWdlZEl0ZW1MaXN0OiBIVE1MTElFbGVtZW50W10gPVxuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChcbiAgICAgICAgICAgIHN0YWdlZEl0ZW1MaXN0LFxuICAgICAgICAgICAgKGl0ZW06IEhUTUxMSUVsZW1lbnQpID0+IGl0ZW0uZGF0YXNldD8uaXRlbSAhPT0gdW5zdGFnZWRCdG4/LmlkIVxuICAgICAgICAgICk7XG5cbiAgICAgICAgZm9yIChjb25zdCBsaXN0IG9mIHVwZGF0ZWRTdGFnZWRJdGVtTGlzdCkge1xuICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQobGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YWdlZExpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuc3RhZ2VkTGlzdC5hcHBlbmQoZG9jRnJhZyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmJ0blB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0Q29zdCA9IHBhcnNlSW50KHRoaXMuaW5wdXRDb3N0RWwudmFsdWUpO1xuICAgICAgY29uc3QgbXlNb25leVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLm15TW9uZXkudGV4dENvbnRlbnQhLnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG4gICAgICBjb25zdCBiYWxhbmNlVmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCEucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcblxuICAgICAgaWYgKGlucHV0Q29zdCkge1xuICAgICAgICBpZiAoaW5wdXRDb3N0IDw9IG15TW9uZXlWYWwpIHtcbiAgICAgICAgICB0aGlzLm15TW9uZXkudGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgbmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KG15TW9uZXlWYWwgLSBpbnB1dENvc3QpICsgJyDsm5AnO1xuICAgICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICBuZXcgSW50bC5OdW1iZXJGb3JtYXQoKS5mb3JtYXQoXG4gICAgICAgICAgICAgIChiYWxhbmNlVmFsID8gYmFsYW5jZVZhbCA6IDApICsgaW5wdXRDb3N0XG4gICAgICAgICAgICApICsgJyDsm5AnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KCfshozsp4DquIjsnbQg67aA7KGx7ZWp64uI64ukLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5wdXRDb3N0RWwudmFsdWUgPSBudWxsITtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYnRuUmV0dXJuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLmJhbGFuY2UudGV4dENvbnRlbnQhLnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMubXlNb25leS50ZXh0Q29udGVudCEucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcblxuICAgICAgaWYgKGJhbGFuY2VWYWwpIHtcbiAgICAgICAgdGhpcy5teU1vbmV5LnRleHRDb250ZW50ID1cbiAgICAgICAgICBuZXcgSW50bC5OdW1iZXJGb3JtYXQoKS5mb3JtYXQoYmFsYW5jZVZhbCArIG15TW9uZXlWYWwpICsgJ+ybkCc7XG4gICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCA9ICfsm5AnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoJ+uwmO2ZmOuQoCDqsbDsiqTrpoTrj4jsnbQg7JeG7Iq164uI64ukLicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYnRuc0NvbGEgPSB0aGlzLml0ZW1MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAnYnV0dG9uJ1xuICAgICkhIGFzIE5vZGVMaXN0T2Y8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xuXG4gICAgYnRuc0NvbGEuZm9yRWFjaCgoaXRlbTogSFRNTEJ1dHRvbkVsZW1lbnQpID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCEucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBpc1N0YWdlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB0YXJnZXRFbFByaWNlID0gcGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5wcmljZSEpO1xuICAgICAgICBsZXQgdGFyZ2V0Q291bnQgPSBwYXJzZUludCh0YXJnZXRFbC5kYXRhc2V0LmNvdW50ISk7XG4gICAgICAgIGNvbnN0IHN0YWdlZExpc3RJdGVtID0gdGhpcy5zdGFnZWRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgJ2xpJ1xuICAgICAgICApISBhcyBOb2RlTGlzdE9mPEhUTUxMSUVsZW1lbnQ+O1xuXG4gICAgICAgIGlmIChiYWxhbmNlVmFsID49IHRhcmdldEVsUHJpY2UpIHtcbiAgICAgICAgICB0aGlzLmJhbGFuY2UudGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgbmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KGJhbGFuY2VWYWwgLSB0YXJnZXRFbFByaWNlKSArICfsm5AnO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHN0YWdlZExpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Lml0ZW0gPT09IHRhcmdldEVsLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICBsZXQgcXVhbnRpdHlJdGVtID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICcubnVtLWNvdW50ZXInXG4gICAgICAgICAgICAgICkhIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICBxdWFudGl0eUl0ZW0udGV4dENvbnRlbnQgPSBgJHtcbiAgICAgICAgICAgICAgICBwYXJzZUludChpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5udW0tY291bnRlcicpIS50ZXh0Q29udGVudCEpICsgMVxuICAgICAgICAgICAgICB9YDtcbiAgICAgICAgICAgICAgaXNTdGFnZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWlzU3RhZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YWdlZEl0ZW1HZW5lcmF0b3IodGFyZ2V0RWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0YXJnZXRFbC5kYXRhc2V0LmNvdW50KSB7XG4gICAgICAgICAgICB0YXJnZXRDb3VudCAtPSAxO1xuICAgICAgICAgICAgdGFyZ2V0RWwuZGF0YXNldC5jb3VudCA9IGAke3RhcmdldENvdW50fWA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcnNlSW50KHRhcmdldEVsLmRhdGFzZXQuY291bnQhKSA9PT0gMCkge1xuICAgICAgICAgICAgdGFyZ2V0RWwucGFyZW50RWxlbWVudD8uY2xhc3NMaXN0LmFkZCgnc29sZC1vdXQnKTtcblxuICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2VtJykhIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgd2FybmluZy50ZXh0Q29udGVudCA9ICftlbTri7kg7IOB7ZKI7J2AIO2SiOygiOyeheuLiOuLpC4nO1xuICAgICAgICAgICAgd2FybmluZy5jbGFzc0xpc3QuYWRkKCdpcicpO1xuICAgICAgICAgICAgdGFyZ2V0RWwucGFyZW50RWxlbWVudD8uaW5zZXJ0QmVmb3JlKHdhcm5pbmcsIHRhcmdldEVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ+yelOyVoeydtCDrtoDsobHtlanri4jri6QhIOyeheq4iO2VtOyjvOyEuOyalH4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJ0bkdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCBpc0dvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHRvdGFsUHJpY2U6IG51bWJlciA9IDA7XG5cbiAgICAgIGZvciAoY29uc3QgaXRlbVN0YWdlZCBvZiB0aGlzLnN0YWdlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW1Hb3Qgb2YgdGhpcy5nb3RMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgICAgICBsZXQgaXRlbUdvdENvdW50ID0gaXRlbUdvdC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgICApISBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgaWYgKGl0ZW1TdGFnZWQuZGF0YXNldC5pdGVtID09PSBpdGVtR290LmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgaXRlbUdvdENvdW50LnRleHRDb250ZW50ID0gYCR7XG4gICAgICAgICAgICAgIHBhcnNlSW50KGl0ZW1Hb3RDb3VudC50ZXh0Q29udGVudCEpICtcbiAgICAgICAgICAgICAgcGFyc2VJbnQoaXRlbVN0YWdlZC5xdWVyeVNlbGVjdG9yKCcubnVtLWNvdW50ZXInKSEudGV4dENvbnRlbnQhKVxuICAgICAgICAgICAgfWA7XG4gICAgICAgICAgICBpc0dvdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0dvdCkge1xuICAgICAgICAgIHRoaXMuZ290TGlzdC5hcHBlbmRDaGlsZChpdGVtU3RhZ2VkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YWdlZExpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgIHRoaXMuZ290TGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2goKGl0ZW1Hb3QpID0+IHtcbiAgICAgICAgdG90YWxQcmljZSArPVxuICAgICAgICAgIHBhcnNlSW50KGl0ZW1Hb3QuZGF0YXNldC5wcmljZSEpICpcbiAgICAgICAgICBwYXJzZUludChpdGVtR290LnF1ZXJ5U2VsZWN0b3IoJy5udW0tY291bnRlcicpIS50ZXh0Q29udGVudCEpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnR4dFRvdGFsLnRleHRDb250ZW50ID0gYOy0neq4iOyVoSA6ICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KFxuICAgICAgICB0b3RhbFByaWNlXG4gICAgICApfeybkGA7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBDb2xhR2VuZXJhdG9yIGZyb20gJy4vY29tcG9uZW50cy9Db2xhR2VuZXJhdG9yJztcbmltcG9ydCBWZW5kaW5nTWFjaGluZSBmcm9tICcuL2NvbXBvbmVudHMvVmVuZGluZ01hY2hpbmUnO1xuXG5jb25zdCBjb2xhR2VuZXJhdG9yID0gbmV3IENvbGFHZW5lcmF0b3IoKTtcbmNvbnN0IHZlbmRpbmdNYWNoaW5lID0gbmV3IFZlbmRpbmdNYWNoaW5lKCk7XG5cbi8vIFRvcC1sZXZlbCBhd2FpdFxuYXdhaXQgY29sYUdlbmVyYXRvci5zZXR1cCgpO1xudmVuZGluZ01hY2hpbmUuc2V0dXAoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmICFxdWV1ZS5kKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IDEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9