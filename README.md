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

- HTML, CSS, Sass JavaScript, TypeScript, Webpack, NPM

### 배포

- GitHub Pages

<br />

## 폴더 구조

<details><summary>v1.3 폴더 구조 보기</summary>

```txt
├── dist
│   ├── bundle.js
│   ├── components
│   │   ├── ColaGenerator.js
│   │   ├── ColaGenerator.js.map
│   │   ├── VendingMachine.js
│   │   └── VendingMachine.js.map
│   ├── main.js
│   ├── main.js.map
│   ├── style.css
│   ├── style.css.map
│   ├── types
│   │   ├── colaItem.js
│   │   ├── colaItem.js.map
│   │   ├── data.js
│   │   ├── data.js.map
│   │   └── typeGuard
│   │       ├── isColaItem.js
│   │       ├── isColaItem.js.map
│   │       ├── isData.js
│   │       └── isData.js.map
│   └── util
│       ├── numberFormat.js
│       └── numberFormat.js.map
├── node_modules
│   └── ...
├── package-lock.json
├── package.json
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
│   ├── main.ts
│   ├── scss
│   │   ├── abstracts
│   │   │   ├── _breakpoints.scss
│   │   │   ├── _colors.scss
│   │   │   ├── _fonts.scss
│   │   │   ├── _functions.scss
│   │   │   └── _index.scss
│   │   ├── base
│   │   │   ├── _boilerplate.scss
│   │   │   ├── _index.scss
│   │   │   └── _reset.scss
│   │   ├── components
│   │   │   ├── _index.scss
│   │   │   ├── _ir.scss
│   │   │   └── _stagedList.scss
│   │   ├── layout
│   │   │   ├── _index.scss
│   │   │   ├── _logo.scss
│   │   │   ├── _my-info.scss
│   │   │   └── _vending-machine.scss
│   │   └── style.scss
│   ├── types
│   │   ├── colaItem.ts
│   │   └── typeGuard
│   │       └── isColaItem.ts
│   └── util
│       └── numberFormat.ts
├── tsconfig.json
└── webpack.config.js

```

</details>

<details><summary>v1.1 폴더 구조 보기</summary>

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
| <img src="https://user-images.githubusercontent.com/90930391/228534753-58aa25a6-b09f-4053-b2f4-e91964d5a641.gif" width="470" /> |
  
</div>

- 자판기 좌측 상단에 있는 음료를 클릭합니다. <br />
- 자판기 좌측 하단에 있는 리스트에 구매한 음료와 수량이 리스트로 나타납니다.

<div align="center">
  
| 3. 음료 획득하기 |
| :---------: |
| <img src="https://user-images.githubusercontent.com/90930391/228534840-78705397-ce97-435a-9687-034f5cbb6897.gif" width="470" /> |

</div>

- "획득" 버튼을 누르면 자판기 우측의 "획득한 음료"로 리스트 내용이 이동합니다.

<div align="center">
  
| 4. Sold Out |
| :---------: |
| <img src="https://user-images.githubusercontent.com/90930391/228534971-ea8fec21-ccae-4bd8-ac86-cf31b3e7b946.gif" width="470" /> |

</div>

- 음료가 모두 소진되면, "Sold-Out" 메시지가 자판기의 음료 버튼에 표시되고, 더 이상 클릭이 되지 않습니다.

<div align="center">
  
| 5. 거스름돈 반환 |
| :---------: |
| <img src="https://user-images.githubusercontent.com/90930391/228535052-d1105955-b712-486c-8b34-2f7eaf14ec5f.gif" width="470" /> |

</div>

- 입금한 금액 중 잔액을 다시 "소지금"으로 돌려 놓고 싶은 경우 "거스름돈 반환" 버튼을 클릭합니다.

<div align="center">
  
| 6. 음료 반환 하기 |
| :---------: |
| <img src="https://user-images.githubusercontent.com/90930391/228535177-27e3367e-a30f-4f0b-879d-fdabf08a6e43.gif" width="470" /> |
  
</div>

- 선택한 음료를 획득하기 이전에 장바구니에서 제거하기 버튼을 클릭하면, 해당 상품은 리스트에서 제거됩니다.
- 제거된 리스트의 금액만큼 다시 잔액에 포함됩니다.
- 반환된 음료의 수량만큼 다시 자판기 수량이 채워집니다. (5개가 기본 수량으로 설정되어 있습니다.)

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

[한계]

- 상품을 장바구니에서 제거하였음에도 불구하고 자판기에서의 콜라 수량은 다시 채워지지 않았음

### 상품 반환시 자판기의 수량으로 다시 채워지도록 구현

[문제점]

- "환불 기능 추가"에서의 한계점을 개선하기 위함

[해결]

- 반환하고자 하는 상품을 클릭하면 장바구니에 넣어 놓았던 수량만큼 다시 자판기에 채워짐
- 만일 Sold Out 상태라면 다시 반환한 경우 다시 상품을 구입할 수 있도록 구현함

### 타입스크립트 적용

[문제점]

- 자바스크립트로 작성함에 따라 타입이 동적으로 결정되는 이슈가 발생하였음

[해결]

- 런타임 이전에 코드상에서 발생할 수 있는 문제를 미연에 방지할 수 있음
- 유지보수성 향상과 함께 코드의 가독성 향상을 위해 정적 타입으로 타입을 지정하였음
- 견고한 코드 작성이 가능해짐

[한계]

- 아직 타입스크립트에 익숙하지 못한 상태이기에 지양해야하는 코드 스타일의 사용이 많았음 => 지속적으로 개선시킬 예정
- 기능 구현은 모두 진행함 => 기능별로 별도의 함수를 분리하여 코드의 가독성을 높여야할 필요가 있음

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

### 스타일시트 Sass로 변경함에 따른 이점

[문제점]

- style.css에 스타일 코드를 모아 놓음으로써 관리가 어려움
- reset.css와 style.css를 분리하여 놓았기 때문에 소스코드가 2개가 됨

[해결]

- 문제를 해결하기 위해 Sass(Scss)를 사용하여 배포 단에서 dist/style.css 하나로 스타일이 모두 적용될 수 있도록 함
- 스타일에 대한 체계적 관리가 가능함 (7-1 패턴 차용)
- 추상화 단에서 색, 폰트, 반응형 포인트 지정 등의 추상화 진행 => 스타일 변수 관리의 편리성 증진
- 기본 레이아웃을 잡기 위해 base 폴더로 스타일 관리
- 컴포넌트로 관리함에 따라 중복되는 코드 스타일을 제거함
- 컴포넌트 스타일의 재사용과 layout으로 구분한 영역들에 대해 적재적소에서 스타일을 적용할 수 있게 됨
- Scss에서 지원하는 함수 만들기를 이용하여 직접 커스텀한 rem함수를 이용하여 스타일 코드의 px값을 반응형에 적합한 rem unit으로 쉽게 변환함

### util 제작을 통한 인스턴스 API 재사용

[문제점]

- 숫자를 화폐 단위로 변환하기 위해 필요할 때마다 `new Intl.NumberFormat().format()`API를 호출하여 사용하였음
- 불필요하게 클래스에 대한 인스턴스를 생성하여 메서드를 이용함

[해결]

- 클래스의 인스턴스를 만들어 해당 인스턴스에 대한 API를 사용하도록 함

### 받아오는 외부 데이터의 타입을 지정해주는 Type Guard 생성

[문제점]

- fetch를 이용하여 JSON 데이터를 호출하는 과정에서 받아온 데이터가 ColaItem 타입에 대한 배열 형태임을 보장하지 못함
- 받아오는 데이터가 ColaItem[] 타입임을 보장하기 위한 타입 가드가 필요함
  됨
  [해결]

- 받아온 데이터가 배열 형태이고, 길이가 0보다 크며, 각 key 값들이 존재한다는 전제를 설정
- isColaItem에서 true가 반환되는 경우 데이터의 타입은 ColaItem[]이 됨
- false인 경우 그러하지 않게 됨
