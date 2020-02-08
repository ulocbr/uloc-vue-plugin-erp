import ErpLayout from './default/ErpLayout'
import ErpHeader from './default/Header'
import ErpMenu from './default/Menu'
import ErpMenuItem from './default/MenuItem'
import ErpMenuItems from './default/MenuItems'
import MenuAlerts from './default/MenuAlerts'
import MenuAccountInfo from './default/MenuAccountInfo'
import MenuModule from './default/MenuModule'
import MenuModuleComponent from './default/MenuModuleComponent'
import ErpLayoutContainer from './default/LayoutContainer'

export default {
  name: 'ErpLayoutBase',
  props: {
    menuData: {
      type: Array,
      required: true
      /* validator: function (value) {
        return Array.isArray(value)
      } */
    },
    alerts: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      required: true,
      validator: function (user) {
        return user.image && user.name
      }
    }
  },
  components: {
    ErpLayoutContainer,
    MenuModuleComponent,
    MenuModule,
    MenuAccountInfo,
    MenuAlerts,
    ErpMenuItems,
    ErpMenuItem,
    ErpMenu,
    ErpHeader,
    ErpLayout
  },
  data () {
    return {
      activeMenu: this.menuData && this.menuData[0]
    }
  },
  computed: {
    menuComponents () {
      return this.menuData
    }
  },
  mounted () {
  },
  methods: {
    clickMenu (e, menu) {
      console.log(e, menu)
      this.activeMenu = menu
    }
  },
  render (h) {
    let self = this
    return h(ErpLayout,
      [
        h(ErpHeader, [
          h(ErpMenu, [
            h(ErpMenuItems, this.menuComponents.map(function (menuItem) {
              return h(ErpMenuItem, {
                props: {
                  active: menuItem === self.activeMenu
                },
                on: {
                  click: (e) => self.clickMenu(e, menuItem)
                }
              }, menuItem.menuName)
            })),
            h(MenuAlerts, {
              props: {
                alerts: self.alerts
              }
            }),
            h(MenuAccountInfo, {
              props: {
                user: self.user
              }
            })
          ]),
          h(MenuModule, this.activeMenu.components.map(function (component) {
            return h(MenuModuleComponent, {
              props: {
                right: component.right,
                hideLabel: component.hideLabel,
                label: component.component,
                items: component.features
              }
            })
          }))
        ]),
        h(ErpLayoutContainer, this.$slots.default)
      ]
    )
  }
}
