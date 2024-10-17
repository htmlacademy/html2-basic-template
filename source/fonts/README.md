# Папка для шрифтов

```shell
└── source/
    └── fonts/
        ├── pt-sans-400.woff2
        └── pt-sans-700.woff2
```

Если в проекте используется несколько шрифтов, то для каждого семейства можно использовать отдельную папку:

```shell
└── source/
    └── fonts/
        ├── pt-sans/
        │   ├── pt-sans-bold.woff2
        │   └── pt-sans-bold.woff
        └── tt-norms/
            ├── tt-norms-regular.woff2
            └── tt-norms-regular.woff
```

## Пример подключения шрифтов

В стилевом файле подключения шрифтов пути должны быть валидными для исходников (как подсказывает редактор):

```scss
@font-face {
  font-family: "Raleway";
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("../../fonts/raleway-400.woff2") format("woff2"),
}
```

Сборка сама исправит эти пути на валидные для билда:

```css
@font-face {
  font-family: "Raleway";
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("../fonts/raleway-400.woff2") format("woff2"),
}
```
