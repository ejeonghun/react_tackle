# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
frontend
├─ .env
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ img
│  │  ├─ check-box.png
│  │  ├─ comment.png
│  │  ├─ kakao_login_large_wide.png
│  │  ├─ Logo.png
│  │  ├─ Main.png
│  │  ├─ money.png
│  │  ├─ pencil.png
│  │  ├─ shopping.png
│  │  ├─ tmp_profile_img.jpg
│  │  └─ write_button.png
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  ├─ robots.txt
│  ├─ sample.json
│  └─ SF-Pro.ttf
├─ READMD.md
├─ README.md
└─ src
   ├─ App.css
   ├─ App.js
   ├─ App.test.js
   ├─ component
   │  ├─ AuthContext
   │  │  └─ AuthContext.js
   │  ├─ Board
   │  │  ├─ Board.css
   │  │  ├─ Board.js
   │  │  └─ Board_페이지네이션기능 지원.js
   │  ├─ Category
   │  │  └─ Category.js
   │  ├─ CategoryBoard
   │  │  └─ CategoryBoard.js
   │  ├─ Footer
   │  │  ├─ Footer.css
   │  │  └─ Footer.js
   │  ├─ GiftShop
   │  │  ├─ gifticon.png
   │  │  ├─ gifticon2.png
   │  │  ├─ gifticon3.png
   │  │  ├─ gifticon4.png
   │  │  ├─ gifticon5.png
   │  │  ├─ gifticon6.png
   │  │  ├─ GiftShop.css
   │  │  └─ GiftShop.js
   │  ├─ Hambuger
   │  │  ├─ Hamburger.css
   │  │  └─ Hamburger.js
   │  ├─ Hotboard
   │  │  ├─ Hotboard.css
   │  │  └─ Hotboard.js
   │  ├─ img
   │  │  ├─ img_upload.png
   │  │  └─ tmp_profile_img.jpg
   │  ├─ KakaoLogin
   │  │  ├─ KakaoCallback.tsx
   │  │  ├─ KakaoCallbackBackend.tsx
   │  │  ├─ KakaoLogin.jsx
   │  │  └─ kakaoLogin.png
   │  ├─ Loading
   │  │  ├─ Loading.gif
   │  │  ├─ Loading.js
   │  │  └─ Styles.js
   │  ├─ Login
   │  │  ├─ Login.css
   │  │  └─ Login.js
   │  ├─ Logout
   │  │  └─ Logout.js
   │  ├─ Lottie
   │  │  ├─ Law.json
   │  │  └─ Lottie.js
   │  ├─ Main
   │  │  ├─ Main.css
   │  │  └─ Main.js
   │  ├─ ModalBasic
   │  │  ├─ ModalBasic.css
   │  │  └─ ModalBasic.js
   │  ├─ Mypage
   │  │  ├─ Function
   │  │  │  ├─ Charge.css
   │  │  │  ├─ Charge.js
   │  │  │  ├─ MyVote.css
   │  │  │  ├─ MyVote.jsx
   │  │  │  ├─ Point.css
   │  │  │  └─ Point.js
   │  │  ├─ Mypage.css
   │  │  └─ Mypage.js
   │  ├─ Nav
   │  │  ├─ Logo.png
   │  │  ├─ Logo.svg
   │  │  ├─ Nav.css
   │  │  └─ Nav.js
   │  ├─ Participationboard
   │  │  ├─ Participation.css
   │  │  └─ Participation.js
   │  ├─ PointHistory
   │  │  ├─ PointHistory.css
   │  │  └─ PointHistory.js
   │  ├─ Support
   │  │  ├─ Support.js
   │  │  └─ Support.jsx
   │  ├─ test
   │  │  └─ test.js
   │  ├─ Vote
   │  │  ├─ Vote.css
   │  │  └─ Vote.js
   │  ├─ VSBoard
   │  │  └─ VSBoard.js
   │  ├─ Write
   │  │  └─ Write.js
   │  └─ Write_btn
   │     └─ Write_btn.js
   ├─ index.css
   ├─ index.js
   ├─ logo.svg
   ├─ reportWebVitals.js
   └─ setupTests.js

```