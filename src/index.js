import {} from 'dotenv/config'
import WorkgridSDK from '@workgrid/sdk'
import ProcessEvents from './samples/process-events'
import SendApproval from './samples/send-approval-notification'
import SendFyi from './samples/send-fyi-notification'

const scriptArgs = process.argv.slice(2);
if( scriptArgs.length !== 1) {
    throw new Error('Pass sample name as command line argument. Valid values: send-fyi, send-approval or process-events')
}
const sample = scriptArgs[0]
console.log(`Running use case '${sample}'.`)

const userEmail = process.env.USER_EMAIL
const wgClient = getWorkgridClientInstance()

switch(sample) {
    case 'send-fyi':
    SendFyi.sendCard(wgClient, userEmail)
        break;
    case 'send-approval':
        SendApproval.sendCard(wgClient, userEmail)
        break;
    case 'process-events': 
        ProcessEvents.processEvents(wgClient)
        break;
    default:
        console.log('Sample does not exist.')
}

function validateRequiredEnvVars(requiredVars) {
    requiredVars.forEach(envVar => {
        if (!process.env[envVar]){
            throw new Error(`Required environment variable '${envVar}' is not set.`)
        }
    })
}

function getWorkgridClientInstance() {
    validateRequiredEnvVars(['CLIENT_ID', 'CLIENT_SECRET', 'BASE_API_URL', 'TOKEN_URL', 'USER_EMAIL'])

    const config = {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        apiUrl: process.env.BASE_API_URL,
        tokenUrl: process.env.TOKEN_URL
    }
    
    return new WorkgridSDK(config)
}