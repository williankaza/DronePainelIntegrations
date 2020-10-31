const proxy = [
	{
		context: "/uri",
		target: "http://localhost:8080/app-drone",
		pathRewrite: { "^/uri": "" },
	},
	{
		context: "/med",
		target: "http://localhost:8081/api/v1",
		pathRewrite: { "^/med": "" },	
	}
];
module.exports = proxy;
