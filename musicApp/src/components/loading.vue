<template>
    <transition mode="in-out" name="loading">
        <div v-show="flag" class="loading">
                <span>{{state}}</span>
        </div>
    </transition>   
</template>

<script>
export default {
    props: {
        flag: {
            type: Boolean,
            // default: false
        },
        state: {
            type: String
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
.loading {
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fd0c0c;
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