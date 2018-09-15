<template>
    <div class='section header'>
        <div class="header__title">
            <h1>PDFator</h1>
            <h2>Convert every url to a file</h2>
        </div>
        <div class="header__logo header__logo--left">
            <img  class="illustration" src='../assets/pdfator-logo.svg' alt="logo"/>
        </div>
        <div class="header__logo header__logo--right">
            <img class="illustration" src='../assets/pdfator-logo.svg' alt="logo"/> 
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  flex-flow: row wrap;
  background-color: #3b0754;
  min-height: 30vh;
}
.header__title {
  flex: 1 100%;
}
.header__logo {
  flex: 1 auto;
}
.header__logo--right {
  transform: rotateY(180deg);
}
.illustration {
  width: 100%;
  max-width: 150px;
}

h1 {
  font-size: 40px;
}
h2 {
  font-size: 16px;
}

@media only screen and (min-width: 601px) {
  .header {
    flex-wrap: nowrap;
  }
  .header__logo {
    flex: 1 100%;
  }
  .header__logo--left {
    order: 1;
  }
  .header__title {
    order: 2;
  }
  .header__logo--right {
    order: 3;
  }
  .illustration {
    max-width: 350px;
  }

  h1 {
    font-size: 70px;
  }
  h2 {
    font-size: 24px;
    font-weight: normal;
  }
}
</style>
