<template>
    <div>
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
.content__options {
  background: rgba(255, 255, 255, 0.03);
}
.options {
  position: relative;
  padding-top: 1.5em;
}
.label {
  position: absolute;
  top: 0;
  left: 20px;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.2s ease-out;
}
.input {
  border-radius: 5px;
  border: 2px solid #609;
  padding: 20px;
  margin: auto auto 20px 20px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.88);
}
.input:placeholder-shown + label {
  opacity: 0;
  transform: translateY(10px);
}
</style>
