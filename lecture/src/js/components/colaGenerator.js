class ColaGenerator {
  constructor() {
    this.itemList = document.querySelector('.list-item');
  }

  async setup() {
    await this.loadData((json) => {
      this.colaFactory(json);
    });
  }

  /* Ajax를 이용한 데이터 호출 방식 */

  /**
   * XML 파일을 서버와 비동기적으로 주고 받기 위해서 등장한 것이 바로 Ajax의 시작
   * 하지만 XML 파일만 가능한 것이 아니라 JSON 파일 등 다양한 포맷의 파일도 가능함
   * 따라서 XMLHttpRequest 생성자가 Ajax 통신시 필요한 인스턴스를 제공하고 그 인스턴스를 활용해서 통신하는 방식이 바로 Ajax
   *
   * fetch는 나중에 등장하게 되는데...
   *  */

  // loadData(callback) {
  //   const requestObj = new XMLHttpRequest(); // 서버와의 통신을 위해 객체를 생성
  //   requestObj.open('GET', './src/js/item.json');
  //   // readyState에 변화가 생겼을 때 콜백함수를 실행함
  //   requestObj.onreadystatechange = () => {
  //     if (
  //       requestObj.readyState ===
  //         4 /* 서버에 요청을 주었을 때 서버의 처리 상태 번호 */ &&
  //       requestObj.status === 200 /* 서버 요청 처리 중에 발생하는 상태 번호 */
  //     ) {
  //       callback(JSON.parse(requestObj.responseText));
  //     }
  //   };
  //   requestObj.send(null);
  // }

  async loadData(callback) {
    const res = await fetch('./src/js/item.json');

    if (res.status === 200) {
      // http 상태코드가 200 ~ 299일 경우
      callback(await res.json()); // 응답 정보를 읽으면서 객체 상태로 파싱
    } else {
      new Error(`Connect Error: ${res.status}`);
    }
  }

  colaFactory(data /* JSON data */) {
    const docFrag = document.createDocumentFragment();

    data.forEach((el) => {
      const item = document.createElement('li');
      /* button을 클릭했을 때 data 속성에 입력된 내용들을 list-item-staged에 보내줄 것임 */
      const itemTemplate = `
      <button type="button" class="btn-item" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
        <img src="src/images/${el.img}" alt="" class="img-item" />
        <strong class="tit-item">${el.name}</strong>
        <span class="txt-price">${el.cost}원</span>
      </button>
      `;
      item.innerHTML = itemTemplate;
      docFrag.appendChild(item);
    });
    this.itemList.appendChild(docFrag); // 최적화를 위해 docFrag를 사용
  }
}

export default ColaGenerator; // 클래스 하나만 내보내는 경우
// export { ... } ColaGenerator; // 내보내는 클래스가 여러 개인 경우
