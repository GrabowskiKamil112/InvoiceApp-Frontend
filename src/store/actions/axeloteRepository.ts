import { AxeloteQueryBuilder, AxeloteRepository } from "@axelote/js";
import { appendQuery } from "../../utils/utils";

export const repository: AxeloteRepository = new AxeloteRepository();

repository.set('updateInvoice', (params: Record<string, any>) => {

    const qb: AxeloteQueryBuilder = AxeloteQueryBuilder.query('@sql update invoices set');

    for (const [index, [key, _value]] of Object.entries(Object.entries(params))) {
        appendQuery(Number(index) == Object.entries(params).length - 1, key, qb);
    }

    qb.append('@sql where invoice_id = :invoice_id');

    return qb.build(); 
});

// repository.set('updateItem', (params: Record<string, any>) => {

//     const qb: AxeloteQueryBuilder = AxeloteQueryBuilder.query('@sql update items set');

//     for (const [index, [key, _value]] of Object.entries(Object.entries(params))) { 
//         appendQuery(Number(index) == Object.entries(params).length - 1, key, qb);
//     }

//     qb.append('@sql where item_id = :item_id');

//     return qb.build(); 
// });

repository.set('updateItem', "@sql UPDATE items set name = :name, price = :price, quantity = :quantity where item_id = :item_id");

repository.set('getShortInvoices', (params: Record<string, any>) => {

    const qb: AxeloteQueryBuilder = AxeloteQueryBuilder.query('@sql select invoice_id, address_to, type, payment_term from invoices where user_id = :user_id');

    if (params.type !== 'total') qb.append('@sql and type = :type');

    qb.append('@sql order by invoice_id');
    
    return qb.build(); 
});

repository.set('createInvoice', "@sql INSERT into invoices (invoice_id, user_id, type, invoice_date, address_from, address_to, payment_term, description) VALUES(nextval('id_sequence'), :user_id, :type, :invoice_date, :address_from, :address_to, :payment_term, :description) returning invoice_id");

repository.set('createItem', "@sql INSERT into items (name, price, quantity, invoice_id) VALUES (:name, :price, :quantity, :invoice_id)");

repository.set('getInvoiceDetails', '@sql select * from invoices where invoice_id = :invoice_id');

repository.set('getInvoiceItems', '@sql select * from items where invoice_id = :invoice_id');

repository.set('markAsPaid', "@sql UPDATE invoices set type = 'paid' where invoice_id = :invoice_id");

repository.set('deleteInvoice', '@sql DELETE FROM invoices WHERE invoice_id = :invoice_id');

