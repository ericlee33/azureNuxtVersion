export default function ({ route, store, redirect }) {
  if(route.path.includes('admin')){
    store.commit('login')
    if (!store.state.auth) {
      redirect('/bloglist')
    }else {

    }
  }
}