/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
import Layout from '@/framework/layout'

// 文档参照 https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html

// 公开的路由
export const constantRoutes = [{
    path: '/demo',
    component: Layout,
    redirect: '/demo/index',
    name: 'Demo',
    meta: { title: '例子', icon: 'nested' },
    children: [{
        path: 'index',
        name: 'DemoIndex',
        meta: { title: '设置值', icon: 'nested' },
        component: () => import('@/app/views/demo/index'),
    },
    {
        path: 'index2',
        name: 'DemoIndex2',
        meta: { title: '获取值', icon: 'nested' },
        component: () => import('@/app/views/demo/index2'),
    }]
}]

// 需要权限验证的路由
export const asyncRoutes = [
    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: '菜单1',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/app/views/nested/menu1'), // Parent router-view
                name: 'Menu1',
                meta: { title: '子菜单' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/app/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/app/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        alwaysShow: true,
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/app/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/app/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/app/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                name: 'Menu2',
                component: () => import('@/app/views/nested/menu2'),
                meta: { title: 'menu2' }
            }
        ]
    }
]
