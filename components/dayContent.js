import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isBefore, isWithinInterval } from 'date-fns';

import styles from '../styles/components/dayContent.module.css';

function DayContent({ currentMonth, taskValue }) {
    const [monthDay, setMothDay] = useState([]);

    const [selectStartDate, setSelectStartDate] = useState();
    const [selectEndDate, setSelectEndDate] = useState();

    useEffect(() => {
        SetDay();
    }, [currentMonth])

    useEffect(() => {
        //題目改變 刪除選擇日期
        setSelectStartDate(null);
        setSelectEndDate(null);
    }, [taskValue])

    //設定日期
    function SetDay() {
        const startDate = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
        const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

        let day = startDate;
        let days = [];

        while (day <= endDate) {
            days.push(day);
            day = addDays(day, 1);
        }

        setMothDay(days);
    }

    //點擊判斷區間
    function DayClick(day) {
        if (!selectStartDate) {
            //還沒有 起始日
            setSelectStartDate(day);
        } else if (!selectEndDate) {
            //有起始日 沒有結束日
            if (isBefore(day, selectStartDate)) {
                setSelectStartDate(day);
            } else {
                setSelectEndDate(day)
            }
        } else {
            //有 起始日 跟 結束日
            //判斷再次點擊 如果是在起始前面就重新，不然就修改結束日期
            if (isBefore(day, selectStartDate)) {
                setSelectStartDate(day);
                setSelectEndDate(null);
            } else {
                setSelectEndDate(day);
            }
        }
    }


    return (
        <div id={styles.dataContent}>
            {
                monthDay.map((item, index) => (
                    <div key={item}
                        className={[styles.dayButton,
                        (isSameMonth(item, currentMonth)) ? "" : (taskValue == 1) ? styles.notMoth : styles.notMoth2,
                        (isSameDay(item, new Date())) ? styles.toDay : "",
                        (selectStartDate == item || selectEndDate == item || isWithinInterval(item, {
                            start: selectStartDate,
                            end: selectEndDate,
                        })) ? styles.select : ""].join(' ')}
                        onClick={(event) => { (isSameMonth(item, currentMonth) || taskValue == 2) ? DayClick(item) : "" }}>{
                            format(item, 'd') + "日"
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default DayContent;