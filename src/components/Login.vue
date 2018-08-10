<template>
  <div>
    <h1>Log In</h1>
    <p>
      <Button type="primary" @click="showModal = true">Log In</Button>
      <Modal v-model="showModal" title="Log In">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
      </Modal>
    </p>
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
