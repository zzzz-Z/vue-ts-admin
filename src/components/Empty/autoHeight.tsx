export const AutoHeight = ({ children, props }) => {

  const Child = children![0];
  Child.data = Child.data || {};
  Child.data.hook = {
    insert(node: JSX.Element) {
      if (!props.height) {
        props.heigh = getAutoHeight(node);
      }
    }
  };
  return Child || <div />;
};

function computeHeight(node) {
  const totalHeight = parseInt(getComputedStyle(node).height as string, 10);
  const padding =
    parseInt(getComputedStyle(node).paddingTop as string, 10) +
    parseInt(getComputedStyle(node).paddingBottom as string, 10);
  return totalHeight - padding;
}

function getAutoHeight(n) {
  if (!n) {
    return 0;
  }

  let node = n;

  let height = computeHeight(node);

  while (!height) {
    node = node.parentNode;
    if (node) {
      height = computeHeight(node);
    } else {
      break;
    }
  }

  return height;
}



