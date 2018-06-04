import WorkgridSDK from '@workgrid/sdk'
import FyiCardBuilder from './sample-card-builders/fyi-card'

export default class SendFyiNotification {
    static async sendCard(wgClient) {
        const card = new FyiCardBuilder.Builder('Check this out', 'douglas.mackinnon@libertymutual.com')
            .withBody('Please check out this link')
            .withAction('Click Here', 'https://workgrid.com', 'link')
            .build()
    
        const response = await wgClient.notifications.create(card)
        console.log('Successfully created an approval card', response)
    
    }
}