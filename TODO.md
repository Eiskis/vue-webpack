
# To do

These are some notes about the things that should be investigated and possibly included in the template.

## Miscellaneous

- [ ] Exposing configuration values to SCSS
- [ ] Support lazy loading localisation files
	- Docs: http://kazupon.github.io/vue-i18n/en/
	- Simple example: https://kazupon.github.io/vue-i18n/en/migrations.html#features
- [ ] Unit test helpers: https://github.com/wrseward/vue-unit
- [ ] Make `index.html.ejs` watching work again

### Docs

- [ ] Details about logic in `App.vue` for rendering  pages
- [ ] Layout and reusable sections

## More predesigned components

- [ ] Small checkmark element
- [ ] Number fields
- [ ] Date picker
- [ ] Reliable in-place popover positioning
- [ ] Click handling and blur events for closing in-place popover
- [ ] `LinkButton`
- [ ] `ExternalLink` rel="noopener"
- [ ] `ExternalLinkButton` rel="noopener"
- [ ] Allow giving callbacks to notifications

## Client-side validation and errors

- [ ] Integrate validation library
	- Seems like the best and most multi-purpose one: https://www.monterail.com/blog/2016/rethinking-validations-for-vue-js
	- Other alternatives: https://github.com/vuejs/awesome-vue#validation
- [ ] Error message component
- [ ] Input component that wraps Textinput and error messages

## Vuex

- [ ] Split Vuex state management into modules and perhaps multiple files
- [ ] Persist Vuex state: https://github.com/vuejs/awesome-vue#persistence

## Preconfigured server-side rendering

- Prerendering plugin for Webpack: http://vuejs-templates.github.io/webpack/prerender.html
- About SSR on Vue: https://vuejs.org/v2/guide/ssr.html
- Full SSR guide for Vue: https://ssr.vuejs.org/en/
- Universal apps on Vue: https://nuxtjs.org/

## Testing SCSS

- Visual testing has to be easy with sandbox pages etc.
- We have some more complicated toolchains producing utility classes with responsive variants etc.
- http://mts.io/2014/04/02/sass-unit-testing/

There should also be some way of ensuring SCSS imports are correct. If they're not, tests might fail (test env compiles SCSS files independently).

During normal development, user might get no indication that imports are missing in source files because SCSS is normally compiled via `global.scss` or `utilities.scss` where dependencies tend to always be available. If we had a command for compiling all SCSS files independently outside of tests, we could test this.

## Automation

Can we improve the pipeline to automate redundant tasks? Things such as the following cause a lot of boilerplate code that has to be manually maintained:

- [ ] Explicitly importing services in each component
- [ ] Explicitly importing shared SCSS in `.vue` files
- [ ] Ensuring dependencies are up to date (directives and plugins imported in components must be installed via npm and `package.json` up to date)
- [ ] Webpack disallows dynamic requiring just like ES6 imports, but `require.context` could perhaps be used to improve automation

## Code intelligence

- [ ] ESLint plugins
	- [ ] File name and export naming conventions: https://github.com/selaux/eslint-plugin-filenames
	- [ ] `eslint-plugin-vue`: https://github.com/vuejs/eslint-plugin-vue
- [ ] VS Code IntelliSense
	- Is there something we can do to improve the support?
	- Formatted comments?
	- Manifest files?
	- More workspace configuration?
	- VS Code still has troubles understanding Webpack aliases
		- `jsconfig.json` and `tsconfig.json` could be configured with the same aliases to make this work
- [ ] Typing with Flow?
	- https://medium.freecodecamp.com/why-use-static-types-in-javascript-part-1-8382da1e0adb
	- https://flow.org/
	- https://alligator.io/vuejs/components-flow/

## TypeScript support?

- Integrating `.ts` support into pipeline
- Integrating `.ts` support in Vue components, services, models...
- Converting existing code into TS
- Providing type hints etc.
- https://vuejs.org/v2/guide/typescript.html

Makes code more robust, can improve IDE experience. Rapid iteration might get more complicated, introduces some more "boilerplate" code that needs to be manually maintained.

Some parts of the codebase, like models, utility libraries, state management, might benefit a lot from this. On the other hand simple single-file Vue components are mostly template and style-driven, and the view model code is almost never accessed by anything outside the component. Vue components have props (input), for which Vue has a validation feature.

TS features can be introduced gradually as features mature, but we still want to demo and try out new things fast without cumbersome code quality requirements (situation is similar with automated tests).
