# Vending Machine with TypeScript

## 📎 배포 URL: [https://july249.github.io/vending_machine/](https://july249.github.io/vending_machine/)

<br />

## 프로젝트 소개

---

- 🥫 소지금의 일부를 자판기에 넣어 시원한 콜라를 뽑아 먹을 수 있는 자판기입니다.

<br />

## 📆 개발 일정

---

2️⃣ 2023.03.18 ~ 2023.03.26 : 타입스크립트로 마이그레이션 Version 1.1
1️⃣ 2022.09.23 ~ 2022.11.04 : 자바스크립트를 이용한 Version 1.0

<br/>

## 프로젝트 실행 방법

---

```
$ npm install
```

<br />

## 개발 환경

---

### 기술

- HTML, CSS, JavaScript, TypeScript, Webpack, NPM

### 배포

- GitHub Pages

<br />

## 폴더 구조

---

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

---

<div align="center">

| 1. 입금 | 2. 음료 뽑기 |
| :-----: | :----------: |
|         |              |

| 3. 획득하기 | 4. Sold Out |
| :---------: | :---------: |
|             |             |

| 5. 거스름돈 반환 | 6. 환불하기 |
| :--------------: | :---------: |
|                  |             |

- "입금액 입력"에 소지금 30,000원 중 자판기에 넣을 금액을 작성한 뒤, "입금" 버튼을 클릭한다.
- 자판기 좌측 상단에 있는 음료를 클릭한다.
- 자판기 좌측 하단에 있는 리스트에 구매한 음료와 수량이 리스트로 나타난다.
- "획득" 버튼을 누르면 자판기 우측의 "획득한 음료"로 리스트 내용이 이동한다.
- 음료가 모두 소진되면, "Sold-Out" 메시지가 자판기의 음료 버튼에 표시되고, 더 이상 클릭이 되지 않는다.
- 입금한 금액 중 잔액을 다시 "소지금"으로 돌려 놓고 싶은 경우 "거스름돈 반환" 버튼을 클릭한다.

</div>

<br />
