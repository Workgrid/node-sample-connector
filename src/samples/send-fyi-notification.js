import WorkgridSDK from '@workgrid/sdk'
import GenericCardBuilder from './sample-card-builders/generic-card'
import * as locationConstants from './sample-card-builders/constants/locations'
import * as categoryConstants from './sample-card-builders/constants/categories'

export default class SendFyiNotification {
    static async sendCard(wgClient, userEmail) {
        const card = new GenericCardBuilder.Builder('Check this out', userEmail)
            .withLocation(locationConstants.TOKNOW)
            .withCategory(categoryConstants.PRODUCTIVITY)
            .withBody('Please check out this link to be more productive.')
            .withOpenUrlAction('Click Here', 'https://workgrid.com', 'link')
            .withOpenUrlOnCardClick('https://workgrid.com')
            .build()
    try {
        const response = await wgClient.notifications.create(card)
        console.log('Successfully created an FYI card', response)
    } catch (e) {
        console.log(JSON.stringify(e.response.data, null, 2))
    }
    }
}

