import React from 'react';
import QandA from './Q&A/ModuleMain.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>FEC Testing</h1>
        <QandA />
      </div>
    );
  }
}

export default App;
