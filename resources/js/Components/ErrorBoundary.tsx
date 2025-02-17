import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-900 p-6 font-['Orbitron']">
                    <div className="space-y-6 bg-gray-800/50 p-8 backdrop-blur-sm">
                        <h2 className="glitch-effect text-2xl font-bold text-yellow-400">
                            Something went wrong
                        </h2>
                        <p className="text-gray-100">
                            Please try refreshing the page.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
