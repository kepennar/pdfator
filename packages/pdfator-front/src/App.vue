<template>
  <div id="app">
    <pdfator-header></pdfator-header>
    <pdfator-content></pdfator-content>
    <pdfator-footer></pdfator-footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Content from "./components/Content.vue";

export default {
  name: "app",
  components: {
    pdfatorHeader: Header,
    pdfatorFooter: Footer,
    pdfatorContent: Content
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
