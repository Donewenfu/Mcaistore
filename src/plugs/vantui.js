import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
import { Loading } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';
import { NavBar } from 'vant';
import { ContactCard, ContactList, ContactEdit } from 'vant';
import { AddressList } from 'vant';
import { AddressEdit } from 'vant';
import { Cell, CellGroup } from 'vant';
import { SubmitBar } from 'vant';
import { Swipe, SwipeItem } from 'vant';








// 全局注册
Vue.use(Swipe);
Vue.use(SwipeItem); 
Vue.use(SubmitBar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);
Vue.use(Dialog);
Vue.use(NavBar);
Vue.use(Loading);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);