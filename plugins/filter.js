import Vue from 'vue'
import moment from 'moment'
export function dateFormat (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
}
export function ellipsis (value) {
  if (!value) return "";
  if (value.length > 400) {
    return value.slice(0, 400) + "...";
  }
  return value;
}
const filters = {
  dateFormat,
  ellipsis
}
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
export default filters