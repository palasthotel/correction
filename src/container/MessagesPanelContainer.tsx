import {useMessages} from "../hooks/use-messages";
import CorrectorsControl from "../components/CorrectorsControl";
import {useState} from "@wordpress/element";
import {PanelBody, TextareaControl, TextControl, ToggleControl} from "@wordpress/components";
import {getContentStructure} from "../global";
import {useMessageContent} from "../hooks/use-message-content";

type Props = {
    title?: string
    initialOpen?: boolean
}
export default function MessagesPaneContainer(
    {
        title = "Request",
        initialOpen = false,
    }:Props
) {

    const messages = useMessages();
    const [messageContent, setMessageContent] = useMessageContent()

    const [recipients, setRecipients] = useState<string[]>([]);

    const pending = messages.filter(m => m.sent_timestamp === null);
    const pendingReceivers = pending.map(p => p.receiver);

    const contentStructure = getContentStructure();

    const onChange = (key: string) => (value: string | boolean) => {
        setMessageContent({...messageContent, [key]: value})
    }

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

            <CorrectorsControl
                value={recipients}
                onChange={setRecipients}
            />

            <p>TODO: check recipient is valid</p>

            <p>Add recipient to queue</p>

            <ul>
                {recipients.map(r => {
                    return <li key={r}>{r}</li>
                })}
            </ul>

            <hr/>

            <h2>Sent messages</h2>


        </PanelBody>
    )
}
