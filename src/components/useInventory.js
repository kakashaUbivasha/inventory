import { ref, h, onMounted } from 'vue';
import { useModal } from "vue-final-modal";
import SimpleModal from "./modal/SimpleModal.vue";
import ModalComponents from "./modal/components/ModalComponents.vue";

export const useGrid = () => {
    const row = ref(0);
    const col = ref(0);
    const grid = ref([
        [{ content: "/i1.svg", count: 5 }, { content: "/i2.svg", count: 4 }, { content: "/i3.svg", count: 3 }, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
    ]);

    const draggedItem = ref({ rowIndex: null, colIndex: null });

    onMounted(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            grid.value = JSON.parse(storedItems);
        } else {
            localStorage.setItem('items', JSON.stringify(grid.value));
        }
    });

    const handleOpenModal = (rowIndex, colIndex) => {
        row.value = rowIndex;
        col.value = colIndex;
        if (grid.value[row.value][col.value] && grid.value[row.value][col.value].count) {
            open();
        }
    };

    const { open, close } = useModal({
        component: SimpleModal,
        slots: {
            default: () =>
                h(ModalComponents, {
                    image: grid.value[row.value][col.value].content,
                    count: grid.value[row.value][col.value].count,
                    closeModal: close,
                    onConfirmDelete: (value) => {
                        grid.value[row.value][col.value].count -= value;
                        localStorage.setItem('items', JSON.stringify(grid.value));
                    },
                }),
        },
    });

    const handleDragStart = (rowIndex, colIndex, event) => {
        draggedItem.value = { rowIndex, colIndex };
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

    return {
        grid,
        handleOpenModal,
        handleDragStart,
        handleDrop
    };
};
