from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, EmailField
from wtforms.validators import DataRequired, Email, Length, EqualTo
from wtforms import TextAreaField, SelectField

class LoginForm(FlaskForm):
    email = EmailField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Contraseña', validators=[DataRequired()])
    submit = SubmitField('Iniciar Sesión')

class RegistroForm(FlaskForm):
    nombre = StringField('Nombre', validators=[DataRequired(), Length(min=2, max=100)])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Contraseña', validators=[
        DataRequired(),
        Length(min=6, message='La contraseña debe tener al menos 6 caracteres')
    ])
    confirm_password = PasswordField('Confirmar Contraseña', validators=[
        DataRequired(),
        EqualTo('password', message='Las contraseñas deben coincidir')
    ])
    submit = SubmitField('Registrarse')

class TareaForm(FlaskForm):
    titulo = StringField('Titulo', validators=[DataRequired()])
    descripcion = TextAreaField('Descripcion')
    estado = SelectField('Estado', choices=[
        ('pendiente', 'Pendiente'),
        ('en progreso', 'En progreso'),
        ('completada', 'Completada')
    ])
    submit = SubmitField('Guardar')