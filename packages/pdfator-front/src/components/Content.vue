<template>
  <div class="section content">
    <pdfator-url-field @input-url="url = $event" class="content__url-field" />

    <pdfator-options
      v-show="showOptions"
      @filename-updated="options.outputFile = $event"
      @format-selected="options.format = $event"
      @size-selected="options.size = $event"
      class="content__options"
    />

    <transition name="fade" mode="out-in">
      <pdfator-actions
        v-if="!!lambdaUrl"
        class="content__actions"
        @convert-request="convert"
        @toggle-options="showOptions = $event"
        :converting-status="convertingStatus"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

import axios from "axios";
import FileSaver from "file-saver";

import {
  CONVERTING_STATUS,
  MIME_TO_EXTENSION,
  isSupportedMime,
} from "../types";
import UrlField from "./content/UrlField.vue";
import RenderingOptions from "./content/RenderingOptions.vue";
import Actions from "./content/Actions.vue";

const CONFIG_URL =
  "https://pdfator-c9101.firebaseio.com/config/prod/lambdaUrl.json";

@Options({
  components: {
    pdfatorUrlField: UrlField,
    pdfatorOptions: RenderingOptions,
    pdfatorActions: Actions,
  },
})
export default class Content extends Vue {
  showOptions = false;
  url = "";
  options = {
    outputFile: "",
    format: "",
    size: "",
  };
  lambdaUrl: string | null = null;
  convertingStatus = CONVERTING_STATUS.NONE;

  created() {
    axios.get(CONFIG_URL).then((response) => {
      this.lambdaUrl = response.data;
    });
  }

  convert() {
    if (!this.lambdaUrl) {
      console.warn("Not ready yet");
      return;
    }
    this.convertingStatus = CONVERTING_STATUS.IN_PROGRESS;
    const params = {
      url: this.url,
      outputFile: this.options.outputFile || "file",
      format: this.options.format || "PDF",
      size: this.options.size || "Letter",
    };
    axios
      .get(this.lambdaUrl, { params, responseType: "blob" })
      .then((response) => {
        const contentTypeHeaderValue = response.headers["content-type"];
        if (!isSupportedMime(contentTypeHeaderValue)) {
          throw new Error(
            `Invalid "content-type" value. ${contentTypeHeaderValue}`
          );
        }
        FileSaver.saveAs(
          response.data,
          `${params.outputFile}${MIME_TO_EXTENSION[contentTypeHeaderValue]}`
        );
        this.convertingStatus = CONVERTING_STATUS.DONE;
        setTimeout(() => {
          this.convertingStatus = CONVERTING_STATUS.NONE;
        }, 500);
      })
      .catch((error) => alert(error));
  }
}
</script>

<style>
.content {
  background-color: #1d0c4c;
  min-height: 60vh;
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
