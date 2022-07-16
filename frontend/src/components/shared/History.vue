<template>
  <Diff
    :mode="mode"
    :theme="theme"
    :language="language"
    :prev="prev"
    :current="current"
    :folding="folding"
  />
</template>

<script>

export default {
  name: "DiffHistory",
  props: {
      prev: [String, Number],
      current: [String, Number],
  },
  data() {
    return {
      mode: "unified", // split, unified
      theme: "light", //dark, light
      folding: false,
    };
  },
}
</script>