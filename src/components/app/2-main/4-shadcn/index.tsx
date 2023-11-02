import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { classNames } from "@/utils";
import { PasteArea } from "./0-top-panel";
import { GroupGrid } from "./5-group-grid";
import { PickerExample } from "@/components/ui/shadcn/gradient-color-picker";

// export function Section4_Chadcn({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
//     const {themes} = useSnapshot(shadcnAll);
//     //const themesArray = Array(length).fill(0);
//     console.log('themesArray', themes);
    
//     return (
//         <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)} {...rest}>

//             <div className="my-4">
//                 <PasteArea />
//                 {/* <PickerExample /> */}
//             </div>

//             {themes.map((_, idx) => (
//                 <GroupGrid themeVars={shadcnAll.themes[idx]} idx={idx} key={idx} />
//             ))}
            
//         </div>
//     );
// }

// export function Section4_Chadcn({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
//     const { length } = useSnapshot(shadcnAll.themes);
//     const themesArray = Array(length).fill(0);
//     console.log('themesArray', themesArray);
    
//     return (
//         <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)} {...rest}>

//             <div className="my-4">
//                 <PasteArea />
//                 {/* <PickerExample /> */}
//             </div>

//             {themesArray.map((_, idx) => (
//                 <GroupGrid themeVars={shadcnAll.themes[idx]} idx={idx} key={idx} />
//             ))}
            
//         </div>
//     );
// }

export function Section4_Chadcn({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { length } = useSnapshot(shadcnAll.themes);
    const themesArray = Array(length).fill(0);
    console.log('+++ Section4_Chadcn::shadcnAll.themes', JSON.stringify(shadcnAll.themes, null, 4));
    
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)} {...rest}>

            <div className="my-4">
                <PasteArea />
                {/* <PickerExample /> */}
            </div>

            {themesArray.map((_, idx) => (
                <GroupGrid themeVars={shadcnAll.themes[idx]} idx={idx} key={shadcnAll.themes[idx].themeId} />
            ))}
            
        </div>
    );
}
