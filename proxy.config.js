const proxy = [
	{
		context: "/uri",
		target: "http://localhost:4300",
		pathRewrite: { "^/uri": "" },
	}
];
module.exports = proxy;