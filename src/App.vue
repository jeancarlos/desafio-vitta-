<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  /* Adjust font size */
  font-size: 100%;
  -webkit-text-size-adjust: 100%;
  /* Smoothing */
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
}
.md-toolbar.md-theme-default {
  -webkit-box-shadow: 0px -12px 40px 16px rgba(173,173,173,1);
  -moz-box-shadow: 0px -12px 40px 16px rgba(173,173,173,1);
  box-shadow: 0px -12px 40px 16px rgba(173,173,173,1);
}

.md-toolbar .md-input-container label {
  top:0;
}
.md-toolbar .md-input-container.md-has-value label {
  top:-10px;
}

.md-select-content .md-selected{
  display:none;
}

.md-toolbar .md-select {
  min-width: 100px;
}
</style>
