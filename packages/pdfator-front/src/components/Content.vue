<template>

    <div class="section content">
        <url-field 
          @input-url="url = $event"
          class="content__url-field"/>
       
        <options 
          v-show="showOptions"
          @filename-updated="options.outputFile = $event"
          @format-selected="options.format = $event"
          @size-selected="options.size = $event"
          class="content__options"
        />
       
       <transition name="fade" mode="out-in">
        <actions v-if="!!lambdaUrl"
          class="content__actions"
          @convert-request="convert"
          @toggle-options="showOptions = $event"
          :converting-status="convertingStatus"
        />
       </transition>
    </div>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";

import { CONVERTING_STATUS, MIME_TO_EXTENSION } from "../types";
import UrlField from "./content/UrlField.vue";
import Options from "./content/Options.vue";
import Actions from "./content/Actions.vue";

const CONFIG_URL =
  "https://pdfator-c9101.firebaseio.com/config/prod/lambdaUrl.json";

export default {
  data() {
    return {
      showOptions: false,
      url: "",
      options: {
        outputFile: "",
        format: "",
        size: ""
      },
      lambdaUrl: null,
      convertingStatus: CONVERTING_STATUS.NONE
    };
  },
  methods: {
    convert() {
      this.convertingStatus = CONVERTING_STATUS.IN_PROGRESS;
      const params = {
        url: this.url,
        outputFile: this.options.outputFile || "file",
        format: this.options.format || "PDF",
        size: this.options.size || "Letter"
      };
      axios
        .get(this.lambdaUrl, { params, responseType: "blob" })
        .then(response => {
          const mime = response.headers["content-type"];

          FileSaver.saveAs(
            response.data,
            `${params.outputFile}${MIME_TO_EXTENSION[mime]}`
          );
          this.convertingStatus = CONVERTING_STATUS.DONE;
          setTimeout(() => {
            this.convertingStatus = CONVERTING_STATUS.NONE;
          }, 500);
        })
        .catch(error => alert(error));
    }
  },
  components: {
    urlField: UrlField,
    options: Options,
    actions: Actions
  },
  created() {
    axios.get(CONFIG_URL).then(response => {
      this.lambdaUrl = response.data;
    });
  }
};
</script>

<style>
.content {
  background-color: #1d0c4c;
  height: 60vh;
  flex-flow: column;
}

.content__url-field,
.content__actions,
.content__options {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 80%;
}

::placeholder {
  color: rgba(126, 0, 158, 0.75);
}

@media only screen and (min-width: 601px) {
  .content__url-field,
  .content__actions,
  .content__options {
    width: 50%;
    min-width: 400px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
