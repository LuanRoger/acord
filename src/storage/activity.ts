import type { Activity, ActivityMetadata } from "@/types/activity";

export class InternalActivityStorage {
  private static instance: InternalActivityStorage;
  private activity: Activity | undefined;
  private previousActivity: Activity | undefined;
  private lastActivityUpdateTimestamp: number | undefined;
  private lastActivityUpdateDate: Date | undefined;
  private lastAccessActivityDate: Date | undefined;

  static getInstance(): InternalActivityStorage {
    if (!InternalActivityStorage.instance) {
      InternalActivityStorage.instance = new InternalActivityStorage();
    }

    return InternalActivityStorage.instance;
  }

  private constructor() {
    this.activity = undefined;
    this.previousActivity = undefined;
    this.lastActivityUpdateTimestamp = undefined;
    this.lastActivityUpdateDate = undefined;
  }

  getActivity(): Activity | undefined {
    this.lastAccessActivityDate = new Date();

    return this.activity;
  }

  setActivity(activity: Activity): void {
    this.previousActivity = this.activity;
    this.lastActivityUpdateTimestamp = Date.now();
    this.lastActivityUpdateDate = new Date();
    
    this.activity = activity;
  }

  getMetadata(): ActivityMetadata {
    return {
      previousActivity: this.previousActivity,
      lastActivityUpdateTimestamp: this.lastActivityUpdateTimestamp,
      lastActivityUpdateDate: this.lastActivityUpdateDate,
      lastAccessActivityDate: this.lastAccessActivityDate,
    };
  }
}
