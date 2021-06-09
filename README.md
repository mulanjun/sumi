# 初识Umi.JS

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126140351173.png#pic_center)

### 什么是Umi.js?

Umi，中文可发音为**乌米**，是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。

### 为什么使用Umi.js?

我们做react开发的时候会不会遇到以下问题？：
 1.项目做大的时候，开发调试的启动和热更新时间会变得很长。
 2.大应用下，网站打开很慢，有没有办法基于路由做到按需加载。
 3.dva的model每次都要手写载入，能否一开始就同项目初始化好？

使用乌米，即可解决以上问题，并且还能提供如下优势：

- 🎉开箱即用，内置 react、react-router 等
- 📦类 next.js 且功能完备的路由约定，同时支持配置的路由方式
- 🐠完善的插件体系，覆盖从源码到构建产物的每个生命周期
- 🚀 一键兼容到 IE9
- 🍉完善的 TypeScript 支持
- 🍗与 dva 数据流的深入融合
---
umi 有 2 和 3 两个版本。两个版本的使用都差不多。umi2 对 javascript 支持比较好，umi3 默认支持 typeScript

## 起步Umi

### node环境安装

建议安装最新的稳定版本，笔者这里为 14.15.3。同时建议使用 yarn

### Umi快速上手

创建空目录 umi-learn

```bash
# 新建应用
$ mkdir umi-learn && cd umi-learn

# 使用命令
$ yarn create umi

# 安装依赖
$ yarn install
```

安装过程选择 app

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126140249632.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNDc3NzIx,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021012614025699.png#pic_center)


### 项目工程结构

```csharp
mock                    // mock文件
src
  |-- assets        	// 静态资源文件
  |-- layouts           // 全局布局文件
  |-- pages           	// 项目页面文件
  |-- globals           // 全局样式
  |--.eslintignore     // eslint过滤文件清单
  |--.eslintrc.js      // eslint配置
  |--.eslintignore     // eslint过滤文件清单
  |--.eslintignore     // eslint过滤文件清单
  |--.umirc.js 		   // umi 配置文件

```

### 约定式路由

> 启动 umi start 后，大家会发现 pages 下多了个 .umi 的目录。不要直接在这里修改代码，umi 重启或者 pages 下的文件修改都会重新生成这个文件夹下的文件，约定 pages 下所有的 (j|t)sx? 文件即路由

### 动态生成路由

```crystal
npx umi g page demo
```

> page 目录下生成 demo.js 和 demo.css。.umirc.js 会自动生成相对应的路由，访问 /demo 路由。即可看到页面

```crystal
npx umi g page class/index
```

> page 目录下生成 class 文件夹 / index.js 和 index.css。.umirc.js 会自动生成相对应的路由，访问 /class/index 路由。即可看到页面

> 手动生成的文件，.umirc.js 文件中不会生成相对应的路由

### 获取路由中的参数

该文件必须以 $ 开头命名，这时 .umi 文件夹下的 router.js 文件会生成对应的路由

### umi2 --> umi3

```bash
$ yarn create @umijs/umi-app
$ yarn install
```



### 使用dva

在 umi 项目中，你可以使用 dva 来处理数据流，以响应一些复杂的交互操作。
 在 umi2 中要使用 dva 的功能很简单，只要使用 umi-plugin-react 插件并配置 dva:true 即可。
 修改配置的文件：./umirc.js

```js
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true, // 在此处启用 dva
      dynamicImport: false,
      title: 'hero',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
}
```

在dva中，处理数据流的文件统一放在 models 文件夹下，每一个文件默认导出一个对象，里面包含数据和处理数据的方法，通常我们称之为 model 。如以下count.js，model结构一般是如此：

##### ./src/models/count.js

```js
export default {
  namespace: 'count', // 默认与文件名相同
  state: 'count',
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
  // 同步
  reducers: {
    update(state) {
      return `${state}_count`;
    },
  },
  // 异步
  effects: {
    *fetch({ payload }, { call, put }) {
        yield put({
            type: 'update',
            payload
        })
    },
  },
}
```

### 在项目页面中使用model

我们需要导入connect将页面和model绑定在一起。

```js
import { connect } from 'dva';  
function CountPage(props) {  
 //从props属性中打印namespace为count的model的state数据       
  console.log(props.count);      
  return (
    <div className={styles.normal}>
      <h1>数量大小</h1>
      <h2>This is {props.count}</h2>
    </div>
  );
}
export default connect(({ count }) => ({ count }))(CountPage);  
```

如果使用es7的装饰器，我们可以改成这样的写法：

```js
import { connect } from 'dva'; 
// 装饰器 
@connect(({ count }) => ({ count }))
function CountPage(props) {  
 // 从 props 属性中打印 namespace 为 count 的 model 的 state 数据       
  console.log(props.count);      
  return (
    <div className={styles.normal}>
      <h1>数量大小</h1>
      <h2>This is {props.count}</h2>
    </div>
  );
}
export default CountPage;
```

### mock 文件夹

> 一般的文件格式如下，umi 的 mock 是对 express 的封装

```js
export default {
    'GET /api/getLists': {
        lists: ['a', 'b', 'c']
    },
    'GET /api/getListsAsync': (req, res) => {
        console.log(req)
        res.json({
            lists: Array(10).fill(req, query.value)
        })
    }
} 
```

### src / services 文件夹

> 请求有关的处理文件

```js
export function getLists(value) {
    return fetch('/api/getLists?value=' + value)
        .then(res => res.json())
    	.catch(err => {
			console.log(err)
    	})
}
```

---
上述内容其实在真实的项目开发当中所用不多，使用 umi 框架开发项目的方式，与 react 几乎无异。既然如何那为何要学？识万卷书，行万里路。见得东西越多，越能明白自己的不足之处。（项目实战：驿旅阳光；gitee地址：https://gitee.com/suiboyu/post-travel-sunshine）

下面是笔者开发项目架构，各位可以做个参考

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210220173329203.png#pic_center)

源代码存放在 gitee 中

关注公众号：大明贵妇，获取 Umi.js 学习资料（回复 Umi ），期待各位客官来临

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126140631293.jpg#pic_center)

参考文章：https://www.jianshu.com/p/dc493809a2fd
