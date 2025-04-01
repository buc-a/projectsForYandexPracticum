import {Form} from "./Form";
import {IOrderForm} from "../../types";
import {EventEmitter, IEvents} from "../base/events";
import {ensureElement} from "../../utils/utils";


//заказ 
export class Order extends Form<IOrderForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}