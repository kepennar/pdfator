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
          :disabled="isConverting"
          :class="buttonCssClasses"
        >
          {{ isConverting ? "converting" : "convert"}}
        </button>
    </div>
</template>

<script>
import { CONVERTING_STATUS } from "../../types";

export default {
  props: {
    convertingStatus: String
  },
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
  },
  computed: {
    isConverting() {
      return this.convertingStatus === CONVERTING_STATUS.IN_PROGRESS;
    },
    buttonCssClasses() {
      switch (this.convertingStatus) {
        case CONVERTING_STATUS.IN_PROGRESS:
          return ["btn-convert--converting"];
        case CONVERTING_STATUS.DONE:
          return ["btn-convert--done"];
        case CONVERTING_STATUS.NONE:
        default:
          return [];
      }
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
  transition: transform 0.5s ease-in-out, background 0.5s ease-in-out;
}
.btn-convert--converting {
  cursor: not-allowed;
  animation: placeHolderShimmer 1s linear infinite forwards;
  background: #009688;
  background: linear-gradient(to right, #609 8%, #e1bee7 18%, #609 33%);
  background-size: 800px 104px;
  position: relative;
}
.btn-convert--done {
  background-color: #009688;
  transform: scale(1.035);
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
