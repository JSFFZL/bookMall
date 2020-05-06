// express 是一个web开发框架 极简，快速开发，高效 （注：不是node 内置模块）
// cnpm i express -S

const express = require("express");
const path = require("path");
const fs = require("fs");

// 数据库
// 用户表
const user = require("./src/mock/user.json");
// 广告图表
const dbImg = require("./src/mock/img.json");
// 书籍数据列表
const dbList = require("./src/mock/list.json");
// 用户书架数据列表
const userList = require("./src/mock/userList.json");


// express 实例化
const app = express();

// 对外开放 静态资源文件 src
app.use(express.static("src"));

// 解析前端post 体内的数据
app.use(express.json());
app.use(express.urlencoded());
// 设置默认页
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/src/index.html")) //__dirname
// })


/****************************设置接口****************************/


// 查询轮播图
app.get("/listImg", (req, res) => {
	// 返回给前端数据
	res.send(dbImg);
})

// 查询书籍
app.get("/listBook", (req, res) => {
	// 返回给前端数据
	res.send(dbList);
})

// 查询所有数据 （查）
app.get("/list", (req, res) => {
	// 返回给前端数据
	res.send(db);
})

// 查询单个数据 （查）
app.get("/listOne", (req, res) => {

	// 返回给前端数据
	let obj = dbList.find((item, i) => {
		return item.id == req.query.uid;
	})
	res.send(obj);
})


// 查询用户中书籍 书架
app.get("/userList", (req, res) => {
	// 返回给前端数据
	let obj = userList.filter((item, i) => {
		return item.user == req.query.user;
	})
	res.send(obj);
})

// 删除用户书籍 书架
app.get("/userDel", (req, res) => {
	// 返回给前端数据
	userList.find((item, i) => {
		if (item.name == req.query.name && item.user == req.query.uname) {
			userList.splice(i, 1);
			fs.writeFileSync("./src/mock/userList.json", JSON.stringify(userList));
			return res.send({code: 0,msg: "移除成功！"});
		}
	})
})

// 添加用户书籍 书架
app.post("/userAdd", (req, res) => {

	if (req.body.item.user) {
		userList.push(req.body.item);
		fs.writeFileSync("./src/mock/userList.json", JSON.stringify(userList));
		res.send({
			code: 0,
			msg: "添加成功"
		})
	}else{
		res.send({
			code: 1,
			msg: "添加失败"
		})
	}
})

// 查询单个数据 添加书架是否可用
app.get("/dis", (req, res) => {
	console.log(req.query);
	// 返回给前端数据
	let off = userList.some((item, i) => {
		return item.name == req.query.uname && item.user == req.query.user
	})
	if(off){
		res.send({code: 0,msg: "存在"});
	}else{
		res.send({code: 1,msg: "不存在"});
	}
	
})

// 注册
// 添加数据 （增）
app.post("/add", (req, res) => {
	let obj = req.body;
	console.log(obj);
	let off = user.some(item => {
		return item.name == obj.name && item.sex == obj.sex;
	})
	if (off) {
		res.send({
			code: 1,
			msg: "当前已有该用户"
		})
	} else {
		user.push(obj);
		fs.writeFileSync("./src/mock/user.json", JSON.stringify(user));
		res.send({
			code: 0,
			msg: "新增成功！！"
		})
	}

})


// // 登录
app.get("/login", (req, res) => {
	let obj = JSON.parse(req.query.values)

	let off = user.some(item => {
		return item.name == obj.name && item.pwd == obj.pwd;
	})
	if (off) {
		res.send({
			code: 0,
			msg: "登录成功",
			name: obj.name
		})
	} else {
		res.send({
			code: 1,
			msg: "用户名或密码错误！"
		})
	}
})


// 修改数据 （改）
// app.post("/updata", (req, res) => {
// 	// 返回给前端数据
// 	db.find((item, i) => {
// 		if (i == req.body.id) {
// 			db.splice(req.body.id, 1, req.body);
// 			fs.writeFileSync("./src/mock/data.json", JSON.stringify(db));
// 			res.send({
// 				code: 0,
// 				msg: "修改成功！"
// 			});
// 		}
// 	})
// })


// 删除数据 （删）
// app.get("/del", (req, res) => {
// 	let uid = req.query.uid;
// 	if (uid) {
// 		db.splice(uid, 1);
// 		fs.writeFileSync("./src/mock/data.json", JSON.stringify(db));
// 		res.send({
// 			code: 0,
// 			msg: "删除成功！"
// 		});
// 	} else {
// 		res.send({
// 			code: 1,
// 			msg: "删除失败！"
// 		});
// 	}
// })

app.listen(3000, () => {
	console.log("3000服务器启动...");
})
