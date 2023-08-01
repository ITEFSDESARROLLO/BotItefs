const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')




const flowSecundario = addKeyword(['0', 'menu'])
const flowDocs = addKeyword(['1']).addAnswer(
    [
        '🖥️ Estaremos atendiendo tu solictud',
        'Dejanos tu información',
        '1.Nombre',
        '2.Cargo',
        '3.Requerimiento',
        '\n*0* Para ir al menu.',
    ],
    null,
    null,
    [flowSecundario]
)



const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*0* Para ir al menu.',
    ],
    null,
    null,
    [flowSecundario]
)

const telefonoContacto = '3117259636'; // Aquí debes reemplazar con el número de teléfono al que deseas que se envíen los mensajes.

const flowGracias = addKeyword(['2', 'grac']).addAnswer(
    [
        '🚀 Bienvenido a administracion',
        `[Contactar por WhatsApp](https://wa.me/${telefonoContacto})`,
        '\n*0* Para ir al menu.',
    ],
    null,
    null,
    [flowSecundario]
);


const flowDiscord = addKeyword(['3']).addAnswer(
    ['Conoces nuestros servicios', 'https://itefs.com/','Conoce nuestro portafolio',
    'https://drive.google.com/file/d/1llTfuxUP88qqg28qxGWpoO-lAdCevrLl/view?usp=sharing','\n*0* Para ir al menu.'],
    null,
    null,
    [flowSecundario]
)



const flowPrincipal = addKeyword(['0','hola', 'Buenos dias', 'Buen dia','menu','Hola','ola','Buenas tardes','buenas tardes','buenos dias','buenas noches','Buenas noches','como estas'])
    .addAnswer('🚀 Hola Bienvenidos a nuestro canal de Soporte Itefs Sas')
    .addAnswer('*Te recordamos que ItefsBot se encuentra en Fase de desarrollo*')
    .addAnswer(
        [
            'Soy itefsbot en que podemos ayudarte!',
            '📋 *1* Soporte Tecnico',
            '👨‍💻 *2* Comunicarce con adminstracion',
            '📂 *3* Nuestros servicios',
           
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )
    

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider,{
        inactivityTimeout: 60000
    })
    
    
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
