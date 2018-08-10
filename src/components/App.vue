<template>
  <div class="main">
    <Menu mode="horizontal" theme="primary" active-name="1">
      <MenuItem name="log-out" @click.native="logOut">
        <Icon type="md-exit" /> Log Out
      </MenuItem>
    </Menu>
    <Split v-model="split">
      <div slot="left" class="split-pane left-split-pane">
        <Card v-for="note in getNotes()" :key="note.id" class="note-card" :class="{ 'active-note-card': currentNote.id === note.id }" @click.native="currentNote = note">
          <p slot="title">{{ note.title }}</p>
          <p>{{ note.preview }}</p>
        </Card>
      </div>
      <div slot="right" class="split-pane">
        <div v-if="currentNote">
          <h1 class="note-title">{{ currentNote.title }}</h1>
          <div v-html="currentNote.body"></div>
        </div>
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
      split: 0.4,
      selected: undefined
    }
  },
  computed: {
    ...mapGetters(['getNotes']),
    currentNote: {
      get: function () {
        if (this.selected) {
          return this.selected
        }
        if (this.getNotes().length > 0) {
          return this.getNotes()[0]
        }
      },
      set: function (value) {
        this.selected = value
      }
    }
  },
  methods: {
    logOut: function () {
      rc.revoke()
    }
  }
}
</script>
