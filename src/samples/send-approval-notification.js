import WorkgridSDK from '@workgrid/sdk'
import GenericCardBuilder from './sample-card-builders/generic-card'
import * as locationConstants from './sample-card-builders/constants/locations'
import * as categoryConstants from './sample-card-builders/constants/categories'

export default class SendApprovalNotification {
    static async sendCard(wgClient, userEmail) {

        try {
            const approvalCard = new GenericCardBuilder.Builder('My Approval', userEmail)
                .withLocation(locationConstants.TODO)
                .withCategory(categoryConstants.APPROVAL)
                .withBody('Please approve this card')
                .withSubmitAction('Approve', 'good', null)
                .withSubmitAction('Reject', 'attention', null)
                .build()

            console.log('Sending card to Workgrid', JSON.stringify(approvalCard, null, 2))

            const response = await wgClient.notifications.create(approvalCard)
            console.log('Successfully created an approval card', response)
        } catch (e) {
            console.log(JSON.stringify(e.response.data, null, 2))
        }
    }
}