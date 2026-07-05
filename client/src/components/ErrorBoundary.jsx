import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="center-screen">
          <section className="message-box">
            <h1>Something went wrong</h1>
            <p>Please refresh the page. If the problem continues, login again.</p>
            <button className="primary-button" onClick={() => window.location.assign('/login')} type="button">
              Back to login
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
