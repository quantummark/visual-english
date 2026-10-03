# Visual English

Визуальная платформа изучения английского на React, TypeScript и Vite. Курс Beginner → B2 содержит 14 готовых учебных карточек A4, просмотр с масштабированием и Focus Mode, локальный прогресс и экспорт в PNG/PDF. B2 → C1 представлен страницей «Скоро».

English Toolkit — отдельная библиотека: 12 Sentence Packs и 8 Think in English. Доступны фильтры и страницы с короткими примерами и предварительной структурой; полный контент Toolkit ещё не написан. Прогресс курса хранится в localStorage этого браузера; Toolkit не использует систему прогресса. Серверная часть и аккаунты не требуются.

## Установка и запуск

Нужен Node.js 22.12+ (или 20.19+).

```bash
npm ci
npx playwright install chromium
npm run dev
```

Откройте URL, который напечатает Vite (обычно http://localhost:5173).
На Windows при блокировке PowerShell-скриптов используйте `npm.cmd` и `npx.cmd`.

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Страницы

- `/` — каталог курсов и раздел «Больше практики».
- `/courses/beginner-b2` — описание курса, 4 этапа, 14 карточек, продолжение обучения и сброс прогресса с подтверждением.
- `/courses/beginner-b2/cards/01` … `/courses/beginner-b2/cards/14` — viewer карточек с масштабированием, Fit, Focus Mode, filmstrip и мобильным выбором карточек.
- `/cards/01` … `/cards/14` — совместимые старые адреса: перенаправляют на адреса текущего курса, сохраняя query-параметры.
- `/courses/b2-c1` — страница будущего курса «Скоро».
- `/toolkit` — обзор English Toolkit.
- `/toolkit/sentence-packs` — библиотека наборов фраз, фильтры по уровню и теме; `/:slug` открывает отдельный набор.
- `/toolkit/think-in-english` — библиотека визуальных статей, фильтр по категории; `/:slug` открывает отдельный материал.
- `/print` — все 14 карточек, каждая на отдельном печатном листе.
- `/courses/beginner-b2/cards/01?export=1` — служебный просмотр без масштабирования и панели.

Навигация использует обычные ссылки. Для production-хостинга настройте SPA fallback на `index.html`, чтобы прямые ссылки на карточки работали. Vite dev/preview уже поддерживает это.

## Структура

```text
src/
  app/           App, маршруты и навигация
  platform/      каталог и страницы курсов
  courses/       типы, реестр курсов, этапы и ссылки на компоненты карточек
  cards/         14 готовых компонентов A4
  viewer/        просмотр, масштабирование, filmstrip и мобильный picker
  progress/      localStorage, явное завершение карточек и сброс курса
  toolkit/       реестры ресурсов, фильтры и веб-шаблоны материалов
  components/    A4Page, PagePreview и строительные блоки карточек
  data/          courseCards.ts — исходные метаданные карточек Beginner → B2
  styles/        tokens, global, components, print
  types/         CourseCard, CardId, Accent
scripts/
  browser.ts     запуск локального приложения и Chromium, освобождение ресурсов
  export.ts      PNG и PDF
  page-quality.ts  проверка границ страницы и пересечения с footer
  check-pages.ts   проверка маршрутов, ссылок, мобильного preview и print
```

## PNG

```bash
npm run export:png
```

Скрипт самостоятельно запускает Vite, открывает каждую карточку и снимает только `[data-a4-page]`. CSS-размер страницы — 210 × 297 mm; Chromium при deviceScaleFactor 2 сохраняет PNG **1588 × 2246 px**. Размер каждого файла проверяется по PNG header. При переполнении карточки экспорт завершится с ошибкой.

Файлы: `exports/png/01-master-map.png` … `exports/png/14-practice-system.png`. Имена берутся из метаданных, существующие файлы с тем же именем перезаписываются.

## PDF

```bash
npm run export:pdf
npm run export:all
```

PDF: `exports/Visual-English-B2-Course.pdf`. Экспорт использует `/print`, физический A4, нулевые поля, сохранение фона и цветов, без панели браузера и теней. Текст остаётся выделяемым HTML-текстом в PDF; схемы SVG остаются векторными. `export:all` создаёт оба формата за один запуск браузера.

Можно использовать уже запущенное приложение:

```powershell
$env:EXPORT_BASE_URL = 'http://localhost:5173'
npm run export:all
```

Опционально `PLAYWRIGHT_CHROMIUM_EXECUTABLE` задаёт путь к совместимому Chromium. Обычно это не требуется: используйте `npx playwright install chromium`.

## Дизайн-система

`tokens.css` содержит цвета, контрастные цвета текста для каждого акцента, spacing, radii, shadows, font sizes и системный sans-serif stack. Внешние шрифты, Tailwind, canvas и UI frameworks не используются.

Цвета: 01–03 blue; 04–05 orange; 06–07 green; 08 teal; 09–12 purple; 13–14 cyan. Красный предназначен для ошибок, жёлтый — для подсказок. `data-accent` задаёт локальный акцент и светлый фон. Текст использует более тёмный `--accent-ink`, чтобы яркие декоративные цвета не снижали читаемость.

`A4Page` всегда имеет физический размер 210 × 297 mm и поля 15 mm. `PagePreview` через ResizeObserver масштабирует всю страницу по ширине и высоте окна. Внутренний layout фиксирован: ни одна mobile media query не меняет композицию карточки. Header/footer одинаковы на всех страницах, footer закреплён общей flex-композицией. Переполнение намеренно не скрывается: проверка должна обнаружить ошибку, а не обрезать содержание.

`.page-grid` — 12 колонок. По умолчанию блок занимает всю ширину. Классы `span-4`, `span-6`, `span-8`, `span-12` задают ширину блока; `.two-column` — две равные колонки. Размеры шрифта на A4 задавайте через tokens, а не viewport units.

Компоненты доступны из `src/components/index.ts`:

| Компонент | Назначение / основные props |
| --- | --- |
| A4Page | `cardId`, `accent`, `children` |
| CourseHeader | `card`, optional `secondaryLabel` |
| CourseFooter | `card`, навигация из metadata |
| Section | `title`, optional `label`, `className`, `children` |
| MainIdeaBox | `children`, optional `label`, `accent` |
| ExampleCard | `english`, `explanation`, optional `accent` |
| ComparisonBlock | `left`, `right`, optional подписи |
| MistakeBox | `wrong`, `correct`, optional `explanation` |
| PracticeBox | `question`, optional `options`, `children`, статический `answer` |
| StepFlow | `steps` — массив HTML/React блоков |
| DecisionTree | `question`, `branches: { id, label, content }[]` |
| Timeline | `points: { id, label, note? }[]`, optional `activeId` |
| FlowArrow | `direction: right / down`, SVG |
| StageBadge | `stage`, optional `label` |
| Label | `children`, `tone: neutral / accent / hint` |
| IconBadge | `label`, SVG в `children`, optional `accent` |

FlowArrow, StepFlow и Timeline содержат SVG без растеризации текста. DecisionTree использует HTML и CSS для простых ветвлений. Длинные диаграммы нужно проектировать под доступную ширину A4; автоматического сжатия шрифта нет. SVG-иконки передавайте без лишнего доступного имени: его уже задаёт IconBadge.

## Как редактировать карточку

1. Откройте её отдельный файл, например `src/cards/Card01MasterMap.tsx`.
2. Редактируйте существующую композицию, сохранив оболочку:

```tsx
import { A4Page, CourseHeader, CourseFooter, Section } from '../components';
import { getCourseCard } from '../data/courseCards';

export function Card01MasterMap() {
  const card = getCourseCard(1)!;
  return (
    <A4Page cardId={card.id} accent={card.accent}>
      <CourseHeader card={card} />
      <div className="page-content page-grid">
        <Section title="Название блока">Содержание по спецификации</Section>
      </div>
      <CourseFooter card={card} />
    </A4Page>
  );
}
```

3. Метаданные карточки находятся в `courseCards.ts`. Не дублируйте названия, номера, акценты или slug внутри компонентов.
4. Используйте готовые блоки и общий CSS. Для уникальной схемы добавьте локальный CSS Module; не меняйте общую основу ради одного layout.
5. Проверьте `npm run check:pages` и `npm run export:all`. Не уменьшайте текст и не обрезайте страницу, чтобы скрыть переполнение.

Beginner → B2 содержит 14 страниц. Новые курсы регистрируются отдельно в `src/courses/courseRegistry.ts`; viewer получает карточки и прогресс из текущего курса. Toolkit имеет собственные реестры и веб-страницы и не входит в экспорт курса.

## Проверка в браузере

```bash
npm run check:pages
npm run check:viewer
npm run check:progress
npm run check:platform
npm run check:toolkit
```

Проверяются все маршруты, header titles, ссылки предыдущая/следующая, A4 ratio, переполнение, gallery, поведение back, мобильное вписывание без изменения внутренних размеров и print CSS. Скриншоты сохраняются в `output/playwright/`. После добавления учебного контента также просмотрите PNG и PDF визуально: автоматическая проверка границ не заменяет редакторскую проверку композиции.

`node_modules`, `dist`, `exports`, `output`, `tmp`, `.playwright-cli` и локальные `.env` исключены из Git. Исходники и `package-lock.json` хранятся в репозитории; экспорты создаются локально командами выше.
