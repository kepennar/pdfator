<template>
  <div class='section content'>
    <div class="url_input">
      <input 
        class="input"
        type="url" 
        name="url" 
        id="url"
        placeholder="Type the url to convert here"
        pattern="https://.*" 
      />
    </div>
    <div class="actions">
        <label>More <img class="shape" src="../assets/arrow-down.svg"/></label>  
        <button
          class="convert"
        >
          Convert
        </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style>
.content {
  background-color: #1d0c4c;
  height: 60vh;
  flex-flow: column;
}

.content > div {
  width: 80%;
}

.input {
  border-radius: 25px;
  border: 2px solid #609;
  padding: 20px;
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
}

::placeholder {
  color: #7e009e;
}

.shape {
  width: 100%;
  max-width: 20px;
  margin: 0 0.5em;
  cursor: pointer;
}

.convert {
  border-radius: 5px;
  border: none;
  background: #609;
  color: #ffffff;
  padding: 10px;
  width: 100px;
  text-align: center;
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

@media only screen and (min-width: 601px) {
  .content > div {
    width: 50%;
  }
}
</style>

