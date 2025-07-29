# app/controllers/user_controller.py

from flask import Blueprint, render_template, request, redirect, url_for, current_app, session, flash
from flask_bcrypt import Bcrypt
from app.models.user_model import get_user_by_email, insert_user
from app.models.role_model import get_all_roles

user_bp = Blueprint('user_bp', __name__)
bcrypt = Bcrypt()

@user_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        try:
            email = request.form['email']
            password = request.form['password']

            connection = current_app.connection
            user = get_user_by_email(connection, email)

            if user and bcrypt.check_password_hash(user['password'], password):
                session['user_id'] = user['idUsuario']
                session['user_role'] = user['idRol']
                session['user_name'] = user['nombreUsuario']

                flash('¡Inicio de sesión exitoso!', 'success')
                return redirect(url_for('user_bp.dashboard'))
            else:
                flash('Credenciales inválidas. Por favor, inténtalo de nuevo.', 'danger')
        except Exception as e:
            print("❌ Error durante el login:", e)
            flash('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.', 'danger')

    return render_template('ModuloUsuarios/IniciarSesion/formulario incio de sesion.html')


@user_bp.route('/register', methods=['GET', 'POST'])
def register():
    connection = current_app.connection

    if request.method == 'POST':
        try:
            nombre_completo = request.form['name']
            apellidos = request.form['apellidos']
            numeroDocumento = request.form['cedula']
            Direccion = request.form.get('Direccion', 'No registrada')
            telefono = request.form['telefono']

            if request.form['password'] != request.form['confirmacion_de_contraseña']:
                flash("⚠️ Las contraseñas no coinciden.", "danger")
                return redirect(url_for('user_bp.register'))

            password = bcrypt.generate_password_hash(request.form['password']).decode('utf-8')

            correoElectronico = request.form['email']
            estadoUsuario = request.form.get('estadoUsuario', 'Activo')
            idRol = int(request.form.get('idRol') or 1)
            idTipoDeDocumento = int(request.form.get('idtipoDocumento') or 1)

            partes_apellidos = apellidos.split(" ", 1)
            primerApellido = partes_apellidos[0]
            segundoApellido = partes_apellidos[1] if len(partes_apellidos) > 1 else ""

            nombreUsuario = nombre_completo

            insert_user(
                connection,
                numeroDocumento,
                nombreUsuario,
                primerApellido,
                segundoApellido,
                Direccion,
                telefono,
                password,
                correoElectronico,
                estadoUsuario,
                idRol,
                idTipoDeDocumento
            )

            flash('Usuario registrado correctamente', 'success')
            return redirect(url_for('user_bp.login'))

        except Exception as e:
            print("❌ Error en registro:", e)
            flash('Error al registrar el usuario: ' + str(e), 'danger')

    roles = get_all_roles(connection)
    return render_template('ModuloUsuarios/RegistrarUsuarios/index.html', roles=roles)


@user_bp.route('/logout')
def logout():
    session.clear()
    return render_template('home.html')
