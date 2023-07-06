import {Button, FormTokenField} from "@wordpress/components";
import {useState} from "@wordpress/element";
import {getReceiverSuggestions} from "../global";

type Props = {
    value: string[]
    onChange: (value: string[]) => void
}
export default function CorrectorsControl(
    {
        value,
        onChange,
    }: Props
){

    const [receiversCandidates, setReceiversCandidates] = useState<string[]>([]);

    return (
        <div>
            <FormTokenField
                label="Receivers"
                onChange={(value)=>{
                    setReceiversCandidates(value as string[]);
                }}
                suggestions={getReceiverSuggestions()}
                value={receiversCandidates}
            />
            <Button
                variant="secondary"
                onClick={()=>{
                    setReceiversCandidates([]);
                    onChange([...value,...receiversCandidates]);
                }}
            >
                Add receivers
            </Button>
        </div>
    )
}
