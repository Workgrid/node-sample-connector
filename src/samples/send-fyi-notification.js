import WorkgridSDK from '@workgrid/sdk'
import FyiCardBuilder from './sample-card-builders/fyi-card'

export default class SendFyiNotification {
    static async sendCard(wgClient, userEmail) {
        const card = new FyiCardBuilder.Builder('Check this out', userEmail)
            .withBody('Please check out this link')
            .withAction('Click Here', 'https://workgrid.com', 'link')
            .build()
    
        const response = await wgClient.notifications.create(card)
        console.log('Successfully created an FYI card', response)
    }
}