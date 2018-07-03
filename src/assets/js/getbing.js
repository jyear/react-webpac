// 默认配置
let defaults = {
	format: "js",
	idx: 0,
	n: 1
};

/**
 * 返回数组
 */
export const getBingImages = options => {
	let xhr = new XMLHttpRequest(),
		data,
		config,
		result,
		id;

	if (typeof options === "undefined") {
		config = defaults;
	} else {
		config = {};
		Object.assign(config, defaults, options);
	}
	xhr.open(
		"GET",
		`http://cn.bing.com/HPImageArchive.aspx?format=${config.format}&idx=${
			config.idx
		}&n=${config.n}`,
		true
	);
	xhr.send(null);
	// handler
	return new Promise((resolve, reject) => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					data = JSON.parse(xhr.responseText);
					result = [];
					id = 0;
					// 按照时间排序下
					resolve(data.reverse());
				} else {
					reject("ERROR.");
				}
			}
		};
	});
};
