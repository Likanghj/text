 
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import itemList from './views/project/itemList.vue'
import itemListBu from './views/project/itemListBu.vue'
import itemListTe from './views/project/itemListTe.vue'
import itemListOther from './views/project/itemListOther.vue'

import itemDetail from './views/project/itemDetail.vue'
 

let routes = [
    
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // { path: '/main', component: Main },
    {
        path: '/',
        redirect:'/itemList',
        component: Home,
        name: '项目看板',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/itemList', component: itemList, name: '首页',hidden:true },
            { path: '/itemListBu', component: itemListBu, name: '业务项目' },
            { path: '/itemListTe', component: itemListTe, name: '技术项目' },
            { path: '/itemListOther', component: itemListOther, name: '其他项目' },
        ]
    },
    {
        path: '/itemDetail/:id',
        component: Home,
        name: '看板详情',
        hidden: true,
        children: [
            { path: '/itemDetail/:id', component: itemDetail, name: '看板详情' },
          
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;