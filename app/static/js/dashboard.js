document.addEventListener('DOMContentLoaded', () => {
    // Manejar el botón de nueva tarea
    const newTaskBtn = document.querySelector('.new-task-btn');
    const createFirstTaskBtn = document.querySelector('.create-first-task');

    [newTaskBtn, createFirstTaskBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                // Por ahora solo mostramos un mensaje
                alert('Funcionalidad de crear tarea próximamente...');
            });
        }
    });
}); 