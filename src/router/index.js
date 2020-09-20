import Vue from 'vue'
import VueRouter from 'vue-router'
import Detail from "../views/detail/Detail";


const Home = () => import('../views/home/Home')
const Profile = () =>  import('../views/profile/Profile')
const Cart = () => import('../views/cart/Cart')
const Category = () => import('../views/category/Category')
// const Detail = () => import('../views/detail/Detail')

// 安装插件
Vue.use(VueRouter)

// 2.建立路由对象
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }


]

const router = new VueRouter({
  routes,
  mode:'history'

})

export default router
