import _ from "lodash";
import {dayjs, formatNumber} from "../../utils/utils";
import {ILot, LotStatus} from "../../types";

import {Model} from "../base/Model";

export type CatalogChangeEvent = {
    catalog: LotItem[]
};


//модель данных одного элемента
export class LotItem extends Model<ILot> {
    about: string;
    description: string;
    id: string;
    image: string;
    title: string;
    datetime: string;
    history: number[];
    minPrice: number;
    price: number;
    status: LotStatus;

    protected myLastBid: number = 0;

    clearBid() {
        this.myLastBid = 0;
    }

    placeBid(price: number): void {
        this.price = price;
        this.history = [...this.history.slice(1), price];
        this.myLastBid = price;

        if (price > (this.minPrice * 10)) {
            this.status = 'closed';
        }
        this.emitChanges('auction:changed', { id: this.id, price });
    }

    get isMyBid(): boolean {
        return this.myLastBid === this.price;
    }

    get isParticipate(): boolean {
        return this.myLastBid !== 0;
    }

    get statusLabel(): string {
        switch (this.status) {
            case "active":
                return `Открыто до ${dayjs(this.datetime).format('D MMMM [в] HH:mm')}`
            case "closed":
                return `Закрыто ${dayjs(this.datetime).format('D MMMM [в] HH:mm')}`
            case "wait":
                return `Откроется ${dayjs(this.datetime).format('D MMMM [в] HH:mm')}`
            default:
                return this.status;
        }
    }

    get timeStatus(): string {
        if (this.status === 'closed') return 'Аукцион завершен';
        else return dayjs
            .duration(dayjs(this.datetime).valueOf() - Date.now())
            .format('D[д] H[ч] m[ мин] s[ сек]');
    }

    get auctionStatus(): string {
        switch (this.status) {
            case 'closed':
                return `Продано за ${formatNumber(this.price)}₽`;
            case 'wait':
                return 'До начала аукциона';
            case 'active':
                return 'До закрытия лота';
            default:
                return '';
        }
    }

    get nextBid(): number {
        return Math.floor(this.price * 1.1);
    }
}

