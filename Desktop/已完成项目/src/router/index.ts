import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

export const routes = [
  {
      path: "/",
      redirect: "/home",
  },
  {
      path: "/home",
      name: "home",
      component: HomeView,
      children: [
        // 二级路由开始, path 中不需要添加额外的 /
        {
            path:'index',
           component: ()=> import("../views/home/index.vue"),
        },
        {
            path: "work",
            name: "work",
            text: "工作台",
            component: () => import("../views/work/index.vue"),
        },
        { path: "draft",
          name: "draft",
          text: "合同起草",
          component: () => import("../views/draft/index.vue"),
          children: [
            {
                // 我的草稿
                path: "mydraft",
                name: "mydraft",
                text: "我的草稿",
                component: () => import("../views/draft/mydraft.vue")
            },
            {
                // 起草合同
                path: "write",
                name: "write",
                text: "起草合同",
                component: () => import("../views/draft/write.vue"),
            },
        ],
        } ,
        {
          path: "manager",
          name: "manager",
          text: "合同管理",
          component: () => import("../views/manager/index.vue"),
          children:[
            {
              path: "mycon",
              name: "mycon",
              text: "我的合同",
              component:()=>import("../views/manager/mycon.vue"),
            },
            {
              path: "conapp",
              name: "conapp",
              text: "合同审批",
              component:()=>import("../views/manager/conapp.vue"),
            }
          ],
        },
        {

          path: "sign",
          name: "sign",
          text: "合同签署",
          component: () => import("../views/sign/index.vue"),

        },
        {
          path: "lx",
          name: "lx",
          text: "合同履行",
          component: () => import("../views/lx/index.vue"),

        },
        {
          
          path: "risk",
          name: "risk",
          text: "合同风险",
          component: () => import("../views/risk/index.vue"),

        },
        {

          path: "files",
          name: "files",
          text: "合同档案",
          component: () => import("../views/files/index.vue"),

        },
        {
          path: "seal",
          name: "seal",
          text: "印章管理",
          component: () => import("../views/seal/index.vue"),

        },
        {
          path: "config",
          name: "config",
          text: "基础配置",
          component: () => import("../views/config/index.vue"),

        },
        {
          path: "sysm",
          name: "sysm",
          text: "系统管理",
          component: () => import("../views/sysm/index.vue"),

        }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

// console.log('++++++', router.getRoutes())
export default router;
