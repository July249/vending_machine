export default class VendingMachine {
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
      </button>
    `;
        const imgItem = stagedItem.querySelector('.img-item');
        imgItem.src = `./src/assets/img/${target.dataset.img}`;
        const titleItem = stagedItem.querySelector('.txt-item');
        titleItem.textContent = `${target.dataset.item}`;
        const quantityItem = stagedItem.querySelector('.num-counter');
        quantityItem.textContent = '1';
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
                            let quantityItem = item.querySelector('.num-counter');
                            quantityItem.textContent = String(parseInt(item.querySelector('.num-counter').textContent) + 1);
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
//# sourceMappingURL=VendingMachine.js.map