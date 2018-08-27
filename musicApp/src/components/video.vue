<template>
  <div class="video">
    <ul class="routerLink">
        <li v-for="item,index in url" @click.stop="activeChange(index)">
             <router-link :to="`/${item}`" :class="index === activeIndex ? 'active' : ''">{{item}}</router-link>
        </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    data() {
        return {
            url: ['cover', 'live', 'mv'],
            activeIndex: 0,
        }
    },
    methods: {
        activeChange(index) {
            this.activeIndex = index
        }
    }
}
</script>

<style lang="less" scoped>
.video {
  .routerLink {
    height: 50px;
    background: #fd0c0c;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      a {
        display: inline-block;
        color: #fff;
        padding-top: 5px;
        height: 40px;
        line-height: 40px;
        text-decoration: none;
      }
      .active {
        border-bottom: 1px solid #fff;
      }
    }
  }
}
</style>
