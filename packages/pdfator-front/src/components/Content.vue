<template>

    <div class="section content">
        <content-url-field 
          @input-url="url = $event"
          class="content__url-field"/>
        <content-options 
          v-show="showOptions"
          @input-output-file="outputFile = $event"
          class="content__options"
        />
        <content-actions 
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

axios.defaults.baseURL = "/pdfator";

export default {
  data() {
    return {
      showOptions: false,
      url: String,
      outputFile: String
    };
  },
  methods: {
    convert() {
      const params = {
        url: this.url,
        outputFile: this.outputFile,
        format: ""
      };
      const filename = this.outputFile ? this.outputFile : "test";
      console.log("params", params);
      axios
        .get("/", { params })
        .then(response => {
          const blob = new Blob([response.data], {
            type: "application/pdf"
          });
          FileSaver.saveAs(blob, `${filename}.pdf`);
        })
        .catch(error => console.log(error));
    }
  },
  components: {
    contentUrlField: UrlField,
    contentOptions: Options,
    contentActions: Actions
  }
};
</script>

<style scoped>
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
  color: #7e009e;
}

@media only screen and (min-width: 601px) {
  .content__url-field,
  .content__actions,
  .content__options {
    width: 50%;
  }
}
</style>
