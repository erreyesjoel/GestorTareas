from flask import Blueprint, render_template

# Define un Blueprint para las rutas principales
main = Blueprint('main', __name__)

@main.route('/')
def loginRegistro():
    return render_template('autenticacion.html')
