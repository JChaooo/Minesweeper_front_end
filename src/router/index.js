// 引入并解构vue-router
import {createRouter,createWebHistory} from "vue-router";
import MainCom from "@/components/MainCom";
import LoginCom from "@/components/LoginCom";
import DiaLog from "@/components/DiaLog";
import ChessCom from "@/components/ChessCom";
import CheckerBoardCom from "@/components/CheckerBoardCom";

// 定义路由表
const routes=[
    {
        path:'/',
        name:'main',
        component:MainCom
    },
    {
        path: "/login",
        name: "login",
        component: LoginCom
    },
    {
        path: "/dialog",
        name: "dialog",
        component: DiaLog
    },
    {
        path: "/chess",
        name: "chess",
        component: ChessCom
    },
    {
        path: "/checker",
        name: "checker",
        component: CheckerBoardCom
    }
]

// 创建路由对象
const router=createRouter({
    history:createWebHistory(),
    routes
})

// 暴露路由对象
export default router