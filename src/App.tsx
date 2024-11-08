/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React from 'react';
import { Clock } from './components/Clock';
import './App.scss';

interface State {
  hasClock: boolean;
  clockName: string;
  timerId: any;
}

export class App extends React.Component<{}, State> {
  state: State = {
    hasClock: true,
    clockName: 'Clock-0',
    timerId: 0,
  };

  render() {
    const { hasClock, clockName, timerId } = this.state;

    // #region clicks

    document.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();

      this.setState({ hasClock: true });
    });

    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();

      this.setState({ hasClock: false });
    });

    // #endregion

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <Clock
            clockName={clockName}
            setState={value => this.setState(value)}
            timerId={timerId}
          />
        )}
      </div>
    );
  }
}
