
### Базовая инструкция для развертывания:

Для запуска выполнить две команды:
1) docker compose --profile deps up -d
2) docker compose --profile app up -d

### Посмотреть API можно по адресу:
http://localhost:8080/docs/

### Подробная инструкция для развертывания и первого запуска:

1) docker compose --profile deps up -d
2) создать бакет в минио + access + secret key
    + зайти на localhost:9000
    + minioadmin:minioadmin
    + слева вкладке access keys
    + справа сверху `create access key` - вбиваем в него
        - access_key: `NZjt6KmuHQRU7IitYUiW`
        - secret_key: `ql9DoBMKyqMxQm8j5LQuKwnn68KFsGqn5jGbL7uL`
3) вкладка object browser, создаем бакет `uzi`
4) создаем топики для redpanda (потом автоматизируем, сейчас я в __`тильте`__)
    + localhost:8081    
    + вкладка topics
    + создаем 3 топика:
        - uziupload
        - uzisplitted
        - uziprocessed
5) Заходим в контейнер БД и создаем базы данных:

   docker exec -it <имя_или_id_контейнера с БД> bash

   psql -U postgres

   create database uzidb;

   create database meddb;

   create database authdb;

6) docker compose --profile app up -d



