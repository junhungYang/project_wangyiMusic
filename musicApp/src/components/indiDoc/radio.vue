<template>
    <div class="radioModule" ref="scroller">
        <div class="scroller">
            <div class="carousel">
                <div class="bgColor"></div>
                <div class="slide-wrap" v-if="sliderDataFlag">
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
            <div class="superCommend">
                <div class="header">
                    <div class="title">精品推荐</div>
                    <div class="desc">你值得拥有的优质内容</div>
                </div>
                <div class="content">
                    <ul class="cont-wrap">
                        <li v-for="item in superCommend" class="cont-item">
                            <div class="poster">
                                <img :src="item.picUrl" alt="">
                            </div>
                            <div class="cont-details">
                                <p class="cont-desc">{{item.title}}</p>
                                <p class="cont-price">{{item.price}}</p>
                            </div>
                            <div class="sign" v-if="item.level">{{item.level}}</div>
                        </li>
                    </ul>
                </div>
                <div class="allRadioLink">
                    <span>全部精品电台</span>
                    <span class="glyphicon glyphicon-menu-right"></span>
                    </div>
            </div>
            <div class="todayBest">
                <div class="title">
                    <h6>今日优选</h6>
                    <p><span class="glyphicon glyphicon-refresh"></span>换一换</p>
                </div>
                <ul class="todayBest-wrap">
                    <li class="todayBest-item" v-for="item in waterfullList">
                        <div class="radio-poster">
                            <img :src="item.picUrl" alt="">
                        </div>
                        <div class="radio-desc">
                            <h6>{{item.programMC}}</h6>
                            <p class="quantity">节目{{item.programQuantity}}</p>
                            <p class="cont-detail">{{item.desc}}</p>
                        </div>
                    </li>
                </ul>
                <v-load :flag="loadingFlag" :state="loadingState"></v-load>
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
        icon: "glyphicon glyphicon-th-large",
        test: '电台分类'
      }, {
        icon: "glyphicon glyphicon-list-alt",
        test: '电台推荐'
      }, {
        icon: "glyphicon glyphicon-tower",
        test: '付费精品'
      }, {
        icon: "glyphicon glyphicon-stats",
        test: '小冰电台'
      }],
      sliderDataFlag: false,
      sliderPicUrl: [],
      loop: true,
      autoPlay: true,
      sliderDataFlag: false,
      superCommend: [],
      loadingFlag: false,
    }
  },
  components: {
    slider,
    "v-load": loading
  },
  created() {
    waterfull.propInit(this)
    axios.get('/music/radio#0').then(res => {
      if (res.data.code === 0) {
        let data = res.data.data
        this.sliderPicUrl = data.sliderPicUrl
        this.sliderDataFlag = true
        this.superCommend = data.superCommend
        this.waterfullList = data.waterfullList
        this.scrollInit()
      }
    })
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
      waterfull.scrollGetData(this, 'scroller', 'scrollList', '/music/radio#')
    },
    maskShow() {
      this.$store.commit('maskShow')
    }
  }
}
</script>

<style lang="less" scoped>
.radioModule {
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
      .slide-wrap {
        width: 90%;
        height: 140px;
        position: absolute;
        overflow: hidden;
        top: 10px;
        left: 5%;
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
    .superCommend {
      width: 100%;
      height: 280px;
      background: radial-gradient(
        circle at center center,
        rgba(2, 2, 15, 0.795),
        rgba(2, 2, 14, 0.918)
      );
      position: relative;
      .header {
        .title {
          width: 100%;
          padding-top: 10px;
          color: #fff;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
        }
        .desc {
          margin-top: 5px;
          width: 100%;
          text-align: center;
          color: rgba(204, 204, 204, 0.733);
          font-size: 12px;
        }
      }
      .content {
        margin-top: 10px;
        .cont-wrap {
          display: flex;
          .cont-item {
            flex-grow: 1;
            margin-left: 5px;
            border-radius: 5px;
            height: 160px;
            position: relative;
            background: #fff;
            .poster {
              width: 100%;
              height: 70%;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .cont-details {
              padding: 0 3px;
              .cont-desc {
                padding-top: 2px;
                font-size: 10px;
                margin: 0;
                line-height: 14px;
              }
              .cont-price {
                font-size: 10px;
                color: #fd0c0c;
                transform: scale(0.8);
                transform-origin: left top;
              }
            }
            .sign {
              position: absolute;
              left: 0;
              top: 0;
              font-size: 10px;
              padding: 0 3px;
              color: #fff;
              background: #fd0c0c;
              border-bottom-right-radius: 5px;
              transform-origin: left top;
              transform: scale(0.8);
            }
          }
          .cont-item:last-of-type {
            margin-right: 5px;
          }
        }
      }
      .allRadioLink {
        color: #fff;
        width: 100px;
        height: 25px;
        border-radius: 20px;
        border: 1px solid #fff;
        text-align: center;
        line-height: 25px;
        position: absolute;
        left: 50%;
        margin-left: -50px;
        bottom: 6%;
        font-size: 0;
        span {
          font-size: 10px;
          display: inline-block;
          transform: scale(0.9);
          vertical-align: middle;
        }
      }
    }
    .todayBest {
      .title {
        margin: 0 10px;
        height: 40px;
        display: flex;
        h6 {
          margin: 0;
          line-height: 40px;
          font-weight: 800;
          font-size: 14px;
          flex: 1;
          color: rgb(32, 32, 32);
        }
        p {
          width: 50px;
          font-size: 10px;
          color: rgb(85, 85, 85);
          height: 100%;
          line-height: 40px;
          span {
            transform: scale(0.8);
          }
        }
      }
      .todayBest-wrap {
        .todayBest-item {
          margin: 0 5px 10px 5px;
          display: flex;
          .radio-poster {
            width: 100px;
            img {
              width: 100%;
              border-radius: 5px;
            }
          }
          .radio-desc {
            margin-left: 10px;
            border-bottom: 1px solid rgb(223, 223, 223);
            flex: 1;
            p {
              margin: 0;
              font-size: 10px;
              color: rgb(90, 90, 90);
            }
            h6 {
              padding-top: 10px;
              font-size: 16px;
              font-weight: 800;
            }
          }
        }
      }
    }
  }
}
</style>