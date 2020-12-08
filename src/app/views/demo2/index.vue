<template>
  <div>{{ dt }}</div>
</template>

<script>
export default {
  name: "demo2",
  data() {
    return {
      dt: null
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$http.post('/admin/AccountController/accountInfo')
        .then((res) =>
        this.dt = res.data)
    }
  }
}
</script>

<style lang="scss">

</style>
