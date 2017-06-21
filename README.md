### 有一个小BUG
- 当你点击那个div后再点击那个div 改变后的属性并没有删除
- 初始的属性加在了改变后的属性的后边
> 点击前
```
class="content-border"
```
> 点击后
```
class="content-change"
```
> 再次点击
```
class="content-change content-border"
```