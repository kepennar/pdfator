<template>
  <div id="app">
    <app-header></app-header>
    <app-content></app-content>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Content from "./components/Content.vue";

export default {
  name: "app",
  components: {
    appHeader: Header,
    appFooter: Footer,
    appContent: Content
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: #fafafa;
}
.section {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
