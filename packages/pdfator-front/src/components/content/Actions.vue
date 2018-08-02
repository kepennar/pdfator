<template>
    <div>
         <label @click="toggleOptions">
          {{ showOptions? "Less": "More" }} 
          <img class="arrow"
            :class="{'arrow--up': showOptions}"
            src="../../assets/arrow-down.svg"
          />
        </label>  
        <button class="btn-convert" @click="onSubmit" >
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
      console.log("submit convert-request ");
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
  color: #ffffff;
  padding: 10px;
  width: 100px;
  text-align: center;
  cursor: pointer;
}
</style>
