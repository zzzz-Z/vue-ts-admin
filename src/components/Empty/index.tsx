import Vue from 'vue';
export const Empty = ({ children }: FC): any => {
  const state = Vue.observable({ count: 0 })

  return <div>
    <button onClick={() => {
      { state.count++ }
      console.log(state);
      console.log(state.count);
    }}>++++</button>
    {state.count}
  </div>
}
