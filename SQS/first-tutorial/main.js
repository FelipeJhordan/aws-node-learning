
(async () => {
    require('dotenv').config();
    const publisherOneTime = require('./pub');
    const subscriber = require('./sub')

 
    try {
        const result = await publisherOneTime.sendMessage({ id: 1, action: 'x' });
        setTimeout(() => {}, 1000)
        
        await  subscriber.subMessage()
    } catch (error) {
        console.log(`ERRO: ${error}`);
    }
})();