<template>
    <div class="commend" ref="scroller" >
        <div class="scroller">
            <div class="carousel">
                <div class="bgColor"></div>
                <div class="slider-wrap" v-if="sliderDataFlag">
                    <slider :loop = 'loop' :autoPlay='autoPlay'>
                        <div class="slider-item" v-for="item in sliderPicUrl">
                            <img class="slider-pic" :src="item" alt="">
                        </div>
                    </slider>
                </div>
            </div>
            <div class="music-news">
                <ul>
                    <li v-for=" (item,index) in musicNews" :key="item.test" @click="maskShow">
                        <div :class="item.icon" class="icon"></div>
                        <div class="news-cont">{{item.test}}</div>
                    </li>
                </ul>
            </div>
            <div >
                <ul class="commend-wrap">
                    <li class="commend-cont" v-for="item in waterfullList" >
                        <div class="title">{{item.name}}
                        <span class="glyphicon glyphicon-menu-right"></span>
                        </div>
                        <ul class="songlist-cont">
                            <li v-for="item1 in item.list">
                                <div>
                                    <img :src="item1.pic" alt="">
                                    <div class="play-amount">
                                        <span class="glyphicon glyphicon-headphones"></span>
                                        <span>{{item1.playAmount}}</span>
                                    </div>
                                </div>
                                <div>{{item1.desc}}</div>
                            </li>
                        </ul>
                    </li>
                    <!-- <transition mode="in-out" name="loading">
                        <div v-show="loadingFlag" class="loading">
                                <span>亲别急，立刻给您送上</span>
                        </div>
                    </transition> -->
                     <v-load :flag="loadingFlag" :state="loadingState"></v-load>   
                </ul>
            </div>
        </div> 
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import axios from 'axios'
import slider from '../sliderSub/slider'
import loading from '../loading'
import waterfull from './waterfullApi'
export default {
    data() {
        return {
            musicNews: [{
                icon: "glyphicon glyphicon-film",
                test: '私人FM'
            }, {
                icon: "glyphicon glyphicon-heart",
                test: '每日推荐'
            }, {
                icon: "glyphicon glyphicon-align-left",
                test: '歌单'
            }, {
                icon: "glyphicon glyphicon-list-alt",
                test: '排行榜'
            }],
            sliderPicUrl: [],
            loadingFlag: false,  //关于dom结构性渲染的变量，只应声明在data内，在beforeCreate或created内声明对dom结构的渲染都将失效
            loop: true,
            autoPlay: true,
            sliderDataFlag: false
        }
    },
    components: {
        slider,
        "v-load": loading
    },
    created() {
        waterfull.propInit(this)
        axios.get('/music/commend0').then(res => {
            if (res.data.code === 0) {
                let data = res.data.data
                this.sliderPicUrl = data.sliderPicUrl
                this.sliderDataFlag = true
                this.waterfullList = data.waterfullList
            }
        })

    },
    mounted() {
        this.scrollInit()
    },
    methods: {
        scrollInit() {
            this.scrollList = new BScroll(this.$refs.scroller, {
                click: true,
                bounce: {
                    top: false,
                    bottom: true
                },
                probeType: 3
            })
            waterfull.scrollGetData(this, 'scroller', 'scrollList', '/music/commend')
        },
        maskShow() {
            this.$store.commit('maskShow')
        },
        scrollRefresh() {
            Vue.nextTick(() => {
                this.scrollList.refresh()
            })
        },
    }
}
</script>

<style lang="less" scoped>
.commend {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 90px;
  bottom: 50px;
  .scroller {
    position: relative;
    width: 100%;
    .carousel {
      height: 150px;
      width: 100%;
      position: relative;
      .bgColor {
        height: 100px;
        width: 100%;
        background: #fd0c0c;
      }
      .slider-wrap {
        width: 90%;
        height: 140px;
        position: absolute;
        top: 10px;
        left: 5%;
        overflow: hidden;
        text-align: center;
        .slider-pic {
          width: 100%;
        }
      }
    }
    .music-news {
      width: 100%;
      height: 100px;
      border-bottom: 1px solid rgb(231, 231, 231);
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        li {
          flex: 1;
          position: relative;
          .icon {
            position: absolute;
            left: 50%;
            top: 25%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: orange;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            color: #fff;
            background: #fd0c0c;
          }
          .news-cont {
            width: 100%;
            text-align: center;
            margin-top: 70px;
          }
        }
      }
    }
    .commend-wrap {
      margin: 0;
      .commend-cont {
        .title {
          height: 40px;
          //   border: 1px solid red;
          line-height: 40px;
          margin: 0 5px;
          font-weight: 900;
          span {
            font-size: 12px;
          }
        }
        .songlist-cont {
          // height: 250px;
          //   border: 1px solid red;
          display: flex;
          flex-wrap: wrap;
          margin-left: 5px;
          li {
            margin-right: 5px;
            width: 31%;
            flex-grow: 1;
            height: 170px;
            // background: orange;

            overflow: hidden;
            div {
              position: relative;
              img {
                width: 100%;
                border-radius: 5px;
              }
              .play-amount {
                position: absolute;
                top: 2px;
                right: 2px;
                color: #fff;
              }
            }
          }
        }
      }
      .loading {
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fd0c0c;
      }
    }
  }
}
.loading-enter {
  opacity: 0;
}
.loading-enter-to {
  opacity: 1;
}
.loading-leave {
  opacity: 1;
}
.loading-leave-to {
  opacity: 0;
}

.loading-leave-active,
.loading-enter-active {
  transition: all 0.4s ease-out;
}
</style>
