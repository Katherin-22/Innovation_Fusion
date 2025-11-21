use billing_software;

   INSERT INTO tbl_users(name, email, password, role, created_at, updated_at, user_id)
   VALUES(
   'Santiago',
   'santiago@lunaria.com',
   '$2a$10$Jv28cuVrSxzPsZeujtM8F.aqV7aSlUDu05GhYzG/cbd1gtTNurQRe',
   'ROLE_ADMIN',
   current_timestamp(),
   current_timestamp(),
   uuid()
   );
