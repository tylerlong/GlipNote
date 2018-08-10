# GlipNote

Note taking app like Evernote and OneNote.


## [Live Demo](https://tylerlong.github.io/glip-note/)


## Motivations

[RingCentral](https://ringcentral.com/) just released its Glip Notes API. This project started as a PoC project for Glip Notes API.


## Technical stack

- [Vue.js](https://vuejs.org/)
- [Webpack](https://webpack.js.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [localForage](https://github.com/localForage/localForage)
- [Ramda](https://ramdajs.com/)
- [RingCentral JS Concise](https://github.com/tylerlong/ringcentral-js-concise)
- [iView](https://www.iviewui.com/)


## Release

```
cp src/config.sample.js  src/config.js
edit src/config.js
yarn install
yarn release
```

Update RingCentral app and change redirect uri to `<your-server>/oauth.html`.
