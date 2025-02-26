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

//Model

export interface ProductList{ 
    total: number,
    items: IProduct[]
}

export type PaymentMethod = 'Онлайн' | 'При получении'

export interface IUser {
    payment: PaymentMethod;
    address: string;
    email: string;
    phone: string;

    setPaymentType(payment: PaymentMethod): void;
    setAddress(address: string): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
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

//Presentor

export type EventName = string | RegExp;

export type Subscriber = Function;

export type EmitterEvent = {
    eventName: EventName,
    data: unknown
};

export interface IEvents {
    //т.е. на событие event подписывается функция 
    on<T extends object>(event: EventName, callback: (data: T) => void): void;

    //при возникновении события event вызываюстя все функции, подписаные на него
    emit<T extends object>(event: string, data?: T): void;


    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}


//view

export interface IView {
    _content: HTMLElement;

    constructor(content: HTMLElement): void;
    render(data?: object): HTMLElement;
}

export type BuyButtonState = 'disabled' | 'already' | 'able';

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

export type FormError = 'address' | 'email' | 'phone'

export interface IForm {
    _isValid: boolean;
    _content: HTMLElement;
    _errors: FormError[];
    
    checkValidity(): boolean;
    getErrors(): FormError[];
}

export interface IModalForm extends IModal {
    form: IForm;
}

