from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configuración de la base de datos MariaDB
    app.config['SECRET_KEY'] = 'e9f4c0a77d4c0e4a1b3349b6342f77c3'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://gestor:gestorUsuario@localhost/gestor_tareas'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializar SQLAlchemy y Flask-Migrate
    db.init_app(app)
    migrate.init_app(app, db)

    # Importar y registrar el Blueprint
    from .routes import main
    app.register_blueprint(main)

    # Importar models después de inicializar db
    from . import models

    return app
