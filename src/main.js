// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import {
  Button, Select, Option, Input, Message, Loading, Menu, MenuItem, MenuItemGroup, Submenu, Breadcrumb, BreadcrumbItem, Collapse,
  CollapseItem, Dropdown, DropdownItem, DropdownMenu, Form, FormItem, Transfer, Radio, Row, Col, DatePicker, Table, TableColumn, CheckboxGroup, Checkbox,
  Tabs, TabPane, Upload, Badge, Dialog, Tooltip, Tag, InputNumber, MessageBox
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Transfer)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.use(Badge)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(InputNumber)

Vue.prototype.$axios = axios;
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
