import Vue from "vue";
import VueRouter from "vue-router";
import {TOKEN} from "../js/storage";

Vue.use(VueRouter);
const routes = [
    // 登录
    {
        path: '/login',
        meta: {
            title: "login",
            require: true
        },
        name: "LOGIN",
        component: () => import('../views/admin/login.vue'),
    },
    // 管理员
    {
        path: "/admin",
        name: "Admin",
        redirect: {
            name: "ADMIN_HOME",
        },
        component: () =>
            import(/* webpackChunkName: "admin" */ "../views/admin/index.vue"),
        children: [
            {
                path: 'home',
                name: "ADMIN_HOME",
                redirect: {name: "ADMIN_INDEX"},
                component: () => import('../views/admin/home/index.vue'),
                children: [
                    {
                        path: 'index',
                        name: 'ADMIN_INDEX',
                        meta: {
                            require: true
                        },
                        component: () => import('../views/admin/home/home.vue'),
                    }
                ]
            },
            {
                path: 'management',
                name: "ADMIN_MANAG",
                redirect: {name: "ADMIN_MANAG_LIST"},
                component: () => import('../views/admin/management/index.vue'),
                children: [
                    {
                        path: 'list',
                        name: 'ADMIN_MANAG_LIST',
                        meta: {
                            title: "栏目管理",
                            require: true
                        },
                        component: () => import('../views/admin/management/list.vue'),
                    }]
            },
            {
                path: 'capsule',
                name: "ADMIN_CAPSULE",
                redirect: {name: "ADMIN_CAPSULE_LIST"},
                component: () => import('../views/admin/capsule/index.vue'),
                children: [
                    {
                        path: 'list',
                        name: 'ADMIN_CAPSULE_LIST',
                        meta: {
                            title: "木竭胶囊",
                            require: true
                        },
                        component: () => import('../views/admin/capsule/list.vue'),
                    }
                ]
            },
            {
                path: 'experts',
                name: "ADMIN_EXPERTS",
                redirect: {name: "ADMIN_EXPERTS_LIST"},
                component: () => import('../views/admin/experts/index.vue'),
                children: [
                    {
                        path: 'list',
                        name: 'ADMIN_EXPERTS_LIST',
                        meta: {
                            title: "专家义诊",
                            require: true
                        },
                        component: () => import('../views/admin/experts/list.vue'),
                    }
                ]
            },
            {
                path: 'training',
                name: "ADMIN_TRAINING",
                redirect: {name: "ADMIN_TRAINING_LIST"},
                component: () => import('../views/admin/training/index.vue'),
                children: [
                    {
                        path: 'list',
                        name: 'ADMIN_TRAINING_LIST',
                        meta: {
                            title: "专家义诊",
                            require: true
                        },
                        component: () => import('../views/admin/training/list.vue'),
                    }
                ]
            },
            {
                path: 'contact',
                name: "ADMIN_CONTACT",
                redirect: {name: "ADMIN_CONTACT_LIST"},
                component: () => import('../views/admin/contact/index.vue'),
                children: [
                    {
                        path: 'list',
                        name: 'ADMIN_CONTACT_LIST',
                        meta: {
                            title: "技术培训",
                            require: true
                        },
                        component: () => import('../views/admin/contact/list.vue'),
                    }
                ]
            },
        ]
    },
    // 普通
    {
        path: "/",
        name: "USER",
        redirect: {
            name: "HOME",
        },
        component: () =>
            import(/* webpackChunkName: "user" */ "../views/user/index.vue"),
        children: [
            {
                path: '/home',
                meta: {
                    title: "首页",
                },
                name: "HOME",
                redirect: {name: "INDEX"},
                component: () => import('../views/user/home/index.vue'),
                children: [
                    {
                        path: 'index',
                        name: 'INDEX',
                        component: () => import('../views/user/home/home.vue'),
                    }
                ]
            },
            {
                path: '/capsule',
                meta: {
                    title: "木竭胶囊",
                },
                name: "CAPSULE",
                redirect: {name: "VIDEO"},
                component: () => import('../views/user/capsule/index.vue'),
                children: [
                    {
                        path: 'video',
                        name: 'VIDEO',
                        meta: {
                            title: "视频宣传",
                        },
                        component: () => import('../views/user/capsule/video.vue'),
                    },
                    {
                        path: 'parsing',
                        name: 'PARSING',
                        meta: {
                            title: "组方解析",
                        },
                        component: () => import('../views/user/capsule/parsing.vue'),
                    },
                    {
                        path: 'project',
                        name: 'PROJECT',
                        meta: {
                            title: "木竭项目介绍",
                        },
                        component: () => import('../views/user/capsule/project.vue'),
                    }
                ]
            },
            {
                path: '/experts',
                meta: {
                    title: "专家义诊",
                },
                name: "EXPERTS",
                redirect: {name: "ADDRESS"},
                component: () => import('../views/user/experts/index.vue'),
                children: [
                    {
                        path: 'address',
                        name: 'ADDRESS',
                        meta: {
                            title: "定点义诊",
                        },
                        component: () => import('../views/user/experts/address.vue'),
                    },
                    {
                        path: 'Introduction',
                        name: 'INTRODUCTION',
                        meta: {
                            title: "专家简介",
                        },
                        component: () => import('../views/user/experts/introduction.vue'),
                    },
                    {
                        path: 'declared',
                        name: 'DECLARED',
                        meta: {
                            title: "义诊宣告",
                        },
                        component: () => import('../views/user/experts/declared.vue'),
                    }
                ]
            },
            {
                path: '/training',
                meta: {
                    title: "技术培训",
                },
                name: "TRAINING",
                redirect: {name: "THERAPY"},
                component: () => import('../views/user/training/index.vue'),
                children: [
                    {
                        path: 'therapy',
                        name: 'THERAPY',
                        meta: {
                            title: "太极调衡疗法",
                        },
                        component: () => import('../views/user/training/therapy.vue'),
                    },
                    {
                        path: 'photo',
                        name: 'PHOTO',
                        meta: {
                            title: "培训合影",
                        },
                        component: () => import('../views/user/training/photo.vue'),
                    }
                ]
            },
            {
                path: '/contact',
                meta: {
                    title: "联系我们",
                },
                name: "CONTACT",
                redirect: {name: "RECRUITMENT"},
                component: () => import('../views/user/contact/index.vue'),
                children: [
                    {
                        path: 'recruitment',
                        name: 'RECRUITMENT',
                        meta: {
                            title: "人才招聘",
                        },
                        component: () => import('../views/user/contact/recruitment.vue'),
                    },
                    {
                        path: 'cooperation',
                        name: 'COOPERATION',
                        meta: {
                            title: "定点合作登记",
                        },
                        component: () => import('../views/user/contact/cooperation.vue'),
                    }
                ]
            },
            {
                path: '/search',
                meta: {
                    title: "搜索",
                },
                name: "SEARCH",
                component: () => import('../views/user/search.vue')
            }
        ]
    },
    // 404
    {
        path: '/404',
        name: 'Error',
        meta: {
            title: '404-页面不存在'
        },
        component: () => import('../views/no-router'),
    }
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});
router.beforeEach((to, from, next) => {
    if (to.matched.length !== 0) {
        if (to.meta.require) {
            let token = TOKEN.getValue();
            if (token) {
                next()
            } else {
                if (to.name === 'LOGIN') {
                    next()
                } else {
                    next({path: "/login", replace: true})
                }
            }
        } else {
            next()
        }
    } else {
        next({path: '/404'})
    }
})
export default router;