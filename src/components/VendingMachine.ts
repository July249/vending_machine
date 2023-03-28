import numberFormat from '../util/numberFormat';

export default class VendingMachine {
  #balance: HTMLSpanElement;
  #itemList: HTMLUListElement;
  #inputCostEl: HTMLInputElement;
  #btnPut: HTMLButtonElement;
  #btnReturn: HTMLButtonElement;
  #btnGet: HTMLButtonElement;
  #stagedList: HTMLUListElement;
  #myMoney: HTMLSpanElement;
  #gotList: HTMLUListElement;
  #txtTotal: HTMLElement;

  constructor() {
    const vendingMachine = document.querySelector(
      '.vending-machine'
    ) as HTMLElement;
    this.#balance = vendingMachine.querySelector(
      '.txt-balance'
    ) as HTMLSpanElement;
    this.#itemList = document.querySelector('.list-item') as HTMLUListElement;
    this.#inputCostEl = vendingMachine.querySelector(
      '.inp-put'
    ) as HTMLInputElement;
    this.#btnPut = vendingMachine.querySelector(
      '.btn-put'
    ) as HTMLButtonElement;
    this.#btnReturn = vendingMachine.querySelector(
      '.btn-return'
    ) as HTMLButtonElement;
    this.#btnGet = vendingMachine.querySelector(
      '.btn-get'
    ) as HTMLButtonElement;
    this.#stagedList = vendingMachine.querySelector(
      '.list-item-staged'
    ) as HTMLUListElement;

    const myinfo = document.querySelector('.my-info') as HTMLElement;
    this.#myMoney = myinfo.querySelector('.txt-mymoney') as HTMLSpanElement;
    this.#gotList = myinfo.querySelector(
      '.list-item-staged'
    ) as HTMLUListElement;
    this.#txtTotal = myinfo.querySelector('.txt-total') as HTMLElement;
  }

  public setup(): void {
    this.bindEvents();
  }

  private stagedItemGenerator(target: HTMLElement): void {
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

    const unstagedBtn = stagedItem.querySelector(
      '.btn-unstaged'
    ) as HTMLDivElement;
    unstagedBtn.id = `${target.dataset.item}`;

    const imgItem = stagedItem.querySelector('.img-item') as HTMLImageElement;
    imgItem.src = `./src/assets/img/${target.dataset.img}`;

    const titleItem = stagedItem.querySelector('.txt-item') as HTMLElement;
    titleItem.textContent = target.dataset.item || '';

    const quantityItem = stagedItem.querySelector(
      '.num-counter'
    ) as HTMLSpanElement;
    quantityItem.textContent = '1';

    this.#stagedList.appendChild(stagedItem);
  }

  private bindEvents(): void {
    this.#stagedList.addEventListener('click', (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (targetEl.classList.contains('fa-circle-minus')) {
        const docFrag = document.createDocumentFragment();
        const unstagedBtn = targetEl.parentElement as HTMLDivElement;
        const stagedItemList = this.#stagedList.querySelectorAll('li');

        const updatedStagedItemList: HTMLLIElement[] =
          Array.prototype.filter.call(stagedItemList, (item: HTMLLIElement) => {
            if (item.dataset?.item === unstagedBtn?.id) {
              const quantityItem = item.querySelector(
                '.num-counter'
              ) as HTMLSpanElement;

              if (typeof quantityItem.textContent !== 'string') {
                return;
              }
              const quantity = parseInt(quantityItem.textContent);

              if (!this.#balance.textContent) {
                return;
              }

              let currentBalance = parseInt(
                this.#balance.textContent.replaceAll(',', '')
              );

              if (!item.dataset.price) {
                return;
              }
              currentBalance += parseInt(item.dataset.price) * quantity;

              this.#balance.textContent = numberFormat(currentBalance);
            }
            return item.dataset.item !== unstagedBtn.id;
          });

        updatedStagedItemList.forEach((list: HTMLLIElement) =>
          docFrag.appendChild(list)
        );

        this.#stagedList.innerHTML = '';
        this.#stagedList.append(docFrag);
      }
    });

    this.#btnPut.addEventListener('click', () => {
      if (typeof this.#inputCostEl.value !== 'string') {
        return;
      }
      if (typeof this.#balance.textContent !== 'string') {
        return;
      }
      if (typeof this.#myMoney.textContent !== 'string') {
        return;
      }

      const inputCost = parseInt(this.#inputCostEl.value);

      const myMoneyVal = parseInt(
        this.#myMoney.textContent.replaceAll(',', '')
      );
      const balanceVal = parseInt(
        this.#balance.textContent.replaceAll(',', '')
      );

      if (!inputCost) {
        return;
      }

      if (inputCost <= myMoneyVal) {
        const changedValue = myMoneyVal - inputCost;
        this.#myMoney.textContent = numberFormat(changedValue) + ' 원';
        this.#balance.textContent = numberFormat(
          (balanceVal ? balanceVal : 0) + inputCost
        );
      } else {
        alert('소지금이 부족합니다.');
      }
      // clear input value
      this.#inputCostEl.value = '';
    });

    this.#btnReturn.addEventListener('click', () => {
      if (typeof this.#balance.textContent !== 'string') {
        return;
      }
      if (typeof this.#myMoney.textContent !== 'string') {
        return;
      }

      const balanceVal = parseInt(
        this.#balance.textContent.replaceAll(',', '')
      );
      const myMoneyVal = parseInt(
        this.#myMoney.textContent.replaceAll(',', '')
      );

      if (balanceVal) {
        const returnMoney = balanceVal + myMoneyVal;
        this.#myMoney.textContent = numberFormat(returnMoney) + '원';
        this.#balance.textContent = '0';
      } else {
        alert('반환될 거스름돈이 없습니다.');
      }
    });

    const btnsCola = this.#itemList.querySelectorAll('button');

    btnsCola.forEach((item: HTMLButtonElement) => {
      item.addEventListener('click', (e: MouseEvent) => {
        const targetEl = e.currentTarget as HTMLButtonElement;

        if (!this.#balance.textContent) {
          return;
        }
        const balanceVal = parseInt(
          this.#balance.textContent.replaceAll(',', '')
        );

        let isStaged = false;
        if (!targetEl.dataset.price) {
          return;
        }
        const targetElPrice = parseInt(targetEl.dataset.price);
        const stagedListItem = this.#stagedList.querySelectorAll('li');

        if (balanceVal >= targetElPrice) {
          const withdraw = balanceVal - targetElPrice;
          this.#balance.textContent = numberFormat(withdraw);

          for (const item of stagedListItem) {
            if (!item.dataset.item || !targetEl.dataset.item) {
              return;
            }

            if (item.dataset.item === targetEl.dataset.item) {
              let quantityItem = item.querySelector(
                '.num-counter'
              ) as HTMLElement;
              if (typeof quantityItem.textContent !== 'string') {
                return;
              }
              quantityItem.textContent = `${
                parseInt(quantityItem.textContent) + 1
              }`;
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
        } else {
          alert('잔액이 부족합니다! 입금해주세요~');
        }
      });
    });

    this.#btnGet.addEventListener('click', () => {
      let isGot: boolean = false;
      let totalPrice: number = 0;

      this.#stagedList
        .querySelectorAll('li')
        .forEach((itemStaged: HTMLLIElement) => {
          if (!itemStaged.dataset.item) {
            return;
          }

          this.#gotList
            .querySelectorAll('li')
            .forEach((itemGot: HTMLLIElement) => {
              if (!itemGot.dataset.item) {
                return;
              }

              if (itemStaged.dataset.item === itemGot.dataset.item) {
                let itemGotCount = itemGot.querySelector(
                  '.num-counter'
                ) as HTMLSpanElement;
                const stagedQuantity = itemStaged.querySelector(
                  '.num-counter'
                ) as HTMLSpanElement;

                if (!itemGotCount.textContent || !stagedQuantity.textContent) {
                  return;
                }

                itemGotCount.textContent = `${
                  parseInt(itemGotCount.textContent) +
                  parseInt(stagedQuantity.textContent)
                }`;
                isGot = true;
              }
            });

          if (!isGot) {
            this.#gotList.appendChild(itemStaged);
          }
        });

      this.#stagedList.innerHTML = '';

      this.#gotList.querySelectorAll('li').forEach((itemGot: HTMLLIElement) => {
        if (!itemGot.dataset.price) {
          return;
        }

        if (!itemGot.querySelector('.num-counter')) {
          return;
        }
        const itemGotQuantityEl = itemGot.querySelector(
          '.num-counter'
        ) as HTMLSpanElement;

        const itemGotPrice = parseInt(itemGot.dataset.price);
        const itemGotQuantity = parseInt(itemGotQuantityEl.textContent || '0');

        totalPrice += itemGotPrice * itemGotQuantity;
      });

      this.#txtTotal.textContent = `총 금액: ${numberFormat(totalPrice)}원`;
    });
  }
}
