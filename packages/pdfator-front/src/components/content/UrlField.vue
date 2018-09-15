<template>
 <div>
      <input 
        @input="$emit('input-url', $event.target.value)"
        class="input"
        type="url" 
        id="url"
        placeholder="Type the url to convert here"
        aria-label="url to convert"
      />
</div>
</template>

<script>
export default {};
</script>

<style scoped>
.input {
  border-radius: 25px;
  border: 2px solid #609;
  padding: 20px;
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.88);
  outline: 0;
}
</style>
