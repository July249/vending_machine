type Data = {
  name: string;
  cost: number;
  img: string;
  count: number;
};

export default class ColaGenerator {
  itemList: HTMLElement;

  constructor() {
    this.itemList = document.querySelector('.list-item')!;
  }

  async setup(): Promise<void> {
    await this.loadData((json) => {
      this.colaFactory(json);
    });
  }

  async loadData(callback: (arg0: any) => void): Promise<void> {
    const res = await fetch(
      'https://raw.githubusercontent.com/July249/vending_machine/main/public/data/item.json'
    );
    if (res.status === 200) {
      callback(await res.json());
    } else {
      new Error(`Connect Error: ${res.status}`);
    }
  }

  colaFactory(data: Data[] /* JSON data */): void {
    const docFrag = document.createDocumentFragment();

    data.forEach((el: Data) => {
      const item = document.createElement('li');

      const itemTemplate = `
          <button type="button" class="btn-item">
            <img src="" alt="" class="img-item" />
            <strong class="tit-item"></strong>
            <span class="txt-price"></span>
          </button>
        `;

      item.innerHTML = itemTemplate;

      const buttonItem = item.querySelector('.btn-item')! as HTMLButtonElement;
      const imgItem = item.querySelector('.img-item')! as HTMLImageElement;
      const titleItem = item.querySelector('.tit-item')! as HTMLElement;
      const productCost = item.querySelector('.txt-price')! as HTMLSpanElement;

      buttonItem.dataset.item = el.name;
      buttonItem.dataset.count = `${el.count}`;
      buttonItem.dataset.price = `${el.cost}`;
      buttonItem.dataset.img = el.img;

      imgItem.src = `./src/assets/img/${el.img}`;

      titleItem.textContent = el.name;

      productCost.textContent = `${el.cost}원`;

      docFrag.appendChild(item);
      this.itemList.appendChild(docFrag);
    });
  }
}
