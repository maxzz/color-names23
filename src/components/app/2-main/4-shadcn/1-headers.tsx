export function Header() {
    return (<>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b">Name</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b text-right">Background</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b ml-2">Foreground</div>
    </>);
}

export function Header2() {
    return (<>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b mt-4"></div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b mt-4 text-right">Length values</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b mt-4 ml-2"></div>
    </>);
}
