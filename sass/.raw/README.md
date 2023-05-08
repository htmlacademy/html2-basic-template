# Папка для оригиналов

Сюда нужно скидывать неоптимизированные `png` и `jpg` двойной плотности пикселей. При запуске `gulp`создаться в `source/public/img` оптимизированная копия с суффиксом `@2x`, а также уменьшенная в 2 раза копия без суффиксов. У обоих размеров будет копии в прогрессивных форматах (`webp` и `avif`).

Реализацию `gulp` таски можно посмотреть в [`tasks/images.mjs`](https://github.com/htmlacademy/html2-basic-template/blob/main/sass/tasks/images.mjs).

<a href="https://user-images.githubusercontent.com/47776594/236853380-6e717b58-5cdf-431f-8681-378820c388ce.png" target="_blank" rel="noopener noreferrer">
<img src="https://user-images.githubusercontent.com/47776594/236853380-6e717b58-5cdf-431f-8681-378820c388ce.png" width="800" alt="Пример" />
</a>

После оптимизации оригиналы картинок стоит удалить.

