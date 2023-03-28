# Vending Machine with TypeScript

## 📎 배포 URL:

- [https://july249.github.io/vending_machine/](https://july249.github.io/vending_machine/)

<br />

## 프로젝트 소개

- 🥫 소지금의 일부를 자판기에 넣어 시원한 콜라를 뽑아 먹을 수 있는 자판기입니다.

<br />

## 📆 개발 일정

1️⃣ 2022.09.23 ~ 2022.11.04 : 자바스크립트를 이용한 V1.0
<br />
2️⃣ 2023.03.18 ~ 2023.03.26 : 타입스크립트로 마이그레이션 및 반환 기능 구현 V1.1
<br />
3️⃣ 2023.03.27 ~ 2023.03.29 : CSS에서 Scss로 스타일 변환 V1.2
<br />
4️⃣ 2023.03.27 ~ 2023.03.29 : 타입스크립트 코드 리펙토링 및 반환 기능 미흡사항 수정 V1.3

<br/>

## 프로젝트 실행 방법

```
$ npm install
```

<br />

## 개발 환경

### 기술

- HTML, CSS, JavaScript, TypeScript, Webpack, NPM

### 배포

- GitHub Pages

<br />

## 폴더 구조

  <details><summary>폴더 구조 보기</summary>

```txt
├── dist
│   └── components
│   │   ├── ColaGenerator.js
│   │   ├── ColaGenerator.js.map
│   │   ├── VendingMachine.js
│   │   └── VendingMachine.js.map
│   ├── bundle.js
│   ├── main.js
│   └── main.js.map
├── node_modules
│   └── ...
├── public
│   └── data
│       └── item.json
├── src
│   ├── assets
│   │   └── img
│   │       ├── Logo.png
│   │       ├── coke_blue.png
│   │       ├── coke_green.png
│   │       ├── coke_orange.png
│   │       ├── coke_purple.png
│   │       ├── coke_red.png
│   │       ├── coke_yellow.png
│   │       └── sold_out.png
│   ├── components
│   │   ├── ColaGenerator.ts
│   │   └── VendingMachine.ts
│   ├── css
│   │   ├── reset.css
│   │   └── style.css
│   └── main.ts
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
└── webpack.config.js

```

  </details>

<br />

## ⚙️ 구현 기능

<div align="center">

|                                                             1. 입금                                                             |
| :-----------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/90930391/227786189-9fd4c28d-306a-41eb-bb26-cf8ed5ea01d8.gif" width="470" /> |

</div>

- "입금액 입력"에 소지금 30,000원 중 자판기에 넣을 금액을 작성한 뒤, "입금" 버튼을 클릭합니다.

<div align="center">
  
| 2. 음료 뽑기 |
| :---------: |
| <img src="https://user-images.githubusercontent.com/90930391/227786300-6468f0ae-360d-463c-92d2-774974929c70.gif" width="470" /> |
  
</div>

- 자판기 좌측 상단에 있는 음료를 클릭합니다. <br />
- 자판기 좌측 하단에 있는 리스트에 구매한 음료와 수량이 리스트로 나타납니다.

<div align="center">
  
| 3. 음료 획득하기 |
| :---------: |
| <img src="https://user-images.githubusercontent.com/90930391/227786313-d1de7f9b-350e-4fe9-ba7f-9d1755e83fd8.gif" width="470" /> |

</div>

- "획득" 버튼을 누르면 자판기 우측의 "획득한 음료"로 리스트 내용이 이동합니다.

<div align="center">
  
| 4. Sold Out |
| :---------: |
| <img src="https://user-images.githubusercontent.com/90930391/227786328-3336a560-2e1f-4e2d-9cd7-50c83bfc1953.gif" width="470" /> |
  
</div>

- 음료가 모두 소진되면, "Sold-Out" 메시지가 자판기의 음료 버튼에 표시되고, 더 이상 클릭이 되지 않습니다.

<div align="center">
  
| 5. 거스름돈 반환 |
| :---------: |
| <img src="https://user-images.githubusercontent.com/90930391/227786343-893f0f92-c77f-489a-b956-c4b594b5eac1.gif" width="470" /> |
  
</div>

- 입금한 금액 중 잔액을 다시 "소지금"으로 돌려 놓고 싶은 경우 "거스름돈 반환" 버튼을 클릭합니다.

<div align="center">
  
| 6. 환불 하기 |
| :---------: |
| <img src="https://user-images.githubusercontent.com/90930391/227824087-5fab94c3-dd89-45d4-823b-3bbd777235e3.gif" width="470" /> |
  
</div>

- 선택한 음료를 획득하기 이전에 장바구니에서 제거하기 버튼을 클릭하면, 해당 상품은 리스트에서 제거됩니다.
- 제거된 리스트의 금액만큼 다시 잔액에 포함됩니다.

<br />

## v1.0.0 이후 개선 사항

### 환불 기능 추가

[문제점]

- 사용자가 선택한 음료를 환불할 수 있는 방법이 없음
- 한번 선택하면 무조건 구입해야하는 구조

[해결]

- stagedList에 담긴 각각의 음료 아이템에 btn-unstaged를 추가
- 해당 버튼 클릭 시, Array.built-in API인 filter를 이용하여 리스트에서 삭제하는 기능 구현
- NodeList에서는 filter API를 제공하지 않으므로 Array의 call API를 이용하여 this 바인딩을 NodeList로 지정하여 Array의 filter API를 사용하였음

### 타입스크립트 적용

[문제점]

- 자바스크립트로 작성함에 따라 타입이 동적으로 결정되는 이슈가 발생하였음

[해결]

- 유지보수성 향상과 함께 코드의 가독성 향상을 위해 정적 타입으로 타입을 지정하였음

[한계]

- 아직 타입스크립트에 익숙하지 못한 상태이기에 지양해야하는 코드 스타일의 사용이 많았음 => 지속적으로 개선시킬 예정

### 웹팩을 이용한 bundle 생성 및 배포

[문제점]

- 페이지 렌더링에 필요한 소스코드의 최적화 문제

[해결]

- 웹팩을 사용하여 웹 어플리케이션을 구성하는 소스들을 모듈화하여 최적화하여 문제를 해결함

### Top Level Await 사용

[문제점]

- 최신 es 모듈에서만 지원하는 기능이기 때문에 통상의 ts.config, webpack.config 설정으로는 에러가 발생함

[해결]

- 문제를 해결하기 위해 ts.config와 webpack.config 설정을 최신 es 모듈 및 experiments 모듈 설정을 가져옴
- es5 또는 es2017 이전 버전에 대한 브라우저 지원은 불가함 => babel을 이용하여 Down-Grade 버전으로 변환을 해야함 (버전 다운을 진행하지는 않을 예정임)
