import Vue from 'vue';
import { ModalGeneratorProps, ModalGenerator } from '.';

export function createFormModal(props: Omit<ModalGeneratorProps, 'btn'>) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  return new Vue({
    el: div,
    mounted() {
      (this.$refs.ModalGenerator as any).open()
    },
    render() {
      return (
        <ModalGenerator
          ref='ModalGenerator'
          {...{ props }} />
      )
    }
  })
}
