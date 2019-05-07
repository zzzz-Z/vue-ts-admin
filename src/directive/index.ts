import Vue from 'vue';

Vue.directive('permission', {
  inserted(el, { value }, vnode) {
    const actions = vnode.context!.$route.meta.actions || [];
    const isAllow = actions.includes(value);
    !isAllow && el.parentNode!.removeChild(el);
  }
});

Vue.directive('if', {
  inserted: (el, { value }) => value || el.parentNode!.removeChild(el)
});

Vue.directive('html', (el, { value }) => { el.innerHTML = value; });

Vue.directive('text', (el, { value }) => { el.innerText = value; });


const focusTags = ['INPUT', 'SELECT', 'TEXTAREA'];

Vue.directive('focus', {
  inserted: (el) => focusTags.includes(el.tagName) ? el.focus() : findTag(el.childNodes as any)
});

function findTag(node: HTMLElement[]) {
  node = Array.from(node);
  node.forEach((child) => {
    focusTags.includes(child.tagName) ? child.focus() : findTag(child.childNodes as any);
  });

}
