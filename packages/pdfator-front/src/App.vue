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
@import "~normalize.css";

#app {
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: rgba(250, 250, 250, 0.79);
}
.section {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
