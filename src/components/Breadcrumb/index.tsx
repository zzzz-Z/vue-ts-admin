export default ({ data, parent }: any) => {
  let routes = parent ? parent.$route.matched : [];

  if (routes.length > 1) {
    if (routes[0].path === routes[1].path) {
      routes = [routes[0]];
    }
  }
  return (
    <a-breadcrumb
      {...data}
      style='background:#fff;padding:20px 25px;border-bottom:1px solid #F0F0F0;margin:-24px -24px 20px'>
      <a-breadcrumb-item key='/'>
        <router-link to='/'  >首页</router-link>
      </a-breadcrumb-item>
      {routes.map((r, i) => (
        <a-breadcrumb-item key={i} >
          {
            r.meta.title === parent.$route.meta.title
              ? <span >{r.meta.title} </span>
              : <router-link to={r.path}  >{r.meta.title}</router-link>
          }
        </a-breadcrumb-item>
      ))}
    </a-breadcrumb>
  );
};
