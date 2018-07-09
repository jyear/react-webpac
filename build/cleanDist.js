//webpack clean插件不好用 ，so 用node 直接删除文件 node命令直接执行
const path = require("path");
const fs = require("fs");
function deleteFolder(path) {
	var files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) {
				// recurse
				deleteFolder(curPath);
			} else {
				// delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}
deleteFolder(path.join(__dirname, "../dist"));
