import { cloneDeep } from 'lodash'
export default class ApprovalCard {

    constructor(config) {
        Object.assign(this, cloneDeep(template))
        
        this.metadata.audience.push(addEmailAudience(config.audience))
        this.card.body = config.body
        this.card.title = config.title
        config.actions.forEach(action => {
            this.card.actions.push(addAction(action.actionName, action.actionStyle, action.additionalAttributes))
        })
        
    }

    static get Builder() {
        class Builder {
            constructor(title, audience) {
                this.title = title
                this.audience = audience
                this.actions = []
            }
            withAction(actionName, actionStyle, additionalAttributes) {
                this.actions.push({actionName, actionStyle, ...additionalAttributes})
                return this
            }
            withBody(body) {
                this.body = body
                return this
            }
            build() {
                return new ApprovalCard({
                    title: this.title,
                    audience: this.audience,
                    actions: this.actions,
                    body: this.body
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

function addAction(name, style, props) {
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
        "location": "todo",
        "audience": [ ],
        "category": "Approval",
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