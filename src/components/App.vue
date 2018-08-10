<template>
  <div>
    <ul>
      <li v-for="note in getNotes()">{{ note.title }}</li>
    </ul>
    <Button type="success" @click="logOut">Log Out</Button>
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
