import type { ColaItem } from '../types/colaItem';
import { isColaItem } from '../types/typeGuard/isColaItem';

export default class ColaGenerator {
  #itemList: HTMLUListElement;

  constructor() {
    this.#itemList = document.querySelector('.list-item') as HTMLUListElement;
  }

  async setup(): Promise<void> {
    await this.loadData((json) => {
      this.colaFactory(json);
    });
  }

  private async loadData(callback: (arg: ColaItem[]) => void): Promise<void> {
    const res = await fetch(
      'https://raw.githubusercontent.com/July249/vending_machine/main/public/data/item.json'
    );
    if (res.status === 200) {
      const data = (await res.json()) as ColaItem[];
      if (isColaItem(data)) {
        callback(data);
      }
    } else {
      new Error(`Connect Error: ${res.status}`);
    }
  }

  private colaFactory(data: ColaItem[] /* JSON data */): void {
    const docFrag = document.createDocumentFragment();

    data.forEach((el: ColaItem) => {
      const item = document.createElement('li');

      const itemTemplate = `
          <button type="button" class="btn-item">
            <img src="" alt="" class="img-item" />
            <strong class="tit-item"></strong>
            <span class="txt-price"></span>
          </button>
        `;

      item.innerHTML = itemTemplate;

      const buttonItem = item.querySelector('.btn-item') as HTMLButtonElement;
      buttonItem.dataset.item = el.name;
      buttonItem.dataset.count = `${el.count}`;
      buttonItem.dataset.price = `${el.cost}`;
      buttonItem.dataset.img = el.img;

      const imgItem = item.querySelector('.img-item') as HTMLImageElement;
      imgItem.src = `./src/assets/img/${el.img}`;

      const titleItem = item.querySelector('.tit-item') as HTMLElement;
      titleItem.textContent = el.name;

      const productCost = item.querySelector('.txt-price') as HTMLSpanElement;
      productCost.textContent = `${el.cost}원`;

      docFrag.appendChild(item);
      this.#itemList.appendChild(docFrag);
    });
  }
}
