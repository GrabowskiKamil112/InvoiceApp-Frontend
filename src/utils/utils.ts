import { Invoice } from './../Types/Invoice';
import theme from '../theme/theme'
import { ItemsListEntity } from '../Types/Invoice'
import { AxeloteQueryBuilder } from '@axelote/js';

export const themeNavigator = (path: string): string => {
    return path.split('.').reduce<any>((a, b) => {
        return a && a[b]
    }, theme)
}

export const generateInfo = (invoiceFilter: string, amount = 1): string => {
    return `There ${amount > 1 ? 'are' : 'is'} ${amount} ${invoiceFilter} ${
        amount > 1 ? 'invoices' : 'invoice'
    }`
}

export const mapInvoiceToStore = (invoiceContent: Invoice): Invoice => {
    invoiceContent._id = invoiceContent.invoiceId;
    delete invoiceContent.invoiceId;
    return invoiceContent;
}

export const appendQuery = (isLast: boolean, key: string, qb: AxeloteQueryBuilder): void => {
    if(isLast){

        switch (key) {
            case 'payment_term': qb.append('@sql payment_term = :payment_term '); break;
            case 'description': qb.append('@sql description = :description '); break;
            case 'invoice_date': qb.append('@sql invoice_date = :invoice_date '); break;
            case 'address_from': qb.append('@sql address_from = :address_from '); break;
            case 'address_to': qb.append('@sql address_to = :address_to '); break;
            case 'type': qb.append('@sql type = :type '); break;
            //case 'name': qb.append('@sql name = :name '); break;
            //case 'price': qb.append('@sql price = :price '); break;
            //case 'quantity': qb.append('@sql quantity = :quantity '); break;
        }

    }else{

        switch (key) {
            case 'payment_term': qb.append('@sql payment_term = :payment_term, '); break;
            case 'description': qb.append('@sql description = :description, '); break;
            case 'invoice_date': qb.append('@sql invoice_date = :invoice_date, '); break;  
            case 'address_from': qb.append('@sql address_from = :address_from, '); break;
            case 'address_to': qb.append('@sql address_to = :address_to, '); break;
            case 'type': qb.append('@sql type = :type, '); break;
            //case 'name': qb.append('@sql name = :name, '); break;
            //case 'price': qb.append('@sql price = :price, '); break;
            //case 'quantity': qb.append('@sql quantity = :quantity, '); break;
        }

    }
}

export const mapData = (data: Array<Invoice> | Invoice, itemsData?: Array<ItemsListEntity>): void => {
    data = Array.isArray(data) ? data : [data];
    
    data.forEach(e => {
        if(e.addressFrom) e.from = JSON.parse(e.addressFrom.replaceAll('\\',''));
        if(e.addressTo) e.to = JSON.parse(e.addressTo.replaceAll('\\',''));
        if(e.paymentTerm) e.payment_term = e.paymentTerm;
        delete e.addressFrom;
        delete e.addressTo;
        
        if( itemsData ){
            e.items_list = itemsData.map(item => {
                return {
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    itemId: item.itemId
                }
            })
        }
    });
}

export const mapDataToSend = (data: Invoice, toSend?: boolean): ItemsListEntity[] => {
    if(data.from) data.address_from = JSON.stringify(data.from);
    if(data.to) data.address_to = JSON.stringify(data.to);
    delete data.from;
    delete data.to;
    delete data._id;

    const copy = structuredClone(data);
    delete data.items_list;
    
    return copy.items_list ? copy.items_list.map(item => {
        return {
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            ...(!toSend && {itemId: item.itemId})
        }
    }) : []; 
}

export const getTotalPriceOfItemInForm = (item: ItemsListEntity): string => {
    const { price, quantity } = item || {}
    const numRegex = /(?!^0*$)(?!^0*\.0*$)^\d{1,5}(\.\d{1,2})?$/

    if (price && quantity && [price, quantity].every((s) => s.match(numRegex))) {
        return (parseFloat(quantity) * parseFloat(price)).toFixed(2) + '$'
    }
    return 'NaN'
}

export function calculateTotalOfItem(quantity?: string, price?: string): number {
    if (quantity && price) {
        const result = parseFloat(price) * parseFloat(quantity)
        return parseFloat(result.toFixed(2))
    }

    return 0
}

export function calculateTotalOfInvoice(items: ItemsListEntity[]): number {
    const totalAmount = items.reduce((acc, { price, quantity }) => {
        return (acc += calculateTotalOfItem(quantity, price))
    }, 0)

    return parseFloat(totalAmount.toFixed(2))
}

export function addCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function getWindowWidth(): number {
    return window.innerWidth
}
