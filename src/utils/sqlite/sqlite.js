// 数据库名称
const dbName = 'app';
// 数据库地址,推荐以下划线为开头   _doc/xxx.db
// 如果路径不为_downloads/xxx.db,在手机中会找不到文件夹(强烈建议：不要修改路径)
const dbPath = '_downloads/app.db';

// 判断数据库是否打开(箭头函数)
const isOpen = () => {
  // 数据库打开了就返回 true,否则返回 false
  var open = plus.sqlite.isOpenDatabase({
    name: dbName,  // 数据库名称
    path: dbPath  // 数据库地址
  });
  return open;
};

// 创建数据库 或 有该数据库就打开(普通函数)
const openSqlite = function() {
  return new Promise((resolve, reject) => {
    // 检查数据库是否已经打开
    if (isOpen()) {
      console.log(`数据库 ${dbName} 已经打开`);
      resolve({ success: true, message: `数据库 ${dbName} 已经打开` });
      return;
    }
    // 打开数据库
    plus.sqlite.openDatabase({
      name: dbName,
      path: dbPath,
      success(e) {
        console.log(`数据库 ${dbName} 打开成功`);
        resolve({ success: true, message: `数据库 ${dbName} 打开成功` });
      },
      fail(e) {
        console.error(`打开数据库 ${dbName} 失败`, e);
        reject(e);
      }
    });
  });
};

// 关闭数据库(箭头函数)
const closeSqlite = () => {
  return new Promise((resolve, reject) => {
    plus.sqlite.closeDatabase({
      name: dbName,
      success(e) {
        console.log(`数据库 ${dbName} 关闭成功`);
        resolve(e);
      },
      fail(e) {
        console.error(`关闭数据库 ${dbName} 失败`, e);
        reject(e);
      }
    });
  });
};

// 普通函数
// 数据库建表 sql:'CREATE TABLE IF NOT EXISTS dbTable("id" varchar(50),"name" TEXT) 
// 创建 CREATE TABLE IF NOT EXISTS 、 dbTable 是表名，不能用数字开头、括号里是表格的表头
// @param {Object} dbTable:表名
// @param {Object} data : 表结构 

// 数据库建表
const createTable = function(dbTable, data) {
  return new Promise((resolve, reject) => {
    plus.sqlite.executeSql({
      name: dbName,
      sql: `CREATE TABLE IF NOT EXISTS ${dbTable}(${data})`,
      success(e) {
        console.log(`表 ${dbTable} 创建成功`);
        resolve(e);
      },
      fail(e) {
        console.error(`创建表 ${dbTable} 失败`, e);
        reject(e);
      }
    });
  });
};

// 数据库删表
const dropTable = (dbTable) => {
  return new Promise((resolve, reject) => {
    plus.sqlite.executeSql({
      name: dbName,
      sql: `DROP TABLE ${dbTable}`,
      success(e) {
        console.log(`表 ${dbTable} 删除成功`);
        resolve(e);
      },
      fail(e) {
        console.error(`删除表 ${dbTable} 失败`, e);
        reject(e);
      }
    });
  });
};


// 普通函数
// 向表格里添加数据 sql:'INSERT INTO dbTable VALUES('x','x','x')'   对应新增
// 或者 sql:'INSERT INTO dbTable ('x','x','x') VALUES('x','x','x')'   具体新增
// 插入 INSERT INTO  、 dbTable 是表名、根据表头列名插入列值
// @param {Object} dbTable:表名
// @param {Object} data : 插入表中的值结构 
// @param {Object} condition : 插入表中对应的列的属性名称结构

// 向表格里添加数据
const insertTableData = function(dbTable, data, condition) {
  if (dbTable !== undefined && data !== undefined) {
    let bol = (JSON.stringify(data) == "{}");
    if (!bol) {
      let sql = condition ? `INSERT INTO ${dbTable} (${condition}) VALUES(${data})` : `INSERT INTO ${dbTable} VALUES (${data})`;
      return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
          name: dbName,
          sql: sql,
          success(e) {
            console.log(`数据插入表 ${dbTable} 成功`);
            resolve(e);
          },
          fail(e) {
            console.error(`数据插入表 ${dbTable} 失败`, e);
            reject(e);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => { reject("错误添加") });
    }
  } else {
    return new Promise((resolve, reject) => { reject("错误添加") });
  }
};

// 箭头函数  
// 根据条件向表格里添加数据  有数据更新、无数据插入
// (建表时需要设置主键) 例如 --- "roomid" varchar(50) PRIMARY KEY
// @param {Object} dbTable:表名
// @param {Object} data : 插入表中的值结构 
// @param {Object} condition : 插入表中对应的列的属性名称结构
const insertOrReplaceData = (dbTable, data, condition) => {
  if (dbTable !== undefined && data !== undefined) {
    let sql = condition ? `INSERT OR REPLACE INTO ${dbTable} (${condition}) VALUES(${data})` : `INSERT OR REPLACE INTO ${dbTable} VALUES(${data})`;
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: dbName,
        sql: sql,
        success(e) {
          console.log(`数据插入或替换表 ${dbTable} 成功`);
          resolve(e);
        },
        fail(e) {
          console.error(`数据插入或替换表 ${dbTable} 失败`, e);
          reject(e);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => { reject("错误添加") });
  }
};

// 普通函数
// 查询获取数据库里的数据 sql:'SELECT * FROM dbTable WHERE lname = 'lvalue''
// 查询 SELECT * FROM 、 dbTable 是表名、 WHERE 查找条件 lname,lvalue 是查询条件的列名和列值
// @param {Object} dbTable:表名
// @param {Object} lname:列名
// @param {Object} lvalue:列中的属性值

// 查询获取数据库里的数据
const selectTableData = function(dbTable, lname, lvalue, cc, dd) {
  if (dbTable !== undefined) {
    let sql;
    if (lname !== undefined && cc !== undefined) {
      sql = `SELECT * FROM ${dbTable} WHERE ${lname} = '${lvalue}' AND ${cc} = '${dd}'`;
    } else if (lname !== undefined) {
      sql = `SELECT * FROM ${dbTable} WHERE ${lname} = '${lvalue}'`;
    } else {
      sql = `SELECT * FROM ${dbTable}`;
    }
    return new Promise((resolve, reject) => {
      plus.sqlite.selectSql({
        name: dbName,
        sql: sql,
        success(e) {
          console.log(`数据从表 ${dbTable} 查询成功`);
          resolve(e);
        },
        fail(e) {
          console.error(`数据从表 ${dbTable} 查询失败`, e);
          reject(e);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => { reject("错误查询") });
  }
};

// 箭头函数
// 删除表里的数据 sql:'DELETE FROM dbTable WHERE lname = 'lvalue''
// 删除 DELETE FROM 、 dbTable 是表名、 WHERE 查找条件 lname,lvalue 是查询条件的列名和列值
// @param {Object} dbTable:表名
// @param {Object} lname:列名
// @param {Object} lvalue:列中的属性值

// 删除表里的数据
const deleteTableData = (dbTable, lname, lvalue, ww, ee) => {
  if (dbTable !== undefined) {
    let sql;
    if (lname === undefined) {
      sql = `DELETE FROM ${dbTable}`;
    } else {
      if (ww !== undefined) {
        sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}' AND ${ww} = '${ee}'`;
      } else {
        sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}'`;
      }
    }
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: dbName,
        sql: sql,
        success(e) {
          console.log(`数据从表 ${dbTable} 删除成功`);
          resolve(e);
        },
        fail(e) {
          console.error(`数据从表 ${dbTable} 删除失败`, e);
          reject(e);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => { reject("错误删除") });
  }
};

// 普通函数
// 修改数据表里的数据 sql:"UPDATE dbTable SET 列名 = '列值',列名 = '列值' WHERE lname = 'lvalue'"
// 修改 UPDATE 、 dbTable 是表名, data: 要修改的列名=修改后列值, lname,lvalue 是查询条件的列名和列值
// @param {Object} dbTable:表名
// @param {Object} data : 修改表中的值结构
// @param {Object} lname:列名
// @param {Object} lvalue:列中的属性值

// 修改数据表里的数据
const updateTableData = function(dbTable, data, lname, lvalue) {
  let sql = lname ? `UPDATE ${dbTable} SET ${data} WHERE ${lname} = '${lvalue}'` : `UPDATE ${dbTable} SET ${data}`;
  return new Promise((resolve, reject) => {
    plus.sqlite.executeSql({
      name: dbName,
      sql: sql,
      success(e) {
        console.log(`数据在表 ${dbTable} 更新成功`);
        resolve(e);
      },
      fail(e) {
        console.error(`数据在表 ${dbTable} 更新失败`, e);
        reject(e);
      }
    });
  });
};
 
// 箭头函数
// 获取指定数据条数  sql:"SELECT * FROM dbTable ORDER BY 'id' DESC LIMIT 15 OFFSET 'num'"
// dbTable 表名, ORDER BY 代表排序默认正序, id 是排序的条件 DESC 代表倒序，从最后一条数据开始拿
// LIMIT 15 OFFSET '${num}',这句的意思是跳过 num 条拿 15 条数据, num 为跳过多少条数据是动态值
// 例 初始num设为0，就从最后的数据开始拿15条，下次不拿刚获取的数据，所以可以让num为15，这样就能一步一步的拿完所有的数据
// @param {Object} dbTable:表名
// @param {Object} id:数据id
/**
 * @param {Object} num 例子如下：
 * select * from boot limit 10 offset 0;
 * select * from boot limit 10 offset 10;
 * select * from boot limit 10 offset 20;
 * select * from boot limit 10 offset 30;
 * 比如说每页数量为 10 条，然后我们分别获区第1、2、3、4页的数据
 * 
*/ 
// 获取指定数据条数
const pullSQL = (dbTable, id, num) => {
  return new Promise((resolve, reject) => {
    plus.sqlite.selectSql({
      name: dbName,
      sql: `SELECT * FROM ${dbTable} ORDER BY '${id}' DESC LIMIT 15 OFFSET '${num}'`,
      success(e) {
        console.log(`数据从表 ${dbTable} 倒叙查询成功`);
        resolve(e);
      },
      fail(e) {
        console.error(`数据从表 ${dbTable} 倒叙查询失败`, e);
        reject(e);
      }
    });
  });
};

// 初始化用户表并插入初始数据
const initializeUserTable = () => {
	return new Promise((resolve, reject) => {
	  // 创建 user 表
	  const dbTable = "user";
	  const data = "'user_id' INTEGER PRIMARY KEY AUTOINCREMENT, 'user_code' TEXT, 'user_name' TEXT, 'password' TEXT, 'department' TEXT, 'is_active' TEXT, 'remark' TEXT";
	  createTable(dbTable, data).then(() => {
		console.log(`表 ${dbTable} 创建成功`);
  
		// 插入初始数据
		const inDBTable = "user";
		const inData = "'hjgs2062','admin', '123456', '信息技术部','true','test'";
		const inCondition = "user_code,user_name, password, department,is_active,remark";
		return insertTableData(inDBTable, inData, inCondition);
	  }).then((res) => {
		console.log("初始用户数据插入成功", res);
		resolve(res);
	  }).catch((err) => {
		console.error("初始化用户表失败", err);
		reject(err);
	  });
	});
  };
// 初始化任务并插入初始数据
const initializeTaskTable = () => {
	  // 创建 task 表
	  const dbTable = "task";
	  //const data = "'task_id' TEXT PRIMARY KEY, 'product_code' TEXT, 'product_name' TEXT, 'part_code' TEXT, 'part_name' TEXT, 'task_code' TEXT, 'task_name' TEXT, 'task_status' TEXT,  'task_result' TEXT, 'create_time' DATETIME, 'create_man' TEXT, 'modify_time' DATETIME, 'modify_man' TEXT, 'remarks' TEXT";
	  const data = "'task_id' TEXT PRIMARY KEY, 'parent_id' TEXT, 'product_code' TEXT, 'product_name' TEXT, 'part_code' TEXT, 'part_name' TEXT, 'task_code' TEXT, 'task_name' TEXT, 'task_status' TEXT,  'task_result' TEXT, 'create_time' DATETIME, 'create_man' TEXT, 'modify_time' DATETIME, 'modify_man' TEXT, 'remarks' TEXT, 'level' INTEGER";
	  createTable(dbTable, data).then((res) => {
	    console.log('task表创建成功', res);
	  }).catch((err) => {
	    console.error('task表创建失败', err);
	  });
	};
// initialize ITEM Table 	
const initializeTaskItemTable = () => {
		  // 创建 ITEM 表
		  const dbTable = "task_item";
		  const data = "'item_id' INTEGER PRIMARY KEY AUTOINCREMENT, 'task_id' TEXT, 'parent_id' TEXT, 'item_code' TEXT, 'item_name' TEXT, 'item_status' TEXT, 'number' TEXT, 'content_unit' TEXT, 'content_product' TEXT, 'content_name' TEXT, 'location' TEXT, 'require' TEXT, 'lockstytle' TEXT, 'type' TEXT, 'target_data' TEXT, 'target_up' TEXT, 'target_down' TEXT, 'result_data' TEXT, 'picture' TEXT, 'modify_time' DATETIME, 'modify_man' TEXT, 'remarks' TEXT, 'level' INTEGER";

		  //const data = "'item_id' INTEGER PRIMARY KEY AUTOINCREMENT, 'task_id' TEXT, 'item_code' TEXT, 'item_name' TEXT, 'item_status' TEXT, 'number' TEXT, 'content' TEXT, 'location' TEXT,  'require' TEXT, 'lockstytle' TEXT, 'type' TEXT, 'target_data' TEXT, 'target_up' TEXT, 'target_down' TEXT, 'result_data' TEXT, 'picture' TEXT, 'modify_time' DATETIME, 'modify_man' TEXT, 'remarks' TEXT";
		  createTable(dbTable, data).then((res) => {
		    console.log('task_item表创建成功', res);
		  }).catch((err) => {
		    console.error('task_item表创建失败', err);
		  });
	};
	
// 插入数据的函数
const insert2TaskData = (jsonArray) => {
	return new Promise((resolve, reject) => {
    plus.sqlite.transaction((db) => {
      jsonArray.forEach((item) => {
        db.executeSql(`
          INSERT INTO task (
            product_code, product_name, part_code, part_name, task_code, task_name, task_status, task_result, creat_man, modify_man
          ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
          )
        `, [
          item.product_code, item.product_name, item.part_code, item.part_name, item.task_code, item.task_name, item.task_status, item.task_result, item.creat_man, item.modify_man
        ], (e) => {
          console.log('数据插入成功', e);
        }, (e) => {
          console.error('数据插入失败', e);
        });
      });
      resolve('所有数据插入成功');
    }, (e) => {
      console.error('事务失败', e);
      reject(e);
    });
  });
};
// 导出方法
export default {
  // 查询数据库是否打开
  isOpen,
  // 创建/开启数据库
  openSqlite,
  // 关闭数据库
  closeSqlite,
  // 数据库建表
  createTable,
  // 数据库删表
  dropTable,
  // 表里新增/插入数据
  insertTableData,
  // 根据条件向表里插入数据、更新或覆盖
  insertOrReplaceData,
  // 表里查询数据
  selectTableData,
  // 表里删除数据
  deleteTableData,
  // 表里修改数据
  updateTableData,
  // 倒叙查询数据
  pullSQL,
   // 初始化用户表并插入初始数据
   initializeUserTable,
   // initialize task table
   initializeTaskTable,
   // initialize task item table
   initializeTaskItemTable,
   // insert to task table
   insert2TaskData
};