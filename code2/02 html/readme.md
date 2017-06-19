[TOC]

## 流行框架 Angular第二天

### 反馈
- 什么是spa ?
    + simple page application
- 控制器的使用方式
- 写一个双向数据绑定的helloworld
- 思路有了不会写代码
- angular学习来容易吗
- 加快速度 多扩展


### 1.控制器中的$scope为什么不能改成其他的名字
- angular是根据形参的名字去传递实参

### 2.安全的方式创建控制器


### 3.原理：如何根据形参的名字传递参数



### 3.Angular常用指令
- 指令分类:内置指令(普通指令、事件指令) 自定义指令
- 普通指令
    + ng-repeat 遍历数据

        ```html
        <body ng-app="myApp" ng-controller="demoCtrl">
            <h4>遍历 一维数组</h4>
            <ul>
                <!--
                    ng-repeat 遍历数据 类似于for in 循环
                    in 是固定写法
                    in 后面加上要遍历的数据
                    item 是遍历的当前项(item这个词可以随意写)
                    这个指令可以加在任何标签上
                -->
                <li ng-repeat="item in data">
                    {{item}}
                </li>
            </ul>
            <hr />

            <h4>遍历 数组中混合对象</h4>
            <p ng-repeat="item in person">{{item.name}} {{item.age}}</p>
            <hr />

            <h4>遍历 对象</h4>
            <!--
                key代表对象的键值
                val代表对象键值对应的值
            -->
            <div ng-repeat="(key,val) in obj">
                {{key}} {{val}}
            </div>

            <script src="node_modules/angular/angular.min.js"></script>
            <script>
                angular.module('myApp',[])
                    .controller('demoCtrl',['$scope',function($scope){

                        // 一维数组
                        $scope.data = ['小明','小红','小黑','小琴'];

                        // 数组中混合对象(最常用的形式)
                        $scope.person = [
                            {name:'小明',age:18},
                            {name:'小红',age:28},
                            {name:'小红',age:28},
                            {name:'小黑',age:38},
                            {name:'小琴',age:48}
                        ]

                        // 对象
                        $scope.obj = {
                            name:'小明',
                            age:35,
                            hobby : '吃饭'
                        }

                    }])
            </script>
        </body>
        ```

    + ng-repeat 补充

        ```html
        <body ng-app="myApp" ng-controller="demoCtrl">
            
            <!--
                
                在遍历的过程中
                    $index : 遍历过程中的索引
                    $first : 布尔类型的值 当前是否是第一项 是返回true 不是返回false
                    $last  : 布尔类型的值 当前是否是最后一项 是返回true 不是返回false
                    $middle : 布尔类型的值 第一项和最后一项返回false 其余返回true
                    $even : 偶数项返回true 否则返回false
                    $odd : 奇数项返回true 否则返回false

                我们可以利用这些值在循环的过程中做各种判断 达到我们想要的目的
            -->
            
            <ul>
                <li ng-repeat="item in person" class="{{$first ? 'first' : ''}} {{ $last ? 'last' : ''}}">
                    <p>名字：{{item.name}}</p>
                    <p>年龄：{{item.age}}</p>
                    <p>索引：{{$index}}</p>
                    <p>是否是第一项：{{$first}}</p>
                    <p>是否是最后一项：{{$last}}</p>
                    <p>是否是中间项：{{$middle}}</p>
                    <p>是否偶数项：{{$even}}</p>
                    <p>是否奇数项：{{$odd}}</p>
                </li>
            </ul>

            <!--
            
                默认情况下遍历的数组中不能有重复类型的值(基本数据类型) 否则会报错 信息如下

                [ngRepeat:dupes]  ng-repeat指令被愚弄(调戏)了

                解决: 在遍历的数据后面写上track by 一个唯一(不重复)的值  一般会写$index
                
            -->
            
            <hr />

            <div ng-repeat="item in data track by $index">
                {{item}}
            </div>
                
            <hr />

            <div ng-repeat="(key,val) in data track by key">
                {{val}}
            </div>
            
            <hr />
                
            <!-- 通过奇偶数做隔行变色 -->

            <style>
                .even{background:pink;}
                .odd{background:lightblue;}
            </style>
            <ul>
                <li ng-repeat="item in person" class="{{$even ? 'even' : 'odd'}}">
                    <p>名字：{{item.name}}</p>
                    <p>年龄：{{item.age}}</p>
                    <p>索引：{{$index}}</p>
                    <p>是否是第一项：{{$first}}</p>
                    <p>是否是最后一项：{{$last}}</p>
                    <p>是否是中间项：{{$middle}}</p>
                    <p>是否偶数项：{{$even}}</p>
                    <p>是否奇数项：{{$odd}}</p>
                </li>
            </ul>

            <script src="node_modules/angular/angular.min.js"></script>
            <script>
                angular.module('myApp',[])
                    .controller('demoCtrl',['$scope',function($scope){

                        $scope.person = [
                            {name:'小明',age:18},
                            {name:'小红',age:28},
                            {name:'小红',age:28},
                            {name:'小黑',age:38},
                            {name:'小琴',age:48}
                        ]


                        // 数组中存在重复的值
                        $scope.data = ['小明','小红','小明','小红'];

                    }])
            </script>
        </body>
        ```
    
    + 在循环的过程中如果有重复项 需要加上 track by $index

    + ng-class指令 用来操作类名

        ```html
        <body ng-app="myApp" ng-controller="demoCtrl">
            <style>
                button {
                    width: 120px;
                    height: 40px;
                    border: none;
                    outline: none;
                    color: #FFF;
                    font-size: 16px;
                }
                
                .red {
                    background: red;
                }
                
                .green {
                    background: green;
                }
            </style>
            <!--
                ng-class指令：专门用来操作类名的

                    1.指令的值以对象的形式存在
                    2.对象的属性值转化为布尔值是true时,将当前的属性名作为类名添加到class属性中
                    3.对象的属性值转化为布尔值是false时,将当前的属性名从class属性中删除掉
                    4.属性值可以是数据模型,也可以是JS表达式

                注意：angular不推崇DOM操作,在当前例子中并没有直接操作类名的JS语句,
                而是通过数据模型isGreen的值是true还是false来确定添加哪个颜色的类名,
                至于如何添加到class属性中,由angular替我们完成。

            -->
            <button ng-class="{'green':isGreen,'red':!isGreen}" ng-click="setColor()">按钮</button>
            <script src="node_modules/angular/angular.min.js"></script>
            <script>
                angular.module('myApp', [])
                    .controller('demoCtrl', ['$scope', function($scope) {

                        // isGreen用来控制当前按钮是绿色还是非绿色
                        $scope.isGreen = true;

                        // 用来切换按钮的颜色
                        $scope.setColor = function(){

                            // 让isGreen在每次点击按钮的时候跟当前值取反
                            // 也就是一次是true 一次是false 
                            // 以达到切换颜色的目的
                            $scope.isGreen = !$scope.isGreen;

                        }

                    }])
            </script>
        </body>
        ```

    + ng-bind ng-bind-template ng-cloak 数据绑定 解决表达式闪烁问题

        ```html
        <body ng-app="myApp" ng-controller="demoCtrl">
            <!-- 
                在angular没有被加载进页面之前,浏览器会将下面的
                表达式当作普通字符串显示在页面中,angular在被加
                载进页面之后,才会将下面的表达式替换成了对应的数
                据,这样就会存在闪烁问题
            -->
            {{msg1}}

            <!--
                用指令ng-bind绑定数据解决这个问题
                ng-bind指定是专门用来做数据绑定的
            -->
            <div ng-bind="msg1"></div>
            
            <!--
                除此之外,还有一个指令ng-cloak,也可以解决表达式闪烁的问题
                angular会隐藏有ng-cloak指令或样式的元素,在做完解析之后又会
                移除元素身上的ng-cloak样式和指令,从而解决表达式闪烁的问题

                但是！angular在页面的最后才被引用进来,所以不能很好的解决这
                个问题需要我们手动在页面顶部加上隐藏元素的样式
            -->
            <style>
                .ng-cloak,[ng-cloak]{display:none;}
            </style>
            <div class="ng-cloak">
                {{msg2}}
            </div>

            <div ng-cloak>
                {{msg2}}
            </div>


            <script src="node_modules/angular/angular.min.js"></script>
            <script>
                angular.module('myApp',[])
                    .controller('demoCtrl',['$scope',function($scope){

                        $scope.msg1 = '指令ng-bind解决表达式闪烁问题';
                        $scope.msg2 = '指令ng-cloak解决表达式闪烁问题';

                    }])
            </script>
        </body>
        ```
    
    + ng-non-bindable 不解析表达式
    
    + ng-show、ng-hide 通过样式的方式控制元素显示隐藏

        ```html
        <body ng-app="myApp" ng-controller="demoCtrl">
            
            <!--
                
                ng-show ：控制元素显示隐藏(通样式的方式)

                    当值为true时 元素显示
                    当值为false时 元素隐藏

                ng-hide ：控制元素显示隐藏(通样式的方式)

                    当值为true时 元素隐藏
                    当值为false时 元素显示

            -->
            
            <h3>例子1 当没有数据的时候显示 '暂无数据'</h3>
            <ul>
                <li ng-repeat="data in list">
                    <span>{{data.id}}</span>
                    <a href="#">{{data.title}}</a>
                    <div>
                        {{data.description}}
                    </div>
                </li>
            </ul>

            <!-- 

                当没有数据的时候显示 "暂无数据"

                可以通过ng-show指令 如果存放数据的数组长度为0
                也就是没有数据 表达式返回true 当前div显示

                如果存放数据的数组不为0 表达式返回false 当前div隐藏

                也可以用ng-hide="list.length" 达到相同效果(自行思考)
                
            -->
            <div ng-show="list.length == 0">暂无数据</div>
            <a href="javascript:;" ng-click="resetData()">清空数据</a>

            <hr />

            <h3 ng-init="isToggle=true">例子2 选项卡切换</h3>
            <button ng-click="isToggle=true">显示1</button>
            <button ng-click="isToggle=false">显示2</button>
            <div ng-show="isToggle">1</div>
            <div ng-show="!isToggle">2</div>

            <script src="node_modules/angular/angular.min.js"></script>
            <script>
                angular.module('myApp',[])
                    .controller('demoCtrl',['$scope',function($scope){

                        $scope.list = [
                            {
                                id:'1',
                                title:'有人在微信QQ上拉你搞投资？那都是骗子！',
                                description : '喜欢炒股的朋友或许经常在微信或者QQ收到各种“业务员”的推广，有的介绍老师给你，有的介绍私募给你，有的是亲自操刀上阵，通常情况下是在操作获利之后五五分成，在操作一段时间之后，“业务员”会告诉你最近股市不好做，不好赚钱，而“我们有新的业务”，可以快速地获得利润，再给你发一些高收益的截图。'
                            },
                            {
                                id:'2',
                                title:'女子被"男友"骗150万 相处3年不知对方系闺蜜假扮',
                                description : '时报讯 今年2月，杭州市滨江警方接到一起报警，报警人林芬（化名）称2014年至2017年间，自己被男友高鹏（化名）骗了共计150多万元。近日，民警抓获了该案嫌疑人，一看，这高鹏啊，不仅是个女的，还是林芬的闺蜜。'
                            }
                        ]

                        // 删除数据方法
                        $scope.resetData = function(){

                            // 快速清空数组
                            $scope.list.length = 0;

                            // 也可以将数组重新复制为空数组
                            // $scope.list = [];

                        }

                    }])
            </script>
        </body>
        ```

    + ng-if 控制元素显示隐藏
        * 和ng-show用法相同
        * 区别是ng-if是通过DOM节点的添加和删除使得元素显示和隐藏

    + ng-switch、ng-switch-when

        ```html
        <!--
            ng-switch ng-switch-when 是一对指令类
            似于JS中 switch case 语句

            匹配到哪项 哪项就显示 其他项就隐藏

            常用于 做多个选项卡的显示和隐藏

        -->
        <body ng-app ng-init="showNum=1">
            <div ng-switch="showNum">
                <button ng-click="showNum=1">显示1</button>
                <button ng-click="showNum=2">显示2</button>
                <button ng-click="showNum=3">显示3</button>
                <div ng-switch-when="1">1</div>
                <div ng-switch-when="2">2</div>
                <div ng-switch-when="3">3</div>
            </div>
            <script src="node_modules/angular/angular.min.js"></script>
        </body>
        ```

    + ng-options 生成select下拉列表 需要配合ng-model指令使用 否则报错

        ```html
        <body ng-app="myApp" ng-controller="demoCtrl">
                    
            <!--
                ng-options ：生成下拉框列表 需要和ng-model指令配合使用

                ball in balls 类似于ng-repeat

                    balls 是要进行循环的数据

                    in 固定写法

                    ball 是每次循环的当前项

                ball.name for
                    
                    for 固定写法

                    ball.name 将要显示在option标签内的值

                ball.value as

                    as 固定写法

                    ball.value 将要显示在option标签value属性中的值

            -->

            <select ng-model="likeBall" ng-options="item.value as item.name for item in balls"></select>

            {{likeBall}}

            <script src="node_modules/angular/angular.min.js"></script>
            <script>
                angular.module('myApp',[])
                    .controller('demoCtrl',['$scope',function($scope){

                        // 给下拉列表设置默认值 和options标签value属性的值对应
                        $scope.likeBall = "001";

                        // 下拉列表的数据源
                        $scope.balls = [
                            {
                                name:'足球',
                                value:'001'
                            },
                            {
                                name:'篮球',
                                value:'002'
                            },
                            {
                                name:'橄榄球',
                                value:'003'
                            },
                            {
                                name:'排球',
                                value:'004'
                            },
                            {
                                name:'乒乓球',
                                value:'005'
                            }
                 
                        ];

                    }])
            </script>
        </body>
        ```

- 事件指令
    + ng-click
    + ng-dblclick
    + ng-blur
    + ng-focus
    + ng-change
- 其他指令
    + ng-href
    + ng-src
    + ng-value
    
### 4.练习：在点击提交按钮后将选中项找出来
```html
<body ng-app="myApp" ng-controller="demoCtrl">
    <h3>在点击提交按钮后将选中项找出来</h3>
    <label ng-repeat="data in balls">
        <input type="checkbox" value="{{data.name}}" ng-model="data.isChecked"/>{{data.name}}
    </label>

    <br/><br/>

    <button ng-click="submitData()">提交</button>
    <br/><br/>
    选中的结果：
    <ul>
        <li ng-repeat="data in result">{{data.name}}</li>
    </ul>
    <script src="node_modules/angular/angular.min.js"></script>
    <script>
        angular.module('myApp',[])
            .controller('demoCtrl',['$scope',function($scope){

                $scope.balls = [
                    {
                        name:'足球',
                        isChecked : false
                    },
                    {
                        name:'篮球',
                        isChecked : false
                    },
                    {
                        name:'橄榄球',
                        isChecked : false
                    },
                    {
                        name:'排球',
                        isChecked : false
                    },
                    {
                        name:'乒乓球',
                        isChecked : false
                    }
                ];

                $scope.result = [];

                $scope.submitData = function(){

                    $scope.result = [];

                    for(var i=0;i<$scope.balls.length;i++){

                        if($scope.balls[i].isChecked){

                            $scope.result.push($scope.balls[i])

                        }

                    }

                }

            }])
    </script>
</body>
```

### 5.面向对象的方式创建控制器

```html
<body ng-app="myApp" ng-controller="demoCtrl as hello">
    <p>{{hello.name}}</p>
    <p>{{age}}</p>
    <script src="node_modules/angular/angular.min.js"></script>
    <script>
        angular.module('myApp', [])

        /*
            1.angular内部会帮我们new控制器处理函数
            2.demoCtrl as hello 这个hello就是new出来的对象
            3.在视图中我们就可以使用hello.属性的方式取到hello对象中的值
            4.面向对象的方式和$scope可以同时使用

         */

            .controller('demoCtrl', ['$scope', function($scope) {

                this.name = '我是孙悟空';

                $scope.age = '我今年500岁';

            }])
    </script>
</body>
```

### 6.MVC MVVM介绍
+ 【MVC】思想源于后端
+ M model 模型 数据和数据相关的方法(直接操作数据库的方法)
+ V view 视图 用户界面
+ C controller 控制器 网站的业务逻辑都写在控制器里面
+ 对代码进行分类,便于管理
+ MVC思想并不完全适用于前端
+ MVC里面的控制器做的事情太多了 代码又变得冗余

+ 【MVVM】思想
+ 它并不是一个全新的思想 是对MVC思想的改进 升级
+ M model 模型 数据和数据相关的方法 ajax请求
+ V view 视图 用户界面
+ VM 它都是跟数据双向绑定有关系 $scope
+ angular就是基于MVVM这样的一个前端框架

### 7.[AngularJS Batarang Chrome开发调试工具](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
