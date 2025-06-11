from flask import Blueprint, render_template, redirect, url_for, flash, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from .models import Usuario, Tarea
from . import db
from .forms import LoginForm, RegistroForm, TareaForm

# Define un Blueprint para las rutas principales
main = Blueprint('main', __name__)

@main.route('/', methods=['GET', 'POST'])
def loginRegistro():
    if current_user.is_authenticated: # si esta autenticado, redirigir al dashboard
        return redirect(url_for('main.dashboard'))

    login_form = LoginForm()
    registro_form = RegistroForm()

    # Procesar formulario de registro
    if registro_form.submit.data and registro_form.validate_on_submit():
        # Verificar si el email ya existe
        usuario_existente = Usuario.query.filter_by(email=registro_form.email.data).first()
        if usuario_existente:
            flash('El email ya está registrado', 'error')
            return redirect(url_for('main.loginRegistro'))

        # Crear nuevo usuario
        nuevo_usuario = Usuario(
            nombre=registro_form.nombre.data,
            email=registro_form.email.data,
            contraseña=generate_password_hash(registro_form.password.data)
        )
        
        try:
            db.session.add(nuevo_usuario)
            db.session.commit()
            flash('¡Registro exitoso! Ya puedes iniciar sesión', 'success')
            return redirect(url_for('main.loginRegistro'))
        except Exception as e:
            db.session.rollback()
            flash('Error al registrar usuario', 'error')
            return redirect(url_for('main.loginRegistro'))

    # Procesar formulario de login
    if login_form.submit.data and login_form.validate_on_submit():
        usuario = Usuario.query.filter_by(email=login_form.email.data).first()
        if usuario and check_password_hash(usuario.contraseña, login_form.password.data):
            login_user(usuario)
            next_page = request.args.get('next')
            return redirect(next_page if next_page else url_for('main.dashboard'))
        flash('Email o contraseña incorrectos', 'error')
        return redirect(url_for('main.loginRegistro'))

    return render_template('autenticacion.html', 
                         login_form=login_form, 
                         registro_form=registro_form)

@main.route('/dashboard')
@login_required
def dashboard():
    tareas = Tarea.query.filter_by(usuario_id=current_user.id).all()
    return render_template('dashboard.html', tareas=tareas)

@main.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.loginRegistro'))

@main.route('/tareas', methods=['GET'])
@login_required
def tareas():
    tareas = Tarea.query.filter_by(usuario_id=current_user.id).all()
    return render_template('tareas.html', tareas=tareas)
    
@main.route('/tareas/nueva', methods=['GET', 'POST'])
@login_required
def nueva_tarea():
    form = TareaForm()
    if form.validate_on_submit():
        tarea = Tarea(
            titulo=form.titulo.data,
            descripcion=form.descripcion.data,
            estado=form.estado.data,
            usuario_id=current_user.id
        )
        db.session.add(tarea)
        db.session.commit()
        flash('Tarea creada correctamente', 'success')
        return redirect(url_for('main.tareas'))
    return render_template('tarea_form.html', form=form, accion='Nueva')

@main.route('/tareas/editar/<int:id>', methods=['GET', 'POST'])
@login_required
def editar_tarea(id):
    tarea = Tarea.query.get_or_404(id)
    if tarea.usuario_id != current_user.id:
        flash('No autorizado', 'error')
        return redirect(url_for('main.tareas'))
    form = TareaForm(obj=tarea)
    if form.validate_on_submit():
        tarea.titulo = form.titulo.data
        tarea.descripcion = form.descripcion.data
        tarea.estado = form.estado.data
        db.session.commit()
        flash('Tarea actualizada', 'success')
        return redirect(url_for('main.tareas'))
    return render_template('tarea_form.html', form=form, accion='Editar')

@main.route('/tareas/eliminar/<int:id>', methods=['POST'])
@login_required
def eliminar_tarea(id):
    tarea = Tarea.query.get_or_404(id)
    if tarea.usuario_id != current_user.id:
        flash('No autorizado', 'error')
        return redirect(url_for('main.tareas'))
    db.session.delete(tarea)
    db.session.commit()
    flash('Tarea eliminada', 'success')
    return redirect(url_for('main.tareas'))

@main.route('/tareas/<int:id>', methods=['GET'])
@login_required
def ver_tarea(id):
    tarea = Tarea.query.get_or_404(id)
    if tarea.usuario_id != current_user.id:
        flash('No autorizado', 'error')
        return redirect(url_for('main.tareas'))
    return render_template('tarea_detalle.html', tarea=tarea)