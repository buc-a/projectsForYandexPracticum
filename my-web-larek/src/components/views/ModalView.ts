import { IEvents } from "../base/events";

export interface IModalView {
    open(): void;
    close(): void;
}


//отображение модального окна

export class ModalView implements IModalView {
    protected _modalContainer: HTMLElement;
 	protected _closeButton: HTMLButtonElement;
 	protected _content: HTMLElement;
 	protected _pageWrapper: HTMLElement;
 
 	constructor(modalContainer: HTMLElement, protected events: IEvents) {
        this._modalContainer = modalContainer;
        this._closeButton = modalContainer.querySelector(".modal__close");
 		this._content = modalContainer.querySelector(".modal__content");
 		this._pageWrapper = document.querySelector(".page__wrapper");
 
 		this._closeButton.addEventListener("click", this.close.bind(this));
 		this._modalContainer.addEventListener("click", this.close.bind(this));
 		this._modalContainer
 			.querySelector(".modal__container")
 			.addEventListener("click", (event) => event.stopPropagation());
            //предотвращение распространения события на другие элементы 
 	}

    //изменить напонение
    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this._modalContainer.classList.add("modal_active");
        //генерируем событие открытия окна
        this.events.emit("modal:open");
    }

    close() {
        this._modalContainer.classList.remove("modal_active");
 		this.content = null;
        //генерируем событие закрытия окна
 		this.events.emit("modal:close");
    }

    set locked(value: boolean) {
        if (value) {
            this._pageWrapper.classList.add("page__wrapper_locked");
        } else {
            this._pageWrapper.classList.remove("page__wrapper_locked");
        }
    }
}