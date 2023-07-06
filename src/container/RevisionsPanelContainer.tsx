import {useRevisionsGroupByAuthorSortByTime} from "../hooks/use-revisions";
import {Button, PanelBody, PanelRow} from "@wordpress/components";
import {getAllRevisionsUrl} from "../global";

const locale = (new Intl.DateTimeFormat()).resolvedOptions().locale
const dateFormatter = new Intl.DateTimeFormat(locale, {
    year:'numeric',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
})

type Props = {
    title?: string
    initialOpen?: boolean
}

export default function RevisionsPanelContainer(
    {
        title = "Latest revisions",
        initialOpen = true,
    }:Props
){
    const revisions = useRevisionsGroupByAuthorSortByTime();

    return (
        <PanelBody title={title} initialOpen={ initialOpen }>
            {revisions.map((revision,)=> {
                return (
                    <PanelRow key={revision.revision_post_id}>
                        <div>
                            {revision.author_name}<br/>
                            <i>{dateFormatter.format( new Date(revision.timestamp * 1000) )}</i>
                        </div>
                    </PanelRow>
                )
            })}
            <br/>
            <Button href={getAllRevisionsUrl()} variant="link">All revisions</Button>
        </PanelBody>
    )
}
