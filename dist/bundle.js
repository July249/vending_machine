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
        <button type="button" class="btn-item" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
          <img src="./src/assets/img/${el.img}" alt="" class="img-item" />
          <strong class="tit-item">${el.name}</strong>
          <span class="txt-price">${el.cost}원</span>
        </button>
      `;
            item.innerHTML = itemTemplate;
            docFrag.appendChild(item);
        });
        this.itemList.appendChild(docFrag);
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
        <img src="./src/assets/img/${target.dataset.img}" alt="" class="img-item">
        <strong class="txt-item">${target.dataset.item}</strong>
        <span class="num-counter">1</span>
      </button>
    `;
        this.stagedList.appendChild(stagedItem);
    }
    bindEvents() {
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
                            let numCounter = item.querySelector('.num-counter');
                            numCounter.textContent = String(parseInt(item.querySelector('.num-counter').textContent) + 1);
                            isStaged = true;
                            break;
                        }
                    }
                    if (!isStaged) {
                        this.stagedItemGenerator(targetEl);
                    }
                    if (targetEl.dataset.count) {
                        targetCount -= 1;
                        targetEl.dataset.count = String(targetCount);
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
                        itemGotCount.textContent = String(parseInt(itemGotCount.textContent) +
                            parseInt(itemStaged.querySelector('.num-counter').textContent));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WyJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lLy4vc3JjL2NvbXBvbmVudHMvQ29sYUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvY29tcG9uZW50cy9WZW5kaW5nTWFjaGluZS50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vdmVuZGluZ19tYWNoaW5lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92ZW5kaW5nX21hY2hpbmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ZlbmRpbmdfbWFjaGluZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sYUdlbmVyYXRvciB7XG4gIGl0ZW1MaXN0OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbScpITtcbiAgfVxuXG4gIGFzeW5jIHNldHVwKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubG9hZERhdGEoKGpzb24pID0+IHtcbiAgICAgIHRoaXMuY29sYUZhY3RvcnkoanNvbik7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsb2FkRGF0YShjYWxsYmFjazogKGFyZzA6IGFueSkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9KdWx5MjQ5L3ZlbmRpbmdfbWFjaGluZS9tYWluL3B1YmxpYy9kYXRhL2l0ZW0uanNvbidcbiAgICApO1xuICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNhbGxiYWNrKGF3YWl0IHJlcy5qc29uKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgRXJyb3IoYENvbm5lY3QgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9XG4gIH1cblxuICBjb2xhRmFjdG9yeShkYXRhOiBhbnkgLyogSlNPTiBkYXRhICovKTogdm9pZCB7XG4gICAgY29uc3QgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGRhdGEuZm9yRWFjaChcbiAgICAgIChlbDogeyBuYW1lOiBzdHJpbmc7IGNvdW50OiBudW1iZXI7IGNvc3Q6IG51bWJlcjsgaW1nOiBhbnkgfSkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgY29uc3QgaXRlbVRlbXBsYXRlID0gYFxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1pdGVtXCIgZGF0YS1pdGVtPVwiJHtlbC5uYW1lfVwiIGRhdGEtY291bnQ9XCIke2VsLmNvdW50fVwiIGRhdGEtcHJpY2U9XCIke2VsLmNvc3R9XCIgZGF0YS1pbWc9XCIke2VsLmltZ31cIj5cbiAgICAgICAgICA8aW1nIHNyYz1cIi4vc3JjL2Fzc2V0cy9pbWcvJHtlbC5pbWd9XCIgYWx0PVwiXCIgY2xhc3M9XCJpbWctaXRlbVwiIC8+XG4gICAgICAgICAgPHN0cm9uZyBjbGFzcz1cInRpdC1pdGVtXCI+JHtlbC5uYW1lfTwvc3Ryb25nPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidHh0LXByaWNlXCI+JHtlbC5jb3N0feybkDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICBgO1xuICAgICAgICBpdGVtLmlubmVySFRNTCA9IGl0ZW1UZW1wbGF0ZTtcbiAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgdGhpcy5pdGVtTGlzdC5hcHBlbmRDaGlsZChkb2NGcmFnKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVuZGluZ01hY2hpbmUge1xuICBwcml2YXRlIGJhbGFuY2U6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGl0ZW1MaXN0OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBpbnB1dENvc3RFbDogSFRNTElucHV0RWxlbWVudDtcbiAgcHJpdmF0ZSBidG5QdXQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGJ0blJldHVybjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgYnRuR2V0OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBzdGFnZWRMaXN0OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBteU1vbmV5OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBnb3RMaXN0OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSB0eHRUb3RhbDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgdmVuZGluZ01hY2hpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmVuZGluZy1tYWNoaW5lJykhO1xuICAgIHRoaXMuYmFsYW5jZSA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoJy50eHQtYmFsYW5jZScpITtcbiAgICB0aGlzLml0ZW1MaXN0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbScpITtcbiAgICB0aGlzLmlucHV0Q29zdEVsID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLmlucC1wdXQnKSE7XG4gICAgdGhpcy5idG5QdXQgPSB2ZW5kaW5nTWFjaGluZS5xdWVyeVNlbGVjdG9yKCcuYnRuLXB1dCcpITtcbiAgICB0aGlzLmJ0blJldHVybiA9IHZlbmRpbmdNYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoJy5idG4tcmV0dXJuJykhO1xuICAgIHRoaXMuYnRuR2V0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLmJ0bi1nZXQnKSE7XG4gICAgdGhpcy5zdGFnZWRMaXN0ID0gdmVuZGluZ01hY2hpbmUucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbS1zdGFnZWQnKSE7XG5cbiAgICBjb25zdCBteWluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktaW5mbycpITtcbiAgICB0aGlzLm15TW9uZXkgPSBteWluZm8ucXVlcnlTZWxlY3RvcignLnR4dC1teW1vbmV5JykhO1xuICAgIHRoaXMuZ290TGlzdCA9IG15aW5mby5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtLXN0YWdlZCcpITtcbiAgICB0aGlzLnR4dFRvdGFsID0gbXlpbmZvLnF1ZXJ5U2VsZWN0b3IoJy50eHQtdG90YWwnKSE7XG4gIH1cblxuICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN0YWdlZEl0ZW1HZW5lcmF0b3IodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YWdlZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHN0YWdlZEl0ZW0uZGF0YXNldC5pdGVtID0gdGFyZ2V0LmRhdGFzZXQuaXRlbSE7XG4gICAgc3RhZ2VkSXRlbS5kYXRhc2V0LnByaWNlID0gdGFyZ2V0LmRhdGFzZXQucHJpY2UhO1xuICAgIHN0YWdlZEl0ZW0uaW5uZXJIVE1MID0gYFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tc3RhZ2VkXCI+XG4gICAgICAgIDxpbWcgc3JjPVwiLi9zcmMvYXNzZXRzL2ltZy8ke3RhcmdldC5kYXRhc2V0LmltZ31cIiBhbHQ9XCJcIiBjbGFzcz1cImltZy1pdGVtXCI+XG4gICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0eHQtaXRlbVwiPiR7dGFyZ2V0LmRhdGFzZXQuaXRlbX08L3N0cm9uZz5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJudW0tY291bnRlclwiPjE8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICBgO1xuICAgIHRoaXMuc3RhZ2VkTGlzdC5hcHBlbmRDaGlsZChzdGFnZWRJdGVtKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZEV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLmJ0blB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0Q29zdCA9IHBhcnNlSW50KHRoaXMuaW5wdXRDb3N0RWwudmFsdWUpO1xuICAgICAgY29uc3QgbXlNb25leVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLm15TW9uZXkudGV4dENvbnRlbnQhLnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG4gICAgICBjb25zdCBiYWxhbmNlVmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCEucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcblxuICAgICAgaWYgKGlucHV0Q29zdCkge1xuICAgICAgICBpZiAoaW5wdXRDb3N0IDw9IG15TW9uZXlWYWwpIHtcbiAgICAgICAgICB0aGlzLm15TW9uZXkudGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgbmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KG15TW9uZXlWYWwgLSBpbnB1dENvc3QpICsgJyDsm5AnO1xuICAgICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICBuZXcgSW50bC5OdW1iZXJGb3JtYXQoKS5mb3JtYXQoXG4gICAgICAgICAgICAgIChiYWxhbmNlVmFsID8gYmFsYW5jZVZhbCA6IDApICsgaW5wdXRDb3N0XG4gICAgICAgICAgICApICsgJyDsm5AnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KCfshozsp4DquIjsnbQg67aA7KGx7ZWp64uI64ukLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5wdXRDb3N0RWwudmFsdWUgPSBudWxsITtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYnRuUmV0dXJuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICB0aGlzLmJhbGFuY2UudGV4dENvbnRlbnQhLnJlcGxhY2VBbGwoJywnLCAnJylcbiAgICAgICk7XG4gICAgICBjb25zdCBteU1vbmV5VmFsID0gcGFyc2VJbnQoXG4gICAgICAgIHRoaXMubXlNb25leS50ZXh0Q29udGVudCEucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgKTtcblxuICAgICAgaWYgKGJhbGFuY2VWYWwpIHtcbiAgICAgICAgdGhpcy5teU1vbmV5LnRleHRDb250ZW50ID1cbiAgICAgICAgICBuZXcgSW50bC5OdW1iZXJGb3JtYXQoKS5mb3JtYXQoYmFsYW5jZVZhbCArIG15TW9uZXlWYWwpICsgJ+ybkCc7XG4gICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCA9ICfsm5AnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoJ+uwmO2ZmOuQoCDqsbDsiqTrpoTrj4jsnbQg7JeG7Iq164uI64ukLicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYnRuc0NvbGEgPSB0aGlzLml0ZW1MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG4gICAgYnRuc0NvbGEuZm9yRWFjaCgoaXRlbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHBhcnNlSW50KFxuICAgICAgICAgIHRoaXMuYmFsYW5jZS50ZXh0Q29udGVudCEucmVwbGFjZUFsbCgnLCcsICcnKVxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBpc1N0YWdlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB0YXJnZXRFbFByaWNlID0gcGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5wcmljZSEpO1xuICAgICAgICBsZXQgdGFyZ2V0Q291bnQgPSBwYXJzZUludCh0YXJnZXRFbC5kYXRhc2V0LmNvdW50ISk7XG4gICAgICAgIGNvbnN0IHN0YWdlZExpc3RJdGVtID0gdGhpcy5zdGFnZWRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgJ2xpJ1xuICAgICAgICApISBhcyBOb2RlTGlzdE9mPEhUTUxMSUVsZW1lbnQ+O1xuXG4gICAgICAgIGlmIChiYWxhbmNlVmFsID49IHRhcmdldEVsUHJpY2UpIHtcbiAgICAgICAgICB0aGlzLmJhbGFuY2UudGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgbmV3IEludGwuTnVtYmVyRm9ybWF0KCkuZm9ybWF0KGJhbGFuY2VWYWwgLSB0YXJnZXRFbFByaWNlKSArICfsm5AnO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHN0YWdlZExpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Lml0ZW0gPT09IHRhcmdldEVsLmRhdGFzZXQuaXRlbSkge1xuICAgICAgICAgICAgICBsZXQgbnVtQ291bnRlciA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAnLm51bS1jb3VudGVyJ1xuICAgICAgICAgICAgICApISBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgbnVtQ291bnRlci50ZXh0Q29udGVudCA9IFN0cmluZyhcbiAgICAgICAgICAgICAgICBwYXJzZUludChpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5udW0tY291bnRlcicpIS50ZXh0Q29udGVudCEpICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpc1N0YWdlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghaXNTdGFnZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhZ2VkSXRlbUdlbmVyYXRvcih0YXJnZXRFbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRhcmdldEVsLmRhdGFzZXQuY291bnQpIHtcbiAgICAgICAgICAgIHRhcmdldENvdW50IC09IDE7XG4gICAgICAgICAgICB0YXJnZXRFbC5kYXRhc2V0LmNvdW50ID0gU3RyaW5nKHRhcmdldENvdW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyc2VJbnQodGFyZ2V0RWwuZGF0YXNldC5jb3VudCEpID09PSAwKSB7XG4gICAgICAgICAgICB0YXJnZXRFbC5wYXJlbnRFbGVtZW50Py5jbGFzc0xpc3QuYWRkKCdzb2xkLW91dCcpO1xuICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2VtJykhIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgd2FybmluZy50ZXh0Q29udGVudCA9ICftlbTri7kg7IOB7ZKI7J2AIO2SiOygiOyeheuLiOuLpC4nO1xuICAgICAgICAgICAgd2FybmluZy5jbGFzc0xpc3QuYWRkKCdpcicpO1xuICAgICAgICAgICAgdGFyZ2V0RWwucGFyZW50RWxlbWVudD8uaW5zZXJ0QmVmb3JlKHdhcm5pbmcsIHRhcmdldEVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ+yelOyVoeydtCDrtoDsobHtlanri4jri6QhIOyeheq4iO2VtOyjvOyEuOyalH4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJ0bkdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCBpc0dvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHRvdGFsUHJpY2U6IG51bWJlciA9IDA7XG5cbiAgICAgIGZvciAoY29uc3QgaXRlbVN0YWdlZCBvZiB0aGlzLnN0YWdlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW1Hb3Qgb2YgdGhpcy5nb3RMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgICAgICBsZXQgaXRlbUdvdENvdW50ID0gaXRlbUdvdC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy5udW0tY291bnRlcidcbiAgICAgICAgICApISBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICBpZiAoaXRlbVN0YWdlZC5kYXRhc2V0Lml0ZW0gPT09IGl0ZW1Hb3QuZGF0YXNldC5pdGVtKSB7XG4gICAgICAgICAgICBpdGVtR290Q291bnQudGV4dENvbnRlbnQgPSBTdHJpbmcoXG4gICAgICAgICAgICAgIHBhcnNlSW50KGl0ZW1Hb3RDb3VudC50ZXh0Q29udGVudCEpICtcbiAgICAgICAgICAgICAgICBwYXJzZUludChpdGVtU3RhZ2VkLnF1ZXJ5U2VsZWN0b3IoJy5udW0tY291bnRlcicpIS50ZXh0Q29udGVudCEpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaXNHb3QgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaXNHb3QpIHtcbiAgICAgICAgICB0aGlzLmdvdExpc3QuYXBwZW5kQ2hpbGQoaXRlbVN0YWdlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGFnZWRMaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgICB0aGlzLmdvdExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKChpdGVtR290KSA9PiB7XG4gICAgICAgIHRvdGFsUHJpY2UgKz1cbiAgICAgICAgICBwYXJzZUludChpdGVtR290LmRhdGFzZXQucHJpY2UhKSAqXG4gICAgICAgICAgcGFyc2VJbnQoaXRlbUdvdC5xdWVyeVNlbGVjdG9yKCcubnVtLWNvdW50ZXInKSEudGV4dENvbnRlbnQhKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy50eHRUb3RhbC50ZXh0Q29udGVudCA9IGDstJ3quIjslaEgOiAke25ldyBJbnRsLk51bWJlckZvcm1hdCgpLmZvcm1hdChcbiAgICAgICAgdG90YWxQcmljZVxuICAgICAgKX3sm5BgO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgQ29sYUdlbmVyYXRvciBmcm9tICcuL2NvbXBvbmVudHMvQ29sYUdlbmVyYXRvcic7XG5pbXBvcnQgVmVuZGluZ01hY2hpbmUgZnJvbSAnLi9jb21wb25lbnRzL1ZlbmRpbmdNYWNoaW5lJztcblxuY29uc3QgY29sYUdlbmVyYXRvciA9IG5ldyBDb2xhR2VuZXJhdG9yKCk7XG5jb25zdCB2ZW5kaW5nTWFjaGluZSA9IG5ldyBWZW5kaW5nTWFjaGluZSgpO1xuXG4vLyBUb3AtbGV2ZWwgYXdhaXRcbmF3YWl0IGNvbGFHZW5lcmF0b3Iuc2V0dXAoKTtcbnZlbmRpbmdNYWNoaW5lLnNldHVwKCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyIHdlYnBhY2tRdWV1ZXMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIHF1ZXVlc1wiKSA6IFwiX193ZWJwYWNrX3F1ZXVlc19fXCI7XG52YXIgd2VicGFja0V4cG9ydHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGV4cG9ydHNcIikgOiBcIl9fd2VicGFja19leHBvcnRzX19cIjtcbnZhciB3ZWJwYWNrRXJyb3IgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2woXCJ3ZWJwYWNrIGVycm9yXCIpIDogXCJfX3dlYnBhY2tfZXJyb3JfX1wiO1xudmFyIHJlc29sdmVRdWV1ZSA9IChxdWV1ZSkgPT4ge1xuXHRpZihxdWV1ZSAmJiAhcXVldWUuZCkge1xuXHRcdHF1ZXVlLmQgPSAxO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tKSk7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0gPyBmbi5yKysgOiBmbigpKSk7XG5cdH1cbn1cbnZhciB3cmFwRGVwcyA9IChkZXBzKSA9PiAoZGVwcy5tYXAoKGRlcCkgPT4ge1xuXHRpZihkZXAgIT09IG51bGwgJiYgdHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIikge1xuXHRcdGlmKGRlcFt3ZWJwYWNrUXVldWVzXSkgcmV0dXJuIGRlcDtcblx0XHRpZihkZXAudGhlbikge1xuXHRcdFx0dmFyIHF1ZXVlID0gW107XG5cdFx0XHRxdWV1ZS5kID0gMDtcblx0XHRcdGRlcC50aGVuKChyKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXhwb3J0c10gPSByO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSwgKGUpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFcnJvcl0gPSBlO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgb2JqID0ge307XG5cdFx0XHRvYmpbd2VicGFja1F1ZXVlc10gPSAoZm4pID0+IChmbihxdWV1ZSkpO1xuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9XG5cdH1cblx0dmFyIHJldCA9IHt9O1xuXHRyZXRbd2VicGFja1F1ZXVlc10gPSB4ID0+IHt9O1xuXHRyZXRbd2VicGFja0V4cG9ydHNdID0gZGVwO1xuXHRyZXR1cm4gcmV0O1xufSkpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5hID0gKG1vZHVsZSwgYm9keSwgaGFzQXdhaXQpID0+IHtcblx0dmFyIHF1ZXVlO1xuXHRoYXNBd2FpdCAmJiAoKHF1ZXVlID0gW10pLmQgPSAxKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIChxdWV1ZS5kID0gMCk7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ21vZHVsZScgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==