import { cloneDeep } from 'lodash'
import * as locationConstants from './constants/locations'
import * as categoryConstants from './constants/categories'

const VALID_CATEGORIES = Object.values(categoryConstants)
const VALID_LOCATIONS = Object.values(locationConstants)

export default class GenericCard {
    constructor(config) {
        Object.assign(this, cloneDeep(template))

        this.metadata.audience.push(addEmailAudience(config.audience))
        this.metadata.location = config.location || 'toknow'
        this.metadata.category = config.category || categoryConstants.GENERAL_ANNOUNCMENT

        this.card.body = config.body || ''
        this.card.title = config.title
        this.card.actions.push(...config.actions)

        if ( config.onclick && typeof config.onclick ==='string' ) {
            this.card.detail = {url: config.onclick}
        } else if ( config.onclick && typeof config.onclick === 'object' ) {
            this.card.detail = config.onclick
        }
        
    }

    static get Builder() {
        class Builder {
            constructor(title, receipientEmail) {
                this.title = title
                this.audience = receipientEmail
                this.actions = []
            }

            withBody(body) {
                this.body = body
                return this
            }

            withLocation(location) {
                if(VALID_LOCATIONS.includes(location)) {
                    this.location = location
                }
                return this
            }

            withCategory(category) {
                if(VALID_CATEGORIES.includes(category)) {
                    this.category = category
                }
                return this
            }

            withOpenUrlAction(actionName, url, actionStyle) {
                this.actions.push(createOpenAction(actionName, url, actionStyle))
                return this
            }

            withSubmitAction(actionName, actionStyle, additionalAttributes) {
                this.actions.push(createSubmitAction(actionName, actionStyle, additionalAttributes))
                return this
            }
            withOpenUrlOnCardClick(url) {
                this.onclick = url
                return this
            }
            withOpenCardOnCardClick(card) {
                this.onclick = card
                return this
            }
            
            build() {
                return new GenericCard(this)
            }
        }
        return Builder
    }
}
function addEmailAudience(email) {
    return {
        type: "email",
        value: email
    }
}

function createOpenAction(name, url, style) {
    return {
        type: "Action.OpenUrl",
        title: name,
        color: style,
        url
      }
}

function createSubmitAction(name, style, props) {
    return {
        type: "Action.Submit",
        title: name,
        color: style,
        data: {
            action: name,
            ...props
        }
      }
}



const template = {
    "metadata": {
        "location": "",
        "audience": [],
        "category": "",
        "startDisplayTimestamp": "2017-10-11T00:00:00.000Z",
        "endDisplayTimestamp": "2019-12-17T00:00:00.000Z"
    },
    "card": {
        "title": "",
        "body": "",
        "image": {
            "altText": "Spreadsheet Logo",
            "url": "https://workgrid.com/workgrid-assistant-img/chart-bar.png"
        },
        "detail": {
        	"url": "https://www.workgrid.com"
        },
    "actions": []
    }
}