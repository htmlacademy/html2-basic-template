# Папка для отимизированных изображений

```shell
└── source/
    └── images/
        ├── hero@1x.jpg
        ├── hero@1x.webp
        ├── hero@2x.jpg
        ├── hero@2x.webp
        └── logo.svg
```

Отсюда файлы изображений при продакшен-сборке без изменений попадают в `build/images/`:

```shell
└── build/
    └── images/
        ├── hero@1x.jpg
        ├── hero@1x.webp
        ├── hero@2x.jpg
        ├── hero@2x.webp
        └── logo.svg
```

При дев-сборке изображения не копируются в `build/images/`, сервер их забирает из `source/images/`

## Пример подключения изображения

В стилевом файле БЭМ-блока пути должны быть валидными для исходников (как подсказывает редактор):

```scss
.hero {
  background-image:
    image-set(
      url("../../images/hero@1x.webp") 1x type("image/webp"),
      url("../../images/hero@2x.webp") 2x type("image/webp"),
      url("../../images/hero@1x.jpg") 1x type("image/jpeg"),
      url("../../images/hero@2x.jpg") 2x type("image/jpeg")
    );
}
```

Сборка сама исправит эти пути на валидные для билда:

```css
.hero {
  background-image:
    image-set(
      url("../images/hero@1x.webp") 1x type("image/webp"),
      url("../images/hero@2x.webp") 2x type("image/webp"),
      url("../images/hero@1x.jpg") 1x type("image/jpeg"),
      url("../images/hero@2x.jpg") 2x type("image/jpeg")
    );
}
```
