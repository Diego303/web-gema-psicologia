# Guía: poner la web en gemascaraquepsicologia.com

**La idea:** la web sigue alojada **gratis en GitHub**, que ya la publica sola cada vez
que haces `push`. En IONOS solo le dices al dominio **“la web está en GitHub”**. No hay
que comprar hosting ni subir archivos a IONOS.

Al terminar:

- `https://gemascaraquepsicologia.com` → la web.
- `https://www.gemascaraquepsicologia.com` → lleva a la misma web.

Son **4 pasos**. Hazlos **seguidos y en este orden**: entre el paso 1 y el paso 3 la web
puede no verse durante un rato.

---

## Antes de empezar (solo la primera vez en IONOS)

1. Entra en [ionos.es](https://www.ionos.es) → **Iniciar sesión**.
2. Revisa tu correo (también spam): IONOS envía un email para **confirmar los datos del
   titular del dominio**. Pulsa el enlace. Si no lo confirmas, el dominio se bloquea.
3. En el panel, **Menú → Dominios y SSL**: debe salir `gemascaraquepsicologia.com`.
4. Ignora las ofertas (hosting, creador de webs…): **no conectes el dominio a nada de IONOS**.

---

## Paso 1 · Subir el cambio de la web

La configuración de la web ya está cambiada para el dominio (`astro.config.mjs`) y hay un
`public/robots.txt` nuevo.

1. Haz **commit** y **push a `main`**, como siempre.
2. Espera a que se publique: en GitHub, entra al repositorio → pestaña **Actions** → el
   último despliegue debe acabar en **verde ✔** (unos 2 minutos).

---

## Paso 2 · Decirle a GitHub cuál es tu dominio

Esto le dice a GitHub: *“cuando alguien entre en gemascaraquepsicologia.com, enséñale esta
web”*. Es **un solo campo**.

1. Abre esta dirección (es la configuración de tu web en GitHub):
   **https://github.com/Diego303/web-gema-psicologia/settings/pages**
   (o en el repositorio: pestaña **Settings** ⚙️ → en el menú de la izquierda, **Pages**).
2. Baja hasta el apartado **Custom domain**. Verás una caja de texto vacía.
3. Escribe exactamente:

   ```
   gemascaraquepsicologia.com
   ```

4. Pulsa **Save**.

Saldrá un aviso en rojo o amarillo tipo *“DNS check unsuccessful”*. **Es normal**: se
arregla solo cuando hagas el paso 3.

---

## Paso 3 · Apuntar el dominio a GitHub (en IONOS)

Esto le dice a Internet: *“gemascaraquepsicologia.com está en los servidores de GitHub”*.
Se hace con unas “entradas” del dominio llamadas **registros DNS**. Cada registro tiene
**3 datos**: el **tipo**, el **nombre de host** (qué parte del dominio) y **a dónde apunta**.

### 3.1 · Abrir el DNS del dominio

1. IONOS → **Menú → Dominios y SSL**.
2. Pulsa en `gemascaraquepsicologia.com`.
3. Entra en la pestaña **DNS**. Verás una lista de registros que IONOS ha creado por
   defecto, más o menos así (los números serán otros):

   | Tipo  | Nombre de host | Valor               |
   |-------|----------------|---------------------|
   | A     | @              | 217.160.0.xxx       |
   | AAAA  | @              | 2001:8d8:100f:…     |
   | CNAME | www            | gemascaraquepsicologia.com |
   | MX    | @              | mx00.ionos.es       |
   | TXT   | @              | v=spf1 include:…    |

### 3.2 · Borrar los que apuntan a IONOS

Borra **solo** estos (con el icono de papelera 🗑️ o el menú `⋯` de cada fila):

- Los de tipo **A** con nombre de host **`@`**.
- Los de tipo **AAAA** con nombre de host **`@`**.
- Cualquiera (A, AAAA o CNAME) con nombre de host **`www`**.

> 🚫 **No borres** los **MX**, los **TXT** ni ningún otro: son del correo y de IONOS.

### 3.3 · Añadir los de GitHub (ejemplo paso a paso)

Hay que crear **5 registros**. Así se crea el primero:

1. Pulsa **Añadir registro**.
2. Elige el tipo **A**.
3. Rellena el formulario:
   - **Nombre de host:** `@` (la `@` significa “el dominio tal cual”, sin www).
   - **Apunta a:** `185.199.108.153`
   - **TTL:** deja el que viene (p. ej. *1 hora*).
4. Pulsa **Guardar**.

Repite lo mismo para los otros **3 registros A**, cambiando solo la IP:

| Tipo | Nombre de host | Apunta a          |
|------|----------------|-------------------|
| A    | `@`            | `185.199.108.153` ← el del ejemplo |
| A    | `@`            | `185.199.109.153` |
| A    | `@`            | `185.199.110.153` |
| A    | `@`            | `185.199.111.153` |

Y por último el de **www**:

1. **Añadir registro** → tipo **CNAME**.
2. **Nombre de host:** `www`
3. **Apunta a:** `diego303.github.io`
4. **Guardar**.

Al terminar, en la lista deben verse estos 5 registros nuevos (más los MX/TXT que no
has tocado):

| Tipo  | Nombre de host | Valor                |
|-------|----------------|----------------------|
| A     | @              | 185.199.108.153      |
| A     | @              | 185.199.109.153      |
| A     | @              | 185.199.110.153      |
| A     | @              | 185.199.111.153      |
| CNAME | www            | diego303.github.io   |

> Si IONOS no te deja borrar o editar el registro **A** de `@` porque el dominio está
> “conectado” a un producto de IONOS, busca en la página del dominio una opción para
> **cambiar el destino / uso del dominio** y elige la opción personalizada (DNS /
> dirección IP). Luego vuelve al paso 3.2.

---

## Paso 4 · Esperar y activar el candado (HTTPS)

1. Espera. Los cambios de DNS tardan **de unos minutos a unas horas** (máximo 24 h).
2. Vuelve a **https://github.com/Diego303/web-gema-psicologia/settings/pages**. Cuando
   esté listo, en **Custom domain** pondrá **“DNS check successful”** ✔.
3. Marca la casilla **Enforce HTTPS** (debajo). Si sale en gris, GitHub aún está creando
   el certificado: espera un rato (normalmente menos de 1 h) y vuelve a entrar.

**¡Hecho!** Abre `https://gemascaraquepsicologia.com`.

---

## Comprobar que todo va bien

- [ ] `https://gemascaraquepsicologia.com` abre la web con el candado 🔒.
- [ ] `https://www.gemascaraquepsicologia.com` también abre la web.
- [ ] Se ven bien Inicio (con el loto), Servicios, Sobre mí y Contacto.
- [ ] El botón **Reservar** abre Doctoralia.

---

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Una página de IONOS (“dominio reservado”, “en construcción”…) | Queda algún registro **A** o **AAAA** de IONOS en `@` o `www` (paso 3.2), o hay que esperar más. |
| La web sale “rota”: sin colores, sin fotos | El paso 1 no se publicó: revisa que el despliegue en **Actions** acabó en verde. |
| GitHub sigue diciendo “DNS check unsuccessful” | Espera (hasta 24 h) y repasa que los 5 registros del paso 3.3 están bien escritos. |
| **Enforce HTTPS** sigue en gris tras 24 h | En **Custom domain**, borra el dominio, **Save**, vuelve a escribirlo y **Save**. |
| Para comprobar el DNS por tu cuenta | Entra en [dnschecker.org](https://dnschecker.org), escribe `gemascaraquepsicologia.com`, tipo **A**: deben salir las 4 IPs `185.199.10x.153`. |

---

## Después: el día a día no cambia

Editas, haces commit y `push` a `main` → en un par de minutos la web se actualiza en
`gemascaraquepsicologia.com`. En IONOS no hay que tocar nada más, salvo **renovar el
dominio cada año** (comprueba que la renovación automática está activada).

---

## Opcional (más adelante, recomendable)

- **Verificar el dominio en GitHub** (evita que otra cuenta pueda usarlo): GitHub → tu
  foto → **Settings** → **Pages** → **Add a domain** → escribe el dominio y sigue las
  instrucciones (te pedirá crear un registro **TXT** en el DNS de IONOS, igual que en el
  paso 3.3, y luego pulsar **Verify**). Nunca borres ese TXT después.
- **IPv6:** añade también 4 registros **AAAA** con nombre de host `@` y valores
  `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` y
  `2606:50c0:8003::153`.
- **Google:** añade el dominio en [Google Search Console](https://search.google.com/search-console)
  y envía el mapa del sitio `https://gemascaraquepsicologia.com/sitemap-index.xml`.
