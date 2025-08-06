<template>
  <div
    ref="viewerContentRef"
    class="flex w-full"
    :class="[maximized ? 'h-full' : 'h-[70vh]']"
  >
    <div ref="mainContentRef" class="flex-1 relative">
      <iframe
      src="/opencut"
      class="demo-iframe h-full w-full">
    </iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
const viewerContentRef = ref<HTMLDivElement>()
const mainContentRef = ref<HTMLDivElement>()
const maximized = ref(false)
const mutationObserver = ref<MutationObserver | null>(null)

onMounted(async () => {
  if (viewerContentRef.value) {
    mutationObserver.value = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'maximized'
        ) {
          maximized.value =
            (mutation.target as HTMLElement).getAttribute('maximized') ===
            'true'
        }
      })
    })

    mutationObserver.value.observe(viewerContentRef.value, {
      attributes: true,
      attributeFilter: ['maximized']
    })
  }
})

onBeforeUnmount(() => {
  if (mutationObserver.value) {
    mutationObserver.value.disconnect()
    mutationObserver.value = null
  }
})
</script>

<style scoped>
.demo-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>