/**
 * @description   empty root node
 * @example <empty> <div/> </empty>  =>  <div/>
 */
export const Empty = ({ children }: FC) => children || <div />;
