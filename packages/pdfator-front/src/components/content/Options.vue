<template>
    <div>
        <div class="options">
          <input  
            @input="$emit('input-output-file', $event.target.value)"
            class="input" 
            type="text" 
            id="filename" 
            placeholder="Filename"
          >
          <label 
            class="label" 
            for="filename"
          >
            Filename
          </label>
        </div>
      <!-- <div class="options">
        <select class="options__select" name="" id="format" ></select>
        <label class="options__label" for="format">Format</label>
      </div> -->
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.options {
  position: relative;
  padding-top: 1.5em;
}
.label {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.2s ease-out;
}
.input {
  border-radius: 5px;
  border: 2px solid #609;
  padding: 20px;
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
}
.input:placeholder-shown + label {
  opacity: 0;
  transform: translateY(10px);
}
</style>
