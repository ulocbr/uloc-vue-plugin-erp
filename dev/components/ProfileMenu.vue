<template>
  <div class="erp-profile-menu">
    <div class="profile-icon">
      <img v-if="user && user.image" :src="user.image" />
    </div>
    <u-popover class="window-context-menu no-border-radius" anchor="bottom left" self="top left" :offset="[5, 5]">
      <div>
        <ul>
          <li>Menu</li>
        </ul>
      </div>
    </u-popover>
  </div>
</template>

<script>
import {UPopover} from 'uloc-vue'
export default {
  name: 'ProfileMenu',
  components: {UPopover},
  inject: {
    erplayout: {
      default () {
        console.error('Main needs to be child of ErpLayout')
      }
    }
  },
  props: {
    user: {required: true}
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
