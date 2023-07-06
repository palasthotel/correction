import {useRevisionsGroupByAuthorSortByTime} from "../hooks/use-revisions";
import {Button, PanelBody, PanelRow} from "@wordpress/components";
import {getAllRevisionsUrl} from "../global";
import {dateFormat} from "../lib/date-format";

type Props = {
    title?: string
    initialOpen?: boolean
}

export default function RevisionsPanelContainer(
    {
        title = "Latest corrections",
        initialOpen = true,
    }: Props
) {
    const revisions = useRevisionsGroupByAuthorSortByTime();

    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {revisions.map((revision,) => {
                return (
                    <PanelRow key={revision.revision_post_id}>
                        <div>
                            {revision.author_name}<br/>
                            <i>{dateFormat(revision.timestamp * 1000)}</i>
                        </div>
                    </PanelRow>
                )
            })}
            <br/>
            <Button href={getAllRevisionsUrl()} variant="link">All revisions</Button>
        </PanelBody>
    )
}
