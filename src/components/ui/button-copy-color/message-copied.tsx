const textShadow = {
    textShadow: '#98989887 1px 1px, #4141412e -1px -1px 0px'
};

export function MessageCopied() {
    return (
        <div className="px-2 py-px text-sm bg-green-500 text-green-900 border-green-700 border rounded" style={textShadow}>
            Copied
        </div>
    );
}
