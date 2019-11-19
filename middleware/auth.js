export default function ({ route, store, redirect }) {
  store.commit('login')
  if (!store.state.auth && route.path.includes('admin')) {
    return redirect('/bloglist')
  }else {
  }
}