<template>
  <div class="app-container">
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <div :style="{display: 'flex', justifyContent: 'center'}">
        <button class="button" @click="isVueAppVisible = false">Hide Vue App</button>
      </div>
      <HelloWorld :msg="text"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  obviousData: {
    text: 'text',
    isVueAppVisible: 'isVueAppVisible'
  },


  beforeDestroy() {
    console.log('destroyed')
    // const broadcastEvents = window.__Bus__.host.eventEmitter.broadcastEvents['$state-isVueAppVisible-change'];
    // console.log('destroyed', this.$obStateWatcher);
    //console.log(broadcastEvents[1] === this.$obStateWatcher.isVueAppVisible.handler);
    // console.log(this.$obStateWatcher.isVueAppVisible.handler);
    // console.log(broadcastEvents.includes(this.$obStateWatcher.isVueAppVisible.handler));
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  flex: 1;
}

.app-container {
  display: flex
}

.app-container>div {
  flex: 1
}

.button {
  border: none;
  outline: none;
  width: 13rem;
  height: 3rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  background: #42b983
}

.button:hover {
  opacity: 0.8
}
</style>
