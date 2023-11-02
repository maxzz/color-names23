import { Button } from "@/components/ui/shadcn";

export function TestButtons() {
    return (
        <>
            <Button className="flex-none" variant={"outline"} size={"icon"}>0/0</Button>
            <Button className="flex-none" variant={"outline"} size={"icon"}>3/0</Button>
            <Button className="flex-none" variant={"outline"} size={"icon"}>3/1</Button>
        </>
    );
}
