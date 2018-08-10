<template>
  <div class="main">
    <Menu mode="horizontal" theme="primary" active-name="1">
      <MenuItem name="log-out" @click.native="logOut">
        <Icon type="md-exit" /> Log Out
      </MenuItem>
    </Menu>
    <Split v-model="split">
      <div slot="left" class="split-pane left-split-pane">
        <Card v-for="note in getNotes()" :bordered="false" :key="note.id" class="note-card">
          <p slot="title">{{ note.title }}</p>
          <p>{{ note.preview }}</p>
        </Card>
      </div>
      <div slot="right" class="split-pane">
        Right Pane
      </div>
    </Split>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import rc from '../api/ringcentral'

export default {
  data () {
    return {
      split: 0.4
    }
  },
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
