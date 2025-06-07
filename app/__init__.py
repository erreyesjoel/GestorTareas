from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)

    # Configuración de la base de datos MariaDB
    app.config['SECRET_KEY'] = '6140e43d57dd008288aa681cea195621cf4fa3efd8b0e97c891216867731c953'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://gestor:gestorUsuario@localhost/gestor_tareas'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializar SQLAlchemy y Flask-Migrate
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Inicializar Flask-Login
    login_manager.init_app(app)
    login_manager.login_view = 'main.loginRegistro'
    login_manager.login_message = 'Por favor inicia sesión para acceder a esta página'

    @login_manager.user_loader
    def load_user(user_id):
        from .models import Usuario
        return Usuario.query.get(int(user_id))

    # Importar y registrar el Blueprint
    from .routes import main
    app.register_blueprint(main)

    # Importar models después de inicializar db
    from . import models

    return app
