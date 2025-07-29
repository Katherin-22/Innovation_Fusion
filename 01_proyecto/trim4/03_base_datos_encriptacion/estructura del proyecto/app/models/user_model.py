# app/models/user_model.py

def insert_user(connection, numeroDocumento, nombreUsuario, primerApellido, segundoApellido, Direccion, telefono, password, correoElectronico, estadoUsuario, idRol , idtipoDocumento):
    print("📤 Ejecutando SQL con datos:")
    datos = (numeroDocumento, nombreUsuario, primerApellido, segundoApellido, Direccion, telefono, password, correoElectronico, estadoUsuario, idRol, idtipoDocumento)
    print(datos)
    try:
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO Usuario (
                    numeroDocumento, nombreUsuario, primerApellido,
                    segundoApellido, Direccion, telefono, password, correoElectronico,
                    estadoUsuario, idRol, idtipoDocumento
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, datos)
        connection.commit()
    except Exception as e:
        print("❌  Error al insertar usuario:", e)
        raise


def get_user_by_email(connection, correoElectronico):
    with connection.cursor() as cursor:
        cursor.execute("SELECT idUsuario, password, idRol, nombreUsuario FROM Usuario WHERE correoElectronico = %s", (correoElectronico,))
        return cursor.fetchone()

def get_user_by_id(connection, user_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT idUsuario, nombreUsuario, correoElectronico, idRol FROM Usuario WHERE idUsuario = %s", (user_id,))
        return cursor.fetchone()

def get_user_basic_profile(connection, user_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT nombreUsuario, correoElectronico, idRol FROM Usuario WHERE idUsuario = %s", (user_id,))
        return cursor.fetchone()

def get_all_users_with_roles(connection):
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT u.nombreUsuario, u.correoElectronico, r.nombreRol
            FROM Usuario u
            JOIN rol r ON u.idRol = r.idRol
        """)
        return cursor.fetchall()

def get_user_by_email_full(connection, correoElectronico):
    with connection.cursor() as cursor:
        cursor.execute("SELECT nombreUsuario, correoElectronico, idRol FROM Usuario WHERE correoElectronico = %s", (correoElectronico,))
        return cursor.fetchone()

def update_user(connection, nombreUsuario, nuevoCorreo, idRol, correoAnterior):
    with connection.cursor() as cursor:
        cursor.execute("""
            UPDATE Usuario 
            SET nombreUsuario = %s, correoElectronico = %s, idRol = %s 
            WHERE correoElectronico = %s
        """, (nombreUsuario, nuevoCorreo, idRol, correoAnterior))
        connection.commit()

def delete_user_by_email(connection, correoElectronico):
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM Usuario WHERE correoElectronico = %s", (correoElectronico,))
        connection.commit()
