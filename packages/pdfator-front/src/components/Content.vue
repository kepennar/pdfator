<template>

    <div class="section content">
        <url-field 
          @input-url="url = $event"
          class="content__url-field"/>
        <options 
          v-show="showOptions"
          @input-filename="outputFile = $event"
          class="content__options"
        />
        <actions 
          class="content__actions"
          @convert-request="convert"
          @toggle-options="showOptions = $event"
        />
    </div>
</template>

<script>
import UrlField from "./content/UrlField.vue";
import Options from "./content/Options.vue";
import Actions from "./content/Actions.vue";
import FileSaver from "file-saver";
import axios from "axios";

const CONFIG_URL =
  "https://pdfator-c9101.firebaseio.com/config/prod/lambdaUrl.json";

export default {
  data() {
    return {
      showOptions: false,
      url: "",
      outputFile: ""
    };
  },
  methods: {
    convert() {
      const params = {
        url: this.url,
        outputFile: this.outputFile,
        format: ""
      };
      const filename = this.outputFile || "test";

      axios
        .get(CONFIG_URL)
        .then(response => {
          return axios.get(response.data, { params, responseType: "blob" });
        })
        .then(response => {
          FileSaver.saveAs(response.data, `${filename}.pdf`);
        })
        .catch(error => console.log(error));
    }
  },
  components: {
    urlField: UrlField,
    options: Options,
    actions: Actions
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
  }
}
</style>
