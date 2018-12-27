import Vue from 'vue'

let tmp = [];

export default function treeToArr(data,expandAll,parent = null,level = null) {
  let tmp=[];
  data.forEach((item, index) => {
    if (item._expanded === undefined) {
        Vue.set(item,'_expanded',expandAll)
    }
    let _level = 1;
    if (level) {
      _level = level + 1;
    }

    Vue.set(item,'_level',_level)

    if (parent) {
    Vue.set(item,'_parent',parent)
    }
    tmp.push(item)
    if (item.childrens && item.childrens.length > 0) {
       const arr = treeToArr(item.childrens,expandAll,item,_level);
       tmp = tmp.concat(arr);
    }
  });
  return tmp;
}
