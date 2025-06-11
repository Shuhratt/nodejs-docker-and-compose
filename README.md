# Докеризация приложения

### IP - 84.252.133.40

### Frontend - https://kupdar.nomorepartiessbs.ru

### Backend - https://api.kupdar.nomorepartiessbs.ru

```bash
# запуск всех образов (-d флаг detached mode запуск в фоновом режим без блокировки консоли)
$ docker-compose up

# зайти в консоль контейнера
$ docker-compose exec {image_name} sh

# пересобрать конкретный образ и запустить контейнер
$ docker-compose up --build -d {image_name}

```
