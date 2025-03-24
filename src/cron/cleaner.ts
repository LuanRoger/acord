export class CronExecutor {
  private intervalMinutes: number;
  private callback: () => void;
  private intervalId: NodeJS.Timeout | undefined;

  constructor(callback: () => void, interval?: number) {
    const envCleanupInterval = process.env.CLEANUP_INTERVAL;
    const currentInterval =
      interval ??
      (envCleanupInterval ? parseInt(envCleanupInterval) : undefined);
    this.intervalMinutes = currentInterval || 1000;
    this.callback = callback;

    console.log(
      "CronExecutor initialized with interval:",
      this.intervalMinutes,
      "minutes",
    );
  }

  startPeriodicExecution(): () => void {
    this.stopPeriodicExecution();

    const callbackWrapper = () => {
      console.log("Executing callback");
      this.callback();
    };
    this.intervalId = setInterval(
      callbackWrapper,
      this.intervalMinutes * 60 * 1000,
    );

    return () => {
      if (!this.intervalId) {
        return;
      }

      clearInterval(this.intervalId);
      this.intervalId = undefined;
    };
  }

  stopPeriodicExecution(): void {
    if (!this.intervalId) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}
