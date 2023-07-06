import {useLatestMessages, useMessageArchive, useMessages, usePendingRecipients} from "../hooks/use-messages";
import {
    FormTokenField,
    PanelBody,
    TextareaControl,
    TextControl,
    ToggleControl,
    Spinner,
    Button, CheckboxControl
} from "@wordpress/components";
import Card from '../components/Card'
import {getContentStructure, getRecipientSuggestionsConfig} from "../global";
import {useMessageContent} from "../hooks/use-message-content";
import {useIsLocked} from "../hooks/use-post";
import {dateFormat} from "../lib/date-format";
import {useState} from "@wordpress/element";

type Props = {
    title?: string
    initialOpen?: boolean
}
export default function MessagesPaneContainer(
    {
        title = "Requests",
        initialOpen = false,
    }: Props
) {
    const contentStructure = getContentStructure();

    const archive = useMessageArchive();
    const latestMessages = useLatestMessages();
    const [pendingRecipients, setPendingRecipients] = usePendingRecipients();
    const [messageContent, setMessageContent] = useMessageContent();
    const isLocked = useIsLocked();
    const [showAllRequests, setShowAllRequests] = useState(false);

    const onChange = (key: string) => (value: string | boolean) => {
        setMessageContent({...messageContent, [key]: value})
    }

    const onShowAllMessages = () => {
        setShowAllRequests(true)
    }

    const suggestionsConfig = getRecipientSuggestionsConfig();

    return (
        <PanelBody title={title} initialOpen={initialOpen}>

            {contentStructure.map(widget => {
                switch (widget.type) {
                    case "text":
                        return <TextControl
                            key={widget.key}
                            label={widget.label}
                            value={messageContent[widget.key] ?? widget.defaultValue}
                            onChange={onChange(widget.key)}
                            help={widget.help}
                        />
                    case "textarea":
                        return <TextareaControl
                            key={widget.key}
                            label={widget.label}
                            value={messageContent[widget.key] ?? widget.defaultValue}
                            onChange={onChange(widget.key)}
                            help={widget.help}
                        />
                    case "toggle":
                        return <ToggleControl
                            key={widget.key}
                            label={widget.label}
                            onChange={onChange(widget.key)}
                            checked={messageContent[widget.key] ?? (widget.defaultValue == "1")}
                            help={widget.help}
                        />

                }
                return <p key={widget.key}>Unknown: {widget.label}</p>
            })}

            <hr/>

            {suggestionsConfig.type == "autocomplete" ?
                <FormTokenField
                    label="Send correction request to"
                    onChange={(value) => {
                        setPendingRecipients(value as string[]);
                    }}
                    suggestions={suggestionsConfig.options}
                    value={pendingRecipients}
                    disabled={isLocked}
                />
                : null
            }

            {suggestionsConfig.type == "checkbox" ?
                <>
                    <h2>Send correction request to</h2>
                    {suggestionsConfig.options.map(option => {

                        return <CheckboxControl
                            key={option}
                            label={option}
                            checked={pendingRecipients.includes(option)}
                            disabled={isLocked}
                            onChange={(checked)=>{
                                if(checked){
                                    setPendingRecipients([
                                        ...pendingRecipients,
                                        option,
                                    ]);
                                } else {
                                    setPendingRecipients(pendingRecipients.filter(r => r != option));
                                }
                            }}
                        />
                    })}
                </>
                :null
            }



            <div style={{paddingBlockStart: 8}}>
                {pendingRecipients.length ?
                    (isLocked ? <Spinner/> : "🟠") : "⚪️"
                }&nbsp;
                <i>{pendingRecipients.length ?
                    (
                        isLocked ?
                            "Sending requests..."
                            :
                            "Save post to send requests."
                    )
                    :
                    "No recipients selected."
                }</i>
            </div>

            <hr/>

            <h2>{showAllRequests ? "All requests" : "Latest requests"}</h2>

            {(showAllRequests ? archive : latestMessages).map(m => {
                return <Card key={m.id}>
                    <div style={{wordWrap: "break-word"}}>{m.recipient}</div>
                    {m.sent_timestamp ? <>✅ <i>{dateFormat(m.sent_timestamp * 1000)}</i></> : null}
                    {m.error_timestamp ? <>🚨 <i>{dateFormat(m.error_timestamp * 1000)}</i></> : null}
                </Card>
            })}

            <br/>

            {!showAllRequests ?
                <Button
                    variant="secondary"
                    onClick={onShowAllMessages}
                >
                    Show all requests
                </Button>
                : null
            }


        </PanelBody>
    )
}
