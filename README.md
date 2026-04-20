# PruebaNode

API REST con autenticación JWT y chat potenciado por un modelo de lenguaje (LLM) usando Groq como proveedor.

## Requisitos

- Node.js 18 o superior
- Cuenta gratuita en [groq.com](https://console.groq.com) para obtener la API key (no requiere tarjeta de crédito)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Rodrigo873/PruebaNode.git
   cd PruebaNode
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Copia el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```

4. Rellena las variables en `.env` con tus valores reales (ver sección [Variables de entorno](#variables-de-entorno)).

5. Arranca el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

La interfaz estará disponible en [http://localhost:3000](http://localhost:3000).

## Endpoints

| Método | Ruta           | Descripción                                      | Requiere auth |
|--------|----------------|--------------------------------------------------|---------------|
| POST   | /auth/login    | Inicia sesión y devuelve un JWT                  | No            |
| POST   | /chat          | Envía un mensaje al LLM y devuelve la respuesta  | Sí (Bearer)   |

### POST /auth/login

**Body:**
```json
{ "username": "admin", "password": "tu_contraseña" }
```

**Respuesta exitosa (200):**
```json
{ "token": "<jwt>" }
```

### POST /chat

**Headers:**
```
Authorization: Bearer <jwt>
```

**Body:**
```json
{ "text": "¿Qué es Node.js?" }
```

**Respuesta exitosa (200):**
```json
{ "reply": "Node.js es un entorno de ejecución..." }
```

## Variables de entorno

| Variable       | Descripción                                                      | Ejemplo                        |
|----------------|------------------------------------------------------------------|--------------------------------|
| PORT           | Puerto en el que escucha el servidor                             | 3000                           |
| JWT_SECRET     | Cadena secreta para firmar los JWT (debe ser larga y aleatoria)  | s3cr3t0_muy_l4rg0              |
| AUTH_USER      | Nombre de usuario para el login                                  | admin                          |
| AUTH_PASSWORD  | Contraseña en texto plano (el hash se genera al arrancar)        | password123                    |
| GROQ_API_KEY   | API key de Groq, obtenida en console.groq.com/keys               | gsk_xxxxxxxxxxxxxxxxxxxx       |

## Tests

Ejecuta la suite de tests con:

```bash
npm test
```

Los tests cubren:
- `POST /auth/login` con credenciales correctas → 200 + token
- `POST /auth/login` con credenciales incorrectas → 401
- `POST /chat` sin token → 401
