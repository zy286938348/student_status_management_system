import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Row,
  Col,
  Drawer,
  Message,
  MessageBox,
  Select,
  Option,
  Tag,
  Dialog,
  DatePicker,
  Tabs,
  TabPane
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Drawer)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.use(Tabs)
Vue.use(TabPane)

// 弹框组件的全局搭载
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
