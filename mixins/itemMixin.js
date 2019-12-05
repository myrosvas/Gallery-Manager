export const itemMixin = {
  props: {
    item: {
      type: Object,
      default: () => ({
        url: '',
        width: 0,
        height: 0,
        name: '',
        thumbUrl: '',
        size: 0,
        mtime: ''
      })
    },
    isNativeLoading: {
      type: Boolean,
      default: false
    }
  }
}
