import "./scss/styles.scss";
 
 import { CDN_URL, API_URL } from "./utils/constants";
 import { ensureElement } from "./utils/utils";
 import { EventEmitter } from "./components/base/events";
 import { IShippingDetails, IContacts, IProduct } from "./types";
 import { ApiModel } from "./components/models/ApiModel";
 import { BasketModel } from "./components/models/BasketModel";
 import { FormModel } from "./components/models/FormModel";
 import { ProductListModel } from "./components/models/ProductListModel";
 import { CardModalView } from "./components/views/CardModalView";
 import { CardListView } from "./components/views/CardListView";
 import { BasketView } from "./components/views/BasketView";
 import { ContactsFormView } from "./components/views/ContactsFormView";
 import { ModalView } from "./components/views/ModalView";
 import { OrderFormView } from "./components/views/OrderFormView";
 import { SuccessfulOrderView } from "./components/views/SuccessfulOrderView";
 import { CardView } from "./components/views/CardView";
 import { BasketItemView } from "./components/views/BasketItemView";
 
 const modalContainer: HTMLElement =
 	ensureElement<HTMLElement>("#modal-container");
 const cardCatalogTemplate: HTMLTemplateElement =
 	ensureElement<HTMLTemplateElement>("#card-catalog");
 const cardModalTemplate: HTMLTemplateElement =
 	ensureElement<HTMLTemplateElement>("#card-preview");
 const basketTemplate: HTMLTemplateElement =
 	ensureElement<HTMLTemplateElement>("#basket");
 const catalogBasketTemplate: HTMLTemplateElement =
 	ensureElement<HTMLTemplateElement>("#card-basket");
 const orderTemplate: HTMLTemplateElement =
 	ensureElement<HTMLTemplateElement>("#order");
 const contactsTemplate: HTMLTemplateElement =
 	ensureElement<HTMLTemplateElement>("#contacts");
 const successfulOrderTemplate: HTMLTemplateElement =
 	ensureElement<HTMLTemplateElement>("#success");
 const cardsCatalog: HTMLElement = ensureElement<HTMLElement>(".gallery");
 
 const apiModel = new ApiModel(CDN_URL, API_URL);
 const events = new EventEmitter();
 const productListModel = new ProductListModel(events);
 const modal = new ModalView(modalContainer, events);
 const basket = new BasketView(basketTemplate, events, catalogBasketTemplate, BasketItemView);
 const basketModel = new BasketModel();
 const formModel = new FormModel(events);
 const order = new OrderFormView(orderTemplate, events);
 const contacts = new ContactsFormView(contactsTemplate, events);
 const cardList = new CardListView(cardsCatalog, events, cardCatalogTemplate, CardView);
 

//вывод собый в консоль для отслеживания 
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

 events.on("products:set", () => {
 	cardList.render(productListModel.productCards);
 });
 

 //открыто окно уже добавленной в корзину карточки 
 events.on("card:select", (item: IProduct) => {
 	productListModel.showCard(item);
 });
 

 //открыто модальное окно
 events.on("cardModal:open", (item: IProduct) => {
 	const cardPreview = new CardModalView(cardModalTemplate, events);
 	modal.content = cardPreview.render(item);
 	if (basketModel.basketProducts.indexOf(item) !== -1 || item.price == null) {
 		cardPreview.toggleButtonDisability(true);
 	} else {
 		cardPreview.toggleButtonDisability(false);
 	}
 	modal.open();
 });
 
 //добавление товара в корзину 
 events.on("card:addToBasket", () => {
 	basketModel.addToBasket(productListModel.selectedCard);
 	basket.renderHeaderBasketCounter(basketModel.getAmount());
 	modal.close();
 });
 
 //открыта корзина
 events.on("basket:open", () => {
 	basket.renderTotalCost(basketModel.getTotalCost());
 	basket.renderItems(basketModel.basketProducts);
 	modal.content = basket.render();
 	modal.open();
 });
 

 //удаление товара из корзины 
 events.on("basket:removeFromBasket", (item: IProduct) => {
 	basketModel.deleteFromBasket(item);
 	basket.renderHeaderBasketCounter(basketModel.getAmount());
 	basket.renderTotalCost(basketModel.getTotalCost());
 	basket.renderItems(basketModel.basketProducts);
 });
 
 //открыта форма оформления заказа
 events.on("orderForm:open", () => {
 	modal.content = order.render();
 	modal.open();
 	formModel.items = basketModel.basketProducts.map((item) => item.id);
 });
 

 //выбран способ оплаты
 events.on("orderForm:paymentSelection", (button: HTMLButtonElement) => {
 	formModel.payment = button.name;
 	formModel.validateOrder("payment");
 });
 
 //изменен адрес доставки 
 events.on("orderForm:changeAddress", (data: { field: string; value: string }) => {
 		formModel.setOrderData(data.field, data.value);
 	}
 );
 
 events.on("formErrors:shipping", (errors: IShippingDetails) => {
 	const { address, payment } = errors;
 	order.toggleButtonDisability(!address && !payment);
 	order.formErrors.textContent = Object.values({ address, payment })
 		.filter((i) => !!i)
 		.join("; ");
 });
 
 //открыта форма ввода данных 
 events.on("contactsForm:open", () => {
 	formModel.total = basketModel.getTotalCost();
 	modal.content = contacts.render();
 	modal.open();
 });
 
 //изменения в форме контактных данных 
 events.on("contactsForm:changeContacts", (data: { field: string; value: string }) => {
 		formModel.setOrderData(data.field, data.value);
 	}
 );
 
 //форма ввода контактных данных некорректны 
 events.on("formErrors:contacts", (errors: IContacts) => {
 	const { email, phone } = errors;
 	contacts.toggleButtonDisability(!email && !phone);
 	contacts.formErrors.textContent = Object.values({ phone, email })
 		.filter((i) => !!i)
 		.join("; ");
 });
 

 //открыто окно успешно оформленного заказа 
 events.on("successfulOrder:open", () => {
 	apiModel
 		.getOrderResult(formModel.getOrderData())
 		.then((data) => {
 			console.log(data);
 			const success = new SuccessfulOrderView(
 				successfulOrderTemplate,
 				events
 			);
 			modal.content = success.render(basketModel.getTotalCost());
 			basketModel.clearBasket();
 			basket.renderHeaderBasketCounter(basketModel.getAmount());
 			modal.open();
 		})
 		.catch((error) => console.log(error));
 });
 
//закрыто окно успешно оформленного заказа 
 events.on("successfulOrder:close", () => modal.close());
 
 //открыто модальное окно 
 events.on("modal:open", () => {
 	modal.locked = true;
 });
 
 //закрыто модальное окно 
 events.on("modal:close", () => {
 	modal.locked = false;
 });
 
 apiModel
 	.fetchProducts()
 	.then(function (data: IProduct[]) {
 		productListModel.productCards = data;
 	})
 	.catch((error) => console.log(error));