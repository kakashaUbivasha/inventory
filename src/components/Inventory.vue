<template>
  <div class="grid-container w-75 h-100">
    <div v-for="(row, rowIndex) in grid" :key="`row-${rowIndex}`" class="grid-row">
      <div v-for="(cell, colIndex) in row"
           :key="`cell-${rowIndex}-${colIndex}`"
           class="grid-cell pointer position-relative"
           @dragover.prevent
           @drop="handleDrop(rowIndex, colIndex)">
        <div v-if="cell"
             class="grid-item"
             draggable="true"
             @dragstart="handleDragStart(rowIndex, colIndex, $event)"
             @click="openModal">
          <img :src="cell.content" alt="">
          <span class="position-absolute bottom-1 end-1">{{cell.count}}</span>
        </div>
      </div>
    </div>
    <vue-final-modal v-bind="$attrs" classes="modal-container" content-class="modal-content">
      <span class="modal__title">Вы специалист?</span>
      <!-- Add your modal content here -->
    </vue-final-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

const grid = ref([
  [{ content: "/i1.svg", count: 5 }, { content: "/i2.svg", count: 4 }, { content: "/i3.svg", count: 3 }, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null]
]);

const draggedItem = ref({ rowIndex: null, colIndex: null });
const isModalVisible = ref(false);

onMounted(() => {
  const storedItems = localStorage.getItem('items');
  if (storedItems) {
    grid.value = JSON.parse(storedItems);
  } else {
    localStorage.setItem('items', JSON.stringify(grid.value));
  }
});

const handleDragStart = (rowIndex, colIndex, event) => {
  draggedItem.value.rowIndex = rowIndex;
  draggedItem.value.colIndex = colIndex;
  event.target.style.opacity = '0.5';
};

const handleDrop = (targetRowIndex, targetColIndex) => {
  document.querySelectorAll('.grid-item').forEach(item => {
    item.style.opacity = '1';
  });

  if (draggedItem.value.rowIndex === targetRowIndex && draggedItem.value.colIndex === targetColIndex) {
    return;
  }

  const newGrid = JSON.parse(JSON.stringify(grid.value));
  const draggedCell = newGrid[draggedItem.value.rowIndex][draggedItem.value.colIndex];
  newGrid[draggedItem.value.rowIndex][draggedItem.value.colIndex] = newGrid[targetRowIndex][targetColIndex];
  newGrid[targetRowIndex][targetColIndex] = draggedCell;
  grid.value = newGrid;
  localStorage.setItem('items', JSON.stringify(grid.value));
};

const openModal = () => {
  isModalVisible.value = true;
};
</script>


<style scoped>
.grid-container {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(5, 1fr);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid grey;
}

.grid-row {
  display: contents;
  background-color: #1a1a1a;
}

.grid-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px solid grey;
  transition: background-color 0.3s ease;
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity));
}

.grid-cell:hover {
  background-color: #2F2F2F;
}

.grid-item {
  color: white;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  cursor: grab;
  user-select: none;
}

.grid-item:active {
  cursor: grabbing;
}

.bottom-1 {
  bottom: 10px;
}

.end-1 {
  right: 10px;
}
</style>