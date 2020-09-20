<template>
  <nav-bar>
    <div slot="left" class="left" @click="backClick">
      <img src="~assets/img/common/back.svg">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in title" class="itemtitle"
      :class="{active: currentIndex === index }"
           @click="titleClick(index)"
      >{{item}}</div>
    </div>
  </nav-bar>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";


    export default {
        name: "DetailNarBar",
      components:{
        NavBar
      },
      data (){
          return {
            title:['商品','参数','评论','推荐'],
            currentIndex:0,
          }
      },
      methods:{
          titleClick(index){
            this.currentIndex = index
          },
        backClick(){
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 15px;
  }
  .itemtitle{
    flex: 1;
  }
  .active{
    color:var(--color-high-text);;
  }
  .left img{
    padding-top: 12px;
  }

</style>
