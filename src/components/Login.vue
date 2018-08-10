<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="12">
        <Card class="hero-card">
          <h1>GlipNote</h1>
          <h3>Note taking app like Evernote and OneNote.</h3>
          <h3><Icon type="logo-github" size="24"/> <a href="https://github.com/tylerlong/GlipNote" target="_blank">tylerlong/GlipNote</a></h3>
          <br/><Button type="success" @click="showModal = true" long>Log In</Button>
        </Card>
      </Col>
    </Row>
    <Modal v-model="showModal" title="Log In">
      <iframe v-if="showModal" :src="oauthUri" width="100%" height="500" frameborder="0"></iframe>
    </Modal>
  </div>
</template>

<script>
import URI from 'urijs'

import rc from '../api/ringcentral'
import config from '../config'

export default {
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    oauthUri: function () {
      return rc.authorizeUri(config.OAUTH_REDIRECT_URI)
    }
  },
  created: function () {
    window.addEventListener('message', async ({ origin, data: { type, redirectUri } }) => {
      if (origin !== window.location.origin || type !== 'REDIRECT_URI') {
        return
      }
      if (redirectUri.indexOf(config.OAUTH_REDIRECT_URI) === -1) {
        return // unexpected uri
      }
      const params = URI(redirectUri.replace('#', '?')).search(true)
      if (params.code === undefined) { // unexpected data
        throw new Error(JSON.stringify(params))
      }
      await rc.authorize({ code: params.code, redirectUri: config.OAUTH_REDIRECT_URI })
      this.showModal = false
    })
  }
}
</script>
