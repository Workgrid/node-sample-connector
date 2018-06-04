import WorkgridSDK from '@workgrid/sdk'
import ApprovalCardBuilder from './sample-card-builders/approval-card'

export default class SendApprovalNotification {
    static async sendCard(wgClient) {

        const card = new ApprovalCardBuilder.Builder('My Approval', 'douglas.mackinnon@libertymutual.com')
            .withBody('Please approve this card')
            .withAction('Approve', 'good', null)
            .withAction('Reject', 'attention', null)
            .build()

        const response = await wgClient.notifications.create(card)
        console.log('Successfully created an approval card', response)
    }
}