import Head from 'next/head';
import { useEffect, useState } from 'react';

import DayContent from '../components/dayContent';
import DayHeader from '../components/dayHeader';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [taskValue, setTastValue] = useState(1);

  useEffect(() => {
    setCurrentMonth(new Date());
  }, [taskValue])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <div id={styles.buttonGroup}>
          <button onClick={() => { setTastValue(1); }}>Test1</button>
          <button onClick={() => { setTastValue(2); }}>Test2</button>
        </div>

        <h1> This is Task {taskValue} </h1>

        <div id={styles.dataLayout}>
          <DayHeader currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} taskValue={taskValue}></DayHeader>
          <DayContent currentMonth={currentMonth} taskValue={taskValue}></DayContent>
        </div>

      </main >
    </div >
  );
}
