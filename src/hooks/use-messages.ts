import {usePostAttribute} from "./use-post";

type Message = {
    id: number
    recipient: string
    modified_timestamp: number
    sent_timestamp: number | null
    error_timestamp: number | null
}

export const useMessages = () => {
    const [value, setValue] = usePostAttribute<Message[] | undefined>("corrections_messages")
    const messages: Message[] = Array.isArray(value) ? value : [];
    return [
        messages,
        (messages: Message[]) => {
            // set pending requests
            setValue(messages)
        }
    ] as const;
}

export const useMessageArchive = () => {
    const [value] = useMessages();
    return value.filter(m => m.id !== 0);
}

export const useLatestMessages = () => {
    const archive = useMessageArchive();
    const grouped: {[id: string]: Message & {timestamp:number}} = {};
    archive.forEach(m => {
        if(!grouped[m.recipient]){
            grouped[m.recipient] = {...m, timestamp: 0};
        }
        if(m.sent_timestamp != null && grouped[m.recipient].timestamp < m.sent_timestamp ){
            grouped[m.recipient] = {...m, timestamp: m.sent_timestamp};
        } else if(m.error_timestamp != null && grouped[m.recipient].timestamp < m.error_timestamp){
            grouped[m.recipient] = {...m, timestamp: m.error_timestamp};
        }
    })
    return Object.values(grouped).sort((a,b)=> b.timestamp - a.timestamp);
}

export const usePendingRecipients = () => {
    const [value, setValue] = useMessages();
    const history = value.filter(m => m.id !== 0);
    const pendingRecipients = value.filter(m => m.id == 0).map(m => m.recipient);
    return [
        pendingRecipients,
        (recipients: string[]) => {
            // set pending requests
            setValue(
                [
                    ...history,
                    ...recipients.map(r => ({
                        id: 0,
                        recipient: r,
                        modified_timestamp: Math.round(Date.now() / 1000),
                        sent_timestamp: null,
                        error_timestamp: null,
                    }))
                ]
            )
        }
    ] as const;
}
