export default class ColaGenerator {
    constructor() {
        this.itemList = document.querySelector('.list-item');
    }
    async setup() {
        await this.loadData((json) => {
            this.colaFactory(json);
        });
    }
    async loadData(callback) {
        const res = await fetch('../../public/data/item.json');
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
//# sourceMappingURL=ColaGenerator.js.map