import { CronExecutor } from "@/cron/cleaner";
import type { Activity, ActivityMetadata } from "@/types/activity";
import { getAverageColor } from "fast-average-color-node";

export class InternalActivityStorage {
  private static instance: InternalActivityStorage;
  private activity: Activity | undefined;
  private previousActivity: Activity | undefined;
  private lastActivityUpdateTimestamp: number | undefined;
  private lastActivityUpdateDate: Date | undefined;
  private lastAccessActivityDate: Date | undefined;
  private cronJobExecutor?: CronExecutor;

  static getInstance(): InternalActivityStorage {
    if (!InternalActivityStorage.instance) {
      InternalActivityStorage.instance = new InternalActivityStorage(true);
    }

    return InternalActivityStorage.instance;
  }

  private constructor(autoCleanup: boolean = false) {
    this.activity = undefined;
    this.previousActivity = undefined;
    this.lastActivityUpdateTimestamp = undefined;
    this.lastActivityUpdateDate = undefined;
    this.lastAccessActivityDate = undefined;

    if (autoCleanup) {
      this.cronJobExecutor = new CronExecutor(() => this.clearActivity());
      this.cronJobExecutor.startPeriodicExecution();
    }
  }

  getActivity(): Activity | undefined {
    this.lastAccessActivityDate = new Date();

    return this.activity;
  }

  async setActivity(activity: Activity) {
    this.previousActivity = this.activity;
    this.lastActivityUpdateTimestamp = Date.now();
    this.lastActivityUpdateDate = new Date();

    const dominantColor = activity.largeImageKey
      ? await getAverageColor(activity.largeImageKey)
      : undefined;
    this.activity = {
      ...activity,
      dominantColor: dominantColor?.hex,
    };

    if (this.cronJobExecutor) {
      this.cronJobExecutor.startPeriodicExecution();
    }

    return this.activity;
  }

  getMetadata(): ActivityMetadata {
    return {
      previousActivity: this.previousActivity,
      lastActivityUpdateTimestamp: this.lastActivityUpdateTimestamp,
      lastActivityUpdateDate: this.lastActivityUpdateDate,
      lastAccessActivityDate: this.lastAccessActivityDate,
    };
  }

  clearActivity() {
    this.activity = undefined;
    this.previousActivity = undefined;
    this.lastActivityUpdateTimestamp = undefined;
    this.lastActivityUpdateDate = undefined;
    this.lastAccessActivityDate = undefined;
  }
}
