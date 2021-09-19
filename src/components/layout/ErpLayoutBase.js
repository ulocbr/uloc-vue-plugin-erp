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
import PosMenu from './default/PosMenu'

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
    defaultActiveMenu: {
      type: String,
      default: null
    },
    alerts: {
      type: Array,
      default: () => []
    },
    posmenu: {
      type: Boolean,
      default: true
    },
    user: {
      type: Object,
      required: true,
      validator: function (user) {
        return user.name
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
    let findMenuActive = this.menuData.filter((item) => item.id === this.defaultActiveMenu)
    return {
      activeMenu: findMenuActive ? findMenuActive[0] : null
    }
  },
  computed: {
    menuComponents () {
      return this.menuData
    }
  },
  mounted () {
    this.$refs.menu.activeMenu = this.activeMenu.id
  },
  methods: {
    clickMenu (e, menu) {
      this.activeMenu = menu
      this.$emit('menuMoveCursor', menu.id)
    },
    __selectMenuById (id) {
      let findMenu = this.menuData.filter((item) => item.id === id)
      if (Array.isArray(findMenu) && findMenu.length > 0) {
        this.activeMenu = findMenu[0]
      }
    }
  },
  render (h) {
    let self = this
    return h(ErpLayout,
      [
        h(ErpHeader, [
          h(ErpMenu, {
            ref: 'menu',
            on: {
              setActiveMenu: this.__selectMenuById
            }
          }, [
            h(ErpMenuItems, this.menuComponents.map(function (menuItem) {
              return h(ErpMenuItem, {
                props: {
                  id: menuItem.id,
                  active: self.activeMenu === menuItem
                },
                on: {
                  click: (e) => self.clickMenu(e, menuItem)
                }
              }, menuItem.menuName)
            })),
            !this.posmenu && h(MenuAlerts, {
              props: {
                alerts: self.alerts
              }
            }),
            !this.posmenu && h(MenuAccountInfo, {
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
        this.posmenu && h(PosMenu, {
          ref: 'posmenu',
          props: {
            user: self.user
          }
        }, this.$slots.posmenu),
        h(ErpLayoutContainer, this.$slots.default)
      ]
    )
  }
}
