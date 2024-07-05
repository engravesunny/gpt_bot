import { ref } from 'vue'

/**
 * @type {import('vue').Ref<Array<{fileId: number;fileStatus: any}>>} docStatus
 */
const docStatus = ref([]);
/**
 * @type {import('vue').Ref<Array<number>>} docIds
 */
const docIds = ref([]);
const docInfos = ref([]);

export const docStore = () => {
  function updateDocStore(newHistory) {
    docHistory.value = [...docHistory.value, ...newHistory]
  }
  function clearDocHistory() {
    docHistory.value = [];
  }
  return {
    docStatus,
    docIds,
    docInfos,
    updateDocStore,
    clearDocHistory,
  };
}
