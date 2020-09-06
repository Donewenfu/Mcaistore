import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
import { Loading } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);

Vue.use(Loading);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);