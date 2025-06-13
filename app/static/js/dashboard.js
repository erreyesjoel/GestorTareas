document.addEventListener('DOMContentLoaded', () => {
    // Botones de nueva tarea
    const newTaskBtns = document.querySelectorAll('.action-btn.primary, .create-task-btn');
    newTaskBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Redirigir a la página de nueva tarea
            window.location.href = '/tareas/nueva';
        });
    });

    // Botones de vista
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            viewBtns.forEach(b => b.classList.remove('active'));
            // Añadir clase active al botón clickeado
            btn.classList.add('active');
        });
    });

    // Menú de usuario
    const userMenu = document.querySelector('.user-menu');
    const userDropdown = document.querySelector('.user-dropdown');

    // Cerrar el dropdown cuando se hace click fuera
    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
            userDropdown.style.opacity = '0';
            userDropdown.style.visibility = 'hidden';
            userDropdown.style.transform = 'translateY(-10px)';
        }
    });

    // MODAL ELIMINAR TAREA
    let formToDelete = null;
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');

    document.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            formToDelete = this.closest('form');
            deleteModal.style.display = 'flex';
        });
    });

    confirmDeleteBtn.addEventListener('click', function() {
        if (formToDelete) {
            formToDelete.submit();
        }
    });

    cancelDeleteBtn.addEventListener('click', function() {
        deleteModal.style.display = 'none';
        formToDelete = null;
    });

    // Cerrar modal si se hace click fuera del contenido
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            deleteModal.style.display = 'none';
            formToDelete = null;
        }
    });
});