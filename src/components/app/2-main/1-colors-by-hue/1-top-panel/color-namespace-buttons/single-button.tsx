import { ButtonCopyColor } from '@/components/ui/button-copy-color';

// const copyHueNoticeTextShadow = {
//     textShadow: '#98989887 1px 1px, #4141412e -1px -1px 0px'
// };

// function CopyHueNotice() {
//     return (
//         <div className="relative">
//             <div
//                 className="px-2 py-px text-sm bg-green-500 text-green-900 border-green-700 border rounded"
//                 style={copyHueNoticeTextShadow}
//             >
//                 Copied
//             </div>
//         </div>
//     );
// }

export function ColorNamespaceButton({ copyValue }: { copyValue: string; }) {
    return (
        <div className="h-5">
            <ButtonCopyColor
                valueToCopy={copyValue}
                // copyNotice={<CopyHueNotice />}
            />
        </div>
    );
}
