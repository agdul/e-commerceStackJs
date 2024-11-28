const {client, Preference} = require ('../mp/mercadopagoConfig');

const createOrderController = async (items) => {
    try {
        const preference = await new Preference(client).create({
            body : {
                items,
                metadata : { //metadata: info adicinal que nosotros queramos mandar
                    custom_id: 'ABC123',
                    order_details: items.map(items => ({
                        title: items.title,
                        quantity: items.quantity,
                        currency_id: 'ARS',
                        unit_price: items.price
                    }))
                }
            }
        });

        return {init_point: preference.init_point, order_details: preference.body };
        
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { createOrderController };
