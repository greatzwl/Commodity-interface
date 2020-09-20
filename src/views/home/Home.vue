<template>
  <div id="home">
    <nav-bar class="hmoe-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="control"
      v-show="isTabFixed"
    />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
           >

    <home-swiper :banners="banners"
                 @swiperImageLoad="swiperImageLoad"
    />
    <recommend-view :recommends="recommends"/>
    <feture-view/>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"

    />
    <goods-list :goods="Showgoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="backshow" />

  </div>
</template>

<script>
  import HomeSwiper from './childcompons/HomeSwiper';
  import RecommendView from "./childcompons/RecommendView";
  import FetureView from "./childcompons/FetureView";
  import Scroll from 'components/common/scroll/Scroll';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "../../components/content/tabcontrol/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import  BackTop from 'components/content/backtop/BackTop';


  import {getHomeMultiData,
    getHomeGoods
  } from "network/home";
  import  {debounce} from 'common/debounce'

    export default {
      name: "Hmoe",
      components: {
        HomeSwiper,
        RecommendView,
        FetureView,
        Scroll,

        NavBar,
        TabControl,
        GoodsList,
        BackTop
      },
      data() {
        return {
          banners: [],
          recommends: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []}
          },
          currentype:'pop',
          backshow:false,
          taboffsetTop:0,
          isTabFixed:false,
          saveY:0
        }
      },
      computed:{
        Showgoods (){
          return  this.goods[this.currentype].list
        }
      },
      created() {
        //请求多个数据 ，轮播图
        this.getHomeMultiData()
        //请求商品数据

        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      },

      mounted(){
         const refresh = debounce(this.$refs.scroll.refresh,200)

        this.$bus.$on('ItemImageLoad', ()=> {
          refresh()
        })
      },
      activated() {
        this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
      },
       deactivated() {
        this.saveY = this.$refs.scroll.getscrolly()
       },

      methods: {
        /*
        *点击事件
        */
        loadMore(){
          this.getHomeGoods(this.currentype)
        },
        tabClick(index){
          switch (index) {
            case 0:
            this.currentype = 'pop'
                  break
            case 1 :
              this.currentype = 'new'
                  break
            case 2 :
              this.currentype = 'sell'
                  break
          }

          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;

        },
        backClick() {
          this.$refs.scroll.scroll.scrollTo(0, 0, 300)
        },
        contentscroll(position){
          //backtop是否显示
          this.backshow = -(position.y) > 1000
        //  决定是否吸顶 （postion:fixed）
          this.isTabFixed =  (-position.y) > this.taboffsetTop
        },
        swiperImageLoad(){
          this.taboffsetTop= this.$refs.tabControl2.$el.offsetTop;
        },


        /*
        *数据请求
         */
        getHomeMultiData() {
          getHomeMultiData().then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;

          })
        },

        getHomeGoods(type) {
          const page =this.goods[type].page + 1
          getHomeGoods(type,page).then(res =>{
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            this.$refs.scroll.finishPullUp()
          })
        }
      }
    }
</script>

<style scoped>
  #home{

    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;

  }

  .hmoe-nav{
    background-color: var(--color-tint) ;
    color: #fff;


  }
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index:9;*/
  /*}*/

.content{

  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.control{
  position:relative;
  z-index: 9;
}

</style>
