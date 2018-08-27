import Vue from 'vue'
import Router from 'vue-router'
import individuation from '@/components/individuation'
import myMusicList from '@/components/myMusicList'
import video from '@/components/video'
import cover from '@/components/videoDoc/cover.vue'
import live from '@/components/videoDoc/live.vue'
import mv from '@/components/videoDoc/mv.vue'
import commend from '@/components/indiDoc/commend.vue'
import friends from '@/components/indiDoc/friends.vue'
import radio from '@/components/indiDoc/radio.vue'
Vue.use(Router)


const indiRouter = [{
  path: '/commend',
  name: 'commend',
  component: commend
}, {
  path: '/friends',
  name: 'friends',
  component: friends
}, {
  path: '/radio',
  name: 'radio',
  component: radio
}];
const videoRouter = [{
  path: '/cover',
  name: 'cover',
  component: cover
}, {
  path: '/live',
  name: 'live',
  component: live
}, {
  path: '/mv',
  name: 'mv',
  component: mv
}];

export default new Router({
  routes: [{
      path: '/',
      name: 'main',
      component: individuation,
      children: indiRouter,
      redirect: '/commend'
    },
    {
      path: '/myMusicList',
      name: 'myMusicList',
      component: myMusicList
    },
    {
      path: '/video',
      name: 'video',
      component: video,
      children: videoRouter,
      redirect: '/cover'
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'history' //url中不出现'#'号
})
