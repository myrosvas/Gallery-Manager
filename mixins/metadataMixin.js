export const metadataMixin = {
  filters: {
    date(time) {
      return new Date(time.toString()).toLocaleString();
    },
    kb(size) {
      return Math.ceil(size / 1024);
    },
    px(size) {
      return size + ' px';
    }
  }
}
