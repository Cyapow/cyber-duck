import Vue from "vue";
import Snotify, { SnotifyPosition } from "vue-snotify";

const options = {
  toast: {
    position: SnotifyPosition.leftBottom
  }
};

Vue.use(Snotify, options);
