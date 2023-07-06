import {registerPlugin} from "@wordpress/plugins";
import {PluginSidebar, PluginSidebarMoreMenuItem} from '@wordpress/edit-post'
import {useRevisions} from "../hooks/use-revisions";

import MessagesPanelContainer from "../container/MessagesPanelContainer";
import RevisionsPanelContainer from "../container/RevisionsPanelContainer";

const sidebarName = "corrections-sidebar";

registerPlugin("corrections-plugin", {
    render: () => {

        const revisions = useRevisions();

        return <>

            <PluginSidebarMoreMenuItem
                target={sidebarName}
                icon="editor-spellcheck"
            >
                Corrections
            </PluginSidebarMoreMenuItem>

            <PluginSidebar
                icon="editor-spellcheck"
                name={sidebarName}
                title="Corrections"
            >
                <RevisionsPanelContainer initialOpen={true} />

                <MessagesPanelContainer initialOpen={false} />

            </PluginSidebar>
        </>
    }
});
