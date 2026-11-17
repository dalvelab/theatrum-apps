/**
 * Экран ошибки вместо дефолтного «Application error» от Next.js:
 * показываем текст ошибки и базовую информацию, чтобы её можно было
 * прислать без доступа к консоли (на телефоне в PWA её нет).
 */
import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    // biome-ignore lint/suspicious/noExplicitAny: __NEXT_DATA__ не типизирован
    const buildId = (window as any).__NEXT_DATA__?.buildId ?? "-";
    const info = [
      `${error.name}: ${error.message}`,
      `Страница: ${window.location.href}`,
      `Время: ${new Date().toLocaleString("ru-RU")}`,
      `Сборка: ${buildId}`,
      `Устройство: ${navigator.userAgent}`,
    ].join("\n");

    return (
      <div
        role="alert"
        style={{
          padding: "40px 16px",
          maxWidth: 640,
          margin: "0 auto",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <h2 style={{ fontSize: 22, margin: 0 }}>Произошла ошибка</h2>
        <p style={{ color: "#555", marginTop: 8 }}>
          Попробуйте перезагрузить страницу. Если ошибка повторяется, сделайте
          скриншот и отправьте разработчику.
        </p>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontSize: 12,
            background: "#f5f5f5",
            padding: 12,
            borderRadius: 8,
          }}
        >
          {info}
        </pre>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "#fff",
            fontSize: 15,
          }}
        >
          Перезагрузить
        </button>
      </div>
    );
  }
}
