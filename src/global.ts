
declare global {
    interface Window {
        Corrections: {
            postId: number
            contentStructure: {
                key: string
                label: string
                type: string
                help?: string
                defaultValue: any
            }[]
            receiverSuggestions: string[]
            allRevisionsUrl: string
            endpoints: {
                isValidRecipientBaseUrl: string
            }
        }
    }
}
export const getPostId = () => window.Corrections.postId;
export const getContentStructure = () => window.Corrections.contentStructure;
export const getReceiverSuggestions = () => window.Corrections.receiverSuggestions;
export const getAllRevisionsUrl = () => window.Corrections.allRevisionsUrl

export const getIsValidRecipientEndpoint = (recipient: string) =>
    window.Corrections.endpoints.isValidRecipientBaseUrl+"&recipient="+encodeURI(recipient)


