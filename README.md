# Sistema de Gestión de Inventario

Aplicación web fullstack desarrollada como parte de la **Actividad #8 – Unidad 4** de la asignatura **Desarrollo de Sistemas Informáticos** en la Universidad Técnica de Manabí.

El sistema permite la gestión de productos, usuarios y el registro de historial de movimientos, aplicando autenticación con JWT y control de roles.

---

## 🚀 Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt

### Frontend
- React
- Axios
- Bootstrap
- SweetAlert2

---

## 📂 Estructura del Proyecto

inventario/
│
├── backend/
│ ├── routes/
│ ├── middleware/
│ ├── db.js
│ └── index.js
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md

---

## 🗄️ Base de Datos

Base de datos utilizada: **PostgreSQL**

### Tablas
- usuarios
- productos
- categorias
- historial

> El script SQL de creación de tablas se encuentra en la carpeta `/db` o puede ser creado manualmente desde pgAdmin.

---

## 🔐 Roles del Sistema

- **admin**: puede crear, editar y eliminar productos.
- **usuario**: solo puede visualizar información.

---

## ▶️ Ejecución del Proyecto

Sigue estos pasos para levantar el servidor y la interfaz de usuario:

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/servioalfredom-wq/inventario.git
cd inventario
```

### 2️⃣ Configurar Backend
```bash
cd backend
npm install
```

### Configurar la conexión a PostgreSQL en el archivo db.js:
```bash
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "inventario",
  password: "tu_password",
  port: 5432,
});
```

### Ejecutar el backend:
```bash
npm run dev
```

El backend se ejecuta en:

http://localhost:3001

### 3️⃣ Configurar Frontend
```bash
cd frontend
npm install
npm start
```

El frontend se ejecuta en:

http://localhost:3000

👤 Usuario Administrador

Para probar las funciones administrativas, registrar un usuario con rol:
```bash
{
  "nombre": "Admin",
  "email": "admin@admin.com",
  "password": "123456",
  "rol": "admin"
}
```

📌 Notas

El token JWT se almacena en el localStorage.

Las rutas protegidas requieren autenticación.

El historial se registra automáticamente al crear, editar o eliminar productos.

📚 Autor

Servio Alfredo Molina Álvarez
Tecnologías de la Información – UTM
