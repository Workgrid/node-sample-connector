import WorkgridSDK, { EVENTS } from '@workgrid/sdk'

export default class ProcessEvents {
    static async processEvents(wgClient) {
        try {
            console.log('Fetching unprocessed events')
            const response = await wgClient.events.list({ filter: 'unprocessed' })
            console.log('Raw unprocessed events:', JSON.stringify(response.data, null, 2))

            const events = response.data
            console.log(`Received ${events.length} events to process`)
            
            for(let i = 0; i < events.length; i++) {
                const event = events[i]
                console.log(`User ${event.actor.email} took action '${event.data.action}' on card ${event.id}. Update source system.`)
                wgClient.events.updateStatus(event.id, EVENTS.STATUS.PROCESSED)
                console.log('\tMarked event as processed.')
            }

        } catch (e) {
            console.log('Unable to fetch events from workgrid.', e)
        }
    }
}