<template>
  <div>
    <Menu mode="horizontal" theme="primary" active-name="1">
      <MenuItem name="log-out" @click.native="logOut">
        <Icon type="md-exit" /> Log Out
      </MenuItem>
    </Menu>
    <ul>
      <li v-for="note in getNotes()">{{ note.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import rc from '../api/ringcentral'

export default {
  computed: {
    ...mapGetters(['getNotes'])
  },
  methods: {
    logOut: function () {
      rc.revoke()
    }
  }
}
</script>
