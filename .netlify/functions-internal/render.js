const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["favicon.png","images/logos/ML.webp"]),
	mimeTypes: {".png":"image/png",".webp":"image/webp"},
	_: {
		entry: {"file":"immutable/start-9fb1ae8e.js","imports":["immutable/start-9fb1ae8e.js","immutable/chunks/index-0aaf1736.js","immutable/chunks/index-c5878c8b.js","immutable/chunks/singletons-cdeec3fd.js"],"stylesheets":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/9.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js')),
			() => Promise.resolve().then(() => require('../server/nodes/8.js')),
			() => Promise.resolve().then(() => require('../server/nodes/4.js')),
			() => Promise.resolve().then(() => require('../server/nodes/10.js')),
			() => Promise.resolve().then(() => require('../server/nodes/5.js')),
			() => Promise.resolve().then(() => require('../server/nodes/11.js')),
			() => Promise.resolve().then(() => require('../server/nodes/6.js')),
			() => Promise.resolve().then(() => require('../server/nodes/12.js')),
			() => Promise.resolve().then(() => require('../server/nodes/7.js')),
			() => Promise.resolve().then(() => require('../server/nodes/14.js')),
			() => Promise.resolve().then(() => require('../server/nodes/13.js'))
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "dashboard",
				pattern: /^\/dashboard\/?$/,
				names: [],
				types: [],
				path: "/dashboard",
				shadow: null,
				a: [0,3,4,5],
				b: [1,1]
			},
			{
				type: 'page',
				id: "products",
				pattern: /^\/products\/?$/,
				names: [],
				types: [],
				path: "/products",
				shadow: null,
				a: [0,3,6,7],
				b: [1,1]
			},
			{
				type: 'page',
				id: "profile",
				pattern: /^\/profile\/?$/,
				names: [],
				types: [],
				path: "/profile",
				shadow: null,
				a: [0,3,8,9],
				b: [1,1]
			},
			{
				type: 'page',
				id: "settings",
				pattern: /^\/settings\/?$/,
				names: [],
				types: [],
				path: "/settings",
				shadow: null,
				a: [0,3,10,11],
				b: [1,1]
			},
			{
				type: 'page',
				id: "users",
				pattern: /^\/users\/?$/,
				names: [],
				types: [],
				path: "/users",
				shadow: null,
				a: [0,3,12,13],
				b: [1,1]
			},
			{
				type: 'page',
				id: "settings/meli-callback",
				pattern: /^\/settings\/meli-callback\/?$/,
				names: [],
				types: [],
				path: "/settings/meli-callback",
				shadow: null,
				a: [0,3,10,14],
				b: [1,1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
