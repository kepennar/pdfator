<template>
    <div>
         <label @click="toggleOptions">
          {{ showOptions? "Less": "More" }} 
          <img 
            class="arrow"
            :class="{'arrow--up': showOptions}"
            src="../../assets/arrow-down.svg"
            alt="arrow"
          />
        </label>  
        <button 
          class="btn-convert" 
          @click="onSubmit" 
          aria-label="convert"
        >
          Convert
        </button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false
    };
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
      this.$emit("toggle-options", this.showOptions);
    },
    onSubmit() {
      this.$emit("convert-request");
    }
  }
};
</script>

<style scoped>
.arrow {
  width: 100%;
  max-width: 20px;
  margin: 0 0.5em;
  cursor: pointer;
}

.arrow--up {
  transform: rotateX(180deg);
}

.btn-convert {
  border-radius: 5px;
  border: none;
  background: #609;
  color: rgba(250, 250, 250, 0.79);
  padding: 10px;
  width: 100px;
  text-align: center;
  cursor: pointer;
}
</style>
