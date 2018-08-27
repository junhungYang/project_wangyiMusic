import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    myMsgFlag: false,
    maskShowFlag: false,
    searchModFlag: false,
    searchAnimateFlag: false,
    musicListFlag: false,
    musicListAnimateFlag: false,
    userData: {},
    songData: [{
      songname: '',
      artistname: ''
    }],
    historyList: [],
    playState: false,
    playPageShow: false,
    songIndex: 0,
    songIndex1: 0, //模拟数据
    //模拟数据
    musicLink: [{
      url: '/static/musicData/music_1.mp3',
      poster: '/static/img/poster1.png',
      songname: '暮色苍然',
      artist: 'はちみつれもん'
    }, {
      url: '/static/musicData/music_2.mp3',
      poster: '/static/img/poster2.png',
      songname: '체념',
      artist: 'Big Mama'
    }, {
      url: '/static/musicData/music_3.mp3',
      poster: '/static/img/poster3.png',
      songname: '사랑했나봐',
      artist: '윤도현'
    }, {
      url: '/static/musicData/music_4.mp3',
      poster: '/static/img/poster4.png',
      songname: 'Say You Love Me',
      artist: '西原健一郎'
    }, {
      url: '/static/musicData/music_5.mp3',
      poster: '/static/img/poster5.png',
      songname: '虹色蝶々',
      artist: '柿チョコ'
    }],
    hasPlayedFlag: false,
    song: false,
    songTime: 0,
    momentTime: '00:00',
    sliderPercent: '-100%',
    bottomSlider: ''
  },
  mutations: {
    showMyMsg(state) {
      state.myMsgFlag = !state.myMsgFlag;
    },
    maskShow(state) {
      state.maskShowFlag = !state.maskShowFlag;
    },
    getUserData(state, payload) {
      state.userData = payload;
    },
    showSearchMod(state) {
      state.searchModFlag = !state.searchModFlag;
    },
    searchAnimate(state) {
      state.searchAnimateFlag = !state.searchAnimateFlag;
    },
    musicListMod(state) {
      state.musicListFlag = !state.musicListFlag
    },
    musicListAnimate(state) {
      state.musicListAnimateFlag = !state.musicListAnimateFlag
    },
    songList(state, payLoad) {
      state.songData = payLoad
    },
    changePlayState(state) {
      if (state.playState) {
        state.playState = false
        state.song.pause()
      } else {
        state.playState = true
        state.song.play()
      }
    },
    showPlayPage(state) {
      state.playPageShow = !state.playPageShow
    },
    musicPlay(state, payload) {
      if (!state.song) {
        state.song = new Audio(state.musicLink[state.songIndex1].url)
        state.song.onloadedmetadata = (e) => {
          state.songTime = parseInt(state.song.duration)
        }
      } else {
        state.songIndex1 = payload;
        state.song.src = state.musicLink[state.songIndex1].url
        store.commit('playState')
      }
      // state.songIndex = payload
      store.commit('momentChange')
    },
    prevMusic(state) {
      state.songIndex1 === 0 ? state.songIndex1 = 4 : state.songIndex1--;
      state.songIndex === 0 ? state.songIndex = state.songData.length - 1 : state.songIndex--;
      state.song.src = state.musicLink[state.songIndex1].url
      // store.commit('playState')
      state.bottomSlider.prev()
      store.commit('momentChange')
    },
    nextMusic(state) {
      state.playState = true;
      state.songIndex1 === 4 ? state.songIndex1 = 0 : state.songIndex1++;
      state.songIndex === (state.songData.length - 1) ? state.songIndex = 0 : state.songIndex++;
      state.song.src = state.musicLink[state.songIndex1].url
      // store.commit('playState')
      state.bottomSlider.next()
      store.commit('momentChange')
    },
    playState(state) {
      state.song.play()
      state.song.onloadedmetadata = (e) => {
        state.songTime = parseInt(state.song.duration)
      }
      state.playState = true
    },
    momentChange(state) {
      clearInterval(this.timer)
      let seconds = 0;
      let minutes = 0;
      let moment = 0;
      this.timer = setInterval(() => {
        if (state.song.currentTime !== state.song.duration) {
          moment = parseInt(state.song.currentTime)
          seconds = moment % 60;
          (seconds === 0 || seconds < 10) ? seconds = `0${seconds}`: '';
          minutes = parseInt(moment / 60);
          minutes < 10 ? minutes = '0' + minutes : '';
          state.momentTime = minutes + ':' + seconds
          store.commit('getPercent')
        } else {
          state.momentTime = '00:00'
          state.sliderPercent = '-100%'
          state.playState = false;
          clearInterval(this.timer)
          store.commit('nextMusic')
        }
      }, 1000 / 60)
    },
    getPercent(state) {
      let currentTime = parseInt(state.song.currentTime)
      let duration = parseInt(state.song.duration)
      state.sliderPercent = `${parseInt(currentTime / duration * 100)-100}%`
    },
    timeRefresh(state, payload) {
      clearInterval(this.timer)
      state.song.currentTime = state.song.duration * payload
      state.sliderPercent = `${payload*100-100}%`
      store.commit('momentChange')
    },
    dragRefresh(state, payload) {
      state.sliderPercent = `${payload*100-100}%`
      clearInterval(this.timer)
      clearTimeout(this.timer1)
      this.timer1 = setTimeout(() => {
        state.song.currentTime = state.song.duration * payload
        store.commit('momentChange')
      }, 300);
    },
    bottomSliderInit(state, payload) {
      state.bottomSlider = payload
    },
    historyListInit(state) {
      let historyStorage = JSON.parse(localStorage.getItem('history'))
      if (historyStorage) {
        state.historyList = historyStorage
      }
    },
    historyListRefresh(state, value) {
      let historyStorage;
      if (value !== '') {
        historyStorage = JSON.parse(localStorage.getItem('history'))
        if (historyStorage) {
          for (let i = 0; i < historyStorage.length; i++) {
            if (historyStorage[i] === value) {
              historyStorage.splice(i, 1)
              break;
            }
          }
          historyStorage.unshift(value)
          historyStorage.splice(5, 1)
        } else {
          historyStorage = []
          historyStorage.push(value)
          console.log(historyStorage)
        }
        state.historyList = historyStorage
        localStorage.setItem('history', JSON.stringify(historyStorage))
      }
    },
    hasPlayed(state) {
      if (!state.hasPlayedFlag) {
        state.hasPlayedFlag = true
      }
    }
  }
});
