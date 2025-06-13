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

     // FILTRO DE BÚSQUEDA DE TAREAS POR NOMBRE
    const searchInput = document.getElementById('task-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            document.querySelectorAll('.task-item').forEach(item => {
                const title = item.querySelector('.task-title').textContent.toLowerCase();
                if (title.includes(filter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // FILTRO POR ESTADO
    const stateCheckboxes = document.querySelectorAll('.state-filter');
    if (stateCheckboxes.length) {
        stateCheckboxes.forEach(cb => {
            cb.addEventListener('change', filterTasks);
        });
    }

    function filterTasks() {
        // Estados seleccionados
        const selectedStates = Array.from(document.querySelectorAll('.state-filter:checked')).map(cb => cb.value.toLowerCase());
        // Texto de búsqueda
        const filter = (document.getElementById('task-search')?.value || '').toLowerCase();

        document.querySelectorAll('.task-item').forEach(item => {
            const title = item.querySelector('.task-title').textContent.toLowerCase();
            const state = item.querySelector('.task-status').textContent.toLowerCase();
            const matchesState = selectedStates.includes(state);
            const matchesText = title.includes(filter);
            item.style.display = (matchesState && matchesText) ? '' : 'none';
        });
    }

    // Si tienes filtro de texto, llama a filterTasks también en su evento:
    if (searchInput) {
        searchInput.addEventListener('input', filterTasks);
    }

    // Mostrar/ocultar filtros al hacer clic en el botón "Filtrar"
    const filterToggle = document.getElementById('filter-toggle');
    const filterWrapper = document.querySelector('.filter-wrapper');
    if (filterToggle && filterWrapper) {
        filterToggle.addEventListener('click', function(e) {
            filterWrapper.classList.toggle('hidden');
            // Opcional: cerrar si haces click fuera
            document.addEventListener('click', function handler(ev) {
                if (!filterWrapper.contains(ev.target) && ev.target !== filterToggle) {
                    filterWrapper.classList.add('hidden');
                    document.removeEventListener('click', handler);
                }
            });
        });
    }
});