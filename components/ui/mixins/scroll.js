function bindScroll(t) {
    document.addEventListener("scroll", t.scrollEvent);
}

function unBindScroll(t) {
    document.removeEventListener("scroll", t.scrollEvent);
}

export const ScrollMixin = {
  mounted: function () {
    bindScroll(this);
  },
  destroyed: function () {
    unBindScroll(this);
  },
  methods: {
    scrollEvent(e) {
      this.scroll && this.scroll(e);
      const scrollHeight =
        (document.documentElement.scrollHeight || document.body.scrollHeight)-10;
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      if ((scrollTop + clientHeight) >= scrollHeight) {
        // console.log(scrollTop, clientHeight, scrollHeight);
        this.scrollBottom && this.scrollBottom();
      }
    }
  }
};
