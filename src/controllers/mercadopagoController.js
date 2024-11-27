const {client, Preference} = require ('../mp/mercadopagoConfig');

const createOrderController = async (items) => {
    try {
        const preference = await new Preference(client).create({
            body : {
                items: [
                    {
                    id: '123',
                    title: 'BOCA KPO 123',
                    quantity: 1,
                    unit_price: 2500
                }
                ],
                metadata : {
                    custom_id: 'ABC123'
                }
            }
        });

        return preference.init_point;
        
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { createOrderController };
