import { format, addMonths } from 'date-fns';

import styles from '../styles/components/dayHeader.module.css';

function DayHeader({ currentMonth, setCurrentMonth, taskValue }) {

    // 切換到前一個月
    function PrevMonth() {
        if (taskValue == 1) return;
        setCurrentMonth(addMonths(currentMonth, -1));
    };

    // 切換到下一個月
    function NextMonth() {
        if (taskValue == 1) return;
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    return (
        <div id={styles.dataHeader}>
            <div className={styles.mothSelect} onClick={() => { PrevMonth(); }}>&lt;</div>
            <p id={styles.mothText}>{format(currentMonth, 'yyyy年MM月')}</p>
            <div className={styles.mothSelect} onClick={() => { NextMonth(); }}>&gt;</div>
        </div>
    )
}

export default DayHeader;