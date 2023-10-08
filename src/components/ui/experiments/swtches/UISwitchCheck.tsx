import { useState } from 'react'; 
import styles from './UISwitch.module.scss'; //https://codepen.io/raphaelgoetter/pen/rGjOOg

export function UISwitchCheck() {
    const [on, setOn] = useState(false);
    const label = "Name";
    return (<>
        <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input type="checkbox" className={`${styles.checkbox} cursor-pointer`} />
            <span>{label}</span>
        </label>
    </>
    );
}
