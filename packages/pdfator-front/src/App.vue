<template>
  <div id="app">
    <pdfator-header></pdfator-header>
    <pdfator-content></pdfator-content>
    <pdfator-footer></pdfator-footer>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "./components/Header.vue";
import Content from "./components/Content.vue";
import Footer from "./components/Footer.vue";

@Options({
  components: {
    pdfatorHeader: Header,
    pdfatorFooter: Footer,
    pdfatorContent: Content,
  },
})
export default class App extends Vue {}
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
