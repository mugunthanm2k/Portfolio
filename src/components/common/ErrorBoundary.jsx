import { Component } from 'react';

// Used around WebGL scenes so a failure shows a lightweight fallback instead of a blank page.
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn('3D scene failed, showing fallback:', err);
  }
  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
