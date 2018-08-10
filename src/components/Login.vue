<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="12">
        <Card class="hero-card">
          <h1>GlipNote</h1>
          <h3>Note taking app like Evernote and OneNote.</h3>
          <h3><Icon type="logo-github" size="24"/> <a href="https://github.com/tylerlong/GlipNote" target="_blank">tylerlong/WeGlipChat</a></h3>
          <br/><Button type="success" @click="showModal = true" long>Log In</Button>
        </Card>
      </Col>
    </Row>
    <Modal v-model="showModal" title="Log In">
      <p>login</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showModal: false
    }
  }
}
</script>
