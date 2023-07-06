
export default function Card({children}: {children: any}) {
    return (
        <div
            style={{
                border: "1px solid var(--wp--preset--color--gray)",
                borderRadius: 2,
                padding: 10,
                marginBlock: 5,
                marginInline: -10,
                wordWrap: "break-word",
            }}
        >
            {children}
        </div>
    )
}
