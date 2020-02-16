import UlocCore, {IconMaterialWeb, IconFontAwesomeWeb} from 'uloc-vue'

export function createIcons () {
  UlocCore.IconLibrary.add([
    {
      name: 'default',
      component: IconMaterialWeb
    },
    {
      name: 'fa',
      component: IconFontAwesomeWeb
    }
  ])
}
