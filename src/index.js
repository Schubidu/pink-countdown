import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/de';
import 'moment-precise-range-plugin';

import './styles.css';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App({ date = new Date(2019, 6, 8, 19, 0) }) {
  const [current, setCurrent] = useState(Date.now());
  useInterval(() => {
    // Your custom logic here
    setCurrent(Date.now());
  }, 1000);

  useEffect(() => {}, [date]);
  const dateToText = moment(date)
    .preciseDiff(current)
    .split(' ')
    .reduce((acc, cur, i) => {
      if (i % 2 === 0) {
        return [...acc, cur];
      } else {
        const a = acc;
        a[a.length - 1] += ' ' + cur;
        return a;
      }
    }, []);

  return (
    <div className="App">
      <h1>P!NK - BEAUTIFUL TRAUMA WORLD TOUR 2019</h1>
      <p>Live in Hamburg</p>
      <p>{[...Array(5)].map((v, i) => dateToText[i]).join(', ')}</p>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
