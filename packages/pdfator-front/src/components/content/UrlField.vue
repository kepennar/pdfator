<template>
 <div>
      <input 
        @input="$emit('input-url', $event.target.value)"
        class="input"
        type="url" 
        id="url"
        placeholder="Type the url to convert here"
        pattern="https://.*" 
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
  height: 20px;
  background-color: #e0e0e0;
}
</style>
