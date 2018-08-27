export function drag(mod) {
  let sliderWrap = mod.$refs.sliderWrap
  let sliderBase = mod.$refs.sliderBase
  let app = document.getElementById('app')
  let appLeft = app.offsetLeft - app.offsetWidth / 2
  sliderBase.ontouchstart = (e) => {
    sliderWrap.ontouchmove = (e) => {
      let percent = ((e.changedTouches[0].clientX - appLeft - sliderWrap.offsetLeft) / sliderBase.offsetWidth).toFixed(2)
      percent > 100 ? percent = 100 : ''
      mod.$store.commit('dragRefresh', percent)
    }
  }
}
