import ActiveModelAdapter from "active-model-adapter";

export default ActiveModelAdapter.extend({
  shouldReloadAll() {
    return true;
  },

  host: "/api"
});
