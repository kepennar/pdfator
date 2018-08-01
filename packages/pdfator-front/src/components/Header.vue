<template>
    <div class='section header'>
        <div class="title">
            <h3>PDFator</h3>
            <h5>Convert every url to a file</h5>
        </div>
        <div class="logo left">
            <img  class="illustration" src='../assets/pdfator-logo.svg'/>
        </div>
        <div class="logo right">
            <img class="illustration" src='../assets/pdfator-logo.svg' /> 
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.header {
  flex-flow: row wrap;
  background-color: #3b0754;
}

.title {
  flex: 1 100%;
}

.logo {
  flex: 1 auto;
}
.right {
  transform: rotateY(180deg);
}

.illustration {
  width: 100%;
  max-width: 350px;
}

h5 {
  font-size: 24px;
  font-weight: normal;
}

h3 {
  font-size: 70px;
}

@media only screen and (max-width: 600px) {
  .illustration {
    max-width: 150px;
  }

  h5 {
    font-size: 16px;
  }

  h3 {
    font-size: 40px;
  }
}

@media only screen and (min-width: 601px) {
  .header {
    flex-wrap: nowrap;
  }
  .logo {
    flex: 1 100%;
  }
  .left {
    order: 1;
  }
  .title {
    order: 2;
  }
  .right {
    order: 3;
  }
}
</style>
