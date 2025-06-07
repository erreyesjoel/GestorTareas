document.addEventListener('DOMContentLoaded', () => {
    // Botones de nueva tarea
    const newTaskBtns = document.querySelectorAll('.action-btn.primary, .create-task-btn');
    newTaskBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Por ahora solo mostramos un mensaje
            alert('Funcionalidad de crear tarea próximamente...');
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
}); 