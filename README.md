# render
##说明
微信小程序响应式渲染，不用手动setData，与Vue ng类似，js中直接this.data.xx = xx;即可渲染页面，支持数组方法，支持通过数组索引直接赋值。
##使用
将render.js放入utils中，在需要此功能的页面require引入,在页面onLoad()内调用render.js中的setRender(this)即可。
