import Vue from 'vue';

Vue.directive('permission', {
  inserted(el, { value }, vnode) {
    const actions = (vnode.context as Vue).$route.meta.actions;
    const isAllow = (actions || []).includes(value);
    !isAllow && (el.parentNode as Node).removeChild(el);
  }
});

Vue.directive('if', {
  inserted(el, { value }) {
    !value && (el.parentNode as Node).removeChild(el);
  }
});

Vue.directive('html', (el, { value }) => { el.innerHTML = value; });

Vue.directive('text', (el, { value }) => { el.innerText = value; });

Vue.directive('focus', {
  bind(el) { el.focus(); }
});

Vue.directive('autoHeight', {
  inserted: (el) => {
    el.style.height = parseInt(getComputedStyle(el).height!, 10) * 2 + 'px';
  }
});
