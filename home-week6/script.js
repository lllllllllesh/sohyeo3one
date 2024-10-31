document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 14; i++) {
        const plant = document.getElementById(`plant${i}`);
        if (plant) {
            plant.draggable = true;
            plant.addEventListener('dragstart', dragStart);
        }
    }

    const terrarium = document.getElementById('terrarium');
    terrarium.addEventListener('dragover', dragOver);
    terrarium.addEventListener('drop', drop);
});

let draggedElement = null;

function dragStart(e) {
    draggedElement = e.target;
    e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function drop(e) {
    e.preventDefault();
    if (draggedElement) {
        terrarium.appendChild(draggedElement);
        const terrariumRect = terrarium.getBoundingClientRect();
        draggedElement.style.position = 'absolute';
        draggedElement.style.width = '10%';
        draggedElement.style.top = `${e.clientY - terrariumRect.top - draggedElement.offsetHeight / 2}px`;
        draggedElement.style.left = `${e.clientX - terrariumRect.left - draggedElement.offsetWidth / 2}px`;
        onTop(draggedElement);
        draggedElement = null;
    }
}

window.addEventListener('resize', () => {
    document.querySelectorAll('.plant').forEach(plant => {
        plant.style.width = '10%';
    });
});

let zIndexCounter = 10;
function onTop(element) {
    element.style.zIndex = zIndexCounter;
    zIndexCounter++;
}
