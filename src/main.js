import Vue from "vue";
import store from "./store/index";
import App from "./App";
import router from "./router";
import Api from "./api/index";
import "element-ui/lib/theme-chalk/index.css";
import "./common/index.scss";
import "./common/checkbox1.css";
import "./common/checkbox2.css";
import _ from 'lodash'

//自定义全局组件
import Pag from "./common/components/global/pagination";
import OperBar from "./common/components/global/operBar";
import FormPage from "./common/components/global/formPage";
import SearchBar from "./common/components/global/searchBar";
import UserSelect from './common/components/global/userSelect';
import ImgBox from './common/components/global/imgBox'

Vue.component("Pag", Pag);
Vue.component("FormPage", FormPage);
Vue.component("OperBar", OperBar);
Vue.component("SearchBar", SearchBar);
Vue.component("UserSelect", UserSelect);
Vue.component('ImgBox',ImgBox);

import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Main
} from "element-ui";

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Container);
Vue.use(Transfer);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.prototype.$auth = Api.auth;
Vue.prototype.$upms = Api.upms;
Vue.prototype.$base = Api.base;
Vue.prototype._=_;

Vue.prototype.global = {
  env: 'Dev'
}

Vue.config.productionTip = false;

let vm = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
console.log(Vue.prototype);
