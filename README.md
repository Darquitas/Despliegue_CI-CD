# 🚀 Despliegue de Infraestructura y Base de Datos - TechStore API

Este proyecto implementa una infraestructura completa en **Microsoft Azure** utilizando **Terraform**.  
El objetivo es desplegar una **API REST** junto con una base de datos **PostgreSQL Flexible Server** y una **máquina virtual Linux** que servirá para ejecutar scripts y administrar servicios.

---

## 🧱 Arquitectura general

La infraestructura incluye:
- **Azure Resource Group**  
- **Azure PostgreSQL Flexible Server**  
- **Máquina virtual Linux (Ubuntu)** para ejecución de scripts  
- **Red virtual, subred y grupo de seguridad (NSG)**  
- **Configuraciones de acceso y credenciales** gestionadas desde Terraform  

---

## ⚙️ Requisitos previos

Antes de comenzar, asegúrate de tener instalado y configurado:
- [Azure CLI](https://learn.microsoft.com/es-es/cli/azure/install-azure-cli)  
- [Terraform](https://developer.hashicorp.com/terraform/downloads)  
- Acceso a una suscripción activa de **Azure**

---

## 🚀 Despliegue paso a paso

### 1️⃣ Autenticación en Azure
Si no estás autenticado en Azure, ejecuta:
`az login`

### 2️⃣ Inicialización de Terraform
Inicializa el entorno de Terraform (descarga de proveedores y módulos):  
`terraform init`

En caso de necesitar actualizar dependencias:  
`terraform init -upgrade`

### 3️⃣ Planificación del despliegue
Revisa los recursos que se crearán:  
`terraform plan`

### 4️⃣ Aplicación del despliegue
Crea la infraestructura en Azure:  
`terraform apply`  
Confirma con **yes** cuando se te solicite.

### 5️⃣ Conexión a la máquina virtual
Una vez completado el despliegue, conéctate por SSH a la máquina virtual:  
`ssh azureuser@52.138.51.180`  
💡 Reemplaza la IP por la que se genere en tu despliegue.

### 6️⃣ Instalación de dependencias en la VM
Dentro de la máquina virtual, ejecuta:  
`sudo apt update -y`  
`sudo apt install git postgresql-client -y`

### 7️⃣ Clonación del repositorio con scripts de base de datos
Clona el repositorio con los scripts SQL necesarios:  
`git clone https://github.com/Darquitas/Despliegue_CI-CD.git`  
`cd Despliegue_CI-CD/db_scripts`

### 8️⃣ Conexión a la base de datos PostgreSQL
Conéctate al servidor PostgreSQL desplegado en Azure:  
`psql -h techstore-db.postgres.database.azure.com -U postgres -d techstore`  
💡 Se solicitará la contraseña configurada en Terraform.

### 9️⃣ Ejecución de scripts SQL
Dentro de la terminal **psql**, ejecuta los scripts en el siguiente orden:  
`\i create_tables.sql;`  
`\i insert_data.sql;`  
`\i drop_tables.sql;`  
`\q`

### 🔚 10️⃣ Cierre de sesión y eliminación de la infraestructura
Sal de la máquina virtual y destruye los recursos creados:  
`exit`  
`terraform destroy`  
Confirma con **yes** para eliminar toda la infraestructura.

---

## 📁 Estructura de carpetas (resumen)

📦 Despliegue_CI-CD/  
 ┣ 📂 db_scripts/  
 ┃ ┣ 📜 create_tables.sql  
 ┃ ┣ 📜 insert_data.sql  
 ┃ ┗ 📜 drop_tables.sql  
 ┣ 📜 main.tf  
 ┣ 📜 variables.tf  
 ┗ 📜 outputs.tf  

---

## 🧩 Notas finales

- Revisa siempre las variables de Terraform antes de aplicar los cambios.  
- Mantén las credenciales seguras y fuera del control de versiones.  
- Puedes modificar los scripts SQL según las necesidades de la API.

