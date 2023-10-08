import { useAtomValue } from 'jotai';
import { dataLoadAtom } from './store';
import { TailwindColorsBridge } from './components/ui/tailwind-colors-bridge';
import { App1_Header } from './components/app/1-header';
import { App2_Main } from './components/app/2-main';
import { App3_Footer } from './components/app/3-footer';
import './App.css';

const headerShadow1 = "shadow-[1px_0px_3px_0px__#000]";
const headerShadow2 = "shadow-[1px_0px_3px_0px__#000]";
const headerShadow3 = "shadow-[0px_1px_2px_1px_#ffc16d69]";
const headerShadowStyle = { boxShadow: '#bfbfbf75 2px 0px 3px 0px', };

function App() {
    useAtomValue(dataLoadAtom);
    return (<>
        <TailwindColorsBridge />

        <div className="h-screen flex flex-col md:flex-row bg-slate-50">

            <App1_Header className="md:w-80 lg:w-[33rem] transition-all" />
            {/* <App1_Header className={classNames("md:w-80 lg:w-[33rem] transition-all", headerShadow1)} /> */}
            {/* <App1_Header className={classNames("md:w-80 lg:w-[33rem] transition-all")} style={headerShadowStyle} /> */}

            <div className="flex-1 flex flex-col overflow-hidden">

                <App2_Main className="flex-1" />
                
                <div className="md:hidden">
                    <App3_Footer />
                </div>
            </div>
        </div>
    </>);
}

export default App;
