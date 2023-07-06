
declare global {
    interface Window {
        Corrections: {
            domain: string
            i18n: {
                [key: string]: string
            }
            postId: number
            contentStructure: {
                key: string
                label: string
                type: string
                help?: string
                defaultValue: any
            }[]
            recipientSuggestionsConfig: {
                type: 'checkbox' | 'autocomplete',
                options: string[]
            }
            allRevisionsUrl: string
            endpoints: {
                isValidRecipientBaseUrl: string
            }
        }
    }
}

export const translate = (key: string) => window.Corrections.i18n[key] ?? `? ${key} ?`;
export const getPostId = () => window.Corrections.postId;
export const getContentStructure = () => window.Corrections.contentStructure;
export const getRecipientSuggestionsConfig = () => window.Corrections.recipientSuggestionsConfig;
export const getAllRevisionsUrl = () => window.Corrections.allRevisionsUrl

export const getIsValidRecipientEndpoint = (recipient: string) =>
    window.Corrections.endpoints.isValidRecipientBaseUrl+"&recipient="+encodeURI(recipient)


