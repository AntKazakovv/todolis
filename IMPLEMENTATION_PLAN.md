# План реализации: Быстрая смена статуса задачи

## Вариант 1: Клик по индикатору статуса

### Суть решения
Сделать цветной кружок статуса в `TaskCard` кликабельным. Клик по кружку меняет статус по кругу: `queued → in-progress → done → queued`. Клик по остальной части карточки ведет на страницу редактирования. Используется `e.stopPropagation()` для предотвращения конфликтов событий.

---

## Изменения в файлах

### 1. `src/components/TaskCard.tsx`

**Что изменить:**
- Добавить пропс `onStatusClick?: () => void` в интерфейс `TaskCardProps`
- Сделать цветной кружок статуса кликабельным
- Добавить `onClick` обработчик с `e.stopPropagation()`
- Увеличить область нажатия до 44x44px (для мобильных устройств)
- Добавить визуальную обратную связь

**Новый код индикатора статуса:**
```tsx
<div 
  className="p-3 -m-3 cursor-pointer active:scale-95 transition-transform"
  onClick={(e) => {
    e.stopPropagation()
    onStatusClick?.()
  }}
  role="button"
  tabIndex={0}
  aria-label={`Изменить статус: ${statusLabels[task.status]}`}
>
  <div className={`w-3 h-3 rounded-full ${statusColors[task.status]} transition-colors`} />
</div>
```

**Пропсы компонента:**
```tsx
interface TaskCardProps {
  task: Task
  onStatusClick?: () => void
}
```

---

### 2. `src/pages/TaskList.tsx`

**Что изменить:**
- Удалить обертку `<div onClick={() => toggleStatus(...)}>` вокруг `TaskCard`
- Передавать пропс `onStatusClick` в `TaskCard`

**Было:**
```tsx
<div key={task.id} onClick={() => toggleStatus(task.id, task.status)} className="cursor-pointer">
  <TaskCard task={task} />
</div>
```

**Станет:**
```tsx
<TaskCard 
  key={task.id}
  task={task} 
  onStatusClick={() => toggleStatus(task.id, task.status)} 
/>
```

Функция `toggleStatus` остается без изменений (строки 9-17).

---

## Детали реализации

| Элемент | Решение |
|---------|---------|
| Размер области нажатия | `p-3 -m-3` дает ~44x44px (12px кружок + 24px padding) |
| Предотвращение навигации | `e.stopPropagation()` в обработчике кружка |
| Визуальная обратная связь | `active:scale-95` + `transition-transform` |
| Доступность | `role="button"`, `tabIndex={0}`, `aria-label` |
| Анимация цвета | `transition-colors` на кружке |

---

## Порядок реализации

1. Изменить `TaskCard.tsx` — добавить пропс `onStatusClick`, обернуть индикатор в кликабельный контейнер
2. Изменить `TaskList.tsx` — убрать обертку div, передать `onStatusClick` в TaskCard
3. Проверить TypeScript: `npx tsc -b`
4. Протестировать:
   - Клик по кружку → меняется статус
   - Клик по карточке → переход на `/task/:id`
   - Клик по кружку НЕ вызывает навигацию
   - На мобильном устройстве (эмуляция) область нажатия удобная

---

## Чек-лист проверки

- [ ] Клик по цветному кружку меняет статус задачи
- [ ] Клик по остальной части карточки ведет на страницу редактирования
- [ ] При клике по кружку не происходит навигация
- [ ] Область нажатия ≥ 44x44px
- [ ] Есть визуальная обратная связь при нажатии
- [ ] Код проходит `npx tsc -b`

---

## Затронутые файлы
- `src/components/TaskCard.tsx` — добавлен пропс `onStatusClick`, изменен индикатор статуса
- `src/pages/TaskList.tsx` — убрана обертка, добавлен пропс `onStatusClick`
