<template>
  <div class="individuation">
    <ul class="routerLink">
        <li v-for="item,index in url" @click.stop="activeChange(index)">
             <router-link :to="`/${item.link}`" :class="index === activeIndex ? 'active' : ''">{{item.text}}</router-link>
        </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: [{
        link: "commend",
        text: "推荐"
      }, {
        link: "friends",
        text: "朋友"
      }, {
        link: "radio",
        text: "电台"
      }],
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
.individuation {
  .routerLink {
    height: 40px;
    background: #fd0c0c;
    display: flex;
    margin: 0;
    li {
      flex: 1;
      text-align: center;
      a {
        margin-top: 5px;
        display: inline-block;
        color: #fff;
        height: 30px;
        line-height: 30px;
        text-decoration: none;
      }
      .active {
        border-bottom: 1px solid #fff;
      }
    }
  }
}
</style>
