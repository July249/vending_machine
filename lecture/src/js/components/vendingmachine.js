class Vendingmachine {
  constructor() {
    const vMachine = document.querySelector(".vending-machine");
    this.balance = vMachine.querySelector(".txt-balance");
    this.itemList = vMachine.querySelector(".list-item");
    this.inputCostEl = vMachine.querySelector(".inp-put");
    this.btnPut = vMachine.querySelector(".btn-put");
    this.btnReturn = vMachine.querySelector(".btn-return");
    this.btnGet = vMachine.querySelector(".btn-get");
    this.stagedList = vMachine.querySelector(".list-item-staged");

    const myinfo = document.querySelector(".my-info");
    this.myMoney = myinfo.querySelector(".txt-mymoney");
    this.gotList = myinfo.querySelector(".list-item-staged");
    this.txtTotal = myinfo.querySelector(".txt-total");
  }

  setup() {
    this.bindEvents();
  }

  // list-item-staged에 li 생성
  stagedItemGenerator(target) {
    const stagedItem = document.createElement("li");
    stagedItem.dataset.item = target.dataset.item;
    stagedItem.dataset.price = target.dataset.price;
    stagedItem.innerHTML = `
    <button type="button" class="btn-staged">
            <img src="./src/images/${target.dataset.img}" alt="" class="img-item">
            <strong class="txt-item">${target.dataset.item}</strong>
            <span class="num-counter">1</span>
            </button>
        `;
    this.stagedList.appendChild(stagedItem);
  }

  bindEvents() {
    /*
     * 1. 입금 버튼 기능
     * 입금액을 입력하고 입금 버튼을 누르면 소지금 == 소지금 - 입금액, 잔액 == 기존 잔액 + 입금액이 됩니다.
     * 입금액이 소지금 보다 많다면 실행을 중단하고 "소지금이 부족합니다." 라고 쓰인 경고창을 띄웁니다.
     * 입금액 인풋창은 초기화됩니다.
     * */

    this.btnPut.addEventListener("click", (e) => {
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      if (inputCost) {
        // 입금액이 소지금보다 적다면
        if (inputCost <= myMoneyVal) {
          this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal - inputCost) + " 원";
          this.balance.textContent = new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputCost) + " 원";
        } else {
          alert("소지금이 부족합니다.");
        }
        this.inputCostEl.value = null;
      }
    });

    /**
     * 2. 거스름돈 반환
     * 잔액이 0이면 경고창을 띄워주고
     * 잔액이 0보다 크면 소지금에 잔액을 더해준다.
     */
    this.btnReturn.addEventListener("click", (e) => {
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));

      if (balanceVal) {
        this.myMoney.textContent = new Intl.NumberFormat().format(balanceVal + myMoneyVal) + "원";
        this.balance.textContent = "원";
      } else {
        alert("반환될 거스름돈이 없습니다.");
      }
    });

    /*
     * 3. 자판기 메뉴 기능
     * 아이템을 누르면 잔액 == 잔액 - 아이템 가격이 됩니다.
     * 아이템 가격보다 잔액이 적다면 "잔액이 부족합니다. 돈을 입금해주세요" 경고창이 나타납니다.
     * 아이템이 획득가능 창에 등록됩니다.
     * 아이템 버튼의 data-count 값이 -1 됩니다.
     * 만약 data-count 값이 0 이라면 부모 li에 sold-out 클래스를 붙여줍니다.
     */
    const btnsCola = this.itemList.querySelectorAll("button");
    console.log(btnsCola);

    btnsCola.forEach((item) => {
      item.addEventListener("click", (e) => {
        const targetEl = e.currentTarget;
        console.log(targetEl);
        const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

        let isStaged = false; // 이미 선택이 된 물품인지 확인
        const targetElPrice = parseInt(targetEl.dataset.price);
        const stagedListItem = this.stagedList.querySelectorAll("li");

        // 입금한 금액
        if (balanceVal >= targetElPrice) {
          this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElPrice) + "원";

          for (const item of stagedListItem) {
            if (item.dataset.item === targetEl.dataset.item) {
              item.querySelector(".num-counter").textContent++;
              isStaged = true;
              break;
            }
          }

          // 선택된 아이템이 처음인 경우
          if (!isStaged) {
            this.stagedItemGenerator(targetEl);
          }

          targetEl.dataset.count--;

          if (parseInt(targetEl.dataset.count) === 0) {
            targetEl.parentElement.classList.add("sold-out");
            const warning = document.createElement("em");
            warning.textContent = "해당 상품은 품절입니다.";
            warning.classList.add("ir");
            // em 요소를 button 요소의 앞에 배치함
            targetEl.parentElement.insertBefore(warning, targetEl);
          }
        } else {
          alert("잔액이 부족합니다! 입금해주세요~");
        }
      });
    });

    /**
     * 4. 획득 버튼 기능
     * 획득 버튼을 누르면 선택한 음료수 목록이 획득한 음료 목록으로 이동
     * 획득한 음료의 금액을 모두 합하여 총금액을 업데이트
     */
    this.btnGet.addEventListener("click", (event) => {
      let isGot = false;
      let totalPrice = 0;

      // 내가 고른 음료수 목록과 이미 구입한 목록을 비교
      for (const itemStaged of this.stagedList.querySelectorAll("li")) {
        for (const itemGot of this.gotList.querySelectorAll("li")) {
          let itemGotCount = itemGot.querySelector(".num-counter");
          // 획득할 아이템이 이미 획득한 음료 리스트에 존재하는지 확인
          if (itemStaged.dataset.item === itemGot.dataset.item) {
            //획득한 음료 리스트의 아이템 갯수 업데이트
            itemGotCount.textContent =
              parseInt(itemGotCount.textContent) + parseInt(itemStaged.querySelector(".num-counter").textContent);
            isGot = true;
            break;
          }
        }
        // 처음 획득하는 음료수라면
        if (!isGot) {
          this.gotList.appendChild(itemStaged);
        }
      }

      // stagedList 목록의 내용을 초기화
      this.stagedList.innerHTML = null;

      // 획득한 음료 리스트를 순환하면서 총 금액을 계산
      this.gotList.querySelectorAll("li").forEach((itemGot) => {
        totalPrice += itemGot.dataset.price * parseInt(itemGot.querySelector(".num-counter").textContent);
      });
      this.txtTotal.textContent = `총금액 : ${new Intl.NumberFormat().format(totalPrice)}원`;
    });
  }
}

export default Vendingmachine;
