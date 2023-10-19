const textShadow = {
    textShadow: '#585858ae 1px 1px, #5353532d -1px -1px 0px'
};

export function TransitionMessageCopied() {
    return (
        <div className="px-1 py-0.5 text-xs text-green-100 bg-green-600 border-green-500 border rounded-[2px] shadow-md" style={textShadow}>
            Copied
        </div>
    );
}
