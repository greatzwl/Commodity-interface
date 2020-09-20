<template>
  <div id="detail">
  <detail-nar-bar class="detail-nav"/>
    <scroll class="center" ref="scroll">
  <detail-swiper :top-images="topImages"/>
    <derail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="ImagesLoad"/>
      <detail-prams-info :param-info="ParamInfo"/>

    </scroll>
  </div>

</template>

<script>
  import DetailNarBar from "./childcompons/DetailNarBar";
  import DetailSwiper from "./childcompons/DetailSwiper";
  import DerailBaseInfo from "./childcompons/DerailBaseInfo";
  import DetailShopInfo from "./childcompons/DetailShopInfo";
  import DetailGoodsInfo from "./childcompons/DetailGoodsInfo";
  import DetailPramsInfo from "./childcompons/DetailPramsInfo";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,Goods,Shop,GoodsParam} from "network/detail"

    export default {
        name: "Detail",
      components:{
        DetailNarBar,
        DetailSwiper,
        DerailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailPramsInfo,

        Scroll,
      },
      data(){
          return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            ParamInfo:{},

          }
      },
      created() {
        //  保存传入的id
        this.iid = this.$route.params.iid

      // 根据id请求数据
        getDetail(this.iid).then(res =>{
          //请求顶部图片
          console.log(res);
          const data = res.result;
          this.topImages =data.itemInfo.topImages
        //  获取商品的基本数据
          this.goods = new Goods (data.itemInfo,data.columns,data.shopInfo.services)
        //  请求商品商家信息
          this.shop= new Shop (data.shopInfo)
        //  商品详情的信息
          this.detailInfo = data.detailInfo;
        //  获取参数的信息
          this.ParamInfo = new GoodsParam (data.itemParams.info, data.itemParams.rule)
        })

      },
      methods:{
          ImagesLoad(){
            this.$refs.scroll.scroll.refresh()
          }
      }
    }
</script>

<style scoped>

#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
  .center{
    height: calc(100% - 44px);
  }

</style>
