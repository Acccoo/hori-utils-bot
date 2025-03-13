## TO DO LIST:
- Avisos de alfas
- Mensaje automatizado con los husos horarios horianos
- Calculadora de catch rates
- Recordatorios para actividades con tiempo de refresco: regar bayas, recolectar bonguris, luchas contra Red o Ho-Oh, etc.
- Sistema de creación de guías (halloween, farmeos, crianza) y consulta de las mismas a conveniencia
- Creación de eventos en discord con los calendarios de wars o shiny hunts

Para el sistema de creacion de guias, se puede hacer algo mas simple con los copy pastes, asi miro cuan viable es

## Avisos de alfas
- Comando de activar/desactivar. Requiere un rol para notificar y un canal donde hacerlo. El canal puede ser simplemente donde se haya ejecutado. Internamente también persiste el id del servidor.
- Objeto con el `guildId` como key y { `role`, `channelId` } como valor.
- `onMessageCreate`. Primera comprobación: el servidor tiene configurada una alerta de alfas. Segunda comprobación: el mensaje se ha enviado al canal configurado y por el usuario pertinente. Tercera comprobación: el mensaje contiene "@Alpha" en su contenido (`message.content`).
- El usuario que crea las alertas de alfa es siempre el mismo (un bot).

## Husos horarios
- Comando para obtener diferentes husos horarios previamente configurados. Pedirá tanto un país como una hora (y fecha) local, la cual se traducirá en diferentes zonas horarias. Si no se ha utilizado antes el comando para configurar el listado de zonas horarias, en su lugar mostrará un aviso pidiendo que se configure.
- Comando para configurar husos horarios a obtener. Mostrará un listado de países con sus husos horarios más comunes (por ejemplo, México DC o México Sinaloa). Se podrá seleccionar varias opciones. Guardará un listado de zonas horarias configuradas por cada servidor.
- Hará uso de la timeAPI una vez se sepan las zonas horarias a las que se quiere convertir una hora. **POST** /api/conversion/converttimezone.
- También debería devolver un timestamp de discord con el tiempo relativo.

- Se debe contar con una BBDD previamente nutrida que almacene las zonas horarias más comunes, indicando el país al que pertenecen.
- OPCIONAL. Crear comandos para eliminar y añadir zonas horarias, pidiendo el continente y país al que pertenece y mostrando el listado de las posibles zonas a añadir/eliminar.



[Diferentes timezones de cada país](https://en.wikipedia.org/wiki/List_of_time_zones_by_country)

[API para la obtención de horarios](https://timeapi.io/)


## Creación de eventos automáticos
- Escuchar en un canal específico (o dos, el de eventos y el de wars). Fijarse en el estilo común de las publicaciones para recuperar el título de cada evento.
- La fecha de cada evento es tan sencillo como revisar mediante alguna regex el timestamp que se haya proporcionado (por favor, que se proporcionen siempre)
- Creación de un evento automáticamente en servidor de discord
- Creación de un evento automáticamente en el calendario de HORI en Google calendar (echar un vistazo a su API)
- Avisar con una hora de antelación para cada uno de los eventos activos