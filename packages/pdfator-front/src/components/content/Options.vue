<template>
    <div >
      <div class="options">
        <input  
          @input="$emit('input-filename', $event.target.value)"
          class="input" 
          type="text" 
          id="filename" 
          placeholder="Filename"
        >
        <label 
          class="label" 
          for="filename">
          Filename
        </label>
      </div>
      <div class="options">
        <select 
          v-model="format"
          class="options__select" 
          id="format" 
        >
          <option v-for="(format,index) in formatTypes" :key="index">
            {{ format }}
          </option>
        </select>
        <!-- <label class="options__label" for="format">Format</label> -->
      </div> 
      <div class="options">
        <select 
          v-model="size"
          class="options__select" 
          id="size" 
        >
          <option v-for="(size,index) in sizeTypes" :key="index">
            {{ size }}
          </option>
        </select>
        <!-- <label class="options__label" for="size">Size</label> -->
      </div> 
    </div>
</template>

<script>
import { CONVERTING_FORMAT } from "../../types";
import { CONVERTING_SIZE } from "../../types";

export default {
  data() {
    return {
      formatTypes: CONVERTING_FORMAT,
      format: "PDF",
      sizeTypes: CONVERTING_SIZE,
      size: "Letter"
    };
  }
};
</script>

<style scoped>
.content__options {
  background: rgba(225, 190, 231, 0.09);
  flex-flow: row wrap;
}

.options {
  position: relative;
  padding: 14px;
  flex: 1 100%;
}
.label {
  position: absolute;
  top: 0;
  left: 20px;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.2s ease-out;
}

.input,
.options__select {
  background-color: rgba(255, 255, 255, 0.88);
  border-radius: 5px;
  border: 2px solid #609;
  box-sizing: border-box;
  height: 40px;
  padding: 8px;
  width: 100%;
}
.input:placeholder-shown + label {
  opacity: 0;
  transform: translate(10px, 10px);
}

@media only screen and (min-width: 601px) {
  .content__options {
    flex-wrap: nowrap;
    justify-content: center;
    width: 35%;
  }
  .options {
    flex: 0 1 auto;
  }
}
</style>
