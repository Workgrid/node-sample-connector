import { cloneDeep } from 'lodash'

export default class FyiCard {
    constructor(config) {
        Object.assign(this, cloneDeep(template))

        this.metadata.audience.push(addEmailAudience(config.audience))
        this.card.body = config.body
        this.card.title = config.title
        config.actions.forEach(action => {
            this.card.actions.push(addOpenAction(action.actionName, action.actionStyle, action.url))
        })
    }

    static get Builder() {
        class Builder {
            constructor(title, audience) {
                this.title = title
                this.audience = audience
                this.actions = []
            }

            withBody(body) {
                this.body = body
                return this
            }

            withAction(actionName, actionStyle, url) {
                this.actions.push({actionName, actionStyle, url})
                return this
            }
            
            build() {
                return new FyiCard({
                    title: this.title,
                    audience: this.audience,
                    body: this.body,
                    actions: this.actions
                })
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

function addOpenAction(name, url, style) {
    return {
        type: "Action.OpenUrl",
        title: name,
        color: style,
        url
      }
}

const template = {
    "metadata": {
        "location": "toknow",
        "audience": [],
        "category": "Social",
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