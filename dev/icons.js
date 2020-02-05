import UlocCore, {IconMaterialWeb} from 'uloc-vue'

export function createIcons () {
  UlocCore.IconLibrary.add([
    {
      name: 'default',
      component: IconMaterialWeb
    }
  ])
}
