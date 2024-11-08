/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React from 'react';

interface Props {
  clockName: string;
  setState: (arg: any) => void;
  timerId: any;
}

interface State {
  today: Date;
}

export class Clock extends React.Component<Props, State> {
  state: State = {
    today: new Date(),
  };

  getRandomName = (): string => {
    const value = Date.now().toString().slice(-4);

    return `Clock-${value}`;
  };

  componentDidMount(): void {
    const { setState } = this.props;

    setState({
      timerId: window.setInterval(() => {
        setState({ clockName: this.getRandomName() });
      }, 3300),
    });

    window.setInterval(() => {
      this.setState({ today: new Date() });
    }, 1000);
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
  ): void {
    const { today } = this.state;
    const { clockName } = this.props;
    const time = today.toUTCString().slice(-12, -4);
    const todayChanges = prevState.today !== today;
    const clockNameChanges = prevProps.clockName !== clockName;

    if (todayChanges) {
      console.log(time);
    }

    if (clockNameChanges) {
      console.warn(`Renamed from ${prevProps.clockName} to ${clockName}`);
    }
  }

  componentWillUnmount(): void {
    window.clearInterval(this.props.timerId);
  }

  render() {
    const { today } = this.state;
    const { clockName } = this.props;

    return (
      <>
        <div className="Clock">
          <strong className="Clock__name">{clockName}</strong>

          {' time is '}

          <span className="Clock__time">
            {today.toUTCString().slice(-12, -4)}
          </span>
        </div>
      </>
    );
  }
}
