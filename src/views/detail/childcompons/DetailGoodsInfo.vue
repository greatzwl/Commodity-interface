<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
  <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
  <div class="info-list">
    <img v-for="(item,index) in detailInfo.detailImage[0].list" :key ="index"
    :src="item"  @load="imgLoad" alt="">
  </div>
  </div>
</template>

<script>
    export default {
        name: "DetailGoodsInfo",
      props:{
          detailInfo:{
            type:Object,
            default(){
              return{}
            }
          }
      },
      data(){
          return{
            counter:0,
            imagesLength:0
          }
      },
      methods:{
          imgLoad(){
            this.$emit('imagesLoad')
          // 判断所有的图片都加载完了，那么进行一次回调就可以了
          //   if(++this.counter === this.imagesLength) {
          //     this.$emit('imagesLoad')
          //   }
          }
      },
      // watch:{
      //     detailInfo(){
      //     //  获取图片的个数
      //       this.imagesLength = this .detailInfo.detailImages[0].list.length
      //     }
      // }
    }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
  }
  .info-list img{
    width: 100%;
    padding-bottom: 2px;
  }


</style>
