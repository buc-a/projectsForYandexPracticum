# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Архитектура проекта
Приложение построено по паттерну Model-View-Presenter (MVP) с использованием брокера событий для связи между модулями.

## Данные
### Товар (Product)
Объект, содержащий информацию о товаре, полученную из API. Включает название, описание, изображение, цену и категорию.

### Заказ (Order)
Объект, содержащий информацию о заказе,отправленный в API. Включает способ оплаты, эл. почту, номер телефона, адрес, суммарную стоимость и список товаров к заказу.


## Компоненты модели

### Список товаров в каталоге (Catalog)
Представляет собой перечень всех доступных товаров. Содержит общее количество товаров и массив объектов товаров.

### Информация о пользователе (User)
Хранит данные о покупателе, включая адрес доставки, электронную почту, номер телефона и способ оплаты. Предоставляет методы для обновления этих данных.

### Список товаров в корзине (Basket)
Отвечает за хранение товаров, добавленных пользователем в корзину. Поддерживает операции добавления и удаления товаров из корзины.

## Компоненты представления 
### Попап карточки товара (Product Popup)
Отображает детальную информацию о товаре, включая описание, цену, изображение и кнопки "Купить" и "Закрыть".

### Карточка товара в каталоге (Catalog Item)
Представляет товар в каталоге. Содержит категорию, название, цену и изображение.

### Карточка товара в корзине (Basket Item)
Отображает товар, добавленный в корзину, включая название, цену, порядковый номер и кнопку удаления.

### Модальное окно корзины (Basket Modal)
Показывает содержимое корзины, общую стоимость товаров, а также кнопки "Закрыть" и "Оформить заказ".

### Модальное окно формы оплаты (Payment Modal)
Содержит форму с выбором способа оплаты, полем для ввода адреса доставки, кнопками "Далее" и "Закрыть".

### Модальное окно успешного оформления заказа (Success Modal)
Показывает подтверждение успешного заказа, сумму списанных денег, а также кнопки возврата к каталогу и закрытия окна.

## Компоненты презентера (Presenter)
### Брокер событий (EventEmitter)
Позволяет подписывать функции на события, уведомлять подписчиков и генерировать новые события. Используется для связи между различными частями приложения.


## Ключевые типы данных
```


export interface IProduct{
    id: string,
    description: string,
    image: string,
    title: string
    category: string,
    price: number | null
}

export interface IOrder{
    
    payment: PaymentMethod,
    email: string,
    phone: string,
    address: string,
    total: 2200,
    items: ProductList
}

//Список товаров
export interface ProductList{ 
    total: number,
    items: IProduct[]
}

//товары в каталоге
export interface ICatalog extends ProductList {
    constructor(products?: ProductList): void;
    refill(products: ProductList): void;
}

//товары в корзине
export interface IBasket extends ProductList {
    add(): void;
    remove(id: string): void;
    clear(): void;
    calcTotalSum(): number;
}

export interface IView {
    _content: HTMLElement;

    constructor(content: HTMLElement): void;
    render(data?: object): HTMLElement;
}

//отображение карточки 
export interface ICard extends IView {
    _data: ProductList;

    setProduct(data: ProductList): void;    
}

//отображение карточки в корзине
export interface IBusketItem extends ICard {
    onRemove(): void;
}

//модальные окна 
export interface IModal extends IView {
    onOpen(): void;
    onClose(): void;
}

/брокер
export interface IEvents {

    on<T extends object>(event: EventName, callback: (data: T) => void): void;

    emit<T extends object>(event: string, data?: T): void;

    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```
