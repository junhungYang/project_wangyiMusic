<template>
  <div class="myMusicList" ref="scrollWrap">
      <div class="scroller">
        <div class="mainMenu">
            <ul>
                <li class="item" v-for="item in mainMenu">
                    <span class="icon" :class="item.icon"></span>
                    <div>
                        <span class="item">{{item.name}}</span>
                        <span class="quantity">({{item.quantity}})</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="myList" v-for="item,index in myList">
            <div class="title">
                <span class="glyphicon glyphicon-menu-down"></span>
                <div>
                    <span>{{item.name}}</span>
                    <span>({{item.quantity}})</span>
                </div>
                <span class="glyphicon glyphicon-cog"></span>
            </div>
            <ul>
                <li v-for="item1 in myAblum[index]">
                    <div class="poster">
                        <img :src="item1.poster" alt="">
                    </div>
                    <div class="text">
                        <div class="text-wrap">
                            <p class="listName">{{item1.name}}</p>
                            <p class="quantity">{{item1.quantity}}首</p>
                        </div>
                         <span class="glyphicon glyphicon-option-vertical"></span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="collect"></div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            mainMenu: [{
                icon: 'glyphicon glyphicon-music',
                name: '本地音乐',
                quantity: 2
            }, {
                icon: 'glyphicon glyphicon-play-circle',
                name: '最近播放',
                quantity: 100
            }, {
                icon: 'glyphicon glyphicon-download-alt',
                name: '下载管理',
                quantity: 1
            }, {
                icon: 'glyphicon glyphicon-headphones',
                name: '我的电台',
                quantity: 0
            }, {
                icon: 'glyphicon glyphicon-star-empty',
                name: '我的收藏',
                quantity: 5
            }],
            myList: [{
                name: '创建的歌单',
                quantity: 8
            }, {
                name: "收藏的歌单",
                quantity: 7
            }],
            myAblum: []
        }
    },
    created() {
        axios.get('/music/myAblum').then(res => {
            if (res.data.code === 0) {
                this.myAblum = res.data.data
                this.listScroll = new BScroll(this.$refs.scrollWrap, {
                    click: true,
                    probeType: 3
                })
            }
        })
    },
}
</script>

<style lang="less" scoped>
.myMusicList {
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 50px;
  overflow: hidden;
  .scroller {
    .mainMenu {
      .item {
        display: flex;
        height: 50px;
        .icon {
          width: 50px;
          font-size: 20px;
          color: #fd0c0c;
          text-align: center;
          line-height: 50px;
        }
        div {
          flex: 1;
          border-bottom: 1px solid rgb(228, 228, 228);
          span {
            display: inline-block;
            height: 50px;
            line-height: 50px;
          }
          span:last-of-type {
            font-size: 10px;
            color: rgb(129, 129, 129);
          }
        }
      }
      .item:last-of-type div {
        border: 0;
      }
    }
    .myList {
      .title {
        display: flex;
        height: 25px;
        background: rgb(243, 243, 243);
        .glyphicon {
          width: 20px;
          text-align: center;
          font-size: 12px;
          color: rgb(87, 87, 87);
        }
        .glyphicon:first-of-type {
          margin-left: 5px;
          line-height: 20px;
        }
        .glyphicon:last-of-type {
          margin-right: 5px;
          line-height: 25px;
        }
        div {
          flex: 1;
          line-height: 25px;
          margin-left: 5px;
          font-size: 14px;
        }
      }
      ul {
        li {
          height: 60px;
          display: flex;
          .poster {
            margin-right: 10px;
            img {
              width: 55px;
              height: 55px;
              margin-left: 5px;
              margin-top: 5px;
              border-radius: 4px;
            }
          }
          .text {
            border-bottom: 1px solid rgb(219, 219, 219);
            flex: 1;
            padding: 10px 0;
            display: flex;
            .text-wrap {
              flex: 1;
              p {
                margin: 0;
              }
              p:first-of-type {
                margin-bottom: 3px;
              }
              p:last-of-type {
                font-size: 10px;
                color: rgb(87, 87, 87);
              }
            }
            .glyphicon {
              width: 40px;
              line-height: 44px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
