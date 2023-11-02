import { Button } from "@/components/ui/shadcn";
import { parseText } from "@/store";


const test1 = ` `;

const test2 = `--primary: 0 100% 50%;
`;

const test3 = `
--primary: 161 56% 35%;
--background: 159 65% 4%;
--foreground: 159 10% 97.5%;

 --primary: 0 100% 50%;
`;

const test4 = `
:root {
    --primary: 161 56% 35%;
    --background: 159 65% 4%;
    --foreground: 159 10% 97.5%;
}
.dark {
    --primary: 0 100% 50%;
}
`;

export function TestButtons() {
    return (
        <>
            <Button className="flex-none" variant={"outline"} size={"icon"} onClick={() => parseText.text = test1}>0/0</Button>
            <Button className="flex-none" variant={"outline"} size={"icon"} onClick={() => parseText.text = test2}>1/0</Button>
            <Button className="flex-none" variant={"outline"} size={"icon"} onClick={() => parseText.text = test3}>3/0</Button>
            <Button className="flex-none" variant={"outline"} size={"icon"} onClick={() => parseText.text = test4}>3/1</Button>
        </>
    );
}
