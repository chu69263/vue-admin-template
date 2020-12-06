import Layout from '@/framework/layout'
import { constantRoutes as appConstantRoutes } from '@/app/router'

// 默认路由
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/framework/views/login'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/framework/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/framework/views/dashboard'),
            meta: { title: '仪表盘', icon: 'dashboard' }
        }]
    },
    ...appConstantRoutes
]
// 权限配置路由，只有超级管理员有权限
export const permissionRoutes = [
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/menu',
        name: 'PermissionSetup',
        meta: {
            title: '权限配置',
            icon: 'nested'
        },
        children: [{
            path: 'menu',
            name: 'PermissionSetupMenu',
            component: () => import('@/framework/views/permission/SetupMenu'),
            meta: { title: '菜单配置' }
        }, {
            path: 'action',
            name: 'PermissionSetupAction',
            component: () => import('@/framework/views/permission/SetupAction'),
            meta: { title: '接口配置' }
        }]
    }
]

// 通配符路由，必须放最后，所以分开
export const lastRoutes = [
    { path: '*', redirect: '/404', hidden: true }
]