export const metadataMixin = {
  filters: {
    date(time) {
      return new Date(time).toLocaleString();
    },
    kb(size) {
      return Math.ceil(size / 1024);
    }
  }
}
