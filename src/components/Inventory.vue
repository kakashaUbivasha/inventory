<template>
  <div class="grid-container w-75 h-100 bg-dark-custom">
    <div v-for="(row, rowIndex) in grid" :key="`row-${rowIndex}`" class="grid-row">
      <div v-for="(cell, colIndex) in row"
           :key="`cell-${rowIndex}-${colIndex}`"
           class="grid-cell pointer position-relative"
           @dragover.prevent
           @drop="handleDrop(rowIndex, colIndex)"
           @click="()=>handleOpenModal(rowIndex,colIndex)"
      >
        <div v-if="cell&&cell.count>0"
             class="grid-item"
             draggable="true"
             @dragstart="handleDragStart(rowIndex, colIndex, $event)"
             >
          <img :src="cell.content" alt="">
          <span class="position-absolute bottom-1 end-1">{{cell.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useGrid} from "./useInventory.js";

const { grid, handleOpenModal, handleDragStart, handleDrop } = useGrid();
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