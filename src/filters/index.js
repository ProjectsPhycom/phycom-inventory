import Vue from "vue";
import { parseStatus } from "../utils/index";

Vue.filter("parseStatus", function(value) {
  return parseStatus(value);
});
