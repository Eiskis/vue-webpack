// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {

	'App wrapper should be visible at start': function (browser) {

		// automatically uses dev Server port from `/tooling/env/index.js`
		// default: http://localhost:8080
		// see nightwatch.conf.js
		const devServer = browser.globals.devServerURL;

		browser
			.url(devServer)
			.waitForElementVisible('.view-app', 5000)
			.assert.elementPresent('.view-app-content')
			// .assert.elementPresent('.view-page-log-in-actions .view-click-button')
			.end();

	}

};
